<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /** A group's heading (`DropdownMenuLabel`). */
  interface Props {
    inset?: boolean;
    class?: string;
    children?: Snippet;
  }

  let { inset = false, class: className, children }: Props = $props();
</script>

<div
  data-slot="dropdown-menu-label"
  data-inset={inset ? "" : undefined}
  class={cn("eyebrow px-2 py-1 text-muted-foreground", "data-[inset]:pl-7", className)}
>
  {@render children?.()}
</div>
