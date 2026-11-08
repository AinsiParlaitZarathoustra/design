import { untrack } from "svelte";
import { stepHighlight } from "./command-list";

/**
 * The keyboard highlight over a list's selectable ids, ported from
 * `useListHighlight`. `active` is the tracked id while it is still listed, else the
 * first one, so a filter that drops the highlighted row lands on the top rather
 * than on nothing. A change of `resetKey` (the query) starts again at the top.
 * `pointTo` is for pointer movement: it highlights only when the pointer really
 * moved, so a list scrolling under a resting mouse never steals the highlight from
 * the keys.
 */
export function createListHighlight(
  ids: () => ReadonlyArray<string>,
  resetKey: () => unknown,
) {
  let tracked = $state<string | null>(null);
  const active = $derived(
    tracked !== null && ids().includes(tracked) ? tracked : (ids()[0] ?? null),
  );

  let lastKey: unknown = untrack(resetKey);
  let lastPointer: { x: number; y: number } | null = null;

  $effect.pre(() => {
    const key = resetKey();
    if (Object.is(lastKey, key)) return;
    lastKey = key;
    tracked = null;
  });

  return {
    get active() {
      return active;
    },
    setActive(id: string | null) {
      tracked = id;
    },
    /** Moves the highlight and returns where it landed. */
    step(direction: 1 | -1) {
      const next = stepHighlight(ids(), active, direction);
      tracked = next;
      return next;
    },
    /** Highlights `id` when the pointer really moved to (x, y). */
    pointTo(id: string, x: number, y: number) {
      const last = lastPointer;
      lastPointer = { x, y };
      if (last && last.x === x && last.y === y) return;
      // A disabled row is not selectable: pointing at it leaves the highlight.
      if (id !== active && ids().includes(id)) tracked = id;
    },
  };
}
