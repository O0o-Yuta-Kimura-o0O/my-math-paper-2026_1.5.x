// §10.6: binary numerals bz, b0 w, b1 w (the outermost symbol is the last digit), with decB, succB and addB
// written rule for rule as in the paper. Each rule application of addB and succB is counted.
// These tests run chosen inputs; Proposition 10.6 and the step bound are proved by hand in the paper
// (Proposition 10.6 is also checked in Lean 4, Rocq and Agda, verification/proof-assistants/).
import test from 'node:test';
import assert from 'node:assert/strict';

const bz = null, b0 = w => ({d: 0, w}), b1 = w => ({d: 1, w});
const decB = u => (u === bz ? 0n : 2n * decB(u.w) + BigInt(u.d));
const digits = u => (u === bz ? 0 : 1 + digits(u.w));
const trailingOnes = u => (u !== bz && u.d === 1 ? 1 + trailingOnes(u.w) : 0);

function succB(u, c) {
  c.n++;
  if (u === bz) return b1(bz);                 // succB(bz)   = b1 bz
  if (u.d === 0) return b1(u.w);               // succB(b0 w) = b1 w
  return b0(succB(u.w, c));                     // succB(b1 w) = b0 succB(w)
}
function addB(v, w, c) {
  c.n++;
  if (v === bz) return w;                       // addB(bz, w) = w
  if (w === bz) return v;                       // addB(b0 v, bz) = b0 v ; addB(b1 v, bz) = b1 v
  const r = addB(v.w, w.w, c);
  if (v.d === 0 && w.d === 0) return b0(r);     // addB(b0 v, b0 w) = b0 addB(v, w)
  if (v.d + w.d === 1) return b1(r);            // addB(b0 v, b1 w) = addB(b1 v, b0 w) = b1 addB(v, w)
  return b0(succB(r, c));                       // addB(b1 v, b1 w) = b0 succB(addB(v, w))
}
function bin(n) {                               // bin(0) = bz, bin(S n) = succB(bin(n)), computed by digits
  let u = bz;
  const s = n.toString(2);
  if (n === 0n) return u;
  for (const ch of s) u = ch === '1' ? b1(u) : b0(u);
  return u;
}
const steps = (x, y) => { const c = {n: 0}; const r = addB(bin(x), bin(y), c); return {r, n: c.n}; };

test('bin agrees with the rules bin(0) = bz, bin(S n) = succB(bin(n)) and decB(bin(n)) = n', () => {
  let u = bz;
  for (let n = 0n; n < 1000n; n++) {
    assert.deepEqual(bin(n), u);
    assert.equal(decB(u), n);
    u = succB(u, {n: 0});
  }
});

test('2 + 3 is computed as 10 + 11 = 101 with 4 rule applications', () => {
  const {r, n} = steps(2n, 3n);
  assert.equal(decB(r), 5n);
  assert.equal(n, 4);
});

test('1000000 + 1000000 takes 28 rule applications on two 20-digit numerals', () => {
  assert.equal(digits(bin(1000000n)), 20);
  const {r, n} = steps(1000000n, 1000000n);
  assert.equal(decB(r), 2000000n);
  assert.equal(n, 28);
});

test('Proposition 10.6 and the step bound A(v,w) + t(addB(v,w)) <= |v| + |w| + 1 on 0..599 squared', () => {
  let attained = false;
  for (let x = 0n; x < 600n; x++) for (let y = 0n; y < 600n; y++) {
    const v = bin(x), w = bin(y), c = {n: 0}, r = addB(v, w, c);
    assert.equal(decB(r), x + y);
    const lhs = c.n + trailingOnes(r), rhs = digits(v) + digits(w) + 1;
    assert(lhs <= rhs, `${x}+${y}: ${lhs} > ${rhs}`);
    if (lhs === rhs) attained = true;
  }
  assert(attained, 'the bound is attained');
});

test('the bound also holds for numerals with leading zeros', () => {
  const pad = (u, k) => { if (u === bz) { let z = bz; for (let i = 0; i < k; i++) z = b0(z); return z; } return {d: u.d, w: pad(u.w, k)}; };
  for (let x = 0n; x < 64n; x++) for (let y = 0n; y < 64n; y++) for (const [i, j] of [[0, 2], [3, 0], [1, 1]]) {
    const v = pad(bin(x), i), w = pad(bin(y), j), c = {n: 0}, r = addB(v, w, c);
    assert.equal(decB(r), x + y);
    assert(c.n + trailingOnes(r) <= digits(v) + digits(w) + 1);
  }
});
