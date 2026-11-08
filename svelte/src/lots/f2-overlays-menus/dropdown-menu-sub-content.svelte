<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import { POPUP_COLLISION_AVOIDANCE, type Align, type Side } from "./placement";
  import DropdownMenuContent from "./dropdown-menu-content.svelte";

  /**
   * The submenu's popup: the menu popup placed to the right of its row, lined up
   * with it (the defaults are the alignment the source gives a submenu).
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
    side = "right",
    sideOffset = 0,
    align = "start",
    alignOffset = -3,
    children,
  }: Props = $props();
</script>

<DropdownMenuContent
  dataSlot="dropdown-menu-sub-content"
  {align}
  {alignOffset}
  {side}
  {sideOffset}
  collisionAvoidance={POPUP_COLLISION_AVOIDANCE}
  class={cn("w-auto min-w-[10rem]", className)}
>
  {@render children?.()}
</DropdownMenuContent>
