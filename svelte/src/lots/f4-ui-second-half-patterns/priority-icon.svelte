<script module lang="ts">
  export type Priority = "none" | "low" | "medium" | "high" | "urgent";

  const FILLED: Record<Priority, number> = {
    none: 0,
    low: 1,
    medium: 2,
    high: 3,
    urgent: 3,
  };
</script>

<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /**
   * Priority, as four stepped bars. Bars solve a real problem: priority needs to
   * be comparable down a column at a glance, and a coloured chip per level would
   * compete with status. Only urgent earns colour.
   */
  interface Props extends Omit<SVGAttributes<SVGSVGElement>, "class"> {
    class?: string;
    priority: Priority;
  }

  let { class: className, priority, ...rest }: Props = $props();
  const filled = $derived(FILLED[priority]);
</script>

<svg
  data-slot="priority-icon"
  data-priority={priority}
  viewBox="0 0 14 14"
  width="14"
  height="14"
  role="img"
  aria-label={`Priority: ${priority}`}
  class={cn(
    "shrink-0",
    // Urgent is the one priority that earns colour: an exception that is always on stops being one.
    priority === "urgent" ? "text-error" : "text-muted-foreground",
    className,
  )}
  {...rest}
>
  {#if priority === "urgent"}
    <rect x="1.5" y="1.5" width="11" height="11" rx="2.5" fill="currentColor" />
    <path d="M7 4.2 V 7.9" stroke="var(--background)" stroke-width="1.6" stroke-linecap="round" />
    <circle cx="7" cy="10" r="0.9" fill="var(--background)" />
  {:else}
    {#each [0, 1, 2] as i (i)}
      <rect
        x={2 + i * 4}
        y={9 - i * 2.5}
        width="2.6"
        height={3 + i * 2.5}
        rx="0.8"
        fill="currentColor"
        opacity={i < filled ? 1 : 0.28}
      />
    {/each}
  {/if}
</svg>
