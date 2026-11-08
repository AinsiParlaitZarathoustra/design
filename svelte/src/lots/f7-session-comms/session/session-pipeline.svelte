<script module lang="ts">
  import type { SessionView } from "./session-view";

  export type StepState = "done" | "failed" | "running" | "upcoming";

  export interface Step {
    key: string;
    title: string;
    detail?: string;
    state: StepState;
  }

  /** The state in words, for a screen reader: the silhouettes are shapes only. */
  const STATE_LABEL: Record<StepState, string> = {
    done: "Done",
    failed: "Failed",
    running: "Running",
    upcoming: "Upcoming",
  };

  /** A plan's steps when there is one, else every tool call in order. */
  export function stepsOf(session: SessionView): Step[] {
    if (session.plan && session.plan.length > 0) {
      return session.plan.map((item, i) => ({
        key: `plan:${i}`,
        title: item.content,
        state:
          item.status === "completed"
            ? "done"
            : item.status === "in_progress"
              ? "running"
              : "upcoming",
      }));
    }
    return session.turns.flatMap((turn) =>
      turn.items.flatMap((item) =>
        item.kind === "tool"
          ? [
              {
                key: item.call.id,
                title: item.call.title ?? item.call.name,
                detail: item.call.title ? undefined : item.call.paths?.[0],
                state: (item.call.status === "completed"
                  ? "done"
                  : item.call.status === "failed"
                    ? "failed"
                    : item.call.status === "running"
                      ? "running"
                      : "upcoming") satisfies StepState,
              },
            ]
          : [],
      ),
    );
  }

  export { STATE_LABEL };
</script>

<script lang="ts">
  import { CircleCheck, CircleDashed, CircleX, Play } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import Tag from "../deps/tag.svelte";

  /**
   * A session as a pipeline of steps (`SessionPipeline`). Three states, read by
   * silhouette before colour: done is a filled check with the title struck
   * through and dimmed; the running step is the one ringed row with a slow
   * dashed spinner; everything still to come sits at 40%. A failed call is
   * done, in the error ink.
   */
  interface Props {
    session: SessionView;
    class?: string;
  }

  let { session, class: className }: Props = $props();

  const steps = $derived(stepsOf(session));
  const done = $derived(steps.filter((s) => s.state === "done" || s.state === "failed").length);
  const live = $derived(session.phase === "running" || session.phase === "waiting");
  const meta = $derived(session.meta);
  const heading = $derived(meta.ref ?? meta.title);
</script>

<div data-slot="session-pipeline" class={cn("rounded-lg border border-border bg-card p-4", className)}>
  <div class="flex items-center gap-2">
    {#if heading}
      <div class="truncate text-sm font-medium text-foreground">{heading}</div>
    {/if}
    {#if meta.agent}
      <Tag hue={live ? "green" : "grey"} dot class="ml-auto shrink-0">
        {live ? `${meta.agent} running` : meta.agent}
      </Tag>
    {/if}
  </div>
  {#if meta.ref && meta.title}
    <div class="mt-1 truncate text-xs text-secondary-foreground">{meta.title}</div>
  {/if}

  {#if steps.length === 0}
    <p class="mt-4 text-xs text-muted-foreground">No steps yet</p>
  {:else}
    <div class="mt-4 space-y-2">
      {#each steps as step (step.key)}
        <div
          data-state={step.state}
          class={cn(
            "flex items-start gap-2",
            step.state === "running" &&
              "-mx-2 rounded-md border border-border-strong bg-element-selected p-2",
            step.state === "upcoming" && "opacity-40",
          )}
        >
          <div class="relative mt-0.5 shrink-0">
            {#if step.state === "done"}
              <Icon icon={CircleCheck} size="md" class="text-foreground" />
            {/if}
            {#if step.state === "failed"}
              <Icon icon={CircleX} size="md" class="text-error" />
            {/if}
            {#if step.state === "running"}
              <Icon
                icon={CircleDashed}
                size="md"
                data-slot="session-pipeline-running"
                class="animate-spin text-foreground [animation-duration:3s]"
              />
              <Play
                class="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-current text-foreground"
              />
            {/if}
            {#if step.state === "upcoming"}
              <Icon icon={CircleDashed} size="md" class="text-muted-foreground" />
            {/if}
          </div>
          <div class="min-w-0 flex-1">
            <div
              class={cn(
                "truncate text-xs font-medium",
                step.state === "done" && "line-through opacity-50",
                step.state === "running" && "text-foreground",
                step.state === "failed" && "text-error",
              )}
            >
              <span class="sr-only">{STATE_LABEL[step.state]}: </span>
              {step.title}
            </div>
            {#if step.detail}
              <div class="truncate caption">{step.detail}</div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}

  {#if steps.length > 0}
    <div class="mt-3 text-2xs text-muted-foreground tabular-nums">{done}/{steps.length} steps</div>
  {/if}
</div>
