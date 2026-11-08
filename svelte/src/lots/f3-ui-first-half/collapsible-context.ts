import { getContext, setContext } from "svelte";

// The collapsible's shared state (port of Base UI's `Collapsible` context): the
// open flag, the disabled flag, the toggle, and the id tying trigger to panel.

export interface CollapsibleState {
  readonly open: boolean;
  readonly disabled: boolean;
  readonly panelId: string;
  toggle: () => void;
}

const KEY = Symbol("atlas.collapsible");

export function setCollapsible(state: CollapsibleState) {
  setContext(KEY, state);
}

export function getCollapsible(): CollapsibleState {
  const state = getContext<CollapsibleState | undefined>(KEY);
  if (!state) throw new Error("CollapsibleTrigger and CollapsibleContent must be used inside <Collapsible>.");
  return state;
}
