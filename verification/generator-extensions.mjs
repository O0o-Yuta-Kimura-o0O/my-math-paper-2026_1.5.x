/**
 * Finite rational responses from a closed, data-only generator language.
 * The replay kernel checks concrete requests, not arbitrary programs' totality,
 * universal induction proofs, PA proofs, or membership in a completed real field.
 */
import { isDeepStrictEqual } from 'node:util';
import {
  q, qparse, qstr, qadd, qsub, qmul, qdiv, qcmp, qabs, qpow,
  interval, intervalJSON, intervalWidth, intervalSubset, intervalContains,
  intervalAdd, intervalMul, intervalReciprocal,
  generateSqrt2Certificate, verifyApplicationCertificate,
} from './applications.mjs';

export const GENERATOR_EXTENSION_FORMAT = 'generator-extensions-v1.5.4';
export const GENERATOR_LIMITS = Object.freeze({
  precision: 64, newtonStages: 12, alternatingTerms: 4096,
  labelDepth: 12, labelEvaluations: 512, rationalCharacters: 32768,
  jsonNodes: 200000, jsonDepth: 96, certificates: 64,
});
const check = (condition, message) => { if (!condition) throw new Error(message); };
function nat(n, name, limit) {
  check(Number.isSafeInteger(n) && n >= 0 && n <= limit, `${name}: resource limit or invalid natural number`);
  return n;
}
const precision = p => nat(p, 'precision', GENERATOR_LIMITS.precision);
const target = p => q(1n, 1n << BigInt(precision(p)));
const le = (a, b) => qcmp(a, b) <= 0;
const eq = (a, b) => qcmp(a, b) === 0;
const min = (a, b) => le(a, b) ? a : b;
const max = (a, b) => le(a, b) ? b : a;
const clone = value => JSON.parse(JSON.stringify(value));
function keys(value, expected, name = 'record') {
  check(value && typeof value === 'object' && !Array.isArray(value), `${name}: expected object`);
  check(isDeepStrictEqual(Object.keys(value).sort(), [...expected].sort()), `${name}: unexpected or missing fields`);
}
function rational(text) {
  check(typeof text === 'string' && text.length <= GENERATOR_LIMITS.rationalCharacters, 'rational resource limit');
  return qparse(text);
}
function iq(value) { keys(value, ['lower', 'upper'], 'interval'); return interval(rational(value.lower), rational(value.upper)); }
function intersect(a, b) { return interval(max(a.lower, b.lower), min(a.upper, b.upper)); }
function boundedJSON(value) {
  const pending = [[value, 0]], seen = new WeakSet(); let nodes = 0;
  while (pending.length) {
    const [v, depth] = pending.pop();
    check(++nodes <= GENERATOR_LIMITS.jsonNodes && depth <= GENERATOR_LIMITS.jsonDepth, 'certificate JSON resource limit');
    if (v === null || typeof v === 'boolean') continue;
    if (typeof v === 'number') { check(Number.isSafeInteger(v), 'unsafe JSON number'); continue; }
    if (typeof v === 'string') { check(v.length <= GENERATOR_LIMITS.rationalCharacters, 'string resource limit'); continue; }
    check(v && typeof v === 'object' && (Array.isArray(v) || Object.getPrototypeOf(v) === Object.prototype), 'expected plain JSON data');
    check(!seen.has(v), 'certificate must be an acyclic JSON tree'); seen.add(v);
    const entries = Object.entries(v);
    check(entries.length <= 10000, 'container resource limit');
    for (const [key, child] of entries) { check(key.length <= 128, 'key resource limit'); pending.push([child, depth + 1]); }
  }
}
function widthClaim(result, p) {
  const width = intervalWidth(result);
  check(le(width, target(p)), 'response exceeds requested width');
  return { interval: intervalJSON(result), width: qstr(width), target: qstr(target(p)) };
}
function sqrtState(index, lower, upper) {
  const current = interval(lower, upper), width = intervalWidth(current);
  check(le(q(1), lower) && le(upper, q(2)), 'Newton bounds invariant');
  check(eq(qmul(lower, upper), q(2)), 'Newton product invariant');
  check(le(qpow(lower, 2), q(2)) && le(q(2), qpow(upper, 2)), 'Newton square invariant');
  return { index, interval: intervalJSON(current), product: qstr(qmul(lower, upper)),
    lowerSquare: qstr(qpow(lower, 2)), upperSquare: qstr(qpow(upper, 2)), width: qstr(width) };
}
function newtonResponse(p) {
  precision(p); let lower = q(1), upper = q(2);
  const stages = [sqrtState(0, lower, upper)];
  while (!le(intervalWidth(interval(lower, upper)), target(p))) {
    check(stages.length <= GENERATOR_LIMITS.newtonStages, 'Newton stage resource limit');
    const old = interval(lower, upper), oldWidth = intervalWidth(old), sum = qadd(lower, upper);
    upper = qdiv(sum, q(2)); lower = qdiv(q(2), upper);
    const current = interval(lower, upper), state = sqrtState(stages.length, lower, upper);
    check(intervalSubset(current, old), 'Newton nesting invariant');
    const recurrence = qdiv(qpow(oldWidth, 2), qmul(q(2), sum));
    check(eq(intervalWidth(current), recurrence) && le(recurrence, qdiv(oldWidth, q(4))), 'Newton width recurrence');
    state.step = { previousWidth: qstr(oldWidth), endpointSum: qstr(sum), widthRecurrence: qstr(recurrence), quarterBound: qstr(qdiv(oldWidth, q(4))) };
    // Reject expensive output before storing it in a certificate.
    for (const value of [lower, upper, intervalWidth(current)]) rational(qstr(value));
    stages.push(state);
  }
  return { stages, ...widthClaim(interval(lower, upper), p) };
}
export function generateNewtonCertificate(p) {
  const response = newtonResponse(p), bisection = generateSqrt2Certificate(p);
  check(verifyApplicationCertificate(bisection).ok, 'existing bisection certificate failed');
  const ni = iq(response.interval), bi = iq(bisection.claim.interval), overlap = intersect(ni, bi);
  check(le(qpow(ni.lower, 2), qpow(bi.upper, 2)) && le(qpow(bi.lower, 2), qpow(ni.upper, 2)), 'square comparisons do not imply overlap');
  return { kind: 'newton-sqrt2', request: { precision: p }, response, bisection,
    agreement: { intersection: intervalJSON(overlap), newtonLowerSquare: qstr(qpow(ni.lower, 2)), bisectionUpperSquare: qstr(qpow(bi.upper, 2)),
      bisectionLowerSquare: qstr(qpow(bi.lower, 2)), newtonUpperSquare: qstr(qpow(ni.upper, 2)) } };
}

function termFamily(program) {
  check(program && typeof program === 'object', 'expected term program');
  if (program.family === 'geometric') {
    keys(program, ['family', 'amplitude', 'ratio'], 'geometric terms');
    const a = rational(program.amplitude), r = rational(program.ratio);
    check(le(q(0), a) && le(q(0), r) && le(r, q(1, 2)), 'geometric terms require amplitude >= 0 and 0 <= ratio <= 1/2');
    return k => qmul(a, qpow(r, k));
  }
  if (program.family === 'reciprocal-affine') {
    keys(program, ['family', 'amplitude', 'slope', 'offset'], 'reciprocal-affine terms');
    const a = rational(program.amplitude);
    nat(program.slope, 'slope', 1000000); nat(program.offset, 'offset', 1000000);
    check(le(q(0), a) && program.slope > 0 && program.offset > 0, 'positive denominator parameters required');
    return k => qdiv(a, q(BigInt(program.slope) * BigInt(k) + BigInt(program.offset)));
  }
  throw new Error('unknown alternating term family');
}
export function generateAlternatingCertificate(program, p) {
  precision(p); const term = termFamily(program), rates = [];
  let mu = 0, m = 0;
  for (let k = 0; k <= p; ++k) {
    while (!le(term(2 * mu), target(k))) {
      ++mu; check(2 * mu + 2 <= GENERATOR_LIMITS.alternatingTerms, 'alternating term resource limit');
    }
    m = Math.max(m, k, mu);
    check(2 * m + 2 <= GENERATOR_LIMITS.alternatingTerms, 'alternating term resource limit');
    rates.push({ precision: k, mu, runningMaximum: m, evenTerm: qstr(term(2 * mu)), target: qstr(target(k)) });
  }
  let partial = q(0), previousTerm; const terms = [], stages = [];
  for (let j = 0; j <= 2 * m + 1; ++j) {
    const a = term(j);
    check(le(q(0), a) && (previousTerm === undefined || le(a, previousTerm)), 'finite term monotonicity failed');
    partial = j % 2 === 0 ? qadd(partial, a) : qsub(partial, a);
    terms.push({ index: j, term: qstr(a), partialSum: qstr(partial) });
    if (j % 2 === 1) {
      const current = interval(partial, rational(terms[j - 1].partialSum));
      if (stages.length) check(intervalSubset(current, iq(stages.at(-1).interval)), 'alternating nesting failed');
      check(eq(intervalWidth(current), a), 'alternating width identity failed');
      stages.push({ index: (j - 1) / 2, interval: intervalJSON(current), width: qstr(a) });
    }
    previousTerm = a;
  }
  return { kind: 'alternating-interval', request: { program: clone(program), precision: p }, rates, terms, stages,
    claim: { stage: m, ...widthClaim(iq(stages.at(-1).interval), p) } };
}

function sequenceProgram(program) {
  keys(program, ['family', 'base', 'amplitude', 'ratio'], 'sequence program');
  check(program.family === 'geometric-offset', 'unknown rational sequence family');
  const base = rational(program.base), amplitude = rational(program.amplitude), ratio = rational(program.ratio);
  check(le(q(0), ratio) && le(ratio, q(1, 2)), 'sequence ratio must lie in [0,1/2]');
  return { sample: j => qadd(base, qmul(amplitude, qpow(ratio, j))), amplitude };
}
function modulusProgram(modulus, amplitude) {
  keys(modulus, ['kind', 'offset'], 'modulus'); check(modulus.kind === 'shift', 'unknown modulus program');
  nat(modulus.offset, 'modulus offset', GENERATOR_LIMITS.precision);
  check(modulus.offset >= 2 && le(qabs(amplitude), q(1n << BigInt(modulus.offset - 2))), 'modulus amplitude bound is absent');
  return k => nat(k + modulus.offset, 'sequence index', 2 * GENERATOR_LIMITS.precision);
}
export function generateCauchyCertificate(program, modulus, p) {
  precision(p); const sequence = sequenceProgram(program), mu = modulusProgram(modulus, sequence.amplitude);
  const commonIndex = mu(p), commonPoint = sequence.sample(commonIndex), stages = [];
  let current;
  for (let k = 0; k <= p; ++k) {
    const index = mu(k), sample = sequence.sample(index), delta = q(1n, 1n << BigInt(k + 2));
    const window = interval(qsub(sample, delta), qadd(sample, delta));
    check(intervalContains(window, commonPoint), 'finite common-point witness failed');
    current = current ? intersect(current, window) : window;
    check(intervalContains(current, commonPoint), 'empty finite intersection');
    check(le(intervalWidth(current), qmul(q(2), delta)), 'Cauchy finite intersection width failed');
    stages.push({ precision: k, index, sample: qstr(sample), delta: qstr(delta), window: intervalJSON(window),
      intersection: intervalJSON(current), distanceToCommonPoint: qstr(qabs(qsub(sample, commonPoint))) });
  }
  return { kind: 'cauchy-interval', request: { program: clone(program), modulus: clone(modulus), precision: p },
    commonIndex, commonPoint: qstr(commonPoint), stages, claim: widthClaim(current, p) };
}
export function generateCauchyCoherenceCertificate(program, leftModulus, rightModulus, p, r = p) {
  const left = generateCauchyCertificate(program, leftModulus, p), right = generateCauchyCertificate(program, rightModulus, r);
  const index = Math.max(left.commonIndex, right.commonIndex), value = sequenceProgram(program).sample(index);
  check(intervalContains(left.claim.interval, value) && intervalContains(right.claim.interval, value), 'moduli coherence witness failed');
  return { kind: 'cauchy-coherence', request: { program: clone(program), leftModulus: clone(leftModulus), rightModulus: clone(rightModulus), leftPrecision: p, rightPrecision: r },
    left, right, witness: { index, value: qstr(value), intersection: intervalJSON(intersect(iq(left.claim.interval), iq(right.claim.interval))) } };
}

export function classifyZero(value) {
  const a = iq(value);
  if (eq(a.lower, q(0)) && eq(a.upper, q(0))) return { status: 'zero', distance: '0/1' };
  if (intervalContains(a, q(0))) return { status: 'unknown', distance: null };
  return { status: 'separated', distance: qstr(min(qabs(a.lower), qabs(a.upper))) };
}
export class GeneratorDomainError extends Error {
  constructor(status) { super(`reciprocal unavailable: ${status}`); this.name = 'GeneratorDomainError'; this.status = status; }
}
function shiftForBound(bound) {
  let factor = q(1), shift = 0;
  while (!le(bound, factor)) { ++shift; check(shift <= GENERATOR_LIMITS.precision, 'precision allocation resource limit'); factor = qmul(q(2), factor); }
  return shift;
}
function labelResponse(label, p, context, depth = 0) {
  precision(p); check(depth <= GENERATOR_LIMITS.labelDepth && ++context.count <= GENERATOR_LIMITS.labelEvaluations, 'label evaluation resource limit');
  check(label && typeof label === 'object', 'expected generator label');
  const recurse = (child, requested) => labelResponse(child, requested, context, depth + 1);
  switch (label.op) {
    case 'rational': {
      keys(label, ['op', 'value'], 'rational label'); const value = rational(label.value);
      return { rule: 'rational', precision: p, ...widthClaim(interval(value, value), p) };
    }
    case 'sqrt2-newton': {
      keys(label, ['op'], 'Newton label'); const response = newtonResponse(p);
      return { rule: label.op, precision: p, response, ...widthClaim(iq(response.interval), p) };
    }
    case 'sqrt2-bisection': {
      keys(label, ['op'], 'bisection label'); const evidence = generateSqrt2Certificate(p);
      check(verifyApplicationCertificate(evidence).ok, 'bisection replay failed');
      return { rule: label.op, precision: p, evidence, ...widthClaim(iq(evidence.claim.interval), p) };
    }
    case 'alternating': {
      keys(label, ['op', 'program'], 'alternating label'); const evidence = generateAlternatingCertificate(label.program, p);
      return { rule: label.op, precision: p, evidence, ...widthClaim(iq(evidence.claim.interval), p) };
    }
    case 'cauchy': {
      keys(label, ['op', 'program', 'modulus'], 'Cauchy label'); const evidence = generateCauchyCertificate(label.program, label.modulus, p);
      return { rule: label.op, precision: p, evidence, ...widthClaim(iq(evidence.claim.interval), p) };
    }
    case 'add': {
      keys(label, ['op', 'left', 'right'], 'sum label'); const requested = precision(p + 1);
      const left = recurse(label.left, requested), right = recurse(label.right, requested);
      return { rule: 'add', precision: p, inputPrecision: requested, left, right,
        ...widthClaim(intervalAdd(iq(left.interval), iq(right.interval)), p) };
    }
    case 'mul': {
      keys(label, ['op', 'left', 'right'], 'product label');
      const coarseLeft = recurse(label.left, 0), coarseRight = recurse(label.right, 0);
      const a = iq(coarseLeft.interval), b = iq(coarseRight.interval);
      const radiusA = max(qabs(a.lower), qabs(a.upper)), radiusB = max(qabs(b.lower), qabs(b.upper));
      const bound = qadd(radiusA, radiusB), shift = shiftForBound(qadd(bound, q(1))), requested = precision(p + shift);
      const left = recurse(label.left, requested), right = recurse(label.right, requested);
      check(intervalSubset(iq(left.interval), a) && intervalSubset(iq(right.interval), b), 'product source nesting failed');
      const result = intervalMul(iq(left.interval), iq(right.interval));
      const widthBound = qmul(bound, target(requested));
      check(le(intervalWidth(result), widthBound) && le(widthBound, target(p)), 'product precision bound failed');
      return { rule: 'mul', precision: p, inputPrecision: requested, coarseLeft, coarseRight, left, right,
        radiusLeft: qstr(radiusA), radiusRight: qstr(radiusB), widthBound: qstr(widthBound), ...widthClaim(result, p) };
    }
    case 'reciprocal': {
      keys(label, ['op', 'source', 'separationPrecision'], 'reciprocal label'); const s = precision(label.separationPrecision);
      const separation = recurse(label.source, s), classification = classifyZero(separation.interval);
      if (classification.status !== 'separated') throw new GeneratorDomainError(classification.status);
      const c = rational(classification.distance), sensitivity = qdiv(q(1), qpow(c, 2));
      const requested = precision(Math.max(s, p + shiftForBound(sensitivity))), source = recurse(label.source, requested);
      check(intervalSubset(iq(source.interval), iq(separation.interval)), 'reciprocal source nesting failed');
      const result = intervalReciprocal(iq(source.interval)), widthBound = qmul(sensitivity, target(requested));
      check(le(intervalWidth(result), widthBound) && le(widthBound, target(p)), 'reciprocal precision bound failed');
      return { rule: 'reciprocal', precision: p, separation, classification, inputPrecision: requested, source,
        sensitivity: qstr(sensitivity), widthBound: qstr(widthBound), ...widthClaim(result, p) };
    }
    default: throw new Error(`unknown generator label operation: ${label.op}`);
  }
}
export function generateLabelCertificate(label, p) {
  boundedJSON(label); const trace = labelResponse(label, p, { count: 0 });
  return { kind: 'label-response', request: { label: clone(label), precision: p }, trace,
    claim: widthClaim(iq(trace.interval), p) };
}
export function generateSeparationCertificate(label, p) {
  const response = generateLabelCertificate(label, p);
  return { kind: 'zero-separation', request: { label: clone(label), precision: p }, response, claim: classifyZero(response.claim.interval) };
}
function replayCertificate(certificate) {
  const r = certificate.request;
  check(r && typeof r === 'object', 'missing certificate request');
  switch (certificate.kind) {
    case 'newton-sqrt2': keys(r, ['precision']); return generateNewtonCertificate(r.precision);
    case 'alternating-interval': keys(r, ['program', 'precision']); return generateAlternatingCertificate(r.program, r.precision);
    case 'cauchy-interval': keys(r, ['program', 'modulus', 'precision']); return generateCauchyCertificate(r.program, r.modulus, r.precision);
    case 'cauchy-coherence': keys(r, ['program', 'leftModulus', 'rightModulus', 'leftPrecision', 'rightPrecision']); return generateCauchyCoherenceCertificate(r.program, r.leftModulus, r.rightModulus, r.leftPrecision, r.rightPrecision);
    case 'label-response': keys(r, ['label', 'precision']); return generateLabelCertificate(r.label, r.precision);
    case 'zero-separation': keys(r, ['label', 'precision']); return generateSeparationCertificate(r.label, r.precision);
    default: throw new Error(`unknown generator certificate kind: ${certificate.kind}`);
  }
}
export function verifyGeneratorExtensionCertificate(certificate) {
  boundedJSON(certificate);
  const expected = replayCertificate(certificate);
  check(isDeepStrictEqual(certificate, expected), 'generator certificate replay mismatch');
  return { ok: true, kind: certificate.kind, scope: 'finite-rational-replay' };
}
export function buildGeneratorExtensionBundle() {
  const geometric = { family: 'geometric', amplitude: '1/1', ratio: '1/2' };
  const leibniz = { family: 'reciprocal-affine', amplitude: '4/1', slope: 2, offset: 1 };
  const sequence = { family: 'geometric-offset', base: '3/2', amplitude: '1/1', ratio: '1/2' };
  const shift2 = { kind: 'shift', offset: 2 }, shift3 = { kind: 'shift', offset: 3 };
  const newton = { op: 'sqrt2-newton' }, bisect = { op: 'sqrt2-bisection' }, constant = value => ({ op: 'rational', value });
  const cases = [
    ['newton-p0', generateNewtonCertificate(0)], ['newton-p8', generateNewtonCertificate(8)],
    ['alternating-geometric', generateAlternatingCertificate(geometric, 6)],
    ['alternating-leibniz', generateAlternatingCertificate(leibniz, 4)],
    ['alternating-zero', generateAlternatingCertificate({ ...geometric, amplitude: '0/1' }, 2)],
    ['cauchy-from-sequence', generateCauchyCertificate(sequence, shift2, 6)],
    ['cauchy-two-moduli', generateCauchyCoherenceCertificate(sequence, shift2, shift3, 5, 7)],
    ['label-sum', generateLabelCertificate({ op: 'add', left: newton, right: constant('-1/1') }, 6)],
    ['label-product', generateLabelCertificate({ op: 'mul', left: newton, right: bisect }, 6)],
    ['label-reciprocal', generateLabelCertificate({ op: 'reciprocal', source: bisect, separationPrecision: 0 }, 6)],
    ['label-negative-reciprocal', generateLabelCertificate({ op: 'reciprocal', source: constant('-2/1'), separationPrecision: 0 }, 6)],
    ['separation-zero', generateSeparationCertificate(constant('0/1'), 0)],
    ['separation-unknown', generateSeparationCertificate({ op: 'add', left: bisect, right: constant('-3/2') }, 0)],
    ['separation-positive', generateSeparationCertificate(newton, 0)],
  ];
  return { format: GENERATOR_EXTENSION_FORMAT, scope: 'finite-rational-replay', certificates: cases.map(([id, certificate]) => ({ id, certificate })) };
}
export function verifyGeneratorExtensionBundle(bundle) {
  boundedJSON(bundle); keys(bundle, ['format', 'scope', 'certificates'], 'generator bundle');
  check(bundle.format === GENERATOR_EXTENSION_FORMAT && bundle.scope === 'finite-rational-replay', 'unknown generator bundle format or scope');
  check(Array.isArray(bundle.certificates) && bundle.certificates.length > 0 && bundle.certificates.length <= GENERATOR_LIMITS.certificates, 'certificate count resource limit');
  const ids = new Set(), results = [];
  for (const entry of bundle.certificates) {
    keys(entry, ['id', 'certificate'], 'bundle entry');
    check(typeof entry.id === 'string' && /^[a-z][a-z0-9-]{0,79}$/.test(entry.id) && !ids.has(entry.id), 'invalid or duplicate certificate id');
    ids.add(entry.id); results.push({ id: entry.id, ...verifyGeneratorExtensionCertificate(entry.certificate) });
  }
  return { ok: true, format: GENERATOR_EXTENSION_FORMAT, scope: 'finite-rational-replay', certificateCount: results.length, certificates: results };
}
