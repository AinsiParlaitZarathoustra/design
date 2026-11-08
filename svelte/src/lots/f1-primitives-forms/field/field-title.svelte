<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /** A choice card's title, ported from `FieldTitle` in `src/components/ui/field.tsx`. */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  data-slot="field-label"
  class={cn(
    "flex w-fit items-center gap-2 text-xs font-medium group-data-[disabled=true]/field:opacity-50",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
