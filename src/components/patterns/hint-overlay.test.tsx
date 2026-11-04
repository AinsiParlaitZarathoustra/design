// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HintOverlay } from "./hint-overlay.tsx";

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(
    new DOMRect(10, 10, 40, 20),
  );
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const press = (code: string, init: KeyboardEventInit = {}) =>
  act(
    () =>
      void fireEvent.keyDown(window, {
        code,
        key: code.startsWith("Key") ? code.slice(3).toLowerCase() : code,
        ...init,
      }),
  );
const badges = () => [...document.querySelectorAll<HTMLElement>("[data-hint-label]")];

function setup(alphabet?: string) {
  const onActivate = vi.fn();
  const clicked = vi.fn();
  function Host() {
    const [open, setOpen] = useState(true);
    const [root, setRoot] = useState<HTMLDivElement | null>(null);
    return (
      <>
        <button onClick={() => setOpen(true)}>Enter hint mode</button>
        <div ref={setRoot}>
          {[1, 2, 3].map((n) => (
            <button key={n} onClick={() => clicked(n)}>
              B{n}
            </button>
          ))}
          <input aria-label="Field" />
        </div>
        {root && (
          <HintOverlay
            open={open}
            onOpenChange={setOpen}
            root={root}
            alphabet={alphabet}
            onActivate={onActivate}
          />
        )}
      </>
    );
  }
  render(<Host />);
  return { onActivate, clicked };
}

const codeFor = (letter: string) => `Key${letter.toUpperCase()}`;

describe("HintOverlay", () => {
  it("labels the targets under root and clicks the one whose label is typed", () => {
    const { onActivate, clicked } = setup();
    expect(badges()).toHaveLength(4);
    const button = badges().find((b) => b.dataset.hintLabel)!;
    const label = button.dataset.hintLabel!;
    press(codeFor(label));
    expect(badges()).toHaveLength(0);
    expect(onActivate).toHaveBeenCalledOnce();
    const [el, mode] = onActivate.mock.calls[0]!;
    if (el.tagName === "BUTTON") {
      expect(mode).toBe("click");
      expect(clicked).toHaveBeenCalledOnce();
    } else {
      expect(document.activeElement).toBe(el);
    }
  });

  it("with Alt held, focuses instead of clicking", () => {
    const { onActivate, clicked } = setup();
    press(codeFor(badges()[0]!.dataset.hintLabel!), { altKey: true });
    const [el, mode] = onActivate.mock.calls[0]!;
    expect(mode).toBe("focus");
    expect(document.activeElement).toBe(el);
    expect(clicked).not.toHaveBeenCalled();
  });

  it("narrows on a typed prefix; Backspace restores, a dead key does nothing, Escape closes", () => {
    setup("fj");
    expect(badges()).toHaveLength(4);
    expect(badges().every((b) => b.dataset.hintLabel!.length === 2)).toBe(true);
    press("KeyF");
    expect(badges()).toHaveLength(2);
    press("Backspace");
    expect(badges()).toHaveLength(4);
    press("KeyX");
    expect(badges()).toHaveLength(4);
    press("Escape");
    expect(badges()).toHaveLength(0);
  });

  it("lets an ignored key through and stops the rest", () => {
    const seen = vi.fn();
    window.addEventListener("keydown", seen);
    const onOpenChange = vi.fn();
    render(
      <HintOverlay
        open
        onOpenChange={onOpenChange}
        ignoreKey={(e) => e.code === "Space" && e.metaKey}
      />,
    );
    press("KeyQ");
    expect(seen).not.toHaveBeenCalled();
    press("Space", { metaKey: true });
    expect(seen).toHaveBeenCalledOnce();
    window.removeEventListener("keydown", seen);
  });
});
