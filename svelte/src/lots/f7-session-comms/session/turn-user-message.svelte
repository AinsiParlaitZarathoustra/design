<script lang="ts">
  import type { Snippet } from "svelte";
  import type { AttachmentView, CommentAnchor, TurnView } from "./session-view";
  import { useWholeLineClamp } from "./use-whole-line-clamp.svelte";
  import TurnFileChip from "./turn-file-chip.svelte";
  import TurnReadRest from "./turn-read-rest.svelte";

  /**
   * The prompt: a right-aligned bubble, clamped to twelve whole lines behind
   * "Show more", its images and files above and below, and "Read the rest" for
   * a preview. The generous space below is what separates one exchange from the
   * next.
   */
  interface Props {
    user: NonNullable<TurnView["user"]>;
    commentSlot?: Snippet<[CommentAnchor]>;
    markdown: Snippet<[string]>;
    footer?: Snippet;
    onOpenAttachment?: (attachment: AttachmentView, index: number) => void;
    onLoadBody?: (id: string) => void;
  }

  let { user, commentSlot, markdown, footer, onOpenAttachment, onLoadBody }: Props = $props();

  let expanded = $state(false);
  let clampEl = $state<HTMLElement | null>(null);
  const clamp = useWholeLineClamp(
    () => clampEl,
    () => !expanded,
  );

  // Each keeps its index in `user.attachments`, which is what `onOpenAttachment` reports.
  const indexed = $derived(
    (user.attachments ?? []).map((attachment, index) => ({ attachment, index })),
  );
  const images = $derived(indexed.filter((a) => a.attachment.kind === "image"));
  const files = $derived(indexed.filter((a) => a.attachment.kind === "file"));
</script>

{#snippet picture(image: AttachmentView)}
  <img
    src={image.src}
    alt={image.name ?? ""}
    class="size-16 rounded-lg border border-border-subtle bg-card object-cover"
  />
{/snippet}

<div class="flex justify-end gap-2 pt-2 pb-6">
  {#if commentSlot}
    <div class="shrink-0 self-start">
      {@render commentSlot({ kind: "message", id: user.id })}
    </div>
  {/if}
  <div class="flex max-w-4/5 min-w-0 flex-col items-end">
    {#if images.length > 0}
      <div class="mb-2 flex flex-wrap justify-end gap-1.5">
        {#each images as { attachment: image, index } (index)}
          {#if onOpenAttachment}
            <button
              type="button"
              aria-label={`Open ${image.name ?? "attachment"}`}
              onclick={() => onOpenAttachment?.(image, index)}
              class="cursor-pointer rounded-lg transition-opacity hover:opacity-85"
            >
              {@render picture(image)}
            </button>
          {:else}
            {@render picture(image)}
          {/if}
        {/each}
      </div>
    {/if}
    <div
      data-comment-anchor={user.id}
      class="max-w-full min-w-0 rounded-[20px] bg-primary-muted px-4 py-2.5 select-text"
    >
      <!-- The clamp is inside the padding, so the budget is whole line boxes. -->
      <div
        bind:this={clampEl}
        style:max-height={expanded ? null : `${clamp.height}px`}
        style:overflow={expanded ? null : "hidden"}
      >
        {@render markdown(user.text)}
      </div>
    </div>
    {#if files.length > 0}
      <div class="mt-1.5 flex flex-wrap justify-end gap-1.5">
        {#each files as { attachment: file, index } (index)}
          <TurnFileChip
            {file}
            onOpen={onOpenAttachment ? () => onOpenAttachment?.(file, index) : undefined}
          />
        {/each}
      </div>
    {/if}
    {#if clamp.overflows || user.truncated}
      <div class="mt-0.5 flex items-center gap-2 text-2xs text-muted-foreground">
        {#if user.truncated}
          {#if onLoadBody}
            <TurnReadRest id={user.id} bytes={user.bytes} load={user.load} onLoad={onLoadBody} />
          {:else}
            <span>Truncated</span>
          {/if}
        {/if}
        {#if clamp.overflows}
          <button
            type="button"
            aria-expanded={expanded}
            onclick={() => (expanded = !expanded)}
            class="h-4.5 cursor-pointer transition-colors hover:text-secondary-foreground"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        {/if}
      </div>
    {/if}
    {@render footer?.()}
  </div>
</div>
