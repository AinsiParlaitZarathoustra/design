import type { Meta, StoryObj } from "@storybook/react-vite";
import { GoogleMark, OpenAIMark } from "../../../src/components/ui/brand-marks.tsx";
import {
  AI21Mark,
  AnthropicMark,
  AzureMark,
  CerebrasMark,
  CohereMark,
  DeepInfraMark,
  DeepSeekMark,
  ElevenLabsMark,
  FireworksMark,
  GroqMark,
  HuggingFaceMark,
  JinaMark,
  KimiMark,
  MetaMark,
  MistralMark,
  OpenRouterMark,
  PerplexityMark,
  QwenMark,
  ReplicateMark,
  TogetherMark,
  VoyageMark,
  XAIMark,
  ZhipuMark,
} from "../../../src/components/ui/provider-marks.tsx";

type Mark = (props: {
  className?: string;
  title?: string;
  width?: number;
  height?: number;
}) => React.ReactNode;

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

function List({ size = "size-5" }: { size?: string }) {
  return (
    <div className="grid w-fit grid-cols-3 gap-x-6 gap-y-2">
      {[...PROVIDERS, ...FAMILIES].map(([name, Mark]) => (
        <div key={name} className="label flex items-center gap-2">
          <Mark title="" className={size} />
          {name}
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Components/ProviderMarks",
  component: List,
  args: { size: "size-5" },
  argTypes: {
    size: { control: "inline-radio", options: ["size-3", "size-4", "size-5", "size-6"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The BYOK provider marks and the model families a picker groups by, inline SVG copied from Lobe Icons. Colour marks keep the brand\'s colours; Mono marks take `currentColor`. OpenAI and Google are `OpenAIMark` and `GoogleMark` from BrandMarks. Each titles itself with the brand name; beside the name as text, pass `title=""`.',
      },
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};

/** The pixel sizes desktop draws them at: 13, 14 and 15 in pickers, 18 by default, 22 in a header. */
export const DesktopSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {[13, 14, 15, 18, 22].map((px) => (
        <div key={px} className="flex items-center gap-2">
          <span className="caption w-10">{px}px</span>
          {[...PROVIDERS, ...FAMILIES].map(([name, Mark]) => (
            <Mark key={name} title="" width={px} height={px} />
          ))}
        </div>
      ))}
    </div>
  ),
};

/** On a card in muted ink, as a settings row shows them. */
export const OnCard: Story = {
  render: () => (
    <div className="flex w-fit flex-col gap-2 rounded-lg border border-border bg-card p-4 text-muted-foreground">
      {PROVIDERS.slice(0, 8).map(([name, Mark]) => (
        <div key={name} className="label flex items-center gap-2">
          <Mark title="" className="size-4" />
          {name}
        </div>
      ))}
    </div>
  ),
};
