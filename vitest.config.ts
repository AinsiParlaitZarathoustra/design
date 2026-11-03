import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    // `node` by default; a file that renders opts in with
    // `// @vitest-environment happy-dom`, as desktop's do.
    environment: "node",
    env: { TZ: "UTC" },
    include: ["tests/**/*.test.ts", "src/**/*.test.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", "fixtures/**"],
  },
})
