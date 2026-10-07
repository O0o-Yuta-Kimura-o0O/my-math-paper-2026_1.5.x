/** Complete finite examples, with no abbreviation inside any emitted .f file.
 * --check reads existing artifacts instead of changing them. Lambda evaluation
 * and proof checking remain in their original, explicitly separate kernels.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import * as E from '../verification/concept-codec.mjs';
import * as A from '../verification/applications.mjs';
import * as F from '../verification/formal-field.mjs';
import {checkBundle} from '../verification/equational-checker.mjs';
import {verifyGeneratorExtensionBundle} from '../verification/generator-extensions.mjs';
import {additionProgram,verifyModelExtensionBundle} from '../verification/model-extensions.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const release = JSON.parse(fs.readFileSync(path.join(root, 'release.json'), 'utf8'));
const version = release.paperVersion;
const checking = process.argv.includes('--check');
const folder = release.conceptDataDirectory || 'verification/concept-symbols';
const hash = x => crypto.createHash('sha256').update(x).digest('hex');
const json = x => JSON.stringify(x, null, 2) + '\n';
const readJSON = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const output = (name, bytes) => {
  const file = path.join(root, name);
  if (checking) assert.equal(fs.readFileSync(file, 'utf8'), bytes, `${name}: saved artifact mismatch`);
  else { fs.mkdirSync(path.dirname(file), {recursive: true}); fs.writeFileSync(file, bytes); }
};
const N = E.encodeNat, Z = E.encodeInt, Q = x => E.encodeRat(A.qparse(A.qstr(x)));
const L = E.encodeList, T = E.encodeText, pair = E.pair;
const node = (tag, ...args) => pair(N(tag), L(args));
const fc = n => F.fieldConstant(A.q(n));
const qc = (a, b = 1) => A.q(a, b);
const pc = xs => F.poly(xs.map(n => Array.isArray(n) ? qc(...n) : qc(n)));
const complex = (a, b) => ({real: fc(a), imag: fc(b)});
const quat = (a,b,c,d) => ({z: complex(a,b), w: complex(c,d)});
const plain = x => JSON.parse(JSON.stringify(x, (_k, v) => typeof v === 'bigint' ? v.toString() : v));
const equal = (a,b) => assert.deepEqual(plain(a), plain(b));

const html = fs.readFileSync(path.join(root, release.interpreter), 'utf8');
const script = html.match(/<script id="lambda-core">([\s\S]*?)<\/script>/)?.[1];
assert(script, 'lambda core exists');
const context = vm.createContext({setTimeout});
vm.runInContext(script, context, {timeout: 1000});
const C = context.LambdaCore;
function lambda(t) {
  if(t.t==='b') return node(0,N(t.i));
  if(t.t==='v') return node(1,T(t.n));
  if(t.t==='a') return node(2,lambda(t.f),lambda(t.a));
  assert.equal(t.t,'l'); return node(3,lambda(t.b));
}
function unlambda(t, depth=0) {
  const tag = Number(E.decodeNat(t.left)), args = E.decodeList(t.right);
  if(tag===0) { assert.equal(args.length,1); const i=Number(E.decodeNat(args[0])); assert(i<depth); return {t:'b',i}; }
  if(tag===1) { assert.equal(args.length,1); return {t:'v',n:E.decodeText(args[0])}; }
  if(tag===2) { assert.equal(args.length,2); return {t:'a',f:unlambda(args[0],depth),a:unlambda(args[1],depth)}; }
  assert.equal(tag,3); assert.equal(args.length,1); return {t:'l',b:unlambda(args[0],depth+1)};
}

const entries = [];
function add(id, group, title, explanation, tree, verify, evidence='表示構文の復号・照合。意味や一般法則の証明とは別。') {
  assert(/^[a-z0-9-]+$/.test(id));
  assert(!entries.some(e => e.id===id), `duplicate ${id}`);
  entries.push({id,group,title,explanation,tree,verify,evidence});
}
const numeric = (id,group,title,value,encode,decode,explanation='型を外側で指定した直接表示。') =>
  add(id,group,title,explanation,encode(value),tree=>equal(decode(tree),value),'型付きの復号結果を、指定した正規値と照合。');

for(let i=0;i<=4;i++) numeric(`nat-${i}`,'基底と数',`自然数 ${i}`,BigInt(i),N,E.decodeNat);
for(let i=0;i<=1;i++) numeric(`sign-${i}`,'基底と数',i?'負の符号':'非負の符号',BigInt(i),N,E.decodeNat);
for(const n of [-2,-1,0,1,2]) numeric(`int-${n<0?'minus-':''}${Math.abs(n)}`,'基底と数',`整数 ${n}`,BigInt(n),Z,E.decodeInt);
for(const [n,d] of [[0,1],[1,1],[-1,1],[2,1],[-2,1],[1,2],[-1,3]]) {
  numeric(`rat-${n<0?'minus-':''}${Math.abs(n)}-${d}`,'基底と数',`有理数 ${n}/${d}`,qc(n,d),Q,E.decodeRat);
}
numeric('text-a','列・補助値','文字列 a','a',T,E.decodeText,'UTF-8の97を自然数で表し、一要素列にする。');
numeric('text-lambda','列・補助値','文字列 λ','λ',T,E.decodeText,'UTF-8の二つのバイトを自然数の列として保持する。');
add('pair-nat','列・補助値','自然数1と2の固定対','(N(1),N(2))',pair(N(1),N(2)),t=>{assert.equal(E.decodeNat(t.left),1n);assert.equal(E.decodeNat(t.right),2n);});
for(const xs of [[],[0],[0,1,2]]) add(`list-${xs.length}`,'列・補助値',`自然数の${xs.length}要素列`,JSON.stringify(xs),L(xs.map(x=>N(x))),t=>equal(E.decodeList(t).map(x=>E.decodeNat(x)),xs.map(x=>BigInt(x))));
for(const [name,value] of [['false',0],['true',1]]) numeric(`bool-${name}`,'列・補助値',`真偽データ ${name}`,BigInt(value),N,E.decodeNat);
for(const n of [-1,0,1]) numeric(`ordering-${n<0?'minus-':''}${Math.abs(n)}`,'列・補助値',`比較結果 ${n}`,BigInt(n),Z,E.decodeInt);
add('option-none','列・補助値','値なし','Node(0;)',node(0));
add('option-some','列・補助値','自然数2の値あり','Node(1;N(2))',node(1,N(2)));
add('result-success','列・補助値','演算成功','Node(0;Q(1/2))',node(0,Q(qc(1,2))));
add('result-failure','列・補助値','演算失敗','Node(1;Text("zero"))。理由を保持し、零の値にしない。',node(1,T('zero')));

for(const [id,title,xs] of [['zero','0',[]],['one','1',[1]],['epsilon','ε',[0,1]],['epsilon-squared','ε²',[0,0,1]],['one-plus-epsilon','1+ε',[1,1]],['epsilon-half','ε/2',[0,[1,2]]],['general','1−2ε+(1/2)ε²',[1,-2,[1,2]]]])
  numeric(`m-${id}`,'MとF',`M多項式：${title}`,pc(xs),E.encodePolynomial,E.decodePolynomial,'定数項からの有理係数列。Mはこの全有限列の型。');
add('legacy-l','MとF','補助関係子ラベル L：0#','(k,q)=(1,0)。Mとしては係数列[0,1]へ移す。整数kは関係子の個数であり、近似添字nではない。',pair(Z(1),Q(qc(0))),t=>{assert.equal(E.decodeInt(t.left),1n);equal(E.decodeRat(t.right),qc(0));});
const fieldCases=[['zero',fc(0)],['one',fc(1)],['minus-one',fc(-1)],['epsilon',F.epsilon()],['inverse-epsilon',F.field(pc([1]),pc([0,1]))],['square-ratio',F.field(pc([0,0,1]),pc([1,1]))]];
for(const [id,value] of fieldCases) numeric(`f-${id}`,'MとF',`F：${id}`,value,E.encodeField,E.decodeField,`正規化された多項式比 ${JSON.stringify(F.fieldJSON(value))}`);
numeric('poly-degree','MとF','ε²の次数',2n,N,E.decodeNat);
numeric('valuation-negative','MとF','1/εの次数差',-1n,Z,E.decodeInt);
numeric('standard-part','MとF','st((1+ε)/(2−ε))',qc(1,2),Q,E.decodeRat,'標準部の出力値。定義域条件と計算証拠は別に検査する。');
for(const [id,a,b] of [['zero',0,0],['one',1,0],['i',0,1],['one-plus-i',1,1],['one-minus-i',1,-1]])
  numeric(`complex-${id}`,'生成複素数と生成四元数',`生成複素数 ${id}`,complex(a,b),E.encodeComplex,E.decodeComplex,'原案の行列 ((a,−b),(b,a))。全成分はF。');
for(const [id,a,b,c,d] of [['one',1,0,0,0],['i',0,1,0,0],['j',0,0,1,0],['k',0,0,0,1],['all-one',1,1,1,1]])
  numeric(`quaternion-${id}`,'生成複素数と生成四元数',`生成四元数 ${id}`,quat(a,b,c,d),E.encodeQuaternion,E.decodeQuaternion,'((a+bi),(c+di)) を z+w j と読む。各複素数は原案の行列表示。');

const typeNames=['N','Z','Q','M','F','C','H','Bool','Text','Arrow','Lambda','Proposition','Proof','Unit'];
typeNames.forEach((name,i)=>add(`type-${name.toLowerCase()}`,'型とλ構文',`型 ${name}`,`Node(${i};)`,node(i)));
const tyQ=node(2), tyN=node(0), tyF=node(4), tyI=node(19);
const typeExamples=[['list',node(14,tyQ),'List(Q)'],['pair',node(15,tyN,tyQ),'Pair(N,Q)'],['option',node(16,tyN),'Option(N)'],['function',node(17,tyQ,tyQ),'Function(Q,Q)'],['ordering',node(18),'Ordering'],['interval',tyI,'Interval'],['generator',node(20,tyN,tyI),'Generator(N,Interval)']];
for(const [id,t,description] of typeExamples) add(`type-${id}`,'型とλ構文',`型 ${description}`,description,t);
add('type-qrep','型とλ構文','補助型 QRep','Node(21;)。分母が正かつ非零の整数対。未約分を許し、正規有理数Qと区別。',node(21));
add('type-result','型とλ構文','型 Result(QRep)','Node(22;Type(QRep))。成功値と演算エラーを区別する。',node(22,node(21)));
add('qrep-four-four','基底と数','未約分の分数表示 4/4','整数二つの対。QRepAdd QHalf QHalfの正規λ出力を復号した表示に対応する。Qの正規表示1/1とは別。',pair(Z(4),Z(4)),t=>{assert.equal(E.decodeInt(t.left),4n);assert.equal(E.decodeInt(t.right),4n);});

// A deliberately small, explicitly T-typed calculation example. These local
// routines neither infer/promote a type nor add an interpreter/library API.
const tyT=node(23);
add('type-t','固定型と有限対T','型 T','Node(23;)。Fの対(a,b)にσ²=2の乗法を定める独立した型。',tyT);
const encodeT=([a,b])=>pair(E.encodeField(a),E.encodeField(b));
function decodeT(tree){
  assert.equal(tree.kind,'pair','T requires a pair of F values');
  return [E.decodeField(tree.left),E.decodeField(tree.right)];
}
const tconstant=(a,b=0)=>[fc(a),fc(b)];
function multiplyT(left,right){
  const [a,b]=left,[c,d]=right;
  return [F.fieldAdd(F.fieldMul(a,c),F.fieldMul(fc(2),F.fieldMul(b,d))),
    F.fieldAdd(F.fieldMul(a,d),F.fieldMul(b,c))];
}
for(const [id,title,value] of [
  ['zero','0',tconstant(0)],['one','1',tconstant(1)],['minus-one','−1',tconstant(-1)],['two','2',tconstant(2)],
  ['sigma','σ',tconstant(0,1)],['sigma-half','σ/2',[fc(0),F.fieldConstant(qc(1,2))]],
  ['one-plus-sigma','1+σ',tconstant(1,1)],['one-minus-sigma','1−σ',tconstant(1,-1)],
]) numeric(`t-${id}`,'固定型と有限対T',`Tの値 ${title}`,value,encodeT,decodeT,'F二つの固定対(a,b)。型Tを計算前に指定し、数列・区間生成器との統合は要求しない。');
function verifyFixedTProduct(tree){
  const fields=E.decodeList(tree);assert.equal(fields.length,4);
  const [declaredType,operation,operands,result]=fields;
  assert.equal(E.printSymbol(declaredType),E.printSymbol(tyT),'this calculation is declared in T');
  assert.equal(E.decodeText(operation),'Mul');
  const inputs=E.decodeList(operands);assert.equal(inputs.length,2);
  // Validate all input/result representations under the already fixed type.
  const left=decodeT(inputs[0]),right=decodeT(inputs[1]),claimed=decodeT(result);
  equal(multiplyT(left,right),claimed);
  return {declaredType:'T',inputs:2,resultType:'T',operation:'Mul',recomputed:true};
}
for(const [id,title,left,right,result] of [
  ['conjugate','(1,1)(1,−1)=(−1,0)',tconstant(1,1),tconstant(1,-1),tconstant(-1)],
  ['sigma-square','σ²=(2,0)',tconstant(0,1),tconstant(0,1),tconstant(2)],
]) {
  const record=L([tyT,T('Mul'),L([encodeT(left),encodeT(right)]),encodeT(result)]);
  add(`fixed-t-product-${id}`,'固定型と有限対T',`型Tで固定した積 ${title}`,
    'List(型T,演算名Mul,入力二個のList,結果T)。全成分をFとして復号し、(ac+2bd,ad+bc)を再計算する。',record,verifyFixedTProduct,
    '計算開始前の指定型Tを確認し、全入力・結果のT形成条件と、F算術による積の二成分を検査。');
}
assert.throws(()=>verifyFixedTProduct(L([tyN,T('Mul'),L([encodeT(tconstant(1)),encodeT(tconstant(1))]),encodeT(tconstant(1))])),/declared in T/);
assert.throws(()=>verifyFixedTProduct(L([tyT,T('Mul'),L([N(1),encodeT(tconstant(1))]),encodeT(tconstant(1))])),/requires a pair/);
assert.throws(()=>verifyFixedTProduct(L([tyT,T('Mul'),L([encodeT(tconstant(0,1)),encodeT(tconstant(0,1))]),encodeT(tconstant(1))])));

// NatForm's finite program language has only ReturnBool, RecurOnOnlyChild,
// and CaseOnArity. Its evaluator actually reads the saved program tree.
const natFormProgram=node(2,node(0,N(1)),node(1),node(0,N(0)));
function runNatForm(program,input){
  function evaluate(instruction,subject){
    assert.equal(instruction.kind,'pair');
    const tag=E.decodeNat(instruction.left),args=E.decodeList(instruction.right);
    if(tag===0n){assert.equal(args.length,1);const value=E.decodeNat(args[0]);assert(value===0n||value===1n);return value===1n;}
    if(tag===1n){assert.equal(args.length,0);assert.equal(subject.kind,'succ');return evaluate(program,subject.value);}
    assert.equal(tag,2n);assert.equal(args.length,3);
    const branch={zero:0,succ:1,pair:2}[subject.kind];assert.notEqual(branch,undefined);
    return evaluate(args[branch],subject);
  }
  return evaluate(program,input);
}
const natFormCases=[
  ['zero','f()',N(0),true],['successor','f(f())',N(1),true],
  ['pair','f(f()f())',pair(N(0),N(0)),false],
  ['nested-pair','f(f(f()f()))',E.succ(pair(N(0),N(0))),false],
];
add('natform-program','固定型と有限対T','指定型Nの形成検査 NatForm の有限プログラム',
  'Node(2;Node(0;真),Node(1;),Node(0;偽))。0=真偽値を返す、1=唯一の子へ同じ処理を再帰、2=子の個数0/1/2で三分岐。',natFormProgram,
  program=>{for(const [,,input,expected]of natFormCases)assert.equal(runNatForm(program,input),expected);return {specifiedType:'N',executedCases:natFormCases.length};},
  '復号したプログラム木を小実行器で解釈し、基底・一子・二子・一子内の二子を実際に判定。万能な型判別ではない。');
for(const [id,description,input,expected]of natFormCases){
  add(`natform-${id}`,'固定型と有限対T',`NatForm(${description})=${expected?'真':'偽'}`,
    'List(指定型N,NatFormプログラム,検査入力,真偽結果)。fのみ表記で二子を持つ形は自然数として拒否する。',L([tyN,natFormProgram,input,N(expected?1:0)]),
    tree=>{const fields=E.decodeList(tree);assert.equal(fields.length,4);assert.equal(E.printSymbol(fields[0]),E.printSymbol(tyN));assert.equal(E.printSymbol(fields[1]),E.printSymbol(natFormProgram));const actual=runNatForm(fields[1],fields[2]);assert.equal(actual,expected);assert.equal(E.decodeNat(fields[3]),actual?1n:0n);return {specifiedType:'N',accepted:actual};},
    '指定Nの形成条件を有限木上で再帰実行し、記録した真偽結果と照合。');
}
assert.equal(runNatForm(natFormProgram,N(4)),true);
assert.throws(()=>runNatForm(node(3),N(0)));
for(const item of [...C.BUILTINS,{name:'Identity',source:'λx.x'},{name:'FixY',source:'λg.(λx.g (x x)) (λx.g (x x))'},{name:'Application',source:'(λx.x) (λy.y)'}]) {
  const term=C.parse(item.source);
  add(`lambda-${item.name.toLowerCase()}`,'型とλ構文',`λ定義 ${item.name}`,item.source,lambda(term),t=>assert(C.alphaEqual(unlambda(t),term)),'復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。');
}
add('lambda-environment','型とλ構文','全内蔵定義環境','List((Text(名前), λ本体))。全内蔵語彙を省略なく収録。',L(C.BUILTINS.map(x=>pair(T(x.name),lambda(C.parse(x.source))))),t=>{
  const defs=E.decodeList(t);assert.equal(defs.length,C.BUILTINS.length);
  defs.forEach((x,i)=>{assert.equal(E.decodeText(x.left),C.BUILTINS[i].name);assert(C.alphaEqual(unlambda(x.right),C.parse(C.BUILTINS[i].source)));});
});

const variable=n=>node(0,N(n)), literal=(type,value)=>node(1,type,value), call=(name,...args)=>node(2,T(name),L(args));
const nz=literal(tyN,N(0)), no=literal(tyN,N(1));
const eq=(type,l,r)=>node(0,type,l,r), lt=(type,l,r)=>node(1,type,l,r);
const e=eq(tyN,no,no), propositionFalse=node(5);
add('term-variable','命題と証明','項の束縛変数零','Node(0;N(0))。型と束縛は外側の文脈に依存。',variable(0));
add('term-literal','命題と証明','自然数一の定数項','Node(1;Type(N),N(1))',no);
add('term-add-call','命題と証明','加算の呼出式','Node(2;Text(Add),List(1,1))。定義表を伴う。',call('Add',no,no));
for(const [id,title,tree] of [
  ['equal','等式 1=1',e],['less','順序 0<1',lt(tyN,nz,no)],['and','かつ',node(2,e,e)],['or','または',node(3,e,e)],
  ['implies','ならば',node(4,e,e)],['false','偽',propositionFalse],['forall','任意のnについて n=n',node(6,tyN,eq(tyN,variable(0),variable(0)))],
  ['exists','あるnについて n=0',node(7,tyN,eq(tyN,variable(0),nz))],['predicate','名前付き述語 nonzero(1)',node(8,T('nonzero'),L([no]))],
  ['not','否定：1=1 ならば偽',node(4,e,propositionFalse)]])
  add(`proposition-${id}`,'命題と証明',title,'命題構文の例。構文を保存することと真であることは別。',tree);
const n=variable(0),m=variable(1),l=variable(2);
add('proposition-associativity','命題と証明','加法結合律の全称命題','∀l:N.∀m:N.∀n:N. Add(Add(l,m),n)=Add(l,Add(m,n))',node(6,tyN,node(6,tyN,node(6,tyN,eq(tyN,call('Add',call('Add',l,m),n),call('Add',l,call('Add',m,n)))))));
const judgment=pair(L([]),e);
add('judgment','命題と証明','空の仮定から1=1を述べる判断','(仮定List,命題)',judgment);
add('proof-node-reflexivity','命題と証明','反射規則の証明節点・表示案','List(規則1,判断,規則データ,前提List)。この表示案の汎用検査器は未実装。',L([N(1),judgment,pair(tyN,no),L([])]));
add('proof-induction-data','命題と証明','自然数帰納の規則固有データ・仕様例','帰納変数番号、基底証明への参照番号、段階証明への参照番号。参照先と新鮮性検査を伴わない単独例は証明ではない。',L([N(0),N(1),N(2)]));

const interval=(a,b)=>pair(Q(a),Q(b));
for(const [id,a,b] of [['unit',qc(0),qc(1)],['sqrt2-initial',qc(0),qc(2)],['sqrt2-refined',qc(1),qc(3,2)]])
  add(`interval-${id}`,'生成ラベル・解析・計算証跡',`区間 ${A.qstr(a)} ～ ${A.qstr(b)}`,'(下端Q,上端Q)。順序条件を別に確認。',interval(a,b),t=>{equal(E.decodeRat(t.left),a);equal(E.decodeRat(t.right),b);assert(A.qcmp(a,b)<=0);});
numeric('precision-two','生成ラベル・解析・計算証跡','精度要求p=2',2n,N,E.decodeNat);
numeric('precision-width','生成ラベル・解析・計算証跡','p=2の許容誤差1/4',qc(1,4),Q,E.decodeRat);
for(const [method,title,error]of [
  ['bracket','上下端による保証',qc(1,204)],['residual','残差による保証',qc(1,288)],
]) add(`approx-value-error-${method}`,'生成ラベル・解析・計算証跡',`近似値・誤差上界の対：${title}`,
  `(要求Nの3,(近似値Qの17/12,誤差上界Qの${A.qstr(error)}))。型Tの値とは別に要求する有理応答。`,
  pair(N(3),pair(Q(qc(17,12)),Q(error))),tree=>{
    assert.equal(tree.kind,'pair');assert.equal(E.decodeNat(tree.left),3n);
    assert.equal(tree.right.kind,'pair');
    const value=E.decodeRat(tree.right.left),bound=E.decodeRat(tree.right.right);
    equal(value,qc(17,12));
    assert(A.qcmp(bound,qc(0))>=0);assert(A.qcmp(bound,qc(1,8))<=0);
    if(method==='bracket'){
      const lower=A.qdiv(qc(2),value);
      equal(lower,qc(24,17));
      assert(A.qcmp(lower,qc(0))>=0&&A.qcmp(lower,value)<=0);
      assert(A.qcmp(A.qmul(lower,lower),qc(2))<=0);
      assert(A.qcmp(A.qmul(value,value),qc(2))>=0);
      equal(bound,A.qsub(value,lower));
    }else{
      assert(A.qcmp(value,qc(1))>=0);
      equal(bound,A.qdiv(A.qabs(A.qsub(A.qmul(value,value),qc(2))),qc(2)));
    }
    return {precision:3,response:'approximation-and-error',method,value:A.qstr(value),error:A.qstr(bound),recomputed:true};
  },method==='bracket'?'有理上下端の平方挟み込み・正確な幅1/204・要求1/8以下を再計算。型Tとの一般対応は本文の手書き証明。':'q≥1と正確な残差から上界1/288・要求1/8以下を再計算。型Tとの一般対応は本文の手書き証明。');
add('qlim-parameters','生成ラベル・解析・計算証跡','数列生成ラベル qlim(0,1) のパラメータ','(Q(0),Q(1))。本体はG(q,b)(n)=q+b/(n+1)という有限処理。bを保持する実行記録であり、Φで導入する関係子ラベルと区別。',pair(Q(qc(0)),Q(qc(1))));
add('qlim-call','生成ラベル・解析・計算証跡','qlim(0,1)への入力n=1','操作呼出し。応答値は1/2。',call('qlim',literal(tyQ,Q(qc(0))),literal(tyQ,Q(qc(1))),literal(tyN,N(1))));
numeric('qlim-response','生成ラベル・解析・計算証跡','qlim(0,1)(1)の応答',qc(1,2),Q,E.decodeRat);

// Local finite checks for the explicit G -> L introduction rule. G retains b
// for execution; L retains k for arithmetic. Phi is not an additive quotient.
const encodeG=([q,b])=>pair(Q(q),Q(b));
function decodeG(tree){
  assert.equal(tree.kind,'pair','G requires a pair of rational values');
  return [E.decodeRat(tree.left),E.decodeRat(tree.right)];
}
const encodeRelation=([k,q])=>pair(Z(k),Q(q));
function decodeRelation(tree){
  assert.equal(tree.kind,'pair','L requires an integer/rational pair');
  return [E.decodeInt(tree.left),E.decodeRat(tree.right)];
}
const evaluateG=([q,b],n)=>A.qadd(q,A.qdiv(b,qc(n+1n)));
const introduceRelation=([q,b])=>[BigInt(2*A.qcmp(b,qc(0))),q];
const addRelations=([k,q],[l,r])=>[k+l,A.qadd(q,r)];
const embedRelation=([k,q])=>F.embedL(k,q);
const relationGroup='生成記録から関係子ラベルへ';
const gHalf=[qc(0),qc(1,2)],gThreeQuarters=[qc(0),qc(3,4)];
for(const [id,title,value]of [
  ['half','G(0,1/2)',gHalf],['three-quarters','G(0,3/4)',gThreeQuarters],
]) numeric(`relation-g-${id}`,relationGroup,`bを保持する生成記録 ${title}`,value,encodeG,decodeG,
  '(基準値Q,係数Q)。G(q,b)(n)=q+b/(n+1)を実行するため、bを保存する。Φの出力とは別の型。');
function verifyCommonSubsequence(tree){
  const xs=E.decodeList(tree);assert.equal(xs.length,8);
  const left=decodeG(xs[0]),right=decodeG(xs[1]);
  const [r,s,t,n,m]=xs.slice(2,7).map(x=>E.decodeNat(x));
  const value=E.decodeRat(xs[7]);
  equal(left[0],right[0]);assert(r>0n&&s>0n&&t>0n);
  assert(A.qcmp(left[1],qc(0))!==0&&A.qcmp(right[1],qc(0))!==0);
  equal(A.qdiv(left[1],right[1]),qc(r,s));
  assert.equal(n,r*t-1n);assert.equal(m,s*t-1n);
  equal(evaluateG(left,n),value);equal(evaluateG(right,m),value);
  return {indices:[n.toString(),m.toString()],parameter:t.toString(),commonValue:A.qstr(value),recomputed:true};
}
for(const t of [1n,2n,3n]){
  const n=2n*t-1n,m=3n*t-1n,value=qc(1n,4n*t);
  add(`relation-common-${t}`,relationGroup,`共通部分列 t=${t}：添字${n}と${m}で${A.qstr(value)}`,
    'List(G(0,1/2),G(0,3/4),r=2,s=3,t,n=2t−1,m=3t−1,共通値Q)。b/c=r/sと両出力を再計算。',
    L([encodeG(gHalf),encodeG(gThreeQuarters),N(2),N(3),N(t),N(n),N(m),Q(value)]),verifyCommonSubsequence,
    '記録した有限添字で比・添字対応・有理出力を検査。任意tの共通部分列定理は本文命題6.2の手書き証明。');
}
function verifyRelationIntroduction(tree){
  const xs=E.decodeList(tree);assert.equal(xs.length,2);
  const input=decodeG(xs[0]),claimed=decodeRelation(xs[1]);
  equal(introduceRelation(input),claimed);
  return {offset:A.qstr(input[1]),retainedIndex:claimed[0].toString(),base:A.qstr(claimed[1]),recomputed:true};
}
for(const [id,title,input,output]of [
  ['positive-half','Φ(G(0,1/2))=0##',gHalf,[2n,qc(0)]],
  ['positive-three-quarters','Φ(G(0,3/4))=0##',gThreeQuarters,[2n,qc(0)]],
  ['negative','Φ(G(0,−1/2))=0♭♭',[qc(0),qc(-1,2)],[-2n,qc(0)]],
  ['zero','Φ(G(2,0))=2',[qc(2),qc(0)],[0n,qc(2)]],
]) add(`relation-intro-${id}`,relationGroup,title,
  'List(生成記録G,導入先L)。Φ(G(q,b))=(2sgn(b),q)を指定規則として適用し、出力ではbを捨てて整数kを保持する。',
  L([encodeG(input),encodeRelation(output)]),verifyRelationIntroduction,
  '復号したbの符号からk=2sgn(b)を再計算。これは明示した導入規則の個別検査であり、点ごとの加法の保存を主張しない。');
for(const [id,k]of [['one-step',1n],['two-steps',2n],['four-steps',4n]])
  numeric(`relation-l-${id}`,relationGroup,`関係子ラベル (k,q)=(${k},0)`,[k,qc(0)],encodeRelation,decodeRelation,
    '整数kは関係子の個数を保つ。近似を要求する自然数nとは別の欄であり、演算後も符号だけへ圧縮しない。');
function verifyRelationAddition(tree){
  const xs=E.decodeList(tree);assert.equal(xs.length,3);
  const left=decodeRelation(xs[0]),right=decodeRelation(xs[1]),claimed=decodeRelation(xs[2]);
  equal(addRelations(left,right),claimed);
  assert(F.fieldEq(F.fieldAdd(embedRelation(left),embedRelation(right)),embedRelation(claimed)));
  return {retainedIndex:claimed[0].toString(),embeddedArithmeticChecked:true};
}
const relationZero=[0n,qc(0)],relationTwo=[2n,qc(0)],relationFour=[4n,qc(0)];
add('relation-l-addition',relationGroup,'関係子の加算 0##+0##=0####',
  'List(L(2,0),L(2,0),L(4,0))。成分加法とFへの埋込みで照合する。加算結果k=4を保持する。',
  L([encodeRelation(relationTwo),encodeRelation(relationTwo),encodeRelation(relationFour)]),verifyRelationAddition,
  '整数・有理成分の和と既存F算術を別々に再計算。一般の加法群法則は本文定理7.1の手書き証明。');
add('relation-l-order',relationGroup,'順序 0<0#<0##<0####',
  'List(L(0,0),L(1,0),L(2,0),L(4,0))。基準値が同じとき、整数kの順序がF内でも保たれる。',
  L([0n,1n,2n,4n].map(k=>encodeRelation([k,qc(0)]))),tree=>{
    const values=E.decodeList(tree).map(decodeRelation);equal(values.map(x=>x[0]),[0n,1n,2n,4n]);
    values.forEach(([,q])=>equal(q,qc(0)));
    for(let i=1;i<values.length;i++)assert.equal(F.fieldCmp(embedRelation(values[i-1]),embedRelation(values[i])),-1);
    return {strictComparisons:3,nonzeroLabelChecked:true};
  },'既存F比較で三つの厳密不等式を検査。順序保存の全称命題とは区別。');
add('relation-intro-not-additive',relationGroup,'Φ(u+u)とΦ(u)+Φ(u)は異なる',
  'List(u=G(0,1/2),点ごとの和G(0,1),再導入L(2,0),ラベルの和L(4,0))。異なる二つの経路を保持する。',
  L([encodeG(gHalf),encodeG([qc(0),qc(1)]),encodeRelation(relationTwo),encodeRelation(relationFour)]),tree=>{
    const xs=E.decodeList(tree);assert.equal(xs.length,4);
    const input=decodeG(xs[0]),sum=decodeG(xs[1]),reintroduced=decodeRelation(xs[2]),added=decodeRelation(xs[3]);
    equal(sum,[A.qadd(input[0],input[0]),A.qadd(input[1],input[1])]);
    equal(reintroduced,introduceRelation(sum));equal(added,addRelations(introduceRelation(input),introduceRelation(input)));
    assert.equal(F.fieldCmp(embedRelation(reintroduced),embedRelation(added)),-1);
    return {reintroducedIndex:reintroduced[0].toString(),addedIndex:added[0].toString(),unequal:true};
  },'一つの反例を成分算術とF比較で再計算。Φを加法準同型、または逐点加算を継承する商写像とする誤った同定を検出する。');
add('relation-rational-error',relationGroup,'(3/2)##の有理近似：p=3で出力3/2',
  'List(L(2,3/2),近似値Qの3/2,要求Nの3,有理上界Qの1/8)。厳密な差2εを零にせず、有理誤差と比較する。',
  L([encodeRelation([2n,qc(3,2)]),Q(qc(3,2)),N(3),Q(qc(1,8))]),tree=>{
    const xs=E.decodeList(tree);assert.equal(xs.length,4);
    const label=decodeRelation(xs[0]),approximation=E.decodeRat(xs[1]),p=E.decodeNat(xs[2]),bound=E.decodeRat(xs[3]);
    equal(label,[2n,qc(3,2)]);equal(approximation,label[1]);assert.equal(p,3n);equal(bound,qc(1n,2n**p));
    const difference=F.fieldSub(embedRelation(label),F.fieldConstant(approximation));
    assert(F.fieldEq(difference,embedRelation(relationTwo)));
    assert.equal(F.fieldCmp(difference,fc(0)),1);assert.equal(F.fieldCmp(difference,F.fieldConstant(bound)),-1);
    return {precision:p.toString(),exactDifference:'2epsilon',strictlyPositive:true,belowRationalBound:true};
  },'p=3の誤差だけを既存F算術で検査。全pの保証は本文命題9.6の手書き証明であり、近似の一致を厳密等値にしない。');
const relationRejections=[
  ['malformed-label','整数欄が自然数だけの不正Lを拒否','DecodeL',pair(N(2),Q(qc(0))),decodeRelation],
  ['false-introduction','Φの虚偽結果L(4,0)を拒否','Phi',L([encodeG(gHalf),encodeRelation(relationFour)]),verifyRelationIntroduction],
  ['compressed-sum','加算後にkを2へ圧縮した虚偽結果を拒否','AddL',L([encodeRelation(relationTwo),encodeRelation(relationTwo),encodeRelation(relationTwo)]),verifyRelationAddition],
];
for(const [id,title,operation,payload,verify]of relationRejections)
  add(`relation-reject-${id}`,relationGroup,title,
    'List(指定検査名,検査対象,受理しないという真偽値0)。不正な候補を成功値として扱わず、実際の局所検査で拒否を確認する。',
    L([T(operation),payload,N(0)]),tree=>{
      const xs=E.decodeList(tree);assert.equal(xs.length,3);assert.equal(E.decodeText(xs[0]),operation);assert.equal(E.decodeNat(xs[2]),0n);
      assert.throws(()=>verify(xs[1]));return {operation,expectedRejection:true,rejectionObserved:true};
    },'保存した候補を復号し、指定した局所検査が例外で拒否することを実行確認。任意のプログラムに対する万能検査ではない。');
// Appendix A: explicit geometric recurrences and decimal records. These helpers
// are finite example checkers, not new interpreter built-ins or a generic API.
const geometricDecimalGroup='等比生成記録と循環小数の読み分け';
const encodeH=([q,b,r])=>pair(Q(q),pair(Q(b),Q(r)));
function decodeH(tree){
  assert.equal(tree.kind,'pair','H requires (q,(b,r))');
  assert.equal(tree.right.kind,'pair','H requires a pair of b and r');
  const result=[E.decodeRat(tree.left),E.decodeRat(tree.right.left),E.decodeRat(tree.right.right)];
  assert(A.qcmp(result[2],qc(0))>0&&A.qcmp(result[2],qc(1))<0,'H requires 0 < r < 1');
  return result;
}
const rationalPower=(x,n)=>{assert(n>=0n);let y=qc(1);for(let i=0n;i<n;i++)y=A.qmul(y,x);return y;};
const evaluateH=([q,b,r],n)=>A.qadd(q,A.qmul(b,rationalPower(r,n)));
const introduceH=([q,b])=>[BigInt(2*A.qcmp(b,qc(0))),q];
const hCases=[
  ['third-lower','1/3への下側手続き',[qc(1,3),qc(-1,3),qc(1,10)],[qc(0),qc(3,10),qc(33,100),qc(333,1000)]],
  ['third-upper','1/3への上側手続き',[qc(1,3),qc(2,3),qc(1,10)],[qc(1),qc(2,5),qc(17,50),qc(167,500)]],
  ['third-fixed','厳密な有理数1/3を返す定数手続き',[qc(1,3),qc(0),qc(1,10)],[qc(1,3),qc(1,3),qc(1,3),qc(1,3)]],
  ['two-thirds-lower','2/3への下側手続き',[qc(2,3),qc(-2,3),qc(1,10)],[qc(0),qc(3,5),qc(33,50),qc(333,500)]],
  ['menger-volume','メンガースポンジの有限段階体積',[qc(0),qc(1),qc(20,27)],[qc(1),qc(20,27),qc(400,729),qc(8000,19683)]],
];
function verifyHTrace(tree){
  const xs=E.decodeList(tree);assert.equal(xs.length,2);
  const h=decodeH(xs[0]),states=E.decodeList(xs[1]);assert(states.length>0);
  let previous;
  states.forEach((state,i)=>{
    const fields=E.decodeList(state);assert.equal(fields.length,2);
    const n=E.decodeNat(fields[0]),value=E.decodeRat(fields[1]);assert.equal(n,BigInt(i));
    equal(value,evaluateH(h,n));
    equal(value,i===0?A.qadd(h[0],h[1]):A.qadd(h[0],A.qmul(h[2],A.qsub(previous,h[0]))));
    previous=value;
  });
  return {states:states.length,closedFormulaChecked:true,recurrenceChecked:true};
}
function verifyHIntroduction(tree){
  const xs=E.decodeList(tree);assert.equal(xs.length,2);
  const h=decodeH(xs[0]),result=decodeRelation(xs[1]);equal(introduceH(h),result);
  return {retainedIndex:result[0].toString(),base:A.qstr(result[1]),specifiedRule:'Psi',recomputed:true};
}
for(const [id,title,h,values]of hCases){
  numeric(`geometric-h-${id}`,geometricDecimalGroup,title,h,encodeH,decodeH,
    '(Q(q),(Q(b),Q(r)))。H(q,b,r)はx_0=q+b、x_{n+1}=q+r(x_n−q)を実行する記録。0<r<1を検査する。');
  add(`geometric-trace-${id}`,geometricDecimalGroup,`${title}：n=0,1,2,3の応答`,
    'List(H,各段のList(N(n),Q(value)))。保存した四段階を、q+br^nと一段の再帰式の両方で再計算する。',
    L([encodeH(h),L(values.map((value,n)=>L([N(n),Q(value)])))]),verifyHTrace,
    '四つの有理出力を二つの式で検査。任意nの式・停止・方向の一般保証は本文付録Aの手書き証明。');
  add(`geometric-intro-${id}`,geometricDecimalGroup,`${title}からΨでLへ導入`,
    'List(H,L)。Ψ(H(q,b,r))=(2sgn(b),q)という指定した導入規則を適用する。実行回数nや縮小率rをkへ移さない。',
    L([encodeH(h),encodeRelation(introduceH(h))]),verifyHIntroduction,
    '復号したHの形成条件とbの符号を調べ、導入先の整数kと有理成分qを照合。逐点加法を継承する写像ではない。');
}
// A decimal record contains spelling data only. The underscore marks the start
// of the repeating block in prose; exact value and approach direction are extra
// interpretations, never hidden fields of the repeating digit itself.
const encodeDecimal=([whole,prefix,repeat])=>L([N(whole),L(prefix.map(x=>N(x))),L(repeat.map(x=>N(x)))]);
function decodeDecimal(tree){
  const xs=E.decodeList(tree);assert.equal(xs.length,3);
  const whole=E.decodeNat(xs[0]);
  const digitList=t=>E.decodeList(t).map(x=>{const d=E.decodeNat(x);assert(d<=9n,'decimal digit out of range');return d;});
  const prefix=digitList(xs[1]),repeat=digitList(xs[2]);assert(repeat.length>0,'repeating block must be nonempty');
  return [whole,prefix,repeat];
}
const digitsInteger=digits=>digits.reduce((n,d)=>10n*n+d,0n);
function decimalExact([whole,prefix,repeat]){
  const scale=10n**BigInt(prefix.length),period=10n**BigInt(repeat.length)-1n;
  return A.qadd(qc(whole),A.qadd(qc(digitsInteger(prefix),scale),qc(digitsInteger(repeat),scale*period)));
}
function verifyDecimalExact(tree){
  const xs=E.decodeList(tree);assert.equal(xs.length,3);
  const decimal=decodeDecimal(xs[0]),claimed=E.decodeRat(xs[1]),label=decodeRelation(xs[2]);
  equal(decimalExact(decimal),claimed);equal(label,[0n,claimed]);
  assert(F.fieldEq(embedRelation(label),F.fieldConstant(claimed)));
  return {exactValue:A.qstr(claimed),relationIndex:'0',finiteRationalFormulaChecked:true};
}
const thirdDecimal=[0n,[],[3n]],twoThirdsDecimal=[0n,[],[6n]];
for(const [id,title,decimal,value]of [
  ['third','0._3',thirdDecimal,qc(1,3)],['two-thirds','0._6',twoThirdsDecimal,qc(2,3)],
]){
  numeric(`decimal-record-${id}`,geometricDecimalGroup,`循環小数の記録 ${title}`,decimal,encodeDecimal,decodeDecimal,
    'List(非負整数部N,有限非循環桁のList,非空循環桁のList)。_以降の桁を循環部とする表記規約だけを保持し、下側・上側・厳密値の読みは別に指定する。');
  add(`decimal-exact-${id}`,geometricDecimalGroup,`${title}の厳密な有理数としての読み`,
    'List(循環小数記録,厳密有理値Q,L(0,厳密有理値))。循環部に対する有限の有理式で評価し、関係子の個数は零とする。',
    L([encodeDecimal(decimal),Q(value),encodeRelation([0n,value])]),verifyDecimalExact,
    '有限の桁から有理式を再計算。循環小数記録それ自体を下側ラベルや上側ラベルとは同一視しない。');
}
function verifyDecimalPrefix(tree){
  const xs=E.decodeList(tree);assert.equal(xs.length,7);
  const decimal=decodeDecimal(xs[0]),n=E.decodeNat(xs[1]),lower=E.decodeRat(xs[2]),upper=E.decodeRat(xs[3]);
  const prefix=E.decodeNat(xs[4]),labels=E.decodeList(xs[5]).map(decodeRelation),exact=E.decodeRat(xs[6]);
  equal(decimal,thirdDecimal);assert(n>0n);equal(exact,decimalExact(decimal));
  const scale=10n**n;assert.equal(prefix,exact.n*scale/exact.d);
  equal(lower,qc(prefix,scale));equal(upper,qc(prefix+1n,scale));
  equal(lower,evaluateH(hCases[0][2],n));equal(upper,evaluateH(hCases[1][2],n));
  equal(labels,[[-2n,exact],[0n,exact],[2n,exact]]);
  for(const label of labels){
    assert.equal(F.fieldCmp(F.fieldConstant(lower),embedRelation(label)),-1);
    assert.equal(F.fieldCmp(embedRelation(label),F.fieldConstant(upper)),-1);
  }
  return {digits:n.toString(),prefix:prefix.toString(),exactValue:A.qstr(exact),distinctIndices:['-2','0','2'],strictBoundsChecked:6};
}
for(const n of [1n,2n,3n]){
  const scale=10n**n,prefix=(scale-1n)/3n;
  add(`decimal-prefix-${n}`,geometricDecimalGroup,`同じ小数${n}桁と異なるラベル：1/3`,
    'List(0._3の記録,n,下端d_n,上端u_n,接頭桁の整数,List(L(−2,1/3),L(0,1/3),L(2,1/3)),厳密値1/3)。三元が同じ有理小数区間の内側にあっても等しくはない。',
    L([encodeDecimal(thirdDecimal),N(n),Q(qc(prefix,scale)),Q(qc(prefix+1n,scale)),N(prefix),L([-2n,0n,2n].map(k=>encodeRelation([k,qc(1,3)]))),Q(qc(1,3))]),verifyDecimalPrefix,
    '切捨て桁・上下H応答を有理算術で再計算し、三つの異なるL表示に対する六つの厳密比較を既存F算術で検査。全桁の保証は付録Aの手書き証明。');
}
for(const [id,title,left,right,result]of [
  ['lower-sum','1/3下側＋2/3下側：L(−4,1)',[-2n,qc(1,3)],[-2n,qc(2,3)],[-4n,qc(1)]],
  ['mixed-sum','1/3上側＋2/3下側：厳密な1',[2n,qc(1,3)],[-2n,qc(2,3)],[0n,qc(1)]],
]) add(`decimal-${id}`,geometricDecimalGroup,title,
  'List(L左,L右,L結果)。小数の桁の見かけを使わず、指定型Lの整数・有理成分を加える。',
  L([encodeRelation(left),encodeRelation(right),encodeRelation(result)]),verifyRelationAddition,
  '成分加法とFへの埋込みを照合。下側同士ではk=−4を保持し、上側と下側ではk=0となる。');
const geometricDecimalRejections=[
  ['invalid-ratio','縮小率r=1のHを拒否','DecodeH',encodeH([qc(0),qc(1),qc(1)]),decodeH],
  ['invalid-digit','桁10を含む循環記録を拒否','DecodeDecimal',encodeDecimal([0n,[],[10n]]),decodeDecimal],
  ['empty-repeat','空の循環部を拒否','DecodeDecimal',encodeDecimal([0n,[],[]]),decodeDecimal],
  ['false-recurrence','下側手続きの虚偽出力1/3を拒否','HTrace',L([encodeH(hCases[0][2]),L([L([N(0),Q(qc(0))]),L([N(1),Q(qc(1,3))])])]),verifyHTrace],
  ['false-direction','下側Hを正方向k=2へ導入した虚偽結果を拒否','Psi',L([encodeH(hCases[0][2]),encodeRelation([2n,qc(1,3)])]),verifyHIntroduction],
  ['false-exact-label','厳密な1/3へk=−2を付した虚偽同定を拒否','DecimalExact',L([encodeDecimal(thirdDecimal),Q(qc(1,3)),encodeRelation([-2n,qc(1,3)])]),verifyDecimalExact],
];
for(const [id,title,operation,payload,verify]of geometricDecimalRejections)
  add(`geometric-decimal-reject-${id}`,geometricDecimalGroup,title,
    'List(指定検査名,検査対象,拒否予定N(0))。保存した候補を局所検査へ渡し、実際の拒否を確認する。',
    L([T(operation),payload,N(0)]),tree=>{
      const xs=E.decodeList(tree);assert.equal(xs.length,3);assert.equal(E.decodeText(xs[0]),operation);assert.equal(E.decodeNat(xs[2]),0n);
      assert.throws(()=>verify(xs[1]));return {operation,expectedRejection:true,rejectionObserved:true};
    },'形成条件または主張に反する具体的候補を拒否。未知の再帰処理の意味や停止を判定する検査ではない。');

add('sqrt2-state','生成ラベル・解析・計算証跡','√2の区間生成ラベルが指定する生成器の状態','List(段数2,下端1,上端3/2)',L([N(2),Q(qc(1)),Q(qc(3,2))]));
add('leibniz-state','生成ラベル・解析・計算証跡','Leibniz区間生成ラベルが指定する生成器の初期状態','List(段数0,下端8/3,上端4)',L([N(0),Q(qc(8,3)),Q(qc(4))]));
add('label-with-evidence','生成ラベル・解析・計算証跡','qlimの規則・引数・仕様・証拠を保持する記録','List(規則参照,引数,仕様,証拠)。qlimの応答を検査するための記録例であり、全ての数やTに要求する統合ラベルではない。証拠欄は本文命題6.1への手書き証明参照。',L([T(`qlim@paper-v${version}`),pair(Q(qc(0)),Q(qc(1))),T('Nat -> Q; response 1/(n+1); rational error contract'),node(0,T(`paper-v${version} proposition 6.1`))]));
add('label-pending-division','生成ラベル・解析・計算証跡','分離証拠を待つ除算の構文','DivLabel(P,Q)という呼出式。非零分離の条件が未充足なので、契約を満たすラベルとして実行する証拠ではない。',call('DivLabel',call('GeneratorRef',T('P')),call('GeneratorRef',T('Q'))));
add('newton-state','生成ラベル・解析・計算証跡','Newton法の一更新後の状態','List(段数1,下端4/3,上端3/2)。上下端の積は2。',L([N(1),Q(qc(4,3)),Q(qc(3,2))]),t=>{const v=E.decodeList(t);assert.equal(E.decodeNat(v[0]),1n);equal(A.qmul(E.decodeRat(v[1]),E.decodeRat(v[2])),qc(2));});
add('separation-witness','生成ラベル・解析・計算証跡','零から離れた回答の証拠データ','(要求0,区間[1,2])。端点の非零分離だけを検査し、対応する生成ラベルの全称契約は別に必要。',pair(N(0),interval(qc(1),qc(2))),t=>{assert.equal(E.decodeNat(t.left),0n);assert(A.qcmp(E.decodeRat(t.right.left),qc(0))>0);assert(A.qcmp(E.decodeRat(t.right.left),E.decodeRat(t.right.right))<=0);});
for(const [i,name] of ['zero','nonzero','unknown'].entries()) add(`zero-classification-${name}`,'生成ラベル・解析・計算証跡',`零の分類 ${name}`,`Node(${i};)。零・非零・未確定を区別する。具体的な分類の計算証拠はproof-generatorsに収録。`,node(i));
numeric('alternating-rule','生成ラベル・解析・計算証跡','交代和の有限規則データ',{family:'geometric',amplitude:'1/1',ratio:'1/2'},E.encodeJSON,E.decodeJSON,'既知familyを選ぶ有限レコード。一般契約の証明と各精度の検査は別途添付。');
add('cauchy-modulus','生成ラベル・解析・計算証跡','誤差率 μ(k)=k+2 の構文','自然数の加算呼出式。誤差率として有効かは対象の列との関係で証明する。',call('Add',variable(0),literal(tyN,N(2))));
add('cauchy-center-radius','生成ラベル・解析・計算証跡','有限区間化の中心と半径','(中心1/4,半径1/4)。幾何列s_n=2^(-n)、μ(0)=2によるJ_0=[0,1/2]の材料。',pair(Q(qc(1,4)),Q(qc(1,4))));
add('translated-label','生成ラベル・解析・計算証跡','整数平行移動を保持するラベル','(基本ラベル参照P,整数−2)。出力の値を平行移動する。',pair(T('P'),Z(-2)));
add('translation-arrow','生成ラベル・解析・計算証跡','平行移動の射 τ(P,2;−1)','List(基本ラベル参照P,始点の整数2,移動量−1)。終点の整数は1。',L([T('P'),Z(2),Z(-1)]));
add('register-state','生成ラベル・解析・計算証跡','三レジスタ機械の初期状態','(命令位置0,List(2,3,0))。入力2+3の初期状態。',pair(N(0),L([N(2),N(3),N(0)])),t=>{assert.equal(E.decodeNat(t.left),0n);equal(E.decodeList(t.right).map(x=>E.decodeNat(x)),[2n,3n,0n]);});
numeric('register-program','生成ラベル・解析・計算証跡','三レジスタ加算の全命令列',additionProgram(),E.encodeJSON,E.decodeJSON,'zero,succ,copy,jeq,haltからなる命令規約のうち四命令種を使う六命令の加算プログラム。実行履歴と検査はproof-modelsに収録。');
numeric('precision-field-epsilon','生成ラベル・解析・計算証跡','F全精度の要求値 ε',F.epsilon(),E.encodeField,E.decodeField,'正のF元を誤差要求として保持する。有理数2^(-p)による要求と区別。');
numeric('polynomial-derivative','生成ラベル・解析・計算証跡','1+x²の形式微分結果2x',pc([0,2]),E.encodePolynomial,E.decodePolynomial);
numeric('polynomial-primitive','生成ラベル・解析・計算証跡','1+x²の零定数原始関数x+x³/3',pc([0,1,0,[1,3]]),E.encodePolynomial,E.decodePolynomial);
numeric('polynomial-integral','生成ラベル・解析・計算証跡','1+x²の端点0,1での形式積分4/3',qc(4,3),Q,E.decodeRat);
const before=C.parse('(λx.x) (λy.y)'),after=C.parse('λy.y');
const step=L([N(0),L([]),lambda(before),lambda(after),L([])]);
add('beta-step','生成ラベル・解析・計算証跡','β一段の変換レコード','List(β規則0,根の位置,変換前λ項,変換後λ項,補助証拠空列)',step);
add('identity-arrow','生成ラベル・解析・計算証跡','恒等射','(状態λx.x,空履歴)',pair(lambda(after),L([])));
add('one-step-arrow','生成ラベル・解析・計算証跡','β一段の射','(初期状態,List(変換段))。一般の状態型とは外側で区別。',pair(lambda(before),L([step])));
add('lambda-position','生成ラベル・解析・計算証跡','λ本体・関数側・引数側という位置','List(N(0),N(1),N(2))。特定項での有効位置かは別に検査。',L([N(0),N(1),N(2)]));
for(const [i,name] of ['normal-form','step-limit','stopped','error'].entries()) add(`status-${name}`,'生成ラベル・解析・計算証跡',`終了状態 ${name}`,`Node(${i};) の識別部分。実履歴では付加データも保持。`,node(i));
for(const value of [null,false,true,2,'a',[1,2],{a:1}]) {
  const id=value===null?'null':Array.isArray(value)?'array':typeof value==='object'?'record':String(value);
  numeric(`json-${id}`,'汎用レコード',`JSON ${JSON.stringify(value)}`,value,E.encodeJSON,E.decodeJSON,'タグとpayloadを用いた相互変換形式。直接の数表示とは別。');
}

// Actual certificate inputs, not screenshots or abbreviated proof descriptions.
const certificateCases = [
  ['proof-nat-paths','全16命題の一般証明','verification/certificates/nat-and-paths.json',x=>{const r=checkBundle(x);assert.equal(r.theoremCount,16);return {theorems:r.theoremCount,rewriteSteps:r.rewriteSteps};}],
  ['proof-lambda','保存済みλ計算証跡全件',`verification/certificates/lambda-examples-v${release.interpreterVersion}.json`,x=>{for(const trace of x.traces){const r=C.verifyTrace(trace);assert(r.valid,r.error);}return {traces:x.traces.length};}],
  ['proof-applications','保存済み応用証拠全件',`verification/certificates/application-examples-v${version}.json`,x=>{for(const c of x.certificates){const r=A.verifyApplicationCertificate(c);assert(r.ok,r.error);}return {certificates:x.certificates.length};}],
  ['proof-field','保存済みF算術証拠全件',`verification/certificates/formal-field-examples-v${version}.json`,x=>{for(const c of x.certificates){const r=F.verifyFieldCertificate(c);assert(r.ok,r.error);}return {certificates:x.certificates.length};}],
  ['proof-generators','生成ラベル拡張の全有限証跡',`verification/certificates/generator-extensions-v${version}.json`,verifyGeneratorExtensionBundle],
  ['proof-models','レジスタ計算・条件付き等式証跡の全件',`verification/certificates/model-extensions-v${version}.json`,verifyModelExtensionBundle],
];
for(const [id,title,source,verify] of certificateCases) {
  const value=readJSON(source);
  add(id,'既存証拠の全文',title,`元ファイル ${source} の全キーと全値。基本記号ファイルに省略なし。`,()=>E.encodeJSON(value),t=>{const decoded=E.decodeJSON(t);equal(decoded,value);return verify(decoded);},'JSON値の損失のない復号後、元の意味検査器で証拠を再検査。');
}

const markdown=[`# 基本記号による完全展開例集 v${version}\n\n`,
`[構成規則と意味の説明](concept-symbols-v${version}.md) · [全概念の対応表](concept-inventory-v${version}.md)\n\n`,
'各例は型を外側に指定して読む。コードブロックとリンク先 `.f` の中は `f`、丸括弧、カンマだけで、省略記号を含まない。長い証拠は完全な個別ファイルへのリンクで示す。記号列の保存・復号と、その内容の真偽・演算法則の検査を区別する。\n'];
const manifest=[],results=[];let group='';
function readable(tree, depth=0) {
  const flat=E.printSymbol(tree);
  if(flat.length<=110 || depth>=5 || tree.kind!=='pair') return flat;
  const pad='  '.repeat(depth),inner='  '.repeat(depth+1);
  return `(\n${inner}${readable(tree.left,depth+1)},\n${inner}${readable(tree.right,depth+1)}\n${pad})`;
}
for(const entry of entries) {
  const tree=typeof entry.tree==='function'?entry.tree():entry.tree;
  const encoded=E.printSymbol(tree)+'\n';
  const relative=`${folder}/${entry.id}.f`;
  output(relative,encoded);
  const restored=E.parseSymbol(fs.readFileSync(path.join(root,relative),'utf8'));
  assert.equal(E.printSymbol(restored)+'\n',encoded);
  const semantic=entry.verify?.(restored);
  manifest.push({id:entry.id,group:entry.group,title:entry.title,path:relative,bytes:Buffer.byteLength(encoded),sha256:hash(encoded),explanation:entry.explanation,validation:entry.evidence});
  results.push({id:entry.id,status:'passed',validation:entry.evidence,checkKind:entry.verify?'syntax-and-declared-content':'syntax-roundtrip-only',...(semantic?{evidence:semantic}:{})});
  if(group!==entry.group){group=entry.group;markdown.push(`\n## ${group}\n`);}
  markdown.push(`\n### ${entry.title}\n\n${entry.explanation}\n\n[基本記号の全文：${entry.id}.f](../${relative})（${encoded.length-1}文字）\n`);
  if(encoded.length<=6000) {
    const display=readable(tree)+'\n';
    assert.equal(E.printSymbol(E.parseSymbol(display))+'\n',encoded);
    markdown.push('\n```text\n'+display+'```\n');
  }
  else markdown.push('\nこの例の全文は上記ファイルに収録しています。\n');
  markdown.push(`\n検査：${entry.evidence}\n`);
}
output(`research/concept-examples-v${version}.md`,markdown.join(''));
output(`${folder}/manifest.json`,json({format:'concept-symbol-examples/1',paperVersion:version,alphabet:'f ( ) , and whitespace',grammar:'S := f() | f(S) | (S,S)',examples:manifest}));
output(`${folder}/report.json`,json({format:'concept-symbol-verification/1',paperVersion:version,status:'passed',exampleCount:entries.length,builtinDefinitionCount:C.BUILTINS.length,certificateBundles:certificateCases.length,fixedTypeExamples:{typeTag:23,type:'T',valueExamples:8,multiplicationExamples:2,rejectedWrongType:true,rejectedMalformedInput:true,rejectedWrongProduct:true},natFormExecution:{specifiedType:'N',programExamples:1,recordedExamples:4,rejectedUnknownInstruction:true},approximationExamples:{valueErrorPairs:2,methods:['bracket','residual'],precision:3},relationLabelExamples:{structuralExamples:19,generatorRecords:2,commonSubsequenceCases:3,introductionCases:4,labelValues:3,additionCases:1,orderChains:1,nonadditivityCases:1,rationalPrecisionCases:1,rejectionCases:3,retainsExecutionCoefficient:true,retainsLabelIndex:true},geometricDecimalExamples:{structuralExamples:30,geometricRecords:5,recurrenceTraces:5,statesPerTrace:4,introductionCases:5,decimalRecords:2,exactInterpretations:2,prefixCases:3,prefixDigits:[1,2,3],additionCases:2,rejectionCases:6,retainsRecurrenceParameters:true,separatesDecimalInterpretation:true},checks:results,scope:'All examples pass syntax round trips. Type-specific or semantic checks run only where individually declared; schematic type/logical data is syntax-only. The finite NatForm program is executed on its recorded examples, explicitly T-typed products are recomputed without promotion, and two rational approximation/error pairs are checked by endpoint or residual arithmetic. The G-to-L introduction examples check finite rational common-subsequence samples, sign branches, retained label indices, nonadditivity, one rational precision request, and explicit rejections; their general theorems remain written proofs. The H/decimal examples separately check finite recurrence traces against closed formulas, the specified Psi rule, exact repeating-decimal rational values, common finite decimal-prefix bounds for distinct labels, and concrete malformed or false claims. No infinite geometric intersection or general volume theorem is machine-verified here. Decoded existing proof bundles are rechecked in their original kernels.'}));
console.log(`${checking?'Verified':'Generated and verified'} ${entries.length} complete symbol examples, ${C.BUILTINS.length} built-in lambda definitions, and ${certificateCases.length} decoded certificate bundles.`);
