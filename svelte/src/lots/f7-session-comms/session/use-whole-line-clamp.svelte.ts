import { USER_CLAMP_PX } from "./turn-row-helpers";

/**
 * The prompt bubble's clamp, ported from `useWholeLineClamp` in the oracle's
 * `turn-row.tsx` to Svelte runes.
 *
 * The collapsed bubble's `max-height`, snapped down to the bottom of the last
 * line that fits whole inside the budget. A fixed cut is only exact for one
 * unbroken paragraph; paragraph gaps and fences knock later lines off the grid,
 * so only the block the cut falls in is read line by line. Also reports whether
 * the prompt overflows at all, which decides "Show more".
 */

export interface WholeLineClamp {
  /** The collapsed bubble's `max-height`, in px. */
  readonly height: number;
  /** The prompt runs past the budget: "Show more" is offered. */
  readonly overflows: boolean;
}

/**
 * `node` is the element the cut is applied inside (the bubble's padding
 * wrapper); `active` is whether the clamp is on (not expanded).
 */
export function useWholeLineClamp(
  node: () => HTMLElement | null,
  active: () => boolean,
): WholeLineClamp {
  let height = $state(USER_CLAMP_PX);
  let overflows = $state(false);

  $effect(() => {
    const el = node();
    const isActive = active();
    if (!el) return;
    // The markdown root: its children are the blocks the cut falls between.
    let root = el.firstElementChild;
    if (root && !root.matches(".prose-session") && root.firstElementChild) {
      root = root.firstElementChild;
    }
    if (!(root instanceof HTMLElement)) return;
    const measure = () => {
      const over = root.scrollHeight > USER_CLAMP_PX;
      overflows = over;
      if (!isActive) return;
      if (!over) {
        height = USER_CLAMP_PX;
        return;
      }
      const base = root.getBoundingClientRect().top;
      let fit = 0;
      for (const child of Array.from(root.children)) {
        const box = child.getBoundingClientRect();
        if (box.top - base >= USER_CLAMP_PX) break;
        if (box.bottom - base <= USER_CLAMP_PX) {
          fit = box.bottom - base;
          continue;
        }
        const range = document.createRange();
        range.selectNodeContents(child);
        for (const line of Array.from(range.getClientRects())) {
          const bottom = line.bottom - base;
          if (bottom <= USER_CLAMP_PX && bottom > fit) fit = bottom;
        }
        break;
      }
      height = fit > 0 ? Math.ceil(fit) : USER_CLAMP_PX;
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  });

  return {
    get height() {
      return height;
    },
    get overflows() {
      return overflows;
    },
  };
}
