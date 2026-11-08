<script lang="ts">
  import type { Snippet } from "svelte";
  import { History, X } from "lucide-svelte";
  import Icon from "../../ui/icon.svelte";
  import Kbd from "../../ui/kbd.svelte";
  import Spinner from "../../components/ui/spinner.svelte";
  import CommandEmpty from "./command-empty.svelte";
  import CommandFooterHint from "./command-footer-hint.svelte";
  import CommandInput from "./command-input.svelte";
  import CommandItem from "./command-item.svelte";
  import CommandItemIcon from "./command-item-icon.svelte";
  import CommandPanel from "./command-panel.svelte";
  import CommandHints from "./command-hints.svelte";
  import SearchResultRow from "./search-result-row.svelte";
  import { createListHighlight } from "./list-highlight.svelte";
  import { optionId } from "./command-list";
  import type { SearchResult, SearchStatus } from "./search-overlay-types";

  /**
   * The body of the search overlay, ported from `SearchOverlayBody`: the field, the
   * results or the recent searches, and the key legend, on the command shell. The
   * keyboard model is the palette's: ↑/↓ step the highlight, Enter opens the
   * highlighted result (or, in submit mode after an edit, searches), Delete forgets
   * a highlighted recent search.
   */
  interface Props {
    onOpenChange: (open: boolean) => void;
    placeholder?: string;
    query: string;
    onQueryChange: (query: string) => void;
    mode?: "live" | "submit";
    onSubmit?: (query: string) => void;
    status: SearchStatus;
    error?: string;
    results: ReadonlyArray<SearchResult>;
    onOpen: (result: SearchResult) => void;
    count?: string;
    recent?: ReadonlyArray<string>;
    onPickRecent?: (query: string) => void;
    onForgetRecent?: (query: string) => void;
    onClearRecent?: () => void;
    idleHint?: string;
    emptyMessage?: string;
    notice?: string;
    endAddon?: Snippet;
    hints?: boolean;
    inputId?: string;
  }

  let {
    onOpenChange,
    placeholder,
    query,
    onQueryChange,
    mode = "live",
    onSubmit,
    status,
    error,
    results,
    onOpen,
    count,
    recent = [],
    onPickRecent,
    onForgetRecent,
    onClearRecent,
    idleHint,
    emptyMessage = "No results",
    notice,
    endAddon,
    hints = true,
  }: Props = $props();

  const RECENT_LIMIT = 8;
  const RECENT_PREFIX = "recent:";

  const uid = $props.id();
  const listId = `search-list-${uid}`;
  const recentLabelId = `search-recent-${uid}`;
  // Submit mode: the query was edited since the last search, so Enter searches
  // rather than opening a result of the old one. The popup unmounts on close.
  let dirty = $state(false);

  const empty = $derived(query.trim() === "");
  const shownRecent = $derived(recent.slice(0, RECENT_LIMIT));
  const showingRecent = $derived(status !== "error" && empty && status === "idle" && shownRecent.length > 0);
  const showingResults = $derived(status !== "error" && !showingRecent && results.length > 0);

  const ids = $derived(
    showingRecent
      ? shownRecent.map((q) => RECENT_PREFIX + q)
      : showingResults
        ? results.map((r) => r.id)
        : [],
  );
  const highlight = createListHighlight(
    () => ids,
    () => `${query}|${mode}|${showingRecent ? "r" : "q"}`,
  );
  const hasList = $derived(ids.length > 0);

  $effect.pre(() => {
    void query;
    document.getElementById(listId)?.scrollTo?.({ top: 0 });
  });

  $effect.pre(() => {
    const active = highlight.active;
    if (active === null) return;
    document.getElementById(optionId(listId, active))?.scrollIntoView?.({ block: "nearest" });
  });

  function open(result: SearchResult) {
    onOpenChange(false);
    onOpen(result);
  }

  function submit(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    dirty = false;
    onSubmit?.(trimmed);
  }

  function pickRecent(q: string) {
    onPickRecent?.(q);
    onQueryChange(q);
    if (mode === "submit") submit(q);
  }

  const activeRecent = $derived(
    showingRecent && highlight.active?.startsWith(RECENT_PREFIX)
      ? highlight.active.slice(RECENT_PREFIX.length)
      : null,
  );
  const activeResult = $derived(
    showingResults ? results.find((r) => r.id === highlight.active) : undefined,
  );

  function onKeyDown(event: KeyboardEvent) {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      highlight.step(event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (event.key === "Delete" && activeRecent !== null) {
      event.preventDefault();
      onForgetRecent?.(activeRecent);
      return;
    }
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (activeRecent !== null) return pickRecent(activeRecent);
    if (mode === "submit" && (dirty || results.length === 0)) return submit(query);
    if (activeResult) open(activeResult);
  }

  const searchNext = $derived(mode === "submit" && (dirty || results.length === 0));
  const enterLabel = $derived(showingRecent ? "Search" : searchNext ? "Search" : "Open");
</script>

{#snippet endSlot()}
  {#if status === "searching"}<Spinner size="lg" label="Searching" />{/if}
  {#if count !== undefined}
    <span class="shrink-0 text-xs tabular-nums text-muted-foreground">{count}</span>
  {/if}
  {@render endAddon?.()}
{/snippet}

{#snippet forgetHint()}
  <CommandFooterHint>
    <Kbd variant="soft" size="sm">Delete</Kbd>
    <span>Forget</span>
  </CommandFooterHint>
{/snippet}

<div data-slot="search-overlay-view" class="flex min-h-0 flex-1 flex-col">
  <CommandInput
    value={query}
    oninput={(event) => {
      dirty = true;
      onQueryChange(event.currentTarget.value);
    }}
    onkeydown={onKeyDown}
    {placeholder}
    aria-expanded={hasList}
    aria-controls={hasList ? listId : undefined}
    aria-activedescendant={hasList && highlight.active !== null
      ? optionId(listId, highlight.active)
      : undefined}
    endAddon={endSlot}
  />

  {#if status === "error"}
    <p class="px-5 py-10 text-center text-sm text-destructive">{error}</p>
  {:else if showingRecent}
    <div class="flex shrink-0 items-center justify-between px-4 pt-1 pb-1.5">
      <span id={recentLabelId} class="text-xs font-medium text-muted-foreground">Recent searches</span>
      {#if onClearRecent}
        <button
          type="button"
          onmousedown={(event) => event.preventDefault()}
          onclick={onClearRecent}
          class="cursor-pointer text-xs text-muted-foreground hover:text-foreground"
        >
          Clear all
        </button>
      {/if}
    </div>
    <CommandPanel id={listId} aria-labelledby={recentLabelId}>
      {#each shownRecent as q (q)}
        {@const key = RECENT_PREFIX + q}
        <CommandItem
          id={optionId(listId, key)}
          active={highlight.active === key}
          class="group"
          onpointermove={(event: PointerEvent) => highlight.pointTo(key, event.clientX, event.clientY)}
          onmousedown={(event: MouseEvent) => event.preventDefault()}
          onclick={() => pickRecent(q)}
        >
          <CommandItemIcon>
            <Icon icon={History} size="lg" />
          </CommandItemIcon>
          <span class="min-w-0 flex-1 truncate font-mono text-sm">{q}</span>
          {#if onForgetRecent}
            <span
              aria-hidden="true"
              onmousedown={(event) => event.preventDefault()}
              onclick={(event) => {
                event.stopPropagation();
                onForgetRecent(q);
              }}
              class="ms-auto flex shrink-0 items-center rounded-sm p-0.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-data-[active]:opacity-100 hover:text-foreground"
            >
              <Icon icon={X} size="sm" />
            </span>
          {/if}
        </CommandItem>
      {/each}
    </CommandPanel>
  {:else if empty && status === "idle"}
    {#if idleHint}<CommandEmpty>{idleHint}</CommandEmpty>{/if}
  {:else if showingResults}
    <CommandPanel id={listId} size="tall">
      {#each results as result (result.id)}
        <SearchResultRow
          id={optionId(listId, result.id)}
          {result}
          active={highlight.active === result.id}
          onPoint={(x, y) => highlight.pointTo(result.id, x, y)}
          onOpen={open}
        />
      {/each}
    </CommandPanel>
    {#if notice}<p class="shrink-0 px-5 pb-2 text-xs text-muted-foreground">{notice}</p>{/if}
  {:else if status === "done"}
    <CommandEmpty>{emptyMessage}</CommandEmpty>
  {/if}

  {#if hints}
    <CommandHints
      actionLabel={hasList || (mode === "submit" && !empty) ? enterLabel : undefined}
      extra={showingRecent && onForgetRecent ? forgetHint : undefined}
    />
  {/if}
</div>
