// @vitest-environment happy-dom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { DiffStat, formatDiffCount } from "./code-block.tsx";

afterEach(cleanup);

describe("formatDiffCount", () => {
  it.each([
    [0, "0"],
    [999, "999"],
    [1000, "1k"],
    [1240, "1.2k"],
    [12_480, "12k"],
    [999_499, "999k"],
    [999_600, "1m"],
    [1_204_000, "1.2m"],
    [25_000_000, "25m"],
  ])("%d reads as %s", (value, shown) => {
    expect(formatDiffCount(value)).toBe(shown);
  });
});

describe("DiffStat", () => {
  it("prints both sides as given by default", () => {
    const { container } = render(<DiffStat added={1204} removed={0} />);
    expect(container.textContent).toBe("+1204−0");
    expect(container.querySelector("[role=group]")).toBeNull();
  });

  it("compacts large counts", () => {
    const { container } = render(<DiffStat added={12_480} removed={3} compact />);
    expect(container.textContent).toBe("+12k−3");
  });

  it("drops a zero side, and draws nothing when both are zero", () => {
    const { container, rerender } = render(<DiffStat added={4} removed={0} hideZero />);
    expect(container.textContent).toBe("+4");
    rerender(<DiffStat added={0} removed={0} hideZero />);
    expect(container.innerHTML).toBe("");
  });

  it("keeps the hidden side's cell in an aligned column", () => {
    const { container } = render(<DiffStat added={0} removed={7} hideZero layout="aligned" />);
    const root = container.firstElementChild!;
    expect(root.children).toHaveLength(2);
    expect(root.children[0]?.textContent).toBe("");
    expect(root.children[1]?.textContent).toBe("−7");
  });

  it("is one named group when labelled, its glyphs hidden", () => {
    render(<DiffStat added={12} removed={3} label="12 added, 3 removed" />);
    const group = screen.getByRole("group", { name: "12 added, 3 removed" });
    for (const side of group.children) expect(side.getAttribute("aria-hidden")).toBe("true");
  });
});
