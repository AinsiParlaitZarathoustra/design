// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CommsConversationRow } from "./comms-conversation-row.tsx";
import type { CommsConversationRowView } from "./comms-view.ts";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const general: CommsConversationRowView = {
  id: "c-general",
  kind: "channel",
  title: "general",
  unread: 0,
  mentions: 0,
};

const click = (init: MouseEventInit) => {
  const onSelect = vi.fn();
  render(<CommsConversationRow conversation={general} onSelect={onSelect} />);
  fireEvent.click(screen.getByRole("button"), init);
  return onSelect.mock.calls[0]!;
};

describe("CommsConversationRow onSelect", () => {
  it("passes the id, then newTab and the click", () => {
    const [id, select] = click({});
    expect(id).toBe("c-general");
    expect(select.newTab).toBe(false);
    expect(select.event.type).toBe("click");
  });

  it("reads ⌘-click as a new tab on a Mac, and Ctrl-click as one elsewhere", () => {
    vi.stubGlobal("navigator", { platform: "MacIntel", userAgent: "" });
    expect(click({ metaKey: true })[1].newTab).toBe(true);
    cleanup();
    expect(click({ ctrlKey: true })[1].newTab).toBe(false);
    cleanup();

    vi.stubGlobal("navigator", { platform: "Win32", userAgent: "" });
    expect(click({ ctrlKey: true })[1].newTab).toBe(true);
    cleanup();
    expect(click({ metaKey: true })[1].newTab).toBe(false);
  });
});
