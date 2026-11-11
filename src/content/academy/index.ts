import { hiraganaUnits, katakanaUnits } from '../kana';
import type { Module } from '../types';
import { introUnits } from './m1';
import { wordsUnits } from './m4';
import { grammarUnits } from './m5';
import { conversationUnits } from './m6';
import { kanjiUnits } from './m7';
import { intermediateUnits } from './m8';

/** Cada módulo es una «línea» con su color, como en un plano de metro. */
export const modules: Module[] = [
  { id: 'm1', n: 1, title: 'Introducción al japonés', jp: 'はじめに', level: 'Antes de N5', stage: 1, color: '#f2b63c', units: introUnits,
    desc: 'Cómo funciona el idioma, en qué se diferencia del español, sus tres escrituras, la pronunciación y la cortesía.' },
  { id: 'm2', n: 2, title: 'Hiragana', jp: 'ひらがな', level: 'N5', stage: 1, color: '#f29cb7', units: hiraganaUnits,
    desc: 'Las 46 sílabas básicas, los sonidos modificados y combinados, con audio, trazado y pruebas de lectura.' },
  { id: 'm3', n: 3, title: 'Katakana', jp: 'カタカナ', level: 'N5', stage: 1, color: '#4fc0c0', units: katakanaUnits,
    desc: 'El silabario de las palabras extranjeras: caracteres, préstamos, países y tu propio nombre.' },
  { id: 'm4', n: 4, title: 'Primeras palabras', jp: 'ことば', level: 'N5', stage: 1, color: '#9ad06b', units: wordsUnits,
    desc: 'Saludos, presentaciones, números, fechas, horas, familia, comida, lugares y objetos.' },
  { id: 'm5', n: 5, title: 'Gramática básica', jp: 'ぶんぽう', level: 'N5', stage: 2, color: '#7aa7f5', units: grammarUnits,
    desc: 'La estructura de la frase, las partículas, los verbos, los adjetivos y las formas educadas.' },
  { id: 'm6', n: 6, title: 'Conversación', jp: 'かいわ', level: 'N5', stage: 2, color: '#f08a5d', units: conversationUnits,
    desc: 'Presentarte, hablar de gustos y aficiones, opinar, pedir ayuda y entender lo que te responden.' },
  { id: 'm7', n: 7, title: 'Kanji', jp: '漢字', level: 'N5', stage: 3, color: '#b693f0', units: kanjiUnits,
    desc: 'Radicales, orden de trazos, lecturas y los primeros 50 kanji dentro de palabras y frases reales.' },
  { id: 'm8', n: 8, title: 'Japonés intermedio', jp: '中級', level: 'N4', stage: 3, color: '#5fd0a0', units: intermediateUnits,
    desc: 'Forma て, forma ない, potencial, comparaciones y condiciones; lenguaje informal, escucha y lectura.' },
];
