/**
 * Fails when a `src/ui` primitive or a `src/components` component has no
 * story, or a foundations page is missing, in the built Storybook. Run after
 * `bun run build-storybook`:
 *
 *   bun run storybook:smoke
 *
 * The conventions it holds:
 *
 *  - `src/ui/<name>.tsx` has its stories in `stories/ui/<name>.stories.tsx`.
 *  - `src/components/<group>/<name>.tsx` has its stories in
 *    `stories/components/<group>/<name>.stories.tsx`, and that file names
 *    every component the source file exports (an exported PascalCase name;
 *    `SCREAMING_CASE` constants, hooks and helpers are not components). A
 *    `src/components` file often exports a family (`Field`, `FieldLabel`…),
 *    and each member is a public component, so each has to show up somewhere.
 *
 * A `.ts` file is a helper (timing, geometry, a class recipe), not a
 * component, and is not counted.
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

/** The PascalCase names a module exports: `export function X`, `export const X`, `export { X, Y }`. */
function exportedComponents(source: string): string[] {
  const names = new Set<string>();
  for (const m of source.matchAll(
    /^export (?:default )?(?:function|const|class) ([A-Za-z0-9_]+)/gm,
  )) {
    names.add(m[1]!);
  }
  for (const m of source.matchAll(/^export \{([^}]*)\}/gm)) {
    for (const part of m[1]!.split(",")) {
      const name = part
        .trim()
        .split(/\s+as\s+/)
        .pop()!
        .trim();
      if (name && !name.startsWith("type ")) names.add(name);
    }
  }
  // PascalCase, and not an all-caps constant or a `cva` recipe.
  return [...names].filter((n) => /^[A-Z][a-z]/.test(n) && !n.endsWith("Variants")).sort();
}

const COMPONENT_GROUPS = readdirSync(path.join(ROOT, "src", "components"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const problems: string[] = [];
let componentFiles = 0;
for (const group of COMPONENT_GROUPS) {
  const dir = path.join(ROOT, "src", "components", group);
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".tsx") || file.endsWith(".test.tsx")) continue;
    componentFiles++;
    const name = file.slice(0, -".tsx".length);
    const rel = `stories/components/${group}/${name}.stories.tsx`;
    if (!stories.some((s) => s.importPath === `./${rel}`)) {
      problems.push(`src/components/${group}/${file} has no story (expected ${rel})`);
      continue;
    }
    const storySource = readFileSync(path.join(ROOT, rel), "utf8");
    for (const exported of exportedComponents(readFileSync(path.join(dir, file), "utf8"))) {
      if (!new RegExp(`\\b${exported}\\b`).test(storySource)) {
        problems.push(
          `src/components/${group}/${file} exports ${exported}, which ${rel} never uses`,
        );
      }
    }
  }
}
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
  `Storybook smoke test passed: ${components.length} primitives, ${componentFiles} component files and ${FOUNDATIONS.length} foundations pages, ${stories.length} stories.`,
);
