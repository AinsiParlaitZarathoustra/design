"use client";

import {
  ChevronDownIcon,
  CrosshairIcon,
  Maximize2Icon,
  Minimize2Icon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { RailGlyph } from "../../ui/animated-icon.tsx";
import { iconButtonVariants } from "../../ui/icon-button-variants.ts";
import { cn } from "../../lib/utils.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu.tsx";
import { Icon } from "../../ui/icon.tsx";
import { Hint, Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip.tsx";
import { Spinner } from "../ui/spinner.tsx";
import { CanvasPill, CanvasPillButton, CanvasPillDivider } from "./canvas-chrome.tsx";
import type { CanvasLinkStatus } from "./types.ts";

/** What the dot says when the app gives no `statusLabel`. */
const STATUS_WORDS: Record<CanvasLinkStatus, string> = {
  live: "Live",
  syncing: "Reconnecting",
  offline: "Offline",
  archived: "Archived, read-only",
  viewing: "Viewing, not sharing",
};

const STATUS_DOT: Record<Exclude<CanvasLinkStatus, "syncing">, string> = {
  live: "bg-success",
  offline: "bg-warning",
  archived: "bg-muted-foreground",
  viewing: "bg-info",
};

/**
 * The top-left pill: the pages toggle, where the canvas stands with the
 * room, the page you are on (also the shorthand page switcher, when `pages`
 * is given: a canvas is usually two clicks from another page), the zoom
 * readout, fit, and fullscreen. Each section renders only when its props
 * are given; `onFit` is the one control every canvas has.
 */
export function CanvasHeaderPill({
  pageName,
  pageIcon,
  pages,
  activePageId,
  onOpenPage,
  status,
  statusLabel,
  pagesOpen,
  onTogglePages,
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onFit,
  fullscreen,
  onToggleFullscreen,
  className,
}: {
  pageName: string;
  /** An emoji before the name. */
  pageIcon?: string;
  /** The pages to switch between; without it the name is plain text. */
  pages?: Array<{ id: string; name: string; icon?: string }>;
  activePageId?: string | null;
  onOpenPage?: (id: string) => void;
  status?: CanvasLinkStatus;
  /** What the status means in words, shown on hover. */
  statusLabel?: string;
  pagesOpen: boolean;
  onTogglePages: () => void;
  /** The current zoom, 1 = 100%. The readout renders only when set. */
  zoom?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomReset?: () => void;
  onFit: () => void;
  fullscreen?: boolean;
  onToggleFullscreen?: () => void;
  className?: string;
}) {
  const name = (
    <span className="min-w-0 max-w-44 truncate text-sm font-semibold text-foreground">
      {pageIcon && <span className="mr-1.5">{pageIcon}</span>}
      {pageName || "Untitled"}
    </span>
  );

  return (
    <CanvasPill corner="top-left" className={className}>
      <Hint label={pagesOpen ? "Hide pages" : "Show pages"}>
        <button
          type="button"
          aria-pressed={pagesOpen}
          onClick={onTogglePages}
          className={iconButtonVariants({ size: "sm" })}
        >
          <RailGlyph open={pagesOpen} size="md" />
        </button>
      </Hint>
      <CanvasPillDivider />

      {status && <StatusDot status={status} label={statusLabel} />}

      {pages ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`${pageName || "Untitled"}, switch page`}
            className="flex h-6 min-w-0 shrink items-center gap-1 rounded-md px-1 transition-colors duration-fast hover:bg-element-hover aria-expanded:bg-element-active"
          >
            {name}
            <Icon icon={ChevronDownIcon} size="xs" className="shrink-0 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={8} className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Pages</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={activePageId ?? ""}
                onValueChange={(id) => onOpenPage?.(String(id))}
              >
                {pages.map((p) => (
                  <DropdownMenuRadioItem key={p.id} value={p.id}>
                    <span className="min-w-0 flex-1 truncate">
                      {p.icon && <span className="mr-1.5">{p.icon}</span>}
                      {p.name || "Untitled"}
                    </span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span className="flex min-w-0 px-1">{name}</span>
      )}

      {zoom !== undefined && (
        <>
          <CanvasPillDivider />
          {onZoomOut && <CanvasPillButton icon={MinusIcon} label="Zoom out" onClick={onZoomOut} />}
          <Hint label="Reset zoom to 100%">
            <button
              type="button"
              onClick={onZoomReset}
              disabled={!onZoomReset}
              aria-label={`Zoom ${Math.round(zoom * 100)}%, reset to 100%`}
              className="flex h-6 min-w-10 items-center justify-center rounded-md px-1 text-xs text-secondary-foreground tabular-nums transition-colors duration-fast hover:bg-element-hover hover:text-foreground disabled:pointer-events-none"
            >
              {Math.round(zoom * 100)}%
            </button>
          </Hint>
          {onZoomIn && <CanvasPillButton icon={PlusIcon} label="Zoom in" onClick={onZoomIn} />}
        </>
      )}

      <CanvasPillDivider />
      <CanvasPillButton icon={CrosshairIcon} label="Fit to view" onClick={onFit} />
      {onToggleFullscreen && (
        <CanvasPillButton
          icon={fullscreen ? Minimize2Icon : Maximize2Icon}
          label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          onClick={onToggleFullscreen}
        />
      )}
    </CanvasPill>
  );
}

/** Where the canvas stands with the room: a dot, or a spinner while it reconnects. */
function StatusDot({ status, label }: { status: CanvasLinkStatus; label?: string }) {
  const glyph = (
    <span
      data-status={status}
      role="img"
      aria-label={label ?? STATUS_WORDS[status]}
      className="flex size-4 shrink-0 items-center justify-center"
    >
      {status === "syncing" ? (
        <Spinner size="xs" label="" />
      ) : (
        <span
          className={cn(
            "size-1.5 rounded-full transition-colors duration-fast",
            STATUS_DOT[status],
          )}
        />
      )}
    </span>
  );
  if (!label) return glyph;
  return (
    <Tooltip>
      <TooltipTrigger render={glyph} />
      <TooltipContent side="bottom" sideOffset={4}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
