/**
 * Vista previa incrustada (sin descargas, micrófono ni peticiones externas).
 * La compilación normal con Vite no define esta constante y vale siempre false.
 */
declare const __NQ_PREVIEW__: boolean | undefined;

export const PREVIEW: boolean = typeof __NQ_PREVIEW__ !== 'undefined' && __NQ_PREVIEW__ === true;
