import type { Meta, StoryObj } from "@storybook/react-vite";
import { Settings } from "lucide-react";
import { ModelBadge } from "../../src/components/ui/model-badge.tsx";
import { Button } from "../../src/ui/button.tsx";
import { IconButton } from "../../src/ui/icon-button.tsx";
import { Input } from "../../src/ui/input.tsx";
import { Page, Section, TokenTable, cssVar } from "./kit.tsx";

const STEPS = [
  ["2xs", "inline chip in text: the model chip, a count pill"],
  ["xs", "inline chip, keycap"],
  ["sm", "dense toolbar control"],
  ["md", "the default control"],
  ["lg", "primary action, search field"],
] as const;

function ControlHeightsPage() {
  return (
    <Page
      title="Control heights"
      lede="Four steps for anything you press or type into, and 2xs below them for a chip that sits in a line of text. The heights an audit found at 22, 28 and 30 snap to the nearest step. md is the default."
    >
      <Section
        title="The scale"
        intro="h-control-* sets the height; size-control-* sets both axes, for an icon-only control."
      >
        <TokenTable
          columns={["Utility", "Height", "Use", "Sample"]}
          rows={STEPS.map(([step, use]) => ({
            name: `h-control-${step}`,
            value: cssVar(`--control-${step}`),
            use,
            // 2xs is a chip, not a control: nothing you press or type into
            // comes that small, so its sample is the chip it exists for.
            sample:
              step === "2xs" ? (
                <ModelBadge model="claude-opus-4" size="2xs" />
              ) : (
                <div className="flex items-center gap-2">
                  <Button size={step} variant="outline">
                    Button
                  </Button>
                  <IconButton size={step} icon={Settings} label="Settings" variant="outline" />
                  <Input size={step} placeholder="Input" className="w-28" />
                </div>
              ),
          }))}
        />
      </Section>
    </Page>
  );
}

const meta = {
  title: "Foundations/Control heights",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
export const Page_: StoryObj = { name: "Page", render: () => <ControlHeightsPage /> };
