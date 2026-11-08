import { cleanup } from "@testing-library/svelte";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => cleanup());

/**
 * happy-dom has no layout: the strip's ResizeObserver and the tooltip's
 * matchMedia are stubbed with the smallest objects the components use. Layout
 * numbers stay zero here, which is why the geometry maths is tested as pure
 * functions in `tab-strip.test.ts`.
 */
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!("ResizeObserver" in globalThis)) {
  globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
}

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false;
    },
  })) as typeof window.matchMedia;
}

if (!Element.prototype.scrollBy) {
  Element.prototype.scrollBy = function scrollBy() {};
}
