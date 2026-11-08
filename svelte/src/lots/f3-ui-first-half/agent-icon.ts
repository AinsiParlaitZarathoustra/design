// Pure helpers of the agent glyphs (port of `agent-icon.tsx`). No DOM here,
// so the module stays safe to import on a server.

/**
 * Does this SVG defer its colour to the caller?
 *
 * `currentColor` means "I have no colour of my own". Inside an `<img>` that is
 * a trap: the SVG is a separate document, CSS does not cascade into it, and
 * `currentColor` falls back to the initial value of `color` (black), so the
 * glyph disappears against a dark surface.
 *
 * Cached per data URL: the answer never changes for a given icon.
 */
const deferredColorCache = new Map<string, boolean>();

export function defersColor(dataUrl: string): boolean {
  const cached = deferredColorCache.get(dataUrl);
  if (cached !== undefined) return cached;
  let answer = false;
  const base64 = dataUrl.slice(dataUrl.indexOf("base64,") + 7);
  try {
    answer = dataUrl.includes("base64,")
      ? atob(base64).includes("currentColor")
      : decodeURIComponent(dataUrl).includes("currentColor");
  } catch {
    // Undecodable: treat it as carrying its own colour and just draw it.
    answer = false;
  }
  deferredColorCache.set(dataUrl, answer);
  return answer;
}

/**
 * The type step for a monogram in a `size`px box: the initial sits at about
 * 70% of the box, rounded to the scale (9, 10, 11, 13, 16, 24px).
 */
export function monogramTextClass(size: number): string {
  if (size <= 12) return "text-3xs";
  if (size <= 14) return "text-2xs";
  if (size <= 16) return "text-xs";
  if (size <= 18) return "text-base";
  if (size <= 22) return "text-lg";
  return "text-2xl";
}
