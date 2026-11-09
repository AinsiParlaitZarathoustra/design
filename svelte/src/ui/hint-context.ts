import { getContext, setContext } from "svelte";

/**
 * What a `Hint` hands its trigger. The source's `Hint` clones its one child with
 * `hintTriggerProps`: a string label becomes the child's `aria-label` unless the
 * child is already named. A snippet child cannot be cloned, so the first button
 * rendered inside the hint claims the label instead; later ones (a popup's rows)
 * get nothing.
 */
interface HintLabel {
  claim: () => string | undefined;
}

const KEY = Symbol("atlas.hint-label");

export function setHintLabel(label: () => string) {
  let claimed = false;
  setContext<HintLabel>(KEY, {
    claim() {
      if (claimed) return undefined;
      claimed = true;
      return label();
    },
  });
}

export function claimHintLabel(): string | undefined {
  return getContext<HintLabel | undefined>(KEY)?.claim();
}
