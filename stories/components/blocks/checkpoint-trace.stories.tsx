import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import {
  CheckpointTrace,
  type CheckpointTraceProps,
  type TraceSession,
  type TraceZoom,
} from "../../../src/components/blocks/checkpoint-trace.tsx";
import { ClaudeCodeMark, CodexMark } from "../../../src/components/ui/brand-marks.tsx";
import { AtlasMark } from "../../../src/components/ui/atlas-mark.tsx";
import { Button } from "../../../src/ui/button.tsx";
import {
  denseSession,
  denseTitled,
  liveSessions,
  longTitles,
  mixedTitles,
  NOW,
  orgWeek,
  projectDay,
  teamWeek,
} from "./checkpoint-trace-fixtures.ts";

function agentMark(session: TraceSession) {
  if (session.agentLabel === "Claude Code") return <ClaudeCodeMark className="size-3" />;
  if (session.agentLabel === "Codex") return <CodexMark className="size-3" />;
  if (session.agentLabel === "Atlas") return <AtlasMark className="size-3" />;
  return null;
}

/** Zoom held in state, as a host would, so a cluster's zoom-in lands. */
function Demo(props: Omit<CheckpointTraceProps, "zoom"> & { zoom?: TraceZoom }) {
  const [zoom, setZoom] = useState<TraceZoom>(props.zoom ?? "day");
  return (
    <div className="h-140 w-full overflow-hidden rounded-lg border border-border">
      <CheckpointTrace
        now={NOW}
        renderAgentMark={agentMark}
        toolbar={<span className="label px-1">Trace</span>}
        {...props}
        zoom={zoom}
        onZoomChange={(z) => {
          setZoom(z);
          props.onZoomChange?.(z);
        }}
      />
    </div>
  );
}

const meta = {
  title: "Blocks/CheckpointTrace",
  component: Demo,
  args: {
    sessions: orgWeek(),
    zoom: "week",
    groupBy: "none",
    onOpenSession: fn(),
    onOpenCheckpoint: fn(),
    onZoomChange: fn(),
    onRangeChange: fn(),
  },
  argTypes: {
    zoom: { control: "inline-radio", options: ["hour", "day", "week"] },
    groupBy: { control: "inline-radio", options: ["none", "project", "person"] },
    density: { control: "inline-radio", options: ["comfortable", "compact"] },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Timeline's second lens: time runs across, each session is a lane, and its checkpoints are marks on it. A mark is its author's face (their photo, or initials in their own hue) and, when there is room before the next mark, a chip with the checkpoint's title and its time and lines changed; checkpoints that would overlap gather into a cluster that shows their faces, count and latest title. Bar length is where time went, the faint tint is the project, a hollow dashed bar produced nothing, a ringed face and a change of colour in the rail under the bar are a handoff, and a breathing edge and a green dot on the latest face are still live. Week zoom fits the range to the screen. Drag the empty field to pan (it glides, and rubber-bands at the ends), Ctrl/⌘+wheel to zoom, and with focus inside, arrow keys walk the checkpoints. Virtualized with `@tanstack/react-virtual`, so it is its own entry: `@tryatlas/design/checkpoint-trace`.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** About forty sessions, six people, three projects, over a week. */
export const OrgWeek: Story = {
  play: async ({ canvasElement }) => {
    const region = within(canvasElement).getByRole("region", { name: "Checkpoint trace" });
    await expect(within(region).getAllByRole("listitem").length).toBeGreaterThan(10);
    // Opened scrolled to now: the now line is in view.
    await expect(region.querySelector("[data-focus]")).not.toBeNull();
  },
};

/** One tab stop for the whole trace; arrows walk the checkpoints, the card
 *  shows at once, and Enter opens. */
export const Keyboard: Story = {
  args: { zoom: "day" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByRole("region", { name: "Checkpoint trace" });
    await userEvent.click(canvas.getByRole("button", { name: "Now" }));
    await userEvent.tab();
    await userEvent.tab();
    const title = document.activeElement as HTMLElement;
    await expect(title.dataset.focus).toMatch(/\|:title$/);
    await expect(region.querySelectorAll('[data-focus][tabindex="0"]').length).toBe(1);
    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() => expect(document.activeElement).not.toBe(title));
    await userEvent.keyboard("{End}");
    await waitFor(() =>
      expect(document.activeElement?.textContent).toMatch(/^(Checkpoint by|\d+ checkpoints)/),
    );
    await waitFor(() => expect(canvas.getByRole("tooltip")).toBeVisible());
    await userEvent.keyboard("{Enter}");
    const opened =
      (args.onOpenCheckpoint as ReturnType<typeof fn>).mock.calls.length +
      (args.onZoomChange as ReturnType<typeof fn>).mock.calls.length;
    await expect(opened).toBe(1);
  },
};

/** Drag the empty field to pan; past the start it rubber-bands and, pulled
 *  far enough, asks for more time. Ctrl/⌘+wheel zooms about the pointer. */
export const PanAndZoom: Story = {
  args: { zoom: "day" },
  play: async ({ canvasElement, args }) => {
    const scroller = canvasElement.querySelector<HTMLElement>(
      '[data-slot="checkpoint-trace-scroller"]',
    )!;
    const field = scroller.querySelector<HTMLElement>(
      "[data-pan] [data-pan-layer]:not([aria-hidden])",
    )!;
    const box = scroller.getBoundingClientRect();
    const y = box.top + 140;
    const drag = async (fromX: number, toX: number) => {
      await userEvent.pointer([
        { keys: "[MouseLeft>]", target: field, coords: { clientX: fromX, clientY: y } },
        { target: field, coords: { clientX: (fromX + toX) / 2, clientY: y } },
        { target: field, coords: { clientX: toX, clientY: y } },
        { keys: "[/MouseLeft]", target: field, coords: { clientX: toX, clientY: y } },
      ]);
    };

    // 1:1 tracking: dragging left by 200px scrolls right by 200px (and may glide on).
    scroller.scrollLeft = 800;
    const before = scroller.scrollLeft;
    await drag(box.left + 900, box.left + 700);
    await expect(scroller.scrollLeft).toBeGreaterThanOrEqual(before + 199);

    // A press catches the glide that drag set off, as a finger would.
    await drag(box.left + 600, box.left + 600);
    const caught = scroller.scrollLeft;
    await new Promise((resolve) => setTimeout(resolve, 100));
    await expect(scroller.scrollLeft).toBe(caught);

    // Past the start: the band, then a request for the day before.
    scroller.scrollLeft = 0;
    await drag(box.left + 500, box.left + 900);
    await expect(args.onRangeChange).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(field.style.transform).toMatch(/^(|translateX\(0px\)|none)$/));

    // Ctrl + wheel over the field zooms in about the pointer.
    scroller.dispatchEvent(
      new WheelEvent("wheel", {
        deltaY: -120,
        ctrlKey: true,
        clientX: box.left + 700,
        clientY: y,
        bubbles: true,
        cancelable: true,
      }),
    );
    await waitFor(() => expect(args.onZoomChange).toHaveBeenCalledWith("hour"));
  },
};

/** One project's day, at day zoom: the host filtered the sessions. Hovering
 *  a checkpoint shows its card. */
export const ProjectDay: Story = {
  args: { sessions: projectDay(), zoom: "day" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const node = canvasElement.querySelector<HTMLElement>("[data-mark]:not([data-handoff])");
    await expect(node).not.toBeNull();
    await userEvent.hover(node!);
    const card = await canvas.findByRole("tooltip", {}, { timeout: 2000 });
    await expect(card.textContent).toMatch(/[0-9a-f]{7}/);
    await expect(node).toHaveAttribute("aria-describedby", card.id);
    // The server's shape: no titles, so names fall back to the short sha; a
    // rebased-away commit says so; a capped session shows its cue.
    const marks = canvas.getAllByRole("button", { name: /^Checkpoint by / });
    await expect(marks[0]!.textContent).toMatch(/: [0-9a-f]{7}/);
    const lost = canvas.getAllByRole("button", { name: /Not on any branch$/ });
    for (const mark of lost) await expect(mark).toHaveAttribute("data-orphaned");
    await expect(canvas.getByText("More checkpoints than shown")).toBeInTheDocument();
  },
};

/** Sessions still running: each runs to the now line, its edge breathing. */
export const Live: Story = {
  args: { sessions: liveSessions(), zoom: "hour" },
  play: async ({ canvasElement }) => {
    const edges = canvasElement.querySelectorAll('[data-slot="checkpoint-trace-live-edge"]');
    await expect(edges.length).toBe(6);
    await expect(edges[0]!.className).toMatch(/motion-safe:animate-pulse/);
  },
};

/** A session landing a checkpoint every few minutes: at day zoom they gather
 *  into counts; opening one zooms in about it. */
export const DenseClustering: Story = {
  args: { sessions: denseSession(), zoom: "day" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const [pill] = await canvas.findAllByRole("button", { name: /^\d+ checkpoints, .*Zoom in$/ });
    await userEvent.click(pill!);
    await expect(args.onZoomChange).toHaveBeenCalledWith("hour");
    await waitFor(() =>
      expect(canvas.getByRole("radio", { name: "Hour" })).toHaveAttribute("aria-checked", "true"),
    );
  },
};

/** Swimlanes per person (a session's owner, its first participant). */
export const GroupByPerson: Story = {
  args: { groupBy: "person", zoom: "day" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(canvas.getAllByRole("heading", { level: 3 }).length).toBeGreaterThan(0),
    );
    await expect(canvas.getAllByRole("heading", { level: 3 })[0]!.textContent).toMatch(/sessions?/);
  },
};

/** Swimlanes per project; the bars' tint matches the group's dot. */
export const GroupByProject: Story = {
  args: { groupBy: "project", zoom: "week" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [first] = canvas.getAllByRole("heading", { level: 3 });
    await expect(first!.textContent).toMatch(/^(atlas|server|design)\d+ sessions?/);
  },
};

export const Empty: Story = {
  args: { sessions: [] },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText("No sessions in this range")).toBeVisible();
  },
};

export const Loading: Story = {
  args: { sessions: [], loading: true },
  play: async ({ canvasElement }) => {
    const status = within(canvasElement).getByRole("status");
    await expect(status).toHaveAttribute("aria-busy", "true");
    await expect(status.querySelectorAll('[data-slot="skeleton"]').length).toBeGreaterThan(0);
  },
};

export const ErrorState: Story = {
  args: {
    sessions: [],
    error: "The server answered 503. Your sessions are safe; the trace will be back shortly.",
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("alert")).toHaveTextContent(
      "The trace didn't load",
    );
  },
};

/** An error node with the host's own retry. */
export const ErrorWithRetry: Story = {
  args: {
    sessions: [],
    error: (
      <div className="flex flex-col items-center gap-2">
        <p className="label">Couldn't reach the server</p>
        <Button size="sm" variant="outline">
          Retry
        </Button>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("button", { name: "Retry" })).toBeVisible();
  },
};

export const LongTitles: Story = {
  args: { sessions: longTitles(), zoom: "week" },
  play: async ({ canvasElement }) => {
    const titles = [
      ...canvasElement.querySelectorAll<HTMLElement>("[data-focus$='|:title'] .truncate"),
    ];
    await expect(titles.length).toBeGreaterThan(0);
    // Truncated, not wrapped: every label line stays one line tall.
    for (const t of titles) await expect(t.scrollWidth >= t.clientWidth).toBe(true);
    // One line of text-xs each (15px), however long the title.
    for (const t of titles) await expect(t.offsetHeight).toBeLessThanOrEqual(16);
  },
};

/** The case desktop opens on: an organisation's week by project, every
 *  checkpoint titled, most people with a photo. Week zoom fits the week to
 *  the screen, and each lane names its latest work. */
export const TeamWeek: Story = {
  args: { sessions: teamWeek(), zoom: "week", groupBy: "project" },
  play: async ({ canvasElement }) => {
    const region = within(canvasElement).getByRole("region", { name: "Checkpoint trace" });
    // Titles on the chart itself, not only in the hover card.
    await waitFor(() =>
      expect(region.querySelectorAll('[data-mark][data-tier="label"]').length).toBeGreaterThan(5),
    );
    await expect(region.textContent).toMatch(/\d+ checkpoints · /);
    // Photos where the host passed them.
    await waitFor(() => expect(region.querySelectorAll("img").length).toBeGreaterThan(0));
  },
};

/** Bursts of titled checkpoints on every lane: a cluster says who (its
 *  faces) and how many, and its latest title when there is room. Opening one
 *  zooms in, and its checkpoints slide out of it. */
export const DenseClustersWithTitles: Story = {
  args: { sessions: denseTitled(), zoom: "week" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const clusters = await canvas.findAllByRole("button", { name: /^\d+ checkpoints, / });
    await expect(clusters.length).toBeGreaterThan(3);
    await userEvent.click(clusters[0]!);
    await expect(args.onZoomChange).toHaveBeenCalledWith("day");
  },
};

/** Titles of every awkward length and script: one letter, none (the short
 *  sha, in mono), a paragraph, emoji, CJK, Cyrillic and Arabic. Every chip
 *  truncates inside its room, and none overlaps the next. */
export const MixedTitles: Story = {
  args: { sessions: mixedTitles(), zoom: "day" },
  play: async ({ canvasElement }) => {
    const marks = [...canvasElement.querySelectorAll<HTMLElement>("[data-mark]")];
    await expect(marks.length).toBeGreaterThan(5);
    const byLane = new Map<string, DOMRect[]>();
    for (const mark of marks) {
      const lane = mark.dataset.lane!;
      byLane.set(lane, [...(byLane.get(lane) ?? []), mark.parentElement!.getBoundingClientRect()]);
    }
    for (const rects of byLane.values()) {
      rects.sort((a, b) => a.left - b.left);
      for (let i = 1; i < rects.length; i++)
        await expect(rects[i]!.left).toBeGreaterThanOrEqual(rects[i - 1]!.right);
    }
  },
};

/** `density="compact"`: 36px lanes and one-line chips, for a host that wants
 *  more lanes on a screen. Faces stay 20px, still readable. */
export const Compact: Story = {
  args: { sessions: teamWeek(), zoom: "week", groupBy: "project", density: "compact" },
  play: async ({ canvasElement }) => {
    const title = canvasElement.querySelector<HTMLElement>("[data-focus$='|:title']")!;
    await expect(title.getBoundingClientRect().height).toBeLessThanOrEqual(36);
  },
};

/** Hundreds of lanes: only the ones near the viewport are mounted. */
export const ManySessions: Story = {
  args: { sessions: orgWeek(400, 3), zoom: "week" },
  play: async ({ canvasElement }) => {
    const mounted = canvasElement.querySelectorAll("[data-focus$='|:title']").length;
    await expect(mounted).toBeGreaterThan(5);
    await expect(mounted).toBeLessThan(60);
  },
};
