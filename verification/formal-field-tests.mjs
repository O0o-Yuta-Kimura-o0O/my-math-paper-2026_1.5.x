import test from 'node:test';
import assert from 'node:assert/strict';
import { q, qstr } from './applications.mjs';
import {
  poly, polyJSON, polyEq, polyAdd, polySub, polyMul, polyDivmod, polyGcd, polyMonic, polyOrd0,
  field, fieldJSON, fieldConstant, epsilon, fieldAdd, fieldSub, fieldMul, fieldDiv, fieldEq, fieldCmp, fieldOrd0,
  embedL, embedM, standardPart, generateFieldCertificate, verifyFieldCertificate,
} from './formal-field.mjs';

const Z = fieldConstant(q(0)), O = fieldConstant(q(1)), E = epsilon();
const verified = cert => {
  const result = verifyFieldCertificate(JSON.parse(JSON.stringify(cert)));
  assert.equal(result.ok, true, result.error);
};
const rejected = cert => assert.equal(verifyFieldCertificate(cert).ok, false);

test('polynomial trimming, arithmetic, and epsilon squared preserve degree', () => {
  assert.deepEqual(polyJSON(poly([q(1), q(0), q(0)])), ['1/1']);
  assert.deepEqual(polyJSON(poly([q(0), q(0)])), []);
  assert.deepEqual(polyJSON(polyAdd([q(1), q(2)], [q(-1), q(3)])), ['0/1', '5/1']);
  assert.deepEqual(polyJSON(polySub([q(1)], [q(1)])), []);
  assert.deepEqual(polyJSON(polyMul([q(1), q(1)], [q(1), q(-1)])), ['1/1', '0/1', '-1/1']);
  assert.deepEqual(fieldJSON(fieldMul(E, E)), { numerator: ['0/1', '0/1', '1/1'], denominator: ['1/1'] });
  assert.equal(fieldEq(fieldMul(E, E), E), false);
});

test('polynomial division reconstructs dividend and strictly bounds remainder', () => {
  const a = [q(1), q(0), q(1)], b = [q(1), q(1)], { quotient, remainder } = polyDivmod(a, b);
  assert.deepEqual(polyJSON(quotient), ['-1/1', '1/1']);
  assert.deepEqual(polyJSON(remainder), ['2/1']);
  assert.ok(polyEq(polyAdd(polyMul(quotient, b), remainder), a));
  assert.ok(remainder.length < poly(b).length);
  assert.deepEqual(polyDivmod([], b).remainder, []);
  assert.throws(() => polyDivmod(a, []), /zero/);
});

test('monic gcd over rational coefficients including zero inputs', () => {
  const a = polyMul([q(-1), q(1)], [q(2), q(2)]);
  const b = polyMul([q(-1), q(1)], [q(3), q(1)]);
  assert.deepEqual(polyJSON(polyGcd(a, b)), ['-1/1', '1/1']);
  assert.deepEqual(polyJSON(polyGcd([], [q(2), q(4)])), ['1/2', '1/1']);
  assert.deepEqual(polyJSON(polyGcd([], [])), []);
  assert.deepEqual(polyJSON(polyMonic([q(2), q(-4)])), ['-1/2', '1/1']);
});

test('epsilon cancellation, polynomial-factor cancellation, and idempotent normal form', () => {
  assert.ok(fieldEq(fieldDiv(E, E), O));
  const a = fieldAdd(O, E), result = fieldDiv(fieldMul(a, a), a);
  assert.deepEqual(fieldJSON(result), fieldJSON(a));
  const f = field([q(-2), q(-2)], [q(-4), q(0), q(-4)]);
  assert.deepEqual(fieldJSON(f), fieldJSON(field(f.numerator, f.denominator)));
  assert.equal(qstr(f.denominator.at(-1)), '1/1');
});

test('zero numerator normalizes but zero denominator always rejects, including 0/0', () => {
  assert.deepEqual(fieldJSON(field([], [q(0), q(1)])), fieldJSON(Z));
  assert.throws(() => field([], []), /zero/);
  assert.throws(() => field([q(1)], [q(0)]), /zero/);
  assert.throws(() => fieldDiv(O, Z), /zero/);
  assert.ok(fieldEq(fieldDiv(Z, E), Z));
});

test('cross-product equality accepts equivalent unnormalized pairs', () => {
  const a = { numerator: [q(2), q(2)], denominator: [q(4), q(4)] };
  assert.ok(fieldEq(a, fieldConstant(q(1, 2))));
  assert.equal(fieldEq(a, O), false);
  assert.throws(() => fieldEq({ numerator: [], denominator: [] }, Z), /zero/);
});

test('order at zero uses the denominator lowest coefficient, not its monic highest coefficient', () => {
  const negative = field([q(1)], [q(-1), q(1)]);
  assert.equal(qstr(negative.denominator.at(-1)), '1/1');
  assert.equal(fieldCmp(negative, Z), -1);
  assert.equal(fieldCmp(field([q(-1)], [q(-1), q(1)]), Z), 1);
  assert.equal(fieldCmp(field([q(1)], [q(0), q(-1), q(1)]), Z), -1);
  assert.equal(fieldCmp(E, Z), 1);
  assert.equal(fieldCmp(fieldMul(E, E), E), -1);
  assert.equal(fieldCmp(fieldAdd(O, E), O), 1);
  assert.equal(fieldCmp(fieldDiv(E, E), O), 0);
});

test('L embedding retains the old embedM API and uses k as the epsilon coefficient', () => {
  assert.equal(embedM, embedL);
  assert.deepEqual(fieldJSON(embedL(-2, q(3, 2))), { numerator: ['3/2', '-2/1'], denominator: ['1/1'] });
  assert.ok(fieldEq(embedM(0, q(1)), O));
  assert.equal(fieldCmp(embedM(1, q(2)), embedM(99, q(1))), 1);
  assert.throws(() => embedM(q(1, 2), q(1)), /integer/);
});

test('standard part is restricted to finite elements and handles all zero/order cases', () => {
  assert.equal(polyOrd0([]), null);
  assert.equal(fieldOrd0(Z), null);
  assert.equal(fieldOrd0(fieldDiv(O, E)), -1);
  assert.equal(qstr(standardPart(Z)), '0/1');
  assert.equal(qstr(standardPart(E)), '0/1');
  assert.equal(qstr(standardPart(embedM(-3, q(7, 4)))), '7/4');
  assert.equal(qstr(standardPart(field([q(0), q(2)], [q(0), q(3), q(1)]))), '2/3');
  assert.equal(qstr(standardPart(field([q(1)], [q(-1), q(1)]))), '-1/1');
  assert.throws(() => standardPart(fieldDiv(O, E)), /pole/);
  assert.throws(() => standardPart(field([q(0), q(1)], [q(0), q(0), q(1)])), /pole/);
});

test('finite examples of standard-part addition/multiplication respect the restricted domain', () => {
  const a = embedM(2, q(3)), b = field([q(5), q(1)], [q(2), q(-1)]);
  assert.equal(qstr(standardPart(fieldAdd(a, b))), '11/2');
  assert.equal(qstr(standardPart(fieldMul(a, b))), '15/2');
  assert.equal(qstr(standardPart(fieldSub(a, b))), '1/2');
});

test('all finite certificate operations serialize and replay', () => {
  const a = fieldAdd(O, E), b = field([q(1)], [q(-1), q(1)]);
  for (const operation of ['add', 'sub', 'mul', 'div', 'eq', 'compare']) verified(generateFieldCertificate(operation, [a, b]));
  verified(generateFieldCertificate('normalize', { numerator: [q(0), q(1)], denominator: [q(0), q(1)] }));
  verified(generateFieldCertificate('standardPart', a));
  verified(generateFieldCertificate('embedM', { k: -2, a: q(1, 3) }));
  verified(generateFieldCertificate('polyDivmod', [[q(1), q(0), q(1)], [q(1), q(1)]]));
  verified(generateFieldCertificate('polyGcd', [[q(-1), q(0), q(1)], [q(-1), q(1)]]));
});

test('field certificates reject changed results, gcd traces, signs, and premises', () => {
  let cert = generateFieldCertificate('compare', [field([q(1)], [q(-1), q(1)]), Z]);
  cert.claim.value = 1; rejected(cert);
  cert = generateFieldCertificate('compare', [field([q(1)], [q(-1), q(1)]), Z]);
  cert.steps[1].output.witness.sign.denominatorCoefficient = '1/1'; rejected(cert);
  cert = generateFieldCertificate('normalize', { numerator: [q(1), q(2), q(1)], denominator: [q(1), q(1)] });
  cert.steps[1].output.witness.gcd = ['1/1']; rejected(cert);
  cert = generateFieldCertificate('add', [O, E]); cert.steps[1].premises = []; rejected(cert);
  cert = generateFieldCertificate('add', [O, E]); cert.claim.proof = 's0'; rejected(cert);
});

test('field certificates reject impossible standard parts and bad denominator evidence', () => {
  assert.throws(() => generateFieldCertificate('standardPart', fieldDiv(O, E)), /pole/);
  assert.throws(() => generateFieldCertificate('normalize', { numerator: [], denominator: [] }), /zero/);
  const cert = generateFieldCertificate('normalize', { numerator: [], denominator: [q(1)] });
  cert.steps[0].input.denominator = []; cert.steps[0].output.denominator = []; rejected(cert);
  for (const malformed of [null, {}, { format: 'formal-field-certificate-v1.5.0', steps: [] }]) rejected(malformed);
});
