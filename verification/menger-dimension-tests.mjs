// Appendix A.8: the dimension d of the Menger sponge as a rational cut.
// p/q < d (q > 0) is decided by one integer comparison 3^p < 20^q. These tests run
// the comparisons quoted in A.8; the general statements (Proposition A.5) are proved by hand.
import test from 'node:test';
import assert from 'node:assert/strict';

// For an integer p and q > 0: -1 if p/q < d, +1 if d < p/q. Equality never occurs.
function side(p, q) {
  p = BigInt(p); q = BigInt(q);
  assert(q > 0n);
  if (p < 0n) return -1;                      // 3^p < 1 < 20^q
  const lhs = 3n ** p, rhs = 20n ** q;
  assert.notEqual(lhs, rhs);                  // odd versus even
  return lhs < rhs ? -1 : 1;
}

test('the first decimal places: 3^272 < 20^100 < 3^273, so 2.72 < d < 2.73', () => {
  assert.equal(side(272, 100), -1);
  assert.equal(side(273, 100), 1);
  assert.equal(String(3n ** 272n).length, 130);
  assert.equal(String(20n ** 100n).length, 131);
  assert.equal(String(3n ** 273n).length, 131);
});

test('the evidence on both sides: 9 < 20 and 20 < 27', () => {
  assert.equal(side(2, 1), -1);
  assert.equal(side(3, 1), 1);
});

test('33 comparisons with the fraction between the ends give 10711/3928 < d < 14095/5169', () => {
  let [a, b, c, e] = [2n, 1n, 3n, 1n];        // a/b < d < c/e
  let digits = 0;
  for (let i = 0; i < 33; i++) {
    const p = a + c, q = b + e;
    digits = Math.max(digits, String(3n ** p).length, String(20n ** q).length);
    if (side(p, q) < 0) [a, b] = [p, q]; else [c, e] = [p, q];
  }
  assert.deepEqual([a, b, c, e], [10711n, 3928n, 14095n, 5169n]);
  assert.equal(c * b - a * e, 1n);            // width 1/(3928*5169)
  assert.equal(b * e, 20303832n);
  assert.equal(digits, 6726);
});

test('every rational lies on exactly one side, decided by one comparison', () => {
  for (let q = 1; q <= 40; q++) for (let p = -5; p <= 3 * q; p++) {
    const s = side(p, q);
    assert(s === -1 || s === 1);
    if (s < 0 && p >= 0) assert(3n ** BigInt(p) < 20n ** BigInt(q));
  }
});
