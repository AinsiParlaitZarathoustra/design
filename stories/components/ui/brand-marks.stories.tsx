import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ClaudeMark,
  CursorMark,
  DiscordMark,
  GeminiMark,
  GitHubMark,
  GoogleMark,
  OpenAIMark,
  OpenCodeMark,
  XMark,
} from "../../../src/components/ui/brand-marks.tsx";

const MARKS = [
  { name: "Google", Mark: GoogleMark },
  { name: "GitHub", Mark: GitHubMark },
  { name: "X", Mark: XMark },
  { name: "Discord", Mark: DiscordMark },
  { name: "Claude", Mark: ClaudeMark },
  { name: "Gemini", Mark: GeminiMark },
  { name: "OpenAI", Mark: OpenAIMark },
  { name: "Cursor", Mark: CursorMark },
  { name: "OpenCode", Mark: OpenCodeMark },
] as const;

function Gallery({ size = "size-6" }: { size?: string }) {
  return (
    <div className="grid w-fit grid-cols-3 gap-2">
      {MARKS.map(({ name, Mark }) => (
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
  args: { size: "size-6" },
  argTypes: { size: { control: "inline-radio", options: ["size-4", "size-6", "size-8"] } },
  parameters: {
    docs: {
      description: {
        component:
          "Third-party logos for sign-in buttons and agent identities. A logo that has a colour keeps it; the monochrome ones (GitHub, X, OpenAI, Cursor, OpenCode) follow `currentColor` so they work in both appearances.",
      },
    },
  },
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: "size-4" } };

/** The context they mostly appear in: a sign-in button. */
export const InButtons: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      {[
        { name: "Google", Mark: GoogleMark },
        { name: "GitHub", Mark: GitHubMark },
      ].map(({ name, Mark }) => (
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
