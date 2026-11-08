<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  /**
   * The link the shell stories render: an anchor that swallows its click, so a
   * story never navigates. Ported from `StoryLink` in `shell/fixtures.tsx`.
   */
  interface Props extends Omit<HTMLAnchorAttributes, "href"> {
    href: string;
    children?: Snippet;
  }

  let { href, children, onclick, ...rest }: Props = $props();
</script>

<a
  {href}
  {...rest}
  onclick={(event) => {
    event.preventDefault();
    onclick?.(event);
  }}
>
  {@render children?.()}
</a>
