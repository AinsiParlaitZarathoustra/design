<script lang="ts">
  import type { Snippet } from "svelte";
  import { portal } from "./portal";
  import { getSheet } from "./sheet-context";

  /** Moves its children to `document.body` while the sheet is mounted (open, or in its exit). */
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
  const api = getSheet();
</script>

{#if api.mounted}
  <div use:portal class="contents">
    {@render children?.()}
  </div>
{/if}
