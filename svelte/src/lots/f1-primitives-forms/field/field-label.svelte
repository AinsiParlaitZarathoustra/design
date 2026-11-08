<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLLabelAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import Label from "../label.svelte";

  /**
   * The label of a field. It is the lot's `Label` with the field's own
   * classes, as `FieldLabel` in `src/components/ui/field.tsx` builds it.
   */
  interface Props extends Omit<HTMLLabelAttributes, "class" | "children"> {
    class?: string;
    children?: Snippet;
    [key: `data-${string}`]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<Label
  data-slot="field-label"
  class={cn(
    "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:bg-element-selected has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-element-hover has-[>[data-slot=field]]:has-[:focus-visible]:border-border-strong *:data-[slot=field]:p-2",
    "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</Label>
