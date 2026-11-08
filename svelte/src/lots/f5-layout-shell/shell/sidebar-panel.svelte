<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * The curved segment the navigation lives in: search, groups and footer inside
   * one ringed panel on the page's own background. Ported from `SidebarPanel`.
   */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div
  data-slot="sidebar-panel"
  class={cn(
    "flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-background pt-2",
    className,
  )}
>
  {@render children?.()}
</div>
