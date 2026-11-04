# @tryatlas/design

Atlas's design system, as one package: the primitives, the tokens, the
themes and the ratchet that keeps them honest. Desktop, the web app and the
docs all install it, so a button looks the same in all three because it is
the same button.

Desktop is the source of truth ([ADR-0027][adr]). Everything here was
copied out of the desktop app and is changed here from now on; desktop
installs it back.

## What is in it

| Path                        | What it is                                                                                                                                                           |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/ui/`                   | Desktop's primitives, on `@base-ui/react`: button, dialog, menus, select, tooltip, popover, segmented, switch, slider, command, colour picker…                       |
| `src/components/`           | Components only the old `standards` gallery had (avatar, toast, table, tag, sheet, tabs…, plus `patterns/`, `blocks/` and `shell/`), restyled to desktop's language. |
| `src/styles/`               | `styles.css` (the entry), `tokens.css`, `utilities.css`, and the generated `themes.css`                                                                              |
| `src/theme/`                | The theme engine's pure half: the resolver, the colour maths, the generated key registry                                                                             |
| `src/ratchet/`              | The design-system ratchet, as rules and a runner                                                                                                                     |
| `keys.toml`                 | **The one hand-edited source of every derived colour**                                                                                                               |
| `themes/*.toml`             | The built-in themes                                                                                                                                                  |
| `theme-rules/*.txt`         | Generated tables desktop's Rust reads                                                                                                                                |
| `scripts/generate-theme.ts` | The generator                                                                                                                                                        |
| `stories/`                  | Storybook: the foundations pages and a story for every `src/ui` primitive and `src/components` component (see [Storybook](#storybook))                               |

## The boundary rule

A component belongs here if it renders from its props alone. Anything that
calls `invoke()`, `fetch`, a router or a store stays in its app.

The shell components (`AppShell`, `Sidebar`, `SettingsShell`,
`OrgSwitcher`, `CommandMenu`…) need links, so they take them through
`LinkProvider` instead of importing a router:

```tsx
import { LinkProvider } from "@tryatlas/design"

// TanStack Router
<LinkProvider
  Link={({ href, ...props }) => <Link to={href} {...props} />}
  location={useRouterState({ select: (s) => s.location })}
  navigate={(href) => router.navigate({ to: href })}
>
```

Without a provider, links are plain `<a href>` and nothing is "active".

## Exports

```jsonc
{
  ".": "components, lib helpers (cn, motion, LinkProvider…)",
  "./variants": "the server-safe subset: the cva recipes (buttonVariants…), Icon, cn",
  "./styles.css": "the stylesheet",
  "./theme": "resolveTheme, resolveBase, themeFromToml, the registry, colour utils",
  "./ratchet": "runRatchet, formatViolations, RULES, ATLAS_PREFIX_RULE",
  "./timeline-calendar": "TimelineCalendar, which needs @tanstack/react-virtual",
  "./keys.toml": "the derivation source",
  "./themes/*": "the built-in theme files, e.g. ./themes/dracula.toml",
  "./theme-rules/*": "theme-keys.txt and base-rules.txt",
}
```

Peer dependencies, never bundled: `react`, `react-dom`, `@base-ui/react`,
`lucide-react`, `motion`, and optionally `@tanstack/react-virtual` — only
`./timeline-calendar` imports it, which is why it is an entry of its own.

### Server components

Every module that uses hooks, context or a Base UI part starts with
`"use client"`, and nothing touches `window` at import time. That makes the
components safe to render from a React Server Component, but it does not make
the root entry a good import there:

- The root is a barrel of client modules, so importing it from a server
  component puts the whole package in the client graph.
- A function exported from a client module reaches a server component as a
  client reference, which cannot be called. `buttonVariants()` from the root
  throws on the server.

So import by what the file is:

```tsx
// A server component: the class recipes, Icon and cn. No "use client"
// anywhere behind this entry (a test holds it).
import { BookIcon } from "lucide-react";
import { buttonVariants, Icon } from "@tryatlas/design/variants";

<a href="/docs" className={buttonVariants({ variant: "outline", size: "sm" })}>
  <Icon icon={BookIcon} size="sm" /> Docs
</a>;

// A client component ("use client" at its top): anything, from the root.
import { Button, Dialog, Tooltip } from "@tryatlas/design";
```

The recipes on `./variants` are `buttonVariants`, `iconButtonVariants`,
`badgeVariants`, `kbdVariants`, `inputVariants`, `toggleVariants`,
`tabsListVariants` and `calloutVariants`. The root re-exports the same
functions, so client code can keep importing them from there.

## How themes work

```
keys.toml + themes/*.toml
        │  bun run theme
        ├──▶ src/theme/theme-key-registry.ts   the resolver's rules
        ├──▶ theme-rules/*.txt                 desktop's Rust interpreter
        └──▶ src/styles/themes.css             every built-in theme, resolved
```

A theme is a shadcn base (`background`, `primary`, `foreground`… every one
optional), an optional eight-hue palette, and optional theme keys
(`element.hover`, `syntax.keyword`). Whatever a theme leaves out is derived
by the rules in `keys.toml`, in one place ([ADR-0022][adr22]).

Those rules run in three places, and all three are generated from the same
file:

- **`themes.css`**, for anything that only shows built-in themes (web, docs,
  Storybook). One block per theme and appearance, fully resolved; no colour
  code runs. `:root` is Atlas dark.
- **The TypeScript resolver** (`@tryatlas/design/theme`), for a user theme
  or a live theme-editor preview.
- **The Rust tables**, which desktop's Rust interpreter runs for import and
  export. The golden fixture `theme-rules/base-derivation.json` (exported as `@tryatlas/design/theme-rules/base-derivation.json`) holds both
  interpreters to the same answers.

Pick a theme with two attributes, on `<html>` or on any element:

```html
<html data-theme="tokyo-night" data-appearance="dark"></html>
```

A theme key's CSS variable is its dotted name with `.` and `_` turned into
`-`, with no prefix: `element.hover` is `--element-hover`. Tailwind sees
them through `utilities.css`, so you write `bg-element-hover`, never the
variable. A test fails if two names would write the same variable.

The palette's eight hues are identities (a label, a project), not
statuses, and reach Tailwind as `bg-hue-red`, `text-hue-blue`… through the
key that is a plain alias of each hue, plus `hue-grey` for no hue.

To change a rule or a built-in theme, edit `keys.toml` or `themes/`, run
`bun run theme`, and commit what it writes. `bun run theme:check` (and the
test suite) fails when a generated file is stale. Never derive a theme colour
with `color-mix()` in CSS; a tint at a call site is fine.

## Using it

In the consumer's entry CSS, after Tailwind:

```css
@import "tailwindcss";
@import "@tryatlas/design/styles.css";
```

`styles.css` does not import Tailwind itself, so there is one preflight. It
brings Geist and Geist Mono (via `@fontsource-variable`, so they work
offline in Tauri) and an `@source` for the package's compiled files, so your
Tailwind keeps the classes only the package uses.

- **Desktop** imports components and styles from the package and pins an
  exact version. `bun run theme:keys` copies `keys.toml`, the built-in themes
  and the Rust tables from `node_modules` into `crates/atlas-theme/`, so the
  Rust build never reads `node_modules`. It runs the ratchet from its own
  test with `runRatchet`, turning on `banAtlasPrefix` once its `--atlas-`
  rename is done.
- **Web and docs** import components and `styles.css`, and pick themes with
  `data-theme`/`data-appearance`. They need no theme code.

The ratchet, from any consumer's tests:

```ts
import { formatViolations, runRatchet } from "@tryatlas/design/ratchet";

it("holds the design system at zero", () => {
  const violations = runRatchet({
    roots: ["src/features", "src/components"],
    exemptFiles: {
      "src/brand.tsx": "Shape 2. A third party's logo; a recoloured logo is wrong.",
    },
  });
  expect(violations, formatViolations(violations)).toEqual([]);
});
```

## Installing

Until the `@tryatlas` npm scope is set up, install from a git tag:

```bash
bun add github:tryatlas/design#v0.1.2
```

Bun does not run a git dependency's build, so **a release tag carries the
built `dist/`**. Cut one from a clean `main`:

```bash
bun run release   # builds, commits dist/ on a detached HEAD, tags v<version>, pushes the tag
```

The version comes from `package.json`; bump it on `main` first.

`main` itself never holds `dist/`.

### Working on desktop and the package together

```bash
# here
bun link
bun run dev            # tsc --watch into dist/

# in the consumer
bun link @tryatlas/design
```

A linked package resolves its peers from its own `node_modules`, so while
linked the consumer must dedupe them (Vite: `resolve.dedupe` with `react`,
`react-dom`, `@base-ui/react` and `motion`), or it renders with two copies of
React and every hook throws. `bun run test:consumer` installs a packed
tarball instead, which is what a real install looks like.

## Developing

```bash
bun install
bun run typecheck
bun run test            # vitest: primitives, resolver, golden fixture, generator, ratchet
bun run build           # tsc into dist/
bun run test:consumer   # packs, installs into fixtures/consumer, builds its CSS, renders on the server
bun run format:check
```

**Why `tsc` builds it, not Vite library mode or tsdown.** The package
ships one ESM file per source file, with types, and nothing in it needs
bundling: no CSS imports in JS, no assets, no code to tree-shake that a
consumer's bundler would not shake anyway. `tsc` does exactly that, keeps
`"use client"` at the top of every file (bundlers strip module-level
directives unless a plugin puts them back), and rewrites the `.ts`/`.tsx`
import extensions to `.js` (`rewriteRelativeImportExtensions`). It is one
tool we already need for the type check, with no plugin to keep in step.

## Storybook

Storybook is the package's review surface: the foundations pages (principles,
colour, type, control heights, radius, elevation, z-index, motion, icons) and
a story for every `src/ui` primitive and every `src/components` component,
under every built-in theme. Stories live
in `stories/`, outside `src`, so they never ship in `dist/`.

```bash
bun run storybook         # dev server on http://localhost:6006
bun run build-storybook   # static build into storybook-static/ (gitignored)
bun run storybook:smoke   # after a build: fails if a primitive or component has no story
```

A primitive at `src/ui/<name>.tsx` keeps its stories in
`stories/ui/<name>.stories.tsx`, and a component at
`src/components/<group>/<name>.tsx` in
`stories/components/<group>/<name>.stories.tsx`, which must use every
component the file exports. The smoke test holds both conventions. The
ratchet scans `stories/` too.

### The toolbar, and URLs

Four globals, all of which round-trip through the URL:

| Global       | Values                                          | Reaches the DOM as                      |
| ------------ | ----------------------------------------------- | --------------------------------------- |
| `theme`      | every `id` in `themes/*.toml`                   | `data-theme` on `<html>`                |
| `appearance` | `dark`, `light`                                 | `data-appearance` on `<html>`           |
| `scale`      | `0.9`, `1`, `1.15`, `1.3` (desktop's presets)   | CSS `zoom` on `<html>`, and `--ui-zoom` |
| `viewport`   | `phone` (375), `tablet` (768), `desktop` (1280) | Storybook's viewport                    |

`scale` is a zoom rather than a root font size because desktop's interface
scale is the WebView's zoom (`applyUiScale` in desktop): the type and control
scales are in px, so a root font size would only move `rem` spacing. The
preview sets a 13px root, as desktop does, so `rem` spacing matches the app.

```
/?path=/story/primitives-button--variants&globals=theme:dracula;appearance:light
/iframe.html?id=foundations-colour--page&globals=theme:tokyo-night;appearance:dark;scale:1.15
/iframe.html?id=primitives-dialog--open&globals=viewport:phone
```

`iframe.html` renders the story alone, which is what a screenshot wants.
Overlays (dialog, popover, dropdown and context menu, tooltip, select,
command, and among the components alert dialog, combobox, sheet, toast and the
shell menus) each have an `Open` story that shows the overlay on load.

### Enumerating stories

A build writes `storybook-static/index.json`; the dev server serves the same
file at `/index.json`. Each entry has an `id`, a `title`, a `name`, a `type`
(`story` or `docs`) and the `importPath` of its file:

```bash
curl -s localhost:6006/index.json \
  | jq -r '.entries[] | select(.type == "story") | .id'
```

Feed each `id` to `iframe.html?id=<id>&globals=…` to visit every story in
every theme.

## Not here yet

- An npm release: the `@tryatlas` scope is not set up yet, so installs come from git tags.

Third-party material is listed in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

[adr]: https://github.com/pacifio/atlas/blob/main/docs/adr/0027-one-design-package-filled-from-desktop-themes-ship-as-generated-css.md
[adr22]: https://github.com/pacifio/atlas/blob/main/docs/adr/0022-a-theme-is-two-colours-and-everything-else-is-derived.md
