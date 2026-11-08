<script lang="ts">
  import type { Snippet } from "svelte";

  /** A group of rows in a menu (`DropdownMenuGroup`). */
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<div data-slot="dropdown-menu-group" role="group">{@render children?.()}</div>
