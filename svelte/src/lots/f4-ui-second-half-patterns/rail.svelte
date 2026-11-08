<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** Centre of a node from the top of its row: the hairline starts and stops there. */
  const RAIL_NODE_CENTRE = 16;

  /**
   * The session timeline's rail: a hairline down a 32px gutter, a round node per
   * row, the row's content 14px to its right. `first` and `last` stop the hairline
   * at the end nodes' centres.
   */
  interface Props {
    /** What hangs in the gutter: a `RailNode`, a face, a status glyph. 32px across. */
    node: Snippet;
    /** The first row: the hairline starts at its node. */
    first?: boolean;
    /** The last row: the hairline stops at its node. */
    last?: boolean;
    class?: string;
    style?: string;
    /** The content column's classes; its `pb-4` is the space between rows. */
    contentClass?: string;
    children: Snippet;
  }

  let { node, first = false, last = false, class: className, style, contentClass, children }: Props = $props();
</script>

<div class={cn("grid grid-cols-[32px_minmax(0,1fr)] gap-3.5", className)} {style}>
  <div class="relative flex justify-center">
    <span
      aria-hidden="true"
      class="absolute left-1/2 -ml-px w-px bg-border-subtle"
      style="top: {first ? `${RAIL_NODE_CENTRE}px` : '0'}; bottom: {last ? `calc(100% - ${RAIL_NODE_CENTRE}px)` : '0'};"
    ></span>
    {@render node()}
  </div>
  <div class={cn("min-w-0 pb-4", contentClass)}>{@render children()}</div>
</div>
