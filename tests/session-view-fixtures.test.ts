import { describe, expect, it } from "vitest";

import {
  cancelledSession,
  erroredSession,
  hugeOutputSession,
  hugeTurnsSession,
  longSession,
  manyToolCallsSession,
  planSession,
  streamingSession,
  webShapedSession,
} from "../stories/components/session/fixtures.ts";

/**
 * The session fixtures feed every session story and test. Deterministic, so a
 * story renders the same twice and a screenshot diff means the component
 * changed, not the data.
 */
const BUILDERS = {
  longSession,
  streamingSession,
  erroredSession,
  cancelledSession,
  manyToolCallsSession,
  hugeOutputSession,
  hugeTurnsSession,
  planSession,
  webShapedSession,
};

describe("session fixtures", () => {
  for (const [name, build] of Object.entries(BUILDERS)) {
    it(`${name} is deterministic and its turn keys are unique`, () => {
      const session = build();
      expect(JSON.stringify(session)).toBe(JSON.stringify(build()));
      const keys = session.turns.map((t) => t.key);
      expect(new Set(keys).size).toBe(keys.length);
    });
  }

  it("hugeOutputSession's terminal output has exactly 50,000 lines", () => {
    const call = hugeOutputSession().turns[0]!.items.find(
      (i) => i.kind === "tool" && i.call.terminal,
    );
    expect(call?.kind === "tool" && call.call.terminal!.output.split("\n").length).toBe(50_000);
  });

  it("streamingSession streams its last item", () => {
    const session = streamingSession();
    const last = session.turns.at(-1)!.items.at(-1)!;
    expect(last.kind === "text" && last.id).toBe(session.streaming?.itemId);
  });
});
