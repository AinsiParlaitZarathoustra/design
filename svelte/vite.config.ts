import tailwindcss from "@tailwindcss/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

/**
 * The gallery is the port's review surface: `index.html` plus `gallery/`,
 * with every story reachable at a deterministic URL,
 *
 *   /?story=primitives-button--default&theme=atlas&appearance=dark&scale=1
 *
 * The package itself is built by `svelte-package` (see package.json).
 */
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  server: { port: 6100, strictPort: true },
  build: { outDir: "gallery-dist", emptyOutDir: true },
});
