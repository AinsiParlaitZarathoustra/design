"use client";

import type * as React from "react";
import { cn } from "../../lib/utils.ts";

export interface EditorStatusBarProps {
  /** 1-based, like the editor shows it. */
  line: number;
  column: number;
  /** Characters selected; shown when above zero. */
  selected?: number;
  language?: string;
  encoding?: string;
  /** "LF" / "CRLF". */
  eol?: string;
  /** "Spaces: 2", "Tab Size: 4". */
  indent?: string;
  /** Anything before the items, on the left. */
  start?: React.ReactNode;
  onPositionClick?: () => void;
  onLanguageClick?: () => void;
  className?: string;
}

const ITEM =
  "flex h-full shrink-0 items-center rounded-sm px-1.5 transition-colors duration-fast ease-out-strong";

function Item({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  if (!onClick) return <span className={ITEM}>{children}</span>;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(ITEM, "cursor-pointer hover:bg-element-hover hover:text-foreground")}
    >
      {children}
    </button>
  );
}

/**
 * The line under an editor: the cursor's position, then the file's indent,
 * encoding, line endings and language. An item left undefined is left out.
 * Deliberately not a live region: the position changes with every keystroke,
 * and announcing it would talk over the typing.
 */
export function EditorStatusBar({
  line,
  column,
  selected,
  language,
  encoding = "UTF-8",
  eol,
  indent,
  start,
  onPositionClick,
  onLanguageClick,
  className,
}: EditorStatusBarProps) {
  return (
    <footer
      data-slot="editor-status-bar"
      className={cn(
        "flex h-control-sm shrink-0 items-center gap-1 overflow-hidden border-t border-border bg-background px-3 py-0.5 text-2xs text-muted-foreground tabular-nums",
        className,
      )}
    >
      {start != null && <div className="flex min-w-0 items-center gap-1">{start}</div>}
      <div className="ml-auto flex h-full min-w-0 items-center gap-0.5">
        <Item onClick={onPositionClick}>
          Ln {line}, Col {column}
          {selected ? ` (${selected} selected)` : ""}
        </Item>
        {indent && <Item>{indent}</Item>}
        {encoding && <Item>{encoding}</Item>}
        {eol && <Item>{eol}</Item>}
        {language && <Item onClick={onLanguageClick}>{language}</Item>}
      </div>
    </footer>
  );
}
