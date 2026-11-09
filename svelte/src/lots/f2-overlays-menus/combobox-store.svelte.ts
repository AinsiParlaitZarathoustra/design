import { getContext, setContext } from "svelte";

/** Marks "no item highlighted" (Base UI's `activeIndex` of null). */
const NONE = Symbol("combobox.none");

/** A group of choices, as `items` may hold them: `value` names it and `items` are its choices. */
export interface ComboboxGroupEntry {
  value: string;
  items: readonly unknown[];
}

export function isComboboxGroup(entry: unknown): entry is ComboboxGroupEntry {
  return (
    typeof entry === "object" && entry !== null && Array.isArray((entry as { items?: unknown }).items)
  );
}

/** Base UI's default label: the item's own text. */
export function defaultItemLabel(item: unknown): string {
  return String(item);
}

const collator = new Intl.Collator(undefined, { usage: "search", sensitivity: "base" });

/** Base UI's `contains` filter: a case- and accent-insensitive substring match. */
export function containsText(text: string, query: string): boolean {
  if (query === "") return true;
  for (let i = 0; i + query.length <= text.length; i++) {
    if (collator.compare(text.slice(i, i + query.length), query) === 0) return true;
  }
  return false;
}

/**
 * The element a combobox's popup is placed against when it is not the input: a
 * chips container. The same shape as the `useComboboxAnchor` ref it ports.
 */
export class ComboboxAnchor {
  current = $state<HTMLElement | null>(null);
}

export function useComboboxAnchor(): ComboboxAnchor {
  return new ComboboxAnchor();
}

/** What the root hands to its parts: the controlled state and its setters. */
export interface ComboboxConfig {
  readonly items: readonly unknown[];
  readonly multiple: boolean;
  readonly disabled: boolean;
  readonly value: unknown;
  readonly inputValue: string;
  readonly open: boolean;
  readonly label: (item: unknown) => string;
  setValue: (next: unknown) => void;
  setInputValue: (next: string) => void;
  setOpen: (next: boolean) => void;
}

/**
 * The combobox's behaviour, shared by the root and its parts. It follows the
 * rules of Base UI's combobox: a single choice fills the input with its label
 * and closes; a multiple choice toggles and keeps the popup open; the filter is
 * the typed text, unless it is the chosen label (then every item shows).
 */
export class ComboboxStore {
  readonly #config: ComboboxConfig;
  #anchor: ComboboxAnchor | null = null;

  highlighted = $state<unknown>(NONE);
  inputEl = $state<HTMLInputElement | null>(null);
  triggerEl = $state<HTMLElement | null>(null);
  popupEl = $state<HTMLElement | null>(null);
  inputInsidePopup = $state(false);

  constructor(config: ComboboxConfig) {
    this.#config = config;
  }

  get open(): boolean {
    return this.#config.open;
  }

  get disabled(): boolean {
    return this.#config.disabled;
  }

  get multiple(): boolean {
    return this.#config.multiple;
  }

  get inputValue(): string {
    return this.#config.inputValue;
  }

  get value(): unknown {
    return this.#config.value;
  }

  /** The chosen items, as a list: one entry for a single choice, none while nothing is chosen. */
  get selected(): unknown[] {
    const value = this.#config.value;
    if (this.#config.multiple) return Array.isArray(value) ? value : [];
    return value === null || value === undefined ? [] : [value];
  }

  get hasSelection(): boolean {
    return this.selected.length > 0;
  }

  get valueLabel(): string {
    return this.selected.map((item) => this.label(item)).join(", ");
  }

  isSelected(item: unknown): boolean {
    return this.selected.includes(item);
  }

  label(item: unknown): string {
    return this.#config.label(item);
  }

  get highlightedValue(): unknown {
    return this.highlighted;
  }

  isHighlighted(item: unknown): boolean {
    return this.highlighted !== NONE && this.highlighted === item;
  }

  /** The filter text: the typed input, except that the chosen label shows every item. */
  get filterQuery(): string {
    const query = this.#config.inputValue.trim();
    if (this.#config.multiple || query === "" || this.selected.length === 0) return query;
    const chosen = this.label(this.selected[0]);
    return chosen.length === query.length && containsText(chosen, query) ? "" : query;
  }

  /** The filtered list: flat items, or groups with their matching items (empty groups drop out). */
  get entries(): unknown[] {
    const query = this.filterQuery;
    const out: unknown[] = [];
    for (const entry of this.#config.items) {
      if (isComboboxGroup(entry)) {
        const items = entry.items.filter((item) => query === "" || containsText(this.label(item), query));
        if (items.length > 0) out.push({ value: entry.value, items });
      } else if (query === "" || containsText(this.label(entry), query)) {
        out.push(entry);
      }
    }
    return out;
  }

  /** Every selectable item in the filtered list, in order: what the arrow keys walk. */
  get flat(): unknown[] {
    const out: unknown[] = [];
    for (const entry of this.entries) {
      if (isComboboxGroup(entry)) out.push(...entry.items);
      else out.push(entry);
    }
    return out;
  }

  get empty(): boolean {
    return this.flat.length === 0;
  }

  setInputInsidePopup(inside: boolean) {
    this.inputInsidePopup = inside;
  }

  /**
   * When the popup opens with its input inside it, the chosen label is cleared from
   * the field, so the field shows its placeholder and the list shows every choice.
   */
  clearChosenText() {
    if (!this.inputInsidePopup || this.#config.multiple || this.selected.length === 0) return;
    if (this.#config.inputValue === this.valueLabel) this.#config.setInputValue("");
  }

  /** Focuses the field, as the popup does when its input is inside it. */
  focusInput() {
    this.inputEl?.focus({ preventScroll: true });
  }

  setAnchor(anchor: ComboboxAnchor | null) {
    this.#anchor = anchor;
  }

  /** True inside the field, its trigger, the popup or the anchor: a press there is not outside. */
  contains(target: EventTarget | null): boolean {
    if (!(target instanceof Node)) return false;
    return [this.inputEl, this.triggerEl, this.popupEl, this.#anchor?.current ?? null].some(
      (element) => !!element?.contains(target),
    );
  }

  setOpen(next: boolean) {
    if (next === this.#config.open) return;
    if (!next) {
      this.highlighted = NONE;
      // Closing clears a multiple field's text, and shows a single field's chosen label again.
      if (this.#config.multiple && !this.inputInsidePopup) this.#config.setInputValue("");
      else if (!this.inputInsidePopup) this.#config.setInputValue(this.valueLabel);
    }
    this.#config.setOpen(next);
  }

  toggle() {
    if (this.#config.disabled) return;
    this.setOpen(!this.#config.open);
  }

  typeQuery(text: string) {
    this.#config.setInputValue(text);
    this.highlighted = NONE;
    if (!this.#config.open) this.setOpen(true);
  }

  openFromInput() {
    if (!this.#config.disabled && !this.#config.open) this.setOpen(true);
  }

  highlight(item: unknown) {
    this.highlighted = item;
  }

  choose(item: unknown) {
    if (this.#config.multiple) {
      const next = this.isSelected(item)
        ? this.selected.filter((chosen) => chosen !== item)
        : [...this.selected, item];
      this.#config.setValue(next);
      if (this.#config.inputValue.trim() === "") return;
      if (this.inputInsidePopup) this.#config.setInputValue("");
      else this.setOpen(false);
      return;
    }
    this.#config.setValue(item);
    if (!this.inputInsidePopup) this.#config.setInputValue(this.label(item));
    this.setOpen(false);
  }

  removeChip(item: unknown) {
    this.#config.setValue(this.selected.filter((chosen) => chosen !== item));
  }

  clear() {
    this.#config.setValue(this.#config.multiple ? [] : null);
    this.#config.setInputValue("");
    this.highlighted = NONE;
  }

  /** What an arrow key highlights as it opens the list: the first chosen row, else the first (down) or last (up) row. */
  openHighlight(step: 1 | -1): unknown {
    const list = this.flat;
    if (list.length === 0) return NONE;
    const chosen = list.find((item) => this.isSelected(item));
    if (chosen !== undefined) return chosen;
    return step === 1 ? list[0] : list[list.length - 1];
  }

  move(step: 1 | -1) {
    const list = this.flat;
    if (list.length === 0) return;
    const at = list.indexOf(this.highlighted);
    let next: number;
    if (at < 0) next = step > 0 ? 0 : list.length - 1;
    else next = (at + step + list.length) % list.length;
    this.highlighted = list[next];
  }

  keydown(event: KeyboardEvent) {
    if (this.#config.disabled) return;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        if (!this.#config.open) {
          this.setOpen(true);
          this.highlighted = this.openHighlight(event.key === "ArrowDown" ? 1 : -1);
          return;
        }
        this.move(event.key === "ArrowDown" ? 1 : -1);
        return;
      }
      case "Enter":
        if (!this.#config.open) return;
        // Enter with nothing highlighted closes the list and lets the form submit, as Base UI does.
        if (this.highlighted === NONE) {
          this.setOpen(false);
          return;
        }
        event.preventDefault();
        this.choose(this.highlighted);
        return;
      case "Backspace": {
        const last = this.selected[this.selected.length - 1];
        if (this.#config.multiple && this.#config.inputValue === "" && last !== undefined) {
          this.removeChip(last);
        }
        return;
      }
    }
  }

  /** Focus leaving the field closes the popup, unless it went into the popup or the trigger. */
  blurInput(event: FocusEvent) {
    const next = event.relatedTarget;
    if (next instanceof Node && this.contains(next)) return;
    // Focus leaving for no element (Tab out of the page) keeps the list and its text, as Base UI's
    // focus manager does; a press outside closes it through the dismiss.
    if (next === null) return;
    if (this.#config.open) this.setOpen(false);
    if (!this.#config.multiple && !this.inputInsidePopup) {
      const label = this.valueLabel;
      if (this.#config.inputValue !== label) this.#config.setInputValue(label);
    }
  }
}

const KEY = Symbol("atlas.combobox");
const GROUP = Symbol("atlas.combobox.group");
const INSIDE_POPUP = Symbol("atlas.combobox.inside-popup");

export function setComboboxStore(store: ComboboxStore) {
  setContext(KEY, store);
}

export function getComboboxStore(): ComboboxStore {
  const store = getContext<ComboboxStore | null>(KEY);
  if (!store) throw new Error("Combobox parts must be used inside <Combobox>.");
  return store;
}

/** A group's items, for its collection. */
export interface ComboboxGroupApi {
  readonly items: readonly unknown[];
  /** The id the group's label carries: the group is named by it. */
  readonly labelId: string;
  /** Set by a label while it is mounted, so the group is named only when it has one. */
  setLabelMounted(mounted: boolean): void;
}

export function setComboboxGroup(api: ComboboxGroupApi) {
  setContext(GROUP, api);
}

export function getComboboxGroup(): ComboboxGroupApi | undefined {
  return getContext<ComboboxGroupApi | undefined>(GROUP);
}

/** Set by the popup, so an input rendered inside it knows it is not the anchor. */
export function setInsidePopup() {
  setContext(INSIDE_POPUP, true);
}

export function isInsidePopup(): boolean {
  return getContext<boolean | undefined>(INSIDE_POPUP) === true;
}
