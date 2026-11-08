<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../lib/utils";
  import { inputVariants } from "./input-variants";

  /**
   * The house text field (decision 32), ported to Svelte.
   *
   * Controlled use is `bind:value`; `defaultValue` seeds the field once, as
   * React's `defaultValue` does. The global `:focus-visible` ring is kept and
   * the border lifts to `--border-strong` on focus.
   */
  interface Props extends Omit<HTMLInputAttributes, "class" | "size"> {
    value?: string;
    defaultValue?: string;
    size?: VariantProps<typeof inputVariants>["size"];
    class?: string;
  }

  let {
    class: className,
    size = "md",
    type = "text",
    value = $bindable(undefined),
    defaultValue,
    ...rest
  }: Props = $props();

  function seed(node: HTMLInputElement, initial: string | undefined) {
    if (initial !== undefined && value === undefined) node.value = initial;
    return {
      update(next: string | undefined) {
        if (next !== undefined) node.value = next;
      },
    };
  }
</script>

<input
  data-slot="input"
  {type}
  bind:value
  use:seed={defaultValue}
  {...rest}
  class={cn(inputVariants({ size }), className)}
/>
