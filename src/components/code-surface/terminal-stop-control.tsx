"use client";

import * as React from "react";
import { OctagonXIcon, SquareIcon } from "lucide-react";
import { cn } from "../../lib/utils.ts";
import { iconButtonVariants } from "../../ui/icon-button-variants.ts";
import { Icon } from "../../ui/icon.tsx";
import { Hint } from "../../ui/tooltip.tsx";
import { Spinner } from "../ui/spinner.tsx";

/** How long an interrupt gets before the control offers a force stop. */
const FORCE_STOP_DELAY_MS = 1500;

type StopPhase = "ready" | "waiting" | "force" | "killing";

const LABEL: Record<StopPhase, string> = {
  ready: "Stop process",
  waiting: "Waiting for process to stop",
  force: "Force stop process",
  killing: "Force stopping process",
};

export interface TerminalStopControlProps {
  /** A process is running. Nothing renders otherwise; going false is what resets the control after a stop. */
  active: boolean;
  /** Ctrl-C to the process. */
  onInterrupt: () => void;
  /** Kill it; resolve `true` when it is gone. */
  onForceStop: () => Promise<boolean>;
  /** After a force stop succeeded. */
  onForceStopped: () => void;
  className?: string;
}

/**
 * Stops the running process: an interrupt first, and if the process is still
 * there after 1.5s, a force stop in the error tone. Desktop's
 * `terminal-stop-control.tsx`.
 */
export function TerminalStopControl({
  active,
  onInterrupt,
  onForceStop,
  onForceStopped,
  className,
}: TerminalStopControlProps) {
  const [phase, setPhase] = React.useState<StopPhase>("ready");

  React.useEffect(() => {
    if (!active) {
      setPhase("ready");
      return;
    }
    if (phase !== "waiting") return;
    const timer = setTimeout(() => setPhase("force"), FORCE_STOP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [active, phase]);

  if (!active) return null;

  const force = phase === "force";
  const pending = phase === "waiting" || phase === "killing";
  const label = LABEL[phase];
  const shortcut = phase === "ready" ? "Ctrl+C" : undefined;

  const stop = async () => {
    if (!force) {
      setPhase("waiting");
      onInterrupt();
      return;
    }
    setPhase("killing");
    try {
      if (await onForceStop()) onForceStopped();
      else setPhase("ready");
    } catch {
      setPhase("ready");
    }
  };

  return (
    <Hint label={label} shortcut={shortcut} side="top">
      <button
        type="button"
        data-slot="terminal-stop-control"
        onClick={() => void stop()}
        disabled={pending}
        aria-label={shortcut ? `${label} (${shortcut})` : label}
        className={cn(
          iconButtonVariants({ size: "xs" }),
          force && "text-error hover:bg-error-muted hover:text-error",
          pending ? "cursor-wait" : "cursor-pointer",
          className,
        )}
      >
        {pending ? (
          <Spinner size="xs" label="" />
        ) : force ? (
          <Icon icon={OctagonXIcon} size="sm" />
        ) : (
          <Icon icon={SquareIcon} size="xs" strokeWidth={3} fill="currentColor" />
        )}
      </button>
    </Hint>
  );
}
