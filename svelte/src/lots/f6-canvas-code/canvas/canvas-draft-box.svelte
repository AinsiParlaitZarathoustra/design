<script lang="ts">
  import { cn } from "../../../lib/utils";
  import type { CanvasBounds } from "./types";

  /** The box a tool draws while it is being dragged out, in canvas px. */
  interface Props {
    bounds: CanvasBounds;
    class?: string;
  }

  let { bounds, class: className }: Props = $props();
</script>

<div
  data-slot="canvas-draft-box"
  aria-hidden="true"
  class={cn(
    "pointer-events-none absolute rounded-sm border border-primary bg-primary/10",
    className,
  )}
  style="left: {bounds.x}px; top: {bounds.y}px; width: {bounds.w}px; height: {bounds.h}px;"
></div>
