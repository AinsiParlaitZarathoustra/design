// A markdown block as a hast-shaped tree, built the way react-markdown builds
// its output: remark-parse and remark-gfm, then mdast-util-to-hast's default
// handlers. react-markdown is a React package, so the same tree is made here
// and drawn by `markdown-nodes.svelte`. Raw HTML stays text (no rehype-raw),
// link and image URLs pass react-markdown's `defaultUrlTransform` (a
// `javascript:` URL becomes an empty href), and the rehype plugins the caller
// passes (rehype-highlight) run on the finished tree.

import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import type { PluggableList } from "unified";

export type HastProperties = Record<string, string | number | boolean | string[]>;

export interface HastElement {
  type: "element";
  tagName: string;
  properties: HastProperties;
  children: HastChild[];
}

export interface HastText {
  type: "text";
  value: string;
}

export type HastChild = HastElement | HastText;

/** The mdast fields this converter reads. The parser's own types stay internal. */
interface MdNode {
  type: string;
  value?: string;
  children?: MdNode[];
  depth?: number;
  ordered?: boolean;
  start?: number | null;
  spread?: boolean;
  checked?: boolean | null;
  url?: string;
  title?: string | null;
  alt?: string | null;
  lang?: string | null;
  identifier?: string;
  align?: (string | null)[] | null;
}

interface Definition {
  url: string;
  title?: string | null;
}

interface Context {
  definitions: Map<string, Definition>;
}

const parser = unified().use(remarkParse).use(remarkGfm);

/** react-markdown's `defaultUrlTransform`: keeps safe protocols, empties the rest. */
const SAFE_PROTOCOL = /^(https?|ircs?|mailto|xmpp)$/i;
export function safeUrl(value: string): string {
  const colon = value.indexOf(":");
  const questionMark = value.indexOf("?");
  const numberSign = value.indexOf("#");
  const slash = value.indexOf("/");
  if (
    colon === -1 ||
    (slash !== -1 && colon > slash) ||
    (questionMark !== -1 && colon > questionMark) ||
    (numberSign !== -1 && colon > numberSign) ||
    SAFE_PROTOCOL.test(value.slice(0, colon))
  ) {
    return value;
  }
  return "";
}

function text(value: string): HastText {
  return { type: "text", value };
}

function element(
  tagName: string,
  properties: HastProperties,
  children: HastChild[] = [],
): HastElement {
  return { type: "element", tagName, properties, children };
}

/** Joins block children with newlines, as mdast-util-to-hast's `wrap` does. */
function wrap(nodes: HastChild[], loose: boolean): HastChild[] {
  const out: HastChild[] = [];
  if (loose) out.push(text("\n"));
  nodes.forEach((node, index) => {
    if (index) out.push(text("\n"));
    out.push(node);
  });
  if (loose && nodes.length > 0) out.push(text("\n"));
  return out;
}

function collectDefinitions(node: MdNode, into: Map<string, Definition>): void {
  if (node.type === "definition" && node.identifier !== undefined) {
    into.set(node.identifier.toLowerCase(), { url: node.url ?? "", title: node.title });
  }
  for (const child of node.children ?? []) collectDefinitions(child, into);
}

function all(nodes: MdNode[] | undefined, ctx: Context): HastChild[] {
  const out: HastChild[] = [];
  for (const node of nodes ?? []) out.push(...one(node, ctx));
  return out;
}

/** The text a task item's label is named for: its own words, without a checkbox or a nested list. */
function taskText(node: HastChild): string {
  if (node.type === "text") return node.value;
  if (["input", "ul", "ol"].includes(node.tagName)) return "";
  return node.children.map(taskText).join("");
}

function listItem(item: MdNode, loose: boolean, ctx: Context): HastElement {
  const results = all(item.children, ctx);
  const children: HastChild[] = [];
  results.forEach((child, index) => {
    if (loose || index !== 0 || child.type !== "element" || child.tagName !== "p") {
      children.push(text("\n"));
    }
    if (child.type === "element" && child.tagName === "p" && !loose) {
      children.push(...child.children);
    } else {
      children.push(child);
    }
  });
  const tail = results[results.length - 1];
  if (tail && (loose || tail.type !== "element" || tail.tagName !== "p")) {
    children.push(text("\n"));
  }
  const properties: HastProperties = {};
  if (typeof item.checked === "boolean") {
    // A GFM task: a disabled checkbox named for the item's words.
    properties.className = ["task-list-item"];
    const label = children.map(taskText).join("").trim();
    const box = element("input", {
      "aria-label": label || "Task",
      type: "checkbox",
      checked: item.checked,
      disabled: true,
    });
    children.unshift(box, text(" "));
  }
  return element("li", properties, children);
}

function table(node: MdNode, ctx: Context): HastElement {
  const align = node.align ?? [];
  const rows = (node.children ?? []).map((row, rowIndex) =>
    element(
      "tr",
      {},
      (row.children ?? []).map((cell, column) => {
        const properties: HastProperties = {};
        const value = align[column];
        if (value) properties.align = value;
        return element(rowIndex === 0 ? "th" : "td", properties, all(cell.children, ctx));
      }),
    ),
  );
  const [head, ...body] = rows;
  const children: HastChild[] = [];
  if (head) children.push(element("thead", {}, [head]));
  children.push(element("tbody", {}, body));
  return element("table", {}, children);
}

function one(node: MdNode, ctx: Context): HastChild[] {
  switch (node.type) {
    case "root":
      return wrap(all(node.children, ctx), false);
    case "paragraph":
      return [element("p", {}, all(node.children, ctx))];
    case "heading":
      return [element(`h${node.depth ?? 1}`, {}, all(node.children, ctx))];
    case "thematicBreak":
      return [element("hr", {})];
    case "blockquote":
      return [element("blockquote", {}, wrap(all(node.children, ctx), true))];
    case "list": {
      const loose =
        node.spread === true || (node.children ?? []).some((item) => item.spread === true);
      const properties: HastProperties = {};
      if (node.ordered && node.start != null && node.start !== 1) properties.start = node.start;
      if ((node.children ?? []).some((item) => typeof item.checked === "boolean")) {
        properties.className = ["contains-task-list"];
      }
      const items = (node.children ?? []).map((item) => listItem(item, loose, ctx));
      return [element(node.ordered ? "ol" : "ul", properties, wrap(items, true))];
    }
    case "code": {
      const value = node.value ? `${node.value}\n` : "";
      const properties: HastProperties = node.lang ? { className: [`language-${node.lang}`] } : {};
      return [element("pre", { tabIndex: 0 }, [element("code", properties, [text(value)])])];
    }
    case "inlineCode":
      return [element("code", {}, [text(node.value ?? "")])];
    case "emphasis":
      return [element("em", {}, all(node.children, ctx))];
    case "strong":
      return [element("strong", {}, all(node.children, ctx))];
    case "delete":
      return [element("del", {}, all(node.children, ctx))];
    case "link": {
      const properties: HastProperties = { href: safeUrl(node.url ?? "") };
      if (node.title) properties.title = node.title;
      return [element("a", properties, all(node.children, ctx))];
    }
    case "image": {
      const properties: HastProperties = { src: safeUrl(node.url ?? ""), alt: node.alt ?? "" };
      if (node.title) properties.title = node.title;
      return [element("img", properties)];
    }
    case "linkReference": {
      const definition = ctx.definitions.get((node.identifier ?? "").toLowerCase());
      if (!definition) {
        return [text("["), ...all(node.children, ctx), text("]")];
      }
      const properties: HastProperties = { href: safeUrl(definition.url) };
      if (definition.title) properties.title = definition.title;
      return [element("a", properties, all(node.children, ctx))];
    }
    case "imageReference": {
      const definition = ctx.definitions.get((node.identifier ?? "").toLowerCase());
      if (!definition) return [text(`![${node.alt ?? ""}]`)];
      const properties: HastProperties = {
        src: safeUrl(definition.url),
        alt: node.alt ?? "",
      };
      if (definition.title) properties.title = definition.title;
      return [element("img", properties)];
    }
    case "text":
      return [text(node.value ?? "")];
    case "break":
      return [element("br", {}), text("\n")];
    case "html":
      // No rehype-raw: markup in the source is shown as text, never as elements.
      return [text(node.value ?? "")];
    case "table":
      return [table(node, ctx)];
    case "definition":
      return [];
    default:
      if (node.children) return [element("div", {}, all(node.children, ctx))];
      return node.value !== undefined ? [text(node.value)] : [];
  }
}

/**
 * One markdown block, as the hast children react-markdown would draw for it,
 * with `plugins` (for example `[rehypeHighlight]`) run over the result.
 */
export function markdownToHast(source: string, plugins?: PluggableList): HastChild[] {
  const tree = parser.parse(source) as unknown as MdNode;
  const definitions = new Map<string, Definition>();
  collectDefinitions(tree, definitions);
  const children = one(tree, { definitions });
  if (!plugins || plugins.length === 0) return children;
  const root = unified()
    .use(plugins)
    .runSync({ type: "root", children } as never) as unknown as { children: HastChild[] };
  return root.children;
}
