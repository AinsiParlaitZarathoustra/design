import { cn } from "../../lib/utils.ts";
import { DotMatrix } from "./dot-matrix.tsx";

/**
 * A headline band: figures separated by hairlines inside one card, each a
 * caption, the number, its period-over-period chip and the trend that
 * produced it. Desktop's usage `StatStrip`, generalised over its cells.
 */

export type KpiCell = {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  /** Change against the previous period as a fraction (0.08 is +8%). `null`
   *  when there is no previous period to compare with. */
  delta?: number | null;
  /** The trend, one value per period, oldest first. */
  spark?: ReadonlyArray<number | null>;
  /** A neutral note under the figure, for spend and other unjudged figures. */
  detail?: React.ReactNode;
};

/**
 * Period-over-period change as a small chip: `▲ 8%` / `▼ 3%`. Deliberately
 * NEUTRAL — more tokens is neither good nor bad, so the chip informs and does
 * not judge. Renders nothing when there is no previous period. Desktop's
 * `DeltaChip`.
 */
function DeltaChip({ delta, className }: { delta: number | null; className?: string }) {
  if (delta === null || !Number.isFinite(delta)) return null;
  const pct = Math.round(Math.abs(delta) * 100);
  const flat = pct === 0;
  return (
    <span
      data-slot="delta-chip"
      className={cn(
        "inline-flex h-4 items-center gap-0.5 rounded-full border border-element-active px-1.5",
        "text-3xs font-medium tabular-nums text-secondary-foreground",
        className,
      )}
      title="vs the previous period of the same length"
    >
      {flat ? "—" : delta > 0 ? "▲" : "▼"}
      {!flat && ` ${pct}%`}
    </span>
  );
}

function KpiStrip({ cells, className }: { cells: Array<KpiCell>; className?: string }) {
  return (
    <div
      data-slot="kpi-strip"
      className={cn(
        "grid divide-x divide-element-selected rounded-lg border border-element-selected bg-card",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
    >
      {cells.map((cell) => (
        <div key={cell.id} className="min-w-0 px-3.5 py-3">
          <div className="truncate eyebrow">{cell.label}</div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="truncate text-xl leading-none font-semibold text-foreground tabular-nums">
              {cell.value}
            </span>
            {cell.delta !== undefined && <DeltaChip delta={cell.delta} />}
          </div>
          {cell.spark && <DotMatrix values={cell.spark} className="mt-2.5" />}
          {cell.detail && <div className="mt-1.5 caption">{cell.detail}</div>}
        </div>
      ))}
    </div>
  );
}

export { DeltaChip, KpiStrip };
