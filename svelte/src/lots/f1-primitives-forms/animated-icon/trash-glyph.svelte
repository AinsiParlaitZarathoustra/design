<script lang="ts">
  import { cn } from "../../../lib/utils";
  import type { IconSize } from "../../../ui/icon.svelte";
  import { svgProps } from "./svg-props";

  /**
   * Trash whose lid tips off to the right, ported from `TrashGlyph` in
   * `src/ui/animated-icon.tsx`. `armed` is for a destructive control that
   * confirms in place; the lid rotates about its right edge so it hinges.
   *
   * `transform-box: fill-box` is load-bearing: without it the lid hinges about
   * a point of the 24×24 viewBox outside itself. The rotation is positive
   * (+22°) so the far end clears the can. `overflow="visible"` keeps the lifted
   * lid inside the box's paint area.
   */
  interface Props {
    armed: boolean;
    size?: IconSize;
    class?: string;
  }

  let { armed, size = "md", class: className }: Props = $props();
</script>

<svg {...svgProps(size)} overflow="visible" class={cn("shrink-0", className)}>
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  <g
    class={cn(
      "origin-right [transform-box:fill-box] transition-transform duration-base ease-in-out-strong",
      armed && "rotate-[22deg]",
    )}
  >
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </g>
</svg>
