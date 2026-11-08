<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * Draws a Lucide node list with lucide-svelte's SVG attributes (lot f7 dependency).
   * Used for the glyphs whose geometry in lucide-react 1.67 differs from the
   * same-named lucide-svelte 1.0.1 icon: the Icon wrapper passes size, stroke
   * width and class, as it does to any glyph.
   */
  type IconNode = [string, Record<string, string>][];

  interface Props {
    node: IconNode;
    size?: number;
    strokeWidth?: number;
    class?: string;
    [attribute: string]: unknown;
  }

  let { node, size = 24, strokeWidth = 2, class: className, ...rest }: Props = $props();
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
  class={cn("lucide", className)}
  {...rest}
>
  {#each node as [tag, attrs], i (i)}
    <svelte:element this={tag} {...attrs} />
  {/each}
</svg>
