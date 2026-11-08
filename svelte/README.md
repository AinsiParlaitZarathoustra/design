# @tryatlas/design-svelte

The Svelte 5 port of `@tryatlas/design` **0.1.15**, pinned at
`0f4399832d06bc3558d35d5a96d6557f33d412b1` of `tryatlas/design`. The React
package stays the oracle: the CSS, the theme engine, the class recipes and the
story fixtures are taken from that commit, not retyped.

This package is `private` and the mission stops at a local, verified state. No
publication, no tag, no change to the source branch.

## Quick start

```sh
bun install
bun run dev          # gallery → http://localhost:6100
bun run check        # svelte-check
bun run test         # Vitest, happy-dom
bun run theme:check  # generated theme files match keys.toml + themes/
bun run build        # svelte-package → dist
```

The gallery's story URLs mirror `storybook-static/index.json` one for one:

```
http://localhost:6100/?story=primitives-button--default&theme=atlas&appearance=dark&scale=1
http://localhost:6100/?story=primitives-dialog--open&theme=dracula&appearance=light&scale=1.15
```

Without `story`, the gallery lists every ported story and every built-in theme.

## What is in this tree

| Path | Role |
|---|---|
| `src/ui`, `src/components` | the ported components, same filenames and folders as the source |
| `src/styles`, `src/theme`, `themes/`, `theme-rules/`, `keys.toml` | copied from the pinned SHA; `themes.css` is generated |
| `gallery/` | Vite gallery, one route per source story id |
| `scripts/compare.ts` | the visual comparer (source Storybook vs gallery) |
| `scripts/manifest.ts` | export/story inventory → `manifest.json` + `MANIFEST.md` |
| `tests/` | component tests and fixtures |
| `fixtures/consumer/` | a clean Svelte consumer that installs the packed tarball |
| `docs/conventions.md` | the prop/snippet/bind conventions the port follows |
| `docs/journal.md` | append-only mission log |

## Proofs

- `bun run test`: 73 tests, 5 files.
- `bun run theme:check`: 81 keys, 15 themes, every generated file current.
- 275 captures over 52 ported stories: 272 identical, 2 within noise
  (< 0.001 %), 1 identified sub-pixel gap (Icon/Sizes in light, 0.0018 %).
  `screenshots/report.json` holds every case.
- 28/28 identical on the four witness families; 120/120 identical across the
  15 themes × 2 appearances on Button, Input, Dialog and TabStrip.
- Zoom `0.9 / 1 / 1.15 / 1.3` and viewports `375 / 768 / 1280` captured for the
  zoom- and layout-sensitive stories.
- `fixtures/consumer`: installed from `design-svelte-0.1.15.tgz`, `svelte-check`
  clean, Vite build clean, SSR through `svelte/server` renders the root, the
  dialog and the tab strip.

`scripts/compare.ts` needs both servers:

```sh
# source repo
bun run build-storybook
bun scripts/serve-static.ts storybook-static 6006   # from this package's scripts/
# this package
bun run dev
# then
bun run screenshots
```

Captures land in `screenshots/<story>/<theme>-<appearance>-<scale>.{source,target,diff}.png`
with `screenshots/report.json`.

## Honest coverage

The witness lot — `Button`, `Input`, `Dialog`, `TabStrip`, plus `Icon`,
`IconButton`, `Kbd`, `KbdCombo`, `KbdKeys`, `Badge`, `Hint`, `Spinner` and the
class recipes — is ported and verified: 29 of 758 public exports (type
re-exports included) and 52 of 853 stories. The rest is inventoried in
`manifest.json`; each missing row names the wave that owns it.
`TabStrip.renderTab` and the tooltip composition are the known API gaps, both
listed in `docs/conventions.md`.
