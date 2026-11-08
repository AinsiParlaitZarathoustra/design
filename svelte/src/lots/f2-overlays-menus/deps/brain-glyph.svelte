<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /**
   * Lucide's `brain` in the geometry the source draws (lucide-react 1.67). The
   * lucide-svelte 1.0.1 glyph of the same name is an older drawing, and at 16px the
   * two differ by a few pixels, so this local adapter keeps the port on the source's
   * shapes. Same contract as a Lucide Svelte icon, so `Icon` renders it unchanged.
   */
  interface Props extends Omit<SVGAttributes<SVGSVGElement>, "class"> {
    size?: number;
    strokeWidth?: number;
    class?: string;
  }

  let { size = 24, strokeWidth = 2, class: className, ...rest }: Props = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={cn("lucide lucide-brain", className)}
  {...rest}
>
  <path d="M12 18V5" />
  <path d="M15 13a4.17 4.17 0 01-3-4 4.17 4.17 0 01-3 4" />
  <path d="M17.707 6.294A3 3 0 1012 5a3 3 0 10-5.707 1.294" />
  <path d="M17.996 5.125a4 4 0 012.526 5.77" />
  <path d="M18 18a4 4 0 002-7.465" />
  <path d="M19.967 17.482a4 4 0 11-7.967.517 4 4 0 11-7.967-.517" />
  <path d="M6 18a4 4 0 01-2-7.465" />
  <path d="M6.004 5.125a4 4 0 00-2.526 5.77" />
</svg>
