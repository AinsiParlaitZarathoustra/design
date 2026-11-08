<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * The detail of a reading layout. `fill` takes the rest of the width;
   * `companion` pairs with a wide list and is narrower. Ported from `DetailPane`
   * in `list-detail.tsx`.
   */
  interface Props {
    width?: "fill" | "companion";
    class?: string;
    children?: Snippet;
  }

  let { width = "fill", class: className, children }: Props = $props();
</script>

<div
  data-slot="detail-pane"
  data-panel=""
  data-width={width}
  class={cn(
    "flex flex-col max-lg:hidden",
    width === "fill" && "min-w-0 flex-1",
    width === "companion" && "w-95 shrink-0 border-l border-border-subtle",
    className,
  )}
>
  {@render children?.()}
</div>
