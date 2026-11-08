<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenuItem } from "../../f2-overlays-menus/index";
  import { getLinks } from "./link";

  /**
   * A menu row that goes somewhere. Adapter for React's `DropdownMenuItem
   * render={<Link href />}`: the row is the menu's own menu item (the menu
   * closes on choice, as it does for any row), and the destination is opened
   * through the link context, or in a new tab when it is external.
   */
  interface Props {
    href: string;
    external?: boolean;
    children?: Snippet;
  }

  let { href, external = false, children }: Props = $props();
  const links = getLinks();

  function go() {
    if (external) window.open(href, "_blank", "noreferrer");
    else links.navigate(href);
  }
</script>

<DropdownMenuItem onclick={go}>
  {@render children?.()}
</DropdownMenuItem>
