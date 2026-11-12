import test from 'node:test';
import assert from 'node:assert/strict';
import { allRefs, areas, modules, phrasebook, registerUnits, worlds } from './index';
import { buildExercises, lessonSentences, lessonVocab } from '../lib/exercises';
import { hasKanji, pieces, toRomaji } from '../lib/japanese';
import type { Lesson } from './types';

const lessons: Lesson[] = allRefs.map((r) => r.lesson);

/** Todo el japonés «hablado» de una lección: debe poder leerse (ningún kanji sin furigana). */
function spoken(l: Lesson): string[] {
  const out: string[] = [];
  for (const b of l.blocks) {
    if (b.t === 'terms' || b.t === 'sentences') b.items.forEach((t) => out.push(t.jp));
    if (b.t === 'dialogue') b.lines.forEach((x) => out.push(x.jp));
    if (b.t === 'pairs') b.items.forEach((x) => out.push(x.a, x.b));
  }
  for (const ex of l.extra ?? []) {
    if (ex.k === 'choice' && ex.scene) out.push(ex.scene.jp);
    if (ex.k === 'choice' && ex.audio) out.push(ex.audio);
    if (ex.k === 'order') out.push(ex.jp);
  }
  return out;
}

test('estructura: 8 módulos, 6 mundos y 7 áreas, ninguno vacío', () => {
  assert.equal(modules.length, 8);
  for (const m of modules) {
    assert.ok(m.units.length >= 2, `${m.id} necesita varias unidades`);
    for (const u of m.units) assert.ok(u.lessons.length >= 2, `${u.id} necesita varias lecciones`);
  }
  assert.equal(worlds.length, 6);
  for (const w of worlds) {
    assert.ok(w.scenes.length >= 2 && w.cast.length >= 2, w.id);
    for (const s of w.scenes) assert.ok(modules.some((m) => m.id === s.after), `${s.id}: módulo recomendado`);
  }
  assert.equal(areas.length, 7);
  for (const a of areas) assert.ok(a.situations.length >= 2, a.id);
});

test('los identificadores de lección son únicos', () => {
  const ids = lessons.map((l) => l.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('todo el japonés tiene lectura: ningún kanji sin furigana', () => {
  for (const l of lessons) {
    for (const jp of spoken(l)) {
      assert.ok(!hasKanji(toRomaji(jp)), `${l.id}: falta furigana en «${jp}» → ${toRomaji(jp)}`);
    }
  }
});

test('vocabulario y frases tienen traducción', () => {
  for (const l of lessons) {
    for (const t of [...lessonVocab(l), ...lessonSentences(l)]) {
      assert.ok(t.jp && t.es, `${l.id}: término incompleto «${t.jp}»`);
    }
  }
});

test('cada lección enseña algo y genera una práctica válida', () => {
  for (const l of lessons) {
    assert.ok(l.blocks.length >= 2, `${l.id}: sin contenido`);
    assert.ok(l.goal.length > 10, `${l.id}: sin objetivo`);
    const exercises = buildExercises(l);
    assert.ok(exercises.length >= 4, `${l.id}: solo ${exercises.length} ejercicios`);
    for (const ex of exercises) {
      if (ex.k === 'choice') {
        assert.ok(ex.options.length >= 2, `${l.id}: pocas opciones en «${ex.q}»`);
        assert.equal(new Set(ex.options).size, ex.options.length, `${l.id}: opciones repetidas en «${ex.q}»: ${ex.options.join(' / ')}`);
        assert.ok(ex.answer >= 0 && ex.answer < ex.options.length, `${l.id}: respuesta fuera de rango`);
        assert.ok(ex.why.length > 8, `${l.id}: falta la explicación de «${ex.q}»`);
      }
      if (ex.k === 'order') assert.ok(pieces(ex.jp).length >= 3, `${l.id}: frase demasiado corta para ordenar`);
      if (ex.k === 'type') assert.match(ex.accept, /^[a-zāīūēō' ]+$/, `${l.id}: respuesta no tecleable «${ex.accept}»`);
      if (ex.k === 'match') assert.ok(ex.pairs.length >= 4, `${l.id}: pocas parejas`);
    }
  }
});

test('las llaves de japonés en línea están bien cerradas', () => {
  const texts: string[] = [];
  for (const l of lessons) {
    for (const b of l.blocks) {
      if (b.t === 'p' || b.t === 'note') texts.push(b.text);
      if (b.t === 'table') b.rows.flat().forEach((c) => texts.push(c));
    }
    for (const ex of l.extra ?? []) if (ex.k === 'choice') texts.push(ex.why, ex.pitfall ?? '');
  }
  for (const t of texts) {
    assert.equal((t.match(/\{/g) ?? []).length, (t.match(/\}/g) ?? []).length, `llaves sin cerrar: ${t}`);
    assert.equal((t.match(/\*\*/g) ?? []).length % 2, 0, `negrita sin cerrar: ${t}`);
  }
});

test('registros: unidades con lecciones y comparador con lectura en los tres niveles', () => {
  assert.ok(registerUnits.length >= 3);
  for (const u of registerUnits) assert.ok(u.lessons.length >= 2, `${u.id} necesita varias lecciones`);
  assert.ok(registerUnits.some((u) => u.tone === 'informal') && registerUnits.some((u) => u.tone === 'formal'));
  assert.ok(phrasebook.length >= 8);
  for (const ph of phrasebook) {
    for (const jp of [ph.casual, ph.polite, ph.keigo]) {
      assert.ok(jp && !hasKanji(toRomaji(jp)), `comparador: falta furigana en «${jp}»`);
    }
    assert.equal(new Set([ph.casual, ph.polite, ph.keigo]).size, 3, `comparador: registros repetidos en «${ph.es}»`);
  }
});
