<script lang="ts">
  import {
    BellGlyph,
    CopyGlyph,
    MenuGlyph,
    PlusMinusGlyph,
    RailGlyph,
    SendGlyph,
    TrashGlyph,
  } from "../../src/lots/f1-primitives-forms/animated-icon";
  import IconButton from "../../src/lots/f1-primitives-forms/icon-button.svelte";
  import {
    Copy,
    Filter,
    GitBranch,
    Minus,
    MoreHorizontal,
    Plus,
    RefreshCw,
    Settings,
    Share2,
    Trash2,
    X,
  } from "lucide-svelte";
  import Hint from "../../src/ui/hint.svelte";
  import Icon from "../../src/ui/icon.svelte";
  import {
    HintGroup,
    HintItem,
    ScrollArea,
    ScrollFade,
    useScrollEdges,
  } from "../../src/lots/f1-primitives-forms";

  interface Props {
    story?: string;
  }

  let { story = "off" }: Props = $props();

  const VARIANTS = [
    "ghost",
    "default",
    "secondary",
    "outline",
    "hairline",
    "destructive",
    "ghost-destructive",
    "floating",
  ] as const;
  const SIZES = ["2xs", "xs", "sm", "md", "lg"] as const;

  const HINT_ACTIONS = [
    { icon: RefreshCw, label: "Refresh" },
    { icon: GitBranch, label: "Switch branch" },
    { icon: Copy, label: "Copy link" },
    { icon: Share2, label: "Share with team" },
    { icon: Trash2, label: "Delete" },
  ];
  const SCROLL_ROWS = Array.from(
    { length: 30 },
    (_, i) => `Session ${i + 1}: refactor the settings panel`,
  );

  let sending = $state(false);
  let ringing = $state(false);

  let fadeRef = $state<HTMLDivElement | null>(null);
  const fadeRows = $derived(story === "scroll-fade-short-list" ? 4 : 30);
  const fadeEdges = useScrollEdges(
    () => fadeRef,
    () => fadeRows,
  );
</script>

{#snippet hintDemo(side: "top" | "bottom", disabledLast: boolean)}
  <div class={side === "top" ? "flex min-h-32 items-end" : "flex min-h-32 items-start"}>
    <HintGroup {side}>
      <div class="flex gap-1 rounded-md border border-border p-1">
        {#each HINT_ACTIONS as action, i (action.label)}
          <HintItem label={action.label}>
            <IconButton
              icon={action.icon}
              label={action.label}
              disabled={disabledLast && i === HINT_ACTIONS.length - 1}
            />
          </HintItem>
        {/each}
      </div>
    </HintGroup>
  </div>
{/snippet}

{#snippet gallery(on: boolean)}
  <div class="grid w-fit grid-cols-3 gap-2">
    <div class="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3">
      <CopyGlyph copied={on} size="lg" />
      <span class="caption">CopyGlyph</span>
    </div>
    <div class="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3">
      <TrashGlyph armed={on} size="lg" />
      <span class="caption">TrashGlyph</span>
    </div>
    <div class="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3">
      <RailGlyph open={on} size="lg" />
      <span class="caption">RailGlyph</span>
    </div>
    <div class="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3">
      <MenuGlyph active={on} size="lg" />
      <span class="caption">MenuGlyph</span>
    </div>
    <div class="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3">
      <PlusMinusGlyph open={on} size="lg" />
      <span class="caption">PlusMinusGlyph</span>
    </div>
    <div class="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3">
      <BellGlyph muted={on} size="lg" />
      <span class="caption">BellGlyph</span>
    </div>
  </div>
{/snippet}

{#if story === "off"}
  {@render gallery(false)}
{:else if story === "on"}
  {@render gallery(true)}
{:else if story === "one-shots"}
  <div class="flex gap-3">
    <button
      type="button"
      class="label flex items-center gap-2 rounded border border-border px-3 py-1.5 hover:bg-element-hover"
      onclick={() => (sending = true)}
    >
      <SendGlyph {sending} onAnimationEnd={() => (sending = false)} />
      Send
    </button>
    <button
      type="button"
      class="label flex items-center gap-2 rounded border border-border px-3 py-1.5 hover:bg-element-hover"
      onclick={() => (ringing = true)}
    >
      <BellGlyph {ringing} onAnimationEnd={() => (ringing = false)} />
      Ring
    </button>
  </div>
{:else if story === "default"}
  <IconButton icon={Settings} label="Settings" />
{:else if story === "variants"}
  <div class="flex items-center gap-2">
    {#each VARIANTS as variant (variant)}
      <IconButton icon={Settings} label={variant} {variant} />
    {/each}
  </div>
{:else if story === "sizes"}
  <div class="flex items-center gap-2">
    {#each SIZES as size (size)}
      <IconButton icon={Settings} label={`Size ${size}`} {size} />
    {/each}
  </div>
{:else if story === "ghost-destructive"}
  <IconButton icon={Trash2} label="Delete" variant="ghost-destructive" />
{:else if story === "active"}
  <IconButton icon={Filter} label="Filter" active />
{:else if story === "pressed"}
  <IconButton icon={Settings} label="Settings" aria-pressed={true} />
{:else if story === "round-stepper"}
  <div class="flex items-center gap-2">
    <IconButton icon={Minus} label="Smaller" shape="round" variant="outline" />
    <span class="label tnum w-10 text-center">100%</span>
    <IconButton icon={Plus} label="Larger" shape="round" variant="outline" />
  </div>
{:else if story === "disabled"}
  <div class="flex items-center gap-2">
    <IconButton icon={RefreshCw} label="Refresh" disabled />
    <Hint label="Nothing to refresh yet" wrap>
      <IconButton icon={RefreshCw} label="Refresh" disabled />
    </Hint>
    <Hint label="Nothing to refresh yet" wrap>
      <IconButton icon={RefreshCw} label="Refresh" disabled focusableWhenDisabled />
    </Hint>
  </div>
{:else if story === "with-hint"}
  <div class="flex items-center gap-1">
    <Hint label="More actions">
      <IconButton icon={MoreHorizontal} label="More actions" />
    </Hint>
    <Hint label="Close" shortcut="Esc">
      <IconButton icon={X} label="Close" />
    </Hint>
  </div>
{:else if story === "element-icon"}
  <div class="flex items-center gap-1">
    <IconButton label="Refreshing" size="xs">
      <Icon icon={RefreshCw} size="xs" class="animate-spin" />
    </IconButton>
    <IconButton label="Show sidebar" size="xs" aria-pressed={true}>
      <RailGlyph open size="xs" />
    </IconButton>
  </div>
{:else if story === "tile-remove"}
  <div class="relative size-16 rounded-lg border border-border bg-muted">
    <IconButton
      icon={X}
      label="Remove image"
      size="2xs"
      shape="round"
      variant="outline"
      class="absolute -top-1.5 -right-1.5"
    />
  </div>
{:else if story === "floating"}
  <div
    class="relative size-16 rounded-lg border border-border bg-linear-to-br from-primary to-success"
  >
    <IconButton
      icon={X}
      label="Remove image"
      size="2xs"
      shape="round"
      variant="floating"
      class="absolute -top-1.5 -right-1.5"
    />
  </div>
{:else if story === "loading"}
  <div class="flex items-center gap-1">
    <IconButton icon={RefreshCw} label="Refresh models" size="xs" loading />
    <IconButton label="Sync" size="xs" loading>
      <RailGlyph open size="xs" />
    </IconButton>
    <IconButton icon={RefreshCw} label="Refresh models, idle" size="xs" loading={false} />
  </div>
{:else if story === "hint-default"}
  {@render hintDemo("bottom", false)}
{:else if story === "hint-opens-upward"}
  {@render hintDemo("top", false)}
{:else if story === "hint-with-disabled"}
  {@render hintDemo("bottom", true)}
{:else if story === "scroll-area-default"}
  <ScrollArea
    role="region"
    aria-label="Sessions"
    tabindex={0}
    class="h-48 w-72 rounded-md border border-border"
  >
    {#each SCROLL_ROWS as row (row)}
      <div class="label border-b border-border-subtle px-3 py-1.5">{row}</div>
    {/each}
  </ScrollArea>
{:else if story === "scroll-area-empty"}
  <ScrollArea class="flex h-48 w-72 items-center justify-center rounded-md border border-border">
    <span class="caption">No sessions yet</span>
  </ScrollArea>
{:else if story === "scroll-fade-default" || story === "scroll-fade-short-list"}
  <div class="relative w-72 overflow-hidden rounded-md border border-border bg-card">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      bind:this={fadeRef}
      role="region"
      aria-label="Rows"
      tabindex={0}
      class="h-56 overflow-auto"
    >
      {#each Array.from({ length: fadeRows }, (_, i) => i) as index (index)}
        <div class="label border-b border-border-subtle px-3 py-1.5">Row {index + 1}</div>
      {/each}
    </div>
    <ScrollFade at="top" visible={fadeEdges.top} class="from-card" />
    <ScrollFade at="bottom" visible={fadeEdges.bottom} class="from-card" />
  </div>
{/if}
