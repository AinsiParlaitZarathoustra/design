/**
 * Whether a scroll container has content above and below its viewport,
 * ported from `useScrollEdges` in `src/ui/scroll-fade.tsx`. Re-measured on
 * scroll and on resize of the element; the 2px slack absorbs fractional scroll
 * positions at a UI scale. `read` returns the element, `deps` is read by the
 * caller's effect so new rows re-measure.
 *
 * Adapter: the house `ScrollFade` lives with the ui primitives (lot f1). This
 * file is the same measurement, kept here until that lot is merged.
 */
export interface ScrollEdges {
  top: boolean;
  bottom: boolean;
}

export function createScrollEdges(read: () => HTMLElement | null | undefined) {
  let edges = $state<ScrollEdges>({ top: false, bottom: false });

  function measure() {
    const el = read();
    if (!el) return;
    const top = el.scrollTop > 2;
    const bottom = el.scrollTop + el.clientHeight < el.scrollHeight - 2;
    // Same-value guard: `scroll` fires per frame while dragging.
    if (edges.top !== top || edges.bottom !== bottom) edges = { top, bottom };
  }

  /** Attach to the scroller from an effect; returns the cleanup. */
  function observe(el: HTMLElement): () => void {
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }

  return {
    get edges() {
      return edges;
    },
    measure,
    observe,
  };
}
