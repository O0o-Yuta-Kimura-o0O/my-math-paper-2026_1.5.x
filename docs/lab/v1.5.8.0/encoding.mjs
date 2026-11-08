/**
 * Bounded, typed display of the manuscript's finite constructor trees.
 * Common grammar U := f() | f(U) | f(UU). This is syntax, not evaluation,
 * Church encoding, proof checking, or a type-free interpretation of numbers.
 * Unary lengths are computed with BigInt before any unary string is allocated.
 */
const requireThat=(ok,message)=>{if(!ok)throw new Error(message);};
const abs=n=>n<0n?-n:n;
const gcd=(a,b)=>{a=abs(a);b=abs(b);while(b)[a,b]=[b,a%b];return a;};
const integerRE=/^(?:0|[1-9][0-9]*|-[1-9][0-9]*)$/;
function intString(s,natural=false){
 requireThat(typeof s==='string' && s.length<=4096 && integerRE.test(s),'Expected a canonical integer string (at most 4096 characters).');
 const n=BigInt(s);requireThat(!natural||n>=0n,'A natural number cannot be negative.');return n;
}
function ratString(s){
 requireThat(typeof s==='string'&&s.length<=1024&&/^-?(?:0|[1-9][0-9]*)\/[1-9][0-9]*$/.test(s),'Expected a canonical rational string p/q.');
 const [a,b]=s.split('/');requireThat(integerRE.test(a),'Noncanonical rational numerator.');
 const n=BigInt(a),d=BigInt(b);requireThat(gcd(n,d)===1n,'Rational must be reduced, with zero written 0/1.');return {n,d};
}
const q=(n,d=1n)=>{requireThat(d!==0n,'Zero denominator.');if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return {n:n/g,d:d/g};};
const qtext=a=>`${a.n}/${a.d}`;
const add=(a,b)=>q(a.n*b.d+b.n*a.d,a.d*b.d);
const neg=a=>({n:-a.n,d:a.d});
const mul=(a,b)=>q(a.n*b.n,a.d*b.d);
const divide=(a,b)=>q(a.n*b.d,a.d*b.n);
const trim=p=>{while(p.length&&p.at(-1).n===0n)p.pop();return p;};
function denseArray(value,max=25){
 requireThat(Array.isArray(value)&&value.length<=max,'Expected a finite coefficient array of at most 25 terms.');
 requireThat(Reflect.ownKeys(value).length===value.length+1,'Array holes or extra fields are not accepted.');
 for(let i=0;i<value.length;i++)requireThat(Object.hasOwn(Object.getOwnPropertyDescriptor(value,String(i))||{},'value'),'Array accessors are not accepted.');
 return value;
}
function fields(value,names){
 requireThat(value&&typeof value==='object'&&!Array.isArray(value),'Expected a data record.');
 const descriptors=Object.getOwnPropertyDescriptors(value);
 requireThat(Reflect.ownKeys(descriptors).length===names.length&&names.every(k=>Object.hasOwn(descriptors,k)&&Object.hasOwn(descriptors[k],'value')),'Unexpected record fields or accessors.');
 return Object.fromEntries(names.map(k=>[k,descriptors[k].value]));
}
function coefficients(value){
 const values=denseArray(value).map(ratString);
 requireThat(!values.length||values.at(-1).n!==0n,'Trailing zero coefficients are not canonical.');return values;
}
function remainder(a,b){
 const r=a.slice();requireThat(b.length>0,'Zero polynomial divisor.');let iterations=0;
 while(r.length>=b.length){
  requireThat(++iterations<=25,'Polynomial remainder bound exceeded.');
  const k=r.length-b.length,t=divide(r.at(-1),b.at(-1));
  for(let j=0;j<b.length;j++)r[k+j]=add(r[k+j],neg(mul(t,b[j])));
  trim(r);
 }
 return r;
}
function canonicalField(value){
 const f=fields(value,['numerator','denominator']);
 const n=coefficients(f.numerator),d=coefficients(f.denominator);
 requireThat(d.length>0,'Field denominator is zero.');
 requireThat(d.at(-1).n===d.at(-1).d,'Field denominator must be monic.');
 if(!n.length){requireThat(d.length===1&&d[0].n===1n&&d[0].d===1n,'Zero field value must be [] / [1/1].');}
 else {
  // Canonicality is checked at small degrees without calling the result generator.
  // All accepted terms remain finite data even when their unary spelling is long.
  let a=n,b=d;
  for(let i=0;b.length;i++){requireThat(i<=25,'Polynomial gcd bound exceeded.');[a,b]=[b,remainder(a,b)];}
  requireThat(a.length===1,'Field numerator and denominator must be coprime.');
 }
 return {numerator:n.map(qtext),denominator:d.map(qtext)};
}
const nat=n=>({kind:'nat',n,length:3n*(n+1n)});
const pair=(left,right)=>({kind:'pair',left,right,length:3n+left.length+right.length});
const list=nodes=>nodes.reduceRight((tail,node)=>pair(node,tail),nat(0n));
function signed(n){return pair(nat(n<0n?1n:0n),nat(abs(n)));}
function rational(r){return pair(signed(r.n),signed(r.d));}
function polynomial(p){return list(p.map(s=>rational(ratString(s))));}
function fieldNode(f){return pair(polynomial(f.numerator),polynomial(f.denominator));}
function negativeField(f){return {numerator:f.numerator.map(s=>qtext(neg(ratString(s)))),denominator:[...f.denominator]};}
function complexNode(c){
 const x=fields(c,['a','b']),a=canonicalField(x.a),b=canonicalField(x.b);
 const aa=fieldNode(a),bb=fieldNode(b),nb=fieldNode(negativeField(b));
 return pair(pair(aa,nb),pair(bb,aa));
}
function typedNode(type,value){
 if(type==='N')return nat(intString(value,true));
 if(type==='Z')return signed(intString(value));
 if(type==='Q')return rational(ratString(value));
 if(type==='L'){
  const x=fields(value,['index','rational']);return pair(signed(intString(x.index)),rational(ratString(x.rational)));
 }
 if(type==='M')return polynomial(coefficients(value).map(qtext));
 if(type==='F')return fieldNode(canonicalField(value));
 if(type==='C')return complexNode(value);
 if(type==='H'){const x=fields(value,['z','w']);return pair(complexNode(x.z),complexNode(x.w));}
 throw new Error('Unknown reading type.');
}
function structure(node,cap=4000){
 const stack=[node],parts=[];let length=0,truncated=false;
 while(stack.length&&length<cap){
  const x=stack.pop();let s;
  if(typeof x==='string')s=x;
  else if(x.kind==='nat')s=`N(${x.n})`;
  else {s='(';stack.push(')',x.right,', ',x.left);}
  const used=s.slice(0,cap-length);if(used.length<s.length)truncated=true;parts.push(used);length+=used.length;
 }
 return parts.join('')+(stack.length||truncated?' … [structure preview]':'');
}
function spelling(node,cap){
 const stack=[node],parts=[];let count=0;
 const emit=s=>{const used=s.slice(0,cap-count);parts.push(used);count+=used.length;};
 while(stack.length&&count<cap){
  const x=stack.pop();
  if(typeof x==='string'){emit(x);continue;}
  if(x.kind==='nat'){
   const available=cap-count;
   if(x.length<=BigInt(available)){
    const k=Number(x.n);emit('f('.repeat(k+1)+')'.repeat(k+1));
   }else{
    // A prefix is bounded; never allocate n copies to display a long value.
    const depth=x.n+1n,needed=Math.ceil(available/2),opens=Number(depth<BigInt(needed)?depth:BigInt(needed));
    emit('f('.repeat(opens));
    if(count<cap)emit(')'.repeat(cap-count));
   }
  }else{emit('f(');stack.push(')',x.right,x.left);}
 }
 return parts.join('');
}
/** estimatedLengthExact is always exact; estimatedLength is null beyond JS safe integers. */
export function encodeTyped(type,value,options={}){
 const o=fields(options,Object.keys(options));requireThat(Object.keys(o).every(k=>k==='maxCharacters'),'Unknown encoder option.');
 const cap=o.maxCharacters??16000;requireThat(Number.isSafeInteger(cap)&&cap>=1&&cap<=100000,'maxCharacters must be between 1 and 100000.');
 const node=typedNode(type,value),complete=node.length<=BigInt(cap);
 const code=complete?spelling(node,cap):null;
 const preview=complete?code:spelling(node,Math.min(cap,1200))+' … [display preview; not a complete f expression]';
 return {complete,estimatedLength:node.length<=BigInt(Number.MAX_SAFE_INTEGER)?Number(node.length):null,estimatedLengthExact:String(node.length),code,preview,structure:structure(node)};
}
function parseF(source){
 requireThat(typeof source==='string'&&source.length<=100000,'Expected at most 100000 characters of f syntax.');
 let i=0,nodes=0;const stack=[];let root;
 const skip=()=>{while(i<source.length&&/\s/u.test(source[i]))i++;};
 while(true){
  skip();requireThat(source[i]==='f',`Expected f at ${i}.`);i++;skip();requireThat(source[i]==='(',`Expected ( at ${i}.`);i++;
  requireThat(++nodes<=33334,'f syntax node limit exceeded.');stack.push([]);
  while(true){
   skip();const children=stack.at(-1);
   if(source[i]==='f'){requireThat(children.length<2,'f accepts at most two children.');break;}
   requireThat(source[i]===')',`Expected f or ) at ${i}.`);i++;stack.pop();
   const node={children};
   if(!stack.length){root=node;skip();requireThat(i===source.length,'Trailing f syntax input.');return root;}
   stack.at(-1).push(node);
  }
 }
}
function readN(node){let n=0n;while(node.children.length===1){n++;node=node.children[0];}requireThat(node.children.length===0,'Expected a unary natural chain.');return n;}
function readZ(node){requireThat(node.children.length===2,'Expected sign/magnitude pair.');const sign=readN(node.children[0]),mag=readN(node.children[1]);requireThat(sign<=1n,'Invalid sign.');requireThat(sign===0n||mag>0n,'Negative zero is not canonical.');return sign===0n?mag:-mag;}
/** Decoder intentionally interprets only N, Z and Q; it is not a proof checker. */
export function decodeFOnly(source,type){
 const node=parseF(source);
 if(type==='N')return String(readN(node));
 if(type==='Z')return String(readZ(node));
 if(type==='Q'){
  requireThat(node.children.length===2,'Expected numerator/denominator pair.');
  const n=readZ(node.children[0]),d=readZ(node.children[1]);requireThat(d>0n&&gcd(n,d)===1n,'Rational must be canonical with positive denominator.');return `${n}/${d}`;
 }
 throw new Error('This educational decoder supports N, Z and Q only.');
}
const F=(n=[])=>({numerator:n,denominator:['1/1']});
const z=F(),one=F(['1/1']),two=F(['2/1']);
export function constructionExamples(){
 return JSON.parse(JSON.stringify([
  {id:'N',nameJa:'自然数',nameEn:'Natural numbers',formula:'2 = f(f(f()))',descriptionJa:'零と後続による構成子表示です。λ計算用のChurch数とは別の構文です。',descriptionEn:'A base-and-successor constructor representation, distinct from the Church encoding used for λ execution.',value:'2'},
  {id:'Z',nameJa:'整数',nameEn:'Signed integers',formula:'−2 = (negative, 2)',descriptionJa:'符号と自然数の対です。零の符号は正側に正規化します。',descriptionEn:'A pair of a sign and a natural magnitude. Zero has the positive sign.',value:'-2'},
  {id:'Q',nameJa:'有理数',nameEn:'Rational numbers',formula:'−2/3 = ((negative, 2), (positive, 3))',descriptionJa:'整数二つの対です。分母は正で、既約な表示を使います。',descriptionEn:'A pair of integers with a positive denominator and reduced representation.',value:'-2/3'},
  {id:'L',nameJa:'関係子ラベルの一次表示',nameEn:'Linear relation labels',formula:'(2, 1/3) ↦ 1/3 + 2ε',descriptionJa:'第一成分は符号付きの関係子個数であり、生成処理の再帰回数ではありません。',descriptionEn:'The first component counts signed relation operators, not recursion steps of a generator.',value:{index:'2',rational:'1/3'}},
  {id:'M',nameJa:'M多項式',nameEn:'M-polynomials',formula:'[1, 2, 1] ↦ 1 + 2ε + ε²',descriptionJa:'有理係数の有限列です。係数の位置が次数を表し、末尾の零は除きます。',descriptionEn:'A finite rational coefficient list. Positions encode degree, and trailing zeros are removed.',value:['1/1','2/1','1/1']},
  {id:'F',nameJa:'有限有理式数',nameEn:'Finite rational-expression numbers',formula:'(1 + ε)/(1 − ε)',descriptionJa:'M多項式二つの対です。gcdを除き分母をモニックにした正規形を符号化します。',descriptionEn:'A pair of M-polynomials, encoded after removing their gcd and making the denominator monic.',value:{numerator:['-1/1','-1/1'],denominator:['-1/1','1/1']}},
  {id:'C',nameJa:'生成複素数',nameEn:'Generative complex numbers',formula:'1 + i ↔ J(1, 1)',descriptionJa:'Fεの二係数を行列((a,−b),(b,a))に配置します。対にするだけでは乗法は定まりません。',descriptionEn:'Two Fε coefficients form the matrix ((a,−b),(b,a)). Operations require their explicit rules.',value:{a:one,b:one}},
  {id:'H',nameJa:'生成四元数',nameEn:'Generative quaternions',formula:'1 + i + 2j ↔ (J(1,1), J(2,0))',descriptionJa:'生成複素数の対であり、各行列の配置を保持します。乗法は共役を含む別の規則で定めます。',descriptionEn:'A pair of generative complex matrices, preserving each matrix layout. Multiplication uses a separately stated conjugation rule.',value:{z:{a:one,b:one},w:{a:two,b:z}}},
 ]));
}
