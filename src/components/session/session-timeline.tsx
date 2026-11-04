"use client";

import { SparklesIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

import { cn } from "../../lib/utils.ts";
import { Icon } from "../../ui/icon.tsx";
import { Callout } from "../ui/callout.tsx";
import { StatusIcon } from "../ui/status-icon.tsx";
import { statusIconOf, useWindow } from "./session-view-helpers.ts";
import type { SessionPhase, SessionView } from "./session-view.ts";
import { TurnRow } from "./turn-row.tsx";
import type { TurnRowProps } from "./turn-row.tsx";

/**
 * A whole session, read top to bottom: a head that says where it stands, then
 * every turn on a thin rail in the gutter. Desktop's session timeline: the
 * rail is a hairline with a node per turn, so the shape of the session scans
 * without reading a word and the prose keeps the column.
 *
 * Long sessions are windowed, not virtualised (`useWindow`): real DOM rows,
 * grown as the reader nears the edge, so a fast flick never shows blank space.
 * `grow="up"` is for a live session read newest-first, which opens at the
 * bottom and grows upward without moving what the reader is looking at.
 *
 * Only the first rows on screen fade in, once, as a CSS animation (it plays
 * while the app is busy loading the session, where a JS-driven one would drop
 * frames) and not at all under reduced motion. A row the window adds while
 * the reader scrolls is already where they are looking and appears as it is.
 */

export interface SessionTimelineProps extends Pick<
  TurnRowProps,
  | "commentSlot"
  | "renderMarkdown"
  | "rehypePlugins"
  | "onLoadPayload"
  | "renderDiff"
  | "errorAction"
> {
  session: SessionView;
  /** `down` (the default) for a record read from the top; `up` for a live session. */
  grow?: "down" | "up";
  className?: string;
}

const HEADING: Record<SessionPhase, string> = {
  queued: "Session queued",
  running: "Session running",
  waiting: "Waiting for you",
  done: "Session complete",
  failed: "Session failed",
  cancelled: "Session cancelled",
};

/** Rows that fade in on first render. */
const ENTRANCE_ROWS = 20;
/** Centre of a node from the top of its row: the rail starts and stops there. */
const NODE_CENTRE = 16;

export function SessionTimeline({
  session,
  grow = "down",
  className,
  ...rowProps
}: SessionTimelineProps) {
  const { turns, meta } = session;
  const { start, end, sentinelRef } = useWindow({ count: turns.length, grow });
  // Decided once: the rows on screen at mount. Never the ones a window adds.
  const [entering] = useState(() => {
    const first = grow === "up" ? turns.slice(-ENTRANCE_ROWS) : turns.slice(0, ENTRANCE_ROWS);
    return new Set(first.map((t) => t.key));
  });
  const visible = turns.slice(start, end);
  const lastKey = turns[turns.length - 1]?.key;
  const details = [meta.agent, meta.model, meta.branch].filter(Boolean);

  return (
    <div data-slot="session-timeline" className={cn("min-w-0", className)}>
      <Rail first last={turns.length === 0} node={<HeadNode phase={session.phase} />}>
        <div className="flex min-h-8 flex-col justify-center pb-6">
          <span className="text-base font-medium text-foreground">{HEADING[session.phase]}</span>
          {meta.title && (
            <span className="mt-0.5 text-sm text-secondary-foreground">{meta.title}</span>
          )}
          {details.length > 0 && (
            <span className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
              {details.join(" · ")}
            </span>
          )}
          {session.error && (
            <Callout tone="error" role="alert" className="mt-3">
              {session.error.message}
            </Callout>
          )}
        </div>
      </Rail>

      {grow === "up" && start > 0 && <div ref={sentinelRef} aria-hidden className="h-px" />}
      {visible.map((turn, i) => (
        <div
          key={turn.key}
          className={cn(entering.has(turn.key) && "session-row-in")}
          style={
            entering.has(turn.key) ? { animationDelay: `${Math.min(i, 8) * 30}ms` } : undefined
          }
        >
          <Rail last={turn.key === lastKey} node={<TurnNode agent={!turn.user} />}>
            <TurnRow
              turn={turn}
              streaming={turn.key === lastKey ? session.streaming : undefined}
              {...rowProps}
            />
          </Rail>
        </div>
      ))}
      {grow === "down" && end < turns.length && (
        <div ref={sentinelRef} aria-hidden className="h-px" />
      )}
    </div>
  );
}

/** A node in the gutter and its slice of the hairline, half-height at the ends. */
function Rail({
  node,
  first = false,
  last = false,
  children,
}: {
  node: ReactNode;
  first?: boolean;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[32px_minmax(0,1fr)] gap-3.5">
      <div className="relative flex justify-center">
        <span
          aria-hidden
          className="absolute left-1/2 -ml-px w-px bg-border-subtle"
          style={{
            top: first ? NODE_CENTRE : 0,
            bottom: last ? `calc(100% - ${NODE_CENTRE}px)` : 0,
          }}
        />
        {node}
      </div>
      <div className="min-w-0 pb-4">{children}</div>
    </div>
  );
}

/** Opaque, so the hairline behind it does not cross the glyph. */
const NODE =
  "relative flex size-8 shrink-0 items-center justify-center rounded-full border bg-card";

function HeadNode({ phase }: { phase: SessionPhase }) {
  return (
    <span className={cn(NODE, "border-border-strong/50")}>
      <StatusIcon status={statusIconOf(phase)} />
    </span>
  );
}

/** The person's mark, or the agent's for a turn it started on its own. */
function TurnNode({ agent }: { agent: boolean }) {
  return (
    <span className={cn(NODE, "border-border-strong/50 text-secondary-foreground")}>
      <Icon icon={agent ? SparklesIcon : UserIcon} size="md" />
    </span>
  );
}
