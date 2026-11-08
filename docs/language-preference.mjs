/** UI preferences only: no network, IP lookup, geolocation, or import-time effects. */
export const MANUAL_LANGUAGE_KEY = 'f-generative-language';
const KNOWN_LANGUAGES = Object.freeze(['ja', 'en', 'fr', 'zh']);
function globalValue(name, property) {
  try { return property === undefined ? globalThis[name] : globalThis[name]?.[property]; }
  catch { return undefined; }
}
function validChoice(value) {
  if (typeof value !== 'string') return null;
  const candidate = value.trim().toLowerCase();
  return KNOWN_LANGUAGES.includes(candidate) ? candidate : null;
}
function browserDefault(languages, language) {
  const first = Array.isArray(languages)
    ? languages.find(value => typeof value === 'string' && value.trim())
    : undefined;
  const preferred = typeof first === 'string' ? first : typeof language === 'string' ? language : '';
  return /^ja(?:-|$)/i.test(preferred.trim()) ? 'ja' : 'en';
}
export function createLanguagePreference(options = {}) {
  const supported = options.supported ?? ['ja', 'en'];
  if (!Array.isArray(supported) || !supported.includes('en') ||
      supported.some(value => !KNOWN_LANGUAGES.includes(value)) ||
      new Set(supported).size !== supported.length)
    throw new Error('Invalid supported language set.');
  const search = options.search ?? globalValue('location', 'search') ?? '';
  const storage = options.storage === undefined ? globalValue('localStorage') : options.storage;
  const languages = options.languages === undefined ? globalValue('navigator', 'languages') : options.languages;
  const language = options.language === undefined ? globalValue('navigator', 'language') : options.language;
  let explicit = null, saved = null;
  try { explicit = validChoice(new URLSearchParams(search).get('lang')); } catch {}
  try { saved = validChoice(storage?.getItem(MANUAL_LANGUAGE_KEY)); } catch {}
  const preferred = explicit ?? saved ?? browserDefault(languages, language);
  let current = supported.includes(preferred) ? preferred : 'en';
  return Object.freeze({
    get current() { return current; },
    choose(value) {
      const choice = validChoice(value);
      if (!choice || !supported.includes(choice)) throw new Error('Unsupported language choice.');
      current = choice;
      try { storage?.setItem(MANUAL_LANGUAGE_KEY, choice); } catch {}
      return current;
    }
  });
}
/** Update only the language parameter; preserve the other query values and hash. */
export function setLanguageInUrl(language, options = {}) {
  const choice = validChoice(language);
  if (!choice) throw new Error('Unsupported language choice.');
  try {
    const href = options.href ?? globalValue('location', 'href');
    const history = options.history ?? globalValue('history');
    if (typeof href !== 'string' || typeof history?.replaceState !== 'function') return false;
    const url = new URL(href);
    url.searchParams.set('lang', choice);
    history.replaceState(history.state ?? null, '', url);
    return true;
  } catch { return false; }
}
