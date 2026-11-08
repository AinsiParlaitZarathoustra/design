<script lang="ts">
  import type { Snippet } from "svelte";
  import { useDismiss } from "./popup-presence.svelte";
  import { getMenu, setMenu, type InitialFocus } from "./menu-context";

  /**
   * A submenu: a menu opened from a row of the menu above. It has its own open
   * state and its own rows, and closing it all (a choice made in it) closes every
   * menu above too. Opening it on hover does not move focus into it.
   */
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
  const parent = getMenu();

  let open = $state(false);
  let trigger = $state<HTMLElement | null>(null);
  let popup = $state<HTMLElement | null>(null);
  let initialFocus = $state<InitialFocus>("popup");
  let openSubmenus = $state(0);
  const uid = $props.id();

  function setOpen(next: boolean, focus: InitialFocus = "popup") {
    if (next === open) return;
    initialFocus = focus;
    open = next;
    parent.registerSubmenu(next);
  }

  setMenu({
    get open() {
      return open;
    },
    isSub: true,
    contentId: `dropdown-menu-sub-content-${uid}`,
    get trigger() {
      return trigger;
    },
    get popup() {
      return popup;
    },
    get initialFocus() {
      return initialFocus;
    },
    setOpen,
    setTrigger(element: HTMLElement | null) {
      trigger = element;
    },
    setPopup(element: HTMLElement | null) {
      popup = element;
    },
    closeAll() {
      setOpen(false);
      parent.closeAll();
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
