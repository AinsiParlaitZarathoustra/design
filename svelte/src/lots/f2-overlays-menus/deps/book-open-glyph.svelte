<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /**
   * Lucide's `book-open` in the geometry the source draws (lucide-react 1.67). The
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
  class={cn("lucide lucide-book-open", className)}
  {...rest}
>
  <path d="M12 5v16" />
  <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
</svg>
