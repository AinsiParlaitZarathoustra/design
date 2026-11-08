<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Align, Side } from "./placement";
  import DropdownMenuContent from "./dropdown-menu-content.svelte";

  /**
   * The right-click popup, placed at the pointer by the positioner. Its defaults
   * (below, starting two pixels right of the pointer and five above it) are the
   * source's, measured on the oracle.
   */
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
    side = "bottom",
    sideOffset = -5,
    align = "start",
    alignOffset = 2,
    children,
  }: Props = $props();
</script>

<DropdownMenuContent
  surface="context"
  dataSlot="context-menu-content"
  {side}
  {sideOffset}
  {align}
  {alignOffset}
  class={className}
>
  {@render children?.()}
</DropdownMenuContent>
