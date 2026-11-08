<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import {
    setSideDockState,
    type AppFrameInset,
    type SideDockMode,
    type SideDockState,
  } from "./app-frame";

  /**
   * The application frame: curved panels on a canvas, ported from
   * `src/components/layout/app-frame.tsx`.
   *
   *   ┌ canvas ─────────────────────────────────────────────────────┐
   *   │ ┌─ sidebar ─┐ ┌──────────────────────────────┐ ┌─ dock ───┐ │
   *   │ │           │ │            page              │ │ (raised) │ │
   *   │ └───────────┘ └──────────────────────────────┘ └──────────┘ │
   *   └─────────────────────────────────────────────────────────────┘
   *
   * The frame is slots and layout only. It reads no storage, listens to no keys
   * and knows no routes: the sidebar, the bar shown below `lg` and any overlay
   * are the caller's, and so is the dock's size. `h-dvh overflow-hidden`: the
   * page never scrolls; scroll lives inside each panel.
   */
  interface Props {
    /** The rail: a `Sidebar`, with `lg:mr-2` for the gap to the page. */
    sidebar: Snippet;
    /** A bar above the panels, for below `lg`. Hide it at `lg` yourself. */
    topBar?: Snippet;
    /** Anything over the frame: a drawer's scrim, ⌘K. */
    overlay?: Snippet;
    /** The dock size the person chose. The frame only reports a new pick. */
    dockMode: SideDockMode;
    onDockModeChange: (mode: SideDockMode) => void;
    /** Where the 8px gutter runs: `all` sides (the default), or `sides` only. */
    inset?: AppFrameInset;
    class?: string;
    /** The page. */
    children: Snippet;
  }

  let {
    sidebar,
    topBar,
    overlay,
    dockMode,
    onDockModeChange,
    inset = "all",
    class: className,
    children,
  }: Props = $props();

  let slot = $state<HTMLElement | null>(null);
  let workEl = $state<HTMLElement | null>(null);
  let work = $state(0);
  let borrowers = $state<string[]>([]);

  // The work area is the page + dock row; the half dock is a fraction of it.
  $effect(() => {
    const el = workEl;
    if (!el) return;
    const measure = () => {
      work = Math.round(el.getBoundingClientRect().width);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  });

  // A borrow widens a compact dock to half, for as long as it is held.
  const mode = $derived<SideDockMode>(
    dockMode === "compact" && borrowers.length > 0 ? "half" : dockMode,
  );

  const dockState: SideDockState = {
    get slot() {
      return slot;
    },
    get mode() {
      return mode;
    },
    get work() {
      return work;
    },
    get inset() {
      return inset;
    },
    setMode(next) {
      borrowers = [];
      onDockModeChange(next);
    },
    borrow(id) {
      if (!borrowers.includes(id)) borrowers = [...borrowers, id];
    },
    release(id) {
      if (borrowers.includes(id)) borrowers = borrowers.filter((x) => x !== id);
    },
  };
  setSideDockState(dockState);
</script>

<div
  data-slot="app-frame"
  data-inset={inset === "sides" ? inset : undefined}
  class={cn("flex h-dvh w-full flex-col overflow-hidden bg-sidebar", className)}
>
  {@render overlay?.()}
  {@render topBar?.()}
  <div
    class={cn(
      "flex min-h-0 flex-1 p-2",
      topBar != null && "max-lg:pt-0",
      inset === "sides" && "pt-0",
    )}
  >
    {@render sidebar()}

    <!-- The work area: the page and the dock share it. `relative`: a leaving dock is pinned to its right edge. -->
    <div bind:this={workEl} class="relative flex min-h-0 min-w-0 flex-1">
      <main
        class={cn(
          "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-background",
          inset === "sides" && "rounded-t-none border-t-0",
        )}
      >
        {@render children()}
      </main>
      <div bind:this={slot} class="contents"></div>
    </div>
  </div>
</div>
