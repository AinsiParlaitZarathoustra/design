// @vitest-environment happy-dom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  type CommandPaletteGroup,
  type CommandPaletteItem,
  filterCommandGroups,
  normalizeSearchText,
  optionId,
  selectableIds,
  splitHighlights,
  stepHighlight,
  useListHighlight,
} from "./command-list.ts";

const item = (id: string, label: string, extra: Partial<CommandPaletteItem> = {}) => ({
  id,
  label,
  ...extra,
});

const GROUPS: CommandPaletteGroup[] = [
  {
    id: "actions",
    label: "Actions",
    items: [
      item("split-right", "Split right"),
      item("new", "New session", { keywords: ["chat"] }),
      item("split", "Split"),
      item("tips", "Split tips", { secondary: true }),
    ],
  },
  { id: "recent", label: "Recent", hideWhenSearching: true, items: [item("r1", "Split work")] },
  { id: "other", items: [item("settings", "Settings", { disabled: true })] },
];

const ids = (groups: CommandPaletteGroup[]) => groups.map((g) => [g.id, g.items.map((i) => i.id)]);

describe("filterCommandGroups", () => {
  it("returns every group for an empty query", () => {
    expect(filterCommandGroups(GROUPS, "  ")).toEqual(GROUPS);
  });

  it("ranks exact over prefix, secondary last, and drops searching-hidden and empty groups", () => {
    expect(ids(filterCommandGroups(GROUPS, "split"))).toEqual([
      ["actions", ["split", "split-right", "tips"]],
    ]);
  });

  it("matches keywords, every word, folded case and accents", () => {
    expect(ids(filterCommandGroups(GROUPS, "CHAT"))).toEqual([["actions", ["new"]]]);
    expect(ids(filterCommandGroups(GROUPS, "sess new"))).toEqual([["actions", ["new"]]]);
    expect(normalizeSearchText("  Café\tMenu ")).toBe("cafe menu");
  });
});

describe("selectableIds and stepHighlight", () => {
  it("skips disabled rows", () => {
    expect(selectableIds(GROUPS)).toEqual(["split-right", "new", "split", "tips", "r1"]);
  });

  it("wraps at both ends and starts from the edge with nothing highlighted", () => {
    const list = ["a", "b", "c"];
    expect(stepHighlight(list, "c", 1)).toBe("a");
    expect(stepHighlight(list, "a", -1)).toBe("c");
    expect(stepHighlight(list, null, 1)).toBe("a");
    expect(stepHighlight(list, null, -1)).toBe("c");
    expect(stepHighlight([], "a", 1)).toBeNull();
  });
});

describe("optionId", () => {
  it("is a safe id whatever the list id and key hold", () => {
    expect(optionId(":r1:", "src/a b.ts")).toBe("_r1_-opt-src_a_b_ts");
  });
});

describe("useListHighlight", () => {
  it("defaults to the first id, steps, and falls back when the active id is filtered out", () => {
    const { result, rerender } = renderHook(({ list, key }) => useListHighlight(list, key), {
      initialProps: { list: ["a", "b", "c"], key: "" },
    });
    expect(result.current.active).toBe("a");
    act(() => void result.current.step(1));
    act(() => void result.current.step(1));
    expect(result.current.active).toBe("c");
    // Still listed: kept.
    rerender({ list: ["c", "a"], key: "" });
    expect(result.current.active).toBe("c");
    // Dropped: the first.
    rerender({ list: ["a", "b"], key: "" });
    expect(result.current.active).toBe("a");
  });

  it("resets to the top on a new reset key", () => {
    const { result, rerender } = renderHook(({ key }) => useListHighlight(["a", "b"], key), {
      initialProps: { key: "x" },
    });
    act(() => void result.current.step(1));
    expect(result.current.active).toBe("b");
    rerender({ key: "xy" });
    expect(result.current.active).toBe("a");
  });

  it("ignores a pointer that did not move", () => {
    const { result } = renderHook(() => useListHighlight(["a", "b", "c"]));
    act(() => result.current.pointTo("b", 10, 10));
    expect(result.current.active).toBe("b");
    act(() => void result.current.step(1));
    // The list scrolled under a resting pointer: same coordinates, new row.
    act(() => result.current.pointTo("a", 10, 10));
    expect(result.current.active).toBe("c");
  });
});

describe("splitHighlights", () => {
  const join = (text: string, ranges?: Array<[number, number]>) =>
    splitHighlights(text, ranges)
      .map((s) => s.text)
      .join("");
  const marks = (text: string, ranges?: Array<[number, number]>) =>
    splitHighlights(text, ranges)
      .filter((s) => s.match)
      .map((s) => s.text);

  it.each<[string, Array<[number, number]> | undefined, string[]]>([
    ["no ranges", undefined, []],
    ["single", [[2, 5]], ["cde"]],
    [
      "out of range",
      [
        [-3, 2],
        [8, 99],
      ],
      ["ab", "ij"],
    ],
    [
      "overlapping",
      [
        [1, 4],
        [3, 6],
      ],
      ["bcdef"],
    ],
    [
      "touching",
      [
        [1, 3],
        [3, 5],
      ],
      ["bcde"],
    ],
    [
      "unsorted",
      [
        [6, 8],
        [0, 2],
      ],
      ["ab", "gh"],
    ],
    ["empty", [[3, 3]], []],
    ["inverted", [[5, 2]], []],
  ])("%s", (_, ranges, expected) => {
    expect(marks("abcdefghij", ranges)).toEqual(expected);
    expect(join("abcdefghij", ranges)).toBe("abcdefghij");
  });

  it("returns nothing for empty text and one plain segment without ranges", () => {
    expect(splitHighlights("", [[0, 1]])).toEqual([]);
    expect(splitHighlights("abc")).toEqual([{ text: "abc", match: false }]);
  });
});

describe("useListHighlight and disabled rows", () => {
  it("ignores pointing at an id that is not selectable", () => {
    const { result } = renderHook(() => useListHighlight(["a", "c"]));
    act(() => void result.current.step(1));
    act(() => result.current.pointTo("b-disabled", 5, 5));
    expect(result.current.active).toBe("c");
  });
});
