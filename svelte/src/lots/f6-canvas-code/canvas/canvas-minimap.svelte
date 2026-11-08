<script lang="ts">
  import { cn } from "../../../lib/utils";
  import { CANVAS_GLASS } from "./canvas-chrome";
  import type { CanvasBounds } from "./types";

  /** Room around the content, as a share of its larger side. */
  const PAD = 0.08;

  function union(boxes: CanvasBounds[]): CanvasBounds {
    const x = Math.min(...boxes.map((b) => b.x));
    const y = Math.min(...boxes.map((b) => b.y));
    const right = Math.max(...boxes.map((b) => b.x + b.w));
    const bottom = Math.max(...boxes.map((b) => b.y + b.h));
    return { x, y, w: right - x, h: bottom - y };
  }

  /**
   * The whole canvas in a corner: every node as a block, the viewport as a
   * frame, fitted to the union of both. With `onNavigate` it is a button: a
   * click reports the canvas point under the pointer, in canvas px, for the
   * app to centre on, and Enter or Space (which have no point) report the
   * centre of the nodes, which brings the content back into view.
   */
  interface Props {
    nodes: CanvasBounds[];
    viewport: CanvasBounds;
    onNavigate?: (point: { x: number; y: number }) => void;
    class?: string;
  }

  let { nodes, viewport, onNavigate, class: className }: Props = $props();

  const all = $derived(union([...nodes, viewport]));
  const pad = $derived(Math.max(all.w, all.h) * PAD);
  const viewBox = $derived(
    `${all.x - pad} ${all.y - pad} ${all.w + pad * 2} ${all.h + pad * 2}`,
  );

  function navigate(e: MouseEvent & { currentTarget: HTMLButtonElement }) {
    if (!onNavigate) return;
    // A keyboard press has no pointer position: go to the content.
    if (e.detail === 0) {
      const content = nodes.length > 0 ? union(nodes) : viewport;
      onNavigate({ x: content.x + content.w / 2, y: content.y + content.h / 2 });
      return;
    }
    const svg = e.currentTarget.querySelector("svg");
    const matrix = svg?.getScreenCTM();
    if (!svg || !matrix) return;
    const point = new DOMPoint(e.clientX, e.clientY).matrixTransform(matrix.inverse());
    onNavigate({ x: point.x, y: point.y });
  }

  const frame = $derived(
    cn("absolute right-3 bottom-3 z-panel overflow-hidden p-1", CANVAS_GLASS, className),
  );
</script>

{#snippet map()}
  <svg viewBox={viewBox} width={160} height={112} aria-hidden="true" class="block">
    {#each nodes as n, i (i)}
      <rect
        x={n.x}
        y={n.y}
        width={n.w}
        height={n.h}
        rx={Math.min(n.w, n.h) * 0.08}
        class="fill-muted-foreground/30"
      />
    {/each}
    <rect
      x={viewport.x}
      y={viewport.y}
      width={viewport.w}
      height={viewport.h}
      class="fill-foreground/5 stroke-foreground/40"
      stroke-width={1}
      vector-effect="non-scaling-stroke"
    />
  </svg>
{/snippet}

{#if onNavigate}
  <button
    type="button"
    data-slot="canvas-minimap"
    aria-label="Minimap"
    onclick={navigate}
    class={cn(frame, "cursor-pointer")}
  >
    {@render map()}
  </button>
{:else}
  <div data-slot="canvas-minimap" role="img" aria-label="Minimap" class={frame}>
    {@render map()}
  </div>
{/if}
