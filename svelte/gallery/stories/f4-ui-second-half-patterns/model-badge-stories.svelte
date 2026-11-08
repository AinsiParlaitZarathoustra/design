<script lang="ts">
  import ModelBadge from "../../../src/lots/f4-ui-second-half-patterns/model-badge.svelte";
  import ModelMark from "../../../src/lots/f4-ui-second-half-patterns/model-mark.svelte";
  import { agentFamily, familyOf, type ModelFamily } from "../../../src/lots/f4-ui-second-half-patterns/model-family";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const FAMILIES: [ModelFamily, string][] = [
    ["claude", "claude-opus-4"],
    ["openai", "gpt-5-codex"],
    ["gemini", "gemini-2.5-pro"],
    ["cursor", "cursor-small"],
    ["opencode", "opencode-zen"],
  ];
  const AGENTS = ["Claude Code", "Codex", "Gemini CLI", "Cursor", "OpenCode"];
</script>

{#if story === "default"}
  <ModelBadge model="claude-opus-4" />
{:else if story === "families"}
  <div class="flex flex-wrap items-center gap-2">
    {#each FAMILIES as [family, model] (family)}
      <ModelBadge {model} {family} />
    {/each}
  </div>
{:else if story === "sizes"}
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <ModelBadge model="claude-opus-4" />
      <ModelBadge model="claude-opus-4" size="2xs" />
    </div>
    <p class="body flex items-center gap-1.5 text-secondary-foreground">
      Ran on <ModelBadge model="gpt-5-codex" size="2xs" /> for 4m 12s.
    </p>
  </div>
{:else if story === "unknown"}
  <ModelBadge model="llama-3.1-70b" />
{:else if story === "explicit-family"}
  <ModelBadge model="my-proxy-model" family="claude" />
{:else if story === "long-name"}
  <ModelBadge model="claude-sonnet-4-5-20250929-extended-thinking-preview" class="max-w-40" />
{:else if story === "marks"}
  <div class="flex flex-col gap-2">
    {#each AGENTS as agent (agent)}
      {@const family = agentFamily(agent)}
      <span class="label inline-flex items-center gap-2">
        {#if family}
          <ModelMark {family} class="size-3.5" />
        {/if}
        {agent}
        <span class="caption">{family ?? familyOf(agent) ?? "unknown"}</span>
      </span>
    {/each}
  </div>
{/if}
