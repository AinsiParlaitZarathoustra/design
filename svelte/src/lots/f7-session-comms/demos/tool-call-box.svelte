<script lang="ts">
  import type { Snippet } from "svelte";

  /** Calls sit in one bordered box, divided by hairlines, as `TurnRow` draws them (the story's decorator). */
  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="max-w-2xl divide-y divide-border-subtle overflow-hidden rounded-md border border-border">
  {@render children()}
</div>
