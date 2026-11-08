<script lang="ts">
  import type { Snippet } from "svelte";
  import Popover from "./popover.svelte";
  import { MENU_CONTENT } from "./menu-classes";

  /**
   * Local adapter for `DropdownMenu` (`src/ui/dropdown-menu.tsx`, lot f7
   * dependency): a menu panel on the popover anchor. The content receives
   * `close`, so an item can close the menu it sits in, as Base UI's items do.
   */
  interface Props {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger: Snippet<[{ onclick: () => void; "aria-expanded": boolean; "aria-haspopup": "dialog" | "menu" }]>;
    children: Snippet<[() => void]>;
    side?: "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
  }

  let {
    open = $bindable(false),
    onOpenChange,
    trigger,
    children,
    side = "bottom",
    align = "start",
    sideOffset = 4,
  }: Props = $props();
</script>

<Popover
  bind:open
  {onOpenChange}
  {trigger}
  {side}
  {align}
  {sideOffset}
  role="menu"
  class={MENU_CONTENT}
  {children}
/>
