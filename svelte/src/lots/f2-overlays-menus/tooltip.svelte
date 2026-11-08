<script lang="ts">
  import type { Snippet } from "svelte";
  import { onDestroy, untrack } from "svelte";
  import {
    isTooltipWarm,
    markTooltipClosed,
    markTooltipOpen,
    TOOLTIP_OPEN_DELAY,
  } from "../../ui/tooltip-timing";
  import { useDismiss } from "./popup-presence.svelte";
  import { setTooltip } from "./tooltip-context";

  /**
   * The tooltip root, ported from `tooltip.tsx`. Uncontrolled tooltips take their
   * timing from `tooltip-timing.ts`: the first waits the shared open delay, and
   * one opened straight after another (inside the warm window) opens instantly
   * without its entrance. A controlled tooltip (`open` passed) is left to its
   * owner: it opens and closes exactly when told.
   */
  interface Props {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Override the shared open delay for this tooltip. */
    delay?: number;
    children?: Snippet;
  }

  let { open: openProp, defaultOpen = false, onOpenChange, delay, children }: Props = $props();

  const controlled = $derived(openProp !== undefined);
  let internalOpen = $state(untrack(() => defaultOpen));
  let instant = $state(false);
  let anchor = $state<HTMLElement | null>(null);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const uid = $props.id();
  const contentId = `tooltip-content-${uid}`;
  const open = $derived(controlled ? openProp! : internalOpen);

  function setOpen(next: boolean) {
    if (!controlled) internalOpen = next;
    onOpenChange?.(next);
  }

  function requestOpen() {
    if (controlled) {
      if (!open) onOpenChange?.(true);
      return;
    }
    clearTimeout(timer);
    if (open) return;
    const show = (warm: boolean) => {
      markTooltipOpen();
      instant = warm;
      setOpen(true);
    };
    const wait = delay ?? TOOLTIP_OPEN_DELAY;
    if (isTooltipWarm() || wait === 0) show(isTooltipWarm());
    else timer = setTimeout(() => show(false), wait);
  }

  function requestClose() {
    clearTimeout(timer);
    if (controlled) {
      if (open) onOpenChange?.(false);
      return;
    }
    if (!open) return;
    markTooltipClosed();
    setOpen(false);
  }

  setTooltip({
    get open() {
      return open;
    },
    get instant() {
      return instant;
    },
    contentId,
    get anchor() {
      return anchor;
    },
    setAnchor(element: HTMLElement) {
      anchor = element;
    },
    requestOpen,
    requestClose,
    cancelPending() {
      clearTimeout(timer);
    },
  });

  useDismiss({
    active: () => open,
    inside: () => false,
    onDismiss: requestClose,
  });

  onDestroy(() => {
    clearTimeout(timer);
    if (!controlled && untrack(() => internalOpen)) markTooltipClosed();
  });
</script>

{@render children?.()}
