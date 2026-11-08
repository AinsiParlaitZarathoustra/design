<script lang="ts" module>
  import themesCss from "../../../styles/themes.css?raw";
  import { BASE_RULE_REGISTRY, THEME_KEY_REGISTRY } from "../../../theme/theme-key-registry";

  export interface Swatch {
    name: string;
    cssVar: string;
    description?: string;
  }

  /** Base tokens that are not colours (they are on the other foundations pages). */
  const NON_COLOUR = new Set(["radius", "tracking-normal", "spacing"]);

  const baseSwatches: Swatch[] = BASE_RULE_REGISTRY.filter(
    (r) => !NON_COLOUR.has(r.token) && !r.token.startsWith("shadow-"),
  ).map((r) => ({ name: r.token, cssVar: `--${r.token}`, description: r.description }));

  /** The base tokens, in the groups a designer looks for them in. */
  const BASE_GROUPS: Array<[string, (token: string) => boolean]> = [
    ["Surfaces and ink", (t) => /^(background|foreground|card|popover|muted|accent)/.test(t)],
    ["Actions", (t) => /^(primary|secondary|destructive)/.test(t)],
    ["Lines", (t) => /^(border|input|ring)$/.test(t)],
    ["Charts", (t) => t.startsWith("chart-")],
    ["Sidebar", (t) => t.startsWith("sidebar")],
  ];

  /** Theme keys grouped by their first segment: `syntax.keyword` is in Syntax. */
  const keyGroups = new Map<string, Swatch[]>();
  for (const def of THEME_KEY_REGISTRY) {
    const group = def.key.split(".")[0]!;
    keyGroups.set(group, [
      ...(keyGroups.get(group) ?? []),
      { name: def.key, cssVar: def.cssVar, description: def.rule.description },
    ]);
  }

  /** Variables Atlas writes from the keys but no theme may set, read off `:root` in themes.css. */
  const known = new Set([
    ...baseSwatches.map((s) => s.cssVar),
    ...THEME_KEY_REGISTRY.map((k) => k.cssVar),
  ]);
  const rootBlock = themesCss.slice(themesCss.indexOf(":root"), themesCss.indexOf("}"));
  const derived: Swatch[] = [...rootBlock.matchAll(/^\s*(--[a-z0-9-]+):/gm)]
    .map((m) => m[1]!)
    .filter((v) => !known.has(v) && !NON_COLOUR.has(v.slice(2)) && !v.startsWith("--shadow-"))
    .map((v) => ({ name: v.slice(2), cssVar: v }));
</script>

<script lang="ts">
  import Page from "./page.svelte";
  import Section from "./section.svelte";
  import { cssVar } from "./css-var";

  interface Props {
    /** The theme's display name, shown in the lede. */
    themeName: string;
    appearance: string;
  }

  let { themeName, appearance }: Props = $props();
</script>

{#snippet swatchGrid(swatches: Swatch[])}
  <div class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
    {#each swatches as s (s.cssVar)}
      <div class="flex min-w-0 items-start gap-2.5">
        <span
          aria-hidden="true"
          class="size-10 shrink-0 rounded-md border border-border-subtle"
          style:background="var({s.cssVar})"
        ></span>
        <div class="flex min-w-0 flex-col gap-0.5">
          <span class="label truncate">{s.name}</span>
          <code class="code truncate text-muted-foreground">{s.cssVar}</code>
          <code class="code truncate text-secondary-foreground">{cssVar(s.cssVar) || "unset"}</code>
          {#if s.description}<span class="caption">{s.description}</span>{/if}
        </div>
      </div>
    {/each}
  </div>
{/snippet}

{#snippet lede()}
  Every colour is a role, not a value. A theme sets a few seeds; everything else is derived in
  <code class="code">keys.toml</code>. The swatches below read the live CSS variables, so they
  follow the toolbar. Showing
  <strong class="font-semibold text-foreground">{themeName}, {appearance}</strong>.
{/snippet}

{#snippet baseIntro()}
  The shadcn set. Write them as Tailwind utilities: <code class="code">bg-card</code>,
  <code class="code">text-muted-foreground</code>.
{/snippet}

{#snippet keysIntro()}
  The surfaces a theme author may need to differ from the base tokens. A key's variable is its
  dotted name with dashes: <code class="code">element.hover</code> is
  <code class="code">--element-hover</code>.
{/snippet}

<Page title="Colour" {lede}>
  <Section title="Base tokens" intro={baseIntro}>
    {#each BASE_GROUPS as [label, match] (label)}
      <div class="flex flex-col gap-3">
        <h3 class="heading">{label}</h3>
        {@render swatchGrid(baseSwatches.filter((s) => match(s.name)))}
      </div>
    {/each}
  </Section>
  <Section title="Theme keys" intro={keysIntro}>
    {#each [...keyGroups] as [group, swatches] (group)}
      <div class="flex flex-col gap-3">
        <h3 class="heading capitalize">{group}</h3>
        {@render swatchGrid(swatches)}
      </div>
    {/each}
  </Section>
  {#if derived.length > 0}
    <Section title="Derived" intro="Written by Atlas from the keys above. No theme may set these.">
      {@render swatchGrid(derived)}
    </Section>
  {/if}
</Page>
