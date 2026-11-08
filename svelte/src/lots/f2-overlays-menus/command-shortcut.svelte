<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** A chord as plain glyphs on the right of a row. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<kbd
  data-slot="command-shortcut"
  class={cn("ms-auto shrink-0 font-sans text-xs font-medium tracking-widest text-muted-foreground", className)}
>
  {@render children?.()}
</kbd>
