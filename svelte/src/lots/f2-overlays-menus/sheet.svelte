<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { createPresence, useDismiss } from "./popup-presence.svelte";
  import { setSheet } from "./sheet-context";

  /**
   * The sheet root, ported from `sheet.tsx` (`@base-ui/react/dialog`): a panel that
   * slides in from an edge over a soft scrim. A press outside, or Escape, closes it;
   * focus goes to its first focusable element on opening and returns to the trigger
   * when it closes. The exit waits out the 260ms slow transition.
   */
  interface Props {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: Snippet;
  }

  let { open: openProp, defaultOpen = false, onOpenChange, children }: Props = $props();

  const controlled = $derived(openProp !== undefined);
  let internalOpen = $state(untrack(() => defaultOpen));
  const open = $derived(controlled ? openProp! : internalOpen);
  const presence = createPresence(260);

  let trigger = $state<HTMLElement | null>(null);
  let popup = $state<HTMLElement | null>(null);
  let titleMounted = $state(false);
  let descriptionMounted = $state(false);
  // Set on opening, and cleared after two frames: the entrance starts from its
  // starting style, and the transition runs to the open one.
  let starting = $state(false);
  let returnFocusOnUnmount = false;

  const uid = $props.id();
  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function setOpen(next: boolean) {
    if (next === open) return;
    if (!controlled) internalOpen = next;
    onOpenChange?.(next);
  }

  $effect(() => {
    const isOpen = open;
    untrack(() => {
      if (isOpen) presence.show();
      else presence.hide();
    });
  });

  $effect(() => {
    if (!open) return;
    starting = true;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        starting = false;
      });
    });
    return () => cancelAnimationFrame(frame);
  });

  $effect(() => {
    if (!presence.mounted && returnFocusOnUnmount) {
      returnFocusOnUnmount = false;
      trigger?.focus({ preventScroll: true });
    }
  });

  $effect(() => {
    if (!presence.mounted || !open) return;
    const frame = requestAnimationFrame(() => {
      const target = popup?.querySelector<HTMLElement>(FOCUSABLE) ?? popup;
      target?.focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(frame);
      if (popup?.contains(document.activeElement)) returnFocusOnUnmount = true;
    };
  });

  useDismiss({
    active: () => open,
    inside: (target) => target instanceof Node && !!popup?.contains(target),
    onDismiss: () => setOpen(false),
  });

  setSheet({
    get open() {
      return open;
    },
    get mounted() {
      return presence.mounted;
    },
    get ending() {
      return presence.ending;
    },
    get starting() {
      return starting;
    },
    contentId: `sheet-content-${uid}`,
    titleId: `sheet-title-${uid}`,
    descriptionId: `sheet-description-${uid}`,
    get hasTitle() {
      return titleMounted;
    },
    get hasDescription() {
      return descriptionMounted;
    },
    get trigger() {
      return trigger;
    },
    setOpen,
    setTrigger(element: HTMLElement | null) {
      trigger = element;
    },
    setPopup(element: HTMLElement | null) {
      popup = element;
    },
    registerTitle(mounted: boolean) {
      titleMounted = mounted;
    },
    registerDescription(mounted: boolean) {
      descriptionMounted = mounted;
    },
  });
</script>

{@render children?.()}
