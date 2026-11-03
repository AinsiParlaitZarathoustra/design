import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

/**
 * Storybook is the package's review surface (ADR-0027): the primitives in
 * `src/ui` and the foundations pages, under every built-in theme. Stories live
 * in `stories/`, outside `src`, so `tsc -p tsconfig.build.json` never ships
 * them in `dist/`.
 */
const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  core: { disableTelemetry: true },
  // The package's own Tailwind v4 setup: `preview.css` imports Tailwind and
  // `src/styles/styles.css`, and the plugin scans the stories and `src`.
  viteFinal: (vite) => ({
    ...vite,
    plugins: [...(vite.plugins ?? []), tailwindcss()],
    build: {
      ...vite.build,
      rolldownOptions: {
        ...vite.build?.rolldownOptions,
        // Every Base UI module starts with "use client", which a client-only
        // bundle has no use for; the warning is one line per module.
        onwarn(warning, warn) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
          warn(warning);
        },
      },
    },
  }),
};

export default config;
