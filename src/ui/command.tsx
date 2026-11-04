"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { ChevronRight, Search } from "lucide-react";
import { cn } from "../lib/utils.ts";
import { Icon } from "./icon.tsx";

/**
 * The command shell: the large search dialog that ⌘K, ⌘P and the new-tab
 * palette all open (decision 32's shape, shadcn's base-style `command`).
 *
 * A centred dialog with no Positioner, the search field on top, a list, and
 * a footer of key hints. It has no open or close animation on purpose — it
 * is opened hundreds of times a day, and a scale-in reads as latency.
 *
 * The keyboard model belongs to the caller: the field keeps focus, the
 * caller tracks the highlighted row and passes `active` to `CommandItem`, so
 * a mouse resting over the list never fights the keys.
 *
 * Scales: `rounded-xl` (the dialog step), `shadow-lg`, `z-overlay` for the
 * scrim and `z-modal` for the dialog.
 */

function CommandDialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />;
}

function CommandDialogPopup({
  className,
  children,
  title,
  ...props
}: DialogPrimitive.Popup.Props & {
  /** The dialog's accessible name, read out on open. */
  title: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="command-dialog-backdrop"
        className="fixed inset-0 z-overlay scrim"
      />
      <DialogPrimitive.Popup
        data-slot="command-dialog-popup"
        aria-describedby={undefined}
        className={cn(
          // High rather than centred: the list grows downward, and a centred
          // dialog would move its own field as the results filter.
          "fixed top-[12vh] left-1/2 z-modal -translate-x-1/2",
          "flex w-[min(46rem,calc(100vw-2rem))] max-h-[76vh] flex-col overflow-hidden",
          "rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none",
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

/** The search field. `startAddon` replaces the magnifier (a back arrow in a
 *  submenu); `endAddon` sits at its right end (a step's "Create ⌘ Enter").
 *  The input is a combobox over the list it controls. */
function CommandInput({
  className,
  startAddon,
  endAddon,
  ...props
}: React.ComponentProps<"input"> & { startAddon?: React.ReactNode; endAddon?: React.ReactNode }) {
  return (
    <div data-slot="command-input" className="flex shrink-0 items-center gap-3 px-5 pt-4 pb-3">
      <span className="flex shrink-0 items-center text-muted-foreground">
        {startAddon ?? <Icon icon={Search} size="lg" />}
      </span>
      <input
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-md text-foreground outline-none focus-ring-none",
          "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      {endAddon}
    </div>
  );
}

/** Lets a `CommandEmpty` inside a `CommandPanel` tell the panel it is empty. */
const PanelEmptyContext = React.createContext<((empty: boolean) => void) | null>(null);

/**
 * The scroll area under the field: a listbox of `CommandItem`s. While a
 * `CommandEmpty` sits inside it, it is a plain region instead, since a
 * listbox may hold only options and the empty line is not one.
 */
function CommandPanel({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  /** `tall` is ⌘P's list: the same width, more rows. */
  size?: "default" | "tall";
}) {
  const [empty, setEmpty] = React.useState(false);
  return (
    <PanelEmptyContext.Provider value={setEmpty}>
      <div
        data-slot="command-panel"
        role={empty ? undefined : "listbox"}
        className={cn(
          "relative min-h-0 overflow-y-auto overscroll-contain px-2 pb-2",
          size === "tall" ? "max-h-[min(42rem,64vh)]" : "max-h-[min(34rem,58vh)]",
          className,
        )}
        {...props}
      />
    </PanelEmptyContext.Provider>
  );
}

/**
 * `default` is the palette's size. `compact` is the inline pickers' (the
 * slash-command and @-mention lists under the caret): full-bleed 26px rows
 * with no radius, an eyebrow group header, and a 24px footer on a hairline.
 */
type CommandSize = "default" | "compact";

/** A group's small muted header ("Actions", "Recent Sessions", a project). */
function CommandGroupLabel({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: CommandSize }) {
  return (
    <div
      data-slot="command-group-label"
      data-size={size === "compact" ? size : undefined}
      role="presentation"
      className={cn(
        size === "compact"
          ? "eyebrow truncate px-3 pt-2 pb-1 select-none"
          : "px-2 pt-2 pb-1.5 text-xs font-medium text-muted-foreground select-none",
        className,
      )}
      {...props}
    />
  );
}

/**
 * One row. `active` is the keyboard highlight, which the caller owns.
 *
 * `compact` rows are a control height (`h-control-md`, 26px) so a virtualised
 * list can size them without measuring. They also light under the pointer,
 * since an inline picker is driven by mouse as often as by keys.
 *
 * `listbox={false}` drops `role="option"` and its `aria-selected` /
 * `aria-disabled`, leaving `data-active` / `data-disabled` for styling. It is
 * for a list that is not a listbox: an inline picker whose keyboard model is
 * the editor's caret, and whose roles are still an open question (ATL-718).
 * Put such rows in your own scroller, not in `CommandPanel`, which is one.
 */
function CommandItem({
  className,
  active = false,
  disabled = false,
  size = "default",
  listbox = true,
  ...props
}: React.ComponentProps<"div"> & {
  active?: boolean;
  disabled?: boolean;
  size?: CommandSize;
  listbox?: boolean;
}) {
  return (
    <div
      data-slot="command-item"
      data-size={size === "compact" ? size : undefined}
      role={listbox ? "option" : undefined}
      aria-selected={listbox ? active : undefined}
      aria-disabled={(listbox && disabled) || undefined}
      data-active={active || undefined}
      data-disabled={(!listbox && disabled) || undefined}
      className={cn(
        size === "compact"
          ? [
              "flex h-control-md w-full items-center gap-2 px-3 text-left text-sm select-none",
              active
                ? "bg-element-selected text-foreground"
                : cn("text-secondary-foreground", !disabled && "hover:bg-element-hover"),
            ]
          : "flex min-h-9 w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-md text-foreground select-none",
        disabled ? "disabled-look" : "cursor-pointer",
        size !== "compact" && active && "bg-element-selected",
        className,
      )}
      {...props}
    />
  );
}

/** The leading glyph, held to the first line of a two-line row. */
function CommandItemIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-item-icon"
      className={cn("flex h-5 shrink-0 items-center self-start text-muted-foreground", className)}
      {...props}
    />
  );
}

/** A chord as plain glyphs on the right of a row ("⌘⇧N") — quieter than
 *  keycaps, which belong to the footer. */
function CommandShortcut({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="command-shortcut"
      className={cn(
        "ms-auto shrink-0 font-sans text-xs font-medium tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** The `>` on a row that drills into a submenu. */
function CommandSubmenuChevron({ className }: { className?: string }) {
  return (
    <Icon
      icon={ChevronRight}
      size="lg"
      className={cn("-me-0.5 ms-auto text-muted-foreground", className)}
    />
  );
}

/** The key legend along the bottom. `compact` is the inline pickers' footer:
 *  no fill, a hairline above, the smallest type step. */
function CommandFooter({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: CommandSize }) {
  return (
    <div
      data-slot="command-footer"
      data-size={size === "compact" ? size : undefined}
      className={cn(
        size === "compact"
          ? "flex min-h-control-sm shrink-0 items-center justify-between gap-2 border-t border-border px-3 py-1 text-3xs text-muted-foreground"
          : "flex shrink-0 items-center justify-between gap-2 bg-element-hover px-5 py-2.5 text-sm font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** One "keys + label" pair in the footer. */
function CommandFooterHint({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-footer-hint"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

/** The centred line a list shows when it has no rows. */
function CommandEmpty({ className, ...props }: React.ComponentProps<"div">) {
  const setPanelEmpty = React.useContext(PanelEmptyContext);
  // Before paint, so the panel is never a listbox around this line.
  React.useLayoutEffect(() => {
    if (!setPanelEmpty) return;
    setPanelEmpty(true);
    return () => setPanelEmpty(false);
  }, [setPanelEmpty]);
  return (
    <div
      data-slot="command-empty"
      className={cn("py-10 text-center text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  CommandDialog,
  CommandDialogPopup,
  CommandEmpty,
  CommandFooter,
  CommandFooterHint,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandItemIcon,
  CommandPanel,
  CommandShortcut,
  CommandSubmenuChevron,
};
export type { CommandSize };
