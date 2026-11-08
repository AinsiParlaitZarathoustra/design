<script lang="ts">
  import { untrack } from "svelte";
  import type { PluggableList } from "unified";
  import { cn } from "../../../lib/utils";
  import {
    EMPTY_SPLIT,
    hasReferenceDefinitions,
    isIncompleteCodeFence,
    splitIncremental,
    type BlockSplit,
  } from "./markdown-blocks";
  import MarkdownBlock from "./markdown-block.svelte";
  import MarkdownTrailing from "./markdown-trailing.svelte";

  /**
   * Markdown that formats live as it streams, with bounded re-work. The
   * oracle's `streaming-markdown.tsx`, whose markdown half is `markdown-tree.ts`
   * (remark-parse + remark-gfm, then the caller's rehype plugins): never
   * `react-markdown`, which is a React package.
   *
   * The source is split into its top-level blocks and each renders as a
   * `MarkdownBlock` keyed by position, so a finished block's source is
   * byte-identical every frame and it never re-parses: only the trailing block
   * does. The split itself is incremental (`splitIncremental`) and runs at most
   * once per animation frame while streaming.
   *
   * Two more of desktop's bargains:
   *
   *  - A trailing fence that has not closed renders as plain code, not through
   *    the parser: a growing code block would otherwise re-highlight every frame.
   *    It is parsed (and highlighted, with `rehype-highlight`) once it closes.
   *  - A long trailing block (over 2,000 characters) re-parses at most every
   *    120ms (`markdown-trailing.svelte`); its growth is mostly invisible
   *    mid-word anyway.
   *
   * Reference-style link and footnote definitions need context across blocks,
   * so a settled message that has them renders whole.
   *
   * No rehype-raw, ever: HTML in the source renders as text. Link and image
   * URLs pass react-markdown's `defaultUrlTransform`, which drops `javascript:`
   * links. Highlighting is the consumer's: pass `rehypePlugins={[rehypeHighlight]}`;
   * `syntax.css` colours its classes from the theme's `syntax.*` keys.
   */
  interface Props {
    /** The markdown so far. */
    source: string;
    /** More is arriving: only the trailing block re-parses, and a caret follows it. */
    streaming?: boolean;
    /** Passed to the parser, e.g. `[rehypeHighlight]`. Keep the array's identity stable. */
    rehypePlugins?: PluggableList;
    class?: string;
  }

  let { source, streaming = false, rehypePlugins, class: className }: Props = $props();

  // While streaming the definition may not have arrived yet, and block-level
  // rendering avoids a whole-message parse per frame; settled, render whole.
  const hasRefs = $derived(hasReferenceDefinitions(source));
  const whole = $derived(hasRefs && !streaming);

  /**
   * The split, at most once per frame while streaming and at once when settled.
   * The carry holds the settled blocks, so a frame parses only the growing tail.
   */
  let carry: BlockSplit = EMPTY_SPLIT;
  let blocks = $state<string[]>(
    untrack(() => (whole ? [source] : (carry = splitIncremental(source, EMPTY_SPLIT)).blocks)),
  );
  let frame: number | null = null;

  $effect(() => {
    // Read the inputs the oracle's effect watches.
    void source;
    void streaming;
    if (whole) return;
    const split = (text: string) => {
      carry = splitIncremental(text, carry);
      blocks = carry.blocks;
    };
    if (!streaming || typeof requestAnimationFrame === "undefined") {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      split(source);
      return;
    }
    if (frame !== null) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      split(source);
    });
  });

  // A cancelled frame left recorded reads as pending forever, and every later
  // change would wait on it (the oracle's StrictMode remount hit this).
  $effect(() => () => {
    if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  });

  const last = $derived(blocks.length - 1);
  const trailingOpen = $derived(streaming && last >= 0 && isIncompleteCodeFence(blocks[last]!));

  /** A fence still streaming: its body as plain code, the language class kept. */
  function openFence(text: string): { language: string; body: string } {
    const newline = text.indexOf("\n");
    const opener = (newline === -1 ? text : text.slice(0, newline)).trim();
    const language = opener
      .replace(/^(`{3,}|~{3,})/, "")
      .trim()
      .split(/\s/)[0];
    return { language: language ?? "", body: newline === -1 ? "" : text.slice(newline + 1) };
  }

  const open = $derived(trailingOpen ? openFence(blocks[last] ?? "") : { language: "", body: "" });
</script>

<div data-slot="streaming-markdown" class={cn("prose-session", className)}>
  {#if whole}
    <MarkdownBlock {source} {rehypePlugins} />
  {:else}
    {#each blocks as block, i (i)}
      {#if streaming && i === last}
        {#if trailingOpen}
          <!-- svelte-ignore a11y_no_noninteractive_tabindex: a fence scrolls sideways, so it takes keyboard focus (the oracle's default `pre`). -->
          <pre data-slot="open-fence" tabindex="0"><code
              class={open.language ? `language-${open.language}` : undefined}>{open.body}</code><span
              data-slot="stream-caret"
              class="session-caret"
              aria-hidden="true"
            ></span></pre>
        {:else}
          <MarkdownTrailing source={block} {rehypePlugins} />
        {/if}
      {:else}
        <MarkdownBlock source={block} {rehypePlugins} />
      {/if}
    {/each}
  {/if}
  {#if streaming && !trailingOpen}
    <span data-slot="stream-caret" class="session-caret" aria-hidden="true"></span>
  {/if}
</div>
