"use client";

import * as React from "react";
import { ChevronRightIcon, FolderIcon, GitBranchIcon } from "lucide-react";
import { cn } from "../../lib/utils.ts";
import { Icon } from "../../ui/icon.tsx";
import { Spinner } from "../ui/spinner.tsx";
import {
  CommandSuggestions,
  commandSuggestionId,
  type CommandSuggestionsProps,
} from "./command-suggestions.tsx";

export interface TerminalCommandInputProps {
  value: string;
  onValueChange: (value: string) => void;
  /** History, Tab completion and Ctrl-C live here, in the app. */
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onPaste?: React.ClipboardEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  /** A command is running: the field answers its prompts instead of composing a command. */
  busy?: boolean;
  /** The running program reads keys one by one (a TUI): every key goes straight to it. */
  rawMode?: boolean;
  placeholder?: string;
  /** At the row's end: a `TerminalStopControl`. */
  stopControl?: React.ReactNode;
  /** Before the stop control: a `TerminalStatus`. */
  status?: React.ReactNode;
  textareaRef?: React.Ref<HTMLTextAreaElement>;
  /** The completion list above the field; the field becomes its combobox. */
  suggestions?: Omit<CommandSuggestionsProps, "anchor">;
  className?: string;
}

function placeholderFor(busy?: boolean, rawMode?: boolean) {
  if (rawMode) return "Interactive prompt — keys go straight to it…";
  if (busy) return "Type a response, then press Enter…";
  return "Run a command…";
}

/**
 * The terminal's command line, under its blocks (desktop's block-terminal
 * footer and `command-input.tsx`): a prompt glyph, or a spinner while a
 * command runs, the field, and the row's status and stop control. The field
 * is controlled; every key is the app's to handle.
 *
 * The row is a container, so the status gives way to the field in a narrow
 * pane rather than a narrow window.
 */
export function TerminalCommandInput({
  value,
  onValueChange,
  onKeyDown,
  onPaste,
  onBlur,
  busy,
  rawMode,
  placeholder,
  stopControl,
  status,
  textareaRef,
  suggestions,
  className,
}: TerminalCommandInputProps) {
  const [anchor, setAnchor] = React.useState<HTMLTextAreaElement | null>(null);
  const setRefs = React.useCallback(
    (el: HTMLTextAreaElement | null) => {
      setAnchor(el);
      if (typeof textareaRef === "function") textareaRef(el);
      else if (textareaRef) textareaRef.current = el;
    },
    [textareaRef],
  );
  const expanded = !!suggestions && suggestions.open && suggestions.items.length > 0;

  return (
    <div
      data-slot="command-input"
      className={cn(
        "@container relative flex min-h-[29px] items-center gap-2 border-t border-border bg-background px-3 py-[5px]",
        className,
      )}
    >
      {busy ? (
        <Spinner size="sm" label="" className="text-primary" />
      ) : (
        <Icon icon={ChevronRightIcon} size="sm" className="text-primary" />
      )}
      <textarea
        ref={setRefs}
        rows={1}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        onBlur={onBlur}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-label="Command"
        placeholder={placeholder ?? placeholderFor(busy, rawMode)}
        {...(suggestions
          ? {
              role: "combobox",
              "aria-autocomplete": "list" as const,
              "aria-expanded": expanded,
              "aria-controls": expanded ? suggestions.id : undefined,
              "aria-activedescendant":
                expanded && suggestions.activeIndex >= 0
                  ? commandSuggestionId(suggestions.id, suggestions.activeIndex)
                  : undefined,
            }
          : {})}
        // `min-w-0` lets the field shrink in a narrow pane; the placeholder
        // clips instead of wrapping onto a second line.
        className="min-w-0 flex-1 resize-none overflow-hidden border-none bg-transparent p-0 font-mono text-base text-foreground outline-none placeholder:whitespace-nowrap placeholder:text-muted-foreground"
      />
      {status}
      {status != null && stopControl != null && (
        <span aria-hidden className="hidden h-3 w-px shrink-0 bg-border @[300px]:block" />
      )}
      {stopControl}
      {suggestions && <CommandSuggestions {...suggestions} anchor={anchor} />}
    </div>
  );
}

export interface TerminalStatusProps {
  cwd: string;
  /** `""` is a detached HEAD; unset, not a repository. */
  branch?: string;
  ahead?: number;
  behind?: number;
  /** Uncommitted changes. */
  dirty?: boolean;
}

/**
 * Where the terminal is: the folder, and the branch with its distance from
 * upstream. Hidden in a pane under 300px wide, the branch under 420px.
 */
export function TerminalStatus({ cwd, branch, ahead, behind, dirty }: TerminalStatusProps) {
  const folder = cwd.split("/").filter(Boolean).pop() ?? cwd;
  return (
    <div
      data-slot="terminal-status"
      className="hidden min-w-0 shrink items-center gap-2 text-2xs text-muted-foreground tabular-nums @[300px]:flex"
    >
      <span className="flex min-w-0 items-center gap-1" title={cwd}>
        <Icon icon={FolderIcon} size="xs" />
        <span className="truncate">{folder}</span>
      </span>
      {branch !== undefined && (
        <span className="hidden min-w-0 items-center gap-1 @[420px]:flex">
          <Icon icon={GitBranchIcon} size="xs" />
          <span className="truncate">{branch === "" ? "(detached)" : branch}</span>
          {!!ahead && <span title={`${ahead} ahead of upstream`}>↑{ahead}</span>}
          {!!behind && <span title={`${behind} behind upstream`}>↓{behind}</span>}
          {dirty && (
            <span
              role="img"
              aria-label="Uncommitted changes"
              title="Uncommitted changes"
              className="size-1.5 shrink-0 rounded-full bg-warning"
            />
          )}
        </span>
      )}
    </div>
  );
}
