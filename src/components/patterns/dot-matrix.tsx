"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "../../lib/utils.ts";
import { HUE_BG } from "../../lib/hue.ts";
import type { LabelTone } from "../../lib/types.ts";

/**
 * The usage view's two chart primitives: a dot-matrix sparkline and a
 * segmented meter. `DotMatrix` is desktop's (`features/usage`), ported as it
 * is; `SegmentMeter` is its tick-meter sibling.
 *
 * Both are achromatic by default: a chart of spend or tokens is a quantity,
 * not a status. The meter may take a `hue` — an IDENTITY, the colour of the
 * thing being measured (input, output, cache…), so four meters in a row can
 * be told apart at a glance. Magnitude is always carried by how many marks
 * are lit, never by the colour.
 */

const prefersReducedMotion = () =>
  typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True after mount — the dots transition from unlit on first paint. */
function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setMounted(true);
      return;
    }
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  return mounted;
}

/**
 * A trend drawn as a dot matrix — the headline figures' sparkline.
 *
 * One column per day, each a stack of seven dots rising from a baseline row
 * that is always lit, so a quiet day still reads as a day rather than as a gap
 * in the chart. Seven rows rather than five because the resolution is what the
 * shape is made of: at five, a day at a third of the peak and one at half drew
 * the same column.
 *
 * `null` in the series means "no value today" (a rate with no denominator, not
 * a rate of zero) and draws as an empty column — the baseline dot dims for it,
 * so an undefined day is visibly different from a zero one.
 */
function DotMatrix({
  values,
  rows = 7,
  className,
  /** Cap the columns drawn, keeping the most recent — a year does not fit. */
  maxColumns = 60,
}: {
  values: ReadonlyArray<number | null>;
  rows?: number;
  className?: string;
  maxColumns?: number;
}) {
  const mounted = useMounted();
  const columns = useMemo(
    () => (values.length > maxColumns ? values.slice(values.length - maxColumns) : values),
    [values, maxColumns],
  );
  const max = useMemo(
    () => columns.reduce<number>((m, v) => (v !== null && v > m ? v : m), 0),
    [columns],
  );
  if (columns.length === 0) return null;

  return (
    <div
      data-slot="dot-matrix"
      className={cn("flex h-[30px] items-end gap-[1.5px]", className)}
      aria-hidden
    >
      {columns.map((v, i) => {
        // Every non-zero day lights at least one dot above the baseline: a day
        // that did a hundredth of the peak still happened.
        const lit =
          v === null || max <= 0 ? 0 : v <= 0 ? 0 : Math.max(1, Math.round((v / max) * rows));
        const newest = i === columns.length - 1;
        return (
          <div key={i} className="flex min-w-0 flex-1 flex-col-reverse items-center gap-[1.5px]">
            {Array.from({ length: rows }, (_, r) => {
              const on = mounted && r < lit;
              // The baseline row stands in for the axis and stays visible.
              const base = r === 0;
              return (
                <span
                  key={r}
                  // A fixed 3px round dot rather than a full-width bar: a bar
                  // filling its column closes the gaps into a solid block.
                  // Seven rows of 3px on a 1.5px pitch come to the 30px the
                  // container reserves.
                  className="block size-[3px] shrink-0 rounded-full"
                  style={{
                    background: newest && on ? "var(--foreground)" : "var(--secondary-foreground)",
                    opacity: on ? (newest ? 1 : 0.85) : base ? (v === null ? 0.1 : 0.22) : 0.07,
                    transition: "opacity 260ms var(--ease-out-strong)",
                    transitionDelay: `${Math.min(i, 40) * 8}ms`,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/**
 * A share of a whole as a row of ticks. Every tick is present; the share is
 * how many are lit, and a thin cursor stands where the value lands. Reads at
 * a glance down a row of four, where four bars of different lengths would
 * make the eye compare end-points.
 *
 * With a `hue`, lit ticks are the hue and unlit ones the same hue faint, so
 * the track still says whose meter it is when almost nothing is lit.
 * Without one it is foreground ink.
 *
 * `variant="gauge"` is desktop's composer usage meter (`TickMeter`): a fill
 * against a limit, such as a context window. The scale carries the status
 * rather than the value: ticks below `warnAt` are success, the rest warning,
 * so the amber band is always visible as the place the value is heading.
 * Ticks past the value are dimmed, and a hairline marker stands at the value
 * and slides with it. It is 48 ticks unless `segments` says otherwise, 1px
 * apart. `hue` does not apply to it. Pass `warnAt={1}` or more for a meter with
 * no warning band (desktop's efficiency card).
 */
function SegmentMeter({
  value,
  hue,
  segments,
  label,
  variant = "share",
  warnAt = 0.8,
  className,
}: {
  /** 0–1. A gauge pins anything past 1 at the end. */
  value: number;
  hue?: LabelTone;
  /** Tick count: 36 for a share, 48 for a gauge. */
  segments?: number;
  /** What is measured, read out as the meter's name. A meter needs one. */
  label?: string;
  /** `share` (the default): a share of a whole. `gauge`: a fill against a limit. */
  variant?: "share" | "gauge";
  /** Gauge only: where the ticks turn from success to warning, 0–1. */
  warnAt?: number;
  className?: string;
}) {
  if (variant === "gauge") {
    return (
      <GaugeMeter
        value={value}
        segments={segments ?? 48}
        warnAt={warnAt}
        label={label}
        className={className}
      />
    );
  }
  return (
    <ShareMeter
      value={value}
      hue={hue}
      segments={segments ?? 36}
      label={label}
      className={className}
    />
  );
}

function ShareMeter({
  value,
  hue,
  segments,
  label,
  className,
}: {
  value: number;
  hue?: LabelTone;
  segments: number;
  label?: string;
  className?: string;
}) {
  const lit = value > 0 ? Math.max(1, Math.round(Math.min(value, 1) * segments)) : 0;
  const ticks = Array.from({ length: segments }, (_, i) => (
    <span
      key={i}
      className={cn(
        "min-w-0 flex-1 rounded-full",
        hue ? HUE_BG[hue] : "bg-foreground",
        i >= lit && "opacity-20",
      )}
    />
  ));
  return (
    <div
      data-slot="segment-meter"
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      className={cn("flex h-3 items-stretch gap-0.5", className)}
    >
      {ticks.slice(0, lit)}
      <span aria-hidden="true" className="-my-0.5 w-0.5 shrink-0 rounded-full bg-foreground" />
      {ticks.slice(lit)}
    </div>
  );
}

/** Which band a gauge's tick at `at` (0–1, its centre) belongs to. */
function gaugeTone(at: number, warnAt: number): "success" | "warning" {
  return at >= warnAt ? "warning" : "success";
}

function GaugeMeter({
  value,
  segments,
  warnAt,
  label,
  className,
}: {
  value: number;
  segments: number;
  warnAt: number;
  label?: string;
  className?: string;
}) {
  const share = Math.max(0, Math.min(1, value));
  return (
    <div
      data-slot="segment-meter"
      data-variant="gauge"
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(share * 100)}
      className={cn("relative", className)}
    >
      <div aria-hidden="true" className="flex h-3 items-end gap-px">
        {Array.from({ length: segments }, (_, i) => {
          // A tick is lit when its centre is at or below the value, as desktop's.
          const at = (i + 0.5) / segments;
          const tone = gaugeTone(at, warnAt);
          return (
            <span
              key={i}
              data-tone={tone}
              data-lit={at <= share || undefined}
              className={cn(
                "h-full min-w-0 flex-1 rounded-sm transition-opacity duration-base ease-out-strong",
                tone === "warning" ? "bg-warning" : "bg-success",
                at <= share ? "opacity-100" : "opacity-22",
              )}
            />
          );
        })}
      </div>
      {/* The marker: a hairline at the value, sliding with it. */}
      <span
        aria-hidden="true"
        data-slot="segment-meter-marker"
        className="pointer-events-none absolute -top-0.5 h-4 w-px bg-foreground transition-[left] duration-base ease-out-strong motion-reduce:transition-none"
        style={{ left: `${share * 100}%` }}
      />
    </div>
  );
}

export { DotMatrix, SegmentMeter };
