import type { Snippet } from "svelte";

/** One choice in a select. `description` is a caption under its label, inside the popup only. */
export interface SelectOption<T extends string> {
  value: T;
  label: string;
  description?: string;
  icon?: Snippet;
}

export interface SelectProps<T extends string> {
  /** The chosen value; `null` while nothing is chosen. */
  value: T | null;
  onValueChange: (next: T) => void;
  options: readonly SelectOption<T>[];
  disabled?: boolean;
  /** Shown while no option is chosen: `value` is `null`, or matches no option. */
  placeholder?: string;
  /** Shown in the popup when `options` is empty. */
  empty?: string;
  /** The trigger's id, so a `<label for>` names it. */
  id?: string;
  /** Submitted with a form, through a hidden input. */
  name?: string;
  required?: boolean;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling";
  size?: "sm" | "md";
  variant?: "bordered" | "ghost";
  "aria-label"?: string;
  /** Applied to the trigger. */
  class?: string;
  /** Draw the selected item's check, and the gutter that holds it (default). */
  indicator?: boolean;
  /** `pill` rounds the trigger's ends. */
  shape?: "default" | "pill";
  /** A glyph before the value, inside the trigger. */
  leading?: Snippet;
}
