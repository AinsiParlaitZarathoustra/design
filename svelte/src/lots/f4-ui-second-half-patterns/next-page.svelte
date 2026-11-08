<script lang="ts">
  import type { Snippet } from "svelte";
  import Button from "../../ui/button.svelte";
  import Callout from "../f3-ui-first-half/callout.svelte";

  /**
   * The end of an infinite list, ported from
   * `src/components/patterns/next-page.tsx`: asks for the next page as it comes
   * into view (a little before, so scrolling rarely meets it), shows the list's
   * own skeleton rows while it loads, and a retry if it failed. Nothing at all
   * once there is no next page.
   *
   * It owns no data and no fetching: the app's query says whether there is a
   * next page and whether it is loading or failed, and `onNext` asks for it.
   * A failed page stops the automatic asking; "Try again" asks once more.
   */
  interface Props {
    /** The scrolling element the list lives in. Omitted, the viewport. */
    root?: HTMLElement | null;
    hasNext: boolean;
    fetching: boolean;
    failed: boolean;
    /** Ask for the next page. Need not be stable. */
    onNext: () => void;
    /** Rows shaped like the list's, shown while the next page loads. */
    skeleton?: Snippet;
    /** What failed, in the list's own words. */
    failure: string | Snippet;
    /** The retry button's label. */
    retryLabel?: string;
    /** How far ahead of the end to ask, as an IntersectionObserver margin. */
    rootMargin?: string;
  }

  let {
    root = null,
    hasNext,
    fetching,
    failed,
    onNext,
    skeleton = undefined,
    failure,
    retryLabel = "Try again",
    rootMargin = "0px 0px 400px 0px",
  }: Props = $props();

  let sentinel = $state<HTMLDivElement | null>(null);

  $effect(() => {
    const element = sentinel;
    if (!element || !hasNext || fetching || failed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) onNext();
      },
      { root: root ?? null, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  });
</script>

{#if failed}
  <Callout data-slot="next-page" tone="error" role="alert">
    {#snippet action()}
      <Button variant="secondary" size="sm" onclick={() => onNext()}>{retryLabel}</Button>
    {/snippet}
    {#if typeof failure === "string"}
      {failure}
    {:else}
      {@render failure()}
    {/if}
  </Callout>
{:else if fetching}
  {@render skeleton?.()}
{:else if hasNext}
  <div bind:this={sentinel} data-slot="next-page" aria-hidden="true" class="h-px"></div>
{/if}
