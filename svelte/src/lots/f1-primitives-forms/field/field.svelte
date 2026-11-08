<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../../../lib/utils";
  import { fieldVariants } from "./field-variants";

  /**
   * One field: a label, a control, a description and an error, laid out by
   * `orientation`. Ported from `Field` in `src/components/ui/field.tsx`.
   * `data-*` attributes (such as `data-invalid`) go on the root, as in React.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    orientation?: VariantProps<typeof fieldVariants>["orientation"];
    children?: Snippet;
    [key: `data-${string}`]: unknown;
  }

  let { class: className, orientation = "vertical", children, ...rest }: Props = $props();
</script>

<div
  role="group"
  data-slot="field"
  data-orientation={orientation}
  class={cn(fieldVariants({ orientation }), className)}
  {...rest}
>
  {@render children?.()}
</div>
