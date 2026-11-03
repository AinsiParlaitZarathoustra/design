import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "../../../src/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "../../../src/components/ui/radio-group.tsx";

const OPTIONS = [
  { value: "read", label: "Read-only" },
  { value: "ask", label: "Ask before writing" },
  { value: "write", label: "Read and write" },
];

interface DemoProps {
  disabled?: boolean;
  invalid?: boolean;
  options?: { value: string; label: string }[];
}

function Demo({ disabled, invalid, options = OPTIONS }: DemoProps) {
  return (
    <RadioGroup defaultValue={options[0]?.value} disabled={disabled} aria-label="Project access">
      {options.map((o) => (
        <Label key={o.value}>
          <RadioGroupItem value={o.value} aria-invalid={invalid || undefined} />
          {o.label}
        </Label>
      ))}
    </RadioGroup>
  );
}

const meta = {
  title: "Components/RadioGroup",
  component: Demo,
  args: { disabled: false, invalid: false },
  parameters: {
    docs: {
      description: {
        component:
          "One choice from a short, visible list. A 14px ring that fills with the `primary` ink when chosen; the hit area is widened invisibly.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Error: Story = { args: { invalid: true } };
export const LongText: Story = {
  args: {
    options: [
      {
        value: "a",
        label: "Read every project attached to the session, including ones added later",
      },
      { value: "b", label: "Only the project the session started in" },
    ],
  },
  render: (args) => (
    <div className="w-64">
      <Demo {...args} />
    </div>
  ),
};
export const ManyItems: Story = {
  args: {
    options: ["Fast", "Balanced", "Deep", "Custom", "Inherit from project", "Inherit from org"].map(
      (label) => ({ value: label, label }),
    ),
  },
};
