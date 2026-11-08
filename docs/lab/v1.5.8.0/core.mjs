/** Generator for bounded finite experiments; paper v1.5.8, lab v1.5.8.0. */
import {q,qparse,qstr,qadd,qsub,qmul,qdiv,qneg,qcmp} from './engine/applications.mjs';
import {field,fieldJSON,fieldConstant,epsilon,fieldAdd,fieldSub,fieldMul,fieldDiv,fieldOrd0,fieldCmp,standardPart} from './engine/formal-field.mjs';
import {CERTIFICATE_FORMAT} from './checker.mjs';
export {verifyCertificate} from './checker.mjs';
export const LAB_VERSION='1.5.8.0';
const need=(condition,message)=>{if(!condition)throw new Error(message);};
const ZERO=()=>q(0),ONE=()=>q(1),LIMIT=1000000n;
function rational(text){
 need(typeof text==='string'&&text.length<=40,'Enter an integer or fraction using at most 40 characters.');
 const s=text.trim();need(/^[+-]?\d+(?:\/[+-]?\d+)?$/.test(s),'Use exact integers or fractions such as 3, -2, or 1/3.');
 const [n,d='1']=s.split('/'),ni=BigInt(n),di=BigInt(d);need((ni<0n?-ni:ni)<=LIMIT&&(di<0n?-di:di)<=LIMIT,'Input numerator and denominator must be at most 1000000 in magnitude.');return q(ni,di);
}
function coefficients(text){
 need(typeof text==='string'&&text.length<=300,'Coefficient list is too long.');const items=text.split(',');need(items.length<=7,'Use degree at most 6 (seven coefficients).');
 const p=items.map(rational);while(p.length&&p.at(-1).n===0n)p.pop();return p;
}
function common(options){
 need(options&&typeof options==='object','Expected input options.');const p=coefficients(options.numerator),d=coefficients(options.denominator);need(d.length,'The denominator polynomial must be nonzero.');return {p,d};
}
function evaluate(p,x){let result=fieldConstant(ZERO());for(let i=p.length-1;i>=0;i--)result=fieldAdd(fieldMul(result,x),fieldConstant(p[i]));return result;}
function evaluateRat(p,a){let r=ZERO();for(let i=p.length-1;i>=0;i--)r=qadd(qmul(r,a),p[i]);return r;}
function certificate(kind,inputs,claim){return {format:CERTIFICATE_FORMAT,kind,inputs,claim};}
export function runCalculus(options){
 const {p,d}=common(options),a=rational(options.point);const atDenominator=evaluateRat(d,a);need(atDenominator.n!==0n,'The entered denominator is zero at this point. Choose a point where the expression is defined.');
 const x=fieldAdd(fieldConstant(a),epsilon()),shifted=fieldDiv(evaluate(p,x),evaluate(d,x));
 const atPoint=qdiv(evaluateRat(p,a),atDenominator),quotient=fieldDiv(fieldSub(shifted,fieldConstant(atPoint)),epsilon());
 const st=standardPart(quotient),residual=fieldSub(quotient,fieldConstant(st));
 const inputs={numerator:p.map(qstr),denominator:d.map(qstr),point:qstr(a)};
 const claim={shifted:fieldJSON(shifted),atPoint:qstr(atPoint),quotient:fieldJSON(quotient),standardPart:qstr(st),residual:fieldJSON(residual),residualOrder:fieldOrd0(residual),quotientOrder:fieldOrd0(quotient)};
 return {kind:'calculus',inputs,...claim,certificate:certificate('calculus',inputs,claim)};
}
export function runSeries(options){
 const {p,d}=common(options),order=options.order;need(Number.isInteger(order)&&order>=0&&order<=5,'Choose a jet order from 0 to 5.');
 const value=field(p,d),st=standardPart(value); // Reject true poles; removable ε factors are normalized.
 const numerator=value.numerator,denominator=value.denominator,coeff=[];
 for(let n=0;n<=order;n++){
  let rest=numerator[n]??ZERO();for(let j=1;j<=n;j++)rest=qsub(rest,qmul(denominator[j]??ZERO(),coeff[n-j]));
  coeff.push(qdiv(rest,denominator[0]));
 }
 const jet=field(coeff),residual=fieldSub(value,jet);
 const inputs={numerator:p.map(qstr),denominator:d.map(qstr),order};
 const claim={value:fieldJSON(value),jet:fieldJSON(jet),residual:fieldJSON(residual),residualOrder:fieldOrd0(residual),coefficients:coeff.map(qstr),order,standardPart:qstr(st)};
 return {kind:'series',inputs,...claim,certificate:certificate('series',inputs,claim)};
}
export function runGeometry(options){
 const point=value=>{need(Array.isArray(value)&&value.length===2,'Enter two rational coordinates per point.');return value.map(rational);};
 const a=point(options.a),b=point(options.b),c=point(options.c),direction=options.direction,order=options.order;
 need(direction===1||direction===-1,'Choose perturbation direction +1 or -1.');need(Number.isInteger(order)&&order>=1&&order<=5,'Choose perturbation order from 1 to 5.');
 const dx=qsub(b[0],a[0]),dy=qsub(b[1],a[1]),norm=qadd(qmul(dx,dx),qmul(dy,dy));need(norm.n!==0n,'A and B must be distinct points.');
 const base=qsub(qmul(dx,qsub(c[1],a[1])),qmul(dy,qsub(c[0],a[0]))),terms=Array.from({length:order+1},ZERO);terms[0]=base;terms[order]=qmul(q(direction),norm);
 const determinant=field(terms),inputs={a:a.map(qstr),b:b.map(qstr),c:c.map(qstr),direction,order};
 const claim={baseDeterminant:qstr(base),determinant:fieldJSON(determinant),sign:fieldCmp(determinant,fieldConstant(ZERO())),baseSign:qcmp(base,ZERO()),order,normal:[qstr(qneg(dy)),qstr(dx)]};
 return {kind:'geometry',inputs,...claim,certificate:certificate('geometry',inputs,claim)};
}
export function formatRational(text){const x=qparse(text);return x.d===1n?x.n.toString():qstr(x);}
function formatPoly(p,variable='ε'){
 if(!p.length)return '0';const pieces=[];
 for(let i=0;i<p.length;i++){
  const a=qparse(p[i]);if(!a.n)continue;
  const negative=a.n<0n,absolute=q(negative?-a.n:a.n,a.d),coefficient=formatRational(qstr(absolute));
  const power=i===0?'':i===1?variable:`${variable}^${i}`;
  const term=i===0?coefficient:(coefficient==='1'?'':`${coefficient}·`)+power;
  pieces.push((pieces.length?(negative?' − ':' + '):(negative?'−':''))+term);
 }
 return pieces.join('')||'0';
}
export function formatField(value,variable='ε'){
 const p=formatPoly(value.numerator,variable),d=formatPoly(value.denominator,variable);
 return d==='1'?p:`(${p}) / (${d})`;
}
