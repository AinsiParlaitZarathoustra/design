<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../lib/utils";
  import { badgeVariants } from "./badge-variants";

  /**
   * A status pill (decision 32), ported to Svelte.
   *
   * A `<span>`, `data-slot="badge"`, and `badgeVariants` exported for
   * composing onto a link. Not a control: it sizes itself to its text, so it
   * is not on the control-height scale.
   */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    variant?: VariantProps<typeof badgeVariants>["variant"];
    size?: VariantProps<typeof badgeVariants>["size"];
    class?: string;
    children?: Snippet;
  }

  let { class: className, variant = "secondary", size = "md", children, ...rest }: Props = $props();
</script>

<span data-slot="badge" class={cn(badgeVariants({ variant, size }), className)} {...rest}>
  {@render children?.()}
</span>
