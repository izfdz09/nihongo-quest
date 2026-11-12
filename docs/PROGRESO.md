# Estado del proyecto

Versión 0.2.0, publicada en https://izfdz09.github.io/nihongo-quest/.

## Cambios de la 0.2

- **Sección nueva «Formal e informal»:** 13 lecciones sobre los registros del japonés y un comparador que dice la misma idea en informal, cortés y keigo.
- **Navegación:** menú agrupado en Aprender, Practicar y Tu espacio; en el móvil, cuatro pestañas y un menú «Más» con el resto.
- **Barra de estado:** racha, objetivo del día y tarjetas pendientes, siempre a la vista.
- **Portada:** quien ya ha empezado ve «Tu sesión de hoy» con tres acciones: lección nueva, repaso y práctica oral.
- **Lección:** pasos Aprende, Practica y Resultado en la cabecera, con la posición dentro del módulo.
- **Página «Cómo funciona»:** explica el flujo, los botones de audio y cada sección.

## Fases

| Fase | Estado | Qué hay |
| --- | --- | --- |
| 1. Fundación | Hecha | Proyecto React + TypeScript + Vite, sistema visual, portada, navegación de escritorio y móvil, panel y sistema de progreso. |
| 2. Academia | Hecha | 8 módulos, 21 unidades, 75 lecciones, más la sección «Formal e informal» (13 lecciones). |
| 3. Práctica | Hecha | Ocho tipos de ejercicio con explicación, audio, grabación, diálogos y repaso espaciado. |
| 4. Mundos | Primera versión | 6 mundos, 12 personajes y 12 escenas (2 por mundo). |
| 5. Vida en Japón | Primera versión | 7 áreas y 15 situaciones. |
| 6. Finalización | Hecha, con pruebas pendientes | Publicado en GitHub Pages. Faltan por probar en un dispositivo real el audio, la grabación y el orden de trazos. |

## Qué se ha comprobado

- **Tests automáticos (20, todos en verde):** conversión a rōmaji, repetición espaciada, progreso y logros, e integridad del contenido (ningún kanji sin lectura, identificadores únicos, cada lección genera al menos cuatro ejercicios válidos con explicación, opciones sin repetir).
- **Navegador real (Chromium, 1280 px y 390 px):** las diecisiete rutas cargan sin errores de consola y sin desbordes horizontales, en tema oscuro y claro. Se han completado de principio a fin lecciones de los módulos 1, 2, 4, 5, 7 y 8 de la Academia y dos de «Formal e informal» (una de introducción y una informal), además de una sesión de repaso, el comparador de registros, el menú «Más» del móvil, los pasos de la lección, el cambio de tema, el borrado con confirmación y la persistencia tras recargar. De los mundos y de «Mi futuro en Japón» se ha comprobado que las páginas cargan y que sus lecciones generan ejercicios válidos, no una lección completa en el navegador.
- **Generación de ejercicios:** 40 pasadas sobre las 115 lecciones (unos 59 000 ejercicios) sin opciones repetidas ni respuestas imposibles de teclear.
- **GitHub Actions:** instalación, tests, comprobación de tipos con los tipos oficiales de React y compilación con Vite pasan en el repositorio.
- **Revisión lingüística:** muestreo manual de gramática básica, intermedio, keigo de trabajo y diálogos de los mundos.

## Qué no se ha podido comprobar

- **Audio real.** El navegador de pruebas no tiene voces japonesas, así que se ha verificado el camino «sin voz» (aviso y audio desactivado), no la reproducción. Hay que probarlo en un dispositivo con voz `ja-JP`.
- **Grabación y reconocimiento de voz.** Requieren micrófono y permisos de usuario.
- **Orden de trazos.** Depende de una descarga externa (KanjiVG por jsDelivr) que el entorno de pruebas tenía bloqueada; se ha verificado el mensaje de error, no la animación.
- **Safari y Firefox.** Solo se ha probado en Chromium.

## Limitaciones de contenido

- No hay contenido de nivel N3. El módulo 8 cubre la gramática N4 más frecuente, no toda.
- El módulo de kanji enseña unos 50 caracteres; el N5 completo ronda los 100.
- Cada mundo tiene dos escenas: suficientes para que funcione la idea, pocas para practicar durante meses.
- La escritura se practica trazando sobre un modelo; no se evalúa si el trazo es correcto.
- Los ejercicios de traducción son de elección, no de respuesta libre (salvo los de rōmaji).

## Siguientes pasos

1. Probar audio, grabación y trazos en un navegador con voz japonesa.
2. Completar los kanji de N5 y añadir lectura de frases con kanji a los módulos 5 y 6.
3. Más escenas por mundo (objetivo: seis) con retos encadenados.
4. Ampliar «Mi futuro en Japón»: banco, móvil, correos, buscar trabajo por horas.
5. Módulo 9 con gramática N3 y textos más largos.
6. Entrada de kana con teclado para ejercicios de producción libre.
7. Empaquetar las fuentes y los trazos para que funcione sin conexión (PWA).
