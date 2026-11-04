"use client";

import * as React from "react";
import { useId, useRef } from "react";
import { motion } from "motion/react";

import { cn } from "../lib/utils.ts";
import { SPRING_INDICATOR } from "../lib/motion.ts";

/**
 * A segmented control: one choice among a few, all visible at once (theme
 * mode, a density). Ported from the Standards `SegmentedPills`.
 *
 * The options sit in ONE track with a hairline edge, and the active one is a
 * thumb that slides inside it (a shared `layoutId`, `SPRING_INDICATOR`) — so
 * the control reads as one object with parts rather than loose words, and the
 * selection moves instead of cross-fading. The thumb is the selected-element
 * fill, never the primary: this is a choice, not the loudest action on screen.
 *
 * Radio-group semantics: one tab stop, arrow keys move the selection,
 * Home/End jump to the ends. The tab stop is the selected option, or the
 * first option when `value` matches none (a "Custom" range the track has no
 * preset for), so the group is always reachable by Tab.
 */

interface SegmentedOptionBase<T extends string> {
  value: T;
  icon?: React.ReactNode;
  /** A small tally after the label ("Unread 3"), on a quiet chip that
   *  lifts with the option when it is chosen. */
  count?: number | string;
}

/**
 * One option. `label` is what it shows: text, or any node (an icon beside a
 * word, a styled fragment), whose text content is its accessible name unless
 * `ariaLabel` is given. `ariaLabel` is the name (and an `iconOnly` option's
 * tooltip) when the label is not plain text or would read badly aloud.
 *
 * `iconOnly` draws only the icon; the label stays the option's accessible
 * name and its tooltip. For a toolbar's icon pair (a diff's layout). An
 * icon-only option shows no text, so the type requires a name: a string
 * `label`, or an `ariaLabel`.
 */
export type SegmentedOption<T extends string> = SegmentedOptionBase<T> &
  (
    | { iconOnly?: false; label: React.ReactNode; ariaLabel?: string }
    | { iconOnly: true; label: string; ariaLabel?: string }
    | { iconOnly: true; label: React.ReactNode; ariaLabel: string }
  );

export interface SegmentedProps<T extends string> {
  value: T;
  onValueChange: (next: T) => void;
  options: readonly SegmentedOption<T>[];
  disabled?: boolean;
  size?: "sm" | "md";
  "aria-label": string;
  className?: string;
}

export function Segmented<T extends string>({
  value,
  onValueChange,
  options,
  disabled,
  size = "md",
  className,
  ...props
}: SegmentedProps<T>) {
  const layoutId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = options.findIndex((option) => option.value === value);
  const tabStop = selected === -1 ? 0 : selected;

  const move = (from: number, to: number) => {
    if (options.length === 0) return;
    const index = (to + options.length) % options.length;
    // Staying put on the selected option is a no-op; staying put with
    // nothing selected (Home on the first) selects it.
    if (index === from && index === selected) return;
    onValueChange(options[index].value);
    buttons.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        move(index, index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        move(index, index - 1);
        break;
      case "Home":
        event.preventDefault();
        move(index, 0);
        break;
      case "End":
        event.preventDefault();
        move(index, options.length - 1);
        break;
    }
  };

  return (
    <div
      data-slot="segmented"
      role="radiogroup"
      aria-label={props["aria-label"]}
      aria-disabled={disabled || undefined}
      className={cn(
        "flex w-fit max-w-full items-center gap-0.5 rounded-full border border-border p-0.5",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {options.map((option, index) => {
        const active = option.value === value;
        // An icon-only option shows no text, so its name has to be spelled
        // out; any other option is named by what it shows unless told.
        const name =
          option.ariaLabel ??
          (option.iconOnly && typeof option.label === "string" ? option.label : undefined);
        return (
          <button
            key={option.value}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={name}
            title={option.iconOnly ? name : undefined}
            tabIndex={index === tabStop ? 0 : -1}
            disabled={disabled}
            onClick={() => {
              if (!active) onValueChange(option.value);
            }}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "relative shrink-0 cursor-pointer rounded-full font-medium whitespace-nowrap outline-none",
              "transition-colors duration-fast ease-out-strong",
              "disabled:cursor-not-allowed",
              size === "sm" ? "h-control-xs text-2xs" : "h-control-sm text-xs",
              option.iconOnly
                ? size === "sm"
                  ? "px-1"
                  : "px-1.5"
                : size === "sm"
                  ? "px-2"
                  : "px-2.5",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={SPRING_INDICATOR}
                className="absolute inset-0 rounded-full bg-element-selected"
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {option.icon}
              {!option.iconOnly && option.label}
              {!option.iconOnly && option.count !== undefined && (
                <span
                  className={cn(
                    "rounded-full px-1 text-3xs tabular-nums",
                    active ? "bg-element-active" : "bg-element-hover",
                  )}
                >
                  {option.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
