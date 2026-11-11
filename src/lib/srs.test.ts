import test from 'node:test';
import assert from 'node:assert/strict';
import { accuracy, dueCards, grade, intervalFor, newCard, statusOf } from './srs';

test('los aciertos alejan el repaso y los fallos lo traen a hoy', () => {
  let c = newCard('a', 'みず', 'agua', 'l1', 100);
  c = grade(c, true, 100);
  assert.equal(c.box, 1);
  assert.equal(c.due, 101);
  c = grade(c, true, 101);
  assert.equal(c.due, 104);
  c = grade(c, false, 104);
  assert.equal(c.box, 0);
  assert.equal(c.due, 104);
  assert.equal(c.lapses, 1);
});

test('las tarjetas falladas a menudo vuelven con más frecuencia', () => {
  assert.equal(intervalFor(3, 0), 7);
  assert.equal(intervalFor(3, 2), 4);
  let c = newCard('a', 'みず', 'agua', 'l1', 0);
  c = grade(grade(c, false, 0), false, 0);
  assert.equal(statusOf(c), 'dificil');
  c = grade(c, true, 0);
  assert.equal(c.due, 1);
  c = grade(c, true, 1);
  assert.equal(c.due, 3, 'intervalo de 3 días reducido a 2');
});

test('estado, orden de pendientes y porcentaje de aciertos', () => {
  const fresh = newCard('n', 'やま', 'montaña', 'l1', 10);
  assert.equal(statusOf(fresh), 'nueva');
  let hard = newCard('h', 'かわ', 'río', 'l1', 10);
  hard = grade(grade(hard, false, 10), false, 10);
  let known = newCard('k', 'ひ', 'sol', 'l1', 0);
  for (let d = 0; d < 4; d++) known = grade(known, true, d);
  assert.equal(statusOf(known), 'dominada');
  assert.deepEqual(dueCards([fresh, known, hard], 10).map((c) => c.id), ['h', 'n']);
  assert.equal(accuracy([hard, known]), 67);
});
