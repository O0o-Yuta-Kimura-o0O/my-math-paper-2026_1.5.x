/** Structural translation QA, not a proof of semantic translation equivalence.
 * The mathematical prose has also been reviewed against the Japanese source.
 * --check verifies the saved report without writing it.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const release=JSON.parse(read('release.json')),edition=release.translations.en;
const ja=read(release.paper),en=read(edition.paper);
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const jpArchive=JSON.parse(read(`${release.fOnlyDataDirectory}/manifest.json`));
assert.equal(sha(ja),jpArchive.manuscriptSha256,'Japanese source must match its existing archive');
const headings=s=>[...s.matchAll(/^(#{2,3}) (\d+(?:\.\d+)*|[A-Z]\.\d+(?:\.\d+)*)(?:\. | )/gm)].map(m=>`${m[1]} ${m[2]}`);
assert.deepEqual(headings(en),headings(ja),'numbered headings and order');
const appendixIds=s=>[...s.matchAll(/^## (?:付録|Appendix )([A-Z])\. /gm)].map(m=>m[1]);
assert.deepEqual(appendixIds(en),appendixIds(ja),'comparison appendices and order');
const kind={命題:'Proposition',定理:'Theorem',補題:'Lemma',系:'Corollary'};
const jpStatements=[...ja.matchAll(/^\*\*(命題|定理|補題|系)((?:\d+|[A-Z])\.\d+)/gm)].map(m=>`${kind[m[1]]} ${m[2]}`);
const enStatements=[...en.matchAll(/^\*\*(Proposition|Theorem|Lemma|Corollary) ((?:\d+|[A-Z])\.\d+)/gm)].map(m=>`${m[1]} ${m[2]}`);
assert.deepEqual(enStatements,jpStatements,'formal statements and numbering');
assert.equal((en.match(/□/g)||[]).length,(ja.match(/□/g)||[]).length,'proof endings');
const displays=s=>[...s.matchAll(/^\$\$\n([\s\S]*?)^\$\$/gm)].map(m=>m[1]);
const translateMathText=s=>s.replaceAll('\\text{または}','\\text{or}').replaceAll('\\text{かつ}','\\text{and}');
assert.deepEqual(displays(en),displays(ja).map(translateMathText),'all displayed mathematics in order');
function inline(s){return [...s.replace(/^\$\$\n[\s\S]*?^\$\$/gm,'').matchAll(/(?<!\$)\$(?!\$)([^$]*?)(?<!\$)\$(?!\$)/g)].map(m=>m[1]);}
function count(values){const result={};for(const x of values)result[x]=(result[x]||0)+1;return result;}
const inlineJA=count(inline(ja)),inlineEN=count(inline(en));
const expectedInline={...inlineJA};
// One referent explicitly repeated in the English prose of §4.2.
const addedInlineReferents=['D(a,b)'];
for(const x of addedInlineReferents)expectedInline[x]=(expectedInline[x]||0)+1;
assert.deepEqual(inlineEN,expectedInline,'no inline mathematics omitted or altered');
function fences(s){
  const blocks=[];let active=null;
  for(const line of s.split('\n')){
    const m=line.match(/^(```|~~~)(.*)$/);
    if(m){if(active){assert.equal(m[1],active.marker);assert.equal(m[2].trim(),'');blocks.push(active);active=null;}
      else active={marker:m[1],language:m[2].trim(),lines:[]};}
    else if(active)active.lines.push(line);
  }
  assert.equal(active,null,'unclosed code fence');return blocks;
}
const fencedJA=fences(ja),fencedEN=fences(en);
assert.deepEqual(fencedEN.map(x=>x.language),fencedJA.map(x=>x.language));
const translatedCodeLabels=[];
for(let i=0;i<fencedJA.length;i++){
  const a=fencedJA[i],b=fencedEN[i];
  if(a.lines.join('\n')===b.lines.join('\n'))continue;
  if(a.lines[0]?.startsWith('空列')){
    assert.deepEqual(b.lines,['empty list  := f()','cons(x,xs)  := (x,xs)']);translatedCodeLabels.push('empty list and cons');
  }else if(a.lines[0]?.startsWith('整数の二')){
    assert.deepEqual(b.lines,['integer two (intermediate notation): (f(),f(f(f())))','integer two (appendix notation):     f(f()f(f(f())))']);translatedCodeLabels.push('integer-two captions');
  }else assert.fail(`Unexpected change to code block ${i}`);
}
assert(!/[\u3040-\u30ff\u3400-\u9fff]/u.test(en),'untranslated Japanese remains in English manuscript');
const targets=s=>[...s.matchAll(/\[[^\]]+\]\(([^\s)]+)\)/g)].map(m=>m[1]);
const expectedLinks=targets(ja).map(x=>x===`../${release.fOnlyAppendix}`?`../${edition.fOnlyAppendix}`:x);
const linksEN=targets(en);
const sourceLink=path.basename(release.paper);
assert.equal(linksEN[0],sourceLink);assert.deepEqual(linksEN.slice(1),expectedLinks,'reference targets and order');
for(const target of linksEN){
  if(/^(?:[a-z]+:|#)/i.test(target))continue;
  assert(fs.existsSync(path.resolve(root,path.dirname(edition.paper),decodeURIComponent(target.split('#')[0]))),`missing link: ${target}`);
}
const report={format:'english-translation-check/1',paperVersion:release.paperVersion,language:'en',status:'passed',
  source:{path:release.paper,sha256:sha(ja),bytes:Buffer.byteLength(ja)},translation:{path:edition.paper,sha256:sha(en),bytes:Buffer.byteLength(en)},
  checks:{japaneseSourceMatchesExistingArchive:true,numberedHeadings:headings(en).length,appendices:appendixIds(en),formalStatements:enStatements.length,proofEndings:(en.match(/□/g)||[]).length,displayMathBlocks:displays(en).length,sourceInlineMath:inline(ja).length,englishInlineMath:inline(en).length,addedInlineReferents,codeBlocks:fencedEN.length,translatedCodeLabels,referenceTargetsPreserved:true,untranslatedJapaneseFound:false},
  review:{scope:'Complete prose translation reviewed section by section against the Japanese manuscript, including assumptions, bounds, proof steps, and proof-status qualifications.',terminology:{system:'f-generative system',polynomials:'M-polynomials',field:'finite rational-expression numbers',complex:'generative complex numbers',quaternions:'generative quaternions',label:'generative label',sequence:'sequence-generating label',interval:'interval-generating label',trace:'computation trace',relation:'relation operator',compatibility:'response compatibility'},note:'Structural comparisons and editorial review are translation QA. They are not formal verification of semantic translation equivalence or additional mathematical proofs.'}};
const text=JSON.stringify(report,null,2)+'\n';
if(process.argv.includes('--check'))assert.equal(read(edition.translationReport),text,'saved translation report mismatch');
else fs.writeFileSync(path.join(root,edition.translationReport),text);
console.log(`English translation checked: ${enStatements.length} formal statements, ${displays(en).length} display equations, ${fencedEN.length} code blocks, all source references retained.`);
