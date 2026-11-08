<script lang="ts">
  import type { Snippet } from "svelte";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../../../lib/utils";
  import Button from "../../../ui/button.svelte";
  import { inputGroupButtonVariants } from "./input-group-variants";

  /**
   * A button in an input group, ported from `InputGroupButton`. It is the
   * house `Button` with the group's own sizes.
   */
  interface Props {
    variant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link";
    size?: VariantProps<typeof inputGroupButtonVariants>["size"];
    type?: "button" | "submit" | "reset";
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  }

  let { variant = "ghost", size = "xs", type = "button", class: className, children, ...rest }: Props = $props();
</script>

<Button
  {type}
  data-size={size}
  {variant}
  class={cn(inputGroupButtonVariants({ size }), className)}
  {...rest}
>
  {@render children?.()}
</Button>
