// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Avatar, AvatarFallback } from "./avatar.tsx";

afterEach(cleanup);

describe("Avatar", () => {
  it("draws the two sizes below the control ladder in px", () => {
    for (const [size, cls] of [
      ["2xs", "data-[size=2xs]:size-[16px]"],
      ["3xs", "data-[size=3xs]:size-[14px]"],
    ] as const) {
      const { container } = render(
        <Avatar size={size}>
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>,
      );
      const avatar = container.querySelector<HTMLElement>('[data-slot="avatar"]')!;
      expect(avatar.dataset.size).toBe(size);
      expect(avatar.className.split(/\s+/)).toContain(cls);
      cleanup();
    }
  });
});
