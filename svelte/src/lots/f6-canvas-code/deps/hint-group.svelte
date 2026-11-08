<script module lang="ts">
  export interface HintGroupContext {
    readonly side: "top" | "bottom";
  }
</script>

<script lang="ts">
  import { setContext, type Snippet } from "svelte";

  /**
   * Adapter for `HintGroup` (`src/ui/hint-group.tsx`, lot f1). The React group
   * adds no DOM and shares one sliding tooltip between its items; this adapter
   * keeps the no-DOM part and hands each `HintItem` the side it opens on. The
   * sliding between items is not reproduced: each item opens its own tooltip.
   */
  interface Props {
    side?: "top" | "bottom";
    children?: Snippet;
  }

  let { side = "bottom", children }: Props = $props();

  setContext<HintGroupContext>("hint-group", {
    get side() {
      return side;
    },
  });
</script>

{@render children?.()}
