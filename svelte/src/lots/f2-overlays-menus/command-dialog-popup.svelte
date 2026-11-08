<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { cn } from "../../lib/utils";
  import { portal } from "./portal";
  import { createPresence, useDismiss } from "./popup-presence.svelte";
  import { getCommandDialog } from "./command-context";

  /**
   * The palette's popup, ported from `CommandDialogPopup`: a centred-top dialog
   * over a scrim, with no open or close animation (it opens hundreds of times a
   * day). Its first focusable element (the field) takes focus on opening; Escape
   * or a press outside closes it, and focus returns to the trigger.
   */
  interface Props {
    /** The dialog's accessible name, read out on open. */
    title: string;
    class?: string;
    children?: Snippet;
  }

  let { title, class: className, children }: Props = $props();
  const dialog = getCommandDialog();
  const presence = createPresence();
  let popupEl = $state<HTMLElement | null>(null);

  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  $effect(() => {
    const isOpen = dialog.open;
    untrack(() => {
      if (isOpen) presence.show();
      else presence.hide(true);
    });
  });

  $effect(() => {
    if (!presence.mounted || !dialog.open) return;
    const frame = requestAnimationFrame(() => {
      const first = popupEl?.querySelector<HTMLElement>(FOCUSABLE) ?? popupEl;
      first?.focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(frame);
      if (popupEl?.contains(document.activeElement)) dialog.trigger?.focus({ preventScroll: true });
    };
  });

  useDismiss({
    active: () => dialog.open,
    inside: (target) => target instanceof Node && !!popupEl?.contains(target),
    onDismiss: () => dialog.setOpen(false),
  });
</script>

{#if presence.mounted}
  <div use:portal data-slot="command-dialog-backdrop" class="fixed inset-0 z-overlay scrim"></div>
  <div
    bind:this={popupEl}
    use:portal
    data-slot="command-dialog-popup"
    role="dialog"
    aria-modal="true"
    aria-labelledby={dialog.titleId}
    id={dialog.contentId}
    tabindex="-1"
    class={cn(
      // High rather than centred: the list grows downward, and a centred
      // dialog would move its own field as the results filter.
      "fixed top-[12vh] left-1/2 z-modal -translate-x-1/2",
      "flex w-[min(46rem,calc(100vw-2rem))] max-h-[76vh] flex-col overflow-hidden",
      "rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none",
      className,
    )}
  >
    <h2 id={dialog.titleId} class="sr-only">{title}</h2>
    {@render children?.()}
  </div>
{/if}
