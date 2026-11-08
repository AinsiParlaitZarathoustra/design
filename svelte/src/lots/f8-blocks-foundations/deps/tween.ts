/**
 * A requestAnimationFrame driver for the one-value tweens the blocks run:
 * the infinite slider's loop and its hover hand-off, and the scroll rail's
 * reading position. It stands in for `motion`'s `animate`, which the Svelte
 * port does not depend on. Time comes from the frame timestamp, so a test
 * that replaces `requestAnimationFrame` controls the clock exactly.
 */

export type Ease = (t: number) => number;

export interface TweenOptions {
  from: number;
  to: number;
  /** One cycle, in seconds. */
  duration: number;
  ease?: Ease;
  /** Loop from `from` to `to` again, calling `onRepeat` at each cycle start. */
  repeat?: boolean;
  onUpdate: (value: number) => void;
  onRepeat?: () => void;
  onComplete?: () => void;
}

/** Runs the tween and returns a function that stops it. */
export function tween(options: TweenOptions): () => void {
  const { from, to, duration, repeat = false, onUpdate, onRepeat, onComplete } = options;
  const ease = options.ease ?? ((t: number) => t);

  if (duration <= 0) {
    onUpdate(to);
    onComplete?.();
    return () => {};
  }

  let frame = 0;
  // The clock starts when the tween is created, as `motion`'s does: the first
  // frame already has its elapsed time, rather than showing a still start.
  const start = performance.now();
  let cycle = 0;
  let stopped = false;

  const step = (now: number) => {
    if (stopped) return;
    const elapsed = (now - start) / 1000;

    if (repeat) {
      const current = Math.floor(elapsed / duration);
      if (current > cycle) {
        cycle = current;
        onRepeat?.();
      }
      const progress = (elapsed - current * duration) / duration;
      onUpdate(from + (to - from) * ease(progress));
      frame = requestAnimationFrame(step);
      return;
    }

    const progress = Math.min(1, elapsed / duration);
    onUpdate(from + (to - from) * ease(progress));
    if (progress >= 1) {
      stopped = true;
      onComplete?.();
      return;
    }
    frame = requestAnimationFrame(step);
  };

  frame = requestAnimationFrame(step);
  return () => {
    stopped = true;
    cancelAnimationFrame(frame);
  };
}
