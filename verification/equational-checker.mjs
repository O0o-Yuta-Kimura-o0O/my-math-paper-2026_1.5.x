/** Finite equational proofs over explicitly inductive Nat and Seq.
 * No theorem is accepted from tests, an evaluator's assertion, or supplied axioms.
 * Trusted rules: the signature, six defining equations, equality congruence,
 * substitution of proved universal equations, and structural induction.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const FORMAT = 'finite-equational-proof/1';
const signature = Object.freeze({
  Z: [[], 'Nat'], S: [['Nat'], 'Nat'],
  Add: [['Nat', 'Nat'], 'Nat'], Mul: [['Nat', 'Nat'], 'Nat'],
  Nil: [[], 'Seq'], Cons: [['Event', 'Seq'], 'Seq'],
  Append: [['Seq', 'Seq'], 'Seq'],
});
const fail = message => { throw new Error(message); };
const own = (o, k) => Object.hasOwn(o, k);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const variable = name => ({v: name});
const constructor = (f, ...args) => ({f, args});

export function parseTerm(source, variables) {
  if (typeof source !== 'string' || source.length > 100000) fail('Invalid term text');
  const tokens = source.match(/[A-Za-z_][A-Za-z_0-9]*|[(),]|\S/g) || [];
  let at = 0;
  function term(depth = 0) {
    if (depth > 256) fail('Term nesting limit');
    const name = tokens[at++];
    if (!name || !/^[A-Za-z_][A-Za-z_0-9]*$/.test(name)) fail('Expected term name');
    if (own(variables, name)) {
      if (tokens[at] === '(') fail('A variable is not a function');
      return variable(name);
    }
    if (!own(signature, name)) fail(`Unknown symbol: ${name}`);
    const arity = signature[name][0].length;
    const args = [];
    if (arity) {
      if (tokens[at++] !== '(') fail(`Expected '(' after ${name}`);
      for (let i = 0; i < arity; i++) {
        if (i && tokens[at++] !== ',') fail('Expected comma');
        args.push(term(depth + 1));
      }
      if (tokens[at++] !== ')') fail('Expected closing parenthesis');
    }
    return constructor(name, ...args);
  }
  const result = term();
  if (at !== tokens.length) fail('Unconsumed term input');
  sortOf(result, variables);
  return result;
}

export function printTerm(t) {
  return own(t, 'v') ? t.v : t.f + (t.args.length ? `(${t.args.map(printTerm).join(',')})` : '');
}

function sortOf(t, variables) {
  if (own(t, 'v')) return variables[t.v] || fail(`Unbound variable: ${t.v}`);
  const sig = signature[t.f];
  if (!sig || t.args.length !== sig[0].length) fail('Malformed application');
  t.args.forEach((arg, i) => {
    if (sortOf(arg, variables) !== sig[0][i]) fail(`Sort mismatch in ${t.f}`);
  });
  return sig[1];
}

function validateVariables(vars) {
  if (!vars || typeof vars !== 'object' || Array.isArray(vars)) fail('Missing variable context');
  for (const [name, sort] of Object.entries(vars)) {
    if (!/^[a-z][A-Za-z_0-9]*$/.test(name) || own(signature, name)) fail('Invalid variable name');
    if (!['Nat', 'Seq', 'Event'].includes(sort)) fail('Unknown sort');
  }
}

function equation(left, right, variables) {
  const lhs = parseTerm(left, variables), rhs = parseTerm(right, variables);
  if (sortOf(lhs, variables) !== sortOf(rhs, variables)) fail('Equation has different sorts');
  return {lhs, rhs};
}

const definingRules = [
  ['add.zero', {x: 'Nat'}, 'Add(x,Z)', 'x'],
  ['add.succ', {x: 'Nat', y: 'Nat'}, 'Add(x,S(y))', 'S(Add(x,y))'],
  ['mul.zero', {x: 'Nat'}, 'Mul(x,Z)', 'Z'],
  ['mul.succ', {x: 'Nat', y: 'Nat'}, 'Mul(x,S(y))', 'Add(Mul(x,y),x)'],
  ['append.nil', {u: 'Seq'}, 'Append(Nil,u)', 'u'],
  ['append.cons', {h: 'Event', t: 'Seq', u: 'Seq'}, 'Append(Cons(h,t),u)', 'Cons(h,Append(t,u))'],
];

function initialRules() {
  return new Map(definingRules.map(([id, vars, l, r]) => [id,
    {...equation(l, r, vars), flexible: vars, id}]));
}

function substitute(t, name, value) {
  if (own(t, 'v')) return t.v === name ? value : t;
  return constructor(t.f, ...t.args.map(a => substitute(a, name, value)));
}

function match(pattern, term, flexible, values, context) {
  if (own(pattern, 'v') && own(flexible, pattern.v)) {
    if (sortOf(term, context) !== flexible[pattern.v]) fail('Rule substitution has wrong sort');
    if (values.has(pattern.v) && !same(values.get(pattern.v), term)) fail('Inconsistent rule substitution');
    values.set(pattern.v, term);
    return;
  }
  if (own(pattern, 'v')) {
    if (!same(pattern, term)) fail('Induction hypothesis requires its fixed variables');
    return;
  }
  if (own(term, 'v') || pattern.f !== term.f || pattern.args.length !== term.args.length) fail('Rule does not match');
  pattern.args.forEach((a, i) => match(a, term.args[i], flexible, values, context));
}

function instantiate(t, flexible, values) {
  if (own(t, 'v')) {
    if (!own(flexible, t.v)) return t;
    return values.get(t.v) || fail('Reverse rewrite has an undetermined variable');
  }
  return constructor(t.f, ...t.args.map(a => instantiate(a, flexible, values)));
}

function atPath(t, positions, update) {
  if (!positions.length) return update(t);
  const [i, ...rest] = positions;
  if (own(t, 'v') || !Number.isSafeInteger(i) || i < 0 || i >= t.args.length) fail('Invalid rewrite position');
  return constructor(t.f, ...t.args.map((a, j) => j === i ? atPath(a, rest, update) : a));
}

function runSteps(start, steps, rules, context, audit) {
  if (!Array.isArray(steps) || steps.length > 10000) fail('Invalid proof steps');
  let current = start;
  for (const step of steps) {
    if (!step || typeof step !== 'object') fail('Invalid step');
    const rule = rules.get(step.rule) || fail(`Unknown or unproved rule: ${step.rule}`);
    if (!Array.isArray(step.path) || step.path.length > 256) fail('Missing rewrite path');
    const direction = step.direction || 'forward';
    if (!['forward', 'backward'].includes(direction)) fail('Invalid rewrite direction');
    const [from, to] = direction === 'forward' ? [rule.lhs, rule.rhs] : [rule.rhs, rule.lhs];
    const before = printTerm(current);
    current = atPath(current, step.path, target => {
      const values = new Map();
      match(from, target, rule.flexible, values, context);
      return instantiate(to, rule.flexible, values);
    });
    sortOf(current, context);
    audit.push({rule: step.rule, path: step.path, direction, before, after: printTerm(current)});
  }
  return current;
}

function join(goal, proof, rules, context, audit) {
  if (!proof || proof.kind !== 'join') fail('Expected two-sided equational derivation');
  const left = runSteps(goal.lhs, proof.left, rules, context, audit);
  const right = runSteps(goal.rhs, proof.right, rules, context, audit);
  if (!same(left, right)) fail(`Proof endpoints differ: ${printTerm(left)} != ${printTerm(right)}`);
}

function checkOne(cert, priorRules) {
  if (!cert || typeof cert.id !== 'string' || !/^[a-z][a-zA-Z0-9._-]*$/.test(cert.id)) fail('Invalid theorem id');
  if (priorRules.has(cert.id) || cert.id === 'IH') fail('Duplicate or reserved theorem id');
  validateVariables(cert.variables);
  const context = {...cert.variables};
  if (!Array.isArray(cert.equation) || cert.equation.length !== 2) fail('Missing equation');
  const goal = equation(...cert.equation, context);
  const audit = [];
  const proof = cert.proof;
  if (proof?.kind === 'join') {
    join(goal, proof, priorRules, context, audit);
  } else if (proof?.kind === 'induction') {
    const on = proof.on;
    if (!own(context, on) || !['Nat', 'Seq'].includes(context[on])) fail('Induction requires Nat or Seq variable');
    const sort = context[on];
    const stepContext = {...context};
    delete stepContext[on];
    const fresh = proof.fresh;
    const needed = sort === 'Nat' ? ['predecessor'] : ['head', 'tail'];
    if (!fresh || needed.some(k => typeof fresh[k] !== 'string')) fail('Missing induction eigenvariables');
    const used = new Set(Object.keys(context));
    for (const key of needed) {
      const name = fresh[key];
      if (used.has(name) || !/^[a-z][A-Za-z_0-9]*$/.test(name)) fail('Induction eigenvariable is not fresh');
      used.add(name);
      stepContext[name] = key === 'head' ? 'Event' : sort;
    }
    const predecessor = variable(fresh[sort === 'Nat' ? 'predecessor' : 'tail']);
    const base = constructor(sort === 'Nat' ? 'Z' : 'Nil');
    const successor = sort === 'Nat' ? constructor('S', predecessor) : constructor('Cons', variable(fresh.head), predecessor);
    const replace = value => ({lhs: substitute(goal.lhs, on, value), rhs: substitute(goal.rhs, on, value)});
    const baseContext = {...context}; delete baseContext[on];
    join(replace(base), proof.base, priorRules, baseContext, audit);
    const stepRules = new Map(priorRules);
    stepRules.set('IH', {...replace(predecessor), flexible: {}, id: 'IH'});
    join(replace(successor), proof.step, stepRules, stepContext, audit);
  } else fail('Unknown proof form');
  return {rule: {...goal, flexible: context, id: cert.id},
    report: {id: cert.id, variables: context, equation: cert.equation, status: 'verified',
      proofKind: proof.kind, rewriteSteps: audit.length, trace: audit}};
}

export function checkBundle(bundle) {
  if (bundle?.format !== FORMAT || !Array.isArray(bundle.theorems) || bundle.theorems.length > 1000) fail('Invalid proof bundle');
  const rules = initialRules();
  const reports = [];
  for (const cert of bundle.theorems) {
    const {rule, report} = checkOne(cert, rules);
    rules.set(cert.id, rule);
    reports.push(report);
  }
  return {format: 'finite-equational-verification/1', status: 'verified',
    kernel: 'typed equational logic + structural induction; separate from lambda beta traces',
    trustedDefiningRules: definingRules.map(([id, variables, lhs, rhs]) => ({id, variables, lhs, rhs})),
    theoremCount: reports.length, rewriteSteps: reports.reduce((n, r) => n + r.rewriteSteps, 0), theorems: reports};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const input = process.argv[2] || fileURLToPath(new URL('./certificates/nat-and-paths.json', import.meta.url));
    const result = checkBundle(JSON.parse(fs.readFileSync(input, 'utf8')));
    if (process.argv[3]) fs.writeFileSync(process.argv[3], JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify({status: result.status, theoremCount: result.theoremCount, rewriteSteps: result.rewriteSteps}));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
