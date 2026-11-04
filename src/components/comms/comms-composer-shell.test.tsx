// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CommsComposerShell } from "./comms-composer-shell.tsx";
import type { CommsComposerShellProps } from "./comms-composer-shell.tsx";

afterEach(cleanup);

function shell(props: Partial<CommsComposerShellProps> = {}) {
  render(
    <CommsComposerShell
      editor={<textarea aria-label="Message" />}
      canSend={false}
      onSend={() => {}}
      {...props}
    />,
  );
  const root = document.querySelector<HTMLElement>('[data-slot="comms-composer"]')!;
  const bar = root.querySelector<HTMLElement>(".glass-rim")!;
  return { root, bar };
}

describe("CommsComposerShell slots", () => {
  it("draws none of the new parts by default", () => {
    const { root, bar } = shell();
    expect(bar.className).toBe("relative z-10 glass-rim rounded-composer");
    expect(bar.hasAttribute("data-drop-active")).toBe(false);
    expect(bar.hasAttribute("data-invalid")).toBe(false);
    expect(root.querySelector('[data-slot="comms-composer-drop"]')).toBeNull();
    expect(root.querySelector('[data-slot="comms-composer-format"]')).toBeNull();
  });

  it("formatRow sits in the bar and widens it", () => {
    const { root } = shell({ formatRow: <button type="button">Bold</button> });
    const row = root.querySelector('[data-slot="comms-composer-format"]')!;
    expect(row.textContent).toBe("Bold");
    expect(row.closest(".glass-rim")).not.toBeNull();
    expect(root.firstElementChild!.className).toContain("w-[89.5%]");
  });

  it("dropActive rings the bar and labels it; it outranks invalid", () => {
    const { root, bar } = shell({ dropActive: true, invalid: true });
    expect(bar.dataset.dropActive).toBe("true");
    expect(bar.className).toContain("border-primary");
    expect(bar.className).not.toContain("border-error");
    expect(root.querySelector('[data-slot="comms-composer-drop"]')!.textContent).toBe(
      "Drop files to attach",
    );
  });

  it("invalid turns the edge red", () => {
    const { bar } = shell({ invalid: true });
    expect(bar.dataset.invalid).toBe("true");
    expect(bar.className).toContain("border-error");
  });

  it("popup renders inside the width box, before the bar", () => {
    const { root, bar } = shell({ popup: <div data-testid="mentions">Lin</div> });
    const popup = screen.getByTestId("mentions");
    expect(popup.parentElement).toBe(root.firstElementChild);
    expect(popup.compareDocumentPosition(bar) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("the edit strip shows editPreview", () => {
    const { root } = shell({ editing: true, editPreview: "The keycap reads on light now." });
    expect(root.querySelector('[data-slot="comms-composer-intent"]')!.textContent).toContain(
      "The keycap reads on light now.",
    );
  });

  it("renderSend gets the shell's state; send still wins", () => {
    const onSend = vi.fn();
    const renderSend = vi.fn(({ label, onSend: send }) => (
      <button type="button" onClick={send}>
        {label}!
      </button>
    ));
    shell({ canSend: true, sendLabel: "Save edit", onSend, renderSend });
    expect(renderSend).toHaveBeenCalledWith({
      canSend: true,
      sending: false,
      label: "Save edit",
      onSend,
    });
    fireEvent.click(screen.getByRole("button", { name: "Save edit!" }));
    expect(onSend).toHaveBeenCalledOnce();
    cleanup();

    shell({ renderSend, send: <span>mic</span> });
    expect(screen.queryByRole("button", { name: /!$/ })).toBeNull();
    expect(screen.getByText("mic")).toBeTruthy();
  });

  it("renderSend returning null draws no Send at all", () => {
    shell({ canSend: true, renderSend: () => null });
    expect(screen.queryByRole("button", { name: "Send" })).toBeNull();
    expect(document.querySelector('[data-slot="comms-send"]')).toBeNull();
  });

  it("escapeToCancel={false} leaves Escape alone", () => {
    const onCancelReply = vi.fn();
    const replyTo = { authorName: "Lin", preview: "hi" };
    shell({ replyTo, onCancelReply, escapeToCancel: false });
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Escape" });
    expect(onCancelReply).not.toHaveBeenCalled();
    cleanup();

    shell({ replyTo, onCancelReply });
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Escape" });
    expect(onCancelReply).toHaveBeenCalledOnce();
  });

  it("names an answered message with no text instead of ending on a bare separator", () => {
    shell({ replyTo: { authorName: "Lin", preview: "  " } });
    expect(document.querySelector('[data-slot="comms-composer-reply-empty"]')?.textContent).toBe(
      "Message deleted",
    );
    cleanup();

    shell({ replyTo: { authorName: "Lin", preview: "" }, replyEmptyLabel: "Attachment" });
    expect(screen.getByText("Attachment")).toBeTruthy();
    cleanup();

    shell({ replyTo: { authorName: "Lin", preview: "hi" } });
    expect(document.querySelector('[data-slot="comms-composer-reply-empty"]')).toBeNull();
    expect(screen.getByText("Lin · hi")).toBeTruthy();
  });
});
