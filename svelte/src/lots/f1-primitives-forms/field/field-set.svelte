<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLFieldsetAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /** A fieldset of fields, ported from `FieldSet` in `src/components/ui/field.tsx`. */
  interface Props extends Omit<HTMLFieldsetAttributes, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<fieldset
  data-slot="field-set"
  class={cn(
    "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</fieldset>
