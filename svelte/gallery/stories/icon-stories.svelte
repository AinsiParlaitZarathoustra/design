<script lang="ts">
  import { Bell, FileText, GitBranch, Search, Settings, Terminal } from "lucide-svelte";
  import Icon, { ICON_SIZES } from "../../src/ui/icon.svelte";
  import type { IconSize } from "../../src/ui/icon.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const SIZES = Object.keys(ICON_SIZES) as IconSize[];
  const GLYPHS = [Search, Bell, FileText, GitBranch, Settings, Terminal];
</script>

{#if story === "default"}
  <Icon icon={Search} />
{:else if story === "sizes"}
  <div class="flex items-end gap-4">
    {#each SIZES as size}
      <div class="flex flex-col items-center gap-1.5">
        <Icon icon={Search} {size} />
        <span class="caption">{size} · {ICON_SIZES[size]}</span>
      </div>
    {/each}
  </div>
{:else if story === "muted"}
  <div class="flex items-center gap-3 text-muted-foreground">
    {#each GLYPHS as glyph}
      <Icon icon={glyph} />
    {/each}
  </div>
{:else if story === "beside-text"}
  <span class="label inline-flex items-center gap-1.5">
    <Icon icon={GitBranch} size="sm" class="text-muted-foreground" />
    main
  </span>
{/if}
