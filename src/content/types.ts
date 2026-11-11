export type Level = 'N5' | 'N4' | 'N3';

/** Japonés en formato de autoría (ver lib/japanese.ts) + traducción. */
export interface Term {
  jp: string;
  es: string;
  note?: string;
}

export interface Line {
  who: string;
  jp: string;
  es: string;
}

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'note'; kind: 'tip' | 'ojo' | 'cultura'; title: string; text: string }
  | { t: 'terms'; title: string; items: Term[] }
  | { t: 'sentences'; title: string; items: Term[] }
  | { t: 'dialogue'; title: string; lines: Line[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'kana'; chars: string[] }
  | { t: 'write'; chars: string[] }
  | { t: 'pairs'; title: string; items: { a: string; b: string; note: string }[] };

export type Exercise =
  | {
      k: 'choice';
      q: string;
      /** Japonés que acompaña a la pregunta (se muestra grande, con audio). */
      jp?: string;
      /** Solo audio: el alumno escucha y elige. */
      audio?: string;
      /** Conversación simulada: alguien te dice esto y tú eliges la respuesta. */
      scene?: Line;
      options: string[];
      /** Índice de la opción correcta (al escribir contenido, siempre la primera). */
      answer: number;
      why: string;
      pitfall?: string;
      /** Opciones sin rōmaji ni audio, para no regalar la respuesta. */
      bare?: boolean;
      /** Palabra de repaso asociada: si se falla, vuelve antes. */
      term?: Term;
    }
  | { k: 'order'; jp: string; es: string; why?: string }
  | { k: 'match'; pairs: Term[] }
  | { k: 'type'; q: string; jp: string; accept: string; why: string };

export interface Lesson {
  id: string;
  title: string;
  /** Título en japonés para el cartel de estación. */
  jp?: string;
  goal: string;
  blocks: Block[];
  /** Ejercicios escritos a mano; el resto se genera a partir del vocabulario y las frases. */
  extra?: Exercise[];
  /** Caracteres kana que se practican (genera ejercicios de reconocimiento). */
  kana?: string[];
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Module {
  id: string;
  n: number;
  title: string;
  jp: string;
  desc: string;
  level: string;
  /** 1 = rōmaji siempre visible · 2 = rōmaji al tocar · 3 = furigana, rōmaji al tocar */
  stage: 1 | 2 | 3;
  color: string;
  units: Unit[];
}

export interface Look {
  skin: string;
  hair: string;
  eyes: string;
  style: 'corto' | 'largo' | 'coleta' | 'punta' | 'bob';
  extra?: 'gafas' | 'lazo' | 'cascos' | 'cinta' | 'visor' | 'capucha';
}

export interface Character {
  name: string;
  jp: string;
  role: string;
  bio: string;
  look: Look;
}

export interface World {
  id: string;
  name: string;
  jp: string;
  tagline: string;
  desc: string;
  color: string;
  cast: Character[];
  scenes: (Lesson & { after: string })[];
}

export interface Area {
  id: string;
  title: string;
  jp: string;
  desc: string;
  situations: Lesson[];
}

export type Track = 'academia' | 'mundos' | 'japon';

export interface LessonRef {
  lesson: Lesson;
  track: Track;
  stage: 1 | 2 | 3;
  color: string;
  /** Módulo, mundo o área a la que pertenece. */
  groupId: string;
  groupTitle: string;
  unitTitle?: string;
  backHref: string;
}
