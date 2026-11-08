<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { CANVAS_FIELD_CLASS } from "./canvas-nodes-shared";
  import type { CanvasShapeKind } from "./types";

  /**
   * A shape in a 100×100 box stretched to the node. The stroke does not scale
   * with the stretch or the zoom, so a wide rectangle and a tall one have the
   * same edge.
   */
  interface Props {
    shape: CanvasShapeKind;
    /** A string, or a snippet for the app's editor (`CANVAS_FIELD_CLASS.shapeLabel`). */
    label?: string | Snippet;
    /** Outside a `CanvasNodeFrame`; inside one, the frame's selection applies. */
    selected?: boolean;
    class?: string;
  }

  let { shape, label, selected = false, class: className }: Props = $props();

  const paint = $derived(
    cn(
      "fill-card/70 stroke-border-strong transition-[stroke] duration-fast",
      "group-data-selected/node:stroke-primary",
      selected && "stroke-primary",
    ),
  );
</script>

<div data-slot="canvas-shape" class={cn("relative size-full", className)}>
  <svg
    aria-hidden="true"
    class="absolute inset-0 size-full overflow-visible"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {#if shape === "ellipse"}
      <ellipse cx={50} cy={50} rx={49} ry={49} class={paint} stroke-width={1.5} vector-effect="non-scaling-stroke" />
    {:else if shape === "diamond"}
      <polygon points="50,1 99,50 50,99 1,50" class={paint} stroke-width={1.5} vector-effect="non-scaling-stroke" />
    {:else if shape === "triangle"}
      <polygon points="50,1 99,99 1,99" class={paint} stroke-width={1.5} vector-effect="non-scaling-stroke" />
    {:else}
      <rect
        x={1}
        y={1}
        width={98}
        height={98}
        rx={shape === "rounded" ? 14 : 0}
        class={paint}
        stroke-width={1.5}
        vector-effect="non-scaling-stroke"
      />
    {/if}
  </svg>
  {#if label !== undefined}
    <div class="absolute inset-0 flex items-center justify-center p-3">
      {#if typeof label === "string"}
        <span class={cn(CANVAS_FIELD_CLASS.shapeLabel, "line-clamp-3 break-words")}>{label}</span>
      {:else}
        {@render label()}
      {/if}
    </div>
  {/if}
</div>
