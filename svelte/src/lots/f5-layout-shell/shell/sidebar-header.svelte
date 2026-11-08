<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * The workspace row. It sits on the shell's canvas ABOVE the curved panel, as
   * the Atlas desktop app does. Ported from `SidebarHeader` in `sidebar.tsx`.
   */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div
  data-slot="sidebar-header"
  class={cn("flex h-10 shrink-0 items-center gap-1 pb-2", className)}
>
  {@render children?.()}
</div>
