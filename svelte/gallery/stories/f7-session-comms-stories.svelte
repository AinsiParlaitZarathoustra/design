<script lang="ts">
  import { Plus, Mic, Bold, Italic, Link } from "lucide-svelte";
  import FaceSlightlySmiling from "../../src/lots/f7-session-comms/deps/face-slightly-smiling.svelte";
  import CommsComposerShell from "../../src/lots/f7-session-comms/comms/comms-composer-shell.svelte";
  import CommsConversationRow from "../../src/lots/f7-session-comms/comms/comms-conversation-row.svelte";
  import CommsEditor from "../../src/lots/f7-session-comms/demos/comms-editor.svelte";
  import CommsConversationList from "../../src/lots/f7-session-comms/demos/comms-conversation-list.svelte";
  import { conversationRows } from "../../src/lots/f7-session-comms/fixtures/comms-fixtures";
  import IconButton from "../../src/ui/icon-button.svelte";
  import Button from "../../src/ui/button.svelte";

  interface Props {
    story?: string;
  }

  let { story = "blocks-comms-conversationrow--channel" }: Props = $props();

  const rows = conversationRows();
  const row = (id: string) => rows.find((r) => r.id === id)!;
  /** Counts a callback on the document, so a story's play can be checked from outside. */
  const hook = (key: string) => () => {
    const calls = Number(document.documentElement.dataset[`call${key}`] ?? 0);
    document.documentElement.dataset[`call${key}`] = String(calls + 1);
  };
</script>

{#snippet attachButton()}
  <IconButton size="lg" shape="round" icon={Plus} label="Attach a file" />
{/snippet}
{#snippet emojiButton()}
  <IconButton size="lg" shape="round" icon={FaceSlightlySmiling} label="Emoji" />
{/snippet}
{#snippet chip(name: string)}
  <span
    class="flex h-control-md max-w-56 items-center rounded-md border border-border bg-card px-2 text-xs text-secondary-foreground"
    >{name}</span
  >
{/snippet}

{#if story === "blocks-comms-conversationrow--channel"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-general")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--private-channel"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow
      conversation={{ ...row("c-incidents"), unread: 0, mentions: 0 }}
      onSelect={hook("select")}
    />
  </div>
{:else if story === "blocks-comms-conversationrow--selected"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-general")} selected onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--unread"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-design")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--mentions"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("g-review")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--many-unread"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={{ ...row("c-incidents"), mentions: 0 }} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--direct-message-online"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("d-lin")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--direct-message-offline"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("d-kofi")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--group"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("g-named")} onSelect={hook("select")}>
      {#snippet trailing()}
        <span class="shrink-0 text-xs text-muted-foreground tabular-nums">4</span>
      {/snippet}
    </CommsConversationRow>
  </div>
{:else if story === "blocks-comms-conversationrow--archived"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-old")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--long-name"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-long")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--list"}
  <div class="w-64 bg-background py-1">
    <CommsConversationList />
  </div>
{:else if story === "blocks-comms-conversationrow--disabled-row"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-design")} disabled onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-composershell--empty"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--can-send"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor value="Shipping the composer after lunch." />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--sending"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      sending
      sendLabel="Waiting for uploads…"
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--replying"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      replyTo={{ authorName: "Lin Mei", preview: "Does the presence dot still read on light?" }}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor autofocus />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--replying-to-deleted"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      replyTo={{ authorName: "Lin Mei", preview: "" }}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--editing"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      editing
      canSend
      sendLabel="Save edit"
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor value="The keycap badge reads on light themes now." />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--with-attachments"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
      {#snippet attachments()}
        {@render chip("screenshot-light.png")}
        {@render chip("badge-keycap-dark.png")}
      {/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--read-only"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      readOnly="This channel is archived"
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--custom-send"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
      {#snippet send()}
        <IconButton size="lg" shape="round" icon={Mic} label="Record a voice message" />
      {/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--format-row"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
      {#snippet formatRow()}
        <IconButton size="sm" icon={Bold} label="Bold" />
        <IconButton size="sm" icon={Italic} label="Italic" />
        <IconButton size="sm" icon={Link} label="Link" />
      {/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--drop-active"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      dropActive
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--invalid"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      invalid
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor value="A very long message…" />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--with-popup"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor autofocus />{/snippet}
      {#snippet popup()}
        <div
          role="listbox"
          aria-label="Mention"
          class="absolute right-2 bottom-full left-2 z-popover mb-1 rounded-lg border border-border bg-popover p-1 shadow-lg"
        >
          {#each ["Lin Mei", "Sam Ortiz"] as name, i (name)}
            <div
              role="option"
              aria-selected={i === 0}
              class="flex h-control-md items-center rounded px-2 text-xs text-foreground aria-selected:bg-element-selected"
            >
              {name}
            </div>
          {/each}
        </div>
      {/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--editing-with-preview"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      editing
      canSend
      sendLabel="Save edit"
      editPreview="The keycap badge reads on light themes."
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor value="The keycap badge reads on light themes now." />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--render-send"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend
      escapeToCancel={false}
      replyTo={{ authorName: "Lin Mei", preview: "Ship it?" }}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor value="Yes." autofocus />{/snippet}
      {#snippet renderSend({ canSend: enabled, label, onSend: send })}
        <Button size="sm" disabled={!enabled} onclick={send}>{label}</Button>
      {/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--custom-send-label"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend
      sendLabel="Save edit"
      editing
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
    </CommsComposerShell>
  </div>
{/if}
