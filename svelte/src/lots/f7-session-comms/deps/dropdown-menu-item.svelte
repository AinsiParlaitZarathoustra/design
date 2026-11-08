<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { MENU_ITEM } from "./menu-classes";

  /** One row of a `DropdownMenu` (`DropdownMenuItem`): `destructive` reads in the error ink. */
  interface Props {
    variant?: "default" | "destructive";
    onclick?: () => void;
    children: Snippet;
    class?: string;
  }

  let { variant = "default", onclick, children, class: className }: Props = $props();
</script>

<button
  type="button"
  role="menuitem"
  data-slot="dropdown-menu-item"
  data-variant={variant === "destructive" ? "destructive" : undefined}
  class={cn(MENU_ITEM, className)}
  {onclick}
>
  {@render children()}
</button>
