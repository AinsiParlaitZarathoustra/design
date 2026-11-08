<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../lib/utils";
  import { buttonVariants } from "./button-variants";

  /**
   * The house button (decision 32), ported from `@tryatlas/design` 0.1.15.
   *
   * Svelte translation of Base UI's `render` prop: pass a `child` snippet that
   * receives the props to put on the element (see `DialogTrigger`), or style a
   * plain link with `buttonVariants()`.
   */
  interface Props extends Omit<HTMLButtonAttributes, "class"> {
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
    type = "button",
    disabled = false,
    ...rest
  }: Props = $props();
</script>

<button
  data-slot="button"
  {type}
  {disabled}
  data-disabled={disabled || undefined}
  {...rest}
  class={cn(buttonVariants({ variant, size }), className)}
>
  {@render children?.()}
</button>
