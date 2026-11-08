<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /**
   * Icon buttons set into one track: the same hairline pill as `Segmented`, for a
   * cluster of related tools rather than a choice between views.
   */
  interface Props {
    orientation?: "horizontal" | "vertical";
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { orientation = "horizontal", class: className, children, ...rest }: Props = $props();
</script>

<div
  role="group"
  data-slot="segmented-icon-group"
  data-orientation={orientation}
  class={cn(
    "flex w-fit items-center gap-0.5 rounded-full border border-border p-0.5",
    "data-[orientation=vertical]:flex-col",
    "[&_[data-slot=icon-button]]:rounded-full",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
