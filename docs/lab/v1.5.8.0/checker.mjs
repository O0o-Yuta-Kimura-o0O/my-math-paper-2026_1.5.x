/**
 * Independent finite-claim checker for the f-generative lab v1.5.8.0.
 * It deliberately does not import core.mjs or formal-field.mjs. Polynomial
 * arithmetic and binomial substitution below are separate from the generator.
 * Trust boundary: elementary rational arithmetic in engine/applications.mjs,
 * JavaScript BigInt and this small checker. No general theorem is formalized.
 */
import {q,qparse,qstr,qadd,qsub,qmul,qdiv,qcmp,qneg} from './engine/applications.mjs';
export const CERTIFICATE_FORMAT='f-generative-lab/1';
// Browser responsiveness limits for finite proof data, not mathematical bounds.
const MAX_RATIONAL_TEXT_CHARACTERS=512;
const MAX_CLAIM_COEFFICIENTS=19; // Degree at most 18, including unnormalized pairs.
const MAX_NUMERIC_TEXT_CHARACTERS=30000;
const need=(v,m)=>{if(!v)throw new Error(m);};
const zero=()=>q(0),one=()=>q(1);
function keys(value,expected,name){
 need(value&&typeof value==='object'&&!Array.isArray(value),`${name}: expected object`);
 need(JSON.stringify(Object.keys(value).sort())===JSON.stringify([...expected].sort()),`${name}: unexpected or missing fields`);
}
function rat(text,bound=null){
 need(typeof text==='string'&&text.length<=MAX_RATIONAL_TEXT_CHARACTERS,'rational text exceeds the 512-character checker limit');
 const x=qparse(text);
 if(bound!==null)need((x.n<0n?-x.n:x.n)<=bound&&x.d<=bound,'rational input exceeds limit 1000000');
 return x;
}
function poly(value,{input=false}={}){
 need(Array.isArray(value)&&value.length<=(input?7:MAX_CLAIM_COEFFICIENTS),'polynomial degree exceeds the checker limit (input 6, claim 18)');
 const p=value.map(t=>rat(t,input?1000000n:null));
 // Inputs and claims are canonical coefficient lists, but a field pair need not
 // be a coprime/monic pair: its value is checked by cross-products instead.
 need(!p.length||p.at(-1).n!==0n,'noncanonical trailing zero coefficients');
 return p;
}
const trim=a=>{const b=[...a];while(b.length&&b.at(-1).n===0n)b.pop();return b;};
function add(a,b){return trim(Array.from({length:Math.max(a.length,b.length)},(_,i)=>qadd(a[i]??zero(),b[i]??zero())));}
function neg(a){return a.map(qneg);}
function sub(a,b){return add(a,neg(b));}
function mul(a,b){
 if(!a.length||!b.length)return [];
 const c=Array.from({length:a.length+b.length-1},zero);
 for(let i=0;i<a.length;i++)for(let j=0;j<b.length;j++)c[i+j]=qadd(c[i+j],qmul(a[i],b[j]));
 return trim(c);
}
const equalPoly=(a,b)=>a.length===b.length&&a.every((x,i)=>qcmp(x,b[i])===0);
function readField(value){keys(value,['numerator','denominator'],'field');const p=poly(value.numerator),d=poly(value.denominator);need(d.length,'zero field denominator');return {p,d};}
const constant=x=>({p:x.n===0n?[]:[x],d:[one()]});
const polynomial=a=>({p:a,d:[one()]});
const fieldSub=(x,y)=>({p:sub(mul(x.p,y.d),mul(y.p,x.d)),d:mul(x.d,y.d)});
const fieldDiv=(x,y)=>{need(y.p.length,'division by zero field value');return {p:mul(x.p,y.d),d:mul(x.d,y.p)};};
function sameField(a,b,name){need(equalPoly(mul(a.p,b.d),mul(b.p,a.d)),`${name}: cross-product identity failed`);}
const ord=p=>p.findIndex(x=>x.n!==0n);
const valuation=x=>x.p.length?ord(x.p)-ord(x.d):null;
function finitePart(x){
 if(!x.p.length)return zero();const a=ord(x.p),b=ord(x.d);need(a>=b,'standard part undefined at a pole');
 return a>b?zero():qdiv(x.p[a],x.d[b]);
}
function sign(x){return x.p.length?qcmp(x.p[ord(x.p)],zero())*qcmp(x.d[ord(x.d)],zero()):0;}
function pow(a,n){let r=one();for(let i=0;i<n;i++)r=qmul(r,a);return r;}
function binomial(n,k){let r=1n;for(let j=1;j<=k;j++)r=r*BigInt(n-j+1)/BigInt(j);return r;}
// Expand P(a+ε) by the finite binomial identity, instead of generator Horner.
function shifted(p,a){
 const result=Array.from({length:p.length},zero);
 for(let i=0;i<p.length;i++)for(let k=0;k<=i;k++)result[k]=qadd(result[k],qmul(p[i],qmul(q(binomial(i,k)),pow(a,i-k))));
 return trim(result);
}
function commonInputs(value,extra){
 keys(value,['numerator','denominator',...extra],'inputs');
 const p=poly(value.numerator,{input:true}),d=poly(value.denominator,{input:true});need(d.length,'zero input denominator');return {p,d};
}
const checkRat=(actual,expected,name)=>need(qcmp(rat(actual),expected)===0,`${name}: rational claim failed`);
function checkOrder(actual,expected,name){need(actual===expected,`${name}: incorrect order`);}
function numericTextBudget(value){
 const pending=[value];let characters=0;
 while(pending.length){
  const item=pending.pop();
  if(typeof item==='string'&&/^-?\d/.test(item)){
   need(item.length<=MAX_RATIONAL_TEXT_CHARACTERS,'rational text exceeds the 512-character checker limit');
   characters+=item.length;
   need(characters<=MAX_NUMERIC_TEXT_CHARACTERS,'numeric text exceeds the 30000-character checker budget');
  }else if(Array.isArray(item))pending.push(...item);
  else if(item&&typeof item==='object')pending.push(...Object.values(item));
 }
}
function checkCalculus(inputs,claim){
 const {p,d}=commonInputs(inputs,['point']),a=rat(inputs.point,1000000n);
 keys(claim,['shifted','atPoint','quotient','standardPart','residual','residualOrder','quotientOrder'],'claim');
 const sp=shifted(p,a),sd=shifted(d,a);need(sd.length&&sd[0]?.n!==0n,'entered denominator is zero at the selected point');
 const at=qdiv(sp[0]??zero(),sd[0]);checkRat(claim.atPoint,at,'f(a)');
 const sf={p:sp,d:sd},recordedShift=readField(claim.shifted);sameField(recordedShift,sf,'f(a+ε)');
 const diff=fieldDiv(fieldSub(sf,constant(at)),polynomial([zero(),one()]));
 const recordedDiff=readField(claim.quotient);sameField(recordedDiff,diff,'difference quotient');
 const st=finitePart(diff);checkRat(claim.standardPart,st,'standard part');
 const residual=fieldSub(diff,constant(st));sameField(readField(claim.residual),residual,'quotient residual');
 checkOrder(claim.residualOrder,valuation(residual),'residual order');checkOrder(claim.quotientOrder,valuation(diff),'quotient order');
 return ['input-domain','binomial-substitution','point-value','difference-quotient-cross-product','finite-standard-part','exact-residual','orders'];
}
function checkSeries(inputs,claim){
 const x=commonInputs(inputs,['order']);need(Number.isInteger(inputs.order)&&inputs.order>=0&&inputs.order<=5,'jet order must be an integer from 0 to 5');
 keys(claim,['value','jet','residual','residualOrder','coefficients','order','standardPart'],'claim');need(claim.order===inputs.order,'order binding failed');
 const recorded=readField(claim.value);sameField(recorded,x,'series source value');
 need(Array.isArray(claim.coefficients)&&claim.coefficients.length===inputs.order+1,'wrong coefficient count');
 const coeff=claim.coefficients.map(t=>rat(t));const jet=polynomial(trim(coeff));sameField(readField(claim.jet),jet,'jet coefficients');
 const residual=fieldSub(x,jet);sameField(readField(claim.residual),residual,'series residual');
 const v=valuation(residual);checkOrder(claim.residualOrder,v,'series residual order');
 need(v===null||v>=inputs.order+1,'remainder has insufficient order');
 checkRat(claim.standardPart,finitePart(x),'standard part');
 // A finite source plus remainder order >= n+1 uniquely fixes coefficients up
 // to n, so this check needs neither the generator's division nor an infinite sum.
 return ['input-domain','source-cross-product','jet-coefficients','exact-remainder-identity','remainder-order','finite-standard-part'];
}
function point(value){need(Array.isArray(value)&&value.length===2,'expected rational coordinate pair');return value.map(t=>rat(t,1000000n));}
function checkGeometry(inputs,claim){
 keys(inputs,['a','b','c','direction','order'],'inputs');
 const a=point(inputs.a),b=point(inputs.b),c=point(inputs.c);
 need(inputs.direction===1||inputs.direction===-1,'direction must be +1 or -1');need(Number.isInteger(inputs.order)&&inputs.order>=1&&inputs.order<=5,'perturbation order must be an integer from 1 to 5');
 keys(claim,['baseDeterminant','determinant','sign','baseSign','order','normal'],'claim');
 const dx=qsub(b[0],a[0]),dy=qsub(b[1],a[1]),norm=qadd(qmul(dx,dx),qmul(dy,dy));need(norm.n!==0n,'A and B must be distinct');
 const base=qsub(qmul(dx,qsub(c[1],a[1])),qmul(dy,qsub(c[0],a[0])));
 checkRat(claim.baseDeterminant,base,'unperturbed determinant');need(claim.baseSign===qcmp(base,zero()),'unperturbed sign mismatch');
 need(Array.isArray(claim.normal)&&claim.normal.length===2,'invalid normal');checkRat(claim.normal[0],qneg(dy),'normal x');checkRat(claim.normal[1],dx,'normal y');
 const terms=Array.from({length:inputs.order+1},zero);terms[0]=base;terms[inputs.order]=qmul(q(inputs.direction),norm);
 const det=polynomial(trim(terms));sameField(readField(claim.determinant),det,'perturbed determinant');need(claim.sign===sign(det),'perturbed sign mismatch');need(claim.order===inputs.order,'perturbation order binding failed');
 return ['distinct-baseline-points','unperturbed-determinant','normal-vector','perturbation-polynomial','leading-coefficient-sign'];
}
export function verifyCertificate(certificate){
 try{
  // Bound parser work as well as mathematical input. JSON is inert data.
  const encoded=JSON.stringify(certificate);need(typeof encoded==='string'&&encoded.length<=200000,'certificate exceeds 200000 characters');
  keys(certificate,['format','kind','inputs','claim'],'certificate');need(certificate.format===CERTIFICATE_FORMAT,'unsupported certificate format');
  numericTextBudget(certificate); // Reject oversized numeric work before qparse/BigInt arithmetic.
  let checks;
  if(certificate.kind==='calculus')checks=checkCalculus(certificate.inputs,certificate.claim);
  else if(certificate.kind==='series')checks=checkSeries(certificate.inputs,certificate.claim);
  else if(certificate.kind==='geometry')checks=checkGeometry(certificate.inputs,certificate.claim);
  else throw new Error('unsupported certificate kind');
  return {ok:true,kind:certificate.kind,checks,scope:'Finite exact rational/polynomial claims; shared rational arithmetic, BigInt and this checker are trusted. No general handwritten theorem is machine-verified.'};
 }catch(error){return {ok:false,error:error instanceof Error?error.message:String(error)};}
}
