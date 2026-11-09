# Design system for Svelte 5

A set of ready-made components for Svelte 5: buttons, inputs, dialogs, menus, tabs, hints and more. Every component comes with 15 color themes, each in dark and light.

The library lives in the [`svelte/`](svelte/) folder.

## Install

You need Svelte 5 and Tailwind 4.

```sh
npm install https://github.com/AinsiParlaitZarathoustra/design/releases/download/v1.0.0/tryatlas-design-svelte-1.0.0.tgz
```

## Set up

Add the styles to your main CSS file:

```css
@import "tailwindcss";
@import "@tryatlas/design-svelte/styles.css";
```

Pick a theme and an appearance on `<html>`:

```html
<html data-theme="atlas" data-appearance="dark">
```

## Use a component

```svelte
<script>
  import { Button } from "@tryatlas/design-svelte";
</script>

<Button>Save</Button>
```

## Learn more

- [How to use the library](svelte/README.md): setup, themes, examples, all entry points.
- [How to write components](svelte/docs/conventions.md): the rules for contributing.
- [Releases](https://github.com/AinsiParlaitZarathoustra/design/releases): versions and known issues.

## About this repository

The Svelte library started as a port of a React design system. That original React version is still at the root of this repository, in `src/` and `stories/`. You do not need it to use the Svelte library.

## License

Apache License 2.0. See [`LICENSE`](LICENSE) and [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
