/**
 * Placement of an anchored popup, pure so it can be reasoned about on its own.
 * It follows the collision rules of the source (`@base-ui/react` positioner):
 * the popup `flip`s to the opposite side when its side has no room and the
 * opposite side has more, then `shift`s along the cross axis to stay inside the
 * viewport, keeping `padding` from every edge.
 */

export type Side = "top" | "bottom" | "left" | "right";
export type Align = "start" | "center" | "end";

export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface PlacementOptions {
  anchor: Box;
  popup: { width: number; height: number };
  side: Side;
  align: Align;
  sideOffset: number;
  alignOffset: number;
  viewport: { width: number; height: number };
  /** Collision padding from each viewport edge. */
  padding?: number;
}

export interface Placement {
  side: Side;
  align: Align;
  /** Popup position, relative to the viewport. */
  x: number;
  y: number;
  /** Arrow centre, relative to the popup's own box. */
  arrowX: number;
  arrowY: number;
  /** The anchor's width, for `--anchor-width`. */
  anchorWidth: number;
  /** Room on the placed side, for `--available-height`. */
  availableHeight: number;
  availableWidth: number;
  transformOrigin: string;
}

const OPPOSITE: Record<Side, Side> = { top: "bottom", bottom: "top", left: "right", right: "left" };
const ARROW_PADDING = 5;

/**
 * The anchor's width as the source publishes it (Base UI's `--anchor-width`):
 * the span between its *snapped* edges, not its fractional box. A 179.0625px
 * input therefore yields 179px, and a popup sized from it keeps the source's
 * box (a fractional var widened the combobox popup by 0.0625px, enough to move
 * the empty message's glyphs onto different subpixels).
 */
export function snappedWidth(box: Box, dpr = globalThis.devicePixelRatio || 1): number {
  return (Math.round((box.left + box.width) * dpr) - Math.round(box.left * dpr)) / dpr;
}

export function placePopup(options: PlacementOptions): Placement {
  const { anchor, popup, viewport, align, alignOffset, sideOffset } = options;
  const padding = options.padding ?? 5;
  const vertical = (side: Side) => side === "top" || side === "bottom";

  const roomOn = (side: Side): number => {
    switch (side) {
      case "top":
        return anchor.top - sideOffset - padding;
      case "bottom":
        return viewport.height - (anchor.top + anchor.height + sideOffset) - padding;
      case "left":
        return anchor.left - sideOffset - padding;
      case "right":
        return viewport.width - (anchor.left + anchor.width + sideOffset) - padding;
    }
  };
  const extentOf = (side: Side) => (vertical(side) ? popup.height : popup.width);

  let side = options.side;
  if (extentOf(side) > roomOn(side) && roomOn(OPPOSITE[side]) > roomOn(side)) {
    side = OPPOSITE[side];
  }

  // Main axis: the popup sits sideOffset past the anchor edge on its side.
  let x = 0;
  let y = 0;
  switch (side) {
    case "top":
      y = anchor.top - sideOffset - popup.height;
      break;
    case "bottom":
      y = anchor.top + anchor.height + sideOffset;
      break;
    case "left":
      x = anchor.left - sideOffset - popup.width;
      break;
    case "right":
      x = anchor.left + anchor.width + sideOffset;
      break;
  }

  // Cross axis: align to the anchor, offset by alignOffset, then shift inside.
  if (vertical(side)) {
    const start =
      align === "start"
        ? anchor.left
        : align === "end"
          ? anchor.left + anchor.width - popup.width
          : anchor.left + anchor.width / 2 - popup.width / 2;
    x = clamp(start + alignOffset, padding, viewport.width - padding - popup.width);
  } else {
    const start =
      align === "start"
        ? anchor.top
        : align === "end"
          ? anchor.top + anchor.height - popup.height
          : anchor.top + anchor.height / 2 - popup.height / 2;
    y = clamp(start + alignOffset, padding, viewport.height - padding - popup.height);
  }

  // The arrow points at the anchor centre, kept inside the popup's corners.
  const arrowX = clamp(
    anchor.left + anchor.width / 2 - x,
    ARROW_PADDING,
    Math.max(ARROW_PADDING, popup.width - ARROW_PADDING),
  );
  const arrowY = clamp(
    anchor.top + anchor.height / 2 - y,
    ARROW_PADDING,
    Math.max(ARROW_PADDING, popup.height - ARROW_PADDING),
  );

  // The origin lies on the edge that faces the popup, at the alignment point of
  // the anchor (its start, centre or end), in the popup's own coordinates: the
  // scale-in and scale-out leave into the trigger.
  const alongX = clamp(
    align === "start"
      ? anchor.left - x
      : align === "end"
        ? anchor.left + anchor.width - x
        : anchor.left + anchor.width / 2 - x,
    0,
    popup.width,
  );
  const alongY = clamp(
    align === "start"
      ? anchor.top - y
      : align === "end"
        ? anchor.top + anchor.height - y
        : anchor.top + anchor.height / 2 - y,
    0,
    popup.height,
  );
  const transformOrigin =
    side === "bottom"
      ? `${alongX}px ${anchor.top + anchor.height - y}px`
      : side === "top"
        ? `${alongX}px ${anchor.top - y}px`
        : side === "left"
          ? `${anchor.left - x}px ${alongY}px`
          : `${anchor.left + anchor.width - x}px ${alongY}px`;

  return {
    side,
    align,
    x,
    y,
    arrowX,
    arrowY,
    anchorWidth: snappedWidth(anchor),
    availableHeight: vertical(side) ? roomOn(side) : viewport.height - 2 * padding,
    availableWidth: vertical(side) ? viewport.width - 2 * padding : roomOn(side),
    transformOrigin,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}
