/**
 * The windowing of a long list of real DOM rows, ported from `useWindow` in
 * `session-view-helpers.ts` to Svelte runes.
 *
 * Desktop's transcript measured virtualisation losing to this: a virtualiser
 * unmounts rows, a fast flick outruns the remount and the reader watches blank
 * space; a row already in the DOM cannot blank. So rows are never unmounted,
 * only added.
 *
 * `down` renders `[0, end)` and extends `end` by `chunk` when the sentinel
 * (placed after the last row) comes within 2200px of the scroll root. `up`
 * renders the last `initial` rows and lowers `start` when the sentinel (placed
 * before the first row) does, keeping the reader's place by adding the growth
 * to `scrollTop`. The scroll root is the sentinel's nearest scrollable ancestor.
 *
 * Use it inside a component: `const win = useWindow({ count: () => n })`, then
 * `{@attach win.sentinelRef}` on the sentinel element, and render
 * `[win.start, win.end)`.
 */

/** How far ahead of the reader the window grows, in px. Desktop's `GROW_MARGIN`. */
const GROW_MARGIN = 2200;

function scrollParent(el: Element): HTMLElement | null {
  for (let node = el.parentElement; node; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node);
    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") return node;
  }
  return null;
}

export interface WindowOptions {
  /** The list's length, read reactively. */
  count: () => number;
  initial?: number;
  chunk?: number;
  grow?: "down" | "up";
}

export interface RowWindow {
  readonly start: number;
  readonly end: number;
  /** Attach to the sentinel element (`{@attach win.sentinelRef}`). */
  sentinelRef: (el: Element) => () => void;
}

export function useWindow({
  count,
  initial = 80,
  chunk = 40,
  grow = "down",
}: WindowOptions): RowWindow {
  let sentinel = $state<Element | null>(null);
  let end = $state(initial);
  // `up`: fixed once there are rows, so rows streaming in at the bottom never
  // push the top of the window down.
  let startState = $state<number | null>(null);
  let pendingHeight: { root: HTMLElement; height: number } | null = null;

  const n = $derived(count());
  // Without an observer (a server render, or jsdom) the window is everything.
  const observable = typeof window === "undefined" || typeof IntersectionObserver !== "undefined";
  const start = $derived(
    grow === "up" ? Math.min(n, startState ?? Math.max(0, n - initial)) : 0,
  );
  const atEdge = $derived(grow === "up" ? start === 0 : Math.min(n, end) >= n);

  $effect.pre(() => {
    if (grow === "up" && startState === null && n > 0) {
      startState = Math.max(0, n - initial);
    }
  });

  // A list that shrank (a new session in the same view) restarts the window
  // rather than keeping room for rows that are gone.
  $effect.pre(() => {
    if (n < end && end > initial) end = Math.max(initial, n);
  });

  // Keep the reader's place after rows were added above them. Post-DOM, like
  // the oracle's `useLayoutEffect`: the new rows' height must be measured.
  $effect(() => {
    void start;
    const pending = pendingHeight;
    if (!pending) return;
    pendingHeight = null;
    pending.root.scrollTop += pending.root.scrollHeight - pending.height;
  });

  // Re-created whenever the window moves, so a sentinel still in range after a
  // growth fires again and the window keeps growing until it is out of range.
  $effect(() => {
    void start;
    void end;
    const el = sentinel;
    if (typeof IntersectionObserver === "undefined" || !el || atEdge) return;
    const root = scrollParent(el);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (grow === "up") {
          if (root) pendingHeight = { root, height: root.scrollHeight };
          startState = Math.max(0, (startState ?? 0) - chunk);
        } else {
          end = end + chunk;
        }
      },
      {
        root,
        rootMargin: grow === "up" ? `${GROW_MARGIN}px 0px 0px 0px` : `0px 0px ${GROW_MARGIN}px 0px`,
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  });

  return {
    get start() {
      if (!observable) return 0;
      return start;
    },
    get end() {
      if (!observable) return n;
      return grow === "up" ? n : Math.min(n, end);
    },
    sentinelRef(el: Element) {
      sentinel = el;
      return () => {
        if (sentinel === el) sentinel = null;
      };
    },
  };
}
