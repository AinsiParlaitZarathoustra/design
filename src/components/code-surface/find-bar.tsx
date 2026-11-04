"use client";

import * as React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaseSensitiveIcon,
  ChevronRightIcon,
  RegexIcon,
  ReplaceAllIcon,
  ReplaceIcon,
  SearchIcon,
  TextSelectIcon,
  WholeWordIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/utils.ts";
import { IconButton } from "../../ui/icon-button.tsx";
import { Icon } from "../../ui/icon.tsx";
import { Hint } from "../../ui/tooltip.tsx";

export type FindFlag = "caseSensitive" | "wholeWord" | "regexp";

export interface FindBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  /** The current match, 0-based. `null` or unset: none chosen, so the count reads "12 results". */
  matchIndex?: number | null;
  /** Unset while the count is unknown (a search still running): no count shows. */
  matchCount?: number;
  /** The query does not parse (a bad regular expression). */
  invalid?: boolean;
  caseSensitive?: boolean;
  wholeWord?: boolean;
  regexp?: boolean;
  /** Shows the three option toggles. Without it the bar is find-only, as the terminal's is. */
  onToggle?: (flag: FindFlag, value: boolean) => void;
  /** The replacement text. The replace row exists only with `onReplaceChange`. */
  replace?: string;
  onReplaceChange?: (replace: string) => void;
  replaceOpen?: boolean;
  onReplaceOpenChange?: (open: boolean) => void;
  onReplace?: () => void;
  onReplaceAll?: () => void;
  onNext: () => void;
  onPrevious: () => void;
  /** Escape anywhere in the bar, or the close button. */
  onClose: () => void;
  /** Selects every match at once (Alt+Enter in the query). */
  onSelectAll?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  /** The query input, for an app that puts the keyboard back in it (⌘F while open). */
  inputRef?: React.Ref<HTMLInputElement>;
  className?: string;
}

const INPUT =
  "h-full w-44 min-w-0 shrink bg-transparent px-1.5 font-sans text-sm text-foreground outline-none placeholder:text-muted-foreground";

function Action(props: {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  pressed?: boolean;
}) {
  return (
    <Hint label={props.label}>
      <IconButton
        size="sm"
        icon={props.icon}
        label={props.label}
        onClick={props.onClick}
        disabled={props.disabled ?? false}
        {...(props.pressed === undefined ? {} : { "aria-pressed": props.pressed })}
      />
    </Hint>
  );
}

function countLabel(query: string, matchCount?: number, matchIndex?: number | null) {
  if (!query || matchCount === undefined) return "";
  if (matchCount === 0) return "No results";
  if (matchIndex != null) return `${matchIndex + 1} of ${matchCount}`;
  return `${matchCount} ${matchCount === 1 ? "result" : "results"}`;
}

/**
 * Find (and replace) over a file or a terminal's output: desktop's
 * `FileFindBar` in its looks, with the editor's options and replace added.
 * It is controlled and searches nothing itself; the app runs the search and
 * passes the count back.
 *
 * Keys: Enter is the next match and Shift+Enter the previous; Alt+Enter
 * selects every match (with `onSelectAll`); in the replace field Enter
 * replaces and ⌘⌥Enter (Ctrl+Alt+Enter) replaces all; Escape anywhere closes.
 *
 * It opens from a key, so it does not animate in.
 */
export function FindBar({
  query,
  onQueryChange,
  matchIndex,
  matchCount,
  invalid,
  caseSensitive = false,
  wholeWord = false,
  regexp = false,
  onToggle,
  replace = "",
  onReplaceChange,
  replaceOpen = false,
  onReplaceOpenChange,
  onReplace,
  onReplaceAll,
  onNext,
  onPrevious,
  onClose,
  onSelectAll,
  placeholder = "Find",
  autoFocus,
  inputRef,
  className,
}: FindBarProps) {
  const replaceId = React.useId();
  const canReplace = onReplaceChange !== undefined;
  const none = matchCount === 0;
  const canStep = !none;
  const canSelectAll = query !== "" && !none;
  const label = countLabel(query, matchCount, matchIndex);

  return (
    <div
      role="search"
      aria-label={canReplace ? "Find and replace" : "Find"}
      data-slot="find-bar"
      data-invalid={invalid || undefined}
      onKeyDown={(e) => {
        if (e.key !== "Escape") return;
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}
      className={cn(
        "flex max-w-full min-w-0 flex-col gap-0.5 rounded-md border border-border bg-popover py-1 pr-1 pl-1 shadow-md",
        invalid && "border-error",
        className,
      )}
    >
      <div className="flex h-control-sm min-w-0 items-center gap-0.5">
        {canReplace ? (
          <Hint label={replaceOpen ? "Hide replace" : "Show replace"}>
            <IconButton
              size="xs"
              icon={ChevronRightIcon}
              label={replaceOpen ? "Hide replace" : "Show replace"}
              aria-expanded={replaceOpen}
              aria-controls={replaceOpen ? replaceId : undefined}
              onClick={() => onReplaceOpenChange?.(!replaceOpen)}
              className={cn(
                "[&_svg]:transition-transform [&_svg]:duration-fast",
                replaceOpen && "[&_svg]:rotate-90",
              )}
            />
          </Hint>
        ) : (
          <Icon icon={SearchIcon} size="sm" className="ml-1 shrink-0 text-muted-foreground" />
        )}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            if (e.altKey && !e.metaKey && !e.ctrlKey) {
              if (onSelectAll && canSelectAll) onSelectAll();
              return;
            }
            if (!canStep) return;
            if (e.shiftKey) onPrevious();
            else onNext();
          }}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-invalid={invalid || undefined}
          spellCheck={false}
          autoFocus={autoFocus}
          className={cn(INPUT, invalid && "text-error")}
        />
        <span
          aria-live="polite"
          className="min-w-16 shrink-0 px-1 text-right text-xs text-muted-foreground tabular-nums"
        >
          {label}
        </span>
        {onToggle && (
          <>
            <Action
              label="Match case"
              icon={CaseSensitiveIcon}
              pressed={caseSensitive}
              onClick={() => onToggle("caseSensitive", !caseSensitive)}
            />
            <Action
              label="Match whole word"
              icon={WholeWordIcon}
              pressed={wholeWord}
              onClick={() => onToggle("wholeWord", !wholeWord)}
            />
            <Action
              label="Use regular expression"
              icon={RegexIcon}
              pressed={regexp}
              onClick={() => onToggle("regexp", !regexp)}
            />
          </>
        )}
        <Action
          label="Previous match"
          icon={ArrowUpIcon}
          onClick={onPrevious}
          disabled={!canStep}
        />
        <Action label="Next match" icon={ArrowDownIcon} onClick={onNext} disabled={!canStep} />
        {onSelectAll && (
          <Action
            label="Select all matches"
            icon={TextSelectIcon}
            onClick={onSelectAll}
            disabled={!canSelectAll}
          />
        )}
        <Action label="Close" icon={XIcon} onClick={onClose} />
      </div>
      {canReplace && replaceOpen && (
        <div id={replaceId} className="flex h-control-sm min-w-0 items-center gap-0.5">
          {/* Under the chevron, so the two fields start together. */}
          <span aria-hidden className="size-control-xs shrink-0" />
          <input
            value={replace}
            onChange={(e) => onReplaceChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              e.preventDefault();
              if (e.altKey && (e.metaKey || e.ctrlKey)) onReplaceAll?.();
              else onReplace?.();
            }}
            placeholder="Replace"
            aria-label="Replace"
            spellCheck={false}
            className={INPUT}
          />
          <span className="min-w-16 shrink-0" />
          <Action
            label="Replace"
            icon={ReplaceIcon}
            onClick={() => onReplace?.()}
            disabled={none}
          />
          <Action
            label="Replace all"
            icon={ReplaceAllIcon}
            onClick={() => onReplaceAll?.()}
            disabled={none}
          />
        </div>
      )}
    </div>
  );
}
