import type { Meta, StoryObj } from "@storybook/react-vite";
import { AgentMonogram, ExternalAgentMark } from "../../../src/components/ui/agent-icon.tsx";

const svgUrl = (svg: string) => `data:image/svg+xml;base64,${btoa(svg)}`;
const GLYPH = "M3 3h18v18H3zM7 7v10h10V7z";

/** A registry icon with no colour of its own: drawn as a mask in the ink around it. */
const MONOCHROME = svgUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="${GLYPH}"/></svg>`,
);
/** One with its own colour: drawn as an image, untouched. */
const COLOURED = svgUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="red" fill-rule="evenodd" d="${GLYPH}"/></svg>`,
);

const meta = {
  title: "Components/AgentIcon",
  component: ExternalAgentMark,
  args: { dataUrl: MONOCHROME, size: 16 },
  parameters: {
    docs: {
      description: {
        component:
          "Glyphs for an agent the package has no mark for. `ExternalAgentMark` draws a registry icon from its data URL: a `currentColor` SVG as a mask in the surrounding ink, anything else as an image. Neither path puts the SVG's markup in the DOM. `AgentMonogram` is the last resort, the label's initial.",
      },
    },
  },
} satisfies Meta<typeof ExternalAgentMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExternalMonochrome: Story = {
  render: (args) => (
    <span className="label inline-flex items-center gap-2 text-muted-foreground">
      <ExternalAgentMark {...args} />
      Registry agent
    </span>
  ),
};

export const ExternalColour: Story = { args: { dataUrl: COLOURED } };

export const Monogram: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {[12, 14, 16, 20, 32].map((size) => (
        <span key={size} className="flex flex-col items-center gap-1">
          <AgentMonogram label="kilo" size={size} />
          <span className="caption">{size}</span>
        </span>
      ))}
    </div>
  ),
};
