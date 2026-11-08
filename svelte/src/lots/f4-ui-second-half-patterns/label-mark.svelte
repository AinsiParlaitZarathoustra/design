<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import type { LabelTone } from "../../lib/types";
  import HueDot from "./hue-dot.svelte";

  /**
   * A label as it appears inside a dense row: a hue dot and the name, no chip.
   * Use `Tag` where a label stands on its own, and this where it is one cell
   * among many.
   */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    hue: LabelTone;
    class?: string;
    children?: Snippet;
  }

  let { hue, class: className, children, ...rest }: Props = $props();
</script>

<span
  data-slot="label-mark"
  data-hue={hue}
  {...rest}
  class={cn(
    "inline-flex items-center gap-1.5 text-xs whitespace-nowrap text-secondary-foreground",
    className,
  )}
>
  <HueDot {hue} />
  {@render children?.()}
</span>
