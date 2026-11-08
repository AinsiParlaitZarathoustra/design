import { getContext, setContext } from "svelte";

/**
 * What a menu shares with its rows: how to close the menu they sit in, as Base
 * UI's rows do when one is chosen.
 */
export interface MenuApi {
  close: () => void;
}

const MENU_KEY = Symbol("atlas.split-button-menu");

export function setMenu(api: MenuApi) {
  setContext(MENU_KEY, api);
}

export function getMenu(): MenuApi {
  const api = getContext<MenuApi | null>(MENU_KEY);
  if (!api) throw new Error("Menu rows must be used inside a menu.");
  return api;
}
