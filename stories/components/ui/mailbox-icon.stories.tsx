import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { MailboxIcon, type MailboxIconHandle } from "../../../src/components/ui/mailbox-icon.tsx";

const meta = {
  title: "Components/MailboxIcon",
  component: MailboxIcon,
  args: { size: 20, controlled: false },
  parameters: {
    docs: {
      description: {
        component:
          "An animated glyph: a mailbox whose flag springs up — the Inbox's own mark. Hover it, or drive it from a larger target through a ref (`startAnimation` / `stopAnimation`). Draws in `currentColor`.",
      },
    },
  },
} satisfies Meta<typeof MailboxIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3 text-secondary-foreground">
      {[12, 14, 16, 20, 24].map((size) => (
        <MailboxIcon key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

function Driven() {
  const ref = useRef<MailboxIconHandle>(null);
  return (
    <button
      type="button"
      className="label inline-flex h-control-md items-center gap-1.5 rounded border border-border px-2.5 transition-colors duration-fast ease-out-strong hover:bg-element-hover"
      onMouseEnter={() => ref.current?.startAnimation()}
      onMouseLeave={() => ref.current?.stopAnimation()}
    >
      <MailboxIcon ref={ref} controlled size={14} />
      Inbox
    </button>
  );
}

/** `controlled`: the whole button drives the glyph, not the glyph's own hover. */
export const DrivenByParent: Story = { render: () => <Driven /> };
