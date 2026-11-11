import type { Block, Exercise, Lesson, Line, Term } from './types';

/* Atajos para escribir contenido de forma compacta. Formato: "japonés|español|nota". */

export const term = (s: string): Term => {
  const [jp, es, note] = s.split('|');
  return { jp: jp.trim(), es: (es ?? '').trim(), note: note?.trim() };
};

const line = (s: string): Line => {
  const [who, jp, es] = s.split('|');
  return { who: who.trim(), jp: jp.trim(), es: (es ?? '').trim() };
};

export const p = (text: string): Block => ({ t: 'p', text });
export const h = (text: string): Block => ({ t: 'h', text });
export const tip = (title: string, text: string): Block => ({ t: 'note', kind: 'tip', title, text });
export const ojo = (title: string, text: string): Block => ({ t: 'note', kind: 'ojo', title, text });
export const cultura = (title: string, text: string): Block => ({ t: 'note', kind: 'cultura', title, text });
export const terms = (title: string, ...items: string[]): Block => ({ t: 'terms', title, items: items.map(term) });
export const frases = (title: string, ...items: string[]): Block => ({ t: 'sentences', title, items: items.map(term) });
export const dlg = (title: string, ...lines: string[]): Block => ({ t: 'dialogue', title, lines: lines.map(line) });
export const table = (head: string[], ...rows: string[][]): Block => ({ t: 'table', head, rows });
export const kanaBlock = (chars: string): Block => ({ t: 'kana', chars: chars.split(' ') });
export const write = (chars: string): Block => ({ t: 'write', chars: chars.split(' ') });
export const pairs = (title: string, ...items: string[]): Block => ({
  t: 'pairs',
  title,
  items: items.map((s) => {
    const [a, b, note] = s.split('|');
    return { a, b, note };
  }),
});

/* Ejercicios: la primera opción es siempre la correcta; se barajan al jugar. */

type ChoiceOpts = { jp?: string; pitfall?: string; bare?: boolean };

export const q = (question: string, options: string[], why: string, o: ChoiceOpts = {}): Exercise => ({
  k: 'choice', q: question, options, answer: 0, why, ...o,
});

/** Completar la frase: usa ＿＿ como hueco. */
export const fill = (jp: string, es: string, options: string[], why: string, pitfall?: string): Exercise => ({
  k: 'choice', q: `Completa la frase: «${es}»`, jp, options, answer: 0, why, pitfall, bare: true,
});

/** Conversación simulada: alguien dice algo y el alumno elige cómo responder. */
export const reply = (scene: string, options: string[], why: string, pitfall?: string): Exercise => ({
  k: 'choice', q: '¿Qué respondes?', scene: line(scene), options, answer: 0, why, pitfall,
});

/** Escuchar y elegir. */
export const listen = (audio: string, question: string, options: string[], why: string, pitfall?: string): Exercise => ({
  k: 'choice', q: question, audio, options, answer: 0, why, pitfall, bare: true,
});

export const order = (jp: string, es: string, why?: string): Exercise => ({ k: 'order', jp, es, why });

export const lesson = (
  id: string, title: string, jp: string, goal: string, blocks: Block[], extra: Exercise[] = [],
): Lesson => ({ id, title, jp, goal, blocks, extra });
