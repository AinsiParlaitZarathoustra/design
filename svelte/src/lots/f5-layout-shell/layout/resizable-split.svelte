<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import {
    ResizableGroup,
    setResizableGroup,
    type ResizableLayout,
    type ResizableOrientation,
  } from "./resizable.svelte";

  /**
   * Split panes, side by side or stacked, ported from
   * `src/components/layout/resizable-split.tsx` (react-resizable-panels v4).
   *
   *   <ResizableSplit id="editor" orientation="vertical" onLayoutCommit={save}>
   *     <ResizablePane id="code" minSize="20">…</ResizablePane>
   *     <ResizableHandle />
   *     <ResizablePane id="terminal" defaultSize="30">…</ResizablePane>
   *   </ResizableSplit>
   *
   * The split keeps nothing. Where a layout is remembered is the app's business:
   * it passes the saved layout back as `defaultLayout` and hears about a new one
   * through `onLayoutCommit`, once per user change.
   */
  interface Props {
    /** Required: a saved layout is matched to its split by id. */
    id: string;
    orientation?: ResizableOrientation;
    defaultLayout?: ResizableLayout;
    onLayoutCommit?: (layout: ResizableLayout) => void;
    class?: string;
    children: Snippet;
  }

  let { id, orientation = "horizontal", defaultLayout, onLayoutCommit, class: className, children }: Props = $props();

  // The split's props are read once: the group is created with them, as the source's `useState` is.
  // svelte-ignore state_referenced_locally
  const group = new ResizableGroup({ id, orientation, defaultLayout, onLayoutCommit });
  setResizableGroup(group);

  let el = $state<HTMLElement | null>(null);

  // Measure the axis, and read the panes in DOM order: a handle's neighbours
  // and the layout's first state come from there.
  $effect(() => {
    const node = el;
    if (!node) return;
    const measure = () => {
      const box = node.getBoundingClientRect();
      group.setAxis(Math.round(orientation === "horizontal" ? box.width : box.height));
    };
    measure();
    const panes = Array.from(
      node.querySelectorAll<HTMLElement>(":scope > [data-slot=resizable-pane]"),
    ).map((pane) => pane.dataset.paneId ?? "");
    group.setOrder(panes);
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={el}
  data-slot="resizable-split"
  data-orientation={orientation}
  class={cn("flex h-full w-full", orientation === "vertical" && "flex-col", className)}
>
  {@render children()}
</div>
