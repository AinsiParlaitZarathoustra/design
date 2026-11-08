<script lang="ts">
  /**
   * The canvas and code-surface family's scenarios (lot f6). The gallery mounts
   * this with `story` set to a source story id; the scenario is that story's
   * oracle file under `stories/components/`, with its args and its state, drawn
   * with the lot's Svelte components. A story's `play` is replayed here by real
   * events on the rendered controls, once the scenario has mounted.
   */
  import { tick } from "svelte";
  import {
    ArrowLeftIcon,
    CodeIcon,
    CrosshairIcon,
    EyeIcon,
    FilePlus2Icon,
    LockIcon,
    PanelLeftIcon,
    RefreshCwIcon,
    UploadIcon,
    WrapTextIcon,
  } from "lucide-svelte";
  import {
    highlightRanges,
    pathSegments,
    SYNTAX_TEXT_CLASS,
    type SyntaxRole,
    type TerminalLine,
    type TerminalSegment,
  } from "../../src/lots/f6-canvas-code/code-surface/code-surface";
  import {
    CANVAS_EXPORT_FORMATS,
    CanvasActionPill,
    CanvasDraftBox,
    CanvasFrame,
    CanvasHeaderPill,
    CanvasMedia,
    CanvasMinimap,
    CanvasNodeFrame,
    CanvasNote,
    CanvasPagesPanel,
    CanvasPill,
    CanvasPillButton,
    CanvasPillDivider,
    CanvasShape,
    CanvasStatusChip,
    CanvasSurface,
    CanvasText,
    CanvasToolbar,
    LOCAL_CANVAS_TOOL_GROUPS,
    PresenceCursor,
    PresenceLayer,
    SPACES_TOOL_GROUPS,
    TerminalBlock,
    TerminalCommandInput,
    TerminalOutput,
    TerminalPalette,
    TerminalStatus,
    TerminalStopControl,
    CommandSuggestions,
    EditorBreadcrumbs,
    EditorFrame,
    EditorPreview,
    EditorStatusBar,
    FindBar,
    type CanvasDock,
    type CanvasPageRow,
    type CanvasToolItem,
    type CommandSuggestion,
    type EditorPreviewLine,
    type FindFlag,
  } from "../../src/lots/f6-canvas-code/index";
  import Button from "../../src/ui/button.svelte";
  import Hint from "../../src/ui/hint.svelte";
  import IconButton from "../../src/ui/icon-button.svelte";
  import Spinner from "../../src/components/ui/spinner.svelte";
  import Badge from "../../src/ui/badge.svelte";
  import Icon from "../../src/ui/icon.svelte";
  import * as F from "../../src/lots/f6-canvas-code/fixtures";
  import { CANVAS_FIELD_CLASS } from "../../src/lots/f6-canvas-code/index";

  interface Props {
    story?: string;
  }

  let { story = "" }: Props = $props();

  // A story id is `<oracle file prefix>--<story name>`; the prefix picks the scenario.
  // svelte-ignore state_referenced_locally
  const [prefix = "", variant = ""] = story.split("--");

  const DEMO: Record<string, string> = {
    "patterns-terminalcommandinput": "command-input",
    "patterns-commandsuggestions": "command-suggestions",
    "patterns-editorbreadcrumbs": "breadcrumbs",
    "patterns-editorframe": "editor-frame",
    "patterns-editorpreview": "editor-preview",
    "patterns-editorstatusbar": "status-bar",
    "patterns-findbar": "find-bar",
    "patterns-terminalblock": "terminal-block",
    "patterns-terminalpalette": "palette",
    "patterns-terminalstopcontrol": "stop",
    "blocks-canvas-action-pill": "action-pill",
    "blocks-canvas-board": "board",
    "blocks-canvas-chrome": "chrome",
    "blocks-canvas-header": "header",
    "blocks-canvas-minimap": "minimap",
    "blocks-canvas-nodes": "nodes",
    "blocks-canvas-pages-panel": "pages-panel",
    "blocks-canvas-toolbar": "toolbar",
    "blocks-presence-cursor": "presence",
  };
  const demo = DEMO[prefix] ?? "";

  const noop = () => {};
  const toggleNoop = (_flag: FindFlag, _value: boolean) => {};
  const ROOT = F.ROOT;
  const crumbPath = (path: string) => pathSegments(`${ROOT}/${path}`, ROOT);
  const ROLES = Object.keys(SYNTAX_TEXT_CLASS) as SyntaxRole[];
  const SHAPES = ["rectangle", "rounded", "ellipse", "diamond", "triangle"] as const;
  const STATUS_LABEL: Record<string, string> = {
    live: "Live in #design — every change is shared",
    syncing: "Reconnecting… your edits are kept and sent when the Space is back",
    offline: "Offline — keep drawing; your changes are held and sent when this reconnects",
    archived: "#design is archived — this Space is readable, but takes no edits",
    viewing: "Viewing — this page is full, so your cursor and edits are not shared",
  };
  const ONE_PAGE: CanvasPageRow[] = [{ id: "p-only", kind: "page", name: "Board", subtitle: "Updated just now" }];
  const AUTHORED: CanvasPageRow[] = F.PAGE_ROWS.map((r) =>
    r.id === "p-roadmap"
      ? { ...r, author: { name: "Ana Ruiz" } }
      : r.id === "p-interviews"
        ? { ...r, author: { name: F.LONG_NAME } }
        : r,
  );
  const LONG_NAME_ROWS: CanvasPageRow[] = [
    { id: "p-long", kind: "page", name: "Quarterly planning for the realtime sync rewrite and its rollout", subtitle: "Updated 5m ago" },
    ...F.PAGE_ROWS.slice(1),
  ];
  const SUGGEST_ITEMS: CommandSuggestion[] = [
    { name: "src", kind: "dir" },
    { name: "scripts", kind: "dir" },
    { name: "package.json", kind: "file" },
    { name: "bun", kind: "command" },
  ];
  const SUGGEST_ITEMS_CMD: CommandSuggestion[] = [
    { name: "src", kind: "dir" },
    { name: "scripts", kind: "dir" },
    { name: "stories", kind: "dir" },
    { name: "skills.md", kind: "file" },
    { name: "sed", kind: "command" },
  ];
  const EDITOR_SELECTION: EditorPreviewLine[] = [
    {
      tokens: [
        { text: "const", role: "keyword" },
        { text: " " },
        { text: "duration", role: "definition", selected: true },
        { text: " = ", role: "operator", selected: true },
        { text: "format", role: "function", selected: true },
        { text: "(", role: "operator", bracket: true },
        { text: "ms", role: "variable" },
        { text: ")", role: "operator", bracket: true, caret: true },
        { text: ";", role: "operator" },
      ],
    },
    {
      tokens: [
        { text: "// ", role: "comment" },
        { text: "format", role: "comment", match: "match" },
        { text: " once, then ", role: "comment" },
        { text: "format", role: "comment", match: "active" },
        { text: " again", role: "comment" },
      ],
    },
    { tokens: [{ text: "return", role: "keyword" }, { text: " duration;", role: "variable" }] },
  ];
  const BUILD_HEAD = F.BUILD.split("\n").slice(0, 2).join("\n");

  // ── Action pill ─────────────────────────────────────────────────────────
  type ApillCfg = {
    peers?: typeof F.PEERS;
    initialFollowing?: string;
    followers?: number;
    exporting?: boolean;
    exportLabel?: string;
    self: boolean;
    follow: boolean;
    external: boolean;
    exportable: boolean;
  };
  const APILL: Record<string, ApillCfg> = {
    alone: { self: true, follow: true, external: true, exportable: true },
    "three-peers": { peers: F.PEERS.slice(0, 3), self: true, follow: true, external: true, exportable: true },
    overflow: { peers: F.MANY_PEERS, self: true, follow: true, external: true, exportable: true },
    following: { peers: F.PEERS, initialFollowing: "actor_kofi", self: true, follow: true, external: true, exportable: true },
    "followed-by": { peers: F.PEERS.slice(0, 2), followers: 2, self: true, follow: true, external: true, exportable: true },
    exporting: { peers: F.PEERS.slice(0, 2), exporting: true, self: true, follow: true, external: true, exportable: true },
    "export-labelled": { peers: F.PEERS.slice(0, 2), exportLabel: "Export", self: true, follow: true, external: true, exportable: true },
    "export-labelled-exporting": { peers: F.PEERS.slice(0, 2), exportLabel: "Export", exporting: true, self: true, follow: true, external: true, exportable: true },
    "export-only": { self: false, follow: false, external: false, exportable: true },
  };
  const apill = $derived(demo === "action-pill" ? APILL[variant] : undefined);
  // svelte-ignore state_referenced_locally
  let following = $state<string | null>(APILL[variant]?.initialFollowing ?? null);

  // The chrome demo starts with its pages toggle on.
  // svelte-ignore state_referenced_locally
  let chromeOpen = $state(true);

  // ── Header ──────────────────────────────────────────────────────────────
  type HeaderCfg = {
    pageName?: string;
    pageIcon?: string;
    switcher?: boolean;
    noPages?: boolean;
    status?: "live" | "syncing" | "offline" | "archived" | "viewing";
    offlineTone?: "warning" | "error";
    zoom?: number;
    fullscreen?: boolean;
  };
  const HEADER: Record<string, HeaderCfg & { _noStatus?: boolean; _noZoom?: boolean }> = {
    live: { status: "live", zoom: 1 },
    syncing: { status: "syncing", zoom: 1 },
    offline: { status: "offline", zoom: 1 },
    "offline-error": { status: "offline", offlineTone: "error", zoom: 1 },
    archived: { status: "archived", zoom: 0.75 },
    viewing: { status: "viewing", zoom: 1.5 },
    "local-canvas": { pageName: "Architecture", pageIcon: "🏗️", switcher: false, fullscreen: false, _noStatus: true, _noZoom: true },
    "long-page-name": { status: "live", zoom: 1, switcher: false, pageName: "Quarterly planning for the realtime sync rewrite and its rollout to every org" },
    "page-switcher": { status: "live", zoom: 1 },
    "page-switcher-empty": { status: "live", zoom: 1, noPages: true },
  };
  const hcfg = $derived(demo === "header" ? HEADER[variant] ?? {} : {});
  // svelte-ignore state_referenced_locally
  let pagesOpen = $state(false);
  // svelte-ignore state_referenced_locally
  let headerPage = $state(F.SWITCHER_PAGES[0]!.id);
  // svelte-ignore state_referenced_locally
  let scale = $state<number | undefined>(HEADER[variant]?._noZoom ? undefined : HEADER[variant]?.zoom ?? 1);
  // svelte-ignore state_referenced_locally
  let full = $state<boolean | undefined>(HEADER[variant]?.fullscreen);
  const headerSwitcher = $derived(hcfg.switcher ?? true);
  const headerName = $derived(
    headerSwitcher ? F.SWITCHER_PAGES.find((p) => p.id === headerPage)!.name : (hcfg.pageName ?? "Roadmap"),
  );
  const headerStatus = $derived(hcfg._noStatus ? undefined : hcfg.status);

  // ── Toolbar ─────────────────────────────────────────────────────────────
  type ToolbarCfg = { groups?: "local"; dock?: CanvasDock; movable?: boolean; canUndo?: boolean; canRedo?: boolean; disabled?: boolean };
  const TOOLBAR: Record<string, ToolbarCfg> = {
    "spaces-bottom": {},
    "spaces-left": { dock: "left" },
    "spaces-right": { dock: "right" },
    "local-canvas": { groups: "local", dock: "left", movable: false, canRedo: true },
    "history-unavailable": { canUndo: false, canRedo: false },
    disabled: { disabled: true },
    "tool-armed": {},
  };
  const tcfg = $derived(demo === "toolbar" ? (TOOLBAR[variant] ?? {}) : {});
  const toolGroups: CanvasToolItem[][] = $derived(tcfg.groups === "local" ? LOCAL_CANVAS_TOOL_GROUPS : SPACES_TOOL_GROUPS);
  // svelte-ignore state_referenced_locally
  let toolTool = $state<string | null>(null);
  // svelte-ignore state_referenced_locally
  let toolDock = $state<CanvasDock>(TOOLBAR[variant]?.dock ?? "bottom");

  // ── Pages panel ─────────────────────────────────────────────────────────
  type PanelCfg = {
    rows?: CanvasPageRow[];
    folders?: boolean;
    icons?: boolean;
    initialCollapsed?: string[];
    dropIndicator?: { id: string; where: "before" | "after" | "into" };
    backLink?: boolean;
    newPageInside?: boolean;
    deleteMode?: "hover" | "always";
    lastPageLabel?: string;
  };
  const PANEL: Record<string, PanelCfg> = {
    flat: { rows: F.LOCAL_PAGE_ROWS, folders: false, icons: true },
    "with-folders": { rows: F.PAGE_ROWS, folders: true, icons: false },
    collapsed: { rows: F.PAGE_ROWS, folders: true, icons: false, initialCollapsed: ["f-research"] },
    "single-page": { rows: ONE_PAGE, folders: false, icons: false },
    empty: { rows: [], folders: false, icons: true },
    "long-names": { rows: LONG_NAME_ROWS, folders: true, icons: false },
    "drop-indicator-before": { rows: F.PAGE_ROWS, folders: true, icons: false, dropIndicator: { id: "p-retro", where: "before" } },
    "drop-indicator-after": { rows: F.PAGE_ROWS, folders: true, icons: false, dropIndicator: { id: "p-roadmap", where: "after" } },
    "drop-indicator-into": { rows: F.PAGE_ROWS, folders: true, icons: false, dropIndicator: { id: "f-research", where: "into" } },
    "with-back-link": { rows: F.PAGE_ROWS, folders: true, icons: false, backLink: true },
    rename: { rows: F.LOCAL_PAGE_ROWS, folders: false, icons: true },
    "with-authors": { rows: AUTHORED, folders: true, icons: false },
    "row-actions": { rows: F.PAGE_ROWS, folders: true, icons: false, newPageInside: true },
    "delete-always": { rows: F.PAGE_ROWS, folders: true, icons: false, deleteMode: "always" },
    "delete-always-last-page": { rows: ONE_PAGE, folders: false, icons: false, deleteMode: "always" },
    "delete-always-last-page-label": {
      rows: ONE_PAGE,
      folders: false,
      icons: false,
      deleteMode: "always",
      lastPageLabel: "The last page of a Space cannot be deleted.",
    },
    "spaces-full": {
      rows: AUTHORED,
      folders: true,
      icons: false,
      newPageInside: true,
      deleteMode: "always",
      backLink: true,
      dropIndicator: { id: "p-retro", where: "before" },
    },
    "row-action-click": { rows: F.PAGE_ROWS, folders: true, icons: false, newPageInside: true },
  };
  const pcfg = $derived(demo === "pages-panel" ? (PANEL[variant] ?? {}) : {});
  // svelte-ignore state_referenced_locally
  let panelRows = $state<CanvasPageRow[]>(PANEL[variant]?.rows ?? F.LOCAL_PAGE_ROWS);
  // svelte-ignore state_referenced_locally
  let panelActive = $state<string | null>((PANEL[variant]?.rows ?? F.LOCAL_PAGE_ROWS).find((r) => r.kind === "page")?.id ?? null);
  // svelte-ignore state_referenced_locally
  let panelCollapsed = $state<Set<string>>(new Set(PANEL[variant]?.initialCollapsed ?? []));
  const panelVisible = $derived.by(() => {
    const out: CanvasPageRow[] = [];
    let hiddenBelow: number | null = null;
    for (const r of panelRows) {
      const depth = r.depth ?? 0;
      if (hiddenBelow !== null && depth > hiddenBelow) continue;
      hiddenBelow = null;
      out.push(r);
      if (r.kind === "folder" && panelCollapsed.has(r.id)) hiddenBelow = depth;
    }
    return out;
  });

  // ── Board ───────────────────────────────────────────────────────────────
  let boardTool = $state<string | null>(null);
  let boardDock = $state<CanvasDock>("bottom");
  let boardPagesOpen = $state(false);
  let boardFollowing = $state<string | null>(null);
  let localTool = $state<string | null>("shape:rounded");
  let localActive = $state(F.LOCAL_PAGE_ROWS[0]!.id);
  let localPagesOpen = $state(true);
  const boardEmpty = $derived(variant === "empty-page");
  const boardLocal = $derived(variant === "local-canvas");
  const localPage = $derived(F.LOCAL_PAGE_ROWS.find((r) => r.id === localActive)!);

  // ── Find bar ────────────────────────────────────────────────────────────
  type FindCfg = { query: string; onToggle?: boolean; invalid?: boolean; regexp?: boolean; matchCount?: number; replaceOpen?: boolean; replace?: boolean; placeholder?: string; selectAll?: boolean };
  const FIND: Record<string, FindCfg> = {
    matches: { query: "format", onToggle: true },
    "no-results": { query: "kubernetes", onToggle: true },
    "invalid-regex": { query: "format(", invalid: true, regexp: true, matchCount: 0, onToggle: true },
    replace: { query: "format", onToggle: true, replaceOpen: true, replace: true },
    "find-only": { query: "format", placeholder: "Search output…" },
    "select-all": { query: "", onToggle: true, selectAll: true },
  };
  const fcfg = $derived(demo === "find-bar" ? (FIND[variant] ?? { query: "" }) : { query: "" });
  // svelte-ignore state_referenced_locally
  let findQuery = $state(FIND[variant]?.query ?? "");
  let findIndex = $state<number>(0);
  // svelte-ignore state_referenced_locally
  let findReplaceOpen = $state(FIND[variant]?.replaceOpen ?? false);
  let findReplace = $state("");
  const findCount = $derived(highlightRanges(F.FIND_TEXT, findQuery).length);
  const findMatchCount = $derived(fcfg.matchCount ?? findCount);
  const findMatchIndex = $derived(findCount ? findIndex : null);

  // ── Command input ───────────────────────────────────────────────────────
  type CmdCfg = { value?: string; busy?: boolean; raw?: boolean; status?: boolean; stop?: boolean; suggestions?: boolean; narrow?: boolean };
  const CMD: Record<string, CmdCfg> = {
    idle: {},
    busy: { busy: true, stop: true },
    "raw-mode": { busy: true, raw: true, stop: true },
    "with-status": { status: true, stop: true, busy: true },
    suggestions: { value: "cd s", status: true, suggestions: true },
    "narrow-status": { status: true, stop: true, busy: true, narrow: true },
  };
  const ccfg = $derived(demo === "command-input" ? (CMD[variant] ?? {}) : {});
  // svelte-ignore state_referenced_locally
  let cmdValue = $state(CMD[variant]?.value ?? "");
  let cmdOpen = $state(true);
  let cmdActive = $state(0);

  let cmdWrap = $state<HTMLDivElement | null>(null);

  /** The first row named `name`, once the list has opened over the field. */
  async function optionNamed(name: string) {
    for (let frame = 0; frame < 60; frame++) {
      const found = [...document.querySelectorAll<HTMLElement>('[role="option"]')].find(
        (el) => el.textContent?.trim() === name,
      );
      if (found) return found;
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    throw new Error(`No option named ${name}`);
  }

  /**
   * The `play` of the Suggestions story: a click on the field, then a press on
   * the "scripts/" row. The press picks the row and keeps the field focused, and
   * the list closes on the value it sets.
   */
  async function playSuggestions(wrap: HTMLElement) {
    await tick();
    const field = wrap.querySelector<HTMLTextAreaElement>('textarea[aria-label="Command"]');
    if (!field) throw new Error("No command field");
    field.focus();
    field.click();
    const option = await optionNamed("scripts/");
    option.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true }));
    await tick();
    if (document.activeElement !== field) throw new Error("The field lost focus");
  }

  $effect(() => {
    const wrap = cmdWrap;
    if (story !== "patterns-terminalcommandinput--suggestions" || !wrap) return;
    void playSuggestions(wrap);
  });

  /** Stories whose `play` ends in a state the first frame does not have. */
  const PLAYED = new Set([
    "patterns-findbar--matches",
    "patterns-findbar--select-all",
    "patterns-terminalblock--memoised-lines",
    "patterns-terminalstopcontrol--ready",
  ]);

  function keyOn(el: HTMLElement, init: KeyboardEventInit) {
    el.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, ...init }));
  }

  /** Polls `check` every frame until it holds, for at most `ms`. */
  async function until(check: () => boolean, ms: number) {
    const start = performance.now();
    while (!check()) {
      if (performance.now() - start > ms) throw new Error("Timed out");
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
  }

  /**
   * The `play` of the find bar, the appended terminal line and the stop control,
   * by the same events on the rendered controls: the field is focused and keyed,
   * the line button is pressed, the stop button is pressed and its force stop
   * is awaited.
   */
  async function playScenario(id: string) {
    await tick();
    const root = document.getElementById("story-root");
    if (!root) throw new Error("No story root");
    if (id.startsWith("patterns-findbar--")) {
      const field = root.querySelector<HTMLInputElement>('input[aria-label="Find"]');
      if (!field) throw new Error("No find field");
      field.focus();
      field.click();
      if (id === "patterns-findbar--matches") {
        keyOn(field, { key: "Enter" });
        await tick();
        keyOn(field, { key: "Enter", shiftKey: true });
        await tick();
        keyOn(field, { key: "Escape" });
      } else {
        field.value = "format";
        field.dispatchEvent(new Event("input", { bubbles: true }));
        await tick();
        keyOn(field, { key: "Enter", altKey: true });
      }
      await tick();
    } else if (id === "patterns-terminalblock--memoised-lines") {
      const append = [...root.querySelectorAll<HTMLButtonElement>("button")].find(
        (button) => button.textContent?.trim() === "Append a line",
      );
      if (!append) throw new Error("No append control");
      append.click();
      await tick();
    } else if (id === "patterns-terminalstopcontrol--ready") {
      const stop = root.querySelector<HTMLButtonElement>("button");
      if (!stop) throw new Error("No stop control");
      stop.click();
      await tick();
      await until(() => root.querySelector<HTMLButtonElement>('button[aria-label="Force stop process"]:not([disabled])') !== null, 3000);
    }
  }

  $effect(() => {
    if (!PLAYED.has(story)) return;
    void playScenario(story);
  });

  // ── Command suggestions ─────────────────────────────────────────────────
  let anchorEl = $state<HTMLDivElement | null>(null);

  // ── Editor frame ────────────────────────────────────────────────────────
  let rendered = $state(false);
  const framePath = $derived(
    variant === "long-path"
      ? "src/features/editor/components/settings/a-very-deeply-nested-folder/file-surface-chrome-with-a-long-name.tsx"
      : variant === "phone"
        ? "src/features/editor/components/settings/file-surface-chrome.tsx"
        : "src/features/terminal/lib/format-duration.ts",
  );
  const frameDirty = $derived(["dirty", "disk-changed", "long-path", "phone"].includes(variant));

  // ── Terminal block ──────────────────────────────────────────────────────
  let memoLines = $state<TerminalLine[]>(
    Array.from({ length: 3 }, (_, i) => ({ id: i, segments: [{ text: `line ${i + 1}` }] })),
  );
  const prepareSegments = (segments: readonly TerminalSegment[]) => segments;
  const ANSI_LINES: TerminalLine[] = F.ANSI_LINES;
  const LONG_LINES: TerminalLine[] = F.LONG_LINES;
</script>

<!-- Snippets shared by several scenarios -->
{#snippet stopButton()}
  <TerminalStopControl active onInterrupt={noop} onForceStop={async () => true} onForceStopped={noop} />
{/snippet}

{#snippet terminalStatus()}
  <TerminalStatus cwd="/Users/me/atlas" branch="uzayermasud/atl-874" ahead={2} behind={1} dirty />
{/snippet}

{#snippet editTitle()}
  <input aria-label="Note title" value="Open question" placeholder="Untitled" class={CANVAS_FIELD_CLASS.noteTitle} />
{/snippet}

{#snippet editBody()}
  <textarea
    aria-label="Note body"
    placeholder="Write something…"
    class="{CANVAS_FIELD_CLASS.noteBody} flex-1">Do we show held edits in the header pill?</textarea>
{/snippet}

{#snippet bodyOf(n: F.BoardNode)}
  {#if n.kind === "note"}
    <CanvasNote title={n.title} body={n.body} />
  {:else if n.kind === "text"}
    <CanvasText text={n.text} />
  {:else if n.kind === "shape"}
    <CanvasShape shape={n.shape} label={n.label} />
  {:else if n.kind === "frame"}
    <CanvasFrame label={n.label} />
  {:else}
    <CanvasMedia state="ready" kind="image" src={F.IMAGE_SRC} alt="Mountains at dusk" />
  {/if}
{/snippet}

{#snippet backLinkHeader()}
  <a
    href="#chat"
    class="flex h-9 shrink-0 items-center gap-1.5 border-b border-border-subtle px-3 text-xs text-secondary-foreground transition-colors duration-fast hover:text-foreground"
  >
    <Icon icon={ArrowLeftIcon} size="sm" />
    Back to design-crit
  </a>
{/snippet}

{#snippet markdownNotice()}
  Large file (2.4 MB): shown read-only, without highlighting.
{/snippet}

{#snippet hiddenNotice()}
  earlier output hidden — showing the latest 400 lines (Copy gets more)
{/snippet}

{#snippet frameBreadcrumbs()}
  <EditorBreadcrumbs segments={crumbPath(framePath)} dirty={frameDirty} onSelect={noop} />
{/snippet}

{#snippet frameActions()}
  {#if variant === "disk-changed"}
    <Button
      variant="outline"
      size="xs"
      title="This file changed on disk. Reload discards your unsaved edits."
    >
      <Icon icon={RefreshCwIcon} size="xs" /> Disk changed · Reload
    </Button>
  {/if}
  <Hint label="Enable word wrap">
    <IconButton size="sm" icon={WrapTextIcon} label="Enable word wrap" aria-pressed={false} />
  </Hint>
{/snippet}

{#snippet frameFind()}
  {#if variant === "with-replace"}
    <FindBar
      query="ms"
      matchCount={5}
      matchIndex={1}
      onQueryChange={noop}
      onNext={noop}
      onPrevious={noop}
      onClose={noop}
      onToggle={toggleNoop}
      replace="millis"
      onReplaceChange={noop}
      replaceOpen
      onReplace={noop}
      onReplaceAll={noop}
    />
  {:else}
    <FindBar
      query="ms"
      matchCount={5}
      matchIndex={1}
      onQueryChange={noop}
      onNext={noop}
      onPrevious={noop}
      onClose={noop}
      onToggle={toggleNoop}
      onSelectAll={noop}
    />
  {/if}
{/snippet}

{#snippet frameStatus()}
  <EditorStatusBar line={3} column={14} language="TypeScript" eol="LF" indent="Spaces: 2" />
{/snippet}

{#snippet terminalBlockOf(v: string)}
  {#if v === "running"}
    <TerminalBlock command="bun run build" running exitCode={null} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
      {#snippet children()}<TerminalOutput text={BUILD_HEAD} />{/snippet}
    </TerminalBlock>
  {:else if v === "succeeded"}
    <TerminalBlock command="bun run build" running={false} exitCode={0} durationMs={4210} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
      {#snippet children()}<TerminalOutput text={F.BUILD} />{/snippet}
    </TerminalBlock>
  {:else if v === "failed"}
    <TerminalBlock command="bun run test" running={false} exitCode={1} durationMs={72000} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
      {#snippet children()}<TerminalOutput lines={F.STYLED_RUNS} />{/snippet}
    </TerminalBlock>
  {:else if v === "collapsed"}
    <TerminalBlock command="bun run build" running={false} exitCode={0} durationMs={4210} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop} defaultCollapsed>
      {#snippet children()}<TerminalOutput text={F.BUILD} />{/snippet}
    </TerminalBlock>
  {:else if v === "no-header"}
    <TerminalBlock command="" running={false} exitCode={0} durationMs={4210} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
      {#snippet children()}<TerminalOutput text="Last login: Tue Nov  4 09:12:44 on ttys004" />{/snippet}
    </TerminalBlock>
  {:else if v === "ansi-colours"}
    <TerminalBlock command="colortest" running={false} exitCode={0} durationMs={4210} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
      {#snippet children()}<TerminalOutput lines={ANSI_LINES} />{/snippet}
    </TerminalBlock>
  {:else if v === "hidden-lines"}
    <TerminalBlock command="bun run build" running={false} exitCode={0} durationMs={4210} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}
      notice={hiddenNotice}>
      {#snippet children()}<TerminalOutput text={F.BUILD} />{/snippet}
    </TerminalBlock>
  {:else if v === "large-output-badge"}
    <TerminalBlock command="yes" running exitCode={null} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
      {#snippet badges()}
        <Badge variant="warning" size="sm" title="Large output — live view is throttled to keep the UI responsive">large output · throttled</Badge>
      {/snippet}
      {#snippet children()}<TerminalOutput text={F.BUILD} />{/snippet}
    </TerminalBlock>
  {:else if v === "password-prompt"}
    <TerminalBlock command="sudo bun install -g @tryatlas/cli" running exitCode={null} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
      {#snippet children()}<TerminalOutput text="Password:" />{/snippet}
      {#snippet footer()}
        <div class="flex items-center gap-2 border-t border-border-subtle bg-background px-3 py-2">
          <Icon icon={LockIcon} size="sm" class="text-primary" />
          <input
            type="password"
            aria-label="Password"
            placeholder="Enter password, then press Enter…"
            class="min-w-0 flex-1 bg-transparent font-mono text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      {/snippet}
    </TerminalBlock>
  {:else if v === "long-output"}
    <TerminalBlock command="find packages -name '*.ts'" running={false} exitCode={0} durationMs={4210} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
      {#snippet children()}<TerminalOutput lines={LONG_LINES} />{/snippet}
    </TerminalBlock>
  {:else if v === "from-tool-call"}
    <TerminalBlock command="git log --oneline -3" running={false} exitCode={0} durationMs={120} cwd="/workspace/atlas" onCopy={noop}>
      {#snippet children()}<TerminalOutput text={"4066b885 code-surface: the terminal block\n2ade8a94 skills: the slash picker\nd66b6541 usage: the monthly meter"} />{/snippet}
    </TerminalBlock>
  {:else if v === "styled-runs"}
    <TerminalBlock command="bun run test" running={false} exitCode={1} durationMs={4210} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
      {#snippet children()}<TerminalOutput lines={F.STYLED_RUNS} />{/snippet}
    </TerminalBlock>
  {:else if v === "links"}
    <TerminalBlock command="bun run dev" running exitCode={null} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
      {#snippet children()}<TerminalOutput lines={F.LINKED} onLinkActivate={noop} />{/snippet}
    </TerminalBlock>
  {:else if v === "search-highlight"}
    <TerminalBlock command="bun run build" running={false} exitCode={0} durationMs={4210} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop} commandHighlight="dist">
      {#snippet children()}<TerminalOutput text={F.BUILD} highlight="dist" />{/snippet}
    </TerminalBlock>
  {:else if v === "inverse"}
    <TerminalBlock command="vim README.md" running={false} exitCode={0} durationMs={4210} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
      {#snippet children()}<TerminalOutput lines={F.INVERSE} />{/snippet}
    </TerminalBlock>
  {:else if v === "command-highlight"}
    <TerminalBlock command="git status --short" running={false} exitCode={0} durationMs={4210} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop} commandHighlight="status">
      {#snippet children()}<TerminalOutput text={F.BUILD} />{/snippet}
    </TerminalBlock>
  {/if}
{/snippet}

<!-- The scenarios -->
{#if demo === "action-pill" && apill}
  <div class="h-48">
    <CanvasSurface class="rounded-lg border border-border">
      <CanvasActionPill
        peers={apill.peers}
        self={apill.self ? F.SELF : undefined}
        {following}
        onFollow={apill.follow ? (id) => (following = id) : undefined}
        followers={apill.followers}
        external={apill.external ? { label: "Open in new tab", onOpen: noop } : undefined}
        exportFormats={apill.exportable ? CANVAS_EXPORT_FORMATS : undefined}
        onExport={apill.exportable ? noop : undefined}
        exporting={apill.exporting}
        exportLabel={apill.exportLabel}
      />
    </CanvasSurface>
  </div>
{:else if demo === "chrome"}
  <div class="h-80">
    <CanvasSurface class="rounded-lg border border-border">
      <CanvasPill corner="top-left">
        <CanvasPillButton
          icon={PanelLeftIcon}
          label={chromeOpen ? "Hide pages" : "Show pages"}
          pressed={chromeOpen}
          onClick={() => (chromeOpen = !chromeOpen)}
        />
        <CanvasPillDivider />
        <CanvasPillButton icon={CrosshairIcon} label="Fit to view" shortcut="⇧1" onClick={noop} />
      </CanvasPill>
      <CanvasPill corner="top-right">
        <CanvasPillButton icon={UploadIcon} label="Upload" disabled />
      </CanvasPill>
      <CanvasPill corner="bottom-left" class="px-2 text-xs text-secondary-foreground">bottom-left</CanvasPill>
      <CanvasPill corner="bottom-right" class="px-2 text-xs text-secondary-foreground">bottom-right</CanvasPill>
      <CanvasDraftBox bounds={{ x: 120, y: 90, w: 220, h: 110 }} />
      <CanvasStatusChip role="status">
        <Spinner size="sm" label="" />Uploading media…
      </CanvasStatusChip>
    </CanvasSurface>
  </div>
{:else if demo === "header"}
  <div class="h-48">
    <CanvasSurface class="rounded-lg border border-border">
      <CanvasHeaderPill
        pageName={headerName}
        pageIcon={hcfg.pageIcon}
        pages={hcfg.noPages ? [] : headerSwitcher ? F.SWITCHER_PAGES : undefined}
        activePageId={headerPage}
        onOpenPage={(id) => (headerPage = id)}
        status={headerStatus}
        statusLabel={headerStatus ? STATUS_LABEL[headerStatus] : undefined}
        offlineTone={hcfg.offlineTone}
        {pagesOpen}
        onTogglePages={() => (pagesOpen = !pagesOpen)}
        zoom={scale}
        onZoomIn={() => (scale = (scale ?? 1) * 1.2)}
        onZoomOut={() => (scale = (scale ?? 1) / 1.2)}
        onZoomReset={() => (scale = 1)}
        onFit={noop}
        fullscreen={full}
        onToggleFullscreen={full === undefined ? undefined : () => (full = !full)}
      />
    </CanvasSurface>
  </div>
{:else if demo === "minimap"}
  <div class="h-48">
    <CanvasSurface class="rounded-lg border border-border">
      <CanvasMinimap nodes={variant === "empty" ? [] : F.BOARD_BOUNDS} viewport={{ x: 0, y: 40, w: 720, h: 420 }} onNavigate={noop} />
    </CanvasSurface>
  </div>
{:else if demo === "toolbar"}
  <div class="h-112">
    <CanvasSurface class="rounded-lg border border-border">
      <CanvasToolbar
        groups={toolGroups}
        activeTool={toolTool}
        onTool={(id) => (toolTool = id)}
        onAction={noop}
        history={{ canUndo: tcfg.canUndo ?? true, canRedo: tcfg.canRedo ?? false, onUndo: noop, onRedo: noop }}
        dock={toolDock}
        onDock={(tcfg.movable ?? true) ? (d) => (toolDock = d) : undefined}
        disabled={tcfg.disabled ?? false}
      />
    </CanvasSurface>
  </div>
{:else if demo === "presence"}
  <div class="h-64">
    <CanvasSurface class="rounded-lg border border-border">
      <PresenceLayer>
        {#if variant === "long-name"}
          <PresenceCursor name={F.LONG_NAME} hue="purple" style="transform: translate3d(48px, 64px, 0)" />
        {:else}
          {#each F.PRESENCE_HUES as hue, i (hue)}
            <PresenceCursor
              name={F.PRESENCE_NAMES[i]!}
              {hue}
              style="transform: translate3d({32 + (i % 4) * 150}px, {40 + Math.floor(i / 4) * 96}px, 0)"
            />
          {/each}
        {/if}
      </PresenceLayer>
    </CanvasSurface>
  </div>
{:else if demo === "pages-panel"}
  <div class="h-112 overflow-hidden rounded-lg border border-border">
    <CanvasPagesPanel
      rows={panelVisible}
      activeId={panelActive}
      collapsedIds={panelCollapsed}
      onToggleFolder={(id) => {
        const next = new Set(panelCollapsed);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        panelCollapsed = next;
      }}
      onOpen={(id) => (panelActive = id)}
      onCreate={noop}
      allowFolders={pcfg.folders ?? false}
      onRename={(id, name) => (panelRows = panelRows.map((r) => (r.id === id ? { ...r, name } : r)))}
      onDelete={(id) => (panelRows = panelRows.filter((r) => r.id !== id))}
      onIconClick={pcfg.icons ? noop : undefined}
      dropIndicator={pcfg.dropIndicator}
      header={pcfg.backLink ? backLinkHeader : undefined}
      rowActions={pcfg.newPageInside
        ? (row) => (row.kind === "folder" ? [{ id: "new-inside", label: "New page inside", icon: FilePlus2Icon, onSelect: noop }] : [])
        : undefined}
      deleteMode={pcfg.deleteMode ?? "hover"}
      lastPageLabel={pcfg.lastPageLabel}
    />
  </div>
{:else if demo === "board"}
  <!-- Storybook draws this story fullscreen; the gallery's story body is padded by 1rem, so the board takes the padding back. -->
  {#if boardLocal}
    <div class="-m-4 flex h-[720px]">
      {#if localPagesOpen}
        <CanvasPagesPanel
          rows={F.LOCAL_PAGE_ROWS}
          activeId={localActive}
          onOpen={(id) => (localActive = id)}
          onCreate={noop}
          onRename={noop}
          onDelete={noop}
          onIconClick={noop}
        />
      {/if}
      <div class="min-w-0 flex-1">
        <CanvasSurface>
          {#each F.BOARD.filter((n) => n.kind !== "frame" && n.id !== "s-triangle") as n (n.id)}
            <CanvasNodeFrame kind={n.kind} bounds={n.bounds}>
              {@render bodyOf(n)}
            </CanvasNodeFrame>
          {/each}
          <CanvasHeaderPill
            pageName={localPage.name}
            pageIcon={localPage.icon}
            pagesOpen={localPagesOpen}
            onTogglePages={() => (localPagesOpen = !localPagesOpen)}
            onFit={noop}
            fullscreen={false}
            onToggleFullscreen={noop}
          />
          <CanvasActionPill exportFormats={CANVAS_EXPORT_FORMATS} onExport={noop} />
          <CanvasToolbar
            groups={LOCAL_CANVAS_TOOL_GROUPS}
            activeTool={localTool}
            onTool={(id) => (localTool = id)}
            onAction={noop}
            history={{ canUndo: true, canRedo: true, onUndo: noop, onRedo: noop }}
            dock="left"
          />
        </CanvasSurface>
      </div>
    </div>
  {:else}
    <div class="-m-4 h-[720px]">
      <CanvasSurface>
        {#if !boardEmpty}
          {#each F.BOARD as n (n.id)}
            <CanvasNodeFrame
              kind={n.kind}
              bounds={n.bounds}
              selected={n.id === "note-2"}
              claimedBy={n.id === "s-diamond" ? { hue: F.PEERS[1]!.hue, name: F.PEERS[1]!.name } : undefined}
              onAnchorPointerDown={noop}
              onResizePointerDown={noop}
            >
              {@render bodyOf(n)}
            </CanvasNodeFrame>
          {/each}
          <PresenceLayer>
            <PresenceCursor name={F.PEERS[0]!.name} hue={F.PEERS[0]!.hue} style="transform: translate3d(300px, 330px, 0)" />
            <PresenceCursor name={F.PEERS[1]!.name} hue={F.PEERS[1]!.hue} style="transform: translate3d(930px, 260px, 0)" />
          </PresenceLayer>
        {/if}
        <CanvasHeaderPill
          pageName={F.SWITCHER_PAGES[0]!.name}
          pages={F.SWITCHER_PAGES}
          activePageId={F.SWITCHER_PAGES[0]!.id}
          onOpenPage={noop}
          status="live"
          statusLabel="Live in design-crit — every change is shared"
          pagesOpen={boardPagesOpen}
          onTogglePages={() => (boardPagesOpen = !boardPagesOpen)}
          zoom={1}
          onZoomIn={noop}
          onZoomOut={noop}
          onZoomReset={noop}
          onFit={noop}
        />
        <CanvasActionPill
          peers={boardEmpty ? [] : F.PEERS.slice(0, 2)}
          self={F.SELF}
          following={boardFollowing}
          onFollow={(id) => (boardFollowing = id)}
          external={{ label: "Open in new tab", onOpen: noop }}
          exportFormats={CANVAS_EXPORT_FORMATS}
          onExport={noop}
        />
        <CanvasToolbar
          groups={SPACES_TOOL_GROUPS}
          activeTool={boardTool}
          onTool={(id) => (boardTool = id)}
          onAction={noop}
          history={{ canUndo: !boardEmpty, canRedo: false, onUndo: noop, onRedo: noop }}
          dock={boardDock}
          onDock={(d) => (boardDock = d)}
        />
        {#if boardEmpty}
          <CanvasStatusChip role="status">Click a tool, then the canvas</CanvasStatusChip>
        {:else}
          <CanvasMinimap nodes={F.BOARD_BOUNDS} viewport={{ x: 0, y: 0, w: 1100, h: 640 }} />
        {/if}
      </CanvasSurface>
    </div>
  {/if}
{:else if demo === "nodes"}
  {#if variant === "note"}
    <div class="h-72"><CanvasSurface class="rounded-lg border border-border">
      <CanvasNodeFrame kind="note" bounds={{ x: 48, y: 40, w: 280, h: 200 }}>
        <CanvasNote title="Offline edits" meta="Edited 5m ago" body={F.LONG_BODY} />
      </CanvasNodeFrame>
    </CanvasSurface></div>
  {:else if variant === "note-empty"}
    <div class="h-72"><CanvasSurface class="rounded-lg border border-border">
      <CanvasNodeFrame kind="note" bounds={{ x: 48, y: 40, w: 280, h: 140 }}>
        <CanvasNote title="" icon="💡" empty />
      </CanvasNodeFrame>
    </CanvasSurface></div>
  {:else if variant === "note-selected"}
    <div class="h-72"><CanvasSurface class="rounded-lg border border-border">
      <CanvasNodeFrame kind="note" bounds={{ x: 48, y: 40, w: 280, h: 200 }} selected onAnchorPointerDown={noop} onResizePointerDown={noop}>
        <CanvasNote title="Open question" body="Do we show held edits in the header pill?" />
      </CanvasNodeFrame>
    </CanvasSurface></div>
  {:else if variant === "note-claimed"}
    <div class="h-72"><CanvasSurface class="rounded-lg border border-border">
      <CanvasNodeFrame kind="note" bounds={{ x: 48, y: 40, w: 280, h: 200 }} claimedBy={{ hue: "blue", name: "Ana Ruiz" }}>
        <CanvasNote title="Open question" body="Do we show held edits in the header pill?" />
      </CanvasNodeFrame>
    </CanvasSurface></div>
  {:else if variant === "note-editing"}
    <div class="h-72"><CanvasSurface class="rounded-lg border border-border">
      <CanvasNodeFrame kind="note" bounds={{ x: 48, y: 40, w: 280, h: 200 }} selected>
        <CanvasNote title={editTitle} body={editBody} />
      </CanvasNodeFrame>
    </CanvasSurface></div>
  {:else if variant === "text"}
    <div class="h-40"><CanvasSurface class="rounded-lg border border-border">
      <CanvasNodeFrame kind="text" bounds={{ x: 48, y: 48, w: 260, h: 40 }} selected>
        <CanvasText text="Ship by Friday" />
      </CanvasNodeFrame>
    </CanvasSurface></div>
  {:else if variant === "shapes"}
    <div class="h-48"><CanvasSurface class="rounded-lg border border-border">
      {#each SHAPES as shape, i (shape)}
        <CanvasNodeFrame kind="shape" selected={i === SHAPES.length - 1} bounds={{ x: 32 + i * 148, y: 48, w: 120, h: 88 }}>
          <CanvasShape {shape} label={shape === "triangle" ? "" : shape} />
        </CanvasNodeFrame>
      {/each}
    </CanvasSurface></div>
  {:else if variant === "frame"}
    <div class="h-72"><CanvasSurface class="rounded-lg border border-border">
      <CanvasNodeFrame kind="frame" bounds={{ x: 48, y: 56, w: 360, h: 180 }}>
        <CanvasFrame label="Sync design" />
      </CanvasNodeFrame>
    </CanvasSurface></div>
  {:else if variant.startsWith("media")}
    <div class="h-56"><CanvasSurface class="rounded-lg border border-border">
      <CanvasNodeFrame kind="media" bounds={{ x: 48, y: 40, w: 240, h: 150 }}>
        {#if variant === "media-loading"}
          <CanvasMedia state="loading" kind="image" alt="Whiteboard photo" />
        {:else if variant === "media-loading-labelled"}
          <CanvasMedia state="loading" kind="image" alt="Whiteboard photo" loadingLabel="Loading image…" />
        {:else if variant === "media-error"}
          <CanvasMedia state="error" kind="image" alt="Whiteboard photo" />
        {:else}
          <CanvasMedia state="ready" kind="image" src={F.IMAGE_SRC} alt="Mountains at dusk" />
        {/if}
      </CanvasNodeFrame>
    </CanvasSurface></div>
  {:else if variant === "selected-with-anchors"}
    <div class="h-56"><CanvasSurface class="rounded-lg border border-border">
      <CanvasNodeFrame kind="shape" bounds={{ x: 80, y: 48, w: 160, h: 100 }} selected onAnchorPointerDown={noop} onResizePointerDown={noop}>
        <CanvasShape shape="rounded" label="Relay" />
      </CanvasNodeFrame>
    </CanvasSurface></div>
  {/if}
{:else if demo === "command-input"}
  <div bind:this={cmdWrap} class="max-w-2xl overflow-visible rounded-md border border-border pt-48">
    {#if ccfg.narrow}
      <div class="w-72">
        <TerminalCommandInput value={cmdValue} onValueChange={(v) => (cmdValue = v)} busy status={terminalStatus} stopControl={stopButton} />
      </div>
    {:else}
      <TerminalCommandInput
        value={cmdValue}
        onValueChange={(v) => {
          cmdValue = v;
          cmdOpen = true;
        }}
        busy={ccfg.busy ?? false}
        rawMode={ccfg.raw ?? false}
        status={ccfg.status ? terminalStatus : undefined}
        stopControl={ccfg.stop ? stopButton : undefined}
        onKeyDown={ccfg.suggestions
          ? (e) => {
              if (e.key !== "Tab") return;
              e.preventDefault();
              cmdActive = (cmdActive + (e.shiftKey ? SUGGEST_ITEMS_CMD.length - 1 : 1)) % SUGGEST_ITEMS_CMD.length;
            }
          : undefined}
        suggestions={ccfg.suggestions
          ? {
              id: "terminal-suggestions",
              open: cmdOpen,
              items: SUGGEST_ITEMS_CMD,
              activeIndex: cmdActive,
              onSelect: (item) => {
                cmdValue = `cd ${item.name}${item.kind === "dir" ? "/" : ""}`;
                cmdOpen = false;
              },
              onOpenChange: (open) => (cmdOpen = open),
            }
          : undefined}
      />
    {/if}
  </div>
{:else if demo === "command-suggestions"}
  <div class="pt-40">
    <div
      bind:this={anchorEl}
      class="flex h-control-md w-96 items-center rounded-sm border border-border px-2 font-mono text-base text-foreground"
    >
      cd s
    </div>
    <CommandSuggestions id="suggestions" open items={SUGGEST_ITEMS} activeIndex={1} anchor={anchorEl} onSelect={noop} onOpenChange={noop} />
  </div>
{:else if demo === "breadcrumbs"}
  <div class="flex h-control-lg max-w-md items-center border-b border-border px-3">
    {#if variant === "short"}
      <EditorBreadcrumbs segments={crumbPath("src/lib/time-ago.ts")} />
    {:else if variant === "collapsed"}
      <EditorBreadcrumbs segments={crumbPath("src/features/editor/components/settings/file-surface-chrome.tsx")} dirty />
    {:else}
      <EditorBreadcrumbs segments={crumbPath("src/features/editor/lib/file-path.ts")} onSelect={noop} />
    {/if}
  </div>
{:else if demo === "status-bar"}
  <div class="max-w-xl overflow-hidden rounded-md border border-border">
    {#if variant === "selection"}
      <EditorStatusBar line={12} column={4} selected={42} language="TypeScript" eol="LF" indent="Spaces: 2" />
    {:else if variant === "clickable"}
      <EditorStatusBar line={12} column={4} language="TypeScript" eol="LF" indent="Spaces: 2" onPositionClick={noop} onLanguageClick={noop} />
    {:else}
      <EditorStatusBar line={12} column={4} language="TypeScript" eol="LF" indent="Spaces: 2" />
    {/if}
  </div>
{:else if demo === "editor-preview"}
  <div class="max-w-xl overflow-hidden rounded-md border border-border">
    {#if variant === "all-syntax-roles"}
      <EditorPreview lines={ROLES.map((role) => ({ tokens: [{ text: `syntax.${role}`, role }] }))} />
    {:else if variant === "gutter"}
      <EditorPreview startLine={41} activeLine={43} lines={[...F.SAMPLE.slice(0, 5), { ...F.SAMPLE[5]!, fold: "closed" }]} />
    {:else}
      <EditorPreview activeLine={3} lines={EDITOR_SELECTION} />
    {/if}
  </div>
{:else if demo === "editor-frame"}
  <div class="h-80 max-w-2xl overflow-hidden rounded-md border border-border">
    {#if variant === "markdown-toggle"}
      <EditorFrame notice={markdownNotice}>
        {#snippet breadcrumbs()}
          <EditorBreadcrumbs segments={crumbPath("docs/adr/0027-one-design-package.md")} onSelect={noop} />
        {/snippet}
        {#snippet actions()}
          <Hint label={rendered ? "Show source" : "Show preview"}>
            <IconButton
              size="sm"
              icon={rendered ? CodeIcon : EyeIcon}
              label={rendered ? "Show source" : "Show preview"}
              aria-pressed={rendered}
              onclick={() => (rendered = !rendered)}
            />
          </Hint>
        {/snippet}
        {#if rendered}
          <div class="prose-session overflow-auto px-6 py-5 text-sm">
            <h1>One design package</h1>
            <p>Desktop is the source of truth.</p>
          </div>
        {:else}
          <EditorPreview
            lines={[{ tokens: [{ text: "# One design package", role: "function" }] }, { tokens: [] }, { tokens: [{ text: "Desktop is the source of truth." }] }]}
          />
        {/if}
      </EditorFrame>
    {:else}
      <EditorFrame
        breadcrumbs={frameBreadcrumbs}
        actions={frameActions}
        findBar={variant === "with-find" || variant === "with-replace" || variant === "phone" ? frameFind : undefined}
        statusBar={frameStatus}
      >
        <EditorPreview lines={F.SAMPLE} startLine={1} activeLine={3} class="h-full" />
      </EditorFrame>
    {/if}
  </div>
{:else if demo === "find-bar"}
  <div class="flex max-w-xl justify-end">
    <FindBar
      query={findQuery}
      onQueryChange={(q) => {
        findQuery = q;
        findIndex = 0;
      }}
      matchIndex={findMatchIndex}
      matchCount={findMatchCount}
      invalid={fcfg.invalid ?? false}
      onToggle={fcfg.onToggle ? toggleNoop : undefined}
      replace={findReplace}
      onReplaceChange={fcfg.replace ? (r) => (findReplace = r) : undefined}
      replaceOpen={findReplaceOpen}
      onReplaceOpenChange={(open) => (findReplaceOpen = open)}
      onReplace={noop}
      onReplaceAll={noop}
      onNext={() => (findIndex = (findIndex + 1) % Math.max(findCount, 1))}
      onPrevious={() => (findIndex = (findIndex - 1 + findCount) % Math.max(findCount, 1))}
      onClose={noop}
      onSelectAll={fcfg.selectAll ? noop : undefined}
      placeholder={fcfg.placeholder ?? "Find"}
    />
  </div>
{:else if demo === "terminal-block"}
  <div class="flex max-w-2xl flex-col gap-2">
    {#if variant === "session"}
      <TerminalBlock command="" running={false}>
        {#snippet children()}<TerminalOutput text="Last login: Tue Nov  4 09:12:44 on ttys004" />{/snippet}
      </TerminalBlock>
      <TerminalBlock command="git status --short" running={false} exitCode={0} durationMs={84} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
        {#snippet children()}<TerminalOutput text={" M src/index.ts\n?? src/components/code-surface/"} />{/snippet}
      </TerminalBlock>
      <TerminalBlock command="bun run test" running={false} exitCode={1} durationMs={9950} cwd="/Users/me/atlas" onCopy={noop} onRerun={noop}>
        {#snippet children()}<TerminalOutput lines={F.STYLED_RUNS} />{/snippet}
      </TerminalBlock>
      <TerminalBlock command="bun run dev" running cwd="/Users/me/atlas" onCopy={noop}>
        {#snippet children()}<TerminalOutput lines={F.LINKED} onLinkActivate={noop} />{/snippet}
      </TerminalBlock>
    {:else if variant === "memoised-lines"}
      <TerminalBlock command="tail -f build.log" running onCopy={noop}>
        {#snippet children()}
          <TerminalOutput lines={memoLines} {prepareSegments} />
          <div class="border-t border-border-subtle px-3 py-2">
            <Button
              size="xs"
              variant="outline"
              onclick={() => (memoLines = [...memoLines, { id: memoLines.length, segments: [{ text: `line ${memoLines.length + 1}` }] }])}
            >
              Append a line
            </Button>
          </div>
        {/snippet}
      </TerminalBlock>
    {:else}
      {@render terminalBlockOf(variant)}
    {/if}
  </div>
{:else if demo === "palette"}
  <div class="max-w-2xl">
    <TerminalPalette />
  </div>
{:else if demo === "stop"}
  <TerminalStopControl active onInterrupt={noop} onForceStop={async () => true} onForceStopped={noop} />
{/if}
