<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import { setLinks, type LinkComponent, type LinkLocation } from "../f5-layout-shell/deps/link";
  import { setLinks as setCommandLinks } from "../f2-overlays-menus/deps/link-context";

  /**
   * Provides the link context the shell reads (`useLinks`), and the one the command
   * menu reads, ported from `LinkProvider`. `navigate` and `location` follow their
   * props. `Link` is read when the provider mounts, because f5's `setLinks` copies
   * its value.
   */
  interface Props {
    Link?: LinkComponent | null;
    location?: LinkLocation;
    navigate?: (href: string) => void;
    children?: Snippet;
  }

  let { Link = null, location, navigate, children }: Props = $props();

  // One live location object: the context keeps this object, and it follows the prop.
  const live = $state<LinkLocation>({ pathname: "" });
  $effect.pre(() => {
    live.pathname = location?.pathname ?? "";
    live.search = location?.search;
  });

  const go = (href: string) => (navigate ?? ((next: string) => window.location.assign(next)))(href);

  setLinks({ Link: untrack(() => Link), location: live, navigate: go });
  setCommandLinks({ navigate: go });
</script>

{@render children?.()}
