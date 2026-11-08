<script lang="ts">
  import TerminalStopControlButton from "./terminal-stop-control-button.svelte";

  /**
   * Stops the running process: an interrupt first, and if the process is still
   * there after 1.5s, a force stop in the error tone. Desktop's
   * `terminal-stop-control.tsx`.
   */
  interface Props {
    /** A process is running. Nothing renders otherwise; going false is what resets the control after a stop. */
    active: boolean;
    /** Ctrl-C to the process. */
    onInterrupt: () => void;
    /** Kill it; resolve `true` when it is gone. */
    onForceStop: () => Promise<boolean>;
    /** After a force stop succeeded. */
    onForceStopped: () => void;
    class?: string;
  }

  let { active, onInterrupt, onForceStop, onForceStopped, class: className }: Props = $props();
</script>

{#if active}
  <TerminalStopControlButton
    {onInterrupt}
    {onForceStop}
    {onForceStopped}
    class={className}
  />
{/if}
