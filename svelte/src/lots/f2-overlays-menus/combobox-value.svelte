<script lang="ts">
  import type { Snippet } from "svelte";
  import { getComboboxStore } from "./combobox-store.svelte";

  /**
   * The chosen value of a combobox, ported from `ComboboxValue`. Without children
   * it shows the label of the choice (or the labels, joined, for a multiple one);
   * with a `children` snippet it receives the value itself.
   */
  interface Props {
    children?: Snippet<[unknown]>;
  }

  let { children }: Props = $props();

  const store = getComboboxStore();
</script>

{#if children}
  {@render children(store.value)}
{:else}
  {store.valueLabel}
{/if}
