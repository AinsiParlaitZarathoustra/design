<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import type { BrandMarkProps } from "./brand-mark-types";

  /**
   * The frame every labelled brand mark draws in (`lib/brand-mark-svg.tsx`).
   * A non-empty title becomes the svg's first child and the svg gets
   * `role="img"`; `title=""` makes the mark decorative (`aria-hidden`). Props
   * spread last, so a caller's `viewBox`, `width` or `aria-*` wins.
   */
  interface Props extends BrandMarkProps {
    defaultTitle: string;
    children?: Snippet;
  }

  let { title, defaultTitle, class: className, children, ...rest }: Props = $props();
  const label = $derived(title ?? defaultTitle);
</script>

<svg
  viewBox="0 0 24 24"
  width="16"
  height="16"
  role={label ? "img" : undefined}
  aria-hidden={label ? undefined : "true"}
  class={cn("shrink-0", className)}
  {...rest}
>
  {#if label}<title>{label}</title>{/if}
  {@render children?.()}
</svg>
