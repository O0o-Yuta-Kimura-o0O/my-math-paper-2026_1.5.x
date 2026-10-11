/** English reading guide and lossless archive of the English manuscript.
 * Mathematical structures and program sources remain byte-identical shared data.
 * --check checks saved artifacts without writing them.
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
const release=JSON.parse(fs.readFileSync(path.join(root,'release.json'),'utf8'));
const edition=release.translations.en,version=release.paperVersion;
const checking=process.argv.includes('--check');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const sha=value=>crypto.createHash('sha256').update(value).digest('hex');
const json=value=>JSON.stringify(value,null,2)+'\n';
function output(name,value){
  if(checking)assert.equal(read(name),value,`saved artifact mismatch: ${name}`);
  else {fs.mkdirSync(path.dirname(path.join(root,name)),{recursive:true});fs.writeFileSync(path.join(root,name),value);}
}
const sourceManifest=JSON.parse(read(`${release.fOnlyDataDirectory}/manifest.json`));
const sourceReport=JSON.parse(read(`${release.fOnlyDataDirectory}/report.json`));
const labels=JSON.parse(read(edition.labels));
assert.equal(sourceManifest.paperVersion,version);assert.equal(sourceReport.status,'passed');
assert.equal(labels.paperVersion,version);assert.equal(labels.format,'single-f-english-labels/1');
const structures=sourceManifest.files.filter(x=>x.kind==='structural');
assert.deepEqual(Object.keys(labels.labels).sort(),structures.map(x=>x.id).sort());
assert.equal(sha(read(sourceManifest.manuscript)),sourceManifest.manuscriptSha256);
const core=read(release.interpreter).match(/<script id="lambda-core">([\s\S]*?)<\/script>/)?.[1];
assert(core);const context=vm.createContext({setTimeout});vm.runInContext(core,context,{timeout:1000});
const C=context.LambdaCore;
function verifyProof(id,tree){
  const value=E.decodeJSON(tree);
  if(id==='proof-nat-paths'){const r=checkBundle(value);assert.equal(r.theoremCount,16);return r;}
  if(id==='proof-lambda'){for(const t of value.traces){const r=C.verifyTrace(t);assert(r.valid,r.error);}return {traces:value.traces.length};}
  if(id==='proof-applications'){for(const c of value.certificates){const r=verifyApplicationCertificate(c);assert(r.ok,r.error);}return {certificates:value.certificates.length};}
  if(id==='proof-field'){for(const c of value.certificates){const r=verifyFieldCertificate(c);assert(r.ok,r.error);}return {certificates:value.certificates.length};}
  if(id==='proof-generators')return verifyGeneratorExtensionBundle(value);
  if(id==='proof-models')return verifyModelExtensionBundle(value);
  throw Error(`Unknown proof bundle: ${id}`);
}
const proofs=new Set(['proof-nat-paths','proof-lambda','proof-applications','proof-field','proof-generators','proof-models']);
const files=[],checks=[],examples=[];
function pretty(tree,depth=0){
  const flat=printFOnly(tree);
  if(flat.length<=105||depth>=5||tree.kind!=='pair')return flat;
  const pad='  '.repeat(depth),inner='  '.repeat(depth+1);
  return `f(\n${inner}${pretty(tree.left,depth+1)}\n${inner}${pretty(tree.right,depth+1)}\n${pad})`;
}
for(const source of structures){
  const text=read(source.path);assert.equal(sha(text),source.sha256);assert(/^[f()\s]+$/.test(text));
  const tree=parseFOnly(text);assert.equal(printFOnly(tree)+'\n',text);
  const label=labels.labels[source.id];assert.equal(typeof label.title,'string');assert.equal(typeof label.explanation,'string');
  const result=proofs.has(source.id)?verifyProof(source.id,tree):undefined;
  const record={id:source.id,kind:'shared-structural',path:source.path,bytes:Buffer.byteLength(text),sha256:sha(text),title:label.title};
  files.push(record);checks.push({id:source.id,status:'passed',checkKind:result?'shared-syntax-and-proof-kernel':'shared-syntax-roundtrip',...(result?{evidence:result}:{})});
  examples.push({...record,explanation:label.explanation,display:text.length<=7500?pretty(tree)+'\n':null});
}
assert.equal(read(`${release.fOnlyDataDirectory}/int-2.f`).trim(),'f(f()f(f(f())))');
const paper=read(edition.paper);
const chapters=[...paper.matchAll(/^## (\d+)\. (.+)$/gm)].map(m=>({number:Number(m[1]),title:m[2],start:m.index}));
assert.deepEqual(chapters.map(x=>x.number),Array.from({length:13},(_,i)=>i+1));
const pieces=[{number:0,title:'Title, reader introduction, and abstract',start:0},...chapters];
const recovered=[],textRows=[];
for(let i=0;i<pieces.length;i++){
  const section=pieces[i],text=paper.slice(section.start,pieces[i+1]?.start??paper.length);
  const id=`paper-${String(section.number).padStart(2,'0')}`,file=`${edition.fOnlyDataDirectory}/${id}.f`;
  const symbols=printFOnly(E.encodeText(text))+'\n';assert(/^[f()\s]+$/.test(symbols));output(file,symbols);
  const decoded=E.decodeText(parseFOnly(read(file)));assert.equal(decoded,text);recovered.push(decoded);
  const record={id,kind:'english-manuscript-text',title:section.title,path:file,bytes:Buffer.byteLength(symbols),sha256:sha(symbols),source:edition.paper,sourceStart:section.start,sourceEnd:section.start+text.length,sourceBytes:Buffer.byteLength(text),sourceSha256:sha(text),...(section.number===13?{endmatterIncluded:['Appendix A','Appendix B','Related work','References']}:{} )};
  files.push(record);textRows.push(record);checks.push({id,status:'passed',checkKind:'lossless-english-text-recovery-not-formal-proof'});
}
assert.equal(recovered.join(''),paper);
const programTitles={
  'program-applications':'Rational arithmetic, generators, computation traces, and calculus',
  'program-formal-field':'Polynomial and F arithmetic',
  'program-equational-checker':'Equational and induction proof checker',
  'program-lambda-core':'Lambda kernel and computation-trace replay',
  'program-generator-extensions':'Interval-label extensions and finite-response checking',
  'program-model-extensions':'Register machine and conditional equational proofs',
  'program-concept-examples':'Structural examples, NatForm, fixed-type T products, G/H introductions, decimal interpretations, and finite pi evidence checks',
};
const programs=sourceManifest.files.filter(x=>x.kind==='program-source-text');
assert.deepEqual(programs.map(x=>x.id).sort(),Object.keys(programTitles).sort());
for(const source of programs){
  const symbols=read(source.path);assert.equal(sha(symbols),source.sha256);assert(/^[f()\s]+$/.test(symbols));
  const decoded=E.decodeText(parseFOnly(symbols));
  assert.equal(decoded,source.selection?core:read(source.source));assert.equal(sha(decoded),source.sourceSha256);
  files.push({...source,kind:'shared-program-source-text',title:programTitles[source.id]});
  checks.push({id:source.id,status:'passed',checkKind:'lossless-shared-source-recovery-not-lambda-port'});
}
function chapterOf(id){
  if(id.startsWith('nat-')||/^lambda-(add|mul|succ|pred|sub|iszero|leq|eqnat|zero|one|two|three|four|n[0-4]|[0-4])$/.test(id))return 3;
  if(/^(int-|sign-|lambda-z)/.test(id))return 4;
  if(/^(rat-|qrep-|lambda-q)/.test(id))return 5;
  if(id.startsWith('geometric-'))return 6;
  if(id.startsWith('decimal-')||id.startsWith('pi-'))return 9;
  if(id.startsWith('qlim-')||id==='label-with-evidence'||/^relation-(g-|common-|intro-(positive-|negative$|zero$))/.test(id))return 6;
  if(id==='relation-rational-error')return 9;
  if(id.startsWith('relation-'))return 7;
  if(id==='legacy-l')return 7;
  if(/^(m-|f-|complex-|quaternion-|t-|fixed-t-product-|poly-degree|valuation-|standard-part)/.test(id))return 8;
  if(/^(interval-|precision-|approx-value-error-|sqrt2-|leibniz-|polynomial-|identity-arrow|one-step-arrow|newton-|separation-|zero-classification-|alternating-|cauchy-|translated-label|translation-arrow|label-pending-)/.test(id))return 9;
  if(/^(register-|term-|proposition-|judgment|proof-|beta-|lambda-position|status-|json-)/.test(id))return 10;
  return 2;
}
const notes={
  1:'Combine the same f form finitely many times. Share the reading rules for a base, one child, and two children.',
  2:'Specify the type before calculation and keep numerical inputs and results in that type. NatForm recursively checks only the formation conditions for the specified type N and rejects shapes with two children. It does not infer or promote types. Tags for transmitting mixed types also use the common f notation.',
  3:'Add one outer f at a time. The lambda bodies of operations also return to trees in the same notation.',
  4:'The two components are a nonnegative/negative sign and a natural-number magnitude.',
  5:'Keep an integer numerator and denominator. Canonical Q has a positive denominator, is reduced, and represents zero as 0/1. The auxiliary QRep permits unreduced fractions.',
  6:'G(q,b) is a generation record retaining the coefficient b for execution. Check finite samples of the common subsequence when b/c=r/s, then use the separate introduction rule Φ(G(q,b))=(2sgn(b),q) to obtain a relation label. Positive b gives q##. Distinguish the recursion count n from the integer relation-operator index k retained in the label. Appendix A adds finite H(q,b,r) recurrence responses and the separate introduction rule Psi.',
  7:'Keep componentwise addition and order on relation labels L(k,q). The equation 0##+0##=0#### retains k=4 instead of compressing it to its sign. Pointwise addition of generation records differs from label addition: Φ(u+u) and Φ(u)+Φ(u) are unequal. The current M consists of all finite polynomials described in the next section.',
  8:'Construct M-polynomials as rational coefficient lists, their ratios F, generative complex numbers as matrices, and generative quaternions as pairs of generative complex numbers. Then define multiplication with σ²=2 on pairs of F values in type T, and show products whose inputs and results all have the specified type T.',
  9:'Intervals, precision requests, generator states, and finite traces are represented by numbers and their combinations. Approximation is a separate operation requested when needed. A concrete example checks that the exact difference 2ε for q## lies below a rational error bound; agreement in approximation is not exact equality, and numbers need not carry a unified label combining them with a generator. Appendix A separates a repeating-decimal record from exact, lower, and upper interpretations; shared finite prefix bounds do not identify their distinct exact values. For pi in Appendix B, rule references, finite recurrence, membership witnesses, interval responses, and locatedness examples use the same f-only syntax.',
  10:'Distinguish proposition syntax from proof data. All stored proof bundles are included without omissions and rechecked using their corresponding kernels.',
  11:'The complete text in Part II retains the distinction between refuted claims and unresolved questions.',
  12:'Distinguish syntax recovery, proof replay by the applicable checker, and the status of written general proofs.',
  13:'The complete text in Part II retains the remaining research tasks and Appendix B on surreal numbers and the exact pi specification. A uniform notation does not resolve those tasks by itself.',
};
const lines=[`# Appendix: Following This Manuscript Using f Alone — v${version} (English)\n\n`,
  `First look at the symbol strings. They all use the same nested f form. The [English manuscript](../${edition.paper}) explains their construction, numerical interpretation, computation, and proofs one step at a time.\n\n`,
  'The parentheses belonging to f remain as scope delimiters. Commas and separate pair parentheses disappear. Zero direct children denote the base, one denotes a unary construction, and two denote a pair. Spaces and line breaks may be removed.\n\n',
  'For example, the integer two combines its sign and magnitude in one form:\n\n```text\nf(f()f(f(f())))\n```\n\n',
  '**Part I follows the structure of numbers, syntax, programs, and evidence. Part II recovers the complete English manuscript, including its explanations and written proofs.** Text recovery is not formal verification of those written proofs. Part III recovers the shared implementation sources in their original language. Specify the numerical type before calculation and read numerical inputs and results in that type; no automatic type inference or promotion is performed. See §§2.6–2.8 of the English manuscript for the reading rules.\n\n',
  `The mathematical symbol files and program archives are shared byte-for-byte with the [Japanese appendix](../${release.fOnlyAppendix}). The English prose archive is separate, so decoding Part II recovers the English edition itself. The detailed [concept guide (Japanese)](../${release.concepts}) and [coverage ledger (Japanese)](../${release.fOnlyCoverage}) remain available.\n\n`,
  '## I. Following the structures\n\n### Entrance: from natural numbers to generative quaternions and finite pairs in T\n\nConstruct the numbers and operations needed using the same nested f form. T is an independent extension using pairs of F values, not an automatic promotion from generative quaternions. First read each value in its specified type, then follow the complete examples in manuscript order.\n\n'];
for(const id of ['nat-0','nat-1','nat-2','int-2','rat-1-2','m-epsilon-squared','f-square-ratio','complex-one-plus-i','quaternion-all-one','t-sigma','t-two','t-minus-one']){
  const item=examples.find(x=>x.id===id);assert(item?.display);lines.push(`**${item.title}**\n\n\`\`\`text\n${item.display}\`\`\`\n\n`);
}
for(const section of chapters){
  lines.push(`\n### ${section.number}. ${section.title}\n\n${notes[section.number]}\n\n`);
  if(section.number===1)lines.push('```text\nf()\n```\n\n```text\nf(f())\n```\n\n```text\nf(f()f())\n```\n\n');
  for(const item of examples.filter(x=>chapterOf(x.id)===section.number)){
    lines.push(`**${item.title}** — [complete symbol string](../${item.path})\n\n${item.explanation}\n\n`);
    if(item.display)lines.push('```text\n'+item.display+'```\n\n');
    else lines.push(`The linked file contains the complete string (${item.bytes-1} characters), without ellipses or abbreviations.\n\n`);
  }
}
lines.push('\n## II. Complete English manuscript archive\n\nEach file encodes the UTF-8 bytes of the corresponding text as a list of unary natural numbers, then uses the common f notation. Decode and concatenate the pieces in order to recover the entire English file, from its title and translation note through Appendices A and B, related work, and references after Chapter 13. This is reversible text storage, distinct from structural mathematical data and proof checking.\n\n| Manuscript part | Complete f-only file |\n|---|---|\n');
for(const item of textRows)lines.push(`| ${item.title}${item.id==='paper-13'?', Appendices A and B, related work, and references':''} | [${item.id}.f](../${item.path}) |\n`);
lines.push('\n## III. Complete implementation-source archives\n\nThese shared files recover the original implementation sources. Existing comments and metadata are preserved. Source recovery does not turn JavaScript arithmetic into pure lambda reduction.\n\n| Implementation | Complete f-only file |\n|---|---|\n');
for(const item of programs)lines.push(`| ${programTitles[item.id]} | [${item.id}.f](../${item.path}) |\n`);
lines.push(`\nValidation: [file manifest](../${edition.fOnlyDataDirectory}/manifest.json), [recovery and proof-replay report](../${edition.fOnlyDataDirectory}/report.json).\n`);
output(edition.fOnlyAppendix,lines.join(''));
output(`${edition.fOnlyDataDirectory}/manifest.json`,json({format:'single-f-english-appendix/1',paperVersion:version,language:'en',manuscript:edition.paper,manuscriptSha256:sha(paper),manuscriptBytes:Buffer.byteLength(paper),sharedSourceManifest:`${release.fOnlyDataDirectory}/manifest.json`,labelsSha256:sha(read(edition.labels)),files}));
output(`${edition.fOnlyDataDirectory}/report.json`,json({format:'single-f-english-verification/1',paperVersion:version,language:'en',status:'passed',structuralCount:structures.length,completeProofBundles:proofs.size,textSections:textRows.length,programSources:programs.length,completeManuscriptRecovered:true,sourceDeclaredChecks:sourceReport.sourceDeclaredChecks,checks,scope:'English prose is losslessly archived. Shared mathematical structures and proof bundles retain their original semantics and proof status. The local G/H-to-L, decimal-interpretation, and finite pi witness/bracket checks declared by the shared source are preserved as records, not rerun as a new general theorem here; written general proofs are not newly formalized by text encoding.'}));
console.log(`${checking?'Verified':'Generated and verified'} English appendix: ${structures.length} shared structures, ${proofs.size} rechecked proof bundles, ${textRows.length} English text sections, ${programs.length} shared program sources.`);
