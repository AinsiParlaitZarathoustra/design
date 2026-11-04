// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TabStrip } from "./tab-strip.tsx";
import type { TabStripItem } from "./tab-strip.tsx";

afterEach(cleanup);

const ITEMS: TabStripItem[] = [
  { id: "home", title: "Home", pinned: true, closable: true },
  { id: "a", title: "a.ts", closable: true },
  { id: "b", title: "b.ts", closable: true, dirty: true },
  { id: "c", title: "c.ts", busy: true },
];

function setup(activeId: string | null = "a", items = ITEMS) {
  const onSelect = vi.fn();
  const onClose = vi.fn();
  render(
    <TabStrip
      aria-label="Files"
      items={items}
      activeId={activeId}
      onSelect={onSelect}
      onClose={onClose}
    />,
  );
  const tabs = screen.getAllByRole("tab");
  return { onSelect, onClose, tabs };
}

describe("TabStrip", () => {
  it("is a named tablist with the active tab selected", () => {
    const { tabs } = setup();
    expect(screen.getByRole("tablist", { name: "Files" })).toBeTruthy();
    expect(tabs.map((t) => t.getAttribute("aria-selected"))).toEqual([
      "false",
      "true",
      "false",
      "false",
    ]);
  });

  it("has one tab stop: the active tab, or the first when none is active", () => {
    expect(setup("b").tabs.map((t) => t.tabIndex)).toEqual([-1, -1, 0, -1]);
    cleanup();
    expect(setup("gone").tabs.map((t) => t.tabIndex)).toEqual([0, -1, -1, -1]);
  });

  it("moves focus with the arrows, wrapping, and jumps with Home and End", () => {
    const { tabs, onSelect } = setup();
    tabs[3]!.focus();
    fireEvent.keyDown(tabs[3]!, { key: "ArrowRight" });
    expect(document.activeElement).toBe(tabs[0]);
    fireEvent.keyDown(tabs[0]!, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(tabs[3]);
    fireEvent.keyDown(tabs[3]!, { key: "Home" });
    expect(document.activeElement).toBe(tabs[0]);
    fireEvent.keyDown(tabs[0]!, { key: "End" });
    expect(document.activeElement).toBe(tabs[3]);
    // Focus alone never opens a tab.
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("opens on Enter, Space and click", () => {
    const { tabs, onSelect } = setup();
    fireEvent.keyDown(tabs[2]!, { key: "Enter" });
    fireEvent.keyDown(tabs[3]!, { key: " " });
    fireEvent.click(tabs[0]!);
    expect(onSelect.mock.calls).toEqual([["b"], ["c"], ["home"]]);
  });

  it("closes a closable tab on middle-click and Delete, and nothing else", () => {
    const { tabs, onClose } = setup();
    fireEvent(tabs[1]!, new MouseEvent("auxclick", { bubbles: true, button: 1 }));
    fireEvent.keyDown(tabs[2]!, { key: "Delete" });
    // Not closable, and pinned (closable but never from the strip).
    fireEvent(tabs[3]!, new MouseEvent("auxclick", { bubbles: true, button: 1 }));
    fireEvent.keyDown(tabs[0]!, { key: "Delete" });
    expect(onClose.mock.calls).toEqual([["a"], ["b"]]);
  });

  it("closes from the × without selecting, and the × is out of the tab order", () => {
    const { onClose, onSelect } = setup();
    const close = screen.getByRole("button", { name: "Close a.ts" });
    expect(close.tabIndex).toBe(-1);
    fireEvent.click(close);
    expect(onClose).toHaveBeenCalledWith("a");
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("draws a pinned tab as its icon, named, with no ×", () => {
    const { tabs } = setup();
    expect(tabs[0]!.getAttribute("aria-label")).toBe("Home");
    expect(tabs[0]!.textContent).toBe("");
    expect(screen.queryByRole("button", { name: "Close Home" })).toBeNull();
  });

  it("marks dirty and busy tabs", () => {
    const { tabs } = setup();
    expect(tabs[2]!.hasAttribute("data-dirty")).toBe(true);
    expect(tabs[2]!.querySelector(".italic")?.textContent).toBe("b.ts");
    expect(tabs[3]!.getAttribute("aria-busy")).toBe("true");
    expect(tabs[3]!.querySelector('[data-slot="spinner"]')).toBeTruthy();
  });

  it("has no × at all without onClose", () => {
    render(<TabStrip aria-label="Files" items={ITEMS} activeId="a" onSelect={() => {}} />);
    expect(screen.queryAllByRole("button", { name: /^Close / })).toEqual([]);
  });

  it("lets renderTab wrap a tab and keeps the keyboard working", () => {
    const onSelect = vi.fn();
    render(
      <TabStrip
        aria-label="Files"
        items={ITEMS}
        activeId="a"
        onSelect={onSelect}
        renderTab={(item, tab) => <span data-wrapper={item.id}>{tab}</span>}
      />,
    );
    const tabs = screen.getAllByRole("tab");
    expect(tabs[1]!.parentElement?.getAttribute("data-wrapper")).toBe("a");
    tabs[1]!.focus();
    fireEvent.keyDown(tabs[1]!, { key: "ArrowRight" });
    expect(document.activeElement).toBe(tabs[2]);
  });
});
