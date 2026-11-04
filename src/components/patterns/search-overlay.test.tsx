// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { type SearchOverlayProps, type SearchResult, SearchOverlay } from "./search-overlay.tsx";

afterEach(cleanup);

const RESULTS: SearchResult[] = [
  { id: "a", title: "src/a.ts", meta: ":3", detail: "const split = 1", highlights: [[6, 11]] },
  { id: "b", title: "src/b.ts", meta: ":9", detail: "split(x)", highlights: [[0, 5]] },
];

function setup(props: Partial<SearchOverlayProps> = {}) {
  const calls = {
    onSubmit: vi.fn(),
    onOpen: vi.fn(),
    onForgetRecent: vi.fn(),
    onPickRecent: vi.fn(),
    onOpenChange: vi.fn(),
  };
  function Host() {
    const [open, setOpen] = useState(true);
    const [query, setQuery] = useState("");
    return (
      <SearchOverlay
        title="Search in files"
        status="idle"
        results={[]}
        {...calls}
        {...props}
        open={open}
        onOpenChange={(next) => {
          calls.onOpenChange(next);
          setOpen(next);
        }}
        query={query}
        onQueryChange={setQuery}
      />
    );
  }
  const view = render(<Host />);
  const input = () => screen.getByRole("combobox") as HTMLInputElement;
  const key = (k: string) => act(() => void fireEvent.keyDown(input(), { key: k }));
  const type = (text: string) =>
    act(() => void fireEvent.change(input(), { target: { value: text } }));
  return { ...calls, ...view, input, key, type };
}

describe("SearchOverlay", () => {
  it("lists recent searches: Delete forgets the highlighted one, Enter searches it", async () => {
    const s = setup({ mode: "submit", recent: ["alpha", "beta", "gamma"] });
    await waitFor(() => expect(document.activeElement).toBe(s.input()));
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual([
      "alpha",
      "beta",
      "gamma",
    ]);
    s.key("ArrowDown");
    s.key("Delete");
    expect(s.onForgetRecent).toHaveBeenCalledWith("beta");
    s.key("Enter");
    expect(s.onPickRecent).toHaveBeenCalledWith("beta");
    expect(s.onSubmit).toHaveBeenCalledWith("beta");
  });

  it("shows the idle hint with no recent searches", () => {
    setup({ idleHint: "Type to search across all files" });
    expect(screen.getByText("Type to search across all files")).toBeTruthy();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("in submit mode, Enter after an edit searches; then Enter opens the highlighted result", () => {
    const s = setup({ mode: "submit", status: "done", results: RESULTS });
    s.type(" split ");
    s.key("Enter");
    expect(s.onSubmit).toHaveBeenCalledExactlyOnceWith("split");
    s.key("ArrowDown");
    s.key("Enter");
    expect(s.onOpenChange).toHaveBeenCalledWith(false);
    expect(s.onOpen).toHaveBeenCalledWith(RESULTS[1]);
  });

  it("marks the matches in the detail line", () => {
    const s = setup({ mode: "live", status: "done", results: RESULTS });
    s.type("split");
    const marks = s.container.ownerDocument.querySelectorAll("mark[data-match]");
    expect([...marks].map((m) => m.textContent)).toEqual(["split", "split"]);
  });

  it("shows an error in place of the results", () => {
    setup({ status: "error", error: "ripgrep exited with code 2", results: RESULTS });
    expect(screen.getByText("ripgrep exited with code 2")).toBeTruthy();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("shows the empty message only once a search is done", () => {
    const s = setup({ status: "searching" });
    s.type("zzz");
    expect(screen.queryByText("No results")).toBeNull();
    expect(screen.getByRole("status", { name: "Searching" })).toBeTruthy();
    cleanup();
    const done = setup({ status: "done" });
    done.type("zzz");
    expect(screen.getByText("No results")).toBeTruthy();
  });
});
