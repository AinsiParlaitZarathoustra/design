import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { Globe, type GlobeMarker } from "../../../src/components/blocks/globe.tsx";
import { ThemeProvider } from "../../../src/lib/theme.tsx";

const meta = {
  title: "Blocks/Globe",
  component: Globe,
  args: { speed: 0.003 },
  argTypes: { markers: { control: false }, fallback: { control: false } },
  decorators: [
    // `Globe` reads the appearance from `ThemeProvider`, which reads the
    // stored setting; seed it from the toolbar so the two agree.
    (Story, context) => {
      const { theme = "atlas", appearance = "dark" } = context.globals as {
        theme?: string;
        appearance?: string;
      };
      localStorage.setItem("atlas-theme", appearance);
      return (
        <ThemeProvider key={appearance} theme={theme}>
          <div className="w-96">{Story()}</div>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        component:
          "A dotted WebGL globe (cobe) that turns slowly and can be dragged. Markers with a `status` carry a LIVE tag (the `success` ink) whose count drifts a few percent, anchored with CSS anchor positioning. Needs a `ThemeProvider`; stops turning under reduced motion. cobe is fetched only once the globe nears the viewport; until its first frame (and for good without WebGL) a token-coloured disc, or the `fallback` prop, holds the box.",
      },
    },
  },
} satisfies Meta<typeof Globe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { markers: [] } };
export const Still: Story = { args: { speed: 0 } };

const ONE: GlobeMarker[] = [
  {
    id: "lisbon",
    location: [38.72, -9.14],
    delay: 0,
    status: { count: 1_204_118, unit: "tokens streaming through the Lisbon gateway" },
  },
];
export const LongText: Story = { args: { markers: ONE, speed: 0 } };

/**
 * No WebGL (a blocklisted GPU, a locked-down browser): every `getContext`
 * returns null, so the probe fails, cobe is never fetched, and the fallback
 * disc stays in the globe's box.
 */
export const NoWebgl: Story = {
  beforeEach: () => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = () => null;
    return () => {
      HTMLCanvasElement.prototype.getContext = original;
    };
  },
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector<HTMLElement>('[data-slot="globe"]')!;
    await waitFor(() => expect(root).toHaveAttribute("data-fallback"), { timeout: 2000 });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await expect(canvasElement.querySelector('[data-slot="globe-fallback"]')).toBeVisible();
  },
};

const PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/** A caller's own fallback, shown until the first frame instead of the disc. */
export const CustomFallback: Story = {
  args: {
    fallback: <img alt="" src={PIXEL} className="size-full rounded-full object-cover" />,
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector(`img[src="${PIXEL}"]`)).not.toBeNull();
    await expect(canvasElement.querySelector('[data-slot="globe-fallback"]')).toBeNull();
  },
};
