# Conventions

How to write and change components in this library. Everything is Svelte 5.
Copy the shape of a component of the same kind.

## Where things live

- `src/ui/`: the components, one file each. A family with parts gets a folder, such as `src/ui/dialog/`.
- `src/lib/`: helpers such as `cn`, `hideOthers` and `trapFocus`.
- `src/styles/`: CSS and design tokens.
- `gallery/`: story pages. Not published.
- `tests/`: Vitest tests.

## Svelte 5 only

Use runes, snippets and attachments.

```svelte
<script lang="ts">
  let { count = 0, children }: Props = $props();
  let open = $state(false);
  const doubled = $derived(count * 2);

  $effect(() => {
    const timer = setTimeout(() => (open = false), 140);
    return () => clearTimeout(timer);
  });
</script>

{@render children?.()}
```

- Take inputs with `$props()`. Use `$bindable()` for a value the parent can bind.
- An `$effect` returns its cleanup.
- Use snippets, not slots: `{@render children?.()}`.
- Do not write `on:click`, `<slot>`, `$:` or `export let`.
- Set up an element with an attachment:

```svelte
<span {@attach nameChild}>...</span>
```

Older code still uses `use:` actions, such as `use:portal`. New code uses `{@attach}`.

## Component shape

Document the component and any prop whose meaning is not obvious.

```svelte
<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../lib/utils";
  import { buttonVariants } from "./button-variants";

  /** A button. */
  interface Props extends Omit<HTMLButtonAttributes, "class"> {
    /** Visual weight. */
    variant?: VariantProps<typeof buttonVariants>["variant"];
    size?: VariantProps<typeof buttonVariants>["size"];
    class?: string;
    children?: Snippet;
  }

  let { variant = "default", size = "md", class: className, children, ...rest }: Props = $props();
</script>

<button data-slot="button" type="button" {...rest} class={cn(buttonVariants({ variant, size }), className)}>
  {@render children?.()}
</button>
```

- Recipes live in a `*-variants.ts` file, built with `cva`.
- Destructure `class` as `className`, so it is never in `rest`.
- Put `{...rest}` before `class`. The caller can add classes, but not remove the recipe.
- Name the root with `data-slot`, such as `data-slot="dialog-title"`.

## Composition

Parts of one component share state through context. The root sets it, and each part reads it.

```ts
// src/ui/dialog/context.ts
const KEY = Symbol("dialog");

export function setDialog(api: DialogApi) {
  setContext(KEY, api);
}

export function getDialog(): DialogApi {
  const api = getContext<DialogApi | null>(KEY);
  if (!api) throw new Error("Dialog parts must be used inside <Dialog>.");
  return api;
}
```

A part that may replace its element takes a `child` snippet. It receives the attributes to spread:

```svelte
<DialogTrigger>
  {#snippet child(attrs)}
    <Button variant="outline" {...attrs}>Open</Button>
  {/snippet}
</DialogTrigger>
```

Ids that link elements come from `$props.id()`:

```ts
const titleId = `dialog-${$props.id()}-title`;
```

A component is controlled or uncontrolled:

- `defaultOpen` sets the start value once.
- `bind:open` makes it controlled.
- `onOpenChange` reports every change.

When a part wraps a caller's handler, call the caller's first and skip the default if it was prevented:

```ts
onclick: (event: MouseEvent) => {
  onclick?.(event);
  if (event.defaultPrevented) return;
  dialog.requestClose();
},
```

## Behaviour and accessibility

A modal popup (dialog, sheet, alert dialog, command palette) does two things while open. It hides the rest of the page from assistive technology, and it keeps Tab inside the popup.

```ts
$effect(() => {
  if (!popup) return;
  const showOthers = hideOthers(popup);
  const release = trapFocus(popup);
  return () => {
    release();
    showOthers();
  };
});
```

Menus follow the usual keyboard pattern:

- The down arrow opens the menu on its first row. The up arrow opens it on its last row.
- Arrows, Home, End and letter keys move between rows.
- Escape closes the menu, and focus returns to the trigger.

A hint names its control. The first button inside a `Hint` takes the hint's label, unless it already has a name.

Disabled controls set the `disabled` attribute. Style them with `data-disabled:`, such as `data-disabled:opacity-50`.

Keep the focus ring. Do not remove outlines. The global `:focus-visible` rule draws the ring for keyboard focus.

## Styling

Use Tailwind 4 classes that point at design tokens:

```svelte
<div class="rounded-xl border border-border bg-card text-foreground z-modal">
  <h2 class="heading">Rename session</h2>
  <p class="body text-secondary-foreground">Choose a new name.</p>
</div>
```

- Colours come from tokens: `bg-card`, `text-muted-foreground`, `border-border`. Do not write hex, `rgb()` or `oklch()` in a component. Brand marks, such as a provider logo, keep their own fills.
- Use the named text classes (`heading`, `body`, `eyebrow`, `caption`) and the control heights (`h-control-md`).
- A theme and an appearance are set on `<html>`:

```ts
document.documentElement.dataset.theme = "atlas";
document.documentElement.dataset.appearance = "light";
```

Never edit `src/styles/themes.css` by hand. It is generated. To change a theme, edit `themes/*.toml` or `keys.toml`, then run `npm run theme`. That script calls `bun`.

## Checks before a change lands

```sh
npm run check     # svelte-check: 0 errors
npm test          # Vitest, in happy-dom
npm run verify    # theme check, check, test and build together
```

Also run the Svelte MCP tool `svelte-autofixer` on each changed `.svelte` file, and fix what it reports.

### Tests

Put tests in `tests/<name>.test.ts`, with test-only components in `tests/fixtures/`.

```ts
import { render } from "@testing-library/svelte";
import { expect, it } from "vitest";
import Button from "../src/ui/button.svelte";

it("merges the caller's class", () => {
  const { getByRole } = render(Button, { props: { class: "w-full" } });
  expect(getByRole("button").className).toContain("w-full");
});
```

### Gallery stories

Every new component gets a story.

1. Add `gallery/stories/<name>-stories.svelte`. It takes a `story` prop and branches on it:

   ```svelte
   {#if story === "default"}
     <Button>Continue</Button>
   {:else if story === "disabled"}
     <Button disabled>Continue</Button>
   {/if}
   ```

2. Add `gallery/stories/<name>.entries.ts`. The gallery finds every `*.entries.ts` file itself. Copy an existing entry file and change it. Story ids look like `primitives-button--disabled`.
3. Set `mode: "page"` on a story that opens a portal, such as a dialog or a menu.

Export new public components from `src/index.ts`. Export server-safe class recipes from `src/variants.ts`.
