const TABBABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab inside a modal popup, as Base UI's focus manager does for a modal:
 * Tab from the last tabbable element wraps to the first, Shift+Tab from the first
 * to the last, and a popup with none keeps focus on itself. Returns the undo.
 */
export function trapFocus(popup: HTMLElement): () => void {
  function onKeydown(event: KeyboardEvent) {
    if (event.key !== "Tab" || event.defaultPrevented) return;
    const items = Array.from(popup.querySelectorAll<HTMLElement>(TABBABLE));
    const active = document.activeElement;
    if (items.length === 0) {
      event.preventDefault();
      popup.focus({ preventScroll: true });
      return;
    }
    const first = items[0]!;
    const last = items[items.length - 1]!;
    if (event.shiftKey && (active === first || !popup.contains(active))) {
      event.preventDefault();
      last.focus({ preventScroll: true });
    } else if (!event.shiftKey && (active === last || !popup.contains(active))) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  }
  document.addEventListener("keydown", onKeydown, true);
  return () => document.removeEventListener("keydown", onKeydown, true);
}
