// The interface-scale constants and rules, ported from
// `src/components/shell/ui-scale.tsx`. The control owns no state and applies
// nothing: how a scale is applied is the app's.

export const UI_SCALE_MIN = 0.5;
export const UI_SCALE_MAX = 2;
export const UI_SCALE_STEP = 0.1;
export const UI_SCALE_DEFAULT = 1;

/** The named steps. The stepper still moves on the `UI_SCALE_STEP` grid; a
 *  preset is just a shortcut to a size worth naming. */
export const UI_SCALE_PRESETS = [
  { value: 0.9, label: "Compact" },
  { value: 1, label: "Default" },
  { value: 1.15, label: "Large" },
  { value: 1.3, label: "Larger" },
] as const;

/** The preview glyph per preset, on the type scale rather than an inline
 *  `fontSize`, so the column shows real steps. */
export const UI_SCALE_PREVIEW_CLASS = ["text-xs", "text-sm", "text-md", "text-lg"] as const;

/** Round to a clean grid and clamp, so repeated steps do not drift. */
export function clampUiScale(scale: number): number {
  const clamped = Math.min(UI_SCALE_MAX, Math.max(UI_SCALE_MIN, scale));
  return Math.round(clamped * 100) / 100;
}

/** The keys that step the scale, shown dimmed in the stepper's hints. Either
 *  may be left out for a bare "Smaller" or "Larger". */
export type UiScaleShortcuts = {
  /** e.g. "⌘-" */
  decrease?: string;
  /** e.g. "⌘+" */
  increase?: string;
};
