<script lang="ts" module>
  import type { Snippet } from "svelte";
  import type { LabelTone } from "../../../lib/types";
  import {
    checkpointTitle,
    type TraceAuthor,
    type TraceCheckpoint,
    type TraceGroupBy,
    type TraceMark,
    type TraceRange,
    type TraceSession,
    type TraceZoom,
  } from "./checkpoint-trace-model";

  /* ── Geometry, in px. JS positions every mark, so the sizes live here. ─── */

  export const LABEL_W = 240;
  export const AXIS_H = 32;

  /** How tightly lanes pack. `compact` is for a host that wants more lanes on
   *  a screen; its marks are still faces you can read, on one line. */
  export type TraceDensity = "comfortable" | "compact";

  export interface TraceGeometry {
    lane: number;
    group: number;
    /** A chip's height, and the bar's thickness. */
    chip: number;
    /** A face's diameter: what `renderAvatar` is asked for on a lane. */
    face: number;
    /** The air between a chip's edge and the face inside it. */
    pad: number;
    /** A label chip's second line (time, lines changed, handoff). */
    twoLine: boolean;
    /** The widest a label chip grows. */
    maxLabel: number;
    /** The least title worth drawing; under it the mark stays a face. */
    minTitle: number;
  }

  export const GEOMETRY: Record<TraceDensity, TraceGeometry> = {
    comfortable: {
      lane: 52,
      group: 40,
      chip: 32,
      face: 24,
      pad: 4,
      twoLine: true,
      maxLabel: 240,
      minTitle: 48,
    },
    compact: {
      lane: 36,
      group: 32,
      chip: 24,
      face: 20,
      pad: 2,
      twoLine: false,
      maxLabel: 200,
      minTitle: 40,
    },
  };

  /** A face in a lane header's participant stack. */
  const HEADER_FACE = 18;
  /** At most this many faces in a cluster's stack; the card lists everyone. */
  const STACK_MAX = 3;
  /**
   * How far a face in a stack tucks under the next: not at all. A face is
   * often initials, centred, and two wide letters ("MW") reach nearly to the
   * disc's edge, so overlapping by half left the back face reading "A" beside
   * a whole "JW", and even a 2px overlap shaved the second letter. Side by
   * side, the next face's 2px ring falls on the back face's empty rim, so the
   * stack still reads as one group and every face reads whole.
   */
  const STACK_OVERLAP = 0;
  /** Across a zoom, how long marks take to slide from where they were. */
  const FLIP_MS = 240;
  const EASE_OUT_STRONG = "cubic-bezier(0.23, 1, 0.32, 1)";
  /** How far a rubber-banded pull must reach before it asks for more time. */
  const PULL_FOR_MORE = 72;
  /** Momentum: Apple's scroll deceleration, per millisecond. */
  const DECAY = 0.998;

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
    cluster: (
      count: number,
      from: string,
      to: string,
      authors: string[],
      canZoom: boolean,
    ) => string;
    /** A lane title's name. `s.title` arrives with `untitled` already in
     *  place of an empty one. Start it with the title: that is the label's only
     *  text assistive tech sees, and it must be part of the name. */
    session: (s: TraceSession, start: string, end: string | null, checkpoints: number) => string;
    /** "12 sessions · 40 checkpoints" under a group's name. */
    groupMeta: (sessions: number, checkpoints: number) => string;
    /** "Took over from Sam": a handoff, in the card and the checkpoint's name. */
    handoff: (from: TraceAuthor) => string;
    /** The second line of a labelled cluster chip: "6 checkpoints · Priya,
     *  Sam". `names` are first names, the latest hands first. Optional, so a
     *  host's full `TraceLabels` from before it existed still type-checks. */
    clusterSummary?: (count: number, names: string[]) => string;
    /** A handoff, short, on a chip's second line: "from Sam". Optional, as
     *  above. */
    handoffShort?: (from: TraceAuthor) => string;
    /** Said of a live session's latest checkpoint, in its name. Optional, as
     *  above. */
    latest?: string;
    /** Beside a hollow bar: the session landed nothing. Optional, as above. */
    noCheckpoints?: string;
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

  /** "Priya" from "Priya Raman": what fits on a chip. */
  function firstName(name: string) {
    return name.trim().split(/\s+/)[0] ?? name;
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
    handoffShort: (from) => `from ${firstName(from.name)}`,
    clusterSummary: (n, names) =>
      `${plural(n, "checkpoint", "checkpoints")}${names.length ? ` · ${names.join(", ")}` : ""}`,
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
    latest: "Latest",
    noCheckpoints: "No checkpoints",
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
    /** Controlled zoom. Leave it unset to let the trace own it (`defaultZoom`).
     *  `week` fits its range to the track (see `timeScale`), so a week of work
     *  fills the screen rather than a fortnight of mostly empty canvas. */
    zoom?: TraceZoom;
    /** Defaults to `week`, the overview. */
    defaultZoom?: TraceZoom;
    /** Lane height and mark size: `comfortable` (52px lanes, 24px faces, two-
     *  line chips; the default) or `compact` (36px lanes, 20px faces, one
     *  line). */
    density?: TraceDensity;
    onZoomChange?: (zoom: TraceZoom) => void;
    groupBy?: TraceGroupBy;
    /** The present. Unset, the trace keeps its own clock (every 30 seconds). */
    now?: string | number | Date;
    onOpenSession?: (sessionId: string) => void;
    onOpenCheckpoint?: (checkpoint: TraceCheckpoint) => void;
    /**
     * A face, exactly `sizePx` across: the trace has already laid its marks
     * out around that diameter. The sizes asked for are 24 (a mark,
     * comfortable), 20 (a mark, compact), 18 (a lane header's participants),
     * 16 and 14 (the hover card), and 18 for a person group's header.
     *
     * Defaults to `TraceAvatar`: the photo (`author.avatarUrl`) when there is
     * one, else the person's initials on a disc in their own stable hue.
     */
    renderAvatar?: Snippet<[TraceAuthor, number]>;
    /** The agent's mark beside its name in a lane's label. */
    renderAgentMark?: Snippet<[TraceSession]>;
    loading?: boolean;
    /** An error replaces the trace: a string is the description under
     *  `labels.errorTitle`; a snippet is drawn as it is (bring a retry). */
    error?: string | Snippet;
    /** Replaces the default empty state. */
    empty?: Snippet;
    labels?: Partial<TraceLabels>;
    /** Drawn at the left of the header row, before the zoom control: the
     *  host's own filters (group by, project, person). */
    toolbar?: Snippet;
    /** BCP 47 locale for times; the runtime's by default. */
    locale?: string;
    class?: string;
  }

  /* ── Helpers ───────────────────────────────────────────────────────────── */

  /** The faint bar fill per project hue; whole strings so Tailwind sees them.
   *  Faint, because the bar is now as tall as the chips that ride on it. */
  const BAR_FILL: Record<LabelTone, string> = {
    grey: "bg-muted",
    red: "bg-hue-red/24",
    orange: "bg-hue-orange/24",
    yellow: "bg-hue-yellow/24",
    green: "bg-hue-green/24",
    cyan: "bg-hue-cyan/24",
    blue: "bg-hue-blue/24",
    purple: "bg-hue-purple/24",
    pink: "bg-hue-pink/24",
  };

  type Mark = TraceMark<TraceCheckpoint>;

  interface ChipText {
    title: string;
    /** No title: the short sha stands in, set in mono. */
    mono: boolean;
    meta: string;
    handoff?: string;
    time?: string;
    stats?: { additions: number; deletions: number };
  }

  type Fmt = {
    time: (t: number) => string;
    day: (t: number) => string;
    /** A moment, with its weekday when the trace spans more than a day. */
    at: (t: number) => string;
    full: (t: number) => string;
  };

  function authorsOf(members: readonly TraceCheckpoint[]) {
    const seen = new Map<string, TraceAuthor>();
    for (const c of members) if (!seen.has(c.author.id)) seen.set(c.author.id, c.author);
    return [...seen.values()];
  }

  /** A cluster's faces, side by side (less `STACK_OVERLAP` each): how wide the stack is. */
  function stackWidth(g: TraceGeometry, authors: number) {
    return g.face + (Math.min(authors, STACK_MAX) - 1) * (g.face - STACK_OVERLAP);
  }

  /** What a chip says. `meta` is the second line as one string, the exact
   *  text the chip draws, so measuring it measures the chip. */
  function chipText(
    mark: Mark,
    handoffs: ReadonlyMap<string, TraceAuthor>,
    fmt: Fmt,
    labels: TraceLabels,
  ): ChipText {
    const last = mark.members.at(-1)!;
    if (mark.members.length > 1) {
      // Latest hands first: they are the ones the title belongs to.
      const names = authorsOf([...mark.members].reverse()).map((a) => firstName(a.name));
      const shown = names.length > 2 ? [...names.slice(0, 2), `+${names.length - 2}`] : names;
      return {
        title: checkpointTitle(last),
        mono: !last.title,
        meta: (labels.clusterSummary ?? DEFAULT_TRACE_LABELS.clusterSummary!)(
          mark.members.length,
          shown,
        ),
      };
    }
    const from = handoffs.get(last.id);
    const handoff = from
      ? (labels.handoffShort ?? DEFAULT_TRACE_LABELS.handoffShort!)(from)
      : undefined;
    const time = fmt.time(new Date(last.at).getTime());
    const stats =
      last.additions !== undefined || last.deletions !== undefined
        ? { additions: last.additions ?? 0, deletions: last.deletions ?? 0 }
        : undefined;
    return {
      title: checkpointTitle(last),
      mono: !last.title,
      // U+2212 MINUS, so it lines up with the plus.
      meta: [handoff, time, stats && `+${stats.additions} −${stats.deletions}`]
        .filter(Boolean)
        .join(" · "),
      handoff,
      time,
      stats,
    };
  }

  /** `data-focus` value for a position; the title is `:title`. */
  function focusId(lane: string, mark: string | null) {
    return `${lane}|${mark ?? ":title"}`;
  }

  /* ── Measuring text, so a mark knows how wide its title wants to be ────── */

  let measurer: CanvasRenderingContext2D | null | undefined;
  const widths = new Map<string, number>();

  /** A string's width in a CSS font. Canvas metrics, cached; without a
   *  canvas (a test DOM) an estimate, which only moves where titles truncate. */
  function textWidth(text: string, font: string) {
    const key = `${font}\u0000${text}`;
    const known = widths.get(key);
    if (known !== undefined) return known;
    if (measurer === undefined)
      measurer =
        typeof document === "undefined"
          ? null
          : (document.createElement("canvas").getContext("2d") ?? null);
    let w: number;
    if (measurer) {
      measurer.font = font;
      w = measurer.measureText(text).width;
    } else w = text.length * Number.parseFloat(font.split(" ")[1] ?? "11") * 0.56;
    // Generous: 400 lanes of titles and second lines are a few thousand
    // strings, and a cap under that would clear on every layout.
    if (widths.size > 50_000) widths.clear();
    widths.set(key, Math.ceil(w));
    return Math.ceil(w);
  }

  let cardSeq = 0;
</script>

<script lang="ts">
  import { untrack } from "svelte";
  import { GitBranch, TriangleAlert } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import { actorHue, PEER_INK } from "../../../lib/actor-hue";
  import { HUE_BG, hueFor } from "../../../lib/hue";
  import { cubicBezier } from "../deps/ease";
  import { tween } from "../deps/tween";
  import { createVirtualizer } from "../deps/virtualizer.svelte";
  import Button from "../../../ui/button.svelte";
  import Icon from "../../../ui/icon.svelte";
  import Segmented from "../../f1-primitives-forms/segmented.svelte";
  import EmptyState from "../../f3-ui-first-half/empty-state.svelte";
  import AvatarStack from "../../f3-ui-first-half/avatar-stack.svelte";
  import Skeleton from "../../f4-ui-second-half-patterns/skeleton.svelte";
  import TraceAvatar from "./trace-avatar.svelte";
  import {
    isTooltipWarm,
    markTooltipClosed,
    markTooltipOpen,
    prefersReducedMotion,
    TOOLTIP_OPEN_DELAY,
  } from "../../../ui/tooltip-timing";
  import {
    authorRuns,
    axisTicks,
    buildRows,
    clusterMarks,
    DAY,
    extentOf,
    handoffsOf,
    HOUR,
    labelMarks,
    moveFocus,
    rubberband,
    startOfDay,
    startOfHour,
    stepZoom,
    timeScale,
    toMs,
    TRACE_ZOOMS,
    ZOOM_SPAN,
    type NavLane,
    type TracePosition,
    type TraceRow,
  } from "./checkpoint-trace-model";

  /**
   * The checkpoint trace: Timeline's second lens. Time runs across, each
   * session is a lane, and its checkpoints are the marks on it, each one the
   * face of the person who drove the session when it landed. The calendar
   * answers "which sessions happened"; this answers "how did the software get
   * built, and by whom".
   *
   * Ported from `src/components/blocks/checkpoint-trace.tsx`. One scroller,
   * both axes: the axis is sticky to its top, the lane labels sticky to its
   * left. Lanes are virtualized. Marks cluster, then grow rightward into the
   * room before the next one and take their title (semantic zoom), and slide
   * across a zoom change with a FLIP on `transform`. Dragging the empty field
   * pans (glide, rubber band, pull for more time); one tab stop walks the
   * checkpoints with the keyboard.
   */
  interface Props extends CheckpointTraceProps {}

  let {
    sessions,
    range,
    onRangeChange,
    zoom: zoomProp,
    defaultZoom = "week",
    density = "comfortable",
    onZoomChange,
    groupBy = "none",
    now: nowProp,
    onOpenSession,
    onOpenCheckpoint,
    renderAvatar,
    renderAgentMark,
    loading = false,
    error,
    empty,
    labels: labelsProp,
    toolbar,
    locale,
    class: className,
  }: Props = $props();

  const labels = $derived({ ...DEFAULT_TRACE_LABELS, ...labelsProp } as TraceLabels);
  const g = $derived(GEOMETRY[density]);

  /* zoom, controlled or not */
  // As `useState(defaultZoom)`: the initial value only, read untracked so a
  // later change of the prop does not claim to be the default.
  let zoomState = $state<TraceZoom>(untrack(() => defaultZoom));
  const zoom = $derived(zoomProp ?? zoomState);

  /* the clock */
  let clock = $state(Date.now());
  $effect(() => {
    if (nowProp !== undefined) return;
    const id = setInterval(() => (clock = Date.now()), 30_000);
    return () => clearInterval(id);
  });
  const now = $derived(nowProp !== undefined ? toMs(nowProp) : clock);

  /* the scroller and its size */
  let scroller = $state<HTMLDivElement>();
  let rootEl = $state<HTMLDivElement>();
  let viewport = $state({ width: 0, ready: false });
  // The scroller exists only in the trace state, not while loading, failed or
  // empty; the effects that hold it re-attach when it mounts.
  const traceMounted = $derived(!loading && !error && sessions.length > 0);
  $effect(() => {
    void traceMounted;
    const el = scroller;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth;
      const current = untrack(() => viewport);
      if (!current.ready || current.width !== width) viewport = { width, ready: true };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  });
  const trackViewport = $derived(Math.max(0, viewport.width - LABEL_W));

  /* the range: the host's, or the data's own extent plus whatever was pulled in */
  let pulled = $state({ before: 0, after: 0 });
  // Follows `now` (every 30s) so the default end always clears the present;
  // its start does not move, so the view does not either.
  const extentNow = $derived(range ? 0 : now);
  const extent = $derived.by(() => {
    if (range) {
      const own = { from: toMs(range.from), to: toMs(range.to) };
      return { ...own, fitSpan: own.to - own.from };
    }
    const own = extentOf(sessions, extentNow, zoom);
    // Week fits the data's own span, not what was pulled in: pulling past an
    // end reveals more time at the same density rather than squeezing it.
    return {
      from: own.from - pulled.before,
      to: own.to + pulled.after,
      fitSpan: own.to - own.from,
    };
  });

  const scale = $derived(
    // A widest chip's room after the end, so the newest work, the lanes
    // read first, always has space for its title.
    timeScale(extent, zoom, trackViewport, g.maxLabel, extent.fitSpan),
  );

  const multiDay = $derived(scale.to - scale.from > 24 * 3_600_000);
  const fmt = $derived.by(() => {
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
  });

  /* rows, lanes and their marks */
  const rows = $derived(
    buildRows(sessions, groupBy, { noProject: labels.noProject, noOwner: labels.noOwner }),
  );

  /* the fonts titles are measured in: the trace's own, once they load */
  let fonts = $state({ sans: "sans-serif", mono: "monospace" });
  $effect(() => {
    const el = rootEl;
    if (!el) return;
    let live = true;
    const read = () => {
      if (!live) return;
      const style = getComputedStyle(el);
      const next = {
        sans: style.fontFamily || "sans-serif",
        mono: style.getPropertyValue("--font-mono").trim() || "monospace",
      };
      const current = untrack(() => fonts);
      if (current.sans !== next.sans || current.mono !== next.mono) fonts = next;
    };
    read();
    // Metrics taken before a web font loads are the fallback's.
    document.fonts?.ready.then(() => {
      widths.clear();
      if (live) fonts = { ...untrack(() => fonts) };
    });
    return () => {
      live = false;
    };
  });

  interface Lane {
    row: Extract<TraceRow, { kind: "lane" }>;
    marks: Mark[];
    handoffs: Map<string, TraceAuthor>;
    x0: number;
    x1: number;
    /** Who held the session when, in px; empty for a single author. */
    runs: { author: TraceAuthor; x0: number; x1: number }[];
    /** The latest checkpoint's id, on a live lane only. */
    latest: string | null;
  }

  const lanes = $derived.by(() => {
    const byKey = new Map<string, Lane>();
    const titleFont = `500 11px ${fonts.sans}`;
    const monoFont = `500 11px ${fonts.mono}`;
    const metaFont = `500 10px ${fonts.sans}`;
    const countFont = `600 11px ${fonts.sans}`;
    const countW = (n: number) => textWidth(String(n), countFont);
    // A chip's width before its text: the face or stack, and the air
    // around it. Mirrors MarkView's padding.
    const lead = (m: Mark) =>
      m.members.length === 1
        ? g.pad + g.face + 8
        : g.pad +
          stackWidth(g, authorsOf(m.members).length) +
          8 +
          (g.twoLine ? 0 : countW(m.members.length) + 6);
    for (const row of rows) {
      if (row.kind !== "lane") continue;
      const s = row.session;
      const handoffs = handoffsOf(s.checkpoints);
      const points = s.checkpoints
        .map((c) => ({ t: toMs(c.at), c }))
        .filter((p) => p.t >= scale.from && p.t <= scale.to)
        .map((p) => ({ x: scale.x(p.t), key: p.c.id, item: p.c }));
      const marks = clusterMarks(points, {
        node: g.face,
        widthOf: (n, members) =>
          g.pad + stackWidth(g, authorsOf(members).length) + 6 + countW(n) + 10,
      });
      labelMarks(marks, {
        limit: scale.width,
        maxWidth: g.maxLabel,
        // The tail: `pr-3` and the chip's border.
        minLabel: (m) => lead(m) + g.minTitle + 14,
        fullWidth: (m) => {
          const t = chipText(m, handoffs, fmt, labels);
          const title = textWidth(t.title, t.mono ? monoFont : titleFont);
          return lead(m) + (g.twoLine ? Math.max(title, textWidth(t.meta, metaFont)) : title) + 14;
        },
      });
      const start = toMs(s.startedAt);
      const end = s.endedAt ? toMs(s.endedAt) : now;
      const live = (s.status ?? (s.endedAt ? "settled" : "live")) === "live";
      let latest: TraceCheckpoint | null = null;
      if (live)
        for (const c of s.checkpoints) if (!latest || toMs(c.at) > toMs(latest.at)) latest = c;
      byKey.set(row.key, {
        row,
        marks,
        handoffs,
        x0: Math.max(0, scale.x(start)),
        x1: Math.min(scale.width, scale.x(end)),
        runs: authorRuns(s.checkpoints, start, end).map((r) => ({
          author: r.author,
          x0: Math.max(0, scale.x(r.from)),
          x1: Math.min(scale.width, scale.x(r.to)),
        })),
        latest: latest?.id ?? null,
      });
    }
    return byKey;
  });

  // Up and Down find the nearest mark in time, so each mark is its first
  // checkpoint's x, not its chip's centre.
  const navLanes = $derived.by<NavLane[]>(() =>
    [...lanes.values()].map((l) => ({
      key: l.row.key,
      marks: l.marks.map((m) => ({ key: m.key, x: m.first })),
    })),
  );
  const rowIndex = $derived(new Map(rows.map((r, i) => [r.key, i])));

  /* where each lane sits in its group, for aria-posinset / aria-setsize */
  const placeOf = $derived.by(() => {
    const place = new Map<string, { pos: number; size: number }>();
    const perGroup = new Map<string, string[]>();
    for (const row of rows) {
      if (row.kind !== "lane") continue;
      const id = row.groupId ?? "";
      const keys = perGroup.get(id);
      if (keys) keys.push(row.key);
      else perGroup.set(id, [row.key]);
    }
    for (const keys of perGroup.values())
      keys.forEach((k, i) => place.set(k, { pos: i + 1, size: keys.length }));
    return place;
  });

  /* vertical virtualization */
  const virtualizer = createVirtualizer({
    count: () => rows.length,
    getKey: (i) => rows[i]?.key ?? i,
    estimateSize: (i) => (rows[i]?.kind === "group" ? g.group : g.lane),
    overscan: 8,
    scrollElement: () => scroller,
    initialRect: { width: 0, height: 600 },
    scrollMargin: AXIS_H,
  });
  $effect(() => {
    const el = scroller;
    if (!el) return;
    return virtualizer.attach(el);
  });
  const virtualRows = $derived(virtualizer.items);

  /* the horizontal window ticks are computed for: whole screens, so a scroll
     re-renders once a screen */
  let screen = $state(0);
  let view = { centreT: 0 };

  // The width of one tick window: a screen, but never less than 600px, so a
  // narrow pane does not recompute ticks every few pixels.
  const tickWindow = $derived(Math.max(trackViewport, 600));

  function onScroll() {
    const el = scroller;
    if (!el) return;
    // A write the trace made itself (the first placement, a zoom, a reveal)
    // is not the user's scroll.
    if (performance.now() - lastPlacedAt > 120) userScrolled = true;
    view.centreT = scale.t(el.scrollLeft + trackViewport / 2);
    const next = Math.floor(el.scrollLeft / tickWindow);
    if (next !== screen) screen = next;
    // A scroll the trace made itself (revealing a mark for the keyboard)
    // keeps that mark's card; the user's own scroll closes it.
    if (performance.now() - revealedAt > 200) hideCard();
  }

  const ticks = $derived(
    axisTicks(scale, zoom, (screen - 1) * tickWindow, (screen + 2) * tickWindow),
  );

  // The labelled units (days; hours at hour zoom): from one unit before the
  // window, so the unit under the left edge always has its sticky label,
  // including the partial one the range starts in.
  const unitLabels = $derived.by(() => {
    const unit = zoom === "hour" ? HOUR : DAY;
    const lo = (screen - 1) * tickWindow;
    const majors = axisTicks(
      scale,
      zoom,
      Math.max(0, lo - unit * scale.pxPerMs),
      (screen + 2) * tickWindow,
    ).filter((t) => t.major);
    const first = majors[0];
    if (!first || first.t > scale.from) {
      const startOf = zoom === "hour" ? startOfHour : startOfDay;
      const t = startOf((first?.t ?? scale.t(Math.max(0, lo)) + 1) - 1);
      if (t + unit > scale.from) majors.unshift({ t, x: scale.x(t), major: true, labelled: true });
    }
    // Each unit ends where the next begins, so a 23- or 25-hour day (a DST
    // change) is spanned exactly; only the last falls back to a fixed step.
    return majors.map((tick, i) => ({
      t: tick.t,
      left: Math.max(0, tick.x),
      right: Math.min(scale.width, majors[i + 1]?.x ?? scale.x(tick.t + unit)),
    }));
  });

  /* keep the time in view fixed across a zoom or a range change */
  // Where to hold the view across the next scale change, and the zoom it was
  // taken for: a controlled host that refuses the zoom leaves it unused.
  let anchor: { t: number; screenX: number; zoom: TraceZoom } | null = null;
  let placedWith: { pxPerMs: number; from: number; track: number; el: HTMLDivElement } | null =
    null;
  // The gallery applies its padded page after the story mounts, so the first
  // width can be the unpadded one; while the view has not been scrolled by
  // hand, the first placement is redone at the corrected width.
  let userScrolled = false;
  let lastPlacedAt = 0;
  function placeScroll(el: HTMLDivElement, x: number) {
    lastPlacedAt = performance.now();
    // The trace's own scroll must not close the card its focus is about to
    // open: `onScroll` only hides a card after a scroll the user made.
    revealedAt = lastPlacedAt;
    el.scrollLeft = x;
  }
  $effect(() => {
    const el = scroller;
    const ready = viewport.ready;
    const measured = trackViewport;
    const pxPerMs = scale.pxPerMs;
    const from = scale.from;
    const hasRows = rows.length > 0;
    void traceMounted;
    if (!el || !ready) return;
    // The live width, not the last measured one: a first pass that ran before
    // the vertical scrollbar claimed its 15px would place the present 7px off.
    const track = Math.max(0, el.clientWidth - LABEL_W);
    if (track === 0 || track !== measured) return;
    if (!placedWith || placedWith.el !== el) {
      // First paint with data: the present (or the end) a fifth from the right.
      if (!hasRows) return;
      const target = Math.min(now, scale.to);
      placeScroll(el, Math.max(0, scale.x(target) - track * 0.8));
      view.centreT = scale.t(el.scrollLeft + track / 2);
      placedWith = { pxPerMs, from, track, el };
      return;
    }
    if (placedWith.track !== track && !userScrolled) {
      const target = Math.min(now, scale.to);
      placeScroll(el, Math.max(0, scale.x(target) - track * 0.8));
      view.centreT = scale.t(el.scrollLeft + track / 2);
      placedWith = { pxPerMs, from, track, el };
      return;
    }
    // Only a change of scale moves the view; `now` ticking does not.
    if (placedWith.pxPerMs === pxPerMs && placedWith.from === from) {
      placedWith = { pxPerMs, from, track, el };
      return;
    }
    const held = anchor?.zoom === zoom ? anchor : null;
    const a = held ?? { t: view.centreT, screenX: track / 2 };
    anchor = null;
    placeScroll(el, Math.max(0, scale.x(a.t) - a.screenX));
    view.centreT = scale.t(el.scrollLeft + track / 2);
    placedWith = { pxPerMs, from, track, el };
    // `traceMounted`: the scroller remounts at 0 after a loading or error
    // state, and is put back where it was.
  });

  /* FLIP across a zoom: each mark slides from where its checkpoints were
     drawn before, so a face can be followed into its cluster and back out.
     `transform` only, through WAAPI, so it composites off the main thread;
     the marks' own `translate` (centring) is a separate property. */
  let flipFrom: { zoom: TraceZoom; at: Map<string, number> } | null = null;
  function snapshotMarks(next: TraceZoom) {
    const el = scroller;
    flipFrom = null;
    if (!el || prefersReducedMotion()) return;
    const at = new Map<string, number>();
    for (const node of el.querySelectorAll<HTMLElement>("[data-mark]")) {
      const laneKey = node.dataset.lane!;
      const mark = lanes.get(laneKey)?.marks.find((m) => m.key === node.dataset.mark);
      const item = node.parentElement;
      if (!mark || !item) continue;
      // Where it is on screen now, mid-slide included: a zoom that lands
      // during the last one starts from what the eye sees, not the target.
      // Not cancelled here: a controlled host may refuse the zoom, and the
      // slide in flight should then finish where it was going.
      const x = item.getBoundingClientRect().left;
      for (const c of mark.members) at.set(`${laneKey}|${c.id}`, x);
    }
    flipFrom = { zoom: next, at };
  }
  $effect(() => {
    const pxPerMs = scale.pxPerMs;
    void pxPerMs;
    const flip = flipFrom;
    flipFrom = null;
    const el = scroller;
    if (!flip || flip.zoom !== zoom || !el) return;
    // Three passes, so the layout is read once rather than once per mark:
    // cancel every old slide (writes), measure every resting place (reads),
    // then start the new slides (writes).
    const moves: { item: HTMLElement; was: number }[] = [];
    for (const node of el.querySelectorAll<HTMLElement>("[data-mark]")) {
      const laneKey = node.dataset.lane!;
      const mark = lanes.get(laneKey)?.marks.find((m) => m.key === node.dataset.mark);
      const item = node.parentElement;
      if (!mark || !item) continue;
      for (const animation of item.getAnimations()) animation.cancel();
      for (const c of mark.members) {
        const was = flip.at.get(`${laneKey}|${c.id}`);
        if (was === undefined) continue;
        moves.push({ item, was });
        break;
      }
    }
    const shifts = moves.map(({ item, was }) => was - item.getBoundingClientRect().left);
    moves.forEach(({ item }, i) => {
      const dx = shifts[i]!;
      // A mark that was off screen does not fly in from across the trace.
      if (Math.abs(dx) < 1 || Math.abs(dx) > trackViewport) return;
      item.animate([{ transform: `translateX(${dx}px)` }, { transform: "translateX(0px)" }], {
        duration: FLIP_MS,
        easing: EASE_OUT_STRONG,
      });
    });
  });

  function setZoom(
    next: TraceZoom,
    at?: { t: number; screenX: number },
    { animate: slide = true }: { animate?: boolean } = {},
  ) {
    if (next === zoom) return;
    anchor = at ? { ...at, zoom: next } : null;
    // Keyboard zooms do not slide: a key repeated should land at once.
    if (slide) snapshotMarks(next);
    else flipFrom = null;
    // Every mark moves and re-keys: a card left open would float free.
    hideCard();
    if (zoomProp === undefined) zoomState = next;
    onZoomChange?.(next);
  }

  function jumpToNow() {
    const el = scroller;
    if (!el) return;
    el.scrollTo({
      left: Math.max(0, scale.x(now) - trackViewport * 0.8),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  /* ⌘/Ctrl + wheel (and trackpad pinch, which arrives as ctrl + wheel) zooms
     about the pointer */
  let wheelAcc = 0;
  let wheelLast = 0;
  $effect(() => {
    void traceMounted;
    const el = scroller;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      if (e.timeStamp - wheelLast > 300) wheelAcc = 0;
      wheelLast = e.timeStamp;
      wheelAcc += e.deltaY;
      if (Math.abs(wheelAcc) < 40) return;
      const dir = wheelAcc > 0 ? 1 : -1;
      wheelAcc = 0;
      const screenX = e.clientX - el.getBoundingClientRect().left - LABEL_W;
      if (screenX < 0) return;
      const t = scale.t(el.scrollLeft + screenX);
      setZoom(stepZoom(zoom, dir), { t, screenX });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  /* ── pan: drag, glide, rubber band ── */

  let drag: {
    id: number;
    x0: number;
    s0: number;
    pull: number;
    samples: { x: number; t: number }[];
    layers: HTMLElement[];
  } | null = null;
  let motionStop: (() => void) | null = null;

  function stopMotion() {
    motionStop?.();
    motionStop = null;
  }

  $effect(() => stopMotion);

  function onPointerDown(e: PointerEvent) {
    if (e.button !== 0 || e.pointerType === "touch") return;
    const current = e.currentTarget as HTMLDivElement;
    const target = e.target as HTMLElement;
    if (!target.closest("[data-pan]") || target.closest("button, a, [data-mark]")) return;
    const el = scroller;
    if (!el) return;
    stopMotion();
    // Captured, so the drag keeps tracking when the pointer leaves the field.
    try {
      current.setPointerCapture(e.pointerId);
    } catch {
      // A synthetic pointer (tests, automation) has nothing to capture.
    }
    drag = {
      id: e.pointerId,
      x0: e.clientX,
      s0: el.scrollLeft,
      pull: 0,
      samples: [{ x: e.clientX, t: e.timeStamp }],
      layers: [...el.querySelectorAll<HTMLElement>("[data-pan-layer]")],
    };
    // A band caught mid-return would otherwise stay offset: the move handler
    // only writes when the pull changes, and this drag starts from zero.
    for (const layer of drag.layers) layer.style.transform = "";
    el.dataset.dragging = "";
    hideCard();
  }

  function onPointerMove(e: PointerEvent) {
    const d = drag;
    const el = scroller;
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
  }

  function onPointerUp(e: PointerEvent, cancelled = false) {
    const d = drag;
    const el = scroller;
    if (!d || !el || e.pointerId !== d.id) return;
    const current = e.currentTarget as HTMLDivElement;
    drag = null;
    delete el.dataset.dragging;
    if (current.hasPointerCapture(e.pointerId)) current.releasePointerCapture(e.pointerId);
    const still = prefersReducedMotion();

    if (d.pull !== 0) {
      // Past an end: far enough asks for more time; either way the band returns.
      if (!cancelled && Math.abs(d.pull) >= PULL_FOR_MORE)
        extendRange(d.pull > 0 ? "before" : "after");
      if (still) for (const layer of d.layers) layer.style.transform = "";
      else {
        const from = d.pull;
        motionStop = tween({
          from,
          to: 0,
          duration: 0.25,
          ease: cubicBezier(0.23, 1, 0.32, 1),
          onUpdate: (value) => {
            for (const layer of d.layers)
              layer.style.transform = value ? `translateX(${value}px)` : "";
          },
        });
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
    motionStop = () => cancelAnimationFrame(frame);
  }

  function extendRange(side: "before" | "after") {
    const span = ZOOM_SPAN[zoom];
    // From the range itself, not the scale: the scale's end carries the
    // title room and the track stretch, which would creep into the host's
    // range on every pull.
    const next = {
      from: new Date(side === "before" ? extent.from - span : extent.from).toISOString(),
      to: new Date(side === "after" ? extent.to + span : extent.to).toISOString(),
    };
    if (!range) pulled = { ...pulled, [side]: pulled[side] + span };
    onRangeChange?.(next);
  }

  /* ── the hover card ── */

  const cardId = `checkpoint-trace-card-${cardSeq++}`;
  let card = $state<{
    lane: string;
    mark: string;
    el: HTMLElement;
    instant: boolean;
  } | null>(null);
  let cardTimer: ReturnType<typeof setTimeout> | undefined;

  function showCard(el: HTMLElement, instant: boolean) {
    const lane = el.dataset.lane!;
    const mark = el.dataset.mark!;
    // Moving across a mark's own children fires pointerover again.
    if (card && card.lane === lane && card.mark === mark && card.el === el) return;
    clearTimeout(cardTimer);
    const open = (skipEntrance: boolean) => {
      if (!card) markTooltipOpen();
      cardPos = null;
      card = { lane, mark, el, instant: skipEntrance };
    };
    if (instant || card || isTooltipWarm()) open(true);
    else cardTimer = setTimeout(() => open(false), TOOLTIP_OPEN_DELAY);
  }

  function hideCard() {
    clearTimeout(cardTimer);
    if (card) markTooltipClosed();
    card = null;
    cardPos = null;
  }

  $effect(
    () => () => {
      clearTimeout(cardTimer);
      if (card) markTooltipClosed();
    },
  );

  function markOf(target: EventTarget | null) {
    return (target as HTMLElement | null)?.closest?.<HTMLElement>("[data-mark]") ?? null;
  }

  /* ── keyboard ── */

  let active = $state<TracePosition | null>(null);
  let pendingFocus = $state(false);

  // Clusters change their keys across zooms; fall back to the mark holding
  // the active checkpoint, or the title.
  const resolved = $derived.by<TracePosition | null>(() => {
    const at = active;
    if (!at) return null;
    const lane = lanes.get(at.lane);
    if (!lane) return null;
    if (at.mark === null) return at;
    const mark =
      lane.marks.find((m) => m.key === at.mark) ??
      lane.marks.find((m) => m.members.some((c) => c.id === at.mark));
    return { lane: at.lane, mark: mark ? mark.key : null };
  });

  const mountedLanes = $derived(
    virtualRows
      .map((v) => rows[v.index])
      .filter((r): r is Extract<TraceRow, { kind: "lane" }> => r?.kind === "lane"),
  );
  const tabStop = $derived(
    resolved && mountedLanes.some((l) => l.key === resolved.lane)
      ? focusId(resolved.lane, resolved.mark)
      : mountedLanes[0]
        ? focusId(mountedLanes[0].key, null)
        : null,
  );

  let revealedAt = -Infinity;
  function reveal(pos: TracePosition) {
    revealedAt = performance.now();
    const el = scroller;
    const index = rowIndex.get(pos.lane);
    if (index !== undefined) virtualizer.scrollToIndex(index, { align: "auto" });
    if (!el || pos.mark === null) return;
    const mark = lanes.get(pos.lane)?.marks.find((m) => m.key === pos.mark);
    if (!mark) return;
    const pad = 24;
    if (mark.left - pad < el.scrollLeft) el.scrollLeft = Math.max(0, mark.left - pad);
    else if (mark.right + pad > el.scrollLeft + trackViewport)
      el.scrollLeft = mark.right + pad - trackViewport;
  }

  $effect(() => {
    if (!pendingFocus || !resolved) return;
    let tries = 0;
    let frame = 0;
    const tryFocus = () => {
      const target = scroller?.querySelector<HTMLElement>(
        `[data-focus="${CSS.escape(focusId(resolved!.lane, resolved!.mark))}"]`,
      );
      if (target) {
        pendingFocus = false;
        target.focus({ preventScroll: true });
        if (target.dataset.mark) showCard(target, true);
        else hideCard();
      } else if (tries++ < 10) frame = requestAnimationFrame(tryFocus);
      // Never mounted: drop the request rather than steal focus later.
      else pendingFocus = false;
    };
    tryFocus();
    return () => cancelAnimationFrame(frame);
  });

  function onKeyDown(e: KeyboardEvent) {
    // Never with a modifier: ⌘+ and ⌘− are the browser's own zoom.
    const bare = !e.metaKey && !e.ctrlKey && !e.altKey;
    if (bare && (e.key === "+" || e.key === "=" || e.key === "-")) {
      e.preventDefault();
      setZoom(stepZoom(zoom, e.key === "-" ? 1 : -1), undefined, { animate: false });
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
    pendingFocus = true;
    active = next;
    reveal(next);
  }

  function onFocus(e: FocusEvent) {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-focus]");
    if (!el) return;
    const pos = { lane: el.dataset.lane!, mark: el.dataset.mark ?? null };
    if (!resolved || resolved.lane !== pos.lane || resolved.mark !== pos.mark) active = pos;
    if (el.dataset.mark && el.matches(":focus-visible")) showCard(el, true);
  }

  /* ── opening ── */

  function openMark(lane: Lane, mark: Mark, _el: HTMLElement, fromKeyboard: boolean) {
    if (mark.members.length === 1) {
      onOpenCheckpoint?.(mark.members[0]!);
      return;
    }
    if (zoom === TRACE_ZOOMS[0]) {
      onOpenSession?.(lane.row.session.id);
      return;
    }
    const mid = (mark.first + mark.last) / 2;
    const screenX = scroller ? mid - scroller.scrollLeft : trackViewport / 2;
    active = { lane: lane.row.key, mark: mark.key };
    // Follow with focus only from the keyboard: a mouse click would leave a
    // focus ring on whatever mark lands under the pointer.
    pendingFocus = fromKeyboard;
    hideCard();
    // Centred on the checkpoints' own time, not the chip (which may carry a
    // title far to the right of them).
    setZoom(stepZoom(zoom, -1), { t: scale.t(mid), screenX }, { animate: !fromKeyboard });
  }

  /* ── the card's placement, measured after it renders ── */
  let cardEl = $state<HTMLDivElement>();
  let cardPos = $state<{ left: number; top: number; above: boolean } | null>(null);
  $effect(() => {
    const el = cardEl;
    const current = card;
    const root = rootEl;
    if (!el || !current || !root || !current.el.isConnected) return;
    const box = root.getBoundingClientRect();
    const a = current.el.getBoundingClientRect();
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const gap = 8;
    const above = a.top - box.top - h - gap >= 0;
    const top = above ? a.top - box.top - h - gap : a.bottom - box.top + gap;
    const centre = a.left + a.width / 2 - box.left;
    const left = Math.min(Math.max(4, centre - w / 2), Math.max(4, box.width - w - 4));
    cardPos = { left, top, above };
  });

  /* ── derived view state ── */

  const runs = $derived.by(() => {
    const out: { groupId: string | null; items: typeof virtualRows }[] = [];
    for (const v of virtualRows) {
      const row = rows[v.index];
      if (!row) continue;
      const groupId = row.kind === "group" ? row.id : row.groupId;
      const run = out.at(-1);
      if (run && run.groupId === groupId) run.items.push(v);
      else out.push({ groupId, items: [v] });
    }
    return out;
  });
  const groups = $derived(
    new Map(
      rows
        .filter((r): r is Extract<TraceRow, { kind: "group" }> => r.kind === "group")
        .map((group) => [group.id, group]),
    ),
  );
  // The group being read: the one the first lane under the axis belongs to.
  const reading = $derived(
    virtualRows.find((v) => v.end - AXIS_H > virtualizer.scrollOffset + 1),
  );
  const readingRow = $derived(reading ? rows[reading.index] : undefined);
  // Named in the corner only once its own header has scrolled under the
  // axis; while that header is in view the corner would only repeat it.
  const readingGroup = $derived(
    readingRow?.kind === "lane" && readingRow.groupId !== null
      ? groups.get(readingRow.groupId)
      : undefined,
  );

  const nowX = $derived(scale.x(now));
  const nowInRange = $derived(now >= scale.from && now <= scale.to);
  const contentW = $derived(LABEL_W + scale.width);
  const totalH = $derived(virtualizer.totalSize);
  const majorTicks = $derived(ticks.filter((t) => t.major));
  const cardLane = $derived(card ? lanes.get(card.lane) : undefined);
  const cardMark = $derived(
    card && cardLane ? cardLane.marks.find((m) => m.key === card!.mark) : undefined,
  );
  const errorText = $derived(typeof error === "string" ? error : null);
  const errorSnippet = $derived(typeof error === "string" ? null : error);
</script>

{#snippet face(author: TraceAuthor, size: number)}
  {#if renderAvatar}
    {@render renderAvatar(author, size)}
  {:else}
    <TraceAvatar {author} {size} />
  {/if}
{/snippet}

{#snippet liveDot()}
  <span
    data-slot="checkpoint-trace-latest"
    class="absolute -right-0.5 -bottom-0.5 size-2 rounded-full bg-success ring-2 ring-card"
  ></span>
{/snippet}

{#snippet markView(lane: Lane, mark: Mark)}
  {@const id = focusId(lane.row.key, mark.key)}
  {@const single = mark.members.length === 1}
  {@const c = mark.members[0]!}
  {@const handoff = single ? lane.handoffs.get(c.id) : undefined}
  {@const orphaned = mark.members.every((m) => m.linkState === "orphaned")}
  {@const latest = lane.latest !== null && mark.members.some((m) => m.id === lane.latest)}
  {@const authors = single
    ? []
    : authorsOf([...mark.members].reverse())
        .slice(0, STACK_MAX)
        .reverse()}
  {@const named = single
    ? labels.checkpoint(c, fmt.at(toMs(c.at)), handoff)
    : labels.cluster(
        mark.members.length,
        fmt.at(toMs(c.at)),
        fmt.at(toMs(mark.members.at(-1)!.at)),
        authorsOf(mark.members).map((a) => a.name),
        zoom !== TRACE_ZOOMS[0],
      )}
  {@const label = [
    named,
    orphaned && labels.orphaned,
    // Said, not only drawn: the green dot is colour alone.
    latest && (labels.latest ?? DEFAULT_TRACE_LABELS.latest),
  ]
    .filter(Boolean)
    .join(". ")}
  {@const chip = !single || mark.tier === "label"}
  {@const text = mark.tier === "label" ? chipText(mark, lane.handoffs, fmt, labels) : null}
  <div
    role="listitem"
    class="absolute top-1/2 -translate-y-1/2"
    style="left: {mark.left}px; width: {mark.right - mark.left}px;"
  >
    <button
      type="button"
      data-focus={id}
      data-lane={lane.row.key}
      data-mark={mark.key}
      data-tier={mark.tier}
      data-handoff={handoff ? "" : undefined}
      data-orphaned={orphaned ? "" : undefined}
      data-latest={latest ? "" : undefined}
      tabindex={tabStop === id ? 0 : -1}
      aria-describedby={card && card.lane === lane.row.key && card.mark === mark.key
        ? cardId
        : undefined}
      onclick={(e) => openMark(lane, mark, e.currentTarget, e.detail === 0)}
      class={cn(
        "relative flex w-full cursor-pointer items-center rounded-full text-left",
        "transition-[scale,border-color,background-color] duration-fast ease-out-strong motion-safe:active:scale-97",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        chip
          ? "border border-border bg-card hover:border-border-strong hover:bg-element-hover"
          : "justify-center motion-safe:hover:scale-110",
        chip && latest && "border-success/60",
        // Lost work: faded and without colour, still there to hover.
        orphaned && "opacity-50 grayscale",
      )}
      style="height: {chip ? g.chip : g.face}px; padding-left: {chip ? g.pad - 1 : 0}px;"
    >
      <span class="sr-only">{label}</span>
      {#if single}
        <span
          aria-hidden="true"
          class={cn(
            "pointer-events-none relative flex shrink-0 rounded-full",
            !chip && "ring-2 ring-background",
            handoff && "outline-1 outline-offset-1 outline-foreground/60",
          )}
        >
          {@render face(c.author, g.face)}
          {#if latest}{@render liveDot()}{/if}
        </span>
      {:else}
        <span aria-hidden="true" class="pointer-events-none flex shrink-0 items-center">
          {#each authors as author, i (author.id)}
            <span
              class="relative flex rounded-full ring-2 ring-card"
              style="margin-left: {i === 0 ? 0 : -STACK_OVERLAP}px;"
            >
              {@render face(author, g.face)}
              {#if latest && i === authors.length - 1}{@render liveDot()}{/if}
            </span>
          {/each}
        </span>
      {/if}
      {#if text}
        <span
          aria-hidden="true"
          class="pointer-events-none flex min-w-0 flex-1 flex-col pr-3 pl-2"
        >
          <span
            class={cn("truncate text-xs font-medium text-foreground", text.mono && "font-mono")}
          >
            {#if !g.twoLine && !single}<span class="mr-1.5 font-semibold tabular-nums">{mark.members.length}</span>{/if}{text.title}
          </span>
          {#if g.twoLine}
            <span class="truncate text-2xs font-medium text-muted-foreground tabular-nums">
              {#if single}{#if text.handoff}<span class="text-secondary-foreground">{text.handoff} · </span>{/if}{text.time}{#if text.stats}{" · "}<span class="text-diff-added-text">+{text.stats.additions}</span> <span class="text-diff-removed-text">−{text.stats.deletions}</span>{/if}{:else}
                {text.meta}
              {/if}
            </span>
          {/if}
        </span>
      {:else if !single}
        <span
          aria-hidden="true"
          class="pointer-events-none pr-2.5 pl-1.5 text-xs font-semibold text-foreground tabular-nums"
        >
          {mark.members.length}
        </span>
      {/if}
    </button>
  </div>
{/snippet}

{#snippet laneRow(lane: Lane)}
  {@const s = lane.row.session}
  {@const key = lane.row.key}
  {@const status = s.status ?? (s.endedAt ? "settled" : "live")}
  {@const live = status === "live"}
  <!-- The same key the project group uses, so a lane and its group agree. -->
  {@const tone = s.projectId ?? s.projectName ?? null}
  {@const hue: LabelTone = tone ? hueFor(tone) : "grey"}
  {@const hollow = s.checkpoints.length === 0}
  {@const start = toMs(s.startedAt)}
  {@const end = s.endedAt ? toMs(s.endedAt) : null}
  {@const barRight = lane.x1}
  <!-- Never shorter than it is tall: an hour at week zoom is still a bar. -->
  {@const barWidth = Math.max(g.chip, barRight - lane.x0)}
  {@const titleId = focusId(key, null)}
  {@const visible = lane.x0 <= scale.width && lane.x1 >= 0}
  {@const railTop = (g.lane + g.chip) / 2 + 2}
  <div class="flex h-full border-b border-border-subtle">
    <!-- The label column, sticky on the left. -->
    <button
      type="button"
      data-focus={titleId}
      data-lane={key}
      tabindex={tabStop === titleId ? 0 : -1}
      onclick={() => onOpenSession?.(s.id)}
      class={cn(
        "sticky left-0 z-20 flex shrink-0 cursor-pointer items-center gap-2 border-r border-border bg-background px-3 text-left",
        "transition-colors duration-fast ease-out-strong hover:bg-element-hover",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
      )}
      style="width: {LABEL_W}px;"
    >
      <!-- Named by hidden text rather than `aria-label`: the visible lines
           are a subset of it, hidden from assistive tech, so no one hears
           the initials in the faces. -->
      <span class="sr-only">
        {labels.session(
          { ...s, title: s.title || labels.untitled },
          fmt.at(start),
          end === null ? null : fmt.at(end),
          s.checkpoints.length,
        )}
      </span>
      <span
        aria-hidden="true"
        class={cn("flex min-w-0 flex-1 flex-col", g.twoLine ? "gap-0.5" : "gap-0")}
      >
        <span class="flex min-w-0 items-center gap-1.5">
          {#if status !== "settled"}
            <span
              class={cn("size-1.5 shrink-0 rounded-full", live ? "bg-success" : "bg-error")}
            ></span>
          {/if}
          <span
            class={cn(
              "truncate font-medium text-foreground",
              g.twoLine ? "text-sm" : "text-xs",
            )}
          >
            {s.title || labels.untitled}
          </span>
        </span>
        <span class="caption flex min-w-0 items-center gap-1">
          {#if renderAgentMark}
            <span class="flex shrink-0 items-center empty:hidden">{@render renderAgentMark(s)}</span>
          {/if}
          {#if s.agentLabel}<span class="truncate">{s.agentLabel}</span>{/if}
          {#if groupBy !== "project" && s.projectName}
            {#if s.agentLabel || renderAgentMark}<span>·</span>{/if}
            <span class={cn("size-1.5 shrink-0 rounded-full", HUE_BG[hue])}></span>
            <span class="truncate">{s.projectName}</span>
          {/if}
        </span>
      </span>
      {#if s.participants.length > 0}
        <span aria-hidden="true" class="flex shrink-0">
          <!-- `space-x-0` rather than the stack's 6px overlap: side by
               side, as a mark's stack is (`STACK_OVERLAP`), so every
               participant's initials read whole. -->
          <AvatarStack class="space-x-0">
            {#each s.participants.slice(0, 3) as p (p.id)}
              <span class="flex">{@render face(p, HEADER_FACE)}</span>
            {/each}
          </AvatarStack>
        </span>
      {/if}
    </button>

    <!-- The track. -->
    <div data-pan-layer class="relative h-full" style="width: {scale.width}px;">
      {#if visible}
        <span
          aria-hidden="true"
          data-slot="checkpoint-trace-bar"
          class={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-full",
            hollow ? "border border-dashed border-border-strong" : BAR_FILL[hue],
          )}
          style="left: {lane.x0}px; width: {barWidth}px; height: {g.chip}px;"
        ></span>
      {/if}
      <!-- Who held it when: a hairline per run under the bar, in each
           person's face colour, so a handoff is a change of colour. -->
      {#if visible}
        {#each lane.runs as run, i (run.author.id + ":" + i)}
          {@const runEnd = i === lane.runs.length - 1 ? lane.x0 + barWidth : run.x1}
          {#if runEnd > run.x0}
            <span
              aria-hidden="true"
              data-slot="checkpoint-trace-rail"
              class={cn("absolute h-0.5 rounded-full", PEER_INK[actorHue(run.author)].bg)}
              style="left: {run.x0}px; width: {Math.max(2, runEnd - run.x0 - 1)}px; top: {railTop}px;"
            ></span>
          {/if}
        {/each}
      {/if}
      {#if live && visible && nowX >= 0 && nowX <= scale.width}
        <span
          aria-hidden="true"
          data-slot="checkpoint-trace-live-edge"
          class="absolute top-1/2 size-2 -translate-1/2 rounded-full bg-success motion-safe:animate-pulse"
          style="left: {barRight}px;"
        ></span>
      {/if}
      {#if status === "error" && visible}
        <span
          aria-hidden="true"
          class="absolute top-1/2 w-0.5 -translate-y-1/2 rounded-full bg-error"
          style="left: {lane.x0 + barWidth - 1}px; height: {g.chip}px;"
        ></span>
      {/if}
      <!-- A hollow bar says what it is: at week zoom a short empty session
           is only a dashed circle, which on its own reads as a glitch. The
           lane title's name already says "0 checkpoints". -->
      {#if hollow && visible}
        <span
          aria-hidden="true"
          data-slot="checkpoint-trace-empty-label"
          class="caption absolute top-1/2 -translate-y-1/2 pl-1.5 whitespace-nowrap"
          style="left: {lane.x0 + barWidth}px;"
        >
          {labels.noCheckpoints ?? DEFAULT_TRACE_LABELS.noCheckpoints}
        </span>
      {/if}
      {#if s.checkpointsTruncated && visible}
        <span
          title={labels.truncated}
          class="caption absolute top-1/2 -translate-y-1/2 pl-1.5 whitespace-nowrap"
          style="left: {Math.max(lane.x0 + barWidth, (lane.marks.at(-1)?.right ?? 0) + 2)}px;"
        >
          <span aria-hidden="true">+ more</span>
          <span class="sr-only">{labels.truncated}</span>
        </span>
      {/if}
      {#if lane.marks.length > 0}
        <div role="list" aria-label={s.title || labels.untitled} class="contents">
          {#each lane.marks as mark (mark.key)}
            {@render markView(lane, mark)}
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/snippet}

<div
  bind:this={rootEl}
  role="region"
  aria-label={labels.region}
  data-slot="checkpoint-trace"
  class={cn("relative flex h-full min-h-0 flex-col bg-background", className)}
>
  <div class="flex h-control-lg shrink-0 items-center gap-2 border-b border-border px-2">
    <div class="flex min-w-0 flex-1 items-center gap-2">
      {#if toolbar}{@render toolbar()}{/if}
    </div>
    <Button
      variant="ghost"
      size="sm"
      onclick={jumpToNow}
      disabled={loading || !!error || now < scale.from || now > scale.to}
    >
      {labels.now}
    </Button>
    <Segmented
      size="sm"
      aria-label={labels.zoom}
      value={zoom}
      onValueChange={(next) => setZoom(next)}
      options={TRACE_ZOOMS.map((z) => ({ value: z, label: labels.zoomLevels[z] }))}
    />
  </div>

  {#if errorText !== null}
    <div role="alert" class="flex flex-1 items-center justify-center">
      <EmptyState icon={TriangleAlert} title={labels.errorTitle} description={errorText} />
    </div>
  {:else if errorSnippet}
    <div role="alert" class="flex flex-1 items-center justify-center">
      {@render errorSnippet()}
    </div>
  {:else if loading}
    <div role="status" aria-busy="true" class="min-h-0 flex-1 overflow-hidden">
      <span class="sr-only">{labels.loading}</span>
      <div style="height: {AXIS_H}px" class="border-b border-border"></div>
      {#each SKELETON_LANES as [left, width], i (i)}
        <div
          aria-hidden="true"
          class="flex items-center border-b border-border-subtle"
          style="height: {g.lane}px"
        >
          <div class="flex flex-col gap-1.5 px-3" style="width: {LABEL_W}px">
            <Skeleton class="h-3 w-3/4" />
            <Skeleton class="h-2 w-1/3" />
          </div>
          <div class="relative h-full flex-1">
            <Skeleton
              class="absolute top-1/2 -translate-y-1/2 rounded-full"
              style="left: {left}%; width: {width}%; height: {g.chip}px"
            />
          </div>
        </div>
      {/each}
    </div>
  {:else if sessions.length === 0}
    <div class="flex flex-1 items-center justify-center">
      {#if empty}
        {@render empty()}
      {:else}
        <EmptyState title={labels.emptyTitle} description={labels.emptyDescription} />
      {/if}
    </div>
  {:else}
    <!-- The trace: one scroller, both axes. The pointer and key handlers
         serve the buttons inside it; the scroller itself is not a control. -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      bind:this={scroller}
      data-slot="checkpoint-trace-scroller"
      onscroll={onScroll}
      onpointerdown={onPointerDown}
      onpointermove={onPointerMove}
      onpointerup={onPointerUp}
      onpointercancel={(e) => onPointerUp(e, true)}
      onkeydown={onKeyDown}
      onfocusin={onFocus}
      onblur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hideCard();
      }}
      onpointerover={(e) => {
        if (drag) return;
        const el = markOf(e.target);
        if (el) showCard(el, false);
      }}
      onpointerout={(e) => {
        const el = markOf(e.target);
        if (el && !el.contains(e.relatedTarget as Node | null) && !el.matches(":focus-visible"))
          hideCard();
      }}
      class="group/trace relative min-h-0 flex-1 overflow-auto overscroll-x-contain select-none"
    >
      <div class="relative" style="width: {contentW}px;">
        <!-- The axis: sticky to the top; its corner sticky to the left too. -->
        <div
          aria-hidden="true"
          class="sticky top-0 z-30 flex border-b border-border bg-background"
          style="height: {AXIS_H}px; width: {contentW}px"
        >
          <div
            class="sticky left-0 z-10 flex shrink-0 items-center gap-1.5 border-r border-border bg-background px-3"
            style="width: {LABEL_W}px"
          >
            {#if readingGroup}
              <span class="flex min-w-0 items-center gap-1.5">
                {#if readingGroup.person}
                  <span aria-hidden="true" class="flex">
                    {@render face(readingGroup.person, HEADER_FACE)}
                  </span>
                {:else}
                  <span
                    aria-hidden="true"
                    class={cn("size-2 shrink-0 rounded-full", HUE_BG[readingGroup.hue ?? "grey"])}
                  ></span>
                {/if}
                <span class="truncate text-sm font-semibold text-foreground">
                  {readingGroup.label}
                </span>
              </span>
            {:else}
              <span class="eyebrow">{labels.sessions}</span>
            {/if}
          </div>
          <div data-pan-layer class="relative flex-1">
            {#each ticks as tick (tick.t)}
              <span
                class={cn(
                  "absolute bottom-0 w-px",
                  tick.major ? "h-full bg-border" : "h-1.5 bg-border",
                )}
                style="left: {tick.x}px"
              ></span>
              {#if tick.labelled && !tick.major}
                <span
                  class="absolute top-1/2 -translate-y-1/2 pl-1.5 text-2xs whitespace-nowrap text-muted-foreground tabular-nums"
                  style="left: {tick.x}px"
                >
                  {fmt.time(tick.t)}
                </span>
              {/if}
            {/each}
            <!-- A major label spans its day (or hour) and sticks to the
                track's left edge inside it, so the day being read is
                always named whole, never cut under the lane column. -->
            {#each unitLabels as tick (tick.t)}
              <span
                class="absolute inset-y-0 flex items-center"
                style="left: {tick.left}px; width: {Math.max(0, tick.right - tick.left)}px"
              >
                <!-- Its tail fades out, so an hour label sliding under it
                    dissolves rather than showing a cut-off digit. -->
                <span
                  class={cn(
                    "sticky bg-background pr-1 pl-1.5 text-2xs font-medium whitespace-nowrap text-foreground tabular-nums",
                    "after:absolute after:inset-y-0 after:left-full after:w-6 after:bg-linear-to-r after:from-background after:to-transparent",
                  )}
                  style="left: {LABEL_W}px"
                >
                  {zoom === "hour" ? fmt.time(tick.t) : fmt.day(tick.t)}
                </span>
              </span>
            {/each}
            {#if nowInRange}
              <span
                class="absolute bottom-0 -translate-x-1/2 rounded-t-sm bg-primary px-1 text-3xs font-medium text-primary-foreground"
                style="left: {nowX}px"
              >
                {labels.now}
              </span>
            {/if}
          </div>
        </div>

        <div data-pan class="relative cursor-grab" style="height: {totalH}px">
          <!-- Gridlines and the now line, under the lanes. -->
          <div
            aria-hidden="true"
            data-pan-layer
            class="pointer-events-none absolute inset-y-0"
            style="left: {LABEL_W}px; width: {scale.width}px"
          >
            {#each majorTicks as tick (tick.t)}
              <span class="absolute inset-y-0 w-px bg-border-subtle" style="left: {tick.x}px"
              ></span>
            {/each}
            {#if nowInRange}
              <span class="absolute inset-y-0 w-px bg-primary" style="left: {nowX}px"></span>
            {/if}
          </div>

          {#if groupBy === "none"}
            <div role="list" aria-label={labels.sessions} class="contents">
              {#each virtualRows as v (v.key)}
                {@const row = rows[v.index]}
                {@const lane = row ? lanes.get(row.key) : undefined}
                {#if lane}
                  {@const where = placeOf.get(lane.row.key)}
                  <div
                    role="listitem"
                    aria-posinset={where?.pos}
                    aria-setsize={where?.size}
                    use:virtualizer.measure={v.index}
                    class="absolute top-0 left-0"
                    style="width: {contentW}px; height: {v.size}px; transform: translateY({v.start -
                      AXIS_H}px)"
                  >
                    {@render laneRow(lane)}
                  </div>
                {/if}
              {/each}
            </div>
          {:else}
            {#each runs as run (run.groupId ?? run.items[0]!.key)}
              {@const group = run.groupId ? groups.get(run.groupId) : undefined}
              {@const first = run.items[0] ? rows[run.items[0]!.index] : undefined}
              {@const heading = first?.kind === "group" ? run.items[0] : undefined}
              {@const laneItems = heading ? run.items.slice(1) : run.items}
              <section aria-label={group?.label} class="contents">
                {#if heading && group}
                  <div
                    use:virtualizer.measure={heading.index}
                    class="absolute top-0 left-0"
                    style="width: {contentW}px; height: {heading.size}px; transform: translateY({heading.start -
                      AXIS_H}px)"
                  >
                    <div class="flex h-full items-end border-b border-border pb-1.5">
                      <div
                        role="heading"
                        aria-level={3}
                        class="sticky left-0 z-20 flex items-center gap-3 px-3"
                        style="max-width: {LABEL_W * 2}px"
                      >
                        <span class="flex min-w-0 items-center gap-1.5">
                          {#if group.person}
                            <span aria-hidden="true" class="flex">
                              {@render face(group.person, HEADER_FACE)}
                            </span>
                          {:else}
                            <span
                              aria-hidden="true"
                              class={cn(
                                "size-2 shrink-0 rounded-full",
                                HUE_BG[group.hue ?? "grey"],
                              )}
                            ></span>
                          {/if}
                          <span class="truncate text-sm font-semibold text-foreground">
                            {group.label}
                          </span>
                        </span>
                        <span class="caption shrink-0 tabular-nums">
                          {labels.groupMeta(group.sessions, group.checkpoints)}
                        </span>
                      </div>
                    </div>
                  </div>
                {/if}
                {#if laneItems.length > 0}
                  <div role="list" aria-label={group?.label} class="contents">
                    {#each laneItems as v (v.key)}
                      {@const row = rows[v.index]}
                      {@const lane = row ? lanes.get(row.key) : undefined}
                      {#if lane}
                        {@const where = placeOf.get(lane.row.key)}
                        <div
                          role="listitem"
                          aria-posinset={where?.pos}
                          aria-setsize={where?.size}
                          use:virtualizer.measure={v.index}
                          class="absolute top-0 left-0"
                          style="width: {contentW}px; height: {v.size}px; transform: translateY({v.start -
                            AXIS_H}px)"
                        >
                          {@render laneRow(lane)}
                        </div>
                      {/if}
                    {/each}
                  </div>
                {/if}
              </section>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  {/if}

  {#if card && cardLane && cardMark}
    {@const c = cardMark.members[0]!}
    {@const single = cardMark.members.length === 1}
    <div
      bind:this={cardEl}
      id={cardId}
      role="tooltip"
      data-slot="checkpoint-trace-card"
      class={cn(
        "pointer-events-none absolute z-popover flex w-72 flex-col gap-2 rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-md",
        cardPos ? "visible" : "invisible",
        cardPos && !card.instant && "motion-safe:animate-scale-in motion-reduce:animate-fade-in",
        cardPos?.above ? "origin-bottom" : "origin-top",
      )}
      style="left: {cardPos?.left ?? 0}px; top: {cardPos?.top ?? 0}px;"
    >
      {#if single}
        <p
          class={cn(
            "line-clamp-2 text-sm font-medium text-foreground",
            !c.title && "font-mono",
          )}
        >
          {checkpointTitle(c)}
        </p>
        <div class="flex items-center gap-1.5 text-xs text-secondary-foreground">
          {@render face(c.author, 16)}
          <span class="truncate">{c.author.name}</span>
          <span aria-hidden="true" class="text-muted-foreground">·</span>
          <span class="shrink-0 tabular-nums">{fmt.full(toMs(c.at))}</span>
        </div>
        {#if cardLane.handoffs.has(c.id)}
          <p class="caption">{labels.handoff(cardLane.handoffs.get(c.id)!)}</p>
        {/if}
        {#if c.linkState === "orphaned"}
          <p class="caption">{labels.orphaned}</p>
        {/if}
        <!-- Without a title the sha is already the heading. -->
        {#if (c.sha && c.title) || c.branch}
          <div class="flex min-w-0 items-center gap-2 font-mono text-2xs text-muted-foreground">
            {#if c.sha && c.title}<span class="shrink-0">{c.sha.slice(0, 7)}</span>{/if}
            {#if c.branch}
              <span class="flex min-w-0 items-center gap-1">
                <Icon icon={GitBranch} size="xs" />
                <span class="truncate">{c.branch}</span>
              </span>
            {/if}
          </div>
        {/if}
        {#if c.additions !== undefined || c.deletions !== undefined || c.files !== undefined}
          <div class="flex items-center gap-1.5 text-2xs tabular-nums">
            {#if c.additions !== undefined}
              <span class="text-diff-added-text">+{c.additions}</span>
            {/if}
            {#if c.deletions !== undefined}
              <!-- U+2212 MINUS, so it lines up with the plus. -->
              <span class="text-diff-removed-text">−{c.deletions}</span>
            {/if}
            {#if c.files !== undefined}
              <span class="text-muted-foreground">{labels.files(c.files)}</span>
            {/if}
          </div>
        {/if}
      {:else}
        <p class="text-sm font-medium text-foreground tabular-nums">
          {labels.checkpoints(cardMark.members.length)}
          <span class="font-normal text-muted-foreground">
            {" "}
            · {fmt.time(toMs(c.at))}–{fmt.time(toMs(cardMark.members.at(-1)!.at))}
          </span>
        </p>
        <ul class="flex flex-col gap-1">
          {#each cardMark.members.slice(0, 4) as member (member.id)}
            <li class="flex min-w-0 items-center gap-1.5 text-xs">
              {@render face(member.author, 14)}
              <span class="min-w-0 flex-1 truncate text-secondary-foreground">
                {checkpointTitle(member)}
              </span>
              <span class="shrink-0 text-2xs text-muted-foreground tabular-nums">
                {fmt.time(toMs(member.at))}
              </span>
            </li>
          {/each}
        </ul>
        {#if cardMark.members.length > 4}
          <p class="caption">{labels.more(cardMark.members.length - 4)}</p>
        {/if}
        <p class="caption">{labels.clusterHint(zoom !== TRACE_ZOOMS[0])}</p>
      {/if}
      <p class="caption truncate border-t border-border-subtle pt-2">
        {cardLane.row.session.title || labels.untitled}{cardLane.row.session.agentLabel
          ? ` · ${cardLane.row.session.agentLabel}`
          : ""}
      </p>
    </div>
  {/if}
</div>







