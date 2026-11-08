<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { CANVAS_FIELD_CLASS } from "./canvas-nodes-shared";

  /** Free text: no chrome, outlined while selected. */
  interface Props {
    text: string | Snippet;
    class?: string;
  }

  let { text, class: className }: Props = $props();
</script>

<div
  data-slot="canvas-text"
  class={cn(
    "size-full overflow-hidden rounded px-1 py-0.5 break-words whitespace-pre-wrap",
    "group-data-selected/node:outline group-data-selected/node:outline-1 group-data-selected/node:outline-primary/50",
    CANVAS_FIELD_CLASS.text,
    className,
  )}
>
  {#if text === ""}
    <span class="text-muted-foreground">Text</span>
  {:else if typeof text === "string"}
    {text}
  {:else}
    {@render text()}
  {/if}
</div>
