<script module lang="ts">
  export type { TabStripItem } from "./tab-strip-logic";
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { ChevronLeftIcon, ChevronRightIcon } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Hint from "../../ui/hint.svelte";
  import IconButton from "../../ui/icon-button.svelte";
  import TabChip from "./tab-chip.svelte";
  import {
    defaultCloseLabel,
    fadeMask,
    NO_OVERFLOW,
    scrollLeftToReveal,
    type StripScroll,
    type TabStripItem,
  } from "./tab-strip-logic";

  /**
   * A row of document tabs, as desktop's pane headers draw them, ported from
   * `tab-strip.tsx` 0.1.15.
   *
   * The strip holds no state: `items`, `activeId`, `onSelect` and `onClose`
   * are the app's. One tab stop, roving focus with wrap, Home/End, manual
   * activation, Delete-to-close, middle-click close, only the tabs scroll,
   * edge fades and arrows appear on overflow and the wheel scrolls sideways.
   *
   * `renderTab` wraps each tab, for a context menu or a drag handle: it gets
   * the item and the tab as a snippet, and keeps the tab element in the tree.
   * `tabProps` puts a host's drag attributes on each tab.
   */
  interface Props {
    items: readonly TabStripItem[];
    activeId: string | null;
    onSelect: (id: string) => void;
    onClose?: (id: string) => void;
    focused?: boolean;
    leading?: Snippet;
    trailing?: Snippet;
    renderTab?: Snippet<[TabStripItem, Snippet]>;
    tabProps?: (item: TabStripItem) => Record<string, unknown>;
    rovingFocus?: boolean;
    closeOnMiddleClick?: boolean;
    closeOnDelete?: boolean;
    closeLabel?: (item: TabStripItem) => string;
    class?: string;
    "aria-label": string;
  }

  let {
    items,
    activeId,
    onSelect,
    onClose,
    focused = true,
    leading,
    trailing,
    renderTab,
    tabProps,
    rovingFocus = true,
    closeOnMiddleClick = true,
    closeOnDelete = true,
    closeLabel = defaultCloseLabel,
    class: className,
    "aria-label": ariaLabel,
  }: Props = $props();

  let viewport = $state<HTMLDivElement | null>(null);
  let scroll = $state<StripScroll>(NO_OVERFLOW);
  let refocus = false;

  const tabStop = $derived(
    items.some((item) => item.id === activeId) ? activeId : (items[0]?.id ?? null),
  );
  const mask = $derived(fadeMask(scroll));
  // The reveal depends on overflow alone, as the source's layout effect does.
  // Reading `scroll.overflow` inside it would also re-run on every canLeft /
  // canRight change (the object is reassigned on scroll), which undid a
  // programmatic scroll position at fractional zoom.
  const overflowing = $derived(scroll.overflow);
  const maskStyle = $derived(
    mask ? `mask-image: ${mask}; -webkit-mask-image: ${mask};` : undefined,
  );

  function measure() {
    const el = viewport;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth > 1;
    const canLeft = overflow && el.scrollLeft > 1;
    const canRight = overflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
    if (
      scroll.overflow === overflow &&
      scroll.canLeft === canLeft &&
      scroll.canRight === canRight
    )
      return;
    scroll = { overflow, canLeft, canRight };
  }

  // Re-measured on scroll and on resize of the viewport or its row: the strip
  // can start overflowing without anyone scrolling it.
  $effect(() => {
    const el = viewport;
    items.length; // re-observe when the row's content changes
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  });

  // A mouse wheel only scrolls vertically; the strip only scrolls sideways.
  // Claimed only while there is somewhere to go, so a page under a strip that
  // fits still scrolls.
  $effect(() => {
    const el = viewport;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      let delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) delta *= 16;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) delta *= el.clientWidth;
      if (delta === 0) return;
      const before = el.scrollLeft;
      el.scrollLeft += delta;
      if (el.scrollLeft !== before) event.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  // The active tab, scrolled clear of the fades whenever it changes or the
  // strip starts overflowing. Before paint would be ideal; an effect is close
  // enough and keeps the port free of layout-effect emulation.
  $effect(() => {
    const el = viewport;
    if (!el || !activeId || !overflowing) return;
    const tab = tabsIn(el).find((node) => node.dataset.tabId === activeId);
    if (!tab) return;
    const view = el.getBoundingClientRect();
    const rect = tab.getBoundingClientRect();
    const start = rect.left - view.left + el.scrollLeft;
    const next = scrollLeftToReveal(el.scrollLeft, el.clientWidth, start, start + rect.width);
    if (next !== el.scrollLeft) el.scrollLeft = next;
  });

  // A tab closed from the keyboard unmounts; focus would fall to <body> unless
  // it is handed to the new tab stop. Only when focus was dropped.
  $effect(() => {
    items;
    if (!refocus) return;
    refocus = false;
    const el = viewport;
    const active = document.activeElement;
    if (!el || (active && active !== document.body)) return;
    tabsIn(el)
      .find((node) => node.dataset.tabId === tabStop)
      ?.focus();
  });

  function tabsIn(el: HTMLElement): HTMLElement[] {
    return Array.from(el.querySelectorAll<HTMLElement>('[role="tab"][data-tab-id]'));
  }

  function scrollBy(direction: -1 | 1) {
    const el = viewport;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * Math.max(120, el.clientWidth * 0.75),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  function canClose(item: TabStripItem | undefined): item is TabStripItem {
    return !!item && !!item.closable && !item.pinned && !!onClose;
  }

  function onKeyDown(event: KeyboardEvent) {
    const el = viewport;
    const target = event.target as HTMLElement;
    if (!el || target.getAttribute("role") !== "tab") return;
    const tabs = tabsIn(el);
    const index = tabs.indexOf(target);
    if (index < 0) return;
    const id = target.dataset.tabId;
    let next: number | null = null;
    const moves = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!rovingFocus && moves.includes(event.key)) return;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % tabs.length;
        break;
      case "ArrowLeft":
        next = (index - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = tabs.length - 1;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (id) onSelect(id);
        return;
      case "Delete": {
        const item = items.find((candidate) => candidate.id === id);
        if (closeOnDelete && canClose(item)) {
          event.preventDefault();
          refocus = true;
          onClose?.(item.id);
        }
        return;
      }
      default:
        return;
    }
    event.preventDefault();
    tabs[next]?.focus();
  }
</script>

<div data-slot="tab-strip" class={cn("flex min-w-0 items-center", className)}>
  {#if leading}
    {@render leading()}
  {/if}
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <div
    bind:this={viewport}
    role="tablist"
    aria-label={ariaLabel}
    aria-orientation="horizontal"
    onkeydown={onKeyDown}
    class="flex min-w-0 shrink items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    style={maskStyle}
  >
    <!-- The row is its own box so the viewport can watch it grow. -->
    <div class="flex w-max items-center gap-0.5">
      {#each items as item (item.id)}
        {#snippet tab()}
          <TabChip
            {item}
            active={item.id === activeId}
            {focused}
            tabStop={!rovingFocus || item.id === tabStop}
            closable={canClose(item)}
            middleClickCloses={closeOnMiddleClick}
            closeLabel={closeLabel(item)}
            extra={tabProps?.(item)}
            {onSelect}
            {onClose}
          />
        {/snippet}
        {#if renderTab}
          {@render renderTab(item, tab)}
        {:else}
          {@render tab()}
        {/if}
      {/each}
    </div>
  </div>
  {#if scroll.overflow}
    <div role="group" aria-label="Scroll tabs" class="flex shrink-0 items-center">
      <Hint label="Scroll tabs left">
        <IconButton
          icon={ChevronLeftIcon}
          label="Scroll tabs left"
          size="xs"
          disabled={!scroll.canLeft}
          onclick={() => scrollBy(-1)}
        />
      </Hint>
      <Hint label="Scroll tabs right">
        <IconButton
          icon={ChevronRightIcon}
          label="Scroll tabs right"
          size="xs"
          disabled={!scroll.canRight}
          onclick={() => scrollBy(1)}
        />
      </Hint>
    </div>
  {/if}
  {#if trailing}
    {@render trailing()}
  {/if}
</div>

