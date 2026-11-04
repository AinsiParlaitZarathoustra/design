"use client";

import { SparklesIcon, UserIcon } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "../../lib/utils.ts";
import { Icon } from "../../ui/icon.tsx";
import { Callout } from "../ui/callout.tsx";
import { StatusIcon } from "../ui/status-icon.tsx";
import { statusIconOf, useWindow } from "./session-view-helpers.ts";
import type { SessionPhase, SessionView, TurnView } from "./session-view.ts";
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
 *
 * Every other prop goes to each `TurnRow`. A turn holding a call in
 * `openToolCallIds` or `openToolRunIds`, or the item `revealItemId` names, is
 * drawn even past the window, so the host can scroll to it (a comment link
 * into turn 300).
 */

export interface SessionTimelineProps extends Pick<
  TurnRowProps,
  | "commentSlot"
  | "renderMarkdown"
  | "rehypePlugins"
  | "onLoadPayload"
  | "renderDiff"
  | "errorAction"
  | "renderItemFooter"
  | "renderCheckpointFooter"
  | "clampResponses"
  | "toolRunSummary"
  | "openToolCallIds"
  | "onOpenToolCallIdsChange"
  | "thinkingLabel"
  | "thinkingBody"
  | "onOpenAttachment"
  | "onCopyPayload"
  | "onLoadBody"
  | "openToolRunIds"
  | "onOpenToolRunIdsChange"
> {
  session: SessionView;
  /**
   * An item to keep drawn, by id: a prompt, an answer, a thought, a plan, a
   * tool call or a checkpoint. Its turn is drawn even past the window, a call
   * past its run's window is drawn, and a folded run holding it unfolds
   * (unless `openToolRunIds` is set, when the host decides). For a deep link:
   * set it, then scroll to the item. Like a held call, the reach it adds stays
   * once the id changes or clears.
   */
  revealItemId?: string;
  /**
   * The head: the phase ("Session complete"), the title and the agent line.
   * `false` for a host that draws its own title above the timeline; the rail
   * then starts at the first turn, and a session error still shows, as an
   * alert above it.
   */
  heading?: boolean;
  /**
   * The agent's mark, in the rail node of a turn the agent started on its own,
   * in place of the sparkle: desktop's session-detail rail, where the agent's
   * glyph identifies its turns. Pass a 16px glyph (`ModelMark`, a brand mark).
   */
  agentMark?: ReactNode;
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
  revealItemId,
  heading = true,
  agentMark,
  className,
  ...rowProps
}: SessionTimelineProps) {
  const { turns, meta } = session;
  const {
    start: windowStart,
    end: windowEnd,
    sentinelRef,
  } = useWindow({
    count: turns.length,
    grow,
  });
  const { openToolCallIds, openToolRunIds } = rowProps;
  const held = useMemo(
    () => heldTurns(turns, [openToolCallIds, openToolRunIds], revealItemId),
    [turns, openToolCallIds, openToolRunIds, revealItemId],
  );
  // Only the turn holding it hears the id, so a new jump re-renders the turn
  // that held it and the one that does now, not every row.
  const revealKey = useMemo(
    () =>
      revealItemId === undefined ? undefined : turns.find((t) => turnHolds(t, revealItemId))?.key,
    [turns, revealItemId],
  );
  // Only ever widens: closing a held card must not unmount the turn under the
  // reader. A list that shrank past it (another session) starts over.
  const [reach, setReach] = useState(held);
  const stale = reach !== null && reach.last >= turns.length;
  if (held && (stale || !reach || held.first < reach.first || held.last > reach.last)) {
    setReach(
      stale || !reach
        ? held
        : { first: Math.min(reach.first, held.first), last: Math.max(reach.last, held.last) },
    );
  } else if (!held && stale) {
    setReach(null);
  }
  const start = reach && !stale ? Math.min(windowStart, reach.first) : windowStart;
  const end = reach && !stale ? Math.max(windowEnd, reach.last + 1) : windowEnd;
  // Decided once: the rows on screen at mount. Never the ones a window adds.
  const [entering] = useState(() => {
    const first = grow === "up" ? turns.slice(-ENTRANCE_ROWS) : turns.slice(0, ENTRANCE_ROWS);
    return new Set(first.map((t) => t.key));
  });
  const visible = turns.slice(start, end);
  const firstKey = turns[0]?.key;
  const lastKey = turns[turns.length - 1]?.key;
  const details = [meta.agent, meta.model, meta.branch].filter(Boolean);

  return (
    <div data-slot="session-timeline" className={cn("min-w-0", className)}>
      {!heading && session.error && (
        <Callout tone="error" role="alert" className="mb-4">
          {session.error.message}
        </Callout>
      )}
      {heading && (
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
      )}

      {grow === "up" && start > 0 && <div ref={sentinelRef} aria-hidden className="h-px" />}
      {visible.map((turn, i) => (
        <div
          key={turn.key}
          className={cn(entering.has(turn.key) && "session-row-in")}
          style={
            entering.has(turn.key) ? { animationDelay: `${Math.min(i, 8) * 30}ms` } : undefined
          }
        >
          <Rail
            first={!heading && turn.key === firstKey}
            last={turn.key === lastKey}
            node={<TurnNode agent={!turn.user} agentMark={agentMark} />}
          >
            <TurnRow
              turn={turn}
              streaming={turn.key === lastKey ? session.streaming : undefined}
              revealItemId={turn.key === revealKey ? revealItemId : undefined}
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

/** Does the turn hold the item with this id: its prompt, an agent item or a checkpoint? */
function turnHolds(turn: TurnView, id: string): boolean {
  return (
    turn.user?.id === id ||
    turn.items.some((item) => (item.kind === "tool" ? item.call.id : item.id) === id) ||
    (turn.checkpoints?.some((c) => c.id === id) ?? false)
  );
}

/** The first and last turn holding a call in any of `sets`, or the item `reveal`, or `null`. */
function heldTurns(
  turns: SessionView["turns"],
  sets: (ReadonlySet<string> | undefined)[],
  reveal: string | undefined,
): { first: number; last: number } | null {
  const live = sets.filter((s): s is ReadonlySet<string> => s !== undefined && s.size > 0);
  if (live.length === 0 && reveal === undefined) return null;
  let first = -1;
  let last = -1;
  turns.forEach((turn, i) => {
    const holds =
      (reveal !== undefined && turnHolds(turn, reveal)) ||
      turn.items.some((item) => item.kind === "tool" && live.some((s) => s.has(item.call.id)));
    if (!holds) return;
    if (first < 0) first = i;
    last = i;
  });
  return first < 0 ? null : { first, last };
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
function TurnNode({ agent, agentMark }: { agent: boolean; agentMark?: ReactNode }) {
  return (
    <span className={cn(NODE, "border-border-strong/50 text-secondary-foreground")}>
      {agent && drawn(agentMark) ? (
        agentMark
      ) : (
        <Icon icon={agent ? SparklesIcon : UserIcon} size="md" />
      )}
    </span>
  );
}

/** A slot holds something to draw: not `undefined`, `null` or a boolean (`cond && <Mark />`). */
function drawn(node: ReactNode): boolean {
  return node != null && typeof node !== "boolean";
}
