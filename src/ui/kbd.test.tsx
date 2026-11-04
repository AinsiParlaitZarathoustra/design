// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { detectKeyPlatform, platformKey, platformKeys } from "../lib/combo.ts";
import { Kbd, KbdCombo, KbdKeys } from "./kbd.tsx";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const caps = (root: HTMLElement) =>
  [...root.querySelectorAll('[data-slot="kbd"]')].map((k) => k.textContent);

describe("platformKeys", () => {
  it("leaves a Mac's keys as written", () => {
    expect(platformKeys(["⌘", "⇧", "F"], "mac")).toEqual(["⌘", "⇧", "F"]);
  });

  it("spells modifiers out elsewhere, in Ctrl, Alt, Shift order", () => {
    expect(platformKeys(["⌘", "K"], "other")).toEqual(["Ctrl", "K"]);
    expect(platformKeys(["⌥", "Space"], "other")).toEqual(["Alt", "Space"]);
    expect(platformKeys(["⇧", "⌥", "⌘", "C"], "other")).toEqual(["Ctrl", "Alt", "Shift", "C"]);
  });

  it("reads ⌃⌘ as Ctrl Win, as desktop's displayKeys does", () => {
    expect(platformKeys(["⌃", "⌘", "Q"], "other")).toEqual(["Ctrl", "Win", "Q"]);
  });

  it("passes words through", () => {
    expect(platformKeys(["Ctrl", "Shift", "P"], "other")).toEqual(["Ctrl", "Shift", "P"]);
    expect(platformKey("Enter", "other")).toBe("Enter");
    expect(platformKey("⌥", "other")).toBe("Alt");
  });
});

describe("detectKeyPlatform", () => {
  it("knows a Mac from its platform string", () => {
    vi.stubGlobal("navigator", { platform: "MacIntel", userAgent: "" });
    expect(detectKeyPlatform()).toBe("mac");
  });

  it("calls anything else other", () => {
    vi.stubGlobal("navigator", { platform: "Win32", userAgent: "" });
    expect(detectKeyPlatform()).toBe("other");
    vi.stubGlobal("navigator", { platform: "Linux x86_64", userAgent: "" });
    expect(detectKeyPlatform()).toBe("other");
  });
});

describe("Kbd platform", () => {
  it("maps a glyph cap and a combo when told the platform", () => {
    const { container } = render(
      <>
        <Kbd platform="other">⌘</Kbd>
        <KbdCombo combo="⌥⌘C" platform="other" />
        <KbdKeys keys={["⌘", "B"]} platform="mac" />
      </>,
    );
    expect(caps(container)).toEqual(["Ctrl", "Ctrl", "Alt", "C", "⌘", "B"]);
  });

  it("detects the platform when it is unset", () => {
    vi.stubGlobal("navigator", { platform: "Win32", userAgent: "" });
    const { container } = render(<KbdCombo combo="⌘K" />);
    expect(caps(container)).toEqual(["Ctrl", "K"]);
  });
});
