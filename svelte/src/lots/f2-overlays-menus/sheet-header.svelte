<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** The heading block of the sheet. `pr-10` keeps a long title clear of the close button. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div data-slot="sheet-header" class={cn("flex flex-col gap-1 p-4 pr-10", className)}>
  {@render children?.()}
</div>
