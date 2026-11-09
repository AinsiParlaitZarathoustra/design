<script lang="ts">
  import type { Snippet } from "svelte";
  import { createAttachmentKey } from "svelte/attachments";
  import { getTooltip, isFocusVisible } from "./tooltip-context";

  /**
   * The element that opens its tooltip on hover or keyboard focus. `child`
   * renders another element with the trigger's props spread on it (the Svelte
   * form of Base UI's `render`); without it the trigger is a button.
   */
  interface Props {
    child?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
  }

  let { child, children }: Props = $props();
  const tip = getTooltip();
  // The trigger's element is the popup's anchor from the moment it renders, so a
  // controlled tooltip (open from the start) is placed without any pointer event.
  const anchorKey = createAttachmentKey();

  const triggerProps = $derived({
    [anchorKey]: (node: HTMLElement) => {
      tip.setAnchor(node);
    },
    "data-slot": "tooltip-trigger",
    "aria-describedby": tip.open ? tip.contentId : undefined,
    onpointerenter: (event: PointerEvent) => {
      tip.setAnchor(event.currentTarget as HTMLElement);
      tip.requestOpen();
    },
    onpointerleave: () => {
      tip.cancelPending();
      tip.requestClose();
    },
    onpointerdown: () => {
      tip.cancelPending();
      tip.requestClose();
    },
    // A press closes it from the keyboard too (Enter, Space), as Base UI's trigger does.
    onclick: () => {
      tip.cancelPending();
      tip.requestClose();
    },
    onfocus: (event: FocusEvent) => {
      if (!isFocusVisible(event.currentTarget)) return;
      tip.setAnchor(event.currentTarget as HTMLElement);
      tip.requestOpen();
    },
    onblur: () => {
      tip.cancelPending();
      tip.requestClose();
    },
  });
</script>

{#if child}
  {@render child(triggerProps)}
{:else}
  <button type="button" {...triggerProps}>{@render children?.()}</button>
{/if}
