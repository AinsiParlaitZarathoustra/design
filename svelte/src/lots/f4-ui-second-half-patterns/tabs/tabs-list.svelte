<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../../../lib/utils";
  import { getTabsContext } from "./tabs-context";
  import { tabsListVariants } from "./tabs-variants";

  /** The sliding thumb's box, in px, relative to the list (Base UI's `--active-tab-*`). */
  interface Indicator {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
  }

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    variant?: VariantProps<typeof tabsListVariants>["variant"];
    size?: VariantProps<typeof tabsListVariants>["size"];
    class?: string;
    children?: Snippet;
  }

  let { variant, size, class: className, children, ...rest }: Props = $props();
  const tabs = getTabsContext();

  const segmented = $derived((variant ?? "segmented") === "segmented");
  let list = $state<HTMLDivElement | null>(null);
  let indicator = $state<Indicator | null>(null);

  function px(el: HTMLElement, prop: "width" | "height"): number {
    return parseFloat(getComputedStyle(el)[prop]) || 0;
  }

  /** Measures the selected tab against the list, as Base UI's `TabsIndicator` does. */
  function measure(listEl: HTMLDivElement, value: string | null) {
    const active = value === null
      ? null
      : listEl.querySelector<HTMLElement>(`[role="tab"][data-active]`);
    if (!active) {
      indicator = null;
      return;
    }
    const listRect = listEl.getBoundingClientRect();
    const tabRect = active.getBoundingClientRect();
    const listWidth = px(listEl, "width");
    const listHeight = px(listEl, "height");
    const scaleX = listWidth > 0 ? listRect.width / listWidth : 1;
    const scaleY = listHeight > 0 ? listRect.height / listHeight : 1;
    const left = (tabRect.left - listRect.left) / scaleX + listEl.scrollLeft - listEl.clientLeft;
    const top = (tabRect.top - listRect.top) / scaleY + listEl.scrollTop - listEl.clientTop;
    const width = px(active, "width");
    const height = px(active, "height");
    indicator = {
      left,
      top,
      width,
      height,
      right: listEl.scrollWidth - left - width,
      bottom: listEl.scrollHeight - top - height,
    };
  }

  // Re-measure when the selection changes, and when the list or a tab resizes.
  $effect(() => {
    const listEl = list;
    const value = tabs.value;
    if (!listEl || !segmented) return;
    measure(listEl, value);
    const observer = new ResizeObserver(() => measure(listEl, tabs.value));
    observer.observe(listEl);
    for (const tab of listEl.querySelectorAll<HTMLElement>('[role="tab"]')) observer.observe(tab);
    return () => observer.disconnect();
  });

  /** Arrow keys (and Home/End) move focus among the enabled tabs; activation stays on click or Enter. */
  function onkeydown(event: KeyboardEvent) {
    if (!list) return;
    const horizontal = tabs.orientation === "horizontal";
    const back = horizontal ? "ArrowLeft" : "ArrowUp";
    const forward = horizontal ? "ArrowRight" : "ArrowDown";
    const enabled = [...list.querySelectorAll<HTMLElement>('[role="tab"]:not([aria-disabled="true"])')];
    if (enabled.length === 0) return;
    const at = enabled.indexOf(document.activeElement as HTMLElement);
    let next: number | null = null;
    if (event.key === forward) next = at < 0 ? 0 : (at + 1) % enabled.length;
    else if (event.key === back) next = at < 0 ? enabled.length - 1 : (at - 1 + enabled.length) % enabled.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = enabled.length - 1;
    if (next === null) return;
    event.preventDefault();
    enabled[next]!.focus();
  }
</script>

<div
  bind:this={list}
  role="tablist"
  aria-orientation={tabs.orientation === "vertical" ? "vertical" : undefined}
  data-slot="tabs-list"
  data-variant={variant ?? "segmented"}
  data-size={segmented ? (size ?? "md") : undefined}
  data-activation-direction={tabs.activationDirection}
  {...rest}
  {onkeydown}
  class={cn(tabsListVariants({ variant, size }), className)}
>
  {#if segmented && tabs.value !== null}
    <span
      role="presentation"
      data-slot="tabs-indicator"
      data-activation-direction={tabs.activationDirection}
      hidden={!indicator || indicator.width <= 0 || indicator.height <= 0}
      style={indicator
        ? `--active-tab-left: ${indicator.left}px; --active-tab-right: ${indicator.right}px; --active-tab-top: ${indicator.top}px; --active-tab-bottom: ${indicator.bottom}px; --active-tab-width: ${indicator.width}px; --active-tab-height: ${indicator.height}px;`
        : undefined}
      class={cn(
        "absolute top-0 left-0 rounded-full bg-element-selected",
        "h-(--active-tab-height) w-(--active-tab-width)",
        "translate-x-(--active-tab-left) translate-y-(--active-tab-top)",
        "transition-[translate,width] duration-base ease-out-strong motion-reduce:transition-none",
      )}
    ></span>
  {/if}
  {@render children?.()}
</div>
