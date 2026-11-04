// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * `onLayoutCommit` is the split's one promise about persistence: it reports
 * a layout the person dragged to, and never one the library settled on by
 * itself (a pane mounting, the window resizing), which an app would
 * otherwise save as if it were a choice. A real drag needs layout a DOM test
 * does not have, so `Group` is replaced by one that hands over its
 * `onLayoutChanged`.
 */

let changed:
  | ((layout: Record<string, number>, meta: { isUserInteraction: boolean }) => void)
  | undefined;

vi.mock("react-resizable-panels", () => ({
  Group: (props: { onLayoutChanged: typeof changed; children: React.ReactNode }) => {
    changed = props.onLayoutChanged;
    return <div>{props.children}</div>;
  },
  Panel: () => null,
  Separator: () => null,
}));

const { ResizableSplit } = await import("./resizable-split.tsx");

afterEach(cleanup);

describe("ResizableSplit onLayoutCommit", () => {
  it("reports a drag and ignores a layout the library chose", () => {
    const onLayoutCommit = vi.fn();
    render(<ResizableSplit id="s" onLayoutCommit={onLayoutCommit} children={null} />);
    changed!({ a: 50, b: 50 }, { isUserInteraction: false });
    changed!({ a: 30, b: 70 }, { isUserInteraction: true });
    expect(onLayoutCommit.mock.calls).toEqual([[{ a: 30, b: 70 }]]);
  });
});
