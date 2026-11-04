// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ResizableHandle, ResizablePane, ResizableSplit } from "./resizable-split.tsx";

afterEach(cleanup);

function handleOf(orientation: "horizontal" | "vertical", hidden = false) {
  const { container } = render(
    <ResizableSplit id={`t-${orientation}`} orientation={orientation}>
      <ResizablePane id="a">A</ResizablePane>
      <ResizableHandle hidden={hidden} />
      <ResizablePane id="b">B</ResizablePane>
    </ResizableSplit>,
  );
  return container.querySelector<HTMLElement>('[data-slot="resizable-handle"]')!;
}

describe("ResizableSplit", () => {
  it("draws a column rule side by side", () => {
    const handle = handleOf("horizontal");
    expect(handle.className).toContain("cursor-col-resize");
    expect(handle.className).toContain("w-px");
  });

  it("draws a row rule when stacked", () => {
    const handle = handleOf("vertical");
    expect(handle.className).toContain("cursor-row-resize");
    expect(handle.className).toContain("h-px");
    expect(handle.className).not.toContain("cursor-col-resize");
  });

  it("keeps a hidden handle mounted, inert and invisible", () => {
    const handle = handleOf("horizontal", true);
    expect(handle).toBeTruthy();
    expect(handle.className).toContain("invisible");
    expect(handle.className).toContain("pointer-events-none");
  });
});
