<script lang="ts">
  import { SquareTerminal } from "lucide-svelte";
  import { stripAnsi } from "./session-view-helpers";
  import type { ToolCallView } from "./session-view";
  import PayloadFrame from "./payload-frame.svelte";
  import PayloadLines from "./payload-lines.svelte";
  import PayloadCopy from "./payload-copy.svelte";
  import type { CopyPayload, ToolCallCardLabels } from "./tool-call-labels";
  import { splitLines } from "./tool-call-text";

  /** A command's run as a terminal block (`TerminalBlock`): the tail, with the exit code and Copy. */
  interface Props {
    terminal: NonNullable<ToolCallView["terminal"]>;
    labels: ToolCallCardLabels;
    onCopy?: CopyPayload;
  }

  let { terminal, labels, onCopy }: Props = $props();

  const text = $derived(stripAnsi(terminal.output));
  const lines = $derived(splitLines(text));
  const failed = $derived(terminal.exitCode !== undefined && terminal.exitCode !== 0);
</script>

{#snippet terminalAside()}
  {#if failed || onCopy}
    {#if failed}
      <span class="shrink-0 font-mono text-xs text-error">exit {terminal.exitCode}</span>
    {/if}
    {#if onCopy}
      <PayloadCopy part="output" {text} {onCopy} {labels} />
    {/if}
  {/if}
{/snippet}

<PayloadFrame
  terminal
  icon={SquareTerminal}
  label={terminal.command ? `$ ${terminal.command}` : "Terminal"}
  aside={terminalAside}
>
  {#snippet children()}
    <PayloadLines {lines} from="tail" dim showMore={labels.showMore} />
  {/snippet}
</PayloadFrame>
