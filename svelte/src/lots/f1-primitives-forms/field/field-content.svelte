<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /** The text column of a horizontal field, ported from `FieldContent` in `src/components/ui/field.tsx`. */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  data-slot="field-content"
  class={cn("group/field-content flex flex-1 flex-col gap-0.5 leading-snug", className)}
  {...rest}
>
  {@render children?.()}
</div>
