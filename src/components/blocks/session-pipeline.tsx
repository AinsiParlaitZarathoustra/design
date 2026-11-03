"use client";

import { CheckCircle2Icon, CircleDashedIcon, PlayIcon, XCircleIcon } from "lucide-react";

import { cn } from "../../lib/utils.ts";

import type { Session, TimelineEntry } from "../../lib/types.ts";
import { Icon } from "../../ui/icon.tsx";
import { Tag } from "../ui/tag.tsx";

/**
 * A session as a pipeline of steps, drawn from real session data.
 *
 * Three visual states, and they are read by silhouette before colour: done
 * is a filled check with the title struck through and dimmed; the running
 * step is the one highlighted row with a slow dashed spinner; everything
 * after it sits at 40%. Only the running row gets the ring, so the eye
 * lands there first.
 */
function SessionPipeline({
  session,
  entries,
  className,
}: {
  session: Session;
  entries: Array<TimelineEntry>;
  className?: string;
}) {
  const steps = entries.filter((e) => e.kind === "tool_call");
  const runningIndex = steps.findIndex((s) => s.toolStatus === "running");
  const done = steps.filter((s) => s.toolStatus === "ok").length;

  return (
    <div
      data-slot="session-pipeline"
      className={cn("rounded-lg border border-border bg-card p-4", className)}
    >
      <div className="flex items-center gap-2">
        <div className="text-sm font-medium text-foreground">{session.ref}</div>
        <Tag hue={session.status === "live" ? "green" : "grey"} dot className="ml-auto">
          {session.status === "live" ? `${session.agent} running` : session.agent}
        </Tag>
      </div>

      <div className="mt-3 rounded-md border border-border-subtle bg-background p-2.5">
        <div className="eyebrow">Target</div>
        <div className="mt-1 text-xs text-foreground">
          {session.project} · <span className="font-mono">{session.branch}</span> · {session.title}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {steps.map((step, i) => {
          const running = step.toolStatus === "running";
          const failed = step.toolStatus === "error";
          const ok = step.toolStatus === "ok";
          const pending = runningIndex !== -1 && i > runningIndex;
          return (
            <div
              key={step.id}
              className={cn(
                "flex items-start gap-2",
                running && "-mx-2 rounded-md border border-border-strong bg-element-selected p-2",
                pending && "opacity-40",
              )}
            >
              <div className="relative mt-0.5 shrink-0">
                {ok && <Icon icon={CheckCircle2Icon} size="md" className="text-foreground" />}
                {failed && <Icon icon={XCircleIcon} size="md" className="text-error" />}
                {running && (
                  <>
                    <Icon
                      icon={CircleDashedIcon}
                      size="md"
                      className="animate-spin text-foreground [animation-duration:3s]"
                    />
                    <PlayIcon className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-current text-foreground" />
                  </>
                )}
                {!ok && !failed && !running && (
                  <Icon icon={CircleDashedIcon} size="md" className="text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    "truncate text-xs font-medium",
                    ok && "line-through opacity-50",
                    running && "text-foreground",
                    failed && "text-error",
                  )}
                >
                  {step.title}
                </div>
                {step.detail && <div className="truncate caption">{step.detail}</div>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between text-2xs text-muted-foreground tabular-nums">
        <span>
          {done}/{steps.length} tool calls
        </span>
        <span>{session.durationMinutes} min</span>
      </div>
    </div>
  );
}

export { SessionPipeline };
