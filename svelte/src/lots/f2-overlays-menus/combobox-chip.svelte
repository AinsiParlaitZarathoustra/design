<script lang="ts">
  import type { Snippet } from "svelte";
  import { X } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import { buttonVariants } from "../../ui/button-variants";
  import { getComboboxStore } from "./combobox-store.svelte";

  /**
   * A chosen item in a multiple combobox's field, ported from `ComboboxChip`. Its
   * remove button takes the item out of the selection. `value` names the item it
   * stands for, since a Svelte chip is not given its item by its parent.
   */
  interface Props {
    value: unknown;
    showRemove?: boolean;
    class?: string;
    children?: Snippet;
  }

  let { value, showRemove = true, class: className, children }: Props = $props();

  const store = getComboboxStore();
</script>

<div
  data-slot="combobox-chip"
  class={cn(
    "flex h-control-xs w-fit items-center justify-center gap-1 rounded-sm bg-element-selected px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
    className,
  )}
>
  {@render children?.()}
  {#if showRemove}
    <button
      type="button"
      data-slot="combobox-chip-remove"
      aria-label="Remove"
      onclick={() => store.removeChip(value)}
      class={cn(
        buttonVariants({ variant: "ghost", size: "xs" }),
        "aspect-square px-0 -ml-1 opacity-50 hover:opacity-100",
      )}
    >
      <X class="pointer-events-none size-3" />
    </button>
  {/if}
</div>
