<script lang="ts">
  import { onMount } from "svelte";
  import type { PluggableList } from "unified";
  import SessionTimeline from "../session/session-timeline.svelte";
  import type { SessionView } from "../session/session-view";
  import { hugeTurnsSession } from "../fixtures/session-fixtures";

  /**
   * `RevealItem`: a comment link to a checkpoint in turn 301 of 400.
   * `revealItemId` draws its turn though only the first 80 are drawn on load,
   * and the host scrolls there.
   */
  interface Props {
    rehypePlugins?: PluggableList;
  }

  let { rehypePlugins }: Props = $props();

  /** 400 turns; turn 300's answer carries a checkpoint, far past the first 80 drawn. */
  function checkpointDeepSession(): SessionView {
    const base = hugeTurnsSession(400);
    return {
      ...base,
      turns: base.turns.map((t, i) =>
        i === 300
          ? {
              ...t,
              checkpoints: [
                {
                  id: "deep:checkpoint",
                  at: t.user?.at,
                  commitSha: "7c1e9a04b2d5",
                  subject: "sidebar: keep the pinned sort stable",
                  branch: "uzayermasud/pinned-first",
                  linkState: "linked" as const,
                  insertions: 18,
                  deletions: 6,
                  files: ["src/features/sidebar/sort.ts"],
                },
              ],
            }
          : t,
      ),
    };
  }

  // Built once: a new session each render would rebuild every turn.
  const session = checkpointDeepSession();

  onMount(() => {
    document.querySelector('[data-slot="checkpoint"]')?.scrollIntoView({ block: "center" });
  });
</script>

<SessionTimeline {session} {rehypePlugins} revealItemId="deep:checkpoint" />
