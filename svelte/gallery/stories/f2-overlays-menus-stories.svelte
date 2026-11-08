<script lang="ts">
  import { Bold, Italic, RefreshCw, Underline } from "lucide-svelte";
  import {
    ColorHueSlider,
    ColorSaturationValuePlane,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../../src/lots/f2-overlays-menus/index";
  import IconButton from "../../src/ui/icon-button.svelte";
  import Hint from "../../src/lots/f2-overlays-menus/tooltip-hint.svelte";
  import { hsvToHex, type HsvColor } from "../../src/theme/color";

  interface Props {
    story?: string;
  }

  let { story = "color-picker-default" }: Props = $props();

  // Each colour picker story owns its colour, as the source's `Picker` does.
  let pickerDefault = $state<HsvColor>({ h: 210, s: 0.6, v: 0.9 });
  let pickerRed = $state<HsvColor>({ h: 0, s: 0.8, v: 0.9 });
  let pickerBlack = $state<HsvColor>({ h: 0, s: 0, v: 0 });
  let hueAlone = $state(120);

  interface TooltipDemo {
    open?: boolean;
    label?: string;
    shortcut?: string;
    side?: "top" | "bottom" | "left" | "right";
  }
</script>

{#snippet picker(hsv: HsvColor, setHsv: (next: HsvColor) => void)}
  <div class="flex w-64 flex-col gap-3">
    <ColorSaturationValuePlane label="Saturation and brightness" value={hsv} onChange={setHsv} />
    <ColorHueSlider label="Hue" value={hsv.h} onChange={(h) => setHsv({ ...hsv, h })} />
    <div class="flex items-center gap-2">
      <span
        class="size-control-sm rounded border border-border"
        style="background: {hsvToHex(hsv)};"
        aria-hidden="true"
      ></span>
      <code class="code">{hsvToHex(hsv)}</code>
    </div>
  </div>
{/snippet}

{#snippet tooltipDemo(demo: TooltipDemo)}
  {@const label = demo.label ?? "Refresh"}
  {#snippet refreshTrigger(props: Record<string, unknown>)}
    <IconButton {...props} icon={RefreshCw} {label} variant="outline" />
  {/snippet}
  <div class="flex min-h-40 items-center justify-center">
    <Tooltip open={demo.open}>
      <TooltipTrigger child={refreshTrigger} />
      <TooltipContent side={demo.side ?? "top"} sideOffset={4}>
        {label}{#if demo.shortcut}<span class="ml-1.5 text-muted-foreground">{demo.shortcut}</span>{/if}
      </TooltipContent>
    </Tooltip>
  </div>
{/snippet}

{#snippet boldTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={Bold} label="Bold" />
{/snippet}

{#snippet italicTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={Italic} label="Italic" />
{/snippet}

{#snippet underlineTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={Underline} label="Underline" />
{/snippet}

{#snippet commandTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={RefreshCw} label="Command palette" variant="outline" />
{/snippet}

{#if story === "color-picker-default"}
  {@render picker(pickerDefault, (next) => (pickerDefault = next))}
{:else if story === "color-picker-red"}
  {@render picker(pickerRed, (next) => (pickerRed = next))}
{:else if story === "color-picker-black"}
  {@render picker(pickerBlack, (next) => (pickerBlack = next))}
{:else if story === "color-hue-slider-alone"}
  <div class="w-64">
    <ColorHueSlider label="Hue" value={hueAlone} onChange={(next) => (hueAlone = next)} />
  </div>
{:else if story === "tooltip-default" || story === "tooltip-exit"}
  {@render tooltipDemo({ shortcut: "⌘R" })}
{:else if story === "tooltip-open"}
  {@render tooltipDemo({ open: true, shortcut: "⌘R" })}
{:else if story === "tooltip-open-below"}
  {@render tooltipDemo({ open: true, shortcut: "⌘R", side: "bottom" })}
{:else if story === "tooltip-long-text"}
  {@render tooltipDemo({
    open: true,
    label: "Refresh the list of pull requests waiting for your review across every attached project",
  })}
{:else if story === "tooltip-hint-row"}
  <TooltipProvider>
    <div class="flex gap-1">
      <Hint label="Bold" shortcut="⌘B">{#snippet child(props)}{@render boldTrigger(props)}{/snippet}</Hint>
      <Hint label="Italic" shortcut="⌘I">{#snippet child(props)}{@render italicTrigger(props)}{/snippet}</Hint>
      <Hint label="Underline" shortcut="⌘U">{#snippet child(props)}{@render underlineTrigger(props)}{/snippet}</Hint>
    </div>
  </TooltipProvider>
{:else if story === "tooltip-hint-keycaps"}
  <div class="flex min-h-40 items-center justify-center">
    <Hint label="Command palette" shortcut="⌘⇧P" side="top">
      {#snippet child(props)}{@render commandTrigger(props)}{/snippet}
    </Hint>
  </div>
{/if}
