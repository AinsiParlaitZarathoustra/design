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
  const uid = $props.id();
  const labelId = `combobox-group-label-${uid}`;
  let labelled = $state(false);

  setComboboxGroup({
    get items() {
      return items;
    },
    get labelId() {
      return labelId;
    },
    setLabelMounted(mounted: boolean) {
      labelled = mounted;
    },
  });
</script>

<div role="group" data-slot="combobox-group" aria-labelledby={labelled ? labelId : undefined} class={cn(className)}>
  {@render children?.()}
</div>
