/**
 * The canvas and code-surface stories' data, ported from the oracle's
 * `stories/components/canvas/fixtures.ts`, `code-surface/editor.fixtures.ts`
 * and `code-surface/terminal-output.fixtures.ts`. Values are the same.
 */
import type { CanvasBounds, CanvasPageRow, PresencePeer } from "./canvas/types";
import type { EditorPreviewLine } from "./code-surface/editor-preview.svelte";
import {
  ANSI_NAMES,
  type AnsiIndex,
  type TerminalLine,
  type TerminalSegment,
} from "./code-surface/code-surface";
import { ACTOR_COLOUR_HUE, actorHue } from "../../lib/actor-hue";
import { HUES } from "../../lib/hue";

/** Peers take their hue the way the apps do: from the wire colour their client published, through `actorHue`. */
const WIRE = Object.keys(ACTOR_COLOUR_HUE);

const peer = (id: string, name: string, wire: number | null): PresencePeer => ({
  id,
  name,
  hue: actorHue({ id, colour: wire === null ? null : WIRE[wire] }),
});

export const LONG_NAME = "Maximiliana Oyelaran-Featherstonehaugh";

export const PEERS: PresencePeer[] = [
  peer("actor_ana", "Ana Ruiz", 5),
  peer("actor_kofi", "Kofi Mensah", 3),
  peer("actor_mei", "Mei Tanaka", 6),
  peer("actor_omar", "Omar Haddad", 1),
];

export const MANY_PEERS: PresencePeer[] = [
  ...PEERS,
  peer("actor_lena", "Lena Fischer", 4),
  peer("actor_raj", "Raj Patel", 2),
  peer("actor_long", LONG_NAME, null),
];

export const SELF = { name: "Sam Okafor" };

export const SWITCHER_PAGES = [
  { id: "p-roadmap", name: "Roadmap" },
  { id: "p-launch", name: "Launch plan" },
  { id: "p-retro", name: "Retro" },
];

export const PAGE_ROWS: CanvasPageRow[] = [
  { id: "p-roadmap", kind: "page", name: "Roadmap", subtitle: "Updated 5m ago" },
  { id: "f-research", kind: "folder", name: "Research", subtitle: "Updated 2h ago" },
  { id: "p-interviews", kind: "page", name: "Interviews", subtitle: "Updated 3h ago", depth: 1 },
  { id: "p-retro", kind: "page", name: "Retro", subtitle: "Updated yesterday" },
];

export const LOCAL_PAGE_ROWS: CanvasPageRow[] = [
  { id: "l-board", kind: "page", name: "Board", icon: "📜" },
  { id: "l-arch", kind: "page", name: "Architecture", icon: "🏗️" },
  { id: "l-ideas", kind: "page", name: "Ideas", icon: "💡" },
];

export const LONG_BODY =
  "The sync layer holds edits while the socket is down and replays them in order when it reconnects. " +
  "Two people typing in one note merge character by character, so nobody's sentence is clobbered. " +
  "What is still open: how long a held edit may wait before we warn, and what the warning says to you.";

export type BoardNode =
  | { id: string; kind: "note"; bounds: CanvasBounds; title: string; body: string }
  | { id: string; kind: "text"; bounds: CanvasBounds; text: string }
  | { id: string; kind: "shape"; bounds: CanvasBounds; shape: "rectangle" | "rounded" | "ellipse" | "diamond" | "triangle"; label: string }
  | { id: string; kind: "frame"; bounds: CanvasBounds; label: string }
  | { id: string; kind: "media"; bounds: CanvasBounds };

/** A board: two notes, a text, every shape, a frame and an image. */
export const BOARD: BoardNode[] = [
  { id: "frame", kind: "frame", bounds: { x: 40, y: 72, w: 600, h: 300 }, label: "Sync design" },
  { id: "note-1", kind: "note", bounds: { x: 64, y: 96, w: 260, h: 200 }, title: "Offline edits", body: LONG_BODY },
  {
    id: "note-2",
    kind: "note",
    bounds: { x: 352, y: 96, w: 240, h: 140 },
    title: "Open question",
    body: "Do we show held edits in the header pill?",
  },
  { id: "text", kind: "text", bounds: { x: 352, y: 256, w: 260, h: 40 }, text: "Ship by Friday" },
  { id: "s-rect", kind: "shape", bounds: { x: 680, y: 96, w: 120, h: 72 }, shape: "rectangle", label: "Client" },
  { id: "s-rounded", kind: "shape", bounds: { x: 840, y: 96, w: 120, h: 72 }, shape: "rounded", label: "Relay" },
  { id: "s-ellipse", kind: "shape", bounds: { x: 680, y: 208, w: 120, h: 80 }, shape: "ellipse", label: "Doc" },
  { id: "s-diamond", kind: "shape", bounds: { x: 840, y: 200, w: 120, h: 96 }, shape: "diamond", label: "Held?" },
  { id: "s-triangle", kind: "shape", bounds: { x: 760, y: 328, w: 112, h: 96 }, shape: "triangle", label: "" },
  { id: "media", kind: "media", bounds: { x: 64, y: 408, w: 240, h: 150 } },
];

export const BOARD_BOUNDS: CanvasBounds[] = BOARD.map((n) => n.bounds);

/** A stand-in image as an SVG data URL, so the media story needs no file. */
export const IMAGE_SRC = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 150"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="slateblue"/><stop offset="1" stop-color="orchid"/></linearGradient></defs><rect width="240" height="150" fill="url(#g)"/><circle cx="180" cy="46" r="18" fill="gold"/><path d="M0 150 L80 70 L140 130 L180 100 L240 150 Z" fill="midnightblue" opacity="0.6"/></svg>`,
)}`;

export const PRESENCE_NAMES = [
  "Ana Ruiz",
  "Omar Haddad",
  "Lena Fischer",
  "Kofi Mensah",
  "Raj Patel",
  "Mei Tanaka",
  "Priya Nair",
  "Tomás Silva",
];

/** Every identity hue a peer can be: grey never is. */
export const PRESENCE_HUES = HUES.filter((h) => h !== "grey");

// ── Code surfaces ───────────────────────────────────────────────────────────

/** A highlighted excerpt of desktop's `format-duration.ts`, for the editor stories. */
export const SAMPLE: readonly EditorPreviewLine[] = [
  { tokens: [{ text: "// The block header's duration format.", role: "comment" }] },
  {
    fold: "open",
    tokens: [
      { text: "export", role: "keyword" },
      { text: " " },
      { text: "function", role: "keyword" },
      { text: " " },
      { text: "formatDuration", role: "function" },
      { text: "(", role: "operator" },
      { text: "ms", role: "variable" },
      { text: ": ", role: "operator" },
      { text: "number", role: "type" },
      { text: "): ", role: "operator" },
      { text: "string", role: "type" },
      { text: " {", role: "operator" },
    ],
  },
  {
    change: "modified",
    tokens: [
      { text: "  " },
      { text: "if", role: "keyword" },
      { text: " (", role: "operator" },
      { text: "ms", role: "variable" },
      { text: " < ", role: "operator" },
      { text: "1000", role: "number" },
      { text: ") ", role: "operator" },
      { text: "return", role: "keyword" },
      { text: " " },
      { text: "`${", role: "string" },
      { text: "ms", role: "variable" },
      { text: "}ms`", role: "string" },
      { text: ";", role: "operator" },
    ],
  },
  {
    change: "added",
    tokens: [
      { text: "  " },
      { text: "const", role: "keyword" },
      { text: " " },
      { text: "s", role: "definition" },
      { text: " = ", role: "operator" },
      { text: "Math", role: "type" },
      { text: "." },
      { text: "round", role: "property" },
      { text: "(", role: "operator" },
      { text: "ms", role: "variable" },
      { text: " / ", role: "operator" },
      { text: "1000", role: "number" },
      { text: ");", role: "operator" },
    ],
  },
  {
    change: "deleted-above",
    tokens: [
      { text: "  " },
      { text: "return", role: "keyword" },
      { text: " " },
      { text: "`${", role: "string" },
      { text: "Math", role: "type" },
      { text: "." },
      { text: "floor", role: "property" },
      { text: "(", role: "operator" },
      { text: "s", role: "variable" },
      { text: " / ", role: "operator" },
      { text: "60", role: "number" },
      { text: ")}m`", role: "string" },
      { text: ";", role: "operator" },
    ],
  },
  { tokens: [{ text: "}", role: "operator" }] },
];

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
    segments: [{ text: " FAIL ", fg: 0, bg: 1, bold: true }, { text: " src/lib/line-emulator.test.ts" }],
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
  { id: "l1", segments: [{ text: "  VITE v8.3.5  ready in 312 ms", fg: 2 }] },
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
  { id: "i2", segments: [{ text: " selected row ", fg: 7, bg: 4, inverse: true }] },
]);

export const BUILD = `vite v8.3.5 building for production...
transforming (412) src/features/terminal/components/block-terminal.tsx
✓ 1288 modules transformed.
dist/index.html                  0.62 kB │ gzip:  0.38 kB
dist/assets/index-3f9a1c.css    91.40 kB │ gzip: 15.02 kB
dist/assets/index-b7e2d4.js    612.18 kB │ gzip: 188.77 kB
✓ built in 4.21s`;

export const FIND_TEXT = "format once, then format again; formatDuration formats.";

export const ANSI_LINES: TerminalLine[] = [0, 8].map((offset) => ({
  id: offset,
  segments: ANSI_NAMES.slice(offset, offset + 8).map(
    (name, i): TerminalSegment => ({ text: `${name} `, fg: (offset + i) as AnsiIndex }),
  ),
}));

export const LONG_LINES: TerminalLine[] = Array.from({ length: 300 }, (_, i) => ({
  id: i,
  segments: [
    { text: `${String(i + 1).padStart(3, " ")} `, dim: true },
    { text: `packages/app/src/module-${i}.ts` },
    { text: " ok", fg: 2 },
  ],
}));

/** The root every breadcrumb story trims its paths against. */
export const ROOT = "/Users/me/atlas";
