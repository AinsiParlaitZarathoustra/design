// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { GradualBlur } from "./gradual-blur.tsx";

afterEach(cleanup);

describe("GradualBlur", () => {
  it("stacks one div per layer", () => {
    const { container } = render(<GradualBlur position="bottom" layers={5} />);
    expect(container.firstElementChild!.children).toHaveLength(5);
  });

  it("layers={0} with no tint renders nothing", () => {
    const { container } = render(<GradualBlur position="bottom" layers={0} />);
    expect(container.firstElementChild).toBeNull();
  });

  it("layers={0} with a tint renders only the wash", () => {
    const { container } = render(
      <GradualBlur position="bottom" layers={0} tint="var(--background)" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.children).toHaveLength(1);
    expect((root.children[0] as HTMLElement).style.background).toContain("var(--background)");
  });

  it("sits on the edge it is given", () => {
    const { container } = render(<GradualBlur position="top" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.top).toBe("0px");
    expect(root.style.bottom).toBe("");
  });
});
