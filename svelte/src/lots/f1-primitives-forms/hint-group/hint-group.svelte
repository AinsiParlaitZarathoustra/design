<script lang="ts">
  import type { Snippet } from "svelte";
  import { SvelteMap } from "svelte/reactivity";
  import {
    isTooltipWarm,
    markTooltipClosed,
    markTooltipOpen,
    prefersReducedMotion,
    slideTransition,
    TOOLTIP_EASE,
    TOOLTIP_FADE_IN_MS,
    TOOLTIP_OPEN_DELAY,
  } from "../../../ui/tooltip-timing";
  import { setHintGroup, type HintGroupApi, type HintGroupItem } from "./context";
  import { slideGeometry, type SlideGeometry } from "./slide-geometry";
  import { portal } from "./portal";

  /**
   * A row of icon controls sharing one tooltip that slides between them,
   * ported from `HintGroup` in `src/ui/hint-group.tsx`. The group adds no DOM
   * of its own; the strip is portalled to `<body>` and mounted only while the
   * group is in use. Timing comes from `tooltip-timing`, shared with `Hint`.
   */

  /** A gap between two items shorter than this does not close the tooltip. */
  const LEAVE_GRACE = 80;
  /** Unmount the strip this long after it hides, unless the group is back in use. */
  const UNMOUNT_AFTER = 500;
  const EDGE_MARGIN = 8;
  const GAP = 6;

  interface Props {
    side?: "top" | "bottom";
    children?: Snippet;
  }

  let { side = "bottom", children }: Props = $props();

  // Items register from their controls; the strip order is derived from them.
  const items = new SvelteMap<string, HintGroupItem>();
  const labels = new SvelteMap<string, HTMLElement>();

  let mounted = $state(false);
  let active = $state<string | null>(null);
  let visible = $state(false);
  let animate = $state(false);
  let geometry = $state<(SlideGeometry & { y: number; originX: number }) | null>(null);

  let openTimer: ReturnType<typeof setTimeout> | undefined;
  let leaveTimer: ReturnType<typeof setTimeout> | undefined;
  let unmountTimer: ReturnType<typeof setTimeout> | undefined;
  /** Mirrors `visibleRef` in React: read synchronously, never rendered. */
  let visibleNow = false;
  /** The item a scheduled open is for, and the item currently shown. */
  let pendingId: string | null = null;
  let activeId: string | null = null;

  function clearTimers() {
    pendingId = null;
    clearTimeout(openTimer);
    clearTimeout(leaveTimer);
    clearTimeout(unmountTimer);
  }

  function setVisibleNow(next: boolean) {
    if (next === visibleNow) return;
    visibleNow = next;
    if (next) markTooltipOpen();
    else markTooltipClosed();
  }

  function hide() {
    clearTimers();
    activeId = null;
    setVisibleNow(false);
    visible = false;
    unmountTimer = setTimeout(() => {
      mounted = false;
    }, UNMOUNT_AFTER);
  }

  function enter(id: string) {
    clearTimers();
    mounted = true;
    const travelling = visibleNow;
    const show = () => {
      pendingId = null;
      activeId = id;
      setVisibleNow(true);
      active = id;
      visible = true;
      animate = travelling;
    };
    if (travelling || isTooltipWarm()) show();
    else {
      pendingId = id;
      openTimer = setTimeout(show, TOOLTIP_OPEN_DELAY);
    }
  }

  function leave() {
    pendingId = null;
    clearTimeout(openTimer);
    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(hide, LEAVE_GRACE);
  }

  function register(id: string, item: HintGroupItem) {
    const prev = items.get(id);
    if (prev && prev.label === item.label && prev.el === item.el) return;
    items.set(id, item);
  }

  function unregister(id: string) {
    items.delete(id);
    // A control can vanish without a leave or blur: don't open for it later,
    // or keep showing it.
    if (pendingId === id) {
      clearTimeout(openTimer);
      pendingId = null;
    }
    if (activeId === id) hide();
  }

  const api: HintGroupApi = { register, unregister, enter, leave, hide };
  setHintGroup(api);

  // Strip order follows the DOM, so the tooltip slides the way the pointer
  // moves.
  const order = $derived.by(() => {
    return [...items.entries()]
      .sort(([, a], [, b]) => {
        if (!a.el || !b.el) return 0;
        return a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
      })
      .map(([id, item]) => ({ id, label: item.label }));
  });

  const shown = $derived(visible && geometry !== null);
  // The first reveal grows from the hovered control; travel between items
  // doesn't scale. Reduced motion keeps only the fade.
  const grow = $derived(!prefersReducedMotion());

  const stripStyle = $derived(
    [
      side === "bottom" ? `top: ${geometry?.y ?? 0}px` : `bottom: ${geometry?.y ?? 0}px`,
      `transform-origin: ${geometry?.originX ?? 0}px ${side === "bottom" ? "0%" : "100%"}`,
      grow && !shown ? "transform: scale(0.97)" : null,
      grow ? `transition: transform ${TOOLTIP_FADE_IN_MS}ms ${TOOLTIP_EASE}` : null,
    ]
      .filter(Boolean)
      .join("; "),
  );

  const rowStyle = $derived(
    [
      `opacity: ${shown ? 1 : 0}`,
      `transform: translateX(${geometry?.tx ?? 0}px)`,
      `clip-path: inset(0 ${geometry?.right ?? 0}% 0 ${geometry?.left ?? 0}% round 6px)`,
      `transition: ${slideTransition({ visible: shown, travel: animate })}`,
    ].join("; "),
  );

  // The tooltip's position follows the active control. Measured after the
  // strip renders, so the label widths are the real ones.
  $effect(() => {
    void mounted;
    if (!active || !visible) return;
    const current = active;
    const control = items.get(current)?.el?.getBoundingClientRect();
    if (!control) return;
    const index = order.findIndex((o) => o.id === current);
    const slide = slideGeometry({
      index,
      widths: order.map((o) => labels.get(o.id)?.getBoundingClientRect().width ?? 0),
      controlCentre: control.left + control.width / 2,
      stripLeft: 0,
      viewportWidth: window.innerWidth,
      margin: EDGE_MARGIN,
    });
    if (!slide) return;
    const y = side === "bottom" ? control.bottom + GAP : window.innerHeight - control.top + GAP;
    geometry = { ...slide, y, originX: control.left + control.width / 2 };
  });

  // A tooltip left floating while its row scrolls away would point at nothing.
  $effect(() => {
    if (!visible) return;
    const onScroll = () => hide();
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  });

  // Teardown on unmount: stop the timers and leave the warm state.
  $effect(() => {
    return () => {
      clearTimers();
      setVisibleNow(false);
    };
  });

  function labelRef(node: HTMLElement, id: string) {
    labels.set(id, node);
    return {
      destroy() {
        if (labels.get(id) === node) labels.delete(id);
      },
    };
  }
</script>

{@render children?.()}

{#if mounted}
  <div
    use:portal
    aria-hidden="true"
    data-slot="hint-group-tooltip"
    class="pointer-events-none fixed left-0 z-tooltip"
    style={stripStyle}
  >
    <div
      class="flex w-max bg-[var(--popover)] text-foreground outline outline-1 outline-[var(--border)] shadow-md"
      style={rowStyle}
    >
      {#each order as item (item.id)}
        <div
          use:labelRef={item.id}
          class="flex h-[22px] shrink-0 items-center whitespace-nowrap px-2.5 text-xs leading-none"
        >
          {item.label}
        </div>
      {/each}
    </div>
  </div>
{/if}
