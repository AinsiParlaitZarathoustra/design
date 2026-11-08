/**
 * Placement of an anchored popup, pure so it can be reasoned about on its own.
 * It runs the source's middleware chain (`@base-ui/react` positioner over
 * `@floating-ui/core`): `offset`, then `flip` and `shift` (shift first when the
 * popup is centred), then `size`. `flip` walks the placements in Floating UI's
 * order: the requested one, the same side with the opposite alignment, the
 * opposite side, the opposite side with the opposite alignment, then (when
 * `fallbackAxisSide` allows it) the perpendicular sides. `shift` keeps the
 * popup inside the viewport along its alignment axis without detaching it from
 * the anchor (`limitShift`).
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
  /** Base UI's `collisionAvoidance`; the defaults are its dropdown defaults. */
  collisionAvoidance?: CollisionAvoidance;
  /** Base UI's `shift.crossAxis` (the context menu sets it). */
  shiftCrossAxis?: boolean;
}

export interface CollisionAvoidance {
  side?: "flip" | "shift" | "none";
  align?: "flip" | "shift" | "none";
  fallbackAxisSide?: "start" | "end" | "none";
}

/** Base UI's `DROPDOWN_COLLISION_AVOIDANCE` (menus, select, combobox). */
export const DROPDOWN_COLLISION_AVOIDANCE: CollisionAvoidance = { fallbackAxisSide: "none" };
/** Base UI's `POPUP_COLLISION_AVOIDANCE` (popover, tooltip, submenus). */
export const POPUP_COLLISION_AVOIDANCE: CollisionAvoidance = { fallbackAxisSide: "end" };

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

type Coords = { x: number; y: number };
type Edges = { top: number; right: number; bottom: number; left: number };
type Axis = "x" | "y";

const sideAxis = (side: Side): Axis => (side === "top" || side === "bottom" ? "y" : "x");
const placementKey = (side: Side, align: Align) => `${side}|${align}`;

export function placePopup(options: PlacementOptions): Placement {
  const { anchor, popup, viewport, alignOffset, sideOffset } = options;
  const padding = options.padding ?? 5;
  const avoidance = options.collisionAvoidance ?? DROPDOWN_COLLISION_AVOIDANCE;
  const sideMode = avoidance.side ?? "flip";
  const alignMode = avoidance.align ?? "flip";
  const fallbackAxisSide = avoidance.fallbackAxisSide ?? "end";
  const shiftCrossAxis = options.shiftCrossAxis ?? false;
  const requested = options.side;

  // `computeCoordsFromPlacement`, then the `offset` middleware.
  const coordsFor = (side: Side, align: Align): Coords => {
    const centerX = anchor.left + anchor.width / 2 - popup.width / 2;
    const centerY = anchor.top + anchor.height / 2 - popup.height / 2;
    let x = centerX;
    let y = centerY;
    if (side === "top") y = anchor.top - popup.height;
    else if (side === "bottom") y = anchor.top + anchor.height;
    else if (side === "left") x = anchor.left - popup.width;
    else x = anchor.left + anchor.width;
    const vertical = sideAxis(side) === "y";
    const commonAlign = vertical ? anchor.width / 2 - popup.width / 2 : anchor.height / 2 - popup.height / 2;
    if (align === "start") {
      if (vertical) x -= commonAlign;
      else y -= commonAlign;
    } else if (align === "end") {
      if (vertical) x += commonAlign;
      else y += commonAlign;
    }
    const mainMulti = side === "top" || side === "left" ? -1 : 1;
    const cross = align === "end" ? -alignOffset : alignOffset;
    if (vertical) {
      x += cross;
      y += sideOffset * mainMulti;
    } else {
      x += sideOffset * mainMulti;
      y += cross;
    }
    return { x, y };
  };

  // `detectOverflow` against the viewport, positive where the popup overflows.
  const overflowAt = ({ x, y }: Coords, pad: Edges): Edges => ({
    top: pad.top - y,
    bottom: y + popup.height - viewport.height + pad.bottom,
    left: pad.left - x,
    right: x + popup.width - viewport.width + pad.right,
  });
  const even = (value: number): Edges => ({ top: value, right: value, bottom: value, left: value });

  // `flip()`: its padding carries a one-pixel bias toward the requested side.
  const flipPadding: Edges = {
    top: padding + 1 + (requested === "bottom" ? 1 : 0),
    bottom: padding + 1 + (requested === "top" ? 1 : 0),
    left: padding + 1 + (requested === "right" ? 1 : 0),
    right: padding + 1 + (requested === "left" ? 1 : 0),
  };
  const checkMainAxis = !shiftCrossAxis && sideMode === "flip";
  const checkCrossAxis = alignMode === "flip";
  const flipEnabled = sideMode !== "none";

  const initial = { side: requested, align: options.align };
  const oppositeAlign = (align: Align): Align => (align === "start" ? "end" : align === "end" ? "start" : align);
  const placements: { side: Side; align: Align }[] = [initial];
  if (initial.align === "center") {
    placements.push({ side: OPPOSITE[initial.side], align: "center" });
  } else {
    placements.push(
      { side: initial.side, align: oppositeAlign(initial.align) },
      { side: OPPOSITE[initial.side], align: initial.align },
      { side: OPPOSITE[initial.side], align: oppositeAlign(initial.align) },
    );
  }
  if (fallbackAxisSide !== "none") {
    const isStart = fallbackAxisSide === "start";
    const list: Side[] =
      sideAxis(initial.side) === "y"
        ? isStart
          ? ["left", "right"]
          : ["right", "left"]
        : isStart
          ? ["top", "bottom"]
          : ["bottom", "top"];
    if (initial.align === "center") {
      for (const side of list) placements.push({ side, align: "center" });
    } else {
      for (const side of list) placements.push({ side, align: initial.align });
      for (const side of list) placements.push({ side, align: oppositeAlign(initial.align) });
    }
  }

  // `shift()`: along the alignment axis (and the side axis when enabled),
  // inside `padding`, then `limitShift` keeps the popup touching the anchor.
  const shiftDisabled = alignMode === "none" && sideMode !== "shift";
  const shiftMain = alignMode !== "none";
  const shiftCross = !shiftDisabled && (shiftCrossAxis || sideMode === "shift");
  const limited = !shiftCrossAxis;
  const shiftCoords = (side: Side, coords: Coords): Coords => {
    if (shiftDisabled) return coords;
    const crossAxis = sideAxis(side);
    const mainAxis: Axis = crossAxis === "y" ? "x" : "y";
    const overflow = overflowAt(coords, even(padding));
    const next = { ...coords };
    if (shiftMain) {
      const min = coords[mainAxis] + (mainAxis === "y" ? overflow.top : overflow.left);
      const max = coords[mainAxis] - (mainAxis === "y" ? overflow.bottom : overflow.right);
      next[mainAxis] = Math.max(min, Math.min(coords[mainAxis], max));
    }
    if (shiftCross) {
      const min = coords[crossAxis] + (crossAxis === "y" ? overflow.top : overflow.left);
      const max = coords[crossAxis] - (crossAxis === "y" ? overflow.bottom : overflow.right);
      next[crossAxis] = Math.max(min, Math.min(coords[crossAxis], max));
    }
    if (limited) {
      const mainLen = mainAxis === "y" ? "height" : "width";
      const anchorMain = mainAxis === "y" ? anchor.top : anchor.left;
      const limitMin = anchorMain - popup[mainLen];
      const limitMax = anchorMain + anchor[mainLen];
      if (next[mainAxis] < limitMin) next[mainAxis] = limitMin;
      else if (next[mainAxis] > limitMax) next[mainAxis] = limitMax;
      const crossLen = mainAxis === "y" ? "width" : "height";
      const anchorCross = crossAxis === "y" ? anchor.top : anchor.left;
      const originSide = side === "top" || side === "left";
      const offsetCross = originSide ? -sideOffset : sideOffset;
      const crossMin = anchorCross - popup[crossLen] + (originSide ? offsetCross : 0);
      const crossMax = anchorCross + anchor[crossLen] + (originSide ? 0 : offsetCross);
      if (next[crossAxis] < crossMin) next[crossAxis] = crossMin;
      else if (next[crossAxis] > crossMax) next[crossAxis] = crossMax;
    }
    return next;
  };

  const shiftFirst = sideMode === "shift" || alignMode === "shift" || initial.align === "center";
  const alignmentSides = (side: Side, align: Align): [keyof Edges, keyof Edges] => {
    const axis: Axis = sideAxis(side) === "y" ? "x" : "y";
    let main: keyof Edges = axis === "x" ? (align === "start" ? "right" : "left") : align === "start" ? "bottom" : "top";
    const length = axis === "x" ? "width" : "height";
    if (anchor[length] > popup[length]) main = OPPOSITE[main as Side] as keyof Edges;
    return [main, OPPOSITE[main as Side] as keyof Edges];
  };

  // The middleware loop: every `flip` reset re-runs the chain from `offset`.
  const history: { key: string; side: Side; align: Align; overflows: number[] }[] = [];
  let index = 0;
  let current = initial;
  let coords: Coords = { x: 0, y: 0 };
  for (let resets = 0; resets <= placements.length + 1; resets += 1) {
    coords = coordsFor(current.side, current.align);
    if (shiftFirst) coords = shiftCoords(current.side, coords);
    if (flipEnabled) {
      const overflow = overflowAt(coords, flipPadding);
      const overflows: number[] = [];
      if (checkMainAxis) overflows.push(overflow[current.side]);
      if (checkCrossAxis) {
        const [a, b] = alignmentSides(current.side, current.align);
        overflows.push(overflow[a], overflow[b]);
      }
      history.push({ key: placementKey(current.side, current.align), ...current, overflows });
      if (!overflows.every((value) => value <= 0)) {
        const next = placements[index + 1];
        if (next) {
          const ignoreCross = checkCrossAxis && sideAxis(initial.side) !== sideAxis(next.side);
          const leaveAxis = history.every((entry) =>
            sideAxis(entry.side) === sideAxis(initial.side) ? (entry.overflows[0] ?? 0) > 0 : true,
          );
          if (!ignoreCross || leaveAxis) {
            index += 1;
            current = next;
            continue;
          }
        }
        let reset = history
          .filter((entry) => (entry.overflows[0] ?? 0) <= 0)
          .sort((a, b) => (a.overflows[1] ?? 0) - (b.overflows[1] ?? 0))[0];
        if (!reset) {
          reset = history
            .filter((entry) =>
              fallbackAxisSide !== "none"
                ? sideAxis(entry.side) === sideAxis(initial.side) || sideAxis(entry.side) === "y"
                : true,
            )
            .map((entry) => ({
              entry,
              total: entry.overflows.filter((value) => value > 0).reduce((sum, value) => sum + value, 0),
            }))
            .sort((a, b) => a.total - b.total)[0]?.entry;
        }
        if (reset && reset.key !== placementKey(current.side, current.align)) {
          current = { side: reset.side, align: reset.align };
          coords = coordsFor(current.side, current.align);
          if (shiftFirst) coords = shiftCoords(current.side, coords);
        }
      }
    }
    break;
  }
  if (!shiftFirst) coords = shiftCoords(current.side, coords);

  const { side, align } = current;
  const { x, y } = coords;
  const vertical = sideAxis(side) === "y";

  // `size()`: the room left on each axis, inside `padding`.
  const overflow = overflowAt(coords, even(padding));
  const heightSide: keyof Edges = vertical ? side : align === "end" ? "top" : "bottom";
  const widthSide: keyof Edges = vertical ? (align === "end" ? "left" : "right") : side;
  const maxHeight = popup.height - overflow.top - overflow.bottom;
  const maxWidth = popup.width - overflow.left - overflow.right;
  let availableHeight = Math.min(popup.height - overflow[heightSide], maxHeight);
  let availableWidth = Math.min(popup.width - overflow[widthSide], maxWidth);
  if (!shiftDisabled) {
    const enabledX = vertical ? shiftMain : shiftCross;
    const enabledY = vertical ? shiftCross : shiftMain;
    if (enabledX) availableWidth = maxWidth;
    if (enabledY) availableHeight = maxHeight;
  } else if (align === "center") {
    const xMin = Math.max(overflow.left, 0);
    const xMax = Math.max(overflow.right, 0);
    const yMin = Math.max(overflow.top, 0);
    const yMax = Math.max(overflow.bottom, 0);
    if (vertical) {
      availableWidth =
        popup.width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : Math.max(overflow.left, overflow.right));
    } else {
      availableHeight =
        popup.height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : Math.max(overflow.top, overflow.bottom));
    }
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
    availableHeight,
    availableWidth,
    transformOrigin,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}
