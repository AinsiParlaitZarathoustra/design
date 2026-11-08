<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { getLinks } from "./link";

  /**
   * One link in the shell: the app's `Link` from the link context when there
   * is one, otherwise a plain anchor. Ported from `LinkProps` in
   * `src/lib/link.tsx`; `href` is required, every other anchor attribute
   * passes through.
   */
  interface Props extends Omit<HTMLAnchorAttributes, "href"> {
    href: string;
    children?: Snippet;
  }

  let { href, children, ...rest }: Props = $props();
  const links = getLinks();
  const Custom = $derived(links.Link);
</script>

{#if Custom}
  <Custom {href} {...rest}>
    {@render children?.()}
  </Custom>
{:else}
  <a {href} {...rest}>
    {@render children?.()}
  </a>
{/if}
