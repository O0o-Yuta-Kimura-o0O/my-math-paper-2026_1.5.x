import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const project = fileURLToPath(new URL('../', import.meta.url));
const root = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : project;
const release = JSON.parse(fs.readFileSync(path.join(root, 'release.json'), 'utf8'));
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const manifestPath = path.join(root, 'MANIFEST.json');
let files;
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.paperVersion !== release.paperVersion || manifest.interpreterVersion !== release.interpreterVersion) throw new Error('Manifest version mismatch');
  files = manifest.files.map(f => f.path);
  for (const file of manifest.files) {
    const bytes = fs.readFileSync(path.join(root, file.path));
    if (bytes.length !== file.bytes || sha(bytes) !== file.sha256) throw new Error(`Checksum mismatch: ${file.path}`);
  }
} else {
  files = ['README.md', 'CHANGELOG.md', release.paper, release.audit, release.applications, release.concepts, release.conceptExamples, release.conceptInventory, release.fOnlyAppendix, release.fOnlyCoverage, release.traceExtensions, release.lambdaArithmetic, 'verification/README.md', 'interpreter/README.md'].filter(Boolean);
}
// Paper and interpreter evidence use independent release versions. Compatibility
// fixtures, such as fixtures/lambda-v8.0.0.json, are deliberately not filtered.
for (const file of files) {
  const versioned = path.basename(file).match(/^(application-examples|formal-field-examples|generator-extensions|model-extensions|lambda-examples)-v(.+)\.json$/);
  const expectedVersion = versioned?.[1] === 'lambda-examples' ? release.interpreterVersion : release.paperVersion;
  if (versioned && versioned[2] !== expectedVersion) throw new Error(`Stale versioned certificate in release: ${file}`);
}
let links = 0;
for (const file of files.filter(f => f.endsWith('.md'))) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const text = source.replace(/^(?:```|~~~)[\s\S]*?^(?:```|~~~)[^\n]*$/gm, '');
  const pattern = /\[[^\]]+\]\((?:<([^>]+)>|([^\s)]+))\)/g;
  for (const match of text.matchAll(pattern)) {
    let target = match[1] || match[2];
    if (/^(?:[a-z]+:|#)/i.test(target)) continue;
    target = decodeURIComponent(target.split('#')[0]);
    if (!fs.existsSync(path.resolve(root, path.dirname(file), target))) throw new Error(`Broken local link in ${file}: ${target}`);
    links++;
  }
}
if (!fs.readFileSync(path.join(root, release.paper), 'utf8').includes(`v${release.paperVersion}`)) throw new Error('Paper version absent');
if (!fs.readFileSync(path.join(root, release.interpreter), 'utf8').includes(`v${release.interpreterVersion}`)) throw new Error('Interpreter version absent');
console.log(`Release paths and ${links} local links verified${fs.existsSync(manifestPath) ? `; ${files.length} file checksums match` : ''}.`);
