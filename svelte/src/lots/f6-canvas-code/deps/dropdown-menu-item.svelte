<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import type { MenuState } from "./menu-state.svelte";

  /**
   * A row of a menu (`DropdownMenuItem`). Choosing it runs `onclick` and closes
   * the menu, as Base UI's `closeOnClick` does.
   */
  interface Props {
    disabled?: boolean;
    inset?: boolean;
    variant?: "default" | "destructive";
    class?: string;
    onclick?: (event: MouseEvent) => void;
    children?: Snippet;
  }

  let { disabled = false, inset = false, variant = "default", class: className, onclick, children }: Props =
    $props();

  const menu = getContext<MenuState>("dropdown-menu");
</script>

<div
  role="menuitem"
  tabindex={disabled ? undefined : -1}
  data-slot="dropdown-menu-item"
  data-inset={inset ? "" : undefined}
  data-variant={variant}
  data-disabled={disabled ? "" : undefined}
  aria-disabled={disabled || undefined}
  class={cn(
    "group/dropdown-menu-item relative flex items-center gap-2 rounded px-2 py-1 text-xs cursor-pointer select-none outline-none text-secondary-foreground focus:bg-element-hover focus:text-foreground data-[inset]:pl-6 data-[variant=destructive]:text-error data-[variant=destructive]:focus:text-error data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 has-[>svg:first-child]:gap-1.5",
    className,
  )}
  onclick={(event) => {
    if (disabled) return;
    onclick?.(event);
    menu.close();
  }}
  onkeydown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!disabled) {
        onclick?.(event as unknown as MouseEvent);
        menu.close();
      }
    }
  }}
>
  {@render children?.()}
</div>
