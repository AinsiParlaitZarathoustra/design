import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { parse as parseToml } from "smol-toml"
import {
  FONT_TOKENS,
  cssVarCollisions,
  readSource,
  staleOutputs,
} from "../scripts/generate-theme.ts"
import {
  DERIVED_VAR_REGISTRY,
  THEME_KEY_REGISTRY,
} from "../src/theme/theme-key-registry.ts"

const ROOT = path.join(import.meta.dirname, "..")
const read = (file: string) => readFileSync(path.join(ROOT, file), "utf8")

describe("the theme generator", () => {
  /**
   * Every generated file — the TS registry, the two Rust tables desktop copies
   * and themes.css — matches what keys.toml and themes/ produce now. To fix a
   * failure, run `bun run theme` and commit the result.
   */
  it("has nothing stale", async () => {
    expect(await staleOutputs()).toEqual([])
  })

  it("writes one themes.css block per built-in theme and appearance", () => {
    const themes = read("src/styles/themes.css")
    const ids = new Set(
      [
        ...themes.matchAll(
          /\[data-theme="([^"]+)"\]\[data-appearance="(dark|light)"\]/g
        ),
      ].map((m) => `${m[1]}/${m[2]}`)
    )
    expect(ids.size).toBe(2 * themeIds().length)
    expect(themes).toMatch(
      /^:root,\n\[data-theme="atlas"\]\[data-appearance="dark"\] \{/m
    )
    expect(themes).not.toContain("--atlas-")
  })
})

function themeIds(): string[] {
  const dir = path.join(ROOT, "themes")
  return readdirSync(dir)
    .filter((file) => file.endsWith(".toml"))
    .map((file) => (parseToml(read(`themes/${file}`)) as { id: string }).id)
}

/**
 * ADR-0027 drops the `--atlas-` prefix, so a theme key's variable now shares
 * one namespace with everything else on `:root`. Two names landing on one
 * variable would let the second silently win; nothing renders wrong enough to
 * notice until a theme changes one of them.
 */
describe("theme variable names", () => {
  const source = readSource()
  const baseTokens = source.baseRules.map((rule: { name: string }) => rule.name)
  const vars = [...THEME_KEY_REGISTRY, ...DERIVED_VAR_REGISTRY].map(
    (d) => d.cssVar
  )

  it("are the dotted name with `.` and `_` as `-`, and no prefix", () => {
    for (const definition of THEME_KEY_REGISTRY) {
      expect(definition.cssVar).toBe(
        `--${definition.key.replace(/[._]/g, "-")}`
      )
    }
    expect(
      THEME_KEY_REGISTRY.find((d) => d.key === "element.hover")?.cssVar
    ).toBe("--element-hover")
  })

  it("collide with no other key and no shadcn base token", () => {
    expect(new Set(vars).size).toBe(vars.length)
    expect(
      cssVarCollisions(
        [...baseTokens, ...FONT_TOKENS],
        [...source.keys, ...source.derived].map(
          (entry: { name: string }) => entry.name
        )
      )
    ).toEqual([])
    // The checker itself catches both kinds.
    expect(
      cssVarCollisions(["sidebar-border"], ["sidebar.border", "a.b_c", "a.b.c"])
    ).toHaveLength(2)
  })

  it("collide with no variable the package's own stylesheets define", () => {
    const declared = new Set(
      ["src/styles/tokens.css", "src/styles/utilities.css"].flatMap((file) =>
        [...read(file).matchAll(/^\s*(--[a-z0-9-]+)\s*:/gm)].map((m) => m[1])
      )
    )
    expect(vars.filter((name) => declared.has(name))).toEqual([])
  })
})
