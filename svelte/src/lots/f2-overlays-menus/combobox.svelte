<script lang="ts">
  import type { Snippet } from "svelte";
  import { useDismiss } from "./popup-presence.svelte";
  import { ComboboxStore, defaultItemLabel, setComboboxStore } from "./combobox-store.svelte";

  /**
   * The combobox root, ported from `Combobox` in `@base-ui/react/combobox`. It owns
   * the selection, the typed text and the open state, and shares them with its
   * input, trigger, popup and items. A single choice fills the input with its
   * label and closes; a multiple choice toggles and keeps the popup open. A press
   * outside, Escape, or focus leaving the field closes the popup.
   */
  interface Props {
    items?: readonly unknown[];
    value?: unknown;
    defaultValue?: unknown;
    onValueChange?: (value: unknown) => void;
    inputValue?: string;
    defaultInputValue?: string;
    onInputValueChange?: (value: string) => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    multiple?: boolean;
    itemToStringLabel?: (item: unknown) => string;
    children?: Snippet;
  }

  let {
    items = [],
    multiple = false,
    disabled = false,
    itemToStringLabel = defaultItemLabel,
    defaultValue,
    value = $bindable(defaultValue ?? (multiple ? [] : null)),
    onValueChange,
    defaultInputValue,
    inputValue = $bindable(
      defaultInputValue ?? (!multiple && value != null ? itemToStringLabel(value) : ""),
    ),
    onInputValueChange,
    defaultOpen = false,
    open = $bindable(defaultOpen),
    onOpenChange,
    children,
  }: Props = $props();

  const store = new ComboboxStore({
    get items() {
      return items;
    },
    get multiple() {
      return multiple;
    },
    get disabled() {
      return disabled;
    },
    get value() {
      return value;
    },
    get inputValue() {
      return inputValue;
    },
    get open() {
      return open;
    },
    label: (item) => itemToStringLabel(item),
    setValue(next) {
      value = next;
      onValueChange?.(next);
    },
    setInputValue(next) {
      inputValue = next;
      onInputValueChange?.(next);
    },
    setOpen(next) {
      open = next;
      onOpenChange?.(next);
    },
  });

  setComboboxStore(store);

  useDismiss({
    active: () => store.open,
    inside: (target) => store.contains(target),
    onDismiss: () => store.setOpen(false),
  });
</script>

{@render children?.()}
