import test from 'node:test';
import assert from 'node:assert/strict';
import { findRef, neighbours, positionOf, registerRefs } from '../content';
import { completeLesson, emptyState } from './progress';

const finish = (state: ReturnType<typeof emptyState>, id: string) =>
  completeLesson(state, { id, title: id, href: `/leccion/${id}`, vocab: [], right: 3, total: 4 }).state;

test('las lecciones de registros forman un itinerario propio y ordenado', () => {
  assert.ok(registerRefs.length >= 10);
  const first = registerRefs[0].lesson.id;
  assert.equal(neighbours(first).prev, undefined);
  assert.equal(neighbours(first).next?.track, 'registros');
  assert.deepEqual(positionOf(first), { n: 1, total: registerRefs.length });
  assert.equal(findRef('reg-inf-jerga')?.backHref, '/registros');
});

test('el logro de registros exige una lección informal y una formal', () => {
  let s = finish(emptyState(), 'reg-inf-base');
  assert.ok(!s.medals.tono, 'con solo la informal no se concede');
  s = finish(s, 'reg-for-teinei');
  assert.ok(s.medals.tono, 'con las dos se concede');
});
