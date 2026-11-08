// `useTheme`, ported from `lib/theme.tsx`. The React hook reads a context that
// `ThemeProvider` fills. The Svelte `ThemeProvider` (f8 deps) writes only
// `data-appearance` and `data-theme` on <html> and provides no context, so the
// state lives here, shared by every caller. It reads and writes the same storage
// key and attribute as the provider and `themeInitScript`.

import { STORAGE_KEY } from "../../lib/theme-script";

/** The user's choice. */
export type ThemeSetting = "light" | "dark" | "system";

/** What a setting resolves to. */
export type Appearance = "light" | "dark";

export interface ThemeValue {
  /** What the user chose. */
  readonly setting: ThemeSetting;
  /** What that resolves to right now. */
  readonly appearance: Appearance;
  setSetting: (next: ThemeSetting) => void;
  /** Flips between the two appearances, leaving "system" behind. */
  toggle: () => void;
}

const SETTINGS: ReadonlyArray<ThemeSetting> = ["light", "dark", "system"];

function isThemeSetting(value: unknown): value is ThemeSetting {
  return typeof value === "string" && SETTINGS.includes(value as ThemeSetting);
}

function systemAppearance(): Appearance {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function storedSetting(): ThemeSetting {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isThemeSetting(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

let setting = $state<ThemeSetting>("system");
let appearance = $state<Appearance>("dark");
let started = false;

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  const next = storedSetting();
  setting = next;
  appearance = next === "system" ? systemAppearance() : next;
  // Only "system" cares what the OS is doing.
  const query = window.matchMedia("(prefers-color-scheme: light)");
  query.addEventListener("change", () => {
    if (setting === "system") appearance = query.matches ? "light" : "dark";
  });
}

function setSetting(next: ThemeSetting) {
  setting = next;
  appearance = next === "system" ? systemAppearance() : next;
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-appearance", appearance);
  }
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // A blocked storage API is not a reason to refuse to change theme.
  }
}

/** The theme control. Call it during component initialisation, like the React hook. */
export function useTheme(): ThemeValue {
  start();
  return {
    get setting() {
      return setting;
    },
    get appearance() {
      return appearance;
    },
    setSetting,
    toggle() {
      setSetting(appearance === "dark" ? "light" : "dark");
    },
  };
}
