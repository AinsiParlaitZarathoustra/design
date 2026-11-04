import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ModelBadge,
  ModelMark,
  agentFamily,
  familyOf,
} from "../../../src/components/ui/model-badge.tsx";

const MODELS = ["claude-opus-4", "gpt-5-codex", "gemini-2.5-pro", "o3", "llama-3.1-70b"];
const AGENTS = ["Claude Code", "Codex", "Gemini CLI", "Cursor", "OpenCode"];

const meta = {
  title: "Components/ModelBadge",
  component: ModelBadge,
  args: { model: "claude-opus-4" },
  parameters: {
    docs: {
      description: {
        component:
          "A model as a chip with its family's mark (`familyOf`). A model with no known family gets the name alone. `ModelMark` is the mark by itself; `agentFamily` maps a coding agent to one.",
      },
    },
  },
} satisfies Meta<typeof ModelBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyItems: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {MODELS.map((m) => (
        <ModelBadge key={m} model={m} />
      ))}
    </div>
  ),
};

/** No family: the badge carries the name alone. */
export const Unknown: Story = { args: { model: "llama-3.1-70b" } };

export const LongText: Story = {
  args: { model: "claude-sonnet-4-5-20250929-extended-thinking-preview", className: "max-w-48" },
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
