<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { CheckIcon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import type { MenuState } from "./menu-state.svelte";
  import type { RadioGroupContext } from "./dropdown-menu-radio-group.svelte";

  /** A radio row in a menu: the check marks the group's value; choosing it closes the menu. */
  interface Props {
    value: string;
    disabled?: boolean;
    class?: string;
    children?: Snippet;
  }

  let { value, disabled = false, class: className, children }: Props = $props();

  const menu = getContext<MenuState>("dropdown-menu");
  const group = getContext<RadioGroupContext>("dropdown-menu-radio-group");
  const checked = $derived(group.value === value);
</script>

<div
  role="menuitemradio"
  tabindex={disabled ? undefined : -1}
  aria-checked={checked}
  data-slot="dropdown-menu-radio-item"
  data-disabled={disabled ? "" : undefined}
  aria-disabled={disabled || undefined}
  class={cn(
    "group/dropdown-menu-item relative flex items-center gap-2 rounded py-1 pr-2 pl-7 text-xs cursor-pointer select-none outline-none text-secondary-foreground focus:bg-element-hover focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
    className,
  )}
  onclick={() => {
    if (disabled) return;
    group.select(value);
    menu.close();
  }}
  onkeydown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (disabled) return;
      group.select(value);
      menu.close();
    }
  }}
>
  <span class="pointer-events-none absolute left-2 inline-flex size-3 items-center justify-center">
    {#if checked}<Icon icon={CheckIcon} size="xs" />{/if}
  </span>
  {@render children?.()}
</div>
