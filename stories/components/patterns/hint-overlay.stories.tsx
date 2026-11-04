import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn, screen, userEvent, within } from "storybook/test";

import { HintOverlay } from "../../../src/components/patterns/hint-overlay.tsx";
import { Button } from "../../../src/ui/button.tsx";
import { Input } from "../../../src/ui/input.tsx";

const onActivate = fn().mockName("onActivate");

/** Five buttons with click counts, a field, a `[data-hint]` wrapper, and the
 *  things a scan must skip: an `aria-hidden` button, a disabled one, and a
 *  `HintGroup`-style strip. */
function Region() {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {counts.map((n, i) => (
          <Button
            key={i}
            variant="outline"
            onClick={() => setCounts((c) => c.map((v, j) => (j === i ? v + 1 : v)))}
          >
            Button {i + 1} · {n}
          </Button>
        ))}
      </div>
      <Input aria-label="Notes" placeholder="A field: hinted, focused, never clicked" />
      <div data-hint className="flex items-center gap-2 rounded-lg border border-border p-2">
        <span className="text-sm text-muted-foreground">A [data-hint] wrapper</span>
        <Button size="sm">Inner</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" aria-hidden="true" tabIndex={-1}>
          aria-hidden
        </Button>
        <Button variant="outline" disabled>
          Disabled
        </Button>
      </div>
      <div
        aria-hidden="true"
        data-slot="hint-group-tooltip"
        className="pointer-events-none rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
      >
        A HintGroup strip: never a target
      </div>
    </div>
  );
}

interface DemoProps {
  alphabet?: string;
  scrolled?: boolean;
}

function Demo({ alphabet, scrolled = false }: DemoProps) {
  const [open, setOpen] = useState(false);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  return (
    <div className="flex flex-col gap-6 p-8">
      <Button className="self-start" onClick={() => setOpen(true)}>
        Enter hint mode
      </Button>
      <div
        ref={setRoot}
        className={scrolled ? "h-80 overflow-y-auto rounded-xl border border-border p-4" : ""}
      >
        {scrolled ? (
          <div className="flex flex-col gap-8">
            <p className="caption">Scroll: the keycaps follow, and ↑/↓ scroll this region.</p>
            <Region />
            <div className="h-96" />
            <Region />
          </div>
        ) : (
          <Region />
        )}
      </div>
      {root && (
        <HintOverlay
          open={open}
          onOpenChange={setOpen}
          root={root}
          alphabet={alphabet}
          onActivate={onActivate}
        />
      )}
    </div>
  );
}

const enter: Story["play"] = async ({ canvasElement }) => {
  await userEvent.click(within(canvasElement).getByRole("button", { name: "Enter hint mode" }));
  // Wait for the overlay, so the axe run sees it rather than racing the click.
  await screen.findByText(/targets — type the letters/);
};

const meta = {
  title: "Patterns/HintOverlay",
  component: Demo,
  args: {},
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Vimium-style hints: a keycap over every clickable thing in `root`. Type a label to click it; hold ⌥ to focus instead. Backspace deletes a letter, ↑/↓ scroll, Escape closes. The host binds the trigger and passes `ignoreKey` so the same chord closes it. No animation: it is a keyboard action.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { play: enter, tags: ["!autodocs"] };
export const TwoCharLabels: Story = { args: { alphabet: "fj" }, play: enter, tags: ["!autodocs"] };
export const Scrolled: Story = { args: { scrolled: true }, play: enter, tags: ["!autodocs"] };
