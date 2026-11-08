import { getContext, setContext } from "svelte";

/** What the tooltip root shares with its trigger and content. */
export interface TooltipApi {
  readonly open: boolean;
  /** True when this tooltip opened straight after another: no entrance, no exit. */
  readonly instant: boolean;
  readonly contentId: string;
  readonly anchor: HTMLElement | null;
  setAnchor: (element: HTMLElement) => void;
  requestOpen: () => void;
  requestClose: () => void;
  /** Drop an open that is still waiting out the delay. */
  cancelPending: () => void;
}

const KEY = Symbol("atlas.tooltip");

export function setTooltip(api: TooltipApi) {
  setContext(KEY, api);
}

export function getTooltip(): TooltipApi {
  const api = getContext<TooltipApi | null>(KEY);
  if (!api) throw new Error("Tooltip parts must be used inside <Tooltip>.");
  return api;
}

/** True when the element matches `:focus-visible`; engines without it count every focus. */
export function isFocusVisible(element: EventTarget | null): boolean {
  try {
    return element instanceof Element && element.matches(":focus-visible");
  } catch {
    return true;
  }
}
