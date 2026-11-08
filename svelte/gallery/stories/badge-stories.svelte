<script lang="ts">
  import { CircleCheck, TriangleAlert } from "lucide-svelte";
  import Badge from "../../src/ui/badge.svelte";
  import Icon from "../../src/ui/icon.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const VARIANTS = [
    "default",
    "secondary",
    "outline",
    "success",
    "warning",
    "severe",
    "destructive",
    "info",
  ] as const;
</script>

{#if story === "default"}
  <Badge>Running</Badge>
{:else if story === "variants"}
  <div class="flex flex-wrap items-center gap-2">
    {#each VARIANTS as variant}
      <Badge {variant}>{variant}</Badge>
    {/each}
  </div>
{:else if story === "sizes"}
  <div class="flex items-center gap-2">
    <Badge size="sm">Small</Badge>
    <Badge size="md">Medium</Badge>
  </div>
{:else if story === "with-icon"}
  <div class="flex items-center gap-2">
    <Badge variant="success">
      <Icon icon={CircleCheck} size="xs" />
      Passed
    </Badge>
    <Badge variant="warning">
      <Icon icon={TriangleAlert} size="xs" />
      Needs review
    </Badge>
  </div>
{:else if story === "long-text"}
  <Badge>Waiting for approval from the repository owner</Badge>
{:else if story === "empty"}
  <Badge></Badge>
{/if}
