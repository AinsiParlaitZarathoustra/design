<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { cn } from "../../lib/utils";
  import Positioner from "./positioner.svelte";
  import { createPresence } from "./popup-presence.svelte";
  import { POPUP_EXIT } from "./popup-motion";
  import type { Align, Side } from "./placement";
  import {
    setInsidePopup,
    getComboboxStore,
    type ComboboxAnchor,
  } from "./combobox-store.svelte";

  /**
   * The combobox's popup, ported from `ComboboxContent` (Portal > Positioner >
   * Popup). Placed against its input, or against `anchor` (a chips container)
   * when one is given. It does not take focus: the field keeps it while the list
   * is open. Its items are filtered by the root, and an empty list marks it
   * `data-empty`, which shows `ComboboxEmpty`.
   */
  interface Props {
    side?: Side;
    sideOffset?: number;
    align?: Align;
    alignOffset?: number;
    anchor?: ComboboxAnchor | null;
    class?: string;
    "aria-label"?: string;
    children?: Snippet;
  }

  let {
    side = "bottom",
    sideOffset = 6,
    align = "start",
    alignOffset = 0,
    anchor = null,
    class: className,
    "aria-label": ariaLabel,
    children,
  }: Props = $props();

  const store = getComboboxStore();
  const presence = createPresence();
  setInsidePopup();
  $effect.pre(() => {
    store.setAnchor(anchor);
  });

  const anchorEl = $derived(
    anchor ? anchor.current : store.inputInsidePopup ? store.triggerEl : store.inputEl,
  );

  $effect(() => {
    const isOpen = store.open;
    untrack(() => {
      if (isOpen) {
        presence.show();
      } else {
        presence.hide();
      }
    });
  });

  // Once the popup is mounted (its input has registered as inside it), the chosen label is
  // cleared from the field and the field takes focus, as Base UI's popup does.
  $effect(() => {
    if (!presence.mounted || !store.inputInsidePopup) return;
    untrack(() => store.clearChosenText());
    const frame = requestAnimationFrame(() => store.focusInput());
    return () => cancelAnimationFrame(frame);
  });
</script>

{#if presence.mounted}
  <Positioner anchor={anchorEl} {side} {align} {sideOffset} {alignOffset} class="isolate z-popover">
    <div
      {@attach (node: HTMLElement) => {
        store.popupEl = node;
        return () => {
          if (store.popupEl === node) store.popupEl = null;
        };
      }}
      data-slot="combobox-content"
      data-chips={anchor ? "true" : "false"}
      data-empty={store.empty ? "" : undefined}
      data-ending-style={presence.ending ? "" : undefined}
      role="presentation"
      aria-label={ariaLabel}
      onmousedown={(event) => {
        if (!(event.target instanceof HTMLInputElement)) event.preventDefault();
      }}
      class={cn(
        "group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) animate-scale-in overflow-hidden rounded-lg border border-border bg-popover text-foreground shadow-md data-[chips=true]:min-w-(--anchor-width) *:data-[slot=input-group]:m-0.5 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-control-md *:data-[slot=input-group]:border-none *:data-[slot=input-group]:bg-element-hover",
        "**:data-[slot=input-group-control]:focus-visible:outline-none",
        POPUP_EXIT,
        className,
      )}
    >
      {@render children?.()}
    </div>
  </Positioner>
{/if}
