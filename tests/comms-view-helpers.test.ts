import { describe, expect, it } from "vitest";

import {
  COMMS_GROUP_WINDOW_MS,
  conversationTitle,
  formatClock,
  formatDayLabel,
  reactionChips,
  transcriptRows,
  unreadBadge,
} from "../src/components/comms/comms-view-helpers.ts";
import type { CommsAuthor, CommsMessageView } from "../src/components/comms/comms-view.ts";

/**
 * The team-chat rules web and desktop must agree on. Every time is built
 * with local `new Date(y, m, d, h, min)`, so the suite passes in any `TZ`.
 */

const t = (d: number, h: number, min: number, s = 0) => new Date(2026, 9, d, h, min, s).getTime();
const ada: CommsAuthor = { kind: "person", id: "u-ada", person: { name: "Ada Okafor" } };
const lin: CommsAuthor = { kind: "person", id: "u-lin", person: { name: "Lin Mei" } };

let seq = 0;
function msg(at: number, author: CommsAuthor = lin, extra: Partial<CommsMessageView> = {}) {
  seq += 1;
  return { id: `m${seq}`, convId: "c", seq, author, body: "", at, reactions: [], ...extra };
}
const kinds = (rows: ReturnType<typeof transcriptRows>) =>
  rows.map((r) => (r.kind === "message" ? (r.head ? "head" : "cont") : r.kind));

describe("transcriptRows", () => {
  it("puts a day row first and again when the local day turns at midnight", () => {
    const rows = transcriptRows([msg(t(6, 23, 58)), msg(t(7, 0, 1))], { me: "u-ada" });
    expect(kinds(rows)).toEqual(["day", "head", "day", "head"]);
    expect(rows[0]).toMatchObject({ key: "day-2026-10-06" });
    expect(rows[2]).toMatchObject({ key: "day-2026-10-07" });
  });

  it("groups up to exactly five minutes and breaks one second past", () => {
    expect(COMMS_GROUP_WINDOW_MS).toBe(300_000);
    const exact = transcriptRows([msg(t(6, 9, 0)), msg(t(6, 9, 5))], { me: "u-ada" });
    expect(kinds(exact)).toEqual(["day", "head", "cont"]);
    const past = transcriptRows([msg(t(6, 9, 0)), msg(t(6, 9, 5, 1))], { me: "u-ada" });
    expect(kinds(past)).toEqual(["day", "head", "head"]);
  });

  it("breaks the run when the author changes", () => {
    const rows = transcriptRows([msg(t(6, 9, 0)), msg(t(6, 9, 1), ada)], { me: "u-ada" });
    expect(kinds(rows)).toEqual(["day", "head", "head"]);
  });

  it("breaks the run when one webhook posts under another name", () => {
    const ci: CommsAuthor = { kind: "integration", id: "whk_1", name: "CI" };
    const deploy: CommsAuthor = { kind: "integration", id: "whk_1", name: "Deploys" };
    const rows = transcriptRows(
      [msg(t(6, 9, 0), ci), msg(t(6, 9, 1), ci), msg(t(6, 9, 2), deploy)],
      {
        me: "u-ada",
      },
    );
    expect(kinds(rows)).toEqual(["day", "head", "cont", "head"]);
  });

  it("gives a reply its own head", () => {
    const rows = transcriptRows(
      [msg(t(6, 9, 0)), msg(t(6, 9, 1), lin, { replyTo: { id: "x", state: "loaded" } })],
      { me: "u-ada" },
    );
    expect(kinds(rows)).toEqual(["day", "head", "head"]);
  });

  it("draws the unread line before the first message someone else wrote after lastReadSeq", () => {
    const a = msg(t(6, 9, 0));
    const mine = msg(t(6, 9, 1), ada);
    const theirs = msg(t(6, 9, 2));
    const rows = transcriptRows([a, mine, theirs], { me: "u-ada", lastReadSeq: a.seq });
    // Your own message after the mark is not news; the line waits for Lin's.
    expect(kinds(rows)).toEqual(["day", "head", "head", "unread", "head"]);
  });

  it("draws no unread line when lastReadSeq is null or undefined", () => {
    const list = [msg(t(6, 9, 0)), msg(t(6, 9, 1))];
    expect(kinds(transcriptRows(list, { me: "u-ada", lastReadSeq: null }))).not.toContain("unread");
    expect(kinds(transcriptRows(list, { me: "u-ada" }))).not.toContain("unread");
  });

  it("interleaves a call by seq and breaks the run around it", () => {
    const a = msg(t(6, 9, 0));
    const b = msg(t(6, 9, 2));
    const rows = transcriptRows([b, a], {
      me: "u-ada",
      calls: [{ id: "k", seq: a.seq + 0.5, at: t(6, 9, 1) }],
    });
    expect(kinds(rows)).toEqual(["day", "head", "call", "head"]);
    expect(rows[2]).toMatchObject({ key: "call-k" });
  });

  it("keeps deleted messages, which still group", () => {
    const rows = transcriptRows([msg(t(6, 9, 0)), msg(t(6, 9, 1), lin, { deleted: true })], {
      me: "u-ada",
    });
    expect(kinds(rows)).toEqual(["day", "head", "cont"]);
  });
});

describe("reactionChips", () => {
  it("orders by first use, counts each user once and marks mine", () => {
    const chips = reactionChips(
      [
        { userId: "u-lin", emoji: "🚀" },
        { userId: "u-ada", emoji: "👍" },
        { userId: "u-lin", emoji: "🚀" },
        { userId: "u-sam", emoji: "🚀" },
      ],
      "u-ada",
    );
    expect(chips).toEqual([
      { emoji: "🚀", count: 2, mine: false, userIds: ["u-lin", "u-sam"] },
      { emoji: "👍", count: 1, mine: true, userIds: ["u-ada"] },
    ]);
  });

  it("is empty for undefined rows", () => {
    expect(reactionChips(undefined, "u-ada")).toEqual([]);
  });
});

describe("conversationTitle", () => {
  const names: Record<string, string> = { a: "Ada Okafor", l: "Lin Mei", s: "Sam Whit" };
  const nameOf = (id: string) => names[id];
  it("names a channel, and an unnamed one 'channel'", () => {
    expect(conversationTitle({ kind: "channel", name: "general", me: "a", nameOf })).toBe(
      "general",
    );
    expect(conversationTitle({ kind: "channel", name: null, me: "a", nameOf })).toBe("channel");
  });
  it("names a DM after the other person, or 'Just you'", () => {
    expect(conversationTitle({ kind: "dm", memberIds: ["a", "l"], me: "a", nameOf })).toBe(
      "Lin Mei",
    );
    expect(conversationTitle({ kind: "dm", memberIds: ["a"], me: "a", nameOf })).toBe("Just you");
  });
  it("names a group by its name, else the others' first names", () => {
    const memberIds = ["a", "l", "s"];
    expect(conversationTitle({ kind: "group", name: "Crew", memberIds, me: "a", nameOf })).toBe(
      "Crew",
    );
    expect(conversationTitle({ kind: "group", memberIds, me: "a", nameOf })).toBe("Lin, Sam");
  });
  it("calls someone it cannot resolve a former member", () => {
    expect(conversationTitle({ kind: "dm", memberIds: ["a", "gone"], me: "a", nameOf })).toBe(
      "Former member",
    );
    expect(
      conversationTitle({ kind: "group", memberIds: ["a", "gone", "l"], me: "a", nameOf }),
    ).toBe("Former member, Lin");
  });
});

describe("unreadBadge", () => {
  it("is null with nothing unread", () => {
    expect(unreadBadge(0, 0)).toBeNull();
  });
  it("counts unread up to 99+", () => {
    expect(unreadBadge(3, 0)).toEqual({ label: "3", tone: "unread", aria: "3 unread" });
    expect(unreadBadge(120, 0)).toEqual({ label: "99+", tone: "unread", aria: "120 unread" });
  });
  it("puts mentions first, capped at 9+", () => {
    expect(unreadBadge(3, 2)).toEqual({ label: "2", tone: "mention", aria: "2 mentions" });
    expect(unreadBadge(40, 14)).toEqual({ label: "9+", tone: "mention", aria: "14 mentions" });
  });
});

describe("formatDayLabel", () => {
  const now = t(6, 15, 0);
  it("says Today, Yesterday, then the date", () => {
    expect(formatDayLabel(t(6, 0, 5), now)).toBe("Today");
    expect(formatDayLabel(t(5, 23, 59), now)).toBe("Yesterday");
    expect(formatDayLabel(t(1, 12, 0), now)).toBe(
      new Date(t(1, 12, 0)).toLocaleDateString(undefined, { month: "long", day: "numeric" }),
    );
  });
});

describe("formatClock", () => {
  it("returns the same string for the same time, from the cache or not", () => {
    const at = t(6, 9, 4);
    const first = formatClock(at);
    expect(formatClock(at)).toBe(first);
    expect(first).toMatch(/9[:.]04/);
    expect(formatClock(at, "h23")).toMatch(/09[:.]04/);
  });
});
