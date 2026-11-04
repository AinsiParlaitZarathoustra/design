import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useRef } from "react";
import {
  type CalendarItem,
  TimelineCalendar,
} from "../../../src/components/blocks/timeline-calendar.tsx";
import { cn } from "../../../src/lib/utils.ts";

interface Row {
  id: string;
  title: string;
  author: string;
  meta: string;
}

const TITLES = [
  "Refactor the settings panel",
  "Fix the flaky terminal test",
  "Port the session timeline",
  "Add the ghost-destructive variant",
  "Wire up the PR surface",
  "Theme import from VS Code",
];
const AUTHORS = ["Maya Chen", "Tomás Rivera", "Aiko Tanaka", "Sam Okafor"];
const DAYS = [
  { date: "November 4", day: "Today" },
  { date: "November 3", day: "Yesterday" },
  { date: "November 2", day: "Sunday" },
  { date: "October 31", day: "Friday" },
  { date: "October 30", day: "Thursday" },
  { date: "October 29", day: "Wednesday" },
];

function buildItems(perDay: number, days: number, longText = false): CalendarItem<Row>[] {
  const out: CalendarItem<Row>[] = [];
  DAYS.slice(0, days).forEach((d, di) => {
    out.push({
      kind: "day",
      key: `day-${di}`,
      id: `day-${di}`,
      ...d,
      meta: <span className="caption tabular-nums">{perDay} sessions</span>,
    });
    for (let i = 0; i < perDay; i++) {
      const n = di * perDay + i;
      out.push({
        kind: "row",
        key: `row-${n}`,
        dayId: `day-${di}`,
        data: {
          id: `row-${n}`,
          title:
            longText && i === 0
              ? "Rewrite the session sidebar so pinned, unread and snoozed sessions sort into one flat list with a project filter"
              : TITLES[n % TITLES.length]!,
          author: AUTHORS[n % AUTHORS.length]!,
          meta: `atlas · ${((n * 13_417) % 200_000).toLocaleString("en-US")} tokens`,
        },
      });
    }
  });
  return out;
}

function RowView({ row, selected }: { row: Row; selected?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 rounded-md px-2 py-2 transition-colors duration-fast ease-out-strong",
        selected ? "bg-element-selected" : "hover:bg-element-hover",
      )}
    >
      <span className="label truncate">{row.title}</span>
      <span className="caption">{row.author}</span>
      <span className="caption tabular-nums">{row.meta}</span>
    </div>
  );
}

function Demo({
  perDay = 4,
  days = 4,
  longText = false,
}: {
  perDay?: number;
  days?: number;
  longText?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const items = useMemo(() => buildItems(perDay, days, longText), [perDay, days, longText]);
  return (
    <div ref={ref} className="h-120 w-120 overflow-y-auto px-4">
      <TimelineCalendar
        items={items}
        root={ref}
        renderRow={(row) => <RowView row={row} selected={row.id === "row-1"} />}
      />
      {items.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <span className="caption">Nothing on the board yet</span>
        </div>
      )}
    </div>
  );
}

const meta = {
  title: "Blocks/TimelineCalendar",
  component: Demo,
  args: { perDay: 4, days: 4, longText: false },
  parameters: {
    docs: {
      description: {
        component:
          "The board grouped by day under one sticky date that changes as you scroll into the next day. Virtualized with `@tanstack/react-virtual` (an optional peer), so it is its own entry: `@tryatlas/design/timeline-calendar`. Renders nothing for an empty list.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { days: 0 } };
export const LongText: Story = { args: { longText: true } };
export const ManyItems: Story = { args: { perDay: 80, days: 6 } };
/** Scrolled into the second day, so the sticky date has changed. */
export const Scrolled: Story = {
  play: async ({ canvasElement }) => {
    const scroller = canvasElement.querySelector<HTMLElement>(".overflow-y-auto");
    if (scroller) scroller.scrollTop = 520;
  },
};
