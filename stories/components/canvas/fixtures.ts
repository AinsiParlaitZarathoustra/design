import type {
  CanvasBounds,
  CanvasPageRow,
  CanvasShapeKind,
  PresencePeer,
} from "../../../src/components/canvas/types.ts";
import { ACTOR_COLOUR_HUE, actorHue } from "../../../src/lib/actor-hue.ts";

/**
 * The canvas stories' data. Peers take their hue the way the apps do: from
 * the wire colour their client published, through `actorHue`. The wire
 * colours come off the table itself, so no hex is spelled here.
 */

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

/** The page switcher's pages. */
export const SWITCHER_PAGES = [
  { id: "p-roadmap", name: "Roadmap" },
  { id: "p-launch", name: "Launch plan" },
  { id: "p-retro", name: "Retro" },
];

/** Three pages and a folder, flattened as an app would hand them over. */
export const PAGE_ROWS: CanvasPageRow[] = [
  { id: "p-roadmap", kind: "page", name: "Roadmap", subtitle: "Updated 5m ago" },
  { id: "f-research", kind: "folder", name: "Research", subtitle: "Updated 2h ago" },
  {
    id: "p-interviews",
    kind: "page",
    name: "Interviews",
    subtitle: "Updated 3h ago",
    depth: 1,
  },
  { id: "p-retro", kind: "page", name: "Retro", subtitle: "Updated yesterday" },
];

/** The local canvas's rows: flat pages with emoji and no subtitle. */
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
  | { id: string; kind: "shape"; bounds: CanvasBounds; shape: CanvasShapeKind; label: string }
  | { id: string; kind: "frame"; bounds: CanvasBounds; label: string }
  | { id: string; kind: "media"; bounds: CanvasBounds };

/** A board: two notes, a text, every shape, a frame and an image. */
export const BOARD: BoardNode[] = [
  { id: "frame", kind: "frame", bounds: { x: 40, y: 72, w: 600, h: 300 }, label: "Sync design" },
  {
    id: "note-1",
    kind: "note",
    bounds: { x: 64, y: 96, w: 260, h: 200 },
    title: "Offline edits",
    body: LONG_BODY,
  },
  {
    id: "note-2",
    kind: "note",
    bounds: { x: 352, y: 96, w: 240, h: 140 },
    title: "Open question",
    body: "Do we show held edits in the header pill?",
  },
  { id: "text", kind: "text", bounds: { x: 352, y: 256, w: 260, h: 40 }, text: "Ship by Friday" },
  {
    id: "s-rect",
    kind: "shape",
    bounds: { x: 680, y: 96, w: 120, h: 72 },
    shape: "rectangle",
    label: "Client",
  },
  {
    id: "s-rounded",
    kind: "shape",
    bounds: { x: 840, y: 96, w: 120, h: 72 },
    shape: "rounded",
    label: "Relay",
  },
  {
    id: "s-ellipse",
    kind: "shape",
    bounds: { x: 680, y: 208, w: 120, h: 80 },
    shape: "ellipse",
    label: "Doc",
  },
  {
    id: "s-diamond",
    kind: "shape",
    bounds: { x: 840, y: 200, w: 120, h: 96 },
    shape: "diamond",
    label: "Held?",
  },
  {
    id: "s-triangle",
    kind: "shape",
    bounds: { x: 760, y: 328, w: 112, h: 96 },
    shape: "triangle",
    label: "",
  },
  { id: "media", kind: "media", bounds: { x: 64, y: 408, w: 240, h: 150 } },
];

export const BOARD_BOUNDS: CanvasBounds[] = BOARD.map((n) => n.bounds);

/**
 * A stand-in image, as an SVG data URL in named colours (the ratchet bans
 * hex), so the media story needs no file.
 */
export const IMAGE_SRC = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 150"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="slateblue"/><stop offset="1" stop-color="orchid"/></linearGradient></defs><rect width="240" height="150" fill="url(#g)"/><circle cx="180" cy="46" r="18" fill="gold"/><path d="M0 150 L80 70 L140 130 L180 100 L240 150 Z" fill="midnightblue" opacity="0.6"/></svg>`,
)}`;
