<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /**
   * The Atlas mark: three rising strokes.
   *
   * `currentColor`, so it takes the ink of whatever it sits in: a rail item,
   * a login header, a workspace switcher trigger. Our own mark, unlike the
   * third-party ones in `brand-marks`, has no fixed colour.
   */
  let { class: className, ...rest }: SVGAttributes<SVGSVGElement> & { class?: string } = $props();
</script>

<svg
  viewBox="0 0 24 24"
  width="24"
  height="24"
  fill="currentColor"
  aria-hidden="true"
  class={cn("shrink-0", className)}
  {...rest}
>
  <path d="M7.4 4h3.1L6.6 20H3.5zM13.2 4h3.1l-3.9 16H9.3zM19 4h3.1l-3.9 16h-3.1z" />
</svg>
