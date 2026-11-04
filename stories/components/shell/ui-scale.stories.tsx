import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, screen, userEvent, within } from "storybook/test";
import {
  UI_SCALE_MAX,
  UI_SCALE_MIN,
  UiScaleControl,
  UiScalePanel,
} from "../../../src/components/shell/ui-scale.tsx";

interface DemoProps {
  scale: number;
  iconOnly?: boolean;
  onScaleChange: (next: number) => void;
}

function Stateful({ scale, iconOnly, onScaleChange }: DemoProps) {
  const [value, setValue] = useState(scale);
  const change = (next: number) => {
    setValue(next);
    onScaleChange(next);
  };
  return (
    <div className="flex min-h-96 justify-end">
      <UiScaleControl scale={value} onScaleChange={change} iconOnly={iconOnly} />
    </div>
  );
}

const open: Story["play"] = async ({ canvasElement }) => {
  await userEvent.click(within(canvasElement).getByRole("button", { name: /Interface scale/ }));
  // Wait for the popover, so the axe run sees it open rather than racing the click.
  await screen.findByRole("dialog", { name: "Interface scale" });
};

const meta = {
  title: "Shell/UiScale",
  component: Stateful,
  args: { scale: 1, iconOnly: false, onScaleChange: fn() },
  argTypes: {
    scale: { control: { type: "range", min: UI_SCALE_MIN, max: UI_SCALE_MAX, step: 0.05 } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The interface-scale control: a stepper, the named presets and Reset. `UiScaleControl` is the trigger and popover; `UiScalePanel` is the panel alone, for a submenu. Props only: how a scale is applied (WebView zoom, CSS `zoom`) is the app's.",
      },
    },
  },
} satisfies Meta<typeof Stateful>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = {
  play: open,
  tags: ["!autodocs"],
};
export const IconOnly: Story = { args: { iconOnly: true } };
/** At the bounds the stepper's own end disables. */
export const AtMinimum: Story = {
  args: { scale: UI_SCALE_MIN },
  play: open,
  tags: ["!autodocs"],
};

/** The panel alone, on a popover-like surface. The inset card is desktop's:
 *  a hairline ring and a small shadow (no border, so no extra height), a
 *  foreground-tint divider, and 8% / 6% foreground fills for the selected
 *  and hovered presets. */
export const Panel: Story = {
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector<HTMLElement>(
      "[data-slot=ui-scale-panel] > .rounded-lg",
    )!;
    const style = getComputedStyle(card);
    await expect(style.borderTopWidth).toBe("0px");
    // A ring is a box-shadow too: compare with a ring-only probe, so this
    // checks the `shadow-sm` layer under it.
    const probe = document.createElement("div");
    probe.className = "ring-1 ring-border";
    card.parentElement!.append(probe);
    const ringOnly = getComputedStyle(probe).boxShadow;
    probe.remove();
    await expect(style.boxShadow).not.toBe(ringOnly);
  },
  render: (args) => {
    const [value, setValue] = useState(1.15);
    return (
      <div className="w-60 rounded-lg border border-border bg-popover p-1">
        <UiScalePanel
          scale={value}
          onScaleChange={(n) => {
            setValue(n);
            args.onScaleChange(n);
          }}
        />
      </div>
    );
  },
};

/** With `shortcuts`, each stepper button has a hint naming its keys —
 *  desktop's, where ⌘- and ⌘+ also zoom. Hovered here, so the hint shows. */
export const WithShortcuts: Story = {
  render: (args) => {
    const [value, setValue] = useState(1.15);
    return (
      <div className="flex min-h-72 items-start pt-12">
        <div className="w-60 rounded-lg border border-border bg-popover p-1">
          <UiScalePanel
            scale={value}
            onScaleChange={(n) => {
              setValue(n);
              args.onScaleChange(n);
            }}
            shortcuts={{ decrease: "⌘-", increase: "⌘+" }}
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    // A stepper button can be disabled, so its hint's trigger is the span
    // `Hint` wraps it in.
    const button = within(canvasElement).getByRole("button", { name: "Larger" });
    await userEvent.hover(button.parentElement ?? button);
    // The hint has no tooltip role; its shortcut is the text only it shows.
    await screen.findByText("⌘+");
  },
};
