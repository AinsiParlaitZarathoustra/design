"use client";

import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useId, useRef } from "react";
import type { ComponentProps, ReactNode, Ref } from "react";

import { Spinner } from "../components/ui/spinner.tsx";
import { cn } from "../lib/utils.ts";
import { Button } from "./button.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./dropdown-menu.tsx";
import { Icon } from "./icon.tsx";

/**
 * A primary action with its alternatives on an attached ⌄: desktop's
 * source-control ship button ("Commit" beside a menu of "Commit & push",
 * "Commit, push & PR"). Built from `Button` and `DropdownMenu`; the menu's
 * rows are yours (`DropdownMenuItem`s).
 *
 * The two halves sit in a `role="group"` named by `label`, 2px apart. The
 * menu opens against the whole group, aligned to its end, so it lines up with
 * the button rather than the chevron. The root takes `ref`, so a popover the
 * menu opens (desktop's "Edit pull request…") can anchor to the same place.
 *
 * `busy` swaps the icon for a spinner and `busyLabel` for the label, and
 * holds both halves: nothing starts while one run is going. `disabledReason`
 * turns the primary off and says why: in its tooltip for a pointer, and as
 * its description for a keyboard and a screen reader (it stays focusable
 * while off, `aria-disabled`). The menu stays open to the other choices.
 */
interface SplitButtonProps extends Omit<ComponentProps<"div">, "onClick" | "children" | "ref"> {
  ref?: Ref<HTMLDivElement>;
  /** The group's accessible name: "Commit actions". */
  label: string;
  /** The primary action's label. */
  children: ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  /** Why the primary cannot run; set, it is disabled and this is its tooltip. */
  disabledReason?: string | null;
  /** A run is going: a spinner on the primary, and both halves held. */
  busy?: boolean;
  /** What the primary says while busy ("Pushing…"). Defaults to its label. */
  busyLabel?: ReactNode;
  /** The ⌄'s accessible name: "More commit actions". */
  menuLabel: string;
  /** The menu's rows. */
  menu: ReactNode;
  /** The primary's look; the ⌄ is always `outline`. */
  variant?: "default" | "secondary" | "outline";
  size?: "xs" | "sm" | "md";
  /** Classes for the menu's popup, such as its width. */
  menuClassName?: string;
}

function SplitButton({
  ref,
  label,
  children,
  icon,
  onClick,
  disabledReason = null,
  busy = false,
  busyLabel,
  menuLabel,
  menu,
  variant = "default",
  size = "sm",
  menuClassName,
  className,
  ...props
}: SplitButtonProps) {
  const groupRef = useRef<HTMLDivElement | null>(null);
  const reasonId = useId();
  // Stable, so the caller's ref is not detached and reattached on every render.
  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      groupRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref],
  );
  return (
    <div
      ref={setRef}
      role="group"
      aria-label={label}
      data-slot="split-button"
      data-busy={busy || undefined}
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    >
      <Button
        data-slot="split-button-primary"
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={busy || disabledReason !== null}
        // Off but still focusable (`aria-disabled`): with a reason, so a
        // keyboard reaches it and a screen reader reads why; while busy, so
        // the button just pressed keeps focus instead of dropping it to body.
        focusableWhenDisabled={busy || disabledReason !== null}
        title={disabledReason ?? undefined}
        aria-describedby={disabledReason !== null ? reasonId : undefined}
        aria-busy={busy || undefined}
      >
        {busy ? <Spinner size="sm" label="" /> : icon && <Icon icon={icon} size="sm" />}
        {busy ? (busyLabel ?? children) : children}
      </Button>
      {disabledReason !== null && (
        <span id={reasonId} className="sr-only">
          {disabledReason}
        </span>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              data-slot="split-button-menu"
              variant="outline"
              size={size}
              aria-label={menuLabel}
              disabled={busy}
              focusableWhenDisabled={busy}
            >
              <Icon icon={ChevronDown} size="sm" />
            </Button>
          }
        />
        <DropdownMenuContent
          anchor={groupRef}
          align="end"
          className={cn("min-w-56", menuClassName)}
        >
          {menu}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { SplitButton };
export type { SplitButtonProps };
