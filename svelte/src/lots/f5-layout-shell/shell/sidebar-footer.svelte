<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { useSidebar } from "./sidebar";

  /**
   * The rail's footer: the tools, in a row, or stacked when the rail is
   * collapsed. Ported from `SidebarFooter` in `sidebar.tsx`.
   */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
  const sidebar = useSidebar();
</script>

<div
  data-slot="sidebar-footer"
  class={cn(
    "flex items-center gap-1 border-t border-sidebar-border p-2",
    sidebar.collapsed && "flex-col",
    className,
  )}
>
  {@render children?.()}
</div>
