import type { TerminalLine } from "../../../src/components/code-surface/code-surface.ts";

/** Terminal output for the stories: frozen, ASCII, stable line ids. */

const freeze = (lines: TerminalLine[]): readonly TerminalLine[] =>
  Object.freeze(lines.map((l) => Object.freeze({ ...l, segments: Object.freeze(l.segments) })));

/** Colours and weights, both as classes (`fg`) and as theme variables (`style`). */
export const STYLED_RUNS = freeze([
  {
    id: "s1",
    segments: [
      { text: " PASS ", fg: 0, bg: 2, bold: true },
      { text: " src/lib/format-duration.test.ts " },
      { text: "(12 tests)", dim: true },
    ],
  },
  {
    id: "s2",
    segments: [
      { text: " FAIL ", fg: 0, bg: 1, bold: true },
      { text: " src/lib/line-emulator.test.ts" },
    ],
  },
  {
    id: "s3",
    segments: [
      { text: "  expected ", dim: true },
      { text: "'1m 0s'", style: { color: "var(--terminal-ansi-green)" } },
      { text: " received ", dim: true },
      { text: "'60s'", style: { color: "var(--terminal-ansi-red)" } },
    ],
  },
  {
    id: "s4",
    segments: [
      { text: "warning", fg: 3, bold: true },
      { text: ": unused variable ", italic: true },
      { text: "`cap`", underline: true },
    ],
  },
]);

/** A URL a tool prints in two runs, sharing one target, and a file path. */
export const LINKED = freeze([
  {
    id: "l1",
    segments: [{ text: "  VITE v8.3.5  ready in 312 ms", fg: 2 }],
  },
  { id: "l2", segments: [] },
  {
    id: "l3",
    segments: [
      { text: "  Local:   " },
      { text: "http://localhost:", fg: 6, kind: "url", target: "http://localhost:5173/" },
      { text: "5173/", fg: 6, bold: true, kind: "url", target: "http://localhost:5173/" },
    ],
  },
  {
    id: "l4",
    segments: [
      { text: "  error in " },
      { text: "src/app.tsx:12:4", kind: "path", target: "src/app.tsx:12:4" },
    ],
  },
]);

/** Reverse video, with and without colours of its own. */
export const INVERSE = freeze([
  {
    id: "i1",
    segments: [
      { text: " NORMAL ", inverse: true, bold: true },
      { text: " README.md " },
      { text: " 3:14 ", fg: 4, inverse: true },
    ],
  },
  {
    id: "i2",
    segments: [{ text: " selected row ", fg: 7, bg: 4, inverse: true }],
  },
]);
