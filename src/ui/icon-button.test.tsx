// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { RefreshCw } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { IconButton } from "./icon-button.tsx";

afterEach(cleanup);

describe("IconButton loading", () => {
  it("turns its glyph and is busy, but stays pressable", () => {
    const onClick = vi.fn();
    render(<IconButton icon={RefreshCw} label="Refresh" loading onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Refresh" });
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(button.hasAttribute("data-loading")).toBe(true);
    expect(button.querySelector('[data-slot="icon-button-spin"].animate-spin svg')).not.toBeNull();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("draws the glyph straight into the button when not loading", () => {
    render(<IconButton icon={RefreshCw} label="Refresh" />);
    const button = screen.getByRole("button", { name: "Refresh" });
    expect(button.hasAttribute("aria-busy")).toBe(false);
    expect(button.hasAttribute("data-loading")).toBe(false);
    expect(button.firstElementChild?.tagName.toLowerCase()).toBe("svg");
  });
});
