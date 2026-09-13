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
add('legacy-l','MとF','補助表示 L：0#','旧(k,a)=(1,0)。Mとしては係数列[0,1]へ移す。',pair(Z(1),Q(qc(0))),t=>{assert.equal(E.decodeInt(t.left),1n);equal(E.decodeRat(t.right),qc(0));});
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
add('qlim-parameters','生成ラベル・解析・計算証跡','数列生成ラベル qlim(0,1) のパラメータ','(Q(0),Q(1))。本体は本文のa+b/(n+1)という再帰的有限処理。',pair(Q(qc(0)),Q(qc(1))));
add('qlim-call','生成ラベル・解析・計算証跡','qlim(0,1)への入力n=1','操作呼出し。応答値は1/2。',call('qlim',literal(tyQ,Q(qc(0))),literal(tyQ,Q(qc(1))),literal(tyN,N(1))));
numeric('qlim-response','生成ラベル・解析・計算証跡','qlim(0,1)(1)の応答',qc(1,2),Q,E.decodeRat);
add('sqrt2-state','生成ラベル・解析・計算証跡','√2の区間生成ラベルが指定する生成器の状態','List(段数2,下端1,上端3/2)',L([N(2),Q(qc(1)),Q(qc(3,2))]));
add('leibniz-state','生成ラベル・解析・計算証跡','Leibniz区間生成ラベルが指定する生成器の初期状態','List(段数0,下端8/3,上端4)',L([N(0),Q(qc(8,3)),Q(qc(4))]));
add('label-with-evidence','生成ラベル・解析・計算証跡','規則・引数・仕様・証拠を保持するラベル','List(規則参照,引数,仕様,証拠)。証拠欄は本文命題6.1への手書き証明参照であり、この構造例を一般証明検査済みとはしない。',L([T('qlim@paper-v1.5.4'),pair(Q(qc(0)),Q(qc(1))),T('Nat -> Q; response 1/(n+1); rational error contract'),node(0,T('paper-v1.5.4 proposition 6.1'))]));
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
output(`${folder}/manifest.json`,json({format:'concept-symbol-examples/1',paperVersion:version,alphabet:'f ( ) , and whitespace',grammar:'T := f() | f(T) | (T,T)',examples:manifest}));
output(`${folder}/report.json`,json({format:'concept-symbol-verification/1',paperVersion:version,status:'passed',exampleCount:entries.length,builtinDefinitionCount:C.BUILTINS.length,certificateBundles:certificateCases.length,checks:results,scope:'All examples pass syntax round trips. Type-specific or semantic checks run only where individually declared; schematic type/logical data is syntax-only. Decoded existing proof bundles are rechecked in their original kernels.'}));
console.log(`${checking?'Verified':'Generated and verified'} ${entries.length} complete symbol examples, ${C.BUILTINS.length} built-in lambda definitions, and ${certificateCases.length} decoded certificate bundles.`);
