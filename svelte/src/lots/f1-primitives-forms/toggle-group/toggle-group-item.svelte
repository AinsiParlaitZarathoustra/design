<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../../../lib/utils";
  import { toggleVariants } from "../toggle-variants";
  import { getToggleGroup } from "./context";

  /**
   * One toggle of a `ToggleGroup`, ported from `ToggleGroupItem`. Its look
   * follows the group's `variant`, `size` and `spacing`. Inside a group it is
   * a roving-focus item: only the tab stop is in the tab order.
   */
  interface Props extends Omit<HTMLButtonAttributes, "class" | "children" | "value"> {
    value: string;
    variant?: NonNullable<VariantProps<typeof toggleVariants>["variant"]>;
    size?: NonNullable<VariantProps<typeof toggleVariants>["size"]>;
    class?: string;
    children?: Snippet;
  }

  let {
    value,
    variant = "default",
    size = "default",
    disabled = false,
    class: className,
    children,
    onclick,
    onfocus,
    ...rest
  }: Props = $props();

  const group = getToggleGroup();
  let element = $state<HTMLButtonElement | null>(null);
  const pressed = $derived(group?.isPressed(value) ?? false);
  const isDisabled = $derived((group?.disabled ?? false) || disabled);
  const spacing = $derived(group?.spacing ?? 2);
  const groupVariant = $derived(group?.variant ?? variant);
  const groupSize = $derived(group?.size ?? size);
  const tabStop = $derived(!group || group.tabStop === element);
</script>

<button
  bind:this={element}
  data-slot="toggle-group-item"
  type="button"
  aria-pressed={pressed}
  data-pressed={pressed ? "" : undefined}
  data-disabled={isDisabled ? "" : undefined}
  data-variant={groupVariant}
  data-size={groupSize}
  data-spacing={spacing}
  tabindex={tabStop ? 0 : -1}
  {...rest}
  disabled={isDisabled}
  onfocus={(event) => {
    onfocus?.(event);
    group?.setTabStop(element);
  }}
  onclick={(event) => {
    onclick?.(event);
    group?.toggle(value);
  }}
  class={cn(
    "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:rounded-l-sm group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t-sm group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-r-sm group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b-sm group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
    toggleVariants({ variant: groupVariant, size: groupSize }),
    className,
  )}
>
  {@render children?.()}
</button>
