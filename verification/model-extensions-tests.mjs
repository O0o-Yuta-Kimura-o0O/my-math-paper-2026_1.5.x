import test from 'node:test';
import assert from 'node:assert/strict';
import { encodeJSON, decodeJSON } from './concept-codec.mjs';
import {
  additionProgram, runRegisterMachine, verifyRegisterTrace, verifySymbolicProof,
  buildModelExtensionBundle, verifyModelExtensionBundle,
} from './model-extensions.mjs';

const copy = value => JSON.parse(JSON.stringify(value));
const bundle = () => buildModelExtensionBundle();
const addTrace = () => runRegisterMachine(additionProgram(), ['2', '3', '0']);
const group = () => bundle().symbolicProofs[0].certificate;
const arrows = () => bundle().symbolicProofs[1].certificate;

test('stored bundle replays 3 register computations and 3/5-step conditional proofs', () => {
  const report = verifyModelExtensionBundle(copy(bundle()));
  assert.equal(report.ok, true);
  assert.deepEqual(report.registerTraces.map(x => x.output), ['5', '7', '9007199254740995']);
  assert.deepEqual(report.symbolicProofs.map(x => x.steps), [3, 5]);
  assert.equal(report.registerTraces[0].transitions, 14);
  // The common concept codec sorts JSON object fields. Field order is not a claim.
  assert.equal(verifyModelExtensionBundle(decodeJSON(encodeJSON(bundle()))).ok, true);
});

test('addition program works for two varying input registers and resets its scratch register', () => {
  for (let m = 0n; m <= 7n; ++m) for (let n = 0n; n <= 7n; ++n) {
    const initial = [String(m), String(n), '314'];
    const trace = runRegisterMachine(additionProgram(), initial);
    const report = verifyRegisterTrace(copy(trace), { program: additionProgram(), initial, outputRegister: 0, output: String(m + n) });
    assert.equal(report.transitions, 4 * Number(n) + 2);
    assert.equal(trace.states.at(-1).registers[1], String(n));
    assert.equal(trace.states.at(-1).registers[2], String(n));
  }
});

test('all five instructions obey local equations including copy aliasing and unequal branch', () => {
  const program = [{op:'copy',from:0,to:1},{op:'copy',from:1,to:1},{op:'succ',register:1},
    {op:'jeq',left:0,right:1,target:5},{op:'zero',register:0},{op:'halt'}];
  const trace = runRegisterMachine(program, ['41', '0']);
  assert.equal(verifyRegisterTrace(trace).output, '0');
  assert.deepEqual(trace.states.at(-1).registers, ['0', '42']);
  const copied = copy(trace); copied.states[1].registers[0] = '42';
  assert.throws(() => verifyRegisterTrace(copied));
});

test('canonical decimal natural strings prevent rounding and alternate encodings', () => {
  const program = [{op:'succ',register:0},{op:'halt'}], value = '9'.repeat(100);
  assert.equal(verifyRegisterTrace(runRegisterMachine(program, [value])).output, '1' + '0'.repeat(100));
  for (const bad of [0, 2n, '-1', '-0', '+1', '01', '1.0', '1e3', ' 1', '', '9'.repeat(1001)]) {
    assert.throws(() => runRegisterMachine(program, [bad]));
    const trace = addTrace(); trace.states[1].registers[0] = bad;
    assert.throws(() => verifyRegisterTrace(trace));
  }
});

test('invalid program schemas, register indices, and jump targets reject', () => {
  for (const bad of [[], [{op:'unknown'}], [{op:'halt',accepted:true}], [{op:'zero',register:-1}],
    [{op:'copy',from:0,to:3}], [{op:'succ',register:0.5}], [{op:'jeq',left:0,right:0,target:1}],
    [{op:'jeq',left:0,right:0,target:'0'}]]) assert.throws(() => runRegisterMachine(bad, ['0']));
  for (const initial of [[], Array(65).fill('0')]) assert.throws(() => runRegisterMachine([{op:'halt'}], initial));
  assert.throws(() => runRegisterMachine([{op:'halt'}], ['0'], 1));
});

test('all-state replay rejects changed register, branch, input, output, and extra fields', () => {
  for (const edit of [t => t.states[2].registers[1] = '4', t => t.states[2].pc = 5,
    t => t.initial[0] = '3', t => t.output = '6', t => t.outputRegister = 1,
    t => t.states[3].registers.push('0'), t => t.states[2].accepted = true,
    t => t.program[1].target = 4, t => t.states.splice(3, 1)]) {
    const trace = addTrace(); edit(trace); assert.throws(() => verifyRegisterTrace(trace));
  }
});

test('expected claims bind program, input, output register, and output separately', () => {
  const trace = addTrace();
  for (const expected of [{initial:['3','2','0']},{program:[{op:'halt'}]},{output:'6'},
    {outputRegister:1},{unknown:true}]) assert.throws(() => verifyRegisterTrace(trace, expected));
  const changed = bundle();
  changed.registerTraces[0].certificate = runRegisterMachine(additionProgram(), ['1', '4', '0']);
  assert.throws(() => verifyModelExtensionBundle(changed));
});

test('finite prefixes and nonhalting loops never certify a normal result', () => {
  const prefix = runRegisterMachine(additionProgram(), ['2','3','0'], 0, {maxSteps:3});
  assert.equal(prefix.status, 'step-limit'); assert.throws(() => verifyRegisterTrace(prefix));
  prefix.status = 'halted'; assert.throws(() => verifyRegisterTrace(prefix));
  const loop = runRegisterMachine([{op:'jeq',left:0,right:0,target:0}], ['0'], 0, {maxSteps:2});
  assert.equal(loop.states.length, 3); assert.throws(() => verifyRegisterTrace(loop));
  const tail = addTrace(); tail.states.push(copy(tail.states.at(-1))); assert.throws(() => verifyRegisterTrace(tail));
  assert.throws(() => runRegisterMachine([{op:'succ',register:0}], ['0']));
  for (const maxSteps of [-1, 1.5, 100001]) assert.throws(() => runRegisterMachine(additionProgram(), ['0','0','0'], 0, {maxSteps}));
  assert.equal(verifyRegisterTrace(runRegisterMachine([{op:'halt'}], ['7'], 0, {maxSteps:0})).transitions, 0);
});

test('three-step cancellation checks a group derivation with symbolic inputs', () => {
  assert.deepEqual(verifySymbolicProof(group()).premises, []);
  const proof = group(); proof.context.atoms.push('v');
  proof.claim.lhs[1][2] = ['atom','v'];
  assert.throws(() => verifySymbolicProof(proof));
});

test('rewrite records reject unknown laws, wrong substitutions, direction, and position', () => {
  for (const edit of [p => p.steps[0].rule = 'add_comm', p => p.steps[0].substitution.a = ['atom','u'],
    p => p.steps[0].substitution.extra = ['atom','c'], p => p.steps[0].direction = 'backward',
    p => p.steps[1].position = [0], p => p.steps[1].position = ['1'],
    p => p.steps[1].position = [1,2], p => p.steps[0].after = copy(p.steps[0].before),
    p => p.steps[0].direction = 'accepted', p => p.steps[0].substitution = null]) {
    const proof = group(); edit(proof); assert.throws(() => verifySymbolicProof(proof));
  }
});

test('proof targets, step chaining, and declared atoms cannot be changed silently', () => {
  for (const edit of [p => p.claim.rhs = ['atom','u'], p => p.steps.splice(1,1), p => p.context.atoms = ['c'],
    p => p.steps[2].before = ['atom','u'], p => p.claim.lhs = ['zero',0],
    p => p.claim.lhs = ['add',['zero']], p => p.steps = [], p => p.context.atoms = ['c','u','u']]) {
    const proof = group(); edit(proof); assert.throws(() => verifySymbolicProof(proof));
  }
});

test('five-step inverse uniqueness uses exactly the declared left and right inverse premises', () => {
  const report = verifySymbolicProof(arrows());
  assert.equal(report.steps, 5); assert.deepEqual(report.premises, ['gf_id','fh_id']);
  for (const edit of [p => delete p.assumptions.fh_id, p => p.steps[1].rule = 'assumption:gf_id',
    p => p.steps[1].substitution.a = ['arrow','g'], p => p.assumptions.gf_id.rhs = ['id','eB'],
    p => p.steps[2].substitution.a = ['arrow','h']]) {
    const proof = arrows(); edit(proof); assert.throws(() => verifySymbolicProof(proof));
  }
});

test('arrow boundaries, identity endpoints, and composability are recomputed', () => {
  for (const edit of [p => p.context.arrows.f.source = 'eB', p => p.context.arrows.g.target = 'eB',
    p => p.context.arrows.h.source = 'undeclared', p => p.context.identities.push('eA'),
    p => p.context.arrows.eA = {source:'eA',target:'eA'}, p => p.steps[0].substitution.a = ['arrow','unknown'],
    p => p.assumptions.gf_id.lhs = ['compose',['arrow','g'],['arrow','g']]]) {
    const proof = arrows(); edit(proof); assert.throws(() => verifySymbolicProof(proof));
  }
});

test('bundle pins theory, assumptions, boundaries, and exact claims despite valid conditional derivations', () => {
  for (const edit of [b => b.symbolicProofs[0].certificate.assumptions.extra = {lhs:['zero'],rhs:['zero']},
    b => b.symbolicProofs[0].certificate.theory = 'arrows', b => b.symbolicProofs[0].id = 'other',
    b => b.symbolicProofs.pop(), b => b.registerTraces.pop(), b => b.registerTraces[1] = copy(b.registerTraces[0]),
    b => b.schema = 'untrusted', b => b.accepted = true]) {
    const value = bundle(); edit(value); assert.throws(() => verifyModelExtensionBundle(value));
  }
});
