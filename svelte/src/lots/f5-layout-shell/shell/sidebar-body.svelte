<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { useScrollEdges, ScrollFade } from "../../f1-primitives-forms/index";

  /**
   * The scrolling part of the rail, under edge fades that appear only while
   * there is more past them. Ported from `SidebarBody` in `sidebar.tsx`.
   */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();

  let scroller = $state<HTMLElement | null>(null);
  const edges = useScrollEdges(() => scroller, () => children);
</script>

<div class="relative flex min-h-0 flex-1 flex-col">
  <div
    bind:this={scroller}
    data-slot="sidebar-body"
    class={cn("min-h-0 flex-1 overflow-y-auto px-2 pb-2", className)}
  >
    {@render children?.()}
  </div>
  <ScrollFade at="top" visible={edges.top} class="h-6 from-background" />
  <ScrollFade at="bottom" visible={edges.bottom} class="h-6 from-background" />
</div>
