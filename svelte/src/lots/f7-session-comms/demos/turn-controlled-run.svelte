<script lang="ts">
  import type { PluggableList } from "unified";
  import TurnRow from "../session/turn-row.svelte";
  import { manyToolCallsSession } from "../fixtures/session-fixtures";
  import PlayClick from "./play-click.svelte";

  /**
   * `ControlledToolRun`: the host holds a folded run open by a call it
   * contains, without taking over the cards; the story's play then clicks the
   * run's line, which folds it.
   */
  interface Props {
    rehypePlugins?: PluggableList;
  }

  let { rehypePlugins }: Props = $props();

  const turn = manyToolCallsSession(12).turns[0]!;
  let runs = $state<ReadonlySet<string>>(new Set(["many:6"]));
</script>

<PlayClick query="button[aria-expanded]">
  <TurnRow
    {turn}
    {rehypePlugins}
    class="max-w-3xl"
    openToolRunIds={runs}
    onOpenToolRunIdsChange={(next) => (runs = next)}
  />
</PlayClick>
