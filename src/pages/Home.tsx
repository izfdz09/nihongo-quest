import type { CSSProperties } from 'react';
import { WorldArt } from '../components/Art';
import { Icon, Jp, StageContext } from '../components/Jp';
import { Meter } from '../components/Layout';
import { academyRefs, allRefs, areas, findRef, modules, nextAcademyLesson, phrasebook, REGISTER_COLOR, registerRefs, worlds } from '../content';
import { to } from '../lib/router';
import { dueCards } from '../lib/srs';
import { useStore } from '../lib/store';

const STEPS = [
  { title: 'Estudia una lección corta', text: 'Explicaciones en español, ejemplos en japonés con audio y los errores típicos de quien habla español.' },
  { title: 'Practica y entiende cada respuesta', text: 'Tests, frases para ordenar, escucha y conversaciones simuladas. Aciertes o falles, siempre sabrás por qué.' },
  { title: 'Repasa unos minutos al día', text: 'Las palabras vuelven justo antes de que las olvides, y las que fallas, mucho antes.' },
  { title: 'Úsalo en situaciones reales', text: 'Con amigos o con un jefe, en seis mundos de ficción y en los trámites de la vida en Japón.' },
];

const SAMPLE = phrasebook[0];

export function HomePage() {
  const { state, today } = useStore();
  const count = (ids: string[]) => ids.filter((id) => state.done[id]).length;
  const started = Object.keys(state.done).length > 0;
  const next = nextAcademyLesson(state.done);
  const last = state.log.find((l) => l.href?.startsWith('/leccion/'));
  const lastRef = last?.href ? findRef(last.href.replace('/leccion/', '')) : undefined;
  const due = dueCards(Object.values(state.cards), today).length;
  const worldScenes = worlds.flatMap((w) => w.scenes.map((s) => s.id));
  const situations = areas.flatMap((a) => a.situations.map((s) => s.id));

  const sections = [
    { href: '/academia', icon: 'line', color: 'var(--gold)', title: 'Academia', text: 'El curso ordenado: de la primera sílaba a la gramática intermedia.', done: count(academyRefs.map((r) => r.lesson.id)), total: academyRefs.length, unit: 'lecciones' },
    { href: '/registros', icon: 'tone', color: REGISTER_COLOR, title: 'Formal e informal', text: 'Cómo hablar con amigos, con desconocidos y con un jefe o un cliente.', done: count(registerRefs.map((r) => r.lesson.id)), total: registerRefs.length, unit: 'lecciones' },
    { href: '/mundos', icon: 'world', color: 'var(--sakura)', title: 'Mundos', text: 'Seis historias con personajes propios para practicar lo estudiado.', done: count(worldScenes), total: worldScenes.length, unit: 'escenas' },
    { href: '/japon', icon: 'japan', color: 'var(--asagi)', title: 'Vivir en Japón', text: 'Alquilar, trabajar, ir al médico: el japonés de las situaciones reales.', done: count(situations), total: situations.length, unit: 'situaciones' },
  ];

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
          {started ? (
            <>
              <h1>Sigue donde lo dejaste.</h1>
              {next
                ? <p>Tu siguiente parada es <strong>{next.lesson.title}</strong>, en {next.groupTitle}.</p>
                : <p>Has completado la Academia. Sigue practicando con los mundos, los registros y el repaso diario.</p>}
              <div className="hero-actions">
                {next && <a className="btn btn-main btn-big" href={to(`/leccion/${next.lesson.id}`)}>Continuar aprendiendo</a>}
                <a className="btn btn-quiet" href={to('/academia')}>Ver todo el recorrido</a>
              </div>
            </>
          ) : (
            <>
              <h1>Aprende japonés desde cero, parada a parada.</h1>
              <p>De tu primera sílaba a desenvolverte en Japón: lecciones en español, audio en japonés, ejercicios que explican cada respuesta y un repaso diario que se adapta a lo que fallas.</p>
              <div className="hero-actions">
                <a className="btn btn-main btn-big" href={to('/leccion/intro-idioma')}>Comenzar a aprender</a>
                <a className="btn btn-quiet" href={to('/ayuda')}>Cómo funciona</a>
              </div>
              <p className="hero-note">Sin registro y gratis. La primera lección dura unos cinco minutos.</p>
            </>
          )}
        </div>
      </section>

      {started ? (
        <section className="home-block" aria-labelledby="hoy">
          <h2 id="hoy">Tu sesión de hoy</h2>
          <ol className="today">
            <li>
              <a href={to(next ? `/leccion/${next.lesson.id}` : '/mundos')} className="today-main">
                <span className="today-kind"><Icon name="book" /> Lección nueva</span>
                <strong>{next ? next.lesson.title : 'Practica en un mundo'}</strong>
                <span>{next ? next.groupTitle : 'Ya has terminado la Academia.'}</span>
                <span className="today-go">Empezar <Icon name="arrow" /></span>
              </a>
            </li>
            <li>
              <a href={to('/repaso')} className={due ? 'today-due' : ''}>
                <span className="today-kind"><Icon name="cards" /> Repaso</span>
                <strong>{due ? `${due} ${due === 1 ? 'tarjeta pendiente' : 'tarjetas pendientes'}` : 'Nada pendiente'}</strong>
                <span>{due ? `Unos ${Math.max(1, Math.round(Math.min(due, 20) / 4))} minutos.` : 'Puedes practicar las palabras que más te cuestan.'}</span>
                <span className="today-go">{due ? 'Repasar' : 'Ver mis palabras'} <Icon name="arrow" /></span>
              </a>
            </li>
            <li>
              <a href={to('/hablar')}>
                <span className="today-kind"><Icon name="mic" /> En voz alta</span>
                <strong>Práctica oral</strong>
                <span>Escucha una frase, repítela y compárate con el modelo.</span>
                <span className="today-go">Practicar <Icon name="arrow" /></span>
              </a>
            </li>
          </ol>
        </section>
      ) : (
        <section className="home-block">
          <h2>Cómo funciona</h2>
          <ol className="steps">
            {STEPS.map((s) => <li key={s.title}><strong>{s.title}</strong><span>{s.text}</span></li>)}
          </ol>
        </section>
      )}

      <section className="home-block">
        <h2>Cuatro formas de aprender</h2>
        <p className="lead">Empieza por la Academia. Las otras tres secciones sirven para usar lo que vas aprendiendo.</p>
        <ul className="sections">
          {sections.map((s) => (
            <li key={s.href} style={{ '--line': s.color } as CSSProperties}>
              <a href={to(s.href)}>
                <span className="sections-icon"><Icon name={s.icon} /></span>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
                <span className="sections-meta">{s.done} de {s.total} {s.unit}</span>
                <Meter value={s.done} max={s.total} label={`Progreso de ${s.title}`} />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-block">
        <div className="section-head"><h2>El recorrido de la Academia</h2><a href={to('/academia')}>Ver los 8 módulos</a></div>
        <ol className="route">
          {modules.map((m) => {
            const ids = m.units.flatMap((u) => u.lessons.map((l) => l.id));
            const done = count(ids);
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

      <section className="home-block home-split" style={{ '--line': REGISTER_COLOR } as CSSProperties}>
        <div>
          <h2>Formal e informal</h2>
          <p className="lead">«{SAMPLE.es}» no se dice igual a un amigo que a un cliente. Aprende los tres registros, los coloquialismos de verdad y el keigo que oirás en cada tienda.</p>
          <a className="btn btn-main" href={to('/registros')}>Ver la sección</a>
        </div>
        <StageContext.Provider value={3}>
          <ol className="compare-rows">
            <li className="lv-casual"><span className="compare-level"><b>Informal</b><small>con amigos</small></span><Jp src={SAMPLE.casual} /></li>
            <li className="lv-polite"><span className="compare-level"><b>Cortés</b><small>con casi todo el mundo</small></span><Jp src={SAMPLE.polite} /></li>
            <li className="lv-keigo"><span className="compare-level"><b>Keigo</b><small>con clientes y jefes</small></span><Jp src={SAMPLE.keigo} /></li>
          </ol>
        </StageContext.Provider>
      </section>

      <section className="home-block">
        <div className="section-head"><h2>Mundos de aprendizaje</h2><a href={to('/mundos')}>Ver los 6 mundos</a></div>
        <ul className="worlds worlds-mini">
          {worlds.map((w) => (
            <li key={w.id} style={{ '--line': w.color } as CSSProperties}>
              <a href={to(`/mundos/${w.id}`)}><WorldArt id={w.id} /><span className="world-body"><strong>{w.name}</strong><span>{w.tagline}</span></span></a>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-block home-split home-japan">
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
