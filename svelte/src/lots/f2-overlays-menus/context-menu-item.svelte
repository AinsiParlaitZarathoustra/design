<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { getMenu } from "./menu-context";

  /**
   * A command row of the right-click menu, ported from `ContextMenuItem`. Choosing
   * it runs `onclick` and closes the menu. Its classes are the context menu's own:
   * a destructive item looks like any other.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children" | "onclick"> {
    class?: string;
    inset?: boolean;
    disabled?: boolean;
    onclick?: (event: Event) => void;
    children?: Snippet;
  }

  let { class: className, inset = false, disabled = false, onclick, children, ...rest }: Props = $props();
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
  data-slot="context-menu-item"
  data-inset={inset ? "" : undefined}
  data-disabled={disabled ? "" : undefined}
  class={cn(
    "group/context-menu-item relative flex items-center gap-2 rounded px-2 py-1",
    "text-xs cursor-pointer select-none outline-none",
    "text-secondary-foreground",
    "focus:bg-element-hover focus:text-foreground",
    "data-[inset]:pl-6",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
    className,
  )}
  onclick={choose}
  onkeydown={keyChoose}
  onpointermove={hover}
  {...rest}
>
  {@render children?.()}
</div>
