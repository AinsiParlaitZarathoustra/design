import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd, KbdCombo, KbdKeys } from "../../src/ui/kbd.tsx";
import { Button } from "../../src/ui/button.tsx";

const meta = {
  title: "Primitives/Kbd",
  component: Kbd,
  args: { children: "⌘", variant: "default", size: "xs" },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "inverse", "soft"] },
    size: { control: "inline-radio", options: ["xs", "sm"] },
  },
  parameters: {
    docs: {
      description: {
        component: 'A keycap. `KbdCombo` takes a glyph string ("⌘⇧F"), `KbdKeys` a list of keys.',
      },
    },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Kbd {...args} size="xs">
        K
      </Kbd>
      <Kbd {...args} size="sm">
        K
      </Kbd>
    </div>
  ),
};

export const Combo: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-2">
      <KbdCombo combo="⌘⇧F" />
      <KbdCombo combo="⌥Space" />
      <KbdKeys keys={["Ctrl", "Shift", "P"]} />
    </div>
  ),
};

/** `inverse` sits on a primary fill; `soft` is the palette footer's legend. */
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Kbd>Esc</Kbd>
      <Kbd variant="soft">↑</Kbd>
      <Button>
        Run
        <Kbd variant="inverse">↵</Kbd>
      </Button>
    </div>
  ),
};

export const LongText: Story = { args: { children: "Backspace" } };
