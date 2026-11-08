/**
 * Finite histories and exact rational application certificates.
 * No floating-point arithmetic is used for mathematical quantities.
 * These are rational-arithmetic certificates, NOT lambda beta traces.
 */
export const CERTIFICATE_FORMAT = 'rational-applications-v1.5.0';

const absInt = n => n < 0n ? -n : n;
function gcd(a, b) {
  a = absInt(a); b = absInt(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}
function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}
function naturalNumber(n, name = 'natural number') {
  requireCondition(Number.isSafeInteger(n) && n >= 0, `${name}: expected a nonnegative safe integer`);
  return n;
}
function precision(p) {
  naturalNumber(p, 'precision');
  // An explicit implementation resource limit, not a mathematical restriction.
  requireCondition(p <= 4096, 'precision exceeds the implementation limit 4096');
  return p;
}

export function q(n, d = 1n) {
  requireCondition(typeof n !== 'number' || Number.isSafeInteger(n), 'unsafe integer numerator');
  requireCondition(typeof d !== 'number' || Number.isSafeInteger(d), 'unsafe integer denominator');
  n = BigInt(n); d = BigInt(d);
  requireCondition(d !== 0n, 'division by zero');
  if (d < 0n) { n = -n; d = -d; }
  const g = gcd(n, d);
  return Object.freeze({ n: n / g, d: d / g });
}
export function qparse(text) {
  requireCondition(typeof text === 'string' && /^-?(0|[1-9][0-9]*)\/[1-9][0-9]*$/.test(text), 'invalid rational encoding');
  const [n, d] = text.split('/');
  const result = q(BigInt(n), BigInt(d));
  requireCondition(qstr(result) === text, 'noncanonical rational encoding');
  return result;
}
function asQ(value) {
  if (typeof value === 'string' && value.includes('/')) return qparse(value);
  if (value && typeof value === 'object' && typeof value.n === 'bigint' && typeof value.d === 'bigint') {
    requireCondition(value.d > 0n && gcd(value.n, value.d) === 1n, 'invalid rational object');
    return value;
  }
  return q(value);
}
export const qstr = value => { const a = asQ(value); return `${a.n}/${a.d}`; };
export const qadd = (a, b) => { a = asQ(a); b = asQ(b); return q(a.n * b.d + b.n * a.d, a.d * b.d); };
export const qneg = a => { a = asQ(a); return q(-a.n, a.d); };
export const qsub = (a, b) => qadd(a, qneg(b));
export const qmul = (a, b) => { a = asQ(a); b = asQ(b); return q(a.n * b.n, a.d * b.d); };
export const qdiv = (a, b) => { a = asQ(a); b = asQ(b); requireCondition(b.n !== 0n, 'division by zero'); return q(a.n * b.d, a.d * b.n); };
export const qcmp = (a, b) => { a = asQ(a); b = asQ(b); const d = a.n * b.d - b.n * a.d; return d < 0n ? -1 : d > 0n ? 1 : 0; };
export const qabs = a => { a = asQ(a); return q(absInt(a.n), a.d); };
export function qpow(a, k) {
  a = asQ(a); naturalNumber(k, 'power');
  return q(a.n ** BigInt(k), a.d ** BigInt(k));
}
const qmin = values => values.reduce((a, b) => qcmp(a, b) <= 0 ? a : b);
const qmax = values => values.reduce((a, b) => qcmp(a, b) >= 0 ? a : b);
const targetWidth = p => q(1n, 1n << BigInt(precision(p)));

export function interval(lower, upper) {
  lower = asQ(lower); upper = asQ(upper);
  requireCondition(qcmp(lower, upper) <= 0, 'reversed interval');
  return Object.freeze({ lower, upper });
}
function asInterval(value) {
  requireCondition(value && typeof value === 'object', 'expected interval');
  return interval(value.lower, value.upper);
}
export function intervalJSON(value) {
  const a = asInterval(value);
  return { lower: qstr(a.lower), upper: qstr(a.upper) };
}
export function intervalWidth(a) { a = asInterval(a); return qsub(a.upper, a.lower); }
export function intervalContains(a, x) {
  a = asInterval(a); x = asQ(x);
  return qcmp(a.lower, x) <= 0 && qcmp(x, a.upper) <= 0;
}
export function intervalSubset(a, b) {
  a = asInterval(a); b = asInterval(b);
  return qcmp(b.lower, a.lower) <= 0 && qcmp(a.upper, b.upper) <= 0;
}
export function intervalAdd(a, b) {
  a = asInterval(a); b = asInterval(b);
  return interval(qadd(a.lower, b.lower), qadd(a.upper, b.upper));
}
export function intervalSub(a, b) {
  a = asInterval(a); b = asInterval(b);
  return interval(qsub(a.lower, b.upper), qsub(a.upper, b.lower));
}
export function intervalMul(a, b) {
  a = asInterval(a); b = asInterval(b);
  const products = [qmul(a.lower, b.lower), qmul(a.lower, b.upper), qmul(a.upper, b.lower), qmul(a.upper, b.upper)];
  return interval(qmin(products), qmax(products));
}
export function intervalReciprocal(a) {
  a = asInterval(a);
  requireCondition(!intervalContains(a, q(0)), 'divisor interval contains zero');
  return interval(qdiv(q(1), a.upper), qdiv(q(1), a.lower));
}
export const intervalDiv = (a, b) => intervalMul(a, intervalReciprocal(b));

export function polynomial(coefficients) {
  requireCondition(Array.isArray(coefficients), 'expected coefficient list');
  const result = coefficients.map(asQ);
  while (result.length && result.at(-1).n === 0n) result.pop();
  return Object.freeze(result);
}
const polynomialJSON = coefficients => polynomial(coefficients).map(qstr);
export function polynomialEvaluate(coefficients, x) {
  const p = polynomial(coefficients); x = asQ(x);
  let result = q(0);
  for (let k = p.length - 1; k >= 0; --k) result = qadd(p[k], qmul(x, result));
  return result;
}
export const polynomialDerivative = coefficients => polynomial(polynomial(coefficients).slice(1).map((a, j) => qmul(q(j + 1), a)));
export const polynomialAntiderivative = coefficients => polynomial([q(0), ...polynomial(coefficients).map((a, k) => qdiv(a, q(k + 1)))]);
export function polynomialIntegral(coefficients, a, b) {
  const primitive = polynomialAntiderivative(coefficients);
  return qsub(polynomialEvaluate(primitive, b), polynomialEvaluate(primitive, a));
}
export function polynomialLipschitz(coefficients, radius) {
  const p = polynomial(coefficients); radius = asQ(radius);
  requireCondition(qcmp(radius, q(0)) >= 0, 'negative radius');
  let result = q(0);
  for (let k = 1; k < p.length; ++k) result = qadd(result, qmul(qmul(q(k), qabs(p[k])), qpow(radius, k - 1)));
  return result;
}
export function polynomialDerivativeErrorCoefficient(coefficients, radius) {
  const p = polynomial(coefficients); radius = asQ(radius);
  requireCondition(qcmp(radius, q(0)) >= 0, 'negative radius');
  let result = q(0);
  for (let k = 2; k < p.length; ++k) {
    const factor = q(BigInt(k) * BigInt(k - 1), 2n);
    result = qadd(result, qmul(qmul(factor, qabs(p[k])), qpow(radius, k - 2)));
  }
  return result;
}
export function polynomialModulus(coefficients, radius, p) {
  return qdiv(targetWidth(p), qadd(polynomialLipschitz(coefficients, radius), q(1)));
}

// Finite histories. The transition relation is supplied explicitly by the caller.
// Empty histories encode identities; no separate primitive object type is used.
function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
  requireCondition(value === null || ['string', 'boolean', 'number'].includes(typeof value), 'expected JSON value');
  requireCondition(typeof value !== 'number' || Number.isFinite(value), 'nonfinite JSON number');
  return JSON.stringify(value);
}
const equalJSON = (a, b) => canonical(a) === canonical(b);
const cloneJSON = value => JSON.parse(JSON.stringify(value));
function historyShape(value) {
  requireCondition(value && value.kind === 'finite-history' && typeof value.initial === 'string' && Array.isArray(value.steps), 'invalid history');
  let current = value.initial;
  for (const step of value.steps) {
    requireCondition(step && typeof step.rule === 'string' && typeof step.from === 'string' && typeof step.to === 'string', 'invalid transition');
    requireCondition(step.from === current, 'disconnected history');
    canonical(step);
    current = step.to;
  }
  return current;
}
export function validateHistory(value, transitionChecker) {
  historyShape(value);
  requireCondition(value.steps.length === 0 || typeof transitionChecker === 'function', 'a transition verifier is required');
  for (const step of value.steps) requireCondition(transitionChecker(cloneJSON(step)) === true, 'invalid transition according to the supplied rules');
  return true;
}
export function history(initial, steps = [], transitionChecker) {
  const result = { kind: 'finite-history', initial, steps: cloneJSON(steps) };
  validateHistory(result, transitionChecker);
  return result;
}
export const identityHistory = state => history(state);
export function sourceIdentity(f) { historyShape(f); return identityHistory(f.initial); }
export function targetIdentity(f) { return identityHistory(historyShape(f)); }
export function historyEquals(f, g) { historyShape(f); historyShape(g); return equalJSON(f, g); }
/** composeHistories(g,f) means g after f. */
export function composeHistories(g, f, transitionChecker) {
  validateHistory(f, transitionChecker); validateHistory(g, transitionChecker);
  requireCondition(historyShape(f) === g.initial, 'noncomposable histories');
  return history(f.initial, [...f.steps, ...g.steps], transitionChecker);
}

function sqrtInvariant(value) {
  const a = asInterval(value);
  return qcmp(q(0), a.lower) <= 0 && qcmp(qpow(a.lower, 2), q(2)) <= 0 && qcmp(q(2), qpow(a.upper, 2)) <= 0;
}
function sqrtNext(previous) {
  requireCondition(/^(0|[1-9][0-9]*)$/.test(previous.depth), 'invalid bisection depth');
  const old = asInterval(previous.interval);
  requireCondition(sqrtInvariant(old), 'sqrt2 invariant is absent');
  const midpoint = qdiv(qadd(old.lower, old.upper), q(2));
  const square = qpow(midpoint, 2);
  const comparison = qcmp(square, q(2));
  const next = comparison < 0 ? interval(midpoint, old.upper) : comparison > 0 ? interval(old.lower, midpoint) : interval(midpoint, midpoint);
  requireCondition(sqrtInvariant(next) && intervalSubset(next, old), 'bisection invariant failure');
  requireCondition(qcmp(intervalWidth(next), qdiv(intervalWidth(old), q(2))) <= 0, 'bisection width failure');
  return { depth: String(BigInt(previous.depth) + 1n), interval: intervalJSON(next), witness: { midpoint: qstr(midpoint), square: qstr(square), comparison } };
}
function leibnizNext(previous) {
  requireCondition(/^(0|[1-9][0-9]*)$/.test(previous.m), 'invalid Leibniz stage');
  const m = BigInt(previous.m), old = asInterval(previous.interval);
  requireCondition(qcmp(intervalWidth(old), q(4n, 4n * m + 3n)) === 0, 'Leibniz gap invariant is absent');
  const t1 = q(4n, 4n * m + 3n), t2 = q(4n, 4n * m + 5n), t3 = q(4n, 4n * m + 7n);
  const next = interval(qsub(qadd(old.lower, t2), t3), qadd(qsub(old.upper, t1), t2));
  requireCondition(intervalSubset(next, old), 'Leibniz nesting failure');
  requireCondition(qcmp(intervalWidth(next), t3) === 0, 'Leibniz gap failure');
  return { m: String(m + 1n), interval: intervalJSON(next), witness: { upperChange: qstr(qsub(t2, t1)), lowerChange: qstr(qsub(t2, t3)), gap: qstr(t3) } };
}
function continuityData(coefficients, radius, epsilon, x, y) {
  coefficients = polynomial(coefficients); radius = asQ(radius); epsilon = asQ(epsilon); x = asQ(x); y = asQ(y);
  requireCondition(qcmp(epsilon, q(0)) > 0, 'nonpositive requested error');
  const lipschitz = polynomialLipschitz(coefficients, radius);
  const delta = qdiv(epsilon, qadd(lipschitz, q(1)));
  requireCondition(qcmp(qabs(x), radius) <= 0 && qcmp(qabs(y), radius) <= 0, 'points outside the bounded domain');
  const distance = qabs(qsub(x, y));
  requireCondition(qcmp(distance, delta) <= 0, 'points exceed the continuity modulus');
  const imageDifference = qabs(qsub(polynomialEvaluate(coefficients, x), polynomialEvaluate(coefficients, y)));
  const errorBound = qmul(lipschitz, distance);
  requireCondition(qcmp(imageDifference, errorBound) <= 0 && qcmp(errorBound, epsilon) <= 0, 'polynomial continuity inequality failed');
  return { coefficients: polynomialJSON(coefficients), radius: qstr(radius), x: qstr(x), y: qstr(y), epsilon: qstr(epsilon), lipschitz: qstr(lipschitz), delta: qstr(delta), distance: qstr(distance), imageDifference: qstr(imageDifference), errorBound: qstr(errorBound) };
}
function calculusData(coefficients, radius, x, h, a, b) {
  coefficients = polynomial(coefficients); radius = asQ(radius); x = asQ(x); h = asQ(h); a = asQ(a); b = asQ(b);
  requireCondition(h.n !== 0n, 'difference quotient requires nonzero h');
  requireCondition(qcmp(qabs(x), radius) <= 0 && qcmp(qabs(qadd(x, h)), radius) <= 0, 'difference quotient points outside the bounded domain');
  const derivative = polynomialDerivative(coefficients), primitive = polynomialAntiderivative(coefficients);
  requireCondition(equalJSON(polynomialJSON(polynomialDerivative(primitive)), polynomialJSON(coefficients)), 'formal derivative/antiderivative identity failed');
  const quotient = qdiv(qsub(polynomialEvaluate(coefficients, qadd(x, h)), polynomialEvaluate(coefficients, x)), h);
  const derivativeValue = polynomialEvaluate(derivative, x);
  const error = qabs(qsub(quotient, derivativeValue));
  const coefficient = polynomialDerivativeErrorCoefficient(coefficients, radius);
  const errorBound = qmul(coefficient, qabs(h));
  requireCondition(qcmp(error, errorBound) <= 0, 'difference quotient error inequality failed');
  return { coefficients: polynomialJSON(coefficients), radius: qstr(radius), x: qstr(x), h: qstr(h), a: qstr(a), b: qstr(b), derivative: polynomialJSON(derivative), antiderivative: polynomialJSON(primitive), quotient: qstr(quotient), derivativeValue: qstr(derivativeValue), error: qstr(error), errorCoefficient: qstr(coefficient), errorBound: qstr(errorBound), formalIntegral: qstr(polynomialIntegral(coefficients, a, b)) };
}

// The only accepted inference rules. Macro rules expand to the rational formulas
// documented in research/applications-v1.5.0.md; none evaluate arbitrary code.
const literalRules = new Set(['Q.literal', 'Q.precision', 'I.literal', 'P.literal', 'S2.start', 'LZ.start']);
function evaluateRule(rule, args) {
  const arity = n => requireCondition(args.length === n, `${rule}: wrong number of inputs`);
  switch (rule) {
    case 'Q.literal': arity(1); return qstr(qparse(args[0]));
    case 'Q.precision': arity(1); return qstr(targetWidth(args[0]));
    case 'Q.add': arity(2); return qstr(qadd(qparse(args[0]), qparse(args[1])));
    case 'Q.sub': arity(2); return qstr(qsub(qparse(args[0]), qparse(args[1])));
    case 'Q.mul': arity(2); return qstr(qmul(qparse(args[0]), qparse(args[1])));
    case 'Q.div': arity(2); return qstr(qdiv(qparse(args[0]), qparse(args[1])));
    case 'Q.le': arity(2); return qcmp(qparse(args[0]), qparse(args[1])) <= 0;
    case 'I.literal': arity(1); qparse(args[0].lower); qparse(args[0].upper); return intervalJSON(args[0]);
    case 'I.fromStage': arity(1); return intervalJSON(args[0].interval);
    case 'I.width': arity(1); return qstr(intervalWidth(args[0]));
    case 'I.sqrt2': arity(1); return sqrtInvariant(args[0]);
    case 'I.add': arity(2); return intervalJSON(intervalAdd(args[0], args[1]));
    case 'I.sub': arity(2); return intervalJSON(intervalSub(args[0], args[1]));
    case 'I.mul': arity(2); return intervalJSON(intervalMul(args[0], args[1]));
    case 'I.div': arity(2); return intervalJSON(intervalDiv(args[0], args[1]));
    case 'S2.start': arity(0); return { depth: '0', interval: { lower: '0/1', upper: '2/1' } };
    case 'S2.step': arity(1); return sqrtNext(args[0]);
    case 'LZ.start': arity(0); return { m: '0', interval: { lower: '8/3', upper: '4/1' } };
    case 'LZ.step': arity(1); return leibnizNext(args[0]);
    case 'P.literal': arity(1); requireCondition(Array.isArray(args[0]), 'expected polynomial list'); args[0].forEach(qparse); return polynomialJSON(args[0]);
    case 'P.continuity': arity(5); return continuityData(...args);
    case 'P.calculus': arity(6); return calculusData(...args);
    default: throw new Error(`unknown proof rule: ${rule}`);
  }
}
class Builder {
  constructor() { this.steps = []; this.values = new Map(); }
  add(rule, input = []) {
    const premises = literalRules.has(rule) ? [] : [...input];
    const args = literalRules.has(rule) ? input : input.map(id => {
      requireCondition(this.values.has(id), 'missing premise'); return this.values.get(id);
    });
    const output = evaluateRule(rule, args), id = `s${this.steps.length}`;
    this.steps.push({ id, rule, input: cloneJSON(input), output: cloneJSON(output), premises });
    this.values.set(id, output);
    return id;
  }
  literal(value) { return this.add('Q.literal', [qstr(value)]); }
}
function intervalConclusion(builder, chain, p, kind) {
  const final = builder.add('I.fromStage', [chain.at(-1)]);
  const width = builder.add('I.width', [final]);
  const target = builder.add('Q.precision', [p]);
  const bound = builder.add('Q.le', [width, target]);
  const roots = { chain, final, width, target, bound };
  if (kind === 'sqrt2') roots.invariant = builder.add('I.sqrt2', [final]);
  return { format: CERTIFICATE_FORMAT, kind, claim: { precision: p, interval: builder.values.get(final) }, roots, steps: builder.steps };
}
/** The author's finite qlim response; no final or nearest rational is assumed. */
export function generateQlimCertificate(a, b, n) {
  naturalNumber(n, 'qlim index');
  const builder = new Builder();
  const base = builder.literal(a), offset = builder.literal(b);
  const denominator = builder.literal(q(BigInt(n) + 1n));
  const correction = builder.add('Q.div', [offset, denominator]);
  const result = builder.add('Q.add', [base, correction]);
  return { format: CERTIFICATE_FORMAT, kind: 'qlim',
    claim: { base: builder.values.get(base), offset: builder.values.get(offset), index: n, value: builder.values.get(result) },
    roots: { base, offset, denominator, correction, result }, steps: builder.steps };
}
export function generateSqrt2Certificate(p) {
  precision(p); const b = new Builder(), chain = [b.add('S2.start')];
  for (let j = 0; j <= p; ++j) chain.push(b.add('S2.step', [chain.at(-1)]));
  return intervalConclusion(b, chain, p, 'sqrt2');
}
export function generateLeibnizCertificate(p, { maxStages = 4096 } = {}) {
  precision(p); naturalNumber(maxStages, 'maxStages');
  const m = 1n << BigInt(p);
  requireCondition(m <= BigInt(maxStages), `Leibniz resource limit: 2^precision exceeds maxStages=${maxStages}`);
  const b = new Builder(), chain = [b.add('LZ.start')];
  for (let j = 0n; j < m; ++j) chain.push(b.add('LZ.step', [chain.at(-1)]));
  return intervalConclusion(b, chain, p, 'leibniz');
}
export function generateIntervalCertificate(operation, left, right) {
  requireCondition(['add', 'sub', 'mul', 'div'].includes(operation), 'unknown interval operation');
  const b = new Builder();
  const l = b.add('I.literal', [intervalJSON(left)]), r = b.add('I.literal', [intervalJSON(right)]);
  const result = b.add(`I.${operation}`, [l, r]);
  return { format: CERTIFICATE_FORMAT, kind: 'interval', claim: { operation, left: b.values.get(l), right: b.values.get(r), result: b.values.get(result) }, roots: { left: l, right: r, result }, steps: b.steps };
}
export function generateContinuityCertificate(coefficients, radius, p, x, y) {
  precision(p); const b = new Builder();
  const poly = b.add('P.literal', [polynomialJSON(coefficients)]), r = b.literal(radius), epsilon = b.add('Q.precision', [p]);
  const xr = b.literal(x), yr = b.literal(y), result = b.add('P.continuity', [poly, r, epsilon, xr, yr]);
  return { format: CERTIFICATE_FORMAT, kind: 'polynomial-continuity', claim: { precision: p, ...b.values.get(result) }, roots: { result, epsilon }, steps: b.steps };
}
export function generateCalculusCertificate(coefficients, radius, x, h, a, upper) {
  const b = new Builder(), poly = b.add('P.literal', [polynomialJSON(coefficients)]);
  const refs = [radius, x, h, a, upper].map(value => b.literal(value));
  const result = b.add('P.calculus', [poly, ...refs]);
  return { format: CERTIFICATE_FORMAT, kind: 'polynomial-calculus', claim: b.values.get(result), roots: { result }, steps: b.steps };
}

/** Replay a JSON certificate and check that its declared claim is proved by its roots. */
export function verifyApplicationCertificate(certificate) {
  try {
    requireCondition(certificate && certificate.format === CERTIFICATE_FORMAT, 'unsupported certificate format');
    requireCondition(Array.isArray(certificate.steps), 'missing proof steps');
    const values = new Map(), steps = new Map();
    for (const step of certificate.steps) {
      requireCondition(step && typeof step.id === 'string' && !values.has(step.id), 'duplicate or invalid step id');
      requireCondition(Array.isArray(step.input) && Array.isArray(step.premises), 'missing rule inputs or premises');
      const literals = literalRules.has(step.rule), expectedPremises = literals ? [] : step.input;
      requireCondition(equalJSON(step.premises, expectedPremises), `${step.id}: premise list mismatch`);
      const args = literals ? step.input : step.input.map(id => {
        requireCondition(typeof id === 'string' && values.has(id), `${step.id}: missing or forward premise`);
        return values.get(id);
      });
      const expected = evaluateRule(step.rule, args);
      requireCondition(equalJSON(step.output, expected), `${step.id}: incorrect rule output`);
      values.set(step.id, expected); steps.set(step.id, step);
    }
    const claim = certificate.claim, roots = certificate.roots;
    requireCondition(claim && roots, 'missing claim or roots');
    const get = id => { requireCondition(values.has(id), 'missing conclusion'); return values.get(id); };
    const hasRule = (id, rule, input) => {
      const step = steps.get(id);
      requireCondition(step && step.rule === rule && (input === undefined || equalJSON(step.input, input)), `wrong conclusion rule: ${rule}`);
    };
    if (certificate.kind === 'qlim') {
      naturalNumber(claim.index, 'qlim index');
      hasRule(roots.base, 'Q.literal', [claim.base]);
      hasRule(roots.offset, 'Q.literal', [claim.offset]);
      hasRule(roots.denominator, 'Q.literal', [qstr(q(BigInt(claim.index) + 1n))]);
      hasRule(roots.correction, 'Q.div', [roots.offset, roots.denominator]);
      hasRule(roots.result, 'Q.add', [roots.base, roots.correction]);
      requireCondition(claim.value === get(roots.result), 'incorrect qlim response claim');
    } else if (certificate.kind === 'sqrt2' || certificate.kind === 'leibniz') {
      const p = precision(claim.precision), sqrt = certificate.kind === 'sqrt2';
      const chain = roots.chain;
      requireCondition(Array.isArray(chain) && chain.length > 0, 'missing generator chain');
      hasRule(chain[0], sqrt ? 'S2.start' : 'LZ.start', []);
      for (let j = 1; j < chain.length; ++j) hasRule(chain[j], sqrt ? 'S2.step' : 'LZ.step', [chain[j - 1]]);
      const expectedCount = sqrt ? BigInt(p + 1) : 1n << BigInt(p);
      requireCondition(BigInt(chain.length - 1) === expectedCount, 'wrong finite request length');
      hasRule(roots.final, 'I.fromStage', [chain.at(-1)]);
      hasRule(roots.width, 'I.width', [roots.final]);
      hasRule(roots.target, 'Q.precision', [p]);
      hasRule(roots.bound, 'Q.le', [roots.width, roots.target]);
      requireCondition(get(roots.bound) === true, 'precision bound is false');
      requireCondition(equalJSON(claim.interval, get(roots.final)), 'claim does not match the proved interval');
      if (sqrt) { hasRule(roots.invariant, 'I.sqrt2', [roots.final]); requireCondition(get(roots.invariant) === true, 'sqrt2 invariant is false'); }
    } else if (certificate.kind === 'interval') {
      requireCondition(['add', 'sub', 'mul', 'div'].includes(claim.operation), 'unknown interval operation');
      hasRule(roots.left, 'I.literal', [claim.left]); hasRule(roots.right, 'I.literal', [claim.right]);
      hasRule(roots.result, `I.${claim.operation}`, [roots.left, roots.right]);
      requireCondition(equalJSON(claim.result, get(roots.result)), 'incorrect interval claim');
    } else if (certificate.kind === 'polynomial-continuity') {
      precision(claim.precision); hasRule(roots.result, 'P.continuity');
      hasRule(roots.epsilon, 'Q.precision', [claim.precision]);
      requireCondition(steps.get(roots.result).input[2] === roots.epsilon, 'wrong precision premise');
      requireCondition(equalJSON(claim, { precision: claim.precision, ...get(roots.result) }), 'incorrect continuity claim');
    } else if (certificate.kind === 'polynomial-calculus') {
      hasRule(roots.result, 'P.calculus');
      requireCondition(equalJSON(claim, get(roots.result)), 'incorrect calculus claim');
    } else throw new Error('unknown certificate kind');
    return { ok: true, kind: certificate.kind, steps: certificate.steps.length };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
