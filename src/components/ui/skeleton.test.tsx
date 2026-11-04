// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Skeleton } from "./skeleton.tsx";

afterEach(cleanup);

const draw = (props: React.ComponentProps<typeof Skeleton> = {}) =>
  render(<Skeleton {...props} />).container.firstElementChild as HTMLElement;

describe("Skeleton", () => {
  it("pulses with the small radius by default, as before", () => {
    const el = draw();
    expect(el.className).toBe("animate-pulse rounded-sm bg-muted");
    expect(el.hasAttribute("data-static")).toBe(false);
  });

  it("animated={false} holds still and says so", () => {
    const el = draw({ animated: false });
    expect(el.className).not.toContain("animate-pulse");
    expect(el.hasAttribute("data-static")).toBe(true);
  });

  it("radius picks a step on the scale, replacing the default", () => {
    const el = draw({ radius: "md" });
    expect(el.className.split(" ")).toContain("rounded-md");
    expect(el.className).not.toContain("rounded-sm");
    expect(draw({ radius: "full" }).className).toContain("rounded-full");
  });
});
