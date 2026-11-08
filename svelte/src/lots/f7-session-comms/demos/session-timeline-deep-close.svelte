<script lang="ts">
  import type { PluggableList } from "unified";
  import SessionTimeline from "../session/session-timeline.svelte";
  import type { SessionView } from "../session/session-view";
  import { hugeTurnsSession, toolCall } from "../fixtures/session-fixtures";

  /**
   * `DeepLinkThenClose`: the host holds only the card; the story's play closes
   * it, but the turn stays drawn under the reader.
   */
  interface Props {
    rehypePlugins?: PluggableList;
  }

  let { rehypePlugins }: Props = $props();

  function deepLinkSession(): SessionView {
    const base = hugeTurnsSession(400);
    return {
      ...base,
      turns: base.turns.map((t, i) =>
        i === 300
          ? {
              ...t,
              items: Array.from({ length: 8 }, (_, n) => ({
                kind: "tool" as const,
                call: toolCall({ id: `deep:${n}`, kind: "read", title: `Read file-${n}.ts` }),
              })),
            }
          : t,
      ),
    };
  }

  const session = deepLinkSession();
  let cards = $state<ReadonlySet<string>>(new Set(["deep:5"]));
  let root = $state<HTMLElement | null>(null);

  // The story's play: a real click on the held card's toggle, made on mount.
  $effect(() => {
    if (!root) return;
    root.querySelector<HTMLButtonElement>('[data-tool-call-id="deep:5"] button')?.click();
  });
</script>

<div bind:this={root}>
  <SessionTimeline
    {session}
    {rehypePlugins}
    openToolCallIds={cards}
    onOpenToolCallIdsChange={(next) => (cards = next)}
  />
</div>
