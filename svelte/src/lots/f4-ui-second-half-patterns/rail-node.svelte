<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** The round node a row hangs from: 32px, a quiet border, opaque over the hairline. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<span
  data-slot="rail-node"
  class={cn(
    "relative flex size-8 shrink-0 items-center justify-center rounded-full border bg-card",
    "border-border-strong/50 text-secondary-foreground",
    className,
  )}
>
  {@render children?.()}
</span>
