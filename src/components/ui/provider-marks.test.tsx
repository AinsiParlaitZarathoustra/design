// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import * as marks from "./provider-marks.tsx";

afterEach(cleanup);

/** Each mark and the brand name it titles itself with (Lobe Icons' `TITLE`). */
const TITLES: Record<string, string> = {
  AI21Mark: "AI21",
  AnthropicMark: "Anthropic",
  AzureMark: "Azure",
  CerebrasMark: "Cerebras",
  CohereMark: "Cohere",
  DeepInfraMark: "DeepInfra",
  DeepSeekMark: "DeepSeek",
  ElevenLabsMark: "ElevenLabs",
  FireworksMark: "Fireworks",
  GroqMark: "Groq",
  HuggingFaceMark: "HuggingFace",
  JinaMark: "Jina",
  KimiMark: "Kimi",
  MetaMark: "Meta",
  MistralMark: "Mistral",
  OpenRouterMark: "OpenRouter",
  PerplexityMark: "Perplexity",
  QwenMark: "Qwen",
  ReplicateMark: "Replicate",
  TogetherMark: "together.ai",
  VoyageMark: "Voyage",
  XAIMark: "Grok",
  ZhipuMark: "Zhipu",
};

const MONO = [
  "AnthropicMark",
  "XAIMark",
  "AI21Mark",
  "GroqMark",
  "ReplicateMark",
  "OpenRouterMark",
  "JinaMark",
  "ElevenLabsMark",
];

const all = Object.entries(marks) as [string, (p: Record<string, unknown>) => React.ReactNode][];

describe("provider marks", () => {
  it("exports exactly the provider marks", () => {
    expect(Object.keys(marks).sort()).toEqual(Object.keys(TITLES).sort());
  });

  it("each is one 24×24 svg with path data, titled with its brand name", () => {
    for (const [name, Mark] of all) {
      const { container } = render(<Mark />);
      const svgs = container.querySelectorAll("svg");
      expect(svgs, name).toHaveLength(1);
      const svg = svgs[0]!;
      expect(svg.getAttribute("viewBox"), name).toBe("0 0 24 24");
      expect(svg.getAttribute("width"), name).toBe("16");
      expect(svg.getAttribute("role"), name).toBe("img");
      expect(svg.hasAttribute("aria-hidden"), name).toBe(false);
      expect(svg.firstElementChild?.tagName.toLowerCase(), name).toBe("title");
      expect(svg.firstElementChild?.textContent, name).toBe(TITLES[name]);
      const paths = [...svg.querySelectorAll("path")];
      expect(paths.length, name).toBeGreaterThan(0);
      expect(
        paths.every((p) => (p.getAttribute("d") ?? "").length > 0),
        name,
      ).toBe(true);
      cleanup();
    }
  });

  it('title="" makes each one decorative', () => {
    for (const [name, Mark] of all) {
      const { container } = render(<Mark title="" />);
      const svg = container.querySelector("svg")!;
      expect(svg.getAttribute("aria-hidden"), name).toBe("true");
      expect(svg.querySelector("title"), name).toBeNull();
      cleanup();
    }
  });

  it("className and size overrides land on the svg", () => {
    const { container } = render(<marks.GroqMark className="size-6" width={22} />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("class")).toContain("size-6");
    expect(svg.getAttribute("width")).toBe("22");
  });

  it("two Azure marks keep their gradients apart", () => {
    const { container } = render(
      <>
        <marks.AzureMark />
        <marks.AzureMark />
      </>,
    );
    const svgs = [...container.querySelectorAll("svg")];
    const ids = svgs.flatMap((svg) => [...svg.querySelectorAll("linearGradient")].map((g) => g.id));
    expect(ids).toHaveLength(6);
    expect(new Set(ids).size).toBe(6);
    for (const svg of svgs) {
      const refs = [...svg.querySelectorAll("path[fill^='url(']")].map((p) =>
        p.getAttribute("fill")!.slice(5, -1),
      );
      expect(refs).toHaveLength(3);
      for (const ref of refs) expect(svg.querySelector(`[id="${ref}"]`)).not.toBeNull();
    }
  });

  it("Mono marks take currentColor", () => {
    for (const name of MONO) {
      const Mark = marks[name as keyof typeof marks];
      const { container } = render(<Mark />);
      expect(container.querySelector("svg")!.getAttribute("fill"), name).toBe("currentColor");
      cleanup();
    }
  });
});
