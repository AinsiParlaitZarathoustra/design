<script lang="ts">
  import type { Snippet } from "svelte";
  import { CircleX, InfoIcon, TriangleAlert } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Icon from "../../ui/icon.svelte";
  import CircleCheck from "./deps/circle-check.svelte";
  import { calloutVariants, type CalloutTone, type CalloutVariant } from "./callout-variants";

  /**
   * An inline notice: the one place a tinted fill is correct, because the
   * whole block IS the status. A callout a user can dismiss and never see again
   * should be a toast instead.
   */

  /** On the tucked strip the tone lives on the glyph alone. */
  const TUCKED_GLYPH_TONE: Record<string, string> = {
    neutral: "text-muted-foreground",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
  };

  const TONE_ICON: Record<string, any> = {
    neutral: InfoIcon,
    info: InfoIcon,
    success: CircleCheck,
    warning: TriangleAlert,
    error: CircleX,
  };

  interface Props {
    variant?: CalloutVariant;
    tone?: CalloutTone;
    /** A Lucide icon, or `false` for none. Unset, the tone's icon. */
    icon?: any;
    action?: Snippet;
    /**
     * Rise into place on mount: 6px up and a fade over 200ms. Reduced motion
     * keeps only the fade. There is no matching exit.
     */
    animate?: boolean;
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let {
    variant = "default",
    tone = "neutral",
    icon,
    action,
    animate = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const Glyph = $derived(icon === false ? null : (icon ?? TONE_ICON[tone ?? "neutral"]));
  const tucked = $derived(variant === "tucked");
</script>

<div
  data-slot="callout"
  role="status"
  class={cn(
    calloutVariants({ variant, tone }),
    animate && "motion-safe:animate-pill-in motion-reduce:animate-fade-in",
    className,
  )}
  {...rest}
>
  {#if Glyph}
    <Icon
      icon={Glyph}
      size="sm"
      class={tucked ? cn("shrink-0", TUCKED_GLYPH_TONE[tone ?? "neutral"]) : "mt-px"}
    />
  {/if}
  {#if tucked}
    <div class="min-w-0 flex-1 truncate text-muted-foreground">{@render children?.()}</div>
  {:else}
    <div class="flex-1 text-pretty">{@render children?.()}</div>
  {/if}
  {#if tucked && action}
    <div data-slot="callout-action" class="ml-1.5 flex shrink-0 items-center gap-0.5">
      {@render action()}
    </div>
  {:else if action}
    {@render action()}
  {/if}
</div>
