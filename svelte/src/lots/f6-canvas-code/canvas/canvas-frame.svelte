<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { CANVAS_FIELD_CLASS } from "./canvas-nodes-shared";

  /** A titled frame: a dashed region with its label above the top-left corner. */
  interface Props {
    label?: string | Snippet;
    class?: string;
  }

  let { label, class: className }: Props = $props();
</script>

<div
  data-slot="canvas-frame"
  class={cn(
    "relative size-full rounded-xl border-2 border-dashed border-border-subtle bg-element-hover transition-colors duration-fast",
    "group-data-selected/node:border-primary/50",
    className,
  )}
>
  <div class="absolute -top-6 left-1 max-w-full">
    {#if typeof label === "string" || label === undefined}
      <span class={cn(CANVAS_FIELD_CLASS.frameLabel, "block truncate")}>{label || "Frame"}</span>
    {:else}
      {@render label()}
    {/if}
  </div>
</div>
