/**
 * The pointer drag shared by the colour picker's plane and hue slider, ported
 * from `color-picker.tsx` (`useColorDrag`). The thumb eases when a click jumps
 * it and follows the pointer immediately while a drag is in progress.
 */
export interface ColorDragOptions<E extends HTMLElement> {
  update: (event: PointerEvent & { currentTarget: E }) => void;
  onInteractionEnd?: () => void;
  focusTarget?: () => HTMLElement | null | undefined;
}

export function createColorDrag<E extends HTMLElement>(options: ColorDragOptions<E>) {
  let isDragging = $state(false);
  let pointerId: number | null = null;

  function stopDragging(event: PointerEvent) {
    if (pointerId !== event.pointerId) return;
    pointerId = null;
    isDragging = false;
    options.onInteractionEnd?.();
  }

  return {
    get thumbTransition(): string | undefined {
      return isDragging ? undefined : "left 80ms linear, top 80ms linear";
    },
    onpointerdown(event: PointerEvent & { currentTarget: E }) {
      if (pointerId !== null || event.button !== 0) return;
      pointerId = event.pointerId;
      (options.focusTarget?.() ?? event.currentTarget).focus({ preventScroll: true });
      event.currentTarget.setPointerCapture(event.pointerId);
      isDragging = true;
      options.update(event);
    },
    onpointermove(event: PointerEvent & { currentTarget: E }) {
      if (pointerId === event.pointerId) options.update(event);
    },
    onpointerup: stopDragging,
    onpointercancel: stopDragging,
    onlostpointercapture: stopDragging,
  };
}
