import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../src/ui/button.tsx";
import { FoundationLink, Page, Section, TokenTable, cssVar } from "./kit.tsx";

/**
 * The steps desktop's own components use, smallest to largest, with where the
 * package's primitives (and desktop, for the larger steps) put each one. The
 * class names are written out whole so Tailwind generates the samples.
 */
const STEPS = [
  ["0.5", "w-0.5", "rows stacked inside a popover"],
  ["1", "w-1", "a menu item's and a tooltip's vertical padding; an xs button's icon gap"],
  ["1.5", "w-1.5", "the icon-to-label gap in a button; an xs button's side padding"],
  ["2", "w-2", "a menu item's side padding and icon gap; an sm button's side padding"],
  ["2.5", "w-2.5", "an md button's and a tooltip's side padding"],
  ["3", "w-3", "an lg button's side padding; the gap between a dialog's parts"],
  ["4", "w-4", "a dialog's padding; a settings row's side padding"],
  ["6", "w-6", "the space around a loading, empty or error line in a list"],
  ["8", "w-8", "the gap between settings sections; an empty state's side margins"],
] as const;

const BUTTON_PADDING = [
  ["xs", "px-1.5 gap-1"],
  ["sm", "px-2 gap-1.5"],
  ["md", "px-2.5 gap-1.5"],
  ["lg", "px-3 gap-1.5"],
] as const;

/** One step in px, from the live `--spacing` and the root's font size. */
function stepPx(): number {
  const spacing = cssVar("--spacing");
  const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const n = parseFloat(spacing);
  if (spacing.endsWith("rem")) return n * root;
  return n;
}

function px(value: number): string {
  return `${Number(value.toFixed(2))}px`;
}

function SpacingPage() {
  const step = stepPx();
  return (
    <Page
      title="Spacing"
      lede={
        <>
          Spacing is Tailwind&apos;s <code className="code">--spacing</code> multiplier (here{" "}
          {cssVar("--spacing")}). Atlas&apos;s root is 13px, so one step is {px(step)}:{" "}
          <code className="code">p-2</code> is two steps, <code className="code">gap-4</code> is
          four. There is no separate spacing ladder.
        </>
      }
    >
      <Section
        title="The steps in use"
        intro={
          <>
            Any multiple works, but these are the ones desktop&apos;s components are built from.
            Write the step; a measurement like <code className="code">py-[5px]</code> cannot follow
            the unit when it moves.
          </>
        }
      >
        <TokenTable
          columns={["Utility", "At 1×", "Use", "Sample"]}
          rows={STEPS.map(([n, width, use]) => ({
            name: `p-${n} · gap-${n}`,
            value: px(Number(n) * step),
            use,
            sample: <div className={`${width} h-4 rounded-sm bg-foreground`} />,
          }))}
        />
      </Section>
      <Section
        title="Inside a control"
        intro="A control's height comes from the control scale, not from padding. Spacing sets only its sides and the gap between its icon and label."
      >
        <div className="flex flex-wrap items-end gap-6">
          {BUTTON_PADDING.map(([size, classes]) => (
            <div key={size} className="flex flex-col items-start gap-2">
              <Button size={size} variant="outline">
                Button {size}
              </Button>
              <code className="code text-muted-foreground">{classes}</code>
            </div>
          ))}
        </div>
      </Section>
      <Section
        title="With the interface scale"
        intro={
          <>
            Steps are in <code className="code">rem</code>, and the interface scale is a zoom of the
            whole window, so spacing grows with the type and the controls and the proportions hold.
            Try the Scale menu in the toolbar. A theme can restate{" "}
            <code className="code">--spacing</code>, and the whole scale moves with it. See the{" "}
            <FoundationLink page="Principles" /> page for why steps are named, and{" "}
            <FoundationLink page="Control heights" /> for the heights spacing never sets.
          </>
        }
      />
    </Page>
  );
}

const meta = {
  title: "Foundations/Spacing",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
export const Page_: StoryObj = {
  name: "Page",
  render: (_, { globals }) => <SpacingPage key={`${globals.theme}-${globals.scale}`} />,
};
