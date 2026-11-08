<script lang="ts" module>
  // A dotted WebGL globe that turns slowly and can be dragged.
  //
  // Ported from the Atlas desktop app's `src/components/blocks/globe.tsx`. cobe
  // draws the sphere; the markers are DOM, positioned with CSS anchor
  // positioning from the `--cobe-<id>` anchors cobe v2 publishes, and faded on the
  // far side by `--cobe-visible-<id>`. Where anchor positioning is unsupported the
  // markers simply do not show; the globe is unaffected.
  //
  // A marker with a `status` carries a LIVE tag: a count that drifts a few percent
  // either side of its base. Live is the `success` ink. The count is tabular.
  //
  // WebGL takes numbers, not custom properties, so the dot, marker and glow colours
  // are resolved from the token layer. Appearance is read from <html>'s
  // `data-appearance` and watched, so a theme switch rebuilds the globe in the new
  // ink. Under `prefers-reduced-motion` it stops turning on its own but can still be
  // dragged, and the counts stop drifting.
  //
  // cobe is not in the import graph: it is fetched with a dynamic `import()` once
  // the globe comes within 200px of the viewport and the main thread is idle. Until
  // the first frame, and for good where WebGL is unavailable, a token-coloured disc
  // (or the `fallback` snippet) holds the same square box. Without WebGL the root
  // carries `data-fallback`.

  export type GlobeMarker = {
    id: string;
    location: [number, number];
    /** Seconds before this marker's first pulse, so they do not beat in sync. */
    delay: number;
    /** A LIVE tag: a count that drifts around `count`, then what it counts. */
    status?: { count: number; unit: string };
  };

  const DEFAULT_MARKERS: Array<GlobeMarker> = [
    {
      id: "san-francisco",
      location: [37.77, -122.42],
      delay: 1.25,
      status: { count: 1284, unit: "agents running" },
    },
    {
      id: "new-york",
      location: [40.71, -74.01],
      delay: 0.5,
      status: { count: 862, unit: "sessions syncing" },
    },
    {
      id: "london",
      location: [51.51, -0.13],
      delay: 0,
      status: { count: 614, unit: "agents running" },
    },
    {
      id: "tokyo",
      location: [35.68, 139.65],
      delay: 1,
      status: { count: 438, unit: "changes streaming" },
    },
    {
      id: "sao-paulo",
      location: [-23.55, -46.63],
      delay: 0.75,
      status: { count: 347, unit: "agents running" },
    },
    {
      id: "bengaluru",
      location: [12.97, 77.59],
      delay: 1.5,
      status: { count: 529, unit: "changes streaming" },
    },
    {
      id: "dhaka",
      location: [23.81, 90.41],
      delay: 1.75,
      status: { count: 211, unit: "sessions syncing" },
    },
  ];

  /** How far a live count may wander from its base, as a fraction. */
  const DRIFT = 0.06;
  const TICK_MS = 1200;

  /**
   * Base tilt, in radians. The login aside shows only the upper-left of the disc,
   * so this leans the pole toward the reader far enough that the 25–50°N band sits
   * in the visible face, not the cropped rim.
   */
  const THETA = 0.55;

  /** The attributes on <html> a theme switch writes, in every app that has one. */
  const THEME_ATTRIBUTES = [
    "class",
    "style",
    "data-theme",
    "data-appearance",
    "data-theme-appearance",
  ];

  type Rgb = [number, number, number];
  type CreateGlobe = typeof import("cobe").default;
  type GlobeHandle = { update: (state: Record<string, unknown>) => void; destroy: () => void };

  /**
   * Whether this browser can create a WebGL context at all. Probed on a throwaway
   * canvas: asking the real one would claim its context, and cobe needs to be the
   * first to ask. The probe's context is released at once.
   */
  function webglAvailable(): boolean {
    try {
      const probe = document.createElement("canvas");
      const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
      if (!gl) return false;
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return true;
    } catch {
      return false;
    }
  }

  function tokenRgb(name: string, fallback: Rgb): Rgb {
    const rgb = resolveToken(name);
    return rgb ? [rgb.r / 255, rgb.g / 255, rgb.b / 255] : fallback;
  }

  /** The theme is read from <html>, as `useTheme()` reads it from the provider. */
  function readAppearance(): "dark" | "light" {
    return document.documentElement.dataset.appearance === "light" ? "light" : "dark";
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { infiniteAnimationFps } from "../../../lib/infinite-animations";
  import { resolveToken } from "../../../lib/resolved-color";
  import { whenIdle } from "../../../lib/when-idle";

  interface Props {
    markers?: Array<GlobeMarker>;
    /** Radians of spin per frame. */
    speed?: number;
    /**
     * Shown in the globe's box until its first frame, and for good without WebGL.
     * Defaults to a soft disc in the muted ink.
     */
    fallback?: Snippet;
    class?: string;
  }

  let { markers = DEFAULT_MARKERS, speed = 0.003, fallback, class: className }: Props = $props();

  let canvas: HTMLCanvasElement | undefined = $state();
  let appearance = $state<"dark" | "light">(readAppearance());
  let ready = $state(false);
  let unsupported = $state(false);
  let counts = $state<number[]>([]);

  // Pointer state is read by the animation loop, not by the template: plain values.
  let dragStart: { x: number; y: number } | null = null;
  let dragDelta = { phi: 0, theta: 0 };
  const offset = { phi: 0, theta: 0 };

  function markerStyle(id: string): string {
    return `position-anchor: --cobe-${id}; bottom: anchor(center); left: anchor(center); translate: -50% 50%; opacity: var(--cobe-visible-${id}, 0); filter: blur(calc((1 - var(--cobe-visible-${id}, 0)) * 8px));`;
  }

  function statusStyle(id: string): string {
    return `position-anchor: --cobe-${id}; bottom: anchor(top); left: anchor(center); translate: -50% 0; opacity: var(--cobe-visible-${id}, 0); filter: blur(calc((1 - var(--cobe-visible-${id}, 0)) * 8px));`;
  }

  function pingStyle(delay: number, lag: number): string {
    return `animation-delay: ${delay + lag}s;`;
  }

  // A theme switch, from whatever applies themes, updates the appearance.
  $effect(() => {
    const sync = () => {
      appearance = readAppearance();
    };
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: THEME_ATTRIBUTES });
    const scheme = window.matchMedia("(prefers-color-scheme: light)");
    scheme.addEventListener("change", sync);
    return () => {
      mo.disconnect();
      scheme.removeEventListener("change", sync);
    };
  });

  // A bounded random walk around each base count. Parked under reduced motion: a
  // number that never stops changing is motion too.
  $effect(() => {
    const list = markers;
    counts = list.map((m) => m.status?.count ?? 0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const prev = counts;
      counts = list.map((m, i) => {
        const base = m.status?.count ?? 0;
        if (!base) return 0;
        const step = Math.round(base * 0.01 * (Math.random() * 2 - 1)) || 1;
        const lo = Math.round(base * (1 - DRIFT));
        const hi = Math.round(base * (1 + DRIFT));
        return Math.min(hi, Math.max(lo, (prev[i] ?? base) + step));
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  });

  // Drag is tracked on the window so releasing outside the canvas still ends it;
  // the delta commits into `offset` on release.
  $effect(() => {
    function move(e: PointerEvent) {
      if (!dragStart) return;
      dragDelta = {
        phi: (e.clientX - dragStart.x) / 300,
        theta: (e.clientY - dragStart.y) / 1000,
      };
    }
    function up() {
      if (!dragStart) return;
      offset.phi += dragDelta.phi;
      offset.theta += dragDelta.theta;
      dragDelta = { phi: 0, theta: 0 };
      dragStart = null;
      canvas?.removeAttribute("data-dragging");
    }
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  });

  $effect(() => {
    const canvasNode = canvas;
    if (!canvasNode) return;
    // Typed once here: the function declarations below are not narrowed by the check.
    const canvasEl: HTMLCanvasElement = canvasNode;

    const currentMarkers = markers;
    const currentSpeed = speed;
    const dark = appearance === "dark";
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let globe: GlobeHandle | null = null;
    let cancelled = false;
    let cancelIdle: (() => void) | null = null;
    let ro: ResizeObserver | null = null;
    let frame = 0;
    let phi = 0;
    // Under a cap, skip frames and turn by the time that passed instead.
    const fps = infiniteAnimationFps(canvasEl);
    const minFrameMs = fps ? 1000 / fps : 0;
    let last = 0;

    function init(create: CreateGlobe, width: number) {
      if (globe) return;
      try {
        globe = create(canvasEl, {
          devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
          width,
          height: width,
          phi: 0,
          theta: THETA,
          dark: dark ? 1 : 0,
          diffuse: dark ? 1.5 : 1.2,
          mapSamples: 16000,
          mapBrightness: dark ? 8 : 4,
          baseColor: dark
            ? tokenRgb("--muted-foreground", [0.5, 0.5, 0.5])
            : tokenRgb("--card", [1, 1, 1]),
          markerColor: tokenRgb("--success", [0.3, 0.8, 0.5]),
          glowColor: tokenRgb("--surface", [0.05, 0.05, 0.05]),
          markerElevation: 0,
          markers: currentMarkers.map((m) => ({
            id: m.id,
            location: m.location,
            size: 0.025,
          })),
          opacity: dark ? 0.75 : 0.9,
        });
      } catch {
        // No context after all (a blocklisted GPU, a lost context): keep the
        // fallback rather than a blank box.
        globe = null;
        ro?.disconnect(); // a resize would only throw again
        unsupported = true;
        return;
      }

      const tick = (now = performance.now()) => {
        const elapsed = last ? now - last : 1000 / 60;
        if (minFrameMs && last && elapsed < minFrameMs && !dragStart) {
          frame = requestAnimationFrame(tick);
          return;
        }
        last = now;
        // `speed` is per 60 Hz frame; scaled by the time that passed.
        if (!dragStart && !still) phi += currentSpeed * (minFrameMs ? elapsed / (1000 / 60) : 1);
        globe?.update({
          phi: phi + offset.phi + dragDelta.phi,
          theta: THETA + offset.theta + dragDelta.theta,
        });
        frame = requestAnimationFrame(tick);
      };
      tick();
      canvasEl.dataset.ready = "";
      ready = true;
    }

    async function load() {
      if (!webglAvailable()) {
        unsupported = true;
        return;
      }
      let create: CreateGlobe;
      try {
        ({ default: create } = await import("cobe"));
      } catch {
        return; // offline, or the chunk failed: the fallback stays
      }
      // Unmounted (or re-themed) while the module was on its way.
      if (cancelled) return;
      // Created at the canvas's first real size, then resized in place.
      ro = new ResizeObserver(([entry]) => {
        const width = entry!.contentRect.width;
        if (width === 0) return;
        if (globe) globe.update({ width, height: width });
        else init(create, width);
      });
      ro.observe(canvasEl);
    }

    // Nothing is fetched until the globe is about to be seen.
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        cancelIdle = whenIdle(() => void load(), 1000);
      },
      { rootMargin: "200px" },
    );
    io.observe(canvasEl);

    return () => {
      cancelled = true;
      io.disconnect();
      cancelIdle?.();
      ro?.disconnect();
      cancelAnimationFrame(frame);
      globe?.destroy();
      delete canvasEl.dataset.ready;
      ready = false;
    };
  });
</script>

<div
  data-slot="globe"
  data-fallback={unsupported ? "" : undefined}
  class={cn("relative aspect-square select-none", className)}
>
  <div
    aria-hidden="true"
    class={cn(
      "pointer-events-none absolute inset-0 transition-opacity duration-slow ease-out-strong",
      ready && "opacity-0",
    )}
  >
    {#if fallback}
      {@render fallback()}
    {:else}
      <div
        data-slot="globe-fallback"
        class="size-full rounded-full bg-radial from-muted-foreground/15 via-muted-foreground/5 to-transparent"
      ></div>
    {/if}
  </div>
  <canvas
    bind:this={canvas}
    onpointerdown={(e) => {
      dragStart = { x: e.clientX, y: e.clientY };
      e.currentTarget.dataset.dragging = "";
    }}
    class={cn(
      "relative size-full cursor-grab touch-none rounded-full opacity-0",
      "transition-opacity duration-1000 ease-out-strong",
      "data-dragging:cursor-grabbing data-ready:opacity-100",
    )}
  ></canvas>
  {#each markers as m (m.id)}
    <div
      aria-hidden="true"
      class="pointer-events-none absolute flex size-10 items-center justify-center transition-[opacity,filter] duration-slow"
      style={markerStyle(m.id)}
    >
      {#each [0, 0.5] as lag (lag)}
        <span
          data-slot="globe-ping"
          class="absolute inset-0 rounded-full motion-safe:animate-ping border-2 border-success/60"
          style={pingStyle(m.delay, lag)}
        ></span>
      {/each}
      <span class="size-2 rounded-full bg-success ring-2 ring-success/30 ring-offset-2 ring-offset-panel"></span>
    </div>
  {/each}
  {#each markers as m, i (m.id)}
    {#if m.status}
      <div
        data-slot="globe-status"
        class="pointer-events-none absolute mb-3 flex items-center gap-1.5 rounded-md border border-border bg-popover py-1 pr-2 pl-1.5 whitespace-nowrap transition-[opacity,filter] duration-slow"
        style={statusStyle(m.id)}
      >
        <span
          aria-hidden="true"
          data-slot="globe-live-dot"
          class="size-1.5 rounded-full bg-success motion-safe:animate-pulse"
        ></span>
        <span class="font-mono text-3xs font-medium tracking-widest text-success uppercase">Live</span>
        <span aria-hidden="true" class="h-3 w-px bg-border"></span>
        <span class="text-3xs text-secondary-foreground tabular-nums">
          {(counts[i] ?? 0).toLocaleString("en-US")} {m.status.unit}
        </span>
      </div>
    {/if}
  {/each}
</div>
