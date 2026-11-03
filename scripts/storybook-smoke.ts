/**
 * Fails when a `src/ui` primitive has no story, or a foundations page is
 * missing, in the built Storybook. Run after `bun run build-storybook`:
 *
 *   bun run storybook:smoke
 *
 * The convention it holds: `src/ui/<name>.tsx` has its stories in
 * `stories/ui/<name>.stories.tsx`. A `.ts` file in `src/ui` is a helper
 * (timing, geometry, a class recipe), not a component, and is not counted.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const INDEX = path.join(ROOT, "storybook-static", "index.json");

const FOUNDATIONS = [
  "Principles",
  "Colour",
  "Type",
  "Control heights",
  "Radius",
  "Elevation",
  "Z-index",
  "Motion",
  "Icons",
];

interface Entry {
  id: string;
  title: string;
  type: "story" | "docs";
  importPath: string;
}

if (!existsSync(INDEX)) {
  console.error(`No ${path.relative(ROOT, INDEX)}. Run \`bun run build-storybook\` first.`);
  process.exit(1);
}

const entries = Object.values(
  (JSON.parse(readFileSync(INDEX, "utf8")) as { entries: Record<string, Entry> }).entries,
);
const stories = entries.filter((e) => e.type === "story");

const components = readdirSync(path.join(ROOT, "src", "ui"))
  .filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx"))
  .map((f) => f.slice(0, -".tsx".length));

const problems: string[] = [];
for (const name of components) {
  const importPath = `./stories/ui/${name}.stories.tsx`;
  if (!stories.some((s) => s.importPath === importPath)) {
    problems.push(`src/ui/${name}.tsx has no story (expected ${importPath.slice(2)})`);
  }
}
for (const page of FOUNDATIONS) {
  if (!stories.some((s) => s.title === `Foundations/${page}`)) {
    problems.push(`Foundations/${page} is missing`);
  }
}

if (problems.length) {
  console.error(`Storybook smoke test failed:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(
  `Storybook smoke test passed: ${components.length} primitives and ${FOUNDATIONS.length} foundations pages, ${stories.length} stories.`,
);
