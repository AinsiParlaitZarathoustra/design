<script lang="ts">
  import type { Snippet } from "svelte";
  import { ChevronRight } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import { getMenu } from "./menu-context";

  /** The row that opens a right-click submenu: a pointer over it opens it, a click or the right arrow opens it with focus in. */
  interface Props {
    class?: string;
    inset?: boolean;
    children?: Snippet;
  }

  let { class: className, inset = false, children }: Props = $props();
  const menu = getMenu();
</script>

<div
  role="menuitem"
  tabindex="-1"
  aria-haspopup="menu"
  aria-expanded={menu.open}
  aria-controls={menu.open ? menu.contentId : undefined}
  data-slot="context-menu-sub-trigger"
  data-inset={inset ? "" : undefined}
  data-popup-open={menu.open ? "" : undefined}
  class={cn(
    "flex items-center gap-2 rounded px-2 py-1 text-xs",
    "cursor-pointer select-none outline-none",
    "text-secondary-foreground",
    "focus:bg-element-hover focus:text-foreground",
    "data-popup-open:bg-element-hover data-popup-open:text-foreground",
    "data-[inset]:pl-6",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
    className,
  )}
  {@attach (node: HTMLElement) => {
    menu.setTrigger(node);
  }}
  onpointerenter={() => {
    if (!menu.open) menu.setOpen(true, "none");
  }}
  onclick={() => menu.setOpen(!menu.open, "popup")}
  onkeydown={(event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      menu.setOpen(true, "first");
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      menu.setOpen(!menu.open, "first");
    }
  }}
>
  {@render children?.()}
  <ChevronRight class="ml-auto" />
</div>
