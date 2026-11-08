<script lang="ts">
  import { cn } from "../../../lib/utils";
  import { ICON_SIZES, type IconSize } from "../../../ui/icon.svelte";
  import { svgProps } from "./svg-props";

  /**
   * Bell that rings once and carries a mute slash, ported from `BellGlyph` in
   * `src/ui/animated-icon.tsx`. `ringing` is a pulse raised when a notification
   * arrives. The slash sits in its own `<svg>` so the ring does not swing it.
   */
  interface Props {
    ringing?: boolean;
    muted?: boolean;
    size?: IconSize;
    class?: string;
    onAnimationEnd?: () => void;
  }

  let { ringing = false, muted = false, size = "md", class: className, onAnimationEnd }: Props =
    $props();
</script>

<span
  class={cn("relative inline-grid shrink-0 place-items-center", className)}
  style="width: {ICON_SIZES[size]}px; height: {ICON_SIZES[size]}px;"
>
  <svg
    {...svgProps(size)}
    class={cn("absolute origin-top", ringing && "animate-icon-bell-ring")}
    onanimationend={onAnimationEnd}
  >
    <path d="M10.268 21a2 2 0 0 0 3.464 0" />
    <path
      d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
    />
  </svg>
  <svg {...svgProps(size)} class="absolute">
    <path
      d="m3 3 18 18"
      pathLength="1"
      stroke-dasharray="1"
      class={cn(
        "transition-[stroke-dashoffset] duration-fast ease-out-strong",
        muted ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:1]",
      )}
    />
  </svg>
</span>
