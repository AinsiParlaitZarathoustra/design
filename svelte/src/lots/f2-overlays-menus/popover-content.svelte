<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { cn } from "../../lib/utils";
  import Positioner from "./positioner.svelte";
  import { createPresence } from "./popup-presence.svelte";
  import { POPUP_EXIT } from "./popup-motion";
  import { POPUP_COLLISION_AVOIDANCE, type Align, type Placement, type Side } from "./placement";
  import { getPopover } from "./popover-context";

  /**
   * The popover popup, ported from `popover.tsx` (`PopoverContent`): `Portal >
   * Positioner > Popup`, the positioning props on the positioner, the three
   * surfaces (`default`, `tinted`, `glass`) and the optional arrow. On open it
   * takes focus (the first focusable element, else the popup); on close, if focus
   * was inside, it returns to the trigger.
   */
  interface Props {
    class?: string;
    side?: Side;
    sideOffset?: number;
    align?: Align;
    alignOffset?: number;
    surface?: "default" | "tinted" | "glass";
    /** Draw an arrow pointing at the trigger. */
    arrow?: boolean;
    children?: Snippet;
  }

  let {
    class: className,
    side = "bottom",
    sideOffset = 4,
    align = "center",
    alignOffset = 0,
    surface = "default",
    arrow = false,
    children: content,
  }: Props = $props();

  const popover = getPopover();
  const presence = createPresence();
  let popupEl = $state<HTMLElement | null>(null);

  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // Tab past the popup's last control closes it and moves focus on from the trigger, as the
  // source's focus guards do. Shift+Tab back to the trigger leaves it open.
  function handlePopupKeydown(event: KeyboardEvent) {
    const popup = popupEl;
    if (!popup || event.key !== "Tab" || event.shiftKey) return;
    const controls = popup.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (event.target !== (controls[controls.length - 1] ?? popup)) return;
    event.preventDefault();
    popover.setOpen(false);
    // The next tabbable element after the trigger takes focus, else the trigger itself.
    const trigger = popover.trigger;
    const tabbables = Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (element) => !popup.contains(element),
    );
    const index = trigger ? tabbables.indexOf(trigger) : -1;
    const next = index >= 0 ? tabbables[index + 1] : undefined;
    (next ?? trigger)?.focus({ preventScroll: true });
  }

  $effect(() => {
    const open = popover.open;
    untrack(() => {
      if (open) presence.show();
      else presence.hide();
    });
  });

  $effect(() => {
    popover.setPopup(popupEl);
    return () => popover.setPopup(null);
  });

  // Focus that was inside the popup goes back to the trigger when the popup
  // unmounts (after its exit), as the source's focus manager does, not when the
  // exit starts.
  let returnFocusOnUnmount = false;

  $effect(() => {
    if (!presence.mounted && returnFocusOnUnmount) {
      returnFocusOnUnmount = false;
      popover.trigger?.focus({ preventScroll: true });
    }
  });

  $effect(() => {
    if (!presence.mounted || !popover.open) return;
    const frame = requestAnimationFrame(() => {
      if (!popupEl) return;
      const target =
        popupEl.querySelector<HTMLElement>("[autofocus]") ??
        popupEl.querySelector<HTMLElement>(FOCUSABLE) ??
        popupEl;
      target.focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(frame);
      // A press outside has already moved focus, and is left where it went.
      if (popupEl?.contains(document.activeElement)) returnFocusOnUnmount = true;
    };
  });

  const surfaceClass = $derived(
    surface === "tinted"
      ? "bg-[color-mix(in_srgb,var(--foreground)_4%,var(--background))] p-1.5 shadow-sm"
      : surface === "glass"
        ? "rounded-xl bg-card/95 p-1.5 shadow-lg inset-highlight backdrop-blur-glass"
        : "bg-popover p-2.5 shadow-md",
  );

  const popupClass = $derived(
    cn(
      "max-h-(--available-height) w-72 rounded-lg",
      !arrow && "overflow-hidden",
      surfaceClass,
      "border border-border text-foreground",
      "text-sm outline-none",
      "origin-[var(--transform-origin)] animate-scale-in",
      POPUP_EXIT,
      className,
    ),
  );

  // Matches the default surface; `tinted` and `glass` have no arrowed use.
  const ARROW_CLASS =
    "size-2.5 rotate-45 border-border bg-popover data-[side=bottom]:-top-1.25 data-[side=bottom]:border-t data-[side=bottom]:border-l data-[side=top]:-bottom-1.25 data-[side=top]:border-b data-[side=top]:border-r data-[side=left]:-right-1.25 data-[side=left]:border-t data-[side=left]:border-r data-[side=right]:-left-1.25 data-[side=right]:border-b data-[side=right]:border-l";

  function arrowStyle(placement: Placement | null): string {
    if (!placement) return "position: absolute;";
    const cross =
      placement.side === "top" || placement.side === "bottom"
        ? `left: ${placement.arrowX - 5}px;`
        : `top: ${placement.arrowY - 5}px;`;
    return `position: absolute; ${cross}`;
  }
</script>

{#if presence.mounted}
  <Positioner
    anchor={popover.trigger}
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    collisionAvoidance={POPUP_COLLISION_AVOIDANCE}
    class="isolate z-popover outline-none"
  >
    {#snippet children(placement: Placement | null)}
      <div
        bind:this={popupEl}
        data-slot="popover-content"
        role="dialog"
        tabindex="-1"
        id={popover.contentId}
        aria-labelledby={popover.hasTitle ? popover.titleId : undefined}
        aria-describedby={popover.hasDescription ? popover.descriptionId : undefined}
        data-ending-style={presence.ending ? "" : undefined}
        class={popupClass}
        onkeydown={handlePopupKeydown}
      >
        {@render content?.()}
        {#if arrow}
          <div
            data-slot="popover-arrow"
            data-side={placement?.side ?? side}
            aria-hidden="true"
            class={ARROW_CLASS}
            style={arrowStyle(placement)}
          ></div>
        {/if}
      </div>
    {/snippet}
  </Positioner>
{/if}
