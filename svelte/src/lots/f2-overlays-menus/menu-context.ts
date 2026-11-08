import { getContext, setContext } from "svelte";

/**
 * What a menu (the root, or a submenu) shares with its trigger, popup and rows.
 * A submenu sets its own context, so its rows and popup find the submenu; its
 * `closeAll` still closes every menu above it.
 */
export type InitialFocus = "popup" | "first" | "none";

export interface MenuApi {
  readonly open: boolean;
  readonly contentId: string;
  readonly trigger: HTMLElement | null;
  readonly popup: HTMLElement | null;
  /** True for a submenu: ArrowLeft closes it and returns focus to its trigger. */
  readonly isSub: boolean;
  /** How the popup takes focus on opening: the popup itself, its first row, or nothing (a hover). */
  readonly initialFocus: InitialFocus;
  setOpen: (next: boolean, initialFocus?: InitialFocus) => void;
  setTrigger: (element: HTMLElement | null) => void;
  setPopup: (element: HTMLElement | null) => void;
  /** Closes this menu and every menu it was opened from. */
  closeAll: () => void;
  /** Reports an open submenu, so the parent keeps its own dismissal off meanwhile. */
  registerSubmenu: (open: boolean) => void;
}

const MENU_KEY = Symbol("atlas.dropdown-menu");

export function setMenu(api: MenuApi) {
  setContext(MENU_KEY, api);
}

export function getMenu(): MenuApi {
  const api = getContext<MenuApi | null>(MENU_KEY);
  if (!api) throw new Error("Dropdown menu parts must be used inside <DropdownMenu>.");
  return api;
}

export interface MenuGroupApi {
  readonly labelId: string;
  setLabelMounted: (mounted: boolean) => void;
}

const GROUP_KEY = Symbol("atlas.dropdown-menu-group");

export function setMenuGroup(api: MenuGroupApi) {
  setContext(GROUP_KEY, api);
}

export function getMenuGroup(): MenuGroupApi | null {
  return getContext<MenuGroupApi | null>(GROUP_KEY) ?? null;
}

export interface RadioGroupApi {
  readonly value: string | undefined;
  select: (value: string) => void;
}

const RADIO_KEY = Symbol("atlas.dropdown-menu-radio-group");

export function setRadioGroup(api: RadioGroupApi) {
  setContext(RADIO_KEY, api);
}

export function getRadioGroup(): RadioGroupApi {
  const api = getContext<RadioGroupApi | null>(RADIO_KEY);
  if (!api) throw new Error("A radio item must be used inside <DropdownMenuRadioGroup>.");
  return api;
}

/** The menu rows a keyboard can move through: enabled, and in this popup only. */
export function menuRows(popup: HTMLElement): HTMLElement[] {
  return Array.from(
    popup.querySelectorAll<HTMLElement>('[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]'),
  ).filter((row) => !row.hasAttribute("data-disabled") && row.closest('[role="menu"]') === popup);
}
