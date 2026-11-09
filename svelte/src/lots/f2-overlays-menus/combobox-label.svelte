<script lang="ts">
  import type { Snippet } from "svelte";
  import { onDestroy } from "svelte";
  import { cn } from "../../lib/utils";
  import { getComboboxGroup } from "./combobox-store.svelte";

  /** The caption of a combobox group, ported from `ComboboxLabel`. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
  const group = getComboboxGroup();
  group?.setLabelMounted(true);
  onDestroy(() => group?.setLabelMounted(false));
</script>

<div id={group?.labelId} aria-hidden="true" data-slot="combobox-label" class={cn("eyebrow px-2 py-1", className)}>
  {@render children?.()}
</div>
