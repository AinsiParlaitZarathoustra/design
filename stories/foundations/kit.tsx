import type { ReactNode } from "react";
import { cn } from "../../src/lib/utils.ts";

/**
 * The furniture the foundations pages share. Everything here is drawn with
 * the package's own scales and tokens, so the pages are themselves an example
 * of the language they describe.
 */

/** The resolved value of a custom property on the themed root, right now. */
export function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function Page({
  title,
  lede,
  status,
  children,
}: {
  title: string;
  lede: ReactNode;
  status?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-8 py-10">
        <header className="flex flex-col gap-2 border-b border-border pb-6">
          {status}
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="body max-w-2xl text-secondary-foreground">{lede}</p>
        </header>
        {children}
      </div>
    </main>
  );
}

export function Section({
  title,
  intro,
  children,
  className,
}: {
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="eyebrow">{title}</h2>
        {intro && <p className="body max-w-2xl text-secondary-foreground">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

/** A table of tokens: the name you write, what it is, and a live sample. */
export function TokenTable({
  rows,
  columns = ["Token", "Value", "Use", "Sample"],
}: {
  rows: Array<{ name: string; value: ReactNode; use: ReactNode; sample: ReactNode }>;
  columns?: [string, string, string, string];
}) {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-card">
            {columns.map((c) => (
              <th key={c} className="eyebrow border-b border-border px-3 py-2 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-border-subtle last:border-b-0">
              <td className="px-3 py-2.5 align-middle">
                <code className="code">{row.name}</code>
              </td>
              <td className="px-3 py-2.5 align-middle">
                <code className="code text-muted-foreground">{row.value}</code>
              </td>
              <td className="label px-3 py-2.5 align-middle text-secondary-foreground">
                {row.use}
              </td>
              <td className="px-3 py-2.5 align-middle">{row.sample}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
