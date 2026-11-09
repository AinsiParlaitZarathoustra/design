<script lang="ts">
  import { onMount, tick } from "svelte";
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

  let root = $state<HTMLElement | null>(null);

  // The Failed and Live plays click "Retry push" with testing-library's
  // `userEvent.click`: the hover events, the press, focus on the button, the
  // release and the click, at the button's centre.
  onMount(() => {
    if (story !== "failed" && story !== "live") return;
    void tick().then(() => {
      const button = [...(root?.querySelectorAll<HTMLButtonElement>("button") ?? [])].find(
        (b) => b.textContent?.trim() === "Retry push",
      );
      if (!button) return;
      const box = button.getBoundingClientRect();
      const at = { clientX: box.left + box.width / 2, clientY: box.top + box.height / 2 };
      const pointer = (type: string, buttons: number) =>
        button.dispatchEvent(
          new PointerEvent(type, {
            bubbles: !type.endsWith("enter"),
            cancelable: true,
            button: 0,
            buttons,
            pointerId: 1,
            pointerType: "mouse",
            isPrimary: true,
            ...at,
          }),
        );
      const mouse = (type: string, buttons: number, detail: number) =>
        button.dispatchEvent(
          new MouseEvent(type, {
            bubbles: !type.endsWith("enter"),
            cancelable: true,
            button: 0,
            buttons,
            detail,
            view: window,
            ...at,
          }),
        );
      pointer("pointerover", 0);
      pointer("pointerenter", 0);
      mouse("mouseover", 0, 0);
      mouse("mouseenter", 0, 0);
      pointer("pointermove", 0);
      mouse("mousemove", 0, 0);
      pointer("pointerdown", 1);
      mouse("mousedown", 1, 1);
      button.focus();
      pointer("pointerup", 0);
      mouse("mouseup", 0, 1);
      mouse("click", 0, 1);
    });
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
