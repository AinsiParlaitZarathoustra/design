<script lang="ts">
  import type { Snippet } from "svelte";
  import { onDestroy } from "svelte";
  import { cn } from "../../../lib/utils";
  import {
    getResizableGroup,
    type ResizablePanelHandle,
    type ResizablePaneSize,
    type ResizableSize,
  } from "./resizable.svelte";

  /**
   * One pane of a split, ported from `ResizablePane` in
   * `src/components/layout/resizable-split.tsx`. `panelRef` receives the
   * imperative handle (`collapse`, `expand`) so a pane collapses without
   * unmounting; `onResize` hears every size change, the library's own included.
   */
  interface Props {
    /** Required: the layout is keyed by pane id. */
    id: string;
    defaultSize?: ResizableSize;
    minSize?: ResizableSize;
    maxSize?: ResizableSize;
    collapsible?: boolean;
    collapsedSize?: ResizableSize;
    panelRef?: { current: ResizablePanelHandle | null };
    onResize?: (size: ResizablePaneSize) => void;
    class?: string;
    children?: Snippet;
  }

  let {
    id,
    defaultSize,
    minSize,
    maxSize,
    collapsible = false,
    collapsedSize,
    panelRef,
    onResize,
    class: className,
    children,
  }: Props = $props();

  const group = getResizableGroup();
  // The pane's props are read once at mount, as the source registers its panel.
  // svelte-ignore state_referenced_locally
  const unregister = group.register(
    { id, defaultSize, minSize, maxSize, collapsible, collapsedSize },
    (size) => onResize?.(size),
  );
  onDestroy(unregister);

  const size = $derived(group.layout[id] ?? 0);

  // The handle is written once; its methods read the live group.
  // svelte-ignore state_referenced_locally
  if (panelRef) {
    panelRef.current = {
      collapse: () => group.collapse(id),
      expand: () => group.expand(id),
      isCollapsed: () => group.isCollapsed(id),
      getSize: () => ({ asPercentage: group.layout[id] ?? 0 }),
    };
  }
</script>

<div
  data-slot="resizable-pane"
  data-pane-id={id}
  style:flex-grow={size}
  style:flex-basis="0px"
  class={cn("min-h-0 min-w-0 overflow-hidden", className)}
>
  {@render children?.()}
</div>
