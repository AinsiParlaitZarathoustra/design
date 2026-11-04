// @vitest-environment happy-dom
import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { StreamingMarkdown } from "./streaming-markdown.tsx";

afterEach(cleanup);

describe("StreamingMarkdown", () => {
  it("never re-renders a finished block as the last one grows", async () => {
    // A probe for the heading: react-markdown calls it each time it renders
    // the block the heading is in, so a re-parse of that block shows up here.
    let headings = 0;
    const components = {
      h1: (props: React.ComponentProps<"h1">) => {
        headings++;
        return <h1 {...props} />;
      },
    };
    const first = "# Heading\n\nA finished paragraph.\n\nThe tail";
    const { container, rerender } = render(
      <StreamingMarkdown source={first} streaming components={components} />,
    );
    await waitFor(() => expect(container.querySelector("h1")).not.toBeNull());
    const heading = container.querySelector("h1");
    const paragraph = container.querySelector("p");

    const before = headings;
    for (const more of [" keeps", " keeps growing", " keeps growing on"]) {
      rerender(<StreamingMarkdown source={`${first}${more}`} streaming components={components} />);
      await waitFor(() => expect(container.textContent).toContain(more.trim()));
    }
    expect(headings).toBe(before);
    expect(container.querySelector("h1")).toBe(heading);
    expect(container.querySelector("p")).toBe(paragraph);
  });

  it("renders an unterminated fence as code while it streams", async () => {
    const { container } = render(
      <StreamingMarkdown source={"Before\n\n```ts\nconst x = 1;\n"} streaming />,
    );
    await waitFor(() => expect(container.querySelector("pre code")).not.toBeNull());
    const code = container.querySelector("pre code")!;
    expect(code.className).toBe("language-ts");
    expect(code.textContent).toContain("const x = 1;");
  });

  it("renders a settled unterminated fence as code", () => {
    const { container } = render(<StreamingMarkdown source={"```ts\nconst x = 1;\n"} />);
    expect(container.querySelector("pre code")?.textContent).toContain("const x = 1;");
  });

  it("drops javascript: links", () => {
    const { container } = render(<StreamingMarkdown source="[x](javascript:alert(1))" />);
    const link = container.querySelector("a");
    expect(link?.getAttribute("href") ?? "").not.toMatch(/javascript:/i);
  });

  it("renders HTML in the source as text", () => {
    const { container } = render(<StreamingMarkdown source={'<img src="x" onerror="alert(1)">'} />);
    expect(container.querySelector("img")).toBeNull();
  });

  it("shows the caret only while streaming", () => {
    const { container, rerender } = render(<StreamingMarkdown source="hi" streaming />);
    expect(container.querySelector('[data-slot="stream-caret"]')).not.toBeNull();
    rerender(<StreamingMarkdown source="hi" />);
    expect(container.querySelector('[data-slot="stream-caret"]')).toBeNull();
  });

  it("renders reference definitions whole once settled", () => {
    const { container } = render(
      <StreamingMarkdown source={"See [the docs][d].\n\nMore.\n\n[d]: https://example.com\n"} />,
    );
    expect(container.querySelector("a")?.getAttribute("href")).toBe("https://example.com");
  });
});
