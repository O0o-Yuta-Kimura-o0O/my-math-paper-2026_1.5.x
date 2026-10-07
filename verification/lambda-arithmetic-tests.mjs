import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const release=JSON.parse(fs.readFileSync(new URL('../release.json',import.meta.url),'utf8'));
const html=fs.readFileSync(new URL('../'+release.interpreter,import.meta.url),'utf8');
const source=html.match(/<script id="lambda-core">([\s\S]*?)<\/script>/)[1];
// The scheduling callback is synchronous in tests; reduction and replay are unchanged.
const context=vm.createContext({setTimeout:f=>f()});vm.runInContext(source,context);
const C=context.LambdaCore;
function pair(t){assert.equal(t.t,'l');assert.equal(t.b.t,'a');assert.equal(t.b.f.t,'a');assert.equal(t.b.f.f.t,'b');assert.equal(t.b.f.f.i,0);return [t.b.f.a,t.b.a];}
function integer(t){const [s,m]=pair(t),sign=C.decodeNat(s),mag=C.decodeNat(m);assert([0,1].includes(sign));assert(mag!==null);assert(mag!==0||sign===0);return sign?-mag:mag;}
function rational(t){const [a,b]=pair(t);const n=integer(a),d=integer(b);assert(d>0);return [n,d];}
function result(t){assert.equal(t.t,'l');assert.equal(t.b.t,'l');const body=t.b.b;assert.equal(body.t,'a');assert.equal(body.f.t,'b');assert([0,1].includes(body.f.i));return {ok:body.f.i===1,value:body.a};}
const nat=n=>`(λf.λx.${'f ('.repeat(n)}x${')'.repeat(n)})`;
const z=n=>`(ZMake ${n<0?'One':'Zero'} ${nat(Math.abs(n))})`;
async function run(s){const r=await C.evaluate(s,{maxSteps:10000});assert.equal(r.status,'normal-form',r.error??s);const v=C.verifyTrace(r.trace);assert(v.valid,v.error);return r;}
test('zero sign is canonical and negating zero remains positive zero',async()=>{for(const s of ['ZMake One Zero','ZNeg ZZero','ZAdd ZOne ZMinusOne'])assert.equal(integer((await run(s)).term),0);});
test('signed addition handles signs, cancellation and magnitude order',async()=>{for(const [a,b] of [[2,-1],[-2,1],[-2,-1],[1,2],[0,-2],[1,-2]])assert.equal(integer((await run(`ZAdd ${z(a)} ${z(b)}`)).term),a+b);});
test('signed subtraction and multiplication agree with integer arithmetic',async()=>{for(const [a,b] of [[2,-1],[-2,1],[-1,-2],[0,-2]]){assert.equal(integer((await run(`ZSub ${z(a)} ${z(b)}`)).term),a-b);assert.equal(integer((await run(`ZMul ${z(a)} ${z(b)}`)).term),(a*b)||0);}});
test('signed order reverses magnitude for negative integers',async()=>{for(const [a,b] of [[-2,-1],[-1,-2],[-1,0],[0,-1],[2,2]]){assert(C.alphaEqual((await run(`ZLeq ${z(a)} ${z(b)}`)).term,C.parse(a<=b?'λt.λf.t':'λt.λf.f')));assert(C.alphaEqual((await run(`ZEq ${z(a)} ${z(b)}`)).term,C.parse(a===b?'λt.λf.t':'λt.λf.f')));}});
test('legacy difference pairs convert into current signed magnitude',async()=>{for(const [p,n] of [[0,0],[2,3],[3,1],[2,2]])assert.equal(integer((await run(`ZFromDiff ${nat(p)} ${nat(n)}`)).term),p-n);});
test('conversion to a difference pair preserves the integer',async()=>{for(const n of [-2,0,2]){const [p,m]=pair((await run(`ZToDiff ${z(n)}`)).term);assert.equal(C.decodeNat(p)-C.decodeNat(m),n);}});
test('rational constructor normalizes denominator sign and rejects zero',async()=>{const a=result((await run('QMake ZOne (ZMake One Two)')).term);assert(a.ok);assert.deepEqual(rational(a.value),[-1,2]);const b=result((await run('QMake ZOne ZZero')).term);assert(!b.ok);assert.equal(C.decodeNat(b.value),0);});
test('rational addition keeps an exact unreduced pair without pretending to run gcd',async()=>assert.deepEqual(rational((await run('QRepAdd QHalf QHalf')).term),[4,4]));
test('rational subtraction and multiplication preserve exact values',async()=>{assert.deepEqual(rational((await run('QRepSub QHalf QHalf')).term),[0,4]);assert.deepEqual(rational((await run('QRepMul QHalf QOne')).term),[1,2]);});
test('cross products compare equivalent unreduced rational representations',async()=>{assert(C.alphaEqual((await run('QRepEq QHalf (QRep ZTwo (ZMake Zero Four))')).term,C.parse('λt.λf.t')));assert(C.alphaEqual((await run('QRepLeq QOne QHalf')).term,C.parse('λt.λf.f')));});
test('inverse and division return explicit success or zero-division error',async()=>{const a=result((await run('QRepInv QHalf')).term);assert(a.ok);assert.deepEqual(rational(a.value),[2,1]);for(const s of ['QRepInv QZero','QRepDiv QOne QZero']){const r=result((await run(s)).term);assert(!r.ok);assert.equal(C.decodeNat(r.value),0);}});
test('success binding propagates an error without confusing it with rational zero',async()=>{const r=result((await run('ResultBind (QRepInv QZero) (λq.ResultOk QOne)')).term);assert(!r.ok);assert(C.alphaEqual((await run('QRepValid QHalf')).term,C.parse('λt.λf.t')));assert(C.alphaEqual((await run('QRepValid (QRep ZOne ZZero)')).term,C.parse('λt.λf.f')));});
test('interleaved strategy discards unused definitions and its tampering is rejected',async()=>{const r=await run('(λx.λy.y) (Add Two Three)');assert.equal(r.trace.steps[0].rule,'beta');const t=structuredClone(r.trace);t.strategy='leftmost-outermost';assert(!C.verifyTrace(t).valid);t.strategy=r.trace.strategy;t.steps[0].after='λx.λy.x';assert(!C.verifyTrace(t).valid);});
test('legacy v8.0.0 traces use their original expansion strategy',()=>{const t=JSON.parse(fs.readFileSync(new URL('fixtures/lambda-v8.0.0.json',import.meta.url),'utf8'));assert(C.verifyTrace(t).valid);t.strategy='leftmost-outermost-interleaved';assert(!C.verifyTrace(t).valid);});
test('replay does not invoke the new evaluator reduction selector',async()=>{const r=await run('ZNeg ZOne');const broken=vm.createContext({setTimeout:f=>f()});vm.runInContext(source.replace('function firstReduction(t,env,path=[]){','function firstReduction(t,env,path=[]){throw Error("disabled evaluator selector");'),broken);assert(broken.LambdaCore.verifyTrace(r.trace).valid);});
