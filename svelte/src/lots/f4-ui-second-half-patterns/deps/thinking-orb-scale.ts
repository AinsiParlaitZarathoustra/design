/**
 * Local adapter: `scaleRadii` from `thinking-orbs` (MIT, Jakub Antalik).
 *
 * The package's `./engine` subpath exports the painter and the presets but not
 * this helper, and the root entry imports React. This is the same function, copied
 * so the Svelte port of `ThinkingOrb` can apply the `dotSize` prop exactly as the
 * React wrapper does. Keep the key list in step with the installed package.
 */

const RADIUS_KEYS = [
  "rBase",
  "rDepth",
  "rActive",
  "rDot",
  "ghostR",
  "partR",
  "partRDepth",
  "nodeR",
  "nodeRDepth",
] as const;

export function scaleRadii<T extends Record<string, unknown>>(opts: T, scale: number): T {
  const out: Record<string, unknown> = { ...opts };
  for (const key of RADIUS_KEYS) {
    const value = out[key];
    if (typeof value === "number") out[key] = value * scale;
  }
  out.rSizeMul = ((out.rSizeMul as number | undefined) ?? 1) * scale;
  return out as T;
}
