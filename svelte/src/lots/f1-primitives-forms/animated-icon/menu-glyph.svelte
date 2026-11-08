<script lang="ts">
  import { cn } from "../../../lib/utils";
  import type { IconSize } from "../../../ui/icon.svelte";
  import { svgProps } from "./svg-props";

  /**
   * Three bars that shuffle their widths, ported from `MenuGlyph` in
   * `src/ui/animated-icon.tsx`. All three are right-aligned to x=21.
   */
  interface Props {
    active: boolean;
    size?: IconSize;
    class?: string;
  }

  let { active, size = "md", class: className }: Props = $props();

  const bar =
    "origin-right [transform-box:fill-box] transition-transform duration-fast ease-out-strong";
</script>

<svg {...svgProps(size)} class={cn("shrink-0", className)}>
  <path d="M3 6h18" class={cn(bar, active ? "scale-x-50" : "scale-x-100")} />
  <path d="M12 12h9" class={cn(bar, active ? "scale-x-[2]" : "scale-x-100")} />
  <path d="M7.5 18h13.5" class={cn(bar, active ? "scale-x-[0.667]" : "scale-x-100")} />
</svg>
