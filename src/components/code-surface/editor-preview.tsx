import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "../../lib/utils.ts";
import { Icon } from "../../ui/icon.tsx";
import { SYNTAX_TEXT_CLASS, type SyntaxRole } from "./code-surface.ts";

export interface EditorPreviewToken {
  text: string;
  role?: SyntaxRole;
  /** Inside the selection. */
  selected?: boolean;
  /** A find match; `active` is the current one. */
  match?: "match" | "active";
  /** The bracket matching the one at the cursor. */
  bracket?: boolean;
  /** The caret sits at the end of this token. */
  caret?: boolean;
}

export interface EditorPreviewLine {
  tokens: readonly EditorPreviewToken[];
  /** The gutter's change bar against git HEAD. */
  change?: "added" | "modified" | "deleted-above";
  /** A foldable range starts here. */
  fold?: "open" | "closed";
}

export interface EditorPreviewProps {
  lines: readonly EditorPreviewLine[];
  /** The number shown on the first line. */
  startLine?: number;
  /** The line the cursor is on, by its shown number. */
  activeLine?: number;
  className?: string;
}

/** Comments and keywords are italic in desktop's highlight style. */
const ITALIC_ROLES: ReadonlySet<SyntaxRole> = new Set(["comment", "keyword"]);

const CHANGE_BAR = {
  added: "bg-diff-added-text",
  // There is no "changed" diff key; desktop's gutter uses a status colour.
  modified: "bg-info",
  // A deletion has no line of its own: a wedge on top of the line after it.
  "deleted-above": "border-t-2 border-diff-removed-text",
} as const;

function tokenClassName(token: EditorPreviewToken) {
  return cn(
    token.role && SYNTAX_TEXT_CLASS[token.role],
    token.role && ITALIC_ROLES.has(token.role) && "italic",
    token.selected && "bg-editor-selection-background",
    token.match === "match" && "bg-search-match-background",
    token.match === "active" && "bg-search-match-active-background",
    token.bracket &&
      "bg-editor-match-bracket-background outline outline-editor-match-bracket-border",
  );
}

/**
 * A static, highlighted excerpt drawn exactly as desktop's CodeMirror theme
 * (`build-cm-theme.ts`) draws a file: the change-bar gutter, line numbers,
 * the fold gutter, the active line, selection, find matches, the matching
 * bracket and the caret. It is the reference look the editor's theme is held
 * to, and a way to show code with the editor's colours where no editor runs.
 *
 * It takes tokens, not source: the package highlights nothing.
 */
export function EditorPreview({ lines, startLine = 1, activeLine, className }: EditorPreviewProps) {
  return (
    <pre
      data-slot="editor-preview"
      className={cn(
        "flex overflow-auto bg-editor-background font-mono text-base leading-[20px] text-editor-foreground",
        className,
      )}
    >
      {/* Spans, not divs: a <pre> holds phrasing content only. */}
      <span
        aria-hidden
        className="sticky left-0 flex shrink-0 flex-col bg-editor-gutter-background py-1 text-editor-gutter-foreground select-none"
      >
        {lines.map((line, i) => {
          const number = startLine + i;
          return (
            <span key={number} className="flex">
              <span className={cn("w-[3px]", line.change && CHANGE_BAR[line.change])} />
              <span
                className={cn(
                  "min-w-8 pr-1 pl-2 text-right tabular-nums",
                  number === activeLine && "text-editor-active-line-gutter-foreground",
                )}
              >
                {number}
              </span>
              <span className="flex w-4 items-center justify-center text-secondary-foreground">
                {line.fold && (
                  <Icon
                    icon={line.fold === "open" ? ChevronDownIcon : ChevronRightIcon}
                    size="xs"
                  />
                )}
              </span>
            </span>
          );
        })}
      </span>
      <code className="block min-w-0 flex-1 py-1">
        {lines.map((line, i) => (
          <span
            key={startLine + i}
            className={cn(
              "block px-1 whitespace-pre",
              startLine + i === activeLine && "bg-editor-active-line-background",
            )}
          >
            {line.tokens.length === 0 ? "​" : null}
            {line.tokens.map((token, j) => (
              <span key={j} className={tokenClassName(token)}>
                {token.text}
                {token.caret && (
                  <span
                    aria-hidden
                    className="-mr-[2px] inline-block h-[1.2em] w-[2px] bg-editor-caret align-text-bottom"
                  />
                )}
              </span>
            ))}
            {line.fold === "closed" && (
              <span className="mx-1 rounded-sm border border-border bg-secondary px-1 text-secondary-foreground">
                …
              </span>
            )}
          </span>
        ))}
      </code>
    </pre>
  );
}
