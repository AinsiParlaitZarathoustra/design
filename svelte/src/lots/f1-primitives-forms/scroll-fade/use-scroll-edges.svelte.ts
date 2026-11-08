/**
 * Which edges have content past them, ported from `useScrollEdges` in
 * `src/ui/scroll-fade.tsx`. Re-measured on scroll and on resize, and again
 * whenever `deps` changes (new rows change `scrollHeight` with no event).
 *
 * The 2px slack absorbs fractional scroll positions at a UI scale.
 */

/** Which edges have content past them. Both false means nothing to scroll. */
export interface ScrollEdges {
  readonly top: boolean;
  readonly bottom: boolean;
}

export function useScrollEdges(
  getElement: () => HTMLElement | null | undefined,
  deps?: () => unknown,
): ScrollEdges {
  let top = $state(false);
  let bottom = $state(false);

  $effect(() => {
    deps?.();
    const el = getElement();
    if (!el) return;
    const measure = () => {
      // Assigning an equal primitive is a no-op in Svelte, so `scroll` firing
      // per frame does not re-render the rows behind the fade.
      top = el.scrollTop > 2;
      bottom = el.scrollTop + el.clientHeight < el.scrollHeight - 2;
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  });

  return {
    get top() {
      return top;
    },
    get bottom() {
      return bottom;
    },
  };
}
