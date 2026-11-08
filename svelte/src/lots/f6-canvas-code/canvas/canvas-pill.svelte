<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import { CANVAS_CORNER, CANVAS_GLASS, type CanvasCorner } from "./canvas-chrome";

  /** A glass pill pinned to a corner of the canvas, 12px in. */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    corner: CanvasCorner;
    class?: string;
    children: Snippet;
  }

  let { corner, class: className, children, ...rest }: Props = $props();
</script>

<div
  data-slot="canvas-pill"
  class={cn(
    "absolute z-panel flex h-8 items-center gap-1 px-1",
    CANVAS_GLASS,
    CANVAS_CORNER[corner],
    className,
  )}
  {...rest}
>
  {@render children()}
</div>
