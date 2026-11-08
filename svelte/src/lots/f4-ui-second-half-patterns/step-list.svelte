<script lang="ts" module>
  import type { SessionStatusKind } from "./status-icon.svelte";

  /**
   * A multi-step action, in place, ported from `src/components/ui/step-list.tsx`:
   * one row per step in the session timeline's language (the status glyph, then
   * what the step did), the failing step's complaint under the list with a retry
   * from there.
   *
   * A step changes state by changing its glyph and ink; nothing moves, so the
   * list reads the same under reduced motion. Assistive tech hears one short
   * sentence per change (`role="status"`) rather than the whole list again.
   */
  export type StepStatus = "pending" | "running" | "done" | "failed";

  export interface StepListStep {
    id: string;
    label: string;
    /** What the step acts on: the branch, the commit summary, the base. Monospace. */
    detail?: string | null;
    status: StepStatus;
  }

  const GLYPH: Record<StepStatus, SessionStatusKind> = {
    pending: "queued",
    running: "live",
    done: "done",
    failed: "failed",
  };

  function announce(
    steps: StepListStep[],
    error: string | null | undefined,
    doneMessage: string,
    startingMessage: string | null,
  ): string {
    const failed = steps.find((s) => s.status === "failed");
    if (failed) return `${failed.label} failed.${error ? ` ${error}` : ""}`;
    const running = steps.find((s) => s.status === "running");
    if (running) return `${running.label}…`;
    if (steps.length > 0 && steps.every((s) => s.status === "done")) return doneMessage;
    if (steps.length > 0 && steps.every((s) => s.status === "pending")) return startingMessage ?? "";
    return "";
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { RotateCcw } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Button from "../../ui/button.svelte";
  import Icon from "../../ui/icon.svelte";
  import StatusIcon from "./status-icon.svelte";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    steps: StepListStep[];
    /** The failing step's complaint, in words; shown under the list while a step has failed. */
    error?: string | null;
    /** Resume from the failed step. Unset, no retry is offered. */
    onRetry?: () => void;
    /** The retry's label, naming where it starts ("Retry push"). */
    retryLabel?: string;
    /** What the status line says once every step is done. */
    doneMessage?: string;
    /**
     * What the status line says while every step is still pending. `null` says
     * nothing, for a list shown before anything is started.
     */
    startingMessage?: string | null;
  }

  let {
    class: className,
    steps,
    error,
    onRetry,
    retryLabel = "Retry",
    doneMessage = "Done.",
    startingMessage = "Starting…",
    ...rest
  }: Props = $props();

  const failed = $derived(steps.some((s) => s.status === "failed"));
  const starting = $derived(steps.length > 0 && steps.every((s) => s.status === "pending"));

  // A live region announces changes, not what it held when it appeared. A list
  // that appears with nothing run yet mounts empty and takes "Starting…" on the
  // next commit, so the start is heard; one that appears mid-run or finished
  // holds its sentence from the first paint, unannounced.
  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });

  const status = $derived(
    starting && !mounted ? "" : announce(steps, error, doneMessage, startingMessage),
  );
</script>

<div data-slot="step-list" class={cn("flex flex-col", className)} {...rest}>
  <p role="status" class="sr-only">{status}</p>
  <ol class="flex flex-col gap-0.5">
    {#each steps as step (step.id)}
      <li
        data-slot="step"
        data-status={step.status}
        class={cn(
          "flex h-control-xs items-center gap-2 text-xs transition-colors duration-fast ease-out-strong",
          step.status === "pending" ? "text-muted-foreground" : "text-foreground",
          step.status === "failed" && "text-error",
        )}
      >
        <StatusIcon status={GLYPH[step.status]} class="size-3.5 shrink-0" />
        <span class="shrink-0 font-medium">{step.label}</span>
        {#if step.detail}
          <span class="min-w-0 truncate font-mono text-2xs text-muted-foreground">{step.detail}</span>
        {/if}
      </li>
    {/each}
  </ol>
  {#if failed && (error || onRetry)}
    <div data-slot="step-list-failure" class="mt-2 flex flex-col items-start gap-2">
      {#if error}
        <p class="text-xs whitespace-pre-wrap break-words text-error select-text">{error}</p>
      {/if}
      {#if onRetry}
        <Button size="sm" variant="outline" onclick={onRetry}>
          <Icon icon={RotateCcw} size="sm" />
          {retryLabel}
        </Button>
      {/if}
    </div>
  {/if}
</div>
