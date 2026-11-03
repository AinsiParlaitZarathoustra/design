import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../../../src/components/ui/checkbox.tsx";
import { Label } from "../../../src/components/ui/label.tsx";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: { defaultChecked: false, indeterminate: false, disabled: false },
  render: (args) => (
    <Label>
      <Checkbox {...args} />
      Show tool calls
    </Label>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "A 14px box on `panel-input`, filled with `primary` when checked. `indeterminate` draws the dash for a partial selection. The hit target is wider than the box.",
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label>
        <Checkbox disabled />
        Unchecked
      </Label>
      <Label>
        <Checkbox disabled defaultChecked />
        Checked
      </Label>
    </div>
  ),
};
export const ErrorState: Story = {
  name: "Error",
  args: { "aria-invalid": true },
};
export const LongText: Story = {
  render: (args) => (
    <div className="w-64">
      <Label className="items-start">
        <Checkbox {...args} className="mt-px" />
        Let the agent read every project attached to this session, including ones added later
      </Label>
    </div>
  ),
};
export const ManyItems: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {["Tool calls", "Thinking", "Diffs", "Checkpoints", "Costs", "Timestamps"].map((x, i) => (
        <Label key={x}>
          <Checkbox defaultChecked={i % 2 === 0} />
          {x}
        </Label>
      ))}
    </div>
  ),
};
