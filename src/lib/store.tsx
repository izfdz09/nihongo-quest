import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { completeLesson, earn, emptyState, withMedals, type LessonResult, type Settings, type State } from './progress';
import { dayNumber } from './srs';

/* Contexto de React para el progreso. Se guarda en localStorage: no hay servidor ni cuentas. */

const KEY = 'nihongo-quest:v1';


function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const saved = JSON.parse(raw) as Partial<State>;
    const base = emptyState();
    return { ...base, ...saved, settings: { ...base.settings, ...saved.settings }, counts: { ...base.counts, ...saved.counts }, streak: { ...base.streak, ...saved.streak } };
  } catch {
    return emptyState();
  }
}

interface Store {
  state: State;
  update: (fn: (s: State) => State) => void;
  finishLesson: (r: LessonResult) => number;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  noteRecording: () => void;
  replace: (s: State) => void;
  today: number;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* almacenamiento lleno o bloqueado: la sesión sigue funcionando en memoria */
    }
  }, [state]);

  useEffect(() => {
    document.documentElement.dataset.theme = state.settings.theme;
  }, [state.settings.theme]);

  const store = useMemo<Store>(() => ({
    state,
    today: dayNumber(),
    update: (fn) => setState((s) => fn(s)),
    finishLesson: (r) => {
      const { state: next, xp } = completeLesson(state, r);
      setState(next);
      return xp;
    },
    setSetting: (key, value) => setState((s) => ({ ...s, settings: { ...s.settings, [key]: value } })),
    noteRecording: () => setState((s) => withMedals(earn({ ...s, counts: { ...s.counts, recordings: s.counts.recordings + 1 } }, 3, 'Práctica oral con grabación', '/hablar'))),
    replace: (s) => setState(s),
  }), [state]);

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const store = useContext(Ctx);
  if (!store) throw new Error('useStore debe usarse dentro de StoreProvider');
  return store;
}
