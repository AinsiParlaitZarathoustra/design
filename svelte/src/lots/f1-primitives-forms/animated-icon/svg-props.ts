import { ICON_SIZES, ICON_STROKE_WIDTH, type IconSize } from "../../../ui/icon.svelte";

/**
 * Shared SVG attributes so every glyph matches `Icon`'s weight and hinting.
 * Ported from `svgProps` in `src/ui/animated-icon.tsx`; the React camelCase
 * names are written as the SVG attribute names Svelte renders.
 */
export function svgProps(size: IconSize) {
  return {
    width: ICON_SIZES[size],
    height: ICON_SIZES[size],
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    "stroke-width": ICON_STROKE_WIDTH,
    "stroke-linecap": "round" as const,
    "stroke-linejoin": "round" as const,
    "aria-hidden": true,
  };
}
