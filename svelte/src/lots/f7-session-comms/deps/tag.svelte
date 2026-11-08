<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import { HUE_CHIP } from "../../../lib/hue";
  import type { LabelTone } from "../../../lib/types";

  /**
   * Local adapter for `Tag` (`src/components/ui/tag.tsx`, lot f7 dependency):
   * the hue-coded identity chip. A hue is an identity, not a status: the hue's
   * own ink on the hue at 12%. `dot` adds the bare hue dot before the words.
   */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    hue?: LabelTone;
    dot?: boolean;
    class?: string;
    children?: Snippet;
  }

  let { hue = "grey", dot = false, class: className, children, ...rest }: Props = $props();
</script>

<span
  data-slot="tag"
  data-hue={hue}
  {...rest}
  class={cn(
    "inline-flex w-fit shrink-0 items-center gap-1 rounded px-1.5 py-px",
    "text-2xs font-medium whitespace-nowrap select-none",
    HUE_CHIP[hue],
    className,
  )}
>
  {#if dot}
    <span aria-hidden="true" class="size-1.5 rounded-full bg-current"></span>
  {/if}
  {@render children?.()}
</span>
