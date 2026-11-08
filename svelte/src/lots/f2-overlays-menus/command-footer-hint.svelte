<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** One "keys + label" pair in the footer. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<span data-slot="command-footer-hint" class={cn("inline-flex items-center gap-1.5", className)}>
  {@render children?.()}
</span>
