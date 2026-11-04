// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ModelBadge, ModelMark, familyOf, type ModelFamily } from "./model-badge.tsx";

afterEach(cleanup);

const FAMILIES: ModelFamily[] = ["claude", "openai", "gemini", "cursor", "opencode"];

describe("ModelBadge", () => {
  it("is the 18px inline chip at size 2xs, and unmarked at the default", () => {
    const { container, rerender } = render(<ModelBadge model="claude-opus-4" />);
    const badge = () => container.querySelector<HTMLElement>('[data-slot="model-badge"]')!;
    expect(badge().hasAttribute("data-size")).toBe(false);
    expect(badge().className).toContain("h-control-xs");
    rerender(<ModelBadge model="claude-opus-4" size="2xs" />);
    expect(badge().dataset.size).toBe("2xs");
    expect(badge().className).toContain("h-control-2xs");
    expect(badge().className).not.toContain("h-control-xs ");
  });

  it("draws every family inline, never as an image", () => {
    for (const family of FAMILIES) {
      const { container } = render(<ModelMark family={family} />);
      expect(container.querySelector("img")).toBeNull();
      expect(container.querySelectorAll("svg")).toHaveLength(1);
      expect(container.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
      cleanup();
    }
  });

  it("guesses the family from the model name", () => {
    expect(familyOf("claude-sonnet-4")).toBe("claude");
    expect(familyOf("mystery-1")).toBeNull();
  });

  it("guesses when no family is passed", () => {
    const { container } = render(<ModelBadge model="claude-opus-4" />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("an explicit family wins over the guess", () => {
    const { container } = render(<ModelBadge model="mystery-1" family="gemini" />);
    expect(container.querySelector("svg linearGradient")).not.toBeNull();
    expect(container.textContent).toBe("mystery-1");
  });

  it("family={null} draws no mark", () => {
    const { container } = render(<ModelBadge model="claude-opus" family={null} />);
    expect(container.querySelector("svg")).toBeNull();
    expect(container.textContent).toBe("claude-opus");
  });
});
