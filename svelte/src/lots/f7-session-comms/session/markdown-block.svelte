<script lang="ts">
  import type { PluggableList } from "unified";
  import MarkdownNodes from "./markdown-nodes.svelte";
  import { markdownToHast } from "./markdown-tree";

  /**
   * One block of markdown. The tree is derived from `source` alone, so a block
   * whose source is unchanged is never parsed again: a finished block costs
   * nothing per frame.
   */
  interface Props {
    source: string;
    rehypePlugins?: PluggableList;
  }

  let { source, rehypePlugins }: Props = $props();

  const nodes = $derived(markdownToHast(source, rehypePlugins));
</script>

<MarkdownNodes {nodes} />
