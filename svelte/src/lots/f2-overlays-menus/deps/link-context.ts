import { getContext, setContext } from "svelte";

/**
 * How shell components navigate without a router, ported from `lib/link.tsx`
 * (`useLinks`). Declared here because the shared link module has not landed in
 * this worktree: the command menu needs only `navigate`. Without a provider it
 * falls back to `window.location.assign`, as the source does.
 */
export interface LinkApi {
  navigate: (href: string) => void;
}

const KEY = Symbol("atlas.links");
const DEFAULT: LinkApi = { navigate: (href) => window.location.assign(href) };

export function setLinks(api: LinkApi) {
  setContext(KEY, api);
}

export function getLinks(): LinkApi {
  return getContext<LinkApi | undefined>(KEY) ?? DEFAULT;
}
