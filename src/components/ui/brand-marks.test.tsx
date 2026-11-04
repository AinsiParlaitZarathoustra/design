// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  ClaudeCodeMark,
  ClaudeMark,
  CodexMark,
  CursorAgentMark,
  CursorMark,
  GeminiMark,
  GoogleMark,
  JetBrainsMark,
  KiloMark,
  OpenAIMark,
  OpenCodeMark,
  ZedMark,
} from "./brand-marks.tsx";

afterEach(cleanup);

const NAMED = [
  [ClaudeCodeMark, "Claude Code"],
  [CodexMark, "Codex"],
  [OpenCodeMark, "OpenCode"],
  [CursorAgentMark, "Cursor"],
  [KiloMark, "Kilo"],
  [ZedMark, "Zed"],
  [JetBrainsMark, "JetBrains"],
] as const;

const MODEL = [ClaudeMark, OpenAIMark, GeminiMark, CursorMark] as const;

describe("brand marks", () => {
  it("each renders exactly one svg", () => {
    for (const Mark of [...NAMED.map(([m]) => m), ...MODEL]) {
      const { container } = render(<Mark />);
      expect(container.querySelectorAll("svg")).toHaveLength(1);
      cleanup();
    }
  });

  it("agent and editor marks name themselves by default", () => {
    for (const [Mark, name] of NAMED) {
      const { container } = render(<Mark />);
      const svg = container.querySelector("svg")!;
      expect(svg.getAttribute("role")).toBe("img");
      expect(svg.hasAttribute("aria-hidden")).toBe(false);
      expect(svg.firstElementChild?.tagName.toLowerCase()).toBe("title");
      expect(svg.firstElementChild?.textContent).toBe(name);
      cleanup();
    }
  });

  it("Kilo's mark is Kilo Code's published logo, not the placeholder K", () => {
    const { container } = render(<KiloMark />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("viewBox")).toBe("0 0 100 100");
    expect(svg.getAttribute("fill")).toBe("currentColor");
    // The frame the logo is drawn in, then the KILO monogram inside it.
    expect(svg.querySelector("path")!.getAttribute("d")).toMatch(/^M0,0v100h100V0H0Z/);
  });

  it('title="" makes a mark decorative', () => {
    const { container } = render(<ClaudeCodeMark title="" />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.hasAttribute("role")).toBe(false);
    expect(svg.querySelector("title")).toBeNull();
  });

  it("a custom title replaces the brand name", () => {
    const { container } = render(<CodexMark title="Codex (beta)" />);
    expect(container.querySelector("title")?.textContent).toBe("Codex (beta)");
  });

  it("model marks stay decorative", () => {
    for (const Mark of MODEL) {
      const { container } = render(<Mark />);
      expect(container.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
      expect(container.querySelector("title")).toBeNull();
      cleanup();
    }
  });

  it("a model or Google mark given a title names itself", () => {
    for (const [Mark, name] of [
      [ClaudeMark, "Claude"],
      [OpenAIMark, "OpenAI"],
      [GeminiMark, "Gemini"],
      [GoogleMark, "Google"],
    ] as const) {
      const { container } = render(<Mark title={name} />);
      const svg = container.querySelector("svg")!;
      expect(svg.getAttribute("role")).toBe("img");
      expect(svg.hasAttribute("aria-hidden")).toBe(false);
      expect(svg.hasAttribute("title")).toBe(false);
      expect(svg.firstElementChild?.tagName.toLowerCase()).toBe("title");
      expect(svg.firstElementChild?.textContent).toBe(name);
      cleanup();
    }
  });

  it('a model mark with title="" stays decorative', () => {
    const { container } = render(<OpenAIMark title="" />);
    expect(container.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
    expect(container.querySelector("title")).toBeNull();
  });

  it("two Gemini stars never share a gradient id", () => {
    const { container } = render(
      <>
        <GeminiMark />
        <GeminiMark />
      </>,
    );
    const svgs = [...container.querySelectorAll("svg")];
    const ids = svgs.flatMap((svg) => [...svg.querySelectorAll("linearGradient")].map((g) => g.id));
    expect(ids).toHaveLength(6);
    expect(new Set(ids).size).toBe(6);
    for (const svg of svgs) {
      for (const path of svg.querySelectorAll("path[fill^='url(']")) {
        const ref = path.getAttribute("fill")!.slice(5, -1);
        expect(svg.querySelector(`[id="${ref}"]`)).not.toBeNull();
      }
    }
  });

  it("className lands on the svg, after the defaults", () => {
    const { container } = render(<ZedMark className="size-6" />);
    expect(container.querySelector("svg")!.getAttribute("class")).toBe("shrink-0 size-6");
  });

  it("Cursor's agent cube keeps its own viewBox", () => {
    const { container } = render(<CursorAgentMark />);
    expect(container.querySelector("svg")!.getAttribute("viewBox")).toBe("0 0 466.73 533.32");
  });
});
