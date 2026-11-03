import type { Meta, StoryObj } from "@storybook/react-vite";
import { Globe, type GlobeMarker } from "../../../src/components/blocks/globe.tsx";
import { ThemeProvider } from "../../../src/lib/theme.tsx";

const meta = {
  title: "Blocks/Globe",
  component: Globe,
  args: { speed: 0.003 },
  argTypes: { markers: { control: false } },
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
          "A dotted WebGL globe (cobe) that turns slowly and can be dragged. Markers with a `status` carry a LIVE tag (the `success` ink) whose count drifts a few percent, anchored with CSS anchor positioning. Needs a `ThemeProvider`; stops turning under reduced motion.",
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
