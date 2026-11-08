<script lang="ts">
  import { cn } from "../../lib/utils";

  /**
   * One thumb over a track filled with the primary, ported from `Slider` in
   * `src/ui/slider.tsx` (`@base-ui/react/slider`). `onValueChange` fires on
   * every step of a drag, `onValueCommitted` once on release.
   */
  interface Props {
    value: number;
    min: number;
    max: number;
    step?: number;
    disabled?: boolean;
    onValueChange: (value: number) => void;
    onValueCommitted?: (value: number) => void;
    "aria-label"?: string;
    class?: string;
  }

  let {
    value,
    min,
    max,
    step = 1,
    disabled = false,
    onValueChange,
    onValueCommitted,
    class: className,
    "aria-label": ariaLabel,
  }: Props = $props();

  let control = $state<HTMLDivElement | null>(null);
  let dragging = $state(false);

  const decimals = $derived(
    Math.max(
      (String(step).split(".")[1] ?? "").length,
      (String(min).split(".")[1] ?? "").length,
    ),
  );
  const percent = $derived(((value - min) / (max - min)) * 100);

  function clamp(raw: number): number {
    const stepped = min + Math.round((raw - min) / step) * step;
    const bounded = Math.min(max, Math.max(min, stepped));
    return Number(bounded.toFixed(decimals));
  }

  function valueAt(clientX: number): number {
    const box = control!.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - box.left) / box.width));
    return clamp(min + ratio * (max - min));
  }

  function update(next: number) {
    if (next !== value) onValueChange(next);
  }

  function onPointerDown(event: PointerEvent) {
    if (disabled) return;
    dragging = true;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    update(valueAt(event.clientX));
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging || disabled) return;
    update(valueAt(event.clientX));
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    onValueCommitted?.(value);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (disabled) return;
    const big = step * 10;
    let next: number | undefined;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = value + step;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = value - step;
        break;
      case "PageUp":
        next = value + big;
        break;
      case "PageDown":
        next = value - big;
        break;
      case "Home":
        next = min;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }
    event.preventDefault();
    const clamped = clamp(next);
    update(clamped);
    onValueCommitted?.(clamped);
  }

</script>

<div
  data-slot="slider"
  data-disabled={disabled ? "" : undefined}
  class={cn("relative w-full data-disabled:opacity-50", className)}
>
  <div
    bind:this={control}
    class="flex h-5 w-full cursor-pointer touch-none items-center select-none"
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointercancel={onPointerUp}
    role="presentation"
  >
    <div class="relative h-1 w-full rounded-full bg-element-selected">
      <div
        data-slot="slider-indicator"
        class="absolute top-0 left-0 h-full rounded-full bg-primary"
        style="width: {percent}%;"
      ></div>
      <div
        role="slider"
        tabindex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled || undefined}
        aria-orientation="horizontal"
        data-dragging={dragging ? "" : undefined}
        onkeydown={onKeyDown}
        class={cn(
          "absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-strong bg-foreground shadow-sm outline-none",
          "transition-transform duration-fast ease-out-strong",
          "focus-visible:ring-2 focus-visible:ring-ring data-dragging:scale-110",
        )}
        style="left: {percent}%;"
      ></div>
    </div>
  </div>
</div>
