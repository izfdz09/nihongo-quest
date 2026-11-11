import type { Exercise, Lesson, Term } from '../content/types';
import { display, hasKanji, pieces, toRomaji } from './japanese';

/**
 * Convierte una lección en una sesión de práctica.
 * Los ejercicios escritos a mano se combinan con otros generados a partir del
 * vocabulario, las frases y los kana de la lección, ordenados de menor a mayor
 * dificultad: reconocer → escuchar → producir → ordenar → escribir.
 */

type Rnd = () => number;

export function shuffle<T>(items: T[], rnd: Rnd = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const cardId = (jp: string): string => display(jp);

export function lessonVocab(lesson: Lesson): Term[] {
  const seen = new Set<string>();
  const out: Term[] = [];
  for (const b of lesson.blocks) {
    if (b.t !== 'terms') continue;
    for (const t of b.items) {
      if (seen.has(t.jp)) continue;
      seen.add(t.jp);
      out.push(t);
    }
  }
  return out;
}

export function lessonSentences(lesson: Lesson): Term[] {
  return lesson.blocks.flatMap((b) => (b.t === 'sentences' ? b.items : []));
}

/** Baraja las opciones conservando cuál es la correcta. */
function mixChoice(ex: Extract<Exercise, { k: 'choice' }>, rnd: Rnd): Exercise {
  const right = ex.options[ex.answer];
  const options = shuffle(ex.options, rnd);
  return { ...ex, options, answer: options.indexOf(right) };
}

function pick<T>(pool: T[], n: number, rnd: Rnd, not: (x: T) => boolean): T[] {
  return shuffle(pool.filter((x) => !not(x)), rnd).slice(0, n);
}

function kanaExercises(chars: string[], rnd: Rnd): Exercise[] {
  const ro = (c: string) => toRomaji(c);
  // Se descartan como objetivo los caracteres cuya lectura coincide con otro (じ/ぢ, ず/づ, お/を).
  const count = new Map<string, number>();
  chars.forEach((c) => count.set(ro(c), (count.get(ro(c)) ?? 0) + 1));
  const usable = chars.filter((c) => count.get(ro(c)) === 1);
  const targets = shuffle(usable, rnd).slice(0, 6);
  const out: Exercise[] = [];
  targets.forEach((c, i) => {
    const others = pick(usable, 3, rnd, (x) => x === c);
    if (others.length < 2) return;
    if (i % 3 === 0) {
      out.push(mixChoice({ k: 'choice', q: '¿Cómo se lee este carácter?', jp: c, bare: true, options: [ro(c), ...others.map(ro)], answer: 0, why: `{${c}} se lee «${ro(c)}».` }, rnd));
    } else if (i % 3 === 1) {
      out.push(mixChoice({ k: 'choice', q: 'Escucha y elige el carácter.', audio: c, bare: true, options: [c, ...others], answer: 0, why: `Has oído «${ro(c)}», que se escribe {${c}}.` }, rnd));
    } else {
      out.push(mixChoice({ k: 'choice', q: `¿Qué carácter se lee «${ro(c)}»?`, bare: true, options: [c, ...others], answer: 0, why: `«${ro(c)}» se escribe {${c}}.` }, rnd));
    }
  });
  shuffle(usable.filter((c) => !targets.slice(0, 3).includes(c)), rnd).slice(0, 2).forEach((c) => {
    out.push({ k: 'type', q: 'Escribe en rōmaji cómo se lee.', jp: c, accept: ro(c), why: `{${c}} se lee «${ro(c)}».` });
  });
  return out;
}

function vocabExercises(vocab: Term[], rnd: Rnd): { easy: Exercise[]; hard: Exercise[] } {
  const easy: Exercise[] = [];
  const hard: Exercise[] = [];
  if (vocab.length < 3) return { easy, hard };
  const order = shuffle(vocab, rnd);
  const explain = (t: Term) => `{${t.jp}} (${toRomaji(t.jp)}) significa «${t.es}».${t.note ? ` ${t.note}` : ''}`;
  const others = (t: Term) => pick(vocab, 2, rnd, (x) => x === t || x.es === t.es);

  order.slice(0, Math.min(3, vocab.length)).forEach((t) => {
    easy.push(mixChoice({ k: 'choice', q: '¿Qué significa?', jp: t.jp, options: [t.es, ...others(t).map((o) => o.es)], answer: 0, why: explain(t), term: t }, rnd));
  });
  order.slice(3, 5).concat(order.slice(0, 1)).slice(0, 2).forEach((t) => {
    easy.push(mixChoice({ k: 'choice', q: 'Escucha y elige el significado.', audio: t.jp, bare: true, options: [t.es, ...others(t).map((o) => o.es)], answer: 0, why: `Has oído ${explain(t)}`, term: t }, rnd));
  });
  shuffle(vocab, rnd).slice(0, Math.min(2, vocab.length)).forEach((t) => {
    hard.push(mixChoice({ k: 'choice', q: `¿Cómo se dice «${t.es}»?`, options: [t.jp, ...others(t).map((o) => o.jp)], answer: 0, why: explain(t), term: t }, rnd));
  });
  if (vocab.length >= 4) hard.push({ k: 'match', pairs: shuffle(vocab, rnd).slice(0, 5) });
  const typable = shuffle(vocab.filter((t) => !hasKanji(t.jp) && !/[〜…]/.test(t.jp) && toRomaji(t.jp).length <= 14), rnd)[0];
  if (typable) {
    hard.push({ k: 'type', q: `Escribe en rōmaji cómo se lee esta palabra («${typable.es}»).`, jp: typable.jp, accept: toRomaji(typable.jp), why: `{${typable.jp}} se lee «${toRomaji(typable.jp)}».` });
  }
  return { easy, hard };
}

function orderExercises(sentences: Term[], rnd: Rnd): Exercise[] {
  return shuffle(sentences.filter((s) => {
    const n = pieces(s.jp).length;
    return n >= 3 && n <= 7;
  }), rnd).slice(0, 2).map((s) => ({ k: 'order', jp: s.jp, es: s.es }));
}

export function buildExercises(lesson: Lesson, rnd: Rnd = Math.random): Exercise[] {
  const { easy, hard } = vocabExercises(lessonVocab(lesson), rnd);
  const kana = lesson.kana ? kanaExercises(lesson.kana, rnd) : [];
  const written = (lesson.extra ?? []).map((ex) => (ex.k === 'choice' ? mixChoice(ex, rnd) : ex));
  const kanaChoice = kana.filter((e) => e.k === 'choice');
  const kanaType = kana.filter((e) => e.k === 'type');
  return [...kanaChoice, ...easy, ...written, ...hard, ...orderExercises(lessonSentences(lesson), rnd), ...kanaType];
}

/** Respuesta correcta en texto, para mostrarla en la explicación y en el registro de errores. */
export function answerText(ex: Exercise): string {
  switch (ex.k) {
    case 'choice': return ex.options[ex.answer];
    case 'order': return ex.jp;
    case 'type': return ex.accept;
    case 'match': return ex.pairs.map((p) => `${display(p.jp)} = ${p.es}`).join(' · ');
  }
}

export function promptText(ex: Exercise): string {
  switch (ex.k) {
    case 'choice': return [ex.q, ex.scene ? display(ex.scene.jp) : ex.jp ? display(ex.jp) : ''].filter(Boolean).join(' ');
    case 'order': return `Ordena: «${ex.es}»`;
    case 'type': return `${ex.q} ${display(ex.jp)}`;
    case 'match': return 'Une cada palabra con su significado';
  }
}
