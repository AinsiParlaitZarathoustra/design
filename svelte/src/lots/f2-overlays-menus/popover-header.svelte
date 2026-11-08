<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** The popover's heading block: title and description, spaced as the source. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div data-slot="popover-header" class={cn("flex flex-col gap-0.5 pb-1.5", className)}>
  {@render children?.()}
</div>
