import test from 'node:test';
import assert from 'node:assert/strict';
import {
  q, qparse, qstr, qadd, qsub, qmul, qdiv, qcmp, qpow,
  interval, intervalJSON, intervalWidth, intervalSubset, intervalContains,
  intervalAdd, intervalSub, intervalMul, intervalDiv,
  polynomialEvaluate, polynomialDerivative, polynomialAntiderivative,
  polynomialIntegral, polynomialLipschitz, polynomialModulus,
  history, identityHistory, validateHistory, sourceIdentity, targetIdentity,
  composeHistories, historyEquals,
  generateQlimCertificate, generateSqrt2Certificate, generateLeibnizCertificate,
  generateIntervalCertificate, generateContinuityCertificate,
  generateCalculusCertificate, verifyApplicationCertificate,
} from './applications.mjs';

const copy = x => JSON.parse(JSON.stringify(x));
const verified = cert => {
  const result = verifyApplicationCertificate(JSON.parse(JSON.stringify(cert)));
  assert.equal(result.ok, true, result.error);
};
const rejected = cert => assert.equal(verifyApplicationCertificate(cert).ok, false);

test('qlim preserves the requested finite index, sign, and coefficient', () => {
  for (const b of [-2, 0, 1, 3]) {
    for (const n of [0, 1, 9, 99]) {
      const cert = generateQlimCertificate(q(5), q(b), n);
      verified(cert);
      assert.equal(cert.claim.value, qstr(qadd(q(5), qdiv(q(b), q(n + 1)))));
    }
  }
  assert.notEqual(generateQlimCertificate(q(0), q(1), 3).claim.value,
    generateQlimCertificate(q(0), q(2), 3).claim.value);
  assert.throws(() => generateQlimCertificate(q(0), q(1), -1));
});

test('qlim rejects changed index, direction, and arithmetic conclusion', () => {
  const original = generateQlimCertificate(q(5), q(1), 9);
  for (const edit of [c => c.claim.index++, c => c.claim.offset = '-1/1', c => c.claim.value = '5/1']) {
    const cert = copy(original); edit(cert); rejected(cert);
  }
});

test('exact rational arithmetic and canonical encodings', () => {
  assert.equal(qstr(q(-6, -8)), '3/4');
  assert.equal(qstr(qadd(q(1, 3), q(1, 6))), '1/2');
  assert.equal(qstr(qmul(q(-2, 3), q(9, 4))), '-3/2');
  assert.equal(qstr(qdiv(q(-2, 3), q(-4, 5))), '5/6');
  assert.equal(qstr(q(0, -99)), '0/1');
  assert.equal(qstr(qadd(q(2n ** 100n), q(1))), `${2n ** 100n + 1n}/1`);
  assert.throws(() => q(1, 0));
  assert.throws(() => qdiv(q(1), q(0)));
  assert.throws(() => q(Number.MAX_SAFE_INTEGER + 1));
  for (const bad of ['2/4', '-0/1', '1/-2', '01/2', '0/0', '1/0']) assert.throws(() => qparse(bad));
});

test('interval endpoint rules handle mixed and negative signs', () => {
  const a = interval(q(-2), q(3)), b = interval(q(-4), q(5));
  assert.deepEqual(intervalJSON(intervalAdd(a, b)), { lower: '-6/1', upper: '8/1' });
  assert.deepEqual(intervalJSON(intervalSub(a, b)), { lower: '-7/1', upper: '7/1' });
  assert.deepEqual(intervalJSON(intervalMul(a, b)), { lower: '-12/1', upper: '15/1' });
  assert.deepEqual(intervalJSON(intervalDiv(interval(q(2), q(4)), interval(q(-4), q(-2)))), { lower: '-2/1', upper: '-1/2' });
  for (const divisor of [interval(q(-1), q(1)), interval(q(0), q(1)), interval(q(-1), q(0))]) {
    assert.throws(() => intervalDiv(a, divisor), /zero/);
  }
  assert.throws(() => interval(q(1), q(0)), /reversed/);
});

test('interval products and quotients contain interior rational samples', () => {
  const a = interval(q(-2), q(3)), b = interval(q(1, 2), q(5, 2));
  const product = intervalMul(a, b), quotient = intervalDiv(a, b);
  for (let i = -4; i <= 6; ++i) for (let j = 1; j <= 5; ++j) {
    const x = q(i, 2), y = q(j, 2);
    assert.equal(intervalContains(product, qmul(x, y)), true);
    assert.equal(intervalContains(quotient, qdiv(x, y)), true);
  }
});

test('sqrt2 finite requests verify and form nested intervals', () => {
  let previous;
  for (let p = 0; p <= 16; ++p) {
    const cert = generateSqrt2Certificate(p); verified(cert);
    const current = cert.claim.interval;
    assert.ok(qcmp(qpow(qparse(current.lower), 2), q(2)) <= 0);
    assert.ok(qcmp(q(2), qpow(qparse(current.upper), 2)) <= 0);
    assert.ok(qcmp(intervalWidth(current), q(1n, 1n << BigInt(p))) <= 0);
    if (previous) assert.ok(intervalSubset(current, previous));
    previous = current;
  }
});

test('Leibniz stages match independent finite partial sums and the gap formula', () => {
  let previous;
  for (let p = 0; p <= 6; ++p) {
    const cert = generateLeibnizCertificate(p); verified(cert);
    const m = 2 ** p;
    let sum = q(0), even;
    for (let k = 0; k <= 2 * m + 1; ++k) {
      sum = qadd(sum, q(k % 2 === 0 ? 4 : -4, 2 * k + 1));
      if (k === 2 * m) even = sum;
    }
    assert.equal(cert.claim.interval.upper, qstr(even));
    assert.equal(cert.claim.interval.lower, qstr(sum));
    assert.equal(qstr(intervalWidth(cert.claim.interval)), qstr(q(4, 4 * m + 3)));
    if (previous) assert.ok(intervalSubset(cert.claim.interval, previous));
    previous = cert.claim.interval;
  }
  const cert = generateLeibnizCertificate(0);
  assert.deepEqual(cert.claim.interval, { lower: '304/105', upper: '52/15' });
  assert.equal(cert.steps[1].output.witness.lowerChange, '8/35');
});

test('invalid or resource-exceeding finite requests reject explicitly', () => {
  for (const p of [-1, 0.5, NaN, Infinity, 4097]) assert.throws(() => generateSqrt2Certificate(p));
  assert.throws(() => generateLeibnizCertificate(4, { maxStages: 15 }), /resource limit/);
  verified(generateLeibnizCertificate(4, { maxStages: 16 }));
});

test('all four interval certificate kinds replay', () => {
  const a = interval(q(-3), q(2)), b = interval(q(1), q(4));
  for (const operation of ['add', 'sub', 'mul', 'div']) verified(generateIntervalCertificate(operation, a, b));
});

test('certificate rejects changed output, arithmetic witness, claim, and requested precision', () => {
  let cert = generateSqrt2Certificate(3);
  cert.steps[1].output.witness.square = '9/4'; rejected(cert);
  cert = generateSqrt2Certificate(3); cert.claim.interval.lower = '3/2'; rejected(cert);
  cert = generateSqrt2Certificate(3); cert.claim.precision = 5; rejected(cert);
  cert = generateLeibnizCertificate(2); cert.steps[1].output.witness.lowerChange = '8/15'; rejected(cert);
  cert = generateLeibnizCertificate(2); cert.steps[0].output.interval.lower = '3/1'; rejected(cert);
});

test('certificate rejects premise substitution, missing transitions, forged roots, and unknown rules', () => {
  let cert = generateSqrt2Certificate(3);
  cert.steps[2].premises = []; rejected(cert);
  cert = generateSqrt2Certificate(3); cert.steps[2].input = ['future']; cert.steps[2].premises = ['future']; rejected(cert);
  cert = generateSqrt2Certificate(3); cert.roots.chain.splice(2, 1); rejected(cert);
  cert = generateSqrt2Certificate(3); cert.roots.final = cert.roots.target; rejected(cert);
  cert = generateLeibnizCertificate(2); cert.steps[1].rule = 'LZ.assume'; rejected(cert);
  cert = generateLeibnizCertificate(2); cert.steps.push(copy(cert.steps[0])); rejected(cert);
});

test('valid arithmetic on an unrelated interval cannot replace the sqrt2 claim', () => {
  const cert = generateSqrt2Certificate(3);
  cert.steps.push({ id: 'unrelated', rule: 'I.literal', input: [{ lower: '0/1', upper: '0/1' }], premises: [], output: { lower: '0/1', upper: '0/1' } });
  cert.claim.interval = { lower: '0/1', upper: '0/1' };
  cert.roots.final = 'unrelated';
  rejected(cert);
});

test('interval certificate rejects claimed operations and zero-containing divisors', () => {
  let cert = generateIntervalCertificate('mul', interval(q(-1), q(2)), interval(q(3), q(4)));
  cert.claim.result.upper = '7/1'; rejected(cert);
  cert = generateIntervalCertificate('div', interval(q(1), q(2)), interval(q(1), q(3)));
  cert.steps[1].input[0].lower = '0/1'; cert.steps[1].output.lower = '0/1'; cert.claim.right.lower = '0/1';
  rejected(cert);
});

const successorRule = step => step.rule === 'successor' && /^(0|[1-9][0-9]*)$/.test(step.from) && step.to === String(BigInt(step.from) + 1n);
const successorStep = n => ({ rule: 'successor', from: String(n), to: String(n + 1) });

test('arrow-only histories: source and target identities, composition, and unit laws', () => {
  const f = history('0', [successorStep(0), successorStep(1)], successorRule);
  const g = history('2', [successorStep(2)], successorRule);
  assert.ok(historyEquals(sourceIdentity(f), identityHistory('0')));
  assert.ok(historyEquals(targetIdentity(f), identityHistory('2')));
  assert.ok(historyEquals(composeHistories(targetIdentity(f), f, successorRule), f));
  assert.ok(historyEquals(composeHistories(f, sourceIdentity(f), successorRule), f));
  const gf = composeHistories(g, f, successorRule);
  assert.deepEqual(gf.steps, [successorStep(0), successorStep(1), successorStep(2)]);
});

test('history associativity and structural equality preserve all transition details', () => {
  const f = history('0', [successorStep(0)], successorRule);
  const g = history('1', [successorStep(1)], successorRule);
  const h = history('2', [successorStep(2)], successorRule);
  assert.ok(historyEquals(composeHistories(h, composeHistories(g, f, successorRule), successorRule), composeHistories(composeHistories(h, g, successorRule), f, successorRule)));
  const f2 = copy(f); f2.steps[0].annotation = 'additional syntax';
  assert.equal(historyEquals(f, f2), false);
  assert.throws(() => composeHistories(f, g, successorRule), /noncomposable/);
});

test('histories reject unverified, false, disconnected, or mutated transitions', () => {
  assert.throws(() => history('0', [successorStep(0)]), /verifier/);
  assert.throws(() => history('0', [{ rule: 'successor', from: '0', to: '2' }], successorRule));
  assert.throws(() => history('0', [successorStep(0), successorStep(2)], successorRule), /disconnected/);
  const f = history('0', [successorStep(0)], successorRule); f.steps[0].to = '99';
  assert.throws(() => validateHistory(f, successorRule));
});

test('finite polynomial derivative, antiderivative, and rational endpoint integral', () => {
  const p = [q(1), q(-2), q(3)];
  assert.equal(qstr(polynomialEvaluate(p, q(2))), '9/1');
  assert.deepEqual(polynomialDerivative(p).map(qstr), ['-2/1', '6/1']);
  assert.deepEqual(polynomialAntiderivative(p).map(qstr), ['0/1', '1/1', '-1/1', '1/1']);
  assert.equal(qstr(polynomialIntegral(p, q(0), q(1))), '1/1');
  assert.equal(qstr(polynomialIntegral(p, q(1), q(0))), '-1/1');
  assert.deepEqual(polynomialDerivative(polynomialAntiderivative(p)).map(qstr), p.map(qstr));
  assert.equal(qstr(polynomialLipschitz(p, q(2))), '14/1');
  assert.equal(qstr(polynomialModulus(p, q(2), 3)), '1/120');
});

test('polynomial continuity has a concrete exact modulus and verified image bound', () => {
  const p = [q(1), q(-2), q(3)], cert = generateContinuityCertificate(p, q(2), 3, q(1), q(121, 120));
  verified(cert);
  assert.equal(cert.claim.delta, '1/120');
  assert.ok(qcmp(qparse(cert.claim.imageDifference), qparse(cert.claim.errorBound)) <= 0);
  assert.ok(qcmp(qparse(cert.claim.errorBound), q(1, 8)) <= 0);
  assert.throws(() => generateContinuityCertificate(p, q(2), 3, q(1), q(2)), /modulus/);
  assert.throws(() => generateContinuityCertificate(p, q(2), 3, q(3), q(3)), /domain/);
  cert.claim.delta = '1/1'; rejected(cert);
});

test('difference quotient error and formal integral certificate replay', () => {
  const cert = generateCalculusCertificate([q(1), q(-2), q(3)], q(2), q(1), q(1, 100), q(0), q(1));
  verified(cert);
  assert.equal(cert.claim.derivativeValue, '4/1');
  assert.equal(cert.claim.quotient, '403/100');
  assert.equal(cert.claim.error, '3/100');
  assert.equal(cert.claim.errorCoefficient, '3/1');
  assert.equal(cert.claim.errorBound, '3/100');
  assert.equal(cert.claim.formalIntegral, '1/1');
  cert.claim.error = '0/1'; rejected(cert);
});

test('zero and constant polynomials and derivative domain conditions', () => {
  verified(generateContinuityCertificate([], q(0), 3, q(0), q(0)));
  const cert = generateCalculusCertificate([q(7)], q(1), q(0), q(1, 2), q(-1), q(2));
  verified(cert);
  assert.deepEqual(cert.claim.derivative, []);
  assert.equal(cert.claim.formalIntegral, '21/1');
  assert.equal(cert.claim.error, '0/1');
  assert.throws(() => generateCalculusCertificate([q(0), q(1)], q(1), q(0), q(0), q(0), q(1)), /nonzero h/);
  assert.throws(() => generateCalculusCertificate([q(0), q(1)], q(1), q(1), q(1), q(0), q(1)), /domain/);
});

test('higher-degree and negative-step difference quotient estimates', () => {
  for (const h of [q(1, 16), q(-1, 16)]) {
    const cert = generateCalculusCertificate([q(-3), q(2), q(0), q(-5, 3), q(7, 4)], q(2), q(1, 2), h, q(-1), q(1));
    verified(cert);
    assert.ok(qcmp(qparse(cert.claim.error), qparse(cert.claim.errorBound)) <= 0);
  }
});

test('verification rejects malformed data instead of throwing', () => {
  for (const bad of [null, {}, [], { format: 'wrong' }, { format: 'rational-applications-v1.5.0', steps: [] }]) rejected(bad);
});
