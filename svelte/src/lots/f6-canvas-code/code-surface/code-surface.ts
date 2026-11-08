/**
 * The code surfaces' shared half, with no React in it: the class tables, the
 * path and duration helpers, and the terminal's segment model.
 *
 * Ported from `src/components/code-surface/code-surface.ts`.
 *
 * Every class here is a whole literal string. Tailwind finds classes by
 * reading the source, so `text-syntax-${role}` would compile to nothing and
 * render uncoloured, with no error anywhere.
 */

// ── Syntax roles ─────────────────────────────────────────────────────────────

/** The theme's `syntax.*` keys, one per highlighting role. */
export type SyntaxRole =
  | "attribute"
  | "comment"
  | "constant"
  | "definition"
  | "escape"
  | "function"
  | "keyword"
  | "number"
  | "operator"
  | "property"
  | "regexp"
  | "string"
  | "tag"
  | "type"
  | "variable";

export const SYNTAX_TEXT_CLASS: Readonly<Record<SyntaxRole, string>> = {
  attribute: "text-syntax-attribute",
  comment: "text-syntax-comment",
  constant: "text-syntax-constant",
  definition: "text-syntax-definition",
  escape: "text-syntax-escape",
  function: "text-syntax-function",
  keyword: "text-syntax-keyword",
  number: "text-syntax-number",
  operator: "text-syntax-operator",
  property: "text-syntax-property",
  regexp: "text-syntax-regexp",
  string: "text-syntax-string",
  tag: "text-syntax-tag",
  type: "text-syntax-type",
  variable: "text-syntax-variable",
};

// ── Paths ────────────────────────────────────────────────────────────────────

/**
 * A path's parts, for breadcrumbs. With `root`, the root is stripped only when
 * the path is the root itself or strictly inside it: `/a/b` is not a root of
 * `/a/bc/x`, which a bare `startsWith` would have said it was.
 */
export function pathSegments(path: string, root?: string): string[] {
  let rest = path;
  if (root) {
    const base = root.endsWith("/") ? root.slice(0, -1) : root;
    if (path === base || path === root) rest = "";
    else if (path.startsWith(`${base}/`)) rest = path.slice(base.length + 1);
  }
  return rest.split("/").filter(Boolean);
}

export type CollapsedSegment =
  | { kind: "segment"; label: string; index: number }
  | { kind: "ellipsis"; hidden: string[] };

/**
 * At most `max` crumbs: the first, one ellipsis standing for the middle, and
 * the last `max - 2`. A list that fits comes back whole. `max` below 3 is
 * read as 3, the fewest that leave room for the ellipsis.
 */
export function collapseSegments(segments: readonly string[], max = 4): CollapsedSegment[] {
  const all = segments.map((label, index) => ({ kind: "segment" as const, label, index }));
  const limit = Math.max(3, max);
  if (segments.length <= limit) return all;
  const tail = limit - 2;
  return [
    all[0]!,
    { kind: "ellipsis", hidden: segments.slice(1, segments.length - tail) },
    ...all.slice(segments.length - tail),
  ];
}

// ── Duration ─────────────────────────────────────────────────────────────────

/**
 * "850ms" / "4.2s" / "12s" / "1m 12s" / "1h 3m": a terminal block's duration.
 * Seconds round once, before minutes are split off, so 59,999 ms is "1m 0s",
 * never "60s".
 */
export function formatDuration(ms: number): string {
  // Below 999.5 so a value that rounds to 1000 reads "1.0s", not "1000ms".
  if (ms < 999.5) return `${Math.round(ms)}ms`;
  if (ms < 9950) return `${(ms / 1000).toFixed(1)}s`;
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m ${s % 60}s`;
  return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;
}

// ── ANSI colours ─────────────────────────────────────────────────────────────

/** An ANSI palette slot: 0–7 normal, 8–15 bright. */
export type AnsiIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export const ANSI_NAMES = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "bright-black",
  "bright-red",
  "bright-green",
  "bright-yellow",
  "bright-blue",
  "bright-magenta",
  "bright-cyan",
  "bright-white",
] as const;

export const ANSI_TEXT_CLASS: readonly string[] = [
  "text-terminal-ansi-black",
  "text-terminal-ansi-red",
  "text-terminal-ansi-green",
  "text-terminal-ansi-yellow",
  "text-terminal-ansi-blue",
  "text-terminal-ansi-magenta",
  "text-terminal-ansi-cyan",
  "text-terminal-ansi-white",
  "text-terminal-ansi-bright-black",
  "text-terminal-ansi-bright-red",
  "text-terminal-ansi-bright-green",
  "text-terminal-ansi-bright-yellow",
  "text-terminal-ansi-bright-blue",
  "text-terminal-ansi-bright-magenta",
  "text-terminal-ansi-bright-cyan",
  "text-terminal-ansi-bright-white",
];

export const ANSI_BG_CLASS: readonly string[] = [
  "bg-terminal-ansi-black",
  "bg-terminal-ansi-red",
  "bg-terminal-ansi-green",
  "bg-terminal-ansi-yellow",
  "bg-terminal-ansi-blue",
  "bg-terminal-ansi-magenta",
  "bg-terminal-ansi-cyan",
  "bg-terminal-ansi-white",
  "bg-terminal-ansi-bright-black",
  "bg-terminal-ansi-bright-red",
  "bg-terminal-ansi-bright-green",
  "bg-terminal-ansi-bright-yellow",
  "bg-terminal-ansi-bright-blue",
  "bg-terminal-ansi-bright-magenta",
  "bg-terminal-ansi-bright-cyan",
  "bg-terminal-ansi-bright-white",
];

// ── Terminal segments ────────────────────────────────────────────────────────

/** A `style` record as an inline CSS string, for a Svelte `style=` attribute. */
export function styleText(style: Record<string, string | number> | undefined): string | undefined {
  if (!style) return undefined;
  return Object.entries(style)
    .map(([key, value]) => `${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}: ${value}`)
    .join("; ");
}

export type TerminalLinkKind = "url" | "path";

/**
 * One styled run of terminal output. Two ways to colour it, which can mix:
 * `fg`/`bg` and the flags pick the package's classes, and `style` passes
 * through untouched, so a line emulator that already emits
 * `{ color: "var(--terminal-ansi-red)" }` (desktop's `AnsiSegment` and
 * `LinkedRun` are both assignable) recolours with the theme on its own.
 *
 * `kind` marks a link; `target` is the whole link when it spans several runs
 * (a URL a tool prints in two colours), which is what activating it opens.
 */
export interface TerminalSegment {
  text: string;
  fg?: AnsiIndex;
  bg?: AnsiIndex;
  bold?: boolean;
  dim?: boolean;
  italic?: boolean;
  underline?: boolean;
  inverse?: boolean;
  style?: Record<string, string | number>;
  kind?: "text" | TerminalLinkKind;
  target?: string;
}

export interface TerminalLine {
  /** Stable for the row's life: the React key, and what lets its memo hold. */
  id?: string | number;
  segments: readonly TerminalSegment[];
}

/**
 * The classes for one segment, or `undefined` when it has none. `inverse`
 * swaps the colours; with no colour on a side, the swap takes the terminal's
 * own foreground or background for it.
 */
export function segmentClassName(segment: TerminalSegment): string | undefined {
  const classes: string[] = [];
  let fg: AnsiIndex | undefined = segment.fg;
  let bg: AnsiIndex | undefined = segment.bg;
  if (segment.inverse) {
    [fg, bg] = [bg, fg];
    classes.push(fg === undefined ? "text-terminal-background" : ANSI_TEXT_CLASS[fg]!);
    classes.push(bg === undefined ? "bg-terminal-foreground" : ANSI_BG_CLASS[bg]!);
  } else {
    if (fg !== undefined) classes.push(ANSI_TEXT_CLASS[fg]!);
    if (bg !== undefined) classes.push(ANSI_BG_CLASS[bg]!);
  }
  if (segment.bold) classes.push("font-semibold");
  if (segment.dim) classes.push("opacity-60");
  if (segment.italic) classes.push("italic");
  if (segment.underline) classes.push("underline");
  if (segment.kind === "url" || segment.kind === "path") {
    classes.push("cursor-pointer hover:text-primary hover:underline");
  }
  return classes.length ? classes.join(" ") : undefined;
}

/**
 * Where `query` occurs in `text`, case-insensitively: `[start, end)` pairs,
 * left to right, never overlapping. An empty query matches nothing.
 */
export function highlightRanges(text: string, query: string): Array<[number, number]> {
  if (!query || !text) return [];
  // A case-insensitive search over `text` itself: lower-casing first would
  // shift indices wherever a character changes length when lower-cased ("İ").
  const pattern = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return Array.from(text.matchAll(pattern), (m): [number, number] => [
    m.index,
    m.index + m[0].length,
  ]);
}
