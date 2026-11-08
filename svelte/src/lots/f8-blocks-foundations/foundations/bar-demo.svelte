<script lang="ts">
  import { cn } from "../../../lib/utils";
  import Button from "../../../ui/button.svelte";

  /** A progress bar slid in by translateX (scaleX would squash its round ends), or grown by width. */
  interface Props {
    cheap?: boolean;
  }

  let { cheap = false }: Props = $props();
  let full = $state(false);
</script>

<div class="flex w-56 flex-col gap-2">
  <Button size="sm" variant="outline" onclick={() => (full = !full)}>
    {full ? "Reset" : "Fill"}
  </Button>
  <div class="h-1.5 w-full overflow-hidden rounded-full bg-muted">
    <div
      class={cn(
        "h-full rounded-full bg-foreground",
        cheap
          ? cn(
              "w-full transition-transform duration-slow ease-out-strong",
              full ? "translate-x-0" : "-translate-x-4/5",
            )
          : cn(
              // The don't half of a do/don't pair, animating width on purpose.
              "transition-all duration-slow ease-out-strong",
              full ? "w-full" : "w-1/5",
            ),
      )}
    ></div>
  </div>
  <code class="code">
    {cheap ? "transition-transform translate-x" : "transition-all width"}
  </code>
</div>
