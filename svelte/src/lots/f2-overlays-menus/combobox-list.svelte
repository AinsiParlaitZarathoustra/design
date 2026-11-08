<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import { getComboboxStore } from "./combobox-store.svelte";

  /**
   * The scrolling list of a combobox's choices, ported from `ComboboxList`. Its
   * children render once per entry of the filtered list: an item, or a group.
   */
  interface Props {
    class?: string;
    children?: Snippet<[unknown, number]>;
  }

  let { class: className, children }: Props = $props();

  const store = getComboboxStore();
</script>

<div
  role="listbox"
  data-slot="combobox-list"
  data-empty={store.empty ? "" : undefined}
  class={cn(
    "max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-0.5 overflow-y-auto overscroll-contain p-0.5 data-empty:p-0",
    className,
  )}
>
  {#each store.entries as entry, index (index)}
    {@render children?.(entry, index)}
  {/each}
</div>
