<script lang="ts">
  import ExternalAgentMark from "../../src/lots/f3-ui-first-half/external-agent-mark.svelte";
  import AgentMonogram from "../../src/lots/f3-ui-first-half/agent-monogram.svelte";
  import Accordion from "../../src/lots/f3-ui-first-half/accordion.svelte";
  import AccordionItem from "../../src/lots/f3-ui-first-half/accordion-item.svelte";
  import AccordionTrigger from "../../src/lots/f3-ui-first-half/accordion-trigger.svelte";
  import AccordionContent from "../../src/lots/f3-ui-first-half/accordion-content.svelte";
  import AtlasMark from "../../src/lots/f3-ui-first-half/atlas-mark.svelte";
  import AtlasBadge from "../../src/lots/f3-ui-first-half/atlas-badge.svelte";
  import AtlasWordmark from "../../src/lots/f3-ui-first-half/atlas-wordmark.svelte";
  import Avatar from "../../src/lots/f3-ui-first-half/avatar.svelte";
  import AvatarImage from "../../src/lots/f3-ui-first-half/avatar-image.svelte";
  import AvatarFallback from "../../src/lots/f3-ui-first-half/avatar-fallback.svelte";
  import AvatarGroup from "../../src/lots/f3-ui-first-half/avatar-group.svelte";
  import AvatarGroupCount from "../../src/lots/f3-ui-first-half/avatar-group-count.svelte";
  import AvatarStack from "../../src/lots/f3-ui-first-half/avatar-stack.svelte";
  import AvatarStackItem from "../../src/lots/f3-ui-first-half/avatar-stack-item.svelte";
  import Breadcrumb from "../../src/lots/f3-ui-first-half/breadcrumb.svelte";
  import BreadcrumbList from "../../src/lots/f3-ui-first-half/breadcrumb-list.svelte";
  import BreadcrumbItem from "../../src/lots/f3-ui-first-half/breadcrumb-item.svelte";
  import BreadcrumbLink from "../../src/lots/f3-ui-first-half/breadcrumb-link.svelte";
  import BreadcrumbPage from "../../src/lots/f3-ui-first-half/breadcrumb-page.svelte";
  import BreadcrumbSeparator from "../../src/lots/f3-ui-first-half/breadcrumb-separator.svelte";
  import BreadcrumbEllipsis from "../../src/lots/f3-ui-first-half/breadcrumb-ellipsis.svelte";
  import type { Component } from "svelte";
  import ClaudeCodeMark from "../../src/lots/f3-ui-first-half/claude-code-mark.svelte";
  import ClaudeMark from "../../src/lots/f3-ui-first-half/claude-mark.svelte";
  import CodexMark from "../../src/lots/f3-ui-first-half/codex-mark.svelte";
  import CursorAgentMark from "../../src/lots/f3-ui-first-half/cursor-agent-mark.svelte";
  import CursorMark from "../../src/lots/f3-ui-first-half/cursor-mark.svelte";
  import DiscordMark from "../../src/lots/f3-ui-first-half/discord-mark.svelte";
  import GeminiMark from "../../src/lots/f3-ui-first-half/gemini-mark.svelte";
  import GitHubMark from "../../src/lots/f3-ui-first-half/github-mark.svelte";
  import GoogleMark from "../../src/lots/f3-ui-first-half/google-mark.svelte";
  import JetBrainsMark from "../../src/lots/f3-ui-first-half/jetbrains-mark.svelte";
  import KiloMark from "../../src/lots/f3-ui-first-half/kilo-mark.svelte";
  import OpenAIMark from "../../src/lots/f3-ui-first-half/openai-mark.svelte";
  import OpenCodeMark from "../../src/lots/f3-ui-first-half/opencode-mark.svelte";
  import XMark from "../../src/lots/f3-ui-first-half/x-mark.svelte";
  import ZedMark from "../../src/lots/f3-ui-first-half/zed-mark.svelte";
  import Callout from "../../src/lots/f3-ui-first-half/callout.svelte";
  import { calloutVariants } from "../../src/lots/f3-ui-first-half/callout-variants";
  import Button from "../../src/ui/button.svelte";
  import IconButton from "../../src/ui/icon-button.svelte";
  import { GitBranch, MoonStar, Sparkles, X } from "lucide-svelte";
  import Code from "../../src/lots/f3-ui-first-half/code.svelte";
  import CodeFence from "../../src/lots/f3-ui-first-half/code-fence.svelte";
  import DiffStat from "../../src/lots/f3-ui-first-half/diff-stat.svelte";
  import Collapsible from "../../src/lots/f3-ui-first-half/collapsible.svelte";
  import CollapsibleTrigger from "../../src/lots/f3-ui-first-half/collapsible-trigger.svelte";
  import CollapsibleContent from "../../src/lots/f3-ui-first-half/collapsible-content.svelte";
  import EmptyState from "../../src/lots/f3-ui-first-half/empty-state.svelte";
  import AnthropicMark from "../../src/lots/f3-ui-first-half/deps/anthropic-mark.svelte";
  import GoChevron from "../../src/lots/f3-ui-first-half/go-chevron.svelte";
  import MailboxIcon from "../../src/lots/f3-ui-first-half/mailbox-icon.svelte";
  import MessageSquareMoreIcon from "../../src/lots/f3-ui-first-half/message-square-more-icon.svelte";
  import Icon from "../../src/ui/icon.svelte";
  import { ChevronRight, Inbox, MessageSquare, SearchX } from "lucide-svelte";
  import { AlignCenter, AlignLeft, AlignRight, ChevronDown, Columns2, Rows2 } from "lucide-svelte";
  import DataTable from "../../src/lots/f3-ui-first-half/data-table.svelte";
  import TableSearch from "../../src/lots/f3-ui-first-half/table-search.svelte";
  import type { DataTableSort } from "../../src/lots/f3-ui-first-half/data-table-types";
  import UnderlineTabs, { type UnderlineTabOption } from "../../src/lots/f3-ui-first-half/underline-tabs.svelte";
  import CompoundFilter from "../../src/lots/f3-ui-first-half/compound-filter.svelte";
  import SegmentedIconGroup from "../../src/lots/f3-ui-first-half/segmented-icon-group.svelte";

  interface Props {
    story?: string;
  }

  let { story = "" }: Props = $props();

  const TONES = ["neutral", "info", "success", "warning", "error"] as const;
  const DIFF_ROWS: [string, number, number][] = [
    ["src/app.tsx", 4, 1],
    ["src/lib/very-long-name.ts", 1280, 0],
    ["README.md", 0, 37],
  ];
  /** Replays the callout's mount animation ("Show again"). */
  let replayRun = $state(0);
  /** The drivers of the "Driven by parent" stories: a button drives the glyph's ref. */
  let mailboxRef = $state<{ startAnimation: () => void; stopAnimation: () => void }>();
  let messageRef = $state<{ startAnimation: () => void; stopAnimation: () => void }>();

  interface DtRow {
    id: string;
    session: string;
    author: string;
    model: string;
    tokens: number;
    cost: number;
  }

  const DT_AUTHORS = ["Maya Chen", "Tomás Rivera", "Aiko Tanaka", "Sam Okafor", "Lena Fischer"];
  const DT_MODELS = ["claude-opus", "claude-sonnet", "gpt-5", "gemini-pro"];
  const DT_TITLES = [
    "Refactor the settings panel",
    "Fix the flaky terminal test",
    "Port the session timeline",
    "Add the ghost-destructive variant",
    "Bump the Rust toolchain",
    "Wire up the PR surface",
    "Theme import from VS Code",
    "Dedupe the codemirror packages",
  ];

  function makeRows(n: number): DtRow[] {
    return Array.from({ length: n }, (_, i) => ({
      id: `r${i}`,
      session: DT_TITLES[i % DT_TITLES.length]!,
      author: DT_AUTHORS[i % DT_AUTHORS.length]!,
      model: DT_MODELS[i % DT_MODELS.length]!,
      tokens: 12_000 + ((i * 37_919) % 400_000),
      cost: Math.round((0.4 + ((i * 7.3) % 18)) * 100) / 100,
    }));
  }

  /** Four rows, the first with a long session title. */
  function longRows(): DtRow[] {
    return makeRows(4).map((r, i) =>
      i === 0
        ? {
            ...r,
            session:
              "Rewrite the session sidebar so pinned, unread and snoozed sessions sort into one flat list",
          }
        : r,
    );
  }

  const DT_SORT_VALUE: Record<string, (r: DtRow) => string | number> = {
    session: (r) => r.session,
    author: (r) => r.author,
    tokens: (r) => r.tokens,
    cost: (r) => r.cost,
  };
  const SERVER_ROWS = makeRows(8);

  /** Stands in for a server query: the rows in the order a server would return. */
  function serverOrder(sort: DataTableSort): DtRow[] {
    const get = sort ? DT_SORT_VALUE[sort.id] : undefined;
    if (!sort || !get) return SERVER_ROWS;
    return [...SERVER_ROWS].sort((a, b) => {
      const r = get(a) < get(b) ? -1 : get(a) > get(b) ? 1 : 0;
      return sort.dir === "asc" ? r : -r;
    });
  }

  const SEG_TABS: UnderlineTabOption<string>[] = [
    { value: "overview", label: "Overview" },
    { value: "sessions", label: "Sessions", count: 48 },
    { value: "members", label: "Members", count: 12 },
    { value: "billing", label: "Billing" },
  ];
  const SEG_TABS_MANY: UnderlineTabOption<string>[] = [
    { value: "overview", label: "Overview" },
    { value: "t1", label: "Sessions", count: 48 },
    { value: "t2", label: "Members", count: 12 },
    { value: "t3", label: "Billing" },
    { value: "t4", label: "Integrations" },
    { value: "t5", label: "Audit log", count: 1204 },
  ];

  /** The table's query and selection, as the demo keeps them. */
  let dtQuery = $state("");
  let dtSelected = $state<string | undefined>("r1");
  let segSessions = $state("sessions");
  let segMany = $state("overview");

  // The server-sorted demo: the table owns no sort state; the "server" answers after 300ms.
  let serverSortState = $state<DataTableSort>({ id: "cost", dir: "desc" });
  const INITIAL_SERVER_ROWS = serverOrder({ id: "cost", dir: "desc" });
  let serverRows = $state<DtRow[]>(INITIAL_SERVER_ROWS);
  let serverLoading = $state(false);
  let serverFirst = true;

  $effect(() => {
    const sort = serverSortState;
    if (serverFirst) {
      serverFirst = false;
      return;
    }
    serverLoading = true;
    const timer = setTimeout(() => {
      serverRows = serverOrder(sort);
      serverLoading = false;
    }, 300);
    return () => clearTimeout(timer);
  });

  interface DemoItem {
    value: string;
    title: string;
    body: string;
  }

  const ITEMS: DemoItem[] = [
    {
      value: "scope",
      title: "What can the agent read?",
      body: "Every project attached to the session, read-only. It asks before it writes.",
    },
    {
      value: "cost",
      title: "How is usage counted?",
      body: "Tokens in and out, per session, billed to the organisation that owns the project.",
    },
    {
      value: "share",
      title: "Who sees a shared session?",
      body: "Everyone in the organisation. Private sessions stay with you.",
    },
  ];

  function countedItems(count: number): DemoItem[] {
    return Array.from({ length: count }, (_, i) => ({
      value: `q${i}`,
      title: `Question ${i + 1}: how does this setting behave?`,
      body: `Answer ${i + 1}. It applies to every new session from now on.`,
    }));
  }

  const AVATAR_SIZES = ["3xs", "2xs", "xs", "sm", "md", "lg"] as const;
  const AVATAR_PEOPLE = ["Ada Lovelace", "Grace Hopper", "Alan Turing", "Katherine Johnson", "Linus Pauling"];
  const STACK_PEOPLE = ["AL", "GH", "AT", "KJ", "LP", "MC", "RF", "DK", "BL", "ES", "JM", "TB"];

  function initials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);
  }

  /** A data-URI face, so the story needs no network. */
  const PHOTO =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      // ratchet-allow: a stand-in photograph, so its pixels are image content rather than theme colour.
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#8a8f98"/><circle cx="16" cy="13" r="6" fill="#d9dce1"/><rect x="6" y="22" width="20" height="12" rx="6" fill="#d9dce1"/></svg>',
    );

  type Mark = Component<Record<string, any>>;
  const SOCIAL: [string, Mark][] = [
    ["Google", GoogleMark],
    ["GitHub", GitHubMark],
    ["X", XMark],
    ["Discord", DiscordMark],
  ];
  const AGENTS: [string, Mark][] = [
    ["Claude Code", ClaudeCodeMark],
    ["Codex", CodexMark],
    ["OpenCode", OpenCodeMark],
    ["Cursor", CursorAgentMark],
    ["Kilo", KiloMark],
  ];
  const MODELS: [string, Mark][] = [
    ["Claude", ClaudeMark],
    ["Gemini", GeminiMark],
    ["OpenAI", OpenAIMark],
    ["Cursor", CursorMark],
  ];
  const EDITORS: [string, Mark][] = [
    ["Cursor", CursorMark],
    ["Zed", ZedMark],
    ["JetBrains", JetBrainsMark],
  ];
  const GROUPS: Record<string, [string, Mark][]> = { Social: SOCIAL, Agents: AGENTS, Models: MODELS, Editors: EDITORS };
  const EVERY_MARK = [...SOCIAL, ...AGENTS, ...MODELS, ...EDITORS.slice(1)];

  const svgUrl = (svg: string) => `data:image/svg+xml;base64,${btoa(svg)}`;
  const GLYPH = "M3 3h18v18H3zM7 7v10h10V7z";
  /** A registry icon with no colour of its own: drawn as a mask in the ink around it. */
  const MONOCHROME = svgUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="${GLYPH}"/></svg>`,
  );
  /** One with its own colour: drawn as an image, untouched. */
  const COLOURED = svgUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="red" fill-rule="evenodd" d="${GLYPH}"/></svg>`,
  );
</script>

{#snippet accordionDemo(
  multiple: boolean,
  defaultValue: string[],
  disabledItem: boolean,
  longText: boolean,
  count: number,
)}
  {@const items = count ? countedItems(count) : ITEMS}
  <div class="w-96">
    <Accordion {multiple} {defaultValue}>
      {#each items as item, i (item.value)}
        <AccordionItem value={item.value} disabled={disabledItem && i === 2}>
          <AccordionTrigger>
            {longText && i === 0
              ? "What can the agent read when a project is attached to a shared session that other people in the organisation also use?"
              : item.title}
          </AccordionTrigger>
          <AccordionContent>
            <p>
              {longText && i === 0
                ? "Every project attached to the session, read-only, including projects attached later by someone else. The agent asks again before it writes anything, and access can be revoked from the session's project list at any time. Revoking it does not undo what the agent has already read."
                : item.body}
            </p>
          </AccordionContent>
        </AccordionItem>
      {/each}
    </Accordion>
  </div>
{/snippet}

{#snippet avatarDemo(size: (typeof AVATAR_SIZES)[number], name: string, src?: string)}
  <Avatar {size}>
    {#if src}
      <AvatarImage {src} alt={name} />
    {/if}
    <AvatarFallback>{initials(name)}</AvatarFallback>
  </Avatar>
{/snippet}

{#snippet avatarStackDemo(count: number, size: (typeof AVATAR_SIZES)[number])}
  <AvatarStack>
    {#each STACK_PEOPLE.slice(0, count) as person (person)}
      <AvatarStackItem>
        <Avatar {size}>
          <AvatarFallback>{person}</AvatarFallback>
        </Avatar>
      </AvatarStackItem>
    {/each}
  </AvatarStack>
{/snippet}

{#snippet breadcrumbDemo(trail: string[], collapse: boolean)}
  {@const page = trail.at(-1) ?? ""}
  {@const links = trail.slice(0, -1)}
  {@const shown = collapse && links.length > 2 ? [links[0], null, links.at(-1)] : links}
  <Breadcrumb>
    <BreadcrumbList>
      {#each shown as crumb, i (i)}
        <BreadcrumbItem>
          {#if crumb === null}
            <BreadcrumbEllipsis />
          {:else}
            <BreadcrumbLink href="#" onclick={(event: MouseEvent) => event.preventDefault()}>{crumb}</BreadcrumbLink>
          {/if}
          <BreadcrumbSeparator />
        </BreadcrumbItem>
      {/each}
      <BreadcrumbItem>
        <BreadcrumbPage>{page}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
{/snippet}

{#snippet brandGallery(group: string)}
  <div class="grid w-fit grid-cols-3 gap-2">
    {#each GROUPS[group] as [name, Mark] (name)}
      <div class="flex w-28 flex-col items-center gap-2 rounded-md border border-border-subtle p-3">
        <Mark class="size-6" />
        <span class="caption">{name}</span>
      </div>
    {/each}
  </div>
{/snippet}

{#snippet tryAction()}
  <Button size="xs" variant="outline">Try it</Button>
{/snippet}

{#snippet detailsAction()}
  <Button size="xs" variant="outline">Details</Button>
{/snippet}

{#snippet tuckedActions()}
  <Button variant="ghost" size="xs">Switch back</Button>
  <IconButton variant="ghost" size="xs" icon={X} label="Hide" />
{/snippet}

{#snippet composer()}
  <div class="relative z-10 flex h-20 items-start rounded-2xl border border-border bg-card p-3 text-sm text-muted-foreground">
    Ask the agent…
  </div>
{/snippet}

{#snippet collapsibleDemo(defaultOpen: boolean, disabled: boolean, count: number)}
  <Collapsible {defaultOpen} {disabled} class="w-72">
    <CollapsibleTrigger
      class="group label flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-secondary-foreground hover:bg-element-hover hover:text-foreground data-disabled:opacity-50"
    >
      <Icon
        icon={ChevronRight}
        size="sm"
        class="transition-transform duration-fast ease-out-strong group-data-panel-open:rotate-90"
      />
      Earlier tool calls
      <span class="caption ml-auto">{count}</span>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <ul class="flex flex-col gap-0.5 py-1 pl-6">
        {#each Array.from({ length: count }, (_, i) => i) as i (i)}
          <!-- The `{#if}` blocks keep the prefix, the number and the bracket in
               three text nodes, as the oracle renders them: shaped together, the
               digits land a subpixel apart. -->
          <li class="caption">{#if i >= 0}read_file src/ui/button.tsx ({/if}{i + 1}{#if i >= 0}){/if}</li>
        {/each}
      </ul>
    </CollapsibleContent>
  </Collapsible>
{/snippet}

{#snippet newSessionAction()}
  <Button size="sm">New session</Button>
{/snippet}

{#snippet searchEverywhereAction()}
  <Button size="sm" variant="outline">Search everywhere</Button>
{/snippet}

{#snippet goRow(label: string)}
  <a
    href="#go"
    class="group/go flex w-72 items-center justify-between gap-2 rounded-md border border-border px-3 py-2 transition-colors duration-fast ease-out-strong hover:bg-element-hover"
  >
    <span class="label truncate">{label}</span>
    <GoChevron class="text-muted-foreground" />
  </a>
{/snippet}

{#snippet dtSession(r: DtRow)}<span class="label block truncate">{r.session}</span>{/snippet}
{#snippet dtAuthor(r: DtRow)}<span class="text-secondary-foreground">{r.author}</span>{/snippet}
{#snippet dtModel(r: DtRow)}<span class="font-mono text-secondary-foreground">{r.model}</span>{/snippet}
{#snippet dtTokens(r: DtRow)}{r.tokens.toLocaleString("en-US")}{/snippet}
{#snippet dtCost(r: DtRow)}{"$" + r.cost.toFixed(2)}{/snippet}

{#snippet dataTableDemo(rows: DtRow[], className: string, toolbarOn: boolean, footerOn: boolean, selectable: boolean)}
  {@const visible = rows.filter((r) => r.session.toLowerCase().includes(dtQuery.toLowerCase()))}
  {@const columns = [
    { id: "session", header: "Session", cell: dtSession, sortValue: (r: DtRow) => r.session },
    { id: "author", header: "Author", cell: dtAuthor, sortValue: (r: DtRow) => r.author, class: "hidden @md:table-cell" },
    { id: "model", header: "Model", cell: dtModel, class: "hidden @lg:table-cell" },
    { id: "tokens", header: "Tokens", cell: dtTokens, sortValue: (r: DtRow) => r.tokens, align: "right" as const },
    { id: "cost", header: "Cost", cell: dtCost, sortValue: (r: DtRow) => r.cost, align: "right" as const },
  ]}
  {#snippet emptyNote()}
    {dtQuery ? `No sessions match “${dtQuery}”` : "No sessions in the last 7 days"}
  {/snippet}
  {#snippet toolbarContent()}
    <TableSearch placeholder="Search sessions" bind:value={dtQuery} />
    <span class="caption ml-auto">{visible.length}{#if visible.length >= 0}{" "}sessions{/if}</span>
  {/snippet}
  {#snippet footerContent()}
    <span>Last 7 days</span>
    <span class="ml-auto tabular-nums">{visible.reduce((t, r) => t + r.tokens, 0).toLocaleString("en-US")}{#if visible.length >= 0}{" "}tokens{/if}</span>
  {/snippet}
  <DataTable
    class={className}
    rows={visible}
    {columns}
    rowId={(r) => r.id}
    empty={emptyNote}
    selectedId={selectable ? dtSelected : undefined}
    onRowClick={selectable ? (r) => (dtSelected = r.id) : undefined}
    toolbar={toolbarOn ? toolbarContent : undefined}
    footer={footerOn ? footerContent : undefined}
  />
{/snippet}

{#snippet serverToolbar()}
  <span class="caption">
    {serverLoading
      ? "Sorting on the server…"
      : serverSortState
        ? `Sorted by ${serverSortState.id}, ${serverSortState.dir === "asc" ? "ascending" : "descending"}`
        : "Server order"}
  </span>
{/snippet}

{#if story === "components-agenticon--external-monochrome"}
  <span class="label inline-flex items-center gap-2 text-muted-foreground">
    <ExternalAgentMark dataUrl={MONOCHROME} size={16} />
    Registry agent
  </span>
{:else if story === "components-agenticon--external-colour"}
  <ExternalAgentMark dataUrl={COLOURED} size={16} />
{:else if story === "components-agenticon--monogram"}
  <div class="flex items-end gap-4">
    {#each [12, 14, 16, 20, 32] as size (size)}
      <span class="flex flex-col items-center gap-1">
        <AgentMonogram label="kilo" {size} />
        <span class="caption">{size}</span>
      </span>
    {/each}
  </div>
{:else if story === "components-accordion--default"}
  {@render accordionDemo(false, [], false, false, 0)}
{:else if story === "components-accordion--open"}
  {@render accordionDemo(false, ["scope"], false, false, 0)}
{:else if story === "components-accordion--multiple"}
  {@render accordionDemo(true, ["scope", "cost"], false, false, 0)}
{:else if story === "components-accordion--disabled"}
  {@render accordionDemo(false, [], true, false, 0)}
{:else if story === "components-accordion--long-text"}
  {@render accordionDemo(false, ["scope"], false, true, 0)}
{:else if story === "components-accordion--many-items"}
  {@render accordionDemo(false, ["q0"], false, false, 10)}
{:else if story === "components-atlasmark--default"}
  <AtlasMark class="size-6" />
{:else if story === "components-atlasmark--sizes"}
  <div class="flex items-end gap-4 text-foreground">
    <AtlasMark class="size-3" />
    <AtlasMark class="size-4" />
    <AtlasMark class="size-6" />
    <AtlasMark class="size-10" />
  </div>
{:else if story === "components-atlasmark--inks"}
  <div class="flex items-center gap-4">
    <AtlasMark class="size-5 text-foreground" />
    <AtlasMark class="size-5 text-secondary-foreground" />
    <AtlasMark class="size-5 text-muted-foreground" />
  </div>
{:else if story === "components-atlasmark--badge"}
  <AtlasBadge />
{:else if story === "components-atlasmark--wordmark"}
  <AtlasWordmark />
{:else if story === "components-atlasmark--badge-tones"}
  <div class="flex items-center gap-4">
    <AtlasBadge data-testid="theme" />
    <AtlasBadge data-testid="app-icon" tone="app-icon" />
    <AtlasBadge tone="app-icon" class="size-12 [&_svg]:size-6" />
  </div>
{:else if story === "components-atlasmark--lockups"}
  <div class="flex flex-col items-start gap-4">
    <div class="flex flex-col items-center gap-3">
      <AtlasBadge />
      <span class="heading">Sign in to Atlas</span>
    </div>
    <AtlasWordmark />
  </div>
{:else if story === "components-avatar--default"}
  {@render avatarDemo("md", "Ada Lovelace")}
{:else if story === "components-avatar--with-image"}
  {@render avatarDemo("md", "Ada Lovelace", PHOTO)}
{:else if story === "components-avatar--error-state"}
  {@render avatarDemo("md", "Ada Lovelace", "data:image/png;base64,broken")}
{:else if story === "components-avatar--sizes"}
  <div class="flex items-center gap-3">
    {#each AVATAR_SIZES as size (size)}
      {@render avatarDemo(size, "Ada Lovelace")}
    {/each}
  </div>
{:else if story === "components-avatar--group"}
  <AvatarGroup>
    {#each AVATAR_PEOPLE.slice(0, 3) as name (name)}
      <Avatar>
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
    {/each}
    <AvatarGroupCount>+2</AvatarGroupCount>
  </AvatarGroup>
{:else if story === "components-avatar--many-items"}
  <AvatarGroup>
    {#each Array.from({ length: 12 }, (_, i) => AVATAR_PEOPLE[i % AVATAR_PEOPLE.length]) as name, i (i)}
      <Avatar>
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
    {/each}
    <AvatarGroupCount>+38</AvatarGroupCount>
  </AvatarGroup>
{:else if story === "components-avatarstack--default"}
  {@render avatarStackDemo(5, "md")}
{:else if story === "components-avatarstack--empty"}
  {@render avatarStackDemo(0, "md")}
{:else if story === "components-avatarstack--single"}
  {@render avatarStackDemo(1, "md")}
{:else if story === "components-avatarstack--large"}
  {@render avatarStackDemo(5, "lg")}
{:else if story === "components-avatarstack--many-items"}
  {@render avatarStackDemo(12, "md")}
{:else if story === "components-breadcrumb--default"}
  {@render breadcrumbDemo(["Acme", "Projects", "atlas"], false)}
{:else if story === "components-breadcrumb--single"}
  {@render breadcrumbDemo(["Settings"], false)}
{:else if story === "components-breadcrumb--collapsed"}
  {@render breadcrumbDemo(["Acme", "Projects", "atlas", "Sessions", "Refactor settings"], true)}
{:else if story === "components-breadcrumb--many-items"}
  {@render breadcrumbDemo(["Acme", "Projects", "atlas", "Sessions", "March", "Week 2", "Refactor settings"], false)}
{:else if story === "components-breadcrumb--long-text"}
  <div class="w-80">
    {@render breadcrumbDemo(["Acme Corporation International", "Projects", "Refactor the settings panel so every section uses the shared card"], false)}
  </div>
{:else if story === "components-callout--default"}
  <div class="w-96">
    <Callout tone="neutral">You have 3 free reviews left this month.</Callout>
  </div>
{:else if story === "components-callout--tones"}
  <div class="flex w-96 flex-col gap-2">
    {#each TONES as tone (tone)}
      <Callout {tone}>{tone}{#if tone}{": the gateway answered in 2.4s."}{/if}</Callout>
    {/each}
  </div>
{:else if story === "components-callout--error-state"}
  <div class="w-96">
    <Callout tone="error">The gateway refused the key. Check it in Settings → Agents.</Callout>
  </div>
{:else if story === "components-callout--with-action"}
  <div class="w-96">
    <Callout tone="info" action={tryAction}>A new model is available for this project.</Callout>
  </div>
{:else if story === "components-callout--custom-icon"}
  <div class="w-96">
    <Callout icon={Sparkles}>You have 3 free reviews left this month.</Callout>
  </div>
{:else if story === "components-callout--no-icon"}
  <div class="w-96">
    <Callout icon={false}>You have 3 free reviews left this month.</Callout>
  </div>
{:else if story === "components-callout--long-text"}
  <div class="w-96">
    <Callout tone="warning" action={detailsAction}>This project's sandbox could not start because the container image is missing a dependency the agent needs. Sessions in this project will run without a sandbox until it is fixed, which means commands run directly on your machine.</Callout>
  </div>
{:else if story === "components-callout--recipe"}
  <!-- svelte-ignore a11y_invalid_attribute -->
  <a href="#" class={calloutVariants({ tone: "success" }) + " w-96"}>Deployed. Open the preview →</a>
{:else if story === "components-callout--tucked"}
  <div class="flex w-[28rem] flex-col">
    <Callout variant="tucked" tone="warning" icon={GitBranch} action={tuckedActions}>The last turn moved this checkout to fix/session-restore.</Callout>
    {@render composer()}
  </div>
{:else if story === "components-callout--tucked-tones"}
  <div class="flex w-[28rem] flex-col gap-6">
    {#each TONES as tone (tone)}
      <div class="flex flex-col">
        <Callout variant="tucked" {tone}>{tone}{#if tone}{": another process is writing this session, so sending from here would fork it into two histories."}{/if}</Callout>
        {@render composer()}
      </div>
    {/each}
  </div>
{:else if story === "components-callout--animated"}
  <div class="flex w-96 flex-col items-start gap-3">
    <Button size="xs" variant="outline" onclick={() => (replayRun += 1)}>Show again</Button>
    {#key replayRun}
      <Callout animate icon={MoonStar}>Woke after 21m · picking the reply back up</Callout>
    {/key}
  </div>
{:else if story === "components-code--default"}
  <Code variant="inline">~/.agents/skills</Code>
{:else if story === "components-code--in-sentence"}
  <p class="body w-96 text-secondary-foreground">
    Skills live in <Code variant="inline">~/.agents/skills</Code>, and the session ID is <Code>0O1lI-8f3a</Code>.
  </p>
{:else if story === "components-code--block"}
  <pre class="w-96"><Code variant="block">{"bun run build-storybook\nbun run storybook:smoke"}</Code></pre>
{:else if story === "components-code--long-text"}
  <pre class="w-96"><Code variant="block">{"cargo test -p atlas-native-agent --test engine_turn -- --nocapture --test-threads=1 2>&1 | tee /tmp/engine-turn.log"}</Code></pre>
{:else if story === "components-code--diff"}
  <div class="flex flex-col gap-1">
    <DiffStat added={12} removed={3} />
    <DiffStat added={1204} removed={987} />
    <DiffStat added={0} removed={0} />
  </div>
{:else if story === "components-code--diff-options"}
  <div class="flex w-72 flex-col gap-3 text-secondary-foreground">
    <div class="flex items-center justify-between gap-4">
      <span class="caption">compact</span>
      <DiffStat added={12480} removed={1204000} compact label="12,480 added, 1,204,000 removed" />
    </div>
    <div class="flex items-center justify-between gap-4">
      <span class="caption">hideZero</span>
      <DiffStat added={42} removed={0} hideZero label="42 added, 0 removed" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="caption">layout="aligned"</span>
      {#each DIFF_ROWS as [path, a, r] (path)}
        <div class="flex items-center justify-between gap-4 text-xs">
          <span class="truncate">{path}</span>
          <DiffStat
            added={a}
            removed={r}
            layout="aligned"
            compact
            hideZero
            label={`${path}: ${a} added, ${r} removed`}
          />
        </div>
      {/each}
    </div>
  </div>
{:else if story === "components-code--fence"}
  <div class="flex w-120 flex-col gap-3 text-sm text-foreground">
    <p class="my-0">Can you try this guard before the lookup?</p>
    <CodeFence language="ts"><code class="hljs language-ts"><span class="hljs-keyword">if</span> (!project) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;{"\n"}<span class="hljs-keyword">const</span> sessions = <span class="hljs-title function_">listSessions</span>(project.<span class="hljs-property">id</span>);</code></CodeFence>
    <CodeFence><code>bun run test src/ui/kbd.test.tsx</code></CodeFence>
  </div>
{:else if story === "components-collapsible--default"}
  {@render collapsibleDemo(false, false, 3)}
{:else if story === "components-collapsible--open"}
  {@render collapsibleDemo(true, false, 3)}
{:else if story === "components-collapsible--disabled"}
  {@render collapsibleDemo(false, true, 3)}
{:else if story === "components-collapsible--many-items"}
  {@render collapsibleDemo(true, false, 12)}
{:else if story === "components-emptystate--default"}
  <div class="w-96 rounded-md border border-border">
    <EmptyState
      icon={MessageSquare}
      title="No sessions in the last 7 days"
      description="Sessions you start or that are shared with you show up here."
    />
  </div>
{:else if story === "components-emptystate--with-action"}
  <div class="w-96 rounded-md border border-border">
    <EmptyState
      icon={MessageSquare}
      title="No sessions in the last 7 days"
      description="Sessions you start or that are shared with you show up here."
      action={newSessionAction}
    />
  </div>
{:else if story === "components-emptystate--title-only"}
  <div class="w-96 rounded-md border border-border">
    <EmptyState title="No sessions in the last 7 days" />
  </div>
{:else if story === "components-emptystate--no-results"}
  <div class="w-96 rounded-md border border-border">
    <EmptyState
      icon={SearchX}
      title="No sessions match “settngs”"
      description="Check the spelling, or search every project."
      action={searchEverywhereAction}
    />
  </div>
{:else if story === "components-emptystate--long-text"}
  <div class="w-96 rounded-md border border-border">
    <EmptyState
      icon={Inbox}
      title="No pull requests waiting for your review in any project attached to this session"
      description="Requests from teammates land here as soon as GitHub tells us about them. Connect another organisation in Settings if you expected to see something."
    />
  </div>
{:else if story === "components-emptystate--custom-icon"}
  <div class="w-96 rounded-md border border-border">
    <EmptyState
      title="No Anthropic models yet"
      description="Add an API key in Settings and its models show up here."
    >
      {#snippet iconElement()}
        <AnthropicMark title="" class="size-4" />
      {/snippet}
    </EmptyState>
  </div>
{:else if story === "components-gochevron--default"}
  {@render goRow("Open session")}
{:else if story === "components-gochevron--bare"}
  <GoChevron />
{:else if story === "components-gochevron--long-text"}
  {@render goRow("Refactor the settings panel so every row reads from one store selector")}
{:else if story === "components-gochevron--many-items"}
  <div class="flex flex-col gap-1">
    {#each ["Sessions", "Projects", "Members", "Usage", "Billing"] as label (label)}
      {@render goRow(label)}
    {/each}
  </div>
{:else if story === "components-mailboxicon--default"}
  <MailboxIcon size={20} />
{:else if story === "components-mailboxicon--sizes"}
  <div class="flex items-center gap-3 text-secondary-foreground">
    {#each [12, 14, 16, 20, 24] as size (size)}
      <MailboxIcon {size} />
    {/each}
  </div>
{:else if story === "components-mailboxicon--driven-by-parent"}
  <button
    type="button"
    class="label inline-flex h-control-md items-center gap-1.5 rounded border border-border px-2.5 transition-colors duration-fast ease-out-strong hover:bg-element-hover"
    onmouseenter={() => mailboxRef?.startAnimation()}
    onmouseleave={() => mailboxRef?.stopAnimation()}
  >
    <MailboxIcon bind:this={mailboxRef} controlled size={14} />
    Inbox
  </button>
{:else if story === "components-messagesquaremoreicon--default"}
  <MessageSquareMoreIcon size={14} />
{:else if story === "components-messagesquaremoreicon--sizes"}
  <div class="flex items-center gap-3 text-secondary-foreground">
    {#each [12, 14, 16, 20, 24] as size (size)}
      <MessageSquareMoreIcon {size} />
    {/each}
  </div>
{:else if story === "components-messagesquaremoreicon--driven-by-parent"}
  <button
    type="button"
    class="label inline-flex h-control-md items-center gap-1.5 rounded border border-border px-2.5 transition-colors duration-fast ease-out-strong hover:bg-element-hover"
    onmouseenter={() => messageRef?.startAnimation()}
    onmouseleave={() => messageRef?.stopAnimation()}
  >
    <MessageSquareMoreIcon bind:this={messageRef} controlled size={14} />
    Comments
  </button>
{:else if story === "patterns-datatable--default"}
  {@render dataTableDemo(makeRows(8), "max-h-96", true, true, true)}
{:else if story === "patterns-datatable--empty"}
  {@render dataTableDemo([], "max-h-96", true, true, true)}
{:else if story === "patterns-datatable--many-items"}
  {@render dataTableDemo(makeRows(60), "max-h-96", true, true, true)}
{:else if story === "patterns-datatable--bare"}
  {@render dataTableDemo(makeRows(8), "max-h-96", false, false, false)}
{:else if story === "patterns-datatable--long-text"}
  {@render dataTableDemo(longRows(), "max-h-96", true, true, true)}
{:else if story === "patterns-datatable--narrow"}
  {@render dataTableDemo(makeRows(8), "max-h-96 w-80", true, true, true)}
{:else if story === "patterns-datatable--server-sorted"}
  <DataTable
    class="max-h-96"
    rows={serverRows}
    columns={[
      { id: "session", header: "Session", cell: dtSession, sortValue: (r: DtRow) => r.session },
      { id: "author", header: "Author", cell: dtAuthor, sortValue: (r: DtRow) => r.author, class: "hidden @md:table-cell" },
      { id: "model", header: "Model", cell: dtModel, class: "hidden @lg:table-cell" },
      { id: "tokens", header: "Tokens", cell: dtTokens, sortValue: (r: DtRow) => r.tokens, align: "right" as const },
      { id: "cost", header: "Cost", cell: dtCost, sortValue: (r: DtRow) => r.cost, align: "right" as const },
    ]}
    rowId={(r) => r.id}
    sort={serverSortState}
    onSortChange={(next) => (serverSortState = next)}
    manualSorting
    toolbar={serverToolbar}
  />
{:else if story === "patterns-segmented--default"}
  <UnderlineTabs options={SEG_TABS} bind:value={segSessions} />
{:else if story === "patterns-segmented--many-items"}
  <UnderlineTabs options={SEG_TABS_MANY} bind:value={segMany} />
{:else if story === "patterns-segmented--filters"}
  <div class="flex flex-wrap items-center gap-2">
    <CompoundFilter label="Status">Live<Icon icon={ChevronDown} size="xs" class="text-muted-foreground" /></CompoundFilter>
    <CompoundFilter label="Author">Maya Chen<Icon icon={ChevronDown} size="xs" class="text-muted-foreground" /></CompoundFilter>
    <CompoundFilter label="Project" class="max-w-56">
      <span class="truncate">atlas-desktop-and-the-design-package</span>
      <Icon icon={ChevronDown} size="xs" class="text-muted-foreground" />
    </CompoundFilter>
  </div>
{:else if story === "patterns-segmented--icon-group"}
  <div class="flex items-start gap-4">
    <SegmentedIconGroup>
      <IconButton icon={AlignLeft} label="Align left" size="sm" aria-pressed />
      <IconButton icon={AlignCenter} label="Align centre" size="sm" />
      <IconButton icon={AlignRight} label="Align right" size="sm" />
    </SegmentedIconGroup>
    <SegmentedIconGroup orientation="vertical">
      <IconButton icon={Rows2} label="Stack" size="sm" />
      <IconButton icon={Columns2} label="Side by side" size="sm" aria-pressed />
    </SegmentedIconGroup>
  </div>
{:else if story === "patterns-segmented--disabled"}
  <SegmentedIconGroup>
    <IconButton icon={AlignLeft} label="Align left" size="sm" disabled />
    <IconButton icon={AlignCenter} label="Align centre" size="sm" disabled />
    <IconButton icon={AlignRight} label="Align right" size="sm" disabled />
  </SegmentedIconGroup>
{:else if story === "components-brandmarks--social"}
  {@render brandGallery("Social")}
{:else if story === "components-brandmarks--agents"}
  {@render brandGallery("Agents")}
{:else if story === "components-brandmarks--models"}
  {@render brandGallery("Models")}
{:else if story === "components-brandmarks--editors"}
  {@render brandGallery("Editors")}
{:else if story === "components-brandmarks--sizes"}
  <div class="flex flex-col gap-3">
    {#each ["size-3", "size-4", "size-6", "size-10"] as size (size)}
      <div class="flex items-center gap-3">
        <span class="caption w-14">{size}</span>
        {#each EVERY_MARK as [name, Mark], i (`${name}-${i}`)}
          <Mark class={size} />
        {/each}
      </div>
    {/each}
  </div>
{:else if story === "components-brandmarks--on-card"}
  <div class="flex w-fit flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-4 text-muted-foreground">
    {#each EVERY_MARK as [name, Mark], i (`${name}-${i}`)}
      <Mark class="size-5" />
    {/each}
  </div>
{:else if story === "components-brandmarks--titled-model-marks"}
  <div class="flex items-center gap-3 text-foreground">
    <ClaudeMark title="Claude" class="size-5" />
    <OpenAIMark title="OpenAI" class="size-5" />
    <GeminiMark title="Gemini" class="size-5" />
    <GoogleMark title="Google" class="size-5" />
    <OpenAIMark class="size-5" data-testid="decorative" />
  </div>
{:else if story === "components-brandmarks--in-buttons"}
  <div class="flex w-64 flex-col gap-2">
    {#each SOCIAL.slice(0, 2) as [name, Mark] (name)}
      <button
        type="button"
        class="label flex h-control-lg items-center justify-center gap-2 rounded border border-border hover:bg-element-hover"
      >
        <Mark class="size-3.5" />
        Continue with {name}
      </button>
    {/each}
  </div>
{/if}
