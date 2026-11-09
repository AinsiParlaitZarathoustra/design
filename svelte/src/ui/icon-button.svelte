<script lang="ts">
  import type { Snippet } from "svelte";
  import { claimHintLabel } from "./hint-context";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../lib/utils";
  import { iconButtonVariants } from "./icon-button-variants";
  import Icon, { type IconSize } from "./icon.svelte";

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
    iconSize?: IconSize;
    loading?: boolean;
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
    type = "button",
    disabled = false,
    children,
    ...rest
  }: Props = $props();

  // Inside a `Hint`, the hint's label names the button unless it is labelled by
  // another element, as the source's `hintTriggerProps` does.
  const hintLabel = claimHintLabel();
</script>

<button
  data-slot="icon-button"
  data-loading={loading || undefined}
  aria-busy={loading || undefined}
  {type}
  {disabled}
  data-disabled={disabled || undefined}
  aria-label={hintLabel !== undefined && rest["aria-labelledby"] === undefined ? hintLabel : label}
  {...rest}
  class={cn(iconButtonVariants({ variant, size, shape, active }), className)}
>
  {#if loading}
    <span data-slot="icon-button-spin" class="flex shrink-0 animate-spin">
      {#if icon}<Icon icon={icon} size={iconSize ?? GLYPH_FOR_SIZE[size ?? "md"] ?? "sm"} />{:else}{@render children?.()}{/if}
    </span>
  {:else if icon}
    <Icon icon={icon} size={iconSize ?? GLYPH_FOR_SIZE[size ?? "md"] ?? "sm"} />
  {:else}
    {@render children?.()}
  {/if}
</button>
