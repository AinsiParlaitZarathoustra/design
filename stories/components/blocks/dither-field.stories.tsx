import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { DitherField } from "../../../src/components/blocks/dither-field.tsx";
import { ThemeProvider } from "../../../src/lib/theme.tsx";

/**
 * Only for the `InsideThemeProvider` story: the field needs no provider (the
 * toolbar writes `data-theme`/`data-appearance` on <html>, as desktop's own
 * engine does), but inside one it must behave the same. Seeding the stored
 * setting from the toolbar keeps the provider and the toolbar agreeing.
 */
const withThemeProvider: Decorator = (Story, context) => {
  const { theme = "atlas", appearance = "dark" } = context.globals as {
    theme?: string;
    appearance?: string;
  };
  localStorage.setItem("atlas-theme", appearance);
  return (
    <ThemeProvider key={appearance} theme={theme}>
      <Story />
    </ThemeProvider>
  );
};

const meta = {
  title: "Components/DitherField",
  component: DitherField,
  args: { mode: "glyphs", ink: 1 },
  argTypes: {
    mode: { control: "inline-radio", options: ["glyphs", "dots"] },
    ink: { control: { type: "range", min: 0, max: 3, step: 0.25 } },
    hollow: { control: false },
    fallback: { control: false },
  },
  render: (args) => (
    <div className="relative h-80 w-full overflow-hidden rounded-md border border-border">
      <DitherField {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "An ordered-dither noise field that drifts like cloud cover, on a canvas at ~12fps. The ink is the canvas's text colour (`text-foreground` unless `className` says otherwise). A radial hollow keeps the middle calm for copy. Parks when hidden, off screen, or under reduced motion (one frame still paints). Needs no `ThemeProvider`: it repaints when anything changes the theme attributes on <html> or the OS colour scheme. The first frame waits for an idle main thread; until then (and for good without a 2D canvas) a static dot grid, or the `fallback` prop, fills the box.",
      },
    },
  },
} satisfies Meta<typeof DitherField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No provider: the toolbar's attributes on <html> are the whole theme. */
export const Default: Story = {};
export const Dots: Story = { args: { mode: "dots" } };

/** The ink follows the canvas's text colour. */
export const Recoloured: Story = { args: { className: "text-hue-blue", ink: 1.5 } };

/** Inside the package's `ThemeProvider`, unchanged. */
export const InsideThemeProvider: Story = { decorators: [withThemeProvider] };

/** Copy sits on the hollow. */
export const WithCopy: Story = {
  args: { hollow: [0.25, 0.35] },
  render: (args) => (
    <div className="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-md border border-border">
      <DitherField {...args} />
      <div className="relative flex flex-col items-center gap-1">
        <span className="heading">Sign in to Atlas</span>
        <span className="caption">Your sessions, your team, one place.</span>
      </div>
    </div>
  ),
};

/**
 * No 2D canvas (a privacy mode that blocks canvas): the field never paints,
 * so the static dot grid it shows before its first frame stays.
 */
export const NoCanvas: Story = {
  beforeEach: () => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = () => null;
    return () => {
      HTMLCanvasElement.prototype.getContext = original;
    };
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await expect(canvasElement.querySelector('[data-slot="dither-fallback"]')).toBeVisible();
  },
};
