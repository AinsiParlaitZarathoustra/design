<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import { setRadioGroup, type RadioGroupApi } from "./context";

  /**
   * A group of radios, ported from `RadioGroup` in
   * `src/components/ui/radio-group.tsx` (`@base-ui/react/radio-group`). The
   * group is a `role="radiogroup"` element; arrow keys move and select among
   * its items. `value` is controlled; `defaultValue` seeds it once.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children" | "role"> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (next: string) => void;
    disabled?: boolean;
    name?: string;
    class?: string;
    children?: Snippet;
  }

  let {
    value: controlled = $bindable(undefined),
    defaultValue,
    onValueChange,
    disabled = false,
    name,
    class: className,
    children,
    ...rest
  }: Props = $props();

  // `defaultValue` seeds the uncontrolled value once, as React's does.
  let uncontrolled = $state<string | undefined>(untrack(() => defaultValue));
  let element = $state<HTMLDivElement | null>(null);
  let firstItem = $state<HTMLElement | null>(null);

  const current = $derived(controlled !== undefined ? controlled : uncontrolled);

  function select(next: string) {
    if (disabled) return;
    if (controlled === undefined) uncontrolled = next;
    else controlled = next;
    onValueChange?.(next);
  }

  function step(from: HTMLElement, direction: 1 | -1) {
    const items = [...(element?.querySelectorAll<HTMLElement>('[role="radio"]:not([aria-disabled="true"])') ?? [])];
    const index = items.indexOf(from);
    if (index === -1 || items.length === 0) return;
    const next = items[(index + direction + items.length) % items.length];
    next.focus();
    next.click();
  }

  $effect(() => {
    const first = element?.querySelector<HTMLElement>('[role="radio"]') ?? null;
    firstItem = first;
  });

  setRadioGroup({
    get value() {
      return current;
    },
    get disabled() {
      return disabled;
    },
    get name() {
      return name;
    },
    select,
    step,
    get firstItem() {
      return firstItem;
    },
  } satisfies RadioGroupApi);
</script>

<div
  bind:this={element}
  data-slot="radio-group"
  role="radiogroup"
  aria-disabled={disabled || undefined}
  class={cn("grid gap-2", className)}
  {...rest}
>
  {@render children?.()}
</div>
