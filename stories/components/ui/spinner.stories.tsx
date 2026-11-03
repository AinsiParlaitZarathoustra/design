import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "../../../src/components/ui/spinner.tsx";
import { Button } from "../../../src/ui/button.tsx";

const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  args: { size: "md", label: "Loading" },
  argTypes: { size: { control: "inline-radio", options: SIZES } },
  parameters: {
    docs: {
      description: {
        component:
          'An indeterminate progress indicator, sized off the icon ladder. Pass `label=""` inside a control that already names the wait.',
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {SIZES.map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <Button disabled>
      <Spinner size="sm" label="" className="text-current" />
      Saving…
    </Button>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner size="sm" label="" />
      <span className="caption">Loading sessions…</span>
    </div>
  ),
};
