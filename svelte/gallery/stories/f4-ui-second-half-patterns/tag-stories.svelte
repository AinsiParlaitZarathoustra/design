<script lang="ts">
  import Tag from "../../../src/lots/f4-ui-second-half-patterns/tag.svelte";
  import HueDot from "../../../src/lots/f4-ui-second-half-patterns/hue-dot.svelte";
  import LabelMark from "../../../src/lots/f4-ui-second-half-patterns/label-mark.svelte";
  import { HUES } from "../../../src/lib/hue";
  import { BUILT_IN_THEMES } from "../../themes";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const APPEARANCES = ["dark", "light"] as const;
  // The `{#if}` blocks keep the three text nodes of the oracle's "{name} · {appearance}".
  // Without them Svelte merges the text into one node, and the glyphs shape a subpixel apart.
  const ROWS = [
    ["Refactor settings", "purple", "design"],
    ["Fix flaky terminal test", "red", "bug"],
    ["Port the timeline", "blue", "desktop"],
    ["Theme import", "green", "themes"],
  ] as const;
</script>

{#if story === "default"}
  <Tag hue="purple" dot={false}>design</Tag>
{:else if story === "with-dot"}
  <Tag hue="purple" dot={true}>design</Tag>
{:else if story === "no-hue"}
  <Tag hue="grey" dot={false}>unlabelled</Tag>
{:else if story === "all-hues"}
  <div class="flex flex-wrap items-center gap-1.5">
    {#each HUES as hue (hue)}
      <Tag {hue} dot={false}>{hue}</Tag>
    {/each}
  </div>
{:else if story === "every-theme"}
  <div class="flex flex-col gap-1">
    {#each BUILT_IN_THEMES as theme (theme.id)}
      {#each APPEARANCES as appearance (appearance)}
        <div
          data-theme={theme.id}
          data-appearance={appearance}
          class="flex flex-wrap items-center gap-1.5 rounded-md bg-background px-3 py-2"
        >
          <span class="w-44 text-xs text-muted-foreground">{#if theme.name}{theme.name}{/if} · {#if appearance}{appearance}{/if}</span>
          {#each HUES as hue (hue)}
            <Tag {hue} dot={false}>{hue}</Tag>
          {/each}
        </div>
      {/each}
    {/each}
  </div>
{:else if story === "label-marks"}
  <div class="flex w-72 flex-col">
    {#each ROWS as [title, hue, label] (title)}
      <div class="flex items-center justify-between gap-2 border-b border-border-subtle px-2 py-1.5 last:border-0">
        <span class="label truncate">{title}</span>
        <LabelMark {hue}>{label}</LabelMark>
      </div>
    {/each}
  </div>
{:else if story === "dots"}
  <div class="flex items-center gap-2">
    {#each HUES as hue (hue)}
      <HueDot {hue} />
    {/each}
  </div>
{:else if story === "long-text"}
  <Tag hue="purple" dot={false}>design-system-and-every-theme-built-from-it</Tag>
{/if}
