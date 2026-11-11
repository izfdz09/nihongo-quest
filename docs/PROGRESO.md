# Estado del proyecto

Versión 0.1.0. Primera versión funcional y desplegable.

## Fases

| Fase | Estado | Qué hay |
| --- | --- | --- |
| 1. Fundación | Hecha | Proyecto React + TypeScript + Vite, sistema visual, portada, navegación de escritorio y móvil, panel y sistema de progreso. |
| 2. Academia | Hecha | 8 módulos, 21 unidades, 75 lecciones. |
| 3. Práctica | Hecha | Ocho tipos de ejercicio con explicación, audio, grabación, diálogos y repaso espaciado. |
| 4. Mundos | Primera versión | 6 mundos, 12 personajes y 12 escenas (2 por mundo). |
| 5. Vida en Japón | Primera versión | 7 áreas y 15 situaciones. |
| 6. Finalización | Parcial | Probado en navegador y subido a GitHub; para publicar falta activar Pages en el repositorio (Settings → Pages → Source: GitHub Actions). |

## Qué se ha comprobado

- **Tests automáticos (19, todos en verde):** conversión a rōmaji, repetición espaciada, progreso y logros, e integridad del contenido (ningún kanji sin lectura, identificadores únicos, cada lección genera al menos cuatro ejercicios válidos con explicación, opciones sin repetir).
- **Navegador real (Chromium, 1280 px y 390 px):** las trece rutas cargan sin errores de consola y sin desbordes horizontales. Se han completado de principio a fin lecciones de los módulos 1, 2, 5, 7 y 8 de la Academia, una sesión de repaso, el cambio de tema y la persistencia tras recargar. De los mundos y de «Mi futuro en Japón» se ha comprobado que las páginas cargan y que sus lecciones generan ejercicios válidos, no una lección completa en el navegador.
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

1. Activar Pages y probar audio, grabación y trazos en un navegador con voz japonesa.
2. Completar los kanji de N5 y añadir lectura de frases con kanji a los módulos 5 y 6.
3. Más escenas por mundo (objetivo: seis) con retos encadenados.
4. Ampliar «Mi futuro en Japón»: banco, móvil, correos, buscar trabajo por horas.
5. Módulo 9 con gramática N3 y textos más largos.
6. Entrada de kana con teclado para ejercicios de producción libre.
7. Empaquetar las fuentes y los trazos para que funcione sin conexión (PWA).
