<script lang="ts">
  import { onMount } from "svelte";
  import type { PluggableList } from "unified";
  import StreamingMarkdown from "../session/streaming-markdown.svelte";
  import { streamingSource } from "../fixtures/session-fixtures";

  /**
   * The `Streaming` story: appends 12 characters every 30ms and starts over at
   * the end (the oracle's `Streamer`). A live stream is not deterministic, so
   * the story keeps the oracle's own cadence rather than a frozen slice.
   */
  interface Props {
    rehypePlugins?: PluggableList;
  }

  let { rehypePlugins }: Props = $props();
  let length = $state(0);

  onMount(() => {
    const id = setInterval(
      () => (length = length >= streamingSource.length ? 0 : length + 12),
      30,
    );
    return () => clearInterval(id);
  });
</script>

<StreamingMarkdown
  source={streamingSource.slice(0, length)}
  streaming={length < streamingSource.length}
  {rehypePlugins}
  class="max-w-2xl"
/>
