<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** The heading block of the dialog. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div data-slot="alert-dialog-header" class={cn("flex flex-col gap-1", className)}>
  {@render children?.()}
</div>
