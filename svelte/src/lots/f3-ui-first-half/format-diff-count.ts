/**
 * A line count as desktop's changed-files card prints it: as is below a
 * thousand, then `1.2k`, `12k`, `1.2m`. One decimal under ten, none above, and
 * a trailing `.0` dropped. 999,600 reads as `1m`, not `1000k`.
 */
export function formatDiffCount(value: number): string {
  const scaled = (n: number, unit: string) =>
    `${n < 10 ? n.toFixed(1).replace(/\.0$/, "") : Math.round(n)}${unit}`;
  if (value < 1000) return String(value);
  if (value < 999_500) return scaled(value / 1000, "k");
  return scaled(value / 1_000_000, "m");
}
