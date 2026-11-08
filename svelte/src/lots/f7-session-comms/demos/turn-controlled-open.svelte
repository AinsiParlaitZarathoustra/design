<script lang="ts">
  import type { PluggableList } from "unified";
  import TurnRow from "../session/turn-row.svelte";
  import { manyToolCallsSession } from "../fixtures/session-fixtures";

  /**
   * `ControlledOpenToolCall`: the host holds a call open (a comment jumped to
   * it), so its folded run unfolds and the card opens.
   */
  interface Props {
    rehypePlugins?: PluggableList;
  }

  let { rehypePlugins }: Props = $props();

  const turn = manyToolCallsSession(12).turns[0]!;
  let open = $state<ReadonlySet<string>>(new Set(["many:6"]));
</script>

<TurnRow
  {turn}
  {rehypePlugins}
  class="max-w-3xl"
  openToolCallIds={open}
  onOpenToolCallIdsChange={(next) => (open = next)}
/>
