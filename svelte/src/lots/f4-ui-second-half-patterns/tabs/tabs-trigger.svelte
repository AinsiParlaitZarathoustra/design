<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import { getTabsContext, panelIdOf, tabIdOf, type TabActivationDirection } from "./tabs-context";

  interface Props extends Omit<HTMLButtonAttributes, "class" | "children" | "value"> {
    value: string;
    disabled?: boolean;
    class?: string;
    children?: Snippet;
  }

  let { value, disabled = false, class: className, children, onclick, ...rest }: Props = $props();
  const tabs = getTabsContext();

  const active = $derived(tabs.value === value);
  const id = $derived(tabIdOf(tabs.rootId, value));
  const panelId = $derived(panelIdOf(tabs.rootId, value));

  /** Where the selection moves, from the position of the old tab to the new one. */
  function directionTo(element: HTMLElement): TabActivationDirection {
    const list = element.closest('[role="tablist"]');
    const previous = list?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
    if (!previous || previous === element) return "none";
    const horizontal = tabs.orientation === "horizontal";
    const from = previous.getBoundingClientRect();
    const to = element.getBoundingClientRect();
    if (horizontal) return to.left < from.left ? "left" : to.left > from.left ? "right" : "none";
    return to.top < from.top ? "up" : to.top > from.top ? "down" : "none";
  }

  function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    onclick?.(event);
    if (active || disabled) return;
    tabs.select(value, directionTo(event.currentTarget));
  }
</script>

<button
  type="button"
  role="tab"
  {id}
  aria-controls={active ? panelId : undefined}
  aria-selected={active}
  aria-disabled={disabled || undefined}
  tabindex={active ? 0 : -1}
  data-slot="tabs-trigger"
  data-active={active || undefined}
  data-disabled={disabled || undefined}
  data-orientation={tabs.orientation}
  data-activation-direction={tabs.activationDirection}
  {...rest}
  onclick={handleClick}
  class={cn(
    "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
    "text-xs font-medium text-muted-foreground select-none",
    "transition-colors duration-fast ease-out-strong",
    "hover:text-foreground",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",

    // segmented: `Segmented`'s options. Each at its own width; the list's indicator is the chosen one's fill.
    "group-data-[variant=segmented]/tabs-list:shrink-0",
    "group-data-[variant=segmented]/tabs-list:rounded-full",
    "group-data-[variant=segmented]/tabs-list:data-active:text-foreground",
    "group-data-[size=md]/tabs-list:h-control-sm",
    "group-data-[size=md]/tabs-list:px-2.5",
    "group-data-[size=sm]/tabs-list:h-control-xs",
    "group-data-[size=sm]/tabs-list:px-2",
    "group-data-[size=sm]/tabs-list:text-2xs",

    // line: a 2px rule under the active tab, overlapping the list's border
    "group-data-[variant=line]/tabs-list:h-full",
    "group-data-[variant=line]/tabs-list:rounded-none",
    "group-data-[variant=line]/tabs-list:data-active:text-foreground",
    "group-data-[variant=line]/tabs-list:after:absolute",
    "group-data-[variant=line]/tabs-list:after:inset-x-0",
    "group-data-[variant=line]/tabs-list:after:-bottom-px",
    "group-data-[variant=line]/tabs-list:after:h-px",
    "group-data-[variant=line]/tabs-list:after:bg-foreground",
    "group-data-[variant=line]/tabs-list:after:opacity-0",
    "group-data-[variant=line]/tabs-list:after:transition-opacity",
    "group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
    className,
  )}
>
  {@render children?.()}
</button>
