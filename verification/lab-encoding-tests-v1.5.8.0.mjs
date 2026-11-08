import test from 'node:test';
import assert from 'node:assert/strict';
import {encodeTyped,decodeFOnly,constructionExamples} from '../docs/lab/v1.5.8.0/encoding.mjs';
import * as E from './concept-codec.mjs';
import {printFOnly,parseFOnly} from './f-only-codec.mjs';
import {qparse} from './applications.mjs';
import {field} from './formal-field.mjs';
const zero={numerator:[],denominator:['1/1']},one={numerator:['1/1'],denominator:['1/1']};

test('the base/successor and original integer-two forms are exact',()=>{
 assert.equal(encodeTyped('N','0').code,'f()');
 assert.equal(encodeTyped('N','2').code,'f(f(f()))');
 assert.equal(encodeTyped('Z','2').code,'f(f()f(f(f())))');
 assert.equal(encodeTyped('Z','-2').code,'f(f(f())f(f(f())))');
});
test('N/Z/Q decode their complete representations without evaluating text',()=>{
 for(const [type,values]of [['N',['0','1','50']],['Z',['0','-2','50']],['Q',['0/1','-2/3','5/7']]])
  for(const value of values)assert.equal(decodeFOnly(encodeTyped(type,value).code,type),value);
});
test('all eight construction examples match the existing authoritative constructor codecs',()=>{
 const examples=constructionExamples();assert.deepEqual(examples.map(x=>x.id),['N','Z','Q','L','M','F','C','H']);
 const f=x=>field(x.numerator,x.denominator);
 const c=x=>({real:f(x.a),imag:f(x.b)});
 for(const e of examples){
  const v=e.value;let tree;
  if(e.id==='N')tree=E.encodeNat(BigInt(v));
  if(e.id==='Z')tree=E.encodeInt(BigInt(v));
  if(e.id==='Q')tree=E.encodeRat(qparse(v));
  if(e.id==='L')tree=E.pair(E.encodeInt(BigInt(v.index)),E.encodeRat(qparse(v.rational)));
  if(e.id==='M')tree=E.encodePolynomial(v.map(qparse));
  if(e.id==='F')tree=E.encodeField(f(v));
  if(e.id==='C')tree=E.encodeComplex(c(v));
  if(e.id==='H')tree=E.encodeQuaternion({z:c(v.z),w:c(v.w)});
  const encoded=encodeTyped(e.id,v);assert.equal(encoded.complete,true,e.id);assert.equal(encoded.code,printFOnly(tree),e.id);assert.equal(encoded.estimatedLength,encoded.code.length);
 }
});
test('L retains integer-first component order',()=>{
 const actual=parseFOnly(encodeTyped('L',{index:'2',rational:'1/3'}).code);
 assert.equal(E.decodeInt(actual.left),2n);assert.equal(E.decodeRat(actual.right).n,1n);assert.equal(E.decodeRat(actual.right).d,3n);
});
test('complex matrices duplicate a and negate b in the upper right',()=>{
 const tree=parseFOnly(encodeTyped('C',{a:one,b:one}).code);
 assert.deepEqual(E.decodeField(tree.left.right),field(['-1/1'],['1/1']));
 assert.deepEqual(E.decodeComplex(tree),{real:field(['1/1']),imag:field(['1/1'])});
});
test('zero imaginary coefficient has canonical zero field numerator',()=>{
 const code=encodeTyped('C',{a:one,b:zero}).code;
 assert.deepEqual(E.decodeComplex(parseFOnly(code)),{real:field(['1/1']),imag:field()});
});
test('length estimation handles huge magnitudes before any unary expansion',()=>{
 const encoded=encodeTyped('N','1'+'0'.repeat(2000));
 assert.equal(encoded.complete,false);assert.equal(encoded.code,null);assert.equal(encoded.estimatedLength,null);
 assert.equal(encoded.estimatedLengthExact,String(3n*(10n**2000n+1n)));
 assert(encoded.preview.length<1400);assert(encoded.structure.length<4100);
});
test('cap boundaries are exact, and previews never claim to be complete',()=>{
 const a=encodeTyped('N','10',{maxCharacters:33});assert.equal(a.complete,true);assert.equal(a.code.length,33);
 const b=encodeTyped('N','10',{maxCharacters:32});assert.equal(b.complete,false);assert.equal(b.code,null);assert.match(b.preview,/not a complete f expression/);
 for(const e of constructionExamples()){const x=encodeTyped(e.id,e.value,{maxCharacters:1});assert.equal(x.complete,false);assert.equal(x.code,null);}
});
test('input grammar rejects implicit promotion and malformed canonical strings',()=>{
 for(const x of [2,2n,'02','-0','+1','1.0',' 2'])assert.throws(()=>encodeTyped('N',x));
 assert.throws(()=>encodeTyped('N','-1'));
 for(const x of ['2/4','0/2','1/-2','1/0','-0/1','01/2','1'])assert.throws(()=>encodeTyped('Q',x));
 assert.throws(()=>encodeTyped('M',['1/1','0/1']));assert.throws(()=>encodeTyped('M',[,'1/1']));
 assert.throws(()=>encodeTyped('L',{index:'2',rational:'1/3',extra:1}));
 assert.throws(()=>encodeTyped('R','1'));assert.throws(()=>encodeTyped('N','1',{wrong:1}));
 assert.throws(()=>encodeTyped('N','1',{maxCharacters:100001}));
});
test('field encoder accepts canonical values and rejects bad normal forms',()=>{
 assert(encodeTyped('F',{numerator:['1/1','2/1'],denominator:['1/1','1/1']}).complete);
 for(const x of [
  {numerator:['1/1'],denominator:[]},
  {numerator:['1/1'],denominator:['2/1']},
  {numerator:['1/1','1/1'],denominator:['1/1','1/1']},
  {numerator:[],denominator:['1/1','1/1']},
 ])assert.throws(()=>encodeTyped('F',x));
});
test('decoder rejects extra roots, commas, third children, wrong sign and negative zero',()=>{
 for(const s of ['f()f()','(f(),f())','f(f(),f())','f(f()f()f())','alert(1)','f( f()'])assert.throws(()=>decodeFOnly(s,'N'));
 assert.throws(()=>decodeFOnly(encodeTyped('N','2').code,'Z'));
 assert.throws(()=>decodeFOnly('f(f(f())f())','Z'));
 assert.equal(decodeFOnly(' f( f( ) ) ','N'),'1');
 assert.throws(()=>decodeFOnly('f()','F'));
});
test('decoder rejects noncanonical rational sign or reduction',()=>{
 const pair=(l,r)=>`f(${l}${r})`;
 assert.throws(()=>decodeFOnly(pair(encodeTyped('Z','2').code,encodeTyped('Z','4').code),'Q'));
 assert.throws(()=>decodeFOnly(pair(encodeTyped('Z','1').code,encodeTyped('Z','-2').code),'Q'));
});
test('record accessors are rejected without being called',()=>{
 let accessed=false;const v={};Object.defineProperty(v,'index',{enumerable:true,get(){accessed=true;throw new Error('getter invoked');}});v.rational='1/3';
 assert.throws(()=>encodeTyped('L',v));assert.equal(accessed,false);
});
