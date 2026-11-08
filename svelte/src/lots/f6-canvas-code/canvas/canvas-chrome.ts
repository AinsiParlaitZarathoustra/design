/** A Lucide icon as the Svelte port takes it: a `lucide-svelte` component. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LucideIcon = any;

/**
 * The floating chrome every canvas is cut from, ported from
 * `src/components/canvas/canvas-chrome.tsx`: the glass, the corner offsets.
 */

/**
 * The glass of every floating control group: the card at 70% under a blur,
 * a subtle edge and the menu shadow, so a pill reads as floating over the
 * canvas without a hard bar. Desktop's recipe, on the package's one blur.
 */
export const CANVAS_GLASS =
  "rounded-xl border border-border-subtle bg-card/70 shadow-md backdrop-blur-glass";

export const CANVAS_CORNER = {
  "top-left": "left-3 top-3",
  "top-right": "right-3 top-3",
  "bottom-left": "bottom-3 left-3",
  "bottom-right": "bottom-3 right-3",
} as const;

export type CanvasCorner = keyof typeof CANVAS_CORNER;

/** The dot grid, from the theme. An inline `var()` follows every theme. */
export const CANVAS_DOTS: Record<string, string> = {
  backgroundImage: "radial-gradient(var(--border-strong) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};
