<script lang="ts">
  import { onDestroy } from "svelte";
  import { OctagonXIcon, SquareIcon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Hint from "../../../ui/hint.svelte";
  import Icon from "../../../ui/icon.svelte";
  import { iconButtonVariants } from "../../../ui/icon-button-variants";
  import Spinner from "../../../components/ui/spinner.svelte";

  /** How long an interrupt gets before the control offers a force stop. */
  const FORCE_STOP_DELAY_MS = 1500;

  type StopPhase = "ready" | "waiting" | "force" | "killing";

  const LABEL: Record<StopPhase, string> = {
    ready: "Stop process",
    waiting: "Waiting for process to stop",
    force: "Force stop process",
    killing: "Force stopping process",
  };

  /**
   * The button only exists while a process runs (the parent mounts it under
   * `active`), so its phase starts over for each run: going inactive is what
   * resets the control after a stop.
   */
  interface Props {
    onInterrupt: () => void;
    onForceStop: () => Promise<boolean>;
    onForceStopped: () => void;
    class?: string;
  }

  let { onInterrupt, onForceStop, onForceStopped, class: className }: Props = $props();

  let phase = $state<StopPhase>("ready");
  let timer: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => clearTimeout(timer));

  const force = $derived(phase === "force");
  const pending = $derived(phase === "waiting" || phase === "killing");
  const label = $derived(LABEL[phase]);
  const shortcut = $derived(phase === "ready" ? "Ctrl+C" : undefined);

  async function stop() {
    if (!force) {
      phase = "waiting";
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (phase === "waiting") phase = "force";
      }, FORCE_STOP_DELAY_MS);
      onInterrupt();
      return;
    }
    phase = "killing";
    try {
      if (await onForceStop()) onForceStopped();
      else phase = "ready";
    } catch {
      phase = "ready";
    }
  }
</script>

<Hint {label} {shortcut} side="top">
  <button
    type="button"
    data-slot="terminal-stop-control"
    onclick={() => void stop()}
    disabled={pending}
    aria-label={shortcut ? `${label} (${shortcut})` : label}
    class={cn(
      iconButtonVariants({ size: "xs" }),
      force && "text-error hover:bg-error-muted hover:text-error",
      pending ? "cursor-wait" : "cursor-pointer",
      className,
    )}
  >
    {#if pending}
      <Spinner size="xs" label="" />
    {:else if force}
      <Icon icon={OctagonXIcon} size="sm" />
    {:else}
      <Icon icon={SquareIcon} size="xs" strokeWidth={3} fill="currentColor" />
    {/if}
  </button>
</Hint>
