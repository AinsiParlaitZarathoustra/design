<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * The list of a reading layout. `narrow` is the inbox shape (a 20rem index);
   * `wide` is the issues shape (the list is the screen). Ported from `ListPane`
   * in `list-detail.tsx`.
   */
  interface Props {
    width?: "narrow" | "wide";
    class?: string;
    children?: Snippet;
  }

  let { width = "narrow", class: className, children }: Props = $props();
</script>

<div
  data-slot="list-pane"
  data-panel=""
  data-width={width}
  class={cn(
    "flex flex-col border-r border-border-subtle",
    width === "narrow" && "w-80 shrink-0",
    width === "wide" && "min-w-0 flex-1",
    "max-lg:w-full max-lg:flex-1 max-lg:border-r-0",
    className,
  )}
>
  {@render children?.()}
</div>
