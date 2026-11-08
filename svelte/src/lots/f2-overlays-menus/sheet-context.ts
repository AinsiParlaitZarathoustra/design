import { getContext, setContext } from "svelte";

/** What the sheet root shares with its trigger, close, portal, panel and parts. */
export interface SheetApi {
  readonly open: boolean;
  readonly mounted: boolean;
  readonly ending: boolean;
  readonly starting: boolean;
  readonly contentId: string;
  readonly titleId: string;
  readonly descriptionId: string;
  readonly hasTitle: boolean;
  readonly hasDescription: boolean;
  readonly trigger: HTMLElement | null;
  setOpen: (next: boolean) => void;
  setTrigger: (element: HTMLElement | null) => void;
  setPopup: (element: HTMLElement | null) => void;
  registerTitle: (mounted: boolean) => void;
  registerDescription: (mounted: boolean) => void;
}

const KEY = Symbol("atlas.sheet");

export function setSheet(api: SheetApi) {
  setContext(KEY, api);
}

export function getSheet(): SheetApi {
  const api = getContext<SheetApi | null>(KEY);
  if (!api) throw new Error("Sheet parts must be used inside <Sheet>.");
  return api;
}
