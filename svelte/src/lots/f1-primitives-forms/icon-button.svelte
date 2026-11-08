<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../../lib/utils";
  import { iconButtonVariants } from "../../ui/icon-button-variants";
  import Icon, { type IconSize } from "../../ui/icon.svelte";

  /**
   * A square, icon-only button, ported from `IconButton` in
   * `src/ui/icon-button.tsx`. `label` is required and becomes the `aria-label`;
   * wrap the control in `Hint` to show the same string.
   *
   * The square is a control height and the glyph inside is one step down from
   * it (`GLYPH_FOR_SIZE`): xs 20px → icon xs, sm 24px → icon sm, md 26px →
   * icon sm, lg 32px → icon md, and 2xs (16px, icon xs) below the ladder.
   *
   * `icon` is a Lucide Svelte component, drawn through `Icon` at the square's
   * step. A glyph that is not a plain Lucide icon goes in `children`, drawn as
   * given (React passed an element as `icon`). `focusableWhenDisabled` keeps a
   * disabled control in the tab order with `aria-disabled` instead of the
   * native `disabled`, as the React `Button` base does.
   */

  /** The glyph step that sits inside each square. */
  const GLYPH_FOR_SIZE: Record<string, IconSize> = {
    "2xs": "xs",
    xs: "xs",
    sm: "sm",
    md: "sm",
    lg: "md",
  };

  interface Props extends Omit<HTMLButtonAttributes, "class" | "children"> {
    /** A Lucide Svelte component. For another glyph, use `children`. */
    icon?: any;
    /** Required: an icon-only control has no visible name. */
    label: string;
    variant?: VariantProps<typeof iconButtonVariants>["variant"];
    size?: VariantProps<typeof iconButtonVariants>["size"];
    shape?: VariantProps<typeof iconButtonVariants>["shape"];
    active?: boolean;
    /** Override the glyph step. Applies to a Lucide component only. */
    iconSize?: IconSize;
    /** Work this button started is running: its glyph turns and the button is `aria-busy`. */
    loading?: boolean;
    /** Keep a disabled control focusable, with `aria-disabled` rather than `disabled`. */
    focusableWhenDisabled?: boolean;
    class?: string;
    children?: Snippet;
  }

  let {
    class: className,
    variant = "ghost",
    size = "md",
    shape = "square",
    active = false,
    icon,
    label,
    iconSize,
    loading = false,
    focusableWhenDisabled = false,
    type = "button",
    disabled = false,
    onclick,
    children,
    ...rest
  }: Props = $props();

  const glyphSize = $derived(iconSize ?? GLYPH_FOR_SIZE[size ?? "md"] ?? "sm");
</script>

<button
  data-slot="icon-button"
  data-loading={loading || undefined}
  aria-busy={loading || undefined}
  {type}
  disabled={disabled && !focusableWhenDisabled}
  aria-disabled={disabled && focusableWhenDisabled ? "true" : undefined}
  data-disabled={disabled || undefined}
  aria-label={label}
  {...rest}
  onclick={(event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onclick?.(event);
  }}
  class={cn(iconButtonVariants({ variant, size, shape, active }), className)}
>
  {#if loading}
    <span data-slot="icon-button-spin" class="flex shrink-0 animate-spin">
      {#if icon}<Icon {icon} size={glyphSize} />{:else}{@render children?.()}{/if}
    </span>
  {:else if icon}
    <Icon {icon} size={glyphSize} />
  {:else}
    {@render children?.()}
  {/if}
</button>
