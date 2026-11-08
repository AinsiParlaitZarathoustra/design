<script lang="ts">
  import type { Snippet } from "svelte";
  import { createAttachmentKey } from "svelte/attachments";
  import { getAlertDialog } from "./alert-dialog-context";

  /** The control that opens the dialog. `child` renders another element with the trigger's props spread on it. */
  interface Props {
    child?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
  }

  let { child, children }: Props = $props();
  const api = getAlertDialog();
  const anchorKey = createAttachmentKey();

  const triggerProps = $derived({
    [anchorKey]: (node: HTMLElement) => {
      api.setTrigger(node);
    },
    "data-slot": "alert-dialog-trigger",
    "aria-haspopup": "dialog" as const,
    "aria-expanded": api.open,
    onclick: () => {
      api.setOpen(true);
    },
  });
</script>

{#if child}
  {@render child(triggerProps)}
{:else}
  <button type="button" {...triggerProps}>{@render children?.()}</button>
{/if}
