import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, FileText, GitBranch, Search, Settings, Terminal } from "lucide-react";
import { ICON_SIZES, Icon, type IconSize } from "../../src/ui/icon.tsx";

const SIZES = Object.keys(ICON_SIZES) as IconSize[];

const meta = {
  title: "Primitives/Icon",
  component: Icon,
  args: { icon: Search, size: "md" },
  argTypes: {
    icon: { control: false },
    size: { control: "inline-radio", options: SIZES },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The one way to render a Lucide glyph: five sizes, one stroke width (1.75). Pass the component as a value.",
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-4">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-1.5">
          <Icon {...args} size={size} />
          <span className="caption">
            {size} · {ICON_SIZES[size]}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Muted: Story = {
  render: (args) => (
    <div className="flex items-center gap-3 text-muted-foreground">
      {[Search, Bell, FileText, GitBranch, Settings, Terminal].map((glyph, i) => (
        <Icon key={i} {...args} icon={glyph} />
      ))}
    </div>
  ),
};

export const BesideText: Story = {
  render: (args) => (
    <span className="label inline-flex items-center gap-1.5">
      <Icon {...args} icon={GitBranch} size="sm" className="text-muted-foreground" />
      main
    </span>
  ),
};
