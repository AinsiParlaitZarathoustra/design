<script lang="ts">
  import type { Snippet } from "svelte";
  import { createAttachmentKey } from "svelte/attachments";
  import { getMenu } from "./menu-context";

  /**
   * The control that opens its menu. `child` renders another element with the
   * trigger's props spread on it (the Svelte form of Base UI's `render`). The
   * down arrow opens the menu with its first row focused.
   */
  interface Props {
    child?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
  }

  let { child, children }: Props = $props();
  const menu = getMenu();
  const anchorKey = createAttachmentKey();

  const triggerProps = $derived({
    [anchorKey]: (node: HTMLElement) => {
      menu.setTrigger(node);
    },
    "data-slot": "dropdown-menu-trigger",
    "aria-haspopup": "menu" as const,
    "aria-expanded": menu.open,
    "aria-controls": menu.open ? menu.contentId : undefined,
    "data-popup-open": menu.open ? "" : undefined,
    onclick: () => {
      menu.setOpen(!menu.open, "popup");
    },
    onkeydown: (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown") return;
      event.preventDefault();
      menu.setOpen(true, "first");
    },
  });
</script>

{#if child}
  {@render child(triggerProps)}
{:else}
  <button type="button" {...triggerProps}>{@render children?.()}</button>
{/if}
