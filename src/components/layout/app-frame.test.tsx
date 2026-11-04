// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  AppFrame,
  SideDock,
  SideDockSizeToggle,
  useSideDock,
  useSideDockRoom,
} from "./app-frame.tsx";
import type { SideDockMode } from "./app-frame.tsx";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("AppFrame inset", () => {
  function frame(inset?: "all" | "sides") {
    render(
      <AppFrame sidebar={null} dockMode="compact" onDockModeChange={() => {}} inset={inset}>
        page
        <SideDock>dock</SideDock>
      </AppFrame>,
    );
    const root = document.querySelector<HTMLElement>('[data-slot="app-frame"]')!;
    return {
      root,
      row: screen.getByRole("main").parentElement!.parentElement!,
      main: screen.getByRole("main"),
      dock: document.querySelector<HTMLElement>('[data-slot="dock"]')!,
    };
  }

  it("keeps the gutter on every side by default", () => {
    const { root, row, main, dock } = frame();
    expect(root.hasAttribute("data-inset")).toBe(false);
    expect(row.className.split(/\s+/)).toContain("p-2");
    expect(row.className).not.toContain("pt-0");
    expect(main.className).not.toContain("rounded-t-none");
    expect(dock.className).not.toContain("rounded-t-none");
  });

  it("sides: drops the top gutter and squares the page and dock at the top edge", () => {
    const { root, row, main, dock } = frame("sides");
    expect(root.dataset.inset).toBe("sides");
    expect(row.className.split(/\s+/)).toContain("pt-0");
    for (const panel of [main, dock]) {
      expect(panel.className).toContain("rounded-t-none");
      expect(panel.className).toContain("border-t-0");
    }
  });
});

let room: ReturnType<typeof useSideDockRoom>;

function Probe() {
  const { mode } = useSideDock();
  room = useSideDockRoom();
  return (
    <SideDock>
      <span data-testid="mode">{mode}</span>
      <SideDockSizeToggle />
    </SideDock>
  );
}

function Frame({ onDockModeChange }: { onDockModeChange: (m: SideDockMode) => void }) {
  const [mode, setMode] = useState<SideDockMode>("compact");
  return (
    <AppFrame
      sidebar={<nav>rail</nav>}
      dockMode={mode}
      onDockModeChange={(m) => {
        onDockModeChange(m);
        setMode(m);
      }}
    >
      <Probe />
    </AppFrame>
  );
}

describe("AppFrame", () => {
  it("portals the dock beside the page and reports a size pick", async () => {
    const onDockModeChange = vi.fn();
    render(<Frame onDockModeChange={onDockModeChange} />);
    expect(await screen.findByTestId("mode")).toBeTruthy();
    expect(screen.getByTestId("mode").closest("main")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Half-width panel" }));
    expect(onDockModeChange).toHaveBeenCalledWith("half");
    expect(screen.getByTestId("mode").textContent).toBe("half");
  });

  it("never touches storage", () => {
    const get = vi.spyOn(Storage.prototype, "getItem");
    const set = vi.spyOn(Storage.prototype, "setItem");
    render(<Frame onDockModeChange={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Half-width panel" }));
    expect(get).not.toHaveBeenCalled();
    expect(set).not.toHaveBeenCalled();
  });

  it("does nothing on a borrow outside a measured frame", async () => {
    render(<Frame onDockModeChange={() => {}} />);
    await screen.findByTestId("mode");
    // happy-dom lays nothing out, so the work area measures 0 wide.
    let wait = -1;
    act(() => {
      wait = room.expand();
    });
    expect(wait).toBe(0);
    expect(screen.getByTestId("mode").textContent).toBe("compact");
  });

  it("renders no dock outside a frame", () => {
    render(<SideDock>orphan</SideDock>);
    expect(screen.queryByText("orphan")).toBeNull();
  });
});
