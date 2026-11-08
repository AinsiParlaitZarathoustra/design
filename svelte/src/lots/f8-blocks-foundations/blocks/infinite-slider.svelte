<script lang="ts" module>
  /** Linear, held flat between `count` evenly spaced steps. */
  export function steppedLinear(count: number): (t: number) => number {
    const n = Math.max(1, Math.round(count));
    return (t) => (t >= 1 ? 1 : Math.floor(t * n) / n);
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { cn } from "../../../lib/utils";
  import { infiniteAnimationFps } from "../../../lib/infinite-animations";
  import { measure, type Size } from "../deps/measure";
  import { tween } from "../deps/tween";

  /**
   * A seamless marquee.
   *
   * Children render twice and the track translates by exactly half its
   * measured width, so the second copy lands where the first began. Width is
   * measured, not assumed, so it survives font loading and scale changes.
   *
   * `speedOnHover` does not jump speeds: it animates the REMAINING distance at
   * the new speed, then re-keys the loop. A marquee that lurches when you
   * hover it is one you cannot read.
   *
   * With `--infinite-animation-fps` set, the track moves in that many even
   * steps a second instead of every frame: the easing is still linear, only
   * quantised in time, so the speed is unchanged.
   */
  interface Props {
    children?: Snippet;
    gap?: number;
    speed?: number;
    speedOnHover?: number;
    direction?: "horizontal" | "vertical";
    reverse?: boolean;
    class?: string;
  }

  let {
    children,
    gap = 16,
    speed = 100,
    speedOnHover,
    direction = "horizontal",
    reverse = false,
    class: className,
  }: Props = $props();

  let currentSpeed = $state(untrack(() => speed));
  let width = $state(0);
  let height = $state(0);
  let isTransitioning = $state(false);
  let key = $state(0);
  let track: HTMLDivElement | undefined = $state();

  // The translation is not reactive: it is written every frame, and only the
  // transform on the track shows it.
  let translation = 0;

  function apply(value: number) {
    translation = value;
    if (!track) return;
    track.style.transform =
      direction === "horizontal" ? `translateX(${value}px)` : `translateY(${value}px)`;
  }

  function onMeasure(size: Size) {
    width = size.width;
    height = size.height;
  }

  $effect(() => {
    // Re-run the loop whenever any of these change, as the React effect did.
    void key;
    void gap;
    void direction;
    void reverse;
    void isTransitioning;
    const node = track;
    const size = direction === "horizontal" ? width : height;
    const speedNow = currentSpeed;
    if (!size || !node) return;

    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;
    const duration = Math.abs(to - from) / speedNow;
    const fps = infiniteAnimationFps(node);
    const easeFor = (seconds: number) =>
      fps ? steppedLinear(seconds * fps) : (t: number) => t;

    if (isTransitioning) {
      const remaining = Math.abs(translation - to);
      return tween({
        from: translation,
        to,
        duration: remaining / speedNow,
        ease: easeFor(remaining / speedNow),
        onUpdate: apply,
        onComplete: () => {
          isTransitioning = false;
          key += 1;
        },
      });
    }

    return tween({
      from,
      to,
      duration,
      ease: easeFor(duration),
      repeat: true,
      onUpdate: apply,
      onRepeat: () => apply(from),
    });
  });

  function hoverStart(event: PointerEvent) {
    if (!speedOnHover || event.pointerType === "touch") return;
    isTransitioning = true;
    currentSpeed = speedOnHover;
  }

  function hoverEnd(event: PointerEvent) {
    if (!speedOnHover || event.pointerType === "touch") return;
    isTransitioning = true;
    currentSpeed = speed;
  }
</script>

<div class={cn("overflow-hidden", className)}>
  <div
    bind:this={track}
    use:measure={onMeasure}
    class="flex w-max"
    style:gap="{gap}px"
    style:flex-direction={direction === "horizontal" ? "row" : "column"}
    onpointerenter={hoverStart}
    onpointerleave={hoverEnd}
    role="presentation"
  >
    {@render children?.()}
    {@render children?.()}
  </div>
</div>
