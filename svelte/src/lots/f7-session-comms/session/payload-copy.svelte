<script lang="ts">
  import { onDestroy } from "svelte";
  import { Check, Copy } from "lucide-svelte";
  import IconButton from "../../../ui/icon-button.svelte";
  import { COPIED_MS } from "./tool-call-labels";
  import type { CopyPayload, ToolCallCardLabels } from "./tool-call-labels";

  /**
   * Copy for one payload (`CopyPayloadButton`): the whole text, not the window
   * on screen. The check shows only once the app says the text is on the
   * clipboard; a refusal, a throw or a rejection leaves the button as it was.
   */
  interface Props {
    part: "input" | "output";
    text: string;
    onCopy: CopyPayload;
    labels: ToolCallCardLabels;
  }

  let { part, text, onCopy, labels }: Props = $props();

  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => clearTimeout(timer));

  async function copy() {
    let ok = false;
    try {
      ok = (await onCopy(part, text)) === true;
    } catch {
      ok = false;
    }
    if (!ok) return;
    clearTimeout(timer);
    copied = true;
    timer = setTimeout(() => (copied = false), COPIED_MS);
  }
</script>

<IconButton
  size="xs"
  icon={copied ? Check : Copy}
  label={copied ? labels.copied : labels.copy}
  onclick={() => void copy()}
  class="shrink-0"
/>
