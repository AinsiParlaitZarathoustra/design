<script lang="ts">
  import { cn } from "../../../lib/utils";
  import { ICON_SIZES, ICON_STROKE_WIDTH, type IconSize } from "../../../ui/icon.svelte";

  /**
   * Adapter for `RailGlyph` (`src/ui/animated-icon.tsx`, lot f1): the rail
   * toggle's glyph, a framed rail whose bar stretches when the rail is open.
   */
  interface Props {
    open: boolean;
    size?: IconSize;
    class?: string;
  }

  let { open, size = "md", class: className }: Props = $props();
</script>

<svg
  width={ICON_SIZES[size]}
  height={ICON_SIZES[size]}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width={ICON_STROKE_WIDTH}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  class={cn("shrink-0", className)}
>
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
