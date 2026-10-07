/**
 * A finite, typed representation codec. Concrete syntax: f(), f(T), (T,T).
 * Type names, normalization algorithms, and interpretation are EXTERNAL to
 * this alphabet. Round trips establish representation, not a theorem's truth.
 * M is the complete finite rational-coefficient polynomial representation.
 * Resource limits below restrict this implementation, not the grammar.
 */
import { q, qparse, qstr } from './applications.mjs';
import { poly, polyJSON, field, fieldJSON, fieldSub, fieldEq } from './formal-field.mjs';

export const CODEC_LIMITS = Object.freeze({
  maxNodes: 8_000_000, maxChars: 32_000_000, maxDepth: 100_000,
  maxNatural: 100_000, maxJSONDepth: 256,
});
const demand = (ok, message) => { if (!ok) throw new Error(message); };
function limits(options = {}) {
  demand(options && typeof options === 'object' && !Array.isArray(options), 'expected resource options');
  const result = { ...CODEC_LIMITS, ...options };
  for (const key of Object.keys(result)) {
    demand(Object.hasOwn(CODEC_LIMITS, key), `unknown resource option ${key}`);
    demand(Number.isSafeInteger(result[key]) && result[key] >= 1, `invalid ${key}`);
  }
  return result;
}
export const ZERO = Object.freeze({ kind: 'zero' });
export const succ = value => Object.freeze({ kind: 'succ', value });
export const pair = (left, right) => Object.freeze({ kind: 'pair', left, right });
const shapeKeys = { zero: ['kind'], succ: ['kind', 'value'], pair: ['kind', 'left', 'right'] };
function shape(node) {
  demand(node && typeof node === 'object' && !Array.isArray(node), 'expected symbol node');
  const expected = shapeKeys[node.kind];
  demand(expected && Object.keys(node).length === expected.length && expected.every(k => Object.hasOwn(node, k)), 'invalid symbol node');
  return node.kind;
}
const asPair = node => { demand(shape(node) === 'pair', 'expected pair'); return node; };

/** Strict whole-input parser. Whitespace is permitted between tokens. */
export function parseSymbol(source, options) {
  const bound = limits(options);
  demand(typeof source === 'string', 'expected symbol text');
  demand(source.length <= bound.maxChars, 'maxChars exceeded');
  let index = 0, count = 0;
  const stack = [];
  const skip = () => { while (index < source.length && /\s/u.test(source[index])) ++index; };
  const token = character => { skip(); demand(source[index] === character, `expected '${character}' at ${index}`); ++index; };
  const counted = node => { demand(++count <= bound.maxNodes, 'maxNodes exceeded'); return node; };
  const push = frame => { stack.push(frame); demand(stack.length <= bound.maxDepth, 'maxDepth exceeded'); };
  for (;;) {
    skip(); let node;
    if (source[index] === 'f') {
      ++index; token('('); skip();
      if (source[index] === ')') { ++index; node = counted(ZERO); }
      else { push({ kind: 'succ' }); continue; }
    } else if (source[index] === '(') {
      ++index; push({ kind: 'pair' }); continue;
    } else throw new Error(`expected f() or pair at ${index}`);
    for (;;) {
      if (!stack.length) {
        skip(); demand(index === source.length, `trailing input at ${index}`); return node;
      }
      const frame = stack.at(-1);
      if (frame.kind === 'succ') {
        token(')'); stack.pop(); node = counted(succ(node));
      } else if (!Object.hasOwn(frame, 'left')) {
        frame.left = node; token(','); break;
      } else {
        token(')'); stack.pop(); node = counted(pair(frame.left, node));
      }
    }
  }
}

/** Iterative serializer; visits shared subtrees at each occurrence. */
export function printSymbol(root, options) {
  const bound = limits(options), stack = [{ node: root, depth: 0 }], checked = new WeakSet();
  const chunks = []; let buffer = '', length = 0, count = 0;
  const emit = text => {
    length += text.length; demand(length <= bound.maxChars, 'maxChars exceeded'); buffer += text;
    if (buffer.length >= 8192) { chunks.push(buffer); buffer = ''; }
  };
  while (stack.length) {
    const work = stack.pop();
    if (typeof work === 'string') { emit(work); continue; }
    const { node, depth } = work;
    demand(depth <= bound.maxDepth, 'maxDepth exceeded');
    demand(++count <= bound.maxNodes, 'maxNodes exceeded');
    if (!checked.has(node)) { shape(node); checked.add(node); }
    if (node.kind === 'zero') emit('f()');
    else if (node.kind === 'succ') { emit('f('); stack.push(')', { node: node.value, depth: depth + 1 }); }
    else { emit('('); stack.push(')', { node: node.right, depth: depth + 1 }, ',', { node: node.left, depth: depth + 1 }); }
  }
  chunks.push(buffer); return chunks.join('');
}

function integer(value) {
  demand(typeof value === 'bigint' || (typeof value === 'number' && Number.isSafeInteger(value)), 'expected bigint or safe integer');
  return BigInt(value);
}
const naturals = [ZERO];
function natural(value, bound) {
  const n = integer(value);
  demand(n >= 0n, 'negative natural number');
  demand(n <= BigInt(bound.maxNatural), 'maxNatural exceeded');
  const k = Number(n);
  // Byte encodings share their immutable unary prefixes. Larger values do not
  // enlarge this permanent cache beyond 256 nodes.
  while (naturals.length <= Math.min(k, 255)) naturals.push(succ(naturals.at(-1)));
  let result = naturals[Math.min(k, 255)];
  for (let i = 256; i <= k; ++i) result = succ(result);
  return result;
}
function readNatural(node, bound) {
  let count = 0; const seen = new Set();
  while (shape(node) === 'succ') {
    demand(!seen.has(node), 'cyclic natural number'); seen.add(node);
    demand(++count <= bound.maxNatural, 'maxNatural exceeded'); node = node.value;
  }
  demand(node.kind === 'zero', 'expected natural number'); return BigInt(count);
}
export const encodeNat = (value, options) => natural(value, limits(options));
export const decodeNat = (node, options) => readNatural(node, limits(options));
function signed(value, bound) {
  const n = integer(value); return pair(natural(n < 0n ? 1n : 0n, bound), natural(n < 0n ? -n : n, bound));
}
function readSigned(node, bound) {
  const p = asPair(node), sign = readNatural(p.left, bound), magnitude = readNatural(p.right, bound);
  demand(sign === 0n || sign === 1n, 'invalid sign');
  demand(sign === 0n || magnitude !== 0n, 'noncanonical negative zero');
  return sign === 1n ? -magnitude : magnitude;
}
export const encodeInt = (value, options) => signed(value, limits(options));
export const decodeInt = (node, options) => readSigned(node, limits(options));
function rational(value, bound) {
  const r = qparse(qstr(value)); return pair(signed(r.n, bound), signed(r.d, bound));
}
function readRational(node, bound) {
  const p = asPair(node), n = readSigned(p.left, bound), d = readSigned(p.right, bound);
  demand(d > 0n, 'rational denominator must be positive'); const r = q(n, d);
  demand(r.n === n && r.d === d, 'noncanonical rational'); return r;
}
export const encodeRat = (value, options) => rational(value, limits(options));
export const decodeRat = (node, options) => readRational(node, limits(options));
function list(values, bound) {
  demand(Array.isArray(values), 'expected finite array');
  demand(values.length <= bound.maxNodes && values.length <= bound.maxDepth, 'list resource limit exceeded');
  let node = ZERO;
  for (let i = values.length - 1; i >= 0; --i) { shape(values[i]); node = pair(values[i], node); }
  return node;
}
function readList(node, bound) {
  const values = [], seen = new Set();
  while (shape(node) === 'pair') {
    demand(!seen.has(node), 'cyclic list'); seen.add(node);
    demand(values.length < bound.maxNodes && values.length < bound.maxDepth, 'list resource limit exceeded');
    values.push(node.left); node = node.right;
  }
  demand(node.kind === 'zero', 'improper list terminator'); return values;
}
export const encodeList = (values, options) => list(values, limits(options));
export const decodeList = (node, options) => readList(node, limits(options));
function polynomial(values, bound) { return list(poly(values).map(r => rational(r, bound)), bound); }
function readPolynomial(node, bound) {
  const values = readList(node, bound).map(n => readRational(n, bound));
  demand(!values.length || values.at(-1).n !== 0n, 'noncanonical trailing zero coefficient'); return poly(values);
}
export const encodePolynomial = (value, options) => polynomial(value, limits(options));
export const decodePolynomial = (node, options) => readPolynomial(node, limits(options));
function fieldValue(value, bound) {
  demand(value && typeof value === 'object' && Array.isArray(value.numerator) && Array.isArray(value.denominator), 'expected field value');
  const f = field(value.numerator, value.denominator);
  return pair(polynomial(f.numerator, bound), polynomial(f.denominator, bound));
}
function readField(node, bound) {
  const p = asPair(node), numerator = readPolynomial(p.left, bound), denominator = readPolynomial(p.right, bound);
  const normalized = field(numerator, denominator);
  demand(JSON.stringify({ numerator: polyJSON(numerator), denominator: polyJSON(denominator) }) === JSON.stringify(fieldJSON(normalized)), 'noncanonical formal field value');
  return normalized;
}
export const encodeField = (value, options) => fieldValue(value, limits(options));
export const decodeField = (node, options) => readField(node, limits(options));
const FIELD_ZERO = field();
function complex(value, bound) {
  demand(value && typeof value === 'object' && Object.hasOwn(value, 'real') && Object.hasOwn(value, 'imag'), 'expected complex real/imag value');
  const a = fieldValue(value.real, bound), b = fieldValue(value.imag, bound), negativeB = fieldValue(fieldSub(FIELD_ZERO, value.imag), bound);
  return pair(pair(a, negativeB), pair(b, a));
}
function readComplex(node, bound) {
  const matrix = asPair(node), row1 = asPair(matrix.left), row2 = asPair(matrix.right);
  const a = readField(row1.left, bound), negativeB = readField(row1.right, bound), b = readField(row2.left, bound), d = readField(row2.right, bound);
  demand(fieldEq(a, d) && fieldEq(negativeB, fieldSub(FIELD_ZERO, b)), 'invalid complex matrix constraint');
  return { real: a, imag: b };
}
export const encodeComplex = (value, options) => complex(value, limits(options));
export const decodeComplex = (node, options) => readComplex(node, limits(options));
export function encodeQuaternion(value, options) {
  const bound = limits(options);
  demand(value && typeof value === 'object' && Object.hasOwn(value, 'z') && Object.hasOwn(value, 'w'), 'expected quaternion z/w value');
  return pair(complex(value.z, bound), complex(value.w, bound));
}
export function decodeQuaternion(node, options) {
  const bound = limits(options), p = asPair(node); return { z: readComplex(p.left, bound), w: readComplex(p.right, bound) };
}

const encoder = new TextEncoder(), decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });
function textValue(value, bound) {
  demand(typeof value === 'string', 'expected string');
  demand(value.length <= bound.maxChars, 'maxChars exceeded');
  const bytes = encoder.encode(value);
  demand(decoder.decode(bytes) === value, 'unpaired UTF-16 surrogate is not encodable');
  return list(Array.from(bytes, n => natural(n, bound)), bound);
}
function readText(node, bound) {
  const bytes = readList(node, bound).map(n => {
    const value = readNatural(n, bound); demand(value <= 255n, 'UTF-8 byte exceeds 255'); return Number(value);
  });
  let value;
  try { value = decoder.decode(Uint8Array.from(bytes)); }
  catch { throw new Error('invalid UTF-8 byte sequence'); }
  demand(value.length <= bound.maxChars, 'maxChars exceeded'); return value;
}
export const encodeText = (value, options) => textValue(value, limits(options));
export const decodeText = (node, options) => readText(node, limits(options));

/**
 * Tagged JSON constructors (tag,payload): null=0,false=1,true=2,number=3,
 * string=4,array=5,object=6. The first three use payload f(). Objects store
 * lexicographically sorted key/value pairs (JavaScript UTF-16 code-unit order).
 * Finite numbers use JSON.stringify's canonical number text; -0 is rejected.
 * This is a lossless JSON data codec, not a schema or execution semantics.
 */
export function encodeJSON(value, options) {
  const bound = limits(options), ancestors = new Set();
  let calls = 0;
  const tagged = (tag, payload = ZERO) => pair(natural(tag, bound), payload);
  function encode(v, depth) {
    demand(depth <= bound.maxJSONDepth, 'maxJSONDepth exceeded');
    demand(++calls <= bound.maxNodes, 'maxNodes exceeded');
    if (v === null) return tagged(0);
    if (v === false) return tagged(1);
    if (v === true) return tagged(2);
    if (typeof v === 'number') {
      demand(Number.isFinite(v) && !Object.is(v, -0), 'expected finite canonical JSON number, excluding -0');
      return tagged(3, textValue(JSON.stringify(v), bound));
    }
    if (typeof v === 'string') return tagged(4, textValue(v, bound));
    demand(v && typeof v === 'object', 'unsupported JSON value');
    demand(!ancestors.has(v), 'cyclic JSON value'); ancestors.add(v);
    demand(Object.getOwnPropertySymbols(v).length === 0, 'JSON symbols are not supported');
    let result;
    if (Array.isArray(v)) {
      const keys = Object.keys(v);
      demand(keys.length === v.length && keys.every((key, i) => key === String(i)) && Object.getOwnPropertyNames(v).length === v.length + 1, 'expected dense JSON array without extra properties');
      result = tagged(5, list(keys.map(key => {
        const descriptor = Object.getOwnPropertyDescriptor(v, key);
        demand(Object.hasOwn(descriptor, 'value'), 'JSON accessors are not supported');
        return encode(descriptor.value, depth + 1);
      }), bound));
    } else {
      demand(Object.getPrototypeOf(v) === Object.prototype || Object.getPrototypeOf(v) === null, 'expected plain JSON object');
      const keys = Object.keys(v).sort();
      demand(Object.getOwnPropertyNames(v).length === keys.length, 'nonenumerable JSON properties are not supported');
      result = tagged(6, list(keys.map(key => {
        const descriptor = Object.getOwnPropertyDescriptor(v, key);
        demand(Object.hasOwn(descriptor, 'value'), 'JSON accessors are not supported');
        return pair(textValue(key, bound), encode(descriptor.value, depth + 1));
      }), bound));
    }
    ancestors.delete(v); return result;
  }
  return encode(value, 0);
}
export function decodeJSON(node, options) {
  const bound = limits(options), ancestors = new Set(); let calls = 0;
  function decode(term, depth) {
    demand(depth <= bound.maxJSONDepth, 'maxJSONDepth exceeded');
    demand(++calls <= bound.maxNodes, 'maxNodes exceeded');
    demand(!ancestors.has(term), 'cyclic JSON symbol'); ancestors.add(term);
    const p = asPair(term), tag = readNatural(p.left, bound); let value;
    if (tag <= 2n) {
      demand(shape(p.right) === 'zero', 'noncanonical empty JSON payload');
      value = tag === 0n ? null : tag === 1n ? false : true;
    } else if (tag === 3n) {
      const spelling = readText(p.right, bound); value = Number(spelling);
      demand(Number.isFinite(value) && !Object.is(value, -0) && JSON.stringify(value) === spelling, 'noncanonical JSON number text');
    } else if (tag === 4n) value = readText(p.right, bound);
    else if (tag === 5n) value = readList(p.right, bound).map(item => decode(item, depth + 1));
    else if (tag === 6n) {
      value = {}; let previous = null;
      for (const item of readList(p.right, bound)) {
        const entry = asPair(item), key = readText(entry.left, bound);
        demand(previous === null || previous < key, 'noncanonical or duplicate JSON object keys'); previous = key;
        Object.defineProperty(value, key, { value: decode(entry.right, depth + 1), enumerable: true, writable: true, configurable: true });
      }
    } else throw new Error('unknown JSON constructor tag');
    ancestors.delete(term); return value;
  }
  return decode(node, 0);
}
