<script module lang="ts">
  import type { SyntaxRole } from "./code-surface";

  export interface EditorPreviewToken {
    text: string;
    role?: SyntaxRole;
    /** Inside the selection. */
    selected?: boolean;
    /** A find match; `active` is the current one. */
    match?: "match" | "active";
    /** The bracket matching the one at the cursor. */
    bracket?: boolean;
    /** The caret sits at the end of this token. */
    caret?: boolean;
  }

  export interface EditorPreviewLine {
    tokens: readonly EditorPreviewToken[];
    /** The gutter's change bar against git HEAD. */
    change?: "added" | "modified" | "deleted-above";
    /** A foldable range starts here. */
    fold?: "open" | "closed";
  }
</script>

<script lang="ts">
  import { ChevronDownIcon, ChevronRightIcon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import { SYNTAX_TEXT_CLASS } from "./code-surface";

  /**
   * A static, highlighted excerpt drawn exactly as desktop's CodeMirror theme
   * (`build-cm-theme.ts`) draws a file: the change-bar gutter, line numbers,
   * the fold gutter, the active line, selection, find matches, the matching
   * bracket and the caret. It takes tokens, not source: the package highlights
   * nothing.
   */
  interface Props {
    lines: readonly EditorPreviewLine[];
    /** The number shown on the first line. */
    startLine?: number;
    /** The line the cursor is on, by its shown number. */
    activeLine?: number;
    class?: string;
  }

  let { lines, startLine = 1, activeLine, class: className }: Props = $props();

  /** Comments and keywords are italic in desktop's highlight style. */
  const ITALIC_ROLES: ReadonlySet<SyntaxRole> = new Set(["comment", "keyword"]);

  const CHANGE_BAR = {
    added: "bg-diff-added-text",
    // There is no "changed" diff key; desktop's gutter uses a status colour.
    modified: "bg-info",
    // A deletion has no line of its own: a wedge on top of the line after it.
    "deleted-above": "border-t-2 border-diff-removed-text",
  } as const;

  function tokenClassName(token: EditorPreviewToken) {
    return cn(
      token.role && SYNTAX_TEXT_CLASS[token.role],
      token.role && ITALIC_ROLES.has(token.role) && "italic",
      token.selected && "bg-editor-selection-background",
      token.match === "match" && "bg-search-match-background",
      token.match === "active" && "bg-search-match-active-background",
      token.bracket &&
        "bg-editor-match-bracket-background outline outline-editor-match-bracket-border",
    );
  }
</script>

<pre data-slot="editor-preview" tabindex="0" class={cn("flex overflow-auto bg-editor-background font-mono text-base leading-[20px] text-editor-foreground", className)}><span aria-hidden="true" class="sticky left-0 flex shrink-0 flex-col bg-editor-gutter-background py-1 text-editor-gutter-foreground select-none">{#each lines as line, i (startLine + i)}{@const number = startLine + i}<span class="flex"><span class={cn("w-[3px]", line.change && CHANGE_BAR[line.change])}></span><span class={cn("min-w-8 pr-1 pl-2 text-right tabular-nums", number === activeLine && "text-editor-active-line-gutter-foreground")}>{number}</span><span class="flex w-4 items-center justify-center text-secondary-foreground">{#if line.fold}<Icon icon={line.fold === "open" ? ChevronDownIcon : ChevronRightIcon} size="xs" />{/if}</span></span>{/each}</span><code class="block min-w-0 flex-1 py-1">{#each lines as line, i (startLine + i)}<span class={cn("block px-1 whitespace-pre", startLine + i === activeLine && "bg-editor-active-line-background")}>{#if line.tokens.length === 0}​{/if}{#each line.tokens as token, j (j)}<span class={tokenClassName(token)}>{token.text}{#if token.caret}<span aria-hidden="true" class="-mr-[2px] inline-block h-[1.2em] w-[2px] bg-editor-caret align-text-bottom"></span>{/if}</span>{/each}{#if line.fold === "closed"}<span class="mx-1 rounded-sm border border-border bg-secondary px-1 text-secondary-foreground">…</span>{/if}</span>{/each}</code></pre>
