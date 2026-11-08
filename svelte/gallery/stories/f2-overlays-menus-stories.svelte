<script lang="ts">
  import { untrack } from "svelte";
  import { Folder, Palette } from "lucide-svelte";
  import { createListHighlight } from "../../src/lots/f2-overlays-menus/list-highlight.svelte";
  import {
    filterCommandGroups,
    optionId,
    selectableIds,
    type CommandPaletteGroup,
    type CommandPaletteItem,
  } from "../../src/lots/f2-overlays-menus/command-list";
  import CommandPalette from "../../src/lots/f2-overlays-menus/command-palette.svelte";
  import CommandPaletteView from "../../src/lots/f2-overlays-menus/command-palette-view.svelte";
  import CommandList from "../../src/lots/f2-overlays-menus/command-list-rows.svelte";
  import CommandHints from "../../src/lots/f2-overlays-menus/command-hints.svelte";
  import CommandRow from "../../src/lots/f2-overlays-menus/command-row.svelte";
  import SearchOverlay from "../../src/lots/f2-overlays-menus/search-overlay.svelte";
  import HintOverlay from "../../src/lots/f2-overlays-menus/hint-overlay.svelte";
  import CommandMenu, { type CommandAction } from "../../src/lots/f2-overlays-menus/command-menu.svelte";
  import { useCommandMenu } from "../../src/lots/f2-overlays-menus/use-command-menu.svelte";
  import LinkProvider from "../../src/lots/f2-overlays-menus/deps/link-provider.svelte";
  import BrainGlyph from "../../src/lots/f2-overlays-menus/deps/brain-glyph.svelte";
  import BookOpenGlyph from "../../src/lots/f2-overlays-menus/deps/book-open-glyph.svelte";
  import SearchResultRow from "../../src/lots/f2-overlays-menus/search-result-row.svelte";
  import type { SearchResult, SearchStatus } from "../../src/lots/f2-overlays-menus/search-overlay-types";
  import {
    Archive,
    Brain,
    BrainCircuit,
    Code,
    Copy,
    Cpu,
    FileCode,
    FilePlus,
    User,
    Gauge,
    Globe,
    Inbox,
    MessagesSquare,
    Sparkles,
    Users,
    Map as MapIcon,
    Network,
    ScrollText,
    Terminal,
    FileText,
    MessageSquare,
    Plus,
    Settings,
    MoreHorizontal,
    Pencil,
    Pin,
    RefreshCw,
    Trash2,
    Bold,
    Italic,
    Underline,
  } from "lucide-svelte";
  import {
    ColorHueSlider,
    ColorSaturationValuePlane,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
    Select,
    Switch,
    type SelectOption,
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
    AlertDialogTrigger,
    CommandDialog,
    CommandDialogPopup,
    CommandDialogTrigger,
    CommandEmpty,
    CommandFooter,
    CommandFooterHint,
    CommandGroupLabel,
    CommandInput,
    CommandItem,
    CommandItemIcon,
    CommandPanel,
    CommandShortcut,
    CommandSubmenuChevron,
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    menuContentVariants,
    menuItemVariants,
    menuLabelVariants,
    menuShortcutVariants,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../../src/lots/f2-overlays-menus/index";
  import Button from "../../src/ui/button.svelte";
  import Kbd from "../../src/ui/kbd.svelte";
  import IconButton from "../../src/ui/icon-button.svelte";
  import Icon from "../../src/ui/icon.svelte";
  import Input from "../../src/ui/input.svelte";
  import Hint from "../../src/lots/f2-overlays-menus/tooltip-hint.svelte";
  import { hsvToHex, type HsvColor } from "../../src/theme/color";

  interface Props {
    story?: string;
  }

  let { story = "color-picker-default" }: Props = $props();

  // Each colour picker story owns its colour, as the source's `Picker` does.
  let pickerDefault = $state<HsvColor>({ h: 210, s: 0.6, v: 0.9 });
  let pickerRed = $state<HsvColor>({ h: 0, s: 0.8, v: 0.9 });
  let pickerBlack = $state<HsvColor>({ h: 0, s: 0, v: 0 });
  let hueAlone = $state(120);

  interface PopoverDemo {
    defaultOpen?: boolean;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    arrow?: boolean;
    surface?: "default" | "tinted" | "glass";
    backdrop?: boolean;
    body?: string;
  }

  const POPOVER_LONG_TEXT =
    "Atlas tells you when a run is waiting for approval, when a long build finishes, when a teammate mentions you in a shared session, and when a scheduled task fails. Each of these can be turned off on its own in Settings.";


  // The palette's rows, as data: a row with groups is a submenu. Icons are snippets.
  const PAL_NOOP = () => {};
  const PAL_NOOP_OPEN = (_result: SearchResult) => {};
  const PAL_THEMES = ["Atlas", "Dracula", "Nord", "Solarized", "Gruvbox", "One Dark"];
  const PAL_PROJECTS = ["atlas", "design", "server", "docs"];
  const PAL_ACTIONS: CommandPaletteGroup[] = [
    {
      id: "actions",
      label: "Actions",
      items: [
        { id: "new", label: "New session", icon: iPlus, shortcut: "⌘N", onSelect: PAL_NOOP },
        { id: "file", label: "Go to file", icon: iFile, shortcut: "⌘P", onSelect: PAL_NOOP },
        {
          id: "theme",
          label: "Change theme…",
          icon: iPalette,
          groups: [
            {
              id: "themes",
              label: "Themes",
              items: PAL_THEMES.map((t) => ({ id: `theme-${t}`, label: t, onSelect: PAL_NOOP })),
            },
          ],
          placeholder: "Search themes…",
        },
        {
          id: "project",
          label: "Switch project…",
          icon: iFolder,
          groups: [
            {
              id: "projects",
              label: "Projects",
              items: PAL_PROJECTS.map((p) => ({
                id: `project-${p}`,
                label: p,
                icon: iFolder,
                groups: [
                  {
                    id: `${p}-actions`,
                    items: [
                      { id: `${p}-open`, label: "Open", onSelect: PAL_NOOP },
                      { id: `${p}-reveal`, label: "Reveal in Finder", onSelect: PAL_NOOP },
                    ],
                  },
                ],
              })),
            },
          ],
        },
        { id: "settings", label: "Settings", icon: iSettings, shortcut: "⌘,", onSelect: PAL_NOOP },
      ],
    },
    {
      id: "layout",
      label: "Layout",
      items: [
        { id: "split-right", label: "Split right", keywords: ["pane"], onSelect: PAL_NOOP },
        { id: "split-down", label: "Split down", keywords: ["pane"], onSelect: PAL_NOOP },
        { id: "split-close", label: "Close split", keywords: ["pane"], onSelect: PAL_NOOP },
        { id: "split-focus", label: "Focus next split", keywords: ["pane"], onSelect: PAL_NOOP },
      ],
    },
  ];
  const PAL_RECENT: CommandPaletteGroup = {
    id: "recent",
    label: "Recent Sessions",
    hideWhenSearching: true,
    items: [
      { id: "s1", label: "Refactor the settings panel", timestamp: "2h ago" },
      { id: "s2", label: "Fix the flaky terminal test", timestamp: "1d ago" },
      { id: "s3", label: "Port the session timeline", timestamp: "3d ago" },
    ].map((s) => ({ ...s, icon: iMessage, description: rowAtlas, onSelect: PAL_NOOP })),
  };
  const PAL_DISABLED: CommandPaletteGroup[] = [
    {
      id: "actions",
      label: "Actions",
      items: [
        { id: "new", label: "New session", icon: iPlus, onSelect: PAL_NOOP },
        { id: "push", label: "Push branch", disabled: true, onSelect: PAL_NOOP },
        { id: "pr", label: "Open pull request", disabled: true, onSelect: PAL_NOOP },
        { id: "settings", label: "Settings", icon: iSettings, onSelect: PAL_NOOP },
      ],
    },
  ];
  const PAL_LONG = "Approve every pending tool call in this session and continue without asking";
  const PAL_MANY: CommandPaletteGroup[] = Array.from({ length: 10 }, (_, g) => ({
    id: `g${g}`,
    label: `Group ${g + 1}`,
    items: Array.from({ length: 30 }, (_, i) => ({
      id: `g${g}-i${i}`,
      label: `Command ${g * 30 + i + 1}`,
      onSelect: PAL_NOOP,
    })),
  }));
  const PAL_MODULES: CommandPaletteGroup[] = [
    {
      id: "modules",
      items: [
        { id: "chat", label: "New Session", glyph: iMessage },
        { id: "canvas", label: "Spaces", glyph: iMap },
        { id: "terminal", label: "New Terminal", glyph: iTerminal },
        { id: "knowledge", label: "Knowledge", glyph: iBrain },
        { id: "knowledge-graph", label: "Knowledge Graph", glyph: iNetwork },
        { id: "memory", label: "Memory", glyph: iBrainCircuit },
        { id: "browser", label: "Browser", glyph: iGlobe },
        { id: "editor", label: "Untitled Editor", glyph: iCode },
        { id: "log", label: "Log", glyph: iScroll },
        { id: "usage", label: "Usage", glyph: iGauge },
      ].map(({ id, label, glyph }) => ({ id, label, keywords: [id], icon: glyph, onSelect: PAL_NOOP })),
    },
  ];
  const SELECT_MODELS: SelectOption<string>[] = [
    { value: "fast", label: "Fast", description: "Quick edits and questions" },
    { value: "balanced", label: "Balanced", description: "The default for most work" },
    { value: "deep", label: "Deep", description: "Long refactors and planning" },
  ];
  const SELECT_LONG: SelectOption<string>[] = [
    { value: "a", label: "A model name long enough to truncate in the trigger" },
    { value: "b", label: "Short" },
  ];

  function initialSelectValue(scenario: string): string | null {
    if (scenario === "select-placeholder" || scenario === "select-empty") return null;
    if (scenario === "select-long-text") return "a";
    return "balanced";
  }


  // Search overlay fixtures: grep-like hits in fixed files, and chat messages.
  const SR_LINES = [
    "export function splitHighlights(text: string, ranges: Range[]) {",
    "  const split = text.split(/\\s+/);",
    "// split the stack before the dialog closes",
    "  return split.length > 0 ? split : [text];",
  ];
  function srGrep(query: string, count = 12): SearchResult[] {
    const q = query.toLowerCase();
    return Array.from({ length: count }, (_, i) => {
      const text = SR_LINES[i % SR_LINES.length]!.trim();
      const at = text.toLowerCase().indexOf(q);
      const path =
        i === 3
          ? "src/features/command-palette/components/a-very-deeply-nested-folder/that-keeps-going/and-going/command-palette-content.tsx"
          : `src/components/patterns/file-${i + 1}.tsx`;
      return {
        id: `${path}:${i * 7 + 3}`,
        title: path,
        meta: `:${i * 7 + 3}`,
        detail: text,
        highlights: at < 0 || !q ? [] : [[at, at + q.length] as const],
        icon: srFile,
        mono: true,
      };
    });
  }
  const SR_MESSAGES = Array.from({ length: 40 }, (_, i) => ({
    id: `m${i}`,
    time: `${String(9 + Math.floor(i / 6)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
    text: [
      "Can you split the palette into a list and a dialog?",
      "Why does the highlight jump when the list scrolls?",
      "Run the tests again with the theme set to light",
      "Make the search overlay share the command shell",
    ][i % 4]!,
  }));
  type SrFixture = "files" | "none" | "error" | "pending" | "chat" | "many";
  function srAnswer(fixture: SrFixture, q: string): SearchResult[] {
    if (fixture === "files") return srGrep(q);
    if (fixture === "many") return srGrep(q, 200);
    if (fixture === "chat") {
      const needle = q.trim().toLowerCase();
      return SR_MESSAGES.filter((m) => m.text.toLowerCase().includes(needle))
        .slice(0, 200)
        .map((m) => {
          const at = m.text.toLowerCase().indexOf(needle);
          return {
            id: m.id,
            title: "You",
            meta: m.time,
            detail: m.text,
            highlights: needle ? [[at, at + needle.length] as const] : [],
            icon: srUser,
          };
        });
    }
    return [];
  }
  const SR_FIXTURE = $derived<SrFixture>(
    story === "search-chat" ? "chat" : story === "search-many" ? "many"
      : story === "search-no-results" ? "none" : story === "search-failed" ? "error"
      : story === "search-searching" ? "pending" : "files",
  );
  const SR_LIVE = $derived(story === "search-chat");
  const SR_RECENT = ["splitHighlights", "useListHighlight", "TODO(atlas)", "z-drag", "glass-hud"];
  let srOpen = $state(untrack(() => story !== "search-default"));
  let srQuery = $state("");
  let srStatus = $state<SearchStatus>("idle");
  let srResults = $state<SearchResult[]>([]);
  let srRecent = $state<string[]>(untrack(() => (story === "search-idle" ? [...SR_RECENT] : [])));
  const srShown = $derived(SR_LIVE ? srAnswer(SR_FIXTURE, srQuery) : srResults);
  function srSearch(q: string) {
    srStatus = "searching";
    if (SR_FIXTURE === "pending") return;
    void Promise.resolve().then(() => {
      if (SR_FIXTURE === "error") {
        srStatus = "error";
        return;
      }
      srResults = srAnswer(SR_FIXTURE, q);
      srStatus = "done";
      srRecent = [q, ...srRecent.filter((x) => x !== q)];
    });
  }

  // Hint overlay state: the region's counters, and the open overlay.
  let hintCounts = $state([0, 0, 0, 0, 0]);
  let hintOpen = $state(false);
  // Command menu: ⌘K binds the open state; defaultOpen opens it from an effect.
  const cm = useCommandMenu();
  const cmDefaultOpen = $derived(story !== "cmdmenu-default");
  $effect(() => {
    if (cmDefaultOpen) cm.setOpen(true);
  });

  let hintRoot = $state<HTMLDivElement | null>(null);
  const hintScrolled = $derived(story === "hint-scrolled");
  const PAL_NOOP_ACT = (_element: HTMLElement, _mode: "click" | "focus") => {};

  // Command menu fixtures: one workspace's actions, with a routed group.
  const CM_ACTIONS: CommandAction[] = [
    { id: "new", label: "New session", group: "Actions", icon: Sparkles, shortcut: "⌘N" },
    { id: "invite", label: "Invite people", group: "Actions", icon: Users },
    { id: "inbox", label: "Inbox", group: "Go to", icon: Inbox, to: "/inbox", shortcut: "G I" },
    { id: "sessions", label: "Sessions", group: "Go to", icon: MessagesSquare, to: "/sessions", shortcut: "G S" },
    { id: "memory", label: "Memory", group: "Go to", icon: BrainGlyph, to: "/memory" },
    { id: "settings", label: "Settings", group: "Go to", icon: Settings, to: "/settings", shortcut: "G ," },
    { id: "docs", label: "Read the docs", group: "Help", icon: BookOpenGlyph },
  ];
  const CM_MANY: CommandAction[] = [
    ...CM_ACTIONS,
    ...[
      "Refactor the settings panel",
      "Port the session timeline",
      "Fix flaky terminal resize test",
      "Theme import from VS Code",
      "Agent profile for Codex",
      "Dock sizes persist across screens",
      "Sidebar unread counts",
      "Command menu highlight scroll",
      "Org switcher submenu",
      "Interface scale presets",
      "Billing page copy",
      "Memory export to markdown",
    ].map((label, i) => ({
      id: `s${i}`,
      label,
      group: "Recent sessions",
      icon: MessagesSquare,
      to: `/sessions/${i}`,
    })),
  ];
  const CM_LONG: CommandAction[] = [
    {
      id: "long",
      label: "Approve every pending tool call in this session and continue the run without asking again",
      group: "Actions",
      shortcut: "⌘⇧↵",
    },
    ...CM_ACTIONS,
  ];
  const CM_NOOP = () => {};
  const cmActions = $derived(
    story === "cmdmenu-many-items" ? CM_MANY : story === "cmdmenu-long-text" ? CM_LONG : CM_ACTIONS,
  );
  // Palette state: one story per page, so one set of state serves each scenario.
  let palOpen = $state(untrack(() => story !== "palette-default"));
  let palQuery = $state("");
  let palText = $state("");
  const palGroups = $derived(
    story === "palette-with-recent"
      ? [...PAL_ACTIONS, PAL_RECENT]
      : story === "palette-disabled-items"
        ? PAL_DISABLED
        : story === "palette-loading"
          ? []
          : story === "palette-no-items"
            ? []
            : story === "palette-long-labels"
              ? [
                  {
                    id: "long",
                    label: "Actions",
                    items: [
                      { id: "l1", label: PAL_LONG, icon: iPlus, shortcut: "⌘⇧↵" },
                      { id: "l2", label: PAL_LONG, description: longDesc, icon: iMessage, timestamp: "2h" },
                    ],
                  },
                  ...PAL_ACTIONS,
                ]
              : story === "palette-many-items"
                ? PAL_MANY
                : story === "palette-new-tab"
                  ? PAL_MODULES
                  : PAL_ACTIONS,
  );
  const PAL_ROWS: Array<[CommandPaletteItem, boolean]> = [
    [{ id: "a", label: "Active, with a shortcut", icon: iPlus, shortcut: "⌘N" }, true],
    [{ id: "b", label: "A submenu", icon: iPalette, groups: [] }, false],
    [
      { id: "c", label: "Two lines", description: rowDesc, icon: iMessage, timestamp: "2h ago" },
      false,
    ],
    [{ id: "d", label: "Disabled", icon: iSettings, disabled: true }, false],
  ];
  const inlineQuery = $derived(palText.startsWith("/") ? palText.slice(1) : null);
  const inlineGroups = $derived(inlineQuery === null ? [] : filterCommandGroups(PAL_ACTIONS, inlineQuery));
  const inlineIds = $derived(selectableIds(inlineGroups));
  const inlineOpen = $derived(inlineQuery !== null && inlineIds.length > 0);
  const inlineHighlight = createListHighlight(
    () => inlineIds,
    () => inlineQuery,
  );
  let selectValue = $state<string | null>(untrack(() => initialSelectValue(story)));

  interface SheetDemo {
    defaultOpen?: boolean;
    side?: "top" | "right" | "bottom" | "left";
    title?: string;
    description?: string;
  }

  interface AlertDemo {
    defaultOpen?: boolean;
    title?: string;
    description?: string;
    action?: string;
    destructive?: boolean;
  }

  interface CommandDemo {
    defaultOpen?: boolean;
    query?: string;
    active?: number;
    empty?: boolean;
    disabledRow?: boolean;
  }

  const COMMAND_ROWS = [
    { icon: Plus, label: "New session", shortcut: "⌘N" },
    { icon: MessageSquare, label: "Open session…", submenu: true },
    { icon: FileText, label: "Open file…", shortcut: "⌘P" },
    { icon: Settings, label: "Settings", shortcut: "⌘,", submenu: false },
  ];
  const SLASH_ROWS = [
    { name: "compact", description: "Summarise the session so far and start fresh" },
    { name: "review", description: "Review the changes on this branch" },
    { name: "init", description: "Write an AGENTS.md for this project" },
    { name: "login", description: "Sign in to the agent's provider" },
  ];

  interface DropdownDemo {
    defaultOpen?: boolean;
    disabledItem?: boolean;
    longLabel?: boolean;
  }

  const SLASH = [
    { label: "Heading", kbd: "#" },
    { label: "Bullet list", kbd: "-" },
    { label: "Code block", kbd: "```" },
  ];
  let slashActive = $state(0);

  interface TooltipDemo {
    open?: boolean;
    label?: string;
    shortcut?: string;
    side?: "top" | "bottom" | "left" | "right";
  }
</script>

{#snippet picker(hsv: HsvColor, setHsv: (next: HsvColor) => void)}
  <div class="flex w-64 flex-col gap-3">
    <ColorSaturationValuePlane label="Saturation and brightness" value={hsv} onChange={setHsv} />
    <ColorHueSlider label="Hue" value={hsv.h} onChange={(h) => setHsv({ ...hsv, h })} />
    <div class="flex items-center gap-2">
      <span
        class="size-control-sm rounded border border-border"
        style="background: {hsvToHex(hsv)};"
        aria-hidden="true"
      ></span>
      <code class="code">{hsvToHex(hsv)}</code>
    </div>
  </div>
{/snippet}

{#snippet tooltipDemo(demo: TooltipDemo)}
  {@const label = demo.label ?? "Refresh"}
  {#snippet refreshTrigger(props: Record<string, unknown>)}
    <IconButton {...props} icon={RefreshCw} {label} variant="outline" />
  {/snippet}
  <div class="flex min-h-40 items-center justify-center">
    <Tooltip open={demo.open}>
      <TooltipTrigger child={refreshTrigger} />
      <TooltipContent side={demo.side ?? "top"} sideOffset={4}>
        {label}{#if demo.shortcut}<span class="ml-1.5 text-muted-foreground">{demo.shortcut}</span>{/if}
      </TooltipContent>
    </Tooltip>
  </div>
{/snippet}

{#snippet popoverTrigger(props: Record<string, unknown>)}
  <Button variant="outline" {...props}>Notifications</Button>
{/snippet}

{#snippet popoverDemo(demo: PopoverDemo)}
  <div class="relative flex min-h-64 items-start justify-center pt-4">
    {#if demo.backdrop}
      <div aria-hidden="true" class="absolute inset-x-0 top-14 flex flex-col gap-1.5 px-6">
        {#each Array.from({ length: 8 }, (_, i) => i) as i (i)}
          <p class="text-sm text-muted-foreground">
            Maya: the session from this morning is ready for review, line {i + 1}
          </p>
        {/each}
      </div>
    {/if}
    <Popover defaultOpen={demo.defaultOpen ?? false}>
      <PopoverTrigger child={popoverTrigger} />
      <PopoverContent
        side={demo.side ?? "bottom"}
        align={demo.align ?? "center"}
        arrow={demo.arrow ?? false}
        surface={demo.surface ?? "default"}
      >
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>{demo.body ?? "Choose when Atlas tells you a run needs you."}</PopoverDescription>
        </PopoverHeader>
        <div class="flex items-center justify-between gap-3 pt-1">
          <span class="label">Desktop alerts</span>
          <Switch checked onCheckedChange={() => {}} aria-label="Desktop alerts" />
        </div>
      </PopoverContent>
    </Popover>
  </div>
{/snippet}

{#snippet sheetOpenTrigger(props: Record<string, unknown>)}
  <Button variant="outline" {...props}>Open sheet</Button>
{/snippet}

{#snippet sheetCancel(props: Record<string, unknown>)}
  <Button variant="ghost" {...props}>Cancel</Button>
{/snippet}

{#snippet sheetDemo(demo: SheetDemo)}
  <Sheet defaultOpen={demo.defaultOpen ?? false}>
    <SheetTrigger child={sheetOpenTrigger} />
    <SheetContent side={demo.side ?? "right"}>
      <SheetHeader>
        <SheetTitle>{demo.title ?? "Session details"}</SheetTitle>
        <SheetDescription>
          {demo.description ?? "The name, projects and access for this session."}
        </SheetDescription>
      </SheetHeader>
      <div class="flex flex-col gap-1.5 px-4">
        <span class="label">Name</span>
        <Input value="Refactor the settings panel" aria-label="Name" />
      </div>
      <SheetFooter>
        <SheetClose child={sheetCancel} />
        <Button>Save</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
{/snippet}



{#snippet srFile()}<Icon icon={FileCode} size="lg" />{/snippet}
{#snippet srUser()}<Icon icon={User} size="lg" />{/snippet}
{#snippet rowAtlas()}atlas{/snippet}
{#snippet rowDesc()}atlas · main{/snippet}
{#snippet longDesc()}{PAL_LONG}{/snippet}
{#snippet iPlus()}<Icon icon={Plus} size="lg" />{/snippet}
{#snippet iFile()}<Icon icon={FileText} size="lg" />{/snippet}
{#snippet iPalette()}<Icon icon={Palette} size="lg" />{/snippet}
{#snippet iFolder()}<Icon icon={Folder} size="lg" />{/snippet}
{#snippet iSettings()}<Icon icon={Settings} size="lg" />{/snippet}
{#snippet iMessage()}<Icon icon={MessageSquare} size="lg" />{/snippet}
{#snippet iMap()}<Icon icon={MapIcon} size="lg" />{/snippet}
{#snippet iTerminal()}<Icon icon={Terminal} size="lg" />{/snippet}
{#snippet iBrain()}<Icon icon={Brain} size="lg" />{/snippet}
{#snippet iNetwork()}<Icon icon={Network} size="lg" />{/snippet}
{#snippet iBrainCircuit()}<Icon icon={BrainCircuit} size="lg" />{/snippet}
{#snippet iGlobe()}<Icon icon={Globe} size="lg" />{/snippet}
{#snippet iCode()}<Icon icon={Code} size="lg" />{/snippet}
{#snippet iScroll()}<Icon icon={ScrollText} size="lg" />{/snippet}
{#snippet iGauge()}<Icon icon={Gauge} size="lg" />{/snippet}





{#snippet hintRegion()}
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-2">
      {#each hintCounts as n, i (i)}
        <Button variant="outline" onclick={() => (hintCounts = hintCounts.map((v, j) => (j === i ? v + 1 : v)))}>{`Button ${i + 1} · ${n}`}</Button>
      {/each}
    </div>
    <Input aria-label="Notes" placeholder="A field: hinted, focused, never clicked" />
    <div data-hint class="flex items-center gap-2 rounded-lg border border-border p-2">
      <span class="text-sm text-muted-foreground">A [data-hint] wrapper</span>
      <Button size="sm">Inner</Button>
    </div>
    <div class="flex gap-2">
      <Button variant="outline" aria-hidden="true" tabindex={-1}>aria-hidden</Button>
      <Button variant="outline" disabled>Disabled</Button>
    </div>
    <div aria-hidden="true" data-slot="hint-group-tooltip" class="pointer-events-none rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
      A HintGroup strip: never a target
    </div>
  </div>
{/snippet}


{#snippet cmdMenuScenario()}
  <LinkProvider navigate={CM_NOOP}>
    <Button variant="outline" onclick={() => cm.setOpen(true)}>Jump to anything<Kbd>⌘K</Kbd></Button>
    <CommandMenu
      open={cm.open}
      onOpenChange={(next) => cm.setOpen(next)}
      actions={cmActions}
      placeholder={story === "cmdmenu-long-text"
        ? "Search sessions, projects, people, pull requests, memory and settings…"
        : undefined}
    />
  </LinkProvider>
{/snippet}

{#snippet hintScenario()}
  <div class="-m-4">
    <div class="flex flex-col gap-6 p-8">
      <Button class="self-start" onclick={() => (hintOpen = true)}>Enter hint mode</Button>
      <div
        bind:this={hintRoot}
        class={hintScrolled ? "h-80 overflow-y-auto rounded-xl border border-border p-4" : ""}
      >
        {#if hintScrolled}
          <div class="flex flex-col gap-8">
            <p class="caption">Scroll: the keycaps follow, and ↑/↓ scroll this region.</p>
            {@render hintRegion()}
            <div class="h-96"></div>
            {@render hintRegion()}
          </div>
        {:else}
          {@render hintRegion()}
        {/if}
      </div>
      {#if hintRoot}
        <HintOverlay
          open={hintOpen}
          onOpenChange={(next) => (hintOpen = next)}
          root={hintRoot}
          alphabet={story === "hint-two-char-labels" ? "fj" : undefined}
          onActivate={PAL_NOOP_ACT}
        />
      {/if}
    </div>
  </div>
{/snippet}

{#snippet searchScenario()}
  {#if story === "search-result-rows"}
    <div class="-m-4">
      <div class="mx-auto max-w-2xl p-8">
        <div class="overflow-hidden rounded-xl border border-border bg-popover pt-2">
          <CommandPanel aria-label="Result rows">
            {#each srGrep("split", 2) as r, i (r.id)}
              <SearchResultRow id={optionId("rows", r.id)} result={r} active={i === 0} onOpen={PAL_NOOP} />
            {/each}
          </CommandPanel>
        </div>
      </div>
    </div>
  {:else}
    <div class="-m-4">
      <div class="flex min-h-svh items-start justify-center p-8">
        <Button variant="outline" onclick={() => (srOpen = true)}>Open search</Button>
        <SearchOverlay
          open={srOpen}
          onOpenChange={(next) => (srOpen = next)}
          title={SR_LIVE ? "Find in session" : "Search in files"}
          placeholder={SR_LIVE ? "Find a question you asked…" : "Search in files…"}
          query={srQuery}
          onQueryChange={(next) => {
            srQuery = next;
            if (!next.trim() && !SR_LIVE) srStatus = "idle";
          }}
          mode={SR_LIVE ? "live" : "submit"}
          onSubmit={(q) => srSearch(q)}
          status={SR_LIVE ? "done" : srStatus}
          error="ripgrep exited with code 2"
          results={srShown}
          onOpen={PAL_NOOP_OPEN}
          count={SR_LIVE ? String(srShown.length) : srStatus === "done" ? String(srResults.length) : undefined}
          recent={srRecent}
          onPickRecent={(q) => (srQuery = q)}
          onForgetRecent={(q) => (srRecent = srRecent.filter((x) => x !== q))}
          onClearRecent={() => (srRecent = [])}
          idleHint={story === "search-no-recents" ? "Type to search across all files" : undefined}
          notice={SR_FIXTURE === "many" && srStatus === "done"
            ? "Showing the first 200 matches. Narrow the search to see the rest."
            : undefined}
        />
      </div>
    </div>
  {/if}
{/snippet}

{#snippet paletteScenario()}
  <!-- The palette's source is a fullscreen layout: cancel the gallery's body padding. -->
  <div class="-m-4">
  {#if story === "palette-view-only"}
    <div class="flex min-h-svh items-start justify-center p-8">
      <div class="flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
        <CommandPaletteView
          groups={filterCommandGroups(PAL_MODULES, palQuery)}
          query={palQuery}
          onQueryChange={(next) => (palQuery = next)}
          onRun={PAL_NOOP}
          placeholder="Open a module…"
          emptyMessage={`No modules match “${palQuery}”`}
          actionLabel="Open"
          claimFocus={false}
          onSubmit={PAL_NOOP}
        />
      </div>
    </div>
  {:else if story === "palette-inline-list"}
    <div class="mx-auto flex max-w-xl flex-col gap-2 p-8">
      <textarea
        aria-label="Message"
        aria-controls={inlineOpen ? "slash-picker" : undefined}
        aria-activedescendant={inlineOpen && inlineHighlight.active
          ? optionId("slash-picker", inlineHighlight.active)
          : undefined}
        value={palText}
        oninput={(event) => (palText = event.currentTarget.value)}
        onkeydown={(event) => {
          if (!inlineOpen) return;
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            inlineHighlight.step(event.key === "ArrowDown" ? 1 : -1);
          } else if (event.key === "Enter") {
            event.preventDefault();
            const item = inlineGroups.flatMap((g) => g.items).find((i) => i.id === inlineHighlight.active);
            if (item) {
              palText = "";
              item.onSelect?.();
            }
          }
        }}
        placeholder="Type / for commands"
        class="h-24 resize-none rounded-lg border border-border bg-background p-3 text-md text-foreground outline-none placeholder:text-muted-foreground"
      ></textarea>
      {#if inlineQuery !== null}
        <div class="overflow-hidden rounded-xl border border-border bg-popover pt-2 shadow-lg">
          <CommandList
            id="slash-picker"
            aria-label="Commands"
            groups={inlineGroups}
            activeId={inlineHighlight.active}
            onPoint={inlineHighlight.pointTo}
            onRun={(item) => {
              palText = "";
              item.onSelect?.();
            }}
            emptyMessage="No commands"
          />
          <CommandHints actionLabel="Insert" escapeLabel="Dismiss" />
        </div>
      {/if}
    </div>
  {:else if story === "palette-rows"}
    <div class="mx-auto max-w-2xl p-8">
      <div class="overflow-hidden rounded-xl border border-border bg-popover pt-2">
        <CommandPanel aria-label="Row states">
          {#each PAL_ROWS as [item, active] (item.id)}
            <CommandRow id={optionId("rows", item.id)} {item} {active} onRun={PAL_NOOP} />
          {/each}
        </CommandPanel>
      </div>
    </div>
  {:else}
    <div class="flex min-h-svh items-start justify-center p-8">
      <Button variant="outline" onclick={() => (palOpen = true)}>
        {story === "palette-new-tab" ? "New tab" : "Open palette"} <Kbd>⌘K</Kbd>
      </Button>
      <CommandPalette
        open={palOpen}
        onOpenChange={(next) => (palOpen = next)}
        groups={palGroups}
        title={story === "palette-new-tab" ? "Open module" : undefined}
        placeholder={story === "palette-new-tab" ? "Open a module…" : undefined}
        actionLabel={story === "palette-new-tab" ? "Open" : undefined}
        loading={story === "palette-loading" || story === "palette-loading-with-results"}
        emptyMessage={story === "palette-no-matches" ? (query) => `No results for “${query}”` : undefined}
      />
    </div>
  {/if}
  </div>
{/snippet}

{#snippet alertDeleteTrigger(props: Record<string, unknown>)}
  <Button variant="outline" {...props}>Delete session</Button>
{/snippet}

{#snippet alertDiscardTrigger(props: Record<string, unknown>)}
  <Button variant="outline" {...props}>Discard changes</Button>
{/snippet}

{#snippet alertDemo(demo: AlertDemo)}
  <AlertDialog defaultOpen={demo.defaultOpen ?? false}>
    <AlertDialogTrigger child={alertDeleteTrigger} />
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{demo.title ?? "Delete this session?"}</AlertDialogTitle>
        <AlertDialogDescription>
          {demo.description ?? "Its transcript and checkpoints go with it. This cannot be undone."}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant={(demo.destructive ?? true) ? "destructive" : "default"}>
          {demo.action ?? "Delete"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
{/snippet}

{#snippet alertParts()}
  <AlertDialog defaultOpen>
    <AlertDialogPortal>
      <AlertDialogOverlay />
    </AlertDialogPortal>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Discard changes?</AlertDialogTitle>
        <AlertDialogDescription>Three files have edits that are not saved.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Keep editing</AlertDialogCancel>
        <AlertDialogAction>Discard</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
{/snippet}

{#snippet alertBlurred()}
  <AlertDialog defaultOpen>
    <AlertDialogTrigger child={alertDiscardTrigger} />
    <AlertDialogContent blur dismissOnBackdrop>
      <AlertDialogHeader>
        <AlertDialogTitle>Discard changes?</AlertDialogTitle>
        <AlertDialogDescription>Three files have edits that are not saved.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Keep editing</AlertDialogCancel>
        <AlertDialogAction>Discard</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
{/snippet}

{#snippet commandOpenTrigger(props: Record<string, unknown>)}
  <Button variant="outline" {...props}>Open palette <Kbd>⌘K</Kbd></Button>
{/snippet}

{#snippet commandDemo(demo: CommandDemo)}
  <CommandDialog defaultOpen={demo.defaultOpen ?? false}>
    <CommandDialogTrigger child={commandOpenTrigger} />
    <CommandDialogPopup title="Command palette">
      <CommandInput
        placeholder="Type a command or search…"
        value={demo.query ?? ""}
        aria-label="Command"
        aria-controls="command-demo-list"
      />
      <CommandPanel id="command-demo-list" aria-label="Commands">
        {#if demo.empty}
          <CommandEmpty>No results for “{demo.query}”</CommandEmpty>
        {:else}
          <CommandGroupLabel>Actions</CommandGroupLabel>
          {#each COMMAND_ROWS as row, i (row.label)}
            <CommandItem active={i === (demo.active ?? 0)} disabled={(demo.disabledRow ?? false) && i === COMMAND_ROWS.length - 1}>
              <CommandItemIcon>
                <Icon icon={row.icon} size="lg" />
              </CommandItemIcon>
              {row.label}
              {#if row.shortcut}<CommandShortcut>{row.shortcut}</CommandShortcut>{/if}
              {#if row.submenu}<CommandSubmenuChevron />{/if}
            </CommandItem>
          {/each}
        {/if}
      </CommandPanel>
      <CommandFooter>
        <CommandFooterHint>
          <Kbd variant="soft">↑</Kbd>
          <Kbd variant="soft">↓</Kbd>
          Navigate
        </CommandFooterHint>
        <span class="flex items-center gap-4">
          <CommandFooterHint>
            <Kbd variant="soft">↵</Kbd>
            Select
          </CommandFooterHint>
          <CommandFooterHint>
            <Kbd variant="soft">Esc</Kbd>
            Close
          </CommandFooterHint>
        </span>
      </CommandFooter>
    </CommandDialogPopup>
  </CommandDialog>
{/snippet}

{#snippet inlinePicker(listbox: boolean)}
  <div class="flex w-[420px] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-md">
    <div role={listbox ? "listbox" : undefined} aria-label={listbox ? "Slash commands" : undefined} class="py-1">
      <CommandGroupLabel size="compact">Commands</CommandGroupLabel>
      {#each SLASH_ROWS as row, i (row.name)}
        <CommandItem size="compact" {listbox} active={i === 1} disabled={row.name === "login"}>
          <span class="min-w-20 shrink-0 font-mono text-foreground">/{row.name}</span>
          <span class="min-w-0 flex-1 truncate text-xs text-muted-foreground">{row.description}</span>
        </CommandItem>
      {/each}
    </div>
    <CommandFooter size="compact">
      <span class="flex items-center gap-1.5">
        <Kbd>↑↓</Kbd>
        navigate
        <Kbd>↵</Kbd>
        select
      </span>
      <span class="flex items-center gap-1.5">
        <Kbd>esc</Kbd>
        close
      </span>
    </CommandFooter>
  </div>
{/snippet}

{#snippet cpuIcon()}
  <Icon icon={Cpu} size="sm" />
{/snippet}

{#snippet contextDemo(disabledItem: boolean)}
  <ContextMenu>
    <ContextMenuTrigger
      data-testid="area"
      class="caption flex h-56 w-96 items-center justify-center rounded-md border border-dashed border-border-strong"
    >
      Right-click here
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuGroup>
        <ContextMenuLabel>src/ui/button.tsx</ContextMenuLabel>
        <ContextMenuItem>
          <FilePlus />
          New file
        </ContextMenuItem>
        <ContextMenuItem>
          <Pencil />
          Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled={disabledItem}>
          <Copy />
          Copy path
          <ContextMenuShortcut>⌥⌘C</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem checked>Show hidden files</ContextMenuCheckboxItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>Open with</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Editor</ContextMenuItem>
          <ContextMenuItem>Terminal</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuItem>
        <Trash2 />
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
{/snippet}

{#snippet selectBox()}
  <div class="min-h-56">
    <Select
      value={selectValue}
      onValueChange={(next) => (selectValue = next)}
      options={story === "select-long-text" ? SELECT_LONG : story === "select-empty" ? [] : SELECT_MODELS}
      disabled={story === "select-disabled"}
      placeholder={story === "select-placeholder"
        ? "Choose a model"
        : story === "select-empty"
          ? "Add someone…"
          : undefined}
      empty={story === "select-empty" ? "Everyone is already here." : undefined}
      id={story === "select-with-label" ? "story-model" : undefined}
      aria-label={story === "select-with-label"
        ? undefined
        : story === "select-empty"
          ? "Person to add"
          : "Model"}
      variant={story === "select-ghost" ? "ghost" : "bordered"}
      shape={story === "select-pill" ? "pill" : "default"}
      size={story === "select-small" ? "sm" : "md"}
      indicator={story !== "select-no-indicator"}
      class={story === "select-long-text" ? "max-w-48" : undefined}
      leading={story === "select-with-icon" ? cpuIcon : undefined}
    />
  </div>
{/snippet}

{#snippet selectScenario()}
  {#if story === "select-with-label"}
    <div class="flex min-h-56 flex-col items-start gap-1.5">
      <label for="story-model" class="text-xs font-medium">Model</label>
      {@render selectBox()}
    </div>
  {:else}
    {@render selectBox()}
  {/if}
{/snippet}

{#snippet sessionTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={MoreHorizontal} label="Session actions" />
{/snippet}

{#snippet dropdownDemo(demo: DropdownDemo)}
  <div class="min-h-80">
    <DropdownMenu defaultOpen={demo.defaultOpen ?? false}>
      <DropdownMenuTrigger child={sessionTrigger} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Session</DropdownMenuLabel>
          <DropdownMenuItem>
            <Pencil />
            {demo.longLabel ? "Rename this session and every fork made from it" : "Rename"}
            <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy />
            Copy link
            <DropdownMenuShortcut>⌘⇧C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={demo.disabledItem ?? false}>
            <Pin />
            Pin
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem defaultChecked>Show tool calls</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Show thinking</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioGroup defaultValue="recent">
            <DropdownMenuRadioItem value="recent">Most recent</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Archive />
            Move to
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>atlas</DropdownMenuItem>
            <DropdownMenuItem>design</DropdownMenuItem>
            <DropdownMenuItem>server</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
{/snippet}

{#snippet slashList()}
  <div class="flex w-[280px] flex-col gap-1">
    <input
      aria-label="Note"
      aria-controls="slash-list"
      aria-activedescendant={`slash-${slashActive}`}
      value="/"
      class="rounded border border-border bg-transparent px-2 py-1 text-xs"
      onkeydown={(event) => {
        if (event.key === "ArrowDown") slashActive = (slashActive + 1) % SLASH.length;
        if (event.key === "ArrowUp") slashActive = (slashActive - 1 + SLASH.length) % SLASH.length;
      }}
    />
    <div
      id="slash-list"
      role="listbox"
      aria-label="Blocks"
      class={menuContentVariants({ motion: false })}
    >
      <div role="group" aria-labelledby="slash-basic">
        <div id="slash-basic" class={menuLabelVariants()}>Basic</div>
        {#each SLASH as item, i (item.label)}
          <div
            id={`slash-${i}`}
            role="option"
            aria-selected={i === slashActive}
            data-active={i === slashActive ? "" : undefined}
            class={menuItemVariants({ highlight: "active" })}
          >
            {item.label}
            <span class={menuShortcutVariants({ highlight: "active", className: "font-mono" })}>
              {item.kbd}
            </span>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/snippet}

{#snippet boldTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={Bold} label="Bold" />
{/snippet}

{#snippet italicTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={Italic} label="Italic" />
{/snippet}

{#snippet underlineTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={Underline} label="Underline" />
{/snippet}

{#snippet commandTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={RefreshCw} label="Command palette" variant="outline" />
{/snippet}

{#if story === "color-picker-default"}
  {@render picker(pickerDefault, (next) => (pickerDefault = next))}
{:else if story === "color-picker-red"}
  {@render picker(pickerRed, (next) => (pickerRed = next))}
{:else if story === "color-picker-black"}
  {@render picker(pickerBlack, (next) => (pickerBlack = next))}
{:else if story === "color-hue-slider-alone"}
  <div class="w-64">
    <ColorHueSlider label="Hue" value={hueAlone} onChange={(next) => (hueAlone = next)} />
  </div>
{:else if story === "tooltip-default" || story === "tooltip-exit"}
  {@render tooltipDemo({ shortcut: "⌘R" })}
{:else if story === "tooltip-open"}
  {@render tooltipDemo({ open: true, shortcut: "⌘R" })}
{:else if story === "tooltip-open-below"}
  {@render tooltipDemo({ open: true, shortcut: "⌘R", side: "bottom" })}
{:else if story === "tooltip-long-text"}
  {@render tooltipDemo({
    open: true,
    label: "Refresh the list of pull requests waiting for your review across every attached project",
  })}
{:else if story === "tooltip-hint-row"}
  <TooltipProvider>
    <div class="flex gap-1">
      <Hint label="Bold" shortcut="⌘B">{#snippet child(props)}{@render boldTrigger(props)}{/snippet}</Hint>
      <Hint label="Italic" shortcut="⌘I">{#snippet child(props)}{@render italicTrigger(props)}{/snippet}</Hint>
      <Hint label="Underline" shortcut="⌘U">{#snippet child(props)}{@render underlineTrigger(props)}{/snippet}</Hint>
    </div>
  </TooltipProvider>
{:else if story === "sheet-default"}
  {@render sheetDemo({})}
{:else if story === "sheet-open"}
  {@render sheetDemo({ defaultOpen: true })}
{:else if story === "sheet-left"}
  {@render sheetDemo({ defaultOpen: true, side: "left" })}
{:else if story === "sheet-bottom"}
  {@render sheetDemo({ defaultOpen: true, side: "bottom" })}
{:else if story === "sheet-long-text"}
  {@render sheetDemo({
    defaultOpen: true,
    title: "Allow this agent to read every project attached to the session?",
    description:
      "Access is read-only. The agent asks again before it writes anything, and you can revoke access from the session's project list at any time. Projects added later inherit this choice until you change it.",
  })}
{:else if story === "alert-default"}
  {@render alertDemo({})}
{:else if story === "alert-open"}
  {@render alertDemo({ defaultOpen: true })}
{:else if story === "alert-not-destructive"}
  {@render alertDemo({
    defaultOpen: true,
    destructive: false,
    title: "Leave the organisation?",
    description: "You can rejoin from an invite link.",
    action: "Leave",
  })}
{:else if story === "alert-long-text"}
  {@render alertDemo({
    defaultOpen: true,
    title: "Delete this session and every fork, checkpoint and shared link that was made from it?",
    description:
      "Everyone in the organisation loses access to the transcript, the checkpoints and the shared links. Forks made from this session are deleted with it. Usage already recorded stays on the organisation's bill. This cannot be undone.",
    action: "Delete everything",
  })}
{:else if story === "alert-parts"}
  {@render alertParts()}
{:else if story === "alert-blurred-dismissible"}
  {@render alertBlurred()}
{:else if story === "command-default"}
  {@render commandDemo({})}
{:else if story === "command-open"}
  {@render commandDemo({ defaultOpen: true })}
{:else if story === "command-empty"}
  {@render commandDemo({ defaultOpen: true, empty: true, query: "deploy to prod" })}
{:else if story === "command-disabled-row"}
  {@render commandDemo({ defaultOpen: true, disabledRow: true })}
{:else if story === "command-compact"}
  {@render inlinePicker(true)}
{:else if story === "command-compact-without-roles"}
  {@render inlinePicker(false)}
{:else if story === "contextmenu-default" || story === "contextmenu-open" || story === "contextmenu-exit"}
  {@render contextDemo(false)}
{:else if story === "contextmenu-disabled-item"}
  {@render contextDemo(true)}
{:else if story.startsWith("cmdmenu-")}
  {@render cmdMenuScenario()}
{:else if story.startsWith("hint-")}
  {@render hintScenario()}
{:else if story.startsWith("search-")}
  {@render searchScenario()}
{:else if story.startsWith("palette-")}
  {@render paletteScenario()}
{:else if story.startsWith("select-")}
  {@render selectScenario()}
{:else if story === "dropdownmenu-default"}
  {@render dropdownDemo({})}
{:else if story === "dropdownmenu-open" || story === "dropdownmenu-icon-rows-align" || story === "dropdownmenu-exit"}
  {@render dropdownDemo({ defaultOpen: true })}
{:else if story === "dropdownmenu-disabled-item"}
  {@render dropdownDemo({ defaultOpen: true, disabledItem: true })}
{:else if story === "dropdownmenu-long-text"}
  {@render dropdownDemo({ defaultOpen: true, longLabel: true })}
{:else if story === "dropdownmenu-recipes"}
  {@render slashList()}
{:else if story === "popover-default"}
  {@render popoverDemo({})}
{:else if story === "popover-open" || story === "popover-exit"}
  {@render popoverDemo({ defaultOpen: true })}
{:else if story === "popover-with-arrow"}
  {@render popoverDemo({ defaultOpen: true, arrow: true })}
{:else if story === "popover-tinted"}
  {@render popoverDemo({ defaultOpen: true, surface: "tinted" })}
{:else if story === "popover-glass"}
  {@render popoverDemo({ defaultOpen: true, surface: "glass", backdrop: true })}
{:else if story === "popover-long-text"}
  {@render popoverDemo({ defaultOpen: true, body: POPOVER_LONG_TEXT })}
{:else if story === "tooltip-hint-keycaps"}
  <div class="flex min-h-40 items-center justify-center">
    <Hint label="Command palette" shortcut="⌘⇧P" side="top">
      {#snippet child(props)}{@render commandTrigger(props)}{/snippet}
    </Hint>
  </div>
{/if}
