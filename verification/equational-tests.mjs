import assert from 'node:assert/strict';
import fs from 'node:fs';
import {checkBundle, parseTerm} from './equational-checker.mjs';
const original = JSON.parse(fs.readFileSync(new URL('./certificates/nat-and-paths.json', import.meta.url), 'utf8'));
let count = 0;
function test(name, fn) { fn(); count++; console.log(`ok ${count} - ${name}`); }
function changed(edit) { const b = structuredClone(original); edit(b); return b; }
test('sixteen universal equations, including multiplication associativity and path composition', () => {
  const r = checkBundle(original);
  assert.equal(r.theoremCount, 16);
  assert(r.rewriteSteps > 60);
});
test('a false conclusion is rejected', () => assert.throws(() => checkBundle(changed(b => b.theorems[0].equation[1] = 'S(n)'))));
test('a supplied unproved lemma cannot justify a step', () => assert.throws(() => checkBundle(changed(b => b.theorems[0].proof.step.left[1].rule = 'invented.theorem'))));
test('induction hypothesis cannot be used in the base case', () => assert.throws(() => checkBundle(changed(b => b.theorems[0].proof.base.left[0].rule = 'IH'))));
test('induction predecessor must be fresh', () => assert.throws(() => checkBundle(changed(b => b.theorems[0].proof.fresh.predecessor = 'n'))));
test('the hypothesis is not generalized to arbitrary arguments', () => assert.throws(() => checkBundle(changed(b => {
  b.theorems[0].proof.step.left = [{rule: 'IH', path: []}];
}))));
test('wrong rewrite location is rejected', () => assert.throws(() => checkBundle(changed(b => b.theorems[0].proof.step.left[1].path = [1]))));
test('sort mismatch is rejected', () => assert.throws(() => checkBundle(changed(b => b.theorems[0].variables.n = 'Seq'))));
test('a theorem cannot replace a primitive rule', () => assert.throws(() => checkBundle(changed(b => b.theorems[0].id = 'add.zero'))));
test('a deleted proof step is detected', () => assert.throws(() => checkBundle(changed(b => b.theorems[0].proof.step.left.pop()))));
test('malformed term and trailing text are rejected', () => {
  assert.throws(() => parseTerm('Add(x,Z) garbage', {x: 'Nat'}));
  assert.throws(() => parseTerm('Add(x,Nil)', {x: 'Nat'}));
  assert.throws(() => parseTerm('S(Z,Z)', {}));
});
test('induction on an arbitrary event is not permitted', () => assert.throws(() => checkBundle({
  format: original.format, theorems: [{id: 'bad', variables: {e: 'Event'}, equation: ['e', 'e'],
    proof: {kind: 'induction', on: 'e', fresh: {predecessor: 'k'}}}]})));
console.log(`${count} equational checker tests passed`);
