<script lang="ts">
  import { cn } from "../../lib/utils";
  import { HUE_BG } from "../../lib/hue";
  import type { LabelTone } from "../../lib/types";

  /** Which band a gauge's tick at `at` (0–1, its centre) belongs to. */
  function gaugeTone(at: number, warnAt: number): "success" | "warning" {
    return at >= warnAt ? "warning" : "success";
  }

  function shareTickClass(hue: LabelTone | undefined, dimmed: boolean): string {
    return cn("min-w-0 flex-1 rounded-full", hue ? HUE_BG[hue] : "bg-foreground", dimmed && "opacity-20");
  }

  /**
   * A share of a whole as a row of ticks (`share`), or a fill against a limit as
   * ticks whose band carries the status (`gauge`). A hairline marker stands where
   * the value lands.
   */
  interface Props {
    /** 0–1. A gauge pins anything past 1 at the end. */
    value: number;
    hue?: LabelTone;
    /** Tick count: 36 for a share, 48 for a gauge. */
    segments?: number;
    /** What is measured, read out as the meter's name. */
    label?: string;
    /** `share` (the default): a share of a whole. `gauge`: a fill against a limit. */
    variant?: "share" | "gauge";
    /** Gauge only: where the ticks turn from success to warning, 0–1. */
    warnAt?: number;
    class?: string;
  }

  let { value, hue, segments, label, variant = "share", warnAt = 0.8, class: className }: Props = $props();

  const shareCount = $derived(segments ?? 36);
  const shareLit = $derived(value > 0 ? Math.max(1, Math.round(Math.min(value, 1) * shareCount)) : 0);
  const shareIndexes = $derived(Array.from({ length: shareCount }, (_, i) => i));

  const gaugeCount = $derived(segments ?? 48);
  const gaugeShare = $derived(Math.max(0, Math.min(1, value)));
  const gaugeIndexes = $derived(Array.from({ length: gaugeCount }, (_, i) => i));
</script>

{#if variant === "gauge"}
  <div
    data-slot="segment-meter"
    data-variant="gauge"
    role="meter"
    aria-label={label}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={Math.round(gaugeShare * 100)}
    class={cn("relative", className)}
  >
    <div aria-hidden="true" class="flex h-3 items-end gap-px">
      {#each gaugeIndexes as i (i)}
        {@const at = (i + 0.5) / gaugeCount}
        {@const tone = gaugeTone(at, warnAt)}
        <span
          data-tone={tone}
          data-lit={at <= gaugeShare || undefined}
          class={cn(
            "h-full min-w-0 flex-1 rounded-sm transition-opacity duration-base ease-out-strong",
            tone === "warning" ? "bg-warning" : "bg-success",
            at <= gaugeShare ? "opacity-100" : "opacity-22",
          )}
        ></span>
      {/each}
    </div>
    <!-- The marker: a hairline at the value, sliding with it. -->
    <span
      aria-hidden="true"
      data-slot="segment-meter-marker"
      class="pointer-events-none absolute -top-0.5 h-4 w-px bg-foreground transition-[left] duration-base ease-out-strong motion-reduce:transition-none"
      style="left: {gaugeShare * 100}%;"
    ></span>
  </div>
{:else}
  <div
    data-slot="segment-meter"
    role="meter"
    aria-label={label}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={Math.round(value * 100)}
    class={cn("flex h-3 items-stretch gap-0.5", className)}
  >
    {#each shareIndexes.slice(0, shareLit) as i (i)}
      <span class={shareTickClass(hue, false)}></span>
    {/each}
    <span aria-hidden="true" class="-my-0.5 w-0.5 shrink-0 rounded-full bg-foreground"></span>
    {#each shareIndexes.slice(shareLit) as i (i)}
      <span class={shareTickClass(hue, true)}></span>
    {/each}
  </div>
{/if}
