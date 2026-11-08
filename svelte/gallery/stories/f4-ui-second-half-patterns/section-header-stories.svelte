<script lang="ts">
  import { GitPullRequest, Plus } from "lucide-svelte";
  import SectionHeader from "../../../src/lots/f4-ui-second-half-patterns/section-header.svelte";
  import PageHeader from "../../../src/lots/f4-ui-second-half-patterns/page-header.svelte";
  import Button from "../../../src/ui/button.svelte";
  import Icon from "../../../src/ui/icon.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();
</script>

<div class="w-120">
  {#if story === "default"}
    <SectionHeader title="Recent sessions" description="The last seven days, newest first" />
  {:else if story === "title-only"}
    <SectionHeader title="Recent sessions" />
  {:else if story === "with-action"}
    <SectionHeader title="Recent sessions" description="The last seven days, newest first">
      {#snippet action()}
        <Button variant="ghost" size="sm">View all</Button>
      {/snippet}
    </SectionHeader>
  {:else if story === "with-icon"}
    <SectionHeader icon={GitPullRequest} description="Waiting for your review">
      {#snippet title()}
        Pull requests <span class="ml-1 tabular-nums text-foreground">3</span>
      {/snippet}
    </SectionHeader>
  {:else if story === "long-text"}
    <SectionHeader
      title="Sessions shared with you by teammates in every project you can read"
      description="Includes sessions from projects attached read-only; the agent asks before it writes to any of them"
    />
  {:else if story === "page"}
    <div class="flex flex-col gap-6">
      <PageHeader title="Usage" description="Tokens, sessions and spend across the workspace">
        {#snippet action()}
          <Button size="sm">
            <Icon icon={Plus} size="sm" />
            New budget
          </Button>
        {/snippet}
      </PageHeader>
      <PageHeader
        title="A page title long enough that it has to truncate at the edge of its column"
        description="And a description that is also long enough to truncate rather than wrap onto a second line"
      />
    </div>
  {/if}
</div>
