import { describe, expect, it } from "vitest";

import {
  calls,
  conversationRows,
  message,
  transcript,
} from "../stories/components/comms/fixtures.ts";

/**
 * The comms fixtures feed every team-chat story. Deterministic, so a story
 * renders the same twice and a screenshot diff means the component changed,
 * not the data.
 */
const BUILDERS = { conversationRows, transcript, message, calls };

describe("comms fixtures", () => {
  for (const [name, build] of Object.entries(BUILDERS)) {
    it(`${name} returns the same JSON twice`, () => {
      expect(JSON.stringify(build())).toBe(JSON.stringify(build()));
    });
  }

  it("transcript ids are unique", () => {
    const ids = transcript().map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toHaveLength(40);
  });
});
