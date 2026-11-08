<script lang="ts">
  import { onDestroy, untrack, type Snippet } from "svelte";
  import { CheckIcon, ChevronDownIcon, CircleCheckIcon, CircleXIcon, CopyIcon, FolderIcon, RotateCwIcon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import IconButton from "../../../ui/icon-button.svelte";
  import Spinner from "../../../components/ui/spinner.svelte";
  import HintGroup from "../deps/hint-group.svelte";
  import HintItem from "../deps/hint-item.svelte";
  import { formatDuration } from "./code-surface";
  import Highlighted from "./highlighted.svelte";

  const COPIED_MS = 1200;

  let uid = 0;

  /**
   * One command and its output: desktop's block terminal card
   * (`block-terminal.tsx`'s `BlockCard`), with nothing of the PTY in it.
   * A finished block skips layout and paint while off screen; a running one
   * never does, since its height changes on every flush.
   */
  interface Props {
    /** The command line. Empty: a headerless block (output before the first prompt). */
    command?: string;
    running: boolean;
    /** `null`/unset reads as success. */
    exitCode?: number | null;
    durationMs?: number;
    /** Where it ran; the header shows the last folder. */
    cwd?: string;
    /** After the command: "large output", say. */
    badges?: Snippet;
    /** Above the output: "earlier output hidden…". Hidden while collapsed. */
    notice?: Snippet;
    /** Under the output, and shown even when collapsed: a password prompt. */
    footer?: Snippet;
    /** Copy the block's full output. The button confirms for a moment. */
    onCopy?: () => void;
    onRerun?: () => void;
    /** Controlled collapse; leave unset for the block to keep its own. */
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    /** Marks matches in the command line, as `TerminalOutput`'s `highlight` does in the output. */
    commandHighlight?: string;
    /** The output: a `TerminalOutput`. */
    children?: Snippet;
    class?: string;
  }

  let {
    command = "",
    running,
    exitCode,
    durationMs,
    cwd,
    badges,
    notice,
    footer,
    onCopy,
    onRerun,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onCollapsedChange,
    commandHighlight,
    children,
    class: className,
  }: Props = $props();

  const outputId = `terminal-block-output-${++uid}`;
  let ownCollapsed = $state(untrack(() => defaultCollapsed));
  const collapsed = $derived(collapsedProp ?? ownCollapsed);

  function setCollapsed(next: boolean) {
    if (collapsedProp === undefined) ownCollapsed = next;
    onCollapsedChange?.(next);
  }

  let copies = $state(0);
  let copied = $state(false);
  let copyTimer: ReturnType<typeof setTimeout> | undefined;
  onDestroy(() => clearTimeout(copyTimer));

  const failed = $derived(!running && exitCode != null && exitCode !== 0);
  const hasHeader = $derived(command !== "");
  const cwdName = $derived(cwd ? cwd.split("/").filter(Boolean).pop() : undefined);

  function copy() {
    onCopy?.();
    copied = true;
    copies += 1;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => (copied = false), COPIED_MS);
  }
</script>

{#if hasHeader || children || footer}
  <div
    data-slot="terminal-block"
    data-state={running ? "running" : failed ? "failed" : "succeeded"}
    class={cn("group overflow-hidden rounded-md border border-border bg-card", className)}
    style={running ? undefined : "content-visibility: auto; contain-intrinsic-size: auto 200px;"}
  >
    {#if hasHeader}
      <div class="flex h-control-md items-center gap-2 border-b border-border-subtle px-2.5 text-sm">
        {#if running}
          <Spinner size="sm" label="" class="text-primary" />
        {:else if failed}
          <Icon icon={CircleXIcon} size="sm" class="shrink-0 text-error" role="img" aria-label="Failed" />
        {:else}
          <Icon icon={CircleCheckIcon} size="sm" class="shrink-0 text-success" role="img" aria-label="Succeeded" />
        {/if}
        <button
          type="button"
          aria-expanded={!collapsed}
          aria-controls={outputId}
          title={command}
          onclick={() => setCollapsed(!collapsed)}
          class="min-w-0 cursor-pointer truncate rounded-sm text-left font-mono text-foreground transition-opacity duration-fast hover:opacity-80"
        ><Highlighted text={command} query={commandHighlight} /></button>
        {@render badges?.()}
        <div class="ml-auto flex shrink-0 items-center gap-2 text-2xs text-muted-foreground">
          <HintGroup>
            <div class="flex items-center gap-0.5 opacity-0 transition-opacity duration-fast group-focus-within:opacity-100 group-hover:opacity-100">
              {#if onCopy}
                <HintItem label={copied ? "Copied" : "Copy output"}>
                  <IconButton
                    size="xs"
                    icon={copied ? CheckIcon : CopyIcon}
                    label={copied ? "Copied" : "Copy output"}
                    onclick={copy}
                  />
                </HintItem>
              {/if}
              {#if onRerun}
                <HintItem label="Rerun">
                  <IconButton size="xs" icon={RotateCwIcon} label="Rerun" onclick={onRerun} />
                </HintItem>
              {/if}
              <HintItem label={collapsed ? "Expand" : "Collapse"}>
                <IconButton
                  size="xs"
                  icon={ChevronDownIcon}
                  label={collapsed ? "Expand" : "Collapse"}
                  onclick={() => setCollapsed(!collapsed)}
                  class={cn("[&_svg]:transition-transform [&_svg]:duration-fast", collapsed && "[&_svg]:-rotate-90")}
                />
              </HintItem>
            </div>
          </HintGroup>
          {#if cwdName}
            <span class="flex items-center gap-1" title={cwd}>
              <Icon icon={FolderIcon} size="xs" />
              {cwdName}
            </span>
          {/if}
          {#if !running && durationMs != null}
            <span class="tabular-nums">{formatDuration(durationMs)}</span>
          {/if}
          {#if failed}<span class="text-error">exit {exitCode}</span>{/if}
        </div>
      </div>
    {/if}
    <div id={outputId} hidden={collapsed && hasHeader}>
      {#if notice}
        <div class="px-3 pt-2 text-2xs text-muted-foreground italic">{@render notice()}</div>
      {/if}
      {@render children?.()}
    </div>
    {@render footer?.()}
  </div>
{/if}
