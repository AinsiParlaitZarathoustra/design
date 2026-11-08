<script lang="ts">
  import { cn } from "../../../lib/utils";
  import { ICON_SIZES, type IconSize } from "../../../ui/icon.svelte";
  import { svgProps } from "./svg-props";

  /**
   * Copy → check, ported from `CopyGlyph` in `src/ui/animated-icon.tsx`. The
   * check draws itself on rather than appearing. Both glyphs stay mounted;
   * `copied` crossfades between them, and re-copying replays the draw.
   *
   * The transition list names `scale`, not `transform`: Tailwind v4 compiles
   * `scale-75` to the standalone `scale` property.
   */
  interface Props {
    copied: boolean;
    size?: IconSize;
    class?: string;
  }

  let { copied, size = "md", class: className }: Props = $props();
</script>

<span
  class={cn("relative inline-grid shrink-0 place-items-center", className)}
  style="width: {ICON_SIZES[size]}px; height: {ICON_SIZES[size]}px;"
>
  <svg
    {...svgProps(size)}
    class={cn(
      "absolute transition-[opacity,scale] duration-fast ease-out-strong",
      copied ? "scale-75 opacity-0" : "scale-100 opacity-100",
    )}
  >
    <rect x="8" y="8" width="14" height="14" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
  <svg
    {...svgProps(size)}
    class={cn(
      "absolute transition-[opacity,scale] duration-fast ease-out-strong",
      copied ? "scale-100 opacity-100" : "scale-75 opacity-0",
    )}
  >
    <path
      d="M20 6 9 17l-5-5"
      pathLength="1"
      stroke-dasharray="1"
      class={copied ? "animate-icon-check-draw" : "[stroke-dashoffset:1]"}
    />
  </svg>
</span>
