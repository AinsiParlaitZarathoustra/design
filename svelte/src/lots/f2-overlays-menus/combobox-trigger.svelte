<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { ChevronDown } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import { buttonVariants } from "../../ui/button-variants";
  import { getComboboxStore } from "./combobox-store.svelte";

  /**
   * The button that opens the combobox's list, ported from `ComboboxTrigger`. It
   * takes the house button's look through `variant` and `size` (the source's
   * `render={<Button variant="outline" />}`), and ends with a chevron.
   */
  interface Props extends Omit<HTMLButtonAttributes, "class" | "children"> {
    variant?: VariantProps<typeof buttonVariants>["variant"];
    size?: VariantProps<typeof buttonVariants>["size"];
    class?: string;
    children?: Snippet;
  }

  let {
    variant = "default",
    size = "md",
    class: className,
    children,
    disabled = false,
    ...rest
  }: Props = $props();

  const store = getComboboxStore();
  const off = $derived(disabled || store.disabled);
</script>

<button
  {@attach (node: HTMLElement) => {
    store.triggerEl = node;
    return () => {
      if (store.triggerEl === node) store.triggerEl = null;
    };
  }}
  type="button"
  data-slot="combobox-trigger"
  aria-haspopup="listbox"
  aria-expanded={store.open}
  data-pressed={store.open ? "" : undefined}
  data-disabled={off ? "" : undefined}
  disabled={off}
  {...rest}
  onclick={() => store.toggle()}
  class={cn(
    buttonVariants({ variant, size }),
    "[&_svg:not([class*='size-'])]:size-3.5",
    className,
  )}
>
  {@render children?.()}
  <ChevronDown class="pointer-events-none size-3.5 text-muted-foreground" />
</button>
