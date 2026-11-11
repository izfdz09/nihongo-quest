import type { CSSProperties } from 'react';
import { WorldArt } from '../components/Art';
import { Meter } from '../components/Layout';
import { academyRefs, allRefs, areas, findRef, modules, nextAcademyLesson, worlds } from '../content';
import { levelOf, liveStreak } from '../lib/progress';
import { to } from '../lib/router';
import { dueCards } from '../lib/srs';
import { useStore } from '../lib/store';

const STEPS = [
  { title: 'Estudia una lección corta', text: 'Explicaciones en español, ejemplos en japonés con audio y los errores típicos de quien habla español.' },
  { title: 'Practica y entiende cada respuesta', text: 'Tests, frases para ordenar, escucha y conversaciones simuladas. Aciertes o falles, siempre sabrás por qué.' },
  { title: 'Repasa unos minutos al día', text: 'Las palabras vuelven justo antes de que las olvides, y las que fallas, mucho antes.' },
  { title: 'Úsalo en situaciones reales', text: 'Seis mundos con personajes propios y un itinerario para alquilar, trabajar o ir al médico en Japón.' },
];

export function HomePage() {
  const { state, today } = useStore();
  const doneIds = Object.keys(state.done);
  const started = doneIds.length > 0;
  const next = nextAcademyLesson(state.done);
  const last = state.log.find((l) => l.href?.startsWith('/leccion/'));
  const lastRef = last?.href ? findRef(last.href.replace('/leccion/', '')) : undefined;
  const academyDone = academyRefs.filter((r) => state.done[r.lesson.id]).length;
  const level = levelOf(state.xp);
  const due = dueCards(Object.values(state.cards), today).length;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-sign" aria-hidden="true">
          <div className="hero-plate">
            <span className="hero-kana" lang="ja">にほんごクエスト</span>
            <span className="hero-name">NIHONGO QUEST</span>
          </div>
          <div className="sign-band">
            <span className="sign-prev">{lastRef ? lastRef.lesson.title : 'Cero japonés'}</span>
            <span className="sign-here" />
            <span className="sign-next">{started && next ? next.lesson.title : 'Vivir en Japón'}</span>
          </div>
        </div>
        <div className="hero-copy">
          <h1>Aprende japonés desde cero, parada a parada.</h1>
          <p>De tu primera sílaba a desenvolverte en Japón: lecciones en español, audio en japonés, ejercicios que explican cada respuesta y un repaso diario que se adapta a lo que fallas.</p>
          <div className="hero-actions">
            {started && next && <a className="btn btn-main" href={to(`/leccion/${next.lesson.id}`)}>Continuar aprendiendo</a>}
            <a className={`btn ${started ? 'btn-quiet' : 'btn-main'}`} href={to(started ? '/academia' : '/leccion/intro-idioma')}>Comenzar a aprender</a>
            {!started && <a className="btn btn-quiet" href={to('/academia')}>Ver el recorrido completo</a>}
          </div>
          {started && next && <p className="hero-next">Tu siguiente parada: <strong>{next.lesson.title}</strong>, en {next.groupTitle}.</p>}
        </div>
      </section>

      {started && (
        <section className="home-progress" aria-label="Tu progreso">
          <a href={to('/panel')}><span className="stat-n">{level.level}</span><span>Nivel<br /><small>{level.title}</small></span></a>
          <a href={to('/panel')}><span className="stat-n">{liveStreak(state, today)}</span><span>Días de racha</span></a>
          <a href={to('/academia')}><span className="stat-n">{Math.round((academyDone / academyRefs.length) * 100)} %</span><span>Academia<br /><small>{academyDone} de {academyRefs.length} lecciones</small></span></a>
          <a href={to('/repaso')} className={due ? 'stat-due' : ''}><span className="stat-n">{due}</span><span>Tarjetas para repasar hoy</span></a>
        </section>
      )}

      <section className="home-block">
        <h2>Cómo funciona</h2>
        <ol className="steps">
          {STEPS.map((s) => <li key={s.title}><strong>{s.title}</strong><span>{s.text}</span></li>)}
        </ol>
      </section>

      <section className="home-block">
        <h2>El recorrido de la Academia</h2>
        <p className="lead">Ocho módulos y {academyRefs.length} lecciones, con referencias a los niveles N5 y N4 del JLPT.</p>
        <ol className="route">
          {modules.map((m) => {
            const ids = m.units.flatMap((u) => u.lessons.map((l) => l.id));
            const done = ids.filter((id) => state.done[id]).length;
            return (
              <li key={m.id} style={{ '--line': m.color } as CSSProperties} className={done === ids.length ? 'done' : ''}>
                <a href={to(`/academia/${m.id}`)}>
                  <span className="route-dot">{m.n}</span>
                  <span className="route-jp" lang="ja">{m.jp}</span>
                  <strong>{m.title}</strong>
                  <Meter value={done} max={ids.length} label={`Progreso de ${m.title}`} />
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="home-block">
        <h2>Mundos de aprendizaje</h2>
        <p className="lead">Practica lo estudiado en seis ambientaciones con personajes originales.</p>
        <ul className="worlds worlds-mini">
          {worlds.map((w) => (
            <li key={w.id} style={{ '--line': w.color } as CSSProperties}>
              <a href={to(`/mundos/${w.id}`)}><WorldArt id={w.id} /><span className="world-body"><strong>{w.name}</strong><span>{w.tagline}</span></span></a>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-block home-japan">
        <div>
          <h2>Mi futuro en Japón</h2>
          <p className="lead">El japonés que no sale en los libros de texto: saludar a los vecinos, entender un contrato de alquiler, una entrevista de trabajo, el médico o el ayuntamiento.</p>
          <a className="btn btn-main" href={to('/japon')}>Ver el itinerario</a>
        </div>
        <ul>
          {areas.map((a) => <li key={a.id}><a href={to(`/japon/${a.id}`)}><span lang="ja">{a.jp}</span>{a.title}</a></li>)}
        </ul>
      </section>

      <footer className="foot">
        <p>NIHONGO QUEST tiene {allRefs.length} lecciones y funciona sin registro: tu progreso se guarda solo en este navegador. Puedes hacer una copia desde <a href={to('/ajustes')}>Ajustes</a>.</p>
        <p>Los niveles JLPT se indican como orientación. Terminar un módulo no garantiza aprobar el examen.</p>
      </footer>
    </div>
  );
}
