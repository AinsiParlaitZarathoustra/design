<script lang="ts">
  import { cn } from "../../lib/utils";
  import { createColorDrag } from "./color-drag.svelte";

  /**
   * The hue slider of the colour picker, ported from `color-picker.tsx`
   * (`ColorHueSlider`). A `role="slider"`, pointer-draggable and operable with
   * the arrow keys (Shift for steps of ten).
   */

  interface Props {
    label: string;
    value: number;
    onChange: (value: number) => void;
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
  // ratchet-allow: the hue wheel is the six sRGB primaries by definition; it is
  // the same in every theme.
  const HUE_WHEEL = "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)";

  const drag = createColorDrag<HTMLDivElement>({
    update: (event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (!bounds.width) return;
      onChange(clamp((event.clientX - bounds.left) / bounds.width) * 360);
    },
    onInteractionEnd: () => onInteractionEnd?.(),
  });

  function handleKeyDown(event: KeyboardEvent) {
    if (!["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();
    const step = event.shiftKey ? 10 : 1;
    const direction = event.key === "ArrowRight" || event.key === "ArrowUp" ? 1 : -1;
    onChange((value + direction * step + 360) % 360);
  }

  const thumbStyle = $derived(
    `${THUMB_OUTLINE} left: calc(${value / 360} * (100% - 1rem) + 0.5rem); background-color: hsl(${value} 100% 50%);${drag.thumbTransition ? ` transition: ${drag.thumbTransition};` : ""}`,
  );
</script>

<div
  aria-label={label}
  aria-valuemax={360}
  aria-valuemin={0}
  aria-valuenow={Math.round(value)}
  class={cn(
    "relative flex h-5 cursor-pointer touch-none items-center rounded-full outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring",
    className,
  )}
  role="slider"
  tabindex={0}
  onkeydown={handleKeyDown}
  onpointerdown={drag.onpointerdown}
  onpointermove={drag.onpointermove}
  onpointerup={drag.onpointerup}
  onpointercancel={drag.onpointercancel}
  onlostpointercapture={drag.onlostpointercapture}
>
  <span
    aria-hidden="true"
    class="h-2.5 w-full rounded-full"
    style={`background-image: ${HUE_WHEEL};`}
  ></span>
  <span class={cn(THUMB, "top-1/2 size-4")} style={thumbStyle}></span>
</div>
