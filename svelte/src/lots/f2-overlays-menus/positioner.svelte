<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import { portal } from "./portal";
  import { placePopup, type Align, type Box, type Placement, type Side } from "./placement";

  /**
   * The positioner of every anchored popup (`Portal > Positioner > Popup`): it
   * is portalled to `document.body`, placed against `anchor` (an element) or
   * `point` (a pointer position), and re-placed when the popup resizes or the
   * page scrolls or resizes. Its single child is the popup.
   *
   * The popup's size comes from a ResizeObserver, which reports the layout box
   * (fractional, and not distorted by the scale-in transform), so the placement
   * lands on the same sub-pixel as the source. The translate is rounded to whole
   * pixels, as the source's floating placement is, so the box edges and the text
   * land on the same pixel grid.
   */
  interface Props {
    anchor?: HTMLElement | null;
    point?: { x: number; y: number } | null;
    side?: Side;
    align?: Align;
    sideOffset?: number;
    alignOffset?: number;
    class?: string;
    children?: Snippet<[Placement | null]>;
  }

  let {
    anchor = null,
    point = null,
    side = "bottom",
    align = "center",
    sideOffset = 0,
    alignOffset = 0,
    class: className,
    children,
  }: Props = $props();

  let el = $state<HTMLDivElement | null>(null);
  let size = $state<{ width: number; height: number } | null>(null);
  let tick = $state(0);

  const placement = $derived.by<Placement | null>(() => {
    void tick;
    if (!size) return null;
    let box: Box | null = null;
    if (point) box = { left: point.x, top: point.y, width: 0, height: 0 };
    else if (anchor) {
      const rect = anchor.getBoundingClientRect();
      box = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    }
    if (!box) return null;
    return placePopup({
      anchor: box,
      popup: size,
      side,
      align,
      sideOffset,
      alignOffset,
      viewport: { width: window.innerWidth, height: window.innerHeight },
    });
  });

  $effect(() => {
    const popup = el?.firstElementChild as HTMLElement | null | undefined;
    if (!popup) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const border = entry?.borderBoxSize?.[0];
      size = border
        ? { width: border.inlineSize, height: border.blockSize }
        : { width: popup.offsetWidth, height: popup.offsetHeight };
    });
    observer.observe(popup);
    const bump = () => {
      tick += 1;
    };
    window.addEventListener("resize", bump);
    window.addEventListener("scroll", bump, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", bump);
      window.removeEventListener("scroll", bump, true);
    };
  });
</script>

<div
  bind:this={el}
  use:portal
  class={cn("fixed left-0 top-0", className)}
  data-side={placement?.side ?? side}
  data-align={placement?.align ?? align}
  style="transform: translate({Math.round(placement?.x ?? 0)}px, {Math.round(placement?.y ?? 0)}px); visibility: {placement
    ? 'visible'
    : 'hidden'}; --available-height: {placement?.availableHeight ?? 0}px; --available-width: {placement?.availableWidth ?? 0}px; --transform-origin: {placement?.transformOrigin ?? 'top left'};"
>
  {@render children?.(placement)}
</div>
