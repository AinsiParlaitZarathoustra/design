// `useListHighlight`, ported from `components/patterns/command-list.ts`. The React
// hook takes the ids and the reset key as values. A Svelte hook has to read them
// when it needs them, so both are getters here. The returned object is the one
// `createListHighlight` builds: `active`, `setActive`, `step` and `pointTo`.

import { createListHighlight } from "../f2-overlays-menus/list-highlight.svelte";

export function useListHighlight(
  ids: () => ReadonlyArray<string>,
  resetKey: () => unknown = () => undefined,
) {
  return createListHighlight(ids, resetKey);
}
