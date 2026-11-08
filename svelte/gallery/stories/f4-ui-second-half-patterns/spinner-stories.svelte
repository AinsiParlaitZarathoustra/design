<script lang="ts">
  import Spinner from "../../../src/components/ui/spinner.svelte";
  import Button from "../../../src/ui/button.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

{#if story === "default"}
  <Spinner size="md" label="Loading" />
{:else if story === "sizes"}
  <div class="flex items-center gap-3">
    {#each SIZES as size (size)}
      <Spinner {size} label="Loading" />
    {/each}
  </div>
{:else if story === "in-button"}
  <Button disabled>
    <Spinner size="sm" label="" class="text-current" />
    Saving…
  </Button>
{:else if story === "with-text"}
  <div class="flex items-center gap-2">
    <Spinner size="sm" label="" />
    <span class="caption">Loading sessions…</span>
  </div>
{/if}
