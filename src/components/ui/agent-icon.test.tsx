// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { AgentMonogram, ExternalAgentMark, monogramTextClass } from "./agent-icon.tsx";

afterEach(cleanup);

const svgUrl = (svg: string) => `data:image/svg+xml;base64,${btoa(svg)}`;

describe("ExternalAgentMark", () => {
  it("draws a currentColor icon as a mask, not an image", () => {
    const url = svgUrl(
      '<svg xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0h1v1z"/></svg>',
    );
    const { container } = render(<ExternalAgentMark dataUrl={url} size={16} />);
    expect(container.querySelector("img")).toBeNull();
    const span = container.querySelector("span")!;
    expect(span.getAttribute("aria-hidden")).toBe("true");
    expect(span.style.width).toBe("16px");
    expect(span.getAttribute("style")).toContain(`url("${url}")`);
  });

  it("draws a coloured icon as an image", () => {
    const url = svgUrl(
      '<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M0 0h1v1z"/></svg>',
    );
    const { container } = render(<ExternalAgentMark dataUrl={url} />);
    const img = container.querySelector("img")!;
    expect(img.getAttribute("src")).toBe(url);
    expect(img.getAttribute("alt")).toBe("");
  });

  it("draws an undecodable URL as an image without throwing", () => {
    const url = "data:image/svg+xml;base64,%%%not-base64%%%";
    const { container } = render(<ExternalAgentMark dataUrl={url} />);
    expect(container.querySelector("img")).not.toBeNull();
  });
});

describe("AgentMonogram", () => {
  it("shows the label's first letter, upper-cased", () => {
    const { container } = render(<AgentMonogram label="  kilo" />);
    expect(container.textContent).toBe("K");
  });

  it("keeps a character outside the BMP whole", () => {
    const { container } = render(<AgentMonogram label="𝒜gent" />);
    expect(container.textContent).toBe("𝒜");
  });

  it("shows ? for an empty label", () => {
    const { container } = render(<AgentMonogram label="" />);
    expect(container.textContent).toBe("?");
  });

  it("steps the type with the box", () => {
    expect([12, 14, 16, 18, 22, 32].map(monogramTextClass)).toEqual([
      "text-3xs",
      "text-2xs",
      "text-xs",
      "text-base",
      "text-lg",
      "text-2xl",
    ]);
  });
});
