import { modules } from './academy';
import { areas } from './japan';
import type { Lesson, LessonRef } from './types';
import { worlds } from './worlds';

export { modules, worlds, areas };

const refs: LessonRef[] = [];

for (const m of modules) {
  for (const u of m.units) {
    for (const lesson of u.lessons) {
      refs.push({ lesson, track: 'academia', stage: m.stage, color: m.color, groupId: m.id, groupTitle: `Módulo ${m.n} · ${m.title}`, unitTitle: u.title, backHref: `/academia/${m.id}` });
    }
  }
}
for (const w of worlds) {
  for (const lesson of w.scenes) {
    refs.push({ lesson, track: 'mundos', stage: 2, color: w.color, groupId: w.id, groupTitle: `Mundo ${w.name}`, backHref: `/mundos/${w.id}` });
  }
}
for (const a of areas) {
  for (const lesson of a.situations) {
    refs.push({ lesson, track: 'japon', stage: 3, color: '#4fc0c0', groupId: a.id, groupTitle: `Mi futuro en Japón · ${a.title}`, backHref: `/japon/${a.id}` });
  }
}

export const allRefs: LessonRef[] = refs;
const byId = new Map(refs.map((r) => [r.lesson.id, r]));

export const findRef = (id: string): LessonRef | undefined => byId.get(id);

/** Lección anterior y siguiente dentro del mismo itinerario. */
export function neighbours(id: string): { prev?: LessonRef; next?: LessonRef } {
  const ref = byId.get(id);
  if (!ref) return {};
  const same = refs.filter((r) => r.track === ref.track && (ref.track !== 'mundos' || r.groupId === ref.groupId));
  const i = same.indexOf(ref);
  return { prev: same[i - 1], next: same[i + 1] };
}

export const academyRefs = refs.filter((r) => r.track === 'academia');
export const lessonsOf = (groupId: string): Lesson[] => refs.filter((r) => r.groupId === groupId).map((r) => r.lesson);

/** Primera lección de la Academia que el alumno aún no ha completado. */
export function nextAcademyLesson(done: Record<string, unknown>): LessonRef | undefined {
  return academyRefs.find((r) => !done[r.lesson.id]);
}
