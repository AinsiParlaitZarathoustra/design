"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "../../lib/utils.ts";

/**
 * The indicator's ink. `default` is the primary ink, a plain amount. The
 * others are desktop's usage bars (quota, rate limits), where the fill says
 * how close a limit is: `success` with room left, `warning` near it, `error`
 * at it. Which tone a value gets is the app's call; desktop turns amber at
 * 70% and red at 90%.
 */
type ProgressTone = "default" | "success" | "warning" | "error";

const TONE_CLASS: Record<ProgressTone, string | undefined> = {
  default: undefined,
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

function Progress({
  className,
  children,
  value,
  tone = "default",
  ...props
}: ProgressPrimitive.Root.Props & { tone?: ProgressTone }) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator tone={tone} />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-md bg-muted",
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  tone = "default",
  ...props
}: ProgressPrimitive.Indicator.Props & { tone?: ProgressTone }) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      data-tone={tone === "default" ? undefined : tone}
      className={cn(
        "h-full bg-primary transition-[width] duration-base ease-out-strong",
        TONE_CLASS[tone],
        className,
      )}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-xs font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn("ml-auto text-xs text-muted-foreground tabular-nums", className)}
      data-slot="progress-value"
      {...props}
    />
  );
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
export type { ProgressTone };
