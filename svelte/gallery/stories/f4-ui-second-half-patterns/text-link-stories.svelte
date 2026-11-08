<script lang="ts">
  import TextLink from "../../../src/lots/f4-ui-second-half-patterns/text-link.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();
</script>

{#if story === "default"}
  <TextLink href="#">View all sessions</TextLink>
{:else if story === "muted"}
  <TextLink href="#" tone="muted">Privacy</TextLink>
{:else if story === "standalone-and-prose"}
  <div class="flex max-w-md flex-col gap-4 text-sm">
    <div class="flex gap-4">
      <TextLink href="#">View all</TextLink>
      <TextLink href="#" tone="muted">Privacy</TextLink>
      <TextLink href="#" tone="muted">Terms</TextLink>
    </div>
    <div class="prose-session">
      <p>
        Sessions settle after a week without activity. Read <a href="#settling">how settling works</a>
        before you change the default.
      </p>
    </div>
  </div>
{/if}
