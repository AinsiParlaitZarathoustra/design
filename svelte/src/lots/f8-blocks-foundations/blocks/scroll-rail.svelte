<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * Reading progress as a ruler: a column of hairline ticks that fill in top
   * to bottom as you scroll, with a longer marker riding the fill line and
   * the percentage beside it.
   *
   * It measures a scroll CONTAINER, not the window, so it works inside a
   * page whose body does not scroll. Ticks are drawn with a repeating
   * gradient — one hairline every 5px — in the foreground ink: faint for the
   * whole ruler, full strength for the part already read, clipped to the
   * progress from below.
   */

  const TICKS =
    "repeating-linear-gradient(to bottom, var(--foreground) 0, var(--foreground) 1px, transparent 1px, transparent 5px)";

  interface Props {
    /** The element whose scroll position the ruler reports. */
    container: HTMLElement | null | undefined;
    class?: string;
  }

  let { container, class: className }: Props = $props();

  let progress = $state(0);

  $effect(() => {
    const element = container;
    if (!element) return;

    // Motion's useScroll with a container: scrollTop over the scrollable
    // range. With nothing to scroll the content counts as fully read (1).
    const update = () => {
      const range = element.scrollHeight - element.clientHeight;
      progress = range > 0 ? element.scrollTop / range : 1;
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  });

  // [0, 1] → [100, 0]: the clip hides the rest of the ruler.
  const hidden = $derived(100 - progress * 100);
  const clipPath = $derived(`inset(0 0 ${hidden}% 0)`);
  // The marker rides from the first tick to the LAST one — which sits 1px
  // above the bottom edge, since the rail is a whole number of 5px steps
  // plus one — not to the edge itself, or at 100% it hangs below the ruler.
  const top = $derived(`calc((100% - 1px) * ${progress})`);
  const pct = $derived(Math.max(1, Math.round(progress * 100)));
</script>

<div
  aria-hidden="true"
  data-slot="scroll-rail"
  style:height="191px"
  class={cn("pointer-events-none relative w-2.5", className)}
>
  <div class="absolute inset-0 opacity-15" style:background-image={TICKS}></div>
  <div class="absolute inset-0" style:clip-path={clipPath} style:background-image={TICKS}></div>
  <!-- The marker: a longer tick at the fill line, with the number. -->
  <div style:top={top} class="absolute left-0 h-px w-5 bg-foreground">
    <span
      class="tnum absolute top-1/2 -right-1 translate-x-full -translate-y-1/2 text-2xs font-medium text-foreground"
    >
      {pct}
    </span>
  </div>
</div>
