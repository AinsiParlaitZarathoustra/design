// The arrow's spring, as motion's `type: "spring"` integrates it: a damped
// harmonic oscillator (mass 1) that stops when it is at rest on its target.

export type ArrowVariant = "normal" | "animate";

const SPRINGS: Record<ArrowVariant, { target: number; stiffness: number; damping: number; mass: number }> = {
  normal: { target: 0, stiffness: 300, damping: 35, mass: 1 },
  animate: { target: -2, stiffness: 280, damping: 34, mass: 1 },
};

export function createArrowSpring() {
  let y = $state(0);
  let velocity = 0;
  let frame = 0;

  function cancel() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  }

  function start(variant: ArrowVariant) {
    cancel();
    const { target, stiffness, damping, mass } = SPRINGS[variant];
    let v = velocity;
    let last = performance.now();
    const step = (now: number) => {
      // Frame steps, capped so a background tab cannot blow the integration up.
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const force = -stiffness * (y - target) - damping * v;
      v += (force / mass) * dt;
      y += v * dt;
      if (Math.abs(y - target) < 0.01 && Math.abs(v) < 0.01) {
        y = target;
        velocity = 0;
        frame = 0;
        return;
      }
      velocity = v;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  }

  return {
    get y() {
      return y;
    },
    start,
    destroy: cancel,
  };
}
