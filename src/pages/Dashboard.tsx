import type { CSSProperties } from 'react';
import { Meter, PageHead } from '../components/Layout';
import { Icon } from '../components/Jp';
import { academyRefs, allRefs, modules, nextAcademyLesson } from '../content';
import { levelOf, liveStreak, MEDALS } from '../lib/progress';
import { to } from '../lib/router';
import { dueCards, MASTERED_BOX } from '../lib/srs';
import { useStore } from '../lib/store';

const WEEKDAYS = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

export function DashboardPage() {
  const { state, today, setSetting } = useStore();
  const level = levelOf(state.xp);
  const cards = Object.values(state.cards);
  const due = dueCards(cards, today).length;
  const doneAll = allRefs.filter((r) => state.done[r.lesson.id]).length;
  const doneAcademy = academyRefs.filter((r) => state.done[r.lesson.id]).length;
  const todayXp = state.daily[today] ?? 0;
  const goal = state.settings.goal;
  const next = nextAcademyLesson(state.done);
  const week = Array.from({ length: 7 }, (_, i) => today - 6 + i);
  const weekMax = Math.max(goal, ...week.map((d) => state.daily[d] ?? 0));
  const currentModule = modules.find((m) => m.units.some((u) => u.lessons.some((l) => !state.done[l.id])));
  const moduleIds = currentModule?.units.flatMap((u) => u.lessons.map((l) => l.id)) ?? [];
  const nextMedal = MEDALS.find((m) => !state.medals[m.id]);

  return (
    <>
      <PageHead jp="きろく" title="Mi panel">Tu avance, tus objetivos y lo que toca repasar. Aquí no hay clasificaciones: solo compites con tu versión de ayer.</PageHead>

      <div className="panel">
        <section className="card card-level">
          <span className="level-seal" lang="ja">{level.jp}</span>
          <div>
            <h2>Nivel {level.level}. {level.title}</h2>
            <Meter value={level.into} max={level.span} label="Experiencia hacia el siguiente nivel" />
            <p>{state.xp} XP en total. Faltan {level.span - level.into} para el nivel {level.level + 1}.</p>
          </div>
        </section>

        <section className="card">
          <h2>Objetivo de hoy</h2>
          <div className="goal">
            <div className="ring" style={{ '--pct': Math.min(100, Math.round((todayXp / goal) * 100)) } as CSSProperties}><span>{todayXp}<small>de {goal} XP</small></span></div>
            <div>
              <p>{todayXp >= goal ? 'Objetivo cumplido. Lo que hagas a partir de ahora es de regalo.' : `Te faltan ${goal - todayXp} XP: más o menos ${Math.max(1, Math.ceil((goal - todayXp) / 30))} lección.`}</p>
              <div className="seg" role="group" aria-label="Objetivo diario">
                {[15, 30, 50].map((g) => <button type="button" key={g} className={g === goal ? 'on' : ''} onClick={() => setSetting('goal', g)}>{g} XP</button>)}
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <h2><Icon name="flame" /> Racha de aprendizaje</h2>
          <p className="big-n">{liveStreak(state, today)} <small>{liveStreak(state, today) === 1 ? 'día' : 'días'} · mejor racha: {state.streak.best}</small></p>
          <ol className="week" aria-label="Experiencia de los últimos siete días">
            {week.map((d) => {
              const xp = state.daily[d] ?? 0;
              const dow = new Date((d + 0.5) * 86400000).getUTCDay();
              return <li key={d} className={xp >= goal ? 'hit' : xp ? 'some' : ''}><span style={{ height: `${Math.max(6, (xp / weekMax) * 100)}%` }} title={`${xp} XP`} /><small>{WEEKDAYS[dow]}</small></li>;
            })}
          </ol>
        </section>

        <section className="card">
          <h2>En cifras</h2>
          <dl className="figures">
            <div><dt>Lecciones completadas</dt><dd>{doneAll} <small>de {allRefs.length}</small></dd></div>
            <div><dt>Progreso de la Academia</dt><dd>{Math.round((doneAcademy / academyRefs.length) * 100)} %</dd></div>
            <div><dt>Vocabulario aprendido</dt><dd>{cards.length} <small>palabras</small></dd></div>
            <div><dt>Palabras dominadas</dt><dd>{cards.filter((c) => c.box >= MASTERED_BOX).length}</dd></div>
          </dl>
        </section>

        <section className="card">
          <h2>Repaso pendiente</h2>
          <p className="big-n">{due} <small>{due === 1 ? 'tarjeta para hoy' : 'tarjetas para hoy'}</small></p>
          <a className={`btn ${due ? 'btn-main' : 'btn-quiet'}`} href={to('/repaso')}>{due ? 'Repasar ahora' : 'Ver mis palabras'}</a>
        </section>

        <section className="card card-2">
          <h2>Objetivos de aprendizaje</h2>
          <ul className="targets">
            {next && <li><a href={to(`/leccion/${next.lesson.id}`)}><strong>Siguiente lección</strong><span>{next.lesson.title}</span></a></li>}
            {currentModule && <li><a href={to(`/academia/${currentModule.id}`)}><strong>Terminar «{currentModule.title}»</strong><span>{moduleIds.filter((id) => state.done[id]).length} de {moduleIds.length} lecciones</span><Meter value={moduleIds.filter((id) => state.done[id]).length} max={moduleIds.length} label="Progreso del módulo" /></a></li>}
            {nextMedal && <li><span><strong>Próximo logro: {nextMedal.title}</strong><span>{nextMedal.desc}</span></span></li>}
          </ul>
        </section>

        <section className="card card-wide">
          <h2>Últimas actividades</h2>
          {state.log.length === 0 ? <p>Todavía no hay actividad. <a href={to('/leccion/intro-idioma')}>Empieza por la primera lección.</a></p> : (
            <ul className="log">
              {state.log.slice(0, 8).map((l) => (
                <li key={l.ts}>
                  <time dateTime={new Date(l.ts).toISOString()}>{new Date(l.ts).toLocaleDateString('es', { day: 'numeric', month: 'short' })}</time>
                  {l.href ? <a href={to(l.href)}>{l.text}</a> : <span>{l.text}</span>}
                  <b>+{l.xp} XP</b>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card card-wide">
          <h2>Logros</h2>
          <ul className="medals">
            {MEDALS.map((m) => (
              <li key={m.id} className={state.medals[m.id] ? 'got' : ''}>
                <span className="medal-seal" lang="ja">{m.jp}</span>
                <span><strong>{m.title}</strong><br />{m.desc}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
