// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { NextPage } from "./next-page.tsx";

/** A fake IntersectionObserver whose callback a test fires by hand. */
let observers: Array<{ fire: (isIntersecting: boolean) => void; disconnected: boolean }> = [];
beforeEach(() => {
  observers = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      record = { fire: (_: boolean) => {}, disconnected: false };
      constructor(callback: IntersectionObserverCallback) {
        this.record.fire = (isIntersecting) =>
          callback([{ isIntersecting } as IntersectionObserverEntry], this as never);
        observers.push(this.record);
      }
      observe() {}
      disconnect() {
        this.record.disconnected = true;
      }
    },
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const base = { hasNext: true, fetching: false, failed: false, failure: "Couldn't load more." };
const live = () => observers.filter((o) => !o.disconnected);

describe("NextPage", () => {
  it("asks for the next page when its sentinel comes into view", () => {
    const onNext = vi.fn();
    render(<NextPage {...base} onNext={onNext} />);
    expect(live()).toHaveLength(1);
    live()[0]!.fire(false);
    expect(onNext).not.toHaveBeenCalled();
    live()[0]!.fire(true);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("does not re-observe when only onNext changes", () => {
    const { rerender } = render(<NextPage {...base} onNext={() => {}} />);
    const second = vi.fn();
    rerender(<NextPage {...base} onNext={second} />);
    expect(observers).toHaveLength(1);
    live()[0]!.fire(true);
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("shows the skeleton while fetching, and stops observing", () => {
    render(<NextPage {...base} fetching onNext={() => {}} skeleton={<p>Loading rows</p>} />);
    expect(screen.getByText("Loading rows")).toBeTruthy();
    expect(live()).toHaveLength(0);
  });

  it("stops asking on failure and offers a retry", () => {
    const onNext = vi.fn();
    render(<NextPage {...base} failed onNext={onNext} retryLabel="Retry" />);
    expect(live()).toHaveLength(0);
    expect(screen.getByRole("alert").textContent).toContain("Couldn't load more.");
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("renders nothing at the end of the list", () => {
    const { container } = render(<NextPage {...base} hasNext={false} onNext={() => {}} />);
    expect(container.innerHTML).toBe("");
  });
});
