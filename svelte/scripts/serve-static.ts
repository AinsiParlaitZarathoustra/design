/**
 * A small static server for the source Storybook, so the oracle can be served
 * after `bun run build-storybook` without a network fetch:
 *
 *   bun scripts/serve-static.ts ../../design/storybook-static 6006
 *
 * `python3 -m http.server` resets connections under Storybook's chunked
 * dynamic imports, which showed up as blank captures in the comparer.
 */
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "storybook-static");
const port = Number(process.argv[3] ?? 6006);

Bun.serve({
  port,
  idleTimeout: 120,
  async fetch(request) {
    const url = new URL(request.url);
    let filePath = decodeURIComponent(url.pathname);
    if (filePath.endsWith("/")) filePath += "index.html";
    const file = Bun.file(path.join(root, filePath));
    if (!(await file.exists())) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(file);
  },
});

console.log(`serving ${root} on http://localhost:${port}`);
