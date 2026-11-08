<script lang="ts">
  import NextPage from "../../../src/lots/f4-ui-second-half-patterns/next-page.svelte";
  import Skeleton from "../../../src/lots/f4-ui-second-half-patterns/skeleton.svelte";

  interface Props {
    story?: string;
  }

  let { story = "scrolling" }: Props = $props();

  const PAGE = 12;
  const PAGES = 4;

  /** A list in its own scroller that loads a page as the end comes into view. */
  const failOn = $derived(story === "fails-once" ? 2 : null);

  let scroller = $state<HTMLDivElement | null>(null);
  let pages = $state(1);
  let fetching = $state(false);
  let failed = $state(false);
  // The page `failOn` fails the first time it is asked for, then loads.
  let failedOnce = false;

  function onNext() {
    failed = false;
    fetching = true;
    setTimeout(() => {
      fetching = false;
      if (pages === failOn && !failedOnce) {
        failedOnce = true;
        failed = true;
      } else pages += 1;
    }, 600);
  }

  const rows = [0, 1, 2];
</script>

<div class="flex w-80 flex-col gap-1">
  {#if story === "scrolling" || story === "fails-once"}
    <!-- svelte-ignore a11y_no_noninteractive_tabindex: the source scroller is a focusable region, so a keyboard can scroll what a pointer can. -->
    <div
      bind:this={scroller}
      role="region"
      aria-label="Sessions"
      tabindex="0"
      class="flex h-80 w-80 flex-col gap-1 overflow-y-auto rounded-md border border-border p-2"
    >
      {#each Array.from({ length: pages * PAGE }, (_, i) => i + 1) as session (session)}
        <div
          class="flex h-control-md shrink-0 items-center px-2 text-xs text-secondary-foreground"
        >
          Session {session}
        </div>
      {/each}
      <NextPage
        root={scroller}
        hasNext={pages < PAGES}
        {fetching}
        {failed}
        {onNext}
        failure="Couldn't load more sessions."
      >
        {#snippet skeleton()}
          {#each rows as row (row)}
            <Skeleton class="h-control-md w-full" />
          {/each}
        {/snippet}
      </NextPage>
    </div>
  {:else}
    <NextPage
      hasNext
      fetching={story === "loading"}
      failed={story === "failed"}
      onNext={() => {}}
      failure="Couldn't load more sessions."
    >
      {#snippet skeleton()}
        {#each rows as row (row)}
          <Skeleton class="h-control-md w-full" />
        {/each}
      {/snippet}
    </NextPage>
  {/if}
</div>
