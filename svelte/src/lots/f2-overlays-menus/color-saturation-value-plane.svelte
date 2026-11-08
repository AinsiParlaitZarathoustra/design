<script lang="ts">
  import type { KeyboardEventHandler } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import type { HsvColor } from "../../theme/color";
  import { createColorDrag } from "./color-drag.svelte";

  /**
   * The saturation/brightness plane of the colour picker, ported from
   * `color-picker.tsx` (`ColorSaturationValuePlane`).
   *
   * Pointer-draggable and keyboard-operable: the plane is two hidden range
   * inputs (Tab moves between saturation and brightness). It draws literal
   * colour whatever the theme is, which is why the constants below carry a
   * `ratchet-allow`.
   */

  interface Props {
    label: string;
    value: HsvColor;
    onChange: (value: HsvColor) => void;
    /** Fires when a drag ends, so a caller batching updates can flush. */
    onInteractionEnd?: () => void;
    class?: string;
  }

  let { label, value, onChange, onInteractionEnd, class: className }: Props = $props();

  const clamp = (amount: number) => Math.min(1, Math.max(0, amount));

  // ratchet-allow: a picker thumb is a white ring with a dark hairline so it
  // reads on every colour the plane can show, which no theme token guarantees.
  const THUMB_RING = "border-2 border-white";
  const THUMB = cn(
    "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
    THUMB_RING,
  );
  // ratchet-allow: the thumb's hairline must be dark on any hue, theme or not.
  const THUMB_OUTLINE = "box-shadow: 0 0 0 1px rgb(0 0 0 / 0.4);";
  // ratchet-allow: the plane IS pure black over the hue toward the bottom; a theme
  // token here would make the picker lie about the colour being picked.
  const SHADE_DOWN = "linear-gradient(to top, #000, transparent)";
  // ratchet-allow: and pure white toward the left, for the same reason as above.
  const SHADE_ACROSS = "linear-gradient(to right, #fff, transparent)";

  const uid = $props.id();
  const instructionsId = `color-plane-${uid}`;
  let saturationInput: HTMLInputElement | null = $state(null);

  const drag = createColorDrag<HTMLDivElement>({
    update: (event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      onChange({
        ...value,
        s: clamp((event.clientX - bounds.left) / bounds.width),
        v: 1 - clamp((event.clientY - bounds.top) / bounds.height),
      });
    },
    onInteractionEnd: () => onInteractionEnd?.(),
    focusTarget: () => saturationInput,
  });

  function handleKeyDown(event: KeyboardEvent, axis: "s" | "v") {
    const step = event.shiftKey ? 0.1 : 0.02;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowUp"
        ? clamp(value[axis] + step)
        : event.key === "ArrowLeft" || event.key === "ArrowDown"
          ? clamp(value[axis] - step)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? 1
              : null;
    if (next === null) return;
    event.preventDefault();
    onChange({ ...value, [axis]: next });
  }

  const onKeydownSaturation: KeyboardEventHandler<HTMLInputElement> = (event) =>
    handleKeyDown(event, "s");
  const onKeydownBrightness: KeyboardEventHandler<HTMLInputElement> = (event) =>
    handleKeyDown(event, "v");

  const planeStyle = $derived(
    `background-image: ${SHADE_DOWN}, ${SHADE_ACROSS}; background-color: hsl(${value.h} 100% 50%);`,
  );
  const thumbStyle = $derived(
    `${THUMB_OUTLINE} left: calc(${value.s} * (100% - 0.75rem) + 0.375rem); top: calc(${1 - value.v} * (100% - 0.75rem) + 0.375rem);${drag.thumbTransition ? ` transition: ${drag.thumbTransition};` : ""}`,
  );
</script>

<div
  aria-label={`${label} saturation and brightness`}
  role="group"
  class={cn(
    "relative h-32 cursor-crosshair touch-none overflow-hidden rounded-md",
    "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
    className,
  )}
  style={planeStyle}
  onpointerdown={drag.onpointerdown}
  onpointermove={drag.onpointermove}
  onpointerup={drag.onpointerup}
  onpointercancel={drag.onpointercancel}
  onlostpointercapture={drag.onlostpointercapture}
>
  <span id={instructionsId} class="sr-only">
    Use the arrow keys to adjust, Shift for larger steps, Home and End for the ends. Tab moves
    between saturation and brightness.
  </span>
  <input
    bind:this={saturationInput}
    type="range"
    min={0}
    max={100}
    step="any"
    value={value.s * 100}
    aria-label={`${label} saturation`}
    aria-describedby={instructionsId}
    aria-valuetext={`${Math.round(value.s * 100)}%`}
    class="sr-only"
    onkeydown={onKeydownSaturation}
    oninput={(event) => onChange({ ...value, s: event.currentTarget.valueAsNumber / 100 })}
  />
  <input
    type="range"
    min={0}
    max={100}
    step="any"
    value={value.v * 100}
    aria-label={`${label} brightness`}
    aria-describedby={instructionsId}
    aria-valuetext={`${Math.round(value.v * 100)}%`}
    class="sr-only"
    onkeydown={onKeydownBrightness}
    oninput={(event) => onChange({ ...value, v: event.currentTarget.valueAsNumber / 100 })}
  />
  <span class={cn(THUMB, "size-3")} style={thumbStyle}></span>
</div>
