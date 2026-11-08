<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * One edge fade over a scroll container, ported from `ScrollFade` in
   * `src/ui/scroll-fade.tsx`. The gradient stops come from `class`, as in the
   * source. Adapter for the lot f1 primitive; see `scroll-edges.svelte.ts`.
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
