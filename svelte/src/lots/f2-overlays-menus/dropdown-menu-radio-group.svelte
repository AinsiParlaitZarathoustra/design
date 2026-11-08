<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { setRadioGroup } from "./menu-context";

  /**
   * The radio group of a menu: its rows select one value. Controlled with `value`
   * and `onValueChange`, or uncontrolled with `defaultValue`.
   */
  interface Props {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    children?: Snippet;
  }

  let { value: valueProp, defaultValue, onValueChange, children }: Props = $props();

  let internal = $state<string | undefined>(untrack(() => defaultValue));
  const current = $derived(valueProp ?? internal);

  setRadioGroup({
    get value() {
      return current;
    },
    select(next: string) {
      internal = next;
      onValueChange?.(next);
    },
  });
</script>

<div role="group" data-slot="dropdown-menu-radio-group">
  {@render children?.()}
</div>
