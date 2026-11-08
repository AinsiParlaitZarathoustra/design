import { themedEpoch } from "./themed-epoch.svelte";

/**
 * The resolved value of a custom property on the themed root. Read it in a
 * template: it runs again once the appearance is on <html> (see themed-epoch).
 */
export function cssVar(name: string): string {
  void themedEpoch.current;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
