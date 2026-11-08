import { getContext, setContext } from "svelte";

/** One control in a group: its label, and the element that is measured and hovered. */
export interface HintGroupItem {
  label: string;
  el: HTMLElement | null;
}

/** What a `HintItem` reaches for in its `HintGroup`. Ported from `GroupApi`. */
export interface HintGroupApi {
  register: (id: string, item: HintGroupItem) => void;
  unregister: (id: string) => void;
  enter: (id: string) => void;
  leave: () => void;
  hide: () => void;
}

const KEY = Symbol("hint-group");

export function setHintGroup(api: HintGroupApi) {
  setContext(KEY, api);
}

export function getHintGroup(): HintGroupApi | undefined {
  return getContext<HintGroupApi | undefined>(KEY);
}
