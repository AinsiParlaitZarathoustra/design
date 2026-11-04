"use client";

import { ImageOffIcon, StickyNoteIcon } from "lucide-react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { PEER_INK } from "../../lib/actor-hue.ts";
import type { LabelTone } from "../../lib/types.ts";
import { cn } from "../../lib/utils.ts";
import { Icon } from "../../ui/icon.tsx";
import { Spinner } from "../ui/spinner.tsx";
import type { CanvasAnchor, CanvasBounds, CanvasNodeKind, CanvasShapeKind } from "./types.ts";

/**
 * The canvas's nodes, as desktop draws them: glass notes, bare text,
 * stretched SVG shapes, dashed frames, media. `CanvasNodeFrame` is the box
 * (position, selection, a colleague's claim, anchors, the resize handle);
 * the bodies fill it. Inside an xyflow node renderer the frame is
 * `size-full` and xyflow positions it; on a hand-rolled canvas pass `bounds`.
 *
 * Bodies follow the frame's selection (`data-selected`), so a body needs no
 * `selected` prop of its own inside one.
 */

/**
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
const RADIUS: Record<CanvasNodeKind, string> = {
  note: "rounded-2xl",
  text: "rounded",
  shape: "rounded-md",
  frame: "rounded-xl",
  media: "rounded-xl",
};

/** Where each connector dot sits on the box. */
const ANCHOR_AT: Record<CanvasAnchor, string> = {
  n: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  e: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
  s: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  w: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
};

const ANCHORS: CanvasAnchor[] = ["n", "e", "s", "w"];

/**
 * The box a node is drawn in. `claimedBy` is a colleague who has it selected:
 * outlined in their hue while it is not yours. Anchors and the resize handle
 * show only when it is selected and the app gives the handler.
 */
export function CanvasNodeFrame({
  kind,
  bounds,
  selected = false,
  claimedBy,
  anchors = ANCHORS,
  onAnchorPointerDown,
  onResizePointerDown,
  className,
  style,
  children,
  ...props
}: {
  kind: CanvasNodeKind;
  bounds?: CanvasBounds;
  selected?: boolean;
  claimedBy?: { hue: LabelTone; name: string } | null;
  anchors?: CanvasAnchor[];
  onAnchorPointerDown?: (anchor: CanvasAnchor, e: PointerEvent<HTMLDivElement>) => void;
  onResizePointerDown?: (e: PointerEvent<HTMLDivElement>) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Omit<React.ComponentProps<"div">, "children" | "style" | "className">) {
  const claimed = !selected && claimedBy;
  return (
    <div
      data-slot="canvas-node"
      data-kind={kind}
      data-selected={selected || undefined}
      data-claimed-by={claimed ? claimedBy.name : undefined}
      className={cn(
        "group/node",
        bounds ? "absolute" : "relative size-full",
        RADIUS[kind],
        claimed && cn("outline-2 outline-offset-4", PEER_INK[claimedBy.hue].outline),
        className,
      )}
      style={
        bounds
          ? { left: bounds.x, top: bounds.y, width: bounds.w, height: bounds.h, ...style }
          : style
      }
      {...props}
    >
      {children}
      {selected &&
        onAnchorPointerDown &&
        anchors.map((a) => (
          <div
            key={a}
            role="presentation"
            data-anchor={a}
            onPointerDown={(e) => onAnchorPointerDown(a, e)}
            className={cn(
              "absolute size-3 cursor-crosshair rounded-full border border-background bg-primary",
              "transition-transform duration-fast ease-out-strong hover:scale-125",
              ANCHOR_AT[a],
            )}
          />
        ))}
      {selected && onResizePointerDown && (
        <div
          role="presentation"
          data-slot="canvas-resize-handle"
          onPointerDown={onResizePointerDown}
          className="absolute -right-1 -bottom-1 size-2 cursor-nwse-resize rounded-sm border border-border-strong bg-primary"
        />
      )}
    </div>
  );
}

/**
 * A note: a glass card, an icon and title over the body. A string body is
 * clipped to the card with a fade at the bottom edge, so a long one dissolves
 * rather than cutting off mid-line.
 */
export function CanvasNote({
  title,
  body,
  icon,
  meta,
  empty = false,
  className,
}: {
  /** A string, or the app's editor (use `CANVAS_FIELD_CLASS.noteTitle`). */
  title: ReactNode;
  /** A string, rendered markdown, or the app's editor (`CANVAS_FIELD_CLASS.noteBody`). */
  body?: ReactNode;
  /** An emoji in place of the sticky-note glyph. */
  icon?: string;
  /** A line under the title, e.g. "Edited 5m ago". */
  meta?: ReactNode;
  /** Draws "Empty note — open to edit." in place of the body. */
  empty?: boolean;
  className?: string;
}) {
  const fades = !empty && typeof body === "string";
  return (
    <div
      data-slot="canvas-note"
      className={cn(
        "relative flex size-full flex-col overflow-hidden rounded-2xl border shadow-lg",
        "bg-card/70 backdrop-blur-glass backdrop-saturate-150 transition-colors duration-fast",
        "border-border-subtle group-hover/node:border-border group-data-selected/node:border-primary/60",
        className,
      )}
    >
      {/* The inner glow: light on the top edge of the glass. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "linear-gradient(to bottom, var(--element-highlight), transparent)",
        }}
      />
      <div className="relative flex shrink-0 items-center gap-2 border-b border-border-subtle px-3 py-2">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-element-hover">
          {icon ? (
            <span className="text-lg leading-none">{icon}</span>
          ) : (
            <Icon icon={StickyNoteIcon} size="sm" className="text-secondary-foreground" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          {typeof title === "string" ? (
            <div className={cn(CANVAS_FIELD_CLASS.noteTitle, "truncate")}>
              {title || "Untitled"}
            </div>
          ) : (
            title
          )}
          {meta && <div className="truncate text-2xs text-muted-foreground">{meta}</div>}
        </div>
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-2.5">
        {empty ? (
          <div className="text-xs text-muted-foreground italic">Empty note — open to edit.</div>
        ) : typeof body === "string" ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-secondary-foreground">
            {body}
          </p>
        ) : (
          body
        )}
        {fades && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--card) 85%, transparent))",
            }}
          />
        )}
      </div>
    </div>
  );
}

/** Free text: no chrome, outlined while selected. */
export function CanvasText({ text, className }: { text: ReactNode; className?: string }) {
  return (
    <div
      data-slot="canvas-text"
      className={cn(
        "size-full overflow-hidden rounded px-1 py-0.5 break-words whitespace-pre-wrap",
        "group-data-selected/node:outline group-data-selected/node:outline-1 group-data-selected/node:outline-primary/50",
        CANVAS_FIELD_CLASS.text,
        className,
      )}
    >
      {text === "" ? <span className="text-muted-foreground">Text</span> : text}
    </div>
  );
}

const SHAPE_COMMON = {
  strokeWidth: 1.5,
  vectorEffect: "non-scaling-stroke",
} as const;

/**
 * A shape in a 100×100 box stretched to the node. The stroke does not scale
 * with the stretch or the zoom, so a wide rectangle and a tall one have the
 * same edge.
 */
export function CanvasShape({
  shape,
  label,
  selected,
  className,
}: {
  shape: CanvasShapeKind;
  /** A string, or the app's editor (`CANVAS_FIELD_CLASS.shapeLabel`). */
  label?: ReactNode;
  /** Outside a `CanvasNodeFrame`; inside one, the frame's selection applies. */
  selected?: boolean;
  className?: string;
}) {
  const paint = cn(
    "fill-card/70 stroke-border-strong transition-[stroke] duration-fast",
    "group-data-selected/node:stroke-primary",
    selected && "stroke-primary",
  );
  return (
    <div data-slot="canvas-shape" className={cn("relative size-full", className)}>
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {shape === "ellipse" ? (
          <ellipse cx={50} cy={50} rx={49} ry={49} className={paint} {...SHAPE_COMMON} />
        ) : shape === "diamond" ? (
          <polygon points="50,1 99,50 50,99 1,50" className={paint} {...SHAPE_COMMON} />
        ) : shape === "triangle" ? (
          <polygon points="50,1 99,99 1,99" className={paint} {...SHAPE_COMMON} />
        ) : (
          <rect
            x={1}
            y={1}
            width={98}
            height={98}
            rx={shape === "rounded" ? 14 : 0}
            className={paint}
            {...SHAPE_COMMON}
          />
        )}
      </svg>
      {label !== undefined && (
        <div className="absolute inset-0 flex items-center justify-center p-3">
          {typeof label === "string" ? (
            <span className={cn(CANVAS_FIELD_CLASS.shapeLabel, "line-clamp-3 break-words")}>
              {label}
            </span>
          ) : (
            label
          )}
        </div>
      )}
    </div>
  );
}

/** A titled frame: a dashed region with its label above the top-left corner. */
export function CanvasFrame({ label, className }: { label?: ReactNode; className?: string }) {
  return (
    <div
      data-slot="canvas-frame"
      className={cn(
        "relative size-full rounded-xl border-2 border-dashed border-border-subtle bg-element-hover transition-colors duration-fast",
        "group-data-selected/node:border-primary/50",
        className,
      )}
    >
      <div className="absolute -top-6 left-1 max-w-full">
        {typeof label === "string" || label === undefined ? (
          <span className={cn(CANVAS_FIELD_CLASS.frameLabel, "block truncate")}>
            {label || "Frame"}
          </span>
        ) : (
          label
        )}
      </div>
    </div>
  );
}

/** An image or video, with its loading and failed states. `loadingLabel`
 *  ("Loading image…") is shown under the spinner, as a status line that
 *  assistive tech reads in the spinner's place; without it the spinner stands
 *  alone, named "Loading". */
export function CanvasMedia({
  state,
  src,
  kind,
  alt,
  loadingLabel,
  className,
}: {
  state: "loading" | "error" | "ready";
  src?: string;
  kind: "image" | "video";
  alt: string;
  loadingLabel?: string;
  className?: string;
}) {
  return (
    <div
      data-slot="canvas-media"
      className={cn(
        "size-full overflow-hidden rounded-xl border border-border-subtle bg-card transition-colors duration-fast",
        "group-data-selected/node:border-primary/60",
        className,
      )}
    >
      {state === "error" || (state === "ready" && !src) ? (
        <div className="flex size-full flex-col items-center justify-center gap-1 text-muted-foreground">
          <Icon icon={ImageOffIcon} size="lg" />
          <span className="text-2xs">Media unavailable</span>
        </div>
      ) : state === "loading" ? (
        <div className="flex size-full flex-col items-center justify-center gap-1 text-muted-foreground">
          {loadingLabel ? (
            <>
              <Spinner size="lg" label="" />
              <span role="status" className="text-2xs">
                {loadingLabel}
              </span>
            </>
          ) : (
            <Spinner size="lg" />
          )}
        </div>
      ) : kind === "video" ? (
        <video src={src} controls aria-label={alt} className="size-full object-contain" />
      ) : (
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="size-full object-contain select-none [-webkit-user-drag:none]"
        />
      )}
    </div>
  );
}
