import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  ZERO, succ, pair, parseSymbol, printSymbol,
  encodeNat, decodeNat, encodeInt, decodeInt, encodeRat, decodeRat,
  encodeList, decodeList, encodePolynomial, decodePolynomial, encodeField, decodeField,
  encodeComplex, decodeComplex, encodeQuaternion, decodeQuaternion,
  encodeText, decodeText, encodeJSON, decodeJSON,
} from './concept-codec.mjs';
import { q, qstr, verifyApplicationCertificate } from './applications.mjs';
import { field, fieldJSON, fieldConstant, epsilon } from './formal-field.mjs';

const round = node => parseSymbol(printSymbol(node));
const O = fieldConstant(q(1)), Z = fieldConstant(q(0));
const sameField = (actual, expected) => assert.deepEqual(fieldJSON(actual), fieldJSON(expected));

test('the alphabet grammar parses whole terms, canonicalizes whitespace, and counts successors', () => {
  assert.equal(printSymbol(parseSymbol(' ( f( ), f( f( ) ) ) ')), '(f(),f(f()))');
  assert.equal(decodeNat(parseSymbol('f(f(f()))')), 2n);
  assert.equal(printSymbol(succ(pair(ZERO, ZERO))), 'f((f(),f()))');
  for (const text of ['', '()', 'f', 'f(f())x', 'f(),f()', '(f())', '(f(),)', '(f(),f(),f())', 'g()', 'f(1)', 'f())']) {
    assert.throws(() => parseSymbol(text), undefined, text);
  }
});

test('iterative parser and printer support deeply nested unary values without call-stack recursion', () => {
  const source = printSymbol(encodeNat(12000));
  assert.equal(source.length, 36003);
  assert.equal(decodeNat(parseSymbol(source)), 12000n);
});

test('explicit parser, printer, numeral, and JSON limits reject excessive workloads', () => {
  assert.throws(() => encodeNat(101, { maxNatural: 100 }), /maxNatural/);
  assert.throws(() => parseSymbol('f(f())', { maxDepth: 1, maxNodes: 1 }), /maxNodes/);
  assert.throws(() => parseSymbol('f(f(f()))', { maxDepth: 1 }), /maxDepth/);
  assert.throws(() => printSymbol(encodeNat(2), { maxChars: 8 }), /maxChars/);
  assert.throws(() => printSymbol(encodeNat(2), { maxNodes: 2 }), /maxNodes/);
  assert.throws(() => encodeJSON([[null]], { maxJSONDepth: 1 }), /maxJSONDepth/);
  assert.throws(() => parseSymbol('f()', { invalidLimit: 1 }), /unknown/);
});

test('natural and signed integer examples agree exactly with the author notation', () => {
  assert.equal(printSymbol(encodeNat(0)), 'f()');
  assert.equal(printSymbol(encodeInt(-2)), '(f(f()),f(f(f())))');
  for (const n of [-120n, -2n, -1n, 0n, 1n, 2n, 120n]) assert.equal(decodeInt(round(encodeInt(n))), n);
  assert.throws(() => encodeNat(-1), /negative/);
  assert.throws(() => encodeNat(Number.MAX_SAFE_INTEGER + 1), /safe integer/);
  assert.throws(() => decodeNat(pair(ZERO, ZERO)), /natural/);
  assert.throws(() => decodeInt(pair(encodeNat(1), ZERO)), /negative zero/);
  assert.throws(() => decodeInt(pair(encodeNat(2), encodeNat(1))), /sign/);
});

test('rational symbols preserve reduced values and reject zero, negative, or unreduced denominators', () => {
  assert.equal(printSymbol(encodeRat(q(-2))), '((f(f()),f(f(f()))),(f(),f(f())))');
  for (const r of [q(0), q(1), q(-2), q(7, 11), q(-7, 11)]) assert.equal(qstr(decodeRat(round(encodeRat(r)))), qstr(r));
  assert.throws(() => decodeRat(pair(encodeInt(1), encodeInt(0))), /positive/);
  assert.throws(() => decodeRat(pair(encodeInt(1), encodeInt(-2))), /positive/);
  assert.throws(() => decodeRat(pair(encodeInt(2), encodeInt(4))), /noncanonical rational/);
  assert.throws(() => decodeRat(pair(encodeInt(0), encodeInt(2))), /noncanonical rational/);
});

test('finite lists distinguish empty lists from singleton zero and reject improper tails', () => {
  assert.equal(printSymbol(encodeList([])), 'f()');
  assert.equal(printSymbol(encodeList([ZERO])), '(f(),f())');
  assert.deepEqual(decodeList(round(encodeList([ZERO, encodeNat(2)]))).map(n => decodeNat(n)), [0n, 2n]);
  assert.throws(() => decodeList(pair(ZERO, succ(ZERO))), /terminator/);
});

test('M encodes all finite rational polynomials, with epsilon squared different from epsilon', () => {
  assert.equal(printSymbol(encodePolynomial([])), 'f()');
  for (const p of [[], [q(1)], [q(0), q(1)], [q(0), q(0), q(1)], [q(1, 2), q(-3), q(7, 5)]]) {
    assert.deepEqual(decodePolynomial(round(encodePolynomial(p))).map(qstr), p.map(qstr));
  }
  assert.notEqual(printSymbol(encodePolynomial([q(0), q(1)])), printSymbol(encodePolynomial([q(0), q(0), q(1)])));
  assert.deepEqual(decodePolynomial(encodePolynomial([q(1), q(0)])).map(qstr), ['1/1']);
  assert.throws(() => decodePolynomial(encodeList([encodeRat(q(1)), encodeRat(q(0))])), /trailing zero/);
});

test('formal field representation normalizes gcd and monic denominator, while decoder enforces canonical form', () => {
  const inputs = [Z, O, epsilon(), field([q(0), q(0), q(1)], [q(1), q(1)]), { numerator: [q(2), q(2)], denominator: [q(4), q(4)] }];
  for (const f of inputs) sameField(decodeField(round(encodeField(f))), f);
  assert.throws(() => decodeField(pair(encodePolynomial([q(1)]), ZERO)), /zero/);
  assert.throws(() => decodeField(pair(encodePolynomial([q(2)]), encodePolynomial([q(2)]))), /noncanonical/);
  assert.throws(() => decodeField(pair(ZERO, encodePolynomial([q(0), q(1)]))), /noncanonical/);
});

test('complex matrix codec enforces equal diagonal and opposite off-diagonal entries', () => {
  const c = { real: field([q(1), q(1)]), imag: field([q(-2)], [q(1), q(1)]) };
  const decoded = decodeComplex(round(encodeComplex(c)));
  sameField(decoded.real, c.real); sameField(decoded.imag, c.imag);
  const eO = encodeField(O), eZ = encodeField(Z);
  assert.throws(() => decodeComplex(pair(pair(eO, eZ), pair(eZ, eZ))), /matrix constraint/);
  assert.throws(() => decodeComplex(pair(pair(eO, eO), pair(eO, eO))), /matrix constraint/);
});

test('quaternion symbols are two constrained complex matrices for z plus w j', () => {
  const h = { z: { real: O, imag: epsilon() }, w: { real: Z, imag: fieldConstant(q(-2)) } };
  const decoded = decodeQuaternion(round(encodeQuaternion(h)));
  for (const part of ['z', 'w']) for (const axis of ['real', 'imag']) sameField(decoded[part][axis], h[part][axis]);
  assert.throws(() => decodeQuaternion(pair(encodeComplex(h.z), ZERO)), /pair/);
});

test('UTF-8 text round trips Japanese, supplementary characters, NUL, and initial BOM', () => {
  for (const text of ['', 'f(), λ', '自然数から四元数', '𝕙😀', '\0a', '\uFEFF先頭']) assert.equal(decodeText(round(encodeText(text))), text);
  assert.throws(() => encodeText('\ud800'), /surrogate/);
  assert.throws(() => decodeText(encodeList([encodeNat(256)])), /255/);
  assert.throws(() => decodeText(encodeList([encodeNat(0xc0), encodeNat(0x80)])), /UTF-8/);
  assert.throws(() => decodeText(encodeList([encodeNat(0xe3), encodeNat(0x81)])), /UTF-8/);
});

test('JSON constructors distinguish null, booleans, numbers, strings, arrays, and objects', () => {
  const values = [null, false, true, 0, -3, 0.125, 1e30, Number.MIN_VALUE, '', '0', [], {}, [null, true], { b: 2, a: ['λ', false] }];
  const codes = values.map(v => printSymbol(encodeJSON(v)));
  assert.equal(new Set(codes).size, values.length);
  values.forEach((v, i) => assert.deepEqual(decodeJSON(parseSymbol(codes[i])), v));
  assert.equal(printSymbol(encodeJSON({ b: 2, a: 1 })), printSymbol(encodeJSON({ a: 1, b: 2 })));
});

test('JSON rejects unsupported values rather than silently changing them', () => {
  const cycle = {}; cycle.self = cycle;
  const sparse = []; sparse.length = 2;
  const extras = [1]; extras.other = 2;
  for (const value of [undefined, NaN, Infinity, -Infinity, -0, 1n, () => 1, new Date(), new Map(), cycle, sparse, extras, { x: undefined }]) {
    assert.throws(() => encodeJSON(value));
  }
  const getter = {}; Object.defineProperty(getter, 'x', { enumerable: true, get() { throw new Error('getter executed'); } });
  assert.throws(() => encodeJSON(getter), /accessors/);
  const arrayGetter = [0]; Object.defineProperty(arrayGetter, '0', { enumerable: true, get() { throw new Error('getter executed'); } });
  assert.throws(() => encodeJSON(arrayGetter), /accessors/);
  const arrayHidden = [1]; Object.defineProperty(arrayHidden, 'hidden', { value: 2 });
  assert.throws(() => encodeJSON(arrayHidden), /extra properties/);
});

test('JSON decoder rejects duplicate or unsorted keys, invalid tags, payloads, and numeric spellings', () => {
  const tag = (n, payload) => pair(encodeNat(n), payload);
  const entry = (key, value) => pair(encodeText(key), encodeJSON(value));
  assert.throws(() => decodeJSON(tag(6, encodeList([entry('a', 1), entry('a', 2)]))), /duplicate/);
  assert.throws(() => decodeJSON(tag(6, encodeList([entry('b', 1), entry('a', 2)]))), /noncanonical/);
  assert.throws(() => decodeJSON(tag(7, ZERO)), /tag/);
  assert.throws(() => decodeJSON(tag(0, succ(ZERO))), /payload/);
  for (const text of ['01', '+1', '1.0', '-0', 'Infinity', 'NaN', '', ' 1']) assert.throws(() => decodeJSON(tag(3, encodeText(text))), /noncanonical/);
});

test('JSON prototype-looking property names remain data and cannot change object prototypes', () => {
  const value = JSON.parse('{"__proto__":{"polluted":true},"constructor":"data","prototype":3}');
  const decoded = decodeJSON(round(encodeJSON(value)));
  assert.deepEqual(decoded, value);
  assert.equal(Object.getPrototypeOf(decoded), Object.prototype);
  assert.equal({}.polluted, undefined);
});

test('malformed or cyclic in-memory nodes fail with a bounded error', () => {
  assert.throws(() => printSymbol({ kind: 'zero', extra: true }), /invalid/);
  const cyclic = { kind: 'succ' }; cyclic.value = cyclic;
  assert.throws(() => decodeNat(cyclic), /cyclic/);
  assert.throws(() => printSymbol(cyclic, { maxDepth: 16 }), /maxDepth/);
  const cyclicList = { kind: 'pair', left: ZERO }; cyclicList.right = cyclicList;
  assert.throws(() => decodeList(cyclicList), /cyclic/);
});

test('an actual saved proof certificate survives full alphabet serialization and still verifies', async () => {
  const release = JSON.parse(await readFile(new URL('../release.json', import.meta.url), 'utf8'));
  const bundle = JSON.parse(await readFile(new URL(`./certificates/application-examples-v${release.paperVersion}.json`, import.meta.url), 'utf8'));
  const original = bundle.certificates[0];
  const restored = decodeJSON(parseSymbol(printSymbol(encodeJSON(original))));
  assert.deepEqual(restored, original);
  assert.equal(verifyApplicationCertificate(restored).ok, true);
  restored.claim.value = '0/1';
  assert.equal(verifyApplicationCertificate(restored).ok, false);
});
