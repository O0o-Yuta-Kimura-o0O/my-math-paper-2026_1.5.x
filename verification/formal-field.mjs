/**
 * F_epsilon: a candidate formal rational-function model, NOT a decision that
 * the author's qlim/# construction means Q(epsilon), and NOT the real field.
 * Coefficients are exact rationals from applications.mjs, in ascending degree.
 * Certificates replay finite rational/polynomial rules, not lambda beta steps.
 * Finite tests of this module are not proofs of universal field axioms.
 */
import { q, qparse, qstr, qadd, qsub, qmul, qdiv, qcmp, qneg } from './applications.mjs';

export const FIELD_CERTIFICATE_FORMAT = 'formal-field-certificate-v1.5.0';
const requireThat = (ok, message) => { if (!ok) throw new Error(message); };
const rat = value => qparse(qstr(value));
const zero = () => q(0);
const one = () => q(1);

/** Zero polynomial is []; constant coefficient is at index 0. */
export function poly(coefficients = []) {
  requireThat(Array.isArray(coefficients), 'expected a finite coefficient list');
  const result = coefficients.map(rat);
  while (result.length && result.at(-1).n === 0n) result.pop();
  return Object.freeze(result);
}
export const polyJSON = coefficients => poly(coefficients).map(qstr);
export const polyDegree = coefficients => poly(coefficients).length - 1;
export function polyOrd0(coefficients) {
  const p = poly(coefficients);
  return p.length ? p.findIndex(a => a.n !== 0n) : null;
}
export function polyEq(a, b) {
  a = poly(a); b = poly(b);
  return a.length === b.length && a.every((x, i) => qcmp(x, b[i]) === 0);
}
export function polyAdd(a, b) {
  a = poly(a); b = poly(b);
  return poly(Array.from({ length: Math.max(a.length, b.length) }, (_, i) => qadd(a[i] ?? zero(), b[i] ?? zero())));
}
export const polyNeg = a => poly(poly(a).map(qneg));
export const polySub = (a, b) => polyAdd(a, polyNeg(b));
export function polyScale(a, c) { c = rat(c); return poly(poly(a).map(x => qmul(c, x))); }
export function polyMul(a, b) {
  a = poly(a); b = poly(b);
  if (!a.length || !b.length) return poly();
  const result = Array.from({ length: a.length + b.length - 1 }, zero);
  for (let i = 0; i < a.length; ++i) for (let j = 0; j < b.length; ++j) result[i + j] = qadd(result[i + j], qmul(a[i], b[j]));
  return poly(result);
}
export function polyMonic(a) {
  a = poly(a);
  return a.length ? polyScale(a, qdiv(one(), a.at(-1))) : a;
}
/** Each iteration cancels the current leading term, strictly reducing degree. */
export function polyDivmod(dividend, divisor) {
  const a = poly(dividend), b = poly(divisor);
  requireThat(b.length > 0, 'polynomial division by zero');
  let remainder = a, quotient = poly();
  while (remainder.length >= b.length) {
    const oldDegree = remainder.length - 1;
    const degree = remainder.length - b.length;
    const factor = qdiv(remainder.at(-1), b.at(-1));
    const term = poly([...Array.from({ length: degree }, zero), factor]);
    quotient = polyAdd(quotient, term);
    remainder = polySub(remainder, polyMul(term, b));
    requireThat(remainder.length - 1 < oldDegree, 'polynomial division did not reduce degree');
  }
  return { quotient, remainder };
}
function gcdWithTrace(a, b) {
  a = poly(a); b = poly(b); const divisions = [];
  while (b.length) {
    const { quotient, remainder } = polyDivmod(a, b);
    divisions.push({ dividend: polyJSON(a), divisor: polyJSON(b), quotient: polyJSON(quotient), remainder: polyJSON(remainder) });
    [a, b] = [b, remainder];
  }
  return { gcd: polyMonic(a), divisions };
}
/** Convention gcd(0,0)=0; every other gcd is monic. */
export const polyGcd = (a, b) => gcdWithTrace(a, b).gcd;

function rawPair(value) {
  requireThat(value && typeof value === 'object' && !Array.isArray(value), 'expected numerator/denominator pair');
  const numerator = poly(value.numerator), denominator = poly(value.denominator);
  requireThat(denominator.length > 0, 'zero formal denominator');
  return { numerator, denominator };
}
const rawJSON = value => {
  const { numerator, denominator } = rawPair(value);
  return { numerator: polyJSON(numerator), denominator: polyJSON(denominator) };
};
function normalizeWithTrace(value) {
  const { numerator: p, denominator: r } = rawPair(value);
  if (!p.length) return { value: Object.freeze({ numerator: poly(), denominator: poly([one()]) }), witness: { zeroNumerator: true, denominatorNonzero: true } };
  const { gcd, divisions } = gcdWithTrace(p, r);
  const pd = polyDivmod(p, gcd), rd = polyDivmod(r, gcd);
  requireThat(pd.remainder.length === 0 && rd.remainder.length === 0, 'gcd failed exact division');
  const leadingDenominator = rd.quotient.at(-1), scale = qdiv(one(), leadingDenominator);
  const normalized = Object.freeze({ numerator: polyScale(pd.quotient, scale), denominator: polyScale(rd.quotient, scale) });
  return {
    value: normalized,
    witness: { gcd: polyJSON(gcd), euclideanDivisions: divisions, numeratorQuotient: polyJSON(pd.quotient), denominatorQuotient: polyJSON(rd.quotient), leadingDenominator: qstr(leadingDenominator), scale: qstr(scale) },
  };
}
/** Coprime numerator/denominator and monic denominator; zero becomes 0/1. */
export function field(numerator = [], denominator = [one()]) {
  return normalizeWithTrace({ numerator, denominator }).value;
}
export const fieldJSON = value => rawJSON(normalizeWithTrace(value).value);
export const fieldConstant = a => field([rat(a)]);
export const epsilon = () => field([zero(), one()]);

function arithmeticRaw(operation, left, right) {
  const a = rawPair(left), b = rawPair(right);
  if (operation === 'add' || operation === 'sub') {
    const first = polyMul(a.numerator, b.denominator), second = polyMul(b.numerator, a.denominator);
    return { numerator: operation === 'add' ? polyAdd(first, second) : polySub(first, second), denominator: polyMul(a.denominator, b.denominator) };
  }
  if (operation === 'mul') return { numerator: polyMul(a.numerator, b.numerator), denominator: polyMul(a.denominator, b.denominator) };
  requireThat(operation === 'div', 'unknown field arithmetic operation');
  requireThat(b.numerator.length > 0, 'formal field division by zero');
  return { numerator: polyMul(a.numerator, b.denominator), denominator: polyMul(a.denominator, b.numerator) };
}
export const fieldAdd = (a, b) => normalizeWithTrace(arithmeticRaw('add', a, b)).value;
export const fieldSub = (a, b) => normalizeWithTrace(arithmeticRaw('sub', a, b)).value;
export const fieldMul = (a, b) => normalizeWithTrace(arithmeticRaw('mul', a, b)).value;
export const fieldDiv = (a, b) => normalizeWithTrace(arithmeticRaw('div', a, b)).value;
/** Equality is checked by cross products; it does not assume stored normalization. */
export function fieldEq(a, b) {
  a = rawPair(a); b = rawPair(b);
  return polyEq(polyMul(a.numerator, b.denominator), polyMul(b.numerator, a.denominator));
}
function signWithTrace(value) {
  const f = normalizeWithTrace(value).value;
  const numeratorOrder = polyOrd0(f.numerator), denominatorOrder = polyOrd0(f.denominator);
  if (numeratorOrder === null) return { sign: 0, witness: { numeratorOrder: null, denominatorOrder, zero: true } };
  const numeratorCoefficient = f.numerator[numeratorOrder], denominatorCoefficient = f.denominator[denominatorOrder];
  const sign = qcmp(numeratorCoefficient, zero()) * qcmp(denominatorCoefficient, zero());
  return { sign, witness: { numeratorOrder, denominatorOrder, order: numeratorOrder - denominatorOrder, numeratorCoefficient: qstr(numeratorCoefficient), denominatorCoefficient: qstr(denominatorCoefficient) } };
}
/** Order at epsilon -> 0+: BOTH lowest nonzero coefficients determine the sign. */
export const fieldCmp = (a, b) => signWithTrace(fieldSub(a, b)).sign;
/** null is the order of zero; other results can be negative. */
export function fieldOrd0(value) {
  const f = normalizeWithTrace(value).value, p = polyOrd0(f.numerator);
  return p === null ? null : p - polyOrd0(f.denominator);
}
/** The old affine relation data L=(k,a); M now names the full polynomial type. */
export function embedL(k, a) {
  const integer = rat(k);
  requireThat(integer.d === 1n, 'L stage must be an integer');
  return field([rat(a), integer]);
}
/** Compatibility alias for v1.5.0 callers and saved certificate names. */
export const embedM = embedL;
/** st is defined only on finite elements at 0+, including zero. */
export function standardPart(value) {
  const f = normalizeWithTrace(value).value;
  const p = polyOrd0(f.numerator), r = polyOrd0(f.denominator);
  if (p === null || p > r) return zero();
  requireThat(p >= r, 'standard part is undefined for a pole at epsilon=0');
  return qdiv(f.numerator[p], f.denominator[r]);
}

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
  requireThat(value === null || ['string', 'number', 'boolean'].includes(typeof value), 'expected JSON data');
  requireThat(typeof value !== 'number' || Number.isFinite(value), 'nonfinite JSON number');
  return JSON.stringify(value);
}
const same = (a, b) => canonical(a) === canonical(b);
const clone = value => JSON.parse(JSON.stringify(value));

function certificateInput(operation, input) {
  if (['add', 'sub', 'mul', 'div', 'eq', 'compare'].includes(operation)) {
    requireThat(Array.isArray(input) && input.length === 2, 'expected two field operands');
    return input.map(rawJSON);
  }
  if (operation === 'normalize' || operation === 'standardPart') return rawJSON(input);
  if (operation === 'embedM') {
    const k = rat(input.k); requireThat(k.d === 1n, 'M stage must be an integer');
    return { k: qstr(k), a: qstr(rat(input.a)) };
  }
  if (operation === 'polyDivmod' || operation === 'polyGcd') {
    requireThat(Array.isArray(input) && input.length === 2, 'expected two polynomial operands');
    return input.map(polyJSON);
  }
  throw new Error('unknown formal field certificate operation');
}
function certifiedCalculation(operation, input) {
  if (operation === 'normalize') {
    const result = normalizeWithTrace(input);
    return { result: fieldJSON(result.value), witness: result.witness };
  }
  if (['add', 'sub', 'mul', 'div'].includes(operation)) {
    const raw = arithmeticRaw(operation, ...input), result = normalizeWithTrace(raw);
    return { result: fieldJSON(result.value), witness: { beforeNormalization: rawJSON(raw), normalization: result.witness } };
  }
  if (operation === 'eq') {
    const a = rawPair(input[0]), b = rawPair(input[1]);
    const left = polyMul(a.numerator, b.denominator), right = polyMul(b.numerator, a.denominator);
    return { result: polyEq(left, right), witness: { leftCrossProduct: polyJSON(left), rightCrossProduct: polyJSON(right) } };
  }
  if (operation === 'compare') {
    const raw = arithmeticRaw('sub', ...input), difference = normalizeWithTrace(raw), sign = signWithTrace(difference.value);
    return { result: sign.sign, witness: { difference: fieldJSON(difference.value), normalization: difference.witness, sign: sign.witness } };
  }
  if (operation === 'standardPart') {
    const normalized = normalizeWithTrace(input).value;
    return { result: qstr(standardPart(normalized)), witness: { normalized: fieldJSON(normalized), numeratorOrder: polyOrd0(normalized.numerator), denominatorOrder: polyOrd0(normalized.denominator) } };
  }
  if (operation === 'embedM') return { result: fieldJSON(embedM(input.k, input.a)), witness: { formula: 'a + k*epsilon' } };
  if (operation === 'polyDivmod') {
    const result = polyDivmod(...input);
    return { result: { quotient: polyJSON(result.quotient), remainder: polyJSON(result.remainder) }, witness: { reconstructedDividend: polyJSON(polyAdd(polyMul(input[1], result.quotient), result.remainder)), divisorDegree: polyDegree(input[1]), remainderDegree: polyDegree(result.remainder) } };
  }
  if (operation === 'polyGcd') {
    const result = gcdWithTrace(...input);
    return { result: polyJSON(result.gcd), witness: { euclideanDivisions: result.divisions } };
  }
  throw new Error('unknown formal field certificate operation');
}
/**
 * operation: normalize | add/sub/mul/div | eq | compare | standardPart |
 * embedM | polyDivmod | polyGcd.
 * Binary input is [left,right]; unary field input is {numerator,denominator};
 * embedM input is {k,a}. Rational coefficients may be q objects or codes.
 * Output has only JSON values. Rule expansion trusts the shared exact arithmetic.
 */
export function generateFieldCertificate(operation, input) {
  input = certificateInput(operation, input);
  const calculation = certifiedCalculation(operation, input);
  return {
    format: FIELD_CERTIFICATE_FORMAT, operation,
    steps: [
      { id: 's0', rule: 'F.input', input: clone(input), output: clone(input), premises: [] },
      { id: 's1', rule: `F.${operation}`, input: ['s0'], output: clone(calculation), premises: ['s0'] },
    ],
    claim: { value: clone(calculation.result), proof: 's1' },
  };
}
/** Replays all finite calculations and binds the declared value to the result. */
export function verifyFieldCertificate(certificate) {
  try {
    requireThat(certificate?.format === FIELD_CERTIFICATE_FORMAT, 'unsupported field certificate format');
    requireThat(Array.isArray(certificate.steps) && certificate.steps.length === 2, 'expected input and calculation steps');
    const [data, calculation] = certificate.steps;
    requireThat(data.id === 's0' && data.rule === 'F.input' && same(data.premises, []), 'invalid input rule');
    const input = certificateInput(certificate.operation, data.input);
    requireThat(same(data.input, input) && same(data.output, input), 'invalid or noncanonical input evidence');
    requireThat(calculation.id === 's1' && calculation.rule === `F.${certificate.operation}` && same(calculation.input, ['s0']) && same(calculation.premises, ['s0']), 'invalid calculation premises');
    const expected = certifiedCalculation(certificate.operation, input);
    requireThat(same(calculation.output, expected), 'incorrect polynomial/rational calculation or witness');
    requireThat(certificate.claim?.proof === 's1' && same(certificate.claim.value, expected.result), 'claim does not match the verified calculation');
    return { ok: true, operation: certificate.operation, result: expected.result, steps: 2 };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
