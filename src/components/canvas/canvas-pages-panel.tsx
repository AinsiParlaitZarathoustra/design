"use client";

import { ChevronRightIcon, FilePlus2Icon, FolderPlusIcon, Trash2Icon } from "lucide-react";
import { useRef, useState, type HTMLAttributes, type ReactNode, type SyntheticEvent } from "react";
import { cn } from "../../lib/utils.ts";
import { HintGroup, HintItem } from "../../ui/hint-group.tsx";
import { Icon } from "../../ui/icon.tsx";
import { IconButton } from "../../ui/icon-button.tsx";
import { Hint, Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.tsx";
import type { CanvasPageRow, CanvasPageRowAction } from "./types.ts";

/** Where a dragged row would land: above, below, or inside a folder. */
export interface CanvasPageDropIndicator {
  id: string;
  where: "before" | "after" | "into";
}

/** Buttons inside a row act alone: no open, no fold, no drag start. */
const stop = (e: SyntheticEvent) => e.stopPropagation();
const ownEvents = { onClick: stop, onPointerDown: stop, onKeyDown: stop, onDoubleClick: stop };

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || "Unknown";
}

/**
 * The pages column beside a canvas: a quiet "Pages" header with create
 * buttons, then one row per page or folder, already flattened by the app
 * (collapsed folders' children left out, `depth` set).
 *
 * Presentational. Reordering is the app's: it spreads its pointer handlers
 * on each row through `getRowProps` and passes back `dropIndicator`. Rename
 * is controlled when `renamingId` is given, else the panel keeps it.
 *
 * Without the optional props (authors, row actions, `deleteMode`) it is the
 * local canvas's panel; Spaces turns them on.
 */
export function CanvasPagesPanel({
  rows,
  activeId,
  collapsedIds,
  onToggleFolder,
  onOpen,
  onCreate,
  allowFolders = false,
  renamingId: renamingIdProp,
  onRenamingChange,
  onRename,
  onDelete,
  onIconClick,
  dropIndicator,
  getRowProps,
  header,
  emptyLabel = "No pages yet.",
  rowActions,
  deleteMode = "hover",
  deleteLabel,
  lastPageLabel = "The last page cannot be deleted.",
  pageCount: pageCountProp,
  className,
}: {
  rows: CanvasPageRow[];
  activeId: string | null;
  collapsedIds?: ReadonlySet<string>;
  onToggleFolder?: (id: string) => void;
  onOpen: (id: string) => void;
  onCreate?: (kind: "page" | "folder") => void;
  allowFolders?: boolean;
  /** Controlled rename: the row being renamed, or null. */
  renamingId?: string | null;
  onRenamingChange?: (id: string | null) => void;
  onRename?: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  /** The emoji is a button when set; `rect` anchors the app's picker. */
  onIconClick?: (id: string, rect: DOMRect) => void;
  dropIndicator?: CanvasPageDropIndicator | null;
  /** Spread on each row: the app's drag handlers and data attributes. */
  getRowProps?: (id: string) => HTMLAttributes<HTMLDivElement>;
  /** Above the "Pages" header, e.g. the app's back link. */
  header?: ReactNode;
  emptyLabel?: string;
  rowActions?: (row: CanvasPageRow) => CanvasPageRowAction[];
  /** `always` draws delete on every row (Spaces); `hover` reveals it. */
  deleteMode?: "hover" | "always";
  deleteLabel?: (row: CanvasPageRow) => string;
  /** The disabled delete's hint on the only page left (`deleteMode="always"`). */
  lastPageLabel?: string;
  /**
   * How many pages the whole tree holds, for "the last page cannot be
   * deleted". Pass it when a collapsed folder hides pages from `rows`;
   * without it the visible pages are counted.
   */
  pageCount?: number;
  className?: string;
}) {
  const [ownRenaming, setOwnRenaming] = useState<string | null>(null);
  const renamingId = renamingIdProp !== undefined ? renamingIdProp : ownRenaming;
  const setRenaming = (id: string | null) => {
    if (renamingIdProp === undefined) setOwnRenaming(id);
    onRenamingChange?.(id);
  };

  const pageCount = pageCountProp ?? rows.filter((r) => r.kind === "page").length;

  return (
    <div
      data-slot="canvas-pages-panel"
      className={cn("flex h-full w-80 shrink-0 flex-col border-r border-border bg-card", className)}
    >
      {header}
      <div className="flex h-8 shrink-0 items-center gap-1 pr-2 pl-3">
        <span className="eyebrow flex-1 leading-none">Pages</span>
        {onCreate && (
          <HintGroup>
            <HintItem label="New page">
              <IconButton
                icon={FilePlus2Icon}
                label="New page"
                variant="outline"
                shape="round"
                size="xs"
                className="text-secondary-foreground"
                onClick={() => onCreate("page")}
              />
            </HintItem>
            {allowFolders && (
              <HintItem label="New folder">
                <IconButton
                  icon={FolderPlusIcon}
                  label="New folder"
                  variant="outline"
                  shape="round"
                  size="xs"
                  className="text-secondary-foreground"
                  onClick={() => onCreate("folder")}
                />
              </HintItem>
            )}
          </HintGroup>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-1.5 py-1 [scrollbar-width:none]">
        {rows.map((row) => (
          <PageRow
            key={row.id}
            row={row}
            active={row.id === activeId}
            collapsed={collapsedIds?.has(row.id) ?? false}
            lastPage={row.kind === "page" && pageCount <= 1}
            renaming={renamingId === row.id}
            onOpen={onOpen}
            onToggleFolder={onToggleFolder}
            onStartRename={onRename ? () => setRenaming(row.id) : undefined}
            onCommitRename={(name) => {
              setRenaming(null);
              if (name && name !== row.name) onRename?.(row.id, name);
            }}
            onCancelRename={() => setRenaming(null)}
            onDelete={onDelete}
            onIconClick={onIconClick}
            drop={dropIndicator?.id === row.id ? dropIndicator.where : null}
            rowProps={getRowProps?.(row.id)}
            actions={rowActions?.(row) ?? []}
            deleteMode={deleteMode}
            lastPageLabel={lastPageLabel}
            deleteLabel={
              deleteLabel?.(row) ??
              (row.kind === "folder" ? `Delete folder “${row.name}”` : `Delete “${row.name}”`)
            }
          />
        ))}
        {rows.length === 0 && (
          <div className="px-2 py-3 text-2xs text-muted-foreground">{emptyLabel}</div>
        )}
      </div>
    </div>
  );
}

function PageRow({
  row,
  active,
  collapsed,
  lastPage,
  renaming,
  onOpen,
  onToggleFolder,
  onStartRename,
  onCommitRename,
  onCancelRename,
  onDelete,
  onIconClick,
  drop,
  rowProps,
  actions,
  deleteMode,
  deleteLabel,
  lastPageLabel,
}: {
  row: CanvasPageRow;
  active: boolean;
  collapsed: boolean;
  lastPage: boolean;
  renaming: boolean;
  onOpen: (id: string) => void;
  onToggleFolder?: (id: string) => void;
  onStartRename?: () => void;
  onCommitRename: (name: string) => void;
  onCancelRename: () => void;
  onDelete?: (id: string) => void;
  onIconClick?: (id: string, rect: DOMRect) => void;
  drop: CanvasPageDropIndicator["where"] | null;
  rowProps?: HTMLAttributes<HTMLDivElement>;
  actions: CanvasPageRowAction[];
  deleteMode: "hover" | "always";
  deleteLabel: string;
  lastPageLabel: string;
}) {
  const folder = row.kind === "folder";
  const activate = () => (folder ? onToggleFolder?.(row.id) : onOpen(row.id));
  // Escape cancels, and the blur that follows must not commit.
  const cancelled = useRef(false);

  const icon =
    row.icon &&
    (onIconClick ? (
      <Hint label="Change icon">
        <button
          type="button"
          {...ownEvents}
          onClick={(e) => {
            e.stopPropagation();
            onIconClick(row.id, e.currentTarget.getBoundingClientRect());
          }}
          className="flex size-5 shrink-0 items-center justify-center rounded text-xs leading-none transition-colors duration-fast hover:bg-element-hover"
        >
          {row.icon}
        </button>
      </Hint>
    ) : (
      <span
        aria-hidden="true"
        className="flex size-5 shrink-0 items-center justify-center text-xs leading-none"
      >
        {row.icon}
      </span>
    ));

  const showDelete = onDelete && !renaming && (deleteMode === "always" || !lastPage);

  return (
    <div data-page-id={row.id} {...rowProps} className={cn("relative", rowProps?.className)}>
      {drop && drop !== "into" && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-1 z-10 h-0.5 rounded-full bg-primary",
            drop === "before" ? "top-0" : "bottom-0",
          )}
        />
      )}
      <div
        onClick={renaming ? undefined : activate}
        className={cn(
          "group/row flex cursor-pointer items-center gap-1.5 rounded px-1.5 text-xs",
          row.subtitle ? "py-2" : "min-h-control-md",
          active
            ? "bg-element-selected text-foreground"
            : "text-secondary-foreground hover:bg-element-hover",
          drop === "into" && "ring-1 ring-primary",
        )}
        style={row.depth ? { paddingLeft: `calc(0.375rem + ${row.depth * 12}px)` } : undefined}
      >
        {folder && (
          <Icon
            icon={ChevronRightIcon}
            size="xs"
            className={cn(
              "shrink-0 text-muted-foreground transition-transform duration-fast ease-out-strong",
              !collapsed && "rotate-90",
            )}
          />
        )}
        {icon}

        {renaming ? (
          <input
            autoFocus
            aria-label={folder ? "Folder name" : "Page name"}
            defaultValue={row.name}
            onFocus={(e) => e.currentTarget.select()}
            onClick={stop}
            onPointerDown={stop}
            onBlur={(e) => {
              if (cancelled.current) {
                cancelled.current = false;
                return;
              }
              onCommitRename(e.currentTarget.value.trim());
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") e.currentTarget.blur();
              else if (e.key === "Escape") {
                cancelled.current = true;
                onCancelRename();
              }
            }}
            className="focus-ring-none h-6 w-full min-w-0 flex-1 rounded bg-panel-input px-1 text-xs text-foreground ring-1 ring-primary outline-none"
          />
        ) : (
          <div
            role="button"
            tabIndex={0}
            aria-current={active ? "page" : undefined}
            aria-expanded={folder ? !collapsed : undefined}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activate();
              }
            }}
            onDoubleClick={
              onStartRename
                ? (e) => {
                    e.stopPropagation();
                    onStartRename();
                  }
                : undefined
            }
            className="flex min-w-0 flex-1 items-center gap-1.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="min-w-0 flex-1">
              <span
                className={cn("block truncate", row.subtitle && "text-sm leading-snug font-medium")}
              >
                {row.name || "Untitled"}
              </span>
              {row.subtitle && (
                <span className="block truncate text-2xs leading-snug text-muted-foreground">
                  {row.subtitle}
                </span>
              )}
            </span>
            {row.author && (
              <Tooltip>
                <TooltipTrigger
                  render={<span className="flex min-w-0 shrink-0 items-center gap-1" />}
                >
                  <Avatar size="xs" aria-hidden="true">
                    {row.author.image && <AvatarImage src={row.author.image} alt="" />}
                    <AvatarFallback>
                      {firstName(row.author.name).charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-16 truncate text-2xs text-muted-foreground">
                    {firstName(row.author.name)}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={4}>
                  Created by {row.author.name}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )}

        {!renaming && actions.length > 0 && (
          <span className="flex shrink-0 items-center gap-1">
            {actions.map((a) => (
              <Hint key={a.id} label={a.label}>
                <IconButton
                  icon={a.icon}
                  label={a.label}
                  variant="ghost"
                  size="xs"
                  {...ownEvents}
                  onClick={(e) => {
                    e.stopPropagation();
                    a.onSelect(row.id);
                  }}
                  className="rounded-full border border-border opacity-0 group-focus-within/row:opacity-100 group-hover/row:opacity-100 focus-visible:opacity-100"
                />
              </Hint>
            ))}
          </span>
        )}

        {showDelete &&
          (deleteMode === "always" ? (
            <Hint label={lastPage ? lastPageLabel : deleteLabel} wrap>
              <IconButton
                icon={Trash2Icon}
                label={deleteLabel}
                variant="outline"
                shape="round"
                size="xs"
                disabled={lastPage}
                {...ownEvents}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete!(row.id);
                }}
                className="shrink-0 text-muted-foreground hover:text-error"
              />
            </Hint>
          ) : (
            <Hint label={deleteLabel}>
              <IconButton
                icon={Trash2Icon}
                label={deleteLabel}
                variant="ghost-destructive"
                size="xs"
                {...ownEvents}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete!(row.id);
                }}
                className="shrink-0 opacity-0 group-focus-within/row:opacity-100 group-hover/row:opacity-100 focus-visible:opacity-100"
              />
            </Hint>
          ))}
      </div>
    </div>
  );
}
