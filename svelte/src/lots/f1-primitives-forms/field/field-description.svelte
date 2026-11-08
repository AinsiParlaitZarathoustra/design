<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /** A field's description, ported from `FieldDescription` in `src/components/ui/field.tsx`. */
  interface Props extends Omit<HTMLAttributes<HTMLParagraphElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<p
  data-slot="field-description"
  class={cn(
    "text-left caption group-has-data-[orientation=horizontal]/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
    "last:mt-0 nth-last-2:-mt-1",
    "[&>a]:underline [&>a]:underline-offset-2 [&>a:hover]:text-foreground",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</p>
