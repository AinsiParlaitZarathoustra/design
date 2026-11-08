<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import { setComboboxGroup } from "./combobox-store.svelte";

  /**
   * A labelled run of a combobox's choices, ported from `ComboboxGroup`. Its
   * collection renders `items`, the group's matching choices.
   */
  interface Props {
    items: readonly unknown[];
    class?: string;
    children?: Snippet;
  }

  let { items, class: className, children }: Props = $props();

  setComboboxGroup({
    get items() {
      return items;
    },
  });
</script>

<div role="group" data-slot="combobox-group" class={cn(className)}>
  {@render children?.()}
</div>
