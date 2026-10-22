// Tiny interruptible spring, parameterised the way Apple describes springs:
// response (seconds, how fast it gets there) and damping (1 = no overshoot).
// Retargeting keeps the current value and velocity, so motion never jumps.

export class Spring {
  constructor(value = 0, { response = 0.38, damping = 1, precision = 0.01, onUpdate, onRest } = {}) {
    this.value = value;
    this.precision = precision;
    this.target = value;
    this.velocity = 0;
    this.onUpdate = onUpdate;
    this.onRest = onRest;
    this.configure({ response, damping });
    this.frame = 0;
    this.last = 0;
    this.tick = this.tick.bind(this);
  }

  configure({ response = this.response, damping = this.damping } = {}) {
    this.response = response;
    this.damping = damping;
    const omega = (2 * Math.PI) / response;
    this.stiffness = omega * omega;
    this.friction = 2 * damping * omega;
    return this;
  }

  to(target, { velocity, response, damping } = {}) {
    if (response || damping) this.configure({ response, damping });
    if (typeof velocity === 'number') this.velocity = velocity;
    this.target = target;
    if (!this.frame) {
      this.last = performance.now();
      this.frame = requestAnimationFrame(this.tick);
    }
    return this;
  }

  jump(value) {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.value = this.target = value;
    this.velocity = 0;
    this.onUpdate?.(value);
    return this;
  }

  tick(now) {
    // Fixed sub-steps keep the integration stable on slow frames.
    let dt = Math.min((now - this.last) / 1000, 0.25);
    this.last = now;
    const step = 1 / 240;
    while (dt > 0) {
      const h = Math.min(step, dt);
      const force = -this.stiffness * (this.value - this.target) - this.friction * this.velocity;
      this.velocity += force * h;
      this.value += this.velocity * h;
      dt -= h;
    }
    const settled = Math.abs(this.velocity) < this.precision * 5 && Math.abs(this.value - this.target) < this.precision;
    if (settled) {
      this.value = this.target;
      this.velocity = 0;
      this.frame = 0;
      this.onUpdate?.(this.value);
      this.onRest?.(this.value);
      return;
    }
    this.onUpdate?.(this.value);
    this.frame = requestAnimationFrame(this.tick);
  }
}
