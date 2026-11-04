import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fragment } from "react";
import {
  ResizableGroup,
  ResizableHandle,
  ResizablePanel,
} from "../../../src/components/ui/resizable.tsx";

function Pane({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex h-full flex-col gap-1 p-3">
      <span className="eyebrow">{title}</span>
      <p className="caption">{body}</p>
    </div>
  );
}

interface DemoProps {
  panes?: number;
}

function Demo({ panes = 2 }: DemoProps) {
  const titles = ["Sessions", "Transcript", "Files", "Diff"].slice(0, panes);
  return (
    <div className="h-64 w-full max-w-3xl overflow-hidden rounded-md border border-border">
      <ResizableGroup orientation="horizontal">
        {titles.map((title, i) => (
          <Fragment key={title}>
            {i > 0 && <ResizableHandle />}
            <ResizablePanel minSize="15%">
              <Pane title={title} body="Drag the rule between panes." />
            </ResizablePanel>
          </Fragment>
        ))}
      </ResizableGroup>
    </div>
  );
}

const meta = {
  title: "Components/Resizable",
  component: Demo,
  args: { panes: 2 },
  argTypes: { panes: { control: { type: "range", min: 2, max: 4 } } },
  parameters: {
    docs: {
      description: {
        component:
          "Split panes on react-resizable-panels. The handle is a 1px rule, not a grab bar; the ~10px hit area is widened invisibly so the line stays a hairline.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ManyItems: Story = { args: { panes: 4 } };
