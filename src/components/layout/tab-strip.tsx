"use client";

import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactElement, ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";

import { cn } from "../../lib/utils.ts";
import { HintItem } from "../../ui/hint-group.tsx";
import { Icon } from "../../ui/icon.tsx";
import { IconButton } from "../../ui/icon-button.tsx";
import { Hint } from "../../ui/tooltip.tsx";
import { Spinner } from "../ui/spinner.tsx";

/**
 * A row of document tabs, as desktop's pane headers draw them: small
 * rounded chips rather than full-height cells between rules, so the strip
 * reads as things you can pick rather than as more chrome.
 *
 * The strip holds no state. Which tab is open, the order, what closing does
 * (ask about unsaved work, stop a running session) are the app's; the strip
 * reports `onSelect` and `onClose` and draws what it is given.
 *
 * - **Closing lives where the icon is.** On hover, or keyboard focus, a
 *   closable tab's icon becomes its ×, so the target is always in the same
 *   place and never pushes the title around. Middle-click and Delete close
 *   too. A pinned tab is its icon alone and never closes from the strip.
 * - **Keyboard.** One tab stop: the active tab (the first when none is).
 *   Left and Right move focus and wrap, Home and End jump, Enter or Space
 *   opens. Moving focus does not open: activation is manual because opening
 *   a tab can mount a heavy panel, and arrowing past three of them should
 *   not mount all three.
 * - **Overflow.** Only the tabs scroll; `leading` and `trailing` (a `+`,
 *   the pane's controls) stay put. An edge with more tabs past it fades, the
 *   scroll arrows appear, a vertical wheel scrolls sideways, and the active
 *   tab is scrolled clear of the fades whenever it changes.
 *
 * No motion: a tab is picked tens of times an hour, often from the keyboard,
 * so the selection changes colour (`duration-fast`) and nothing moves.
 */

export interface TabStripItem {
  id: string;
  title: string;
  /** A 14px glyph: `<Icon icon={…} size="md" />`, or a file icon. */
  icon?: ReactNode;
  /** Shows the × and allows middle-click and Delete. Needs `onClose`. */
  closable?: boolean;
  /** Unsaved: the title goes italic, and the tab carries `data-dirty`. */
  dirty?: boolean;
  /** Working (a running session, a loading page): the icon is a spinner. */
  busy?: boolean;
  /** Icon only, named by a tooltip, and never closed from the strip. */
  pinned?: boolean;
}

/** The width of the fade at an edge with more tabs past it. */
const FADE_PX = 20;

/** Sub-pixel slack: at a fractional UI scale the true end of the scroll lands
 *  a hair short of `scrollWidth`, which would leave a fade on forever. */
const EDGE_TOLERANCE = 1;

interface StripScroll {
  overflow: boolean;
  canLeft: boolean;
  canRight: boolean;
}

const NO_OVERFLOW: StripScroll = { overflow: false, canLeft: false, canRight: false };

/** The `scrollLeft` that shows a tab whole, clear of the fades, moving as
 *  little as possible. Positions are in the scroller's content coordinates. */
function scrollLeftToReveal(
  scrollLeft: number,
  viewport: number,
  start: number,
  end: number,
): number {
  if (start - FADE_PX < scrollLeft) return Math.max(0, start - FADE_PX);
  if (end + FADE_PX > scrollLeft + viewport) return end + FADE_PX - viewport;
  return scrollLeft;
}

/** A mask, not a gradient: a mask needs no colour, so it fades into whatever
 *  the header behind the strip paints. */
function fadeMask({ canLeft, canRight }: StripScroll): string | undefined {
  if (!canLeft && !canRight) return undefined;
  const left = canLeft ? `transparent, black ${FADE_PX}px` : "black, black";
  const right = canRight ? `black calc(100% - ${FADE_PX}px), transparent` : "black, black";
  return `linear-gradient(to right, ${left}, ${right})`;
}

function TabStrip({
  items,
  activeId,
  onSelect,
  onClose,
  focused = true,
  leading,
  trailing,
  renderTab,
  className,
  "aria-label": ariaLabel,
}: {
  items: readonly TabStripItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onClose?: (id: string) => void;
  /** Whether the strip's pane has focus. Only then is the active tab fully
   *  lit; in a pane beside the focused one it is a step quieter. */
  focused?: boolean;
  /** Before the tabs, outside the scroll. */
  leading?: ReactNode;
  /** After the tabs, outside the scroll: where the `+` goes. */
  trailing?: ReactNode;
  /**
   * Wraps each tab, for what the strip does not do itself: a context menu
   * (`<ContextMenuTrigger render={tab} />`) or a drag handle. Keep the tab
   * element in the tree; keyboard and scrolling find tabs by their role.
   */
  renderTab?: (item: TabStripItem, tab: ReactElement) => ReactNode;
  className?: string;
  "aria-label": string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  // Set when a tab is closed from the keyboard: the focused tab unmounts, and
  // focus would fall to <body> unless it is handed to the new tab stop.
  const refocus = useRef(false);
  const [scroll, setScroll] = useState<StripScroll>(NO_OVERFLOW);

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth > EDGE_TOLERANCE;
    const canLeft = overflow && el.scrollLeft > EDGE_TOLERANCE;
    const canRight = overflow && el.scrollLeft + el.clientWidth < el.scrollWidth - EDGE_TOLERANCE;
    // Same-value guard: `scroll` fires every frame of a scroll.
    setScroll((cur) =>
      cur.overflow === overflow && cur.canLeft === canLeft && cur.canRight === canRight
        ? cur
        : { overflow, canLeft, canRight },
    );
  }, []);

  // Re-measured on scroll and on resize of the viewport or its row: the strip
  // can start overflowing without anyone scrolling it (the pane narrows, a
  // tab opens, a title loads). The first measure is before paint, so the
  // fades and arrows do not flash in.
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure]);

  // A mouse wheel only scrolls vertically; the strip only scrolls sideways.
  // Claimed only while there is somewhere to go, so a page under a strip
  // that fits still scrolls.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      let delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) delta *= 16;
      if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) delta *= el.clientWidth;
      if (delta === 0) return;
      const before = el.scrollLeft;
      el.scrollLeft += delta;
      if (el.scrollLeft !== before) e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // The active tab, scrolled clear of the fades whenever it changes or the
  // strip starts overflowing. Before paint, so the strip does not jump.
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el || !activeId || !scroll.overflow) return;
    const tab = tabsIn(el).find((node) => node.dataset.tabId === activeId);
    if (!tab) return;
    const view = el.getBoundingClientRect();
    const rect = tab.getBoundingClientRect();
    const start = rect.left - view.left + el.scrollLeft;
    const next = scrollLeftToReveal(el.scrollLeft, el.clientWidth, start, start + rect.width);
    if (next !== el.scrollLeft) el.scrollLeft = next;
  }, [activeId, scroll.overflow]);

  const scrollBy = (direction: -1 | 1) => {
    const el = viewportRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * Math.max(120, el.clientWidth * 0.75),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const byId = (id: string | undefined) => items.find((t) => t.id === id);
  const canClose = (item: TabStripItem | undefined): item is TabStripItem =>
    !!item && !!item.closable && !item.pinned && !!onClose;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    const target = e.target as HTMLElement;
    if (!el || target.getAttribute("role") !== "tab") return;
    const tabs = tabsIn(el);
    const i = tabs.indexOf(target);
    if (i < 0) return;
    const id = target.dataset.tabId;
    let next: number | null = null;
    switch (e.key) {
      case "ArrowRight":
        next = (i + 1) % tabs.length;
        break;
      case "ArrowLeft":
        next = (i - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = tabs.length - 1;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (id) onSelect(id);
        return;
      case "Delete": {
        const item = byId(id);
        if (canClose(item)) {
          e.preventDefault();
          refocus.current = true;
          onClose?.(item.id);
        }
        return;
      }
      default:
        return;
    }
    e.preventDefault();
    tabs[next]?.focus();
  };

  const tabStop = items.some((t) => t.id === activeId) ? activeId : (items[0]?.id ?? null);

  useLayoutEffect(() => {
    if (!refocus.current) return;
    refocus.current = false;
    const el = viewportRef.current;
    // Only when focus was dropped: if it went somewhere (a dialog asking
    // about unsaved work, the editor), it stays there.
    const active = document.activeElement;
    if (!el || (active && active !== document.body)) return;
    tabsIn(el)
      .find((node) => node.dataset.tabId === tabStop)
      ?.focus();
  }, [items, tabStop]);
  const mask = fadeMask(scroll);

  return (
    <div data-slot="tab-strip" className={cn("flex min-w-0 items-center", className)}>
      {leading}
      <div
        ref={viewportRef}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="flex min-w-0 shrink items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      >
        {/* The row is its own box so the viewport can watch it grow. */}
        <div className="flex w-max items-center gap-0.5">
          {items.map((item) => {
            const tab = (
              <Tab
                item={item}
                active={item.id === activeId}
                focused={focused}
                tabStop={item.id === tabStop}
                closable={canClose(item)}
                onSelect={onSelect}
                onClose={onClose}
              />
            );
            return <Fragment key={item.id}>{renderTab ? renderTab(item, tab) : tab}</Fragment>;
          })}
        </div>
      </div>
      {scroll.overflow && (
        <div role="group" aria-label="Scroll tabs" className="flex shrink-0 items-center">
          <HintItem label="Scroll tabs left">
            <IconButton
              icon={ChevronLeftIcon}
              label="Scroll tabs left"
              size="xs"
              disabled={!scroll.canLeft}
              onClick={() => scrollBy(-1)}
            />
          </HintItem>
          <HintItem label="Scroll tabs right">
            <IconButton
              icon={ChevronRightIcon}
              label="Scroll tabs right"
              size="xs"
              disabled={!scroll.canRight}
              onClick={() => scrollBy(1)}
            />
          </HintItem>
        </div>
      )}
      {trailing}
    </div>
  );
}

function tabsIn(el: HTMLElement): HTMLElement[] {
  return Array.from(el.querySelectorAll<HTMLElement>('[role="tab"][data-tab-id]'));
}

function Tab({
  item,
  active,
  focused,
  tabStop,
  closable,
  onSelect,
  onClose,
  ...props
}: {
  item: TabStripItem;
  active: boolean;
  focused: boolean;
  tabStop: boolean;
  closable: boolean;
  onSelect: (id: string) => void;
  onClose?: (id: string) => void;
} & Omit<React.ComponentProps<"div">, "onSelect">) {
  const { id, title, icon, dirty, busy, pinned } = item;
  const glyph = busy ? <Spinner size="md" label="" className="text-primary" /> : icon;
  const hasSlot = glyph != null || closable;

  const chip = (
    <div
      role="tab"
      aria-selected={active}
      aria-busy={busy || undefined}
      // Named outright: from its content the name would include the ×'s
      // "Close …", and a pinned tab has no text at all.
      aria-label={dirty ? `${title}, unsaved` : title}
      tabIndex={tabStop ? 0 : -1}
      data-tab-id={id}
      data-active={active || undefined}
      data-dirty={dirty || undefined}
      data-pinned={pinned || undefined}
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        onSelect(id);
      }}
      // Middle-click must not paste the primary selection on Linux, nor
      // start an autoscroll elsewhere.
      onMouseDown={(e) => {
        props.onMouseDown?.(e);
        if (e.button === 1) e.preventDefault();
      }}
      onAuxClick={(e) => {
        props.onAuxClick?.(e);
        if (e.button === 1 && closable) {
          e.preventDefault();
          onClose?.(id);
        }
      }}
      className={cn(
        "group/tab flex h-6 shrink-0 cursor-pointer select-none items-center gap-1.5 rounded-md text-xs",
        "transition-colors duration-fast ease-out-strong",
        pinned ? "w-6 justify-center" : cn("max-w-44", hasSlot ? "pr-2 pl-1" : "px-2"),
        active
          ? focused
            ? "bg-element-selected text-foreground"
            : "bg-element-hover text-secondary-foreground"
          : "text-muted-foreground hover:bg-element-hover hover:text-foreground",
        props.className,
      )}
    >
      {hasSlot && (
        <span className="relative flex size-4 shrink-0 items-center justify-center">
          <span
            className={cn(
              "flex items-center justify-center",
              closable && "group-hover/tab:invisible group-focus-visible/tab:invisible",
            )}
          >
            {glyph}
          </span>
          {closable && (
            // Out of the tab order: the tab is the stop, and Delete closes it.
            // No tooltip: an × on the tab you are pointing at is not ambiguous.
            <button
              type="button"
              tabIndex={-1}
              aria-label={`Close ${title}`}
              onClick={(e) => {
                e.stopPropagation();
                onClose?.(id);
              }}
              className={cn(
                "absolute inset-0 hidden items-center justify-center rounded-sm text-muted-foreground",
                "hover:bg-element-active hover:text-foreground",
                "group-hover/tab:flex group-focus-visible/tab:flex",
              )}
            >
              <Icon icon={XIcon} size="sm" />
            </button>
          )}
        </span>
      )}
      {!pinned && <span className={cn("truncate", dirty && "italic")}>{title}</span>}
    </div>
  );

  return pinned ? <Hint label={title}>{chip}</Hint> : chip;
}

export { TabStrip };
