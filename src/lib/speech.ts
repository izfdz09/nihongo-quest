import { useCallback, useSyncExternalStore } from 'react';
import { display, hasKanji, kana } from './japanese';
import { useStore } from './store';

/*
 * Audio con la SpeechSynthesis API del navegador.
 * Solo se usan voces cuyo idioma declarado es japonés (ja-JP). Si el dispositivo
 * no tiene ninguna, NO se reproduce nada con otra voz: se avisa al alumno.
 */

export type VoiceStatus = 'checking' | 'ready' | 'missing' | 'unsupported';
interface Snapshot { status: VoiceStatus; voices: SpeechSynthesisVoice[] }

const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
let snap: Snapshot = { status: supported ? 'checking' : 'unsupported', voices: [] };
const listeners = new Set<() => void>();

const isJapanese = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-').toLowerCase().startsWith('ja');

function refresh(final: boolean): void {
  if (!supported) return;
  const voices = window.speechSynthesis.getVoices().filter(isJapanese);
  const status: VoiceStatus = voices.length ? 'ready' : final || snap.status === 'missing' ? 'missing' : 'checking';
  if (status === snap.status && voices.length === snap.voices.length) return;
  snap = { status, voices };
  listeners.forEach((l) => l());
}

if (supported) {
  refresh(false);
  window.speechSynthesis.addEventListener?.('voiceschanged', () => refresh(false));
  // Algunos navegadores cargan las voces con retraso: se espera antes de darlas por ausentes.
  window.setTimeout(() => refresh(true), 2500);
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** Texto que se envía a la voz: palabras sueltas por su lectura en kana; frases con sus kanji. */
export function speechText(src: string): string {
  const clean = src.replace(/[〜＿…]/g, '').trim();
  return !clean.includes(' ') && hasKanji(clean) ? kana(clean) : display(clean);
}

export interface SayOptions { slow?: boolean; times?: number; onEnd?: () => void }

export function useSpeech() {
  const { status, voices } = useSyncExternalStore(subscribe, () => snap);
  const { state } = useStore();
  const { rate, voice: voiceName } = state.settings;

  const say = useCallback((src: string, opts: SayOptions = {}): boolean => {
    if (snap.status !== 'ready') {
      window.dispatchEvent(new Event('nq:no-voice'));
      opts.onEnd?.();
      return false;
    }
    const synth = window.speechSynthesis;
    synth.cancel();
    const voice = snap.voices.find((v) => v.name === voiceName) ?? snap.voices.find((v) => v.localService) ?? snap.voices[0];
    const times = opts.times ?? 1;
    for (let i = 0; i < times; i++) {
      const u = new SpeechSynthesisUtterance(speechText(src));
      u.lang = 'ja-JP';
      u.voice = voice;
      u.rate = rate * (opts.slow ? 0.6 : 1);
      if (i === times - 1 && opts.onEnd) {
        u.onend = opts.onEnd;
        u.onerror = opts.onEnd;
      }
      synth.speak(u);
    }
    return true;
  }, [rate, voiceName]);

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
  }, []);

  return { status, voices, say, stop };
}
