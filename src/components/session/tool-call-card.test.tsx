// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { hugeOutputCalls, toolCall } from "../../../stories/components/session/fixtures.ts";
import { ToolCallCard } from "./tool-call-card.tsx";

afterEach(cleanup);

const header = () => screen.getAllByRole("button")[0]!;

describe("ToolCallCard", () => {
  it("shows a binary output's size, never its text", () => {
    render(
      <ToolCallCard
        defaultOpen
        call={toolCall({ id: "b", output: { text: "SECRET", binary: true, bytes: 482113 } })}
      />,
    );
    expect(screen.getByText("Binary output, 470.8 KB")).toBeTruthy();
    expect(screen.queryByText("SECRET")).toBeNull();
  });

  it("asks the app for a truncated output", () => {
    const onLoadPayload = vi.fn();
    render(
      <ToolCallCard
        defaultOpen
        onLoadPayload={onLoadPayload}
        call={toolCall({ id: "t", output: { text: "head…", truncated: true, bytes: 96_400 } })}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Load full output (94.1 KB)" }));
    expect(onLoadPayload).toHaveBeenCalledWith("output");
  });

  it("says a truncated output is truncated when it cannot load it", () => {
    render(
      <ToolCallCard
        defaultOpen
        call={toolCall({ id: "t", output: { text: "head…", truncated: true } })}
      />,
    );
    expect(screen.getByText("Output truncated")).toBeTruthy();
  });

  it("marks a failed call with the error icon", () => {
    const { container } = render(<ToolCallCard call={toolCall({ id: "f", status: "failed" })} />);
    expect(container.querySelector('[data-status="failed"]')).not.toBeNull();
    expect(screen.getByLabelText("Failed")).toBeTruthy();
  });

  it("is a keyboard-operable disclosure", () => {
    render(<ToolCallCard call={toolCall({ id: "k", output: { text: "out" } })} />);
    expect(header().getAttribute("aria-expanded")).toBe("false");
    // A native button activates on Enter; the browser turns it into a click.
    fireEvent.keyDown(header(), { key: "Enter" });
    fireEvent.click(header());
    expect(header().getAttribute("aria-expanded")).toBe("true");
    expect(document.getElementById(header().getAttribute("aria-controls")!)).not.toBeNull();
  });

  it("shows the tail of a huge terminal run, 400 lines, then 2,000 more", () => {
    const { container } = render(<ToolCallCard defaultOpen call={hugeOutputCalls()[0]!} />);
    const terminal = () =>
      container
        .querySelectorAll('[data-slot="payload-lines"]')[1]!
        .querySelectorAll('[data-slot="payload-line"]');
    expect(terminal()).toHaveLength(400);
    expect(terminal()[399]!.textContent).toContain("[49999]");
    expect(terminal()[0]!.textContent).not.toContain("\u001b");
    fireEvent.click(screen.getByRole("button", { name: "Show 2,000 more lines" }));
    expect(terminal()).toHaveLength(2400);
  });

  it("says when nothing was recorded", () => {
    render(<ToolCallCard defaultOpen call={toolCall({ id: "e" })} />);
    expect(screen.getByText("Nothing else was recorded for this call.")).toBeTruthy();
  });

  it("draws a terminal's non-zero exit in the error ink", () => {
    render(
      <ToolCallCard
        defaultOpen
        call={toolCall({
          id: "x",
          kind: "execute",
          terminal: { command: "false", output: "", exitCode: 1 },
        })}
      />,
    );
    expect(screen.getByText("exit 1").className).toContain("text-error");
  });
});
