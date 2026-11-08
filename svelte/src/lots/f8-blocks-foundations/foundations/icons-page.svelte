<script lang="ts">
  import {
    Bell,
    Check,
    ChevronRight,
    Copy,
    Ellipsis,
    FileText,
    Folder,
    GitBranch,
    GitPullRequest,
    MessageSquare,
    Plus,
    RefreshCw,
    Search,
    Settings,
    Terminal,
    Trash2,
    X,
  } from "lucide-svelte";
  import Icon, { ICON_SIZES, ICON_STROKE_WIDTH, type IconSize } from "../../../ui/icon.svelte";
  import Page from "./page.svelte";
  import Section from "./section.svelte";
  import TokenTable from "./token-table.svelte";

  const USES: Record<IconSize, string> = {
    xs: "inside an xs control, a badge",
    sm: "inside sm and md controls; beside label text",
    md: "the default; inside an lg control",
    lg: "the palette, row icons in a list",
    xl: "empty states",
  };

  // The React names, with the Lucide glyph each one resolves to in this port.
  const SET = [
    { name: "Search", glyph: Search },
    { name: "Plus", glyph: Plus },
    { name: "X", glyph: X },
    { name: "Check", glyph: Check },
    { name: "ChevronRight", glyph: ChevronRight },
    { name: "MoreHorizontal", glyph: Ellipsis },
    { name: "Settings", glyph: Settings },
    { name: "Bell", glyph: Bell },
    { name: "Copy", glyph: Copy },
    { name: "Trash2", glyph: Trash2 },
    { name: "RefreshCw", glyph: RefreshCw },
    { name: "FileText", glyph: FileText },
    { name: "Folder", glyph: Folder },
    { name: "Terminal", glyph: Terminal },
    { name: "GitBranch", glyph: GitBranch },
    { name: "GitPullRequest", glyph: GitPullRequest },
    { name: "MessageSquare", glyph: MessageSquare },
  ];

  const SIZES = Object.keys(ICON_SIZES) as IconSize[];
</script>

{#snippet lede()}
  Lucide, through one wrapper: <code class="code">{'<Icon icon={Search} size="sm" />'}</code>. Five
  sizes and one stroke width, {ICON_STROKE_WIDTH}. Lucide's default of 2 reads heavy at these sizes.
  Icons take the text colour; they never carry their own.
{/snippet}

<Page title="Icons" {lede}>
  <Section title="Sizes">
    <TokenTable
      columns={["Size", "px", "Use", "Sample"]}
      rows={SIZES.map((size) => ({ name: size, value: String(ICON_SIZES[size]), use: USES[size], data: size }))}
    >
      {#snippet sample(size: IconSize)}
        <div class="flex items-center gap-2">
          <Icon icon={Search} {size} />
          <Icon icon={GitBranch} {size} />
          <Icon icon={Settings} {size} />
        </div>
      {/snippet}
    </TokenTable>
  </Section>
  <Section title="The common set" intro="Shown at md, in muted ink, as they sit in the chrome.">
    <div class="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-6">
      {#each SET as item (item.name)}
        <div
          class="flex flex-col items-center gap-2 rounded-md border border-border-subtle p-3 text-muted-foreground"
        >
          <Icon icon={item.glyph} />
          <span class="caption">{item.name}</span>
        </div>
      {/each}
    </div>
  </Section>
  <Section
    title="Animated glyphs"
    intro="A few controls want the glyph itself to carry the state: copy, trash, send, the rail. See Primitives / AnimatedIcon."
  ></Section>
</Page>
