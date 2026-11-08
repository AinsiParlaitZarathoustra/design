<script lang="ts">
  import { cn } from "../../../lib/utils";
  import type { IconSize } from "../../../ui/icon.svelte";
  import { svgProps } from "./svg-props";

  /**
   * Sidebar rail that thickens, ported from `RailGlyph` in
   * `src/ui/animated-icon.tsx`. The rail is drawn inside the viewBox, as a
   * filled rect, so `scaleX` from the left edge has no caps to distort and
   * scales with the glyph at every size.
   */
  interface Props {
    open: boolean;
    size?: IconSize;
    class?: string;
  }

  let { open, size = "md", class: className }: Props = $props();
</script>

<svg {...svgProps(size)} class={cn("shrink-0", className)}>
  <rect x="2" y="3" width="20" height="18" rx="2" />
  <rect
    x="5"
    y="5.5"
    width="2"
    height="13"
    rx="1"
    fill="currentColor"
    stroke="none"
    class={cn(
      "origin-left [transform-box:fill-box] transition-transform duration-fast ease-out-strong",
      open ? "scale-x-[3]" : "scale-x-100",
    )}
  />
</svg>
