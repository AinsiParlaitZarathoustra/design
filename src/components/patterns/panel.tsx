"use client";

import { motion } from "motion/react";
import { ArrowUpRightIcon, SlidersHorizontalIcon } from "lucide-react";

import { EASE_PANEL } from "../../lib/motion.ts";
import { cn } from "../../lib/utils.ts";
import { IconButton } from "../../ui/icon-button.tsx";

/**
 * The card of this system.
 *
 * `rounded-lg border border-element-selected bg-card` — desktop's card: a
 * hairline on a lighter step of the ramp, never a shadow. A panel may carry
 * a top-right action cluster (filter, expand) of round ghost icon buttons;
 * nothing in it is filled, since the panel's content is the thing to read.
 * Panels enter with a small rise, and a page staggers them down with `delay`
 * so the eye is led rather than presented.
 */
function Panel({
  title,
  subtitle,
  actions,
  onExpand,
  onFilter,
  className,
  bodyClassName,
  children,
  delay = 0,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  onExpand?: () => void;
  onFilter?: () => void;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      data-slot="panel"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay, ease: EASE_PANEL }}
      className={cn(
        "flex min-w-0 flex-col overflow-hidden rounded-lg border border-element-selected bg-card",
        className,
      )}
    >
      {(title || actions || onExpand || onFilter) && (
        <header className="flex items-start justify-between gap-3 px-3.5 pt-3 pb-2">
          <div className="min-w-0">
            {title && <h3 className="truncate text-sm font-medium text-foreground">{title}</h3>}
            {subtitle && <p className="mt-0.5 truncate caption">{subtitle}</p>}
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {actions}
            {onFilter && (
              <IconButton
                icon={SlidersHorizontalIcon}
                label="Filter"
                size="sm"
                shape="round"
                onClick={onFilter}
              />
            )}
            {onExpand && (
              <IconButton
                icon={ArrowUpRightIcon}
                label="Open"
                size="sm"
                shape="round"
                onClick={onExpand}
              />
            )}
          </div>
        </header>
      )}
      <div className={cn("min-h-0 flex-1 px-3.5 pt-1 pb-3.5", bodyClassName)}>{children}</div>
    </motion.section>
  );
}

export { Panel };
