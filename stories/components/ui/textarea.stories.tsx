import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../../../src/components/ui/textarea.tsx";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  args: { placeholder: "Describe what the agent should do", disabled: false },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "Multi-line text, in the same border and focus language as `Input`. It grows with its content (`field-sizing-content`) from a 4rem floor.",
      },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Locked while the run is going" },
};
export const Error: Story = { args: { "aria-invalid": true, defaultValue: "" } };
export const LongText: Story = {
  args: {
    defaultValue:
      "Refactor the settings panel so every row reads from one store selector. Keep the existing keyboard shortcuts, and don't touch the theme editor — it has its own store. Run the contract suites before you finish, and leave a checkpoint after each file you change so I can roll back one step at a time.",
  },
};
