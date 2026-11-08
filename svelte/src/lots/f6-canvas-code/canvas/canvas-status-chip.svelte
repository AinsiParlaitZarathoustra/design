<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import { CANVAS_GLASS } from "./canvas-chrome";

  /**
   * A short line of state at the bottom centre of the canvas, clear of a bottom
   * dock: "Uploading media…", "Following Ana — press Esc to stop". Pass
   * `role="status"` when the change should be announced.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  data-slot="canvas-status-chip"
  class={cn(
    "absolute bottom-18 left-1/2 z-panel flex h-8 max-w-[calc(100%-1.5rem)] -translate-x-1/2 items-center gap-2 px-3",
    CANVAS_GLASS,
    "rounded-full text-xs font-medium text-secondary-foreground",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
