<script lang="ts">
  import type { Snippet } from "svelte";
  import { createAttachmentKey } from "svelte/attachments";
  import { getPopover } from "./popover-context";

  /**
   * The button that toggles its popover. `child` renders another element with the
   * trigger's props spread on it (the Svelte form of Base UI's `render`).
   */
  interface Props {
    child?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
  }

  let { child, children }: Props = $props();
  const popover = getPopover();
  const anchorKey = createAttachmentKey();

  const triggerProps = $derived({
    [anchorKey]: (node: HTMLElement) => {
      popover.setTrigger(node);
    },
    "data-slot": "popover-trigger",
    "aria-haspopup": "dialog" as const,
    "aria-expanded": popover.open,
    "aria-controls": popover.open ? popover.contentId : undefined,
    onclick: () => {
      popover.setOpen(!popover.open);
    },
  });
</script>

{#if child}
  {@render child(triggerProps)}
{:else}
  <button type="button" {...triggerProps}>{@render children?.()}</button>
{/if}
