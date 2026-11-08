<script lang="ts">
  import type { Snippet } from "svelte";
  import { Brain, ChevronRight } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import type { CommentAnchor } from "./session-view";

  /**
   * A turn's thought process: one quiet line that opens, as plain text or as
   * markdown. While it streams the line says "Thinking…".
   */
  interface Props {
    id: string;
    text: string;
    live: boolean;
    /** The app's own label, e.g. "Reasoning"; defaults to "Think…"/"Thought process". */
    label?: Snippet<[{ streaming: boolean }]>;
    body: "markdown" | "text";
    markdown: Snippet<[string, boolean]>;
    commentSlot?: Snippet<[CommentAnchor]>;
  }

  let { id, text, live, label, body, markdown, commentSlot }: Props = $props();

  let open = $state(false);
</script>

<div class="py-0.5">
  <div class="flex items-center gap-2">
    <button
      type="button"
      aria-expanded={open}
      onclick={() => (open = !open)}
      class="flex h-6.5 min-w-0 flex-1 cursor-pointer items-center gap-2 text-left text-base text-muted-foreground transition-colors hover:text-secondary-foreground"
    >
      <span class="flex w-4 shrink-0 justify-center">
        <Icon icon={Brain} size="md" />
      </span>
      <span class="min-w-0 truncate">
        {#if label}
          {@render label({ streaming: live })}
        {:else}
          {live ? "Thinking…" : "Thought process"}
        {/if}
      </span>
      <Icon
        icon={ChevronRight}
        size="md"
        class={cn("transition-transform duration-fast", open && "rotate-90")}
      />
    </button>
    {#if commentSlot}
      <div class="shrink-0">
        {@render commentSlot({ kind: "message", id })}
      </div>
    {/if}
  </div>
  {#if open}
    <div class="pb-3 pl-6">
      {#if body === "markdown"}
        <div class="text-muted-foreground">
          {@render markdown(text, live)}
        </div>
      {:else}
        <pre
          class="font-sans text-sm leading-relaxed break-words whitespace-pre-wrap text-muted-foreground select-text">{text}</pre>
      {/if}
    </div>
  {/if}
</div>
