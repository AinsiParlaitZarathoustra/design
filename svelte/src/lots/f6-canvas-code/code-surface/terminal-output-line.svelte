<script lang="ts">
  import { segmentClassName, styleText, type TerminalLine, type TerminalLinkKind, type TerminalSegment } from "./code-surface";
  import Highlighted from "./highlighted.svelte";

  const LINK_TITLE: Record<TerminalLinkKind, string> = {
    url: "⌘-click to open in browser",
    path: "⌘-click to open",
  };

  function isLink(segment: TerminalSegment): segment is TerminalSegment & { kind: TerminalLinkKind } {
    return segment.kind === "url" || segment.kind === "path";
  }

  /** One output line. A line with no visible text keeps its height. */
  interface Props {
    line: TerminalLine;
    highlight?: string;
    prepareSegments?: (segments: readonly TerminalSegment[]) => readonly TerminalSegment[];
    onLinkActivate?: (target: string, kind: TerminalLinkKind) => void;
  }

  let { line, highlight, prepareSegments, onLinkActivate }: Props = $props();

  const segments = $derived(prepareSegments?.(line.segments) ?? line.segments);
  const blank = $derived(segments.every((s) => s.text === ""));
</script>

{#if blank}<div>​</div>{:else}<div>{#each segments as segment, i (i)}{@const link = onLinkActivate && isLink(segment) ? segment : null}<span
        style={styleText(segment.style)}
        class={segmentClassName(link ? segment : { ...segment, kind: "text" })}
        title={link ? LINK_TITLE[link.kind] : undefined}
        onclick={link
          ? (e) => {
              if (e.metaKey || e.ctrlKey) onLinkActivate?.(link.target ?? link.text, link.kind);
            }
          : undefined}
      ><Highlighted text={segment.text} query={highlight} /></span>{/each}</div>{/if}
