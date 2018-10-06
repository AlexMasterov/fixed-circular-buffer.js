'use strict';

const CAPACITY = 2048;
const MASK = CAPACITY - 1;

function makeList() {
  return {
    top: 0,
    bottom: 0,
    list: new Array(CAPACITY),
    next: null,
  };
}

class CircularBuffer {
  constructor() {
    this.head = this.tail = makeList();
    this.scale = 0;
  }

  get length() {
    return this.scale + CAPACITY;
  }

  get size() {
    return this.head.top > this.tail.bottom
      ? this.scale + (this.head.top - this.tail.bottom)
      : this.scale - (this.tail.bottom - this.head.top);
  }

  push(data) {
    const head = this.head;

    head.list[head.top] = data;
    head.top = (head.top + 1) & MASK;
    // is full?
    if ((head.top & MASK) === head.bottom) {
      this.head = head.next = makeList();
      this.scale += CAPACITY;
    }
  }

  shift() {
    const tail = this.tail;

    const data = tail.list[tail.bottom];
    if (data === void 0) return null;

    tail.list[tail.bottom] = void 0;
    tail.bottom = (tail.bottom + 1) & MASK;
    // is empty?
    if (tail.top === tail.bottom && tail.next !== null) {
      this.tail = tail.next;
      this.scale -= CAPACITY;
    }

    return data;
  }
}

module.exports = CircularBuffer;
