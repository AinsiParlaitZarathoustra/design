import { cn } from "../../lib/utils.ts";
import { ANSI_BG_CLASS, ANSI_NAMES } from "./code-surface.ts";

/**
 * The theme's terminal colours on the terminal's own background: the sixteen
 * ANSI slots, normal over bright, then a line with the cursor and a selection.
 * A specimen for a theme page or a theme editor.
 */
export function TerminalPalette({ className }: { className?: string }) {
  const rows = [ANSI_NAMES.slice(0, 8), ANSI_NAMES.slice(8)];
  return (
    <div
      data-slot="terminal-palette"
      className={cn(
        "flex flex-col gap-3 rounded-md border border-border bg-terminal-background p-3 font-mono text-2xs text-terminal-foreground",
        className,
      )}
    >
      {rows.map((row, r) => (
        <div key={r} className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {row.map((name, i) => {
            const slot = r * 8 + i;
            return (
              <div key={name} className="flex min-w-0 flex-col gap-1">
                <span className={cn("h-6 rounded-sm", ANSI_BG_CLASS[slot])} />
                <span className="truncate opacity-70">
                  {slot} {name}
                </span>
              </div>
            );
          })}
        </div>
      ))}
      <div className="text-sm">
        <span className="text-terminal-ansi-green">~/atlas</span>{" "}
        <span className="bg-terminal-selection">git status</span>
        <span
          aria-hidden
          className="ml-px inline-block h-[1.1em] w-[0.6em] bg-terminal-cursor align-text-bottom"
        />
      </div>
    </div>
  );
}
