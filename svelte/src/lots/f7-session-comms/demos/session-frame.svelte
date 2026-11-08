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

<!-- svelte-ignore a11y_no_noninteractive_tabindex: a bounded scroller takes a tab stop, so a keyboard can scroll the transcript. -->
<div role="region" aria-label="Session" tabindex="0" class="h-160 max-w-3xl overflow-auto pr-2">
  {@render children()}
</div>
