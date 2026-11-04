"use client";

import { MinusIcon, PlusIcon, TypeIcon } from "lucide-react";

import { cn } from "../../lib/utils.ts";
import { Button } from "../../ui/button.tsx";
import { Icon } from "../../ui/icon.tsx";
import { IconButton } from "../../ui/icon-button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover.tsx";
import { Hint } from "../../ui/tooltip.tsx";

/**
 * The interface-scale control: a stepper, the named presets with a preview
 * glyph, and Reset. Desktop's `UiScalePanel`, made props-only.
 *
 * It owns no state and applies nothing. HOW a scale is applied is the app's:
 * desktop sets the native WebView zoom, and a browser app wants CSS `zoom` on
 * the root (or the browser's own zoom). Scaling the root font size does not
 * work — the type scale, control heights and radii are px, so only the
 * rem-based spacing would grow.
 */

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

/** Round to a clean grid and clamp, so repeated steps do not drift. */
export function clampUiScale(scale: number): number {
  const clamped = Math.min(UI_SCALE_MAX, Math.max(UI_SCALE_MIN, scale));
  return Math.round(clamped * 100) / 100;
}

/** The preview glyph per preset, on the type scale rather than an inline
 *  `fontSize`, so the column shows real steps. */
const PREVIEW_CLASS = ["text-xs", "text-sm", "text-md", "text-lg"] as const;

/** The keys that step the scale, shown dimmed in the stepper's hints. */
export type UiScaleShortcuts = {
  /** e.g. "⌘-" */
  decrease?: React.ReactNode;
  /** e.g. "⌘+" */
  increase?: React.ReactNode;
};

type UiScaleProps = {
  scale: number;
  /** Called with a value already clamped to the range and the grid. */
  onScaleChange: (next: number) => void;
  /**
   * Give the stepper's buttons hints — "Smaller ⌘-", "Larger ⌘+" — for an app
   * whose shortcuts also zoom. The keys are the app's (it owns the bindings),
   * and either may be left out for a bare "Smaller". Without it the buttons
   * have no hint, only their accessible names.
   */
  shortcuts?: UiScaleShortcuts;
};

/** One stepper button, behind a hint when the app gave its keys. */
function Step({
  label,
  shortcut,
  hinted,
  ...props
}: React.ComponentProps<typeof IconButton> & { shortcut?: React.ReactNode; hinted: boolean }) {
  const button = <IconButton label={label} size="sm" variant="outline" shape="round" {...props} />;
  return hinted ? (
    <Hint label={label} shortcut={shortcut}>
      {button}
    </Hint>
  ) : (
    button
  );
}

/** The panel itself, for a menu's submenu or a popover. */
function UiScalePanel({ scale, onScaleChange, shortcuts }: UiScaleProps) {
  const set = (next: number) => onScaleChange(clampUiScale(next));
  const pct = Math.round(scale * 100);

  return (
    <div data-slot="ui-scale-panel" className="flex flex-col p-0.5 select-none">
      <div className="flex flex-col gap-0.5 px-1.5 pt-1 pb-2.5">
        <span className="label text-foreground">Interface scale</span>
        <span className="caption">Everything grows together — type, controls, spacing.</span>
      </div>

      {/* Two surfaces, desktop's agent/model picker recipe: the popover is
          the surround carrying the title and Reset, and the controls sit in
          an inset card on the app's own background, its edge a hairline ring
          and a small shadow. A ring, not a border: it draws outside the box,
          so the card is as tall as its contents. The fills inside are
          foreground tints, which read the same on any theme's background. */}
      <div className="overflow-hidden rounded-lg bg-background shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-2 border-b border-foreground/8 px-2 py-1.5">
          <Step
            icon={MinusIcon}
            label="Smaller"
            hinted={shortcuts !== undefined}
            shortcut={shortcuts?.decrease}
            disabled={scale <= UI_SCALE_MIN}
            onClick={() => set(scale - UI_SCALE_STEP)}
          />
          <span className="flex-1 text-center text-xs font-medium text-foreground tabular-nums">
            {pct}%
          </span>
          <Step
            icon={PlusIcon}
            label="Larger"
            hinted={shortcuts !== undefined}
            shortcut={shortcuts?.increase}
            disabled={scale >= UI_SCALE_MAX}
            onClick={() => set(scale + UI_SCALE_STEP)}
          />
        </div>

        <div className="flex flex-col gap-px p-1">
          {UI_SCALE_PRESETS.map((preset, i) => {
            const active = Math.abs(preset.value - scale) < 0.001;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => set(preset.value)}
                className={cn(
                  "flex h-7 cursor-pointer items-center gap-2 rounded-md px-2 text-left text-xs",
                  "transition-colors duration-fast ease-out-strong",
                  active
                    ? "bg-foreground/8 text-foreground"
                    : "text-muted-foreground hover:bg-foreground/6 hover:text-foreground",
                )}
              >
                <span
                  className={cn("w-5 text-center leading-none font-semibold", PREVIEW_CLASS[i])}
                >
                  A
                </span>
                <span className="flex-1">{preset.label}</span>
                <span className="text-2xs text-muted-foreground tabular-nums">
                  {Math.round(preset.value * 100)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          disabled={scale === UI_SCALE_DEFAULT}
          onClick={() => set(UI_SCALE_DEFAULT)}
        >
          Reset to default
        </Button>
      </div>
    </div>
  );
}

/** The panel behind a trigger, for a toolbar or a rail footer. */
function UiScaleControl({
  scale,
  onScaleChange,
  className,
  iconOnly = false,
  shortcuts,
}: UiScaleProps & {
  className?: string;
  /** Just the glyph, for a tight toolbar; the percentage stays in the label. */
  iconOnly?: boolean;
}) {
  const pct = Math.round(scale * 100);
  return (
    <Popover>
      <PopoverTrigger
        render={
          iconOnly ? (
            <IconButton
              icon={TypeIcon}
              label={`Interface scale, ${pct}%`}
              size="sm"
              className={className}
            />
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className={cn("gap-1.5 text-muted-foreground", className)}
              aria-label={`Interface scale, ${pct}%`}
            >
              <Icon icon={TypeIcon} size="sm" />
              <span className="text-2xs tabular-nums">{pct}%</span>
            </Button>
          )
        }
      />
      <PopoverContent align="end" surface="tinted" className="w-60" aria-label="Interface scale">
        <UiScalePanel scale={scale} onScaleChange={onScaleChange} shortcuts={shortcuts} />
      </PopoverContent>
    </Popover>
  );
}

export { UiScaleControl, UiScalePanel };
