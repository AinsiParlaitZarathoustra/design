<script lang="ts">
  import ToolCallCard from "../session/tool-call-card.svelte";
  import { toolCall } from "../fixtures/session-fixtures";
  import type { ToolCallView } from "../session/session-view";

  /**
   * "Load full output" with a 600ms fetch behind it: the spinner, then the
   * whole text (`LoadingPayload`).
   */
  let load = $state<"loading" | "done" | undefined>(undefined);

  const output = $derived<NonNullable<ToolCallView["output"]>>(
    load === "done"
      ? { text: "✓ 412 tests passed\n✓ 18 suites\n✓ 0 failed", bytes: 96_400, truncated: false }
      : {
          text: "✓ 412 tests passed\n✓ 18 suites…",
          truncated: true,
          bytes: 96_400,
          load: load === "loading" ? "loading" : undefined,
        },
  );
  const call = $derived(toolCall({ id: "trunc-load", kind: "execute", title: "bun run test", output }));

  function onLoadPayload() {
    load = "loading";
    setTimeout(() => (load = "done"), 600);
  }
</script>

<ToolCallCard defaultOpen {call} {onLoadPayload} />
