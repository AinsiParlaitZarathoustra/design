import { POPUP_EXIT_MS } from "./popup-motion";

/**
 * Keeps a popup mounted through its exit. `show` mounts it; `hide` marks it
 * `ending` (the exit attribute, `data-ending-style`) and unmounts it once the
 * exit animation has run. `hide(true)` skips the exit, for a popup that
 * entered without one.
 */
export function createPresence(exitMs: number = POPUP_EXIT_MS) {
  let mounted = $state(false);
  let ending = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  return {
    get mounted() {
      return mounted;
    },
    get ending() {
      return ending;
    },
    show() {
      clearTimeout(timer);
      ending = false;
      mounted = true;
    },
    hide(instant = false) {
      clearTimeout(timer);
      if (!mounted) return;
      if (instant) {
        mounted = false;
        ending = false;
        return;
      }
      ending = true;
      timer = setTimeout(() => {
        mounted = false;
        ending = false;
      }, exitMs);
    },
    dispose() {
      clearTimeout(timer);
    },
  };
}

/**
 * Closes a popup on a press outside it, and on Escape. Call during component
 * initialisation: it registers an effect that is live while `active()` is true.
 */
export function useDismiss(options: {
  active: () => boolean;
  inside: (target: EventTarget | null) => boolean;
  onDismiss: () => void;
  /** A press outside dismisses (the default); an alert dialog answers only by its buttons and Escape. */
  pressOutside?: boolean;
}) {
  $effect(() => {
    if (!options.active()) return;
    const onPointer = (event: PointerEvent) => {
      if (!options.inside(event.target)) options.onDismiss();
    };
    const pointer = options.pressOutside ?? true;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      options.onDismiss();
    };
    if (pointer) document.addEventListener("pointerdown", onPointer, true);
    document.addEventListener("keydown", onKey, true);
    return () => {
      if (pointer) document.removeEventListener("pointerdown", onPointer, true);
      document.removeEventListener("keydown", onKey, true);
    };
  });
}
