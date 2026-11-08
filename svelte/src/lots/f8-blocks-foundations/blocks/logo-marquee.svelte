<script lang="ts" module>
  import type { Snippet } from "svelte";

  /**
   * The company, as the accessible name of its slot, and its mark. The marks
   * are the caller's; the package ships none, so `mark` is a snippet.
   */
  export type Logo = {
    name: string;
    mark: Snippet;
  };
</script>

<script lang="ts">
  import { cn } from "../../../lib/utils";
  import InfiniteSlider from "./infinite-slider.svelte";

  /**
   * A social-proof logo cloud: an `InfiniteSlider` whose ends fade out on a
   * plain linear mask, so marks slide in and out of transparency rather than
   * being sliced at the edge. A mask rather than a gradient overlay, so it
   * works on any surface without knowing its colour.
   */
  interface Props {
    logos: Array<Logo>;
    label?: string;
    class?: string;
    /**
     * On the moving strip only, so it can bleed past its container's padding
     * (`-mx-*`) and fade into the edge of the surface while the label stays
     * on the text column.
     */
    trackClass?: string;
  }

  let {
    logos,
    label = "Trusted by engineers at",
    class: className,
    trackClass,
  }: Props = $props();
</script>

<div data-slot="logo-marquee" class={cn("flex flex-col gap-4", className)}>
  {#if label}
    <p class="eyebrow">{label}</p>
  {/if}
  <div class={cn("mask-x-from-[calc(100%-6rem)] mask-x-to-100%", trackClass)}>
    <InfiniteSlider gap={56} speed={40} speedOnHover={12}>
      {#each logos as logo (logo.name)}
        <span
          role="img"
          aria-label={logo.name}
          class={cn(
            "flex shrink-0 items-center text-muted-foreground",
            "opacity-90 transition-opacity duration-base ease-out-strong hover:opacity-100",
          )}
        >
          {@render logo.mark()}
        </span>
      {/each}
    </InfiniteSlider>
  </div>
</div>
