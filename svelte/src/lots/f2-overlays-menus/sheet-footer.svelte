<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** The actions block of the sheet, pushed to the bottom; the primary action last. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div
  data-slot="sheet-footer"
  class={cn("mt-auto flex flex-col-reverse gap-2 p-4 sm:flex-row sm:justify-end", className)}
>
  {@render children?.()}
</div>
