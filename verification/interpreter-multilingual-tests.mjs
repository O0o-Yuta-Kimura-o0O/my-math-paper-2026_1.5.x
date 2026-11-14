// Checks the multilingual edition of the λ interpreter against the reference file named in release.json:
// the same computation core, the same Japanese screen and records, complete messages, and the language choice.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root = new URL('../', import.meta.url);
const release = JSON.parse(fs.readFileSync(new URL('release.json', root), 'utf8'));
const edition = release.interpreterEditions.multilingual;
const reference = fs.readFileSync(new URL(release.interpreter, root), 'utf8');
const html = fs.readFileSync(new URL(edition.file, root), 'utf8');
const script = (source, id) => source.match(new RegExp(`<script id="${id}">([\\s\\S]*?)</script>`))?.[1];
const i18nContext = vm.createContext({URLSearchParams});
vm.runInContext(script(html, 'lambda-i18n'), i18nContext);
const I = i18nContext.LambdaI18n;
const ja = I.MESSAGES.ja;
const JAPANESE = /[\u3040-\u30ff\u3400-\u9fff\uff00-\uffef]/;
const KANA = /[\u3040-\u30ff]/;

test('the computation core is byte-identical to the reference interpreter', () => {
  const core = script(reference, 'lambda-core');
  assert.ok(core && core.length > 10000);
  assert.equal(script(html, 'lambda-core'), core);
  assert.notEqual(edition.file, release.interpreter);
  assert.ok(html.includes(`v${release.interpreterVersion}`));
  assert.ok(html.indexOf('<meta charset="utf-8">') < 100, 'the charset must be declared at the start');
});

test('the Japanese screen markup equals the reference except for the language menu', () => {
  const main = source => source.match(/<main>[\s\S]*?<\/main>/)[0];
  const normalized = main(html)
    .replace(/<!--language-->[\s\S]*?<!--\/language-->/, '')
    .replace(/ data-i18n(?:-html)?="[^"]*"/g, '')
    .replace('<div class="top"><h1><span>λ計算インタプリタ</span> ', '<h1>λ計算インタプリタ ')
    .replace('</h1></div>', '</h1>');
  assert.equal(normalized, main(reference));
  assert.equal(html.match(/<title>(.*)<\/title>/)[1], reference.match(/<title>(.*)<\/title>/)[1]);
});

test('every screen text in the markup is the Japanese message of its key', () => {
  const used = new Set();
  for (const m of html.matchAll(/<(\w+)\b[^>]*?\sdata-i18n(-html)?="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g)) {
    const [, , isHtml, key, content] = m;
    assert.ok(Object.hasOwn(ja, key), key);
    if (!isHtml) assert.doesNotMatch(ja[key], /</, `${key} is text`);
    assert.equal(content, ja[key], key);
    used.add(key);
  }
  const ui = script(html, 'lambda-ui');
  for (const key of Object.keys(ja)) {
    const inUi = ui.includes(`'${key}'`) || (key.startsWith('status.') && ui.includes("t('status.'+status)"));
    assert.ok(used.has(key) || inUi || I.CANONICAL_KEYS.includes(key), `unused message ${key}`);
  }
});

test('all languages have the same messages, placeholders and markup', () => {
  const placeholders = s => [...s.matchAll(/\{(\w+)\}/g)].map(m => m[1]).sort();
  const tags = s => [...s.matchAll(/<\/?[a-z]+>/g)].map(m => m[0]);
  assert.deepEqual([...I.CODES], ['ja', 'en', 'zh-Hans', 'zh-Hant', 'ko', 'fr', 'de', 'es', 'pt', 'it', 'ru']);
  assert.deepEqual(edition.languages, [...I.CODES]);
  for (const code of I.CODES) {
    const table = I.MESSAGES[code];
    assert.deepEqual(Object.keys(table), Object.keys(ja), code);
    for (const [key, value] of Object.entries(table)) {
      assert.ok(typeof value === 'string' && value.length > 0 && value.trim() === value, `${code} ${key}`);
      assert.deepEqual(placeholders(value), placeholders(ja[key]), `${code} ${key} placeholders`);
      assert.deepEqual(tags(value), tags(ja[key]), `${code} ${key} markup`);
      if (!['ja', 'zh-Hans', 'zh-Hant'].includes(code)) assert.doesNotMatch(value, JAPANESE, `${code} ${key}`);
      if (code.startsWith('zh')) assert.doesNotMatch(value, KANA, `${code} ${key}`);
    }
  }
});

test('every Japanese message of the core is translated, and nothing else is', () => {
  const core = script(reference, 'lambda-core');
  const literals = [...core.matchAll(/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)]
    .map(m => m[1] ?? m[2] ?? (m[3] !== undefined ? m[3].replace(/\$\{[^}]*\}/g, '7') : undefined))
    .filter(s => s !== undefined && JAPANESE.test(s));
  assert.ok(literals.length >= 40, `found ${literals.length} literals`);
  const matched = new Set();
  for (const literal of literals) {
    const sample = [literal, literal + 'Name'].find(s => I.match(s));
    assert.ok(sample, `no message for ${literal}`);
    const found = I.match(sample);
    matched.add(found.key);
    assert.equal(I.translate('ja', sample), sample, literal);
    for (const code of I.CODES.filter(c => c !== 'ja')) {
      const text = I.translate(code, sample);
      assert.notEqual(text, sample, `${code} ${literal}`);
      if (!code.startsWith('zh')) assert.doesNotMatch(text, JAPANESE, `${code} ${literal}`);
    }
  }
  for (const key of I.CANONICAL_KEYS.filter(k => k.startsWith('core.'))) assert.ok(matched.has(key), `${key} is not a core message`);
  const referenceUi = script(reference, 'lambda-ui');
  for (const key of ['failure.default', 'error.noExpression']) assert.ok(referenceUi.includes(`'${ja[key]}'`), key);
  assert.equal(I.translate('ja', 'Step 3: the preceding term does not match.'), '第 3 段: 前項が一致しません。');
  for (const other of ['', 'Unexpected token } in JSON', '位置 x']) assert.equal(I.translate('fr', other), other);
});

test('the start language follows the URL, the saved choice, the browser languages and their regions', () => {
  const pick = options => I.chooseLanguage({search: '', stored: null, languages: [], language: '', ...options});
  const browser = [
    [['ja-JP'], 'ja'], [['JA-jp', 'en'], 'ja'], [['en-US', 'ja'], 'en'], [['en'], 'en'],
    [['zh-CN'], 'zh-Hans'], [['zh'], 'zh-Hans'], [['zh-SG'], 'zh-Hans'], [['zh-Hans-HK'], 'zh-Hans'],
    [['zh-TW'], 'zh-Hant'], [['zh-HK'], 'zh-Hant'], [['zh-Hant'], 'zh-Hant'], [['zh_TW'], 'zh-Hant'],
    [['ko-KR'], 'ko'], [['fr-CA'], 'fr'], [['de-CH'], 'de'], [['es-419'], 'es'], [['es-MX'], 'es'],
    [['pt-BR'], 'pt'], [['pt-PT'], 'pt'], [['it-IT'], 'it'], [['ru-RU'], 'ru'],
    [['sv-SE', 'de-DE'], 'de'], [['ca-ES'], 'es'], [['gl-ES'], 'es'], [['eu-ES', 'en'], 'en'], [['yue-HK'], 'zh-Hant'],
    [['nl-BE'], 'en'], [['uk-UA'], 'en'], [['sv-SE'], 'en'], [['xx'], 'en'], [[], 'en'], [['', ' '], 'en'],
    [['de-u-co-phonebk'], 'de'], [['xx-u-co-phonebk'], 'en'],
  ];
  for (const [languages, expected] of browser) assert.equal(pick({languages}), expected, languages.join(','));
  assert.equal(pick({languages: [], language: 'fr-FR'}), 'fr');
  assert.equal(pick({languages: null, language: 'it'}), 'it');
  assert.equal(pick({search: '?lang=ko', stored: 'de', languages: ['ja']}), 'ko');
  assert.equal(pick({search: '?x=1&lang=pt-BR', languages: ['ja']}), 'pt');
  assert.equal(pick({search: '?lang=zh-hant', languages: ['ja']}), 'zh-Hant');
  assert.equal(pick({search: '?lang=xx', stored: 'ru', languages: ['ja']}), 'ru');
  assert.equal(pick({stored: 'de', languages: ['ja']}), 'de');
  assert.equal(pick({stored: 'bogus', languages: ['ja']}), 'ja');
  assert.equal(I.STORAGE_KEY, edition.languagePreference.manualStorageKey);
});

// A minimal DOM, enough for the two UI scripts; the static texts are compared above.
function makeScreen({search = '', languages = [], storage = new Map()} = {}) {
  const byId = new Map(), blobs = [], downloads = [];
  class Element {
    constructor(tag) { Object.assign(this, {tagName: tag, children: [], parent: null, ownText: '', className: '', value: '', disabled: false, open: false, files: [], dataset: {}, listeners: {}, elementId: ''}); }
    get id() { return this.elementId; }
    set id(value) { this.elementId = value; byId.set(value, this); }
    get textContent() { return this.children.length ? this.children.map(c => c.textContent).join('') : this.ownText; }
    set textContent(value) { this.detachChildren(); this.ownText = String(value); }
    set innerHTML(value) { this.textContent = value; }
    detachChildren() { for (const c of this.children) c.detach(); this.children = []; }
    detach() { this.parent = null; if (this.elementId && byId.get(this.elementId) === this) byId.delete(this.elementId); for (const c of this.children) c.detach(); }
    append(...nodes) { for (const n of nodes) { n.parent?.children.splice(n.parent.children.indexOf(n), 1); n.parent = this; if (n.elementId) byId.set(n.elementId, n); this.children.push(n); } }
    remove() { this.parent?.children.splice(this.parent.children.indexOf(this), 1); this.detach(); }
    replaceChildren(...nodes) { this.detachChildren(); this.append(...nodes); }
    addEventListener(type, listener) { (this.listeners[type] ??= []).push(listener); }
    dispatch(type) { return Promise.all((this.listeners[type] ?? []).map(listener => listener({type, target: this}))); }
    click() { if (this.tagName === 'a') downloads.push({name: this.download, href: this.href}); return this.dispatch('click'); }
  }
  const make = (id, tag, props = {}) => { const e = new Element(tag); e.id = id; Object.assign(e, props); return e; };
  for (const [id, tag, props] of [['source', 'textarea', {value: 'Add Two Three'}], ['example', 'select', {value: 'Add Two Three'}], ['useExample', 'button'], ['definitions', 'textarea'], ['builtinList', 'pre'], ['maxSteps', 'input', {value: '5000'}], ['evaluate', 'button'], ['stop', 'button', {disabled: true}], ['liveStatus', 'span'], ['export', 'button'], ['import', 'button'], ['file', 'input'], ['clear', 'button'], ['message', 'p'], ['history', 'div'], ['language', 'select']]) make(id, tag, props);
  const empty = new Element('p'); empty.className = 'muted'; empty.ownText = 'まだ履歴はありません。'; empty.id = 'empty'; byId.get('history').append(empty);
  class TestURL extends URL {
    static createObjectURL(blob) { blobs.push(blob); return 'blob:test/' + blobs.length; }
    static revokeObjectURL() {}
  }
  const document = {getElementById: id => byId.get(id) ?? null, createElement: tag => new Element(tag), querySelectorAll: () => [], documentElement: {lang: 'ja'}, title: ''};
  const context = vm.createContext({
    document, setTimeout, clearTimeout, AbortController, console, URL: TestURL, URLSearchParams,
    Blob: class { constructor(parts, options) { this.parts = parts; this.type = options?.type; } },
    navigator: {languages, language: languages[0] ?? ''},
    location: {search, href: 'file:///interpreter.html' + search},
    history: {state: null, replaceState() {}},
    localStorage: {getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, String(value))},
  });
  return {$: id => byId.get(id), byId, blobs, downloads, document, storage, run: source => vm.runInContext(source, context)};
}
const load = (source, options) => {
  const screen = makeScreen(options);
  screen.run(script(source, 'lambda-core'));
  if (script(source, 'lambda-i18n')) screen.run(script(source, 'lambda-i18n'));
  screen.run(script(source, 'lambda-ui'));
  return screen;
};
const view = s => ({history: s.$('history').textContent, message: s.$('message').textContent, cls: s.$('message').className, live: s.$('liveStatus').textContent});
const firstButton = node => node.tagName === 'button' ? node : node.children.map(firstButton).find(Boolean);
async function scenario(s) {
  const views = [{label: 'start', ...view(s)}];
  const step = async (label, action) => { await action(); views.push({label, ...view(s)}); };
  await step('evaluate', async () => { s.$('source').value = 'Add Two Three; QRepInv QZero; (λx.x x) (λx.x x); λx.'; s.$('maxSteps').value = '40'; await s.$('evaluate').click(); });
  await step('stop', async () => { s.$('source').value = 'Add Two Three'; s.$('maxSteps').value = '5000'; const running = s.$('evaluate').click(); await s.$('stop').click(); await running; });
  await step('bad-definition', async () => { s.$('definitions').value = 'A = ;'; await s.$('evaluate').click(); s.$('definitions').value = ''; });
  await step('no-expression', async () => { s.$('source').value = '  '; await s.$('evaluate').click(); });
  await step('export', async () => { await s.$('export').click(); });
  await step('reverify', async () => { await firstButton(s.$('history')).click(); });
  const bundle = s.blobs.at(-1).parts.join('');
  const data = JSON.parse(bundle), stopped = data.traces.find(t => t.status === 'stopped');
  const tampered = structuredClone(data); tampered.traces[0].steps[2].after = 'λx.x';
  const failed = {...structuredClone(stopped), status: 'error', error: '項の大きさが上限を超えています。'};
  const english = {...structuredClone(stopped), status: 'error', error: 'The term size exceeds the limit.'};
  for (const [label, size, text] of [['import-bundle', bundle.length, bundle], ['import-tampered', 100, JSON.stringify(tampered)], ['import-error', 100, JSON.stringify(failed)], ['import-english', 100, JSON.stringify(english)], ['import-broken-json', 1, '{'], ['import-too-large', 21 * 1024 * 1024, '{}']]) {
    await step(label, async () => { s.$('file').files = [{size, text: async () => text}]; await s.$('file').dispatch('change'); });
  }
  await step('clear', async () => { await s.$('clear').click(); });
  await step('export-empty', async () => { await s.$('export').click(); });
  return {views, bundle};
}

test('in Japanese, the screen and the saved records equal the reference interpreter', async () => {
  const before = load(reference), after = load(html, {search: '?lang=ja'});
  const a = await scenario(before), b = await scenario(after);
  assert.equal(b.bundle, a.bundle);
  assert.deepEqual(b.views.map(v => v.label), a.views.map(v => v.label));
  // The reference shows a record of the English edition as it is; the multilingual edition translates it.
  const english = a.views.findIndex(v => v.label === 'import-english');
  assert.ok(a.views[english].history.endsWith('The term size exceeds the limit.'));
  assert.ok(b.views[english].history.endsWith('項の大きさが上限を超えています。'));
  const translated = a.views.map((v, i) => i < english ? v : {...v, history: v.history.replace('The term size exceeds the limit.', '項の大きさが上限を超えています。')});
  assert.deepEqual(b.views, translated);
  assert.ok(a.views.some(v => v.history.includes('手動停止')) && a.views.some(v => v.message.includes('1 件目の証跡')));
  assert.equal(after.document.documentElement.lang, 'ja');
  assert.equal(after.document.title, 'λ計算インタプリタ v8.0.1');
});

test('in every other language, the records are unchanged and no Japanese text remains on the screen', async () => {
  const reference8 = await scenario(load(reference));
  for (const code of I.CODES.filter(c => c !== 'ja')) {
    const s = load(html, {search: '?lang=' + code});
    const {views, bundle} = await scenario(s);
    assert.equal(bundle, reference8.bundle, code);
    assert.equal(s.document.documentElement.lang, code);
    for (const v of views) {
      const text = v.history + '\n' + v.message + '\n' + v.live;
      assert.doesNotMatch(text, code.startsWith('zh') ? KANA : JAPANESE, `${code}: ${text.match(code.startsWith('zh') ? KANA : JAPANESE)?.input?.slice(0, 120)}`);
      assert.doesNotMatch(text, /\b(?:app|run|msg|log|core|error|live|status|failure|history)\.[a-zA-Z-]+\b/, code);
    }
    assert.notDeepEqual(views.map(v => v.message), reference8.views.map(v => v.message), code);
  }
});

test('the menu switches the language of the whole history and remembers the choice', async () => {
  const s = load(html, {languages: ['ja-JP']});
  const result = await scenario(s);
  const japanese = view(s);
  s.$('language').value = 'de'; await s.$('language').dispatch('change');
  assert.doesNotMatch(view(s).history + view(s).message, JAPANESE);
  assert.equal(s.storage.get(I.STORAGE_KEY), 'de');
  assert.equal(s.document.documentElement.lang, 'de');
  s.$('language').value = 'ja'; await s.$('language').dispatch('change');
  assert.deepEqual(view(s), japanese);
  assert.equal(result.views.length, 15);
  assert.equal(load(html, {languages: ['pt-BR']}).document.documentElement.lang, 'pt');
  assert.equal(load(html, {languages: ['ja'], storage: new Map([[I.STORAGE_KEY, 'ko']])}).document.documentElement.lang, 'ko');
  assert.equal(load(html, {search: '?lang=ru', languages: ['ja'], storage: new Map([[I.STORAGE_KEY, 'ko']])}).document.documentElement.lang, 'ru');
  assert.deepEqual(load(html, {languages: ['ja']}).$('language').children.map(o => [o.value, o.textContent]), [...I.LANGUAGES].map(l => [l.code, l.name]));
});
