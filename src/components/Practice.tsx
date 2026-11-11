import { useEffect, useMemo, useRef, useState } from 'react';
import type { Exercise, Term } from '../content/types';
import { answerText, promptText, shuffle } from '../lib/exercises';
import { display, isJapanese, pieces, sameRomaji } from '../lib/japanese';
import { addMistake, failWord } from '../lib/progress';
import { useSpeech } from '../lib/speech';
import { useStore } from '../lib/store';
import { Speaker } from './Art';
import { Icon, Jp, Rich, Ruby, Say } from './Jp';

/* Sesión de ejercicios: una pregunta cada vez, con explicación tras cada respuesta. */

type Verdict = { ok: boolean; note?: string };
type Choice = Extract<Exercise, { k: 'choice' }>;

function Option({ text, bare }: { text: string; bare?: boolean }) {
  return isJapanese(text) ? <Jp src={text} audio={false} romaji={!bare} /> : <span>{text}</span>;
}

function ChoiceView({ ex, onAnswer, locked }: { ex: Choice; onAnswer: (v: Verdict) => void; locked: boolean }) {
  const [picked, setPicked] = useState(-1);
  const { say } = useSpeech();
  useEffect(() => {
    if (ex.audio) say(ex.audio);
  }, [ex.audio, say]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key) - 1;
      if (!locked && n >= 0 && n < ex.options.length) choose(n);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  const choose = (i: number) => {
    if (locked) return;
    setPicked(i);
    onAnswer({ ok: i === ex.answer });
  };
  return (
    <>
      <h2 className="ex-q"><Rich text={ex.q} /></h2>
      {ex.scene && (
        <div className="bubble ex-scene">
          <Speaker name={ex.scene.who} />
          <div className="bubble-body"><span className="bubble-who">{ex.scene.who}</span><Jp src={ex.scene.jp} size="l" />{locked && <span className="bubble-es">{ex.scene.es}</span>}</div>
        </div>
      )}
      {ex.audio && <div className="ex-audio"><Say src={ex.audio} big repeat /><span className="hint">Puedes escucharlo las veces que quieras.</span></div>}
      {ex.jp && !ex.audio && <div className="ex-jp"><Jp src={ex.jp} size="xl" audio={!ex.bare} romaji={!ex.bare} /></div>}
      <div className="options" role="group" aria-label="Opciones">
        {ex.options.map((o, i) => {
          const state = !locked ? '' : i === ex.answer ? ' right' : i === picked ? ' wrong' : ' dim';
          return (
            <button type="button" key={o} className={`option${state}`} disabled={locked} onClick={() => choose(i)}>
              <kbd>{i + 1}</kbd><Option text={o} bare={ex.bare} />
            </button>
          );
        })}
      </div>
    </>
  );
}

const PARTICLES = new Set(['は', 'が', 'を', 'に', 'で', 'と', 'も', 'へ', 'か', 'から', 'まで', 'よ', 'ね', 'より']);

/** Agrupa cada palabra con la partícula que la sigue (y las cadenas «A の B»). */
function chunks(ps: string[]): string[] {
  const out: string[] = [];
  let glue = false;
  for (const p of ps.map(display)) {
    if (out.length && (glue || PARTICLES.has(p) || p === 'の')) out[out.length - 1] += p; else out.push(p);
    glue = p === 'の';
  }
  return out;
}

/** El orden es distinto del modelo, pero cada partícula sigue a su palabra y el final coincide. */
function looseOrder(given: string[], target: string[], src: string): boolean {
  if (src.includes('、')) return false;
  const a = chunks(given);
  const b = chunks(target);
  const tail = /^(です|でした|じゃ)/.test(b[b.length - 1]) ? 2 : 1;
  return a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|') && a.slice(-tail).join('|') === b.slice(-tail).join('|');
}

function OrderView({ ex, onAnswer, locked }: { ex: Extract<Exercise, { k: 'order' }>; onAnswer: (v: Verdict) => void; locked: boolean }) {
  const target = useMemo(() => pieces(ex.jp), [ex.jp]);
  const pool = useMemo(() => shuffle(target.map((text, id) => ({ text, id }))), [target]);
  const [placed, setPlaced] = useState<number[]>([]);
  const byId = (id: number) => pool.find((p) => p.id === id)!;
  const check = () => {
    const given = placed.map((id) => byId(id).text);
    if (given.map(display).join('') === target.map(display).join('')) return onAnswer({ ok: true });
    if (looseOrder(given, target, ex.jp)) {
      return onAnswer({ ok: true, note: 'Tu frase se entiende: cada partícula acompaña a su palabra y el verbo cierra la frase. El orden más habitual es el que ves abajo.' });
    }
    onAnswer({ ok: false });
  };
  return (
    <>
      <h2 className="ex-q">Ordena las palabras para decir:</h2>
      <p className="ex-es">«{ex.es}»</p>
      <div className="order-answer" aria-label="Tu frase">
        {placed.length === 0 && <span className="hint">Toca las palabras en orden.</span>}
        {placed.map((id) => (
          <button type="button" key={id} className="chip" disabled={locked} onClick={() => setPlaced(placed.filter((x) => x !== id))} lang="ja"><Ruby src={byId(id).text} /></button>
        ))}
      </div>
      <div className="order-pool">
        {pool.map((p) => (
          <button type="button" key={p.id} className="chip" disabled={locked || placed.includes(p.id)} onClick={() => setPlaced([...placed, p.id])} lang="ja"><Ruby src={p.text} /></button>
        ))}
      </div>
      {!locked && <button type="button" className="btn btn-main" disabled={placed.length !== pool.length} onClick={check}>Comprobar</button>}
    </>
  );
}

function MatchView({ ex, onAnswer, locked }: { ex: Extract<Exercise, { k: 'match' }>; onAnswer: (v: Verdict) => void; locked: boolean }) {
  const left = useMemo(() => shuffle(ex.pairs), [ex.pairs]);
  const right = useMemo(() => shuffle(ex.pairs), [ex.pairs]);
  const [sel, setSel] = useState<{ l?: Term; r?: Term }>({});
  const [done, setDone] = useState<string[]>([]);
  const [miss, setMiss] = useState(0);
  const [flash, setFlash] = useState(false);
  const pick = (side: 'l' | 'r', t: Term) => {
    const next = { ...sel, [side]: t };
    if (!next.l || !next.r) return setSel(next);
    if (next.l.jp === next.r.jp) {
      const all = [...done, next.l.jp];
      setDone(all);
      setSel({});
      if (all.length === ex.pairs.length) onAnswer({ ok: miss === 0, note: miss ? `Has necesitado ${miss} ${miss === 1 ? 'intento de más' : 'intentos de más'}. Repasa las parejas:` : undefined });
    } else {
      setMiss(miss + 1);
      setFlash(true);
      window.setTimeout(() => { setFlash(false); setSel({}); }, 500);
    }
  };
  return (
    <>
      <h2 className="ex-q">Une cada palabra con su significado.</h2>
      <div className={`match${flash ? ' match-miss' : ''}`}>
        <div className="match-col">
          {left.map((t) => <button type="button" key={t.jp} className={`option${done.includes(t.jp) ? ' right' : sel.l === t ? ' picked' : ''}`} disabled={locked || done.includes(t.jp)} onClick={() => pick('l', t)}><Jp src={t.jp} audio={false} /></button>)}
        </div>
        <div className="match-col">
          {right.map((t) => <button type="button" key={t.jp} className={`option${done.includes(t.jp) ? ' right' : sel.r === t ? ' picked' : ''}`} disabled={locked || done.includes(t.jp)} onClick={() => pick('r', t)}>{t.es}</button>)}
        </div>
      </div>
    </>
  );
}

function TypeView({ ex, onAnswer, locked }: { ex: Extract<Exercise, { k: 'type' }>; onAnswer: (v: Verdict) => void; locked: boolean }) {
  const [value, setValue] = useState('');
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => input.current?.focus(), []);
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (value.trim() && !locked) onAnswer({ ok: sameRomaji(value, ex.accept) }); }}>
      <h2 className="ex-q"><Rich text={ex.q} /></h2>
      <div className="ex-jp"><Jp src={ex.jp} size="xl" audio={false} romaji={false} /></div>
      <label className="type-field">
        <span>Tu respuesta en rōmaji</span>
        <input ref={input} value={value} onChange={(e) => setValue(e.target.value)} disabled={locked} autoComplete="off" autoCapitalize="none" spellCheck={false} placeholder="por ejemplo: sakura" />
      </label>
      {!locked && <button type="submit" className="btn btn-main" disabled={!value.trim()}>Comprobar</button>}
    </form>
  );
}

function Feedback({ ex, verdict, onRetry, onNext, last }: { ex: Exercise; verdict: Verdict; onRetry: () => void; onNext: () => void; last: boolean }) {
  const next = useRef<HTMLButtonElement>(null);
  useEffect(() => next.current?.focus(), []);
  const answer = answerText(ex);
  return (
    <div className={`feedback ${verdict.ok ? 'feedback-ok' : 'feedback-no'}`} role="status" aria-live="polite">
      <p className="feedback-title"><Icon name={verdict.ok ? 'check' : 'cross'} /> {verdict.ok ? 'Correcto' : 'Todavía no'}</p>
      {verdict.note && <p>{verdict.note}</p>}
      {ex.k !== 'match' && (!verdict.ok || verdict.note || ex.k === 'order') && (
        <p className="feedback-answer">Respuesta correcta: {isJapanese(answer) ? <Jp src={answer} /> : <strong>{answer}</strong>}</p>
      )}
      {ex.k === 'match' && (!verdict.ok) && (
        <ul className="feedback-pairs">{ex.pairs.map((p) => <li key={p.jp}><Jp src={p.jp} /> <span>{p.es}</span></li>)}</ul>
      )}
      {'why' in ex && ex.why && <p><Rich text={ex.why} /></p>}
      {ex.k === 'order' && !ex.why && <p>Recuerda el esquema: cada palabra lleva su partícula detrás y el verbo va al final.</p>}
      {ex.k === 'choice' && ex.pitfall && <p className="feedback-pitfall"><strong>Error habitual:</strong> <Rich text={ex.pitfall} /></p>}
      <div className="feedback-actions">
        {!verdict.ok && <button type="button" className="btn btn-quiet" onClick={onRetry}>Volver a intentarlo</button>}
        <button type="button" ref={next} className="btn btn-main" onClick={onNext}>{last ? 'Ver resultado' : 'Continuar'}</button>
      </div>
    </div>
  );
}

export interface PracticeResult { right: number; total: number }

export function Practice({ exercises, lessonId, onDone }: { exercises: Exercise[]; lessonId: string; onDone: (r: PracticeResult) => void }) {
  const { update } = useStore();
  const [queue, setQueue] = useState(() => exercises.map((ex, id) => ({ ex, id, again: false })));
  const [pos, setPos] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [right, setRight] = useState(0);
  const tried = useRef(new Set<number>());
  const item = queue[pos];

  const answer = (v: Verdict) => {
    setVerdict(v);
    const first = !tried.current.has(item.id);
    tried.current.add(item.id);
    if (!first) return;
    if (v.ok) return setRight((n) => n + 1);
    const ex = item.ex;
    update((s) => {
      let next = addMistake(s, { q: promptText(ex), answer: answerText(ex), why: 'why' in ex && ex.why ? ex.why : '', lesson: lessonId });
      if (ex.k === 'choice' && ex.term) next = failWord(next, ex.term, lessonId);
      return next;
    });
    // Lo que se falla vuelve a aparecer al final de la sesión.
    setQueue((q) => [...q, { ...item, again: true }]);
  };

  const next = () => {
    if (pos + 1 >= queue.length) return onDone({ right, total: exercises.length });
    setPos(pos + 1);
    setAttempt(0);
    setVerdict(null);
  };
  const retry = () => {
    setAttempt(attempt + 1);
    setVerdict(null);
  };

  const key = `${pos}-${attempt}`;
  const locked = verdict !== null;
  const props = { onAnswer: answer, locked };
  return (
    <div className="practice">
      <div className="practice-bar" role="progressbar" aria-valuemin={0} aria-valuemax={queue.length} aria-valuenow={pos} aria-label="Avance de la práctica">
        <span style={{ width: `${(pos / queue.length) * 100}%` }} />
      </div>
      <p className="practice-count">Ejercicio {pos + 1} de {queue.length}{item.again && ' · repaso de un fallo anterior'}</p>
      <div className="exercise" key={key}>
        {item.ex.k === 'choice' && <ChoiceView ex={item.ex} {...props} />}
        {item.ex.k === 'order' && <OrderView ex={item.ex} {...props} />}
        {item.ex.k === 'match' && <MatchView ex={item.ex} {...props} />}
        {item.ex.k === 'type' && <TypeView ex={item.ex} {...props} />}
      </div>
      {verdict && <Feedback ex={item.ex} verdict={verdict} onRetry={retry} onNext={next} last={pos + 1 >= queue.length} />}
    </div>
  );
}
