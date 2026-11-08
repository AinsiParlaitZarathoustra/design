<script module lang="ts">
  /** What a parent drives the glyph with, through `bind:this`. */
  export type MessageSquareMoreIconHandle = { startAnimation: () => void; stopAnimation: () => void };
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";
  import { ICON_STROKE_WIDTH } from "../../ui/icon.svelte";

  /**
   * A speech bubble whose three dots blink in turn: someone typing. It animates
   * on hover by itself, or through the exported `startAnimation` /
   * `stopAnimation` (`bind:this`), so a whole button can drive it.
   *
   * Each dot runs the source's eight-stop opacity keyframes over 1.5s, offset
   * one step after the last (Web Animations, the same stops and durations).
   */
  interface Props {
    size?: number;
    strokeWidth?: number;
    /** When true, hover on the icon itself does nothing; the parent drives it. */
    controlled?: boolean;
    class?: string;
    onmouseenter?: (event: MouseEvent) => void;
    onmouseleave?: (event: MouseEvent) => void;
    [attribute: string]: unknown;
  }

  let {
    size = 14,
    strokeWidth = ICON_STROKE_WIDTH,
    controlled = false,
    class: className,
    onmouseenter,
    onmouseleave,
    ...rest
  }: Props = $props();

  const DOTS = ["M8 10h.01", "M12 10h.01", "M16 10h.01"];
  const OPACITY = [1, 0, 0, 1, 1, 0, 0, 1];

  let dotElements: (SVGPathElement | undefined)[] = [];
  let animations: (Animation | undefined)[] = [];

  /** The source's `times` for dot `i`: the blink moves one tenth along for each dot. */
  function dotKeyframes(i: number): Keyframe[] {
    const times = [0, 0.1, 0.1 + i * 0.1, 0.2 + i * 0.1, 0.5, 0.6, 0.6 + i * 0.1, 0.7 + i * 0.1];
    return OPACITY.map((opacity, k) => ({ opacity, offset: times[k] }));
  }

  export function startAnimation() {
    DOTS.forEach((_, i) => {
      const element = dotElements[i];
      if (!element) return;
      animations[i]?.cancel();
      animations[i] = element.animate(dotKeyframes(i), { duration: 1500 });
    });
  }

  export function stopAnimation() {
    animations.forEach((animation) => animation?.cancel());
  }
</script>

<span
  data-slot="message-square-more-icon"
  aria-hidden="true"
  class={cn("inline-flex shrink-0", className)}
  onmouseenter={(event) => {
    if (!controlled) startAnimation();
    onmouseenter?.(event);
  }}
  onmouseleave={(event) => {
    if (!controlled) stopAnimation();
    onmouseleave?.(event);
  }}
  {...rest}
>
  <svg
    fill="none"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    {#each DOTS as d, i (d)}
      <path bind:this={dotElements[i]} {d} />
    {/each}
  </svg>
</span>
