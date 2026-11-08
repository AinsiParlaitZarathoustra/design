<script lang="ts">
  import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaseSensitiveIcon,
    ChevronRightIcon,
    RegexIcon,
    ReplaceAllIcon,
    ReplaceIcon,
    SearchIcon,
    TextSelectIcon,
    WholeWordIcon,
    XIcon,
  } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Hint from "../../../ui/hint.svelte";
  import IconButton from "../../../ui/icon-button.svelte";
  import Icon from "../../../ui/icon.svelte";
  import FindBarAction from "./find-bar-action.svelte";

  export type FindFlag = "caseSensitive" | "wholeWord" | "regexp";

  const INPUT =
    "h-full w-44 min-w-0 shrink bg-transparent px-1.5 font-sans text-sm text-foreground outline-none placeholder:text-muted-foreground";

  let uid = 0;

  function countLabel(query: string, matchCount?: number, matchIndex?: number | null) {
    if (!query || matchCount === undefined) return "";
    if (matchCount === 0) return "No results";
    if (matchIndex != null) return `${matchIndex + 1} of ${matchCount}`;
    return `${matchCount} ${matchCount === 1 ? "result" : "results"}`;
  }

  /**
   * Find (and replace) over a file or a terminal's output: desktop's
   * `FileFindBar` in its looks, with the editor's options and replace added.
   * It is controlled and searches nothing itself; the app runs the search and
   * passes the count back.
   *
   * Keys: Enter is the next match and Shift+Enter the previous; Alt+Enter
   * selects every match (with `onSelectAll`); in the replace field Enter
   * replaces and Ctrl+Alt+Enter replaces all; Escape anywhere closes.
   */
  interface Props {
    query: string;
    onQueryChange: (query: string) => void;
    /** The current match, 0-based. `null` or unset: none chosen, so the count reads "12 results". */
    matchIndex?: number | null;
    /** Unset while the count is unknown (a search still running): no count shows. */
    matchCount?: number;
    /** The query does not parse (a bad regular expression). */
    invalid?: boolean;
    caseSensitive?: boolean;
    wholeWord?: boolean;
    regexp?: boolean;
    /** Shows the three option toggles. Without it the bar is find-only. */
    onToggle?: (flag: FindFlag, value: boolean) => void;
    /** The replacement text. The replace row exists only with `onReplaceChange`. */
    replace?: string;
    onReplaceChange?: (replace: string) => void;
    replaceOpen?: boolean;
    onReplaceOpenChange?: (open: boolean) => void;
    onReplace?: () => void;
    onReplaceAll?: () => void;
    onNext: () => void;
    onPrevious: () => void;
    /** Escape anywhere in the bar, or the close button. */
    onClose: () => void;
    /** Selects every match at once (Alt+Enter in the query). */
    onSelectAll?: () => void;
    placeholder?: string;
    autoFocus?: boolean;
    /** The query input, for an app that puts the keyboard back in it. */
    inputRef?: HTMLInputElement | null;
    class?: string;
  }

  let {
    query,
    onQueryChange,
    matchIndex,
    matchCount,
    invalid = false,
    caseSensitive = false,
    wholeWord = false,
    regexp = false,
    onToggle,
    replace = "",
    onReplaceChange,
    replaceOpen = false,
    onReplaceOpenChange,
    onReplace,
    onReplaceAll,
    onNext,
    onPrevious,
    onClose,
    onSelectAll,
    placeholder = "Find",
    autoFocus = false,
    inputRef = $bindable(null),
    class: className,
  }: Props = $props();

  const replaceId = `find-bar-replace-${++uid}`;
  const canReplace = $derived(onReplaceChange !== undefined);
  const none = $derived(matchCount === 0);
  const canStep = $derived(!none);
  const canSelectAll = $derived(query !== "" && !none);
  const label = $derived(countLabel(query, matchCount, matchIndex));

  const focusWhenAsked = (node: HTMLInputElement) => {
    if (autoFocus) node.focus();
  };

  const captureInput = (node: HTMLInputElement) => {
    inputRef = node;
    return () => {
      inputRef = null;
    };
  };

  function onBarKeydown(e: KeyboardEvent) {
    if (e.key !== "Escape") return;
    e.preventDefault();
    e.stopPropagation();
    onClose();
  }

  function onQueryKeydown(e: KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (e.altKey && !e.metaKey && !e.ctrlKey) {
      if (onSelectAll && canSelectAll) onSelectAll();
      return;
    }
    if (!canStep) return;
    if (e.shiftKey) onPrevious();
    else onNext();
  }

  function onReplaceKeydown(e: KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (e.altKey && (e.metaKey || e.ctrlKey)) onReplaceAll?.();
    else onReplace?.();
  }
</script>

<div
  role="search"
  aria-label={canReplace ? "Find and replace" : "Find"}
  data-slot="find-bar"
  data-invalid={invalid || undefined}
  onkeydown={onBarKeydown}
  class={cn(
    "flex max-w-full min-w-0 flex-col gap-0.5 rounded-md border border-border bg-popover py-1 pr-1 pl-1 shadow-md",
    invalid && "border-error",
    className,
  )}
>
  <div class="flex h-control-sm min-w-0 items-center gap-0.5">
    {#if canReplace}
      <Hint label={replaceOpen ? "Hide replace" : "Show replace"}>
        <IconButton
          size="xs"
          icon={ChevronRightIcon}
          label={replaceOpen ? "Hide replace" : "Show replace"}
          aria-expanded={replaceOpen}
          aria-controls={replaceOpen ? replaceId : undefined}
          onclick={() => onReplaceOpenChange?.(!replaceOpen)}
          class={cn(
            "[&_svg]:transition-transform [&_svg]:duration-fast",
            replaceOpen && "[&_svg]:rotate-90",
          )}
        />
      </Hint>
    {:else}
      <Icon icon={SearchIcon} size="sm" class="ml-1 shrink-0 text-muted-foreground" />
    {/if}
    <input
      {@attach captureInput}
      value={query}
      oninput={(e) => onQueryChange(e.currentTarget.value)}
      onkeydown={onQueryKeydown}
      {placeholder}
      aria-label={placeholder}
      aria-invalid={invalid || undefined}
      spellcheck={false}
      {@attach focusWhenAsked}
      class={cn(INPUT, invalid && "text-error")}
    />
    <span
      aria-live="polite"
      class="min-w-16 shrink-0 px-1 text-right text-xs text-muted-foreground tabular-nums"
    >
      {label}
    </span>
    {#if onToggle}
      <FindBarAction
        label="Match case"
        icon={CaseSensitiveIcon}
        pressed={caseSensitive}
        onclick={() => onToggle("caseSensitive", !caseSensitive)}
      />
      <FindBarAction
        label="Match whole word"
        icon={WholeWordIcon}
        pressed={wholeWord}
        onclick={() => onToggle("wholeWord", !wholeWord)}
      />
      <FindBarAction
        label="Use regular expression"
        icon={RegexIcon}
        pressed={regexp}
        onclick={() => onToggle("regexp", !regexp)}
      />
    {/if}
    <FindBarAction label="Previous match" icon={ArrowUpIcon} onclick={onPrevious} disabled={!canStep} />
    <FindBarAction label="Next match" icon={ArrowDownIcon} onclick={onNext} disabled={!canStep} />
    {#if onSelectAll}
      <FindBarAction
        label="Select all matches"
        icon={TextSelectIcon}
        onclick={onSelectAll}
        disabled={!canSelectAll}
      />
    {/if}
    <FindBarAction label="Close" icon={XIcon} onclick={onClose} />
  </div>
  {#if canReplace && replaceOpen}
    <div id={replaceId} class="flex h-control-sm min-w-0 items-center gap-0.5">
      <span aria-hidden="true" class="size-control-xs shrink-0"></span>
      <input
        value={replace}
        oninput={(e) => onReplaceChange?.(e.currentTarget.value)}
        onkeydown={onReplaceKeydown}
        placeholder="Replace"
        aria-label="Replace"
        spellcheck={false}
        class={INPUT}
      />
      <span class="min-w-16 shrink-0"></span>
      <FindBarAction label="Replace" icon={ReplaceIcon} onclick={() => onReplace?.()} disabled={none} />
      <FindBarAction
        label="Replace all"
        icon={ReplaceAllIcon}
        onclick={() => onReplaceAll?.()}
        disabled={none}
      />
    </div>
  {/if}
</div>
