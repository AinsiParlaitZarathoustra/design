import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import {
  ClaudeCodeMark,
  ClaudeMark,
  CodexMark,
  CursorAgentMark,
  CursorMark,
  DiscordMark,
  GeminiMark,
  GitHubMark,
  GoogleMark,
  JetBrainsMark,
  KiloMark,
  OpenAIMark,
  OpenCodeMark,
  XMark,
  ZedMark,
} from "../../../src/components/ui/brand-marks.tsx";

type Mark = (props: { className?: string }) => React.ReactNode;

const SOCIAL: [string, Mark][] = [
  ["Google", GoogleMark],
  ["GitHub", GitHubMark],
  ["X", XMark],
  ["Discord", DiscordMark],
];
const AGENTS: [string, Mark][] = [
  ["Claude Code", ClaudeCodeMark],
  ["Codex", CodexMark],
  ["OpenCode", OpenCodeMark],
  ["Cursor", CursorAgentMark],
  ["Kilo", KiloMark],
];
const MODELS: [string, Mark][] = [
  ["Claude", ClaudeMark],
  ["Gemini", GeminiMark],
  ["OpenAI", OpenAIMark],
  ["Cursor", CursorMark],
];
const EDITORS: [string, Mark][] = [
  ["Cursor", CursorMark],
  ["Zed", ZedMark],
  ["JetBrains", JetBrainsMark],
];
const GROUPS = { Social: SOCIAL, Agents: AGENTS, Models: MODELS, Editors: EDITORS };

function Gallery({
  group = "Social",
  size = "size-6",
}: {
  group?: keyof typeof GROUPS;
  size?: string;
}) {
  return (
    <div className="grid w-fit grid-cols-3 gap-2">
      {GROUPS[group].map(([name, Mark]) => (
        <div
          key={name}
          className="flex w-28 flex-col items-center gap-2 rounded-md border border-border-subtle p-3"
        >
          <Mark className={size} />
          <span className="caption">{name}</span>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Components/BrandMarks",
  component: Gallery,
  args: { group: "Social", size: "size-6" },
  argTypes: {
    group: { control: "inline-radio", options: Object.keys(GROUPS) },
    size: { control: "inline-radio", options: ["size-3", "size-4", "size-6", "size-10"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Third-party logos: social sign-in, coding agents, model families and editors. A logo whose colour is the mark keeps it (Google, Claude, Gemini, Cursor's agent cube); the rest follow `currentColor`, and OpenCode is drawn on theme tokens. Agent and editor marks title themselves with the brand name; pass `title=\"\"` beside a visible name. Which agent gets which mark is the app's call.",
      },
    },
  },
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Social: Story = {};
export const Agents: Story = { args: { group: "Agents" } };
export const Models: Story = { args: { group: "Models" } };
export const Editors: Story = { args: { group: "Editors" } };

/** Every mark at each step it is drawn at. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {["size-3", "size-4", "size-6", "size-10"].map((size) => (
        <div key={size} className="flex items-center gap-3">
          <span className="caption w-14">{size}</span>
          {[...SOCIAL, ...AGENTS, ...MODELS, ...EDITORS.slice(1)].map(([name, Mark], i) => (
            <Mark key={`${name}-${i}`} className={size} />
          ))}
        </div>
      ))}
    </div>
  ),
};

/** On a card in muted ink: the monochrome marks take the card's text colour. */
export const OnCard: Story = {
  render: () => (
    <div className="flex w-fit flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-4 text-muted-foreground">
      {[...SOCIAL, ...AGENTS, ...MODELS, ...EDITORS.slice(1)].map(([name, Mark], i) => (
        <Mark key={`${name}-${i}`} className="size-5" />
      ))}
    </div>
  ),
};

/**
 * A lone model mark (no name beside it) given `title`: it names itself, as
 * an agent mark does. Without `title` a model mark stays decorative.
 */
export const TitledModelMarks: Story = {
  render: () => (
    <div className="flex items-center gap-3 text-foreground">
      <ClaudeMark title="Claude" className="size-5" />
      <OpenAIMark title="OpenAI" className="size-5" />
      <GeminiMark title="Gemini" className="size-5" />
      <GoogleMark title="Google" className="size-5" />
      <OpenAIMark className="size-5" data-testid="decorative" />
    </div>
  ),
  play: async ({ canvas }) => {
    for (const name of ["Claude", "OpenAI", "Gemini", "Google"]) {
      await expect(canvas.getByRole("img", { name })).toBeVisible();
    }
    await expect(canvas.getByTestId("decorative")).toHaveAttribute("aria-hidden", "true");
  },
};

/** The context the social marks mostly appear in: a sign-in button. */
export const InButtons: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      {SOCIAL.slice(0, 2).map(([name, Mark]) => (
        <button
          key={name}
          type="button"
          className="label flex h-control-lg items-center justify-center gap-2 rounded border border-border hover:bg-element-hover"
        >
          <Mark className="size-3.5" />
          Continue with {name}
        </button>
      ))}
    </div>
  ),
};
