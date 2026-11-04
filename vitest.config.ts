import path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

/**
 * Two projects:
 *
 *   unit       `bun run test`. Node by default; a file that renders opts in
 *              with `// @vitest-environment happy-dom`, as desktop's do.
 *   storybook  `bun run test:storybook`. Every story is a test, run in
 *              headless Chromium (`bunx playwright install chromium` once):
 *              it renders, its `play` function passes, and axe finds no
 *              violation (`parameters.a11y.test` in `.storybook/preview.tsx`).
 */
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "unit",
          environment: "node",
          env: { TZ: "UTC" },
          include: ["tests/**/*.test.ts", "src/**/*.test.{ts,tsx}"],
          exclude: ["**/node_modules/**", "**/dist/**", "fixtures/**"],
        },
      },
      {
        plugins: [storybookTest({ configDir: path.join(import.meta.dirname, ".storybook") })],
        test: {
          name: "storybook",
          env: { TZ: "UTC" },
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
