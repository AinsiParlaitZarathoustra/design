<script lang="ts">
  import { cn } from "../../../lib/utils";
  import Button from "../../../ui/button.svelte";

  /** A palette-like panel. `instant` opens it with no motion, as the real one does. */
  interface Props {
    instant?: boolean;
  }

  let { instant = false }: Props = $props();
  let open = $state(false);
</script>

<div class="flex flex-col items-center gap-3">
  <Button size="sm" variant="outline" onclick={() => (open = !open)}>
    {open ? "Close" : "Open"} ⌘K
  </Button>
  <div
    class={cn(
      "flex w-48 flex-col gap-1 rounded-md border border-border bg-popover p-2 shadow-md",
      instant
        ? open
          ? "visible"
          : "invisible"
        : cn(
            "transition-[opacity,transform] duration-slow ease-in",
            open ? "scale-100 opacity-100" : "scale-0 opacity-0",
          ),
    )}
  >
    <span class="label">Open session…</span>
    <span class="caption">Instant: it opens many times a day</span>
  </div>
</div>
