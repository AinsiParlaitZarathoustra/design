import { getContext, setContext } from "svelte";

export type DialogPhase = "closed" | "opening" | "open" | "closing";

export interface DialogApi {
  readonly baseId: string;
  readonly titleId: string;
  readonly descriptionId: string;
  visible: boolean;
  phase: DialogPhase;
  hasTitle: boolean;
  hasDescription: boolean;
  /** The element focused when the dialog opened; focus returns to it. */
  previousFocus: Element | null;
  open: () => void;
  requestClose: () => void;
  finishClose: () => void;
  registerTitle: () => void;
  registerDescription: () => void;
}

const KEY = Symbol("atlas.dialog");

export function setDialog(api: DialogApi) {
  setContext(KEY, api);
}

export function getDialog(): DialogApi {
  const api = getContext<DialogApi | null>(KEY);
  if (!api) throw new Error("Dialog parts must be used inside <Dialog>.");
  return api;
}
