"use client";

import { MousePointer2Icon } from "lucide-react";
import type { CSSProperties, ReactNode, Ref } from "react";
import { PEER_INK } from "../../lib/actor-hue.ts";
import type { LabelTone } from "../../lib/types.ts";
import { cn } from "../../lib/utils.ts";

/**
 * A collaborator's cursor: the arrow in their hue, and their first name on a
 * label of the same hue.
 *
 * Static on purpose. A peer's position arrives at the network's rate, and
 * each app eases it toward the newest target in its own animation-frame
 * loop, writing `style.transform` straight onto this element through `ref`:
 * no React render per frame. The root sits at the layer's origin
 * (`left-0 top-0`), so a `translate3d(x, y, 0)` is the whole position.
 */
export function PresenceCursor({
  name,
  hue,
  ref,
  style,
  className,
}: {
  name: string;
  hue: LabelTone;
  ref?: Ref<HTMLDivElement>;
  style?: CSSProperties;
  className?: string;
}) {
  const first = name.trim().split(/\s+/)[0] || name;
  return (
    <div
      ref={ref}
      data-slot="presence-cursor"
      className={cn("pointer-events-none absolute top-0 left-0", className)}
      style={style}
    >
      <MousePointer2Icon
        aria-hidden="true"
        className={cn("size-4", PEER_INK[hue].text)}
        fill="currentColor"
        strokeWidth={1.5}
      />
      <span
        className={cn(
          "mt-0.5 ml-3 block max-w-36 truncate rounded-full px-1.5 py-0.5",
          "text-3xs leading-none font-medium text-background",
          PEER_INK[hue].bg,
        )}
      >
        {first}
      </span>
    </div>
  );
}

/**
 * The layer cursors live in: the canvas's full size, ignoring the pointer,
 * hidden from assistive tech (presence is in the action pill). No z-index:
 * placed after the nodes in the DOM it paints above them, and below the
 * `z-panel` pills.
 */
export function PresenceLayer({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="presence-layer"
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {children}
    </div>
  );
}
