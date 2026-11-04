// @vitest-environment happy-dom
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { planSession } from "../../stories/components/session/fixtures.ts";
import { Globe } from "../components/blocks/globe.tsx";
import { SessionPipeline } from "../components/session/session-pipeline.tsx";
import { ThemeProvider } from "./theme.tsx";
import { Skeleton } from "../components/ui/skeleton.tsx";
import { Spinner } from "../components/ui/spinner.tsx";
import {
  INFINITE_ANIMATIONS,
  INFINITE_ANIMATION_FPS_VAR,
  infiniteAnimationFps,
} from "./infinite-animations.ts";

/**
 * `INFINITE_ANIMATIONS` is how a consumer caps the package's endless
 * animations (desktop steps them on Linux, where WebKitGTK pays for every
 * frame). An animation missing from it is one the consumer cannot cap, and
 * nothing renders differently, so these hold the list to the source.
 */

const ROOT = path.join(import.meta.dirname, "../..");

/** What starts an animation that never ends. */
const ENDLESS =
  /\banimate-(?:spin|pulse|ping|bounce)\b|repeat:\s*Infinity|requestAnimationFrame\(tick\)/;

function sources(dir: string): string[] {
  return readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((entry) => {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) return sources(rel);
    return /\.tsx?$/.test(entry.name) && !/\.test\./.test(entry.name) ? [rel] : [];
  });
}

afterEach(cleanup);

describe("INFINITE_ANIMATIONS", () => {
  it("lists every source file that runs an endless animation", () => {
    // The list itself names the classes it describes.
    const running = sources("src").filter(
      (file) =>
        file !== "src/lib/infinite-animations.ts" &&
        ENDLESS.test(readFileSync(path.join(ROOT, file), "utf8")),
    );
    const listed = new Set(INFINITE_ANIMATIONS.map((a) => a.source));
    expect(running.filter((file) => !listed.has(file))).toEqual([]);
    expect([...listed].filter((file) => !running.includes(file))).toEqual([]);
  });

  it("caps every js loop through the variable", () => {
    for (const animation of INFINITE_ANIMATIONS.filter((a) => a.driver === "js")) {
      expect(readFileSync(path.join(ROOT, animation.source), "utf8"), animation.id).toMatch(
        /infiniteAnimationFps\(/,
      );
    }
  });

  it("gives every css animation a selector that matches it as rendered", () => {
    const { container } = render(
      <div>
        <Spinner />
        <Skeleton />
        <SessionPipeline session={planSession()} />
        <ThemeProvider>
          <Globe />
        </ThemeProvider>
      </div>,
    );
    for (const animation of INFINITE_ANIMATIONS) {
      if (animation.driver !== "css" || animation.id === "toast-loading") continue;
      const found = container.querySelector(animation.selector);
      expect(found, `${animation.id}: ${animation.selector}`).not.toBeNull();
      expect(found!.getAttribute("class"), animation.id).toMatch(/animate-(?:spin|pulse|ping)/);
      expect(animation.steps / animation.duration, animation.id).toBe(12);
    }
  });

  it("reads the cap from the cascade, and ignores it when unset or nonsense", () => {
    const element = document.createElement("div");
    document.body.append(element);
    expect(infiniteAnimationFps(element)).toBeUndefined();
    element.style.setProperty(INFINITE_ANIMATION_FPS_VAR, "12");
    expect(infiniteAnimationFps(element)).toBe(12);
    element.style.setProperty(INFINITE_ANIMATION_FPS_VAR, "fast");
    expect(infiniteAnimationFps(element)).toBeUndefined();
    element.remove();
  });
});
