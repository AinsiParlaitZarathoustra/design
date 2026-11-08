import { getContext, setContext } from "svelte";

/** What the popover root shares with its trigger, popup and parts. */
export interface PopoverApi {
  readonly open: boolean;
  readonly contentId: string;
  readonly titleId: string;
  readonly descriptionId: string;
  readonly hasTitle: boolean;
  readonly hasDescription: boolean;
  readonly trigger: HTMLElement | null;
  readonly popup: HTMLElement | null;
  setTrigger: (element: HTMLElement | null) => void;
  setPopup: (element: HTMLElement | null) => void;
  setOpen: (next: boolean) => void;
  registerTitle: (mounted: boolean) => void;
  registerDescription: (mounted: boolean) => void;
}

const KEY = Symbol("atlas.popover");

export function setPopover(api: PopoverApi) {
  setContext(KEY, api);
}

export function getPopover(): PopoverApi {
  const api = getContext<PopoverApi | null>(KEY);
  if (!api) throw new Error("Popover parts must be used inside <Popover>.");
  return api;
}
