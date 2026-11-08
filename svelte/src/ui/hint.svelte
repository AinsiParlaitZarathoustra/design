<script lang="ts">
  import type { Snippet } from "svelte";
  import { tick } from "svelte";
  import { isTooltipWarm, markTooltipClosed, markTooltipOpen, TOOLTIP_OPEN_DELAY } from "./tooltip-timing";

  /**
   * A hint on one control, ported from `Hint` in `src/ui/tooltip.tsx`.
   *
   * The React component composes Base UI's tooltip; the Svelte port keeps the
   * contract that matters: a 300ms first delay, instant while tooltips are
   * warm, a tooltip portalled to <body> on the `z-tooltip` rung, and the
   * label on the trigger (`aria-label` unless one is already set). The
   * trigger is wrapped in an `inline-flex` span, as the React component does
   * for disabled children, so the wrapper can carry the listeners.
   */
  interface Props {
    label: string;
    shortcut?: string;
    side?: "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    wrap?: boolean;
    class?: string;
    children: Snippet;
  }

  let {
    label,
    side = "bottom",
    align = "center",
    sideOffset = 4,
    wrap = false,
    class: className,
    children,
  }: Props = $props();

  let open = $state(false);
  let shown = $state(false);
  let anchor = $state<HTMLElement | null>(null);
  let popup = $state<HTMLElement | null>(null);
  let position = $state({ left: 0, top: 0 });
  let timer: ReturnType<typeof setTimeout> | null = null;

  function clearTimer() {
    if (timer) clearTimeout(timer);
    timer = null;
  }

  function show() {
    clearTimer();
    const wait = isTooltipWarm() ? 0 : TOOLTIP_OPEN_DELAY;
    timer = setTimeout(() => {
      open = true;
      markTooltipOpen();
      tick().then(place);
    }, wait);
  }

  function hide() {
    clearTimer();
    if (open) {
      open = false;
      markTooltipClosed();
    }
    shown = false;
  }

  function place() {
    if (!anchor || !popup) return;
    const r = anchor.getBoundingClientRect();
    const p = popup.getBoundingClientRect();
    const left =
      align === "start" ? r.left : align === "end" ? r.right - p.width : r.left + r.width / 2 - p.width / 2;
    const top =
      side === "bottom" ? r.bottom + sideOffset : r.top - p.height - sideOffset;
    position = {
      left: Math.max(8, Math.min(left, window.innerWidth - p.width - 8)),
      top,
    };
    shown = true;
  }
</script>

<span
  role="group"
  class={wrap ? "inline-flex [&>:disabled]:pointer-events-none" : "inline-flex"}
  bind:this={anchor}
  onmouseenter={show}
  onmouseleave={hide}
  onfocusin={(e) => {
    if ((e.target as Element)?.matches(":focus-visible")) show();
  }}
  onfocusout={hide}
  onkeydown={(e) => {
    if (e.key === "Escape") hide();
  }}
  aria-label={label}
>
  {@render children()}
</span>

{#if open}
  <div
    data-slot="tooltip-content"
    role="tooltip"
    bind:this={popup}
    class="fixed isolate z-tooltip w-fit text-balance rounded-md bg-[var(--popover)] px-2.5 py-1 text-xs text-foreground outline outline-1 outline-[var(--border)] animate-scale-in {shown ? '' : 'invisible'} {className ?? ''}"
    style="left: {position.left}px; top: {position.top}px;"
  >
    {label}
  </div>
{/if}
