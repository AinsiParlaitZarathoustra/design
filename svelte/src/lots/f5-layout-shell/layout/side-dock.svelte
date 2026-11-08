<script lang="ts">
  import type { Snippet } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { cn } from "../../../lib/utils";
  import { DOCK_GAP, DOCK_WIDTH, getSideDockState } from "./app-frame";

  /**
   * The dock: a panel beside the page that a screen fills by rendering
   * `<SideDock>` anywhere inside the frame; it moves into the frame's slot.
   * Ported from `SideDock` and `SideDockPanel` in `app-frame.tsx`.
   *
   * Children make it open; removing the `SideDock` makes it close. Entering it
   * fades in and slides 24px from its place; leaving it is taken out of the
   * flow first, so the page widens in one step under it, and it slides back
   * out. The slide is a transform, not a width change. Reduced motion keeps
   * the fade and drops the slide.
   */
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  const frame = getSideDockState();
  let panel = $state<HTMLElement | null>(null);

  // Portal the panel into the frame's slot, once the frame has mounted.
  $effect(() => {
    const target = frame.slot;
    const el = panel;
    if (!target || !el) return;
    target.appendChild(el);
  });

  const width = $derived(
    frame.mode === "half" && frame.work
      ? `${Math.round((frame.work - DOCK_GAP) / 2)}px`
      : DOCK_WIDTH,
  );

  function away(): number {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? 0 : 24;
  }

  /** Entering: the full width at once, sliding in as it fades. */
  function dockIn(_node: HTMLElement) {
    const offset = away();
    return {
      duration: 300,
      easing: cubicOut,
      css: (t: number) =>
        `opacity: ${t}; transform: translateX(${(1 - t) * offset}px);`,
    };
  }

  /** Leaving: out of the flow (pinned right), so the page widens under it. */
  function dockOut(node: HTMLElement) {
    node.classList.remove("relative", "ml-2");
    node.classList.add("absolute", "inset-y-0", "right-0");
    const offset = away();
    return {
      duration: 300,
      easing: cubicOut,
      css: (t: number) =>
        `opacity: ${t}; transform: translateX(${(1 - t) * offset}px);`,
    };
  }
</script>

{#if children}
  <aside
    bind:this={panel}
    data-slot="dock"
    data-mode={frame.mode}
    data-panel=""
    style:width={width}
    style:transform="translateX(0px)"
    style:opacity="1"
    in:dockIn|global
    out:dockOut|global
    class={cn(
      "z-panel flex h-full shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card max-lg:hidden",
      "relative ml-2",
      frame.inset === "sides" && "rounded-t-none border-t-0",
    )}
  >
    <div class="@container flex min-h-0 w-full min-w-95 flex-1 flex-col">
      {@render children()}
    </div>
  </aside>
{/if}
