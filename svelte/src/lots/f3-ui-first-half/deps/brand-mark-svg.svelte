<script module lang="ts">
  import type { Snippet } from "svelte";

  /**
   * Props of a brand mark. `title` is the accessible name: unset, the mark is
   * decorative; `title=""` says so too, next to a visible name.
   */
  export interface BrandMarkProps {
    title?: string;
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }
</script>

<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * The frame every labelled brand mark draws in (port of `lib/brand-mark-svg.tsx`).
   * A mark names itself: `title` defaults to the brand's name (`defaultTitle`),
   * and a non-empty name becomes the svg's first child with `role="img"`. Props
   * spread last, so a caller's `viewBox`, `width` or `aria-*` wins.
   *
   * Local adapter: the Svelte port has no shared `lib/brand-mark-svg`, and the
   * primitive is needed only by the brand marks of this lot.
   */
  interface Props extends BrandMarkProps {
    defaultTitle: string;
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
  {#if label}
    <title>{label}</title>
  {/if}
  {@render children?.()}
</svg>
