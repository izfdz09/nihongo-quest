import { useEffect, useRef, useState, type PointerEvent } from 'react';
import type { Block, Line } from '../content/types';
import { PREVIEW } from '../lib/env';
import { toRomaji } from '../lib/japanese';
import { useSpeech } from '../lib/speech';
import { Speaker } from './Art';
import { Icon, Jp, Rich, Say, useRomajiMode } from './Jp';

/* Bloques de contenido de una lección. */

function KanaGrid({ chars }: { chars: string[] }) {
  const { say } = useSpeech();
  const mode = useRomajiMode();
  const cols = chars.some((c) => c.length > 1) ? 3 : 5;
  return (
    <div className={`kana-grid kana-cols-${cols}`}>
      {chars.map((c, i) =>
        c === '_' ? <span key={i} className="kana-gap" /> : (
          <button type="button" key={i} className="kana-tile" onClick={() => say(c)} aria-label={`${c}, ${toRomaji(c)}`}>
            <span className="kana-char" lang="ja">{c}</span>
            {mode !== 'off' && <span className="kana-ro">{toRomaji(c)}</span>}
          </button>
        ),
      )}
    </div>
  );
}

/** Trazos de un carácter según KanjiVG (se descargan al pedirlos). */
async function fetchStrokes(char: string): Promise<string[]> {
  const hex = char.codePointAt(0)!.toString(16).padStart(5, '0');
  const res = await fetch(`https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}.svg`);
  if (!res.ok) throw new Error(String(res.status));
  const svg = await res.text();
  const paths = [...svg.matchAll(/<path[^>]*?\sd="([^"]+)"/g)].map((m) => m[1]);
  if (!paths.length) throw new Error('sin trazos');
  return paths;
}

type StrokeState = { status: 'idle' } | { status: 'loading' } | { status: 'error' } | { status: 'ok'; glyphs: string[][]; run: number };

export function StrokePad({ chars }: { chars: string[] }) {
  const [index, setIndex] = useState(0);
  const [strokes, setStrokes] = useState<StrokeState>({ status: 'idle' });
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const char = chars[index];

  const clear = () => {
    const c = canvas.current;
    c?.getContext('2d')?.clearRect(0, 0, c.width, c.height);
  };

  useEffect(() => {
    clear();
    setStrokes({ status: 'idle' });
  }, [char]);

  const point = (e: PointerEvent<HTMLCanvasElement>) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * c.width, y: ((e.clientY - r.top) / r.height) * c.height };
  };
  const start = (e: PointerEvent<HTMLCanvasElement>) => {
    const ctx = e.currentTarget.getContext('2d');
    if (!ctx) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const { x, y } = point(e);
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = getComputedStyle(e.currentTarget).color;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const move = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = e.currentTarget.getContext('2d');
    const { x, y } = point(e);
    ctx?.lineTo(x, y);
    ctx?.stroke();
  };
  const end = () => { drawing.current = false; };

  const showOrder = async () => {
    if (strokes.status === 'ok') return setStrokes({ ...strokes, run: strokes.run + 1 });
    setStrokes({ status: 'loading' });
    try {
      const glyphs = await Promise.all([...char].map(fetchStrokes));
      setStrokes({ status: 'ok', glyphs, run: 1 });
    } catch {
      setStrokes({ status: 'error' });
    }
  };

  return (
    <div className="stroke">
      <div className="stroke-picker" role="tablist" aria-label="Carácter que quieres escribir">
        {chars.map((c, i) => (
          <button type="button" key={c + i} role="tab" aria-selected={i === index} className={i === index ? 'on' : ''} onClick={() => setIndex(i)} lang="ja">{c}</button>
        ))}
      </div>
      <div className="stroke-stage">
        <div className="stroke-pad" data-len={[...char].length}>
          <span className="stroke-guide" lang="ja" aria-hidden="true">{char}</span>
          <canvas ref={canvas} width={[...char].length * 300} height={300} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerLeave={end} aria-label={`Zona para trazar ${char}`} />
        </div>
        {strokes.status === 'ok' && (
          <div className="stroke-demo" key={strokes.run}>
            {strokes.glyphs.map((paths, g) => (
              <svg key={g} viewBox="0 0 109 109" aria-label={`Orden de trazos: ${paths.length} trazos`}>
                {paths.map((d, i) => <path key={i} d={d} pathLength={1} style={{ animationDelay: `${i * 0.7}s` }} />)}
              </svg>
            ))}
          </div>
        )}
      </div>
      <div className="stroke-actions">
        <button type="button" className="btn btn-quiet" onClick={clear}>Borrar</button>
        <button type="button" className="btn btn-quiet" onClick={showOrder} disabled={strokes.status === 'loading'}>
          {strokes.status === 'ok' ? 'Repetir animación' : strokes.status === 'loading' ? 'Cargando…' : 'Ver orden de trazos'}
        </button>
        <Say src={char} />
      </div>
      {strokes.status === 'ok' && <p className="hint">{strokes.glyphs.map((g) => g.length).join(' + ')} trazos. Datos de trazado: KanjiVG.</p>}
      {strokes.status === 'error' && <p className="hint">{PREVIEW ? 'Esta vista previa no puede descargar el orden de trazos: funciona en la versión publicada. Aquí puedes trazar sobre el modelo.' : 'No se ha podido descargar el orden de trazos: hace falta conexión a internet. Mientras tanto puedes trazar sobre el modelo.'}</p>}
    </div>
  );
}

function Dialogue({ title, lines }: { title: string; lines: Line[] }) {
  const { say, stop } = useSpeech();
  const [showEs, setShowEs] = useState(true);
  const [playing, setPlaying] = useState(-1);
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; stop(); }, [stop]);

  const playFrom = (i: number) => {
    if (i >= lines.length || !alive.current) return setPlaying(-1);
    setPlaying(i);
    if (!say(lines[i].jp, { onEnd: () => window.setTimeout(() => playFrom(i + 1), 350) })) setPlaying(-1);
  };
  const toggle = () => {
    if (playing >= 0) { alive.current = false; stop(); setPlaying(-1); window.setTimeout(() => { alive.current = true; }, 400); } else playFrom(0);
  };

  return (
    <section className="dialogue">
      <header className="dialogue-head">
        <h3>{title}</h3>
        <div className="dialogue-tools">
          <button type="button" className="btn btn-quiet" onClick={toggle}><Icon name="sound" /> {playing >= 0 ? 'Detener' : 'Escuchar todo'}</button>
          <button type="button" className="btn btn-quiet" onClick={() => setShowEs(!showEs)}>{showEs ? 'Ocultar traducción' : 'Mostrar traducción'}</button>
        </div>
      </header>
      <ol className="dialogue-lines">
        {lines.map((l, i) => (
          <li key={i} className={`bubble${l.who === 'Tú' ? ' bubble-me' : ''}${playing === i ? ' bubble-on' : ''}`}>
            <Speaker name={l.who} />
            <div className="bubble-body">
              <span className="bubble-who">{l.who}</span>
              <Jp src={l.jp} />
              {showEs && <span className="bubble-es">{l.es}</span>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

const NOTE_LABEL = { tip: 'Consejo', ojo: 'Error frecuente', cultura: 'Cultura' } as const;

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="blocks">
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p': return <p key={i}><Rich text={b.text} /></p>;
          case 'h': return <h2 key={i}>{b.text}</h2>;
          case 'note': return (
            <aside key={i} className={`note note-${b.kind}`}>
              <span className="note-kind">{NOTE_LABEL[b.kind]}</span>
              <h3><Rich text={b.title} /></h3>
              <p><Rich text={b.text} /></p>
            </aside>
          );
          case 'terms': return (
            <section key={i} className="terms">
              <h3>{b.title}</h3>
              <ul>
                {b.items.map((t) => (
                  <li key={t.jp}>
                    <Jp src={t.jp} />
                    <span className="term-es">{t.es}{t.note && <small><Rich text={t.note} /></small>}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
          case 'sentences': return (
            <section key={i} className="sentences">
              <h3><Rich text={b.title} /></h3>
              <ul>
                {b.items.map((t) => (
                  <li key={t.jp}>
                    <Jp src={t.jp} size="l" repeat />
                    <span className="term-es">{t.es}{t.note && <small><Rich text={t.note} /></small>}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
          case 'dialogue': return <Dialogue key={i} title={b.title} lines={b.lines} />;
          case 'table': return (
            <div key={i} className="table-wrap">
              <table>
                <thead><tr>{b.head.map((c, j) => <th key={j}><Rich text={c} /></th>)}</tr></thead>
                <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}><Rich text={c} /></td>)}</tr>)}</tbody>
              </table>
            </div>
          );
          case 'kana': return <KanaGrid key={i} chars={b.chars} />;
          case 'write': return <StrokePad key={i} chars={b.chars} />;
          case 'pairs': return (
            <section key={i} className="pairs">
              <h3>{b.title}</h3>
              <ul>
                {b.items.map((x) => (
                  <li key={x.a}>
                    <div className="pair"><Jp src={x.a} size="l" /><span className="pair-vs">≠</span><Jp src={x.b} size="l" /></div>
                    <span className="term-es">{x.note}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        }
      })}
    </div>
  );
}
