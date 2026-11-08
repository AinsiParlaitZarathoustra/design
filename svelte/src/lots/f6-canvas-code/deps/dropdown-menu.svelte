<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import { MenuState } from "./menu-state.svelte";

  /**
   * Adapter for `DropdownMenu` (`src/ui/dropdown-menu.tsx`, lot f2): the root
   * holds the open state; the trigger, content and items read it from context.
   */
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  const menu = new MenuState();
  setContext("dropdown-menu", menu);
</script>

{@render children?.()}
