/**
 * A CSS-style cubic-bezier easing, as `motion` takes it for `EASE_PANEL`.
 * `x` is solved by Newton iteration with a bisection fallback, so the curve
 * matches the browser's own timing function for the same four numbers.
 */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  return (x: number): number => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const error = sampleX(t) - x;
      if (Math.abs(error) < 1e-6) break;
      const slope = slopeX(t);
      if (Math.abs(slope) < 1e-6) break;
      t -= error / slope;
    }
    let low = 0;
    let high = 1;
    t = Math.min(1, Math.max(0, t));
    for (let i = 0; i < 20 && Math.abs(sampleX(t) - x) > 1e-6; i++) {
      if (sampleX(t) < x) low = t;
      else high = t;
      t = (low + high) / 2;
    }
    return sampleY(t);
  };
}
