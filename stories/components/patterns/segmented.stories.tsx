import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignCenter, AlignLeft, AlignRight, ChevronDown, Columns2, Rows2 } from "lucide-react";
import { useState } from "react";
import {
  CompoundFilter,
  SegmentedIconGroup,
  type UnderlineTabOption,
  UnderlineTabs,
} from "../../../src/components/patterns/segmented.tsx";
import { Icon } from "../../../src/ui/icon.tsx";
import { IconButton } from "../../../src/ui/icon-button.tsx";

type Tab = "overview" | "sessions" | "members" | "billing";

const TABS: UnderlineTabOption<Tab>[] = [
  { value: "overview", label: "Overview" },
  { value: "sessions", label: "Sessions", count: 48 },
  { value: "members", label: "Members", count: 12 },
  { value: "billing", label: "Billing" },
];

function Tabs({
  options = TABS,
  initial = "sessions",
}: {
  options?: UnderlineTabOption<Tab>[];
  initial?: Tab;
}) {
  const [value, setValue] = useState<Tab>(initial);
  return <UnderlineTabs options={options} value={value} onChange={setValue} />;
}

const meta = {
  title: "Patterns/Segmented",
  component: Tabs,
  args: {},
  parameters: {
    docs: {
      description: {
        component:
          "The tab and toolbar shapes `Segmented` (src/ui) does not cover: `UnderlineTabs` (page sections, one sliding underline), `CompoundFilter` (the `label │ value ⌄` pill) and `SegmentedIconGroup` (a cluster of tools on one hairline track).",
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ManyItems: Story = {
  args: {
    options: [
      ...TABS,
      { value: "overview", label: "Integrations" },
      { value: "members", label: "Audit log", count: 1204 },
    ].map((o, i) => ({ ...o, value: (i === 0 ? "overview" : `t${i}`) as Tab })),
    initial: "overview",
  },
};

export const Filters: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <CompoundFilter label="Status">
        Live
        <Icon icon={ChevronDown} size="xs" className="text-muted-foreground" />
      </CompoundFilter>
      <CompoundFilter label="Author">
        Maya Chen
        <Icon icon={ChevronDown} size="xs" className="text-muted-foreground" />
      </CompoundFilter>
      <CompoundFilter label="Project" className="max-w-56">
        <span className="truncate">atlas-desktop-and-the-design-package</span>
        <Icon icon={ChevronDown} size="xs" className="text-muted-foreground" />
      </CompoundFilter>
    </div>
  ),
};

export const IconGroup: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      <SegmentedIconGroup>
        <IconButton icon={AlignLeft} label="Align left" size="sm" aria-pressed />
        <IconButton icon={AlignCenter} label="Align centre" size="sm" />
        <IconButton icon={AlignRight} label="Align right" size="sm" />
      </SegmentedIconGroup>
      <SegmentedIconGroup orientation="vertical">
        <IconButton icon={Rows2} label="Stack" size="sm" />
        <IconButton icon={Columns2} label="Side by side" size="sm" aria-pressed />
      </SegmentedIconGroup>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <SegmentedIconGroup>
      <IconButton icon={AlignLeft} label="Align left" size="sm" disabled />
      <IconButton icon={AlignCenter} label="Align centre" size="sm" disabled />
      <IconButton icon={AlignRight} label="Align right" size="sm" disabled />
    </SegmentedIconGroup>
  ),
};
