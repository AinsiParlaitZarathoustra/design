import { getContext, setContext } from "svelte";

/**
 * The application frame's shared state, ported from `app-frame.tsx`: the dock
 * size the frame draws, the borrow count, the work-area width and the slot a
 * `SideDock` portals into. A context rather than props, because the dock is
 * rendered by the screen, deep inside the frame.
 */

/**
 * The dock's two sizes:
 *
 *   compact  the reading width beside the page
 *   half     half the work area: the page and the dock share it
 */
export type SideDockMode = "compact" | "half";

/**
 * Where the frame's 8px gutter runs.
 *
 *   all    every side (the default): the panels float on the canvas.
 *   sides  left, right and bottom only; the panels run to the window's top edge.
 */
export type AppFrameInset = "all" | "sides";

/** The gap between the page and the dock: the dock's `ml-2`. */
export const DOCK_GAP = 8;
/** The compact dock's reading width, `w-95`. */
export const DOCK_WIDTH = "23.75rem";
/** How long to wait before measuring a borrowed dock: one layout step. */
const BORROW_WAIT_MS = 16;

export interface SideDockState {
  /** The element a `SideDock` portals into; null until the frame has mounted. */
  readonly slot: HTMLElement | null;
  /** What the dock is drawn at: the chosen size, widened by any borrow. */
  readonly mode: SideDockMode;
  /** Width of the work area (page + dock), in px. 0 outside a frame. */
  readonly work: number;
  readonly inset: AppFrameInset;
  /** A pick from the size control: reported to the app, and it ends every borrow. */
  setMode(mode: SideDockMode): void;
  borrow(id: string): void;
  release(id: string): void;
}

const KEY = Symbol("f5-app-frame");

export function setSideDockState(state: SideDockState): void {
  setContext(KEY, state);
}

export function getSideDockState(): SideDockState {
  const state = getContext<SideDockState | undefined>(KEY);
  if (!state) {
    // Outside a frame: the dock draws nothing, as the React default does.
    return {
      slot: null,
      mode: "compact",
      work: 0,
      inset: "all",
      setMode: () => {},
      borrow: () => {},
      release: () => {},
    };
  }
  return state;
}

/** The dock's drawn size and the setter its size control uses. */
export function useSideDock(): { readonly mode: SideDockMode; setMode: (mode: SideDockMode) => void } {
  const state = getSideDockState();
  return {
    get mode() {
      return state.mode;
    },
    setMode: (mode) => state.setMode(mode),
  };
}

let borrowSeq = 0;

/**
 * Borrow room from the dock for something that will not fit in it. `expand()`
 * widens a compact dock to half and returns how long to wait before measuring
 * the wider dock (0 when there was nothing to do, or no frame). `restore()`
 * gives the room back; unmounting does too (`onDestroy` in the caller's
 * component, via the returned `release`). A borrow never reaches
 * `onDockModeChange`.
 */
export function useSideDockRoom(): { expand: () => number; restore: () => void; release: () => void } {
  const state = getSideDockState();
  const id = `borrow-${++borrowSeq}`;
  return {
    expand: () => {
      if (state.work === 0 || state.mode !== "compact") return 0;
      state.borrow(id);
      return BORROW_WAIT_MS;
    },
    restore: () => state.release(id),
    release: () => state.release(id),
  };
}
