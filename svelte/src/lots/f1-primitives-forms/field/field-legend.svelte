<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /** The legend of a field set, ported from `FieldLegend` in `src/components/ui/field.tsx`. */
  interface Props extends Omit<HTMLAttributes<HTMLLegendElement>, "class" | "children"> {
    class?: string;
    variant?: "legend" | "label";
    children?: Snippet;
  }

  let { class: className, variant = "legend", children, ...rest }: Props = $props();
</script>

<legend
  data-slot="field-legend"
  data-variant={variant}
  class={cn(
    "mb-2 font-medium text-foreground data-[variant=label]:text-xs data-[variant=legend]:text-md",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</legend>
