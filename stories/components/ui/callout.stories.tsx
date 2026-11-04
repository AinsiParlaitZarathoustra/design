import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sparkles } from "lucide-react";
import { Callout, calloutVariants } from "../../../src/components/ui/callout.tsx";
import { Button } from "../../../src/ui/button.tsx";

const TONES = ["neutral", "info", "success", "warning", "error"] as const;

const meta = {
  title: "Components/Callout",
  component: Callout,
  args: {
    tone: "neutral",
    children: "You have 3 free reviews left this month.",
  },
  argTypes: {
    tone: { control: "select", options: TONES },
    icon: { control: false },
    action: { control: false },
  },
  render: (args) => (
    <div className="w-96">
      <Callout {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "An inline notice. The one place a tinted fill is right, because the whole block is the status. `calloutVariants` is exported for a block that is not a `Callout`.",
      },
    },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: (args) => (
    <div className="flex w-96 flex-col gap-2">
      {TONES.map((tone) => (
        <Callout key={tone} {...args} tone={tone}>
          {tone}: the gateway answered in 2.4s.
        </Callout>
      ))}
    </div>
  ),
};

export const ErrorState: Story = {
  name: "Error",
  args: { tone: "error", children: "The gateway refused the key. Check it in Settings → Agents." },
};

export const WithAction: Story = {
  args: {
    tone: "info",
    children: "A new model is available for this project.",
    action: (
      <Button size="xs" variant="outline">
        Try it
      </Button>
    ),
  },
};

export const CustomIcon: Story = { args: { icon: Sparkles } };
export const NoIcon: Story = { args: { icon: false } };

export const LongText: Story = {
  args: {
    tone: "warning",
    children:
      "This project's sandbox could not start because the container image is missing a dependency the agent needs. Sessions in this project will run without a sandbox until it is fixed, which means commands run directly on your machine.",
    action: (
      <Button size="xs" variant="outline">
        Details
      </Button>
    ),
  },
};

/** `calloutVariants` on an element that is not a `Callout`. */
export const Recipe: Story = {
  render: () => (
    <a href="#" className={calloutVariants({ tone: "success" }) + " w-96"}>
      Deployed. Open the preview →
    </a>
  ),
};
