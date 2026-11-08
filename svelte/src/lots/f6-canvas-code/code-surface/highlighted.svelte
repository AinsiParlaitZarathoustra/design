<script lang="ts">
  import { highlightRanges } from "./code-surface";

  /**
   * Text with every match of `query` in a `<mark data-term-match>`. A find bar
   * stepping through matches walks `[data-term-match]` in the DOM and sets
   * `data-active` on the current one, which takes the active match colour.
   */
  interface Props {
    text: string;
    query?: string;
  }

  let { text, query }: Props = $props();

  const parts = $derived.by(() => {
    const ranges = query ? highlightRanges(text, query) : [];
    const out: Array<{ text: string; match: boolean }> = [];
    let at = 0;
    for (const [start, end] of ranges) {
      if (start > at) out.push({ text: text.slice(at, start), match: false });
      out.push({ text: text.slice(start, end), match: true });
      at = end;
    }
    if (ranges.length > 0 && at < text.length) out.push({ text: text.slice(at), match: false });
    return ranges.length === 0 ? [{ text, match: false }] : out;
  });
</script>

{#each parts as part, i (i)}{#if part.match}<mark
      data-term-match=""
      class="rounded-sm bg-search-match-background text-inherit data-active:bg-search-match-active-background">{part.text}</mark>{:else}{part.text}{/if}{/each}
