<script lang="ts">
  import CommsConversationRow from "../comms/comms-conversation-row.svelte";
  import { conversationRows } from "../fixtures/comms-fixtures";

  /** The `List` story: every row, with the selection moving on click (`ListDemo`). */
  const rows = conversationRows();
  let selected = $state("c-design");
</script>

<div>
  {#each rows as r (r.id)}
    <CommsConversationRow
      conversation={r}
      selected={r.id === selected}
      onSelect={(id) => (selected = id)}
    />
  {/each}
</div>
