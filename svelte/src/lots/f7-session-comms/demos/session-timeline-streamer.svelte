<script lang="ts">
  import { onMount } from "svelte";
  import type { PluggableList } from "unified";
  import SessionTimeline from "../session/session-timeline.svelte";
  import type { SessionView } from "../session/session-view";
  import { streamingSession, streamingSource } from "../fixtures/session-fixtures";

  /** `Streaming`: appends to the streaming answer every 30ms and starts over at the end. */
  interface Props {
    rehypePlugins?: PluggableList;
  }

  let { rehypePlugins }: Props = $props();

  let length = $state(0);

  const base = streamingSession();
  const last = base.turns.at(-1)!;

  const session = $derived<SessionView>({
    ...base,
    turns: [
      ...base.turns.slice(0, -1),
      {
        ...last,
        items: last.items.map((item) =>
          item.kind === "text" && item.id === base.streaming?.itemId
            ? { ...item, text: streamingSource.slice(0, length) }
            : item,
        ),
      },
    ],
  });

  onMount(() => {
    const id = setInterval(
      () => (length = length >= streamingSource.length ? 0 : length + 12),
      30,
    );
    return () => clearInterval(id);
  });
</script>

<SessionTimeline {session} {rehypePlugins} />
