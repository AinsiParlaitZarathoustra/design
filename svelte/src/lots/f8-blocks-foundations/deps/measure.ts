/**
 * A Svelte action that reports an element's content box, the way the
 * desktop's `useMeasure` does: through a ResizeObserver, so the width is the
 * fractional `contentRect` value and not a rounded `clientWidth`.
 */
export interface Size {
  width: number;
  height: number;
}

export function measure(node: HTMLElement, onSize: (size: Size) => void) {
  const observer = new ResizeObserver(([entry]) => {
    const { width, height } = entry!.contentRect;
    onSize({ width, height });
  });
  observer.observe(node);
  return {
    destroy() {
      observer.disconnect();
    },
  };
}
