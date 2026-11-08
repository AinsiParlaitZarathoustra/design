<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import { CANVAS_DOTS } from "./canvas-chrome";

  /**
   * The plane a canvas draws on: the background with a dotted grid, filling its
   * parent. Pills, the dock and the minimap position against it.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    style?: string;
    children?: Snippet;
  }

  let { class: className, style, children, ...rest }: Props = $props();
</script>

<div
  data-slot="canvas-surface"
  class={cn("relative size-full overflow-hidden bg-background", className)}
  style={`background-image: ${CANVAS_DOTS.backgroundImage}; background-size: ${CANVAS_DOTS.backgroundSize}; ${style ?? ""}`}
  {...rest}
>
  {@render children?.()}
</div>
