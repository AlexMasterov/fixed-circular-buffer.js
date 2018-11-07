function makeList() {
  return {
    t: 0,
    b: 0,
    l: new Array(2048),
    n: null,
  };
}

class CircularBuffer {
  constructor() {
    this.h = this.t = makeList();
    this.s = 0;
  }

  get length() {
    return this.s + 2048;
  }

  get size() {
    return this.h.t > this.t.b
      ? this.s + (this.h.t - this.t.b)
      : this.s - (this.t.b - this.h.t);
  }

  push(data) {
    const h = this.h;

    h.l[h.t] = data;
    h.t = (h.t + 1) & 2047;
    // is full?
    if ((h.t & 2047) === h.b) {
      this.h = h.n = makeList();
      this.s += 2048;
    }
  }

  shift() {
    const t = this.t;

    const data = t.l[t.b];
    if (data === void 0) return null;

    t.l[t.b] = void 0;
    t.b = (t.b + 1) & 2047;
    // is empty?
    if (t.t === t.b && t.n !== null) {
      this.t = t.n;
      this.s -= 2048;
    }

    return data;
  }
}

export default CircularBuffer;
