/** The single-f appendix: structural encodings first, lossless source archive
 * second. Text archival is explicitly not a formalization of handwritten proofs.
 * --check is read-only and verifies every saved symbol file and source recovery.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import * as E from '../verification/concept-codec.mjs';
import {printFOnly,parseFOnly} from '../verification/f-only-codec.mjs';
import {checkBundle} from '../verification/equational-checker.mjs';
import {verifyApplicationCertificate} from '../verification/applications.mjs';
import {verifyFieldCertificate} from '../verification/formal-field.mjs';
import {verifyGeneratorExtensionBundle} from '../verification/generator-extensions.mjs';
import {verifyModelExtensionBundle} from '../verification/model-extensions.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const config=JSON.parse(fs.readFileSync(path.join(root,'release.json'),'utf8'));
const version=config.paperVersion,folder=config.fOnlyDataDirectory;
assert(folder && config.fOnlyAppendix && config.conceptDataDirectory);
const check=process.argv.includes('--check');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const json=x=>JSON.stringify(x,null,2)+'\n';
function output(name,text){
  if(check) assert.equal(read(name),text,`saved artifact mismatch: ${name}`);
  else {fs.mkdirSync(path.dirname(path.join(root,name)),{recursive:true});fs.writeFileSync(path.join(root,name),text);}
}
const sourceManifest=JSON.parse(read(`${config.conceptDataDirectory}/manifest.json`));
const sourceReport=JSON.parse(read(`${config.conceptDataDirectory}/report.json`));
assert.equal(sourceManifest.paperVersion,version);assert.equal(sourceReport.paperVersion,version);assert.equal(sourceReport.status,'passed');
assert.equal(sourceManifest.examples.length,sourceReport.exampleCount);
assert.deepEqual(sourceManifest.examples.map(x=>x.id).sort(),sourceReport.checks.map(x=>x.id).sort());
assert(sourceReport.checks.every(x=>x.status==='passed'));
const html=read(config.interpreter),lambdaSource=html.match(/<script id="lambda-core">([\s\S]*?)<\/script>/)?.[1];
assert(lambdaSource);const context=vm.createContext({setTimeout});
vm.runInContext(lambdaSource,context,{timeout:1000});const C=context.LambdaCore;
const manifest=[],results=[],allExamples=[];

function pretty(tree,depth=0){
  const flat=printFOnly(tree);
  if(flat.length<=105 || depth>=5 || tree.kind!=='pair')return flat;
  const pad='  '.repeat(depth),inner='  '.repeat(depth+1);
  return `f(\n${inner}${pretty(tree.left,depth+1)}\n${inner}${pretty(tree.right,depth+1)}\n${pad})`;
}
function writeTree(id,tree,metadata,verify){
  assert(/^[a-z0-9-]+$/.test(id));assert(!manifest.some(x=>x.id===id));
  const symbols=printFOnly(tree)+'\n',file=`${folder}/${id}.f`;
  assert(/^[f()\s]+$/.test(symbols));
  output(file,symbols);
  const restored=parseFOnly(read(file));
  assert.equal(E.printSymbol(restored),E.printSymbol(tree),`${id}: constructor tree changed`);
  const evidence=verify?.(restored);
  const record={id,path:file,bytes:Buffer.byteLength(symbols),sha256:sha(symbols),...metadata};
  manifest.push(record);results.push({id,status:'passed',checkKind:metadata.checkKind,...(evidence?{evidence}:{})});
  return {record,display:symbols.length<=7500?pretty(restored)+'\n':null};
}
function verifyProof(id,tree){
  const value=E.decodeJSON(tree);
  if(id==='proof-nat-paths'){const r=checkBundle(value);assert.equal(r.theoremCount,16);return {theorems:16,rewriteSteps:r.rewriteSteps};}
  if(id==='proof-lambda'){for(const trace of value.traces){const r=C.verifyTrace(trace);assert(r.valid,r.error);}return {traces:value.traces.length};}
  if(id==='proof-applications'){for(const c of value.certificates){const r=verifyApplicationCertificate(c);assert(r.ok,r.error);}return {certificates:value.certificates.length};}
  if(id==='proof-field'){for(const c of value.certificates){const r=verifyFieldCertificate(c);assert(r.ok,r.error);}return {certificates:value.certificates.length};}
  if(id==='proof-generators')return verifyGeneratorExtensionBundle(value);
  if(id==='proof-models')return verifyModelExtensionBundle(value);
  throw Error(`unknown proof bundle ${id}`);
}
const proofIds=new Set(['proof-nat-paths','proof-lambda','proof-applications','proof-field','proof-generators','proof-models']);
const verifiedProofIds=new Set();
for(const source of sourceManifest.examples){
  const old=read(source.path);assert.equal(sha(old),source.sha256);
  const item=writeTree(source.id,E.parseSymbol(old),{
    kind:'structural',title:source.title,source:source.path,originalValidation:source.validation,
    checkKind:proofIds.has(source.id)?'tree-isomorphism-and-original-proof-kernel':'tree-isomorphism',
  },proofIds.has(source.id)?t=>{const result=verifyProof(source.id,t);verifiedProofIds.add(source.id);return result;}:undefined);
  allExamples.push({...source,...item});
}
assert.deepEqual([...verifiedProofIds].sort(),[...proofIds].sort(),'all expected proof bundles must actually be rechecked');
assert.equal(read(`${folder}/int-2.f`).trim(),'f(f()f(f(f())))','the author integer-two example');

// Every byte of the new manuscript, including preface, proofs and references.
// Chapter splitting changes no content; the decoded pieces concatenate exactly.
const paper=read(config.paper);
const chapterStarts=[...paper.matchAll(/^## (\d+)\. (.+)$/gm)].map(m=>({number:Number(m[1]),title:m[2],start:m.index}));
assert.deepEqual(chapterStarts.map(x=>x.number),Array.from({length:13},(_,i)=>i+1));
const pieces=[{number:0,title:'表紙・付録への案内・要旨',start:0},...chapterStarts];
const textRows=[],decodedPieces=[];
for(let i=0;i<pieces.length;i++){
  const section=pieces[i],text=paper.slice(section.start,pieces[i+1]?.start??paper.length);
  const id=`paper-${String(section.number).padStart(2,'0')}`;
  const item=writeTree(id,E.encodeText(text),{
    kind:'manuscript-text',title:section.title,source:config.paper,sourceStart:section.start,
    ...(section.number===13?{endmatterIncluded:['付録A','関連研究','参考文献']}:{}),
    sourceEnd:section.start+text.length,sourceBytes:Buffer.byteLength(text),sourceSha256:sha(text),
    encoding:'UTF-8 bytes as unary natural list, then the single-f constructor',
    checkKind:'lossless-text-recovery-not-formal-proof',
  },tree=>{const decoded=E.decodeText(tree);assert.equal(decoded,text);decodedPieces.push(decoded);return {sourceBytes:Buffer.byteLength(text)};});
  textRows.push({...section,...item});
}
assert.equal(decodedPieces.join(''),paper,'the complete manuscript must be recovered without omissions');

const programs=[
  ['program-applications','有理算術・生成器・計算証跡・解析','verification/applications.mjs',null],
  ['program-formal-field','多項式とFの算術','verification/formal-field.mjs',null],
  ['program-equational-checker','等式・帰納証明検査器','verification/equational-checker.mjs',null],
  ['program-lambda-core','λ計算核と計算証跡の再検査',config.interpreter,lambdaSource],
  ['program-generator-extensions','区間生成ラベルの拡張と有限応答検査','verification/generator-extensions.mjs',null],
  ['program-model-extensions','レジスタ機械と条件付き等式証跡の検査','verification/model-extensions.mjs',null],
  ['program-concept-examples','構造例・NatForm・型Tの積・G/Hの導入・循環小数解釈の有限検査','scripts/generate-concepts.mjs',null],
];
const programRows=[];
for(const [id,title,source,extracted] of programs){
  const text=extracted??read(source);
  const item=writeTree(id,E.encodeText(text),{
    kind:'program-source-text',title,source,sourceBytes:Buffer.byteLength(text),sourceSha256:sha(text),
    ...(extracted?{selection:'script#lambda-core'}:{}),
    checkKind:'lossless-source-recovery-not-pure-lambda-port',
  },tree=>{assert.equal(E.decodeText(tree),text);return {sourceBytes:Buffer.byteLength(text)};});
  programRows.push({title,...item});
}

const lines=[
  `# 付録：fだけでたどる本論文 — v${version}\n\n`,
  'まず記号列を眺めてほしい。ここに現れるのは、入れ子になった同じ `f` の形である。[本文](../'+config.paper+')は、その組み方・数としての読み方・計算・証明を、一つずつ噛み砕いて説明する。\n\n',
  'f自身の括弧を範囲の区切りとして残し、カンマと対専用の括弧を使わない。直下の内容が零個なら基底、一個なら一段の構成、二個なら左右の対と読む。空白と改行はなくしてもよい。\n\n',
  '例えば整数の二は、符号と自然数の対を次の一つの形にする。\n\n',
  '```text\nf(f()f(f(f())))\n```\n\n',
  '**Iは数・構文・実プログラム・証拠の構造を直接たどる部分、IIは説明文と手書き証明を含む本文全文を復元する部分である。** IIの文字列保存は、手書き証明を新しく形式検証したという意味ではない。計算開始前に型を指定し、全入力と結果をその型で読む。型の自動推論・自動昇格は行わない。読むための詳しい規則は[本文の第2.6–2.8節](../'+config.paper+')、[概念説明](../'+config.concepts+')、[章別対応表](../'+config.fOnlyCoverage+')に置いた。\n\n',
  '## I. 構造をたどる\n\n',
];
lines.push('### 入口：自然数から生成四元数、有限対Tへ\n\n同じfの入れ子を使い、必要な数と演算を構成する。TはFの対として独立に加える拡張例であり、生成四元数の次へ自動昇格する型ではない。まず各値の指定型を見て、その後で本文章順の全例へ進んでほしい。\n\n');
for(const id of ['nat-0','nat-1','nat-2','int-2','rat-1-2','m-epsilon-squared','f-square-ratio','complex-one-plus-i','quaternion-all-one','t-sigma','t-two','t-minus-one']){
  const item=allExamples.find(e=>e.id===id);assert(item?.display);
  lines.push(`**${item.title}**\n\n`,'```text\n'+item.display+'```\n\n');
}
function chapterOf(e){
  const id=e.id;
  if(id.startsWith('nat-') || /^lambda-(add|mul|succ|pred|sub|iszero|leq|eqnat|zero|one|two|three|four|n[0-4]|[0-4])$/.test(id))return 3;
  if(id.startsWith('int-')||id.startsWith('sign-')||id.startsWith('lambda-z'))return 4;
  if(id.startsWith('rat-')||id.startsWith('qrep-')||id.startsWith('lambda-q'))return 5;
  if(id.startsWith('geometric-'))return 6;
  if(id.startsWith('decimal-'))return 9;
  if(id.startsWith('qlim-')||id==='label-with-evidence'||/^relation-(g-|common-|intro-(positive-|negative$|zero$))/.test(id))return 6;
  if(id==='relation-rational-error')return 9;
  if(id.startsWith('relation-'))return 7;
  if(id==='legacy-l')return 7;
  if(/^(m-|f-|complex-|quaternion-|t-|fixed-t-product-|poly-degree|valuation-|standard-part)/.test(id))return 8;
  if(/^(interval-|precision-|approx-value-error-|sqrt2-|leibniz-|polynomial-|identity-arrow|one-step-arrow|newton-|separation-|zero-classification-|alternating-|cauchy-|translated-label|translation-arrow|label-pending-)/.test(id))return 9;
  if(id.startsWith('register-'))return 10;
  if(/^(term-|proposition-|judgment|proof-|beta-|lambda-position|status-|json-)/.test(id))return 10;
  return 2;
}
const shortNotes={
  1:'同じfの形を、有限回組み合わせる。基底・一段・二つの内容という読み方を共有する。',
  2:'計算開始前に型を指定し、全入力と結果を固定する。NatFormは指定Nの形成条件だけを再帰検査し、二子の形を拒否する。型を推論・昇格する手続きではない。',
  3:'基底の外側にfを一つずつ加える。演算のλ本体も同じ記号の木へ戻る。',
  4:'非負・負の符号と、大きさの自然数を二つの内容として持つ。',
  5:'分子と分母の整数を持つ。分母は正、既約、零は0/1とする。',
  6:'G(q,b)は係数bを保持する実行記録である。b/c=r/sのときの共通部分列を有限添字で照合し、別の導入規則Φ(G(q,b))=(2sgn(b),q)で関係子ラベルを得る。b>0の導入先はq##。近似の添字nと、導入先で保持する関係子の整数kを区別する。付録AのH(q,b,r)についても、有限の再帰応答と別の導入規則Ψを照合する。',
  7:'関係子ラベルL(k,q)の成分加法と順序を保つ。0##+0##=0####であり、結果のk=4を符号だけへ圧縮しない。生成記録の点ごとの加法とラベルの加法は別で、Φ(u+u)とΦ(u)+Φ(u)は異なる。現在のMは次章の全有限多項式である。',
  8:'有理係数の列としてのM多項式、その分数F、生成複素数の行列、生成複素数二つの対としての生成四元数を構成する。さらにF二つの対Tへσ²=2の乗法を定め、Tに固定した積の入力と結果を示す。',
  9:'区間・精度・状態・有限履歴も、数とその組み合わせで表す。近似は必要なときの別操作である。q##の厳密な差2εが有理誤差内に入る具体例を検査するが、近似の一致を厳密な等値とせず、全ての数に生成器との統合ラベルを要求しない。付録Aの循環小数は記録と読みを分け、厳密値・下側・上側に同じ有限接頭桁があっても等値とはしない。',
  10:'命題の形と証明の形を分ける。全16命題と保存済みの各証拠束も省略せず収録する。',
  11:'確定反例と未確定事項の区別は本文に記し、その全文をIIに保持する。',
  12:'個別の構文往復、元の検査器による証拠再検査、手書き証明の状態を区別する。',
  13:'残る課題を含む本文の全文はIIで復元できる。記号を統一しても、課題を解決済みに変更しない。',
};
for(const section of chapterStarts){
  lines.push(`\n### ${section.number}. ${section.title}\n\n${shortNotes[section.number]}\n\n`);
  if(section.number===1){
    lines.push('```text\nf()\n```\n\n```text\nf(f())\n```\n\n```text\nf(f()f())\n```\n\n');
  }
  for(const item of allExamples.filter(e=>chapterOf(e)===section.number)){
    lines.push(`**${item.title}** — [完全な記号列](../${item.record.path})\n\n`);
    if(item.display){
      assert.equal(printFOnly(parseFOnly(item.display))+'\n',read(item.record.path));
      lines.push('```text\n'+item.display+'```\n\n');
    }else lines.push(`全文は上記ファイルに収録（${item.record.bytes-1}文字）。ファイル内に省略記号はない。\n\n`);
  }
}
lines.push('\n## II. 本文全文の保存\n\n',
  '各ファイルは、本文の該当部分をUTF-8のバイト列として自然数の列へ戻し、さらに同じfの形にしたものである。第13章後の付録A・関連研究・参考文献も含め、表紙から最後までを保持し、順番に復号して連結すると本文ファイルの全内容に一致する。これは文章の可逆保存であり、Iの数学的なデータ構造や証拠形式とは区別する。\n\n',
  '| 本文の範囲 | fだけの全文 |\n|---|---|\n');
for(const item of textRows)lines.push(`| ${item.number?`${item.number}. `:''}${item.title}${item.number===13?'、付録A、関連研究、参考文献':''} | [${item.record.id}.f](../${item.record.path}) |\n`);
lines.push('\n## III. 実行定義の全文保存\n\n',
  '数や証拠の操作名が参照する既存の実行定義も、同じ文字列保存の規約で収録する。復号後は元の言語のプログラムである。JavaScriptの算術を純粋なλ簡約へ移植した、という意味ではない。\n\n',
  '| 実行定義 | fだけの全文 |\n|---|---|\n');
for(const item of programRows)lines.push(`| ${item.title} | [${item.record.id}.f](../${item.record.path}) |\n`);
lines.push(`\n検査記録：[全ファイルと保存範囲](../${folder}/manifest.json)、[復号・証拠再検査](../${folder}/report.json)。\n`);
output(config.fOnlyAppendix,lines.join(''));
output(`${folder}/manifest.json`,json({format:'single-f-appendix/1',paperVersion:version,alphabet:'f ( ) and whitespace; no comma or standalone pair parentheses',grammar:'U := f() | f(U) | f(UU)',structuralCount:allExamples.length,manuscript:config.paper,manuscriptSha256:sha(paper),manuscriptBytes:Buffer.byteLength(paper),files:manifest}));
output(`${folder}/report.json`,json({format:'single-f-verification/1',paperVersion:version,status:'passed',structuralCount:allExamples.length,completeProofBundles:verifiedProofIds.size,textSections:textRows.length,programSources:programRows.length,completeManuscriptRecovered:true,sourceDeclaredChecks:{fixedTypeExamples:sourceReport.fixedTypeExamples,natFormExecution:sourceReport.natFormExecution,approximationExamples:sourceReport.approximationExamples,relationLabelExamples:sourceReport.relationLabelExamples,geometricDecimalExamples:sourceReport.geometricDecimalExamples},checks:results,scope:'The constructor mapping is reversible. The exact constructor trees of the source NatForm, fixed-T, approximation/error, and G-to-L, H-to-L, and decimal-interpretation examples are preserved; their declared execution checks run in generate-concepts. Structural proof bundles are rechecked by the original kernels; source text round trips are archival, not formal proof verification.'}));
console.log(`${check?'Verified':'Generated and verified'} single-f appendix: ${allExamples.length} structures, ${verifiedProofIds.size} proof bundles, ${textRows.length} complete manuscript sections, ${programRows.length} program sources.`);
