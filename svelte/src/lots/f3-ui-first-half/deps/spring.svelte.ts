// Local adapter for the spring motion the React source takes from `motion/react`.
// The Svelte port has no motion library, and the package manifest is the
// pilot's to change, so the physics live here: the same ODE framer-motion
// solves (mass 1), x'' = -stiffness·(x - target) - damping·x', stepped per
// frame, with a rest snap so the value lands exactly on its target.

export interface SpringConfig {
  stiffness: number;
  damping: number;
}

const REST_DELTA = 0.01;
const REST_SPEED = 0.01;
const MAX_STEP = 1 / 240;

/** A number that moves toward a target along a spring. Reactive through `current`. */
export class SpringValue {
  current = $state(0);

  #target: number;
  #velocity = 0;
  #config: SpringConfig = { stiffness: 0, damping: 0 };
  #frame = 0;
  #last = 0;

  constructor(initial: number) {
    this.current = initial;
    this.#target = initial;
  }

  to(target: number, config: SpringConfig) {
    this.#target = target;
    this.#config = config;
    if (this.#frame === 0) {
      this.#last = performance.now();
      this.#frame = requestAnimationFrame(this.#step);
    }
  }

  destroy() {
    if (this.#frame !== 0) cancelAnimationFrame(this.#frame);
    this.#frame = 0;
  }

  #step = (now: number) => {
    const elapsed = Math.min((now - this.#last) / 1000, 1 / 30);
    this.#last = now;
    const { stiffness, damping } = this.#config;
    const target = this.#target;
    let x = this.current;
    let v = this.#velocity;
    for (let remaining = elapsed; remaining > 0; ) {
      const h = Math.min(remaining, MAX_STEP);
      v += (-stiffness * (x - target) - damping * v) * h;
      x += v * h;
      remaining -= h;
    }
    if (Math.abs(x - target) < REST_DELTA && Math.abs(v) < REST_SPEED) {
      x = target;
      v = 0;
    }
    this.current = x;
    this.#velocity = v;
    this.#frame = x === target && v === 0 ? 0 : requestAnimationFrame(this.#step);
  };
}
