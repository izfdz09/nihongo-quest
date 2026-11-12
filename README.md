# NIHONGO QUEST

Plataforma web para aprender japonés desde cero, pensada para hispanohablantes que quieren llegar a desenvolverse en Japón. Funciona entera en el navegador: sin servidor, sin cuentas y sin servicios de pago.

## Qué incluye

| Sección | Contenido |
| --- | --- |
| **Academia** | 8 módulos, 21 unidades y 75 lecciones: introducción, hiragana, katakana, primeras palabras, gramática básica, conversación, kanji y japonés intermedio (referencias N5 y N4). |
| **Formal e informal** | 4 unidades y 13 lecciones sobre los registros: habla entre amigos, contracciones, partículas finales y jerga; registro cortés, keigo honorífico y humilde, tiendas y correos; errores de registro. Incluye un comparador que dice la misma idea en informal, cortés y keigo. |
| **Mundos de aprendizaje** | 6 ambientaciones (romance, fantasía, misterio, slice of life, acción y ciencia ficción) con 12 personajes originales y 12 escenas para practicar lo estudiado. |
| **Mi futuro en Japón** | 7 áreas y 15 situaciones reales: vecinos, vivienda, trabajo, estudios, transporte, compras, hospital, emergencias y ayuntamiento, con registro informal, cortés y keigo. |
| **Práctica** | Unos 1500 ejercicios por pasada: opción múltiple, traducción en ambos sentidos, completar frases, ordenar palabras, unir parejas, escuchar y elegir, escribir en rōmaji y conversaciones simuladas. Cada respuesta se explica. |
| **Audio** | Voces japonesas del dispositivo (SpeechSynthesis, solo `ja-*`), velocidad normal y lenta, repetición ×3 y diálogos completos. Si no hay voz japonesa se avisa y no se sustituye por otra. |
| **Práctica oral** | Escuchar, leer, grabarse, oírse y comparar con el modelo. Transcripción experimental si el navegador ofrece reconocimiento de voz en japonés. |
| **Repaso** | Repetición espaciada (cajas de Leitner): tarjetas, repaso diario, palabras por estado, estadísticas y registro de errores con su explicación. |
| **Mi panel** | Nivel, experiencia, racha, objetivo diario, progreso, vocabulario, actividad reciente y logros. |

En total son 115 lecciones y 850 palabras y expresiones distintas. El rōmaji se retira de forma progresiva: visible en los módulos 1 a 4, a petición en los módulos 5 y 6, y sustituido por furigana desde el módulo 7.

## Ponerlo en marcha

Hace falta Node.js 20 o posterior.

```bash
npm install
npm run dev        # servidor de desarrollo
npm test           # tests de rōmaji, repaso espaciado, progreso e integridad del contenido
npm run typecheck  # comprobación de tipos
npm run build      # genera dist/
```

## Publicarlo en GitHub Pages

1. Crea un repositorio en GitHub y sube este proyecto a la rama `main`.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Solo hay que hacerlo una vez.
3. Cada `push` a `main` ejecuta `.github/workflows/deploy.yml`: instala, pasa los tests, construye y publica.

No hay que tocar nada más. `vite.config.ts` usa una base relativa (`./`) y la navegación va por `#/ruta`, así que la web funciona en `https://usuario.github.io/<repositorio>/` sea cual sea el nombre del repositorio, y al recargar una página interior no aparece un 404.

## Cómo está organizado

```
src/
  content/          Todo lo que se enseña (datos, sin lógica)
    academy/        m1, m4–m8: un archivo por módulo
    kana.ts         Módulos 2 y 3, generados a partir de las tablas de kana
    registers.ts    «Formal e informal»: lecciones y comparador de registros
    worlds.ts       Los seis mundos, sus personajes y escenas
    japan.ts        «Mi futuro en Japón»
    helpers.ts      Atajos para escribir lecciones
    types.ts        Lesson, Block, Exercise, Module, World, Area
  lib/              Lógica sin interfaz, con tests
    japanese.ts     Furigana, lectura en kana y conversión a rōmaji
    exercises.ts    Genera la práctica de cada lección
    srs.ts          Repetición espaciada
    progress.ts     Estado del alumno: XP, racha, logros, errores
    speech.ts       Audio con voces japonesas
    store.tsx       Estado global y guardado en localStorage
    router.ts       Rutas por hash
  components/       Jp (texto japonés con audio), Blocks, Practice, Layout, Art
  pages/            Home, Tracks, Registers, LessonPage, Review, Speaking, Dashboard, Settings, Help
  styles/           base.css (tokens y piezas comunes) y app.css
```

## Añadir contenido

Una lección es un objeto de datos; no hay que tocar componentes. El japonés se escribe con las palabras separadas por espacios y la lectura de cada kanji entre corchetes:

```ts
lesson('mi-leccion', 'En la panadería', 'パンや', 'Pedir algo y preguntar el precio.', [
  p('Para pedir se usa {〜を ください}.'),
  terms('Vocabulario', 'パン|pan', 'お金[かね]|dinero'),
  frases('Pedir', 'これ を ください。|Deme esto, por favor.'),
  dlg('En el mostrador', 'Dependienta|いらっしゃいませ。|Bienvenido.', 'Tú|これ を ください。|Deme esto.'),
], [
  fill('パン ＿＿ ください。', 'Deme pan.', ['を', 'は', 'に'], 'Lo que se pide lleva {を}.'),
])
```

De esa cadena salen el texto sin espacios, el furigana, el rōmaji, el audio y las piezas de «ordenar palabras». Con el vocabulario y las frases se generan además ejercicios de reconocimiento, escucha, producción y parejas. `npm test` comprueba que no quede ningún kanji sin lectura, que los identificadores no se repitan y que cada lección produzca una práctica válida.

## Límites conocidos

- **El audio depende del dispositivo.** La calidad de la voz es la del navegador y el sistema. Sin voz japonesa instalada no hay audio; la aplicación explica cómo instalarla.
- **El reconocimiento de voz es orientativo.** Solo existe en algunos navegadores y no evalúa acento ni ritmo; la aplicación lo dice así y nunca califica la pronunciación.
- **El orden de trazos necesita conexión.** Se descarga de KanjiVG al pedirlo. Sin conexión se puede seguir trazando sobre el modelo.
- **El progreso vive en el navegador.** Se pierde al borrar los datos de navegación; en Ajustes se puede descargar y restaurar una copia.
- **El nivel N3 queda fuera de esta versión.** El contenido llega hasta gramática N4; ver `docs/PROGRESO.md`.

## Créditos

Contenido, personajes e ilustraciones originales. Los animes citados en el encargo son solo inspiración de género: no se usa ningún material suyo. Orden de trazos: [KanjiVG](https://kanjivg.tagaini.net) (CC BY-SA 3.0). Tipografías: Zen Maru Gothic, Zen Kaku Gothic New y Klee One (SIL OFL).
