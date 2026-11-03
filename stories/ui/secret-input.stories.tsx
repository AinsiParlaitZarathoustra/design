import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { SecretInput } from "../../src/ui/secret-input.tsx";

const meta = {
  title: "Primitives/SecretInput",
  component: SecretInput,
  args: { configured: false, onCommit: fn(), size: "md", disabled: false },
  argTypes: { size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] } },
  decorators: [(Story) => <div className="w-72">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component:
          "A masked field for a secret stored elsewhere. It never holds the stored value: Enter or blur commits the draft, Escape drops it.",
      },
    },
  },
} satisfies Meta<typeof SecretInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Configured: Story = { args: { configured: true } };
export const CustomPlaceholder: Story = { args: { placeholder: "sk-…" } };
export const Disabled: Story = { args: { disabled: true, configured: true } };
export const Invalid: Story = { args: { "aria-invalid": true } };
