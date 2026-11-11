import { lessonsOf, worlds } from '../content';
import type { Term } from '../content/types';
import { cardId } from './exercises';
import { dayNumber, grade, MASTERED_BOX, newCard, type Card } from './srs';

/* Estado del alumno y operaciones puras sobre él (sin React, para poder probarlas). */

export interface Mistake { q: string; answer: string; why: string; lesson: string; day: number }
export interface LogEntry { ts: number; text: string; xp: number; href?: string }
export interface Settings {
  romaji: 'auto' | 'always' | 'never';
  theme: 'dark' | 'light';
  rate: number;
  voice: string;
  goal: number;
}
export interface State {
  v: 1;
  xp: number;
  done: Record<string, { day: number; best: number; times: number }>;
  streak: { count: number; best: number; last: number };
  daily: Record<string, number>;
  cards: Record<string, Card>;
  mistakes: Mistake[];
  log: LogEntry[];
  medals: Record<string, number>;
  settings: Settings;
  counts: { reviews: number; recordings: number };
}

export const emptyState = (): State => ({
  v: 1, xp: 0, done: {}, streak: { count: 0, best: 0, last: 0 }, daily: {}, cards: {}, mistakes: [], log: [], medals: {},
  settings: { romaji: 'auto', theme: 'dark', rate: 1, voice: '', goal: 30 },
  counts: { reviews: 0, recordings: 0 },
});

/* ---------- nivel ---------- */

/** XP total necesario para alcanzar un nivel: 0, 60, 180, 360, 600… */
export const xpForLevel = (level: number): number => 30 * level * (level - 1);

export function levelOf(xp: number): { level: number; into: number; span: number; title: string; jp: string } {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) level++;
  const rank = [...RANKS].reverse().find((r) => level >= r.from) ?? RANKS[0];
  return { level, into: xp - xpForLevel(level), span: xpForLevel(level + 1) - xpForLevel(level), title: rank.title, jp: rank.jp };
}

const RANKS = [
  { from: 1, jp: '旅人', title: 'Viajero' },
  { from: 3, jp: '見習い', title: 'Aprendiz' },
  { from: 6, jp: '冒険者', title: 'Aventurero' },
  { from: 10, jp: '達人', title: 'Experto' },
  { from: 15, jp: '師範', title: 'Maestro' },
];

/* ---------- logros ---------- */

const allDone = (s: State, groupId: string) => lessonsOf(groupId).every((l) => s.done[l.id]);
const mastered = (s: State) => Object.values(s.cards).filter((c) => c.box >= MASTERED_BOX).length;

export const MEDALS: { id: string; jp: string; title: string; desc: string; test: (s: State) => boolean }[] = [
  { id: 'paso', jp: '一歩', title: 'El primer paso', desc: 'Completa tu primera lección.', test: (s) => Object.keys(s.done).length >= 1 },
  { id: 'hira', jp: 'あ', title: 'Hiragana completo', desc: 'Termina el módulo de hiragana.', test: (s) => allDone(s, 'm2') },
  { id: 'kata', jp: 'ア', title: 'Katakana completo', desc: 'Termina el módulo de katakana.', test: (s) => allDone(s, 'm3') },
  { id: 'kanji', jp: '字', title: 'Primeros kanji', desc: 'Termina el módulo de kanji.', test: (s) => allDone(s, 'm7') },
  { id: 'r3', jp: '三日', title: 'Más de tres días', desc: 'Estudia tres días seguidos. En japonés, quien abandona pronto es un «monje de tres días».', test: (s) => s.streak.best >= 3 },
  { id: 'r7', jp: '七日', title: 'Una semana entera', desc: 'Estudia siete días seguidos.', test: (s) => s.streak.best >= 7 },
  { id: 'r30', jp: '継続', title: 'La constancia es fuerza', desc: 'Estudia treinta días seguidos.', test: (s) => s.streak.best >= 30 },
  { id: 'v50', jp: '五十', title: 'Cincuenta palabras', desc: 'Reúne 50 palabras en tu repaso.', test: (s) => Object.keys(s.cards).length >= 50 },
  { id: 'v200', jp: '二百', title: 'Doscientas palabras', desc: 'Reúne 200 palabras en tu repaso.', test: (s) => Object.keys(s.cards).length >= 200 },
  { id: 'dom', jp: '覚', title: 'Memoria a largo plazo', desc: 'Domina 25 palabras.', test: (s) => mastered(s) >= 25 },
  { id: 'rep', jp: '復習', title: 'Repasar es aprender', desc: 'Haz 100 repasos de tarjetas.', test: (s) => s.counts.reviews >= 100 },
  { id: 'voz', jp: '声', title: 'En voz alta', desc: 'Graba tu voz por primera vez.', test: (s) => s.counts.recordings >= 1 },
  { id: 'mundos', jp: '世界', title: 'Seis mundos', desc: 'Completa una escena en cada mundo.', test: (s) => worlds.every((w) => w.scenes.some((sc) => s.done[sc.id])) },
  { id: 'japon', jp: '上陸', title: 'Tierra a la vista', desc: 'Completa tu primera situación de «Mi futuro en Japón».', test: (s) => Object.keys(s.done).some((id) => id.startsWith('jp-')) },
];

export function withMedals(s: State): State {
  const today = dayNumber();
  let medals = s.medals;
  for (const m of MEDALS) {
    if (!medals[m.id] && m.test(s)) medals = { ...medals, [m.id]: today };
  }
  return medals === s.medals ? s : { ...s, medals };
}

/* ---------- operaciones puras ---------- */

export function earn(s: State, xp: number, text: string, href?: string): State {
  const today = dayNumber();
  const last = s.streak.last;
  const count = last === today ? s.streak.count : last === today - 1 ? s.streak.count + 1 : 1;
  return {
    ...s,
    xp: s.xp + xp,
    daily: { ...s.daily, [today]: (s.daily[today] ?? 0) + xp },
    streak: { count, best: Math.max(s.streak.best, count), last: today },
    log: [{ ts: Date.now(), text, xp, href }, ...s.log].slice(0, 30),
  };
}

function addCards(cards: Record<string, Card>, vocab: Term[], src: string): Record<string, Card> {
  const today = dayNumber();
  const next = { ...cards };
  for (const t of vocab) {
    const id = cardId(t.jp);
    if (!next[id]) next[id] = newCard(id, t.jp, t.es, src, today, t.note);
  }
  return next;
}

export interface LessonResult { id: string; title: string; href: string; vocab: Term[]; right: number; total: number }

export function completeLesson(s: State, r: LessonResult): { state: State; xp: number } {
  const prev = s.done[r.id];
  const score = r.total ? Math.round((r.right / r.total) * 100) : 100;
  const xp = prev ? 5 : 20 + r.right * 2;
  let state = earn(s, xp, `${prev ? 'Repasaste' : 'Completaste'} «${r.title}»`, r.href);
  state = {
    ...state,
    done: { ...state.done, [r.id]: { day: dayNumber(), best: Math.max(prev?.best ?? 0, score), times: (prev?.times ?? 0) + 1 } },
    cards: addCards(state.cards, r.vocab, r.id),
  };
  return { state: withMedals(state), xp };
}

export function reviewCard(s: State, id: string, ok: boolean): State {
  const card = s.cards[id];
  if (!card) return s;
  const state = earn(s, ok ? 2 : 1, 'Repaso de tarjetas', '/repaso');
  // El registro de actividad agrupa los repasos del día en una sola línea.
  const [first, second, ...rest] = state.log;
  const log = second && second.text === first.text && dayNumber(new Date(second.ts)) === dayNumber()
    ? [{ ...first, xp: first.xp + second.xp }, ...rest]
    : state.log;
  return withMedals({ ...state, log, cards: { ...s.cards, [id]: grade(card, ok, dayNumber()) }, counts: { ...s.counts, reviews: s.counts.reviews + 1 } });
}

/** Un fallo en un ejercicio hace que la palabra vuelva antes al repaso. */
export function failWord(s: State, term: Term, src: string): State {
  const cards = addCards(s.cards, [term], src);
  const id = cardId(term.jp);
  return { ...s, cards: { ...cards, [id]: grade(cards[id], false, dayNumber()) } };
}

export function addMistake(s: State, m: Omit<Mistake, 'day'>): State {
  const mistakes = [{ ...m, day: dayNumber() }, ...s.mistakes.filter((x) => x.q !== m.q)].slice(0, 40);
  return { ...s, mistakes };
}

/** La racha solo cuenta si se estudió hoy o ayer. */
export function liveStreak(s: State, today = dayNumber()): number {
  return s.streak.last >= today - 1 ? s.streak.count : 0;
}
