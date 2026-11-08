<script lang="ts">
  import { onMount } from "svelte";
  import StepList, {
    type StepListStep,
    type StepStatus,
  } from "../../../src/lots/f4-ui-second-half-patterns/step-list.svelte";

  interface Props {
    story?: string;
  }

  let { story = "running" }: Props = $props();

  const STEPS = [
    { id: "commit", label: "Commit", detail: "Tighten the composer's drop ring" },
    { id: "push", label: "Push", detail: "origin/ship-button" },
    { id: "pr", label: "Open pull request", detail: "into main" },
  ];

  const at = (...status: StepStatus[]): StepListStep[] =>
    STEPS.map((s, i) => ({ ...s, status: status[i] ?? "pending" }));

  // The Live story's demo state: the steps advance as a run would drive them.
  let liveStatus = $state<StepStatus[]>(["done", "failed"]);
  let root = $state<HTMLDivElement | null>(null);

  // The source's plays run a pointer click on "Retry push": Failed's spy leaves
  // the button focused (its focus ring is in the capture), and Live's retry
  // drives the steps on. Both are replayed here at mount.
  onMount(() => {
    if (story === "live") liveStatus = ["done", "done", "running"];
    if (story === "failed") root?.querySelector("button")?.focus();
  });
</script>

<div bind:this={root} class="w-80 rounded-lg border border-border-subtle px-3 py-2">
  {#if story === "running"}
    <StepList steps={at("done", "running", "pending")} />
  {:else if story === "starting"}
    <StepList steps={at()} />
  {:else if story === "done"}
    <StepList steps={at("done", "done", "done")} doneMessage="Opened pull request 12." />
  {:else if story === "failed"}
    <StepList
      steps={at("done", "failed", "pending")}
      error="! [rejected] ship-button -> ship-button (non-fast-forward)"
      onRetry={() => {}}
      retryLabel="Retry push"
    />
  {:else if story === "live"}
    <StepList
      steps={at(...liveStatus)}
      error={liveStatus.includes("failed") ? "Authentication failed for origin" : null}
      retryLabel="Retry push"
      onRetry={() => (liveStatus = ["done", "done", "running"])}
    />
  {/if}
</div>
