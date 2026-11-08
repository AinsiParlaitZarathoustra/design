<script lang="ts">
  // A retro ordered-dither noise field that drifts like slow cloud cover.
  //
  // Ported from the Atlas desktop app's `src/ui/dither-field.tsx`. The constants
  // are the landing page's, kept to the value: alpha 0.3 for glyphs and 0.16 for
  // dots, a 12px cell, ~12fps.
  //
  // `glyphs` prints a character per 12px cell whose weight tracks the intensity.
  // `dots` prints 1.5px dots on a 4px grid. Canvas, not DOM: the field is tens of
  // thousands of cells.
  //
  // Stepped at ~12fps on purpose: ordered dither reads as retro because it snaps.
  // The loop parks while the tab is hidden, while the element is off screen, and
  // entirely under `prefers-reduced-motion`, which still paints one frame.
  //
  // The ink is the canvas's own computed `color`, read from the element, so a
  // surface themed differently from the page gets its own ink. A MutationObserver
  // on <html> and the OS colour scheme repaint it when the theme changes.
  //
  // The first frame waits for the main thread to go idle (500ms at most). Until it
  // lands, and for good where there is no 2D canvas, a CSS dot grid (or the
  // `fallback` snippet) fills the box.

  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { infiniteAnimationFps } from "../../../lib/infinite-animations";
  import { resolveColor, rgbString } from "../../../lib/resolved-color";
  import { whenIdle } from "../../../lib/when-idle";

  /** The attributes on <html> a theme switch writes, in every app that has one. */
  const THEME_ATTRIBUTES = [
    "class",
    "style",
    "data-theme",
    "data-appearance",
    "data-theme-appearance",
  ];

  const GLYPHS = " .·:-=+*#";

  const BAYER = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
  ];

  /** ~12fps. A lower `--infinite-animation-fps` lowers it further. */
  const FRAME_MS = 80;

  interface Props {
    mode?: "dots" | "glyphs";
    /**
     * `[start, span]` of the radial hollow as fractions of the half-diagonal:
     * nothing prints inside `start`, full density from `start + span` out.
     */
    hollow?: [number, number];
    /** Multiplier on the ink alpha. `1` is the landing page's own value. */
    ink?: number;
    /** The ink is the canvas's text colour: `text-muted-foreground` recolours it. */
    class?: string;
    /**
     * Shown until the first frame paints, and for good without a 2D canvas.
     * Defaults to a static dot grid in the field's own ink.
     */
    fallback?: Snippet;
  }

  let { mode = "glyphs", hollow, ink = 1, class: className, fallback }: Props = $props();

  let canvas: HTMLCanvasElement | undefined = $state();
  let painted = $state(false);

  /**
   * `ctx.fillStyle` takes a colour STRING and cannot read a custom property,
   * so the ink is the canvas's computed `color`, resolved through the canvas
   * probe in lib/resolved-color.
   */
  function inkOf(element: HTMLCanvasElement, alpha: number): string {
    const rgb = resolveColor(getComputedStyle(element).color);
    return rgb ? rgbString(rgb, alpha) : `rgb(255 255 255 / ${alpha})`; // ratchet-allow: fallback when the computed colour cannot be resolved, e.g. no 2D context
  }

  $effect(() => {
    // Every prop the source's effect depends on is read here, so a change re-runs it.
    const currentMode = mode;
    const hollowStart = hollow?.[0];
    const hollowSpan = hollow?.[1];
    const currentInk = ink;
    void className;

    const element = canvas;
    if (!element) return;
    const ctx = element.getContext("2d");
    if (!ctx) return;

    // Live: turning Reduce Motion on stops the drift, turning it off resumes it.
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motion.matches;
    const CELL = currentMode === "glyphs" ? 12 : 4;
    const [h0, h1] =
      hollowStart != null && hollowSpan != null
        ? [hollowStart, hollowSpan]
        : currentMode === "glyphs"
          ? [0.34, 0.5]
          : [0.22, 0.55];

    let raf = 0;
    let last = 0;
    const fps = infiniteAnimationFps(element);
    const frameMs = Math.max(FRAME_MS, fps ? 1000 / fps : 0);
    let visible = document.visibilityState === "visible";
    let onScreen = true;
    // Nothing draws until the idle callback below has run.
    let begun = false;
    let hasPainted = false;
    const alpha = Math.min(1, (currentMode === "glyphs" ? 0.3 : 0.16) * currentInk);
    // Read once per theme, not per frame.
    let fill = inkOf(element, alpha);

    // Two octaves of value noise plus a slow third, so shapes morph rather
    // than only translate.
    const noiseAt = (x: number, y: number, phase: number) => {
      const a = Math.sin(x * 0.012 + Math.sin(y * 0.009 + phase) * 2.1);
      const b = Math.sin(y * 0.011 - Math.cos(x * 0.007 - phase) * 1.7);
      const c = Math.sin((x + y) * 0.004 + 1.3 + phase * 2);
      return (a + b + c) / 3; // -1..1
    };

    const draw = (t: number) => {
      const parent = element.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (!w || !h) return;
      if (!hasPainted) {
        hasPainted = true;
        painted = true;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bw = Math.ceil(w * dpr);
      const bh = Math.ceil(h * dpr);
      if (element.width !== bw || element.height !== bh) {
        element.width = bw;
        element.height = bh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Wind: mostly sideways, a little lift, plus a slow phase evolution.
      const wx = t * 0.012;
      const wy = t * 0.003;
      const phase = t * 0.0004;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.hypot(cx, cy);

      ctx.fillStyle = fill;
      if (currentMode === "glyphs") {
        ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textBaseline = "top";
      }

      for (let gy = 0; gy < h / CELL; gy++) {
        for (let gx = 0; gx < w / CELL; gx++) {
          const x = gx * CELL;
          const y = gy * CELL;
          let v = (noiseAt(x + wx, y + wy, phase) + 1) / 2;
          const r = Math.hypot(x - cx, y - cy) / maxR;
          v *= Math.min(1, Math.max(0, (r - h0) / h1));
          if (currentMode === "glyphs") {
            const i = Math.min(GLYPHS.length - 1, Math.floor(v * v * GLYPHS.length));
            if (i > 0 && v * 16 > BAYER[gy % 4]![gx % 4]! * 0.6) {
              ctx.fillText(GLYPHS[i]!, x, y);
            }
          } else if (v * 16 > BAYER[gy % 4]![gx % 4]!) {
            ctx.fillRect(x, y, 1.5, 1.5);
          }
        }
      }
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      // Step gate: repaint only once a frame's worth of drift has accrued.
      if (now - last < frameMs) return;
      last = now;
      draw(now);
    };
    const start = () => {
      if (begun && !raf && visible && onScreen && !reduced) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible) start();
      else stop();
    };

    // One frame always paints, including under reduced motion: the texture is
    // the design, only the drift is the accessibility problem.
    const cancelIdle = whenIdle(() => {
      begun = true;
      draw(0);
      start();
    }, 500);
    document.addEventListener("visibilitychange", onVisibility);
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((e) => e.isIntersecting);
        if (onScreen) start();
        else stop();
      },
      { rootMargin: "80px" },
    );
    io.observe(element);
    const parent = element.parentElement;
    const ro = new ResizeObserver(() => {
      if (begun) draw(last);
    });
    if (parent) ro.observe(parent);
    // A theme switch, from whatever applies themes.
    const repaint = () => {
      fill = inkOf(element, alpha);
      if (begun) draw(last);
    };
    const mo = new MutationObserver(repaint);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: THEME_ATTRIBUTES });
    const scheme = window.matchMedia("(prefers-color-scheme: light)");
    scheme.addEventListener("change", repaint);
    const onMotion = () => {
      reduced = motion.matches;
      if (reduced) stop();
      else start();
    };
    motion.addEventListener("change", onMotion);

    return () => {
      cancelIdle();
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      scheme.removeEventListener("change", repaint);
      motion.removeEventListener("change", onMotion);
    };
  });
</script>

<div
  aria-hidden="true"
  class={cn(
    "pointer-events-none absolute inset-0 transition-opacity duration-slow ease-out-strong",
    painted && "opacity-0",
  )}
>
  {#if fallback}
    {@render fallback()}
  {:else}
    <div
      data-slot="dither-fallback"
      class={cn("size-full text-foreground", className)}
      style:background-image="radial-gradient(currentColor 0.75px, transparent 0.75px)"
      style:background-size={mode === "glyphs" ? "12px 12px" : "4px 4px"}
      style:opacity="0.08"
      style:mask-image="radial-gradient(closest-side, transparent 34%, currentColor 84%)"
    ></div>
  {/if}
</div>
<canvas
  data-slot="dither-field"
  bind:this={canvas}
  aria-hidden="true"
  class={cn("pointer-events-none absolute inset-0 h-full w-full text-foreground", className)}
></canvas>
