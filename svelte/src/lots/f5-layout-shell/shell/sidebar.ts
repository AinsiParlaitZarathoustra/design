import { getContext, setContext } from "svelte";
import type { LinkLocation } from "../deps/link";

/**
 * The rail's shared state, ported from `SidebarContext` in `sidebar.tsx`: the
 * collapsed flag, the location the rows compare against, and the one element
 * the active pill sits behind (the rail moves it, rows report their own).
 */

export interface SidebarState {
  readonly collapsed: boolean;
  readonly location: LinkLocation;
  /** A row reports that it is the active one (or stops being it). */
  setActive(element: HTMLElement | null, owner: string): void;
}

const KEY = Symbol("f5-sidebar");

export function setSidebarState(state: SidebarState): void {
  setContext(KEY, state);
}

export function useSidebar(): SidebarState {
  const state = getContext<SidebarState | undefined>(KEY);
  if (!state) {
    return { collapsed: false, location: { pathname: "" }, setActive: () => {} };
  }
  return state;
}

/** The child rows of a disclosure, as the rail's `SidebarChild` type. */
export type SidebarChild = {
  label: string;
  to: string;
  search?: Record<string, string>;
  // Lucide Svelte components are typed loosely at the seam, as `Icon` is.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
};
