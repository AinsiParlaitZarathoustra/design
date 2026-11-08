<script lang="ts">
  import type { Snippet } from "svelte";
  import { setLinks, type LinkLocation } from "../../../src/lots/f5-layout-shell/deps/link";
  import StoryLink from "../../../src/lots/f5-layout-shell/deps/story-link.svelte";

  /**
   * The links the shell stories render: inert anchors that never navigate and a
   * fixed location. Ported from `StoryLinks` in `stories/components/shell/fixtures.tsx`.
   */
  interface Props {
    pathname?: string;
    search?: string;
    children: Snippet;
  }

  let { pathname = "/sessions", search, children }: Props = $props();
  const location: LinkLocation = {
    get pathname() {
      return pathname;
    },
    get search() {
      return search;
    },
  };
  setLinks({ Link: StoryLink, location, navigate: () => {} });
</script>

{@render children()}
