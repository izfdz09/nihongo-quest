import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { findRef } from '../content';
import type { Lesson, Track } from '../content/types';
import { levelOf, liveStreak } from '../lib/progress';
import { to } from '../lib/router';
import { useSpeech } from '../lib/speech';
import { dueCards } from '../lib/srs';
import { useStore } from '../lib/store';
import { Logo } from './Art';
import { Icon } from './Jp';

interface NavItem { path: string; label: string; icon: string }

const HOME: NavItem = { path: '/', label: 'Inicio', icon: 'home' };
const ACADEMY: NavItem = { path: '/academia', label: 'Academia', icon: 'line' };
const REVIEW: NavItem = { path: '/repaso', label: 'Repaso', icon: 'cards' };
const SPEAK: NavItem = { path: '/hablar', label: 'Práctica oral', icon: 'mic' };

/** El menú se agrupa por lo que el alumno quiere hacer, no por cómo está construida la web. */
const GROUPS: { title: string; items: NavItem[] }[] = [
  { title: 'Aprender', items: [
    ACADEMY,
    { path: '/registros', label: 'Formal e informal', icon: 'tone' },
    { path: '/mundos', label: 'Mundos', icon: 'world' },
    { path: '/japon', label: 'Vivir en Japón', icon: 'japan' },
  ] },
  { title: 'Practicar', items: [REVIEW, SPEAK] },
  { title: 'Tu espacio', items: [
    { path: '/panel', label: 'Mi panel', icon: 'chart' },
    { path: '/ajustes', label: 'Ajustes', icon: 'gear' },
    { path: '/ayuda', label: 'Cómo funciona', icon: 'help' },
  ] },
];
/** En el móvil caben cuatro pestañas; el resto vive en «Más». */
const TABS: NavItem[] = [HOME, ACADEMY, REVIEW, SPEAK];
const MORE: NavItem[] = GROUPS.flatMap((g) => g.items).filter((n) => !TABS.includes(n));
const TRACK_PATH: Record<Track, string> = { academia: '/academia', mundos: '/mundos', japon: '/japon', registros: '/registros' };

function Status({ streak, todayXp, goal, due }: { streak: number; todayXp: number; goal: number; due: number }) {
  const pct = Math.min(100, Math.round((todayXp / goal) * 100));
  return (
    <div className="status">
      <a href={to('/panel')} className="chip-stat" title="Racha de estudio">
        <Icon name="flame" /><b>{streak}</b><span>{streak === 1 ? 'día de racha' : 'días de racha'}</span>
      </a>
      <a href={to('/panel')} className={`chip-stat${todayXp >= goal ? ' chip-done' : ''}`} title="Objetivo de hoy">
        <Icon name="target" /><b>{todayXp}/{goal}</b><span>XP hoy</span>
        <i className="chip-bar"><i style={{ width: `${pct}%` }} /></i>
      </a>
      {due > 0 && (
        <a href={to('/repaso')} className="chip-stat chip-due" title="Tarjetas pendientes de repaso">
          <Icon name="cards" /><b>{due}</b><span>para repasar</span>
        </a>
      )}
    </div>
  );
}

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
        <p><strong>Audio desactivado: este navegador no tiene ninguna voz japonesa.</strong></p>
        {open && (
          <>
            <p>No reproducimos el japonés con voces de otros idiomas porque la pronunciación sería incorrecta. Para activarlo, instala una voz japonesa:</p>
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
  const [menu, setMenu] = useState(false);
  // Una lección ilumina en el menú el itinerario al que pertenece.
  const current = route[0] === 'leccion' ? TRACK_PATH[findRef(route[1] ?? '')?.track ?? 'academia'] : `/${route[0] ?? ''}`;
  const due = dueCards(Object.values(state.cards), today).length;
  const streak = liveStreak(state, today);
  const level = levelOf(state.xp);
  const status = { streak, todayXp: state.daily[today] ?? 0, goal: state.settings.goal, due };

  useEffect(() => setMenu(false), [route]);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  const link = (n: NavItem) => {
    const on = current === n.path;
    return (
      <a key={n.path} href={to(n.path)} className={on ? 'on' : ''} aria-current={on ? 'page' : undefined}>
        <Icon name={n.icon} />
        <span>{n.label}</span>
        {n.path === '/repaso' && due > 0 && <b className="badge" aria-label={`${due} tarjetas pendientes`}>{due}</b>}
      </a>
    );
  };
  const moreOn = menu || MORE.some((n) => n.path === current);

  return (
    <div className="app">
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <aside className="side">
        <a className="brand" href={to('/')}><Logo /><span><b>NIHONGO</b> QUEST</span></a>
        <nav aria-label="Secciones">
          {link(HOME)}
          {GROUPS.map((g) => (
            <div className="nav-group" key={g.title} role="group" aria-label={g.title}>
              <span className="nav-title" aria-hidden="true">{g.title}</span>
              {g.items.map(link)}
            </div>
          ))}
        </nav>
        <a className="side-foot" href={to('/panel')}>
          <span className="side-level" lang="ja">{level.jp}</span>
          <span>Nivel {level.level}<br /><small>{level.title}</small></span>
        </a>
      </aside>
      <header className="top">
        <a className="brand" href={to('/')} aria-label="NIHONGO QUEST, inicio"><Logo size={32} /><span><b>NIHONGO</b> QUEST</span></a>
        <Status {...status} />
      </header>
      <main id="contenido" tabIndex={-1}>
        <div className="status-row"><Status {...status} /></div>
        <VoiceNotice />
        {children}
      </main>
      <nav className="tabs" aria-label="Secciones principales">
        {TABS.map((n) => link(n === SPEAK ? { ...n, label: 'Hablar' } : n))}
        <button type="button" className={moreOn ? 'on' : ''} aria-expanded={menu} aria-controls="mas-secciones" onClick={() => setMenu(!menu)}>
          <Icon name="more" /><span>Más</span>
        </button>
      </nav>
      {menu && (
        <div className="sheet-wrap" onClick={() => setMenu(false)}>
          <div className="sheet" id="mas-secciones" role="dialog" aria-label="Más secciones" onClick={(e) => e.stopPropagation()}>
            <h2>Más secciones</h2>
            <div className="sheet-grid">{MORE.map(link)}</div>
            <button type="button" className="btn btn-quiet" onClick={() => setMenu(false)}>Cerrar</button>
          </div>
        </div>
      )}
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
