<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** The caption of a combobox group, ported from `ComboboxLabel`. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div role="presentation" data-slot="combobox-label" class={cn("eyebrow px-2 py-1", className)}>
  {@render children?.()}
</div>
