<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * One edge fade of a scroll container (local adapter of lot f1's `ScrollFade`).
   * Absolutely positioned; `class` supplies the gradient stops (`from-…`), and
   * the geometry, direction and opacity transition are fixed here.
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
