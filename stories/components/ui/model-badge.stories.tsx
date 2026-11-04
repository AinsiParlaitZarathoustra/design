import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ModelBadge,
  ModelMark,
  agentFamily,
  familyOf,
  type ModelFamily,
} from "../../../src/components/ui/model-badge.tsx";

const FAMILIES: [ModelFamily, string][] = [
  ["claude", "claude-opus-4"],
  ["openai", "gpt-5-codex"],
  ["gemini", "gemini-2.5-pro"],
  ["cursor", "cursor-small"],
  ["opencode", "opencode-zen"],
];
const AGENTS = ["Claude Code", "Codex", "Gemini CLI", "Cursor", "OpenCode"];

const meta = {
  title: "Components/ModelBadge",
  component: ModelBadge,
  args: { model: "claude-opus-4" },
  parameters: {
    docs: {
      description: {
        component:
          "A model as a chip with its family's mark, all inline SVG. Pass `family` when the app knows it (`null` draws no mark); without it the badge guesses from the name (`familyOf`). `ModelMark` is the mark by itself; `agentFamily` maps a coding agent's name to one.",
      },
    },
  },
} satisfies Meta<typeof ModelBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every family, passed explicitly. */
export const Families: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {FAMILIES.map(([family, model]) => (
        <ModelBadge key={family} model={model} family={family} />
      ))}
    </div>
  ),
};

/** No family: the badge carries the name alone. */
export const Unknown: Story = { args: { model: "llama-3.1-70b" } };

/** The app knows the family the name hides. */
export const ExplicitFamily: Story = { args: { model: "my-proxy-model", family: "claude" } };

export const LongName: Story = {
  args: { model: "claude-sonnet-4-5-20250929-extended-thinking-preview", className: "max-w-40" },
};

export const Marks: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {AGENTS.map((agent) => {
        const family = agentFamily(agent);
        return (
          <span key={agent} className="label inline-flex items-center gap-2">
            {family && <ModelMark family={family} className="size-3.5" />}
            {agent}
            <span className="caption">{family ?? familyOf(agent) ?? "unknown"}</span>
          </span>
        );
      })}
    </div>
  ),
};
