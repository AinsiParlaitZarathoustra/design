<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import type { Align, Side } from "./placement";
  import ContextMenuContent from "./context-menu-content.svelte";

  /** The right-click submenu: beside its row, lined up with it. */
  interface Props {
    class?: string;
    side?: Side;
    sideOffset?: number;
    align?: Align;
    alignOffset?: number;
    children?: Snippet;
  }

  let {
    class: className,
    side = "right",
    sideOffset = 0,
    align = "start",
    alignOffset = 4,
    children,
  }: Props = $props();
</script>

<ContextMenuContent {side} {sideOffset} {align} {alignOffset} class={cn("min-w-[10rem]", className)}>
  {@render children?.()}
</ContextMenuContent>
