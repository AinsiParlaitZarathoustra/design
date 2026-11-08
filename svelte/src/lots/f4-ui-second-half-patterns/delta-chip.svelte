<script module lang="ts">
  /**
   * Which way is good news. `neutral` (the default) judges nothing; `up-good`
   * suits a figure that should grow, `down-good` one that should shrink.
   */
  export type DeltaTone = "neutral" | "up-good" | "down-good";
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  /**
   * Period-over-period change as a small chip: `▲ 8%` / `▼ 3%`. Neutral by
   * default: more tokens is neither good nor bad, so the chip informs and does
   * not judge. A figure with a good direction says so with `tone`, and the chip
   * turns success or error; the arrow still carries the direction. Renders
   * nothing when there is no previous period.
   */
  interface Props {
    delta: number | null;
    tone?: DeltaTone;
    class?: string;
  }

  let { delta, tone = "neutral", class: className }: Props = $props();

  const pct = $derived(Math.round(Math.abs(delta ?? 0) * 100));
  const flat = $derived(pct === 0);
  const verdict = $derived(
    tone === "neutral" || flat
      ? "neutral"
      : (delta ?? 0) > 0 === (tone === "up-good")
        ? "good"
        : "bad",
  );
</script>

{#if delta !== null && Number.isFinite(delta)}
  <span
    data-slot="delta-chip"
    data-tone={verdict}
    title="vs the previous period of the same length"
    class={cn(
      "inline-flex h-4 shrink-0 items-center gap-0.5 rounded-full whitespace-nowrap border px-1.5",
      "text-3xs font-medium tabular-nums",
      verdict === "good"
        ? "border-transparent bg-success-muted text-success"
        : verdict === "bad"
          ? "border-transparent bg-error-muted text-error"
          : "border-element-active text-secondary-foreground",
      className,
    )}
  >
    {flat ? "—" : (delta ?? 0) > 0 ? "▲" : "▼"}{#if !flat}{` ${pct}%`}{/if}
  </span>
{/if}
