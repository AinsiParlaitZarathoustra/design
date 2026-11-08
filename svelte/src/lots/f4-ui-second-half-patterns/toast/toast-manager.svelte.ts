import type { ToastItem, ToastOptions } from "./toast-types";

/**
 * The toast stack, ported from Base UI's `createToastManager`.
 *
 * `toast` is the shared default a `Toaster` uses; a surface that must not leak
 * its notices into another (a story, a preview) calls `createToastManager`.
 * The newest toast is first: it is the one the stack lays in front, and the
 * one every other toast is cut to.
 */
export class ToastManager {
  #toasts = $state<ToastItem[]>([]);
  #timers = new Map<string, ReturnType<typeof setTimeout>>();

  /** Whether the stack is hovered or focused: its toasts unfold. */
  expanded = $state(false);

  get toasts(): ToastItem[] {
    return this.#toasts;
  }

  /** The frontmost toast's own height: the height the rest of the stack takes. */
  get frontmostHeight(): number {
    return this.#toasts[0]?.height ?? 0;
  }

  add(options: ToastOptions): string {
    const id = options.id ?? `toast-${++sequence}`;
    const item: ToastItem = {
      id,
      title: options.title,
      description: options.description,
      type: options.type,
      action: options.action,
      onAction: options.onAction,
      height: 0,
    };
    // A new toast takes the front; an id already shown replaces its item.
    this.#toasts = [item, ...this.#toasts.filter((toast) => toast.id !== id)];
    const timeout = options.timeout ?? 5000;
    if (timeout > 0) {
      this.#timers.set(
        id,
        setTimeout(() => this.close(id), timeout),
      );
    }
    return id;
  }

  close(id: string): void {
    const timer = this.#timers.get(id);
    if (timer) clearTimeout(timer);
    this.#timers.delete(id);
    this.#toasts = this.#toasts.filter((toast) => toast.id !== id);
  }

  /**
   * Records a toast's own height. It is measured before the clamp applies, so
   * a one-line toast behind a two-line one keeps its own height for the scale
   * arithmetic, exactly as Base UI reports each toast's height.
   */
  setHeight(id: string, height: number): void {
    if (height <= 0) return;
    const item = this.#toasts.find((toast) => toast.id === id);
    if (!item || item.height === height) return;
    item.height = height;
  }
}

let sequence = 0;

/** A stack of its own: each story seeds one so nothing leaks into the next. */
export function createToastManager(): ToastManager {
  return new ToastManager();
}

/** The shared stack `Toaster` renders when it is given no manager. */
export const toast = createToastManager();

/**
 * The stack a `ToastList` reads (port of `useToastManager`). In Svelte the
 * manager is the hook: its `toasts` getter is the reactive list.
 */
export function useToastManager(manager: ToastManager = toast): ToastManager {
  return manager;
}
