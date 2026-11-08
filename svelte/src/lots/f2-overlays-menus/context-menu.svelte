<script lang="ts">
  import type { Snippet } from "svelte";
  import DropdownMenu from "./dropdown-menu.svelte";

  /**
   * The context menu root, ported from `context-menu.tsx`. It is the menu machinery
   * of the dropdown; the difference is the trigger, which opens it at the pointer.
   */
  interface Props {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: Snippet;
  }

  let { open, defaultOpen = false, onOpenChange, children }: Props = $props();
</script>

<DropdownMenu {open} {defaultOpen} {onOpenChange}>
  {@render children?.()}
</DropdownMenu>
