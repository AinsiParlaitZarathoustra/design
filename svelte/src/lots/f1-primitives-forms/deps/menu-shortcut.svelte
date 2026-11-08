<script lang="ts">
  import type { Snippet } from "svelte";
  import { menuShortcutVariants } from "./menu-variants";

  /** The keys drawn at a row's end (`DropdownMenuShortcut`). */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<span data-slot="dropdown-menu-shortcut" class={menuShortcutVariants({ className })}>
  {@render children?.()}
</span>
