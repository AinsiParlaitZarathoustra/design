import type { Meta, StoryObj } from "@storybook/react-vite";
import { cn } from "../../src/lib/utils.ts";
import { Page, Section, TokenTable, cssVar } from "./kit.tsx";

const STEPS = [
  ["rounded-sm", "--radius-sm", "controls: buttons, inputs, keycaps (bare rounded is this)"],
  ["rounded-md", "--radius-md", "cards and rows"],
  ["rounded-lg", "--radius-lg", "popovers and menus"],
  ["rounded-xl", "--radius-xl", "dialogs"],
  ["rounded-full", "--radius-full", "pills, avatars, the segmented track"],
] as const;

function RadiusPage() {
  return (
    <Page
      title="Radius"
      lede={
        <>
          Derived from the theme&apos;s one <code className="code">--radius</code> (here{" "}
          {cssVar("--radius")}): sm = r − 4, md = r − 2, lg = r, xl = r + 4. A theme moves the whole
          scale at once.
        </>
      }
    >
      <Section title="The scale">
        <TokenTable
          columns={["Utility", "Value", "Use", "Sample"]}
          rows={STEPS.map(([utility, v, use]) => ({
            name: utility,
            value: cssVar(v),
            use,
            sample: (
              <div className={cn(utility, "h-10 w-20 border border-border-strong bg-card")} />
            ),
          }))}
        />
      </Section>
      <Section
        title="Nested"
        intro="Something inside a rounded container takes the next step down, so the curves stay parallel."
      >
        <div className="w-fit rounded-xl border border-border bg-card p-1.5">
          <div className="rounded-lg border border-border bg-popover p-1.5">
            <div className="label rounded-sm bg-element-selected px-2 py-1">
              rounded-sm in lg in xl
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}

const meta = {
  title: "Foundations/Radius",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
export const Page_: StoryObj = {
  name: "Page",
  render: (_, { globals }) => <RadiusPage key={`${globals.theme}-${globals.appearance}`} />,
};
