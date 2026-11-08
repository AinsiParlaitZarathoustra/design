<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** The actions block of the dialog: stacked on narrow screens, right-aligned from `sm`. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div
  data-slot="alert-dialog-footer"
  class={cn("flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end", className)}
>
  {@render children?.()}
</div>
