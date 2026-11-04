// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandPaletteGroup } from "./command-list.ts";
import { CommandList, CommandPalette } from "./command-palette.tsx";

afterEach(cleanup);

function setup(groups: CommandPaletteGroup[]) {
  const onOpenChange = vi.fn();
  function Host() {
    const [open, setOpen] = useState(true);
    return (
      <CommandPalette
        open={open}
        onOpenChange={(next) => {
          onOpenChange(next);
          setOpen(next);
        }}
        groups={groups}
      />
    );
  }
  render(<Host />);
  const input = () => screen.getByRole("combobox") as HTMLInputElement;
  const active = () => {
    const id = input().getAttribute("aria-activedescendant");
    return id ? document.getElementById(id)?.textContent : null;
  };
  const key = (k: string, init: KeyboardEventInit = {}) =>
    act(() => void fireEvent.keyDown(input(), { key: k, ...init }));
  const type = (text: string) =>
    act(() => void fireEvent.change(input(), { target: { value: text } }));
  return { onOpenChange, input, active, key, type };
}

describe("CommandPalette", () => {
  it("filters, steps with wrap-around, runs the highlighted row and closes first", () => {
    const order: string[] = [];
    const run = vi.fn(() => order.push("run"));
    const { onOpenChange, active, key, type } = setup([
      {
        id: "a",
        label: "Actions",
        items: [
          { id: "1", label: "Split right", onSelect: run },
          { id: "2", label: "Split down" },
          { id: "3", label: "New session" },
        ],
      },
    ]);
    onOpenChange.mockImplementation(() => order.push("close"));
    type("split");
    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(active()).toBe("Split right");
    key("ArrowDown");
    expect(active()).toBe("Split down");
    key("ArrowDown");
    expect(active()).toBe("Split right");
    key("Enter", { isComposing: true });
    expect(run).not.toHaveBeenCalled();
    key("Enter");
    expect(run).toHaveBeenCalledOnce();
    expect(order).toEqual(["close", "run"]);
  });

  it("skips disabled rows and never runs one", () => {
    const run = vi.fn();
    const { active, key, type } = setup([
      {
        id: "a",
        items: [
          { id: "1", label: "One" },
          { id: "2", label: "Two", disabled: true, onSelect: run },
          { id: "3", label: "Three" },
        ],
      },
    ]);
    key("ArrowDown");
    expect(active()).toBe("Three");
    type("two");
    expect(screen.getByRole("option").getAttribute("aria-disabled")).toBe("true");
    key("Enter");
    fireEvent.click(screen.getByRole("option"));
    expect(run).not.toHaveBeenCalled();
  });

  it("drills into a submenu, and Backspace or Escape come back out", () => {
    const pick = vi.fn();
    const { onOpenChange, input, key } = setup([
      {
        id: "a",
        items: [
          {
            id: "theme",
            label: "Change theme…",
            groups: [
              {
                id: "themes",
                items: ["Atlas", "Dracula"].map((t) => ({ id: t, label: t, onSelect: pick })),
              },
            ],
          },
        ],
      },
    ]);
    key("Enter");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Atlas", "Dracula"]);
    expect(screen.getByRole("button", { name: "Back" })).toBeTruthy();
    key("Backspace");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Change theme…"]);
    key("Enter");
    key("Escape");
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(input()).toBeTruthy();
    expect(screen.getAllByRole("option")).toHaveLength(1);
    key("Escape");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("shows the empty message with no listbox, and collapses the combobox", () => {
    const { input, type } = setup([{ id: "a", items: [{ id: "1", label: "One" }] }]);
    type("zzz");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(screen.getByText("No results for “zzz”")).toBeTruthy();
    expect(input().getAttribute("aria-expanded")).toBe("false");
    expect(input().hasAttribute("aria-activedescendant")).toBe(false);
  });

  it("labels its groups", () => {
    setup([{ id: "a", label: "Actions", items: [{ id: "1", label: "One" }] }]);
    expect(screen.getByRole("group", { name: "Actions" })).toBeTruthy();
  });
});

describe("CommandList on its own", () => {
  it("never takes focus or a tab stop, and a click keeps focus where it was", () => {
    const run = vi.fn();
    render(
      <>
        <textarea aria-label="Composer" />
        <CommandList
          id="picker"
          groups={[{ id: "g", items: [1, 2, 3].map((n) => ({ id: `${n}`, label: `Row ${n}` })) }]}
          activeId="3"
          onRun={run}
        />
      </>,
    );
    const textarea = screen.getByLabelText("Composer");
    textarea.focus();
    const options = screen.getAllByRole("option");
    expect(options[2]!.getAttribute("aria-selected")).toBe("true");
    expect(options.every((o) => !o.hasAttribute("tabindex"))).toBe(true);
    const down = fireEvent.mouseDown(options[0]!);
    fireEvent.click(options[0]!);
    expect(down).toBe(false); // default prevented: focus stays put
    expect(document.activeElement).toBe(textarea);
    expect(run).toHaveBeenCalledWith(expect.objectContaining({ id: "1" }));
  });

  it("shows placeholder rows while loading with nothing to show", () => {
    const { container } = render(
      <CommandList id="l" groups={[]} activeId={null} onRun={() => {}} loading />,
    );
    expect(container.querySelectorAll("[data-slot='skeleton']")).toHaveLength(3);
  });
});
