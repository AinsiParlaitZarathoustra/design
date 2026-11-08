<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLLabelAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /**
   * The text on or beside a control, ported from `Label` in
   * `src/components/ui/label.tsx`. Uses the named `label` text style; a
   * disabled peer or a `data-disabled` group dims it.
   */
  interface Props extends Omit<HTMLLabelAttributes, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<label
  data-slot="label"
  class={cn(
    "flex items-center gap-2 label select-none",
    "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
    // A Base UI control wrapped in the label (radio, checkbox) marks itself `data-disabled`.
    "has-data-disabled:cursor-not-allowed has-data-disabled:text-muted-foreground",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</label>
