/**
 * The toast's tone. It lives on the type's glyph alone; the surface stays a
 * neutral popover. Port of Base UI's `Toast.Root` `type`, which
 * `ToastIcon` maps to a Lucide icon.
 */
export type ToastType = "success" | "info" | "warning" | "error" | "loading";

/** One toast's fields, as `manager.add` takes them (port of Base UI's add options). */
export interface ToastOptions {
  /** A caller's id; one is generated when absent. */
  id?: string;
  title?: string;
  description?: string;
  type?: ToastType;
  /** Milliseconds before it dismisses itself; `0` keeps it until closed. */
  timeout?: number;
  /** The action's label (Base UI's `actionProps.children`). */
  action?: string;
  /** What the action does when pressed. */
  onAction?: () => void;
}

/**
 * A toast in the stack. `height` is its own measured height, taken once, before
 * the stack clamps every toast to the frontmost one.
 */
export interface ToastItem {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly type?: ToastType;
  readonly action?: string;
  readonly onAction?: () => void;
  height: number;
}

/** The seeded toasts of the stories: the same fields, before they enter a manager. */
export interface ToastSeed {
  title: string;
  description?: string;
  type?: ToastType;
  action?: string;
}
