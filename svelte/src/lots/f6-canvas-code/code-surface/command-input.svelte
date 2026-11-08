<script lang="ts">
  import type { KeyboardEventHandler, ClipboardEventHandler, FocusEventHandler } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { ChevronRightIcon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import Spinner from "../../../components/ui/spinner.svelte";
  import CommandSuggestions, { commandSuggestionId, type CommandSuggestion } from "./command-suggestions.svelte";

  /**
   * The terminal's command line, under its blocks (desktop's block-terminal
   * footer and `command-input.tsx`): a prompt glyph, or a spinner while a command
   * runs, the field, and the row's status and stop control. The field is
   * controlled; every key is the app's to handle.
   *
   * The row is a container, so the status gives way to the field in a narrow
   * pane rather than a narrow window.
   */
  interface Suggestions {
    id: string;
    open: boolean;
    items: readonly CommandSuggestion[];
    activeIndex: number;
    onSelect: (item: CommandSuggestion) => void;
    onOpenChange: (open: boolean) => void;
  }

  interface Props {
    value: string;
    onValueChange: (value: string) => void;
    /** History, Tab completion and Ctrl-C live here, in the app. */
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
    onPaste?: ClipboardEventHandler<HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
    /** A command is running: the field answers its prompts instead of composing a command. */
    busy?: boolean;
    /** The running program reads keys one by one (a TUI): every key goes straight to it. */
    rawMode?: boolean;
    placeholder?: string;
    /** At the row's end: a `TerminalStopControl`. */
    stopControl?: Snippet;
    /** Before the stop control: a `TerminalStatus`. */
    status?: Snippet;
    textareaRef?: HTMLTextAreaElement | null;
    /** The completion list above the field, which the field's `aria-activedescendant` follows. */
    suggestions?: Suggestions;
    class?: string;
  }

  let {
    value,
    onValueChange,
    onKeyDown,
    onPaste,
    onBlur,
    busy = false,
    rawMode = false,
    placeholder,
    stopControl,
    status,
    textareaRef = $bindable(null),
    suggestions,
    class: className,
  }: Props = $props();

  // The field reports itself to the parent (and to the list's anchor) as it mounts.
  const captureField = (node: HTMLTextAreaElement) => {
    textareaRef = node;
    return () => {
      textareaRef = null;
    };
  };

  function placeholderFor(isBusy: boolean, isRaw: boolean) {
    if (isRaw) return "Interactive prompt — keys go straight to it…";
    if (isBusy) return "Type a response, then press Enter…";
    return "Run a command…";
  }

  const expanded = $derived(!!suggestions && suggestions.open && suggestions.items.length > 0);
</script>

<div
  data-slot="command-input"
  class={cn(
    "@container relative flex min-h-[29px] items-center gap-2 border-t border-border bg-background px-3 py-[5px]",
    className,
  )}
>
  {#if busy}
    <Spinner size="sm" label="" class="text-primary" />
  {:else}
    <Icon icon={ChevronRightIcon} size="sm" class="text-primary" />
  {/if}
  <textarea
    {@attach captureField}
    rows={1}
    {value}
    oninput={(e) => onValueChange(e.currentTarget.value)}
    onkeydown={onKeyDown}
    onpaste={onPaste}
    onblur={onBlur}
    spellcheck={false}
    autocapitalize="off"
    {...{ autocorrect: "off" }}
    aria-label="Command"
    placeholder={placeholder ?? placeholderFor(busy, rawMode)}
    aria-autocomplete={suggestions ? "list" : undefined}
    aria-controls={suggestions && expanded ? suggestions.id : undefined}
    aria-activedescendant={suggestions && expanded && suggestions.activeIndex >= 0
      ? commandSuggestionId(suggestions.id, suggestions.activeIndex)
      : undefined}
    class="min-w-0 flex-1 resize-none overflow-hidden border-none bg-transparent p-0 font-mono text-base text-foreground outline-none placeholder:whitespace-nowrap placeholder:text-muted-foreground"
  ></textarea>
  {@render status?.()}
  {#if status && stopControl}
    <span aria-hidden="true" class="hidden h-3 w-px shrink-0 bg-border @[300px]:block"></span>
  {/if}
  {@render stopControl?.()}
  {#if suggestions}
    <CommandSuggestions {...suggestions} anchor={textareaRef} />
  {/if}
</div>
