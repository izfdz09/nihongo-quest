import { useEffect, useMemo, useRef, useState } from 'react';
import { PageHead } from '../components/Layout';
import { Icon, Jp, Say, StageContext } from '../components/Jp';
import { allRefs } from '../content';
import type { Term } from '../content/types';
import { PREVIEW } from '../lib/env';
import { lessonSentences } from '../lib/exercises';
import { display, kana } from '../lib/japanese';
import { useSpeech } from '../lib/speech';
import { useStore } from '../lib/store';

const STARTER: Term[] = [
  { jp: 'おはようございます。', es: 'Buenos días.' },
  { jp: 'ありがとうございます。', es: 'Muchas gracias.' },
  { jp: 'すみません。', es: 'Perdone.' },
  { jp: 'はじめまして。 よろしく おねがいします。', es: 'Encantado. Un placer.' },
  { jp: 'わたし は がくせい です。', es: 'Soy estudiante.' },
  { jp: 'スペイン から きました。', es: 'Vengo de España.' },
  { jp: 'えき は どこ です か。', es: '¿Dónde está la estación?' },
  { jp: 'これ は いくら です か。', es: '¿Cuánto cuesta esto?' },
  { jp: 'もう いちど おねがいします。', es: 'Otra vez, por favor.' },
  { jp: 'にほんご を べんきょうして います。', es: 'Estoy estudiando japonés.' },
];

type Recognition = { lang: string; interimResults: boolean; onresult: ((e: { results: { 0: { 0: { transcript: string } } } }) => void) | null; onerror: (() => void) | null; onend: (() => void) | null; start(): void; stop(): void };
const recognitionCtor = (): (new () => Recognition) | undefined => {
  const w = window as unknown as Record<string, new () => Recognition>;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
};
const norm = (s: string) => s.replace(/[\s。、？！?!.,]/g, '');

function Recorder({ phrase }: { phrase: Term }) {
  const { say } = useSpeech();
  const { noteRecording } = useStore();
  const [state, setState] = useState<'idle' | 'recording' | 'denied' | 'unsupported'>('idle');
  const [url, setUrl] = useState('');
  const [heard, setHeard] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);

  const record = async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') return setState('unsupported');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        setUrl(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType })));
        setState('idle');
        noteRecording();
      };
      recorder.current = rec;
      rec.start();
      setState('recording');
    } catch {
      setState('denied');
    }
  };
  const compare = () => say(phrase.jp, { onEnd: () => void audio.current?.play() });

  const Ctor = recognitionCtor();
  const transcribe = () => {
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = 'ja-JP';
    rec.interimResults = false;
    rec.onresult = (e) => setHeard(e.results[0][0].transcript);
    rec.onerror = () => setHeard('');
    rec.onend = () => setListening(false);
    setListening(true);
    setHeard(null);
    rec.start();
  };
  const matches = heard ? [display(phrase.jp), kana(phrase.jp)].some((t) => norm(t) === norm(heard)) : false;

  return (
    <ol className="speak-steps">
      <li><h3>Escucha</h3><Say src={phrase.jp} big repeat /></li>
      <li><h3>Lee</h3><Jp src={phrase.jp} size="xl" audio={false} /><p className="term-es">{phrase.es}</p></li>
      <li>
        <h3>Dilo en voz alta y grábate</h3>
        {state === 'recording'
          ? <button type="button" className="btn btn-no" onClick={() => recorder.current?.stop()}><span className="rec-dot" /> Detener la grabación</button>
          : <button type="button" className="btn btn-main" onClick={record}><Icon name="mic" /> {url ? 'Grabar de nuevo' : 'Grabar mi voz'}</button>}
        {state === 'denied' && <p className="hint">{PREVIEW ? 'Esta vista previa no tiene acceso al micrófono: la grabación funciona en la versión publicada. Aquí puedes escuchar, repetir en voz alta y comparar de oído.' : 'No hay permiso para usar el micrófono. Actívalo en el icono del candado de la barra de direcciones y vuelve a intentarlo.'}</p>}
        {state === 'unsupported' && <p className="hint">Este navegador no permite grabar audio. Puedes seguir practicando: escucha, repite en voz alta y compara de oído.</p>}
        <p className="hint">La grabación no sale de tu dispositivo ni se guarda al cerrar la página.</p>
      </li>
      <li>
        <h3>Escucha tu grabación</h3>
        {url ? <audio ref={audio} src={url} controls /> : <p className="hint">Aparecerá aquí cuando grabes.</p>}
      </li>
      <li>
        <h3>Compara con el modelo</h3>
        <button type="button" className="btn btn-quiet" onClick={compare} disabled={!url}>Reproducir el modelo y después mi voz</button>
        <p className="hint">Fíjate en tres cosas: la duración de las vocales largas, que ninguna sílaba suene más fuerte que las demás y la «r» suave.</p>
      </li>
      {Ctor && (
        <li className="speak-experimental">
          <h3>Transcripción <span className="tag">Experimental</span></h3>
          <button type="button" className="btn btn-quiet" onClick={transcribe} disabled={listening}>{listening ? 'Escuchando…' : 'Transcribir lo que digo'}</button>
          {heard !== null && (heard === '' ? <p className="hint">El reconocedor no ha captado nada. Comprueba el micrófono e inténtalo de nuevo.</p> : (
            <>
              <p>El reconocedor ha entendido: <span className="jp-inline" lang="ja">{heard}</span></p>
              <p className="hint">{matches
                ? 'Coincide con la frase. Es buena señal de que se te entiende, pero el reconocimiento de voz no valora el acento ni el ritmo: compara tu grabación con el modelo.'
                : 'No coincide exactamente. Puede deberse a tu pronunciación, pero también al propio reconocedor, que falla a menudo con frases cortas y escribe con kanji lo que aquí ves en kana. Si al leerlo suena igual, cuenta como acierto.'}</p>
            </>
          ))}
        </li>
      )}
    </ol>
  );
}

export function SpeakingPage() {
  const { state } = useStore();
  const sets = useMemo(() => {
    const out = [{ id: 'inicio', title: 'Primeras frases', stage: 1 as 1 | 2 | 3, items: STARTER }];
    for (const r of allRefs) {
      const items = [...lessonSentences(r.lesson), ...r.lesson.blocks.flatMap((b) => (b.t === 'dialogue' ? b.lines.map((l) => ({ jp: l.jp, es: l.es })) : []))];
      if (state.done[r.lesson.id] && items.length) out.push({ id: r.lesson.id, title: r.lesson.title, stage: r.stage, items });
    }
    return out;
  }, [state.done]);
  const [setId, setSetId] = useState('inicio');
  const [index, setIndex] = useState(0);
  const set = sets.find((s) => s.id === setId) ?? sets[0];
  const phrase = set.items[Math.min(index, set.items.length - 1)];

  return (
    <StageContext.Provider value={set.stage}>
      <PageHead jp="はつおん" title="Práctica oral">Escucha, repite, grábate y compara. La pronunciación se entrena con el oído y con la boca, no leyendo.</PageHead>
      <div className="speak">
        <aside className="speak-list">
          <label className="field">
            <span>Frases de</span>
            <select value={set.id} onChange={(e) => { setSetId(e.target.value); setIndex(0); }}>
              {sets.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </label>
          {sets.length === 1 && <p className="hint">Al completar lecciones se añadirán aquí sus frases y diálogos.</p>}
          <ol>
            {set.items.map((p, i) => (
              <li key={p.jp}><button type="button" className={i === index ? 'on' : ''} onClick={() => setIndex(i)}><span lang="ja">{display(p.jp)}</span><small>{p.es}</small></button></li>
            ))}
          </ol>
        </aside>
        <Recorder key={phrase.jp} phrase={phrase} />
      </div>
    </StageContext.Provider>
  );
}
