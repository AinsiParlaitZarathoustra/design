// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { type Column, DataTable, type DataTableSort } from "./data-table.tsx";

afterEach(cleanup);

type Row = { id: string; name: string; seats: number };

const ROWS: Row[] = [
  { id: "a", name: "Beta", seats: 5 },
  { id: "b", name: "Alpha", seats: 12 },
  { id: "c", name: "Gamma", seats: 1 },
];

const COLUMNS: Column<Row>[] = [
  { id: "name", header: "Name", cell: (r) => r.name, sortValue: (r) => r.name },
  { id: "seats", header: "Seats", cell: (r) => r.seats, sortable: true },
];

const names = () =>
  screen
    .getAllByRole("row")
    .slice(1)
    .map((row) => row.querySelector("td")?.textContent);

describe("DataTable sorting", () => {
  it("sorts locally by default: asc, desc, then the order given", () => {
    render(<DataTable rows={ROWS} columns={COLUMNS} rowId={(r) => r.id} />);
    const header = screen.getByRole("columnheader", { name: "Name" });
    expect(names()).toEqual(["Beta", "Alpha", "Gamma"]);
    fireEvent.click(header);
    expect(names()).toEqual(["Alpha", "Beta", "Gamma"]);
    expect(header.getAttribute("aria-sort")).toBe("ascending");
    fireEvent.click(header);
    expect(names()).toEqual(["Gamma", "Beta", "Alpha"]);
    fireEvent.click(header);
    expect(names()).toEqual(["Beta", "Alpha", "Gamma"]);
    expect(header.getAttribute("aria-sort")).toBeNull();
  });

  it("does not offer a sort on a column it cannot sort locally", () => {
    render(<DataTable rows={ROWS} columns={COLUMNS} rowId={(r) => r.id} />);
    const seats = screen.getByRole("columnheader", { name: "Seats" });
    fireEvent.click(seats);
    expect(seats.getAttribute("aria-sort")).toBeNull();
    expect(names()).toEqual(["Beta", "Alpha", "Gamma"]);
  });

  it("reports the next sort to onSortChange, and still sorts locally when uncontrolled", () => {
    const onSortChange = vi.fn();
    render(
      <DataTable rows={ROWS} columns={COLUMNS} rowId={(r) => r.id} onSortChange={onSortChange} />,
    );
    fireEvent.click(screen.getByRole("columnheader", { name: "Name" }));
    expect(onSortChange).toHaveBeenLastCalledWith({ id: "name", dir: "asc" });
    expect(names()).toEqual(["Alpha", "Beta", "Gamma"]);
  });

  it("controlled: draws the sort it is given and asks for the next one", () => {
    const onSortChange = vi.fn();
    render(
      <DataTable
        rows={ROWS}
        columns={COLUMNS}
        rowId={(r) => r.id}
        sort={{ id: "name", dir: "desc" }}
        onSortChange={onSortChange}
      />,
    );
    const header = screen.getByRole("columnheader", { name: "Name" });
    expect(header.getAttribute("aria-sort")).toBe("descending");
    expect(names()).toEqual(["Gamma", "Beta", "Alpha"]);
    fireEvent.click(header);
    expect(onSortChange).toHaveBeenLastCalledWith(null);
    // The parent did not change `sort`, so neither does the table.
    expect(header.getAttribute("aria-sort")).toBe("descending");
    expect(names()).toEqual(["Gamma", "Beta", "Alpha"]);
  });

  it("manualSorting: keeps the rows in the order given, sorted elsewhere", () => {
    function ServerSorted() {
      const [sort, setSort] = useState<DataTableSort>(null);
      // Stand-in for the server: the parent sorts and hands the rows back.
      const rows =
        sort?.id === "seats"
          ? [...ROWS].sort((a, b) => (sort.dir === "asc" ? a.seats - b.seats : b.seats - a.seats))
          : ROWS;
      return (
        <DataTable
          rows={rows}
          columns={COLUMNS}
          rowId={(r) => r.id}
          sort={sort}
          onSortChange={setSort}
          manualSorting
        />
      );
    }
    render(<ServerSorted />);
    const seats = screen.getByRole("columnheader", { name: "Seats" });
    fireEvent.click(seats);
    expect(seats.getAttribute("aria-sort")).toBe("ascending");
    expect(names()).toEqual(["Gamma", "Beta", "Alpha"]);
    fireEvent.click(seats);
    expect(names()).toEqual(["Alpha", "Beta", "Gamma"]);

    // A column with a sortValue is not re-sorted locally under manualSorting.
    const name = screen.getByRole("columnheader", { name: "Name" });
    fireEvent.click(name);
    expect(name.getAttribute("aria-sort")).toBe("ascending");
    expect(names()).toEqual(["Beta", "Alpha", "Gamma"]);
  });
});
