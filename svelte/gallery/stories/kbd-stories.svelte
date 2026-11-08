<script lang="ts">
  import Kbd from "../../src/ui/kbd.svelte";
  import KbdCombo from "../../src/ui/kbd-combo.svelte";
  import KbdKeys from "../../src/ui/kbd-keys.svelte";
  import Button from "../../src/ui/button.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const PLATFORM_COMBOS = ["⌘K", "⌘⇧F", "⌥Space", "⌃⌘Q", "⌥⌘C"];
</script>

{#if story === "default"}
  <Kbd text="⌘" />
{:else if story === "sizes"}
  <div class="flex items-center gap-2">
    <Kbd size="xs" text="K" />
    <Kbd size="sm" text="K" />
  </div>
{:else if story === "combo"}
  <div class="flex flex-col items-start gap-2">
    <KbdCombo combo="⌘⇧F" platform="mac" />
    <KbdCombo combo="⌥Space" platform="mac" />
    <KbdKeys keys={["Ctrl", "Shift", "P"]} />
  </div>
{:else if story === "variants"}
  <div class="flex items-center gap-3">
    <Kbd text="Esc" />
    <Kbd variant="soft" text="↑" />
    <Button>
      Run
      <Kbd variant="inverse" text="↵" />
    </Button>
  </div>
{:else if story === "platforms"}
  <div
    class="grid grid-cols-[auto_auto_auto] items-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
  >
    <span></span>
    <span>mac</span>
    <span>other</span>
    {#each PLATFORM_COMBOS as combo}
      <div class="contents">
        <span class="font-mono">{combo}</span>
        <KbdCombo {combo} platform="mac" />
        <KbdCombo {combo} platform="other" />
      </div>
    {/each}
  </div>
{:else if story === "long-text"}
  <Kbd text="Backspace" />
{/if}
