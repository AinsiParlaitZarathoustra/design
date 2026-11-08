<script lang="ts">
  import type { Snippet } from "svelte";
  import { createAttachmentKey } from "svelte/attachments";
  import { getCommandDialog } from "./command-context";

  /** The control that opens the palette. `child` renders another element with the trigger's props spread on it. */
  interface Props {
    child?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
  }

  let { child, children }: Props = $props();
  const dialog = getCommandDialog();
  const anchorKey = createAttachmentKey();

  const triggerProps = $derived({
    [anchorKey]: (node: HTMLElement) => {
      dialog.setTrigger(node);
    },
    "data-slot": "dialog-trigger",
    "aria-haspopup": "dialog" as const,
    "aria-expanded": dialog.open,
    onclick: () => {
      dialog.setOpen(true);
    },
  });
</script>

{#if child}
  {@render child(triggerProps)}
{:else}
  <button type="button" {...triggerProps}>{@render children?.()}</button>
{/if}
