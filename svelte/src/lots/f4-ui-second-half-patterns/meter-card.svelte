<script lang="ts">
  import { cn } from "../../lib/utils";
  import SegmentMeter from "./segment-meter.svelte";
  import type { LabelTone } from "../../lib/types";

  /** One part of a whole: its figure, its share, and a segment meter. */
  interface Props {
    label: string;
    value: string;
    /** 0–1: this part's share of the whole. */
    share: number;
    /** The identity hue of the thing measured. */
    hue?: LabelTone;
    class?: string;
  }

  let { label, value, share, hue, class: className }: Props = $props();
</script>

<div class={cn("flex min-w-0 flex-col gap-2 bg-card px-3.5 py-3", className)}>
  <div class="flex items-center justify-between gap-2">
    <span class="truncate eyebrow">{label}</span>
    <!-- The `{#if}` keeps the % in its own text node, as React renders it. -->
    <span class="text-3xs text-muted-foreground tabular-nums">{Math.round(share * 100)}{#if share >= 0}%{/if}</span>
  </div>
  <span class="text-xl leading-none font-semibold text-foreground tabular-nums">{value}</span>
  <SegmentMeter value={share} {hue} {label} class="mt-auto" />
</div>
