import { getContext, setContext } from "svelte";
import type { ToastManager } from "./toast-manager.svelte";
import type { ToastItem } from "./toast-types";

/**
 * The toast's shared state (port of Base UI's toast contexts): the stack a
 * viewport and its toasts read, and the one toast a content, a title, a
 * description, an action or a close belongs to.
 */

const MANAGER = Symbol("atlas.toast.manager");
const ITEM = Symbol("atlas.toast.item");

/**
 * The manager as a getter, so a provider that swaps its `toastManager` prop
 * hands the new stack down rather than the initial one.
 */
export interface ToastManagerRef {
  readonly current: ToastManager;
}

export function setToastManager(ref: ToastManagerRef) {
  setContext(MANAGER, ref);
}

export function getToastManager(): ToastManager {
  const ref = getContext<ToastManagerRef | undefined>(MANAGER);
  if (!ref) throw new Error("Toast parts must be used inside <ToastProvider>.");
  return ref.current;
}

/** One toast in its stack: its fields, its place, and the ids its parts point at. */
export interface ToastItemApi {
  readonly toast: ToastItem;
  /** Its place in the stack: 0 is the frontmost toast. */
  readonly index: number;
  readonly titleId: string;
  readonly descriptionId: string;
}

export function setToastItem(api: ToastItemApi) {
  setContext(ITEM, api);
}

export function getToastItem(): ToastItemApi {
  const api = getContext<ToastItemApi | undefined>(ITEM);
  if (!api) throw new Error("ToastContent and its parts must be used inside <Toast>.");
  return api;
}
