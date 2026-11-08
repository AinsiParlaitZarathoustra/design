<script lang="ts" module>
  /**
   * The session status glyph, ported from `src/components/ui/status-icon.tsx`.
   *
   * Circles, because a status dot is a circle everywhere else a person has
   * seen one, and the one state that is not a circle is a ThinkingOrb: a
   * running session is a dotted sphere in constant motion. "Running" is the
   * only state where something is happening, so it is the only one that moves.
   *
   *   queued   a hollow ring in muted ink: nothing has happened yet
   *   live     the `composing` ThinkingOrb: work in progress
   *   done     a solid dot in muted ink: history, and it should recede
   *   failed   a solid dot in the error ink
   */
  export type SessionStatusKind = "queued" | "live" | "done" | "failed";

  const TONE: Record<SessionStatusKind, string> = {
    queued: "text-muted-foreground",
    live: "text-foreground",
    done: "text-muted-foreground",
    failed: "text-error",
  };

  const LABEL: Record<SessionStatusKind, string> = {
    queued: "Queued",
    live: "Running",
    done: "Done",
    failed: "Failed",
  };
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";
  import ThinkingOrb from "./deps/thinking-orb.svelte";

  interface Props {
    status: SessionStatusKind;
    class?: string;
  }

  let { status, class: className }: Props = $props();
</script>

{#if status === "live"}
  <span
    data-slot="status-icon"
    data-status={status}
    role="img"
    aria-label={LABEL[status]}
    class={cn("inline-block size-3.5 shrink-0", className)}
  >
    <!-- Drawn at the 20px preset and scaled down to 14, so the dots are thickened to keep the same weight as the solid dots. -->
    <ThinkingOrb
      state="composing"
      size={20}
      dotSize={1.4}
      aria-hidden="true"
      style="width: 100%; height: 100%;"
    />
  </span>
{:else}
  <svg
    data-slot="status-icon"
    data-status={status}
    viewBox="0 0 14 14"
    width="14"
    height="14"
    fill="none"
    role="img"
    aria-label={LABEL[status]}
    class={cn("size-3.5 shrink-0", TONE[status], className)}
  >
    {#if status === "queued"}
      <circle cx="7" cy="7" r="3.75" stroke="currentColor" stroke-width="1.5" />
    {:else}
      <circle cx="7" cy="7" r="4.25" fill="currentColor" />
    {/if}
  </svg>
{/if}
