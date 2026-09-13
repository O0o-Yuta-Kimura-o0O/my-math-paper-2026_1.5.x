import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {checkBundle} from '../verification/equational-checker.mjs';
import {q, interval, generateQlimCertificate, generateSqrt2Certificate, generateLeibnizCertificate,
  generateIntervalCertificate, generateContinuityCertificate, generateCalculusCertificate,
  verifyApplicationCertificate} from '../verification/applications.mjs';
import {field, fieldConstant, epsilon, generateFieldCertificate, verifyFieldCertificate} from '../verification/formal-field.mjs';
import {buildGeneratorExtensionBundle, verifyGeneratorExtensionBundle} from '../verification/generator-extensions.mjs';
import {buildModelExtensionBundle, verifyModelExtensionBundle} from '../verification/model-extensions.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const release = JSON.parse(fs.readFileSync(path.join(root, 'release.json'), 'utf8'));
const write = (file, data) => fs.writeFileSync(path.join(root, file), JSON.stringify(data, null, 2) + '\n');
const bundle = JSON.parse(fs.readFileSync(path.join(root, 'verification/certificates/nat-and-paths.json'), 'utf8'));
write('verification/equational-report.json', checkBundle(bundle));
const html = fs.readFileSync(path.join(root, release.interpreter), 'utf8');
const core = html.match(/<script id="lambda-core">([\s\S]*?)<\/script>/)?.[1];
if (!core) throw new Error('Missing lambda core');
const context = vm.createContext({setTimeout});
vm.runInContext(core, context, {timeout: 1000});
const C = context.LambdaCore;
const examples = [
  {source: 'Add Two Three', expected: 'λf.λx.f (f (f (f (f x))))'},
  {source: '(λy_1.λy.y) y', expected: 'λx.x', definitions: []},
  {source: 'Fst (Pair Two Three)', expected: 'λf.λx.f (f x)'},
  {source: 'ZMake One Zero', expected: 'λp.p (λf.λx.x) (λf.λx.x)'},
];
const traces = [];
for (const example of examples) {
  const result = await C.evaluate(example.source, {maxSteps: 5000, ...(example.definitions ? {definitions: example.definitions} : {})});
  if (result.status !== 'normal-form' || !C.alphaEqual(result.term, C.parse(example.expected))) throw new Error(`Unexpected result: ${example.source}`);
  const verification = C.verifyTrace(result.trace);
  if (!verification.valid) throw new Error(verification.error);
  traces.push(result.trace);
}
write(`verification/certificates/lambda-examples-v${release.interpreterVersion}.json`, {
  schema: 'lambda-trace-bundle/1', version: C.VERSION, traces, failures: []});
const applications = [
  generateQlimCertificate(q(5), q(1), 9),
  generateSqrt2Certificate(8), generateLeibnizCertificate(5),
  generateIntervalCertificate('div', interval(q(1), q(2)), interval(q(2), q(4))),
  generateContinuityCertificate([q(1), q(2), q(3)], q(2), 4, q(1), q(4097, 4096)),
  generateCalculusCertificate([q(1), q(0), q(1)], q(2), q(1), q(1, 16), q(0), q(1)),
];
const reports = applications.map(c => {
  const result = verifyApplicationCertificate(c);
  if (!result.ok) throw new Error(result.error);
  return result;
});
write(`verification/certificates/application-examples-v${release.paperVersion}.json`, {
  format: 'application-examples/1', version: release.paperVersion, certificates: applications});
const formalField = [
  generateFieldCertificate('div', [epsilon(), epsilon()]),
  generateFieldCertificate('mul', [epsilon(), epsilon()]),
  generateFieldCertificate('normalize', {numerator: [q(1), q(2), q(1)], denominator: [q(1), q(1)]}),
  generateFieldCertificate('compare', [field([q(1)], [q(-1), q(1)]), fieldConstant(q(0))]),
  generateFieldCertificate('standardPart', field([q(1), q(1)], [q(2), q(-1)])),
];
const fieldReports = formalField.map(cert => {
  const result = verifyFieldCertificate(cert);
  if (!result.ok) throw new Error(result.error);
  return result;
});
write(`verification/certificates/formal-field-examples-v${release.paperVersion}.json`, {
  format: 'formal-field-examples/1', version: release.paperVersion, certificates: formalField});
const generatorExtensions = buildGeneratorExtensionBundle();
const generatorReport = verifyGeneratorExtensionBundle(generatorExtensions);
if (!generatorReport.ok) throw new Error('Generator extension evidence failed verification');
write(`verification/certificates/generator-extensions-v${release.paperVersion}.json`, generatorExtensions);
const modelExtensions = buildModelExtensionBundle();
const modelReport = verifyModelExtensionBundle(modelExtensions);
if (!modelReport.ok) throw new Error('Model extension evidence failed verification');
write(`verification/certificates/model-extensions-v${release.paperVersion}.json`, modelExtensions);
write('verification/evidence-report.json', {
  format: 'evidence-generation-report/1', paperVersion: release.paperVersion,
  interpreterVersion: release.interpreterVersion, status: 'verified',
  lambda: traces.map(trace => ({source: trace.source, final: trace.final, verification: C.verifyTrace(trace)})),
  applications: reports, formalField: fieldReports,
  generatorExtensions: generatorReport, modelExtensions: modelReport,
  equationalTheorems: bundle.theorems.length,
  note: 'Certificates are the evidence inputs; these reports summarize the checks. General induction theorems are not inferred from numerical examples.'
});
console.log(`Verified and saved ${traces.length} lambda traces, ${applications.length} application certificates, ${formalField.length} formal-field certificates, ${generatorReport.certificateCount} generator certificates, ${modelReport.registerTraces.length} register traces, ${modelReport.symbolicProofs.length} conditional derivations, and ${bundle.theorems.length} general equations.`);
