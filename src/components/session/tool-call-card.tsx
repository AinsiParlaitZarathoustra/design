"use client";

import {
  ArrowRightLeftIcon,
  BookOpenIcon,
  BrainIcon,
  CheckIcon,
  ChevronRightIcon,
  CopyIcon,
  CircleXIcon,
  FileCode2Icon,
  GlobeIcon,
  PencilIcon,
  SearchIcon,
  SquareTerminalIcon,
  Trash2Icon,
  WrenchIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "../../lib/utils.ts";
import { Button } from "../../ui/button.tsx";
import { IconButton } from "../../ui/icon-button.tsx";
import { Icon } from "../../ui/icon.tsx";
import { DiffStat } from "../ui/code-block.tsx";
import { Spinner } from "../ui/spinner.tsx";
import { formatBytes, formatDuration, stripAnsi } from "./session-view-helpers.ts";
import type { CommentAnchor, DiffData, Payload, ToolCallView, ToolKind } from "./session-view.ts";

/**
 * One tool call: a one-line header you click, and what was recorded behind it.
 *
 * Desktop's session call row. The line is a sentence (glyph, the call's title,
 * its target) with the figures in a right-hand gutter (`+n −m`, the duration),
 * so a column of calls scans as text on the left and numbers on the right.
 * Opened, it shows the paths, the input and the output (or the terminal run),
 * then each diff. It never fetches: a truncated payload offers
 * `onLoadPayload`, and the app fills it in.
 *
 * Rows have no border of their own: a run of calls sits in one bordered box,
 * divided by hairlines (`TurnRow` draws it), as desktop's call table does.
 *
 * Huge payloads stay cheap. At most 400 lines of each render, the head for
 * input and diffs and the tail for terminal output (the end is where a command
 * says what happened), and "Show more" adds 2,000 at a time.
 */

/** One glyph per kind, desktop's tool vocabulary. Shapes only; the one tint is red on failure. */
export const TOOL_KIND_ICON: Record<ToolKind, LucideIcon> = {
  read: BookOpenIcon,
  edit: PencilIcon,
  delete: Trash2Icon,
  move: ArrowRightLeftIcon,
  search: SearchIcon,
  execute: SquareTerminalIcon,
  think: BrainIcon,
  fetch: GlobeIcon,
  other: WrenchIcon,
};

/** Kinds whose target is a file, drawn as a dotted link-like run. */
const FILE_KINDS: ReadonlySet<ToolKind> = new Set(["read", "edit", "delete", "move"]);

const LINES_INITIAL = 400;
const LINES_STEP = 2000;

/** How long Copy shows that it copied. */
const COPIED_MS = 1200;

/** Every string the card draws beyond the call's own data. */
export interface ToolCallCardLabels {
  copy: string;
  copied: string;
  /** The button that shows the next `n` lines. */
  showMore: (n: number) => string;
  /** A truncated payload's load button; `size` is formatted ("94.1 KB") when known. */
  loadFull: (part: "input" | "output", size?: string) => string;
  /** A truncated payload with nothing to load it. */
  truncated: (part: "input" | "output") => string;
  /** A binary payload; `size` is formatted when known. */
  binary: (part: "input" | "output", size?: string) => string;
  /** An opened call that recorded nothing. */
  empty: string;
}

export const DEFAULT_TOOL_CALL_CARD_LABELS: ToolCallCardLabels = {
  copy: "Copy",
  copied: "Copied",
  showMore: (n) => `Show ${n.toLocaleString("en-US")} more lines`,
  loadFull: (part, size) => `Load full ${part}${size ? ` (${size})` : ""}`,
  truncated: (part) => `${part === "input" ? "Input" : "Output"} truncated`,
  binary: (part, size) => `Binary ${part}${size ? `, ${size}` : ""}`,
  empty: "Nothing else was recorded for this call.",
};

/** What a payload's Copy asks the app to put on the clipboard. */
type CopyPayload = (part: "input" | "output", text: string) => Promise<boolean> | boolean;

export interface ToolCallCardProps {
  call: ToolCallView;
  /** Open on first render. Uncontrolled after that. */
  defaultOpen?: boolean;
  /** Controlled open state; leave undefined for an uncontrolled card. */
  open?: boolean;
  /** Called with the next open state when the header is clicked. */
  onOpenChange?: (open: boolean) => void;
  /** Adds Copy to each whole text payload; resolve `true` once the text is on the clipboard. */
  onCopy?: CopyPayload;
  /** Overrides for the card's strings. */
  labels?: Partial<ToolCallCardLabels>;
  /** A truncated payload's "Load full …" asks the app for the rest. */
  onLoadPayload?: (part: "input" | "output") => void;
  /** Draws each of `call.diffs`. Defaults to `DefaultDiff`. */
  renderDiff?: (diff: DiffData) => ReactNode;
  /** Beside the header, outside the disclosure: the app's comment control. */
  commentSlot?: (anchor: CommentAnchor) => ReactNode;
  className?: string;
}

export function ToolCallCard({
  call,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  onCopy,
  labels: labelOverrides,
  onLoadPayload,
  renderDiff,
  commentSlot,
  className,
}: ToolCallCardProps) {
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;
  const toggle = () => {
    if (openProp === undefined) setOpenState(!open);
    onOpenChange?.(!open);
  };
  const labels = labelOverrides
    ? { ...DEFAULT_TOOL_CALL_CARD_LABELS, ...labelOverrides }
    : DEFAULT_TOOL_CALL_CARD_LABELS;
  const bodyId = useId();
  const failed = call.status === "failed";
  const running = call.status === "running";
  const pending = call.status === "pending";
  const target = call.title ? undefined : call.paths?.[0];
  const added = call.diffs?.reduce((n, d) => n + (d.insertions ?? 0), 0) ?? 0;
  const removed = call.diffs?.reduce((n, d) => n + (d.deletions ?? 0), 0) ?? 0;
  const empty = !call.input && !call.output && !call.terminal && !call.diffs?.length;

  return (
    <div
      data-slot="tool-call-card"
      data-status={call.status}
      data-tool-call-id={call.id}
      className={cn("min-w-0", className)}
    >
      <div className="group/row flex h-8 items-center gap-2 bg-card px-3 transition-colors hover:bg-element-hover">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={open ? bodyId : undefined}
          onClick={toggle}
          title={target ? `${call.title ?? call.name} ${target}` : (call.title ?? call.name)}
          className="group/marker flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
        >
          <span className="flex w-4 shrink-0 justify-center text-muted-foreground">
            {running ? (
              <Spinner size="sm" label="Running" />
            ) : failed ? (
              <Icon icon={CircleXIcon} size="md" className="text-error" aria-label="Failed" />
            ) : (
              <Icon icon={TOOL_KIND_ICON[call.kind]} size="md" />
            )}
          </span>
          <span
            className={cn(
              "min-w-0 truncate text-sm",
              failed ? "text-error" : pending ? "text-disabled" : "text-secondary-foreground",
            )}
          >
            {call.title ?? call.name}
            {target && (
              <>
                {" "}
                <span
                  className={cn(
                    "text-disabled",
                    FILE_KINDS.has(call.kind) &&
                      "underline decoration-dotted underline-offset-3 group-hover/marker:text-secondary-foreground",
                  )}
                >
                  {target}
                </span>
              </>
            )}
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-2 font-mono text-xs text-disabled tabular-nums">
            {(added > 0 || removed > 0) && <DiffStat added={added} removed={removed} />}
            {failed && <span className="text-error">failed</span>}
            {call.durationMs !== undefined && <span>{formatDuration(call.durationMs)}</span>}
          </span>
          <Icon
            icon={ChevronRightIcon}
            size="sm"
            className={cn(
              "shrink-0 text-border-strong transition-transform duration-fast",
              open && "rotate-90",
            )}
          />
        </button>
        {commentSlot?.({ kind: "tool_call", id: call.id })}
      </div>

      {open && (
        <div
          id={bodyId}
          className="space-y-2.5 border-t border-border-subtle bg-background px-3 py-3"
        >
          {call.paths && call.paths.length > 0 && (
            <ul className="space-y-0.5 font-mono text-xs text-muted-foreground">
              {call.paths.map((path) => (
                <li key={path} className="truncate">
                  {path}
                </li>
              ))}
            </ul>
          )}
          {call.input && (
            <PayloadBlock
              part="input"
              payload={call.input}
              from="head"
              labels={labels}
              onCopy={onCopy}
              onLoad={onLoadPayload && (() => onLoadPayload("input"))}
            />
          )}
          {call.terminal ? (
            <TerminalBlock terminal={call.terminal} labels={labels} onCopy={onCopy} />
          ) : (
            call.output && (
              <PayloadBlock
                part="output"
                payload={call.output}
                from="head"
                labels={labels}
                onCopy={onCopy}
                onLoad={onLoadPayload && (() => onLoadPayload("output"))}
              />
            )
          )}
          {call.diffs?.map((diff, i) => (
            <div key={`${i}:${diff.path}`}>
              {renderDiff ? renderDiff(diff) : <DefaultDiff diff={diff} labels={labels} />}
            </div>
          ))}
          {empty && <p className="font-mono text-xs text-disabled">{labels.empty}</p>}
        </div>
      )}
    </div>
  );
}

/** The bordered mono box every payload sits in, with its header. */
function Frame({
  label,
  icon = FileCode2Icon,
  aside,
  terminal,
  children,
}: {
  label: ReactNode;
  icon?: LucideIcon;
  aside?: ReactNode;
  terminal?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border-subtle",
        terminal ? "bg-(--terminal-background) text-(--terminal-foreground)" : "bg-card",
      )}
    >
      <div className="flex items-center gap-2 border-b border-border-subtle px-3 py-1.5">
        <Icon icon={icon} size="sm" className="shrink-0 opacity-70" />
        <span
          className={cn(
            "min-w-0 flex-1 truncate font-mono text-xs",
            !terminal && "text-secondary-foreground",
          )}
        >
          {label}
        </span>
        {aside}
      </div>
      {children}
    </div>
  );
}

type LineTone = "added" | "removed" | "hunk" | undefined;

/**
 * At most `LINES_INITIAL` lines, the head or the tail, and a button for the
 * next 2,000. The text is split once per payload.
 */
function Lines({
  lines,
  from,
  tone,
  dim,
  showMore = DEFAULT_TOOL_CALL_CARD_LABELS.showMore,
}: {
  lines: string[];
  from: "head" | "tail";
  showMore?: (n: number) => string;
  tone?: (line: string) => LineTone;
  /** Lines in the surface's own ink rather than the secondary one. */
  dim?: boolean;
}) {
  const [shown, setShown] = useState(LINES_INITIAL);
  const hidden = Math.max(0, lines.length - shown);
  const visible =
    hidden === 0
      ? lines
      : from === "head"
        ? lines.slice(0, shown)
        : lines.slice(lines.length - shown);
  const more = hidden > 0 && (
    <Button
      variant="ghost"
      size="sm"
      className="w-full rounded-none font-mono"
      onClick={() => setShown((n) => n + LINES_STEP)}
    >
      {showMore(Math.min(LINES_STEP, hidden))}
    </Button>
  );
  return (
    <div data-slot="payload-lines">
      {from === "tail" && more}
      {/* Focusable, so a keyboard can scroll what a pointer can. */}
      <div tabIndex={0} className="max-h-105 overflow-auto py-1">
        {visible.map((line, i) => {
          const t = tone?.(line);
          return (
            <div
              key={i}
              data-slot="payload-line"
              className={cn(
                "relative min-w-max px-3 font-mono text-sm leading-relaxed whitespace-pre",
                !dim && "text-secondary-foreground",
                t === "added" && "bg-(--diff-added-background) text-(--diff-added-text)",
                t === "removed" && "bg-(--diff-removed-background) text-(--diff-removed-text)",
                t === "hunk" && "text-muted-foreground",
              )}
            >
              {/* The 2px edge: a tinted row alone is not reliable on every
                  display, and which way a change went must not be missed. */}
              {(t === "added" || t === "removed") && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-y-0 left-0 w-0.5",
                    t === "added" ? "bg-(--diff-added-text)" : "bg-(--diff-removed-text)",
                  )}
                />
              )}
              {line || " "}
            </div>
          );
        })}
      </div>
      {from === "head" && more}
    </div>
  );
}

function splitLines(text: string): string[] {
  const lines = text.split("\n");
  // A trailing newline is the end of the last line, not an empty one.
  if (lines.length > 1 && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

/**
 * Copy for one payload: the whole text, not the window on screen. The check
 * shows only once the app says the text is on the clipboard; a refusal, a
 * throw or a rejection leaves the button as it was.
 */
function CopyPayloadButton({
  part,
  text,
  onCopy,
  labels,
}: {
  part: "input" | "output";
  text: string;
  onCopy: CopyPayload;
  labels: ToolCallCardLabels;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    let ok = false;
    try {
      ok = (await onCopy(part, text)) === true;
    } catch {
      ok = false;
    }
    if (!ok) return;
    clearTimeout(timer.current);
    setCopied(true);
    timer.current = setTimeout(() => setCopied(false), COPIED_MS);
  };
  return (
    <IconButton
      size="xs"
      icon={copied ? CheckIcon : CopyIcon}
      label={copied ? labels.copied : labels.copy}
      onClick={() => void copy()}
      className="shrink-0"
    />
  );
}

function PayloadBlock({
  part,
  payload,
  from,
  labels,
  onCopy,
  onLoad,
}: {
  part: "input" | "output";
  payload: Payload;
  from: "head" | "tail";
  labels: ToolCallCardLabels;
  onCopy?: CopyPayload;
  onLoad?: () => void;
}) {
  // Output that came from a command carries its escapes even outside a terminal block.
  const text = useMemo(() => (payload.text ? stripAnsi(payload.text) : null), [payload.text]);
  const lines = useMemo(() => (text ? splitLines(text) : []), [text]);
  const size = payload.bytes !== undefined ? formatBytes(payload.bytes) : undefined;
  if (payload.binary) {
    return <p className="font-mono text-xs text-muted-foreground">{labels.binary(part, size)}</p>;
  }
  return (
    <Frame
      label={part === "input" ? "Input" : "Output"}
      aside={
        // A truncated payload holds only its head; Copy offers the whole text or nothing.
        onCopy &&
        text !== null &&
        !payload.truncated && (
          <CopyPayloadButton part={part} text={text} onCopy={onCopy} labels={labels} />
        )
      }
    >
      {lines.length > 0 && <Lines lines={lines} from={from} showMore={labels.showMore} />}
      {payload.truncated &&
        (onLoad ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full rounded-none border-t border-border-subtle font-mono"
            onClick={onLoad}
          >
            {labels.loadFull(part, size)}
          </Button>
        ) : (
          <p className="border-t border-border-subtle px-3 py-1.5 font-mono text-xs text-disabled">
            {labels.truncated(part)}
          </p>
        ))}
    </Frame>
  );
}

function TerminalBlock({
  terminal,
  labels,
  onCopy,
}: {
  terminal: NonNullable<ToolCallView["terminal"]>;
  labels: ToolCallCardLabels;
  onCopy?: CopyPayload;
}) {
  const text = useMemo(() => stripAnsi(terminal.output), [terminal.output]);
  const lines = useMemo(() => splitLines(text), [text]);
  const failed = terminal.exitCode !== undefined && terminal.exitCode !== 0;
  return (
    <Frame
      terminal
      icon={SquareTerminalIcon}
      label={terminal.command ? `$ ${terminal.command}` : "Terminal"}
      aside={
        (failed || onCopy) && (
          <>
            {failed && (
              <span className="shrink-0 font-mono text-xs text-error">
                exit {terminal.exitCode}
              </span>
            )}
            {onCopy && (
              <CopyPayloadButton part="output" text={text} onCopy={onCopy} labels={labels} />
            )}
          </>
        )
      }
    >
      <Lines lines={lines} from="tail" dim showMore={labels.showMore} />
    </Frame>
  );
}

function diffLines(diff: DiffData): { lines: string[]; tone: (line: string) => LineTone } {
  if (diff.patch !== undefined) {
    return {
      lines: splitLines(diff.patch),
      tone: (line) =>
        line.startsWith("@@")
          ? "hunk"
          : line.startsWith("+++") || line.startsWith("---")
            ? "hunk"
            : line.startsWith("+")
              ? "added"
              : line.startsWith("-")
                ? "removed"
                : undefined,
    };
  }
  // No patch: the texts as they are, removed above added. Not a diff
  // algorithm; a real diff view plugs into `renderDiff`.
  const removed = diff.oldText ? splitLines(diff.oldText).map((l) => `-${l}`) : [];
  const added = diff.newText ? splitLines(diff.newText).map((l) => `+${l}`) : [];
  return {
    lines: [...removed, ...added],
    tone: (line) => (line.startsWith("+") ? "added" : "removed"),
  };
}

export interface DefaultDiffProps {
  diff: DiffData;
  /** The "Show more" label; `ToolCallCard` passes its own. */
  labels?: Partial<Pick<ToolCallCardLabels, "showMore">>;
}

/**
 * A diff as the patch's lines, tinted by sign, or the old text above the new
 * when there is no patch. The fallback for `ToolCallCard`'s `renderDiff`.
 */
export function DefaultDiff({ diff, labels }: DefaultDiffProps) {
  const { lines, tone } = useMemo(() => diffLines(diff), [diff]);
  const known = diff.insertions !== undefined || diff.deletions !== undefined;
  return (
    <div data-slot="default-diff">
      <Frame
        label={diff.path}
        aside={
          known && (
            <DiffStat
              added={diff.insertions ?? 0}
              removed={diff.deletions ?? 0}
              className="font-mono"
            />
          )
        }
      >
        {lines.length > 0 ? (
          <Lines lines={lines} from="head" tone={tone} showMore={labels?.showMore} />
        ) : (
          <p className="px-3 py-1.5 font-mono text-xs text-disabled">No changes recorded.</p>
        )}
      </Frame>
    </div>
  );
}
