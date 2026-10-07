// Finite transition records and conditional equational derivations.
// No arithmetic values are converted through JavaScript Number.
const copy = value => JSON.parse(JSON.stringify(value));
function equal(a, b) {
  if (a === b) return true;
  if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every((value, i) => equal(value, b[i]));
  if (!isRecord(a) || !isRecord(b)) return false;
  const left = Object.keys(a).sort(), right = Object.keys(b).sort();
  return left.length === right.length && left.every((name, i) => name === right[i] && equal(a[name], b[name]));
}
const requireThat = (condition, message) => { if (!condition) throw new Error(message); };
const own = (object, name) => Object.prototype.hasOwnProperty.call(object, name);
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value)
  && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
function keys(value, required, label) {
  requireThat(isRecord(value), `${label}: expected record`);
  requireThat(equal(Object.keys(value).sort(), [...required].sort()), `${label}: invalid fields`);
}
function natural(value) {
  requireThat(typeof value === 'string' && value.length <= 1000 && /^(0|[1-9][0-9]*)$/.test(value), 'noncanonical or oversized natural');
  return BigInt(value);
}
function index(value, bound, label) {
  requireThat(Number.isSafeInteger(value) && value >= 0 && value < bound, `${label}: index out of range`);
  return value;
}
function registers(values) {
  requireThat(Array.isArray(values) && values.length > 0 && values.length <= 64, 'invalid register count');
  for (const value of values) natural(value);
}
function programCheck(program, count) {
  requireThat(Array.isArray(program) && program.length > 0 && program.length <= 10000, 'invalid program length');
  for (const instruction of program) {
    requireThat(isRecord(instruction), 'invalid instruction');
    switch (instruction.op) {
      case 'zero': case 'succ':
        keys(instruction, ['op', 'register'], 'instruction');
        index(instruction.register, count, 'register'); break;
      case 'copy':
        keys(instruction, ['op', 'from', 'to'], 'instruction');
        index(instruction.from, count, 'source register'); index(instruction.to, count, 'target register'); break;
      case 'jeq':
        keys(instruction, ['op', 'left', 'right', 'target'], 'instruction');
        index(instruction.left, count, 'left register'); index(instruction.right, count, 'right register');
        index(instruction.target, program.length, 'jump target'); break;
      case 'halt': keys(instruction, ['op'], 'instruction'); break;
      default: throw new Error('unknown instruction');
    }
  }
}
function stateCheck(state, program, count) {
  keys(state, ['pc', 'registers'], 'state');
  index(state.pc, program.length, 'program counter'); registers(state.registers);
  requireThat(state.registers.length === count, 'changed register count');
}

export function additionProgram() {
  return [
    { op: 'zero', register: 2 },
    { op: 'jeq', left: 2, right: 1, target: 5 },
    { op: 'succ', register: 0 },
    { op: 'succ', register: 2 },
    { op: 'jeq', left: 2, right: 2, target: 1 },
    { op: 'halt' },
  ];
}

/** The executor produces all states, including the final state at HALT. */
export function runRegisterMachine(program, initial, outputRegister = 0, { maxSteps = 10000 } = {}) {
  registers(initial); programCheck(program, initial.length); index(outputRegister, initial.length, 'output register');
  requireThat(Number.isSafeInteger(maxSteps) && maxSteps >= 0 && maxSteps <= 100000, 'invalid step limit');
  let pc = 0;
  const working = initial.map(natural), states = [{ pc, registers: [...initial] }];
  let status;
  for (let step = 0; ; ++step) {
    index(pc, program.length, 'program counter');
    const command = program[pc];
    if (command.op === 'halt') { status = 'halted'; break; }
    if (step === maxSteps) { status = 'step-limit'; break; }
    switch (command.op) {
      case 'zero': working[command.register] = 0n; ++pc; break;
      case 'succ': working[command.register] += 1n; ++pc; break;
      case 'copy': working[command.to] = working[command.from]; ++pc; break;
      case 'jeq': pc = working[command.left] === working[command.right] ? command.target : pc + 1; break;
    }
    const values = working.map(String);
    registers(values); index(pc, program.length, 'program counter');
    states.push({ pc, registers: values });
  }
  return { schema: 'f-model/register-trace/1', program: copy(program), initial: [...initial], outputRegister,
    states, status, output: String(working[outputRegister]) };
}

/** Independent local transition equations; does not call the executor. */
export function verifyRegisterTrace(trace, expected = {}) {
  keys(trace, ['schema', 'program', 'initial', 'outputRegister', 'states', 'status', 'output'], 'register trace');
  requireThat(trace.schema === 'f-model/register-trace/1', 'unknown register schema');
  registers(trace.initial); programCheck(trace.program, trace.initial.length);
  index(trace.outputRegister, trace.initial.length, 'output register'); natural(trace.output);
  requireThat(isRecord(expected), 'invalid expected claim');
  for (const key of Object.keys(expected)) {
    requireThat(['program', 'initial', 'outputRegister', 'output'].includes(key), 'unknown expected claim');
    requireThat(equal(trace[key], expected[key]), `mismatched expected ${key}`);
  }
  requireThat(trace.status === 'halted', 'trace does not certify termination');
  requireThat(Array.isArray(trace.states) && trace.states.length > 0 && trace.states.length <= 100001, 'invalid state count');
  for (const state of trace.states) stateCheck(state, trace.program, trace.initial.length);
  requireThat(trace.states[0].pc === 0 && equal(trace.states[0].registers, trace.initial), 'wrong initial state');
  for (let i = 0; i + 1 < trace.states.length; ++i) {
    const before = trace.states[i], after = trace.states[i + 1], ins = trace.program[before.pc];
    requireThat(ins.op !== 'halt', 'transition after HALT');
    const isJump = ins.op === 'jeq' && before.registers[ins.left] === before.registers[ins.right];
    requireThat(after.pc === (isJump ? ins.target : before.pc + 1), `wrong program counter at step ${i}`);
    for (let r = 0; r < before.registers.length; ++r) {
      let value = before.registers[r];
      if (ins.op === 'zero' && r === ins.register) value = '0';
      if (ins.op === 'succ' && r === ins.register) value = String(natural(value) + 1n);
      if (ins.op === 'copy' && r === ins.to) value = before.registers[ins.from];
      requireThat(after.registers[r] === value, `wrong register ${r} at step ${i}`);
    }
  }
  const final = trace.states.at(-1);
  requireThat(trace.program[final.pc].op === 'halt', 'last state is not HALT');
  requireThat(trace.output === final.registers[trace.outputRegister], 'wrong decoded output');
  return { ok: true, transitions: trace.states.length - 1, output: trace.output };
}

const atom = name => ['atom', name], zero = () => ['zero'], neg = x => ['neg', x];
const add = (a, b) => ['add', a, b], arrow = name => ['arrow', name], id = name => ['id', name];
const compose = (a, b) => ['compose', a, b];
function nameCheck(name) {
  requireThat(typeof name === 'string' && /^[A-Za-z][A-Za-z0-9_]{0,63}$/.test(name), 'invalid symbolic name');
}
function contextCheck(theory, context) {
  if (theory === 'additive-group') {
    keys(context, ['atoms'], 'group context');
    requireThat(Array.isArray(context.atoms) && context.atoms.length <= 100, 'invalid atom list');
    context.atoms.forEach(nameCheck);
    requireThat(new Set(context.atoms).size === context.atoms.length, 'duplicate atom');
  } else if (theory === 'arrows') {
    keys(context, ['identities', 'arrows'], 'arrow context');
    requireThat(Array.isArray(context.identities) && context.identities.length > 0 && context.identities.length <= 100, 'invalid identity list');
    context.identities.forEach(nameCheck);
    requireThat(new Set(context.identities).size === context.identities.length, 'duplicate identity');
    requireThat(isRecord(context.arrows) && Object.keys(context.arrows).length <= 100, 'invalid arrow declarations');
    for (const [name, bounds] of Object.entries(context.arrows)) {
      nameCheck(name); keys(bounds, ['source', 'target'], 'arrow boundary');
      requireThat(!context.identities.includes(name), 'identity and arrow names overlap');
      requireThat(context.identities.includes(bounds.source) && context.identities.includes(bounds.target), 'undeclared boundary identity');
    }
  } else throw new Error('unsupported equational theory');
}
function termCheck(term, theory, context) {
  let visited = 0;
  function visit(t, depth) {
    requireThat(++visited <= 10000 && depth <= 64, 'term resource limit');
    requireThat(Array.isArray(t) && typeof t[0] === 'string', 'invalid term');
    if (theory === 'additive-group') {
      if (t[0] === 'atom') { requireThat(t.length === 2 && context.atoms.includes(t[1]), 'undeclared group atom'); return null; }
      if (t[0] === 'zero') { requireThat(t.length === 1, 'invalid zero term'); return null; }
      if (t[0] === 'neg') { requireThat(t.length === 2, 'invalid inverse term'); visit(t[1], depth + 1); return null; }
      requireThat(t[0] === 'add' && t.length === 3, 'invalid group term');
      visit(t[1], depth + 1); visit(t[2], depth + 1); return null;
    }
    if (t[0] === 'id') {
      requireThat(t.length === 2 && context.identities.includes(t[1]), 'undeclared identity');
      return { source: t[1], target: t[1] };
    }
    if (t[0] === 'arrow') {
      requireThat(t.length === 2 && typeof t[1] === 'string' && own(context.arrows, t[1]), 'undeclared arrow');
      return context.arrows[t[1]];
    }
    requireThat(t[0] === 'compose' && t.length === 3, 'invalid arrow term');
    const left = visit(t[1], depth + 1), right = visit(t[2], depth + 1);
    requireThat(right.target === left.source, 'noncomposable arrows');
    return { source: right.source, target: left.target };
  }
  return visit(term, 0);
}
function sameBoundary(a, b) {
  return a === null ? b === null : b !== null && a.source === b.source && a.target === b.target;
}
function equationCheck(equation, theory, context) {
  keys(equation, ['lhs', 'rhs'], 'equation');
  const a = termCheck(equation.lhs, theory, context), b = termCheck(equation.rhs, theory, context);
  requireThat(sameBoundary(a, b), 'equation boundary mismatch');
}
function childrenCount(term) {
  return term[0] === 'neg' ? 1 : ['add', 'compose'].includes(term[0]) ? 2 : 0;
}
function rewriteAt(term, position, from, to) {
  requireThat(Array.isArray(position) && position.length <= 64, 'invalid rewrite position');
  function visit(t, offset) {
    if (offset === position.length) { requireThat(equal(t, from), 'rule does not match chosen subterm'); return copy(to); }
    const child = index(position[offset], childrenCount(t), 'rewrite child');
    const result = copy(t); result[child + 1] = visit(t[child + 1], offset + 1); return result;
  }
  return visit(term, 0);
}
function ruleEquation(step, proof) {
  const { rule, substitution: s } = step;
  requireThat(typeof rule === 'string', 'invalid rule name');
  if (rule.startsWith('assumption:')) {
    keys(s, [], 'assumption substitution');
    const name = rule.slice('assumption:'.length);
    requireThat(own(proof.assumptions, name), 'undeclared assumption');
    return proof.assumptions[name];
  }
  const groupRules = { add_assoc: ['a', 'b', 'c'], add_inverse: ['a'], add_zero: ['a'] };
  const arrowRules = { comp_assoc: ['a', 'b', 'c'], right_unit: ['a'], left_unit: ['a'] };
  const table = proof.theory === 'additive-group' ? groupRules : arrowRules;
  requireThat(own(table, rule), 'unknown rule for theory'); keys(s, table[rule], 'rule substitution');
  for (const term of Object.values(s)) termCheck(term, proof.theory, proof.context);
  switch (rule) {
    case 'add_assoc': return { lhs: add(add(s.a, s.b), s.c), rhs: add(s.a, add(s.b, s.c)) };
    case 'add_inverse': return { lhs: add(s.a, neg(s.a)), rhs: zero() };
    case 'add_zero': return { lhs: add(s.a, zero()), rhs: s.a };
    case 'comp_assoc': return { lhs: compose(compose(s.a, s.b), s.c), rhs: compose(s.a, compose(s.b, s.c)) };
    case 'right_unit': return { lhs: compose(s.a, id(termCheck(s.a, proof.theory, proof.context).source)), rhs: s.a };
    case 'left_unit': return { lhs: compose(id(termCheck(s.a, proof.theory, proof.context).target), s.a), rhs: s.a };
  }
}

/** Fixed law schemes; assumptions are explicit premises, never new axioms. */
export function verifySymbolicProof(proof) {
  keys(proof, ['schema', 'theory', 'context', 'assumptions', 'claim', 'steps'], 'symbolic proof');
  requireThat(proof.schema === 'f-model/equational-trace/1', 'unknown symbolic schema');
  contextCheck(proof.theory, proof.context);
  requireThat(isRecord(proof.assumptions) && Object.keys(proof.assumptions).length <= 100, 'invalid assumptions');
  for (const [name, equation] of Object.entries(proof.assumptions)) { nameCheck(name); equationCheck(equation, proof.theory, proof.context); }
  equationCheck(proof.claim, proof.theory, proof.context);
  requireThat(Array.isArray(proof.steps) && proof.steps.length <= 1000, 'invalid proof length');
  let current = proof.claim.lhs;
  for (const step of proof.steps) {
    keys(step, ['rule', 'substitution', 'direction', 'position', 'before', 'after'], 'proof step');
    requireThat(step.direction === 'forward' || step.direction === 'backward', 'invalid rewrite direction');
    termCheck(step.before, proof.theory, proof.context); termCheck(step.after, proof.theory, proof.context);
    requireThat(equal(current, step.before), 'disconnected proof step');
    const equation = ruleEquation(step, proof); equationCheck(equation, proof.theory, proof.context);
    const [from, to] = step.direction === 'forward' ? [equation.lhs, equation.rhs] : [equation.rhs, equation.lhs];
    const rebuilt = rewriteAt(current, step.position, from, to);
    requireThat(equal(rebuilt, step.after), 'wrong rewritten term'); current = step.after;
  }
  requireThat(equal(current, proof.claim.rhs), 'proof does not reach its claimed target');
  return { ok: true, theory: proof.theory, steps: proof.steps.length, premises: Object.keys(proof.assumptions),
    scope: 'Derivation conditional on the fixed laws of the declared structure and the displayed premises.' };
}

function cancellationProof() {
  const c = atom('c'), u = atom('u'), start = add(add(c, u), neg(u)), middle = add(c, add(u, neg(u))), last = add(c, zero());
  return { schema: 'f-model/equational-trace/1', theory: 'additive-group', context: { atoms: ['c', 'u'] }, assumptions: {},
    claim: { lhs: start, rhs: c }, steps: [
      { rule: 'add_assoc', substitution: { a: c, b: u, c: neg(u) }, direction: 'forward', position: [], before: start, after: middle },
      { rule: 'add_inverse', substitution: { a: u }, direction: 'forward', position: [1], before: middle, after: last },
      { rule: 'add_zero', substitution: { a: c }, direction: 'forward', position: [], before: last, after: c },
    ] };
}
function inverseProof() {
  const f = arrow('f'), g = arrow('g'), h = arrow('h'), A = id('eA'), B = id('eB');
  const t1 = compose(g, B), t2 = compose(g, compose(f, h)), t3 = compose(compose(g, f), h), t4 = compose(A, h);
  return { schema: 'f-model/equational-trace/1', theory: 'arrows',
    context: { identities: ['eA', 'eB'], arrows: { f: { source: 'eA', target: 'eB' }, g: { source: 'eB', target: 'eA' }, h: { source: 'eB', target: 'eA' } } },
    assumptions: { gf_id: { lhs: compose(g, f), rhs: A }, fh_id: { lhs: compose(f, h), rhs: B } },
    claim: { lhs: g, rhs: h }, steps: [
      { rule: 'right_unit', substitution: { a: g }, direction: 'backward', position: [], before: g, after: t1 },
      { rule: 'assumption:fh_id', substitution: {}, direction: 'backward', position: [1], before: t1, after: t2 },
      { rule: 'comp_assoc', substitution: { a: g, b: f, c: h }, direction: 'backward', position: [], before: t2, after: t3 },
      { rule: 'assumption:gf_id', substitution: {}, direction: 'forward', position: [0], before: t3, after: t4 },
      { rule: 'left_unit', substitution: { a: h }, direction: 'forward', position: [], before: t4, after: h },
    ] };
}
const registerClaims = () => [
  { id: 'register-add-2-3', initial: ['2', '3', '0'], output: '5' },
  { id: 'register-add-7-0', initial: ['7', '0', '91'], output: '7' },
  { id: 'register-add-large-2', initial: ['9007199254740993', '2', '0'], output: '9007199254740995' },
];
export function buildModelExtensionBundle() {
  return { schema: 'f-model/extensions/1',
    registerTraces: registerClaims().map(claim => ({ id: claim.id, certificate: runRegisterMachine(additionProgram(), claim.initial) })),
    symbolicProofs: [ { id: 'group-cancellation', certificate: cancellationProof() }, { id: 'arrow-inverse-uniqueness', certificate: inverseProof() } ] };
}

export function verifyModelExtensionBundle(bundle) {
  keys(bundle, ['schema', 'registerTraces', 'symbolicProofs'], 'model bundle');
  requireThat(bundle.schema === 'f-model/extensions/1', 'unknown bundle schema');
  const claims = registerClaims();
  requireThat(Array.isArray(bundle.registerTraces) && bundle.registerTraces.length === claims.length, 'wrong register claim count');
  const registerResults = bundle.registerTraces.map((item, i) => {
    keys(item, ['id', 'certificate'], 'register bundle entry'); requireThat(item.id === claims[i].id, 'wrong register claim identifier');
    return { id: item.id, ...verifyRegisterTrace(item.certificate, { program: additionProgram(), initial: claims[i].initial, outputRegister: 0, output: claims[i].output }) };
  });
  const expected = [{ id: 'group-cancellation', certificate: cancellationProof() }, { id: 'arrow-inverse-uniqueness', certificate: inverseProof() }];
  requireThat(Array.isArray(bundle.symbolicProofs) && bundle.symbolicProofs.length === expected.length, 'wrong symbolic claim count');
  const symbolicResults = bundle.symbolicProofs.map((item, i) => {
    keys(item, ['id', 'certificate'], 'symbolic bundle entry'); requireThat(item.id === expected[i].id, 'wrong symbolic claim identifier');
    for (const field of ['theory', 'context', 'assumptions', 'claim']) requireThat(equal(item.certificate[field], expected[i].certificate[field]), `changed symbolic ${field}`);
    return { id: item.id, ...verifySymbolicProof(item.certificate) };
  });
  return { schema: 'f-model/extensions-report/1', ok: true, registerTraces: registerResults, symbolicProofs: symbolicResults,
    scope: 'Finite register traces and two derivations conditional on the stated algebraic laws. No general compiler-correctness theorem is machine-verified.' };
}
