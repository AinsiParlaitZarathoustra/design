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
  import { Filter, Minus, MoreHorizontal, Plus, RefreshCw, Settings, Trash2, X } from "lucide-svelte";
  import Hint from "../../src/ui/hint.svelte";
  import Icon from "../../src/ui/icon.svelte";

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

  let sending = $state(false);
  let ringing = $state(false);
</script>

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
{/if}
