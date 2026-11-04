// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { AtlasBadge } from "./atlas-mark.tsx";

afterEach(cleanup);

describe("AtlasBadge tone", () => {
  it("inks the tile with the theme by default, as before", () => {
    const tile = render(<AtlasBadge />).container.firstElementChild!;
    expect(tile.className).toBe(
      "flex size-8 items-center justify-center rounded-lg bg-foreground text-background",
    );
    expect(tile.hasAttribute("data-tone")).toBe(false);
  });

  it("app-icon: a black tile with a white mark, replacing the theme ink", () => {
    const tile = render(<AtlasBadge tone="app-icon" />).container.firstElementChild!;
    const classes = tile.className.split(" ");
    // ratchet-allow: asserting the app icon's fixed tile classes, which the component carries.
    expect(classes).toEqual(expect.arrayContaining(["bg-black", "text-white"]));
    expect(classes).not.toContain("bg-foreground");
    expect(classes).not.toContain("text-background");
    expect(tile.getAttribute("data-tone")).toBe("app-icon");
  });
});
