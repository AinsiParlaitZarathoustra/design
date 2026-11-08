<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { getComboboxStore } from "./combobox-store.svelte";

  /**
   * The typed text of a multiple combobox, placed among its chips, ported from
   * `ComboboxChipsInput`. A plain field: the chips box draws the border.
   */
  interface Props extends Omit<HTMLInputAttributes, "class" | "value"> {
    class?: string;
  }

  let { class: className, ...rest }: Props = $props();

  const store = getComboboxStore();
</script>

<input
  {@attach (node: HTMLInputElement) => {
    store.inputEl = node;
    return () => {
      if (store.inputEl === node) store.inputEl = null;
    };
  }}
  data-slot="combobox-chip-input"
  role="combobox"
  type="text"
  autocomplete="off"
  aria-autocomplete="list"
  aria-expanded={store.open}
  value={store.inputValue}
  disabled={store.disabled}
  oninput={(event) => store.typeQuery(event.currentTarget.value)}
  onkeydown={(event) => store.keydown(event)}
  onclick={() => store.openFromInput()}
  onblur={(event) => store.blurInput(event)}
  {...rest}
  class={cn("min-w-16 flex-1 outline-none", className)}
/>
