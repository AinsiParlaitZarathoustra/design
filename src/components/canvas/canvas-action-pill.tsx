"use client";

import {
  DownloadIcon,
  ExternalLinkIcon,
  EyeIcon,
  FileImageIcon,
  FileTextIcon,
  FileType2Icon,
  type LucideIcon,
} from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { PEER_INK } from "../../lib/actor-hue.ts";
import { cn } from "../../lib/utils.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu.tsx";
import { Button } from "../../ui/button.tsx";
import { Icon } from "../../ui/icon.tsx";
import { IconButton } from "../../ui/icon-button.tsx";
import { Hint } from "../../ui/tooltip.tsx";
import { PersonAvatar } from "../patterns/person-avatar.tsx";
import { Spinner } from "../ui/spinner.tsx";
import { CanvasPill, CanvasPillButton, CanvasPillDivider } from "./canvas-chrome.tsx";
import type { PresencePeer } from "./types.ts";

export interface CanvasExportFormat {
  id: string;
  label: string;
  icon: LucideIcon;
}

/** The four formats both canvases export. */
export const CANVAS_EXPORT_FORMATS: CanvasExportFormat[] = [
  { id: "png", label: "PNG", icon: FileImageIcon },
  { id: "jpeg", label: "JPEG", icon: FileImageIcon },
  { id: "svg", label: "SVG", icon: FileType2Icon },
  { id: "pdf", label: "PDF", icon: FileTextIcon },
];

/**
 * The top-right pill: who is here, the link out, and export, divided rather
 * than scattered across the corner. Peers come first and you last: an empty
 * corner reads as "nobody is here", which is never true while you are. Each
 * peer's face is ringed in their hue, so the avatar and their cursor read as
 * the same person; with `onFollow` a face is also the follow toggle.
 *
 * Every section, and the divider before it, renders only when its props are
 * given, so the local canvas passes export alone.
 */
export function CanvasActionPill({
  peers,
  self,
  maxVisible = 4,
  following,
  onFollow,
  followers,
  external,
  exportFormats,
  onExport,
  exporting = false,
  exportLabel,
  className,
}: {
  peers?: PresencePeer[];
  self?: { name: string; image?: string | null };
  /** Faces shown before the rest fold into "+N". */
  maxVisible?: number;
  /** The peer whose view you are riding. */
  following?: string | null;
  onFollow?: (id: string | null) => void;
  /** How many people are riding your view. */
  followers?: number;
  external?: { label: string; onOpen: () => void };
  exportFormats?: CanvasExportFormat[];
  onExport?: (formatId: string) => void;
  exporting?: boolean;
  /**
   * The export button's visible label ("Export"). Unset, it is an icon
   * alone, named by its tooltip. While exporting the label stays, after a
   * spinner in place of the icon, so the pill does not change width.
   */
  exportLabel?: string;
  className?: string;
}) {
  const sections: ReactNode[] = [];

  const visible = peers?.slice(0, maxVisible) ?? [];
  const hidden = peers?.slice(maxVisible) ?? [];
  if (visible.length > 0 || self || (followers ?? 0) > 0) {
    sections.push(
      <div key="presence" className="flex items-center pr-0.5 pl-0.5">
        <div className="flex items-center -space-x-1">
          {visible.map((p) => (
            <PeerFace key={p.id} peer={p} riding={following === p.id} onFollow={onFollow} />
          ))}
          {self && (
            <Hint label={`${self.name} (you)`}>
              <span role="img" className="inline-flex rounded-full ring-2 ring-card">
                <PersonAvatar name={self.name} image={self.image ?? undefined} size="xs" />
              </span>
            </Hint>
          )}
        </div>
        {hidden.length > 0 && (
          <Hint label={`${hidden.length} more: ${hidden.map((p) => p.name).join(", ")}`}>
            <span role="img" className="pl-1.5 text-2xs text-muted-foreground tabular-nums">
              +{hidden.length}
            </span>
          </Hint>
        )}
        {(followers ?? 0) > 0 && (
          <Hint
            label={
              followers === 1
                ? "1 person is following your view"
                : `${followers} people are following your view`
            }
          >
            <span
              role="img"
              className="ml-1.5 flex h-5 items-center gap-1 rounded-full bg-primary/15 px-1.5 text-2xs font-medium text-primary tabular-nums"
            >
              <Icon icon={EyeIcon} size="xs" />
              {followers}
            </span>
          </Hint>
        )}
      </div>,
    );
  }

  if (external) {
    sections.push(
      <CanvasPillButton
        key="external"
        icon={ExternalLinkIcon}
        label={external.label}
        onClick={external.onOpen}
      />,
    );
  }

  if (exportFormats && exportFormats.length > 0 && onExport) {
    sections.push(
      <DropdownMenu key="export">
        <Hint label={exporting ? "Exporting…" : "Export canvas"}>
          <DropdownMenuTrigger
            disabled={exporting}
            render={
              exportLabel ? (
                // Named by its visible label, busy while exporting; the
                // tooltip carries "Export canvas" / "Exporting…".
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={exportLabel}
                  aria-busy={exporting || undefined}
                  className="gap-1.5 px-1.5"
                >
                  {exporting ? (
                    <Spinner size="sm" label="" />
                  ) : (
                    <Icon icon={DownloadIcon} size="sm" />
                  )}
                  {exportLabel}
                </Button>
              ) : exporting ? (
                <button
                  type="button"
                  aria-label="Exporting…"
                  className="flex size-control-sm items-center justify-center rounded"
                >
                  <Spinner size="sm" label="" />
                </button>
              ) : (
                <IconButton icon={DownloadIcon} label="Export canvas" size="sm" />
              )
            }
          />
        </Hint>
        <DropdownMenuContent align="end" sideOffset={8} className="w-36">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Export as</DropdownMenuLabel>
            {exportFormats.map((f) => (
              <DropdownMenuItem key={f.id} onClick={() => onExport(f.id)}>
                <Icon icon={f.icon} size="sm" className="text-muted-foreground" />
                {f.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
  }

  if (sections.length === 0) return null;

  return (
    <CanvasPill corner="top-right" className={cn("px-1.5", className)}>
      {sections.map((section, i) => (
        <Fragment key={i}>
          {i > 0 && <CanvasPillDivider />}
          {section}
        </Fragment>
      ))}
    </CanvasPill>
  );
}

/** A peer's face, ringed in their hue; the follow toggle when the app can follow. */
function PeerFace({
  peer,
  riding,
  onFollow,
}: {
  peer: PresencePeer;
  riding: boolean;
  onFollow?: (id: string | null) => void;
}) {
  const face = <PersonAvatar name={peer.name} image={peer.image} size="xs" />;
  const ring = cn(
    "relative inline-flex rounded-full ring-2",
    riding ? "z-10 scale-110 ring-primary ring-offset-2 ring-offset-card" : PEER_INK[peer.hue].ring,
  );

  if (!onFollow) {
    return (
      <Hint label={peer.name}>
        <span role="img" className={ring}>
          {face}
        </span>
      </Hint>
    );
  }

  // The button lies over the face rather than around it: the initials are
  // the face, not the control's words, and a button named "Follow Ana Ruiz"
  // whose text reads "AR" is a mismatch to a screen reader user.
  return (
    <span
      className={cn(
        ring,
        "transition-transform duration-fast ease-out-strong hover:z-10 motion-safe:hover:scale-110 motion-safe:has-active:scale-95",
      )}
    >
      {face}
      <Hint label={riding ? `Stop following ${peer.name}` : `Follow ${peer.name}`}>
        <button
          type="button"
          aria-pressed={riding}
          aria-label={`Follow ${peer.name}`}
          onClick={() => onFollow(riding ? null : peer.id)}
          className="absolute inset-0 cursor-pointer rounded-full"
        />
      </Hint>
    </span>
  );
}
