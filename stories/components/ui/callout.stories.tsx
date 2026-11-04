import type { Meta, StoryObj } from "@storybook/react-vite";
import { GitBranch, Sparkles, X } from "lucide-react";
import { expect } from "storybook/test";
import { Callout, calloutVariants } from "../../../src/components/ui/callout.tsx";
import { Button } from "../../../src/ui/button.tsx";
import { IconButton } from "../../../src/ui/icon-button.tsx";

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
    variant: { control: "inline-radio", options: ["default", "tucked"] },
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

/** A stand-in for the session composer the strip tucks into: on a higher
 *  layer than the strip, so it covers the strip's lower half. */
function Composer() {
  return (
    <div className="relative z-10 flex h-20 items-start rounded-2xl border border-border bg-card p-3 text-sm text-muted-foreground">
      Ask the agent…
    </div>
  );
}

/** `variant="tucked"`: the strip tucked into the top of the composer. The
 *  tone colours the glyph only; actions are ghost `xs` buttons. */
export const Tucked: Story = {
  args: { variant: "tucked", tone: "warning", icon: GitBranch },
  render: (args) => (
    <div className="flex w-[28rem] flex-col">
      <Callout
        {...args}
        action={
          <>
            <Button variant="ghost" size="xs">
              Switch back
            </Button>
            <IconButton variant="ghost" size="xs" icon={X} label="Hide" />
          </>
        }
      >
        The last turn moved this checkout to fix/session-restore.
      </Callout>
      <Composer />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const strip = canvasElement.querySelector<HTMLElement>("[data-slot=callout]")!;
    const style = getComputedStyle(strip);
    // No border and no tinted fill: the tone stays on the glyph.
    await expect(style.borderTopWidth).toBe("0px");
    // Rounded on top only, to sit on the composer's edge.
    await expect(parseFloat(style.borderTopLeftRadius)).toBeGreaterThan(0);
    await expect(style.borderBottomLeftRadius).toBe("0px");
    await expect(parseFloat(style.marginBottom)).toBeLessThan(0);
  },
};

/** Every tone on the strip, and a message long enough to truncate. */
export const TuckedTones: Story = {
  args: { variant: "tucked" },
  render: (args) => (
    <div className="flex w-[28rem] flex-col gap-6">
      {TONES.map((tone) => (
        <div key={tone} className="flex flex-col">
          <Callout {...args} tone={tone}>
            {tone}: another process is writing this session, so sending from here would fork it into
            two histories.
          </Callout>
          <Composer />
        </div>
      ))}
    </div>
  ),
};
