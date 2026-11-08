<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** The leading glyph, held to the first line of a two-line row. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<span
  data-slot="command-item-icon"
  class={cn("flex h-5 shrink-0 items-center self-start text-muted-foreground", className)}
>
  {@render children?.()}
</span>
