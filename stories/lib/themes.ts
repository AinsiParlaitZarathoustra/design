/// <reference types="vite/client" />
import { parse } from "smol-toml";

/**
 * Every built-in theme, read from `themes/*.toml` at build time, so a new
 * theme file shows up in the toolbar without anyone editing a list.
 */
export interface BuiltInTheme {
  id: string;
  name: string;
}

const files = import.meta.glob<string>("../../themes/*.toml", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const BUILT_IN_THEMES: BuiltInTheme[] = Object.values(files)
  .map((source) => {
    const toml = parse(source) as { id: string; name?: string };
    return { id: toml.id, name: toml.name ?? toml.id };
  })
  .sort((a, b) => (a.id === "atlas" ? -1 : b.id === "atlas" ? 1 : a.name.localeCompare(b.name)));

/** desktop's interface-scale presets (`features/settings/lib/ui-scale.ts`). */
export const SCALE_PRESETS = [
  { value: "0.9", title: "Compact" },
  { value: "1", title: "Default" },
  { value: "1.15", title: "Large" },
  { value: "1.3", title: "Larger" },
] as const;
