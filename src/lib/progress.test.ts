import test from 'node:test';
import assert from 'node:assert/strict';
import { addMistake, completeLesson, emptyState, failWord, levelOf, liveStreak, reviewCard, xpForLevel } from './progress';
import { dayNumber } from './srs';

const result = { id: 'pal-saludos', title: 'Saludos', href: '/leccion/pal-saludos', vocab: [{ jp: 'みず', es: 'agua' }, { jp: '山[やま]', es: 'montaña' }], right: 8, total: 10 };

test('completar una lección da XP, crea tarjetas, inicia la racha y concede un logro', () => {
  const { state, xp } = completeLesson(emptyState(), result);
  assert.equal(xp, 36);
  assert.equal(state.xp, 36);
  assert.equal(state.done['pal-saludos'].best, 80);
  assert.deepEqual(Object.keys(state.cards), ['みず', '山']);
  assert.equal(state.streak.count, 1);
  assert.ok(state.medals.paso);
  assert.equal(state.log[0].xp, 36);
});

test('repetir una lección da menos XP y no duplica tarjetas', () => {
  const first = completeLesson(emptyState(), result).state;
  const { state, xp } = completeLesson(first, { ...result, right: 10 });
  assert.equal(xp, 5);
  assert.equal(state.done['pal-saludos'].times, 2);
  assert.equal(state.done['pal-saludos'].best, 100);
  assert.equal(Object.keys(state.cards).length, 2);
});

test('la racha continúa al día siguiente y se rompe si se salta un día', () => {
  const today = dayNumber();
  const base = completeLesson(emptyState(), result).state;
  const yesterday = { ...base, streak: { count: 4, best: 4, last: today - 1 } };
  assert.equal(completeLesson(yesterday, result).state.streak.count, 5);
  const gap = { ...base, streak: { count: 4, best: 4, last: today - 3 } };
  assert.equal(liveStreak(gap), 0);
  const resumed = completeLesson(gap, result).state;
  assert.equal(resumed.streak.count, 1);
  assert.equal(resumed.streak.best, 4);
});

test('repasar mueve la tarjeta y fallar un ejercicio la trae de vuelta', () => {
  let s = completeLesson(emptyState(), result).state;
  s = reviewCard(s, 'みず', true);
  assert.equal(s.cards['みず'].box, 1);
  assert.equal(s.counts.reviews, 1);
  s = failWord(s, { jp: 'みず', es: 'agua' }, 'pal-saludos');
  assert.equal(s.cards['みず'].box, 0);
  assert.equal(s.cards['みず'].lapses, 1);
  s = reviewCard(reviewCard(s, 'みず', true), '山', true);
  assert.equal(s.log.filter((l) => l.text === 'Repaso de tarjetas').length, 1, 'los repasos del día se agrupan');
});

test('los errores se guardan sin repetirse y los niveles crecen de forma progresiva', () => {
  let s = addMistake(emptyState(), { q: 'a', answer: 'b', why: 'c', lesson: 'x' });
  s = addMistake(s, { q: 'a', answer: 'b', why: 'c', lesson: 'x' });
  assert.equal(s.mistakes.length, 1);
  assert.equal(levelOf(0).level, 1);
  assert.equal(levelOf(59).level, 1);
  assert.equal(levelOf(60).level, 2);
  assert.equal(levelOf(xpForLevel(6)).title, 'Aventurero');
});
