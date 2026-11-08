<script lang="ts">
  import { GitBranch, Pencil, X } from "lucide-svelte";
  import Pill from "../../../src/lots/f4-ui-second-half-patterns/pill.svelte";
  import StatusDot from "../../../src/lots/f4-ui-second-half-patterns/status-dot.svelte";
  import Spinner from "../../../src/components/ui/spinner.svelte";
  import Icon from "../../../src/ui/icon.svelte";
  import IconButton from "../../../src/ui/icon-button.svelte";
  import { cn } from "../../../src/lib/utils";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const TONES = ["neutral", "success", "warning", "error", "info"] as const;
  const MANY = [
    "status:open",
    "project:atlas",
    "agent:codex",
    "author:me",
    "label:design",
    "has:pr",
    "since:7d",
    "model:balanced",
  ];
  const QUEUED = ["Run the tests again", "Then open a PR into the version branch"];
</script>

{#if story === "default"}
  <Pill>status:open</Pill>
{:else if story === "with-icon"}
  <Pill>
    <GitBranch />
    main
  </Pill>
{:else if story === "removable"}
  <Pill>
    project:atlas
    <button
      type="button"
      aria-label="Remove filter"
      class="-mr-1 inline-flex rounded-full text-muted-foreground hover:text-foreground"
    >
      <X class="size-3" />
    </button>
  </Pill>
{:else if story === "status-dots"}
  <div class="flex flex-wrap items-center gap-2">
    {#each TONES as tone (tone)}
      <Pill>
        <StatusDot {tone} />
        {tone}
      </Pill>
    {/each}
  </div>
{:else if story === "many-items"}
  <div class="flex w-96 flex-wrap gap-1.5">
    {#each MANY as t (t)}
      <Pill>{t}</Pill>
    {/each}
  </div>
{:else if story === "long-text"}
  <Pill>project:atlas-desktop-and-every-fork-made-from-it</Pill>
{:else if story === "as-button"}
  <Pill>
    {#snippet child(props)}
      <button {...props} type="button" class={cn(props.class as string, "hover:bg-element-hover")}>
        + Add filter
      </button>
    {/snippet}
  </Pill>
{:else if story === "sizes"}
  <div class="flex items-center gap-2">
    <Pill>
      <GitBranch />
      xs
    </Pill>
    <Pill size="sm">
      <GitBranch />
      sm
    </Pill>
  </div>
{:else if story === "trailing-action"}
  <div class="flex flex-wrap gap-1.5">
    {#each QUEUED as text (text)}
      <Pill size="sm" trailingAction class="max-w-64">
        {#snippet child(props)}
          <div {...props}>
            <button
              type="button"
              class="flex min-w-0 cursor-pointer items-center gap-1 hover:text-foreground"
            >
              <Icon icon={Pencil} size="xs" class="text-muted-foreground" />
              <span class="truncate">{text}</span>
            </button>
            <IconButton icon={X} label="Remove from queue" size="2xs" shape="round" />
          </div>
        {/snippet}
      </Pill>
    {/each}
  </div>
{:else if story === "raised"}
  <div class="relative flex h-28 w-96 items-center justify-center rounded-xl border border-border bg-card">
    <div class="absolute inset-0 rounded-xl bg-background/40"></div>
    <Pill size="sm" surface="raised" class="relative">
      <Spinner size="xs" label="" />
      Syncing tryatlas/design…
    </Pill>
  </div>
{/if}
