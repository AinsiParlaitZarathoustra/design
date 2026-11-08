/**
 * The SSR check: the package's root entry, compiled by the consumer's own
 * pipeline, renders to HTML with no DOM. Run `bun run ssr` in this fixture.
 */
import { render } from "svelte/server";
import App from "./App.svelte";
import ServerDialog from "./ServerDialog.svelte";

const page = render(App);
const dialog = render(ServerDialog);

const checks: [string, boolean][] = [
  ["button class recipe", page.body.includes("data-slot=\"button\"")],
  ["input surface", page.body.includes("data-slot=\"input\"")],
  ["tabstrip role", page.body.includes('role="tablist"')],
  ["dialog open on the server", dialog.body.includes('role="dialog"')],
  ["dialog title wired", dialog.body.includes("aria-labelledby")],
  ["no React marker", !page.body.includes("data-reactroot")],
];

for (const [name, ok] of checks) console.log(`${ok ? "ok" : "FAIL"} ${name}`);
if (checks.some(([, ok]) => !ok)) process.exitCode = 1;
else console.log(`ssr: ${page.body.length} bytes, all checks passed`);
