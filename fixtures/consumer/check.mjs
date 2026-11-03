/**
 * The package as an installed dependency sees it: resolve every export from
 * node_modules, render a component on the server (no window, as Next.js
 * would), resolve a built-in theme, and check the consumer's Tailwind build
 * kept a class only the package uses.
 */
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { createElement } from "react"
import { renderToString } from "react-dom/server"
import { parse } from "smol-toml"

const design = await import("@tryatlas/design")
const theme = await import("@tryatlas/design/theme")
const ratchet = await import("@tryatlas/design/ratchet")

// Server render: nothing in the component entry may touch `window` on import.
const html = renderToString(createElement(design.Button, null, "Hi"))
assert.match(html, /data-slot="button"/, "Button renders on the server")

// A built-in theme from the shipped TOML, through the shipped resolver.
const require = createRequire(import.meta.url)
const toml = readFileSync(require.resolve("@tryatlas/design/themes/dracula.toml"), "utf8")
const resolved = theme.resolveTheme(theme.themeFromToml(parse(toml)), "dark")
assert.ok(resolved.cssVars["--element-hover"], "theme keys resolve to unprefixed variables")
assert.equal(typeof ratchet.runRatchet, "function")

for (const file of ["keys.toml", "theme-rules/theme-keys.txt", "theme-rules/base-rules.txt"]) {
  assert.ok(readFileSync(require.resolve(`@tryatlas/design/${file}`), "utf8").length > 0, file)
}

const css = readFileSync("out/app.css", "utf8")
// Sentinel: only the package's Button uses this class.
assert.ok(css.includes(".aria-pressed\\:bg-element-selected"), "package classes survive the consumer's build")
assert.ok(css.includes('[data-theme="dracula"][data-appearance="light"]'), "themes.css is included")
assert.ok(css.includes("Geist Variable"), "Geist is the sans face")

console.log("consumer fixture: ok")
