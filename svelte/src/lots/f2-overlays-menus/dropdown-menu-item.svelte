<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { menuItemVariants } from "./menu-variants";
  import { getMenu } from "./menu-context";

  /**
   * A command row, ported from `DropdownMenuItem`. Choosing it (click, Enter or
   * Space) runs `onclick` and closes the menu. A pointer moving over it takes the
   * focus, which is how the row is highlighted.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children" | "onclick"> {
    class?: string;
    inset?: boolean;
    variant?: "default" | "destructive";
    disabled?: boolean;
    onclick?: (event: Event) => void;
    children?: Snippet;
  }

  let {
    class: className,
    inset = false,
    variant = "default",
    disabled = false,
    onclick,
    children,
    ...rest
  }: Props = $props();
  const menu = getMenu();

  function choose(event: Event) {
    if (disabled) return;
    onclick?.(event);
    menu.closeAll();
  }

  function keyChoose(event: KeyboardEvent) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    choose(event);
  }

  function hover(event: PointerEvent) {
    const row = event.currentTarget as HTMLElement;
    if (!disabled && document.activeElement !== row) row.focus({ preventScroll: true });
  }
</script>

<div
  role="menuitem"
  tabindex="-1"
  aria-disabled={disabled ? "true" : undefined}
  data-slot="dropdown-menu-item"
  data-inset={inset ? "" : undefined}
  data-variant={variant}
  data-disabled={disabled ? "" : undefined}
  class={menuItemVariants({ className })}
  onclick={choose}
  onkeydown={keyChoose}
  onpointermove={hover}
  {...rest}
>
  {@render children?.()}
</div>
