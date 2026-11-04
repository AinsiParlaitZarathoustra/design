// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeProvider } from "../../lib/theme.tsx";
import { DitherField } from "./dither-field.tsx";

/**
 * Desktop applies themes with its own engine and cannot mount the package's
 * `ThemeProvider`, so the field must stand alone and still hear a theme
 * switch. happy-dom has no 2D canvas, so the context is a stub; what is
 * counted is the field re-reading its ink off computed style.
 */
const fakeContext = {
  setTransform() {},
  clearRect() {},
  fillRect() {},
  fillText() {},
  getImageData: () => ({ data: [255, 255, 255, 255] }),
  fillStyle: "",
  font: "",
  textBaseline: "",
};

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    fakeContext as unknown as CanvasRenderingContext2D,
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("data-appearance");
});

const inkReads = (spy: { mock: { calls: unknown[][] } }, canvas: Element) =>
  spy.mock.calls.filter(([el]) => el === canvas).length;

describe("DitherField", () => {
  it("renders without a ThemeProvider", () => {
    const { container } = render(<DitherField />);
    expect(container.querySelector('[data-slot="dither-field"]')).not.toBeNull();
  });

  it("re-reads its ink when the theme attributes on <html> change", async () => {
    const spy = vi.spyOn(window, "getComputedStyle");
    const { container } = render(<DitherField />);
    const canvas = container.querySelector('[data-slot="dither-field"]')!;
    const before = inkReads(spy, canvas);
    expect(before).toBeGreaterThan(0);

    document.documentElement.setAttribute("data-appearance", "light");
    await Promise.resolve();
    expect(inkReads(spy, canvas)).toBe(before + 1);

    // Not every attribute: an unrelated one costs no repaint.
    document.documentElement.setAttribute("lang", "en");
    await Promise.resolve();
    expect(inkReads(spy, canvas)).toBe(before + 1);
  });

  it("still renders inside a ThemeProvider", () => {
    const { container } = render(
      <ThemeProvider>
        <DitherField />
      </ThemeProvider>,
    );
    expect(container.querySelector('[data-slot="dither-field"]')).not.toBeNull();
  });
});
