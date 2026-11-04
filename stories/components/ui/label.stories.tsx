import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../../../src/components/ui/checkbox.tsx";
import { Label } from "../../../src/components/ui/label.tsx";
import { Input } from "../../../src/ui/input.tsx";

const meta = {
  title: "Components/Label",
  component: Label,
  args: { children: "Session name" },
  parameters: {
    docs: {
      description: {
        component:
          "The text on or beside a control, in the named `label` style. A disabled peer or a `data-disabled` group dims it.",
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-1.5">
      <Label {...args} htmlFor="label-input" />
      <Input id="label-input" placeholder="Refactor settings" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <Label>
      <Checkbox defaultChecked />
      Show tool calls
    </Label>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div data-disabled="true" className="group">
      <Label>
        <Checkbox disabled />
        Share with team
      </Label>
    </div>
  ),
};

export const LongText: Story = {
  args: {
    children: "Allow this agent to read every project attached to the session",
    className: "w-48",
  },
};
