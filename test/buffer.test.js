'use strict';

const assert = require('assert');
const CircularBuffer = require('../src/index');

const hasValue = list => list.some(data => data !== void 0);
const push = (q, count) => {
  for (let i = 0; i < count; i++) q.push(i);
};
const shift = (q, count) => {
  for (let i = 0; i < count; i++) q.shift();
};

describe('Buffer', () => {
  const CAPACITY = 2048;
  const MASK = CAPACITY - 1;
  const OVER_CAPACITY = CAPACITY + 1;

  let Q;

  beforeEach(() => {
    Q = new CircularBuffer();
  });

  it('push (1) = shift (1)', () => {
    const data = 42;

    Q.push(data);

    assert.deepStrictEqual(Q.shift(), data);
    assert.deepStrictEqual(Q.shift(), null);
  });

  it(`push (${CAPACITY}) = CAPACITY`, () => {
    push(Q, CAPACITY);

    const { tail, head } = Q;

    assert.ok(tail.next !== null);
    assert.ok(head.next === null);
    assert.deepStrictEqual(tail.list[MASK], MASK);
    assert.deepStrictEqual(hasValue(head.list), false);
  });

  it(`push (${OVER_CAPACITY}) = shift (${OVER_CAPACITY})`, () => {
    push(Q, OVER_CAPACITY);
    shift(Q, CAPACITY);

    const { tail, head } = Q;

    assert.ok(tail.next === null);
    assert.ok(head.next === null);
    assert.deepStrictEqual(Q.shift(), CAPACITY);
    assert.deepStrictEqual(Q.shift(), null);
  });
});
