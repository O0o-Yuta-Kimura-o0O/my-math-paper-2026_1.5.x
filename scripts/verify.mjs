import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const release = JSON.parse(fs.readFileSync(path.join(root, 'release.json'), 'utf8'));
const checks = [
  'verification/equational-tests.mjs', 'verification/interpreter-tests.mjs',
  'verification/applications-tests.mjs', 'verification/formal-field-tests.mjs',
  'verification/generator-extensions-tests.mjs', 'verification/model-extensions-tests.mjs',
  'verification/lambda-arithmetic-tests.mjs',
  'verification/concept-codec-tests.mjs', 'verification/f-only-codec-tests.mjs',
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
  browserReview: {status: 'not-performed', reason: 'The browser security policy blocked opening the local file URL. No alternate browser route was used.'},
  scope: 'Executable regression tests and finite certificates. This report does not certify every handwritten theorem or the verifier implementation itself.'
};
if (!fs.existsSync(path.join(root, 'MANIFEST.json'))) {
  fs.writeFileSync(path.join(root, 'verification/verification-report.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(`All verification suites passed for paper v${release.paperVersion} / interpreter v${release.interpreterVersion}.`);
