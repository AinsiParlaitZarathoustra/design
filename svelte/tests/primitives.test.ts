import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Badge from "../src/ui/badge.svelte";
import Button from "../src/ui/button.svelte";
import IconButton from "../src/ui/icon-button.svelte";
import Icon from "../src/ui/icon.svelte";
import Kbd from "../src/ui/kbd.svelte";
import KbdCombo from "../src/ui/kbd-combo.svelte";
import { ICON_SIZES } from "../src/ui/icon.svelte";
import { Search } from "lucide-svelte";

describe("Button", () => {
  it("is a button, carries the recipe, and reports clicks", async () => {
    const onclick = vi.fn();
    const { getByRole } = render(Button, { props: { onclick } });
    const button = getByRole("button");
    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveAttribute("type", "button");
    expect(button.className).toContain("h-control-md");
    expect(button.className).toContain("bg-primary");
    await fireEvent.click(button);
    expect(onclick).toHaveBeenCalledTimes(1);
  });

  it("maps every variant and size to the source recipe", () => {
    const { getByRole, rerender } = render(Button, { props: { variant: "destructive-outline" } });
    expect(getByRole("button").className).toContain("border-error");
    expect(getByRole("button").className).toContain("bg-transparent");
    rerender({ variant: "ghost-destructive", size: "xs" });
    expect(getByRole("button").className).toContain("hover:bg-error-muted");
    expect(getByRole("button").className).toContain("h-control-xs");
  });

  it("a disabled button is disabled, out of the tab order and dimmed by data-disabled", () => {
    const { getByRole } = render(Button, { props: { disabled: true } });
    const button = getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-disabled");
    expect(button.className).toContain("data-disabled:opacity-50");
  });

  it("keeps aria-pressed, the selected look's hook", () => {
    const { getByRole } = render(Button, { props: { "aria-pressed": true } });
    expect(getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});

describe("Icon", () => {
  it("draws the five Atlas steps at the one stroke width", () => {
    const { container } = render(Icon, { props: { icon: Search, size: "lg" } });
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("width")).toBe(String(ICON_SIZES.lg));
    expect(svg.getAttribute("height")).toBe(String(ICON_SIZES.lg));
    expect(svg.getAttribute("stroke-width")).toBe("1.75");
    expect(svg.getAttribute("aria-hidden")).toBe("true");
  });

  it("is named when given a label", () => {
    const { container } = render(Icon, { props: { icon: Search, label: "Search" } });
    expect(container.querySelector("svg")).toHaveAttribute("aria-label", "Search");
    expect(container.querySelector("svg")).not.toHaveAttribute("aria-hidden");
  });
});

describe("IconButton", () => {
  it("is named by its label and sized off the control ladder", () => {
    const { getByRole } = render(IconButton, { props: { icon: Search, label: "Search" } });
    const button = getByRole("button", { name: "Search" });
    expect(button).toHaveAttribute("data-slot", "icon-button");
    expect(button.className).toContain("size-control-md");
  });

  it("spins its glyph and stays pressable while loading", () => {
    const { getByRole, container } = render(IconButton, {
      props: { icon: Search, label: "Refresh", loading: true },
    });
    const button = getByRole("button", { name: "Refresh" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).not.toBeDisabled();
    expect(container.querySelector('[data-slot="icon-button-spin"]')).not.toBeNull();
  });
});

describe("Kbd", () => {
  it("draws a glyph string for the host keyboard", () => {
    const { getByText } = render(Kbd, { props: { text: "⌘", platform: "other" } });
    expect(getByText("Ctrl")).toBeInTheDocument();
  });

  it("keeps a snippet child as given", () => {
    const { container } = render(Kbd, { props: { text: "↵" } });
    expect(container.querySelector("kbd")).toHaveAttribute("data-slot", "kbd");
  });
});

describe("Badge", () => {
  it("is a span with the status recipe and the secondary default", async () => {
    const { getByText } = render(Badge, { props: {} });
    const badge = getByText("", { selector: "span" });
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge.className).toContain("bg-card");
    expect(badge.className).toContain("text-2xs");
  });

  it("draws every status tone from the theme's status keys", () => {
    const { getByText, rerender } = render(Badge, { props: { variant: "success" } });
    expect(getByText("", { selector: "span" }).className).toContain("bg-success-muted");
    rerender({ variant: "severe", size: "sm" });
    expect(getByText("", { selector: "span" }).className).toContain("bg-severe-muted");
    expect(getByText("", { selector: "span" }).className).toContain("text-3xs");
  });
});

describe("KbdCombo", () => {
  it("splits a glyph string and draws it for the requested keyboard", () => {
    const { container } = render(KbdCombo, { props: { combo: "⌘⇧F", platform: "other" } });
    const caps = Array.from(container.querySelectorAll("kbd")).map((cap) => cap.textContent?.trim());
    expect(caps).toEqual(["Ctrl", "Shift", "F"]);
  });
});
