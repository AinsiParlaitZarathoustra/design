<script lang="ts">
  import type { Snippet } from "svelte";
  import { ChevronRight } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import { menuItemVariants } from "./menu-variants";
  import { getMenu } from "./menu-context";

  /**
   * The row that opens a submenu. A pointer over it opens the submenu without
   * moving focus; a click, Enter, Space or the right arrow opens it with focus in.
   */
  interface Props {
    class?: string;
    inset?: boolean;
    children?: Snippet;
  }

  let { class: className, inset = false, children }: Props = $props();
  const menu = getMenu();

  // What opened the submenu. As Floating UI's `useClick` with `stickIfOpen`, a
  // click only closes a submenu a click opened: one the pointer opened stays open.
  let openedBy: "pointer" | "press" | null = null;

  function toggle(focus: "popup" | "first") {
    openedBy = menu.open ? null : "press";
    menu.setOpen(!menu.open, focus);
  }
</script>

<div
  role="menuitem"
  id={menu.triggerId}
  tabindex="-1"
  aria-haspopup="menu"
  aria-expanded={menu.open}
  aria-controls={menu.open ? menu.contentId : undefined}
  data-slot="dropdown-menu-sub-trigger"
  data-inset={inset ? "" : undefined}
  data-popup-open={menu.open ? "" : undefined}
  class={menuItemVariants({
    className: cn("data-popup-open:bg-element-hover data-popup-open:text-foreground", className),
  })}
  {@attach (node: HTMLElement) => {
    menu.setTrigger(node);
  }}
  onpointerenter={() => {
    if (menu.open) return;
    openedBy = "pointer";
    menu.setOpen(true, "none");
  }}
  onclick={() => {
    if (!(menu.open && openedBy === "pointer")) toggle("popup");
  }}
  onkeydown={(event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (!menu.open) openedBy = "press";
      menu.setOpen(true, "first");
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle("first");
    }
  }}
>
  {@render children?.()}
  <ChevronRight class="ml-auto" />
</div>
