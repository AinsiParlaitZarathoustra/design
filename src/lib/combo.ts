/** Split a legacy glyph string ("⌘⇧F", "⌥Space") into keycaps: every modifier
 *  glyph is its own cap, the remainder is one cap. Copied from desktop's
 *  `features/keybindings/lib/combo.ts`, the one pure piece `Kbd` needs. */
export function splitGlyphCombo(combo: string): string[] {
  const keys: string[] = [];
  let rest = combo;
  while (rest.length > 0 && "⌃⌥⇧⌘".includes(rest[0]!)) {
    keys.push(rest[0]!);
    rest = rest.slice(1);
  }
  if (rest) keys.push(rest);
  return keys;
}

/** Which keyboard a keycap is drawn for: a Mac's glyphs, or everyone else's words. */
export type KeyPlatform = "mac" | "other";

/** The host's keyboard, from the user agent. Without a `navigator` (a server
 *  render) it answers `"mac"`, the platform glyph strings are written for. */
export function detectKeyPlatform(): KeyPlatform {
  if (typeof navigator === "undefined") return "mac";
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const name = nav.userAgentData?.platform || nav.platform || nav.userAgent || "";
  return /mac|iphone|ipad|ipod/i.test(name) ? "mac" : "other";
}

/** One modifier glyph as Windows and Linux spell it. */
const OTHER_MODIFIER: Record<string, string> = {
  "⌃": "Ctrl",
  "⌘": "Ctrl",
  "⌥": "Alt",
  "⇧": "Shift",
};

/** A single keycap for `platform`: on a Mac as written, elsewhere a modifier
 *  glyph becomes its word (⌘ and ⌃ → Ctrl, ⌥ → Alt, ⇧ → Shift). */
export function platformKey(key: string, platform: KeyPlatform): string {
  return platform === "mac" || !Object.hasOwn(OTHER_MODIFIER, key) ? key : OTHER_MODIFIER[key]!;
}

/**
 * Keycaps for `platform`. On a Mac, unchanged. Elsewhere the modifier glyphs
 * become words in the Windows order, Ctrl, Alt, Shift, then the key, as
 * desktop's `displayKeys` draws them: ⌘ reads as Ctrl because that is the key
 * a ⌘ shortcut answers to there, and ⌃⌘ together read as Ctrl Win.
 * Anything already a word ("Ctrl", "Enter") passes through.
 */
export function platformKeys(keys: readonly string[], platform: KeyPlatform): string[] {
  if (platform === "mac") return [...keys];
  const has = (glyph: string) => keys.includes(glyph);
  const rest = keys.filter((k) => !Object.hasOwn(OTHER_MODIFIER, k));
  const mods: string[] = [];
  if (has("⌃")) mods.push("Ctrl");
  if (has("⌘")) mods.push(has("⌃") ? "Win" : "Ctrl");
  if (has("⌥")) mods.push("Alt");
  if (has("⇧")) mods.push("Shift");
  return [...mods, ...rest];
}
