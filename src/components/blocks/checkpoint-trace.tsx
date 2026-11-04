"use client";

/**
 * The checkpoint trace: Timeline's second lens. Time runs across, each
 * session is a lane, and its checkpoints are the marks on it, each one the
 * face of the person who drove the session when it landed. The calendar
 * answers "which sessions happened"; this answers "how did the software get
 * built, and by whom".
 *
 * What each encoding is for (the brief is in the PR that added it):
 *
 *   bar length            where time went: wall-clock from start to end
 *   bar tint              which project: its identity hue, faint, so the
 *                         faces stay the loudest thing on the lane
 *   hollow, dashed bar    a session that produced no checkpoint
 *   face at a node        who landed the checkpoint
 *   outline ring on face  a handoff: someone other than the previous author
 *   count pill            checkpoints that would overlap at this zoom
 *   breathing edge        still live; it runs to the now line
 *   error cap             the session ended in error (status, never a hue)
 *
 * Pure props, like every block here: per project or per organisation is only
 * which sessions the host passes.
 *
 * **Scrolling.** One scroller, both axes. The axis is sticky to its top, the
 * lane labels sticky to its left, so the corner they share stays put while
 * the field moves under both. Lanes are virtualized (`@tanstack/react-virtual`,
 * the optional peer, which is why this is an entry of its own like
 * `TimelineCalendar`): an organisation's month is hundreds of lanes. Axis
 * ticks are computed only for the screens either side of the one in view,
 * and that window moves by whole screens, so horizontal scrolling re-renders
 * once a screen rather than once a frame.
 *
 * **Panning.** Trackpads and Shift+wheel scroll natively. Dragging the empty
 * field captures the pointer and tracks 1:1, glides on release with momentum
 * projected at Apple's 0.998 decay, and rubber-bands past either end; a pull
 * far enough asks for more time (`onRangeChange`). The band is written as a
 * transform straight onto each mounted track, not through an inherited
 * variable, so a drag does not restyle every node under it.
 *
 * **Keyboard.** One tab stop for the whole trace (roving `tabIndex`).
 * Left/Right walk a lane's marks, its title the stop before the first;
 * Up/Down move to the mark nearest in time on the next lane; Home/End go to a
 * lane's ends; Enter opens; `+`/`-` zoom. Keyboard focus shows the card at
 * once and never animates.
 */

import { useVirtualizer } from "@tanstack/react-virtual";
import { GitBranch, TriangleAlert } from "lucide-react";
import { animate } from "motion/react";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

import { HUE_BG, hueFor } from "../../lib/hue.ts";
import { SPRING_DOCK } from "../../lib/motion.ts";
import type { LabelTone } from "../../lib/types.ts";
import { cn } from "../../lib/utils.ts";
import { Button } from "../../ui/button.tsx";
import { Icon } from "../../ui/icon.tsx";
import { Segmented } from "../../ui/segmented.tsx";
import {
  isTooltipWarm,
  markTooltipClosed,
  markTooltipOpen,
  prefersReducedMotion,
  TOOLTIP_OPEN_DELAY,
} from "../../ui/tooltip-timing.ts";
import { initialsOf } from "../../lib/initials.ts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.tsx";
import { AvatarStack } from "../ui/avatar-stack.tsx";
import { EmptyState } from "../ui/empty-state.tsx";
import { Skeleton } from "../ui/skeleton.tsx";
import {
  axisTicks,
  buildRows,
  checkpointTitle,
  clusterMarks,
  extentOf,
  handoffsOf,
  moveFocus,
  NODE,
  rubberband,
  stepZoom,
  timeScale,
  toMs,
  TRACE_ZOOMS,
  ZOOM_SPAN,
  type NavLane,
  type TimeScale,
  type TraceAuthor,
  type TraceCheckpoint,
  type TraceGroup,
  type TraceGroupBy,
  type TraceMark,
  type TracePosition,
  type TraceRange,
  type TraceRow,
  type TraceSession,
  type TraceZoom,
} from "./checkpoint-trace-model.ts";

export type {
  TraceAuthor,
  TraceCheckpoint,
  TraceGroupBy,
  TraceRange,
  TraceSession,
  TraceZoom,
} from "./checkpoint-trace-model.ts";

/* ── Geometry, in px. JS positions every mark, so the sizes live here. ─── */

const LABEL_W = 240;
const AXIS_H = 32;
const LANE_H = 44;
const GROUP_H = 36;
/** How far a rubber-banded pull must reach before it asks for more time. */
const PULL_FOR_MORE = 72;
/** Momentum: Apple's scroll deceleration, per millisecond. */
const DECAY = 0.998;

/* ── Labels ────────────────────────────────────────────────────────────── */

export interface TraceLabels {
  /** The region's name. */
  region: string;
  /** The lane list's name, and the corner cell when ungrouped. */
  sessions: string;
  zoom: string;
  zoomLevels: Record<TraceZoom, string>;
  /** The jump-to-now button, and the now line's flag. */
  now: string;
  untitled: string;
  noProject: string;
  noOwner: string;
  emptyTitle: string;
  emptyDescription: string;
  errorTitle: string;
  loading: string;
  /** "Checkpoint by Priya, 14:02: Fix auth redirect". */
  checkpoint: (c: TraceCheckpoint, at: string, handoffFrom?: TraceAuthor) => string;
  /** A count pill's name; `canZoom` says whether opening it zooms in. */
  cluster: (count: number, from: string, to: string, authors: string[], canZoom: boolean) => string;
  /** A lane title's name. `s.title` arrives with `untitled` already in
   *  place of an empty one. Start it with the title: that is the label's only
   *  text assistive tech sees, and it must be part of the name. */
  session: (s: TraceSession, start: string, end: string | null, checkpoints: number) => string;
  /** "12 sessions · 40 checkpoints" under a group's name. */
  groupMeta: (sessions: number, checkpoints: number) => string;
  /** "Took over from Sam": a handoff, in the card and the checkpoint's name. */
  handoff: (from: TraceAuthor) => string;
  /** A pill card's heading. */
  checkpoints: (count: number) => string;
  /** The hover card's footer on a pill. */
  clusterHint: (canZoom: boolean) => string;
  more: (count: number) => string;
  /** Said of an orphaned checkpoint, in its name and its card. */
  orphaned: string;
  /** The "+ more" cue's name, when a session's checkpoints were capped. */
  truncated: string;
  files: (count: number) => string;
}

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

export const DEFAULT_TRACE_LABELS: TraceLabels = {
  region: "Checkpoint trace",
  sessions: "Sessions",
  zoom: "Zoom",
  zoomLevels: { hour: "Hour", day: "Day", week: "Week" },
  now: "Now",
  untitled: "Untitled session",
  noProject: "No project",
  noOwner: "No owner",
  emptyTitle: "No sessions in this range",
  emptyDescription: "Sessions show here as lanes, with a face for every checkpoint they land.",
  errorTitle: "The trace didn't load",
  loading: "Loading sessions",
  checkpoint: (c, at, from) =>
    `Checkpoint by ${c.author.name}, ${at}: ${checkpointTitle(c)}${from ? `. Took over from ${from.name}` : ""}`,
  handoff: (from) => `Took over from ${from.name}`,
  checkpoints: (n) => plural(n, "checkpoint", "checkpoints"),
  cluster: (n, from, to, authors, canZoom) =>
    `${n} checkpoints, ${from} to ${to}, by ${authors.join(", ")}${canZoom ? ". Zoom in" : ""}`,
  session: (s, start, end, n) =>
    [
      s.title,
      s.agentLabel,
      s.projectName,
      end ? `${start} to ${end}` : `live since ${start}`,
      s.checkpointsTruncated
        ? `more than ${n} checkpoints`
        : plural(n, "checkpoint", "checkpoints"),
      s.status === "error" && "ended in error",
    ]
      .filter(Boolean)
      .join(", "),
  groupMeta: (s, c) =>
    `${plural(s, "session", "sessions")} · ${plural(c, "checkpoint", "checkpoints")}`,
  clusterHint: (canZoom) => (canZoom ? "Click to zoom in" : "Click to open the session"),
  more: (n) => `${n} more`,
  files: (n) => plural(n, "file", "files"),
  orphaned: "Not on any branch",
  truncated: "More checkpoints than shown",
};

/* ── Props ─────────────────────────────────────────────────────────────── */

export interface CheckpointTraceProps {
  sessions: readonly TraceSession[];
  /**
   * The stretch of time the trace covers; the view scrolls within it.
   * Defaults to the sessions' own extent, padded to the zoom's unit.
   */
  range?: TraceRange;
  /**
   * Called when the user pulls past either end and asks for more: the range
   * one zoom step longer on that side. Without `range` the trace extends
   * itself as well; with it, the host decides (and fetches).
   */
  onRangeChange?: (range: TraceRange) => void;
  /** Controlled zoom. Leave it unset to let the trace own it (`defaultZoom`). */
  zoom?: TraceZoom;
  defaultZoom?: TraceZoom;
  onZoomChange?: (zoom: TraceZoom) => void;
  groupBy?: TraceGroupBy;
  /** The present. Unset, the trace keeps its own clock (every 30 seconds). */
  now?: string | number | Date;
  onOpenSession?: (sessionId: string) => void;
  onOpenCheckpoint?: (checkpoint: TraceCheckpoint) => void;
  /** A face. Defaults to the package's `Avatar`: the photo, or initials. */
  renderAvatar?: (author: TraceAuthor, sizePx: number) => ReactNode;
  /** The agent's mark beside its name in a lane's label. */
  renderAgentMark?: (session: TraceSession) => ReactNode;
  loading?: boolean;
  /** An error replaces the trace: a string is the description under
   *  `labels.errorTitle`; a node is drawn as it is (bring a retry). */
  error?: ReactNode;
  /** Replaces the default empty state. */
  empty?: ReactNode;
  labels?: Partial<TraceLabels>;
  /** Drawn at the left of the header row, before the zoom control: the
   *  host's own filters (group by, project, person). */
  toolbar?: ReactNode;
  /** BCP 47 locale for times; the runtime's by default. */
  locale?: string;
  className?: string;
}

/* ── Helpers ───────────────────────────────────────────────────────────── */

/** The faint bar fill per project hue; whole strings so Tailwind sees them. */
const BAR_FILL: Record<LabelTone, string> = {
  grey: "bg-border-strong",
  red: "bg-hue-red/35",
  orange: "bg-hue-orange/35",
  yellow: "bg-hue-yellow/35",
  green: "bg-hue-green/35",
  cyan: "bg-hue-cyan/35",
  blue: "bg-hue-blue/35",
  purple: "bg-hue-purple/35",
  pink: "bg-hue-pink/35",
};

function defaultAvatar(author: TraceAuthor, size: number) {
  return (
    <Avatar size={size <= 14 ? "3xs" : size <= 16 ? "2xs" : "xs"}>
      {author.avatarUrl && <AvatarImage src={author.avatarUrl} alt="" />}
      <AvatarFallback>{initialsOf(author.name)}</AvatarFallback>
    </Avatar>
  );
}

function useFormatters(locale: string | undefined, multiDay: boolean) {
  return useMemo(() => {
    const time = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    const day = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const weekday = new Intl.DateTimeFormat(locale, { weekday: "short" });
    return {
      time: (t: number) => time.format(t),
      day: (t: number) => day.format(t),
      /** A moment, with its weekday when the trace spans more than a day. */
      at: (t: number) => (multiDay ? `${weekday.format(t)} ${time.format(t)}` : time.format(t)),
      full: (t: number) => `${day.format(t)}, ${time.format(t)}`,
    };
  }, [locale, multiDay]);
}

type Mark = TraceMark<TraceCheckpoint>;

interface Lane {
  row: Extract<TraceRow, { kind: "lane" }>;
  marks: Mark[];
  handoffs: Map<string, TraceAuthor>;
  x0: number;
  x1: number;
}

/** `data-focus` value for a position; the title is `:title`. */
const focusId = (lane: string, mark: string | null) => `${lane}|${mark ?? ":title"}`;

/* ── The component ─────────────────────────────────────────────────────── */

export function CheckpointTrace({
  sessions,
  range,
  onRangeChange,
  zoom: zoomProp,
  defaultZoom = "day",
  onZoomChange,
  groupBy = "none",
  now: nowProp,
  onOpenSession,
  onOpenCheckpoint,
  renderAvatar = defaultAvatar,
  renderAgentMark,
  loading = false,
  error,
  empty,
  labels: labelsProp,
  toolbar,
  locale,
  className,
}: CheckpointTraceProps) {
  const labels = useMemo(() => ({ ...DEFAULT_TRACE_LABELS, ...labelsProp }), [labelsProp]);

  /* zoom, controlled or not */
  const [zoomState, setZoomState] = useState<TraceZoom>(defaultZoom);
  const zoom = zoomProp ?? zoomState;

  /* the clock */
  const [clock, setClock] = useState(() => Date.now());
  useEffect(() => {
    if (nowProp !== undefined) return;
    const id = setInterval(() => setClock(Date.now()), 30_000);
    return () => clearInterval(id);
  }, [nowProp]);
  const now = nowProp !== undefined ? toMs(nowProp) : clock;

  /* the scroller and its size */
  const scroller = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ width: 0, ready: false });
  // The scroller exists only in the trace state, not while loading, failed or
  // empty; the effects that hold it re-attach when it mounts.
  const traceMounted = !loading && !error && sessions.length > 0;
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const measure = () =>
      setViewport((v) =>
        v.width === el.clientWidth && v.ready ? v : { width: el.clientWidth, ready: true },
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [traceMounted]);
  const trackViewport = Math.max(0, viewport.width - LABEL_W);

  /* the range: the host's, or the data's own extent plus whatever was pulled in */
  const [pulled, setPulled] = useState({ before: 0, after: 0 });
  // Follows `now` (every 30s) so the default end always clears the present;
  // its start does not move, so the view does not either.
  const extentNow = range ? 0 : now;
  const extent = useMemo(() => {
    if (range) return { from: toMs(range.from), to: toMs(range.to) };
    const own = extentOf(sessions, extentNow, zoom);
    return { from: own.from - pulled.before, to: own.to + pulled.after };
  }, [range, sessions, zoom, pulled, extentNow]);

  const scale = useMemo(
    () => timeScale(extent, zoom, trackViewport),
    [extent, zoom, trackViewport],
  );
  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  const multiDay = scale.to - scale.from > 24 * 3_600_000;
  const fmt = useFormatters(locale, multiDay);

  /* rows, lanes and their marks */
  const rows = useMemo(
    () => buildRows(sessions, groupBy, { noProject: labels.noProject, noOwner: labels.noOwner }),
    [sessions, groupBy, labels.noProject, labels.noOwner],
  );
  const lanes = useMemo(() => {
    const byKey = new Map<string, Lane>();
    for (const row of rows) {
      if (row.kind !== "lane") continue;
      const s = row.session;
      const points = s.checkpoints
        .map((c) => ({ t: toMs(c.at), c }))
        .filter((p) => p.t >= scale.from && p.t <= scale.to)
        .map((p) => ({ x: scale.x(p.t), key: p.c.id, item: p.c }));
      byKey.set(row.key, {
        row,
        marks: clusterMarks(points),
        handoffs: handoffsOf(s.checkpoints),
        x0: Math.max(0, scale.x(toMs(s.startedAt))),
        x1: Math.min(scale.width, scale.x(s.endedAt ? toMs(s.endedAt) : now)),
      });
    }
    return byKey;
  }, [rows, scale, now]);
  const navLanes = useMemo<NavLane[]>(
    () => [...lanes.values()].map((l) => ({ key: l.row.key, marks: l.marks })),
    [lanes],
  );
  const rowIndex = useMemo(() => new Map(rows.map((r, i) => [r.key, i])), [rows]);

  /* where each lane sits in its group, for aria-posinset / aria-setsize */
  const placeOf = useMemo(() => {
    const place = new Map<string, { pos: number; size: number }>();
    const perGroup = new Map<string, string[]>();
    for (const row of rows) {
      if (row.kind !== "lane") continue;
      const g = row.groupId ?? "";
      const keys = perGroup.get(g);
      if (keys) keys.push(row.key);
      else perGroup.set(g, [row.key]);
    }
    for (const keys of perGroup.values())
      keys.forEach((k, i) => place.set(k, { pos: i + 1, size: keys.length }));
    return place;
  }, [rows]);

  /* vertical virtualization */
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scroller.current,
    estimateSize: (i) => (rows[i]?.kind === "group" ? GROUP_H : LANE_H),
    getItemKey: (i) => rows[i]?.key ?? i,
    overscan: 8,
    scrollMargin: AXIS_H,
    initialRect: { width: 0, height: 600 },
  });
  const virtualRows = virtualizer.getVirtualItems();

  /* the horizontal window ticks are computed for: whole screens, so a scroll
     re-renders once a screen */
  const [screen, setScreen] = useState(0);
  const view = useRef({ centreT: 0 });

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const s = scaleRef.current;
    view.current.centreT = s.t(el.scrollLeft + trackViewport / 2);
    const next = trackViewport > 0 ? Math.floor(el.scrollLeft / trackViewport) : 0;
    setScreen((prev) => (prev === next ? prev : next));
    hideCard();
  };

  const ticks = useMemo(() => {
    const w = Math.max(trackViewport, 600);
    return axisTicks(scale, zoom, (screen - 1) * w, (screen + 2) * w);
  }, [scale, zoom, screen, trackViewport]);

  /* keep the time in view fixed across a zoom or a range change */
  const anchor = useRef<{ t: number; screenX: number } | null>(null);
  const placed = useRef(false);
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el || !viewport.ready || trackViewport === 0) return;
    if (!placed.current) {
      // First paint with data: the present (or the end) a fifth from the right.
      if (rows.length === 0) return;
      placed.current = true;
      const target = Math.min(now, scale.to);
      el.scrollLeft = Math.max(0, scale.x(target) - trackViewport * 0.8);
      view.current.centreT = scale.t(el.scrollLeft + trackViewport / 2);
      return;
    }
    const a = anchor.current ?? { t: view.current.centreT, screenX: trackViewport / 2 };
    anchor.current = null;
    el.scrollLeft = Math.max(0, scale.x(a.t) - a.screenX);
    view.current.centreT = scale.t(el.scrollLeft + trackViewport / 2);
    // Only a change of scale moves the view; `now` ticking does not.
  }, [scale.pxPerMs, scale.from, viewport.ready, trackViewport > 0, rows.length > 0]);

  const setZoom = useCallback(
    (next: TraceZoom, at?: { t: number; screenX: number }) => {
      if (next === zoom) return;
      if (at) anchor.current = at;
      // Every mark moves and re-keys: a card left open would float free.
      hideCard();
      if (zoomProp === undefined) setZoomState(next);
      onZoomChange?.(next);
    },
    [zoom, zoomProp, onZoomChange],
  );

  const jumpToNow = () => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({
      left: Math.max(0, scale.x(now) - trackViewport * 0.8),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  /* ⌘/Ctrl + wheel (and trackpad pinch, which arrives as ctrl + wheel) zooms
     about the pointer */
  const wheel = useRef({ acc: 0, setZoom, zoom });
  wheel.current.setZoom = setZoom;
  wheel.current.zoom = zoom;
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const w = wheel.current;
      w.acc += e.deltaY;
      if (Math.abs(w.acc) < 40) return;
      const dir = w.acc > 0 ? 1 : -1;
      w.acc = 0;
      const screenX = e.clientX - el.getBoundingClientRect().left - LABEL_W;
      if (screenX < 0) return;
      const t = scaleRef.current.t(el.scrollLeft + screenX);
      w.setZoom(stepZoom(w.zoom, dir), { t, screenX });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [traceMounted]);

  /* ── pan: drag, glide, rubber band ── */

  const drag = useRef<{
    id: number;
    x0: number;
    s0: number;
    pull: number;
    samples: { x: number; t: number }[];
    layers: HTMLElement[];
  } | null>(null);
  const motionStop = useRef<(() => void) | null>(null);

  const stopMotion = () => {
    motionStop.current?.();
    motionStop.current = null;
  };
  useEffect(() => stopMotion, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || e.pointerType === "touch") return;
    const target = e.target as HTMLElement;
    if (!target.closest("[data-pan]") || target.closest("button, a, [data-mark]")) return;
    const el = scroller.current;
    if (!el) return;
    stopMotion();
    // Captured, so the drag keeps tracking when the pointer leaves the field.
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // A synthetic pointer (tests, automation) has nothing to capture.
    }
    drag.current = {
      id: e.pointerId,
      x0: e.clientX,
      s0: el.scrollLeft,
      pull: 0,
      samples: [{ x: e.clientX, t: e.timeStamp }],
      layers: [...el.querySelectorAll<HTMLElement>("[data-pan-layer]")],
    };
    el.dataset.dragging = "";
    hideCard();
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = scroller.current;
    if (!d || !el || e.pointerId !== d.id) return;
    const raw = d.s0 - (e.clientX - d.x0);
    const max = el.scrollWidth - el.clientWidth;
    let pull = 0;
    if (raw < 0) pull = rubberband(-raw, trackViewport);
    else if (raw > max) pull = -rubberband(raw - max, trackViewport);
    el.scrollLeft = Math.min(max, Math.max(0, raw));
    if (pull !== d.pull) {
      d.pull = pull;
      for (const layer of d.layers) layer.style.transform = pull ? `translateX(${pull}px)` : "";
    }
    d.samples.push({ x: e.clientX, t: e.timeStamp });
    while (d.samples.length > 2 && e.timeStamp - d.samples[0]!.t > 100) d.samples.shift();
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>, cancelled = false) => {
    const d = drag.current;
    const el = scroller.current;
    if (!d || !el || e.pointerId !== d.id) return;
    drag.current = null;
    delete el.dataset.dragging;
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
    const still = prefersReducedMotion();

    if (d.pull !== 0) {
      // Past an end: far enough asks for more time; either way the band returns.
      if (!cancelled && Math.abs(d.pull) >= PULL_FOR_MORE)
        extendRange(d.pull > 0 ? "before" : "after");
      if (still) for (const layer of d.layers) layer.style.transform = "";
      else {
        const controls = animate(
          d.layers,
          { transform: "translateX(0px)" },
          { ...SPRING_DOCK, velocity: 0 },
        );
        motionStop.current = () => controls.stop();
      }
      return;
    }
    if (still || cancelled) return;

    // Glide: hand the release velocity to an exponential decay. Only the last
    // 100ms count: a drag that stopped and was then let go has no velocity.
    const recent = d.samples.filter((s) => e.timeStamp - s.t <= 100);
    const first = recent[0];
    const last = recent.at(-1);
    if (!first || !last || e.timeStamp - last.t > 50) return;
    const dt = last.t - first.t;
    let v = dt > 0 ? -(last.x - first.x) / dt : 0; // scroll px per ms
    if (Math.abs(v) < 0.05) return;
    let prev: number | undefined;
    let frame = 0;
    const glide = (time: number) => {
      // The first frame only sets the clock: rAF's timestamp is the frame's
      // start, which can be earlier than anything read before it.
      const step = prev === undefined ? 0 : time - prev;
      prev = time;
      const max = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + v * step;
      el.scrollLeft = Math.min(max, Math.max(0, next));
      v *= Math.pow(DECAY, step);
      if (Math.abs(v) < 0.02 || next <= 0 || next >= max) return;
      frame = requestAnimationFrame(glide);
    };
    frame = requestAnimationFrame(glide);
    motionStop.current = () => cancelAnimationFrame(frame);
  };

  const extendRange = (side: "before" | "after") => {
    const span = ZOOM_SPAN[zoom];
    const next = {
      from: new Date(side === "before" ? scale.from - span : scale.from).toISOString(),
      to: new Date(side === "after" ? scale.to + span : scale.to).toISOString(),
    };
    if (!range) setPulled((p) => ({ ...p, [side]: p[side] + span }));
    onRangeChange?.(next);
  };

  /* ── the hover card ── */

  const cardId = useId();
  const [card, setCard] = useState<{
    lane: string;
    mark: string;
    el: HTMLElement;
    instant: boolean;
  } | null>(null);
  const cardTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const cardOpen = useRef(false);
  cardOpen.current = card !== null;

  const showCard = (el: HTMLElement, instant: boolean) => {
    const lane = el.dataset.lane!;
    const mark = el.dataset.mark!;
    // Moving across a mark's own children fires pointerover again.
    if (card && card.lane === lane && card.mark === mark && card.el === el) return;
    clearTimeout(cardTimer.current);
    const open = (skipEntrance: boolean) => {
      if (!cardOpen.current) markTooltipOpen();
      setCard({ lane, mark, el, instant: skipEntrance });
    };
    if (instant || cardOpen.current || isTooltipWarm()) open(true);
    else cardTimer.current = setTimeout(() => open(false), TOOLTIP_OPEN_DELAY);
  };
  function hideCard() {
    clearTimeout(cardTimer.current);
    if (cardOpen.current) markTooltipClosed();
    setCard(null);
  }
  useEffect(() => () => clearTimeout(cardTimer.current), []);

  const markOf = (target: EventTarget | null) =>
    (target as HTMLElement | null)?.closest?.<HTMLElement>("[data-mark]") ?? null;

  /* ── keyboard ── */

  const [active, setActive] = useState<TracePosition | null>(null);
  const pendingFocus = useRef(false);

  // Clusters change their keys across zooms; fall back to the mark holding
  // the active checkpoint, or the title.
  const resolved = useMemo<TracePosition | null>(() => {
    if (!active) return null;
    const lane = lanes.get(active.lane);
    if (!lane) return null;
    if (active.mark === null) return active;
    const mark =
      lane.marks.find((m) => m.key === active.mark) ??
      lane.marks.find((m) => m.members.some((c) => c.id === active.mark));
    return { lane: active.lane, mark: mark ? mark.key : null };
  }, [active, lanes]);

  const mountedLanes = virtualRows
    .map((v) => rows[v.index])
    .filter((r): r is Extract<TraceRow, { kind: "lane" }> => r?.kind === "lane");
  const tabStop =
    resolved && mountedLanes.some((l) => l.key === resolved.lane)
      ? focusId(resolved.lane, resolved.mark)
      : mountedLanes[0]
        ? focusId(mountedLanes[0].key, null)
        : null;

  const reveal = (pos: TracePosition) => {
    const el = scroller.current;
    const index = rowIndex.get(pos.lane);
    if (index !== undefined) virtualizer.scrollToIndex(index, { align: "auto" });
    if (!el || pos.mark === null) return;
    const mark = lanes.get(pos.lane)?.marks.find((m) => m.key === pos.mark);
    if (!mark) return;
    const pad = 24;
    if (mark.left - pad < el.scrollLeft) el.scrollLeft = Math.max(0, mark.left - pad);
    else if (mark.right + pad > el.scrollLeft + trackViewport)
      el.scrollLeft = mark.right + pad - trackViewport;
  };

  useEffect(() => {
    if (!pendingFocus.current || !resolved) return;
    let tries = 0;
    let frame = 0;
    const tryFocus = () => {
      const target = scroller.current?.querySelector<HTMLElement>(
        `[data-focus="${CSS.escape(focusId(resolved.lane, resolved.mark))}"]`,
      );
      if (target) {
        pendingFocus.current = false;
        target.focus({ preventScroll: true });
        if (target.dataset.mark) showCard(target, true);
        else hideCard();
      } else if (tries++ < 10) frame = requestAnimationFrame(tryFocus);
      // Never mounted: drop the request rather than steal focus later.
      else pendingFocus.current = false;
    };
    tryFocus();
    return () => cancelAnimationFrame(frame);
  });

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "+" || e.key === "=" || e.key === "-") {
      e.preventDefault();
      setZoom(stepZoom(zoom, e.key === "-" ? 1 : -1));
      return;
    }
    if (e.key === "Escape") {
      hideCard();
      return;
    }
    const from = (e.target as HTMLElement).closest<HTMLElement>("[data-focus]");
    if (!from) return;
    const here = { lane: from.dataset.lane!, mark: from.dataset.mark ?? null };
    const next = moveFocus(navLanes, here, e.key);
    if (!next) return;
    e.preventDefault();
    pendingFocus.current = true;
    setActive(next);
    reveal(next);
  };

  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-focus]");
    if (!el) return;
    const pos = { lane: el.dataset.lane!, mark: el.dataset.mark ?? null };
    if (!resolved || resolved.lane !== pos.lane || resolved.mark !== pos.mark) setActive(pos);
    if (el.dataset.mark && el.matches(":focus-visible")) showCard(el, true);
  };

  /* ── opening ── */

  const openMark = (lane: Lane, mark: Mark, el: HTMLElement, fromKeyboard: boolean) => {
    if (mark.members.length === 1) {
      onOpenCheckpoint?.(mark.members[0]!);
      return;
    }
    if (zoom === TRACE_ZOOMS[0]) {
      onOpenSession?.(lane.row.session.id);
      return;
    }
    const box = scroller.current?.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const screenX = box ? r.left + r.width / 2 - box.left - LABEL_W : trackViewport / 2;
    setActive({ lane: lane.row.key, mark: mark.key });
    // Follow with focus only from the keyboard: a mouse click would leave a
    // focus ring on whatever mark lands under the pointer.
    pendingFocus.current = fromKeyboard;
    hideCard();
    setZoom(stepZoom(zoom, -1), { t: scale.t(mark.x), screenX });
  };

  // Lanes are memoized; a handler made fresh each render would redraw every
  // mounted lane on every scroll frame.
  const openMarkRef = useRef(openMark);
  openMarkRef.current = openMark;
  const onOpenMark = useCallback<typeof openMark>((...args) => openMarkRef.current(...args), []);

  /* ── states ── */

  const header = (
    <div className="flex h-control-lg shrink-0 items-center gap-2 border-b border-border px-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">{toolbar}</div>
      <Button
        variant="ghost"
        size="sm"
        onClick={jumpToNow}
        disabled={loading || !!error || now < scale.from || now > scale.to}
      >
        {labels.now}
      </Button>
      <Segmented
        size="sm"
        aria-label={labels.zoom}
        value={zoom}
        onValueChange={(z) => setZoom(z)}
        options={TRACE_ZOOMS.map((z) => ({ value: z, label: labels.zoomLevels[z] }))}
      />
    </div>
  );

  const shell = (body: ReactNode) => (
    <div
      ref={root}
      role="region"
      aria-label={labels.region}
      data-slot="checkpoint-trace"
      className={cn("relative flex h-full min-h-0 flex-col bg-background", className)}
    >
      {header}
      {body}
    </div>
  );

  if (error) {
    return shell(
      <div role="alert" className="flex flex-1 items-center justify-center">
        {typeof error === "string" ? (
          <EmptyState icon={TriangleAlert} title={labels.errorTitle} description={error} />
        ) : (
          error
        )}
      </div>,
    );
  }

  if (loading) {
    return shell(
      <div role="status" aria-busy="true" className="min-h-0 flex-1 overflow-hidden">
        <span className="sr-only">{labels.loading}</span>
        <div style={{ height: AXIS_H }} className="border-b border-border" />
        {SKELETON_LANES.map(([left, width], i) => (
          <div
            key={i}
            aria-hidden="true"
            className="flex items-center border-b border-border-subtle"
            style={{ height: LANE_H }}
          >
            <div className="flex flex-col gap-1.5 px-3" style={{ width: LABEL_W }}>
              <Skeleton className="h-2.5 w-3/4" />
              <Skeleton className="h-2 w-1/3" />
            </div>
            <div className="relative h-full flex-1">
              <Skeleton
                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full"
                style={{ left: `${left}%`, width: `${width}%` }}
              />
            </div>
          </div>
        ))}
      </div>,
    );
  }

  if (sessions.length === 0) {
    return shell(
      <div className="flex flex-1 items-center justify-center">
        {empty ?? <EmptyState title={labels.emptyTitle} description={labels.emptyDescription} />}
      </div>,
    );
  }

  /* ── the trace ── */

  // The mounted rows, cut into runs by group: each run is its group's
  // `<section>` with a list of its lanes. `display: contents`, so they add
  // semantics and no boxes, as in TimelineCalendar.
  const runs: { groupId: string | null; items: typeof virtualRows }[] = [];
  for (const v of virtualRows) {
    const row = rows[v.index];
    if (!row) continue;
    const groupId = row.kind === "group" ? row.id : row.groupId;
    const run = runs.at(-1);
    if (run && run.groupId === groupId) run.items.push(v);
    else runs.push({ groupId, items: [v] });
  }
  const groups = new Map(
    rows
      .filter((r): r is Extract<TraceRow, { kind: "group" }> => r.kind === "group")
      .map((g) => [g.id, g]),
  );
  // The group being read: the one the first lane under the axis belongs to.
  const reading = virtualRows.find((v) => v.end - AXIS_H > (virtualizer.scrollOffset ?? 0) + 1);
  const readingRow = reading ? rows[reading.index] : undefined;
  // Named in the corner only once its own header has scrolled under the
  // axis; while that header is in view the corner would only repeat it.
  const readingGroup =
    readingRow?.kind === "lane" && readingRow.groupId !== null
      ? groups.get(readingRow.groupId)
      : undefined;

  const nowX = scale.x(now);
  const nowInRange = now >= scale.from && now <= scale.to;
  const contentW = LABEL_W + scale.width;
  const totalH = virtualizer.getTotalSize();
  const majorTicks = ticks.filter((t) => t.major);

  const place = (v: (typeof virtualRows)[number], child: ReactNode, props: object = {}) => (
    <div
      key={v.key}
      className="absolute top-0 left-0"
      style={{ width: contentW, height: v.size, transform: `translateY(${v.start - AXIS_H}px)` }}
      {...props}
    >
      {child}
    </div>
  );

  const laneView = (lane: Lane) => (
    <LaneRow
      lane={lane}
      scale={scale}
      now={nowX}
      fmt={fmt}
      labels={labels}
      groupBy={groupBy}
      tabStop={tabStop}
      cardMark={card?.lane === lane.row.key ? card.mark : null}
      cardId={cardId}
      renderAvatar={renderAvatar}
      renderAgentMark={renderAgentMark}
      canZoom={zoom !== TRACE_ZOOMS[0]}
      onOpenSession={onOpenSession}
      onOpenMark={onOpenMark}
    />
  );

  return shell(
    <>
      <div
        ref={scroller}
        data-slot="checkpoint-trace-scroller"
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={(e) => onPointerUp(e, true)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hideCard();
        }}
        onPointerOver={(e) => {
          if (drag.current) return;
          const el = markOf(e.target);
          if (el) showCard(el, false);
        }}
        onPointerOut={(e) => {
          const el = markOf(e.target);
          if (el && !el.contains(e.relatedTarget as Node | null) && !el.matches(":focus-visible"))
            hideCard();
        }}
        className="group/trace relative min-h-0 flex-1 overflow-auto overscroll-x-contain select-none"
      >
        <div className="relative" style={{ width: contentW }}>
          {/* The axis: sticky to the top; its corner sticky to the left too. */}
          <div
            aria-hidden="true"
            className="sticky top-0 z-30 flex border-b border-border bg-background"
            style={{ height: AXIS_H, width: contentW }}
          >
            <div
              className="sticky left-0 z-10 flex shrink-0 items-center gap-1.5 border-r border-border bg-background px-3"
              style={{ width: LABEL_W }}
            >
              {readingGroup ? (
                <GroupMark group={readingGroup} renderAvatar={renderAvatar} />
              ) : (
                <span className="eyebrow">{labels.sessions}</span>
              )}
            </div>
            <div data-pan-layer className="relative flex-1">
              {ticks.map((tick) => (
                <Fragment key={tick.t}>
                  <span
                    className={cn(
                      "absolute bottom-0 w-px",
                      tick.major ? "h-full bg-border" : "h-1.5 bg-border",
                    )}
                    style={{ left: tick.x }}
                  />
                  {tick.labelled && (
                    <span
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 pl-1.5 text-2xs whitespace-nowrap tabular-nums",
                        tick.major ? "font-medium text-foreground" : "text-muted-foreground",
                      )}
                      style={{ left: tick.x }}
                    >
                      {tick.major && zoom !== "hour" ? fmt.day(tick.t) : fmt.time(tick.t)}
                    </span>
                  )}
                </Fragment>
              ))}
              {nowInRange && (
                <span
                  className="absolute bottom-0 -translate-x-1/2 rounded-t-sm bg-primary px-1 text-3xs font-medium text-primary-foreground"
                  style={{ left: nowX }}
                >
                  {labels.now}
                </span>
              )}
            </div>
          </div>

          <div data-pan className="relative cursor-grab" style={{ height: totalH - AXIS_H }}>
            {/* Gridlines and the now line, under the lanes. */}
            <div
              aria-hidden="true"
              data-pan-layer
              className="pointer-events-none absolute inset-y-0"
              style={{ left: LABEL_W, width: scale.width }}
            >
              {majorTicks.map((tick) => (
                <span
                  key={tick.t}
                  className="absolute inset-y-0 w-px bg-border-subtle"
                  style={{ left: tick.x }}
                />
              ))}
              {nowInRange && (
                <span className="absolute inset-y-0 w-px bg-primary" style={{ left: nowX }} />
              )}
            </div>

            {groupBy === "none" ? (
              <div role="list" aria-label={labels.sessions} className="contents">
                {virtualRows.map((v) => {
                  const row = rows[v.index];
                  const lane = row ? lanes.get(row.key) : undefined;
                  if (!lane) return null;
                  const where = placeOf.get(lane.row.key);
                  return place(v, laneView(lane), {
                    role: "listitem",
                    "aria-posinset": where?.pos,
                    "aria-setsize": where?.size,
                  });
                })}
              </div>
            ) : (
              runs.map((run) => {
                const group = run.groupId ? groups.get(run.groupId) : undefined;
                const first = run.items[0] && rows[run.items[0].index];
                const heading = first?.kind === "group" ? run.items[0] : undefined;
                const laneItems = heading ? run.items.slice(1) : run.items;
                return (
                  <section key={run.groupId} aria-label={group?.label} className="contents">
                    {heading &&
                      group &&
                      place(
                        heading,
                        <GroupRow group={group} labels={labels} renderAvatar={renderAvatar} />,
                      )}
                    {laneItems.length > 0 && (
                      <div role="list" aria-label={group?.label} className="contents">
                        {laneItems.map((v) => {
                          const row = rows[v.index];
                          const lane = row ? lanes.get(row.key) : undefined;
                          if (!lane) return null;
                          const where = placeOf.get(lane.row.key);
                          return place(v, laneView(lane), {
                            role: "listitem",
                            "aria-posinset": where?.pos,
                            "aria-setsize": where?.size,
                          });
                        })}
                      </div>
                    )}
                  </section>
                );
              })
            )}
          </div>
        </div>
      </div>

      {card && (
        <TraceCard
          key={`${card.lane}|${card.mark}`}
          id={cardId}
          anchor={card.el}
          root={root.current}
          instant={card.instant}
          lane={lanes.get(card.lane)}
          markKey={card.mark}
          fmt={fmt}
          labels={labels}
          canZoom={zoom !== TRACE_ZOOMS[0]}
          renderAvatar={renderAvatar}
        />
      )}
    </>,
  );
}

/** Where the loading lanes' bars sit, in % of the track: a plausible spread. */
const SKELETON_LANES: [number, number][] = [
  [52, 40],
  [38, 30],
  [61, 22],
  [12, 46],
  [30, 18],
  [5, 34],
  [44, 26],
  [20, 15],
];

/* ── A group's header and mark ─────────────────────────────────────────── */

function GroupMark({
  group,
  renderAvatar,
}: {
  group: TraceGroup;
  renderAvatar: (a: TraceAuthor, size: number) => ReactNode;
}) {
  return (
    <span className="flex min-w-0 items-center gap-1.5">
      {group.person ? (
        <span aria-hidden="true" className="flex">
          {renderAvatar(group.person, 16)}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={cn("size-2 shrink-0 rounded-full", HUE_BG[group.hue ?? "grey"])}
        />
      )}
      <span className="truncate text-xs font-medium text-foreground">{group.label}</span>
    </span>
  );
}

const GroupRow = memo(function GroupRow({
  group,
  labels,
  renderAvatar,
}: {
  group: TraceGroup;
  labels: TraceLabels;
  renderAvatar: (a: TraceAuthor, size: number) => ReactNode;
}) {
  return (
    <div className="flex h-full items-end border-b border-border pb-1.5">
      <div
        role="heading"
        aria-level={3}
        className="sticky left-0 z-20 flex items-center gap-3 px-3"
        style={{ maxWidth: LABEL_W * 2 }}
      >
        <GroupMark group={group} renderAvatar={renderAvatar} />
        <span className="caption shrink-0 tabular-nums">
          {labels.groupMeta(group.sessions, group.checkpoints)}
        </span>
      </div>
    </div>
  );
});

/* ── A lane ────────────────────────────────────────────────────────────── */

type Fmt = ReturnType<typeof useFormatters>;

const LaneRow = memo(function LaneRow({
  lane,
  scale,
  now,
  fmt,
  labels,
  groupBy,
  tabStop,
  cardMark,
  cardId,
  renderAvatar,
  renderAgentMark,
  canZoom,
  onOpenSession,
  onOpenMark,
}: {
  lane: Lane;
  scale: TimeScale;
  now: number;
  fmt: Fmt;
  labels: TraceLabels;
  groupBy: TraceGroupBy;
  tabStop: string | null;
  /** The mark whose card is open on this lane, which it describes. */
  cardMark: string | null;
  cardId: string;
  renderAvatar: (a: TraceAuthor, size: number) => ReactNode;
  renderAgentMark?: (s: TraceSession) => ReactNode;
  canZoom: boolean;
  onOpenSession?: (id: string) => void;
  onOpenMark: (lane: Lane, mark: Mark, el: HTMLElement, fromKeyboard: boolean) => void;
}) {
  const s = lane.row.session;
  const key = lane.row.key;
  const status = s.status ?? (s.endedAt ? "settled" : "live");
  const live = status === "live";
  // The same key the project group uses, so a lane and its group agree.
  const tone = s.projectId ?? s.projectName ?? null;
  const hue: LabelTone = tone ? hueFor(tone) : "grey";
  const empty = s.checkpoints.length === 0;
  const start = toMs(s.startedAt);
  const end = s.endedAt ? toMs(s.endedAt) : null;
  const barRight = lane.x1;
  const barWidth = Math.max(2, barRight - lane.x0);
  const titleId = focusId(key, null);
  const agentMark = renderAgentMark?.(s);
  const visible = lane.x0 <= scale.width && lane.x1 >= 0;

  return (
    <div className="flex h-full border-b border-border-subtle">
      {/* The label column, sticky on the left. */}
      <button
        type="button"
        data-focus={titleId}
        data-lane={key}
        tabIndex={tabStop === titleId ? 0 : -1}
        onClick={() => onOpenSession?.(s.id)}
        className={cn(
          "sticky left-0 z-20 flex shrink-0 cursor-pointer flex-col justify-center gap-0.5 border-r border-border bg-background px-3 text-left",
          "transition-colors duration-fast ease-out-strong hover:bg-element-hover",
          "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
        )}
        style={{ width: LABEL_W }}
      >
        {/* Named by hidden text rather than `aria-label`: the visible lines
            are a subset of it, hidden from assistive tech, so no one hears
            the initials in the faces. */}
        <span className="sr-only">
          {labels.session(
            { ...s, title: s.title || labels.untitled },
            fmt.at(start),
            end === null ? null : fmt.at(end),
            s.checkpoints.length,
          )}
        </span>
        <span aria-hidden="true" className="flex min-w-0 items-center gap-1.5">
          {status !== "settled" && (
            <span
              aria-hidden="true"
              className={cn("size-1.5 shrink-0 rounded-full", live ? "bg-success" : "bg-error")}
            />
          )}
          <span className="truncate text-xs font-medium text-foreground">
            {s.title || labels.untitled}
          </span>
        </span>
        <span aria-hidden="true" className="flex min-w-0 items-center justify-between gap-2">
          <span className="caption flex min-w-0 items-center gap-1">
            {agentMark && <span className="flex shrink-0 items-center">{agentMark}</span>}
            {s.agentLabel && <span className="truncate">{s.agentLabel}</span>}
            {groupBy !== "project" && s.projectName && (
              <>
                {s.agentLabel && <span aria-hidden="true">·</span>}
                <span className={cn("size-1.5 shrink-0 rounded-full", HUE_BG[hue])} />
                <span className="truncate">{s.projectName}</span>
              </>
            )}
          </span>
          {s.participants.length > 0 && (
            <AvatarStack className="shrink-0">
              {s.participants.slice(0, 3).map((p) => (
                <span key={p.id} className="flex">
                  {renderAvatar(p, 14)}
                </span>
              ))}
            </AvatarStack>
          )}
        </span>
      </button>

      {/* The track. */}
      <div data-pan-layer className="relative h-full" style={{ width: scale.width }}>
        {visible && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full",
              empty ? "border border-dashed border-border-strong" : BAR_FILL[hue],
            )}
            style={{ left: lane.x0, width: barWidth }}
          />
        )}
        {live && visible && now >= 0 && now <= scale.width && (
          <span
            aria-hidden="true"
            data-slot="checkpoint-trace-live-edge"
            className="absolute top-1/2 size-2 -translate-1/2 rounded-full bg-success motion-safe:animate-pulse"
            style={{ left: barRight }}
          />
        )}
        {status === "error" && visible && (
          <span
            aria-hidden="true"
            className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-error"
            style={{ left: barRight - 1 }}
          />
        )}
        {s.checkpointsTruncated && visible && (
          <span
            title={labels.truncated}
            className="caption absolute top-1/2 -translate-y-1/2 pl-1.5 whitespace-nowrap"
            style={{ left: Math.max(barRight, (lane.marks.at(-1)?.right ?? 0) + 2) }}
          >
            <span aria-hidden="true">+ more</span>
            <span className="sr-only">{labels.truncated}</span>
          </span>
        )}
        {lane.marks.length > 0 && (
          <div role="list" aria-label={s.title || labels.untitled} className="contents">
            {lane.marks.map((mark) => (
              <MarkView
                key={mark.key}
                lane={lane}
                mark={mark}
                fmt={fmt}
                labels={labels}
                tabStop={tabStop}
                describedBy={cardMark === mark.key ? cardId : undefined}
                renderAvatar={renderAvatar}
                canZoom={canZoom}
                onOpen={onOpenMark}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

/* ── A mark: one checkpoint's face, or a count ─────────────────────────── */

function authorsOf(members: readonly TraceCheckpoint[]) {
  const seen = new Map<string, TraceAuthor>();
  for (const c of members) if (!seen.has(c.author.id)) seen.set(c.author.id, c.author);
  return [...seen.values()];
}

function MarkView({
  lane,
  mark,
  fmt,
  labels,
  tabStop,
  describedBy,
  renderAvatar,
  canZoom,
  onOpen,
}: {
  lane: Lane;
  mark: Mark;
  fmt: Fmt;
  labels: TraceLabels;
  tabStop: string | null;
  describedBy?: string;
  renderAvatar: (a: TraceAuthor, size: number) => ReactNode;
  canZoom: boolean;
  onOpen: (lane: Lane, mark: Mark, el: HTMLElement, fromKeyboard: boolean) => void;
}) {
  const id = focusId(lane.row.key, mark.key);
  const single = mark.members.length === 1;
  const c = mark.members[0]!;
  const handoff = single ? lane.handoffs.get(c.id) : undefined;
  // A pill is faded only when everything in it was lost.
  const orphaned = mark.members.every((m) => m.linkState === "orphaned");
  const authors = single ? [] : authorsOf(mark.members);
  const label = single
    ? labels.checkpoint(c, fmt.at(toMs(c.at)), handoff)
    : labels.cluster(
        mark.members.length,
        fmt.at(toMs(c.at)),
        fmt.at(toMs(mark.members.at(-1)!.at)),
        authors.map((a) => a.name),
        canZoom,
      ) + (orphaned ? `. ${labels.orphaned}` : "");
  const style: CSSProperties = { left: mark.left, width: mark.right - mark.left };

  return (
    <div role="listitem" className="absolute top-1/2 -translate-y-1/2" style={style}>
      <button
        type="button"
        data-focus={id}
        data-lane={lane.row.key}
        data-mark={mark.key}
        data-handoff={handoff ? "" : undefined}
        data-orphaned={orphaned ? "" : undefined}
        tabIndex={tabStop === id ? 0 : -1}
        aria-describedby={describedBy}
        // `detail` is 0 for a click synthesised from Enter or Space.
        onClick={(e) => onOpen(lane, mark, e.currentTarget, e.detail === 0)}
        className={cn(
          "relative flex w-full cursor-pointer items-center justify-center rounded-full",
          "ring-2 ring-background",
          "transition-[scale] duration-fast ease-out-strong motion-safe:hover:scale-115 motion-safe:active:scale-95",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          handoff && "outline-1 outline-offset-2 outline-foreground/60",
          // Lost work: faded and without colour, still there to hover.
          orphaned && "opacity-50 grayscale",
          !single &&
            "h-4.5 gap-1 border border-border-strong bg-card pr-1.5 pl-0.5 text-2xs font-medium text-foreground tabular-nums",
        )}
        style={single ? { height: NODE } : undefined}
      >
        <span className="sr-only">{label}</span>
        {single ? (
          <span aria-hidden="true" className="pointer-events-none flex">
            {renderAvatar(c.author, NODE)}
          </span>
        ) : (
          <>
            {/* One face, the latest hand: two overlapped at 14px read as
                one smudged set of initials. The card lists everyone. */}
            <span aria-hidden="true" className="pointer-events-none flex">
              {renderAvatar(mark.members.at(-1)!.author, 14)}
            </span>
            <span aria-hidden="true" className="pointer-events-none">
              {mark.members.length}
            </span>
          </>
        )}
      </button>
    </div>
  );
}

/* ── The hover card ────────────────────────────────────────────────────── */

function TraceCard({
  id,
  anchor,
  root,
  instant,
  lane,
  markKey,
  fmt,
  labels,
  canZoom,
  renderAvatar,
}: {
  id: string;
  anchor: HTMLElement;
  root: HTMLElement | null;
  instant: boolean;
  lane: Lane | undefined;
  markKey: string;
  fmt: Fmt;
  labels: TraceLabels;
  canZoom: boolean;
  renderAvatar: (a: TraceAuthor, size: number) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number; above: boolean } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !root || !anchor.isConnected) return;
    const box = root.getBoundingClientRect();
    const a = anchor.getBoundingClientRect();
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const gap = 8;
    const above = a.top - box.top - h - gap >= 0;
    const top = above ? a.top - box.top - h - gap : a.bottom - box.top + gap;
    const centre = a.left + a.width / 2 - box.left;
    const left = Math.min(Math.max(4, centre - w / 2), Math.max(4, box.width - w - 4));
    setPos({ left, top, above });
  }, [anchor, root]);

  const mark = lane?.marks.find((m) => m.key === markKey);
  if (!lane || !mark) return null;
  const s = lane.row.session;
  const single = mark.members.length === 1;
  const c = mark.members[0]!;

  return (
    <div
      ref={ref}
      id={id}
      role="tooltip"
      data-slot="checkpoint-trace-card"
      className={cn(
        "pointer-events-none absolute z-popover flex w-72 flex-col gap-2 rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-md",
        pos ? "visible" : "invisible",
        pos && !instant && "motion-safe:animate-scale-in motion-reduce:animate-fade-in",
        pos?.above ? "origin-bottom" : "origin-top",
      )}
      style={{ left: pos?.left ?? 0, top: pos?.top ?? 0 }}
    >
      {single ? (
        <>
          <p
            className={cn(
              "line-clamp-2 text-sm font-medium text-foreground",
              !c.title && "font-mono",
            )}
          >
            {checkpointTitle(c)}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-secondary-foreground">
            {renderAvatar(c.author, 16)}
            <span className="truncate">{c.author.name}</span>
            <span aria-hidden="true" className="text-muted-foreground">
              ·
            </span>
            <span className="shrink-0 tabular-nums">{fmt.full(toMs(c.at))}</span>
          </div>
          {lane.handoffs.has(c.id) && (
            <p className="caption">{labels.handoff(lane.handoffs.get(c.id)!)}</p>
          )}
          {c.linkState === "orphaned" && <p className="caption">{labels.orphaned}</p>}
          {/* Without a title the sha is already the heading. */}
          {((c.sha && c.title) || c.branch) && (
            <div className="flex min-w-0 items-center gap-2 font-mono text-2xs text-muted-foreground">
              {c.sha && c.title && <span className="shrink-0">{c.sha.slice(0, 7)}</span>}
              {c.branch && (
                <span className="flex min-w-0 items-center gap-1">
                  <Icon icon={GitBranch} size="xs" />
                  <span className="truncate">{c.branch}</span>
                </span>
              )}
            </div>
          )}
          {(c.additions !== undefined || c.deletions !== undefined || c.files !== undefined) && (
            <div className="flex items-center gap-1.5 text-2xs tabular-nums">
              {c.additions !== undefined && (
                <span className="text-diff-added-text">+{c.additions}</span>
              )}
              {c.deletions !== undefined && (
                // U+2212 MINUS, so it lines up with the plus.
                <span className="text-diff-removed-text">−{c.deletions}</span>
              )}
              {c.files !== undefined && (
                <span className="text-muted-foreground">{labels.files(c.files)}</span>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <p className="text-sm font-medium text-foreground tabular-nums">
            {labels.checkpoints(mark.members.length)}
            <span className="font-normal text-muted-foreground">
              {" "}
              · {fmt.time(toMs(c.at))}–{fmt.time(toMs(mark.members.at(-1)!.at))}
            </span>
          </p>
          <ul className="flex flex-col gap-1">
            {mark.members.slice(0, 4).map((m) => (
              <li key={m.id} className="flex min-w-0 items-center gap-1.5 text-xs">
                {renderAvatar(m.author, 14)}
                <span className="min-w-0 flex-1 truncate text-secondary-foreground">
                  {checkpointTitle(m)}
                </span>
                <span className="shrink-0 text-2xs text-muted-foreground tabular-nums">
                  {fmt.time(toMs(m.at))}
                </span>
              </li>
            ))}
          </ul>
          {mark.members.length > 4 && (
            <p className="caption">{labels.more(mark.members.length - 4)}</p>
          )}
          <p className="caption">{labels.clusterHint(canZoom)}</p>
        </>
      )}
      <p className="caption truncate border-t border-border-subtle pt-2">
        {s.title || labels.untitled}
        {s.agentLabel ? ` · ${s.agentLabel}` : ""}
      </p>
    </div>
  );
}
