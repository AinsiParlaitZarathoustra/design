"use client";

import { useId } from "react";
import { motion } from "motion/react";

import { cn } from "../../lib/utils.ts";
import { SPRING_INDICATOR } from "../../lib/motion.ts";

/**
 * The tab and toolbar shapes `Segmented` (src/ui) does not cover. A choice
 * among a few views is `Segmented`; these are a page's section tabs, a
 * filter pill and a cluster of tools. Each draws on the same track — a
 * hairline `border` round a `rounded-full` row — so they read as one family.
 */

export type UnderlineTabOption<T extends string> = {
  value: T;
  label: React.ReactNode;
  count?: React.ReactNode;
  icon?: React.ReactNode;
};

/**
 * Page-level tabs with a sliding underline. The active rule is ONE
 * shared-`layoutId` element that slides between tabs on `SPRING_INDICATOR`,
 * rather than two rules cross-fading.
 */
function UnderlineTabs<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: Array<UnderlineTabOption<T>>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  const layoutId = useId();
  return (
    <div
      data-slot="underline-tabs"
      role="tablist"
      className={cn("flex items-center gap-4 border-b border-border-subtle", className)}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative flex h-control-lg items-center gap-1.5 text-xs font-medium outline-none",
              "transition-colors duration-fast ease-out-strong",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.icon}
            {option.label}
            {option.count !== undefined && (
              <span className="rounded-full bg-element-hover px-1 text-3xs tabular-nums">
                {option.count}
              </span>
            )}
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={SPRING_INDICATOR}
                className="absolute inset-x-0 -bottom-px h-px bg-foreground"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/** The `muted label │ value ⌄` toolbar pill. */
function CompoundFilter({
  label,
  children,
  className,
  onClick,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      data-slot="compound-filter"
      onClick={onClick}
      className={cn(
        "inline-flex h-control-sm shrink-0 items-center overflow-hidden rounded-full border border-border text-xs outline-none",
        "transition-colors duration-fast ease-out-strong hover:bg-element-hover",
        className,
      )}
    >
      <span className="border-r border-border-subtle px-2 text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1 px-2 font-medium text-foreground">{children}</span>
    </button>
  );
}

/**
 * Icon buttons set into one track — the same hairline pill as `Segmented`,
 * for a cluster of related tools rather than a choice between views. Each
 * child is its own button; a pressed one (`aria-pressed`) takes the
 * selected fill, as `IconButton` already does.
 */
function SegmentedIconGroup({
  orientation = "horizontal",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      role="group"
      data-slot="segmented-icon-group"
      data-orientation={orientation}
      className={cn(
        "flex w-fit items-center gap-0.5 rounded-full border border-border p-0.5",
        "data-[orientation=vertical]:flex-col",
        "[&_[data-slot=icon-button]]:rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export { CompoundFilter, SegmentedIconGroup, UnderlineTabs };
