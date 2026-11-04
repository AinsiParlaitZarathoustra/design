// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { StepList } from "./step-list.tsx";
import type { StepListStep } from "./step-list.tsx";

afterEach(cleanup);

const steps = (...s: StepListStep["status"][]): StepListStep[] =>
  ["Commit", "Push", "Open pull request"].map((label, i) => ({
    id: String(i),
    label,
    status: s[i] ?? "pending",
  }));

const status = () => screen.getByRole("status").textContent;

describe("StepList", () => {
  it("marks each row with its status and the matching glyph", () => {
    render(<StepList steps={steps("done", "running", "pending")} />);
    const rows = document.querySelectorAll<HTMLElement>('[data-slot="step"]');
    expect([...rows].map((r) => r.dataset.status)).toEqual(["done", "running", "pending"]);
    const glyphs = [...rows].map(
      (r) => r.querySelector<HTMLElement>('[data-slot="status-icon"]')!.dataset.status,
    );
    expect(glyphs).toEqual(["done", "live", "queued"]);
  });

  it("announces the running step, then done", () => {
    const { rerender } = render(<StepList steps={steps("done", "running")} />);
    expect(status()).toBe("Push…");
    rerender(<StepList steps={steps("done", "done", "done")} doneMessage="Opened #12." />);
    expect(status()).toBe("Opened #12.");
  });

  it("says Starting… while every step is pending, and nothing with startingMessage={null}", () => {
    const { rerender } = render(<StepList steps={steps()} />);
    expect(status()).toBe("Starting…");
    rerender(<StepList steps={steps("running")} />);
    expect(status()).toBe("Commit…");
    cleanup();
    render(<StepList steps={steps()} startingMessage={null} />);
    expect(status()).toBe("");
  });

  it("a failed step shows the error and a retry that calls back", () => {
    const onRetry = vi.fn();
    render(
      <StepList
        steps={steps("done", "failed")}
        error="rejected: non-fast-forward"
        onRetry={onRetry}
        retryLabel="Retry push"
      />,
    );
    expect(status()).toBe("Push failed. rejected: non-fast-forward");
    expect(screen.getByText("rejected: non-fast-forward")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Retry push" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("offers no retry without onRetry, and no failure block while nothing failed", () => {
    render(<StepList steps={steps("done", "failed")} error="nope" />);
    expect(screen.queryByRole("button")).toBeNull();
    cleanup();
    render(<StepList steps={steps("running")} error="stale" onRetry={() => {}} />);
    expect(document.querySelector('[data-slot="step-list-failure"]')).toBeNull();
  });
});
