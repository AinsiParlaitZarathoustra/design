<script lang="ts">
  import type { Snippet } from "svelte";
  import { getComboboxGroup, getComboboxStore } from "./combobox-store.svelte";

  /**
   * The choices of a combobox group, ported from `ComboboxCollection`. Outside a
   * group it renders every choice of the filtered list. It renders no element.
   */
  interface Props {
    children?: Snippet<[unknown, number]>;
  }

  let { children }: Props = $props();

  const store = getComboboxStore();
  const group = getComboboxGroup();
  const list = $derived(group ? group.items : store.flat);
</script>

{#each list as item, index (index)}
  {@render children?.(item, index)}
{/each}
