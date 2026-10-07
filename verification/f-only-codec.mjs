/**
 * One-node spelling of the existing finite concept trees:
 *   zero -> f(), succ(T) -> f(T), pair(L,R) -> f(LR).
 * Parentheses delimit the children of f; there is no comma or independent
 * pair delimiter. Only zero, one, or two immediate children are accepted.
 *
 * This is an invertible change of concrete syntax. It neither evaluates f
 * nor supplies an interpretation, typing judgment, or proof of a theorem.
 * Bounds restrict this implementation, not the mathematical grammar.
 */
import {
  CODEC_LIMITS, ZERO, succ, pair, parseSymbol, printSymbol,
} from './concept-codec.mjs';

export { CODEC_LIMITS };
const demand = (ok, message) => { if (!ok) throw new Error(message); };

function limits(options = {}) {
  demand(options && typeof options === 'object' && !Array.isArray(options), 'expected resource options');
  const result = { ...CODEC_LIMITS };
  for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(options))) {
    demand(Object.hasOwn(CODEC_LIMITS, key), `unknown resource option ${key}`);
    demand(Object.hasOwn(descriptor, 'value'), 'resource option accessors are not allowed');
    demand(Number.isSafeInteger(descriptor.value) && descriptor.value >= 1, `invalid ${key}`);
    result[key] = descriptor.value;
  }
  return result;
}

const shapeKeys = { zero: ['kind'], succ: ['kind', 'value'], pair: ['kind', 'left', 'right'] };
function shape(node) {
  demand(node && typeof node === 'object' && !Array.isArray(node), 'expected symbol node');
  const descriptors = Object.getOwnPropertyDescriptors(node);
  demand(descriptors.kind && Object.hasOwn(descriptors.kind, 'value'), 'symbol node accessors are not allowed');
  const expected = typeof descriptors.kind.value === 'string' && Object.hasOwn(shapeKeys, descriptors.kind.value) && shapeKeys[descriptors.kind.value];
  demand(expected && Reflect.ownKeys(descriptors).length === expected.length && expected.every(k => Object.hasOwn(descriptors, k)), 'invalid symbol node');
  demand(expected.every(k => Object.hasOwn(descriptors[k], 'value')), 'symbol node accessors are not allowed');
}

/** Strict whole-input parser. Spaces and line breaks between tokens are allowed. */
export function parseFOnly(source, options) {
  const bound = limits(options);
  demand(typeof source === 'string', 'expected f-only text');
  demand(source.length <= bound.maxChars, 'maxChars exceeded');
  let index = 0, count = 0;
  const stack = [];
  const skip = () => { while (index < source.length && /\s/u.test(source[index])) ++index; };
  for (;;) {
    skip();
    demand(source[index] === 'f', `expected f at ${index}`);
    ++index; skip();
    demand(source[index] === '(', `expected '(' at ${index}`);
    ++index;
    demand(++count <= bound.maxNodes, 'maxNodes exceeded');
    demand(stack.length <= bound.maxDepth, 'maxDepth exceeded');
    stack.push([]);
    for (;;) {
      skip();
      const children = stack.at(-1);
      if (source[index] === 'f') {
        demand(children.length < 2, `f accepts at most two immediate children at ${index}`);
        break;
      }
      demand(source[index] === ')', `expected f or ')' at ${index}`);
      ++index; stack.pop();
      const node = children.length === 0 ? ZERO : children.length === 1 ? succ(children[0]) : pair(children[0], children[1]);
      if (!stack.length) {
        skip(); demand(index === source.length, `trailing input at ${index}`);
        return node;
      }
      stack.at(-1).push(node);
    }
  }
}

/** Iterative serializer; a shared subtree is printed at every occurrence. */
export function printFOnly(root, options) {
  const bound = limits(options), stack = [{ node: root, depth: 0 }];
  const checked = new WeakSet(), active = new WeakSet(), chunks = [];
  let buffer = '', length = 0, count = 0;
  const emit = text => {
    length += text.length; demand(length <= bound.maxChars, 'maxChars exceeded');
    buffer += text;
    if (buffer.length >= 8192) { chunks.push(buffer); buffer = ''; }
  };
  while (stack.length) {
    const work = stack.pop();
    if (work.close) { emit(')'); active.delete(work.close); continue; }
    const { node, depth } = work;
    demand(depth <= bound.maxDepth, 'maxDepth exceeded');
    demand(++count <= bound.maxNodes, 'maxNodes exceeded');
    if (!checked.has(node)) { shape(node); checked.add(node); }
    demand(!active.has(node), 'cyclic symbol node');
    if (node.kind === 'zero') { emit('f()'); continue; }
    active.add(node); emit('f('); stack.push({ close: node });
    if (node.kind === 'succ') stack.push({ node: node.value, depth: depth + 1 });
    else stack.push({ node: node.right, depth: depth + 1 }, { node: node.left, depth: depth + 1 });
  }
  chunks.push(buffer); return chunks.join('');
}

/** Convert the old f(), f(T), (T,T) grammar, preserving its entire tree. */
export function convertToFOnly(source, options) {
  const bound = limits(options);
  return printFOnly(parseSymbol(source, bound), bound);
}

/** Recover the canonical old spelling; source whitespace is not preserved. */
export function convertFromFOnly(source, options) {
  const bound = limits(options);
  return printSymbol(parseFOnly(source, bound), bound);
}
