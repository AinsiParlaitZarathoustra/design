<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import { setAccordionRoot } from "./accordion-context";

  interface Props {
    /** Open several items at once. Without it, opening one closes the others. */
    multiple?: boolean;
    /** The open item values. Bind it to control the accordion. */
    value?: string[];
    /** The open values at first render, when `value` is not bound. */
    defaultValue?: string[];
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let {
    multiple = false,
    value = $bindable(),
    defaultValue = [],
    class: className,
    children,
    ...rest
  }: Props = $props();

  // Uncontrolled unless the parent binds `value`.
  let open = $state<string[]>(untrack(() => (value ?? defaultValue).slice()));
  const current = $derived(value ?? open);

  function setOpen(next: string[]) {
    if (value !== undefined) value = next;
    else open = next;
  }

  setAccordionRoot({
    get multiple() {
      return multiple;
    },
    isOpen: (itemValue) => current.includes(itemValue),
    toggle: (itemValue) => {
      if (current.includes(itemValue)) {
        setOpen(current.filter((entry) => entry !== itemValue));
      } else {
        setOpen(multiple ? [...current, itemValue] : [itemValue]);
      }
    },
  });
</script>

<div data-slot="accordion" class={cn("flex w-full flex-col overflow-hidden rounded-md border border-border-subtle", className)} {...rest}>
  {@render children?.()}
</div>
