// `useMeasure`, ported from `lib/use-measure.ts`. The React hook returns a callback
// ref and the size. Here the ref is an attachment (`{@attach ref}`) and the size is
// reactive state, read as `rect.width` and `rect.height`.

export function useMeasure<T extends HTMLElement = HTMLElement>() {
  const rect = $state({ width: 0, height: 0 });

  const ref = (node: T) => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry!.contentRect;
      if (rect.width === width && rect.height === height) return;
      rect.width = width;
      rect.height = height;
    });
    observer.observe(node);
    return () => observer.disconnect();
  };

  return [ref, rect] as const;
}
