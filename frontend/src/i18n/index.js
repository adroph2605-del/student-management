import en from './en';
import sw from './sw';

const dictionaries = { ENG: en, SW: sw };

export function getT(lang) {
  const dict = dictionaries[lang] || en;
  return (key) => dict[key] ?? key;
}

export default dictionaries;