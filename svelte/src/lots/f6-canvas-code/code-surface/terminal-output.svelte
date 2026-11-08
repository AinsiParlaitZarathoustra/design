<script lang="ts">
  import { cn } from "../../../lib/utils";
  import type { TerminalLine, TerminalLinkKind, TerminalSegment } from "./code-surface";
  import TerminalOutputLine from "./terminal-output-line.svelte";

  /**
   * A command's output, as desktop's block terminal draws it: monospaced,
   * wrapping, selectable, one element per line. Line identity keys the rows;
   * a segment's `style` passes through untouched, so `var(--…)` colours follow
   * the theme.
   */
  interface Props {
    /** Lines of styled segments. Wins over `text` when both are given. */
    lines?: readonly TerminalLine[];
    /** Plain text, split on newlines. No ANSI parsing: hand styled runs to `lines`. */
    text?: string;
    /** Marks every case-insensitive match, per segment. */
    highlight?: string;
    /** Runs once per line (linkify, say). */
    prepareSegments?: (segments: readonly TerminalSegment[]) => readonly TerminalSegment[];
    /** ⌘/Ctrl-click on a link segment. Unset: links are plain text. */
    onLinkActivate?: (target: string, kind: TerminalLinkKind) => void;
    class?: string;
  }

  let { lines, text, highlight, prepareSegments, onLinkActivate, class: className }: Props = $props();

  const fromText = $derived(
    lines || text === undefined
      ? []
      : text.split("\n").map((line): TerminalLine => ({ segments: [{ text: line }] })),
  );
  const shown = $derived(lines ?? fromText);
</script>

<div
  data-slot="terminal-output"
  class={cn(
    "px-3 py-2 font-mono text-sm leading-[1.4] break-words whitespace-pre-wrap text-secondary-foreground select-text",
    className,
  )}
>{#each shown as line, i (line.id ?? i)}<TerminalOutputLine {line} {highlight} {prepareSegments} {onLinkActivate} />{/each}</div>
