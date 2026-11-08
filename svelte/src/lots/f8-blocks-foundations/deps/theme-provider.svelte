<script lang="ts">
  // Adapter for the package's `ThemeProvider` (src/lib/theme.tsx), for the one
  // story that mounts it. It draws no DOM of its own. It resolves the stored
  // setting to a literal appearance and writes `data-appearance` and
  // `data-theme` on <html>; while the setting is "system" it follows the OS.
  import type { Snippet } from "svelte";
  import { STORAGE_KEY } from "../../../lib/theme-script";

  type ThemeSetting = "light" | "dark" | "system";
  type Appearance = "light" | "dark";

  interface Props {
    /** A built-in theme's id, as in themes.css. */
    theme?: string;
    children?: Snippet;
  }

  let { theme = "atlas", children }: Props = $props();

  let setting = $state<ThemeSetting>("system");
  let appearance = $state<Appearance>("dark");

  function systemAppearance(): Appearance {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function storedSetting(): ThemeSetting {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    } catch {
      return "system";
    }
  }

  $effect(() => {
    const next = storedSetting();
    setting = next;
    appearance = next === "system" ? systemAppearance() : next;
  });

  $effect(() => {
    if (setting !== "system") return;
    const query = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      appearance = query.matches ? "light" : "dark";
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  });

  $effect(() => {
    document.documentElement.setAttribute("data-appearance", appearance);
    document.documentElement.setAttribute("data-theme", theme);
  });
</script>

{@render children?.()}
