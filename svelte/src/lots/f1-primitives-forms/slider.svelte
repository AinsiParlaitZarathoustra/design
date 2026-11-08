<script lang="ts" module>
  /**
   * Props of a `Slider` (`src/ui/slider.tsx`): `onValueChange` fires on every
   * step of a drag and `onValueCommitted` once, on release.
   */
  export interface SliderProps {
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
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  /**
   * One thumb over a track filled with the primary, ported from `Slider` in
   * `src/ui/slider.tsx` (`@base-ui/react/slider`).
   *
   * A control bound to `config.toml` saves on `onValueCommitted`: every save
   * rewrites the file.
   *
   * The markup follows the source's `Root > Control > Track > Indicator + Thumb`,
   * down to the hidden `input[type=range]` Base UI puts in the thumb, which is
   * the control a keyboard and a screen reader reach.
   */

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
  }: SliderProps = $props();

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
</script>

<div
  data-orientation="horizontal"
  role="group"
  data-disabled={disabled ? "" : undefined}
  class={cn("w-full data-disabled:opacity-50", className)}
>
  <!-- The control is a grab surface, not a control of its own: the thumb's
       range input is the one a keyboard and a screen reader reach. -->
  <div
    bind:this={control}
    role="presentation"
    data-orientation="horizontal"
    data-disabled={disabled ? "" : undefined}
    class="flex h-5 w-full cursor-pointer touch-none items-center select-none"
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointercancel={onPointerUp}
  >
    <div
      data-orientation="horizontal"
      data-disabled={disabled ? "" : undefined}
      class="relative h-1 w-full rounded-full bg-element-selected"
    >
      <div
        data-orientation="horizontal"
        data-disabled={disabled ? "" : undefined}
        class="rounded-full bg-primary"
        style="position: relative; height: inherit; inset-inline-start: 0px; width: {percent}%;"
      ></div>
      <div
        data-orientation="horizontal"
        data-index="0"
        data-disabled={disabled ? "" : undefined}
        data-dragging={dragging ? "" : undefined}
        class={cn(
          "size-3.5 rounded-full border border-border-strong bg-foreground shadow-sm outline-none",
          "transition-transform duration-fast ease-out-strong",
          "focus-visible:ring-2 focus-visible:ring-ring data-dragging:scale-110",
        )}
        style="position: absolute; inset-inline-start: {percent}%; top: 50%; translate: -50% -50%;"
      >
        <input
          type="range"
          aria-label={ariaLabel}
          aria-orientation="horizontal"
          aria-valuenow={value}
          {min}
          {max}
          {step}
          {value}
          {disabled}
          style="clip-path: inset(50%); overflow: hidden; white-space: nowrap; border: 0px; padding: 0px; width: 100%; height: 100%; margin: -1px; position: fixed; top: 0px; left: 0px;"
          oninput={(event) => update(clamp(Number(event.currentTarget.value)))}
          onchange={() => onValueCommitted?.(value)}
        />
      </div>
    </div>
  </div>
</div>
