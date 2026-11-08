<script lang="ts">
  import { cn } from "../../lib/utils";
  import { defersColor } from "./agent-icon";

  /**
   * An agent's icon from a registry manifest, as an SVG data URL.
   *
   * - `currentColor` (monochrome): a CSS mask filled with `currentColor`, so
   *   the glyph takes the surrounding ink in any theme. A mask cannot run
   *   script, which matters for artwork fetched from a third-party registry.
   * - anything else (real brand colours): an image, untouched.
   *
   * Neither path injects the SVG's markup into the DOM.
   */
  interface Props {
    dataUrl: string;
    size?: number;
    class?: string;
  }

  let { dataUrl, size = 14, class: className }: Props = $props();

  const deferred = $derived(defersColor(dataUrl));
  const mask = $derived(`url("${dataUrl}") center / contain no-repeat`);
</script>

{#if deferred}
  <span
    aria-hidden="true"
    class={cn("inline-block shrink-0 bg-current", className)}
    style="width: {size}px; height: {size}px; mask: {mask}; -webkit-mask: {mask};"
  ></span>
{:else}
  <img
    src={dataUrl}
    width={size}
    height={size}
    alt=""
    aria-hidden="true"
    class={cn("shrink-0 rounded-sm object-contain", className)}
  />
{/if}
