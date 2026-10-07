// Reproducible, explicit finite proof data. This script does not certify itself;
// equational-checker.mjs checks every rewrite and induction case afterwards.
import fs from 'node:fs';
const R = (rule, path = [], direction = 'forward') => ({rule, path, ...(direction === 'backward' ? {direction} : {})});
const J = (left = [], right = []) => ({kind: 'join', left, right});
const I = (on, base, step, fresh = {predecessor: 'k'}) => ({kind: 'induction', on, fresh, base, step});
const T = (id, variables, lhs, rhs, proof) => ({id, variables, equation: [lhs, rhs], proof});
const N = (...names) => Object.fromEntries(names.map(n => [n, 'Nat']));
const Q = (...names) => Object.fromEntries(names.map(n => [n, 'Seq']));
const theorems = [
  T('nat.add.leftzero', N('n'), 'Add(Z,n)', 'n', I('n',
    J([R('add.zero')]),
    J([R('add.succ'), R('IH', [0])]))),
  T('nat.add.leftsucc', N('x', 'y'), 'Add(S(x),y)', 'S(Add(x,y))', I('y',
    J([R('add.zero')], [R('add.zero', [0])]),
    J([R('add.succ'), R('IH', [0])], [R('add.succ', [0])]))),
  T('nat.add.commutative', N('x', 'y'), 'Add(x,y)', 'Add(y,x)', I('y',
    J([R('add.zero')], [R('nat.add.leftzero')]),
    J([R('add.succ'), R('IH', [0])], [R('nat.add.leftsucc')]))),
  T('nat.add.associative', N('x', 'y', 'z'), 'Add(Add(x,y),z)', 'Add(x,Add(y,z))', I('z',
    J([R('add.zero')], [R('add.zero', [1])]),
    J([R('add.succ'), R('IH', [0])], [R('add.succ', [1]), R('add.succ')]))),
  T('nat.add.interchange', N('a', 'b', 'c', 'd'),
    'Add(Add(a,b),Add(c,d))', 'Add(Add(a,c),Add(b,d))',
    J([R('nat.add.associative'), R('nat.add.associative', [1], 'backward'),
      R('nat.add.commutative', [1, 0]), R('nat.add.associative', [1]),
      R('nat.add.associative', [], 'backward')])),
  T('nat.mul.leftzero', N('n'), 'Mul(Z,n)', 'Z', I('n',
    J([R('mul.zero')]),
    J([R('mul.succ'), R('IH', [0]), R('add.zero')]))),
  T('nat.mul.rightone', N('x'), 'Mul(x,S(Z))', 'x',
    J([R('mul.succ'), R('mul.zero', [0]), R('nat.add.leftzero')])),
  T('nat.mul.leftsucc', N('x', 'y'), 'Mul(S(x),y)', 'Add(Mul(x,y),y)', I('y',
    J([R('mul.zero')], [R('add.zero'), R('mul.zero')]),
    J([R('mul.succ'), R('IH', [0]), R('add.succ'),
      R('nat.add.associative', [0]), R('nat.add.commutative', [0, 1]),
      R('nat.add.associative', [0], 'backward')],
      [R('add.succ'), R('mul.succ', [0, 0])]))),
  T('nat.mul.commutative', N('x', 'y'), 'Mul(x,y)', 'Mul(y,x)', I('y',
    J([R('mul.zero')], [R('nat.mul.leftzero')]),
    J([R('mul.succ'), R('IH', [0])], [R('nat.mul.leftsucc')]))),
  T('nat.mul.leftone', N('x'), 'Mul(S(Z),x)', 'x',
    J([R('nat.mul.commutative'), R('nat.mul.rightone')])),
  T('nat.mul.distributive.first', N('x', 'y', 'z'),
    'Mul(Add(x,y),z)', 'Add(Mul(x,z),Mul(y,z))', I('z',
      J([R('mul.zero')], [R('mul.zero', [0]), R('mul.zero', [1]), R('add.zero')]),
      J([R('mul.succ'), R('IH', [0]), R('nat.add.interchange')],
        [R('mul.succ', [0]), R('mul.succ', [1])]))),
  T('nat.mul.distributive.second', N('x', 'y', 'z'),
    'Mul(x,Add(y,z))', 'Add(Mul(x,y),Mul(x,z))',
    J([R('nat.mul.commutative'), R('nat.mul.distributive.first'),
      R('nat.mul.commutative', [0]), R('nat.mul.commutative', [1])])),
  T('nat.mul.associative', N('x', 'y', 'z'),
    'Mul(Mul(x,y),z)', 'Mul(x,Mul(y,z))', I('z',
      J([R('mul.zero')], [R('mul.zero', [1]), R('mul.zero')]),
      J([R('mul.succ'), R('IH', [0])],
        [R('mul.succ', [1]), R('nat.mul.distributive.second')]))),
  T('path.append.leftunit', Q('u'), 'Append(Nil,u)', 'u', J([R('append.nil')])),
  T('path.append.rightunit', Q('u'), 'Append(u,Nil)', 'u', I('u',
    J([R('append.nil')]), J([R('append.cons'), R('IH', [1])]), {head: 'h', tail: 't'})),
  T('path.append.associative', Q('u', 'v', 'w'),
    'Append(Append(u,v),w)', 'Append(u,Append(v,w))', I('u',
      J([R('append.nil', [0])], [R('append.nil')]),
      J([R('append.cons', [0]), R('append.cons'), R('IH', [1])], [R('append.cons')]),
      {head: 'h', tail: 't'})),
];
const bundle = {format: 'finite-equational-proof/1', version: '1.5.0',
  description: 'Universal equations, with explicit structural-induction cases. No enumeration of numerals is used as a universal proof.', theorems};
fs.writeFileSync(new URL('./certificates/nat-and-paths.json', import.meta.url), JSON.stringify(bundle, null, 2) + '\n');
console.log(`Wrote ${theorems.length} explicit proof certificates`);
