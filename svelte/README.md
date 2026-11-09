# @tryatlas/design-svelte

A Svelte 5 component library and stylesheet. It includes buttons, inputs, dialogs, tabs, keyboard hints, and more. Every component works with 15 built-in color themes, each in dark and light.

## Install

```sh
npm install https://github.com/AinsiParlaitZarathoustra/design/releases/download/v1.0.0/tryatlas-design-svelte-1.0.0.tgz
```

Your app needs:

- **Svelte 5** (`svelte` 5.0.0 or later). This is the only peer dependency.
- **Tailwind CSS 4**, with its build plugin. The package does not install it. With Vite, install `tailwindcss` and `@tailwindcss/vite`.
- **TypeScript in `.svelte` files.** The components use `lang="ts"`, so `svelte.config.js` needs `vitePreprocess()`. SvelteKit and `create-svelte` projects already have it.
- **`lucide-svelte`**, if you use icons. The package depends on it but does not re-export it, so install it yourself.

## Set up the styles

Import the stylesheet in your main CSS file, after Tailwind:

```css
/* app.css */
@import "tailwindcss";
@import "@tryatlas/design-svelte/styles.css";
```

Then import `app.css` once, in your entry file: `import "./app.css";`

Three stylesheets are available. Import one of them, not two.

- `styles.css`: all 15 themes and all components. Use this for most apps.
- `styles-core.css`: the same components, with the default theme only. Use it when your app writes the theme variables itself, at runtime.
- `blocks.css`: the default theme and the illustration blocks only.

You do not need an extra `@source` line. The stylesheet already tells Tailwind to read the package's compiled files.

Type sizes are fixed in pixels. Spacing and some widths use `rem`, so they follow the root font size. The gallery sets `html { font-size: 13px; }`. The package does not set a root size, so set one yourself if you want the same proportions.

### Choose a theme

Set `data-theme` and `data-appearance` on `<html>`:

```html
<html lang="en" data-theme="dracula" data-appearance="light">
```

- `data-theme` takes a built-in theme id.
- `data-appearance` takes `dark` or `light`.

Set both. A theme applies only when both are set. Without them, the page uses the default theme, dark.

Built-in theme ids: `atlas` (the default look), `atlas-mono`, `catppuccin-frappe`, `catppuccin-macchiato`, `catppuccin-mocha`, `chyral`, `dracula`, `mirage`, `monokai`, `one-dark`, `phosphor`, `rose-pine`, `rose-pine-moon`, `tokyo-night`, `vesper`.

### Let the user switch appearance

`useTheme()` keeps a `light`, `dark`, or `system` choice. It sets `data-appearance` and saves the choice in `localStorage` under `atlas-theme`.

```svelte
<script lang="ts">
  import { Button, useTheme } from "@tryatlas/design-svelte";

  const theme = useTheme();
</script>

<Button variant="outline" onclick={theme.toggle}>
  {theme.appearance === "dark" ? "Light" : "Dark"}
</Button>
```

To avoid a flash of the wrong appearance on load, put the code from `themeInitScript()` in an inline `<script>` in your HTML head. It sets both `data-theme` and `data-appearance` before the first paint.

## Usage

Import components from the package root.

### Button

```svelte
<script lang="ts">
  import { Button } from "@tryatlas/design-svelte";
</script>

<Button onclick={() => console.log("saved")}>Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

`variant` takes `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`, `ghost-destructive`, `destructive-outline`, or `warning-outline`. `size` takes `xs`, `sm`, `md` (the default), or `lg`.

### Dialog

```svelte
<script lang="ts">
  import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@tryatlas/design-svelte";

  let open = $state(false);
</script>

<Dialog bind:open>
  <DialogTrigger>
    {#snippet child(props)}
      <Button variant="outline" {...props}>Delete project</Button>
    {/snippet}
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete this project?</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
      <Button variant="destructive" onclick={() => (open = false)}>Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

`bind:open` controls the dialog. Leave it out and the dialog keeps its own state. The close button in the corner is shown by default. Pass `showCloseButton={false}` to hide it.

`DialogTrigger` and `DialogClose` take a `child` snippet. They pass their props to it, and you spread them onto your own element, as `{...props}` does above.

### Hint

```svelte
<script lang="ts">
  import { Hint, IconButton } from "@tryatlas/design-svelte";
  import { SearchIcon } from "lucide-svelte";
</script>

<Hint label="Search" shortcut="Ctrl+K">
  <IconButton icon={SearchIcon} label="Search" variant="ghost" />
</Hint>
```

`Hint` shows its label, and the shortcut as keys, when the control is hovered or focused from the keyboard. Write a shortcut as words joined by `+`, such as `Ctrl+Shift+B`.

`IconButton` requires a `label`, because an icon-only button has no visible text.

The root entry also exports `Input`, `Badge`, `Switch`, `Spinner`, `Kbd`, `TabStrip`, the command palette, and the search overlay.

## Other entry points

Each subpath is listed in the package's `exports` map.

- `/variants`: class recipes such as `buttonVariants`, and `cn`, for code that needs class names but not components.
- `/theme`: the theme engine without the DOM. It parses a theme file, resolves it, and does color math.
- `/blocks`: illustration blocks such as `Globe`, `InfiniteSlider`, and `LogoMarquee`.
- `/session`: components and types for agent session views, such as `SessionTimeline` and `ToolCallCard`.
- `/animations`: the names and frame rates of the infinite animations.
- `/timeline-calendar`: the `TimelineCalendar` component.
- `/checkpoint-trace`: the `CheckpointTrace` component.
- `/ratchet`: `runRatchet`, a helper for a Node test that checks your own source against the design rules.
- `/keys.toml`, `/themes/*`, `/theme-rules/*`: the raw theme files, for your own tooling.

## Build from source

The build and theme scripts run with Bun.

```sh
bun install
bun run build      # writes dist/
bun run dev        # gallery at http://localhost:6100
bun run check      # type check
bun run test       # tests
```

The gallery shows each component as a story. A story has its own URL:

```
http://localhost:6100/?story=primitives-button--default&theme=dracula&appearance=light
```

To add a theme, add a `themes/<id>.toml` file and run `bun run theme`. That command regenerates the theme CSS from `keys.toml` and the files in `themes/`. Run it again after you edit either one.

## License

Apache License 2.0. See `LICENSE`. Third-party material, including some brand and provider icons, is listed in `THIRD_PARTY_NOTICES.md`.
