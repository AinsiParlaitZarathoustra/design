<script module lang="ts">
  /** The value a menu's radio rows share (`DropdownMenuRadioGroup`). */
  export interface RadioGroupContext {
    readonly value: string;
    select(value: string): void;
  }
</script>

<script lang="ts">
  import { setContext, type Snippet } from "svelte";

  interface Props {
    value: string;
    onValueChange?: (value: string) => void;
    children?: Snippet;
  }

  let { value, onValueChange, children }: Props = $props();

  setContext<RadioGroupContext>("dropdown-menu-radio-group", {
    get value() {
      return value;
    },
    select(next: string) {
      onValueChange?.(next);
    },
  });
</script>

<div data-slot="dropdown-menu-radio-group" role="group">{@render children?.()}</div>
