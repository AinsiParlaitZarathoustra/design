// Base UI's progress model, as `@base-ui/react/progress` 1.8 computes it for
// `ProgressRoot`: a finite value is clamped and turned into a percentage, and
// `null` (or any non-finite value) keeps the bar indeterminate.

/**
 * The indicator's ink. `default` is the primary ink, a plain amount. The others
 * are usage bars (quota, rate limits), where the fill says how close a limit is.
 * Which tone a value gets is the app's call.
 */
export type ProgressTone = "default" | "success" | "warning" | "error";

export type ProgressStatus = "indeterminate" | "progressing" | "complete";

export const TONE_CLASS: Record<ProgressTone, string | undefined> = {
  default: undefined,
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

export interface ProgressModel {
  status: ProgressStatus;
  percentageValue: number | null;
  clampedValue: number | null;
  formattedValue: string;
  defaultAriaValueText: string;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(val, max));
}

function formatNumber(value: number, locale: string | string[] | undefined, options: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function progressModel(
  value: number | null | undefined,
  min: number,
  max: number,
  format?: Intl.NumberFormatOptions,
  locale?: string | string[],
): ProgressModel {
  if (value != null && Number.isFinite(value)) {
    const rawPercentage = ((value - min) * 100) / (max - min);
    const percentageValue = clamp(Number.isNaN(rawPercentage) ? 0 : rawPercentage, 0, 100);
    const clampedValue = clamp(value, min, max);
    const status: ProgressStatus = clampedValue === max ? "complete" : "progressing";
    const formattedValue = format
      ? formatNumber(clampedValue, locale, format)
      : formatNumber(percentageValue / 100, locale, { style: "percent" });
    return {
      status,
      percentageValue,
      clampedValue,
      formattedValue,
      defaultAriaValueText: formattedValue,
    };
  }
  return {
    status: "indeterminate",
    percentageValue: null,
    clampedValue: null,
    formattedValue: "",
    defaultAriaValueText: "indeterminate progress",
  };
}
