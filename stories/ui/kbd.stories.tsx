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
    platform: { control: "inline-radio", options: [undefined, "mac", "other"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A keycap. `KbdCombo` takes a glyph string ("⌘⇧F"), `KbdKeys` a list of keys. All three draw for the host\'s keyboard: on Windows and Linux ⌘ reads Ctrl and ⌥ reads Alt. `platform` overrides the detection.',
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
      <KbdCombo combo="⌘⇧F" platform="mac" />
      <KbdCombo combo="⌥Space" platform="mac" />
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

/** The same glyph strings on each keyboard. Unset, `platform` is detected. */
export const Platforms: Story = {
  render: () => (
    <div className="grid grid-cols-[auto_auto_auto] items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
      <span />
      <span>mac</span>
      <span>other</span>
      {["⌘K", "⌘⇧F", "⌥Space", "⌃⌘Q", "⌥⌘C"].map((combo) => (
        <div key={combo} className="contents">
          <span className="font-mono">{combo}</span>
          <KbdCombo combo={combo} platform="mac" />
          <KbdCombo combo={combo} platform="other" />
        </div>
      ))}
    </div>
  ),
};

export const LongText: Story = { args: { children: "Backspace" } };
