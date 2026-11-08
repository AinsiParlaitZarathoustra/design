<script lang="ts" module>
  import type { OrbSize, OrbState } from "thinking-orbs/engine";

  /**
   * Local adapter: the `ThinkingOrb` React component of `thinking-orbs` (0.3.2),
   * ported to a Svelte canvas. The painter, presets and frames come from the
   * package's framework-free `thinking-orbs/engine` subpath; this file keeps the
   * React wrapper's behaviour: the DPR-sized canvas, the theme resolved from the
   * ancestors then the system, the still frame under reduced motion, and the
   * animation loop that pauses off-screen and in hidden tabs.
   *
   * Not ported, because no caller here uses them: `dots`, `opts`, `frame` and
   * `gravity`. The props below are the ones the wrapper honours for `state`,
   * `size`, `speed`, `paused`, `color`, `dotSize` and `theme`.
   */
  export type OrbTheme = "auto" | "dark" | "light";

  export const ORB_LABELS: Record<OrbState, string> = {
    working: "Working…",
    searching: "Searching…",
    solving: "Solving…",
    listening: "Listening…",
    connecting: "Connecting…",
    weaving: "Weaving…",
    composing: "Composing…",
    breathing: "Thinking…",
    shaping: "Shaping…",
  };

  function parseTint(color: string | undefined): { r: number; g: number; b: number } | undefined {
    if (!color) return undefined;
    const hex = color.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hex) {
      let digits = hex[1];
      if (digits.length === 3) digits = digits.replace(/./g, (c) => c + c);
      const n = parseInt(digits, 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }
    const fn = color.trim().match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (fn) return { r: Number(fn[1]), g: Number(fn[2]), b: Number(fn[3]) };
    return undefined;
  }

  /** The `data-theme` / `dark` / `light` on an ancestor, or null when none says. */
  function ancestorTheme(el: Element | null): boolean | null {
    let node: Element | null = el;
    while (node) {
      const attr = node.getAttribute("data-theme");
      if (attr === "dark") return true;
      if (attr === "light") return false;
      if (node.classList.contains("dark")) return true;
      if (node.classList.contains("light")) return false;
      node = node.parentElement;
    }
    return null;
  }

  function systemDark(): boolean {
    return typeof matchMedia === "undefined" || matchMedia("(prefers-color-scheme: dark)").matches;
  }
</script>

<script lang="ts">
  import type { HTMLCanvasAttributes } from "svelte/elements";
  import { MODE_FRAMES, paintFrame, resolvePreset } from "thinking-orbs/engine";
  import { scaleRadii } from "./thinking-orb-scale";

  interface Props extends Omit<HTMLCanvasAttributes, "class" | "style" | "children"> {
    class?: string;
    style?: string;
    state?: OrbState;
    size?: OrbSize;
    theme?: OrbTheme;
    speed?: number;
    paused?: boolean;
    color?: string;
    dotSize?: number;
    "aria-label"?: string;
  }

  let {
    class: className,
    style,
    state: orbState = "working",
    size = 64,
    theme = "auto",
    speed = 1,
    paused = false,
    color,
    dotSize = 1,
    "aria-label": ariaLabel,
    ...rest
  }: Props = $props();

  let canvas: HTMLCanvasElement | undefined = $state();
  let dark = $state(true);
  let reduced = $state(false);

  // The theme: a fixed `dark` or `light`, else the nearest ancestor's, else the system's.
  $effect(() => {
    if (theme === "dark") {
      dark = true;
      return;
    }
    if (theme === "light") {
      dark = false;
      return;
    }
    const host = canvas ?? null;
    const resolve = () => {
      dark = ancestorTheme(host) ?? systemDark();
    };
    resolve();
    const mq = typeof matchMedia !== "undefined" ? matchMedia("(prefers-color-scheme: dark)") : null;
    mq?.addEventListener("change", resolve);
    let observer: MutationObserver | null = null;
    if (typeof MutationObserver !== "undefined" && host) {
      observer = new MutationObserver(resolve);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
        subtree: true,
      });
    }
    return () => {
      mq?.removeEventListener("change", resolve);
      observer?.disconnect();
    };
  });

  $effect(() => {
    if (typeof matchMedia === "undefined") return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    reduced = mq.matches;
    const on = (event: MediaQueryListEvent) => (reduced = event.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  });

  // The paint loop. Every prop it reads re-runs it, and the cleanup stops the old one.
  $effect(() => {
    const el = canvas;
    if (!el) return;
    const dpr = Math.min(2, (typeof devicePixelRatio !== "undefined" && devicePixelRatio) || 1);
    el.width = Math.round(size * dpr);
    el.height = Math.round(size * dpr);
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const preset = resolvePreset(orbState, size);
    let opts = preset.opts;
    if (dotSize !== 1) opts = scaleRadii(opts, Math.max(0.1, dotSize));
    const frameFn = MODE_FRAMES[preset.mode];
    const tint = parseTint(color);
    const effSpeed = preset.speed * speed;
    const isDark = dark;
    const isPaused = paused;

    const frame = (tSec: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      paintFrame(ctx, frameFn(size, tSec, opts), isDark, tint);
    };

    if (reduced) {
      frame(0.6);
      return;
    }

    let raf = 0;
    let running = false;
    const loop = () => {
      frame((performance.now() / 1000) * effSpeed);
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || isPaused) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    frame((performance.now() / 1000) * effSpeed);

    let visible = true;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && document.visibilityState !== "hidden") start();
            else stop();
          })
        : null;
    io?.observe(el);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    if (!io) start();

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  });
</script>

<canvas
  bind:this={canvas}
  role="img"
  aria-label={ariaLabel ?? ORB_LABELS[orbState]}
  style={`width: ${size}px; height: ${size}px; display: block; ${style ?? ""}`}
  {...rest}
  class={className}
></canvas>
