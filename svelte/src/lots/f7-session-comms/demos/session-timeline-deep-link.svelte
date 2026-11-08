<script lang="ts">
  import { onMount } from "svelte";
  import type { PluggableList } from "unified";
  import SessionTimeline from "../session/session-timeline.svelte";
  import type { SessionView } from "../session/session-view";
  import { hugeTurnsSession, toolCall } from "../fixtures/session-fixtures";

  /**
   * `DeepLinkToFoldedCall`: a comment link to a call in a folded run, far past
   * the window. The host holds the run and the card open, and the turn is drawn
   * so it can scroll there.
   */
  interface Props {
    rehypePlugins?: PluggableList;
  }

  let { rehypePlugins }: Props = $props();

  /** 400 turns; turn 300 holds a folded run of eight calls. */
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
  let runs = $state<ReadonlySet<string>>(new Set(["deep:5"]));
  let cards = $state<ReadonlySet<string>>(new Set(["deep:5"]));

  onMount(() => {
    document.querySelector('[data-tool-call-id="deep:5"]')?.scrollIntoView({ block: "center" });
  });
</script>

<SessionTimeline
  {session}
  {rehypePlugins}
  openToolRunIds={runs}
  onOpenToolRunIdsChange={(next) => (runs = next)}
  openToolCallIds={cards}
  onOpenToolCallIdsChange={(next) => (cards = next)}
/>
