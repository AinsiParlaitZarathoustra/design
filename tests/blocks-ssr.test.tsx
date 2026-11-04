// @vitest-environment node
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import * as blocks from "../src/components/blocks/index.ts";

/**
 * A marketing page renders the blocks on the server (Next.js, no window), and
 * what it sends must already look right: the globe and the dither field paint
 * on the client, so their server HTML has to carry the token-coloured
 * fallback in their box, or the page ships a blank hole and shifts when the
 * canvas arrives. This renders every export of the blocks entry with no DOM.
 */

const { ThemeProvider } = blocks;
const render = (node: React.ReactNode) => renderToString(<ThemeProvider>{node}</ThemeProvider>);

describe("the blocks entry on the server", () => {
  it("renders every block without a DOM", () => {
    const html = [
      render(<blocks.DashedRails />),
      render(<blocks.GhostCards />),
      render(<blocks.GradualBlur position="bottom" />),
      render(
        <blocks.InfiniteSlider>
          <span>a</span>
        </blocks.InfiniteSlider>,
      ),
      render(<blocks.LogoMarquee logos={[{ name: "Acme", mark: <span>Acme</span> }]} />),
      render(<blocks.PlusDecorator />),
      render(<blocks.PlusCorners />),
    ];
    for (const out of html) expect(out.length).toBeGreaterThan(0);
    expect(typeof blocks.themeInitScript()).toBe("string");
  });

  it("server-renders the globe's fallback in its box", () => {
    const html = render(<blocks.Globe />);
    expect(html).toContain('data-slot="globe-fallback"');
    expect(html).toContain("aspect-square");
  });

  it("server-renders the dither field's fallback", () => {
    expect(render(<blocks.DitherField />)).toContain('data-slot="dither-fallback"');
    expect(render(<blocks.DitherField mode="dots" />)).toContain("4px 4px");
  });

  it("renders a caller's fallback instead of the default", () => {
    const fallback = <img alt="" src="/x.png" />;
    const globe = render(<blocks.Globe fallback={fallback} />);
    expect(globe).toContain('src="/x.png"');
    expect(globe).not.toContain("globe-fallback");
    const field = render(<blocks.DitherField fallback={fallback} />);
    expect(field).toContain('src="/x.png"');
    expect(field).not.toContain("dither-fallback");
  });
});
