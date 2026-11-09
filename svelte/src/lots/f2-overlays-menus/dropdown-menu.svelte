<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { useDismiss } from "./popup-presence.svelte";
  import { setMenu, type InitialFocus } from "./menu-context";

  /**
   * The dropdown menu root, ported from `dropdown-menu.tsx` (`@base-ui/react/menu`).
   * A trigger-anchored list of commands. Uncontrolled by default (`defaultOpen`);
   * `open` with `onOpenChange` makes it controlled. A press outside it, or Escape,
   * closes it. While a submenu is open, the root leaves Escape to the submenu.
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
  let initialFocus = $state<InitialFocus>("popup");
  let openSubmenus = $state(0);
  let point = $state<{ x: number; y: number } | null>(null);

  const uid = $props.id();

  function setOpen(next: boolean, focus: InitialFocus = "popup") {
    if (next === open) return;
    initialFocus = focus;
    if (!controlled) internalOpen = next;
    onOpenChange?.(next);
  }

  setMenu({
    get open() {
      return open;
    },
    isSub: false,
    contentId: `dropdown-menu-content-${uid}`,
    triggerId: `dropdown-menu-trigger-${uid}`,
    get trigger() {
      return trigger;
    },
    get rootTrigger() {
      return trigger;
    },
    get popup() {
      return popup;
    },
    get point() {
      return point;
    },
    get initialFocus() {
      return initialFocus;
    },
    setOpen,
    openAt(x: number, y: number) {
      point = { x, y };
      setOpen(true, "popup");
    },
    setTrigger(element: HTMLElement | null) {
      trigger = element;
    },
    setPopup(element: HTMLElement | null) {
      popup = element;
    },
    closeAll() {
      setOpen(false);
    },
    registerSubmenu(isOpen: boolean) {
      openSubmenus += isOpen ? 1 : -1;
    },
  });

  useDismiss({
    active: () => open && openSubmenus === 0,
    inside: (target) =>
      target instanceof Element &&
      (!!trigger?.contains(target) || target.closest('[role="menu"]') !== null),
    onDismiss: () => setOpen(false),
  });
</script>

{@render children?.()}
