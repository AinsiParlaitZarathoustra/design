import type { SessionView, TurnView } from "./session-view";

/**
 * The pure parts of `session-timeline.svelte`, ported from the oracle's
 * `session-timeline.tsx`: which turns hold a held call or a revealed item.
 */

/** Does the turn hold the item with this id: its prompt, an agent item or a checkpoint? */
export function turnHolds(turn: TurnView, id: string): boolean {
  return (
    turn.user?.id === id ||
    turn.items.some((item) => (item.kind === "tool" ? item.call.id : item.id) === id) ||
    (turn.checkpoints?.some((c) => c.id === id) ?? false)
  );
}

/** The first and last turn holding a call in any of `sets`, or the item `reveal`, or `null`. */
export function heldTurns(
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
