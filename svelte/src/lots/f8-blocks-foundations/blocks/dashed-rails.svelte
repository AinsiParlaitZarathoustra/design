<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * Dashed vertical rails, positioned by `clamp()` so they sit inside
   * the gutter at every width — or at a fixed `offset` from the parent's edges
   * when they should frame a column rather than a viewport. Dashed, never solid: they are drafting marks,
   * not walls. The optional mask lets them fade before they hit the next
   * section.
   */
  interface Props {
    fade?: boolean;
    /** Distance of each rail from the parent's left and right edges. */
    offset?: string;
    class?: string;
  }

  let {
    fade = false,
    offset = "clamp(0.5rem, 5vw, 5rem)",
    class: className,
  }: Props = $props();

  const rail = $derived(
    cn(
      "pointer-events-none absolute inset-y-0 border-l border-dashed border-foreground/10",
      fade && "mask-y-from-85%",
    ),
  );
</script>

<div
  aria-hidden="true"
  data-slot="dashed-rails"
  class={cn("pointer-events-none absolute inset-0", className)}
>
  <div class={rail} style:left={offset}></div>
  <div class={rail} style:right={offset}></div>
</div>
