import { describe, expect, it } from "vitest";

import {
  menuContentVariants,
  menuItemVariants,
  menuLabelVariants,
  menuShortcutVariants,
} from "./menu-variants.ts";

const classes = (s: string) => s.split(/\s+/);

describe("menu recipes", () => {
  it("item: focus highlights by default, active reads data-active instead", () => {
    const focus = classes(menuItemVariants());
    expect(focus).toContain("focus:bg-element-hover");
    expect(focus).toContain("data-[variant=destructive]:focus:text-error");
    expect(focus.some((c) => c.startsWith("data-active:"))).toBe(false);

    const active = classes(menuItemVariants({ highlight: "active" }));
    expect(active).toContain("data-active:bg-element-hover");
    expect(active).toContain("data-active:text-foreground");
    expect(active).toContain("data-[variant=destructive]:data-active:text-error");
    expect(active.some((c) => c.startsWith("focus:"))).toBe(false);
  });

  it("item: the rest of the row is the same either way", () => {
    const strip = (s: string) =>
      classes(s).filter((c) => !c.includes("focus:") && !c.includes("data-active:"));
    expect(strip(menuItemVariants({ highlight: "active" }))).toEqual(strip(menuItemVariants()));
  });

  it("content: motion false drops the scale-in and the exit, keeps the surface", () => {
    const still = menuContentVariants({ motion: false });
    expect(still).not.toContain("animate-scale-in");
    expect(still).not.toContain("data-ending-style");
    expect(classes(still)).toEqual(
      expect.arrayContaining(["bg-popover", "shadow-md", "rounded-lg"]),
    );
    expect(menuContentVariants()).toContain("animate-scale-in");
  });

  it("shortcut brightens with its row's highlight", () => {
    expect(menuShortcutVariants()).toContain("group-focus/dropdown-menu-item:");
    expect(menuShortcutVariants({ highlight: "active" })).toContain(
      "group-data-active/dropdown-menu-item:text-secondary-foreground",
    );
  });

  it("composes className last, so a caller's width wins", () => {
    expect(classes(menuContentVariants({ className: "min-w-[280px]" }))).not.toContain(
      "min-w-[11rem]",
    );
    expect(menuLabelVariants({ className: "px-3" })).not.toMatch(/\bpx-2\b/);
  });
});
