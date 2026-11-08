<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * One edge fade, ported from `ScrollFade` in `src/ui/scroll-fade.tsx`.
   * Absolutely positioned: the scroll container needs a `relative` ancestor
   * that is not itself the scroller. `class` supplies the gradient stops
   * (`from-…`, `via-…`); the geometry, direction and opacity transition are
   * fixed here so the two edges of one list cannot drift apart.
   */
  interface Props {
    at: "top" | "bottom";
    visible: boolean;
    class?: string;
  }

  let { at, visible, class: className }: Props = $props();
</script>

<div
  aria-hidden="true"
  class={cn(
    "pointer-events-none absolute inset-x-0 z-10 h-14 transition-opacity duration-200",
    at === "top" ? "top-0 bg-gradient-to-b" : "bottom-0 bg-gradient-to-t",
    "to-transparent",
    visible ? "opacity-100" : "opacity-0",
    className,
  )}
></div>
