import type { DiffData } from "./session-view";
import type { LineTone } from "./tool-call-labels";

/** A trailing newline is the end of the last line, not an empty one. */
export function splitLines(text: string): string[] {
  const lines = text.split("\n");
  if (lines.length > 1 && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

/**
 * A diff's lines and the tone of each: the patch's lines by sign, or, with no
 * patch, the old text removed above the new text added (not a diff algorithm;
 * a real diff view plugs into `renderDiff`).
 */
export function diffLines(diff: DiffData): { lines: string[]; tone: (line: string) => LineTone } {
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
  const removed = diff.oldText ? splitLines(diff.oldText).map((l) => `-${l}`) : [];
  const added = diff.newText ? splitLines(diff.newText).map((l) => `+${l}`) : [];
  return {
    lines: [...removed, ...added],
    tone: (line) => (line.startsWith("+") ? "added" : "removed"),
  };
}
