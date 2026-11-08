<script lang="ts">
  import type { Snippet } from "svelte";
  import { setDialog, type DialogApi, type DialogPhase } from "./context";

  /**
   * The house dialog (decision 16), ported from `@tryatlas/design` 0.1.15.
   *
   * `bind:open` is the controlled form; `defaultOpen` the uncontrolled one.
   * The open/closed phases are kept in the DOM (`data-open` / `data-closed`)
   * so the source's scale and fade animations run, and the panel stays mounted
   * for the exit before it is removed.
   */
  interface Props {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: Snippet;
  }

  let {
    open = $bindable<boolean | undefined>(undefined),
    defaultOpen = false,
    onOpenChange,
    children,
  }: Props = $props();

  let internal = $state(defaultOpen);
  const controlled = $derived(open !== undefined);
  const isOpen = $derived(controlled ? open! : internal);

  const uid = $props.id();
  const baseId = `dialog-${uid}`;
  let visible = $state(defaultOpen);
  let phase = $state<DialogPhase>(defaultOpen ? "open" : "closed");
  let hasTitle = $state(false);
  let hasDescription = $state(false);
  let previousFocus: Element | null = null;

  function announce(next: boolean) {
    if (controlled) open = next;
    else internal = next;
    onOpenChange?.(next);
  }

  function openDialog() {
    if (visible) {
      // Reopening during the exit cancels it: the panel never unmounts.
      if (phase === "closing") phase = "open";
      return;
    }
    previousFocus = document.activeElement;
    visible = true;
    phase = "opening";
    announce(true);
    requestAnimationFrame(() => {
      if (visible && phase === "opening") phase = "open";
    });
  }

  function requestClose() {
    if (!visible || phase === "closing" || phase === "closed") return;
    phase = "closing";
  }

  function finishClose() {
    if (!visible) return;
    visible = false;
    phase = "closed";
    announce(false);
  }

  const api: DialogApi = {
    baseId,
    titleId: `${baseId}-title`,
    descriptionId: `${baseId}-description`,
    get visible() {
      return visible;
    },
    set visible(value: boolean) {
      visible = value;
    },
    get phase() {
      return phase;
    },
    set phase(value: DialogPhase) {
      phase = value;
    },
    get hasTitle() {
      return hasTitle;
    },
    get hasDescription() {
      return hasDescription;
    },
    get previousFocus() {
      return previousFocus;
    },
    open: openDialog,
    requestClose,
    finishClose,
    registerTitle() {
      hasTitle = true;
    },
    registerDescription() {
      hasDescription = true;
    },
  };

  setDialog(api);

  // A controlled parent can open or close the dialog after mount.
  $effect(() => {
    if (isOpen && !visible) openDialog();
    else if (!isOpen && visible && phase !== "closing") requestClose();
  });

  // The exit animation is 120ms; a timer finishes the phase even when the
  // animation is skipped (reduced motion, animations off in a test).
  $effect(() => {
    if (phase !== "closing") return;
    const timer = setTimeout(finishClose, 140);
    return () => clearTimeout(timer);
  });
</script>

{@render children?.()}
