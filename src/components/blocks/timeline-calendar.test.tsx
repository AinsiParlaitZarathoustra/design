// @vitest-environment happy-dom
import { cleanup, render, screen, within } from "@testing-library/react";
import { MotionGlobalConfig } from "motion/react";
import { useRef } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { type CalendarItem, TimelineCalendar } from "./timeline-calendar.tsx";

// happy-dom lays nothing out: the scroller (whose `clientHeight` the
// virtualizer reads) is given a viewport's height, and every item measures 0,
// so all of them fall in range and mount. The date's slide-in is skipped.
beforeAll(() => {
  MotionGlobalConfig.skipAnimations = true;
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockImplementation(function (
    this: HTMLElement,
  ) {
    return this.dataset.testid === "scroller" ? 900 : 0;
  });
});
afterAll(() => {
  MotionGlobalConfig.skipAnimations = false;
  vi.restoreAllMocks();
});
afterEach(cleanup);

/**
 * Virtualized, the calendar is a flat run of absolutely placed items, and the
 * unvirtualized one's semantics (a named section per day, its rows a list)
 * have to be put back on purpose.
 */
const ITEMS: CalendarItem<string>[] = [
  { kind: "day", key: "d1", id: "d1", date: "November 4", day: "Today" },
  { kind: "row", key: "a", dayId: "d1", data: "Alpha" },
  { kind: "row", key: "b", dayId: "d1", data: "Bravo" },
  { kind: "day", key: "d2", id: "d2", date: "November 3", day: "Yesterday" },
  { kind: "row", key: "c", dayId: "d2", data: "Charlie" },
];

function Calendar(props: { flush?: boolean; endSpace?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} data-testid="scroller">
      <TimelineCalendar items={ITEMS} root={ref} renderRow={(s) => <span>{s}</span>} {...props} />
    </div>
  );
}

describe("TimelineCalendar", () => {
  it("names each day's section and lists its rows with their place in the day", () => {
    render(<Calendar />);
    const today = screen.getByRole("region", { name: "November 4, Today" });
    expect(within(today).getByRole("heading", { level: 2 }).textContent).toContain("November 4");
    const rows = within(within(today).getByRole("list")).getAllByRole("listitem");
    expect(rows.map((r) => [r.textContent, r.getAttribute("aria-posinset")])).toEqual([
      ["Alpha", "1"],
      ["Bravo", "2"],
    ]);
    expect(rows.every((r) => r.getAttribute("aria-setsize") === "2")).toBe(true);

    const yesterday = screen.getByRole("region", { name: "November 3, Yesterday" });
    const [charlie] = within(yesterday).getAllByRole("listitem");
    expect(charlie?.getAttribute("aria-setsize")).toBe("1");
  });

  it("hides the sticky date, which repeats a heading, from assistive tech", () => {
    const { container } = render(<Calendar />);
    // One heading per day, and the sticky copy is not a landmark.
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2);
    expect(screen.queryByRole("banner")).toBeNull();
    // Its date is the first thing in the calendar, and hidden.
    const sticky = container.querySelector('[data-slot="timeline-calendar"] > div');
    const date = sticky?.querySelector("span");
    expect(date?.textContent).toContain("November 4");
    expect(date?.getAttribute("aria-hidden")).toBe("true");
  });

  it("leaves room after the last day unless told not to", () => {
    const { container, unmount } = render(<Calendar />);
    // Sized from the scroller: its 900px, less the header and the last day's
    // rows, which happy-dom measures at 0.
    const end = container.querySelector<HTMLElement>('[data-slot="timeline-calendar-end"]');
    expect(end?.style.height).toBe("900px");
    unmount();
    const again = render(<Calendar endSpace={false} />);
    expect(again.container.querySelector('[data-slot="timeline-calendar-end"]')).toBeNull();
  });

  it("insets the dates to the rows' text, or puts them on the edge when flush", () => {
    const { unmount } = render(<Calendar />);
    expect(screen.getAllByRole("heading", { level: 2 })[0]?.className).toContain("px-2");
    unmount();
    render(<Calendar flush />);
    expect(screen.getAllByRole("heading", { level: 2 })[0]?.className).not.toContain("px-2");
  });
});
