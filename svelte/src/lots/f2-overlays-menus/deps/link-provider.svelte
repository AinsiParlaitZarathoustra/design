<script lang="ts">
  import type { Snippet } from "svelte";
  import { setLinks } from "./link-context";

  /** Provides `navigate` to the shell components below it. Declared locally with `link-context.ts`. */
  interface Props {
    navigate: (href: string) => void;
    children?: Snippet;
  }

  let { navigate, children }: Props = $props();
  setLinks({
    navigate: (href: string) => navigate(href),
  });
</script>

{@render children?.()}
