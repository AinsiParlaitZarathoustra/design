<script lang="ts">
  import { StickyNoteIcon } from "lucide-svelte";
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import { CANVAS_FIELD_CLASS } from "./canvas-nodes-shared";

  /**
   * A note: a glass card, an icon and title over the body. A string body is
   * clipped to the card with a fade at the bottom edge, so a long one dissolves
   * rather than cutting off mid-line. `title`, `body` and `meta` take a string,
   * or a snippet for the app's own editor or markup.
   */
  interface Props {
    title: string | Snippet;
    body?: string | Snippet;
    /** An emoji in place of the sticky-note glyph. */
    icon?: string;
    /** A line under the title, e.g. "Edited 5m ago". */
    meta?: string | Snippet;
    /** Draws "Empty note — open to edit." in place of the body. */
    empty?: boolean;
    class?: string;
  }

  let { title, body, icon, meta, empty = false, class: className }: Props = $props();

  const fades = $derived(!empty && typeof body === "string");
</script>

<div
  data-slot="canvas-note"
  class={cn(
    "relative flex size-full flex-col overflow-hidden rounded-2xl border shadow-lg",
    "bg-card/70 backdrop-blur-glass backdrop-saturate-150 transition-colors duration-fast",
    "border-border-subtle group-hover/node:border-border group-data-selected/node:border-primary/60",
    className,
  )}
>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 opacity-60"
    style="background-image: linear-gradient(to bottom, var(--element-highlight), transparent);"
  ></div>
  <div class="relative flex shrink-0 items-center gap-2 border-b border-border-subtle px-3 py-2">
    <div class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-element-hover">
      {#if icon}
        <span class="text-lg leading-none">{icon}</span>
      {:else}
        <Icon icon={StickyNoteIcon} size="sm" class="text-secondary-foreground" />
      {/if}
    </div>
    <div class="min-w-0 flex-1">
      {#if typeof title === "string"}
        <div class={cn(CANVAS_FIELD_CLASS.noteTitle, "truncate")}>{title || "Untitled"}</div>
      {:else}
        {@render title()}
      {/if}
      {#if meta}
        <div class="truncate text-2xs text-muted-foreground">
          {#if typeof meta === "string"}{meta}{:else}{@render meta()}{/if}
        </div>
      {/if}
    </div>
  </div>
  <div class="relative flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-2.5">
    {#if empty}
      <div class="text-xs text-muted-foreground italic">Empty note — open to edit.</div>
    {:else if typeof body === "string"}
      <p class="text-sm leading-relaxed whitespace-pre-wrap text-secondary-foreground">{body}</p>
    {:else if body}
      {@render body()}
    {/if}
    {#if fades}
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-x-0 bottom-0 h-8"
        style="background-image: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--card) 85%, transparent));"
      ></div>
    {/if}
  </div>
</div>
