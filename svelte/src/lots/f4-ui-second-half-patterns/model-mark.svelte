<script lang="ts">
  import { cn } from "../../lib/utils";
  import ClaudeMark from "./deps/claude-mark.svelte";
  import CursorMark from "./deps/cursor-mark.svelte";
  import GeminiMark from "./deps/gemini-mark.svelte";
  import OpenAIMark from "./deps/openai-mark.svelte";
  import OpenCodeMark from "./deps/opencode-mark.svelte";
  import type { ModelFamily } from "./model-family";

  interface Props {
    family: ModelFamily;
    class?: string;
  }

  let { family, class: className }: Props = $props();
</script>

{#if family === "claude"}
  <ClaudeMark class={cn("size-3 shrink-0", className)} />
{:else if family === "openai"}
  <OpenAIMark class={cn("size-3 shrink-0", className)} />
{:else if family === "gemini"}
  <GeminiMark class={cn("size-3 shrink-0", className)} />
{:else if family === "cursor"}
  <CursorMark class={cn("size-3 shrink-0", className)} />
{:else}
  <!-- Beside the model's name the mark is decoration, so it drops its title. -->
  <OpenCodeMark title="" class={cn("h-3 w-auto shrink-0", className)} />
{/if}
