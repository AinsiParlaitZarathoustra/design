import { getContext, setContext, type Component } from "svelte";

/**
 * How the shell links and navigates without a router, ported from
 * `src/lib/link.tsx`. The app sets one context (`setLinks`) with its own link
 * component, its location and its navigate; without one, links are plain
 * `<a href>` and nothing is "active". The native fallback is the default, so
 * a story or a host that sets nothing still renders and still navigates.
 */

export type LinkLocation = {
  pathname: string;
  /** The query string, with or without its leading `?`. */
  search?: string;
};

/** A link component: receives `href` and the anchor attributes. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LinkComponent = Component<any>;

export type LinksValue = {
  Link: LinkComponent | null;
  location: LinkLocation;
  navigate: (href: string) => void;
};

const KEY = Symbol("f5-links");

const DEFAULT: LinksValue = {
  Link: null,
  location: { pathname: "" },
  navigate: (href) => window.location.assign(href),
};

/** Provide the link context to a subtree. Call from a component's init. */
export function setLinks(value: Partial<LinksValue>): LinksValue {
  const next: LinksValue = { ...DEFAULT, ...value };
  setContext(KEY, next);
  return next;
}

/** The link context in effect, or the native fallback. */
export function getLinks(): LinksValue {
  return getContext<LinksValue | undefined>(KEY) ?? DEFAULT;
}

/** `to` plus its search params, as one href. */
export function hrefOf(to: string, search?: Record<string, string>): string {
  const query = new URLSearchParams(search).toString();
  return query ? `${to}?${query}` : to;
}

/** True when `location` is `to` and carries every one of `search`'s params. */
export function isAt(location: LinkLocation, to: string, search?: Record<string, string>): boolean {
  if (location.pathname !== to) return false;
  const current = new URLSearchParams(location.search ?? "");
  return Object.entries(search ?? {}).every(([k, v]) => current.get(k) === v);
}
