<script lang="ts">
  import type { Snippet } from "svelte";

  /**
   * The tooltip provider. Timing is owned by `tooltip-timing.ts`, shared by every
   * tooltip, so the provider only groups them (it renders its children as they are).
   */
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

{@render children?.()}
