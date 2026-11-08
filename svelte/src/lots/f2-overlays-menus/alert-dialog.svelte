<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { createPresence, useDismiss } from "./popup-presence.svelte";
  import { setAlertDialog } from "./alert-dialog-context";

  /**
   * The alert dialog root, ported from `alert-dialog.tsx` (`@base-ui/react/alert-
   * dialog`). A dialog that must be answered: Escape and its buttons close it, a
   * press outside does not. Uncontrolled by default (`defaultOpen`).
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
  const presence = createPresence();

  let trigger = $state<HTMLElement | null>(null);
  let popup = $state<HTMLElement | null>(null);
  let titleMounted = $state(false);
  let descriptionMounted = $state(false);
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
    if (!presence.mounted && returnFocusOnUnmount) {
      returnFocusOnUnmount = false;
      trigger?.focus({ preventScroll: true });
    }
  });

  // The least destructive control takes focus on opening: the first focusable one.
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
    inside: () => true,
    onDismiss: () => setOpen(false),
    pressOutside: false,
  });

  setAlertDialog({
    get open() {
      return open;
    },
    get mounted() {
      return presence.mounted;
    },
    get ending() {
      return presence.ending;
    },
    contentId: `alert-dialog-content-${uid}`,
    titleId: `alert-dialog-title-${uid}`,
    descriptionId: `alert-dialog-description-${uid}`,
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
