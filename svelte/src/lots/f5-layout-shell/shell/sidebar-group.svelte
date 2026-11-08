<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { useSidebar } from "./sidebar";

  /**
   * A labelled run of rows. Collapsed, the label becomes a short rule. Ported
   * from `SidebarGroup` in `sidebar.tsx`.
   */
  interface Props {
    label?: string;
    class?: string;
    children?: Snippet;
  }

  let { label, class: className, children }: Props = $props();
  const sidebar = useSidebar();
</script>

<div data-slot="sidebar-group" class={cn(sidebar.collapsed ? "mb-3" : "mb-6", className)}>
  {#if label}
    {#if sidebar.collapsed}
      <div aria-hidden="true" class="mx-auto mb-1.5 h-px w-5 bg-sidebar-border"></div>
    {:else}
      <div class="px-2 pb-1.5 eyebrow">{label}</div>
    {/if}
  {/if}
  <ul class="space-y-px">
    {@render children?.()}
  </ul>
</div>
