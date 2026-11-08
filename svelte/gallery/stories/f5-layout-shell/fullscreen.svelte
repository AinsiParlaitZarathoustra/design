<script lang="ts">
  import type { Snippet } from "svelte";

  /**
   * The source's `layout: "fullscreen"`: Storybook draws the story with no body
   * padding. The gallery pads every story body, so this drops that padding
   * while the story is mounted and restores it afterwards.
   */
  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  $effect(() => {
    const body = document.body;
    const before = body.style.padding;
    body.style.padding = "0";
    return () => {
      body.style.padding = before;
    };
  });
</script>

{@render children()}
