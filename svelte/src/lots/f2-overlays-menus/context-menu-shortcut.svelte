<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** The keys drawn at a right-click row's end. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<span
  data-slot="context-menu-shortcut"
  class={cn(
    "ml-auto pl-3 text-3xs text-disabled",
    "group-focus/context-menu-item:text-secondary-foreground",
    className,
  )}
>
  {@render children?.()}
</span>
