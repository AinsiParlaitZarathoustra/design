import type { CanvasAnchor, CanvasNodeKind } from "./types";

/**
 * The canvas nodes' shared tables, ported from `src/components/canvas/canvas-nodes.tsx`.
 *
 * The type of each editable field, so an app's editor (an input over a note
 * title, a textarea for a shape label) matches the static text it replaces.
 */
export const CANVAS_FIELD_CLASS = {
  noteTitle:
    "w-full min-w-0 bg-transparent text-base font-semibold text-foreground outline-none placeholder:text-muted-foreground",
  noteBody:
    "w-full min-h-0 resize-none bg-transparent text-sm leading-relaxed text-secondary-foreground outline-none placeholder:text-muted-foreground placeholder:italic",
  text: "w-full resize-none bg-transparent text-lg leading-snug text-foreground caret-primary outline-none placeholder:text-muted-foreground",
  shapeLabel:
    "w-full resize-none bg-transparent text-center text-sm leading-snug text-foreground caret-primary outline-none",
  frameLabel:
    "bg-transparent text-xs font-medium text-muted-foreground outline-none placeholder:text-muted-foreground",
} as const;

/** The frame hugs each body's own corner. */
export const CANVAS_NODE_RADIUS: Record<CanvasNodeKind, string> = {
  note: "rounded-2xl",
  text: "rounded",
  shape: "rounded-md",
  frame: "rounded-xl",
  media: "rounded-xl",
};

/** Where each connector dot sits on the box. */
export const CANVAS_ANCHOR_AT: Record<CanvasAnchor, string> = {
  n: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  e: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
  s: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  w: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
};

export const CANVAS_ANCHORS: CanvasAnchor[] = ["n", "e", "s", "w"];
