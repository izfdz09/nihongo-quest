import { useState, type CSSProperties } from 'react';
import { Jp, StageContext } from '../components/Jp';
import { PageHead, Stations } from '../components/Layout';
import { phrasebook, REGISTER_COLOR, registerRefs, registerUnits } from '../content';
import type { Tone } from '../content/registers';
import { to } from '../lib/router';
import { useStore } from '../lib/store';

/* «Formal e informal»: los tres registros, un comparador y las lecciones. */

const LEVELS = [
  { key: 'casual', name: 'Informal', jp: 'タメ口', who: 'Amigos, familia y gente más joven', sample: '食[た]べる？', es: '¿Comes?' },
  { key: 'polite', name: 'Cortés', jp: '丁寧語', who: 'Desconocidos, compañeros y casi todo el mundo', sample: '食[た]べます か。', es: '¿Come usted?' },
  { key: 'keigo', name: 'Keigo', jp: '敬語', who: 'Clientes, jefes, profesores y entrevistas', sample: '召[め]し上[あ]がります か。', es: '¿Desea comer?' },
] as const;

const TONE_LABEL: Record<Tone, string> = { base: 'Informal y formal', informal: 'Informal', formal: 'Formal' };

function Compare() {
  const [index, setIndex] = useState(0);
  const phrase = phrasebook[index];
  return (
    <section className="compare" aria-labelledby="comparador">
      <div className="compare-head">
        <h2 id="comparador">Comparador de registros</h2>
        <p>Elige una idea y escucha cómo cambia según con quién hables.</p>
      </div>
      <div className="compare-ideas" role="tablist" aria-label="Idea que quieres expresar">
        {phrasebook.map((p, i) => (
          <button type="button" role="tab" key={p.es} aria-selected={i === index} className={i === index ? 'on' : ''} onClick={() => setIndex(i)}>{p.es}</button>
        ))}
      </div>
      <ol className="compare-rows" key={index}>
        {LEVELS.map((l) => (
          <li key={l.key} className={`lv-${l.key}`}>
            <span className="compare-level"><b>{l.name}</b><small>{l.who}</small></span>
            <Jp src={phrase[l.key]} size="l" repeat />
          </li>
        ))}
      </ol>
      {phrase.note && <p className="hint">{phrase.note}</p>}
    </section>
  );
}

export function RegistersPage() {
  const { state } = useStore();
  const done = registerRefs.filter((r) => state.done[r.lesson.id]).length;
  const next = registerRefs.find((r) => !state.done[r.lesson.id]);
  return (
    <StageContext.Provider value={3}>
      <div style={{ '--line': REGISTER_COLOR } as CSSProperties}>
        <PageHead jp="話し方" title="Formal e informal">
          El japonés cambia según con quién hables. Aquí aprendes a hablar con amigos, con desconocidos y con un cliente o un jefe, y a no confundir un registro con otro.
        </PageHead>

        <ul className="levels">
          {LEVELS.map((l) => (
            <li key={l.key} className={`lv-${l.key}`}>
              <span className="levels-jp" lang="ja">{l.jp}</span>
              <strong>{l.name}</strong>
              <span className="levels-who">{l.who}</span>
              <Jp src={l.sample} />
              <small>{l.es}</small>
            </li>
          ))}
        </ul>

        <Compare />

        <div className="section-head"><h2>Lecciones</h2><span>{done} de {registerRefs.length} completadas</span></div>
        {next && (
          <a className="continue" href={to(`/leccion/${next.lesson.id}`)}>
            <span><small>{done ? 'Sigue por aquí' : 'Empieza por aquí'}</small><strong>{next.lesson.title}</strong></span>
            <span className="btn btn-main">{done ? 'Continuar' : 'Empezar'}</span>
          </a>
        )}
        {registerUnits.map((u, i) => (
          <section key={u.id} className="unit">
            <h2><span className="unit-n">Unidad {i + 1} <span className={`tag tag-tone-${u.tone}`}>{TONE_LABEL[u.tone]}</span></span>{u.title}</h2>
            <p className="unit-desc">{u.desc}</p>
            <Stations lessons={u.lessons} color={REGISTER_COLOR} nextId={next?.lesson.id} />
          </section>
        ))}
        <p className="fineprint">Esta sección usa kanji con furigana y da por sabida la gramática básica (módulo 5 de la Academia). El keigo aplicado a situaciones concretas, como una entrevista o la oficina, se practica además en <a href={to('/japon')}>Vivir en Japón</a>.</p>
      </div>
    </StageContext.Provider>
  );
}
