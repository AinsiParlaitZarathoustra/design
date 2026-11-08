<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import type { MenuState } from "./menu-state.svelte";

  /**
   * The menu's trigger. `child` is the Base UI `render` prop: it receives the
   * trigger's props to spread on the element it draws, so the trigger can be
   * an `IconButton` or a `Button`. Without it the trigger is a plain button.
   */
  interface Props {
    disabled?: boolean;
    class?: string;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { disabled = false, class: className, child, children, ...rest }: Props = $props();

  const menu = getContext<MenuState>("dropdown-menu");

  const triggerProps = $derived({
    id: menu.triggerId,
    "data-slot": "dropdown-menu-trigger",
    "aria-haspopup": "menu" as const,
    "aria-expanded": menu.open,
    "data-popup-open": menu.open || undefined,
    disabled,
    "data-disabled": disabled || undefined,
    class: className,
    onclick: () => {
      if (!disabled) menu.open = !menu.open;
    },
    ...rest,
  });
</script>

{#if child}
  {@render child({ props: triggerProps })}
{:else}
  <button type="button" {...triggerProps}>{@render children?.()}</button>
{/if}
