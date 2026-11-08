# Porting kit — one lot, one worktree

Read `docs/conventions.md` first: it is the contract the witness lot proved.
This page is the workflow a lot follows.

## Boundaries

- You own only the files named in your mission. Never edit the shared files:
  `package.json`, lockfiles, `src/index.ts`, `src/variants.ts`, `gallery/registry.ts`,
  `scripts/*`, `manifest.json`, `MANIFEST.md`, `docs/*`, `tests/setup.ts`.
- New gallery entries go in **one new file**, `gallery/stories/<lot>.entries.ts`.
  The gallery discovers every `*.entries.ts` by itself.
- New tests go in **one new file**, `tests/<lot>.test.ts` (fixtures under
  `tests/fixtures/<lot>/`), so two lots never touch the same test file.
- The root exports are the pilot's: report the component names you added and
  their module paths; the pilot adds them to `src/index.ts`.
- Do not add dependencies. If a component truly needs one, stop that component
  and report the dependency instead.

## Source of truth

`/Users/maximebuffet/Documents/design` at
`0f4399832d06bc3558d35d5a96d6557f33d412b1`. Port the component, its recipe, its
story file, its fixtures and its `play` behaviour. The source CSS is already
copied; use its classes verbatim. When the source uses a Base UI primitive,
either port the same accessible contract natively (the witness `Dialog` is the
model) or mark that story `bloqué` with the reason — never fake it with a blank
component.

## Entry file

```ts
import type { StoryEntry } from "../types";
import ButtonStories from "./button-stories.svelte";

const entries: StoryEntry[] = [
  {
    id: "primitives-button--default", // exact id from storybook-static/index.json
    title: "Primitives/Button",
    name: "Default",
    component: ButtonStories as never,
    props: { story: "default" },
    mode: "element", // "page" when the story paints a portal (open dialog/menu)
    status: "porté",
  },
];

export default entries;
```

## Verification, in this order

```sh
bun run check                    # svelte-check: no error
bun run test -- tests/<lot>.test.ts
bun run build                    # svelte-package still builds
```

Visual comparison is optional but wanted; run it only for your stories, with
your own port, and shut the server down afterwards:

```sh
bun run dev -- --port 62xx        # your lot's port (given in the mission)
ATLAS_TARGET=http://localhost:62xx bun scripts/compare.ts \
  --stories <id>,<id> --theme atlas --appearance dark,light
```

The comparer writes `screenshots/<story>/<theme>-<appearance>-<scale>-<width>x<height>.*`
and merges `screenshots/report.json`. Report the percentages; do not edit the
report by hand.

## Report

Return, in the final message:

1. the files added (grouped by component / entry / test / fixture);
2. the exported names and module paths for the pilot's root entry;
3. the story ids ported, and those marked `bloqué` with the exact reason;
4. commands run with their real totals (check, tests, build, captures);
5. anything you could not finish, with the first reproducible case.
