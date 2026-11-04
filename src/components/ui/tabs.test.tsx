// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs.tsx";

afterEach(cleanup);

function Range({ variant, size }: { variant?: "segmented" | "line"; size?: "sm" | "md" }) {
  return (
    <Tabs defaultValue="1d">
      <TabsList variant={variant} size={size} aria-label="Range">
        <TabsTrigger value="1d">1d</TabsTrigger>
        <TabsTrigger value="7d">7d</TabsTrigger>
      </TabsList>
      <TabsContent value="1d">One day</TabsContent>
      <TabsContent value="7d">Seven days</TabsContent>
    </Tabs>
  );
}

describe("Tabs, segmented", () => {
  it("keeps tab semantics: a tablist of tabs that own panels", () => {
    render(<Range />);
    expect(screen.getByRole("tablist", { name: "Range" })).toBeTruthy();
    const week = screen.getByRole("tab", { name: "7d" });
    expect(screen.getByRole("tab", { name: "1d" }).getAttribute("aria-selected")).toBe("true");
    fireEvent.click(week);
    expect(week.getAttribute("aria-selected")).toBe("true");
    const panel = document.getElementById(week.getAttribute("aria-controls")!);
    expect(panel?.textContent).toBe("Seven days");
  });

  it("is the default, md, with a thumb behind the tabs", () => {
    const { container } = render(<Range />);
    const list = screen.getByRole("tablist");
    expect(list.dataset.variant).toBe("segmented");
    expect(list.dataset.size).toBe("md");
    const thumb = container.querySelector('[data-slot="tabs-indicator"]');
    expect(thumb).not.toBeNull();
    // First, so the positioned tabs paint over it.
    expect(list.firstElementChild).toBe(thumb);
  });

  it("takes Segmented's small size", () => {
    render(<Range size="sm" />);
    expect(screen.getByRole("tablist").dataset.size).toBe("sm");
  });

  it("draws no thumb and carries no size on a line rail", () => {
    const { container } = render(<Range variant="line" size="sm" />);
    expect(container.querySelector('[data-slot="tabs-indicator"]')).toBeNull();
    expect(screen.getByRole("tablist").hasAttribute("data-size")).toBe(false);
  });
});
