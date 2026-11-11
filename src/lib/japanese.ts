/**
 * Utilidades de texto japonés.
 *
 * Convención de autoría usada en todo el contenido:
 *   - Las palabras se separan con espacios:  "私[わたし] は 学生[がくせい] です。"
 *   - La lectura de cada kanji va entre corchetes justo detrás.
 * De esa única cadena se obtienen el texto que se muestra (sin espacios),
 * el furigana, la lectura en kana, el rōmaji y las piezas de «ordenar palabras».
 */

const KANJI = '\\u3400-\\u9fff々〆';
const RUBY = new RegExp(`([${KANJI}]+)\\[([^\\]]+)\\]`, 'g');
const HAS_JP = /[぀-ヿ㐀-鿿]/;
const HAS_KANJI = new RegExp(`[${KANJI}]`);

export interface Seg {
  text: string;
  ruby?: string;
}

/** Trozos de texto con su furigana, listos para pintar con <ruby>. */
export function segments(src: string): Seg[] {
  const clean = src.replace(/ /g, '');
  const out: Seg[] = [];
  let last = 0;
  for (const m of clean.matchAll(RUBY)) {
    const at = m.index ?? 0;
    if (at > last) out.push({ text: clean.slice(last, at) });
    out.push({ text: m[1], ruby: m[2] });
    last = at + m[0].length;
  }
  if (last < clean.length) out.push({ text: clean.slice(last) });
  return out;
}

/** Texto tal como se escribe en japonés: con kanji y sin espacios. */
export const display = (src: string): string => src.replace(RUBY, '$1').replace(/ /g, '');

/** Lectura en kana (conserva los espacios entre palabras). */
export const kana = (src: string): string => src.replace(RUBY, '$2');

export const tokens = (src: string): string[] => src.trim().split(/ +/);
export const isJapanese = (text: string): boolean => HAS_JP.test(text);
export const hasKanji = (text: string): boolean => HAS_KANJI.test(text);

/* ---------- kana → rōmaji (Hepburn; «ou/ei» se conservan para reflejar la escritura) ---------- */

const BASE: Record<string, string> = {};
const ROWS: Record<string, string> = {
  '': 'あいうえお', k: 'かきくけこ', s: 'さしすせそ', t: 'たちつてと', n: 'なにぬねの',
  h: 'はひふへほ', m: 'まみむめも', r: 'らりるれろ', g: 'がぎぐげご', z: 'ざじずぜぞ',
  d: 'だぢづでど', b: 'ばびぶべぼ', p: 'ぱぴぷぺぽ',
};
for (const [c, chars] of Object.entries(ROWS)) {
  [...chars].forEach((ch, i) => { BASE[ch] = c + 'aiueo'[i]; });
}
Object.assign(BASE, {
  し: 'shi', ち: 'chi', つ: 'tsu', ふ: 'fu', じ: 'ji', ぢ: 'ji', づ: 'zu',
  や: 'ya', ゆ: 'yu', よ: 'yo', わ: 'wa', を: 'o', ん: 'n', ゔ: 'vu',
  ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o', ゃ: 'ya', ゅ: 'yu', ょ: 'yo',
});

const DIGRAPH: Record<string, string> = {
  ふぁ: 'fa', ふぃ: 'fi', ふぇ: 'fe', ふぉ: 'fo', てぃ: 'ti', でぃ: 'di', うぃ: 'wi', うぇ: 'we',
  うぉ: 'wo', しぇ: 'she', ちぇ: 'che', じぇ: 'je', とぅ: 'tu', どぅ: 'du', でゅ: 'dyu',
  ゔぁ: 'va', ゔぃ: 'vi', ゔぇ: 've', ゔぉ: 'vo',
};
for (const ch of 'きしちにひみりぎじびぴ') {
  const stem = BASE[ch].slice(0, -1);
  const glide = ['sh', 'ch', 'j'].includes(stem) ? '' : 'y';
  [['ゃ', 'a'], ['ゅ', 'u'], ['ょ', 'o']].forEach(([small, v]) => { DIGRAPH[ch + small] = stem + glide + v; });
}

const PUNCT: Record<string, string> = {
  '。': '.', '、': ',', '？': '?', '！': '!', '「': '«', '」': '»', '・': ' ', '〜': '~', '（': '(', '）': ')',
};
const MACRON: Record<string, string> = { a: 'ā', i: 'ī', u: 'ū', e: 'ē', o: 'ō' };

/** Palabras cuya escritura no coincide con su pronunciación cuando van solas. */
const PARTICLE: Record<string, string> = {
  は: 'wa', へ: 'e', を: 'o', では: 'dewa', には: 'niwa', とは: 'towa', のは: 'nowa', でも: 'demo',
  こんにちは: 'konnichiwa', こんばんは: 'konbanwa', それでは: 'soredewa',
};

function word(src: string): string {
  const h = [...src].map((c) => {
    const n = c.charCodeAt(0);
    return n >= 0x30a1 && n <= 0x30f6 ? String.fromCharCode(n - 0x60) : c;
  });
  let out = '';
  let double = false;
  let nBefore = false;
  for (let i = 0; i < h.length; i++) {
    const c = h[i];
    if (c === 'っ') { double = true; continue; }
    if (c === 'ー') { out = out.replace(/[aiueo]$/, (v) => MACRON[v]); continue; }
    let r: string;
    const two = c + (h[i + 1] ?? '');
    if (DIGRAPH[two]) { r = DIGRAPH[two]; i++; } else r = BASE[c] ?? PUNCT[c] ?? c;
    if (double && /^[a-z]/.test(r)) r = (r.startsWith('ch') ? 't' : r[0]) + r;
    double = false;
    if (nBefore && /^[aiueoy]/.test(r)) out += "'";
    nBefore = c === 'ん';
    out += r;
  }
  return out;
}

/** Rōmaji de una cadena en el formato de autoría. Las partículas sueltas は/へ/を se leen wa/e/o. */
export function toRomaji(src: string): string {
  return tokens(kana(src))
    .map((tok) => {
      const m = /^(.*?)([。、？！」…]*)$/.exec(tok);
      const core = m ? m[1] : tok;
      const tail = m ? m[2] : '';
      return (PARTICLE[core] ?? word(core)) + word(tail);
    })
    .join(' ');
}

/** Piezas para «ordenar palabras»: sin puntuación final. */
export const pieces = (src: string): string[] =>
  tokens(src).map((t) => t.replace(/[。、？！]+$/, '')).filter(Boolean);

/** Compara una respuesta escrita en rōmaji con la esperada, tolerando mayúsculas, espacios y macrones. */
export function sameRomaji(a: string, b: string): boolean {
  const norm = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
  return norm(a) === norm(b);
}
