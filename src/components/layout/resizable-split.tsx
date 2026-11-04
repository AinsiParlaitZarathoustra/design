"use client";

import { createContext, useContext } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import type { Layout } from "react-resizable-panels";
import { cn } from "../../lib/utils.ts";

/**
 * Split panes, on react-resizable-panels v4 (`Group / Panel / Separator`),
 * side by side or stacked:
 *
 *   <ResizableSplit id="editor" orientation="vertical" onLayoutCommit={save}>
 *     <ResizablePane id="code" minSize="20">…</ResizablePane>
 *     <ResizableHandle />
 *     <ResizablePane id="terminal" defaultSize="30">…</ResizablePane>
 *   </ResizableSplit>
 *
 * The split keeps nothing. Where a layout is remembered (desktop's store, a
 * cookie, nowhere) is the app's business: it passes the saved layout back as
 * `defaultLayout` and hears about a new one through `onLayoutCommit`, which
 * fires once per drag, when the drag ends, and only for a drag. A layout
 * the library settled on by itself (a pane mounting, the window resizing)
 * is not the person's choice and is not reported.
 *
 * Sizes: v4 reads a bare number as pixels and a string as a percentage, so
 * `minSize="15"` is 15% and `minSize={15}` is 15px.
 *
 * The handle is a 1px rule, not a grab bar. A visible gutter between two panes
 * costs space permanently to advertise an interaction that happens once a
 * week; the hit area is widened invisibly with `after:` instead, so the line
 * stays 1px and the target stays ~10px. It lights in the primary colour
 * while hovered or dragged, as desktop's splits do.
 */

export type ResizableOrientation = "horizontal" | "vertical";

/** A split's sizes, keyed by pane id, in percent. */
export type ResizableLayout = Layout;

const OrientationContext = createContext<ResizableOrientation>("horizontal");

function ResizableSplit({
  id,
  orientation = "horizontal",
  defaultLayout,
  onLayoutCommit,
  className,
  children,
  // Dropped: the commit gate below owns it, and a caller's would replace it.
  onLayoutChanged: _onLayoutChanged,
  ...props
}: Omit<React.ComponentProps<typeof Group>, "id" | "orientation" | "defaultLayout"> & {
  /** Required: v4 matches a saved layout to its group by id. */
  id: string;
  /** `horizontal` lays the panes out side by side; `vertical` stacks them. */
  orientation?: ResizableOrientation;
  defaultLayout?: ResizableLayout;
  /** The layout after the person finished dragging a handle. */
  onLayoutCommit?: (layout: ResizableLayout) => void;
  /** Not used: pass `onLayoutCommit`. */
  onLayoutChanged?: never;
}) {
  return (
    <OrientationContext.Provider value={orientation}>
      <Group
        id={id}
        data-slot="resizable-split"
        orientation={orientation}
        defaultLayout={defaultLayout}
        onLayoutChanged={(layout, meta) => {
          if (meta?.isUserInteraction) onLayoutCommit?.(layout);
        }}
        className={cn("flex h-full w-full", className)}
        {...props}
      >
        {children}
      </Group>
    </OrientationContext.Provider>
  );
}

/**
 * One pane. Every `Panel` prop passes through, including `panelRef`, so a
 * pane that must stay mounted while hidden is collapsed and expanded through
 * its imperative handle rather than unmounted.
 */
function ResizablePane({
  id,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Panel>, "id"> & {
  /** Required: the layout is keyed by pane id. */
  id: string;
}) {
  return (
    <Panel
      id={id}
      data-slot="resizable-pane"
      className={cn("min-h-0 min-w-0", className)}
      {...props}
    />
  );
}

function ResizableHandle({
  hidden = false,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Separator>, "hidden"> & {
  /**
   * Inert and invisible, but still mounted: a split whose pane is collapsed
   * keeps its handle in the tree, so expanding the pane again needs no
   * remount (and the layout keeps its shape).
   */
  hidden?: boolean;
}) {
  const orientation = useContext(OrientationContext);
  const horizontal = orientation === "horizontal";
  return (
    <Separator
      data-slot="resizable-handle"
      data-orientation={orientation}
      className={cn(
        "relative shrink-0 bg-border",
        "transition-colors duration-fast ease-out-strong",
        "hover:bg-primary data-[separator=active]:bg-primary",
        // The invisible ~10px target around the 1px line, across its axis.
        "after:absolute after:content-['']",
        horizontal
          ? "w-px cursor-col-resize after:inset-y-0 after:-left-1 after:w-2.5"
          : "h-px cursor-row-resize after:inset-x-0 after:-top-1 after:h-2.5",
        hidden && "pointer-events-none invisible",
        className,
      )}
      {...props}
    />
  );
}

export { ResizableHandle, ResizablePane, ResizableSplit };
