/** Writes MANIFEST.json: the latest release artifacts with their sizes and SHA-256.
 * Files tracked by git (plus new files not yet committed) are listed, except the
 * paper-versioned artifacts of earlier paper versions (manuscripts, f-only appendices,
 * research notes, symbol data, translation reports and certificates of v1.5.0–v1.5.8),
 * which stay in the repository as history. Site, lab and poster files carry their own
 * versions and are always listed. Run after all other generators and after verify.mjs.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const release = JSON.parse(fs.readFileSync(path.join(root, 'release.json'), 'utf8'));
const current = release.paperVersion;
const git = args => execFileSync('git', args, {cwd: root, encoding: 'utf8'}).split('\n').filter(Boolean);
const files = new Set([...git(['ls-files']), ...git(['ls-files', '--others', '--exclude-standard'])]);
files.delete('MANIFEST.json');
// A paper-versioned artifact names the paper version after "-v" or "_v" (e.g. _ja_v1.5.8.md,
// -v1.5.8.md, concept-symbols-v1.5.8/). Lab and poster versions have four parts (v1.5.8.0).
const paperVersioned = /(?:^manuscripts\/|^appendices\/|^research\/|^verification\/(?:concept-symbols|f-only|f-only-en)-v|^verification\/translation-en-v|^verification\/certificates\/(?:application-examples|formal-field-examples|generator-extensions|model-extensions)-v)/;
const versionOf = p => p.match(/[-_]v(\d+\.\d+\.\d+)(?!\.?\d)/)?.[1];
const listed = [...files].filter(p => {
  if (!fs.existsSync(path.join(root, p))) return false;
  if (!paperVersioned.test(p)) return true;
  const v = versionOf(p);
  return !v || v === current;
}).sort();
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const manifest = {
  format: 'math-release-manifest/1',
  paperVersion: current,
  interpreterVersion: release.interpreterVersion,
  releaseDate: release.releaseDate,
  scope: 'Latest release artifacts. Earlier paper versions remain in the repository as history and are not listed.',
  files: listed.map(p => {
    const bytes = fs.readFileSync(path.join(root, p));
    return {path: p, sha256: sha(bytes), bytes: bytes.length};
  }),
};
fs.writeFileSync(path.join(root, 'MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`MANIFEST.json: ${manifest.files.length} files for paper v${current}.`);
