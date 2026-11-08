<script lang="ts">
  import type { Component } from "svelte";
  import type { BrandMarkProps } from "../../../src/lots/f4-ui-second-half-patterns/deps/brand-mark-types";
  import AnthropicMark from "../../../src/lots/f4-ui-second-half-patterns/deps/anthropic-mark.svelte";
  import GoogleMark from "../../../src/lots/f4-ui-second-half-patterns/deps/google-mark.svelte";
  import OpenAIMark from "../../../src/lots/f4-ui-second-half-patterns/deps/openai-mark.svelte";
  import AI21Mark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/ai21-mark.svelte";
  import AzureMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/azure-mark.svelte";
  import CerebrasMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/cerebras-mark.svelte";
  import CohereMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/cohere-mark.svelte";
  import DeepInfraMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/deep-infra-mark.svelte";
  import DeepSeekMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/deep-seek-mark.svelte";
  import ElevenLabsMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/eleven-labs-mark.svelte";
  import FireworksMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/fireworks-mark.svelte";
  import GroqMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/groq-mark.svelte";
  import HuggingFaceMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/hugging-face-mark.svelte";
  import JinaMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/jina-mark.svelte";
  import KimiMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/kimi-mark.svelte";
  import MetaMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/meta-mark.svelte";
  import MistralMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/mistral-mark.svelte";
  import OpenRouterMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/open-router-mark.svelte";
  import PerplexityMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/perplexity-mark.svelte";
  import QwenMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/qwen-mark.svelte";
  import ReplicateMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/replicate-mark.svelte";
  import TogetherMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/together-mark.svelte";
  import VoyageMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/voyage-mark.svelte";
  import XAIMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/xai-mark.svelte";
  import ZhipuMark from "../../../src/lots/f4-ui-second-half-patterns/provider-marks/zhipu-mark.svelte";

  interface Props {
    story?: string;
    size?: string;
  }

  let { story = "all", size = "size-5" }: Props = $props();

  type Mark = Component<BrandMarkProps>;

  /** Desktop's BYOK providers in its settings order, then the model families. */
  const PROVIDERS: [string, Mark][] = [
    ["OpenAI", OpenAIMark],
    ["Anthropic", AnthropicMark],
    ["Google", GoogleMark],
    ["Mistral", MistralMark],
    ["Cohere", CohereMark],
    ["xAI", XAIMark],
    ["DeepSeek", DeepSeekMark],
    ["AI21", AI21Mark],
    ["Groq", GroqMark],
    ["Together", TogetherMark],
    ["Fireworks", FireworksMark],
    ["DeepInfra", DeepInfraMark],
    ["Cerebras", CerebrasMark],
    ["Replicate", ReplicateMark],
    ["Perplexity", PerplexityMark],
    ["OpenRouter", OpenRouterMark],
    ["Azure", AzureMark],
    ["Voyage", VoyageMark],
    ["Hugging Face", HuggingFaceMark],
    ["Jina", JinaMark],
    ["ElevenLabs", ElevenLabsMark],
  ];
  const FAMILIES: [string, Mark][] = [
    ["Qwen", QwenMark],
    ["Kimi", KimiMark],
    ["Llama", MetaMark],
    ["GLM", ZhipuMark],
  ];
  const ALL: [string, Mark][] = [...PROVIDERS, ...FAMILIES];
</script>

{#if story === "all"}
  <div class="grid w-fit grid-cols-3 gap-x-6 gap-y-2">
    {#each ALL as [name, Mark] (name)}
      <div class="label flex items-center gap-2">
        <Mark title="" class={size} />
        {name}
      </div>
    {/each}
  </div>
{:else if story === "desktop-sizes"}
  <div class="flex flex-col gap-3">
    {#each [13, 14, 15, 18, 22] as px (px)}
      <div class="flex items-center gap-2">
        <span class="caption w-10">{px}px</span>
        {#each ALL as [name, Mark] (name)}
          <Mark title="" width={px} height={px} />
        {/each}
      </div>
    {/each}
  </div>
{:else if story === "on-card"}
  <div class="flex w-fit flex-col gap-2 rounded-lg border border-border bg-card p-4 text-muted-foreground">
    {#each PROVIDERS.slice(0, 8) as [name, Mark] (name)}
      <div class="label flex items-center gap-2">
        <Mark title="" class="size-4" />
        {name}
      </div>
    {/each}
  </div>
{/if}
