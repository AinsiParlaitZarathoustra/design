<script lang="ts">
  import type { Snippet } from "svelte";

  /**
   * The oracle story's `Frame` decorator: a bounded scroller, so the window has
   * a scroll root to grow against.
   */
  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<div role="region" aria-label="Session" tabindex="0" class="h-160 max-w-3xl overflow-auto pr-2">
  {@render children()}
</div>
