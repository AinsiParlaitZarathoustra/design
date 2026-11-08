<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * The layer cursors live in: the canvas's full size, ignoring the pointer,
   * hidden from assistive tech (presence is in the action pill). No z-index:
   * placed after the nodes in the DOM it paints above them, and below the
   * `z-panel` pills.
   */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div
  data-slot="presence-layer"
  aria-hidden="true"
  class={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
>
  {@render children?.()}
</div>
