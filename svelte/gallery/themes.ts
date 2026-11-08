/// <reference types="vite/client" />

/**
 * Every built-in theme, read from `themes/*.toml` at build time, so a new theme
 * file shows up in the gallery without anyone editing a list (as the source's
 * `stories/lib/themes.ts` does).
 */
export interface BuiltInTheme {
  id: string;
  name: string;
}

const files = import.meta.glob<string>("../themes/*.toml", {
  query: "?raw",
  import: "default",
  eager: true,
});

function field(source: string, key: string): string | undefined {
  return source.match(new RegExp(`^${key}\\s*=\\s*"([^"]*)"`, "m"))?.[1];
}

export const BUILT_IN_THEMES: BuiltInTheme[] = Object.values(files)
  .map((source) => ({ id: field(source, "id") ?? "", name: field(source, "name") ?? "" }))
  .filter((theme) => theme.id !== "")
  .map((theme) => ({ id: theme.id, name: theme.name || theme.id }))
  .sort((a, b) => (a.id === "atlas" ? -1 : b.id === "atlas" ? 1 : a.name.localeCompare(b.name)));

/** desktop's interface-scale presets (`features/settings/lib/ui-scale.ts`). */
export const SCALE_PRESETS = [
  { value: "0.9", title: "Compact" },
  { value: "1", title: "Default" },
  { value: "1.15", title: "Large" },
  { value: "1.3", title: "Larger" },
] as const;

export function isTheme(id: string): boolean {
  return BUILT_IN_THEMES.some((theme) => theme.id === id);
}
