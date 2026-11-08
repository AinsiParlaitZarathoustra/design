<script lang="ts">
  import { Bell } from "lucide-svelte";
  import StatusDot, { type StatusDotTone } from "../../../src/lots/f4-ui-second-half-patterns/status-dot.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const TONES: StatusDotTone[] = [
    "neutral",
    "subtle",
    "success",
    "warning",
    "error",
    "info",
    "primary",
    "foreground",
  ];
  const SIZES = ["xs", "sm", "md", "lg"] as const;
</script>

{#if story === "default"}
  <StatusDot tone="success" size="sm" hollow={false} />
{:else if story === "tones"}
  <div class="flex flex-col gap-2 text-xs text-secondary-foreground">
    {#each TONES as tone (tone)}
      <div class="flex items-center gap-3">
        <StatusDot {tone} />
        <StatusDot {tone} hollow />
        {tone}
      </div>
    {/each}
  </div>
{:else if story === "sizes"}
  <div class="flex items-center gap-3">
    {#each SIZES as size (size)}
      <StatusDot tone="success" {size} />
    {/each}
  </div>
{:else if story === "on-an-icon"}
  <span class="relative inline-flex text-muted-foreground">
    <Bell class="size-4" />
    <StatusDot tone="primary" label="Unread" class="absolute -top-0.5 -right-0.5" />
  </span>
{/if}
