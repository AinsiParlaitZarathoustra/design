<script lang="ts">
  import type { Snippet } from "svelte";
  import { DROPDOWN_COLLISION_AVOIDANCE, type Align, type CollisionAvoidance, type Side } from "./placement";
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
    /**
     * The root popup shifts along both axes (Base UI's `shift.crossAxis` for a
     * context menu); a submenu passes the popup defaults and no cross shift.
     */
    collisionAvoidance?: CollisionAvoidance;
    shiftCrossAxis?: boolean;
    children?: Snippet;
  }

  let {
    class: className,
    side = "bottom",
    sideOffset = -5,
    align = "start",
    alignOffset = 2,
    collisionAvoidance = DROPDOWN_COLLISION_AVOIDANCE,
    shiftCrossAxis = true,
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
  {collisionAvoidance}
  {shiftCrossAxis}
  class={className}
>
  {@render children?.()}
</DropdownMenuContent>
