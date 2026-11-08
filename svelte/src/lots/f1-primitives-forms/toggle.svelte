<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../../lib/utils";
  import { toggleVariants } from "./toggle-variants";

  /**
   * A two-state button, ported from `Toggle` in `src/components/ui/toggle.tsx`
   * (`@base-ui/react/toggle`). `pressed` is controlled; `defaultPressed` seeds it.
   */
  interface Props extends Omit<HTMLButtonAttributes, "class" | "children"> {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (next: boolean) => void;
    variant?: VariantProps<typeof toggleVariants>["variant"];
    size?: VariantProps<typeof toggleVariants>["size"];
    class?: string;
    children?: Snippet;
  }

  let {
    pressed: controlled = $bindable(undefined),
    defaultPressed = false,
    onPressedChange,
    variant = "default",
    size = "default",
    disabled = false,
    type = "button",
    class: className,
    children,
    onclick,
    ...rest
  }: Props = $props();

  // `defaultPressed` seeds the uncontrolled state once, as React's does.
  let uncontrolled = $state(untrack(() => defaultPressed));

  const isPressed = $derived(controlled ?? uncontrolled);
</script>

<button
  data-slot="toggle"
  {type}
  {disabled}
  aria-pressed={isPressed}
  data-pressed={isPressed ? "" : undefined}
  data-disabled={disabled ? "" : undefined}
  {...rest}
  onclick={(event) => {
    onclick?.(event);
    if (disabled) return;
    const next = !isPressed;
    if (controlled === undefined) uncontrolled = next;
    else controlled = next;
    onPressedChange?.(next);
  }}
  class={cn(toggleVariants({ variant, size }), className)}
>
  {@render children?.()}
</button>
