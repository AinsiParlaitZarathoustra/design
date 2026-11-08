import { fireEvent, render, within } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import { FileText } from "lucide-svelte";
import TabStripDemo from "./fixtures/tab-strip-demo.svelte";
import {
  fadeMask,
  scrollLeftToReveal,
  type TabStripItem,
} from "../src/components/layout/tab-strip-logic";

const tabs = (view: unknown) =>
  (view as { getAllByRole: (role: string) => HTMLElement[] }).getAllByRole("tab");

describe("TabStrip", () => {
  it("is one tab stop and reports the active tab", () => {
    const { getAllByRole, getByRole } = render(TabStripDemo);
    const all = getAllByRole("tab");
    expect(all.map((tab) => tab.getAttribute("aria-selected"))).toEqual(["true", "false", "false"]);
    expect(all.map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);
    expect(getByRole("tablist", { name: "Open files" })).toHaveAttribute(
      "aria-orientation",
      "horizontal",
    );
  });

  it("moves focus with the arrow keys, Home and End, and opens only on Enter or Space", async () => {
    const onSelect = vi.fn();
    const view = render(TabStripDemo, { props: { onSelect } });
    const all = tabs(view);
    all[0]!.focus();
    await fireEvent.keyDown(all[0]!, { key: "ArrowRight" });
    expect(all[1]).toHaveFocus();
    await fireEvent.keyDown(all[1]!, { key: "End" });
    expect(all[2]).toHaveFocus();
    await fireEvent.keyDown(all[2]!, { key: "ArrowRight" });
    expect(all[0]).toHaveFocus();
    await fireEvent.keyDown(all[0]!, { key: "ArrowLeft" });
    expect(all[2]).toHaveFocus();
    expect(onSelect).not.toHaveBeenCalled();
    await fireEvent.keyDown(all[2]!, { key: "Enter" });
    expect(onSelect).toHaveBeenLastCalledWith("home");
    await fireEvent.keyDown(all[1]!, { key: " " });
    expect(onSelect).toHaveBeenLastCalledWith("readme");
  });

  it("closes with Delete, middle-click and the × — and names the × after the tab", async () => {
    const onClose = vi.fn();
    const view = render(TabStripDemo, { props: { onClose } });
    const all = tabs(view);
    all[0]!.focus();
    await fireEvent.keyDown(all[0]!, { key: "Delete" });
    expect(onClose).toHaveBeenLastCalledWith("app");
    await fireEvent(all[1]!, new MouseEvent("auxclick", { bubbles: true, button: 1 }));
    expect(onClose).toHaveBeenLastCalledWith("readme");
    await fireEvent.click(view.getByRole("button", { name: "Close app-frame.tsx" }));
    expect(onClose).toHaveBeenLastCalledWith("app");
  });

  it("draws dirty, busy and pinned states and never closes a pinned tab", () => {
    const items: TabStripItem[] = [
      { id: "dirty", title: "README.md", icon: FileText, closable: true, dirty: true },
      { id: "busy", title: "Running", icon: FileText, closable: true, busy: true },
      { id: "home", title: "Home", icon: FileText, pinned: true },
    ];
    const view = render(TabStripDemo, { props: { items, activeId: "dirty" } });
    const [dirty, busy, home] = tabs(view);
    expect(dirty).toHaveAttribute("aria-label", "README.md, unsaved");
    expect(dirty).toHaveAttribute("data-dirty");
    expect(dirty.querySelector("span.italic")).not.toBeNull();
    expect(busy).toHaveAttribute("aria-busy", "true");
    expect(busy.querySelector('[data-slot="spinner"]')).not.toBeNull();
    expect(home).toHaveAttribute("aria-label", "Home");
    expect(home).toHaveAttribute("data-pinned");
    expect(view.queryByRole("button", { name: "Close Home" })).toBeNull();
  });

  it("honours the D24 opt-outs one by one", async () => {
    const onClose = vi.fn();
    const view = render(TabStripDemo, { props: { onClose, rovingFocus: false } });
    const all = tabs(view);
    expect(all.map((tab) => tab.tabIndex)).toEqual([0, 0, 0]);
    await fireEvent.keyDown(all[0]!, { key: "ArrowRight" });
    expect(all[1]).not.toHaveFocus();

    const view2 = render(TabStripDemo, { props: { onClose, closeOnDelete: false } });
    const all2 = within(view2.container).getAllByRole("tab");
    all2[0]!.focus();
    await fireEvent.keyDown(all2[0]!, { key: "Delete" });
    expect(onClose).not.toHaveBeenCalled();

    const view3 = render(TabStripDemo, {
      props: { onClose, closeOnMiddleClick: false },
    });
    await fireEvent(
      within(view3.container).getAllByRole("tab")[0]!,
      new MouseEvent("auxclick", { bubbles: true, button: 1 }),
    );
    expect(onClose).not.toHaveBeenCalled();
  });

  it("gives a quieter active tab when its pane is not focused", () => {
    const { getAllByRole } = render(TabStripDemo, { props: { focused: false } });
    expect(getAllByRole("tab")[0]!.className).toContain("bg-element-hover");
    expect(getAllByRole("tab")[0]!.className).toContain("text-secondary-foreground");
  });
});

describe("tab strip geometry (the source's own numbers)", () => {
  it("reveals a tab clear of the 20px fades, moving as little as possible", () => {
    expect(scrollLeftToReveal(0, 200, 30, 90)).toBe(0);
    expect(scrollLeftToReveal(0, 200, 250, 310)).toBe(130);
    expect(scrollLeftToReveal(100, 200, 120, 180)).toBe(100);
    expect(scrollLeftToReveal(40, 200, 10, 60)).toBe(0);
  });

  it("masks only the edges with tabs past them", () => {
    expect(fadeMask({ overflow: false, canLeft: false, canRight: false })).toBeUndefined();
    expect(fadeMask({ overflow: true, canLeft: true, canRight: true })).toBe(
      "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)",
    );
    expect(fadeMask({ overflow: true, canLeft: false, canRight: true })).toBe(
      "linear-gradient(to right, black, black, black calc(100% - 20px), transparent)",
    );
    expect(fadeMask({ overflow: true, canLeft: true, canRight: false })).toBe(
      "linear-gradient(to right, transparent, black 20px, black, black)",
    );
  });
});
