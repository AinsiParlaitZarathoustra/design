// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Progress } from "./progress.tsx";

afterEach(cleanup);

function indicator(container: HTMLElement) {
  return container.querySelector<HTMLElement>('[data-slot="progress-indicator"]')!;
}

describe("Progress tone", () => {
  it("leaves the default indicator on the primary ink, with no tone attribute", () => {
    const { container } = render(<Progress value={40} aria-label="Indexing" />);
    expect(indicator(container).hasAttribute("data-tone")).toBe(false);
    expect(indicator(container).className).toContain("bg-primary");
  });

  it.each([
    ["success", "bg-success"],
    ["warning", "bg-warning"],
    ["error", "bg-error"],
  ] as const)("%s swaps the primary ink for %s", (tone, ink) => {
    const { container } = render(<Progress value={40} tone={tone} aria-label="Quota" />);
    const el = indicator(container);
    expect(el.dataset.tone).toBe(tone);
    expect(el.className).toContain(ink);
    expect(el.className).not.toContain("bg-primary");
  });
});
