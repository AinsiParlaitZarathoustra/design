// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { highlightRanges, type TerminalLine } from "./code-surface.ts";
import { TerminalCommandInput } from "./command-input.tsx";
import { EditorBreadcrumbs } from "./editor-breadcrumbs.tsx";
import { FindBar } from "./find-bar.tsx";
import { TerminalBlock, TerminalOutput } from "./terminal-block.tsx";
import { TerminalStopControl } from "./terminal-stop-control.tsx";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("EditorBreadcrumbs", () => {
  it("renders nothing for no segments", () => {
    const { container } = render(<EditorBreadcrumbs segments={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("folds the middle, titles the ellipsis and the path, and marks unsaved", () => {
    const segments = ["src", "features", "editor", "lib", "file-path.ts"];
    const { container } = render(<EditorBreadcrumbs segments={segments} dirty />);
    expect(screen.getByRole("navigation").getAttribute("title")).toBe(segments.join("/"));
    expect(container.querySelector('[title="features/editor"]')).not.toBeNull();
    expect(screen.queryByText("features")).toBeNull();
    expect(screen.getByRole("img", { name: "Unsaved changes" })).toBeTruthy();
  });

  it("makes folders buttons with onSelect, never the file", () => {
    const onSelect = vi.fn();
    render(<EditorBreadcrumbs segments={["src", "app.tsx"]} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "src" }));
    expect(onSelect).toHaveBeenCalledWith(0);
    expect(screen.queryByRole("button", { name: "app.tsx" })).toBeNull();
  });
});

describe("FindBar", () => {
  const base = { onQueryChange: () => {}, onNext: vi.fn(), onPrevious: vi.fn(), onClose: vi.fn() };

  it("steps with Enter and Shift+Enter and closes with Escape", () => {
    const props = { ...base, onNext: vi.fn(), onPrevious: vi.fn(), onClose: vi.fn() };
    render(<FindBar {...props} query="foo" matchCount={3} matchIndex={0} />);
    const input = screen.getByRole("textbox", { name: "Find" });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.keyDown(input, { key: "Enter", shiftKey: true });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(props.onNext).toHaveBeenCalledTimes(1);
    expect(props.onPrevious).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["", 3, null, ""],
    ["foo", undefined, null, ""],
    ["foo", 0, null, "No results"],
    ["foo", 12, 2, "3 of 12"],
    ["foo", 12, null, "12 results"],
  ] as const)("counts %j / %j / %j as %j", (query, matchCount, matchIndex, label) => {
    const { container } = render(
      <FindBar {...base} query={query} matchCount={matchCount} matchIndex={matchIndex} />,
    );
    expect(container.querySelector("[aria-live]")!.textContent).toBe(label);
  });

  it("shows the toggles only with onToggle", () => {
    const { rerender } = render(<FindBar {...base} query="" />);
    expect(screen.queryByRole("button", { name: "Match case" })).toBeNull();
    const onToggle = vi.fn();
    rerender(<FindBar {...base} query="" onToggle={onToggle} regexp />);
    expect(
      screen.getByRole("button", { name: "Use regular expression" }).getAttribute("aria-pressed"),
    ).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Match whole word" }));
    expect(onToggle).toHaveBeenCalledWith("wholeWord", true);
  });

  it("selects all with Alt+Enter, not with nothing to select", () => {
    const onSelectAll = vi.fn();
    const { rerender } = render(
      <FindBar {...base} query="foo" matchCount={0} onSelectAll={onSelectAll} />,
    );
    fireEvent.keyDown(screen.getByRole("textbox", { name: "Find" }), {
      key: "Enter",
      altKey: true,
    });
    expect(onSelectAll).not.toHaveBeenCalled();
    rerender(<FindBar {...base} query="foo" matchCount={2} onSelectAll={onSelectAll} />);
    fireEvent.keyDown(screen.getByRole("textbox", { name: "Find" }), {
      key: "Enter",
      altKey: true,
    });
    expect(onSelectAll).toHaveBeenCalledTimes(1);
  });

  it("replaces with Enter and replaces all with Mod+Alt+Enter", () => {
    const onReplace = vi.fn();
    const onReplaceAll = vi.fn();
    render(
      <FindBar
        {...base}
        query="foo"
        matchCount={2}
        onReplaceChange={() => {}}
        replaceOpen
        onReplace={onReplace}
        onReplaceAll={onReplaceAll}
      />,
    );
    const field = screen.getByRole("textbox", { name: "Replace" });
    fireEvent.keyDown(field, { key: "Enter" });
    fireEvent.keyDown(field, { key: "Enter", altKey: true, metaKey: true });
    expect(onReplace).toHaveBeenCalledTimes(1);
    expect(onReplaceAll).toHaveBeenCalledTimes(1);
  });

  it("marks an invalid query", () => {
    render(<FindBar {...base} query="(" invalid />);
    expect(screen.getByRole("textbox", { name: "Find" }).getAttribute("aria-invalid")).toBe("true");
  });
});

describe("TerminalBlock", () => {
  it("renders nothing without a command, output or footer", () => {
    const { container } = render(<TerminalBlock running />);
    expect(container.innerHTML).toBe("");
  });

  it("collapses from the command and reports its state", () => {
    render(
      <TerminalBlock command="ls" running={false} exitCode={2} durationMs={1200}>
        <p>out</p>
      </TerminalBlock>,
    );
    const block = document.querySelector('[data-slot="terminal-block"]')!;
    expect(block.getAttribute("data-state")).toBe("failed");
    expect(screen.getByText("exit 2")).toBeTruthy();
    expect(screen.getByText("1.2s")).toBeTruthy();
    const command = screen.getByRole("button", { name: "ls" });
    expect(command.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(command);
    expect(command.getAttribute("aria-expanded")).toBe("false");
    expect(screen.getByText("out").closest("[hidden]")).not.toBeNull();
  });

  it("keeps the footer while collapsed, and skips layout only when finished", () => {
    const { rerender } = render(
      <TerminalBlock command="sudo ls" running defaultCollapsed footer={<p>password</p>} />,
    );
    expect(screen.getByText("password").closest("[hidden]")).toBeNull();
    const block = () => document.querySelector<HTMLElement>('[data-slot="terminal-block"]')!;
    expect(block().style.contentVisibility).toBe("");
    rerender(<TerminalBlock command="sudo ls" running={false} footer={<p>password</p>} />);
    expect(block().style.contentVisibility).toBe("auto");
  });

  it("confirms a copy for 1.2s, restarting on a second copy", () => {
    vi.useFakeTimers();
    const onCopy = vi.fn();
    render(<TerminalBlock command="ls" running={false} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy output" }));
    act(() => vi.advanceTimersByTime(1000));
    fireEvent.click(screen.getByRole("button", { name: "Copied" }));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole("button", { name: "Copied" })).toBeTruthy();
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByRole("button", { name: "Copy output" })).toBeTruthy();
    expect(onCopy).toHaveBeenCalledTimes(2);
  });

  it("marks matches in the command, keeping the plain command as its title", () => {
    render(<TerminalBlock command="git status" running={false} commandHighlight="stat" />);
    const command = screen.getByTitle("git status");
    expect(command.querySelector("mark[data-term-match]")!.textContent).toBe("stat");
  });
});

describe("TerminalOutput", () => {
  const url = "http://localhost:5173/";
  const lines: TerminalLine[] = [
    {
      id: "a",
      segments: [
        { text: "Local: " },
        { text: "http://localhost:", kind: "url", target: url },
        { text: "5173/", kind: "url", target: url },
      ],
    },
    { id: "b", segments: [] },
  ];

  it("opens links only on a modified click, and only with a handler", () => {
    const onLinkActivate = vi.fn();
    render(<TerminalOutput lines={lines} onLinkActivate={onLinkActivate} />);
    const second = screen.getByText("5173/");
    fireEvent.click(second);
    expect(onLinkActivate).not.toHaveBeenCalled();
    fireEvent.click(second, { metaKey: true });
    fireEvent.click(screen.getByText("http://localhost:"), { ctrlKey: true });
    expect(onLinkActivate.mock.calls).toEqual([
      [url, "url"],
      [url, "url"],
    ]);
  });

  it("renders links as plain text without a handler", () => {
    render(<TerminalOutput lines={lines} />);
    const span = screen.getByText("5173/");
    expect(span.getAttribute("title")).toBeNull();
    expect(span.className).not.toContain("cursor-pointer");
  });

  it("gives an empty line its height", () => {
    const { container } = render(<TerminalOutput lines={lines} />);
    expect(container.querySelectorAll('[data-slot="terminal-output"] > div')[1]!.textContent).toBe(
      "​",
    );
  });

  it("splits text and marks every match", () => {
    const text = "Src src\nSRC";
    const { container } = render(<TerminalOutput text={text} highlight="src" />);
    const expected = text.split("\n").reduce((n, l) => n + highlightRanges(l, "src").length, 0);
    expect(container.querySelectorAll("mark[data-term-match]")).toHaveLength(expected);
  });

  it("prepares each line once per identity", () => {
    const prepare = vi.fn((s: TerminalLine["segments"]) => s);
    const first: TerminalLine[] = [
      { id: 1, segments: [{ text: "one" }] },
      { id: 2, segments: [{ text: "two" }] },
    ];
    const { rerender } = render(<TerminalOutput lines={first} prepareSegments={prepare} />);
    expect(prepare).toHaveBeenCalledTimes(2);
    rerender(
      <TerminalOutput
        lines={[...first, { id: 3, segments: [{ text: "three" }] }]}
        prepareSegments={prepare}
      />,
    );
    expect(prepare).toHaveBeenCalledTimes(3);
  });
});

describe("TerminalCommandInput", () => {
  it("picks its placeholder from busy and raw mode", () => {
    const { rerender } = render(<TerminalCommandInput value="" onValueChange={() => {}} />);
    const field = () => screen.getByRole("textbox", { name: "Command" });
    expect(field().getAttribute("placeholder")).toBe("Run a command…");
    rerender(<TerminalCommandInput value="" onValueChange={() => {}} busy />);
    expect(field().getAttribute("placeholder")).toBe("Type a response, then press Enter…");
    rerender(<TerminalCommandInput value="" onValueChange={() => {}} busy rawMode />);
    expect(field().getAttribute("placeholder")).toBe(
      "Interactive prompt — keys go straight to it…",
    );
  });

  it("points at its suggestions, and a press on one keeps the field focused", () => {
    const onSelect = vi.fn();
    render(
      <TerminalCommandInput
        value="cd sr"
        onValueChange={() => {}}
        suggestions={{
          id: "sugg",
          open: true,
          items: [
            { name: "src", kind: "dir" },
            { name: "scripts", kind: "dir" },
          ],
          activeIndex: 1,
          onSelect,
          onOpenChange: () => {},
        }}
      />,
    );
    const field = screen.getByRole("textbox", { name: "Command" });
    field.focus();
    expect(field.getAttribute("aria-controls")).toBe("sugg");
    expect(field.getAttribute("aria-activedescendant")).toBe("sugg-option-1");
    const option = screen.getByRole("option", { name: "src/" });
    const press = fireEvent.mouseDown(option);
    expect(press).toBe(false);
    expect(onSelect).toHaveBeenCalledWith({ name: "src", kind: "dir" });
    expect(document.activeElement).toBe(field);
  });
});

describe("TerminalStopControl", () => {
  it("interrupts, waits, then offers a force stop", () => {
    vi.useFakeTimers();
    const onInterrupt = vi.fn();
    render(
      <TerminalStopControl
        active
        onInterrupt={onInterrupt}
        onForceStop={async () => true}
        onForceStopped={() => {}}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Stop process (Ctrl+C)" }));
    expect(onInterrupt).toHaveBeenCalledTimes(1);
    expect(
      (screen.getByRole("button", { name: "Waiting for process to stop" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    act(() => vi.advanceTimersByTime(1500));
    expect(screen.getByRole("button", { name: "Force stop process" })).toBeTruthy();
  });

  it("renders nothing when no process runs", () => {
    const { container } = render(
      <TerminalStopControl
        active={false}
        onInterrupt={() => {}}
        onForceStop={async () => true}
        onForceStopped={() => {}}
      />,
    );
    expect(container.innerHTML).toBe("");
  });
});
