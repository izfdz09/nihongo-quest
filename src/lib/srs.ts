/**
 * Repetición espaciada (sistema de cajas tipo Leitner).
 * Cada acierto sube la tarjeta de caja y aleja el siguiente repaso;
 * cada fallo la devuelve al principio. Las tarjetas que se fallan a
 * menudo usan intervalos reducidos a la mitad: vuelven con más frecuencia.
 */

export interface Card {
  id: string;
  jp: string;
  es: string;
  note?: string;
  src: string;
  box: number;
  due: number;
  ok: number;
  fail: number;
  lapses: number;
}

export type CardStatus = 'nueva' | 'aprendiendo' | 'dificil' | 'dominada';

/** Días hasta el siguiente repaso según la caja. */
export const INTERVALS = [0, 1, 3, 7, 16, 35];
export const MAX_BOX = INTERVALS.length - 1;
export const MASTERED_BOX = 4;

/** Número de día local (cambia a medianoche del usuario, no en UTC). */
export function dayNumber(date = new Date()): number {
  return Math.floor((date.getTime() - date.getTimezoneOffset() * 60000) / 86400000);
}

export function newCard(id: string, jp: string, es: string, src: string, today: number, note?: string): Card {
  return { id, jp, es, note, src, box: 0, due: today, ok: 0, fail: 0, lapses: 0 };
}

export function intervalFor(box: number, lapses: number): number {
  const base = INTERVALS[Math.min(box, MAX_BOX)];
  return lapses >= 2 ? Math.ceil(base / 2) : base;
}

export function grade(card: Card, correct: boolean, today: number): Card {
  if (!correct) {
    return { ...card, box: 0, due: today, fail: card.fail + 1, lapses: card.lapses + 1 };
  }
  const box = Math.min(card.box + 1, MAX_BOX);
  return { ...card, box, due: today + intervalFor(box, card.lapses), ok: card.ok + 1 };
}

export const isDue = (card: Card, today: number): boolean => card.due <= today;

export function statusOf(card: Card): CardStatus {
  if (card.box >= MASTERED_BOX) return 'dominada';
  if (card.lapses >= 2) return 'dificil';
  if (card.ok + card.fail === 0) return 'nueva';
  return 'aprendiendo';
}

/** Tarjetas pendientes hoy: primero las más falladas, después las más atrasadas. */
export function dueCards(cards: Card[], today: number): Card[] {
  return cards
    .filter((c) => isDue(c, today))
    .sort((a, b) => b.lapses - a.lapses || a.due - b.due || a.box - b.box);
}

export function accuracy(cards: Card[]): number {
  const ok = cards.reduce((n, c) => n + c.ok, 0);
  const total = ok + cards.reduce((n, c) => n + c.fail, 0);
  return total === 0 ? 0 : Math.round((ok / total) * 100);
}
