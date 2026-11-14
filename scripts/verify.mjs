import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const release = JSON.parse(fs.readFileSync(path.join(root, 'release.json'), 'utf8'));
const checks = [
  'verification/equational-tests.mjs', 'verification/interpreter-tests.mjs', 'verification/interpreter-multilingual-tests.mjs',
  'verification/applications-tests.mjs', 'verification/formal-field-tests.mjs',
  'verification/generator-extensions-tests.mjs', 'verification/model-extensions-tests.mjs',
  'verification/lambda-arithmetic-tests.mjs', 'verification/menger-dimension-tests.mjs', 'verification/binary-addition-tests.mjs',
  'verification/concept-codec-tests.mjs', 'verification/f-only-codec-tests.mjs',
  'verification/language-preference-tests.mjs',
  'verification/lab-tests-v1.5.8.0.mjs', 'verification/lab-encoding-tests-v1.5.8.0.mjs',
];
const reports = [];
for (const file of checks) {
  const run = spawnSync(process.execPath, [file], {cwd: root, encoding: 'utf8', timeout: 120000});
  process.stdout.write(run.stdout || '');
  process.stderr.write(run.stderr || '');
  if (run.error || run.status !== 0) {
    console.error(`Verification failed: ${file}`, run.error?.message || '');
    process.exit(1);
  }
  reports.push({file, status: 'passed', output: run.stdout.trim()});
}
const report = {
  format: 'release-verification/1', paperVersion: release.paperVersion,
  interpreterVersion: release.interpreterVersion, checkedAt: new Date().toISOString(),
  runtime: process.version, status: 'passed', checks: reports,
  browserReview: {status: 'separate-record', report: 'verification/lab-browser-review-v1.5.8.0.json', scope: 'The lab is reviewed in a browser separately; this regression runner does not perform browser tests or certify the interpreter UI.'},
  scope: 'Executable regression tests and finite certificates. This report does not certify every handwritten theorem or the verifier implementation itself.'
};
if (!fs.existsSync(path.join(root, 'MANIFEST.json'))) {
  fs.writeFileSync(path.join(root, 'verification/verification-report.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(`All verification suites passed for paper v${release.paperVersion} / interpreter v${release.interpreterVersion}.`);
