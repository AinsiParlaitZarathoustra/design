<script lang="ts">
  import CommsDayDivider from "../comms/comms-day-divider.svelte";
  import CommsMessageRow from "../comms/comms-message-row.svelte";
  import CommsUnreadLine from "../comms/comms-unread-line.svelte";
  import { transcriptRows } from "../comms/comms-view-helpers";
  import { BASE, COMMS_REACTION_EMOJI, ME, calls, transcript } from "../fixtures/comms-fixtures";

  /** The `Transcript` story: a day, the unread line, a call and every message, grouped (`TranscriptDemo`). */
  const MINUTE = 60_000;
  const rows = transcriptRows(transcript(), { me: ME, lastReadSeq: 30, calls: calls() });
  const now = BASE + 8 * 60 * MINUTE;
</script>

<div>
  {#each rows as row (row.key)}
    {#if row.kind === "day"}
      <CommsDayDivider at={row.at} {now} />
    {:else if row.kind === "unread"}
      <CommsUnreadLine />
    {:else if row.kind === "call"}
      <div class="mx-10 my-2 flex h-10 items-center rounded-lg border border-border-subtle bg-card px-3 text-xs text-muted-foreground">
        Call
      </div>
    {:else}
      <CommsMessageRow
        message={row.message}
        head={row.head}
        reactionEmoji={COMMS_REACTION_EMOJI}
        can={{
          react: true,
          reply: true,
          pin: true,
          edit: row.message.author.id === ME,
          delete: row.message.author.id === ME,
        }}
      >
        {#snippet body()}<p>{row.message.body}</p>{/snippet}
      </CommsMessageRow>
    {/if}
  {/each}
</div>
