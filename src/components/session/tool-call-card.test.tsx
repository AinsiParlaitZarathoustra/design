// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
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

  it("holds Load full while the app fetches, focusable and busy", () => {
    const onLoadPayload = vi.fn();
    render(
      <ToolCallCard
        defaultOpen
        onLoadPayload={onLoadPayload}
        call={toolCall({
          id: "t",
          output: { text: "head…", truncated: true, bytes: 96_400, load: "loading" },
        })}
      />,
    );
    const button = screen.getByRole("button", { name: "Load full output (94.1 KB)" });
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(button.hasAttribute("disabled")).toBe(false);
    fireEvent.click(button);
    expect(onLoadPayload).not.toHaveBeenCalled();
  });

  it("offers a retry after a failed load", () => {
    const onLoadPayload = vi.fn();
    render(
      <ToolCallCard
        defaultOpen
        onLoadPayload={onLoadPayload}
        call={toolCall({
          id: "t",
          input: { text: "{…", truncated: true, load: "failed" },
        })}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Couldn't load the full input, retry" }));
    expect(onLoadPayload).toHaveBeenCalledWith("input");
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

  describe("Copy", () => {
    const big = Array.from({ length: 1000 }, (_, i) => `line ${i}`).join("\n");
    const flush = () => act(async () => {});

    it("shows Copied only when onCopy resolves true, and copies the whole payload", async () => {
      const onCopy = vi.fn().mockResolvedValue(true);
      render(
        <ToolCallCard
          defaultOpen
          onCopy={onCopy}
          call={toolCall({ id: "c", output: { text: big } })}
        />,
      );
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
      await flush();
      expect(onCopy).toHaveBeenCalledWith("output", big);
      expect(screen.getByRole("button", { name: "Copied" })).toBeTruthy();
    });

    it("stays Copy when onCopy resolves false or throws", async () => {
      for (const onCopy of [
        vi.fn().mockResolvedValue(false),
        vi.fn().mockRejectedValue(new Error("denied")),
        vi.fn(() => {
          throw new Error("denied");
        }),
      ]) {
        render(
          <ToolCallCard
            defaultOpen
            onCopy={onCopy}
            call={toolCall({ id: "c", input: { text: "in" } })}
          />,
        );
        fireEvent.click(screen.getByRole("button", { name: "Copy" }));
        await flush();
        expect(onCopy).toHaveBeenCalledWith("input", "in");
        expect(screen.queryByRole("button", { name: "Copied" })).toBeNull();
        cleanup();
      }
    });

    it("copies a terminal run without its escapes", async () => {
      const onCopy = vi.fn().mockResolvedValue(true);
      render(
        <ToolCallCard
          defaultOpen
          onCopy={onCopy}
          call={toolCall({
            id: "x",
            kind: "execute",
            terminal: { output: "\u001b[31mred\u001b[0m\n" },
          })}
        />,
      );
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
      await flush();
      expect(onCopy).toHaveBeenCalledWith("output", "red\n");
    });

    it("offers no Copy on a binary or truncated payload, or without onCopy", () => {
      render(
        <ToolCallCard
          defaultOpen
          onCopy={() => true}
          call={toolCall({ id: "b", output: { text: null, binary: true, bytes: 10 } })}
        />,
      );
      expect(screen.queryByRole("button", { name: "Copy" })).toBeNull();
      cleanup();
      render(<ToolCallCard defaultOpen call={toolCall({ id: "n", output: { text: "x" } })} />);
      expect(screen.queryByRole("button", { name: "Copy" })).toBeNull();
      cleanup();
      // A truncated payload holds only its head: no partial copy.
      render(
        <ToolCallCard
          defaultOpen
          onCopy={() => true}
          call={toolCall({ id: "t", output: { text: "head", truncated: true } })}
        />,
      );
      expect(screen.queryByRole("button", { name: "Copy" })).toBeNull();
    });
  });

  it("respects a controlled open and reports toggles", () => {
    const onOpenChange = vi.fn();
    const { container, rerender } = render(
      <ToolCallCard
        open={false}
        onOpenChange={onOpenChange}
        call={toolCall({ id: "o", output: { text: "out" } })}
      />,
    );
    expect(container.querySelector('[data-tool-call-id="o"]')).not.toBeNull();
    fireEvent.click(header());
    expect(onOpenChange).toHaveBeenCalledWith(true);
    // Still closed: the parent decides.
    expect(header().getAttribute("aria-expanded")).toBe("false");
    rerender(
      <ToolCallCard
        open
        onOpenChange={onOpenChange}
        call={toolCall({ id: "o", output: { text: "out" } })}
      />,
    );
    expect(header().getAttribute("aria-expanded")).toBe("true");
  });

  it("draws its strings from labels", () => {
    render(
      <ToolCallCard
        defaultOpen
        labels={{ empty: "Rien.", truncated: (part) => `${part} coupé` }}
        call={toolCall({ id: "l" })}
      />,
    );
    expect(screen.getByText("Rien.")).toBeTruthy();
  });
});
