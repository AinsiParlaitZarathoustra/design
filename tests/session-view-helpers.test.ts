// @vitest-environment happy-dom
import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  EMPTY_SPLIT,
  isIncompleteCodeFence,
  splitIncremental,
  splitTopLevelBlocks,
} from "../src/components/session/markdown-blocks.ts";
import {
  formatBytes,
  formatDuration,
  statusIconOf,
  stripAnsi,
  toolKindOf,
  useWindow,
} from "../src/components/session/session-view-helpers.ts";
import type { SessionPhase } from "../src/components/session/session-view.ts";

describe("toolKindOf", () => {
  it.each([
    ["Bash", "execute"],
    ["shell", "execute"],
    ["str_replace", "edit"],
    ["str_replace_editor", "edit"],
    ["Write", "edit"],
    ["MultiEdit", "edit"],
    ["WebFetch", "fetch"],
    ["web-search", "fetch"],
    ["Read", "read"],
    ["Grep", "search"],
    ["Glob", "search"],
    ["TodoWrite", "think"],
    ["think", "think"],
    ["mv", "move"],
    ["Move", "move"],
    ["Delete", "delete"],
    ["mcp__linear__get_issue", "other"],
  ])("%s is %s", (name, kind) => {
    expect(toolKindOf(name)).toBe(kind);
  });

  it("takes a valid ACP kind over the name", () => {
    expect(toolKindOf("Bash", "read")).toBe("read");
  });

  it("ignores an ACP kind that is not a ToolKind", () => {
    expect(toolKindOf("Bash", "switch_mode")).toBe("execute");
    expect(toolKindOf("Bash", null)).toBe("execute");
  });
});

describe("statusIconOf", () => {
  it.each<[SessionPhase, string]>([
    ["queued", "queued"],
    ["running", "live"],
    ["waiting", "live"],
    ["done", "done"],
    ["cancelled", "done"],
    ["failed", "failed"],
  ])("%s is %s", (phase, icon) => {
    expect(statusIconOf(phase)).toBe(icon);
  });
});

describe("stripAnsi", () => {
  it("removes SGR colour", () => {
    expect(stripAnsi("\u001b[31mred\u001b[0m and \u001b[1;32mbold green\u001b[0m")).toBe(
      "red and bold green",
    );
  });
  it("removes cursor movement", () => {
    expect(stripAnsi("a\u001b[2Kb\u001b[1Ac\u001b[10;20H")).toBe("abc");
  });
  it("removes an OSC 8 hyperlink, BEL- and ST-terminated", () => {
    expect(stripAnsi("\u001b]8;;https://example.com\u0007link\u001b]8;;\u0007")).toBe("link");
    expect(stripAnsi("\u001b]8;;https://example.com\u001b\\link\u001b]8;;\u001b\\")).toBe("link");
  });
  it("leaves plain text alone", () => {
    expect(stripAnsi("plain [text] 100%")).toBe("plain [text] 100%");
  });
});

describe("formatDuration and formatBytes", () => {
  it("formats durations", () => {
    expect(formatDuration(850)).toBe("850ms");
    expect(formatDuration(4200)).toBe("4.2s");
    expect(formatDuration(72_000)).toBe("1m 12s");
    expect(formatDuration(3_780_000)).toBe("1h 3m");
  });
  it("formats bytes", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(4300)).toBe("4.2 KB");
    expect(formatBytes(482113)).toBe("470.8 KB");
    expect(formatBytes(1_363_149)).toBe("1.3 MB");
  });
});

describe("splitTopLevelBlocks", () => {
  it("splits top-level blocks by source offset", () => {
    expect(splitTopLevelBlocks("# Title\n\npara\n\n- a\n- b\n")).toEqual([
      "# Title",
      "para",
      "- a\n- b",
    ]);
  });
  it("keeps a single block whole", () => {
    expect(splitTopLevelBlocks("just one paragraph")).toEqual(["just one paragraph"]);
  });
  it("keeps an open fence as one block", () => {
    expect(splitTopLevelBlocks("before\n\n```ts\nconst x = 1;\n\nconst y = 2;\n")).toEqual([
      "before",
      "```ts\nconst x = 1;\n\nconst y = 2;\n",
    ]);
  });
});

describe("isIncompleteCodeFence", () => {
  it("is true for an unclosed fence", () => {
    expect(isIncompleteCodeFence("```ts\nconst x = 1;")).toBe(true);
    expect(isIncompleteCodeFence("~~~\nx")).toBe(true);
  });
  it("is false for a closed fence or no fence", () => {
    expect(isIncompleteCodeFence("```ts\nconst x = 1;\n```")).toBe(false);
    expect(isIncompleteCodeFence("````\n```\nx\n````")).toBe(false);
    expect(isIncompleteCodeFence("plain text")).toBe(false);
  });
  it("needs a closing fence at least as long as the opener", () => {
    expect(isIncompleteCodeFence("````\nx\n```")).toBe(true);
  });
});

// Desktop's `markdown-blocks-incremental.test.ts`.
function streamed(doc: string): string[] {
  let carry = EMPTY_SPLIT;
  for (let i = 1; i <= doc.length; i++) carry = splitIncremental(doc.slice(0, i), carry);
  return carry.blocks;
}

const DOCS: Record<string, string> = {
  setext: "A paragraph here\nthat continues\n---\n\nnext para\n",
  lazyContinuation: "para one\n\npara two\nlazily continued\nand more\n",
  looseList: "intro\n\n- one\n- two\n\n- three after blank\n\nafter\n",
  nestedList: "intro\n\n- a\n  - b\n  - c\n- d\n\nend\n",
  openFence: "before\n\n```ts\nconst x = 1;\nconst y = 2;\n",
  closedFence: "before\n\n```ts\nconst x = 1;\n```\n\nafter\n",
  blockquote: "intro\n\n> quoted\n> more quote\n\nout\n",
  table: "intro\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\nafter\n",
  headings: "# H1\n\ntext\n\n## H2\n\nmore\n\n### H3\n\nlast\n",
  thematicBreak: "one\n\n***\n\ntwo\n\n___\n\nthree\n",
  htmlBlock: "intro\n\n<div>\n  <p>hi</p>\n</div>\n\nafter\n",
  mixed:
    "# Title\n\nSome prose.\n\n- a\n- b\n\n```js\nfoo();\n```\n\n> note\n\n| x | y |\n|---|---|\n| 1 | 2 |\n\nTrailing para\nwith lazy line\n---\n\nEnd.\n",
  // Repeated and lookalike blocks: a splitter that found the last-but-one block
  // by searching for its text duplicated or truncated blocks on these.
  repeatedBlock: "intro\n\nok\n\nok\n\nok\n",
  lastBlockContainsPrev: "alpha\n\nfoo\n\nfoo bar foo\n",
  tinyBlockAfterBigGap: "para\n\n\n\n\n\nx\n\nnext\n",
  identicalTail: "a\n\nb\n\nb\n",
  blankHeavy: "\n\n\none\n\n\n\n\ntwo\n\n\n",
  repeatedListItems: "- a\n- a\n\n- a\n- a\n",
  sameParaTwice: "same\n\nsame\n",
  prefixOfLater: "ab\n\nabc\n\nabcd\n",
};

describe("splitIncremental equals a full split at every prefix", () => {
  for (const [name, doc] of Object.entries(DOCS)) {
    it(name, () => {
      let carry = EMPTY_SPLIT;
      for (let i = 1; i <= doc.length; i++) {
        const prefix = doc.slice(0, i);
        carry = splitIncremental(prefix, carry);
        expect(carry.blocks, `prefix length ${i}: ${JSON.stringify(prefix)}`).toEqual(
          splitTopLevelBlocks(prefix),
        );
      }
    });
  }

  it("re-splits in full when the source shrinks", () => {
    let carry = splitIncremental("a\n\nb\n\nc\n\nd\n", EMPTY_SPLIT);
    carry = splitIncremental("a\n\nb\n", carry);
    expect(carry.blocks).toEqual(splitTopLevelBlocks("a\n\nb\n"));
  });

  it("re-splits in full when the source is replaced rather than appended to", () => {
    let carry = splitIncremental("# A\n\npara one\n\npara two\n", EMPTY_SPLIT);
    carry = splitIncremental("totally different\n\nsecond\n\nthird\n", carry);
    expect(carry.blocks).toEqual(splitTopLevelBlocks("totally different\n\nsecond\n\nthird\n"));
  });

  it("matches on the full documents too", () => {
    for (const doc of Object.values(DOCS)) expect(streamed(doc)).toEqual(splitTopLevelBlocks(doc));
  });
});

describe("useWindow", () => {
  const original = globalThis.IntersectionObserver;
  afterEach(() => {
    globalThis.IntersectionObserver = original;
  });

  it("renders everything without IntersectionObserver", () => {
    // @ts-expect-error -- SSR and jsdom have none
    delete globalThis.IntersectionObserver;
    const { result } = renderHook(() => useWindow({ count: 500 }));
    expect(result.current.start).toBe(0);
    expect(result.current.end).toBe(500);
  });

  it("windows the first rows down, and the last rows up", () => {
    if (typeof original === "undefined") return;
    expect(renderHook(() => useWindow({ count: 500 })).result.current).toMatchObject({
      start: 0,
      end: 80,
    });
    expect(renderHook(() => useWindow({ count: 500, grow: "up" })).result.current).toMatchObject({
      start: 420,
      end: 500,
    });
    expect(renderHook(() => useWindow({ count: 30 })).result.current).toMatchObject({
      start: 0,
      end: 30,
    });
  });
});
