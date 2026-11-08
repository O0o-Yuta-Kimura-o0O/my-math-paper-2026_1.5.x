import test from 'node:test';
import assert from 'node:assert/strict';
import {createLanguagePreference as create, setLanguageInUrl, MANUAL_LANGUAGE_KEY} from '../docs/language-preference.mjs';
const store = initial => {
  const values = new Map(Object.entries(initial ?? {}));
  let writes = 0;
  return {getItem:key=>values.get(key)??null,setItem:(key,value)=>{writes++;values.set(key,value);},get writes(){return writes;}};
};
const defaults = overrides => ({search:'',storage:store(),languages:[],language:'',...overrides});
test('Japanese primary browser preference selects Japanese, including regional tags and case', () => {
  for (const language of ['ja','ja-JP','JA-jp',' ja '])
    assert.equal(create(defaults({languages:[language,'en']})).current,'ja');
});
test('only the first nonempty browser preference controls the automatic default', () => {
  assert.equal(create(defaults({languages:['en-US','ja-JP'],language:'ja'})).current,'en');
  assert.equal(create(defaults({languages:['fr-FR','ja']})).current,'en');
  assert.equal(create(defaults({languages:['',null,' ja-JP ','en']})).current,'ja');
});
test('all non-Japanese automatic preferences use English, including Atlas supported languages', () => {
  for (const language of ['en-US','fr','zh-CN','de-DE','ja_JP'])
    assert.equal(create(defaults({supported:['en','ja','fr','zh'],languages:[language]})).current,'en');
});
test('navigator.language is used only when the preferred list has no nonempty entries', () => {
  assert.equal(create(defaults({languages:[],language:'ja-JP'})).current,'ja');
  assert.equal(create(defaults({languages:null,language:'en'})).current,'en');
  assert.equal(create(defaults()).current,'en');
});
test('explicit valid URL overrides saved and browser preferences without writing', () => {
  const storage=store({[MANUAL_LANGUAGE_KEY]:'en'});
  assert.equal(create(defaults({search:'?lang=ja',storage,languages:['en']})).current,'ja');
  assert.equal(storage.writes,0);
});
test('invalid URL and invalid saved values fall through to the browser default', () => {
  assert.equal(create(defaults({search:'?lang=bogus',storage:store({[MANUAL_LANGUAGE_KEY]:'invalid'}),languages:['ja']})).current,'ja');
  assert.equal(create(defaults({search:'?lang=',languages:['en','ja']})).current,'en');
});
test('saved manual Japanese and English override opposing browser defaults', () => {
  for (const [saved,browser] of [['ja','en'],['en','ja']])
    assert.equal(create(defaults({storage:store({[MANUAL_LANGUAGE_KEY]:saved}),languages:[browser]})).current,saved);
});
test('Atlas preserves French and Chinese manual settings; lab defaults to English when unsupported', () => {
  for (const language of ['fr','zh']) {
    const storage=store({[MANUAL_LANGUAGE_KEY]:language});
    assert.equal(create(defaults({supported:['en','ja','fr','zh'],storage,languages:['ja']})).current,language);
    assert.equal(create(defaults({storage,languages:['ja']})).current,'en');
    assert.equal(create(defaults({search:'?lang='+language,languages:['ja']})).current,'en');
  }
});
test('manual choice persists, survives recreation, and is shared between controllers', () => {
  const storage=store();const first=create(defaults({storage,languages:['ja']}));
  assert.equal(storage.writes,0);assert.equal(first.choose('en'),'en');assert.equal(first.current,'en');
  assert.equal(storage.getItem(MANUAL_LANGUAGE_KEY),'en');assert.equal(storage.writes,1);
  assert.equal(create(defaults({storage,languages:['ja']})).current,'en');
});
test('automatic defaults never persist; rejected choices never change state', () => {
  const storage=store();const controller=create(defaults({storage,languages:['ja']}));
  assert.equal(storage.writes,0);assert.throws(()=>controller.choose('fr'));assert.throws(()=>controller.choose('invalid'));
  assert.equal(controller.current,'ja');assert.equal(storage.writes,0);
});
test('unavailable or denied storage does not prevent automatic or manual selection', () => {
  const denied={getItem(){throw new Error('denied');},setItem(){throw new Error('denied');}};
  const controller=create(defaults({storage:denied,languages:['ja']}));
  assert.equal(controller.current,'ja');assert.equal(controller.choose('en'),'en');
  assert.equal(create(defaults({storage:null,languages:['ja']})).current,'ja');
});
test('invalid supported sets are rejected; English-only sets safely handle Japanese', () => {
  for (const supported of [[],['ja'],['en','bogus'],['en','en']])assert.throws(()=>create(defaults({supported})));
  assert.equal(create(defaults({supported:['en'],languages:['ja']})).current,'en');
});
test('manual language URL update preserves other parameters, hash and history state', () => {
  let recorded;const history={state:{panel:2},replaceState:(...args)=>{recorded=args;}};
  assert.equal(setLanguageInUrl('en',{href:'https://example.test/lab/?lang=ja&mode=series#result',history}),true);
  assert.deepEqual(recorded[0],{panel:2});assert.equal(recorded[2].searchParams.get('lang'),'en');
  assert.equal(recorded[2].searchParams.get('mode'),'series');assert.equal(recorded[2].hash,'#result');
});
test('URL update is safe if browser history is unavailable or denied', () => {
  assert.equal(setLanguageInUrl('ja',{href:'bad URL',history:{replaceState(){throw new Error();}}}),false);
  assert.equal(setLanguageInUrl('en',{href:'https://example.test/',history:null}),false);
  assert.throws(()=>setLanguageInUrl('invalid'));
});
