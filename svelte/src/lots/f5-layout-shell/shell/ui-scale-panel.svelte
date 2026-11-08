<script lang="ts">
  import { Minus, Plus } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Button from "../../../ui/button.svelte";
  import UiScaleStep from "./ui-scale-step.svelte";
  import {
    clampUiScale,
    UI_SCALE_DEFAULT,
    UI_SCALE_MAX,
    UI_SCALE_MIN,
    UI_SCALE_PRESETS,
    UI_SCALE_PREVIEW_CLASS,
    UI_SCALE_STEP,
    type UiScaleShortcuts,
  } from "./ui-scale";

  /**
   * The panel itself, for a menu's submenu or a popover. Ported from
   * `UiScalePanel` in `src/components/shell/ui-scale.tsx`. Props only: the
   * scale and its change are the caller's.
   */
  interface Props {
    scale: number;
    /** Called with a value already clamped to the range and the grid. */
    onScaleChange: (next: number) => void;
    /**
     * Give the stepper's buttons hints ("Smaller ⌘-", "Larger ⌘+") for an app
     * whose shortcuts also zoom. Without it the buttons have no hint.
     */
    shortcuts?: UiScaleShortcuts;
  }

  let { scale, onScaleChange, shortcuts }: Props = $props();

  const set = (next: number) => onScaleChange(clampUiScale(next));
  const pct = $derived(Math.round(scale * 100));
</script>

<div data-slot="ui-scale-panel" class="flex flex-col p-0.5 select-none">
  <div class="flex flex-col gap-0.5 px-1.5 pt-1 pb-2.5">
    <span class="label text-foreground">Interface scale</span>
    <span class="caption">Everything grows together — type, controls, spacing.</span>
  </div>

  <!-- Two surfaces, desktop's agent/model picker recipe: the popover is the
       surround carrying the title and Reset, and the controls sit in an inset
       card on the app's own background, its edge a hairline ring and a small
       shadow. The fills inside are foreground tints. -->
  <div class="overflow-hidden rounded-lg bg-background shadow-sm ring-1 ring-border">
    <div class="flex items-center gap-2 border-b border-foreground/8 px-2 py-1.5">
      <UiScaleStep
        icon={Minus}
        label="Smaller"
        hinted={shortcuts !== undefined}
        shortcut={shortcuts?.decrease}
        disabled={scale <= UI_SCALE_MIN}
        onclick={() => set(scale - UI_SCALE_STEP)}
      />
      <span class="flex-1 text-center text-xs font-medium text-foreground tabular-nums">
        {pct}%
      </span>
      <UiScaleStep
        icon={Plus}
        label="Larger"
        hinted={shortcuts !== undefined}
        shortcut={shortcuts?.increase}
        disabled={scale >= UI_SCALE_MAX}
        onclick={() => set(scale + UI_SCALE_STEP)}
      />
    </div>

    <div class="flex flex-col gap-px p-1">
      {#each UI_SCALE_PRESETS as preset, i (preset.value)}
        {@const active = Math.abs(preset.value - scale) < 0.001}
        <button
          type="button"
          onclick={() => set(preset.value)}
          class={cn(
            "flex h-7 cursor-pointer items-center gap-2 rounded-md px-2 text-left text-xs",
            "transition-colors duration-fast ease-out-strong",
            active
              ? "bg-foreground/8 text-foreground"
              : "text-muted-foreground hover:bg-foreground/6 hover:text-foreground",
          )}
        >
          <span class={cn("w-5 text-center leading-none font-semibold", UI_SCALE_PREVIEW_CLASS[i])}>
            A
          </span>
          <span class="flex-1">{preset.label}</span>
          <span class="text-2xs text-muted-foreground tabular-nums">
            {Math.round(preset.value * 100)}%
          </span>
        </button>
      {/each}
    </div>
  </div>

  <div class="pt-1.5">
    <Button
      variant="ghost"
      size="sm"
      class="w-full"
      disabled={scale === UI_SCALE_DEFAULT}
      onclick={() => set(UI_SCALE_DEFAULT)}
    >
      Reset to default
    </Button>
  </div>
</div>
