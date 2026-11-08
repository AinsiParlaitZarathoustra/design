<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { useDismiss } from "./popup-presence.svelte";
  import { setPopover } from "./popover-context";

  /**
   * The popover root, ported from `popover.tsx` (`@base-ui/react/popover`).
   * Uncontrolled by default (`defaultOpen`); `open` with `onOpenChange` makes it
   * controlled. A press outside the popup, or Escape, closes it.
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

  let trigger = $state<HTMLElement | null>(null);
  let popup = $state<HTMLElement | null>(null);
  let titleMounted = $state(false);
  let descriptionMounted = $state(false);

  const uid = $props.id();

  function setOpen(next: boolean) {
    if (next === open) return;
    if (!controlled) internalOpen = next;
    onOpenChange?.(next);
  }

  setPopover({
    get open() {
      return open;
    },
    contentId: `popover-content-${uid}`,
    titleId: `popover-title-${uid}`,
    descriptionId: `popover-description-${uid}`,
    get hasTitle() {
      return titleMounted;
    },
    get hasDescription() {
      return descriptionMounted;
    },
    get trigger() {
      return trigger;
    },
    get popup() {
      return popup;
    },
    setTrigger(element: HTMLElement | null) {
      trigger = element;
    },
    setPopup(element: HTMLElement | null) {
      popup = element;
    },
    setOpen,
    registerTitle(mounted: boolean) {
      titleMounted = mounted;
    },
    registerDescription(mounted: boolean) {
      descriptionMounted = mounted;
    },
  });

  useDismiss({
    active: () => open,
    inside: (target) =>
      target instanceof Node && (!!popup?.contains(target) || !!trigger?.contains(target)),
    onDismiss: () => setOpen(false),
  });
</script>

{@render children?.()}
