// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { GitCommitHorizontal } from "lucide-react";
import { createRef, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DropdownMenuItem } from "./dropdown-menu.tsx";
import { SplitButton } from "./split-button.tsx";

afterEach(cleanup);

function draw(props: Partial<React.ComponentProps<typeof SplitButton>> = {}) {
  return render(
    <SplitButton
      label="Commit actions"
      menuLabel="More commit actions"
      icon={GitCommitHorizontal}
      menu={<DropdownMenuItem>Commit &amp; push</DropdownMenuItem>}
      {...props}
    >
      Commit
    </SplitButton>,
  );
}

describe("SplitButton", () => {
  it("is a named group of the primary and the menu trigger", () => {
    const onClick = vi.fn();
    draw({ onClick });
    const group = screen.getByRole("group", { name: "Commit actions" });
    expect(group.querySelectorAll("button")).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: "Commit" }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "More commit actions" })).toBeTruthy();
  });

  it("disabledReason turns the primary off with its reason, leaving the menu", () => {
    const onClick = vi.fn();
    draw({ disabledReason: "Nothing staged", onClick });
    fireEvent.click(screen.getByRole("button", { name: "Commit" }));
    expect(onClick).not.toHaveBeenCalled();
    const primary = screen.getByRole("button", { name: "Commit" }) as HTMLButtonElement;
    // Off, but still reachable by keyboard, with the reason as its description.
    expect(primary.getAttribute("aria-disabled")).toBe("true");
    expect(primary.tabIndex).toBe(0);
    expect(primary.title).toBe("Nothing staged");
    const reason = document.getElementById(primary.getAttribute("aria-describedby")!);
    expect(reason?.textContent).toBe("Nothing staged");
    expect(
      (screen.getByRole("button", { name: "More commit actions" }) as HTMLButtonElement).disabled,
    ).toBe(false);
  });

  it("busy holds both halves and swaps in the busy label", () => {
    const onClick = vi.fn();
    draw({ busy: true, busyLabel: "Pushing…", onClick });
    const primary = screen.getByRole("button", { name: /Pushing…/ }) as HTMLButtonElement;
    const trigger = screen.getByRole("button", { name: "More commit actions" });
    // Held, but still focusable, so the button just pressed keeps focus.
    for (const half of [primary, trigger]) {
      expect(half.getAttribute("aria-disabled")).toBe("true");
      expect(half.tabIndex).toBe(0);
    }
    expect(primary.getAttribute("aria-busy")).toBe("true");
    fireEvent.click(primary);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("keeps focus on the primary when a press makes it busy", () => {
    function Harness() {
      const [busy, setBusy] = useState(false);
      return (
        <SplitButton
          label="Commit actions"
          menuLabel="More commit actions"
          menu={null}
          busy={busy}
          busyLabel="Pushing…"
          onClick={() => setBusy(true)}
        >
          Commit
        </SplitButton>
      );
    }
    render(<Harness />);
    const primary = screen.getByRole("button", { name: "Commit" });
    primary.focus();
    fireEvent.click(primary);
    expect(screen.getByRole("button", { name: /Pushing…/ })).toBe(document.activeElement);
  });

  it("keeps the same ref callback across renders", () => {
    const calls: (HTMLDivElement | null)[] = [];
    const ref = (el: HTMLDivElement | null) => {
      calls.push(el);
    };
    const { rerender } = draw({ ref });
    rerender(
      <SplitButton label="Commit actions" menuLabel="More commit actions" menu={null} ref={ref}>
        Commit again
      </SplitButton>,
    );
    expect(calls.filter((el) => el === null)).toHaveLength(0);
  });

  it("forwards ref to the group, for a popover anchored beside the menu", () => {
    const ref = createRef<HTMLDivElement>();
    draw({ ref });
    expect(ref.current?.getAttribute("role")).toBe("group");
  });
});
