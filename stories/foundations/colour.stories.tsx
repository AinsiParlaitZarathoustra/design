import type { Meta, StoryObj } from "@storybook/react-vite";
import themesCss from "../../src/styles/themes.css?raw";
import { BASE_RULE_REGISTRY, THEME_KEY_REGISTRY } from "../../src/theme/theme-key-registry.ts";
import { BUILT_IN_THEMES } from "../lib/themes.ts";
import { Page, Section, cssVar } from "./kit.tsx";

/** Base tokens that are not colours (they are on the other foundations pages). */
const NON_COLOUR = new Set(["radius", "tracking-normal", "spacing"]);

interface Swatch {
  name: string;
  cssVar: string;
  description?: string;
}

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
  const group = def.key.split(".")[0];
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
  .map((m) => m[1])
  .filter((v) => !known.has(v) && !NON_COLOUR.has(v.slice(2)) && !v.startsWith("--shadow-"))
  .map((v) => ({ name: v.slice(2), cssVar: v }));

function SwatchGrid({ swatches }: { swatches: Swatch[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
      {swatches.map((s) => (
        <div key={s.cssVar} className="flex min-w-0 items-start gap-2.5">
          <span
            aria-hidden
            className="size-10 shrink-0 rounded-md border border-border-subtle"
            style={{ background: `var(${s.cssVar})` }}
          />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="label truncate">{s.name}</span>
            <code className="code truncate text-muted-foreground">{s.cssVar}</code>
            <code className="code truncate text-secondary-foreground">
              {cssVar(s.cssVar) || "unset"}
            </code>
            {s.description && <span className="caption">{s.description}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ColourPage({ theme, appearance }: { theme: string; appearance: string }) {
  const themeName = BUILT_IN_THEMES.find((t) => t.id === theme)?.name ?? theme;
  return (
    <Page
      title="Colour"
      lede={
        <>
          Every colour is a role, not a value. A theme sets a few seeds; everything else is derived
          in <code className="code">keys.toml</code>. The swatches below read the live CSS
          variables, so they follow the toolbar. Showing{" "}
          <strong className="font-semibold text-foreground">
            {themeName}, {appearance}
          </strong>
          .
        </>
      }
    >
      <Section
        title="Base tokens"
        intro={
          <>
            The shadcn set. Write them as Tailwind utilities: <code className="code">bg-card</code>,{" "}
            <code className="code">text-muted-foreground</code>.
          </>
        }
      >
        {BASE_GROUPS.map(([label, match]) => (
          <div key={label} className="flex flex-col gap-3">
            <h3 className="heading">{label}</h3>
            <SwatchGrid swatches={baseSwatches.filter((s) => match(s.name))} />
          </div>
        ))}
      </Section>
      <Section
        title="Theme keys"
        intro={
          <>
            The surfaces a theme author may need to differ from the base tokens. A key&apos;s
            variable is its dotted name with dashes: <code className="code">element.hover</code> is{" "}
            <code className="code">--element-hover</code>.
          </>
        }
      >
        {[...keyGroups].map(([group, swatches]) => (
          <div key={group} className="flex flex-col gap-3">
            <h3 className="heading capitalize">{group}</h3>
            <SwatchGrid swatches={swatches} />
          </div>
        ))}
      </Section>
      {derived.length > 0 && (
        <Section
          title="Derived"
          intro="Written by Atlas from the keys above. No theme may set these."
        >
          <SwatchGrid swatches={derived} />
        </Section>
      )}
    </Page>
  );
}

const meta = {
  title: "Foundations/Colour",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

export const Page_: StoryObj = {
  name: "Page",
  render: (_, { globals }) => (
    <ColourPage
      key={`${globals.theme}-${globals.appearance}`}
      theme={String(globals.theme ?? "atlas")}
      appearance={String(globals.appearance ?? "dark")}
    />
  ),
};
