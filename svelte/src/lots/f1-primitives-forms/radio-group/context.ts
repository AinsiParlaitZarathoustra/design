import { getContext, setContext } from "svelte";

/** What a `RadioGroupItem` reaches for in its `RadioGroup`. */
export interface RadioGroupApi {
  readonly value: string | undefined;
  readonly disabled: boolean;
  readonly name: string | undefined;
  select: (next: string) => void;
  /** Move the selection from `from` to the next (`step` 1) or previous (-1) item, wrapping. */
  step: (from: HTMLElement, step: 1 | -1) => void;
  /** The item that holds the tab stop when nothing is selected. */
  readonly firstItem: HTMLElement | null;
}

const KEY = Symbol("radio-group");

export function setRadioGroup(api: RadioGroupApi) {
  setContext(KEY, api);
}

export function getRadioGroup(): RadioGroupApi {
  const api = getContext<RadioGroupApi | undefined>(KEY);
  if (!api) throw new Error("RadioGroupItem must be placed inside a RadioGroup");
  return api;
}
