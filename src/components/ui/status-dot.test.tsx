// @vitest-environment happy-dom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { StatusDot } from "./status-dot.tsx";

afterEach(cleanup);

const dot = (container: HTMLElement) =>
  container.querySelector<HTMLElement>('[data-slot="status-dot"]')!;

describe("StatusDot", () => {
  it("is a 6px muted disc by default, hidden from assistive tech", () => {
    const { container } = render(<StatusDot />);
    const el = dot(container);
    expect(el.dataset.tone).toBe("neutral");
    expect(el.dataset.size).toBe("sm");
    expect(el.className).toContain("size-1.5");
    expect(el.className).toContain("text-muted-foreground");
    expect(el.className).toContain("bg-current");
    expect(el.getAttribute("aria-hidden")).toBe("true");
    expect(el.hasAttribute("role")).toBe(false);
  });

  it("takes its colour from a token as ink, solid or hollow", () => {
    const { container } = render(<StatusDot tone="success" hollow />);
    const el = dot(container);
    expect(el.className).toContain("text-success");
    expect(el.className).toContain("border-current");
    expect(el.className).not.toContain("bg-current");
  });

  it("maps every size onto the spacing scale", () => {
    const sizes = { xs: "size-1", sm: "size-1.5", md: "size-2", lg: "size-2.5" } as const;
    for (const [size, cls] of Object.entries(sizes)) {
      const { container } = render(<StatusDot size={size as keyof typeof sizes} />);
      expect(dot(container).className.split(" ")).toContain(cls);
      cleanup();
    }
  });

  it("rings itself in the surface it sits on", () => {
    const { container } = render(<StatusDot cutout="popover" />);
    expect(dot(container).className).toContain("ring-popover");
  });

  it("names itself when it carries the state alone", () => {
    render(<StatusDot tone="warning" label="Away" />);
    const el = screen.getByRole("img", { name: "Away" });
    expect(el.hasAttribute("aria-hidden")).toBe(false);
  });

  it("treats a passed aria-label as the name too", () => {
    render(<StatusDot aria-label="Offline" />);
    expect(screen.getByRole("img", { name: "Offline" })).toBeTruthy();
  });
});
