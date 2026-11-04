import type { CSSProperties, ReactNode } from "react";

import { cn } from "../../lib/utils.ts";

/**
 * The session timeline's rail, for any history drawn the same way (desktop's
 * Memory activity): a hairline down a 32px gutter, a round node per row, the
 * row's content 14px to its right.
 *
 * `first` and `last` stop the hairline at the end nodes' centres, so it runs
 * from node to node rather than off the top and bottom of the list. The node
 * is the caller's; `RailNode` is the timeline's round one, opaque so the
 * hairline behind it does not cross the glyph.
 */

/** Centre of a node from the top of its row: the hairline starts and stops there. */
const RAIL_NODE_CENTRE = 16;

interface RailProps {
  /** What hangs in the gutter: a `RailNode`, a face, a status glyph. 32px across. */
  node: ReactNode;
  /** The first row: the hairline starts at its node. */
  first?: boolean;
  /** The last row: the hairline stops at its node. */
  last?: boolean;
  className?: string;
  style?: CSSProperties;
  /** The content column's classes; its `pb-4` is the space between rows. */
  contentClassName?: string;
  children: ReactNode;
}

/** One row on the rail: its node in the gutter and its slice of the hairline, half-height at the ends. */
function Rail({
  node,
  first = false,
  last = false,
  className,
  style,
  contentClassName,
  children,
}: RailProps) {
  return (
    <div className={cn("grid grid-cols-[32px_minmax(0,1fr)] gap-3.5", className)} style={style}>
      <div className="relative flex justify-center">
        <span
          aria-hidden
          className="absolute left-1/2 -ml-px w-px bg-border-subtle"
          style={{
            top: first ? RAIL_NODE_CENTRE : 0,
            bottom: last ? `calc(100% - ${RAIL_NODE_CENTRE}px)` : 0,
          }}
        />
        {node}
      </div>
      <div className={cn("min-w-0 pb-4", contentClassName)}>{children}</div>
    </div>
  );
}

/** The round node a row hangs from: 32px, a quiet border, opaque over the hairline. */
function RailNode({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      data-slot="rail-node"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full border bg-card",
        "border-border-strong/50 text-secondary-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export { Rail, RailNode };
export type { RailProps };
