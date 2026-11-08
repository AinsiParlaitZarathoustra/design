<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { menuItemVariants } from "./menu-variants";
  import { getMenu } from "./menu-context";

  /**
   * A row of the menu (`DropdownMenuItem`: `@base-ui/react/menu`'s `Item`).
   * Choosing it (click, Enter or Space) runs `onclick` and closes the menu; a
   * pointer moving over it takes the focus, which is how the row highlights.
   */
  interface Props {
    inset?: boolean;
    variant?: "default" | "destructive";
    disabled?: boolean;
    title?: string;
    class?: string;
    onclick?: () => void;
    children?: Snippet;
  }

  let {
    inset = false,
    variant = "default",
    disabled = false,
    title,
    class: className,
    onclick,
    children,
  }: Props = $props();

  const menu = getMenu();

  function choose() {
    if (disabled) return;
    onclick?.();
    menu.close();
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    choose();
  }

  function onpointermove(event: PointerEvent) {
    const row = event.currentTarget as HTMLElement;
    if (!disabled && document.activeElement !== row) row.focus({ preventScroll: true });
  }
</script>

<div
  role="menuitem"
  tabindex={-1}
  aria-disabled={disabled ? "true" : undefined}
  data-disabled={disabled ? "" : undefined}
  data-slot="dropdown-menu-item"
  data-variant={variant}
  data-inset={inset ? "" : undefined}
  {title}
  class={cn(menuItemVariants({ className }))}
  onclick={choose}
  {onkeydown}
  {onpointermove}
>
  {@render children?.()}
</div>
