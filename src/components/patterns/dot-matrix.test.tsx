// @vitest-environment happy-dom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { SegmentMeter } from "./dot-matrix.tsx";

afterEach(cleanup);

function ticks(meter: HTMLElement) {
  return Array.from(meter.querySelectorAll<HTMLElement>("[data-tone]"));
}

describe("SegmentMeter variant=gauge", () => {
  it("draws 48 ticks by default, success below warnAt and warning from it", () => {
    render(<SegmentMeter variant="gauge" value={0.5} label="Context" />);
    const all = ticks(screen.getByRole("meter", { name: "Context" }));
    expect(all).toHaveLength(48);
    // Tick i's centre is (i + 0.5) / 48; 0.8 falls in tick 38.
    expect(all[37]?.dataset.tone).toBe("success");
    expect(all[38]?.dataset.tone).toBe("warning");
    expect(all.at(-1)?.dataset.tone).toBe("warning");
  });

  it("lights the ticks whose centre is at or below the value", () => {
    render(<SegmentMeter variant="gauge" value={0.25} segments={8} label="Context" />);
    const lit = ticks(screen.getByRole("meter")).map((t) => t.dataset.lit === "true");
    expect(lit).toEqual([true, true, false, false, false, false, false, false]);
  });

  it("pins the marker and the aria value inside 0–100", () => {
    render(<SegmentMeter variant="gauge" value={1.4} label="Context" />);
    const meter = screen.getByRole("meter");
    expect(meter.getAttribute("aria-valuenow")).toBe("100");
    const marker = meter.querySelector<HTMLElement>('[data-slot="segment-meter-marker"]');
    expect(marker?.style.left).toBe("100%");
  });

  it("has no warning band when warnAt is 1", () => {
    render(<SegmentMeter variant="gauge" value={0.9} warnAt={1} label="Efficiency" />);
    expect(ticks(screen.getByRole("meter")).every((t) => t.dataset.tone === "success")).toBe(true);
  });
});
