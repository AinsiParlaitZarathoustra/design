import type { Meta, StoryObj } from "@storybook/react-vite";
import { Filter, Minus, MoreHorizontal, Plus, RefreshCw, Settings, Trash2, X } from "lucide-react";
import { expect, within } from "storybook/test";
import { RailGlyph } from "../../src/ui/animated-icon.tsx";
import { IconButton } from "../../src/ui/icon-button.tsx";
import { Icon } from "../../src/ui/icon.tsx";
import { Hint } from "../../src/ui/tooltip.tsx";

const VARIANTS = [
  "ghost",
  "default",
  "secondary",
  "outline",
  "hairline",
  "destructive",
  "ghost-destructive",
  "floating",
] as const;
const SIZES = ["2xs", "xs", "sm", "md", "lg"] as const;

const meta = {
  title: "Primitives/IconButton",
  component: IconButton,
  args: {
    icon: Settings,
    label: "Settings",
    variant: "ghost",
    size: "md",
    shape: "square",
    active: false,
    disabled: false,
  },
  argTypes: {
    icon: { control: false },
    variant: { control: "select", options: VARIANTS },
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "inline-radio", options: ["square", "round"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A square, icon-only button. `label` is required and becomes the `aria-label`; wrap it in `Hint` to show the same string.",
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      {VARIANTS.map((variant) => (
        <IconButton key={variant} {...args} variant={variant} label={variant} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      {SIZES.map((size) => (
        <IconButton key={size} {...args} size={size} label={`Size ${size}`} />
      ))}
    </div>
  ),
};

/** Ghost at rest; the error tone only under the pointer. The row affordance for discard and delete. */
export const GhostDestructive: Story = {
  args: { icon: Trash2, label: "Delete", variant: "ghost-destructive" },
};

/** `active`: a setting that is on at rest, such as a filter narrowing a list. */
export const Active: Story = { args: { icon: Filter, label: "Filter", active: true } };

export const Pressed: Story = { args: { "aria-pressed": true } };

/** The stepper's shape: a pair of circles reads as one control. */
export const RoundStepper: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <IconButton {...args} icon={Minus} label="Smaller" shape="round" variant="outline" />
      <span className="label tnum w-10 text-center">100%</span>
      <IconButton {...args} icon={Plus} label="Larger" shape="round" variant="outline" />
    </div>
  ),
};

/**
 * Three disabled states. Only the last can reach its hint by keyboard,
 * because it opts into `focusableWhenDisabled`.
 */
export const Disabled: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <IconButton {...args} icon={RefreshCw} label="Refresh" disabled />
      <Hint label="Nothing to refresh yet">
        <IconButton {...args} icon={RefreshCw} label="Refresh" disabled />
      </Hint>
      <Hint label="Nothing to refresh yet">
        <IconButton {...args} icon={RefreshCw} label="Refresh" disabled focusableWhenDisabled />
      </Hint>
    </div>
  ),
};

export const WithHint: Story = {
  render: (args) => (
    <div className="flex items-center gap-1">
      <Hint label="More actions">
        <IconButton {...args} icon={MoreHorizontal} label="More actions" />
      </Hint>
      <Hint label="Close" shortcut="Esc">
        <IconButton {...args} icon={X} label="Close" />
      </Hint>
    </div>
  ),
};

/** `icon` as an element, for a glyph that is not a plain Lucide icon: a
 *  spinning refresh while a read is in flight, and the package's rail glyph.
 *  At `xs`, the 20px square of a dock or row toolbar. */
export const ElementIcon: Story = {
  args: { size: "xs" },
  render: (args) => (
    <div className="flex items-center gap-1">
      <IconButton
        {...args}
        label="Refreshing"
        icon={<Icon icon={RefreshCw} size="xs" className="animate-spin" />}
      />
      <IconButton {...args} label="Show sidebar" aria-pressed icon={<RailGlyph open size="xs" />} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const refresh = canvas.getByRole("button", { name: "Refreshing" });
    await expect(refresh.querySelector("svg")?.getAttribute("class")).toContain("animate-spin");
    await expect(refresh.getBoundingClientRect().height).toBe(
      canvas.getByRole("button", { name: "Show sidebar" }).getBoundingClientRect().height,
    );
  },
};

/** `size="2xs"`: the 16px remove button pinned to the corner of an image tile,
 *  round and outlined. */
export const TileRemove: Story = {
  args: { icon: X, label: "Remove image", size: "2xs", shape: "round", variant: "outline" },
  render: (args) => (
    <div className="relative size-16 rounded-lg border border-border bg-muted">
      <IconButton {...args} className="absolute -top-1.5 -right-1.5" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Remove image" });
    const box = button.getBoundingClientRect();
    await expect(box.width).toBe(16);
    await expect(box.height).toBe(16);
    const glyph = button.querySelector("svg")!;
    await expect(glyph.getAttribute("width")).toBe("10");
  },
};

/**
 * `variant="floating"`: desktop's image-tile remove button. Opaque and
 * bordered, so it reads over the image rather than through it.
 */
export const Floating: Story = {
  args: { icon: X, label: "Remove image", size: "2xs", shape: "round", variant: "floating" },
  render: (args) => (
    <div className="relative size-16 rounded-lg border border-border bg-linear-to-br from-primary to-success">
      <IconButton {...args} className="absolute -top-1.5 -right-1.5" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Remove image" });
    const style = getComputedStyle(button);
    // Opaque: the tile's gradient must not show through.
    // ratchet-allow: the computed value of a transparent fill, asserted against, not drawn.
    await expect(style.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    await expect(style.borderTopWidth).toBe("1px");
    await expect(style.borderTopLeftRadius).not.toBe("0px");
  },
};

/**
 * `loading`: the button's own glyph turns while its work runs, and the button
 * is `aria-busy`. It stays pressable unless you also pass `disabled`.
 */
export const Loading: Story = {
  args: { icon: RefreshCw, label: "Refresh models", loading: true, size: "xs" },
  render: (args) => (
    <div className="flex items-center gap-1">
      <IconButton {...args} />
      <IconButton {...args} label="Sync" icon={<RailGlyph open size="xs" />} />
      <IconButton {...args} label="Refresh models, idle" loading={false} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const busy = canvas.getByRole("button", { name: "Refresh models" });
    await expect(busy).toHaveAttribute("aria-busy", "true");
    await expect(busy.querySelector(".animate-spin svg")).not.toBeNull();
    // An element glyph turns too.
    const sync = canvas.getByRole("button", { name: "Sync" });
    await expect(sync.querySelector(".animate-spin svg")).not.toBeNull();
    const idle = canvas.getByRole("button", { name: "Refresh models, idle" });
    await expect(idle).not.toHaveAttribute("aria-busy");
    await expect(idle.querySelector(".animate-spin")).toBeNull();
  },
};
