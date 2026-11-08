/** A row of document tabs, as desktop's pane headers draw them. */

export interface TabStripItem {
  id: string;
  title: string;
  /** A 14px glyph: a Lucide component drawn through `Icon` at `md`. */
  // Lucide's Svelte 5 components type themselves through `$$props`, which no
  // structural `Component<…>` accepts; `any` is the interop seam, as in `Icon`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  /** Shows the × and allows middle-click and Delete. Needs `onClose`. */
  closable?: boolean;
  /** Unsaved: the title goes italic, and the tab carries `data-dirty`. */
  dirty?: boolean;
  /** Working (a running session, a loading page): the icon is a spinner. */
  busy?: boolean;
  /** Icon only, named by a tooltip, and never closed from the strip. */
  pinned?: boolean;
}

/** The width of the fade at an edge with more tabs past it. */
export const FADE_PX = 20;

/** Sub-pixel slack: at a fractional UI scale the true end of the scroll lands
 *  a hair short of `scrollWidth`, which would leave a fade on forever. */
export const EDGE_TOLERANCE = 1;

export interface StripScroll {
  overflow: boolean;
  canLeft: boolean;
  canRight: boolean;
}

export const NO_OVERFLOW: StripScroll = { overflow: false, canLeft: false, canRight: false };

/** The `scrollLeft` that shows a tab whole, clear of the fades, moving as
 *  little as possible. Positions are in the scroller's content coordinates. */
export function scrollLeftToReveal(
  scrollLeft: number,
  viewport: number,
  start: number,
  end: number,
): number {
  if (start - FADE_PX < scrollLeft) return Math.max(0, start - FADE_PX);
  if (end + FADE_PX > scrollLeft + viewport) return end + FADE_PX - viewport;
  return scrollLeft;
}

/** A mask, not a gradient: a mask needs no colour, so it fades into whatever
 *  the header behind the strip paints. */
export function fadeMask({ canLeft, canRight }: StripScroll): string | undefined {
  if (!canLeft && !canRight) return undefined;
  const left = canLeft ? `transparent, black ${FADE_PX}px` : "black, black";
  const right = canRight ? `black calc(100% - ${FADE_PX}px), transparent` : "black, black";
  return `linear-gradient(to right, ${left}, ${right})`;
}

export function defaultCloseLabel(item: TabStripItem): string {
  return `Close ${item.title}`;
}
