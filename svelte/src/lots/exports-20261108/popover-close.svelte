<script lang="ts">
  import type { Snippet } from "svelte";
  import { getPopover } from "../f2-overlays-menus/popover-context";

  /**
   * The button that closes its popover, ported from `PopoverClose`. `child` renders
   * another element with the close props spread on it, as `PopoverTrigger` does.
   */
  interface Props {
    child?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
  }

  let { child, children }: Props = $props();
  const popover = getPopover();

  const closeProps = $derived({
    "data-slot": "popover-close",
    onclick: () => {
      popover.setOpen(false);
    },
  });
</script>

{#if child}
  {@render child(closeProps)}
{:else}
  <button type="button" {...closeProps}>{@render children?.()}</button>
{/if}
