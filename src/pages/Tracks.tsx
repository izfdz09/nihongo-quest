import type { CSSProperties } from 'react';
import { Avatar, WorldArt } from '../components/Art';
import { Meter, PageHead, Stations } from '../components/Layout';
import { areas, modules, nextAcademyLesson, worlds } from '../content';
import { to } from '../lib/router';
import { useStore } from '../lib/store';

/* Academia, Mundos de aprendizaje y «Mi futuro en Japón». */

const count = (ids: string[], done: Record<string, unknown>) => ids.filter((id) => done[id]).length;

export function AcademyPage() {
  const { state } = useStore();
  return (
    <>
      <PageHead jp="がくいん" title="Academia de japonés">
        Ocho líneas que se recorren en orden, de la primera sílaba al japonés intermedio. Puedes entrar en cualquier parada: nada está bloqueado.
      </PageHead>
      <ol className="lines">
        {modules.map((m) => {
          const ids = m.units.flatMap((u) => u.lessons.map((l) => l.id));
          const done = count(ids, state.done);
          return (
            <li key={m.id} style={{ '--line': m.color } as CSSProperties}>
              <a href={to(`/academia/${m.id}`)}>
                <span className="line-n">{m.n}</span>
                <span className="line-body">
                  <span className="line-jp" lang="ja">{m.jp}</span>
                  <strong>{m.title}</strong>
                  <span>{m.desc}</span>
                </span>
                <span className="line-meta">
                  <span className="tag">{m.level}</span>
                  <span>{done} de {ids.length} lecciones</span>
                  <Meter value={done} max={ids.length} label={`Progreso de ${m.title}`} />
                </span>
              </a>
            </li>
          );
        })}
      </ol>
      <p className="fineprint">Los niveles N5 y N4 son una referencia orientativa del examen JLPT. Completar un módulo no equivale a aprobar el examen: para eso hacen falta además práctica de comprensión, vocabulario más amplio y simulacros oficiales.</p>
    </>
  );
}

export function ModulePage({ id }: { id: string }) {
  const { state } = useStore();
  const m = modules.find((x) => x.id === id);
  if (!m) return <section className="empty"><h1>Este módulo no existe</h1><a className="btn btn-main" href={to('/academia')}>Ver la Academia</a></section>;
  const next = nextAcademyLesson(state.done);
  const romaji = m.stage === 1 ? 'El rōmaji está siempre visible.' : 'El rōmaji aparece solo si lo pides: intenta leer primero el kana.';
  return (
    <div style={{ '--line': m.color } as CSSProperties}>
      <a className="crumb" href={to('/academia')}>Academia</a>
      <PageHead jp={m.jp} title={`Módulo ${m.n}. ${m.title}`}>{m.desc} {romaji}</PageHead>
      {m.units.map((u, i) => (
        <section key={u.id} className="unit">
          <h2><span className="unit-n">Unidad {i + 1}</span>{u.title}</h2>
          <Stations lessons={u.lessons} color={m.color} nextId={next?.lesson.id} />
        </section>
      ))}
    </div>
  );
}

export function WorldsPage() {
  const { state } = useStore();
  return (
    <>
      <PageHead jp="せかい" title="Mundos de aprendizaje">
        Seis ambientaciones con personajes propios para usar lo que estudias en la Academia. Los mundos no sustituyen a las lecciones: son el sitio donde ponerlas en práctica.
      </PageHead>
      <ul className="worlds">
        {worlds.map((w) => (
          <li key={w.id} style={{ '--line': w.color } as CSSProperties}>
            <a href={to(`/mundos/${w.id}`)}>
              <WorldArt id={w.id} />
              <span className="world-body">
                <span className="world-jp" lang="ja">{w.jp}</span>
                <strong>{w.name}</strong>
                <span>{w.tagline}</span>
                <span className="world-meta">{count(w.scenes.map((s) => s.id), state.done)} de {w.scenes.length} escenas</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export function WorldPage({ id }: { id: string }) {
  const w = worlds.find((x) => x.id === id);
  if (!w) return <section className="empty"><h1>Este mundo no existe</h1><a className="btn btn-main" href={to('/mundos')}>Ver los mundos</a></section>;
  return (
    <div style={{ '--line': w.color } as CSSProperties}>
      <a className="crumb" href={to('/mundos')}>Mundos de aprendizaje</a>
      <div className="world-hero"><WorldArt id={w.id} /><div><span className="page-jp" lang="ja">{w.jp}</span><h1>{w.name}</h1><p>{w.tagline}</p></div></div>
      <p className="lead">{w.desc}</p>
      <section className="unit">
        <h2>Quién te acompaña</h2>
        <ul className="cast">
          {w.cast.map((c) => (
            <li key={c.name}><Avatar look={c.look} size={84} /><div><strong>{c.name}</strong> <span lang="ja">{c.jp}</span><br /><em>{c.role}</em><p>{c.bio}</p></div></li>
          ))}
        </ul>
      </section>
      <section className="unit">
        <h2>Escenas y retos</h2>
        <Stations lessons={w.scenes} color={w.color} note={(l) => {
          const after = modules.find((m) => m.id === (l as (typeof w.scenes)[number]).after);
          return after ? <span className="st-note">Recomendada después del módulo {after.n}, {after.title}</span> : null;
        }} />
      </section>
      <p className="fineprint">Los personajes, lugares y diálogos de este mundo son originales de NIHONGO QUEST.</p>
    </div>
  );
}

export function JapanPage() {
  const { state } = useStore();
  return (
    <>
      <PageHead jp="日本でくらす" title="Mi futuro en Japón">
        Japonés práctico para vivir, estudiar y trabajar allí: diálogos realistas, vocabulario, notas culturales y la diferencia entre el registro informal, el cortés y el keigo.
      </PageHead>
      <ol className="lines lines-japan">
        {areas.map((a, i) => {
          const ids = a.situations.map((s) => s.id);
          const done = count(ids, state.done);
          return (
            <li key={a.id}>
              <a href={to(`/japon/${a.id}`)}>
                <span className="line-n">{i + 1}</span>
                <span className="line-body"><span className="line-jp" lang="ja">{a.jp}</span><strong>{a.title}</strong><span>{a.desc}</span></span>
                <span className="line-meta"><span>{done} de {ids.length} situaciones</span><Meter value={done} max={ids.length} label={`Progreso de ${a.title}`} /></span>
              </a>
            </li>
          );
        })}
      </ol>
      <p className="fineprint">Este itinerario usa kanji con furigana y da por sabidos el kana y la gramática básica (módulos 2 a 5). Los trámites y costes descritos son orientativos y cambian con el tiempo: confirma siempre la información oficial antes de hacer una gestión.</p>
    </>
  );
}

export function AreaPage({ id }: { id: string }) {
  const a = areas.find((x) => x.id === id);
  if (!a) return <section className="empty"><h1>Esta sección no existe</h1><a className="btn btn-main" href={to('/japon')}>Ver el itinerario</a></section>;
  return (
    <div style={{ '--line': 'var(--asagi)' } as CSSProperties}>
      <a className="crumb" href={to('/japon')}>Mi futuro en Japón</a>
      <PageHead jp={a.jp} title={a.title}>{a.desc}</PageHead>
      <section className="unit"><h2>Situaciones</h2><Stations lessons={a.situations} color="var(--asagi)" /></section>
    </div>
  );
}
