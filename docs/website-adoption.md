# Using the blocks on the website

The marketing site wants the illustration blocks (the globe, the dither
field, the logo marquee…) and none of the app: no Base UI, no session
blocks, no primitives. `@tryatlas/design/blocks` and `blocks.css` are that
slice. This page is how to wire them into a Next.js site and what each block
costs.

## Install

Until the `@tryatlas` npm scope exists, install from a release tag (the first
one with the blocks entry, or later):

```bash
bun add github:tryatlas/design#v<version>
bun add react react-dom motion
```

Of the package's peers, the blocks import only `react` and `motion`. The others
(`@base-ui/react`, `lucide-react`) are never loaded unless you import the root
entry; your package manager may still warn about them, and installing them
silences it without adding a byte to the page.

## CSS

```css
/* app/globals.css */
@import "tailwindcss";
@import "@tryatlas/design/blocks.css";
```

`blocks.css` carries the tokens, the Geist fonts, the Atlas theme (both
appearances) and the named utilities, and points Tailwind at the blocks'
compiled files only, so the output holds the classes the blocks use and not
the rest of the package's. Import it instead of `styles.css`, never with it.
If the site also uses the app components, or wants the other built-in themes,
import `styles.css` alone: it covers the blocks too.

The appearance follows `data-appearance` on `<html>`, and the OS setting when
it is absent. To honour a stored light/dark choice without a flash, inline
`themeInitScript` in `<head>`; it comes from a module with no `"use client"`,
so a server layout can call it:

```tsx
// app/layout.tsx (a server component)
import { ThemeProvider, themeInitScript } from "@tryatlas/design/blocks";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

`Globe` reads the appearance from `ThemeProvider`, so a page with a globe needs
one above it. The other blocks need none.

## Next.js

The barrel has no directive, and each block that uses hooks carries its own
`"use client"`, so import them straight into a server component. Don't wrap
the globe in `next/dynamic` with `ssr: false`: that drops the server-rendered
fallback, and the globe already fetches cobe (its WebGL renderer) only when
it nears the viewport.

```tsx
import { DitherField, Globe, LogoMarquee } from "@tryatlas/design/blocks";
```

## LogoMarquee

`logos` is required, and the package ships no marks: customer and partner
logos are the site's assets. Host the SVGs yourself and pass each as a node:

```tsx
<LogoMarquee
  logos={[
    { name: "Acme", mark: <img src="/logos/acme.svg" alt="" className="h-5 w-auto" /> },
    { name: "Globex", mark: <GlobexMark className="h-5 w-auto" /> },
  ]}
/>
```

`name` is the slot's accessible name, so the mark itself takes `alt=""`. A
mark drawn in `currentColor` follows the ink in both appearances. A mark whose
file is white-only needs a light twin; swap the two under
`[data-appearance="light"]`.

## What each block costs

| Block                                                  | Beyond React                                                   |
| ------------------------------------------------------ | -------------------------------------------------------------- |
| `DashedRails`, `GhostCards`, `PlusDecorator`/`Corners` | nothing: static markup, no client JS                           |
| `GradualBlur`                                          | nothing but React; stacked `backdrop-filter` layers cost paint |
| `InfiniteSlider`, `LogoMarquee`                        | `motion`                                                       |
| `Globe`                                                | cobe, fetched when the globe is within 200px of the viewport   |
| `DitherField`                                          | a 2D canvas, first painted when the main thread is idle        |

## LCP and layout shift

- Keep the headline as the LCP element. A canvas never counts toward LCP, so
  neither the globe nor the dither field can be it.
- Both render a fallback on the server that fills their box: a soft disc in
  the muted ink for the globe (which is `aspect-square`), a static dot grid
  for the dither field (which fills its `relative` parent). Nothing shifts
  when the canvas arrives; the fallback fades out under it.
- The fallback stays for good where the canvas cannot run: no WebGL (the
  globe's root gets `data-fallback`), or no 2D canvas.
- Pass `fallback` an optimised image (`next/image`) only for a hero you want
  to look finished at first byte:

```tsx
<Globe fallback={<Image src={globePoster} alt="" fill priority />} />
```

## Motion and offscreen work

- Reduced motion: the globe stops turning on its own (it can still be
  dragged) and its LIVE counts stop drifting; the dither field paints one
  still frame. The CSS pulses use `motion-safe:`.
- The dither field stops drawing while it is off screen or the tab is hidden.
- The globe keeps turning once it has loaded, and the marquee keeps moving,
  wherever they are on the page. A long page with a globe near the top pays
  for its frames while the reader is further down.
- Every endless animation is listed in `@tryatlas/design/animations`; set
  `--infinite-animation-fps` to cap the JavaScript ones (see the README's
  "Endless animations").

## Size

The repo has no size budget yet. To see what the blocks add, compare a build
with and without the import. The compiled blocks are plain ESM files under
`dist/components/blocks/`, so a bundler keeps only the blocks a page imports.
