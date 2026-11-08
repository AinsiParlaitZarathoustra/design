<script lang="ts">
  import type { Snippet } from "svelte";
  import { getSheet } from "./sheet-context";

  /** Closes the sheet. `child` renders another element with the close's props spread on it. */
  interface Props {
    child?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
  }

  let { child, children }: Props = $props();
  const api = getSheet();

  const closeProps = $derived({
    "data-slot": "sheet-close",
    onclick: () => {
      api.setOpen(false);
    },
  });
</script>

{#if child}
  {@render child(closeProps)}
{:else}
  <button type="button" {...closeProps}>{@render children?.()}</button>
{/if}
