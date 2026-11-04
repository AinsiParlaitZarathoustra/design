import { readFileSync } from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import { describe, expect, it } from "vitest";
import {
  ANSI_BG_CLASS,
  ANSI_NAMES,
  ANSI_TEXT_CLASS,
  SYNTAX_TEXT_CLASS,
  collapseSegments,
  formatDuration,
  highlightRanges,
  pathSegments,
  segmentClassName,
  type TerminalLine,
  type TerminalSegment,
} from "../src/components/code-surface/code-surface.ts";

/**
 * The code surfaces' helpers, and the one thing about their classes nothing
 * else can see: a utility like `text-syntax-keyword` needs a `--color-` entry
 * in the package's Tailwind bridge, or it compiles to nothing and the text
 * renders uncoloured with every gate green.
 */

const BRIDGE = readFileSync(
  path.join(import.meta.dirname, "..", "src", "styles", "utilities.css"),
  "utf8",
);
const COLOUR_UTILITY =
  /^(?:text|bg|border(?:-[trblxy])?|ring|outline|fill|stroke|decoration)-(.+)$/;

/** Every class names a colour the package bridges to Tailwind. */
function expectBridged(classes: readonly string[]) {
  for (const cls of classes) {
    const utility = cls.split(":").pop()!;
    const name = COLOUR_UTILITY.exec(utility)?.[1];
    expect(name, `${cls} is not a colour utility`).toBeDefined();
    expect(BRIDGE, `--color-${name} is not bridged (${cls})`).toMatch(
      new RegExp(`--color-${name}:`),
    );
  }
}

describe("pathSegments", () => {
  it("splits a path and drops empty parts", () => {
    expect(pathSegments("/a//b/c.ts")).toEqual(["a", "b", "c.ts"]);
  });
  it("strips a root the path is inside", () => {
    expect(pathSegments("/a/b/src/x.ts", "/a/b")).toEqual(["src", "x.ts"]);
    expect(pathSegments("/a/b/src/x.ts", "/a/b/")).toEqual(["src", "x.ts"]);
  });
  it("does not strip a root that is only a prefix of a folder name", () => {
    expect(pathSegments("/a/bc/x", "/a/b")).toEqual(["a", "bc", "x"]);
  });
  it("is empty for the root itself", () => {
    expect(pathSegments("/a/b", "/a/b")).toEqual([]);
  });
});

describe("collapseSegments", () => {
  const labels = (n: number) => Array.from({ length: n }, (_, i) => `s${i}`);
  const shape = (n: number) =>
    collapseSegments(labels(n)).map((s) =>
      s.kind === "segment" ? s.label : `…${s.hidden.join(",")}`,
    );

  it("keeps a short path whole", () => {
    expect(shape(1)).toEqual(["s0"]);
    expect(shape(4)).toEqual(["s0", "s1", "s2", "s3"]);
  });
  it("keeps the first and the last two, and folds the middle", () => {
    expect(shape(5)).toEqual(["s0", "…s1,s2", "s3", "s4"]);
    expect(shape(9)).toEqual(["s0", "…s1,s2,s3,s4,s5,s6", "s7", "s8"]);
  });
  it("keeps each segment's index", () => {
    const last = collapseSegments(labels(9)).at(-1);
    expect(last).toEqual({ kind: "segment", label: "s8", index: 8 });
  });
});

describe("formatDuration", () => {
  it.each([
    [0, "0ms"],
    [850, "850ms"],
    [999, "999ms"],
    [999.6, "1.0s"],
    [1000, "1.0s"],
    [4200, "4.2s"],
    [9949, "9.9s"],
    [9950, "10s"],
    [59499, "59s"],
    [59500, "1m 0s"],
    [59999, "1m 0s"],
    [72000, "1m 12s"],
    [119600, "2m 0s"],
    [3780000, "1h 3m"],
  ])("%i ms is %s", (ms, text) => {
    expect(formatDuration(ms)).toBe(text);
  });
});

describe("class tables", () => {
  it("has the fifteen syntax roles, all bridged", () => {
    expect(Object.keys(SYNTAX_TEXT_CLASS)).toHaveLength(15);
    expectBridged(Object.values(SYNTAX_TEXT_CLASS));
  });
  it("has sixteen ANSI slots on each side, all bridged", () => {
    expect(ANSI_NAMES).toHaveLength(16);
    expect(ANSI_TEXT_CLASS).toHaveLength(16);
    expect(ANSI_BG_CLASS).toHaveLength(16);
    ANSI_NAMES.forEach((name, i) => {
      expect(ANSI_TEXT_CLASS[i]).toBe(`text-terminal-ansi-${name}`);
      expect(ANSI_BG_CLASS[i]).toBe(`bg-terminal-ansi-${name}`);
    });
    expectBridged([...ANSI_TEXT_CLASS, ...ANSI_BG_CLASS]);
  });
  it("bridges the editor and terminal roles the components use", () => {
    expectBridged([
      "text-terminal-background",
      "bg-terminal-foreground",
      "bg-terminal-cursor",
      "bg-terminal-selection",
      "bg-search-match-background",
      "bg-search-match-active-background",
      "bg-editor-background",
      "text-editor-foreground",
      "bg-editor-gutter-background",
      "text-editor-gutter-foreground",
      "bg-editor-active-line-background",
      "text-editor-active-line-gutter-foreground",
      "bg-editor-selection-background",
      "bg-editor-match-bracket-background",
      "outline-editor-match-bracket-border",
      "bg-editor-caret",
      "bg-diff-added-text",
      "border-diff-removed-text",
    ]);
  });
});

describe("highlightRanges", () => {
  it("finds nothing in or for an empty string", () => {
    expect(highlightRanges("", "x")).toEqual([]);
    expect(highlightRanges("abc", "")).toEqual([]);
  });
  it("matches case-insensitively, left to right", () => {
    expect(highlightRanges("Src src SRC", "src")).toEqual([
      [0, 3],
      [4, 7],
      [8, 11],
    ]);
  });
  it("indexes the original text, even where lower-casing changes a length", () => {
    expect(highlightRanges("\u0130 i", "i")).toEqual([[2, 3]]);
    expect(highlightRanges("a.b a+b", ".")).toEqual([[1, 2]]);
  });
  it("never overlaps", () => {
    expect(highlightRanges("aaaa", "aa")).toEqual([
      [0, 2],
      [2, 4],
    ]);
  });
});

describe("segmentClassName", () => {
  it("is undefined for a plain segment", () => {
    expect(segmentClassName({ text: "x" })).toBeUndefined();
  });
  it("colours the foreground", () => {
    expect(segmentClassName({ text: "x", fg: 1 })).toBe("text-terminal-ansi-red");
  });
  it("swaps the colours when inverse", () => {
    expect(segmentClassName({ text: "x", fg: 1, bg: 4, inverse: true })).toBe(
      "text-terminal-ansi-blue bg-terminal-ansi-red",
    );
  });
  it("uses the terminal's own colours for an inverse segment with none", () => {
    expect(segmentClassName({ text: "x", inverse: true })).toBe(
      "text-terminal-background bg-terminal-foreground",
    );
  });
  it("sets weight and dimming", () => {
    expect(segmentClassName({ text: "x", bold: true, dim: true })).toBe("font-semibold opacity-60");
  });
  it("marks a link", () => {
    expect(segmentClassName({ text: "x", kind: "url" })).toBe(
      "cursor-pointer hover:text-primary hover:underline",
    );
  });
});

describe("TerminalSegment", () => {
  it("takes desktop's runs without a cast", () => {
    // Desktop's shapes (`ansi-to-segments.ts`, `linkify-paths.ts`), restated.
    interface AnsiSegment {
      text: string;
      style?: CSSProperties;
    }
    interface LinkedRun {
      text: string;
      kind: "url" | "path" | "text";
      target?: string;
      style?: CSSProperties;
    }
    const ansi: AnsiSegment = { text: "a", style: { color: "var(--terminal-ansi-red)" } };
    const linked: LinkedRun = { text: "src/app.tsx", kind: "path", target: "src/app.tsx" };
    const segments: TerminalSegment[] = [
      ansi,
      linked,
      { text: "b", kind: "path", target: "b", style: { color: "var(--terminal-ansi-red)" } },
    ];
    const line: TerminalLine = { id: 1, segments };
    expect(line.segments).toHaveLength(3);
  });
});
