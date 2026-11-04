import { describe, expect, it } from "vitest";
import {
  axisTicks,
  buildRows,
  clusterMarks,
  DAY,
  extentOf,
  handoffsOf,
  HOUR,
  MARK_GAP,
  MINUTE,
  moveFocus,
  NODE,
  rubberband,
  stepZoom,
  timeScale,
  type NavLane,
  type TraceCheckpoint,
  type TraceSession,
} from "./checkpoint-trace-model.ts";

// The unit project runs with TZ=UTC, so local midnight is UTC midnight.
const T0 = Date.UTC(2026, 10, 4, 0, 0);

describe("timeScale", () => {
  it("maps time to x at the zoom's density, and back", () => {
    const s = timeScale({ from: T0, to: T0 + DAY }, "day");
    expect(s.pxPerMs * HOUR).toBe(40);
    expect(s.x(T0)).toBe(0);
    expect(s.x(T0 + 3 * HOUR)).toBe(120);
    expect(s.width).toBe(960);
    expect(s.t(120)).toBe(T0 + 3 * HOUR);
  });

  it("is denser at hour zoom and sparser at week zoom", () => {
    const range = { from: T0, to: T0 + DAY };
    expect(timeScale(range, "hour").x(T0 + HOUR)).toBe(240);
    expect(timeScale(range, "week").x(T0 + DAY)).toBe(144);
  });

  it("stretches a short range to fill the track", () => {
    const s = timeScale({ from: T0, to: T0 + HOUR }, "week", 600);
    expect(s.width).toBe(600);
    expect(s.to).toBe(T0 + 100 * HOUR);
    // Never shrinks one that is already wide enough.
    expect(timeScale({ from: T0, to: T0 + DAY }, "day", 100).width).toBe(960);
  });
});

describe("axisTicks", () => {
  it("puts quarter hours at hour zoom, majors on the hour", () => {
    const s = timeScale({ from: T0 + 9 * HOUR + 7 * MINUTE, to: T0 + 11 * HOUR }, "hour");
    const ticks = axisTicks(s, "hour");
    expect(ticks[0]!.t).toBe(T0 + 9 * HOUR + 15 * MINUTE);
    expect(ticks.every((t) => new Date(t.t).getUTCMinutes() % 15 === 0)).toBe(true);
    expect(ticks.filter((t) => t.major).map((t) => new Date(t.t).getUTCHours())).toEqual([10, 11]);
    expect(ticks.every((t) => t.labelled)).toBe(true);
  });

  it("labels every third hour at day zoom, with midnight as the major", () => {
    const s = timeScale({ from: T0 - 2 * HOUR, to: T0 + 7 * HOUR }, "day");
    const ticks = axisTicks(s, "day");
    expect(ticks.filter((t) => t.major).map((t) => t.t)).toEqual([T0]);
    expect(ticks.filter((t) => t.labelled).map((t) => new Date(t.t).getUTCHours())).toEqual([
      0, 3, 6,
    ]);
  });

  it("labels only days at week zoom", () => {
    const s = timeScale({ from: T0, to: T0 + 3 * DAY }, "week");
    const ticks = axisTicks(s, "week");
    expect(ticks).toHaveLength(13); // every six hours, both ends included
    expect(ticks.filter((t) => t.labelled).map((t) => t.t)).toEqual([
      T0,
      T0 + DAY,
      T0 + 2 * DAY,
      T0 + 3 * DAY,
    ]);
  });

  it("computes only the window asked for", () => {
    const s = timeScale({ from: T0, to: T0 + 30 * DAY }, "hour");
    const ticks = axisTicks(s, "hour", 2400, 3600); // 10:00 to 15:00
    expect(ticks[0]!.t).toBe(T0 + 10 * HOUR);
    expect(ticks.at(-1)!.t).toBe(T0 + 15 * HOUR);
  });
});

describe("extentOf", () => {
  it("snaps the sessions' extent to the zoom's unit, padded", () => {
    const sessions = [
      session("a", T0 + 9 * HOUR + 20 * MINUTE, T0 + 11 * HOUR),
      session("b", T0 + 13 * HOUR, null),
    ];
    const now = T0 + 14 * HOUR + 10 * MINUTE;
    expect(extentOf(sessions, now, "week")).toEqual({ from: T0, to: T0 + DAY });
    const day = extentOf(sessions, now, "day");
    expect(day.from).toBe(T0 + 6 * HOUR);
    expect(day.to).toBeGreaterThanOrEqual(now);
  });
});

describe("clusterMarks", () => {
  const at = (...xs: number[]) => xs.map((x, i) => ({ x, key: `c${i}`, item: i }));

  it("keeps marks that do not overlap apart", () => {
    const marks = clusterMarks(at(0, 40, 80));
    expect(marks.map((m) => m.members)).toEqual([[0], [1], [2]]);
    expect(marks[0]!.right - marks[0]!.left).toBe(NODE);
  });

  it("gathers marks that would overlap into one, keyed by its first member", () => {
    const marks = clusterMarks(at(0, 6, 12, 100));
    expect(marks.map((m) => m.members)).toEqual([[0, 1, 2], [3]]);
    expect(marks[0]!.key).toBe("c0");
    expect(marks[0]!.first).toBe(0);
    expect(marks[0]!.last).toBe(12);
  });

  it("sorts its input", () => {
    expect(clusterMarks(at(80, 0, 40)).map((m) => m.members)).toEqual([[1], [2], [0]]);
  });

  it("never lets two drawn marks come closer than the gap", () => {
    // A dense, uneven run: every pair of neighbours must still clear the gap.
    const xs = Array.from({ length: 200 }, (_, i) => Math.round(i * 7.3 + ((i * 37) % 11)));
    const marks = clusterMarks(at(...xs));
    for (let i = 1; i < marks.length; i++)
      expect(marks[i]!.left - marks[i - 1]!.right).toBeGreaterThanOrEqual(MARK_GAP);
    expect(marks.reduce((n, m) => n + m.members.length, 0)).toBe(200);
  });

  it("draws a pill at least wide enough for its count", () => {
    const [mark] = clusterMarks(at(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11));
    expect(mark!.members).toHaveLength(12);
    expect(mark!.right - mark!.left).toBeGreaterThanOrEqual(NODE + 8 + 12);
  });
});

describe("buildRows", () => {
  const names = { noProject: "No project", noOwner: "No owner" };
  const sessions = [
    session("old", T0, T0 + HOUR, { projectId: "p1", projectName: "atlas", owner: "priya" }),
    session("new", T0 + 5 * HOUR, null, { projectId: "p2", projectName: "server", owner: "sam" }),
    session("mid", T0 + 2 * HOUR, T0 + 3 * HOUR, {
      projectId: "p1",
      projectName: "atlas",
      owner: "sam",
    }),
    session("loose", T0 + 6 * HOUR, null, { owner: "priya" }),
  ];

  it("puts lanes newest first", () => {
    const rows = buildRows(sessions, "none", names);
    expect(rows.map((r) => (r.kind === "lane" ? r.session.id : r.kind))).toEqual([
      "loose",
      "new",
      "mid",
      "old",
    ]);
  });

  it("groups by project, newest group first, no project last", () => {
    const rows = buildRows(sessions, "project", names);
    expect(rows.map((r) => (r.kind === "group" ? `[${r.label}]` : r.session.id))).toEqual([
      "[server]",
      "new",
      "[atlas]",
      "mid",
      "old",
      "[No project]",
      "loose",
    ]);
    const atlas = rows.find((r) => r.kind === "group" && r.label === "atlas");
    expect(atlas).toMatchObject({ sessions: 2, hue: expect.any(String) });
  });

  it("groups by the owner, the first participant", () => {
    const rows = buildRows(sessions, "person", names);
    expect(
      rows.filter((r) => r.kind === "group").map((r) => r.kind === "group" && r.label),
    ).toEqual(["priya", "sam"]);
  });
});

describe("handoffsOf", () => {
  it("marks a checkpoint whose author differs from the one before", () => {
    const cps = [cp("a", 1, "priya"), cp("c", 3, "priya"), cp("b", 2, "sam")];
    const h = handoffsOf(cps);
    expect([...h.keys()]).toEqual(["b", "c"]);
    expect(h.get("b")!.id).toBe("priya");
    expect(h.get("c")!.id).toBe("sam");
  });
});

describe("moveFocus", () => {
  const lanes: NavLane[] = [
    {
      key: "L1",
      marks: [
        { key: "a", x: 10 },
        { key: "b", x: 100 },
        { key: "c", x: 300 },
      ],
    },
    { key: "L2", marks: [] },
    {
      key: "L3",
      marks: [
        { key: "d", x: 90 },
        { key: "e", x: 280 },
      ],
    },
  ];

  it("walks a lane, with the title before the first mark", () => {
    expect(moveFocus(lanes, { lane: "L1", mark: null }, "ArrowRight")).toEqual({
      lane: "L1",
      mark: "a",
    });
    expect(moveFocus(lanes, { lane: "L1", mark: "a" }, "ArrowRight")).toEqual({
      lane: "L1",
      mark: "b",
    });
    expect(moveFocus(lanes, { lane: "L1", mark: "c" }, "ArrowRight")).toEqual({
      lane: "L1",
      mark: "c",
    });
    expect(moveFocus(lanes, { lane: "L1", mark: "a" }, "ArrowLeft")).toEqual({
      lane: "L1",
      mark: null,
    });
    expect(moveFocus(lanes, { lane: "L1", mark: null }, "ArrowLeft")).toEqual({
      lane: "L1",
      mark: null,
    });
  });

  it("jumps to a lane's ends", () => {
    expect(moveFocus(lanes, { lane: "L1", mark: "b" }, "Home")).toEqual({ lane: "L1", mark: null });
    expect(moveFocus(lanes, { lane: "L1", mark: null }, "End")).toEqual({ lane: "L1", mark: "c" });
    expect(moveFocus(lanes, { lane: "L2", mark: null }, "End")).toEqual({ lane: "L2", mark: null });
  });

  it("moves between lanes onto the mark nearest in time", () => {
    // From b (x 100) past an empty lane: its title.
    expect(moveFocus(lanes, { lane: "L1", mark: "b" }, "ArrowDown")).toEqual({
      lane: "L2",
      mark: null,
    });
    expect(moveFocus(lanes, { lane: "L3", mark: "e" }, "ArrowUp")).toEqual({
      lane: "L2",
      mark: null,
    });
    const skip: NavLane[] = [lanes[0]!, lanes[2]!];
    expect(moveFocus(skip, { lane: "L1", mark: "b" }, "ArrowDown")).toEqual({
      lane: "L3",
      mark: "d",
    });
    expect(moveFocus(skip, { lane: "L3", mark: "e" }, "ArrowUp")).toEqual({
      lane: "L1",
      mark: "c",
    });
    // From a title, to the next title; at the edges, stays.
    expect(moveFocus(skip, { lane: "L1", mark: null }, "ArrowDown")).toEqual({
      lane: "L3",
      mark: null,
    });
    expect(moveFocus(skip, { lane: "L1", mark: "a" }, "ArrowUp")).toEqual({
      lane: "L1",
      mark: "a",
    });
  });

  it("ignores other keys, and recovers from a stale position", () => {
    expect(moveFocus(lanes, { lane: "L1", mark: "a" }, "x")).toBeNull();
    expect(moveFocus(lanes, { lane: "gone", mark: "z" }, "ArrowRight")).toEqual({
      lane: "L1",
      mark: null,
    });
    expect(moveFocus([], null, "ArrowRight")).toBeNull();
  });
});

describe("stepZoom and rubberband", () => {
  it("clamps zoom steps at the ends", () => {
    expect(stepZoom("day", -1)).toBe("hour");
    expect(stepZoom("hour", -1)).toBe("hour");
    expect(stepZoom("day", 1)).toBe("week");
    expect(stepZoom("week", 1)).toBe("week");
  });

  it("resists more the further it is pulled", () => {
    const a = rubberband(50, 800);
    const b = rubberband(500, 800);
    expect(a).toBeLessThan(50);
    expect(b).toBeLessThan(500 * 0.55);
    expect(b / 500).toBeLessThan(a / 50);
    expect(rubberband(-50, 800)).toBe(-a);
  });
});

function session(
  id: string,
  start: number,
  end: number | null,
  opts: { projectId?: string; projectName?: string; owner?: string } = {},
): TraceSession {
  const owner = { id: opts.owner ?? "priya", name: opts.owner ?? "priya" };
  return {
    id,
    title: id,
    projectId: opts.projectId,
    projectName: opts.projectName,
    startedAt: new Date(start).toISOString(),
    endedAt: end === null ? null : new Date(end).toISOString(),
    participants: [owner],
    checkpoints: [],
  };
}

function cp(id: string, minute: number, who: string): TraceCheckpoint {
  return {
    id,
    sessionId: "s",
    at: new Date(T0 + minute * MINUTE).toISOString(),
    author: { id: who, name: who },
    title: id,
  };
}
