<script lang="ts">
  import { cn } from "../../../lib/utils";

  /** A switch knob. Click it quickly: the interruptible one turns around mid-way. */
  interface Props {
    interruptible?: boolean;
  }

  let { interruptible = false }: Props = $props();
  let on = $state(false);
</script>

<div class="flex flex-col items-center gap-2">
  <button
    type="button"
    aria-pressed={on}
    aria-label="Example switch"
    onclick={() => (on = !on)}
    class="relative h-control-md w-24 rounded-full border border-border bg-muted"
  >
    {#if interruptible}
      <span
        class={cn(
          "absolute top-0.5 left-0.5 size-5 rounded-full bg-foreground transition-transform duration-base ease-out-strong",
          on && "translate-x-17.5",
        )}
      ></span>
    {:else}
      {#key on}
        <span
          class={cn(
            "absolute top-0.5 size-5 animate-slide-in-left rounded-full bg-foreground",
            on ? "right-0.5" : "left-0.5",
          )}
        ></span>
      {/key}
    {/if}
  </button>
  <span class="caption">Click it twice, fast</span>
</div>
