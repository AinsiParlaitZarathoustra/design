import { getContext, setContext } from "svelte";

// The accordion's shared state (port of Base UI's `Accordion` context). The
// root owns the open values; each item publishes its value, its disabled flag
// and the ids that tie its trigger to its panel.

export interface AccordionRootState {
  readonly multiple: boolean;
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
}

export interface AccordionItemState {
  readonly value: string;
  readonly disabled: boolean;
  readonly triggerId: string;
  readonly panelId: string;
}

const ROOT_KEY = Symbol("atlas.accordion");
const ITEM_KEY = Symbol("atlas.accordion-item");

export function setAccordionRoot(state: AccordionRootState) {
  setContext(ROOT_KEY, state);
}

export function getAccordionRoot(): AccordionRootState {
  const state = getContext<AccordionRootState | undefined>(ROOT_KEY);
  if (!state) throw new Error("AccordionTrigger and AccordionContent must be used inside <Accordion>.");
  return state;
}

export function setAccordionItem(state: AccordionItemState) {
  setContext(ITEM_KEY, state);
}

export function getAccordionItem(): AccordionItemState {
  const state = getContext<AccordionItemState | undefined>(ITEM_KEY);
  if (!state) throw new Error("AccordionTrigger and AccordionContent must be used inside <AccordionItem>.");
  return state;
}
