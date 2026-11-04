"use client";

import { forwardRef, useImperativeHandle } from "react";
import { motion, useAnimationControls } from "motion/react";
import type { Variants } from "motion/react";
import { cn } from "../../lib/utils.ts";

import { ICON_STROKE_WIDTH } from "../../ui/icon.tsx";

/**
 * A tray with an arrow that springs up out of it — "share" / "send out".
 *
 * The arrow rides a critically damped spring (damping = 2·√stiffness), as
 * the mailbox's flag does: it rises and stops, with no overshoot, since a
 * hover throws nothing. Both directions name their spring; motion's default
 * for `y` is under-damped and would bounce on the way back.
 *
 * Animates on hover by itself, or through a ref (`startAnimation` /
 * `stopAnimation`) so a whole button can drive it. `currentColor`, at the
 * system's icon stroke so it sits beside Lucide glyphs.
 */

export type UploadIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

const ARROW: Variants = {
  normal: {
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 35 },
  },
  animate: {
    y: -2,
    transition: { type: "spring", stiffness: 280, damping: 34, mass: 1 },
  },
};

const UploadIcon = forwardRef<
  UploadIconHandle,
  Omit<React.ComponentProps<"span">, "ref"> & {
    size?: number;
    strokeWidth?: number;
    /** When true, hover on the icon itself does nothing; the parent drives it. */
    controlled?: boolean;
  }
>(function UploadIcon(
  {
    size = 14,
    strokeWidth = ICON_STROKE_WIDTH,
    controlled = false,
    className,
    onMouseEnter,
    onMouseLeave,
    ...props
  },
  ref,
) {
  const controls = useAnimationControls();

  useImperativeHandle(
    ref,
    () => ({
      startAnimation: () => void controls.start("animate"),
      stopAnimation: () => void controls.start("normal"),
    }),
    [controls],
  );

  return (
    <span
      data-slot="upload-icon"
      aria-hidden="true"
      className={cn("inline-flex shrink-0", className)}
      onMouseEnter={(e) => {
        if (!controlled) void controls.start("animate");
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (!controlled) void controls.start("normal");
        onMouseLeave?.(e);
      }}
      {...props}
    >
      <svg
        fill="none"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="overflow-visible"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <motion.g animate={controls} initial="normal" variants={ARROW}>
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </motion.g>
      </svg>
    </span>
  );
});

export { UploadIcon };
