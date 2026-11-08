import { getContext, setContext } from "svelte";

/** What the alert dialog root shares with its trigger, portal, popup and parts. */
export interface AlertDialogApi {
  readonly open: boolean;
  readonly mounted: boolean;
  readonly ending: boolean;
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

const KEY = Symbol("atlas.alert-dialog");

export function setAlertDialog(api: AlertDialogApi) {
  setContext(KEY, api);
}

export function getAlertDialog(): AlertDialogApi {
  const api = getContext<AlertDialogApi | null>(KEY);
  if (!api) throw new Error("Alert dialog parts must be used inside <AlertDialog>.");
  return api;
}
