<script lang="ts">
  import { untrack } from "svelte";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../../../lib/utils";
  import { toggleVariants } from "../toggle-variants";
  import { setToggleGroup } from "./context";

  /**
   * A set of toggles that share a value, ported from `ToggleGroup` in
   * `src/components/ui/toggle-group.tsx`. Single choice by default; `multiple`
   * lets several be pressed. `spacing={0}` joins the items into one strip.
   *
   * Arrow keys (along `orientation`), Home and End move focus among the enabled
   * items and wrap, as Base UI's composite root does. The moved-to item becomes
   * the tab stop.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (next: string[]) => void;
    multiple?: boolean;
    variant?: NonNullable<VariantProps<typeof toggleVariants>["variant"]>;
    size?: NonNullable<VariantProps<typeof toggleVariants>["size"]>;
    spacing?: number;
    orientation?: "horizontal" | "vertical";
    disabled?: boolean;
    class?: string;
    children?: Snippet;
  }

  let {
    value: controlled = $bindable(undefined),
    defaultValue,
    onValueChange,
    multiple = false,
    variant,
    size,
    spacing = 2,
    orientation = "horizontal",
    disabled = false,
    class: className,
    children,
    onkeydown,
    ...rest
  }: Props = $props();

  // `defaultValue` seeds the uncontrolled value once, as React's does.
  let uncontrolled = $state<string[]>(untrack(() => [...(defaultValue ?? [])]));
  const current = $derived(controlled ?? uncontrolled);

  let element = $state<HTMLDivElement | null>(null);
  let tabStop = $state<HTMLElement | null>(null);

  function set(next: string[]) {
    if (controlled === undefined) uncontrolled = next;
    else controlled = next;
    onValueChange?.(next);
  }

  /** The items a key can reach: the enabled ones, in order. */
  function reachable(): HTMLElement[] {
    if (!element) return [];
    return [
      ...element.querySelectorAll<HTMLElement>('[data-slot="toggle-group-item"]:not(:disabled)'),
    ];
  }

  // The first reachable item holds the tab stop until focus moves.
  $effect(() => {
    if (tabStop && element?.contains(tabStop)) return;
    tabStop = reachable()[0] ?? null;
  });

  function handleKeyDown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    onkeydown?.(event);
    if (event.defaultPrevented) return;
    const items = reachable();
    if (items.length === 0) return;
    const index = items.indexOf(document.activeElement as HTMLElement);
    const horizontal = orientation === "horizontal";
    let next: number;
    switch (event.key) {
      case horizontal ? "ArrowRight" : "ArrowDown":
        next = (index + 1) % items.length;
        break;
      case horizontal ? "ArrowLeft" : "ArrowUp":
        next = index <= 0 ? items.length - 1 : index - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = items.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    items[next].focus();
  }

  setToggleGroup({
    get variant() {
      return variant;
    },
    get size() {
      return size;
    },
    get spacing() {
      return spacing;
    },
    get orientation() {
      return orientation;
    },
    get disabled() {
      return disabled;
    },
    get tabStop() {
      return tabStop;
    },
    setTabStop(item) {
      tabStop = item;
    },
    isPressed: (item) => current.includes(item),
    toggle: (item) => {
      if (disabled) return;
      if (current.includes(item)) set(current.filter((v) => v !== item));
      else set(multiple ? [...current, item] : [item]);
    },
  });
</script>

<div
  bind:this={element}
  data-slot="toggle-group"
  role="group"
  data-variant={variant}
  data-size={size}
  data-spacing={spacing}
  data-orientation={orientation}
  data-disabled={disabled ? "" : undefined}
  data-multiple={multiple ? "" : undefined}
  class={cn(
    "group/toggle-group flex w-fit flex-row items-center gap-0.5 rounded data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[spacing=0]:gap-0",
    className,
  )}
  {...rest}
  onkeydown={handleKeyDown}
>
  {@render children?.()}
</div>
