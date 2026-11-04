import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfiniteSlider } from "../../../src/components/blocks/infinite-slider.tsx";

const NAMES = ["Claude", "Codex", "Gemini", "OpenCode", "Cursor", "Goose", "Amp", "Aider"];

function Chip({ name }: { name: string }) {
  return (
    <span className="label inline-flex h-control-lg items-center rounded-md border border-border bg-card px-3 whitespace-nowrap">
      {name}
    </span>
  );
}

const meta = {
  title: "Blocks/InfiniteSlider",
  component: InfiniteSlider,
  args: {
    gap: 16,
    speed: 40,
    speedOnHover: 10,
    direction: "horizontal",
    reverse: false,
    className: "w-120",
    children: NAMES.map((n) => <Chip key={n} name={n} />),
  },
  argTypes: {
    children: { control: false },
    direction: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A seamless marquee: children render twice and the track moves by half its measured width. `speedOnHover` eases the remaining distance at the new speed rather than jumping.",
      },
    },
  },
} satisfies Meta<typeof InfiniteSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Reverse: Story = { args: { reverse: true } };
export const Vertical: Story = {
  args: { direction: "vertical", className: "h-48 w-40" },
};
export const ManyItems: Story = {
  args: { children: [...NAMES, ...NAMES].map((n, i) => <Chip key={i} name={`${n} ${i + 1}`} />) },
};
