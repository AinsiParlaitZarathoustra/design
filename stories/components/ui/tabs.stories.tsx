import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileText, GitBranch, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../src/components/ui/tabs.tsx";

interface DemoProps {
  variant?: "segmented" | "line";
  tabs?: string[];
  disabledTab?: boolean;
  icons?: boolean;
}

const ICONS = [MessageSquare, FileText, GitBranch];

function Demo({
  variant = "segmented",
  tabs = ["1d", "7d", "30d"],
  disabledTab,
  icons,
}: DemoProps) {
  return (
    <Tabs defaultValue={tabs[0]} className="w-full max-w-md">
      <TabsList variant={variant}>
        {tabs.map((t, i) => {
          const Glyph = ICONS[i % ICONS.length]!;
          return (
            <TabsTrigger key={t} value={t} disabled={disabledTab && i === tabs.length - 1}>
              {icons && <Glyph />}
              {t}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t} value={t}>
          <p className="caption">Showing {t}.</p>
        </TabsContent>
      ))}
    </Tabs>
  );
}

const meta = {
  title: "Components/Tabs",
  component: Demo,
  args: { variant: "segmented", disabledTab: false, icons: false },
  argTypes: { variant: { control: "inline-radio", options: ["segmented", "line"] } },
  parameters: {
    docs: {
      description: {
        component:
          "Tabs in two shapes. `segmented` is a small local switch that owns panels (`1d / 7d / 30d`); `line` is a section-level switch with an underline rail. Neither is navigation.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Line: Story = {
  args: { variant: "line", tabs: ["Transcript", "Files", "Checkpoints"], icons: true },
};
export const Disabled: Story = { args: { disabledTab: true } };
export const LongText: Story = {
  args: {
    variant: "line",
    tabs: ["Transcript", "Files changed in this session", "Checkpoints and restores"],
  },
};
export const ManyItems: Story = {
  args: {
    variant: "line",
    tabs: ["Overview", "Sessions", "Projects", "Members", "Usage", "Billing", "Audit"],
  },
};
