import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { Lesson } from '../content/types';
import { levelOf, liveStreak } from '../lib/progress';
import { to } from '../lib/router';
import { useSpeech } from '../lib/speech';
import { dueCards } from '../lib/srs';
import { useStore } from '../lib/store';
import { Logo } from './Art';
import { Icon } from './Jp';

const NAV = [
  { path: '/', label: 'Inicio', icon: 'home', mobile: true },
  { path: '/academia', label: 'Academia', icon: 'line', mobile: true },
  { path: '/mundos', label: 'Mundos', icon: 'world', mobile: true },
  { path: '/japon', label: 'Japón', icon: 'japan', mobile: true },
  { path: '/repaso', label: 'Repaso', icon: 'cards', mobile: true },
  { path: '/hablar', label: 'Hablar', icon: 'mic', mobile: false },
  { path: '/panel', label: 'Mi panel', icon: 'chart', mobile: false },
  { path: '/ajustes', label: 'Ajustes', icon: 'gear', mobile: false },
];

/** Aviso cuando el dispositivo no tiene voz japonesa. Nunca se sustituye por otra voz. */
function VoiceNotice() {
  const { status } = useSpeech();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('nq:no-voice', show);
    return () => window.removeEventListener('nq:no-voice', show);
  }, []);
  if (status === 'ready') return null;
  if (status === 'checking') return open ? <div className="voice-notice" role="status"><p>Buscando una voz japonesa en tu dispositivo… Vuelve a pulsar el altavoz en un momento.</p></div> : null;
  if (dismissed && !open) return null;
  return (
    <div className="voice-notice" role="alert">
      <div>
        <p><strong>El audio está desactivado: este navegador no tiene ninguna voz japonesa.</strong></p>
        <p>No reproducimos el japonés con voces de otros idiomas porque la pronunciación sería incorrecta.</p>
        {open && (
          <>
            <ul>
              <li><strong>Windows:</strong> Configuración → Hora e idioma → Voz → Agregar voces → Japonés.</li>
              <li><strong>Android:</strong> Ajustes → Idiomas → Síntesis de voz → instala los datos de voz de japonés.</li>
              <li><strong>iPhone, iPad y Mac:</strong> Ajustes → Accesibilidad → Contenido leído → Voces → Japonés.</li>
              <li><strong>Chrome de escritorio:</strong> incluye la voz «Google 日本語» cuando hay conexión a internet.</li>
            </ul>
            <p>Los nombres de los menús cambian según la versión. Después de instalar la voz, recarga la página. Mientras tanto, cada palabra muestra su rōmaji y la lección «Pronunciación básica» explica cómo suena cada sonido.</p>
          </>
        )}
      </div>
      <div className="voice-notice-actions">
        <button type="button" className="btn btn-quiet" onClick={() => setOpen(!open)}>{open ? 'Ver menos' : 'Cómo activarlo'}</button>
        <button type="button" className="btn btn-quiet" onClick={() => { setDismissed(true); setOpen(false); }}>Cerrar</button>
      </div>
    </div>
  );
}

export function Layout({ route, children }: { route: string[]; children: ReactNode }) {
  const { state, today } = useStore();
  const current = `/${route[0] ?? ''}`;
  const due = dueCards(Object.values(state.cards), today).length;
  const streak = liveStreak(state, today);
  const level = levelOf(state.xp);
  const active = (path: string) => (path === '/' ? current === '/' : current === path || (path === '/academia' && current === '/leccion'));
  const link = (n: (typeof NAV)[number]) => (
    <a key={n.path} href={to(n.path)} className={active(n.path) ? 'on' : ''} aria-current={active(n.path) ? 'page' : undefined}>
      <Icon name={n.icon} />
      <span>{n.label}</span>
      {n.path === '/repaso' && due > 0 && <b className="badge" aria-label={`${due} tarjetas pendientes`}>{due}</b>}
    </a>
  );
  return (
    <div className="app">
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <aside className="side">
        <a className="brand" href={to('/')}><Logo /><span><b>NIHONGO</b> QUEST</span></a>
        <nav aria-label="Secciones">{NAV.map(link)}</nav>
        <a className="side-foot" href={to('/panel')}>
          <span className="side-level" lang="ja">{level.jp}</span>
          <span>Nivel {level.level} · {level.title}<br /><small><Icon name="flame" /> {streak} {streak === 1 ? 'día' : 'días'} de racha</small></span>
        </a>
      </aside>
      <header className="top">
        <a className="brand" href={to('/')}><Logo size={32} /><span><b>NIHONGO</b> QUEST</span></a>
        <span className="top-streak" title="Racha de estudio"><Icon name="flame" /> {streak}</span>
        {NAV.filter((n) => !n.mobile).map((n) => <a key={n.path} href={to(n.path)} aria-label={n.label} className={`top-link${active(n.path) ? ' on' : ''}`}><Icon name={n.icon} /></a>)}
      </header>
      <main id="contenido" tabIndex={-1}>
        <VoiceNotice />
        {children}
      </main>
      <nav className="tabs" aria-label="Secciones">{NAV.filter((n) => n.mobile).map(link)}</nav>
    </div>
  );
}

export function PageHead({ jp, title, children }: { jp?: string; title: string; children?: ReactNode }) {
  return (
    <header className="page-head">
      {jp && <span className="page-jp" lang="ja" aria-hidden="true">{jp}</span>}
      <h1>{title}</h1>
      {children && <p className="lead">{children}</p>}
    </header>
  );
}

export function Meter({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = max ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <span className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label}>
      <span style={{ width: `${pct}%` }} />
    </span>
  );
}

/** Lista de lecciones como paradas de una línea: la sucesión es real, de ahí el trazado. */
export function Stations({ lessons, color, nextId, note }: { lessons: Lesson[]; color: string; nextId?: string; note?: (l: Lesson) => ReactNode }) {
  const { state } = useStore();
  return (
    <ol className="stations" style={{ '--line': color } as CSSProperties}>
      {lessons.map((l) => {
        const done = state.done[l.id];
        return (
          <li key={l.id} className={done ? 'done' : l.id === nextId ? 'next' : ''}>
            <a href={to(`/leccion/${l.id}`)}>
              <span className="dot">{done && <Icon name="check" />}</span>
              <span className="st-body">
                {l.jp && <span className="st-jp" lang="ja">{l.jp}</span>}
                <strong>{l.title}</strong>
                <span className="st-goal">{l.goal}</span>
                {note?.(l)}
              </span>
              {done ? <span className="st-tag">Mejor resultado: {done.best} %</span> : l.id === nextId ? <span className="st-tag st-tag-next">Siguiente parada</span> : null}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
