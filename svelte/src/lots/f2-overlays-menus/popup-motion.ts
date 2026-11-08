/**
 * The exit every anchored popup plays (popover, menus, select, combobox,
 * tooltip): the house `scale-in` played backwards, toward the same
 * `--transform-origin`, so a menu leaves into the trigger it grew out of.
 *
 * `data-ending-style` is the exit attribute: it is set only while the popup is
 * leaving, and the popup stays mounted until the running animation ends. Without
 * this class the popup has no animation to wait for, so it vanishes on the frame
 * it closes.
 *
 * The exit is faster than the entrance (120ms against 150ms). Under reduced
 * motion it drops the scale and keeps the fade.
 */
export const POPUP_EXIT =
  "data-ending-style:animate-scale-out motion-reduce:data-ending-style:animate-fade-out";

/** The exit duration the presence helper waits for before unmounting. */
export const POPUP_EXIT_MS = 120;
