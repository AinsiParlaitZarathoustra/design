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
  // Set by Enter or Space on the trigger, read by the click they produce: a
  // keyboard open lands on the first row, a pointer (or scripted) click on the popup.
  let keyboardPress = false;

  const triggerProps = $derived({
    [anchorKey]: (node: HTMLElement) => {
      menu.setTrigger(node);
    },
    id: menu.triggerId,
    "data-slot": "dropdown-menu-trigger",
    "aria-haspopup": "menu" as const,
    "aria-expanded": menu.open,
    "aria-controls": menu.open ? menu.contentId : undefined,
    "data-popup-open": menu.open ? "" : undefined,
    // A click from Enter or Space opens onto the first row, as Base UI does for a
    // keyboard open; a pointer click focuses the popup.
    onclick: () => {
      const fromKeyboard = keyboardPress;
      keyboardPress = false;
      menu.setOpen(!menu.open, fromKeyboard ? "first" : "popup");
    },
    onkeydown: (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") keyboardPress = true;
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      menu.setOpen(true, event.key === "ArrowDown" ? "first" : "last");
    },
  });
</script>

{#if child}
  {@render child(triggerProps)}
{:else}
  <button type="button" {...triggerProps}>{@render children?.()}</button>
{/if}
