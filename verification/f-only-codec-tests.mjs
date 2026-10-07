import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  ZERO, succ, pair, printSymbol, encodeNat, decodeNat, encodeInt, decodeInt,
  encodeRat, decodeRat, encodePolynomial, decodePolynomial, encodeField,
  decodeField, encodeComplex, decodeComplex, encodeQuaternion, decodeQuaternion,
  encodeJSON, decodeJSON,
} from './concept-codec.mjs';
import { CODEC_LIMITS, parseFOnly, printFOnly, convertToFOnly, convertFromFOnly } from './f-only-codec.mjs';
import { q, qstr } from './applications.mjs';
import { field, fieldJSON, fieldConstant, epsilon } from './formal-field.mjs';
import { checkBundle } from './equational-checker.mjs';

const round = node => parseFOnly(printFOnly(node));

test('zero, unary successor, and binary pair are exactly the three f child counts', () => {
  assert.deepEqual(parseFOnly('f()'), ZERO);
  assert.deepEqual(parseFOnly('f(f())'), succ(ZERO));
  assert.deepEqual(parseFOnly('f(f()f())'), pair(ZERO, ZERO));
  assert.equal(printFOnly(succ(pair(ZERO, ZERO))), 'f(f(f()f()))');
  assert.equal(printFOnly(pair(succ(ZERO), ZERO)), 'f(f(f())f())');
});

test('the author integer-two example is preserved exactly', () => {
  assert.equal(printFOnly(encodeInt(2)), 'f(f()f(f(f())))');
  assert.equal(convertToFOnly('(f(), f(f(f())))'), 'f(f()f(f(f())))');
  assert.equal(convertFromFOnly('f(f()f(f(f())))'), '(f(),f(f(f())))');
  assert.equal(decodeInt(parseFOnly('f(f()f(f(f())))')), 2n);
});

test('both conversions preserve all constructors and canonicalize only whitespace', () => {
  const examples = [ZERO, succ(ZERO), pair(ZERO, ZERO), succ(pair(ZERO, succ(ZERO))), pair(pair(ZERO, ZERO), succ(ZERO))];
  for (const node of examples) {
    const before = printSymbol(node), after = printFOnly(node);
    assert.equal(convertToFOnly(before), after);
    assert.equal(convertFromFOnly(after), before);
    assert.deepEqual(round(node), node);
    assert.equal(after.length, before.length);
    assert.match(after, /^[f()]+$/u);
  }
  assert.equal(convertToFOnly(' \n( f ( ) , f ( f ( ) ) )\t'), 'f(f()f(f()))');
});

test('all finite trees up to seven nodes have distinct f-only spellings and recover uniquely', () => {
  const bySize = [[], [ZERO]], unique = new Set();
  for (let size = 1; size <= 7; ++size) {
    if (size > 1) {
      bySize[size] = bySize[size - 1].map(succ);
      for (let left = 1; left < size - 1; ++left) {
        for (const a of bySize[left]) for (const b of bySize[size - 1 - left]) bySize[size].push(pair(a, b));
      }
    }
    for (const node of bySize[size]) {
      const text = printFOnly(node);
      assert.equal(unique.has(text), false, text); unique.add(text);
      assert.deepEqual(parseFOnly(text), node);
    }
  }
  assert.equal(unique.size, 89);
});

test('commas, independent parentheses, more than two children, and additional roots are rejected', () => {
  for (const text of ['', '()', '(f())', '(f(),f())', 'f(f(),f())', 'f(f()f()f())', 'f(f(f()f()f()))', 'f()f()', 'f() f()', 'f', 'ff()', 'F()', 'f(0)', 'f())', 'f(f()', 'f[ ]']) {
    assert.throws(() => parseFOnly(text), undefined, text);
  }
  assert.throws(() => convertToFOnly('f(f()f())'));
  assert.throws(() => convertFromFOnly('(f(),f())'));
});

test('spaces and newlines may separate tokens without becoming structural children', () => {
  assert.equal(printFOnly(parseFOnly('\n f ( f ( )\n f ( f ( ) ) ) \t')), 'f(f()f(f()))');
  assert.deepEqual(parseFOnly('f(f()f())'), parseFOnly('f ( f ( ) f ( ) )'));
});

test('resource bounds are compatible with the concept codec and fail before unbounded work', () => {
  assert.equal(CODEC_LIMITS.maxChars, 32_000_000);
  assert.equal(CODEC_LIMITS.maxNodes, 8_000_000);
  assert.throws(() => parseFOnly('f(f())', { maxNodes: 1 }), /maxNodes/);
  assert.throws(() => parseFOnly('f(f(f()))', { maxDepth: 1 }), /maxDepth/);
  assert.throws(() => parseFOnly('f(f())', { maxChars: 5 }), /maxChars/);
  assert.throws(() => printFOnly(encodeNat(2), { maxNodes: 2 }), /maxNodes/);
  assert.throws(() => printFOnly(encodeNat(2), { maxDepth: 1 }), /maxDepth/);
  assert.throws(() => printFOnly(pair(ZERO, ZERO), { maxChars: 8 }), /maxChars/);
  assert.throws(() => parseFOnly('f()', { extra: 1 }), /unknown/);
  for (const options of [null, [], { maxChars: 0 }, { maxDepth: Infinity }, { maxNodes: 1.5 }]) assert.throws(() => parseFOnly('f()', options));
});

test('deep unary trees and wide shared trees serialize and parse without JavaScript recursion', () => {
  const deep = printFOnly(encodeNat(40000));
  assert.equal(decodeNat(parseFOnly(deep)), 40000n);
  let shared = ZERO;
  for (let i = 0; i < 18; ++i) shared = pair(shared, shared);
  const wide = printFOnly(shared);
  assert.equal(wide.length, 3 * (2 ** 19 - 1));
  assert.equal(printFOnly(parseFOnly(wide)), wide);
});

test('malformed nodes, cycles, and accessor properties fail instead of being interpreted', () => {
  for (const node of [null, 1, [], { kind: 'zero', extra: true }, { kind: 'toString' }, { kind: 'pair', left: ZERO }]) assert.throws(() => printFOnly(node));
  const cycle = { kind: 'succ' }; cycle.value = cycle;
  assert.throws(() => printFOnly(cycle), /cyclic/);
  let calls = 0;
  const accessor = { get kind() { ++calls; return 'zero'; } };
  assert.throws(() => printFOnly(accessor), /accessors/);
  const childAccessor = { kind: 'succ', get value() { ++calls; return ZERO; } };
  assert.throws(() => printFOnly(childAccessor), /accessors/);
  const optionsAccessor = { get maxNodes() { ++calls; return 10; } };
  assert.throws(() => parseFOnly('f()', optionsAccessor), /accessors/);
  assert.throws(() => convertToFOnly('f()', optionsAccessor), /accessors/);
  assert.throws(() => convertFromFOnly('f()', optionsAccessor), /accessors/);
  assert.throws(() => printFOnly({ kind: { toString() { ++calls; return 'zero'; } } }), /invalid/);
  assert.equal(calls, 0);
});

test('syntax accepts signed-zero structure while the integer interpretation rejects negative zero', () => {
  const text = 'f(f(f())f())';
  assert.deepEqual(parseFOnly(text), pair(encodeNat(1), ZERO));
  assert.throws(() => decodeInt(parseFOnly(text)), /negative zero/);
  assert.equal(decodeInt(parseFOnly('f(f()f())')), 0n);
  assert.throws(() => decodeNat(parseFOnly('f(f()f())')), /natural/);
});

test('natural, integer, rational, polynomial, field, complex, and quaternion interpretations survive the syntax change', () => {
  assert.equal(decodeNat(round(encodeNat(17))), 17n);
  assert.equal(decodeInt(round(encodeInt(-17))), -17n);
  assert.equal(qstr(decodeRat(round(encodeRat(q(-3, 7))))), '-3/7');
  const coefficients = [q(0), q(-1), q(3, 2)];
  assert.deepEqual(decodePolynomial(round(encodePolynomial(coefficients))).map(qstr), coefficients.map(qstr));
  const f = field(coefficients, [q(1), q(1)]);
  assert.deepEqual(fieldJSON(decodeField(round(encodeField(f)))), fieldJSON(f));
  const c = { real: f, imag: epsilon() };
  const cr = decodeComplex(round(encodeComplex(c)));
  for (const key of ['real', 'imag']) assert.deepEqual(fieldJSON(cr[key]), fieldJSON(c[key]));
  const h = { z: c, w: { real: fieldConstant(q(1)), imag: f } };
  const hr = decodeQuaternion(round(encodeQuaternion(h)));
  for (const part of ['z', 'w']) for (const key of ['real', 'imag']) assert.deepEqual(fieldJSON(hr[part][key]), fieldJSON(h[part][key]));
});

test('encoded program-looking text remains inert data and no expression is executed', () => {
  const key = '__f_only_codec_execution_probe__';
  const saved = Object.getOwnPropertyDescriptor(globalThis, key);
  try {
    delete globalThis[key];
    const source = `globalThis.${key} = true; throw new Error("must not execute");`;
    assert.equal(decodeJSON(round(encodeJSON(source))), source);
    assert.equal(Object.hasOwn(globalThis, key), false);
    assert.throws(() => parseFOnly(source), /expected f/);
    assert.equal(Object.hasOwn(globalThis, key), false);
  } finally {
    if (saved) Object.defineProperty(globalThis, key, saved);
    else delete globalThis[key];
  }
});

test('the complete saved sixteen-theorem certificate survives f-only encoding and the existing checker accepts it', async () => {
  const original = JSON.parse(await readFile(new URL('./certificates/nat-and-paths.json', import.meta.url), 'utf8'));
  const encoded = printFOnly(encodeJSON(original));
  const restored = decodeJSON(parseFOnly(encoded));
  assert.deepEqual(restored, original);
  assert.equal(checkBundle(restored).theoremCount, 16);
  restored.theorems[0].equation[1] = 'S(n)';
  assert.throws(() => checkBundle(restored));
});
