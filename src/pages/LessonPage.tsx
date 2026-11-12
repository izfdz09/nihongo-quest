import { useMemo, useState, type CSSProperties } from 'react';
import { Blocks } from '../components/Blocks';
import { Icon, StageContext } from '../components/Jp';
import { Practice, type PracticeResult } from '../components/Practice';
import { findRef, neighbours, positionOf } from '../content';
import { buildExercises, lessonVocab } from '../lib/exercises';
import { completeLesson, MEDALS } from '../lib/progress';
import { to } from '../lib/router';
import { useStore } from '../lib/store';

interface Summary extends PracticeResult { xp: number; words: number; medals: string[] }

const PHASES = ['learn', 'practice', 'done'] as const;
const PHASE_LABEL = { learn: 'Aprende', practice: 'Practica', done: 'Resultado' } as const;

export function LessonPage({ id }: { id: string }) {
  const ref = findRef(id);
  const { state, replace } = useStore();
  const [phase, setPhase] = useState<(typeof PHASES)[number]>('learn');
  const [round, setRound] = useState(0);
  const [summary, setSummary] = useState<Summary | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const exercises = useMemo(() => (ref ? buildExercises(ref.lesson) : []), [ref, round]);

  if (!ref) {
    return (
      <section className="empty">
        <h1>Esta lección no existe</h1>
        <p>Puede que el enlace esté incompleto.</p>
        <a className="btn btn-main" href={to('/academia')}>Ir a la Academia</a>
      </section>
    );
  }

  const { lesson } = ref;
  const { prev, next } = neighbours(id);
  const href = `/leccion/${id}`;
  const pos = positionOf(id);
  const step = PHASES.indexOf(phase);
  // Los pasos de la cabecera también sirven para moverse entre la explicación y la práctica.
  const goPhase = (ph: (typeof PHASES)[number]) => {
    if (ph === 'done' || ph === phase) return;
    if (ph === 'practice' && phase === 'done') setRound(round + 1);
    setPhase(ph);
    window.scrollTo(0, 0);
  };

  const finish = (r: PracticeResult) => {
    const vocab = lessonVocab(lesson);
    const words = vocab.filter((t, i) => vocab.findIndex((x) => x.jp === t.jp) === i).length;
    const out = completeLesson(state, { id, title: lesson.title, href, vocab, right: r.right, total: r.total });
    replace(out.state);
    setSummary({ ...r, xp: out.xp, words, medals: Object.keys(out.state.medals).filter((m) => !state.medals[m]) });
    setPhase('done');
    window.scrollTo(0, 0);
  };

  return (
    <StageContext.Provider value={ref.stage}>
      <article className="lesson" style={{ '--line': ref.color } as CSSProperties}>
        <header className="sign">
          <a className="sign-back" href={to(ref.backHref)}>{ref.groupTitle}{ref.unitTitle ? ` · ${ref.unitTitle}` : ''}</a>
          <div className="sign-plate">
            {lesson.jp && <span className="sign-jp" lang="ja">{lesson.jp}</span>}
            <h1>{lesson.title}</h1>
            <p>{lesson.goal}</p>
          </div>
          <nav className="sign-band" aria-label="Lección anterior y siguiente">
            {prev ? <a className="sign-prev" href={to(`/leccion/${prev.lesson.id}`)}>{prev.lesson.title}</a> : <span />}
            <span className="sign-here" aria-hidden="true" />
            {next ? <a className="sign-next" href={to(`/leccion/${next.lesson.id}`)}>{next.lesson.title}</a> : <span />}
          </nav>
        </header>

        <div className="lesson-bar">
          <ol className="stepper" aria-label="Pasos de la lección">
            {PHASES.map((ph, i) => (
              <li key={ph} className={i === step ? 'on' : i < step ? 'past' : ''} aria-current={i === step ? 'step' : undefined}>
                <button type="button" disabled={ph === 'done' || i === step} onClick={() => goPhase(ph)}>
                  <span>{i < step ? <Icon name="check" /> : i + 1}</span>{PHASE_LABEL[ph]}
                </button>
              </li>
            ))}
          </ol>
          {pos && <span className="lesson-pos">Lección {pos.n} de {pos.total}{state.done[id] ? ' · ya completada' : ''}</span>}
        </div>

        {phase === 'learn' && (
          <>
            <Blocks blocks={lesson.blocks} />
            <div className="lesson-cta">
              <div>
                <strong>Ahora, a practicar</strong>
                <span>{exercises.length} ejercicios, unos {Math.max(2, Math.round(exercises.length / 3))} minutos. Cada respuesta viene con su explicación.</span>
              </div>
              <button type="button" className="btn btn-main" onClick={() => { setPhase('practice'); window.scrollTo(0, 0); }}>Empezar la práctica</button>
            </div>
          </>
        )}

        {phase === 'practice' && (
          <>
            <button type="button" className="btn btn-quiet lesson-backlink" onClick={() => setPhase('learn')}>Volver a la explicación</button>
            <Practice key={round} exercises={exercises} lessonId={id} onDone={finish} />
          </>
        )}

        {phase === 'done' && summary && (
          <section className="done" aria-live="polite">
            <div className="stamp" aria-hidden="true"><span lang="ja">済</span></div>
            <h2>Lección completada</h2>
            <p className="lead">{summary.right === summary.total ? 'Todo bien a la primera.' : summary.right / summary.total >= 0.7 ? 'Buen trabajo. Lo que has fallado volverá en tu repaso.' : 'Lo que cuesta al principio es lo que mejor se recuerda después. Repite la práctica cuando quieras.'}</p>
            <dl className="done-stats">
              <div><dt>Aciertos a la primera</dt><dd>{summary.right} de {summary.total}</dd></div>
              <div><dt>Experiencia</dt><dd>+{summary.xp} XP</dd></div>
              <div><dt>Palabras de la lección en tu repaso</dt><dd>{summary.words}</dd></div>
            </dl>
            {summary.medals.length > 0 && (
              <ul className="done-medals">
                {summary.medals.map((m) => {
                  const medal = MEDALS.find((x) => x.id === m)!;
                  return <li key={m}><span className="medal-seal" lang="ja">{medal.jp}</span><span><strong>Logro: {medal.title}</strong><br />{medal.desc}</span></li>;
                })}
              </ul>
            )}
            <div className="done-actions">
              {next && <a className="btn btn-main" href={to(`/leccion/${next.lesson.id}`)}>Siguiente: {next.lesson.title}</a>}
              <button type="button" className="btn btn-quiet" onClick={() => { setRound(round + 1); setPhase('practice'); }}>Repetir la práctica</button>
              <a className="btn btn-quiet" href={to(ref.backHref)}><Icon name="line" /> Volver al recorrido</a>
              {ref.track === 'academia' && <a className="btn btn-quiet" href={to('/mundos')}><Icon name="world" /> Practicarlo en un mundo</a>}
            </div>
          </section>
        )}
      </article>
    </StageContext.Provider>
  );
}
