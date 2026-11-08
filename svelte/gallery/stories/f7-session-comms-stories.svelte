<script lang="ts">
  import CommsConversationRow from "../../src/lots/f7-session-comms/comms/comms-conversation-row.svelte";
  import CommsConversationList from "../../src/lots/f7-session-comms/demos/comms-conversation-list.svelte";
  import { conversationRows } from "../../src/lots/f7-session-comms/fixtures/comms-fixtures";

  interface Props {
    story?: string;
  }

  let { story = "blocks-comms-conversationrow--channel" }: Props = $props();

  const rows = conversationRows();
  const row = (id: string) => rows.find((r) => r.id === id)!;
  const noop = () => {};
</script>

{#if story === "blocks-comms-conversationrow--channel"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-general")} onSelect={noop} />
  </div>
{:else if story === "blocks-comms-conversationrow--private-channel"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow
      conversation={{ ...row("c-incidents"), unread: 0, mentions: 0 }}
      onSelect={noop}
    />
  </div>
{:else if story === "blocks-comms-conversationrow--selected"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-general")} selected onSelect={noop} />
  </div>
{:else if story === "blocks-comms-conversationrow--unread"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-design")} onSelect={noop} />
  </div>
{:else if story === "blocks-comms-conversationrow--mentions"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("g-review")} onSelect={noop} />
  </div>
{:else if story === "blocks-comms-conversationrow--many-unread"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={{ ...row("c-incidents"), mentions: 0 }} onSelect={noop} />
  </div>
{:else if story === "blocks-comms-conversationrow--direct-message-online"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("d-lin")} onSelect={noop} />
  </div>
{:else if story === "blocks-comms-conversationrow--direct-message-offline"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("d-kofi")} onSelect={noop} />
  </div>
{:else if story === "blocks-comms-conversationrow--group"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("g-named")} onSelect={noop}>
      {#snippet trailing()}
        <span class="shrink-0 text-xs text-muted-foreground tabular-nums">4</span>
      {/snippet}
    </CommsConversationRow>
  </div>
{:else if story === "blocks-comms-conversationrow--archived"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-old")} onSelect={noop} />
  </div>
{:else if story === "blocks-comms-conversationrow--long-name"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-long")} onSelect={noop} />
  </div>
{:else if story === "blocks-comms-conversationrow--list"}
  <div class="w-64 bg-background py-1">
    <CommsConversationList />
  </div>
{:else if story === "blocks-comms-conversationrow--disabled-row"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-design")} disabled onSelect={noop} />
  </div>
{/if}
