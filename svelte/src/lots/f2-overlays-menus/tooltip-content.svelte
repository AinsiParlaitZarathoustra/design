<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { cn } from "../../lib/utils";
  import Positioner from "./positioner.svelte";
  import { createPresence } from "./popup-presence.svelte";
  import { POPUP_EXIT } from "./popup-motion";
  import { POPUP_COLLISION_AVOIDANCE, type Align, type Placement, type Side } from "./placement";
  import { getTooltip } from "./tooltip-context";

  /**
   * The tooltip popup, ported from `tooltip.tsx` (`TooltipContent`):
   * `Portal > Positioner > Popup`, the positioning props on the positioner and
   * the notch arrow. It mounts while open and plays `POPUP_EXIT` on the way out,
   * unless it opened instantly, when it skips both animations.
   */
  interface Props {
    class?: string;
    side?: Side;
    sideOffset?: number;
    align?: Align;
    alignOffset?: number;
    children?: Snippet;
  }

  let {
    class: className,
    side = "top",
    sideOffset = 0,
    align = "center",
    alignOffset = 0,
    children: content,
  }: Props = $props();

  const tip = getTooltip();
  const presence = createPresence();

  $effect(() => {
    const open = tip.open;
    const instant = tip.instant;
    untrack(() => {
      if (open) presence.show();
      else presence.hide(instant);
    });
  });

  // The notch: the source's arrow offsets, restated per side, with the cross
  // axis placed on the anchor centre.
  const ARROW_MAIN: Record<Side, string> = {
    top: "bottom: 0; transform: translateY(100%);",
    bottom: "top: 0; transform-origin: center 0; transform: rotate(180deg);",
    right: "left: 0; transform-origin: 0 0; transform: translateY(50%) rotate(90deg) translateX(-50%);",
    left: "right: 0; transform-origin: 100% 0; transform: translateY(50%) rotate(-90deg) translateX(50%);",
  };

  function arrowStyle(placed: Side, arrowX: number, arrowY: number): string {
    const cross =
      placed === "top" || placed === "bottom"
        ? `left: ${arrowX - 10}px;`
        : `top: ${arrowY - 5}px;`;
    return `position: absolute; ${ARROW_MAIN[placed]} ${cross}`;
  }

  const popupClass = $derived(
    cn(
      "group w-fit text-balance rounded-md px-2.5 py-1 text-xs",
      "bg-[var(--popover)] text-foreground",
      "outline outline-1 outline-[var(--border)]",
      "animate-scale-in origin-[var(--transform-origin)]",
      // A tooltip that skipped its entrance skips its exit too.
      tip.instant ? "animate-none" : POPUP_EXIT,
      className,
    ),
  );
</script>

{#if presence.mounted}
  <Positioner
    anchor={tip.anchor}
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    collisionAvoidance={POPUP_COLLISION_AVOIDANCE}
    class="isolate z-tooltip"
  >
    {#snippet children(placement: Placement | null)}
      <div
        data-slot="tooltip-content"
        id={tip.contentId}
        data-ending-style={presence.ending ? "" : undefined}
        style="--color-background: var(--popover); --color-border: var(--border);"
        class={popupClass}
      >
        {@render content?.()}
        <div
          data-slot="tooltip-arrow"
          aria-hidden="true"
          style={arrowStyle(placement?.side ?? side, placement?.arrowX ?? 0, placement?.arrowY ?? 0)}
        >
          <svg
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
            class="ml-[1px] mt-[-1px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3356 7.39793L15.1924 3.02682C15.9269 2.36577 16.8801 2 17.8683 2H20V0H0V2H1.4651C2.4532 2 3.4064 2.36577 4.1409 3.02682L8.9977 7.39793C9.378 7.7402 9.9553 7.74021 10.3356 7.39793Z"
              fill="var(--color-background)"
            />
            <path
              d="M11.1363 8.14124C10.3757 8.82575 9.22111 8.82578 8.46041 8.14122L3.60361 3.77011C3.05281 3.27432 2.33791 2.99999 1.59681 2.99999L4.24171 3L9.12941 7.39793C9.50971 7.7402 10.087 7.7402 10.4674 7.39793L15.3544 3L18 2.99999C17.2589 2.99999 16.544 3.27432 15.9931 3.77011L11.1363 8.14124Z"
            />
            <path
              d="M9.6667 6.65461L14.5235 2.28352C15.4416 1.45721 16.6331 1 17.8683 1H20V2H17.8683C16.8801 2 15.9269 2.36577 15.1924 3.02682L10.3356 7.39793C9.9553 7.74021 9.378 7.7402 8.9977 7.39793L4.1409 3.02682C3.4064 2.36577 2.4532 2 1.4651 2H0V1H1.4651C2.7002 1 3.8917 1.45722 4.8099 2.28352L9.6667 6.65461Z"
              fill="var(--color-border)"
            />
          </svg>
        </div>
      </div>
    {/snippet}
  </Positioner>
{/if}
