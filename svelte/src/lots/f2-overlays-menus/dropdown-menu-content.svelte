<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import Positioner from "./positioner.svelte";
  import { createPresence } from "./popup-presence.svelte";
  import { contextMenuContentVariants, menuContentVariants } from "./menu-variants";
  import { getMenu, menuRows } from "./menu-context";
  import type { Align, Placement, Side } from "./placement";

  /**
   * The menu popup, ported from `dropdown-menu.tsx` (`DropdownMenuContent`):
   * `Portal > Positioner > Popup`, with the positioning props on the positioner.
   * It takes focus on opening (its first row when the keyboard opened it) and
   * moves it between rows with the arrows, Home, End and typing a letter. On
   * close, focus that was inside returns to the trigger once the exit has run.
   */
  interface Props {
    class?: string;
    dataSlot?: string;
    side?: Side;
    sideOffset?: number;
    align?: Align;
    alignOffset?: number;
    /** Positions the menu against this element instead of the trigger. */
    anchor?: HTMLElement | null;
    /** `context` draws the right-click surface; `menu` the dropdown's. */
    surface?: "menu" | "context";
    children?: Snippet;
  }

  let {
    class: className,
    dataSlot = "dropdown-menu-content",
    surface = "menu",
    side = "bottom",
    sideOffset = 4,
    align = "start",
    alignOffset = 0,
    anchor = null,
    children: content,
  }: Props = $props();

  const menu = getMenu();
  const presence = createPresence();
  let popupEl = $state<HTMLElement | null>(null);
  let returnFocusOnUnmount = false;
  let suppressFocusReturn = false;

  $effect(() => {
    const isOpen = menu.open;
    untrack(() => {
      if (isOpen) presence.show();
      else presence.hide();
    });
  });

  $effect(() => {
    menu.setPopup(popupEl);
    return () => menu.setPopup(null);
  });

  $effect(() => {
    if (!presence.mounted && returnFocusOnUnmount) {
      returnFocusOnUnmount = false;
      menu.trigger?.focus({ preventScroll: true });
    }
  });

  $effect(() => {
    if (!presence.mounted || !menu.open) return;
    const focus = menu.initialFocus;
    if (focus === "none") return;
    const frame = requestAnimationFrame(() => {
      if (!popupEl) return;
      if (focus === "first") menuRows(popupEl)[0]?.focus({ preventScroll: true });
      else popupEl.focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(frame);
      // A press outside has already moved focus, and is left where it went.
      if (!suppressFocusReturn && popupEl?.contains(document.activeElement)) {
        returnFocusOnUnmount = true;
      }
      suppressFocusReturn = false;
    };
  });

  function handleKeydown(event: KeyboardEvent) {
    if (!popupEl) return;
    const rows = menuRows(popupEl);
    const current = rows.indexOf(document.activeElement as HTMLElement);
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        rows[(current + 1) % rows.length]?.focus();
        return;
      case "ArrowUp":
        event.preventDefault();
        rows[current <= 0 ? rows.length - 1 : current - 1]?.focus();
        return;
      case "Home":
        event.preventDefault();
        rows[0]?.focus();
        return;
      case "End":
        event.preventDefault();
        rows[rows.length - 1]?.focus();
        return;
      case "ArrowLeft":
        if (!menu.isSub) return;
        event.preventDefault();
        menu.setOpen(false);
        return;
      case "Tab":
        suppressFocusReturn = true;
        menu.closeAll();
        return;
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const letter = event.key.toLowerCase();
      const ordered = [...rows.slice(current + 1), ...rows.slice(0, current + 1)];
      const match = ordered.find((row) => row.textContent?.trim().toLowerCase().startsWith(letter));
      match?.focus();
    }
  }

  const popupClass = $derived(
    surface === "context" ? contextMenuContentVariants({ className }) : menuContentVariants({ className }),
  );
</script>

{#if presence.mounted}
  <Positioner
    anchor={anchor ?? menu.trigger}
    point={menu.point}
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    class="isolate z-popover outline-none"
  >
    {#snippet children(_placement: Placement | null)}
      <div
        bind:this={popupEl}
        data-slot={dataSlot}
        role="menu"
        aria-orientation="vertical"
        tabindex="-1"
        id={menu.contentId}
        data-ending-style={presence.ending ? "" : undefined}
        class={popupClass}
        onkeydown={handleKeydown}
      >
        {@render content?.()}
      </div>
    {/snippet}
  </Positioner>
{/if}
