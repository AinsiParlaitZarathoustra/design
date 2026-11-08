<script lang="ts">
  import { onMount } from "svelte";
  import { cn } from "../../lib/utils";

  const prefersReducedMotion = () =>
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * A trend drawn as a dot matrix: one column per period, each a stack of dots
   * rising from a baseline row that is always lit, so a quiet day still reads as
   * a day. `null` in the series is an undefined day and draws as an empty column,
   * its baseline dimmed.
   */
  interface Props {
    values: ReadonlyArray<number | null>;
    rows?: number;
    class?: string;
    /** Cap the columns drawn, keeping the most recent. */
    maxColumns?: number;
  }

  let { values, rows = 7, class: className, maxColumns = 60 }: Props = $props();

  // The dots transition from unlit on first paint: lit once the first frame has run.
  let mounted = $state(false);
  onMount(() => {
    if (prefersReducedMotion()) {
      mounted = true;
      return;
    }
    const raf = requestAnimationFrame(() => {
      mounted = true;
    });
    return () => cancelAnimationFrame(raf);
  });

  const columns = $derived(
    values.length > maxColumns ? values.slice(values.length - maxColumns) : values,
  );
  const max = $derived(columns.reduce<number>((m, v) => (v !== null && v > m ? v : m), 0));
  const rowIndexes = $derived(Array.from({ length: rows }, (_, r) => r));
</script>

{#if columns.length > 0}
  <div data-slot="dot-matrix" class={cn("flex h-[30px] items-end gap-[1.5px]", className)} aria-hidden="true">
    {#each columns as v, i (i)}
      {@const lit = v === null || max <= 0 ? 0 : v <= 0 ? 0 : Math.max(1, Math.round((v / max) * rows))}
      {@const newest = i === columns.length - 1}
      <div class="flex min-w-0 flex-1 flex-col-reverse items-center gap-[1.5px]">
        {#each rowIndexes as r (r)}
          {@const on = mounted && r < lit}
          {@const base = r === 0}
          <span
            class="block size-[3px] shrink-0 rounded-full"
            style="background: {newest && on ? 'var(--foreground)' : 'var(--secondary-foreground)'}; opacity: {on ? (newest ? 1 : 0.85) : base ? (v === null ? 0.1 : 0.22) : 0.07}; transition: opacity 260ms var(--ease-out-strong); transition-delay: {Math.min(i, 40) * 8}ms;"
          ></span>
        {/each}
      </div>
    {/each}
  </div>
{/if}
