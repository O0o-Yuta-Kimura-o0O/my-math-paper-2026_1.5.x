/** Finite behavioral/rejection tests for the optional browser lab. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {runCalculus,runSeries,runGeometry,verifyCertificate,formatField,formatRational} from '../docs/lab/v1.5.8.0/core.mjs';
const clone=x=>JSON.parse(JSON.stringify(x));
const quadratic=()=>runCalculus({numerator:'0,0,1',denominator:'1',point:'3'});
const geometric=()=>runSeries({numerator:'1',denominator:'1,-1',order:2});
const orientation=()=>runGeometry({a:['0','0'],b:['1','0'],c:['2','0'],direction:1,order:1});
const ok=result=>{assert.equal(verifyCertificate(result.certificate).ok,true);return result;};
const rejected=certificate=>assert.equal(verifyCertificate(certificate).ok,false);

test('quadratic difference quotient, standard part and exact residual have independent hand values',()=>{
 const r=ok(quadratic());
 assert.deepEqual(r.shifted,{numerator:['9/1','6/1','1/1'],denominator:['1/1']});
 assert.equal(r.atPoint,'9/1');assert.deepEqual(r.quotient,{numerator:['6/1','1/1'],denominator:['1/1']});
 assert.equal(r.standardPart,'6/1');assert.deepEqual(r.residual,{numerator:['0/1','1/1'],denominator:['1/1']});assert.equal(r.residualOrder,1);
});
test('cubic difference quotient retains both higher orders',()=>{
 const r=ok(runCalculus({numerator:'0,0,0,1',denominator:'1',point:'2'}));
 assert.deepEqual(r.quotient,{numerator:['12/1','6/1','1/1'],denominator:['1/1']});assert.equal(r.standardPart,'12/1');
});
test('reciprocal at a nonzero point produces the rational derivative and exact residual',()=>{
 const r=ok(runCalculus({numerator:'1',denominator:'0,1',point:'2'}));assert.equal(r.atPoint,'1/2');assert.equal(r.standardPart,'-1/4');
 assert.deepEqual(r.quotient,{numerator:['-1/2'],denominator:['2/1','1/1']});assert.equal(r.residualOrder,1);
});
test('zero and constant derivatives use zero without a spurious finite order',()=>{
 for(const numerator of ['0','7/3']){
  const r=ok(runCalculus({numerator,denominator:'1',point:'-2/5'}));assert.equal(r.standardPart,'0/1');assert.equal(r.quotientOrder,null);assert.equal(r.residualOrder,null);
 }
});
test('rational inputs normalize signs while coefficient positions remain explicit',()=>{
 const r=ok(runCalculus({numerator:'0,0,2/-4',denominator:'1',point:'2'}));assert.deepEqual(r.inputs.numerator,['0/1','0/1','-1/2']);assert.equal(r.standardPart,'-2/1');
});
test('point-domain guard rejects both a true pole and an entered removable hole',()=>{
 assert.throws(()=>runCalculus({numerator:'1',denominator:'0,1',point:'0'}),/zero at this point/);
 assert.throws(()=>runCalculus({numerator:'-1,0,1',denominator:'-1,1',point:'1'}),/zero at this point/);
});
test('geometric rational function jet has exact remainder of order three',()=>{
 const r=ok(geometric());assert.deepEqual(r.coefficients,['1/1','1/1','1/1']);assert.equal(r.residualOrder,3);
 assert.deepEqual(r.residual,{numerator:['0/1','0/1','0/1','-1/1'],denominator:['-1/1','1/1']});
});
test('series coefficient recurrence handles a nonunit denominator and cancellation',()=>{
 const r=ok(runSeries({numerator:'2,3',denominator:'1,1',order:4}));assert.deepEqual(r.coefficients,['2/1','1/1','-1/1','1/1','-1/1']);
 const removable=ok(runSeries({numerator:'0,2,1',denominator:'0,1',order:2}));assert.deepEqual(removable.coefficients,['2/1','1/1','0/1']);assert.equal(removable.residualOrder,null);
});
test('series rejects poles, zero denominators and out-of-contract orders',()=>{
 assert.throws(()=>runSeries({numerator:'1',denominator:'0,1',order:2}),/pole/);
 assert.throws(()=>runSeries({numerator:'1',denominator:'0',order:2}),/nonzero/);
 for(const order of [-1,6,1.5,'2'])assert.throws(()=>runSeries({numerator:'1',denominator:'1',order}));
});
test('horizontal degeneracy yields a positive infinitesimal orientation and retains original zero',()=>{
 const r=ok(orientation());assert.equal(r.baseDeterminant,'0/1');assert.equal(r.baseSign,0);assert.equal(r.sign,1);assert.deepEqual(r.normal,['0/1','1/1']);assert.deepEqual(r.determinant,{numerator:['0/1','1/1'],denominator:['1/1']});
});
test('normal perturbation handles a vertical baseline and either direction',()=>{
 for(const direction of [1,-1]){
  const r=ok(runGeometry({a:['0','0'],b:['0','2'],c:['0','3'],direction,order:3}));
  assert.deepEqual(r.normal,['-2/1','0/1']);assert.equal(r.sign,direction);assert.equal(r.determinant.numerator[3],`${4*direction}/1`);
 }
});
test('a nonzero rational orientation is preserved despite opposite infinitesimal perturbation',()=>{
 const p=ok(runGeometry({a:['0','0'],b:['1','0'],c:['1','2'],direction:-1,order:1}));assert.equal(p.baseSign,1);assert.equal(p.sign,1);
 const n=ok(runGeometry({a:['0','0'],b:['1','0'],c:['1','-2'],direction:1,order:1}));assert.equal(n.baseSign,-1);assert.equal(n.sign,-1);
});
test('coincident baseline points and malformed geometry parameters reject',()=>{
 assert.throws(()=>runGeometry({a:['1/2','3'],b:['1/2','3'],c:['0','0'],direction:1,order:1}),/distinct/);
 for(const direction of [0,2,'1'])assert.throws(()=>runGeometry({a:['0','0'],b:['1','0'],c:['0','0'],direction,order:1}));
 for(const order of [0,6,1.5])assert.throws(()=>runGeometry({a:['0','0'],b:['1','0'],c:['0','0'],direction:1,order}));
});
test('finite input limits reject expressions, floating notation, excessive degree and magnitude',()=>{
 for(const numerator of ['1.5','1e3','x*x','1/0','1000001','2000000/2000000','0,0,0,0,0,0,0,1'])assert.throws(()=>runCalculus({numerator,denominator:'1',point:'0'}));
 assert.throws(()=>runCalculus({numerator:'1',denominator:'1',point:'1000001'}));
});
test('unknown fields, schema variants, operations and versions are not silently ignored',()=>{
 for(const kind of ['calculus','series','geometry']){
  const c=clone(({calculus:quadratic,series:geometric,geometry:orientation})[kind]().certificate);
  const extra=clone(c);extra.extra=true;rejected(extra);
  const inputExtra=clone(c);inputExtra.inputs.unproved=true;rejected(inputExtra);
  const claimExtra=clone(c);claimExtra.claim.assume=true;rejected(claimExtra);
  const unknown=clone(c);unknown.kind='arbitrary-program';rejected(unknown);
  const wrongVersion=clone(c);wrongVersion.format='f-generative-lab/2';rejected(wrongVersion);
 }
});
test('each calculus claim is bound to inputs and its finite arithmetic meaning',()=>{
 const original=quadratic().certificate;
 for(const field of ['shifted','quotient','residual']){const c=clone(original);c.claim[field].numerator=['100/1'];rejected(c);}
 for(const field of ['atPoint','standardPart']){const c=clone(original);c.claim[field]='100/1';rejected(c);}
 for(const field of ['residualOrder','quotientOrder']){const c=clone(original);c.claim[field]=42;rejected(c);}
 const c=clone(original);c.inputs.point='4/1';rejected(c);
 const p=clone(original);p.inputs.denominator=['-3/1','1/1'];rejected(p);
});
test('equivalent unnormalized fractions pass cross-products without trusting normalization',()=>{
 const c=clone(quadratic().certificate);
 // Multiply 6+ε by (1+ε)/(1+ε); no canonical-normal-form oracle is used.
 c.claim.quotient={numerator:['6/1','7/1','1/1'],denominator:['1/1','1/1']};assert.equal(verifyCertificate(c).ok,true);
 const s=clone(geometric().certificate);s.claim.jet={numerator:['2/1','2/1','2/1'],denominator:['2/1']};assert.equal(verifyCertificate(s).ok,true);
});
test('series checker rejects false source, coefficients, residual, bound and pole',()=>{
 const original=geometric().certificate;
 for(const field of ['value','jet','residual']){const c=clone(original);c.claim[field].numerator=['123/1'];rejected(c);}
 const c=clone(original);c.claim.coefficients[1]='2/1';rejected(c);
 const n=clone(original);n.claim.residualOrder=4;rejected(n);
 const pole=clone(original);pole.inputs.denominator=['0/1','1/1'];rejected(pole);
 const shifted=clone(original);shifted.inputs.order=3;rejected(shifted);
 const truncated=clone(original);truncated.claim.coefficients=['1/1','1/1'];rejected(truncated);
});
test('geometry checker binds original configuration, normal, sign and infinitesimal order',()=>{
 const original=orientation().certificate;
 const mutations=[c=>{c.inputs.c[1]='1/1';},c=>{c.inputs.direction=-1;},c=>{c.inputs.order=2;},c=>{c.claim.baseDeterminant='1/1';},c=>{c.claim.baseSign=1;},c=>{c.claim.normal[1]='2/1';},c=>{c.claim.sign=-1;},c=>{c.claim.order=2;},c=>{c.claim.determinant.numerator=['1/1'];}];
 for(const mutate of mutations){const c=clone(original);mutate(c);rejected(c);}
});
test('malformed arithmetic data and excessive certificate work reject cleanly',()=>{
 const c=clone(quadratic().certificate);c.claim.quotient.denominator=[];rejected(c);
 const alternate=clone(quadratic().certificate);alternate.claim.standardPart='12/2';rejected(alternate);
 const trailing=clone(quadratic().certificate);trailing.claim.quotient.numerator.push('0/1');rejected(trailing);
 const oversized=clone(quadratic().certificate);oversized.claim.quotient.numerator=['1'.repeat(5000)+'/1'];rejected(oversized);
 for(const bad of [null,{},[],{format:'x'},'x'])rejected(bad);
 const big={format:'f-generative-lab/1',kind:'calculus',inputs:{data:'x'.repeat(200001)},claim:{}};rejected(big);
});
test('formatting is readable without modifying exact certificate values',()=>{
 assert.equal(formatRational('-3/1'),'-3');assert.equal(formatRational('1/3'),'1/3');
 assert.equal(formatField(quadratic().quotient),'6 + ε');
 assert.equal(formatField(geometric().value),'(−1) / (−1 + ε)');
 assert.equal(formatField({numerator:[],denominator:['1/1']}),'0');
});
test('browser engine copies preserve the exact source bytes of the paper implementation',()=>{
 for(const name of ['applications.mjs','formal-field.mjs']){
  const original=fs.readFileSync(new URL(`./${name}`,import.meta.url));
  const copy=fs.readFileSync(new URL(`../docs/lab/v1.5.8.0/engine/${name}`,import.meta.url));
  assert.equal(crypto.createHash('sha256').update(copy).digest('hex'),crypto.createHash('sha256').update(original).digest('hex'));
 }
});

test('boundary-sized legitimate generators remain accepted under checker budgets',()=>{
 const calculus=ok(runCalculus({numerator:'1000000,-999983,999979,-999961,999959,-999953,999931',denominator:'1,1',point:'1000000/999983'}));assert.equal(calculus.kind,'calculus');
 const series=ok(runSeries({numerator:'1000000,-999983,999979,-999961,999959,-999953,999931',denominator:'999983,999979',order:5}));assert.equal(series.coefficients.length,6);
 const geometry=ok(runGeometry({a:['1000000','-1000000'],b:['-1000000','999983/999979'],c:['999961/999959','1000000'],direction:-1,order:5}));assert.equal(geometry.order,5);
});
test('a mathematically equivalent field pair can use the full 512-character rational allowance',()=>{
 const c=clone(quadratic().certificate),k=10n**509n+1n;
 const large=x=>`${x}/1`;
 assert.equal(large(k).length,512);
 c.claim.quotient={numerator:[large(6n*k),large(k)],denominator:[large(k)]};
 assert.equal(verifyCertificate(c).ok,true);
});
test('numeric work exceeding 30000 characters rejects before polynomial arithmetic',()=>{
 const c=clone(quadratic().certificate),large=`${10n**509n+1n}/1`,p=Array.from({length:19},()=>large);
 c.claim.shifted={numerator:[...p],denominator:[...p]};c.claim.quotient={numerator:[...p],denominator:[...p]};
 assert(JSON.stringify(c).length<200000);
 const result=verifyCertificate(c);assert.equal(result.ok,false);assert.match(result.error,/30000-character checker budget/);
});
test('claim degree 19 rejects even when total JSON size is small',()=>{
 const c=clone(quadratic().certificate);c.claim.quotient.numerator=Array.from({length:20},()=> '1/1');
 const result=verifyCertificate(c);assert.equal(result.ok,false);assert.match(result.error,/claim 18/);
});
test('formerly slow hostile rational records reject during preflight',()=>{
 const c=runSeries({numerator:'1',denominator:'1,-1',order:5}).certificate;
 const huge=(n,i)=>'1/'+(10n**BigInt(n)+BigInt(2*i+1)).toString();
 c.claim.coefficients=Array.from({length:6},(_,i)=>huge(3000,i));
 c.claim.jet={numerator:['1/1'],denominator:Array.from({length:40},(_,i)=>huge(1500,i+9))};
 const started=performance.now(),result=verifyCertificate(c),elapsed=performance.now()-started;
 assert.equal(result.ok,false);assert.match(result.error,/512-character checker limit/);
 assert(elapsed<1000,`Preflight rejection took ${elapsed}ms`);
});
