import type * as React from "react";
import { cn } from "../../lib/utils.ts";

export interface EditorFrameProps {
  /** The header's left side: usually `EditorBreadcrumbs`. */
  breadcrumbs?: React.ReactNode;
  /** The header's right side: the file's actions ("Disk changed · Reload", a preview toggle). */
  actions?: React.ReactNode;
  /** A one-line note under the header, in the warning tone: a limit the view is showing. */
  notice?: React.ReactNode;
  /** Floats over the body's top-right corner: a `FindBar`. */
  findBar?: React.ReactNode;
  /** Below the body: an `EditorStatusBar`. */
  statusBar?: React.ReactNode;
  /** The editor itself (CodeMirror in desktop) or an `EditorPreview`. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * A file view's chrome: desktop's file tab (`editor-panel.tsx`), a header
 * band with the path and the file's actions, then the editor. It holds no
 * state and renders no editor; the slots are filled by the app.
 */
export function EditorFrame({
  breadcrumbs,
  actions,
  notice,
  findBar,
  statusBar,
  children,
  className,
}: EditorFrameProps) {
  return (
    <section
      data-slot="editor-frame"
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden bg-background text-foreground",
        className,
      )}
    >
      <div
        data-slot="editor-frame-header"
        className="flex h-control-lg shrink-0 items-center gap-2 overflow-hidden border-b border-border bg-background px-3"
      >
        <div className="flex min-w-0 flex-1 items-center">{breadcrumbs}</div>
        {actions != null && (
          // `ml-auto` on the group keeps the actions right whichever of them render.
          <div className="ml-auto flex shrink-0 items-center gap-1 pl-2">{actions}</div>
        )}
      </div>
      {notice != null && (
        <div
          role="status"
          className="shrink-0 border-b border-border bg-warning-muted px-3 py-1.5 text-2xs text-warning"
        >
          {notice}
        </div>
      )}
      <div
        data-slot="editor-frame-body"
        className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-editor-background text-editor-foreground"
      >
        {children}
        {findBar != null && (
          // Inset on both sides so a narrow pane squeezes the bar, never clips it.
          <div className="pointer-events-none absolute inset-x-3 top-2 z-panel flex justify-end *:pointer-events-auto">
            {findBar}
          </div>
        )}
      </div>
      {statusBar}
    </section>
  );
}
