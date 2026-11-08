<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { formatDiffCount } from "./format-diff-count";

  /**
   * A +/- pair, as shown on a session row, in the theme's diff inks. Tabular so
   * columns do not jitter. The minus is U+2212, not a hyphen, so it lines up
   * with the plus.
   *
   * - `compact` shortens large counts (`formatDiffCount`).
   * - `hideZero` drops a side that is zero, and draws nothing when both are.
   * - `layout="aligned"` sets the two sides in fixed 4ch columns, right-aligned.
   * - `label` names the pair for a screen reader and hides the glyphs.
   */
  interface Props extends HTMLAttributes<HTMLSpanElement> {
    added: number;
    removed: number;
    compact?: boolean;
    hideZero?: boolean;
    layout?: "inline" | "aligned";
    label?: string;
    class?: string;
  }

  let {
    added,
    removed,
    compact = false,
    hideZero = false,
    layout = "inline",
    label,
    class: className,
    ...rest
  }: Props = $props();

  const count = (value: number) => (compact ? formatDiffCount(value) : String(value));
  const hidden = $derived(label ? true : undefined);
  const aligned = $derived(layout === "aligned");
</script>

{#if !(hideZero && added === 0 && removed === 0)}
  <span
    data-slot="diff-stat"
    data-layout={aligned ? layout : undefined}
    role={label ? "group" : undefined}
    aria-label={label}
    class={cn(
      aligned
        ? "inline-grid grid-cols-[4ch_4ch] gap-2 text-right text-2xs tabular-nums"
        : "inline-flex items-center gap-1.5 text-2xs tabular-nums",
      className,
    )}
    {...rest}
  >
    <!-- An aligned column keeps the hidden side's cell, so the other side stays in its own column. -->
    {#if hideZero && added === 0}
      {#if aligned}<span aria-hidden="true"></span>{/if}
    {:else}
      <span aria-hidden={hidden} class="text-(--diff-added-text)">+{count(added)}</span>
    {/if}
    {#if hideZero && removed === 0}
      {#if aligned}<span aria-hidden="true"></span>{/if}
    {:else}
      <span aria-hidden={hidden} class="text-(--diff-removed-text)">−{count(removed)}</span>
    {/if}
  </span>
{/if}
