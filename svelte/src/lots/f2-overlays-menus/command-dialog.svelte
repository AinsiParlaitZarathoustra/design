<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { setCommandDialog } from "./command-context";

  /**
   * The command dialog root, ported from `command.tsx` (`CommandDialog`, Base UI's
   * dialog). Uncontrolled by default (`defaultOpen`); `open` with `onOpenChange`
   * makes it controlled.
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
  const uid = $props.id();

  function setOpen(next: boolean) {
    if (next === open) return;
    if (!controlled) internalOpen = next;
    onOpenChange?.(next);
  }

  setCommandDialog({
    get open() {
      return open;
    },
    titleId: `command-dialog-title-${uid}`,
    contentId: `command-dialog-popup-${uid}`,
    get trigger() {
      return trigger;
    },
    setOpen,
    setTrigger(element: HTMLElement | null) {
      trigger = element;
    },
  });
</script>

{@render children?.()}
