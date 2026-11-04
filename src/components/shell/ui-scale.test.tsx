// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { resetTooltipTiming } from "../../ui/tooltip-timing.ts";
import { UiScalePanel } from "./ui-scale.tsx";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  resetTooltipTiming();
});

const tooltip = () => document.querySelector("[data-slot='tooltip-content']");
// A stepper button can be disabled, so a hint's trigger is the span around it
// (see `Hint`); point at that.
const hover = (button: Element) => {
  const trigger = button.parentElement?.tagName === "SPAN" ? button.parentElement : button;
  fireEvent.pointerEnter(trigger, { pointerType: "mouse" });
  fireEvent.mouseEnter(trigger);
  act(() => vi.advanceTimersByTime(0));
  act(() => vi.advanceTimersByTime(1000));
};

describe("UiScalePanel", () => {
  it("has no hints by default", () => {
    vi.useFakeTimers();
    render(<UiScalePanel scale={1} onScaleChange={() => {}} />);
    hover(screen.getByRole("button", { name: "Larger" }));
    expect(tooltip()).toBeNull();
  });

  it("hints each stepper button with the keys it was given", () => {
    vi.useFakeTimers();
    // The hint draws keycaps for the host's keyboard; pin it to a Mac's.
    vi.stubGlobal("navigator", { ...navigator, platform: "MacIntel" });
    render(
      <UiScalePanel
        scale={1}
        onScaleChange={() => {}}
        shortcuts={{ decrease: "⌘-", increase: "⌘+" }}
      />,
    );
    hover(screen.getByRole("button", { name: "Larger" }));
    expect(tooltip()?.textContent).toBe("Larger⌘+");
    expect(tooltip()?.querySelectorAll("[data-slot='kbd']")).toHaveLength(2);
  });

  it("still steps, clamped to the grid", () => {
    const onScaleChange = vi.fn();
    render(<UiScalePanel scale={1} onScaleChange={onScaleChange} shortcuts={{}} />);
    fireEvent.click(screen.getByRole("button", { name: "Smaller" }));
    expect(onScaleChange).toHaveBeenCalledWith(0.9);
  });
});
