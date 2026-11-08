import { getContext, setContext } from "svelte";

/** What a `ToggleGroupItem` reaches for in its `ToggleGroup`. */
export interface ToggleGroupApi {
  readonly variant: "default" | "outline" | undefined;
  readonly size: "sm" | "default" | "lg" | undefined;
  readonly spacing: number;
  readonly orientation: "horizontal" | "vertical";
  readonly disabled: boolean;
  /** The one item in the tab order (roving focus); the others are `tabindex="-1"`. */
  readonly tabStop: HTMLElement | null;
  setTabStop: (element: HTMLElement | null) => void;
  isPressed: (value: string) => boolean;
  toggle: (value: string) => void;
}

const KEY = Symbol("toggle-group");

export function setToggleGroup(api: ToggleGroupApi) {
  setContext(KEY, api);
}

export function getToggleGroup(): ToggleGroupApi | undefined {
  return getContext<ToggleGroupApi | undefined>(KEY);
}
