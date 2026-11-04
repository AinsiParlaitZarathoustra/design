// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Rail, RailNode } from "./rail.tsx";

afterEach(cleanup);

function row(props: Partial<React.ComponentProps<typeof Rail>> = {}) {
  const root = render(
    <Rail node={<RailNode>•</RailNode>} {...props}>
      content
    </Rail>,
  ).container.firstElementChild as HTMLElement;
  const [gutter, content] = [...root.children] as HTMLElement[];
  const line = gutter!.querySelector<HTMLElement>("[aria-hidden]")!;
  return { root, content: content!, line };
}

describe("Rail", () => {
  it("draws the timeline's row as before when nothing is passed", () => {
    const { root, content, line } = row();
    expect(root.className).toBe("grid grid-cols-[32px_minmax(0,1fr)] gap-3.5");
    expect(content.className).toBe("min-w-0 pb-4");
    expect(line.style.top).toBe("0px");
    expect(line.style.bottom).toBe("0px");
  });

  it("stops the hairline at the node centre on the first and last rows", () => {
    expect(row({ first: true }).line.style.top).toBe("16px");
    expect(row({ last: true }).line.style.bottom).toBe("calc(100% - 16px)");
  });

  it("contentClassName replaces the row spacing", () => {
    const { content } = row({ contentClassName: "pb-5" });
    expect(content.className.split(" ")).toContain("pb-5");
    expect(content.className).not.toContain("pb-4");
  });

  it("RailNode is the opaque round node", () => {
    const { container } = render(<RailNode>x</RailNode>);
    const node = container.firstElementChild!;
    expect(node.getAttribute("data-slot")).toBe("rail-node");
    expect(node.className.split(" ")).toEqual(
      expect.arrayContaining(["size-8", "rounded-full", "bg-card", "border-border-strong/50"]),
    );
  });
});
