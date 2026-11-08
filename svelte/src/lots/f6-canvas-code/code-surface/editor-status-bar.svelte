<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * The line under an editor: the cursor's position, then the file's indent,
   * encoding, line endings and language. An item left undefined is left out.
   * Deliberately not a live region: the position changes with every keystroke,
   * and announcing it would talk over the typing.
   */
  interface Props {
    /** 1-based, like the editor shows it. */
    line: number;
    column: number;
    /** Characters selected; shown when above zero. */
    selected?: number;
    language?: string;
    encoding?: string;
    /** "LF" / "CRLF". */
    eol?: string;
    /** "Spaces: 2", "Tab Size: 4". */
    indent?: string;
    /** Anything before the items, on the left. */
    start?: Snippet;
    onPositionClick?: () => void;
    onLanguageClick?: () => void;
    class?: string;
  }

  let {
    line,
    column,
    selected,
    language,
    encoding = "UTF-8",
    eol,
    indent,
    start,
    onPositionClick,
    onLanguageClick,
    class: className,
  }: Props = $props();

  const ITEM =
    "flex h-full shrink-0 items-center rounded-sm px-1.5 transition-colors duration-fast ease-out-strong";
</script>

<footer
  data-slot="editor-status-bar"
  class={cn(
    "flex h-control-sm shrink-0 items-center gap-1 overflow-hidden border-t border-border bg-background px-3 py-0.5 text-2xs text-muted-foreground tabular-nums",
    className,
  )}
>
  {#if start}
    <div class="flex min-w-0 items-center gap-1">{@render start()}</div>
  {/if}
  <div class="ml-auto flex h-full min-w-0 items-center gap-0.5">
    {#if onPositionClick}
      <button
        type="button"
        onclick={onPositionClick}
        class={cn(ITEM, "cursor-pointer hover:bg-element-hover hover:text-foreground")}
      >Ln <span>{line}</span>, Col <span>{column}</span>{selected ? ` (${selected} selected)` : ""}</button>
    {:else}
      <span class={ITEM}>Ln <span>{line}</span>, Col <span>{column}</span>{selected ? ` (${selected} selected)` : ""}</span>
    {/if}
    {#if indent}<span class={ITEM}>{indent}</span>{/if}
    {#if encoding}<span class={ITEM}>{encoding}</span>{/if}
    {#if eol}<span class={ITEM}>{eol}</span>{/if}
    {#if language}
      {#if onLanguageClick}
        <button
          type="button"
          onclick={onLanguageClick}
          class={cn(ITEM, "cursor-pointer hover:bg-element-hover hover:text-foreground")}
        >{language}</button>
      {:else}
        <span class={ITEM}>{language}</span>
      {/if}
    {/if}
  </div>
</footer>
