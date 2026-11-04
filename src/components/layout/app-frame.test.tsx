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

afterEach(cleanup);

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
