import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { UploadIcon, type UploadIconHandle } from "../../../src/components/ui/upload-icon.tsx";

const meta = {
  title: "Components/UploadIcon",
  component: UploadIcon,
  args: { size: 14, controlled: false },
  parameters: {
    docs: {
      description: {
        component:
          "An animated glyph: a tray with an arrow that springs up out of it — share or send out. Hover it, or drive it from a larger target through a ref (`startAnimation` / `stopAnimation`). Draws in `currentColor`.",
      },
    },
  },
} satisfies Meta<typeof UploadIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3 text-secondary-foreground">
      {[12, 14, 16, 20, 24].map((size) => (
        <UploadIcon key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

function Driven() {
  const ref = useRef<UploadIconHandle>(null);
  return (
    <button
      type="button"
      className="label inline-flex h-control-md items-center gap-1.5 rounded border border-border px-2.5 transition-colors duration-fast ease-out-strong hover:bg-element-hover"
      onMouseEnter={() => ref.current?.startAnimation()}
      onMouseLeave={() => ref.current?.stopAnimation()}
    >
      <UploadIcon ref={ref} controlled size={14} />
      Share
    </button>
  );
}

/** `controlled`: the whole button drives the glyph, not the glyph's own hover. */
export const DrivenByParent: Story = { render: () => <Driven /> };
