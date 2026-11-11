import { createContext, useContext, useState, type ReactNode } from 'react';
import { hasKanji, segments, tokens, toRomaji } from '../lib/japanese';
import { useSpeech } from '../lib/speech';
import { useStore } from '../lib/store';

/** Etapa del contenido: 1 = rōmaji siempre · 2 y 3 = rōmaji solo al tocar. */
export const StageContext = createContext<1 | 2 | 3>(2);

export function Icon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    sound: <><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" fill="none" /></>,
    home: <path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-8z" />,
    line: <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M6 8.5V14a4 4 0 004 4h5.5" fill="none" /></>,
    world: <><circle cx="12" cy="12" r="8.5" fill="none" /><path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17" fill="none" /></>,
    japan: <><path d="M4 7h16M6 4.5c4 1.2 8 1.2 12 0M7.5 7v13M16.5 7v13M7.5 11.5h9" fill="none" /></>,
    cards: <><rect x="4" y="7" width="12" height="13" rx="2" fill="none" /><path d="M8 4h10a2 2 0 012 2v11" fill="none" /></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0013 0M12 18v3" fill="none" /></>,
    chart: <path d="M5 20V10M12 20V4M19 20v-7" fill="none" />,
    gear: <><circle cx="12" cy="12" r="3" fill="none" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" fill="none" /></>,
    check: <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" />,
    cross: <path d="M6 6l12 12M18 6L6 18" fill="none" />,
    flame: <path d="M12 3c1 4 5 5.5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 .2 1.5 1 2.5 2 2.5C11 9 10.500 6 12 3z" />,
  };
  return (
    <svg className="icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

/** Texto japonés con furigana. En las primeras etapas se deja un pequeño espacio entre palabras. */
export function Ruby({ src }: { src: string }) {
  return (
    <>
      {tokens(src).map((tok, i) => (
        <span className="w" key={i}>
          {segments(tok).map((s, j) => (s.ruby ? <ruby key={j}>{s.text}<rt>{s.ruby}</rt></ruby> : s.text))}
        </span>
      ))}
    </>
  );
}

export function useRomajiMode(): 'show' | 'tap' | 'off' {
  const { state } = useStore();
  const stage = useContext(StageContext);
  if (state.settings.romaji === 'always') return 'show';
  if (state.settings.romaji === 'never') return 'off';
  return stage === 1 ? 'show' : 'tap';
}

/** Botones de audio: velocidad normal y lenta. */
export function Say({ src, big = false, repeat = false }: { src: string; big?: boolean; repeat?: boolean }) {
  const { say } = useSpeech();
  return (
    <span className={`say-group${big ? ' say-big' : ''}`}>
      <button type="button" className="say" onClick={() => say(src)} aria-label="Escuchar" title="Escuchar">
        <Icon name="sound" />
      </button>
      <button type="button" className="say say-slow" onClick={() => say(src, { slow: true })} aria-label="Escuchar despacio" title="Escuchar despacio">
        lento
      </button>
      {repeat && (
        <button type="button" className="say say-slow" onClick={() => say(src, { times: 3 })} aria-label="Escuchar tres veces" title="Escuchar tres veces">
          ×3
        </button>
      )}
    </span>
  );
}

interface JpProps {
  src: string;
  size?: 'm' | 'l' | 'xl';
  audio?: boolean;
  /** false: sin rōmaji en ningún caso (para no regalar respuestas). */
  romaji?: boolean;
  repeat?: boolean;
}

export function Jp({ src, size = 'm', audio = true, romaji = true, repeat = false }: JpProps) {
  const stage = useContext(StageContext);
  const mode = useRomajiMode();
  const [open, setOpen] = useState(false);
  const ro = toRomaji(src);
  const canShow = romaji && mode !== 'off' && !hasKanji(ro);
  const visible = canShow && (mode === 'show' || open);
  return (
    <span className={`jp jp-${size}`} data-stage={stage}>
      {audio && <Say src={src} repeat={repeat} />}
      <span className="jp-body">
        <span className="jp-text" lang="ja"><Ruby src={src} /></span>
        {visible && <span className="jp-romaji">{ro}</span>}
        {canShow && mode === 'tap' && !open && (
          <button type="button" className="romaji-toggle" onClick={() => setOpen(true)}>ver rōmaji</button>
        )}
      </span>
    </span>
  );
}

/** Texto explicativo: **negrita** y {japonés en línea} con furigana. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\{[^}]+\})/g);
  return (
    <>
      {parts.map((s, i) => {
        if (s.startsWith('**')) return <strong key={i}>{s.slice(2, -2)}</strong>;
        if (s.startsWith('{')) return <span key={i} className="jp-inline" lang="ja"><Ruby src={s.slice(1, -1)} /></span>;
        return s;
      })}
    </>
  );
}
