// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { Inbox } from "lucide-react";
import { afterEach, describe, expect, it } from "vitest";

import { EmptyState } from "./empty-state.tsx";

afterEach(cleanup);

describe("EmptyState icon", () => {
  it("draws a Lucide component through Icon", () => {
    const { container } = render(<EmptyState icon={Inbox} title="No mail" />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("class")).toContain("lucide-inbox");
  });

  it("draws an element as given, in the same box", () => {
    const { container } = render(
      <EmptyState icon={<span data-testid="logo" aria-hidden="true" />} title="No models" />,
    );
    const logo = container.querySelector('[data-testid="logo"]')!;
    expect(logo.parentElement?.className).toContain("size-control-lg");
    expect(container.querySelector("svg")).toBeNull();
  });
});
