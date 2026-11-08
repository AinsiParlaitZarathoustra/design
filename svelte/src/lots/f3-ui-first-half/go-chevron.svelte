<script lang="ts">
  import { cn } from "../../lib/utils";

  /**
   * A chevron that says "this opens something". When the row that carries
   * `group/go` is hovered, the chevron shifts forward and its two arms spread
   * about the apex, opening into an arrow. Hover-only: focus and touch show the
   * resting chevron. Reduced motion drops the transition.
   */
  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props();

  const arm = cn(
    "origin-[10px_8px] [transform-box:view-box] [vector-effect:non-scaling-stroke]",
    "transition-transform duration-base ease-out-strong motion-reduce:transition-none",
  );
</script>

<span
  aria-hidden="true"
  data-slot="go-chevron"
  class={cn(
    "inline-flex shrink-0 transition-transform duration-base ease-out-strong",
    "group-hover/go:translate-x-0.5 motion-reduce:transition-none",
    className,
  )}
>
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="overflow-visible"
  >
    <path d="M6 4L10 8" class={cn(arm, "group-hover/go:rotate-8")} />
    <path d="M10 8L6 12" class={cn(arm, "group-hover/go:-rotate-8")} />
  </svg>
</span>
