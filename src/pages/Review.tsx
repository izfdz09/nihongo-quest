import { useState } from 'react';
import { PageHead } from '../components/Layout';
import { Jp, Rich, StageContext } from '../components/Jp';
import { findRef } from '../content';
import { isJapanese } from '../lib/japanese';
import { reviewCard } from '../lib/progress';
import { to } from '../lib/router';
import { accuracy, dueCards, statusOf, type Card, type CardStatus } from '../lib/srs';
import { useStore } from '../lib/store';

const STATUS: Record<CardStatus, string> = { nueva: 'Nuevas', aprendiendo: 'Aprendiendo', dificil: 'Requieren práctica', dominada: 'Dominadas' };

function dueLabel(card: Card, today: number): string {
  const d = card.due - today;
  return d <= 0 ? 'hoy' : d === 1 ? 'mañana' : `en ${d} días`;
}

function Session({ ids, onEnd }: { ids: string[]; onEnd: () => void }) {
  const { state, update } = useStore();
  const [queue, setQueue] = useState(ids);
  const [shown, setShown] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [stats, setStats] = useState({ ok: 0, fail: 0 });
  const card = state.cards[queue[0]];

  if (!card) {
    return (
      <section className="card review-end">
        <h2>Repaso terminado</h2>
        <p>{stats.ok} sabidas y {stats.fail} por reforzar. Las que has fallado volverán antes; las que sabías, cada vez más tarde.</p>
        <button type="button" className="btn btn-main" onClick={onEnd}>Volver</button>
      </section>
    );
  }
  const grade = (ok: boolean) => {
    update((s) => reviewCard(s, card.id, ok));
    setStats({ ok: stats.ok + (ok ? 1 : 0), fail: stats.fail + (ok ? 0 : 1) });
    setQueue(ok ? queue.slice(1) : [...queue.slice(1), card.id]);
    setShown(false);
  };
  return (
    <section className="flash">
      <p className="practice-count">Quedan {queue.length} · <button type="button" className="linklike" onClick={() => { setReverse(!reverse); setShown(false); }}>{reverse ? 'Mostrar primero el japonés' : 'Mostrar primero el español'}</button></p>
      <div className="flash-card" key={card.id + String(reverse)}>
        {reverse ? <p className="flash-es">{card.es}</p> : <Jp src={card.jp} size="xl" romaji={shown} />}
        {shown && (
          <div className="flash-back">
            {reverse ? <Jp src={card.jp} size="xl" /> : <p className="flash-es">{card.es}</p>}
            {card.note && <p className="hint"><Rich text={card.note} /></p>}
          </div>
        )}
      </div>
      {shown ? (
        <div className="flash-actions">
          <button type="button" className="btn btn-no" onClick={() => grade(false)}>No la sabía</button>
          <button type="button" className="btn btn-ok" onClick={() => grade(true)}>La sabía</button>
        </div>
      ) : (
        <div className="flash-actions"><button type="button" className="btn btn-main" onClick={() => setShown(true)}>Mostrar respuesta</button></div>
      )}
    </section>
  );
}

export function ReviewPage() {
  const { state, today } = useStore();
  const [tab, setTab] = useState<'repaso' | 'palabras' | 'errores'>('repaso');
  const [session, setSession] = useState<string[] | null>(null);
  const [filter, setFilter] = useState<CardStatus | 'todas'>('todas');
  const cards = Object.values(state.cards);
  const due = dueCards(cards, today);
  const byStatus = (s: CardStatus) => cards.filter((c) => statusOf(c) === s);
  const hardest = [...cards].sort((a, b) => b.lapses - a.lapses || a.box - b.box).slice(0, 10);
  const listed = (filter === 'todas' ? cards : byStatus(filter)).sort((a, b) => a.due - b.due);

  return (
    <StageContext.Provider value={2}>
      <PageHead jp="ふくしゅう" title="Repaso">Repetición espaciada: cada palabra vuelve justo cuando estás a punto de olvidarla. Las que fallas reaparecen con más frecuencia.</PageHead>
      <div className="seg seg-tabs" role="tablist">
        {(['repaso', 'palabras', 'errores'] as const).map((t) => (
          <button type="button" key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => { setTab(t); setSession(null); }}>
            {t === 'repaso' ? 'Repaso diario' : t === 'palabras' ? `Mis palabras (${cards.length})` : `Errores (${state.mistakes.length})`}
          </button>
        ))}
      </div>

      {tab === 'repaso' && (session ? <Session ids={session} onEnd={() => setSession(null)} /> : (
        <>
          <dl className="figures figures-row">
            <div><dt>Pendientes hoy</dt><dd>{due.length}</dd></div>
            <div><dt>Aprendiendo</dt><dd>{byStatus('aprendiendo').length + byStatus('nueva').length}</dd></div>
            <div><dt>Requieren práctica</dt><dd>{byStatus('dificil').length}</dd></div>
            <div><dt>Dominadas</dt><dd>{byStatus('dominada').length}</dd></div>
            <div><dt>Aciertos</dt><dd>{accuracy(cards)} %</dd></div>
          </dl>
          {cards.length === 0 ? (
            <section className="card"><h2>Aún no tienes tarjetas</h2><p>Cada lección que completes añade aquí su vocabulario.</p><a className="btn btn-main" href={to('/leccion/intro-idioma')}>Hacer la primera lección</a></section>
          ) : due.length > 0 ? (
            <section className="card"><h2>{due.length} {due.length === 1 ? 'tarjeta te espera' : 'tarjetas te esperan'}</h2><p>Unos {Math.max(1, Math.round(Math.min(due.length, 20) / 4))} minutos. Sé sincero al puntuarte: el sistema solo funciona si marcas lo que de verdad sabías.</p><button type="button" className="btn btn-main" onClick={() => setSession(due.slice(0, 20).map((c) => c.id))}>Empezar el repaso{due.length > 20 ? ' (20 tarjetas)' : ''}</button></section>
          ) : (
            <section className="card"><h2>Nada pendiente hoy</h2><p>Tu próximo repaso es {dueLabel([...cards].sort((a, b) => a.due - b.due)[0], today)}. Si te apetece, puedes practicar las que más te cuestan.</p><button type="button" className="btn btn-quiet" onClick={() => setSession(hardest.map((c) => c.id))}>Practicar las {hardest.length} más difíciles</button></section>
          )}
        </>
      ))}

      {tab === 'palabras' && (
        <>
          <div className="seg" role="group" aria-label="Filtrar por estado">
            <button type="button" className={filter === 'todas' ? 'on' : ''} onClick={() => setFilter('todas')}>Todas ({cards.length})</button>
            {(Object.keys(STATUS) as CardStatus[]).map((s) => <button type="button" key={s} className={filter === s ? 'on' : ''} onClick={() => setFilter(s)}>{STATUS[s]} ({byStatus(s).length})</button>)}
          </div>
          {listed.length === 0 ? <p className="empty-line">No hay palabras en este grupo.</p> : (
            <ul className="wordlist">
              {listed.map((c) => (
                <li key={c.id}><Jp src={c.jp} /><span className="term-es">{c.es}</span><span className={`tag tag-${statusOf(c)}`}>{STATUS[statusOf(c)]}</span><small>Repaso: {dueLabel(c, today)}</small></li>
              ))}
            </ul>
          )}
        </>
      )}

      {tab === 'errores' && (state.mistakes.length === 0 ? <p className="empty-line">Aquí aparecerán las preguntas que falles, con su explicación, para que puedas revisarlas.</p> : (
        <ul className="mistakes">
          {state.mistakes.map((m) => {
            const ref = findRef(m.lesson);
            return (
              <li key={m.q}>
                <p className="mistake-q">{m.q}</p>
                <p className="feedback-answer">Respuesta correcta: {isJapanese(m.answer) ? <Jp src={m.answer} /> : <strong>{m.answer}</strong>}</p>
                {m.why && <p><Rich text={m.why} /></p>}
                {ref && <a href={to(`/leccion/${m.lesson}`)}>Repasar la lección «{ref.lesson.title}»</a>}
              </li>
            );
          })}
        </ul>
      ))}
    </StageContext.Provider>
  );
}
