<script lang="ts">
  import { cn } from "../../../lib/utils";
  import type { IconSize } from "../../../ui/icon.svelte";
  import { svgProps } from "./svg-props";

  /**
   * Plus ↔ minus, ported from `PlusMinusGlyph` in `src/ui/animated-icon.tsx`:
   * one horizontal bar stays put and a second rotates 90° down onto it. The
   * transform origin stays at the default `view-box`, which already resolves
   * to the bar's midpoint (12, 12).
   */
  interface Props {
    open: boolean;
    size?: IconSize;
    class?: string;
  }

  let { open, size = "md", class: className }: Props = $props();
</script>

<svg {...svgProps(size)} class={cn("shrink-0", className)}>
  <path d="M5 12h14" />
  <path
    d="M5 12h14"
    class={cn(
      "origin-center transition-transform duration-base ease-in-out-strong",
      open ? "rotate-0" : "rotate-90",
    )}
  />
</svg>
