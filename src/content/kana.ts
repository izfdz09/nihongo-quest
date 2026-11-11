import { frases, h, kanaBlock, lesson, listen, ojo, p, pairs, q, table, terms, tip, write } from './helpers';
import type { Block, Lesson, Unit } from './types';

/* Tablas de kana. «_» marca los huecos de la tabla tradicional. */
export const HIRA_BASE = [
  'あ い う え お', 'か き く け こ', 'さ し す せ そ', 'た ち つ て と', 'な に ぬ ね の',
  'は ひ ふ へ ほ', 'ま み む め も', 'や _ ゆ _ よ', 'ら り る れ ろ', 'わ _ _ _ を', 'ん _ _ _ _',
];
export const HIRA_DAKU = ['が ぎ ぐ げ ご', 'ざ じ ず ぜ ぞ', 'だ ぢ づ で ど', 'ば び ぶ べ ぼ', 'ぱ ぴ ぷ ぺ ぽ'];
export const HIRA_YOON = [
  'きゃ きゅ きょ', 'しゃ しゅ しょ', 'ちゃ ちゅ ちょ', 'にゃ にゅ にょ', 'ひゃ ひゅ ひょ', 'みゃ みゅ みょ',
  'りゃ りゅ りょ', 'ぎゃ ぎゅ ぎょ', 'じゃ じゅ じょ', 'びゃ びゅ びょ', 'ぴゃ ぴゅ ぴょ',
];

export const toKata = (s: string): string =>
  [...s].map((c) => {
    const n = c.charCodeAt(0);
    return n >= 0x3041 && n <= 0x3096 ? String.fromCharCode(n + 0x60) : c;
  }).join('');

const all = (rows: string[]) => rows.join(' ');
const real = (chars: string) => chars.split(' ').filter((c) => c !== '_');

function kanaLesson(
  id: string, title: string, jp: string, goal: string, chars: string, intro: string, notes: Block[], words: string[],
): Lesson {
  return {
    id, title, jp, goal,
    kana: real(chars),
    blocks: [
      p(intro),
      kanaBlock(chars),
      ...notes,
      h('Escríbelos tú'),
      write(real(chars).join(' ')),
      ...(words.length ? [terms('Palabras que ya puedes leer', ...words)] : []),
    ],
  };
}

/* ------------------------------ MÓDULO 2 · HIRAGANA ------------------------------ */

const hiraBasic: Lesson[] = [
  kanaLesson('hira-a', 'Las vocales', 'あいうえお', 'Leer y pronunciar あ い う え お.', 'あ い う え お',
    'Todo empieza aquí. El japonés tiene las mismas cinco vocales que el español, en otro orden: **a, i, u, e, o**. Toca cada carácter para oírlo.',
    [tip('La う no es exactamente nuestra «u»', 'Se pronuncia sin sacar los labios hacia fuera, con la boca relajada. Escúchala varias veces e imítala.'),
      ojo('Parecidos peligrosos', '{あ} y {お} se confunden al principio: {あ} tiene un trazo horizontal que cruza y {お} lleva un puntito arriba a la derecha.')],
    ['あい|amor', 'いえ|casa', 'うえ|arriba, encima', 'あおい|azul', 'いいえ|no', 'おおい|muchos, numeroso']),
  kanaLesson('hira-ka', 'La fila K', 'かきくけこ', 'Leer か き く け こ y tus primeras palabras con K.', 'か き く け こ',
    'A partir de ahora cada carácter es una consonante + una vocal. La K suena siempre fuerte, como en «casa» o «queso».',
    [tip('Letra de imprenta y letra a mano', 'En muchas fuentes {き} aparece con los trazos de abajo unidos. Al escribir a mano se separan, como en el modelo de caligrafía de esta página.')],
    ['かお|cara', 'あかい|rojo', 'えき|estación', 'いけ|estanque', 'ここ|aquí', 'きく|escuchar; preguntar']),
  kanaLesson('hira-sa', 'La fila S', 'さしすせそ', 'Leer さ し す せ そ, con la primera sorpresa: し es «shi».', 'さ し す せ そ',
    'La fila S trae la primera irregularidad: no existe «si», se dice **shi**.',
    [ojo('し = shi', 'Se pronuncia como el «sh» de «show», nunca como «si». Por eso «sushi» se escribe {すし}.'),
      ojo('Parecidos peligrosos', '{さ} y {き} se parecen: {き} tiene dos rayas horizontales y {さ} solo una.')],
    ['すし|sushi', 'あさ|mañana (parte del día)', 'かさ|paraguas', 'せかい|mundo', 'おいしい|rico, delicioso', 'そこ|ahí']),
  kanaLesson('hira-ta', 'La fila T', 'たちつてと', 'Leer た ち つ て と, con ち «chi» y つ «tsu».', 'た ち つ て と',
    'Dos sonidos especiales en esta fila: no existen «ti» ni «tu»; en su lugar están **chi** y **tsu**.',
    [ojo('ち = chi, つ = tsu', '{ち} suena como «chi» en «chico». {つ} es una «t» y una «s» pronunciadas de golpe, como en «tsunami».'),
      ojo('Parecidos peligrosos', '{ち} es como {さ} mirándose al espejo. Fíjate hacia dónde se abre la curva.')],
    ['て|mano', 'つくえ|escritorio', 'ちかい|cerca', 'あした|mañana (día siguiente)', 'そと|fuera', 'たかい|alto; caro']),
  kanaLesson('hira-na', 'La fila N', 'なにぬねの', 'Leer な に ぬ ね の.', 'な に ぬ ね の',
    'Fila sin sorpresas de pronunciación: na, ni, nu, ne, no.',
    [tip('の, tu nueva mejor amiga', '{の} es uno de los caracteres más frecuentes del idioma: une dos nombres, como nuestro «de». Lo estudiarás a fondo en Gramática.')],
    ['なに|qué', 'いぬ|perro', 'ねこ|gato', 'おかね|dinero', 'さかな|pez; pescado', 'にく|carne']),
  kanaLesson('hira-ha', 'La fila H', 'はひふへほ', 'Leer は ひ ふ へ ほ, con ふ «fu».', 'は ひ ふ へ ほ',
    'La H japonesa es una aspiración suave, parecida a una jota muy floja. No es muda.',
    [ojo('ふ = fu', 'No es la «f» española: se sopla aire entre los dos labios sin morder el labio inferior. Queda a medio camino entre «fu» y «hu».'),
      tip('Dos caracteres con doble vida', 'Cuando {は} y {へ} funcionan como partículas gramaticales se leen «wa» y «e». Lo verás en el módulo de Gramática; dentro de las palabras se leen siempre «ha» y «he».')],
    ['はな|flor; nariz', 'ひと|persona', 'ふね|barco', 'へた|torpe, que se le da mal', 'ほし|estrella', 'はし|palillos; puente']),
  kanaLesson('hira-ma', 'La fila M', 'まみむめも', 'Leer ま み む め も.', 'ま み む め も',
    'Otra fila regular: ma, mi, mu, me, mo.',
    [ojo('Parecidos peligrosos', '{め} y {ぬ} son casi iguales: {ぬ} termina con un rizo y {め} no.')],
    ['みみ|oreja', 'なまえ|nombre', 'むすめ|hija', 'あめ|lluvia', 'うみ|mar', 'のみもの|bebida']),
  kanaLesson('hira-ya', 'La fila Y', 'やゆよ', 'Leer や ゆ よ.', 'や _ ゆ _ よ',
    'Solo tres caracteres: ya, yu, yo. Los sonidos «yi» y «ye» no existen en japonés moderno.',
    [tip('Volverán en pequeño', 'Estos tres caracteres, escritos en tamaño reducido, sirven para formar sonidos combinados como «kya» o «sho». Los verás en la siguiente unidad.')],
    ['やま|montaña', 'ゆき|nieve', 'よむ|leer', 'ふゆ|invierno', 'やすい|barato', 'へや|habitación']),
  kanaLesson('hira-ra', 'La fila R', 'らりるれろ', 'Leer ら り る れ ろ con la R suave.', 'ら り る れ ろ',
    'La R japonesa es **siempre suave**, como la de «pero» o «cara». Nunca es la «rr» fuerte, ni siquiera al principio de palabra.',
    [tip('Ventaja de hispanohablante', 'Este sonido cuesta mucho a los angloparlantes y a ti te sale solo. Además, el japonés no distingue entre L y R: las dos se escriben con esta fila.'),
      ojo('Parecidos peligrosos', '{る} termina en un rizo cerrado y {ろ} queda abierto. {れ} se parece a {ね}, pero acaba hacia fuera.')],
    ['さくら|cerezo', 'くるま|coche', 'これ|esto', 'しろい|blanco', 'よる|noche', 'とり|pájaro', 'はる|primavera']),
  kanaLesson('hira-wa', 'わ, を y ん', 'わをん', 'Leer los tres últimos caracteres y completar las 46 sílabas.', 'わ _ _ _ を ん',
    'Con estos tres terminas el hiragana básico.',
    [ojo('を se pronuncia «o»', 'Hoy suena igual que {お}. Solo se usa como partícula para marcar el objeto directo de la frase, nunca dentro de una palabra.'),
      tip('ん, la única consonante suelta', 'Es una «n» que cuenta como sílaba completa y nunca empieza palabra. Delante de b, p o m suena como «m»: {さんぽ} (paseo) se oye «sampo».')],
    ['わたし|yo', 'ほん|libro', 'にほん|Japón', 'せんせい|profesor, profesora', 'かわ|río', 'みかん|mandarina']),
];

const hiraExtra: Lesson[] = [
  kanaLesson('hira-daku', 'Sonidos modificados', 'がざだばぱ', 'Leer los sonidos con ゛ y ゜: g, z, d, b y p.', all(HIRA_DAKU),
    'Dos marquitas cambian el sonido de caracteres que ya conoces. Las comillas ゛ (dakuten) vuelven sonora la consonante: k→g, s→z, t→d, h→b. El circulito ゜ (handakuten) solo se usa con la fila H y la convierte en p.',
    [ojo('Cuatro lecturas que no son lo que parecen', '{じ} y {ぢ} se leen «ji» (como la «j» inglesa de «jeans»); {ず} y {づ} se leen «zu». En la práctica verás casi siempre {じ} y {ず}.'),
      tip('La G siempre es suave', '{ぎ} y {げ} suenan «gui» y «gue», como en «guitarra», nunca como la jota de «gente». La Z es sonora, con vibración, como el zumbido de una abeja.')],
    ['がくせい|estudiante', 'かぎ|llave', 'みず|agua', 'かぜ|viento; resfriado', 'でんわ|teléfono', 'ともだち|amigo, amiga', 'かばん|bolso, mochila', 'えんぴつ|lápiz', 'さんぽ|paseo']),
  kanaLesson('hira-yoon', 'Sonidos combinados', 'きゃきゅきょ', 'Leer combinaciones como きゃ, しゅ o ちょ.', all(HIRA_YOON),
    'Un carácter de la columna «i» seguido de {や}, {ゆ} o {よ} **en pequeño** se funde en una sola sílaba: {き} + {ゃ} = {きゃ} (kya).',
    [ojo('El tamaño importa', '{きや} (grande) son dos sílabas: ki-ya. {きゃ} (pequeño) es una: kya. Cambia la palabra entera, como verás en los pares de abajo.'),
      pairs('Escucha la diferencia', 'びょういん|びよういん|hospital / peluquería: una sílaba de diferencia y acabas en el sitio equivocado', 'きょう|きよう|hoy / hábil, mañoso')],
    ['きょう|hoy', 'おちゃ|té', 'しゃしん|foto', 'としょかん|biblioteca', 'りょこう|viaje', 'びょういん|hospital', 'じゅう|diez', 'かいしゃ|empresa', 'べんきょう|estudio']),
  lesson('hira-largas', 'Vocales largas y っ', 'のばすおと', 'Distinguir vocales largas y consonantes dobles, que cambian el significado.', [
    p('En japonés la **duración** de un sonido distingue palabras. Alargar una vocal o hacer una pequeña pausa antes de una consonante no es un matiz: es otra palabra.'),
    h('Vocales largas'),
    table(['Sonido largo', 'Cómo se escribe', 'Ejemplo'],
      ['ā', 'あ + あ', '{おかあさん} okaasan · madre'],
      ['ī', 'い + い', '{おにいさん} oniisan · hermano mayor'],
      ['ū', 'う + う', '{くうき} kuuki · aire'],
      ['ē', 'え + い (a veces え + え)', '{せんせい} sensei · profesor'],
      ['ō', 'お + う (a veces お + お)', '{がっこう} gakkou · escuela']),
    ojo('«ou» y «ei» no se leen letra a letra', 'En esta web el rōmaji refleja la escritura: «gakkou», «sensei». Pero se pronuncian «gakkō» y «sensē», con la vocal mantenida el doble de tiempo. Fíate del audio.'),
    h('La っ pequeña'),
    p('Una {っ} pequeña indica que la consonante siguiente se dobla: se hace un brevísimo silencio antes de pronunciarla. {きって} es «kit-te».'),
    pairs('Escucha la diferencia', 'おばさん|おばあさん|tía, señora / abuela, anciana', 'きて|きって|ven (del verbo venir) / sello de correos', 'ゆき|ゆうき|nieve / valor, valentía', 'ここ|こうこう|aquí / instituto'),
    terms('Palabras para practicar', 'おかあさん|madre', 'おとうさん|padre', 'がっこう|escuela', 'きって|sello de correos', 'ざっし|revista', 'とけい|reloj', 'おおきい|grande', 'ちいさい|pequeño'),
  ], [
    listen('おばあさん', '¿Qué palabra has oído?', ['おばあさん', 'おばさん'], 'La «a» dura el doble: {おばあさん} es «abuela». {おばさん}, con «a» corta, es «tía» o «señora».', 'Confundirlas puede sentar regular: escucha siempre cuánto dura la vocal.'),
    listen('きって', '¿Qué palabra has oído?', ['きって', 'きて'], 'Se oye una pequeña pausa antes de la «t»: {きって}, «sello».'),
    listen('ゆき', '¿Qué palabra has oído?', ['ゆき', 'ゆうき'], 'La «u» es corta: {ゆき}, «nieve». Con la «u» larga sería {ゆうき}, «valor».'),
    q('¿Cómo se lee がっこう?', ['gak-kō, con pausa y «o» larga', 'ga-tsu-ko-u, letra a letra', 'gakō, sin pausa'], 'La {っ} pequeña dobla la «k» y «ou» es una «o» larga.', { pitfall: 'Leer la {っ} pequeña como «tsu» es el error más habitual al empezar.' }),
  ]),
];

const hiraReading: Lesson[] = [
  {
    id: 'hira-tabla', title: 'Tabla completa de hiragana', jp: 'ごじゅうおん', goal: 'Tener a mano todo el hiragana y comprobar que lo reconoces mezclado.',
    kana: [...real(all(HIRA_BASE)), ...real(all(HIRA_DAKU))],
    blocks: [
      p('Esta es la tabla tradicional, el {ごじゅうおん} («los cincuenta sonidos»). Se lee por filas: vocales, K, S, T, N, H, M, Y, R, W. Los diccionarios japoneses siguen este orden. Vuelve aquí siempre que lo necesites.'),
      h('Las 46 sílabas básicas'), kanaBlock(all(HIRA_BASE)),
      h('Sonidos modificados'), kanaBlock(all(HIRA_DAKU)),
      h('Sonidos combinados'), kanaBlock(all(HIRA_YOON)),
    ],
  },
  lesson('hira-prueba', 'Prueba de lectura', 'よんでみよう', 'Leer palabras y frases cortas escritas solo en hiragana.', [
    p('Ya puedes leer japonés de verdad. Intenta leer cada frase en voz alta **antes** de mirar el rōmaji o pulsar el audio.'),
    frases('Frases completas', 'これ は ほん です。|Esto es un libro.', 'ねこ が います。|Hay un gato.', 'わたし は がくせい です。|Soy estudiante.', 'おちゃ を のみます。|Bebo té.', 'きょう は あつい です。|Hoy hace calor.'),
    tip('No te preocupes por la gramática', 'Aquí solo practicas la lectura. Qué significan {は}, {が} y {を} lo aprenderás en el módulo de Gramática.'),
    terms('Vocabulario de la prueba', 'あつい|caluroso; caliente', 'さむい|frío (tiempo)', 'たべもの|comida', 'ともだち|amigo, amiga', 'でんしゃ|tren', 'しゅくだい|deberes'),
  ], [
    q('¿Cómo se lee でんしゃ?', ['densha', 'denshiya', 'tensha'], '{で} lleva dakuten (de) y {しゃ} es un sonido combinado: den-sha, «tren».', { pitfall: 'Si la {ゃ} fuera grande se leería «shiya».' }),
    q('¿Cómo se lee しゅくだい?', ['shukudai', 'shiyukutai', 'sukudai'], '{しゅ} es «shu» y {だ} es «da»: shukudai, «deberes».'),
    listen('さむい', '¿Qué palabra has oído?', ['さむい', 'あつい', 'やすい'], 'Has oído «samui», {さむい}: «frío».'),
  ]),
];

export const hiraganaUnits: Unit[] = [
  { id: 'm2-u1', title: 'Las 46 sílabas básicas', lessons: hiraBasic },
  { id: 'm2-u2', title: 'Sonidos modificados y combinados', lessons: hiraExtra },
  { id: 'm2-u3', title: 'Lectura', lessons: hiraReading },
];

/* ------------------------------ MÓDULO 3 · KATAKANA ------------------------------ */

const k = (rows: string[], from: number, to: number) => toKata(rows.slice(from, to).join(' '));

const kataBasic: Lesson[] = [
  kanaLesson('kata-a', 'ア y la fila K', 'アカ', 'Leer las vocales y la fila K en katakana, y conocer la raya ー.', k(HIRA_BASE, 0, 2),
    'El katakana representa **exactamente los mismos sonidos** que el hiragana, con trazos rectos y angulosos. Se usa sobre todo para palabras de origen extranjero.',
    [tip('La raya que alarga', 'En katakana las vocales largas se marcan con una raya: {ー}. {ケーキ} se lee «kēki». En el rōmaji de esta web lo verás con una rayita sobre la vocal.'),
      ojo('Parecidos peligrosos', '{ア} y {マ} (la verás pronto) se parecen. {ウ} lleva un trazo vertical arriba; {ク} y {ケ} se distinguen por el trazo final.')],
    ['ケーキ|pastel|del inglés «cake»', 'ココア|cacao (bebida)', 'キウイ|kiwi', 'カカオ|cacao', 'エア|aire|del inglés «air»']),
  kanaLesson('kata-sa', 'Las filas S y T', 'サタ', 'Leer サ シ ス セ ソ y タ チ ツ テ ト.', k(HIRA_BASE, 2, 4),
    'Mismas irregularidades que en hiragana: {シ} es «shi», {チ} es «chi» y {ツ} es «tsu».',
    [ojo('シ y ツ, el clásico', '{シ} (shi): los trazos cortos van casi horizontales y el largo sube de abajo arriba. {ツ} (tsu): los cortos son casi verticales y el largo baja de arriba abajo. Truco: en {シ} los trazos se alinean a la izquierda; en {ツ}, arriba.')],
    ['タクシー|taxi', 'テスト|examen, prueba', 'スキー|esquí', 'ソース|salsa', 'セーター|jersey', 'コート|abrigo', 'スーツ|traje']),
  kanaLesson('kata-na', 'Las filas N y H', 'ナハ', 'Leer ナ ニ ヌ ネ ノ y ハ ヒ フ ヘ ホ.', k(HIRA_BASE, 4, 6),
    'Dos filas sencillas. {ヘ} es prácticamente idéntico a su versión en hiragana.',
    [ojo('Parecidos peligrosos', '{ヌ} y {ス} se diferencian en un pequeño trazo que cruza. {ナ} y {メ} (la verás en la siguiente lección) también se confunden.')],
    ['ネクタイ|corbata', 'ノート|cuaderno', 'ナイフ|cuchillo', 'ハート|corazón (símbolo)', 'ヒーター|estufa, calefactor', 'ホット|caliente (bebidas)', 'ツナ|atún en conserva']),
  kanaLesson('kata-ma', 'Las filas M y Y', 'マヤ', 'Leer マ ミ ム メ モ y ヤ ユ ヨ.', toKata('ま み む め も や _ ゆ _ よ'),
    'Ya casi lo tienes. {モ} y {ヤ} recuerdan mucho a sus equivalentes en hiragana.',
    [ojo('Parecidos peligrosos', '{コ}, {ユ} y {ヨ} son de la misma familia: {コ} tiene dos trazos horizontales, {ユ} alarga el de abajo y {ヨ} tiene tres.')],
    ['メモ|nota, apunte', 'トマト|tomate', 'ハム|jamón', 'ヨット|velero', 'タイヤ|neumático', 'ユニーク|original, único', 'ミニ|mini']),
  kanaLesson('kata-ra', 'Fila R, ワ, ヲ y ン', 'ラワン', 'Leer los últimos caracteres y completar el katakana básico.', toKata('ら り る れ ろ わ _ _ _ を ん'),
    'Últimos caracteres. {ヲ} apenas se usa: lo verás muy rara vez.',
    [ojo('ソ y ン, el otro clásico', '{ソ} (so): el trazo corto es casi vertical y el largo baja. {ン} (n): el trazo corto es casi horizontal y el largo sube. Es la misma lógica que {ツ} y {シ}.')],
    ['レストラン|restaurante', 'ワイン|vino', 'ラーメン|ramen', 'ホテル|hotel', 'カメラ|cámara', 'トイレ|baño, aseo', 'ミルク|leche', 'アイスクリーム|helado']),
];

const kataExtra: Lesson[] = [
  kanaLesson('kata-daku', 'Sonidos modificados y combinados', 'ガザダバパ', 'Leer katakana con ゛ y ゜ y los sonidos combinados.', toKata(all(HIRA_DAKU)),
    'Funciona igual que en hiragana: las comillas ゛ sonorizan la consonante y el circulito ゜ convierte la H en P. Los sonidos combinados se forman con {ャ}, {ュ} y {ョ} en pequeño.',
    [kanaBlock(toKata(all(HIRA_YOON.slice(0, 3))) + ' ' + toKata(HIRA_YOON[8]))],
    ['テレビ|televisión', 'バス|autobús', 'パン|pan|del portugués «pão»', 'ゲーム|videojuego, juego', 'ピザ|pizza', 'ドア|puerta', 'ジュース|zumo', 'シャツ|camisa', 'チョコレート|chocolate', 'ニュース|noticias', 'コンビニ|tienda 24 horas', 'デパート|grandes almacenes']),
  lesson('kata-extranjeras', 'Palabras extranjeras', 'がいらいご', 'Entender cómo el japonés adapta palabras de otros idiomas y reconocerlas.', [
    p('Miles de palabras cotidianas vienen del inglés y de otros idiomas. Se llaman {がいらいご} (gairaigo). Como el japonés solo tiene sílabas abiertas, las palabras se **adaptan**; conocer las reglas te permite adivinar muchísimas.'),
    table(['Regla', 'Ejemplo'],
      ['Entre consonantes seguidas se añade una vocal (casi siempre «u»)', '«stress» → {ストレス} sutoresu'],
      ['Tras t y d finales se añade «o»', '«bed» → {ベッド} beddo'],
      ['L y R se escriben igual, con la fila R', '«lemon» → {レモン} remon'],
      ['La V suele pasar a B', '«video» → {ビデオ} bideo'],
      ['Las palabras largas se acortan', '«personal computer» → {パソコン} pasokon']),
    h('Sonidos que solo existen en katakana'),
    p('Para acercarse al original se combinan caracteres con vocales pequeñas. No existen en palabras japonesas.'),
    kanaBlock('ファ フィ フェ フォ ティ ディ ウィ ウェ シェ チェ ジェ'),
    terms('Palabras que usarás a diario', 'パソコン|ordenador', 'スマホ|móvil, smartphone', 'エアコン|aire acondicionado', 'アルバイト|trabajo por horas|del alemán «Arbeit»', 'コーヒー|café', 'パーティー|fiesta', 'ファイル|archivo; carpeta', 'カフェ|cafetería', 'チェック|comprobación', 'フォーク|tenedor'),
    ojo('Falsos amigos', 'No todas significan lo que parece: {マンション} (manshon) es un piso en un bloque de buena construcción, no una mansión; {アルバイト} es un trabajo por horas; {コンセント} (konsento) es un enchufe.'),
  ], [
    q('¿Qué significa パソコン?', ['Ordenador', 'Pasaporte', 'Paquete'], 'Es la abreviatura de «personal computer»: pāsonaru konpyūtā → pasokon.', { jp: 'パソコン' }),
    q('¿Cómo se escribe «hotel»?', ['ホテル', 'ホテロ', 'オテル'], 'La «h» se pronuncia y a la «l» final se le añade «u»: ho-te-ru.', { bare: true, pitfall: 'No pienses en la pronunciación española: casi todos los préstamos vienen del inglés.' }),
    q('Ves マンション en un anuncio de alquiler. ¿Qué es?', ['Un piso en un bloque', 'Una mansión de lujo', 'Una habitación de hotel'], 'Es un falso amigo: en Japón {マンション} designa un apartamento en un edificio de hormigón.', { jp: 'マンション' }),
    listen('コーヒー', '¿Qué has oído?', ['コーヒー', 'コピー', 'ココア'], '{コーヒー} (kōhī), «café», tiene dos vocales largas. {コピー} (kopī) es «fotocopia».'),
  ]),
  lesson('kata-nombres', 'Nombres propios y países', 'なまえ', 'Leer nombres de países y escribir tu propio nombre en katakana.', [
    p('Los nombres extranjeros, de personas y de lugares, se escriben en katakana. El tuyo también: es lo primero que tendrás que escribir en cualquier formulario en Japón.'),
    terms('Países', 'スペイン|España', 'メキシコ|México', 'アルゼンチン|Argentina', 'コロンビア|Colombia', 'ペルー|Perú', 'チリ|Chile', 'アメリカ|Estados Unidos', 'フランス|Francia', 'ドイツ|Alemania', 'イギリス|Reino Unido'),
    terms('Nombres', 'マリア|María', 'カルロス|Carlos', 'ルシア|Lucía', 'ホセ|José', 'ハビエル|Javier', 'パブロ|Pablo', 'ソフィア|Sofía', 'ダニエル|Daniel'),
    h('Cómo adaptar tu nombre'),
    table(['En español', 'En katakana', 'Ejemplo'],
      ['j, g suave (José, Gema)', 'fila H', '{ホセ}, {ヘマ}'],
      ['l', 'fila R', 'Laura → {ラウラ}'],
      ['v', 'fila B', 'Víctor → {ビクトル}'],
      ['ñ', 'ニャ ニュ ニョ', 'Íñigo → {イニゴ}; Toño → {トニョ}'],
      ['ll, y', 'fila Y o ジ', 'Guillermo → {ギジェルモ}'],
      ['z, c suave', 'fila S', 'Lucía → {ルシア}'],
      ['consonante final o seguida de otra', 'se añade «u» (o «o» tras t, d)', 'Carlos → {カルロス}; David → {ダビド}']),
    tip('El nombre se adapta al oído', 'No hay una única versión correcta: se escribe como suena. Tú decides cómo quieres que te llamen, y conviene usar siempre la misma versión en documentos oficiales.'),
    cierreNombre(),
  ], [
    q('¿Qué país es ドイツ?', ['Alemania', 'Dinamarca', 'Italia'], 'Viene del neerlandés «Duits»: doitsu. Varios países conservan nombres que no proceden del inglés.', { jp: 'ドイツ' }),
    q('¿Cómo se escribe «Javier»?', ['ハビエル', 'ジャビエル', 'ヤビエル'], 'La jota española se adapta con la fila H: ha-bi-e-ru.', { bare: true, pitfall: '{ジャ} sería la «j» inglesa de «John».' }),
    q('¿Por qué «Carlos» se escribe カルロス, con dos «u»?', ['Porque no hay consonantes sueltas: se les añade una vocal', 'Porque en japonés se pronuncia «Carulosu»', 'Es una errata frecuente'], 'El japonés no tiene sílabas terminadas en r o s, así que se apoya en una «u» que apenas se pronuncia.'),
  ]),
];

function cierreNombre(): Block {
  return frases('Preséntate', 'わたし は マリア です。|Soy María.', 'スペイン から きました。|Vengo de España.');
}

const kataReading: Lesson[] = [
  {
    id: 'kata-tabla', title: 'Tabla completa de katakana', jp: 'カタカナ', goal: 'Tener a mano todo el katakana y reconocerlo mezclado.',
    kana: [...real(toKata(all(HIRA_BASE))), ...real(toKata(all(HIRA_DAKU)))],
    blocks: [
      p('La misma tabla de cincuenta sonidos, ahora en katakana. Compárala con la de hiragana: los sonidos coinciden casilla por casilla.'),
      h('Los 46 caracteres básicos'), kanaBlock(toKata(all(HIRA_BASE))),
      h('Sonidos modificados'), kanaBlock(toKata(all(HIRA_DAKU))),
      h('Sonidos combinados'), kanaBlock(toKata(all(HIRA_YOON))),
    ],
  },
  lesson('kata-prueba', 'Prueba de lectura', 'よんでみよう', 'Leer una carta de cafetería y frases que mezclan hiragana y katakana.', [
    p('En la vida real el katakana aparece mezclado con el hiragana. Las cartas de restaurantes y cafeterías son el mejor entrenamiento: están llenas de préstamos.'),
    terms('Carta de una cafetería', 'コーヒー|café', 'カフェラテ|café con leche', 'オレンジジュース|zumo de naranja', 'サンドイッチ|sándwich', 'サラダ|ensalada', 'チーズケーキ|tarta de queso', 'アイスティー|té helado', 'ハンバーガー|hamburguesa'),
    frases('Frases mezcladas', 'コーヒー を ください。|Un café, por favor.', 'トイレ は どこ です か。|¿Dónde está el baño?', 'わたし は スペイン から きました。|Vengo de España.', 'パン と サラダ を たべます。|Como pan y ensalada.'),
  ], [
    q('¿Qué pides con サンドイッチ?', ['Un sándwich', 'Una ensalada', 'Un helado'], 'San-do-it-chi: la {ッ} pequeña dobla la consonante siguiente.', { jp: 'サンドイッチ' }),
    q('¿Cómo se lee チーズケーキ?', ['chīzukēki', 'shīzukēki', 'chizukeki'], '{チ} es «chi» y las dos rayas alargan las vocales: chī-zu-kē-ki.', { pitfall: 'Olvidar las vocales largas es el fallo más común al leer katakana.' }),
    listen('アイスティー', '¿Qué has oído?', ['アイスティー', 'アイスクリーム', 'オレンジジュース'], 'Aisutī: «té helado». {ティ} es uno de los sonidos que solo existen en katakana.'),
  ]),
];

export const katakanaUnits: Unit[] = [
  { id: 'm3-u1', title: 'Los 46 caracteres básicos', lessons: kataBasic },
  { id: 'm3-u2', title: 'Sonidos, préstamos y nombres', lessons: kataExtra },
  { id: 'm3-u3', title: 'Lectura', lessons: kataReading },
];
