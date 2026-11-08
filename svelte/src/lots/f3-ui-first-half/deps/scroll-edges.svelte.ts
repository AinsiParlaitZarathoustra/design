// Local adapter of the React `useScrollEdges` (lot f1's `ui/scroll-fade`): whether
// a scroll container has content above and below its viewport. Re-measured on
// scroll and on resize; `watch` again when the content changes, because new rows
// change `scrollHeight` with no event of their own.

/**
 * The 2px slack absorbs fractional scroll positions: at a UI scale the root font
 * size sets, `scrollTop + clientHeight` lands a hair short of `scrollHeight` at
 * the true bottom, which would leave the bottom fade on forever.
 */
export class ScrollEdges {
  top = $state(false);
  bottom = $state(false);

  #cleanup: (() => void) | undefined;

  watch(element: HTMLElement | undefined) {
    this.#cleanup?.();
    this.#cleanup = undefined;
    if (!element) return;
    const measure = () => {
      const top = element.scrollTop > 2;
      const bottom = element.scrollTop + element.clientHeight < element.scrollHeight - 2;
      if (this.top !== top) this.top = top;
      if (this.bottom !== bottom) this.bottom = bottom;
    };
    measure();
    element.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    this.#cleanup = () => {
      element.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }

  destroy() {
    this.#cleanup?.();
    this.#cleanup = undefined;
  }
}
