/**
 * A windowed list for the timeline calendar: only the items near the viewport
 * are mounted. It stands in for `@tanstack/react-virtual`, which the Svelte
 * port does not depend on, and keeps the same contract the calendar uses:
 * an estimate per item, a measured size once an item has mounted, an overscan
 * band, a total size, and the scroll offset and rect of the scroller.
 */
import { SvelteMap } from "svelte/reactivity";

export interface VirtualItem {
  index: number;
  key: string | number;
  start: number;
  size: number;
  end: number;
}

export interface VirtualizerConfig {
  /** How many items the list holds. */
  count: () => number;
  getKey: (index: number) => string | number;
  estimateSize: (index: number) => number;
  overscan: number;
  /** The scroll container, or null before the owner has attached it. */
  scrollElement: () => HTMLElement | null | undefined;
  /** Used until the scroller has been measured. */
  initialRect?: { width: number; height: number };
  /**
   * Space the scroller holds before the list, px: a sticky axis, a heading.
   * Item starts include it, as `@tanstack/react-virtual`'s `scrollMargin`.
   */
  scrollMargin?: number;
}

export interface Virtualizer {
  /** Items inside the viewport plus the overscan band, in list order. */
  readonly items: VirtualItem[];
  readonly totalSize: number;
  readonly scrollOffset: number;
  readonly scrollRect: { width: number; height: number } | undefined;
  /** The laid-out start of one item, measured or estimated, scrollMargin included. */
  itemStart(index: number): number;
  /** The laid-out start and end of one item, measured or estimated. */
  itemEnd(index: number): number;
  /** Svelte action: measures a mounted item and reports its size back. */
  measure(node: HTMLElement, index: number): { update(index: number): void; destroy(): void };
  /** Follows the scroller's scroll offset and size. Returns the cleanup. */
  attach(element: HTMLElement): () => void;
  /**
   * Scrolls the scroller just enough to show one item (`auto`), or centres it:
   * the keyboard's reveal. `scrollMargin` is already part of the item's start.
   */
  scrollToIndex(index: number, options?: { align?: "auto" | "center" }): void;
}

export function createVirtualizer(config: VirtualizerConfig): Virtualizer {
  const margin = config.scrollMargin ?? 0;
  let scrollOffset = $state(0);
  let scrollRect = $state<{ width: number; height: number } | undefined>(undefined);
  // Measured heights, keyed by the item key so they survive a reorder.
  const measured = new SvelteMap<string | number, number>();

  const layout = $derived.by(() => {
    const count = config.count();
    const starts: number[] = [];
    const sizes: number[] = [];
    const keys: (string | number)[] = [];
    // The first item starts after whatever the scroller holds above the list.
    let total = margin;
    for (let index = 0; index < count; index++) {
      const key = config.getKey(index);
      const size = measured.get(key) ?? config.estimateSize(index);
      starts.push(total);
      sizes.push(size);
      keys.push(key);
      total += size;
    }
    return { starts, sizes, keys, total };
  });

  /** The first index whose end lies below `offset`. */
  function firstAt(offset: number): number {
    const { starts, sizes } = layout;
    let low = 0;
    let high = starts.length - 1;
    while (low < high) {
      const mid = (low + high) >> 1;
      if (starts[mid]! + sizes[mid]! <= offset) low = mid + 1;
      else high = mid;
    }
    return low;
  }

  const items = $derived.by(() => {
    const { starts, sizes, keys } = layout;
    const count = starts.length;
    if (count === 0) return [] as VirtualItem[];
    const rect = scrollRect ?? config.initialRect ?? { width: 0, height: 0 };
    // The list's own offset: the scroll position past the margin.
    const offset = Math.max(0, scrollOffset - margin);
    const first = firstAt(offset);
    let last = first;
    const bottom = offset + rect.height;
    while (last < count - 1 && starts[last]! + sizes[last]! < bottom) last++;
    const from = Math.max(0, first - config.overscan);
    const to = Math.min(count - 1, last + config.overscan);
    const out: VirtualItem[] = [];
    for (let index = from; index <= to; index++) {
      out.push({
        index,
        key: keys[index]!,
        start: starts[index]!,
        size: sizes[index]!,
        end: starts[index]! + sizes[index]!,
      });
    }
    return out;
  });

  function measure(node: HTMLElement, initial: number) {
    let index = initial;
    const record = () => {
      const height = node.offsetHeight;
      const key = config.getKey(index);
      if (height > 0 && measured.get(key) !== height) measured.set(key, height);
    };
    record();
    const observer = new ResizeObserver(record);
    observer.observe(node);
    return {
      update(next: number) {
        index = next;
        record();
      },
      destroy() {
        observer.disconnect();
      },
    };
  }

  function attach(element: HTMLElement) {
    const readOffset = () => {
      scrollOffset = element.scrollTop;
    };
    const readRect = () => {
      scrollRect = { width: element.clientWidth, height: element.clientHeight };
    };
    readRect();
    readOffset();
    element.addEventListener("scroll", readOffset, { passive: true });
    const observer = new ResizeObserver(readRect);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", readOffset);
      observer.disconnect();
    };
  }

  return {
    get items() {
      return items;
    },
    get totalSize() {
      return Math.max(0, layout.total - margin);
    },
    get scrollOffset() {
      return scrollOffset;
    },
    get scrollRect() {
      return scrollRect;
    },
    itemStart(index: number) {
      const { starts } = layout;
      return index >= 0 && index < starts.length ? starts[index]! : 0;
    },
    itemEnd(index: number) {
      const { starts, sizes } = layout;
      return index >= 0 && index < starts.length ? starts[index]! + sizes[index]! : 0;
    },
    measure,
    attach,
    scrollToIndex(index, { align = "auto" } = {}) {
      const element = config.scrollElement();
      const { starts, sizes } = layout;
      if (!element || index < 0 || index >= starts.length) return;
      const start = starts[index]!;
      const size = sizes[index]!;
      if (align === "center") {
        element.scrollTop = Math.max(0, start - (element.clientHeight - size) / 2);
        return;
      }
      if (start < element.scrollTop) element.scrollTop = start;
      else if (start + size > element.scrollTop + element.clientHeight)
        element.scrollTop = start + size - element.clientHeight;
    },
  };
}
