// `useLinks`, ported from `lib/link.tsx`. The Svelte port keeps the link context
// in f5's `deps/link.ts` (`getLinks`); this is the same read under React's name.

import { getLinks, type LinksValue } from "../f5-layout-shell/deps/link";

/** The link context in effect: the link component, the location and navigate. */
export function useLinks(): LinksValue {
  return getLinks();
}
