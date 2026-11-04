// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  HINT_ALPHABET,
  activateHintTarget,
  generateHintLabels,
  scanHintTargets,
} from "./hint-targets.ts";

describe("generateHintLabels", () => {
  const prefixFree = (labels: string[]) =>
    labels.every((a, i) => labels.every((b, j) => i === j || !b.startsWith(a)));

  it.each([0, 1, 19, 20, 361, 362])("%i labels: unique, prefix-free, one length", (count) => {
    const labels = generateHintLabels(count);
    expect(labels).toHaveLength(count);
    expect(new Set(labels).size).toBe(count);
    expect(prefixFree(labels)).toBe(true);
    expect(new Set(labels.map((l) => l.length)).size).toBeLessThanOrEqual(1);
  });

  it("uses the shortest length that fits", () => {
    expect(generateHintLabels(19)[0]).toHaveLength(1);
    expect(generateHintLabels(20)[0]).toHaveLength(2);
    expect(generateHintLabels(361)[0]).toHaveLength(2);
    expect(generateHintLabels(362)[0]).toHaveLength(3);
    expect(generateHintLabels(3)).toEqual(HINT_ALPHABET.slice(0, 3).split(""));
  });

  it("works with a two-letter alphabet", () => {
    const labels = generateHintLabels(8, "fj");
    expect(labels).toHaveLength(8);
    expect(labels.every((l) => l.length === 3)).toBe(true);
  });
});

describe("scanHintTargets", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("finds visible controls and skips hidden, disabled and opted-out ones", () => {
    document.body.innerHTML = `
      <div id="root">
        <button id="a">A</button>
        <input id="field" />
        <div data-hint id="wrap"><button id="inner">I</button></div>
        <div role="button" id="wrap2"><button id="inner2">J</button></div>
        <button id="hidden" aria-hidden="true">H</button>
        <div aria-hidden="true" class="strip"><button id="in-strip">S</button></div>
        <button id="disabled" disabled>D</button>
        <div inert><button id="inert">N</button></div>
        <div data-hint-overlay><button id="own">O</button></div>
      </div>
      <button id="outside">X</button>`;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(
      new DOMRect(10, 10, 40, 20),
    );
    const found = scanHintTargets(document.getElementById("root")!).map((t) => t.el.id);
    expect(found.sort()).toEqual(["a", "field", "inner", "inner2", "wrap"].sort());
  });

  it("skips targets off screen or under 4px", () => {
    document.body.innerHTML = `<button id="tiny">t</button><button id="off">o</button>`;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
      this: HTMLElement,
    ) {
      return this.id === "tiny" ? new DOMRect(10, 10, 3, 3) : new DOMRect(-500, -500, 40, 20);
    });
    expect(scanHintTargets()).toEqual([]);
  });
});

describe("activateHintTarget", () => {
  it("clicks a checkbox, and only focuses a text field", () => {
    document.body.innerHTML = `<input type="checkbox" id="c" /><input id="t" value="abc" />`;
    const box = document.getElementById("c") as HTMLInputElement;
    const field = document.getElementById("t") as HTMLInputElement;
    activateHintTarget(box);
    expect(box.checked).toBe(true);
    activateHintTarget(field);
    expect(document.activeElement).toBe(field);
    expect(field.selectionStart).toBe(3);
  });
});
