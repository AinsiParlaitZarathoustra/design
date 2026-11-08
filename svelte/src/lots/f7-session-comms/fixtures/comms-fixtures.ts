/**
 * CommsView fixtures for the team-chat stories and tests. Pure and
 * deterministic: every time is one local base plus an offset, no clock, no
 * randomness, so a builder called twice returns identical JSON. Not shipped.
 */
import type { PersonRef } from "../session/session-view";
import { reactionChips } from "../comms/comms-view-helpers";
import type {
  CommsAuthor,
  CommsCallMarker,
  CommsConversationRowView,
  CommsMessageView,
} from "../comms/comms-view";

/** 6 October 2026, 09:00 local. */
export const BASE = new Date(2026, 9, 6, 9, 0).getTime();
const MINUTE = 60_000;

/** The person the stories are seen as. */
export const ME = "u-ada";

export const COMMS_PEOPLE: ReadonlyArray<PersonRef & { id: string }> = [
  { id: "u-ada", name: "Ada Okafor" },
  { id: "u-lin", name: "Lin Mei" },
  { id: "u-sam", name: "Samuel Whitmore-Castellanos" },
  { id: "u-ines", name: "Inês Duarte" },
  { id: "u-kofi", name: "Kofi Mensah" },
];

/** Desktop's reaction allowlist, as escapes: a stored reaction is byte-identical to the allowed one. */
export const COMMS_REACTION_EMOJI: readonly string[] = [
  "\u{1F44D}",
  "\u{1F44E}",
  "\u{1F602}",
  "\u{1F389}",
  "\u{1F440}",
  "\u{1F680}",
  "\u{1F525}",
  "\u{1F914}",
  "\u{1F621}",
  "\u{1F62E}",
  "\u{1F64F}",
  "\u{1F4AF}",
  "\u{1F41B}",
  "\u{1F44F}",
  "\u{2764}\u{FE0F}",
  "\u{2705}",
  "\u{274C}",
  "\u{26A0}\u{FE0F}",
  "\u{1F44C}",
  "\u{1F937}",
];

function person(id: string, online?: boolean): CommsAuthor {
  const p = COMMS_PEOPLE.find((x) => x.id === id)!;
  return {
    kind: "person",
    id,
    person: { name: p.name },
    ...(online === undefined ? {} : { online }),
  };
}

/** A sidebar's worth of rows: channels, an archived one, group DMs and DMs. */
export function conversationRows(): CommsConversationRowView[] {
  return [
    { id: "c-general", kind: "channel", title: "general", unread: 0, mentions: 0 },
    { id: "c-design", kind: "channel", title: "design-system", unread: 3, mentions: 0 },
    {
      id: "c-incidents",
      kind: "channel",
      title: "incidents",
      private: true,
      unread: 120,
      mentions: 2,
    },
    {
      id: "c-long",
      kind: "channel",
      title: "q4-launch-coordination-between-desktop-web-and-the-server-teams-for-the-release",
      unread: 0,
      mentions: 0,
    },
    { id: "c-old", kind: "channel", title: "offsite-2025", archived: true, unread: 0, mentions: 0 },
    { id: "g-review", kind: "group", title: "Lin, Samuel, Inês", unread: 0, mentions: 14 },
    { id: "g-named", kind: "group", title: "Release crew", unread: 5, mentions: 0 },
    {
      id: "d-lin",
      kind: "dm",
      title: "Lin Mei",
      unread: 1,
      mentions: 0,
      counterpart: { name: "Lin Mei", online: true },
    },
    {
      id: "d-kofi",
      kind: "dm",
      title: "Kofi Mensah",
      unread: 0,
      mentions: 0,
      counterpart: { name: "Kofi Mensah", online: false },
    },
    {
      id: "d-sam",
      kind: "dm",
      title: "Samuel Whitmore-Castellanos",
      unread: 0,
      mentions: 0,
      counterpart: { name: "Samuel Whitmore-Castellanos" },
    },
  ];
}

/** One message, with defaults; `overrides` wins. */
export function message(overrides: Partial<CommsMessageView> = {}): CommsMessageView {
  return {
    id: "m-1",
    convId: "c-design",
    seq: 1,
    author: person("u-lin", true),
    body: "The keycap badge reads on light themes now.",
    at: BASE,
    reactions: [],
    ...overrides,
  };
}

const LINES = [
  "Morning! Pushed the badge change, keycap on both tones.",
  "Looks right in Rosé Pine, checking Dracula next.",
  "Does the presence dot still read on light?",
  "It does, it rings in the background colour.",
  "Shipping the composer after lunch.",
  "The reply strip tucks behind the bar now, no slide.",
  "Nice. Rows still never transform?",
  "Opacity and colour only. WKWebView is happy.",
];

/**
 * A transcript over two days: runs and breaks, replies to a loaded, a
 * deleted and a missing parent, reactions (yours and others'), an edit, a
 * tombstone, one sending and one failed message, two integration posts (one
 * under a borrowed name), and a pin. `count` messages in all.
 */
export function transcript(count = 40): CommsMessageView[] {
  const authors = ["u-lin", "u-lin", "u-ada", "u-sam", "u-sam", "u-ines", "u-ada", "u-kofi"];
  const out: CommsMessageView[] = [];
  let at = BASE - 24 * 60 * MINUTE; // yesterday 09:00
  for (let i = 0; i < count; i++) {
    // Mostly a minute apart, a long gap every seventh, and the day turns at 20.
    at += i === 20 ? 24 * 60 * MINUTE - 19 * MINUTE : i % 7 === 6 ? 12 * MINUTE : MINUTE;
    const authorId = authors[i % authors.length]!;
    const m: CommsMessageView = {
      id: `m-${i + 1}`,
      convId: "c-design",
      seq: i + 1,
      author: person(authorId, authorId === "u-ada" ? true : i % 3 === 0 ? undefined : i % 2 === 0),
      body: LINES[i % LINES.length]!,
      at,
      reactions: [],
    };
    out.push(m);
  }
  const set = (i: number, patch: Partial<CommsMessageView>) => {
    if (out[i]) out[i] = { ...out[i]!, ...patch };
  };
  set(2, {
    reactions: reactionChips(
      [
        { userId: "u-lin", emoji: "\u{1F44D}" },
        { userId: ME, emoji: "\u{1F44D}" },
        { userId: "u-sam", emoji: "\u{1F680}" },
      ],
      ME,
    ),
  });
  set(4, { editedAt: out[4]?.at, pinned: true });
  set(5, {
    replyTo: { id: "m-3", authorName: "Ada Okafor", preview: LINES[2], state: "loaded" },
  });
  set(8, { deleted: true });
  set(9, { replyTo: { id: "m-9", state: "deleted" } });
  set(11, {
    author: { kind: "integration", id: "whk_ci", name: "CI" },
    body: "Build 4182 passed on main.",
  });
  set(12, {
    author: { kind: "integration", id: "whk_ci", name: "Release bot", via: "CI" },
    body: "Tagged v0.1.8-rc.1.",
  });
  set(15, { replyTo: { id: "m-0", authorName: "Kofi Mensah", state: "missing" } });
  set(22, {
    reactions: reactionChips(
      [
        { userId: "u-lin", emoji: "\u{1F389}" },
        { userId: "u-kofi", emoji: "\u{1F389}" },
        { userId: "u-ines", emoji: "\u{2764}\u{FE0F}" },
      ],
      ME,
    ),
  });
  if (count >= 2) {
    out[count - 2] = { ...out[count - 2]!, author: person(ME, true), send: "failed" };
    out[count - 1] = { ...out[count - 1]!, author: person(ME, true), send: "sending" };
  }
  return out;
}

/** A call between two runs of the transcript, by `seq`. */
export function calls(): CommsCallMarker[] {
  return [{ id: "call-1", seq: 25.5, at: BASE + 27 * MINUTE + 30_000 }];
}
