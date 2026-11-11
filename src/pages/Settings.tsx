import { useRef, useState } from 'react';
import { PageHead } from '../components/Layout';
import { PREVIEW } from '../lib/env';
import { emptyState, type State } from '../lib/progress';
import { useSpeech } from '../lib/speech';
import { useStore } from '../lib/store';

const ROMAJI = [
  { value: 'auto', title: 'Progresivo (recomendado)', text: 'Visible en los primeros módulos; después solo aparece si lo pides.' },
  { value: 'always', title: 'Siempre visible', text: 'Útil las primeras semanas. Conviene dejarlo cuanto antes.' },
  { value: 'never', title: 'Oculto', text: 'Solo kana y kanji con furigana, como en un texto real.' },
] as const;

export function SettingsPage() {
  const { state, setSetting, replace } = useStore();
  const { status, voices, say } = useSpeech();
  const [message, setMessage] = useState('');
  const [confirming, setConfirming] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  const s = state.settings;

  const exportData = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nihongo-quest-progreso.json';
    a.click();
    URL.revokeObjectURL(url);
    setMessage('Copia descargada.');
  };
  const importData = async (f: File | undefined) => {
    if (!f) return;
    try {
      const data = JSON.parse(await f.text()) as State;
      if (data.v !== 1 || typeof data.xp !== 'number' || !data.done || !data.cards) throw new Error('formato');
      replace({ ...emptyState(), ...data, settings: { ...emptyState().settings, ...data.settings } });
      setMessage('Progreso restaurado.');
    } catch {
      setMessage('Ese archivo no es una copia válida de NIHONGO QUEST.');
    }
  };
  const reset = () => {
    replace({ ...emptyState(), settings: s });
    setConfirming(false);
    setMessage('Progreso borrado.');
  };

  return (
    <>
      <PageHead jp="せってい" title="Ajustes" />
      <div className="settings">
        <section className="card">
          <h2>Rōmaji</h2>
          <div className="choices">
            {ROMAJI.map((o) => (
              <label key={o.value} className={s.romaji === o.value ? 'on' : ''}>
                <input type="radio" name="romaji" checked={s.romaji === o.value} onChange={() => setSetting('romaji', o.value)} />
                <span><strong>{o.title}</strong><br />{o.text}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>Voz japonesa</h2>
          {status === 'ready' ? (
            <>
              <label className="field"><span>Voz</span>
                <select value={voices.some((v) => v.name === s.voice) ? s.voice : ''} onChange={(e) => setSetting('voice', e.target.value)}>
                  <option value="">Automática</option>
                  {voices.map((v) => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
                </select>
              </label>
              <label className="field"><span>Velocidad normal: {s.rate.toFixed(2)}×</span>
                <input type="range" min="0.7" max="1.2" step="0.05" value={s.rate} onChange={(e) => setSetting('rate', Number(e.target.value))} />
              </label>
              <button type="button" className="btn btn-quiet" onClick={() => say('こんにちは。 日本語[にほんご] の 勉強[べんきょう] を 始[はじ]めましょう。')}>Probar la voz</button>
              <p className="hint">Solo se listan voces cuyo idioma es japonés ({voices.length} en este dispositivo). La calidad depende del navegador y del sistema.</p>
            </>
          ) : status === 'checking' ? <p>Buscando voces japonesas…</p> : (
            <p>{status === 'unsupported' ? 'Este navegador no ofrece síntesis de voz.' : 'No hay ninguna voz japonesa instalada en este dispositivo.'} El audio permanece desactivado: nunca se sustituye por una voz de otro idioma. En el aviso superior tienes los pasos para instalar una.</p>
          )}
        </section>

        <section className="card">
          <h2>Apariencia</h2>
          <div className="seg" role="group" aria-label="Tema">
            <button type="button" className={s.theme === 'dark' ? 'on' : ''} onClick={() => setSetting('theme', 'dark')}>Oscuro</button>
            <button type="button" className={s.theme === 'light' ? 'on' : ''} onClick={() => setSetting('theme', 'light')}>Claro</button>
          </div>
        </section>

        <section className="card">
          <h2>Tu progreso</h2>
          <p>Todo se guarda en este navegador, sin cuentas ni servidores. Si cambias de dispositivo o borras los datos de navegación, lo perderás: descarga una copia de vez en cuando.</p>
          {PREVIEW ? <p className="hint">Esta vista previa no permite descargar archivos: la copia de seguridad funciona en la versión publicada.</p> : (
            <div className="row">
              <button type="button" className="btn btn-quiet" onClick={exportData}>Descargar copia</button>
              <button type="button" className="btn btn-quiet" onClick={() => file.current?.click()}>Restaurar copia</button>
              <input ref={file} type="file" accept="application/json" hidden onChange={(e) => { void importData(e.target.files?.[0]); e.target.value = ''; }} />
            </div>
          )}
          {confirming ? (
            <div className="confirm" role="alertdialog" aria-label="Confirmar borrado">
              <p><strong>¿Borrar todo tu progreso de este navegador?</strong> Se eliminarán lecciones, tarjetas, racha y logros. No se puede deshacer.</p>
              <div className="row">
                <button type="button" className="btn btn-no" onClick={reset}>Sí, borrar todo</button>
                <button type="button" className="btn btn-quiet" onClick={() => setConfirming(false)}>Cancelar</button>
              </div>
            </div>
          ) : (
            <button type="button" className="btn btn-no" onClick={() => { setConfirming(true); setMessage(''); }}>Borrar todo</button>
          )}
          {message && <p role="status" className="hint">{message}</p>}
        </section>

        <section className="card">
          <h2>Créditos</h2>
          <p>Contenido, personajes e ilustraciones: originales de NIHONGO QUEST. Los animes citados como inspiración de género no ceden ni prestan ningún material.</p>
          <p>Orden de trazos: <a href="https://kanjivg.tagaini.net" target="_blank" rel="noreferrer">KanjiVG</a>, de Ulrich Apel, con licencia Creative Commons BY-SA 3.0. Tipografías: Zen Maru Gothic, Zen Kaku Gothic New y Klee One (SIL Open Font License). Audio: voces del propio dispositivo.</p>
        </section>
      </div>
    </>
  );
}
