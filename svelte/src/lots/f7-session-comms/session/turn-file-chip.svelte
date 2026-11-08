<script lang="ts">
  import { Paperclip } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import type { AttachmentView } from "./session-view";
  import { formatBytes } from "./session-view-helpers";

  /**
   * A prompt's attached file: a chip with the name and the size (`FileChip` in
   * the oracle's `turn-row.tsx`). With `onOpen` it becomes a button; "Open" is
   * read by a screen reader while the name still contains the visible text, so
   * speech input ("click sidebar-spec.pdf") finds it.
   */
  interface Props {
    file: AttachmentView;
    onOpen?: () => void;
  }

  let { file, onOpen }: Props = $props();

  const chip = $derived(
    cn(
      "flex h-6 max-w-60 items-center gap-1.5 rounded-md border border-border-subtle bg-card px-2 text-xs text-secondary-foreground",
      onOpen && "cursor-pointer transition-colors hover:bg-element-hover",
    ),
  );
</script>

{#snippet content()}
  <Icon icon={Paperclip} size="xs" class="text-muted-foreground" />
  {#if onOpen}<span class="sr-only">Open </span>{/if}
  <span class="min-w-0 truncate">{file.name ?? "Attachment"}</span>
  {#if file.bytes !== undefined}
    <span class="shrink-0 text-muted-foreground tabular-nums">{formatBytes(file.bytes)}</span>
  {/if}
{/snippet}

{#if onOpen}
  <button type="button" onclick={onOpen} class={chip}>
    {@render content()}
  </button>
{:else}
  <span class={chip}>
    {@render content()}
  </span>
{/if}
