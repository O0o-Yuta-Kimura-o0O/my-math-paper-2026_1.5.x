import test from 'node:test';
import assert from 'node:assert/strict';
import { q, qparse, qstr, qadd, qsub, qmul, qdiv, qpow, qcmp, intervalContains, intervalSubset, intervalWidth, generateSqrt2Certificate } from './applications.mjs';
import {
  GENERATOR_EXTENSION_FORMAT, GENERATOR_LIMITS, GeneratorDomainError,
  generateNewtonCertificate, generateAlternatingCertificate, generateCauchyCertificate,
  generateCauchyCoherenceCertificate, generateLabelCertificate, generateSeparationCertificate,
  classifyZero, verifyGeneratorExtensionCertificate, buildGeneratorExtensionBundle, verifyGeneratorExtensionBundle,
} from './generator-extensions.mjs';
const copy = value => JSON.parse(JSON.stringify(value));
const le = (a, b) => qcmp(a, b) <= 0;
const target = p => q(1n, 1n << BigInt(p));
const verify = value => assert.equal(verifyGeneratorExtensionCertificate(copy(value)).ok, true);
const constant = value => ({ op: 'rational', value });
const newton = { op: 'sqrt2-newton' };
const bisect = { op: 'sqrt2-bisection' };
const geometric = { family: 'geometric', amplitude: '1/1', ratio: '1/2' };
const sequence = { family: 'geometric-offset', base: '3/2', amplitude: '1/1', ratio: '1/2' };
const modulus = { kind: 'shift', offset: 2 };

test('Newton rational states independently obey the integer numerator recurrence', () => {
  for (const p of [0, 1, 2, 3, 8, 16, 32, 48, 64]) {
    const cert = generateNewtonCertificate(p); verify(cert);
    let a = 2n, b = 1n;
    for (const state of cert.response.stages) {
      assert.equal(state.interval.upper, qstr(q(a, b)));
      assert.equal(state.interval.lower, qstr(q(2n * b, a)));
      assert.ok(le(qparse(state.lowerSquare), q(2)));
      assert.ok(le(q(2), qparse(state.upperSquare)));
      [a, b] = [a * a + 2n * b * b, 2n * a * b];
    }
    assert.ok(le(qparse(cert.response.width), target(p)));
  }
});

test('Newton and bisection overlap also at different requested precisions', () => {
  for (let p = 0; p <= 12; ++p) for (let r = 0; r <= 12; ++r) {
    const a = generateNewtonCertificate(p).response.interval, b = generateSqrt2Certificate(r).claim.interval;
    assert.ok(le(qparse(a.lower), qparse(b.upper)) && le(qparse(b.lower), qparse(a.upper)));
  }
});

test('Newton transitions, roots, requests, and bisection witnesses cannot be altered', () => {
  const original = generateNewtonCertificate(8);
  for (const edit of [
    c => c.response.stages[1].interval.lower = '1/1',
    c => c.response.stages[1].step.widthRecurrence = '1/5',
    c => c.response.stages.pop(),
    c => c.response.product = '2/1',
    c => c.request.precision = 9,
    c => c.bisection.steps[1].output.witness.square = '0/1',
    c => c.agreement.intersection.lower = '0/1',
  ]) { const c = copy(original); edit(c); assert.throws(() => verifyGeneratorExtensionCertificate(c)); }
});

test('geometric alternating intervals contain their exact rational closed form', () => {
  for (const amplitude of ['0/1', '1/1', '7/3']) for (const ratio of ['0/1', '1/3', '1/2']) {
    let previous;
    const program = { ...geometric, amplitude, ratio };
    const exact = qdiv(qparse(amplitude), qadd(q(1), qparse(ratio)));
    for (let p = 0; p <= 8; ++p) {
      const cert = generateAlternatingCertificate(program, p); verify(cert);
      assert.ok(intervalContains(cert.claim.interval, exact));
      if (previous) assert.ok(intervalSubset(cert.claim.interval, previous));
      previous = cert.claim.interval;
      let sum = q(0);
      for (const item of cert.terms) {
        const term = qmul(qparse(amplitude), qpow(qparse(ratio), item.index));
        sum = item.index % 2 ? qsub(sum, term) : qadd(sum, term);
        assert.equal(item.partialSum, qstr(sum));
      }
    }
  }
});

test('reciprocal-affine alternating intervals match independent Leibniz partial sums', () => {
  const program = { family: 'reciprocal-affine', amplitude: '4/1', slope: 2, offset: 1 };
  for (let p = 0; p <= 7; ++p) {
    const cert = generateAlternatingCertificate(program, p); verify(cert);
    const m = cert.claim.stage;
    let sum = q(0), upper;
    for (let j = 0; j <= 2 * m + 1; ++j) {
      sum = qadd(sum, q(j % 2 ? -4 : 4, 2 * j + 1));
      if (j === 2 * m) upper = sum;
    }
    assert.equal(cert.claim.interval.lower, qstr(sum));
    assert.equal(cert.claim.interval.upper, qstr(upper));
    assert.equal(cert.claim.width, qstr(q(4, 4 * m + 3)));
  }
});

test('alternating finite certificates reject changed rates, terms, signs, and claims', () => {
  const original = generateAlternatingCertificate(geometric, 4);
  for (const edit of [
    c => c.rates[0].mu++, c => c.rates[2].runningMaximum++,
    c => c.terms[1].partialSum = '3/2', c => c.terms[1].term = '-1/2',
    c => c.stages[0].interval.lower = '0/1', c => c.claim.stage++,
  ]) { const c = copy(original); edit(c); assert.throws(() => verifyGeneratorExtensionCertificate(c)); }
});

test('Cauchy conversion uses finite intersections containing tail samples and the rational base', () => {
  for (const amplitude of ['-1/1', '0/1', '1/1']) {
    const program = { ...sequence, amplitude };
    let previous;
    for (let p = 0; p <= 12; ++p) {
      const cert = generateCauchyCertificate(program, modulus, p); verify(cert);
      assert.ok(intervalContains(cert.claim.interval, qparse(program.base)));
      assert.ok(le(intervalWidth(cert.claim.interval), target(p + 1)));
      if (previous) assert.ok(intervalSubset(cert.claim.interval, previous));
      previous = cert.claim.interval;
      for (let j = cert.commonIndex; j < cert.commonIndex + 8; ++j) {
        const value = qadd(qparse(program.base), qmul(qparse(amplitude), qpow(q(1, 2), j)));
        assert.ok(intervalContains(cert.claim.interval, value));
      }
    }
  }
});

test('different Cauchy moduli and different precisions have one explicit common sample', () => {
  for (let p = 0; p <= 5; ++p) for (let r = 0; r <= 5; ++r) {
    const cert = generateCauchyCoherenceCertificate(sequence, modulus, { kind: 'shift', offset: 4 }, p, r); verify(cert);
    assert.ok(intervalContains(cert.left.claim.interval, qparse(cert.witness.value)));
    assert.ok(intervalContains(cert.right.claim.interval, qparse(cert.witness.value)));
    assert.equal(cert.witness.index, Math.max(p + 2, r + 4));
  }
});

test('Cauchy replay rejects altered windows, max/min endpoints, samples, and moduli', () => {
  const original = generateCauchyCertificate(sequence, modulus, 5);
  for (const edit of [
    c => c.commonPoint = '0/1', c => c.stages[2].index++,
    c => c.stages[0].window.lower = '0/1', c => c.stages[3].intersection.upper = '2/1',
    c => c.stages[2].distanceToCommonPoint = '0/1', c => c.request.modulus.offset = 1,
  ]) { const c = copy(original); edit(c); assert.throws(() => verifyGeneratorExtensionCertificate(c)); }
  assert.throws(() => generateCauchyCertificate({ ...sequence, amplitude: '3/1' }, modulus, 2), /bound/);
});

test('label sums, products, and reciprocals reproduce exact rational operations with signs', () => {
  for (const left of ['-4/3', '0/1', '7/2']) for (const right of ['-2/1', '0/1', '5/3']) {
    for (const op of ['add', 'mul']) {
      const cert = generateLabelCertificate({ op, left: constant(left), right: constant(right) }, 4); verify(cert);
      const expected = op === 'add' ? qadd(qparse(left), qparse(right)) : qmul(qparse(left), qparse(right));
      assert.deepEqual(cert.claim.interval, { lower: qstr(expected), upper: qstr(expected) });
    }
    if (right !== '0/1') {
      const cert = generateLabelCertificate({ op: 'reciprocal', source: constant(right), separationPrecision: 0 }, 4); verify(cert);
      assert.equal(cert.claim.interval.lower, qstr(qdiv(q(1), qparse(right))));
    }
  }
});

test('composed generator responses are nested and meet allocated precisions', () => {
  const labels = [
    { op: 'add', left: newton, right: constant('-1/1') },
    { op: 'mul', left: newton, right: bisect },
    { op: 'reciprocal', source: bisect, separationPrecision: 0 },
    { op: 'alternating', program: geometric },
    { op: 'cauchy', program: sequence, modulus },
  ];
  for (const label of labels) {
    let previous;
    for (let p = 0; p <= 8; ++p) {
      const cert = generateLabelCertificate(label, p); verify(cert);
      assert.ok(le(intervalWidth(cert.claim.interval), target(p)));
      if (previous) assert.ok(intervalSubset(cert.claim.interval, previous));
      previous = cert.claim.interval;
      if (label.op === 'mul') assert.ok(intervalContains(cert.claim.interval, q(2)));
    }
  }
});

test('large magnitudes and small divisors force extra precision in the trace', () => {
  const product = generateLabelCertificate({ op: 'mul', left: constant('100/1'), right: bisect }, 5); verify(product);
  assert.ok(product.trace.inputPrecision > 5);
  const reciprocal = generateLabelCertificate({ op: 'reciprocal', source: constant('1/16'), separationPrecision: 0 }, 5); verify(reciprocal);
  assert.equal(reciprocal.trace.inputPrecision, 13);
  assert.equal(reciprocal.trace.sensitivity, '256/1');
  assert.equal(reciprocal.claim.interval.lower, '16/1');
});

test('zero, unresolved separation, and positive or negative separation remain distinct', () => {
  assert.deepEqual(classifyZero({ lower: '0/1', upper: '0/1' }), { status: 'zero', distance: '0/1' });
  assert.deepEqual(classifyZero({ lower: '-1/1', upper: '1/1' }), { status: 'unknown', distance: null });
  assert.deepEqual(classifyZero({ lower: '-3/1', upper: '-2/1' }), { status: 'separated', distance: '2/1' });
  assert.throws(() => generateLabelCertificate({ op: 'reciprocal', source: constant('0/1'), separationPrecision: 0 }, 2), e => e instanceof GeneratorDomainError && e.status === 'zero');
  const source = { op: 'add', left: bisect, right: constant('-3/2') };
  const unresolved = generateSeparationCertificate(source, 0); verify(unresolved);
  assert.equal(unresolved.claim.status, 'unknown');
  assert.throws(() => generateLabelCertificate({ op: 'reciprocal', source, separationPrecision: 0 }, 2), e => e instanceof GeneratorDomainError && e.status === 'unknown');
  const refined = generateLabelCertificate({ op: 'reciprocal', source, separationPrecision: 4 }, 2); verify(refined);
  assert.ok(le(qparse(refined.claim.interval.upper), q(0)));
});

test('composite replay rejects altered precision allocation, separation, and rule names', () => {
  const original = generateLabelCertificate({ op: 'reciprocal', source: bisect, separationPrecision: 0 }, 6);
  for (const edit of [
    c => c.trace.inputPrecision++, c => c.trace.classification.distance = '2/1',
    c => c.trace.sensitivity = '0/1', c => c.trace.source.interval.lower = '0/1',
    c => c.trace.rule = 'trust-me', c => c.claim.width = '0/1',
  ]) { const c = copy(original); edit(c); assert.throws(() => verifyGeneratorExtensionCertificate(c)); }
});

test('the data language rejects arbitrary code, unrecognized schemas, and invalid families', () => {
  for (const label of [
    { op: 'javascript', code: 'return 1' }, { op: 'rational', value: '2/4' },
    { op: 'rational', value: '1/1', proof: 'trust me' }, { op: 'rational', value: () => 1 },
    { op: 'alternating', program: { ...geometric, ratio: '3/4' } },
  ]) assert.throws(() => generateLabelCertificate(label, 0));
  assert.throws(() => generateAlternatingCertificate({ ...geometric, amplitude: '-1/1' }, 0));
  assert.throws(() => generateAlternatingCertificate({ family: 'reciprocal-affine', amplitude: '1/1', slope: 0, offset: 1 }, 0));
  assert.throws(() => generateCauchyCertificate({ ...sequence, family: 'unknown' }, modulus, 0));
});

test('resource limits reject explicitly without reporting a mathematical zero or impossibility', () => {
  for (const p of [-1, 0.5, NaN, Infinity, GENERATOR_LIMITS.precision + 1]) assert.throws(() => generateNewtonCertificate(p));
  assert.throws(() => generateAlternatingCertificate({ family: 'reciprocal-affine', amplitude: '4/1', slope: 2, offset: 1 }, 20), /resource limit/);
  assert.throws(() => generateLabelCertificate({ op: 'add', left: bisect, right: constant('1/1') }, 64), /resource limit/);
  let label = constant('1/1');
  for (let i = 0; i < 15; ++i) label = { op: 'reciprocal', source: label, separationPrecision: 0 };
  assert.throws(() => generateLabelCertificate(label, 0), /resource limit/);
  const cyclic = {}; cyclic.self = cyclic;
  assert.throws(() => verifyGeneratorExtensionCertificate(cyclic), /acyclic/);
});

test('the distributed bundle survives JSON serialization and all fourteen requests replay', () => {
  const bundle = copy(buildGeneratorExtensionBundle()), report = verifyGeneratorExtensionBundle(bundle);
  assert.equal(bundle.format, GENERATOR_EXTENSION_FORMAT);
  assert.equal(report.ok, true); assert.equal(report.certificateCount, 14);
  assert.deepEqual(new Set(report.certificates.map(c => c.kind)), new Set(['newton-sqrt2', 'alternating-interval', 'cauchy-interval', 'cauchy-coherence', 'label-response', 'zero-separation']));
});

test('bundle scope, ids, unsupported kinds, missing inputs, and any changed certificate reject', () => {
  const original = buildGeneratorExtensionBundle();
  for (const edit of [
    b => b.scope = 'all-programs-proved', b => b.format = 'other', b => b.certificates = [],
    b => b.certificates[1].id = b.certificates[0].id,
    b => b.certificates[0].certificate.kind = 'universal-theorem',
    b => delete b.certificates[0].certificate.request.precision,
    b => b.certificates[0].certificate.response.interval.upper = '3/1',
  ]) { const b = copy(original); edit(b); assert.throws(() => verifyGeneratorExtensionBundle(b)); }
});
