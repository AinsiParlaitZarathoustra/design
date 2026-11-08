<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { PEER_INK } from "../../../lib/actor-hue";
  import type { LabelTone } from "../../../lib/types";
  import { cn } from "../../../lib/utils";
  import { CANVAS_ANCHOR_AT, CANVAS_ANCHORS, CANVAS_NODE_RADIUS } from "./canvas-nodes-shared";
  import type { CanvasAnchor, CanvasBounds, CanvasNodeKind } from "./types";

  /**
   * The box a node is drawn in. `claimedBy` is a colleague who has it selected:
   * outlined in their hue while it is not yours. Anchors and the resize handle
   * show only when it is selected and the app gives the handler.
   *
   * Inside an xyflow node renderer the frame is `size-full` and xyflow positions
   * it; on a hand-rolled canvas pass `bounds`.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "style" | "children"> {
    kind: CanvasNodeKind;
    bounds?: CanvasBounds;
    selected?: boolean;
    claimedBy?: { hue: LabelTone; name: string } | null;
    anchors?: CanvasAnchor[];
    onAnchorPointerDown?: (anchor: CanvasAnchor, e: PointerEvent) => void;
    onResizePointerDown?: (e: PointerEvent) => void;
    class?: string;
    style?: string;
    children?: Snippet;
  }

  let {
    kind,
    bounds,
    selected = false,
    claimedBy = null,
    anchors = CANVAS_ANCHORS,
    onAnchorPointerDown,
    onResizePointerDown,
    class: className,
    style,
    children,
    ...rest
  }: Props = $props();

  const claimed = $derived(!selected && claimedBy);

  const boxStyle = $derived(
    bounds
      ? `left: ${bounds.x}px; top: ${bounds.y}px; width: ${bounds.w}px; height: ${bounds.h}px; ${style ?? ""}`
      : (style ?? ""),
  );
</script>

<div
  data-slot="canvas-node"
  data-kind={kind}
  data-selected={selected || undefined}
  data-claimed-by={claimed && claimedBy ? claimedBy.name : undefined}
  class={cn(
    "group/node",
    bounds ? "absolute" : "relative size-full",
    CANVAS_NODE_RADIUS[kind],
    claimed && claimedBy && cn("outline-2 outline-offset-4", PEER_INK[claimedBy.hue].outline),
    className,
  )}
  style={boxStyle}
  {...rest}
>
  {@render children?.()}
  {#if selected && onAnchorPointerDown}
    {#each anchors as a (a)}
      <div
        role="presentation"
        data-anchor={a}
        onpointerdown={(e) => onAnchorPointerDown(a, e)}
        class={cn(
          "absolute size-3 cursor-crosshair rounded-full border border-background bg-primary",
          "transition-transform duration-fast ease-out-strong hover:scale-125",
          CANVAS_ANCHOR_AT[a],
        )}
      ></div>
    {/each}
  {/if}
  {#if selected && onResizePointerDown}
    <div
      role="presentation"
      data-slot="canvas-resize-handle"
      onpointerdown={onResizePointerDown}
      class="absolute -right-1 -bottom-1 size-2 cursor-nwse-resize rounded-sm border border-border-strong bg-primary"
    ></div>
  {/if}
</div>
