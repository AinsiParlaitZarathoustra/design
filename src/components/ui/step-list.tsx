"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/utils.ts";
import { Button } from "../../ui/button.tsx";
import { Icon } from "../../ui/icon.tsx";
import { StatusIcon } from "./status-icon.tsx";
import type { SessionStatusKind } from "./status-icon.tsx";

/**
 * A multi-step action, in place: one row per step in the session timeline's
 * language (the status glyph, then what the step did), the failing step's
 * complaint under the list with a retry from there. Desktop's "Commit, push &
 * PR" progress (source control); anything that runs steps in order and can
 * resume from the one that broke.
 *
 * A step changes state by changing its glyph and ink; nothing moves, so the
 * list reads the same under reduced motion. Assistive tech hears one short
 * sentence per change (`role="status"`: "Starting…" before any step has
 * run, then the running step, the failure, or done) rather than the whole
 * list again.
 *
 * Renders from its props alone: the app runs the steps and owns what the
 * block is titled and what it ends on (a pull request, a link).
 */

type StepStatus = "pending" | "running" | "done" | "failed";

interface StepListStep {
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

interface StepListProps extends Omit<ComponentProps<"div">, "children"> {
  steps: StepListStep[];
  /** The failing step's complaint, in words; shown under the list while a step has failed. */
  error?: string | null;
  /** Resume from the failed step. Unset, no retry is offered. */
  onRetry?: () => void;
  /** The retry's label, naming where it starts ("Retry push"). */
  retryLabel?: ReactNode;
  /** What the status line says once every step is done. */
  doneMessage?: string;
  /**
   * What the status line says while every step is still pending, so the
   * click that started the run is answered before the first step reports.
   * `null` says nothing, for a list shown before anything is started.
   */
  startingMessage?: string | null;
}

function announce(
  steps: StepListStep[],
  error: string | null | undefined,
  doneMessage: string,
  startingMessage: string | null,
) {
  const failed = steps.find((s) => s.status === "failed");
  if (failed) return `${failed.label} failed.${error ? ` ${error}` : ""}`;
  const running = steps.find((s) => s.status === "running");
  if (running) return `${running.label}…`;
  if (steps.length > 0 && steps.every((s) => s.status === "done")) return doneMessage;
  if (steps.length > 0 && steps.every((s) => s.status === "pending")) return startingMessage ?? "";
  return "";
}

function StepList({
  steps,
  error,
  onRetry,
  retryLabel = "Retry",
  doneMessage = "Done.",
  startingMessage = "Starting…",
  className,
  ...props
}: StepListProps) {
  const failed = steps.some((s) => s.status === "failed");
  // A live region announces changes, not what it held when it appeared. A
  // list that appears with nothing run yet mounts empty and takes "Starting…"
  // on the next commit, so the start is heard; one that appears mid-run or
  // finished holds its sentence from the first paint, unannounced, as before.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const starting = steps.length > 0 && steps.every((s) => s.status === "pending");
  return (
    <div data-slot="step-list" className={cn("flex flex-col", className)} {...props}>
      <p role="status" className="sr-only">
        {starting && !mounted ? "" : announce(steps, error, doneMessage, startingMessage)}
      </p>
      <ol className="flex flex-col gap-0.5">
        {steps.map((step) => (
          <li
            key={step.id}
            data-slot="step"
            data-status={step.status}
            className={cn(
              "flex h-control-xs items-center gap-2 text-xs transition-colors duration-fast ease-out-strong",
              step.status === "pending" ? "text-muted-foreground" : "text-foreground",
              step.status === "failed" && "text-error",
            )}
          >
            <StatusIcon status={GLYPH[step.status]} className="size-3.5 shrink-0" />
            <span className="shrink-0 font-medium">{step.label}</span>
            {step.detail && (
              <span className="min-w-0 truncate font-mono text-2xs text-muted-foreground">
                {step.detail}
              </span>
            )}
          </li>
        ))}
      </ol>
      {failed && (error || onRetry) && (
        <div data-slot="step-list-failure" className="mt-2 flex flex-col items-start gap-2">
          {error && (
            <p className="text-xs whitespace-pre-wrap break-words text-error select-text">
              {error}
            </p>
          )}
          {onRetry && (
            <Button size="sm" variant="outline" onClick={onRetry}>
              <Icon icon={RotateCcw} size="sm" />
              {retryLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export { StepList };
export type { StepListProps, StepListStep, StepStatus };
