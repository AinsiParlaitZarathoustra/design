import { getContext, setContext } from "svelte";

/** What the command dialog root shares with its trigger and popup. */
export interface CommandDialogApi {
  readonly open: boolean;
  readonly titleId: string;
  readonly contentId: string;
  readonly trigger: HTMLElement | null;
  setOpen: (next: boolean) => void;
  /** A dismissal by Escape or a press outside, which the dialog may cancel first. */
  dismiss: (reason: "escape" | "outside") => void;
  setTrigger: (element: HTMLElement | null) => void;
}

const KEY = Symbol("atlas.command-dialog");

export function setCommandDialog(api: CommandDialogApi) {
  setContext(KEY, api);
}

export function getCommandDialog(): CommandDialogApi {
  const api = getContext<CommandDialogApi | null>(KEY);
  if (!api) throw new Error("CommandDialogPopup and its trigger must be used inside <CommandDialog>.");
  return api;
}

/** Lets a `CommandEmpty` inside a `CommandPanel` tell the panel it is empty. */
export interface PanelEmptyApi {
  setEmpty: (empty: boolean) => void;
}

const PANEL_KEY = Symbol("atlas.command-panel");

export function setPanelEmpty(api: PanelEmptyApi) {
  setContext(PANEL_KEY, api);
}

export function getPanelEmpty(): PanelEmptyApi | null {
  return getContext<PanelEmptyApi | null>(PANEL_KEY) ?? null;
}
