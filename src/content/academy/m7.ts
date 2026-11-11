import { cultura, frases, h, lesson, ojo, p, q, table, terms, tip, write } from '../helpers';
import type { Unit } from '../types';

const KANJI_HEAD = ['Kanji', 'Significado', 'Lectura japonesa (kun)', 'Lectura china (on)', 'Trazos'];

export const kanjiUnits: Unit[] = [
  {
    id: 'm7-u1', title: 'Cómo funcionan los kanji',
    lessons: [
      lesson('kan-intro', 'Qué son los kanji y los radicales', 'かんじ', 'Entender que los kanji se construyen con piezas que se repiten.', [
        p('Un kanji representa **una idea**, no solo un sonido. {山} es «montaña» lo leas como lo leas. Hay unos 2.000 de uso común, pero no son 2.000 dibujos distintos: se forman combinando unas 200 piezas llamadas **radicales**.'),
        h('De dibujo a carácter'),
        table(['Kanji', 'Significado', 'Origen'], ['{山}', 'montaña', 'tres picos'], ['{川}', 'río', 'corrientes de agua'], ['{木}', 'árbol', 'tronco, ramas y raíces'], ['{日}', 'sol; día', 'un sol con un punto en el centro'], ['{月}', 'luna; mes', 'luna creciente'], ['{口}', 'boca', 'una boca abierta']),
        h('Las piezas se combinan'),
        table(['Combinación', 'Resultado', 'Significado'], ['{木} + {木}', '{林}', 'bosquecillo'], ['{木} + {木} + {木}', '{森}', 'bosque'], ['{日} + {月}', '{明}', 'claro, luminoso'], ['{人} + {木}', '{休}', 'descansar (una persona junto a un árbol)'], ['{女} + {子}', '{好}', 'gustar (mujer y niño)']),
        h('Radicales que dan pistas'),
        table(['Radical', 'Idea', 'Aparece en'], ['氵', 'agua', '{海} mar · {泳} nadar · {酒} sake'], ['亻', 'persona', '{休} descansar · {体} cuerpo · {住} vivir'], ['言', 'palabra', '{語} idioma · {話} hablar · {読} leer'], ['口', 'boca', '{味} sabor · {呼} llamar'], ['扌', 'mano', '{持} sostener · {押} empujar']),
        tip('Cómo estudiar kanji', 'No intentes memorizar trazos sueltos. Reconoce las piezas, apréndelos dentro de palabras reales y repásalos con la repetición espaciada: es justo lo que hace esta plataforma.'),
        terms('Primeras palabras', '山[やま]|montaña', '川[かわ]|río', '木[き]|árbol', '口[くち]|boca', '森[もり]|bosque', '休[やす]み|descanso'),
      ], [
        q('¿Qué idea aporta el radical 氵?', ['Agua', 'Fuego', 'Persona'], 'Son tres gotas. Aparece en {海} (mar), {泳} (nadar) o {酒} (sake).'),
        q('木 + 木 + 木 forman 森. ¿Qué significa?', ['Bosque', 'Madera', 'Montaña'], 'Tres árboles juntos: un bosque.', { jp: '森' }),
        q('¿Cuántas piezas básicas (radicales) forman casi todos los kanji?', ['Unas 200', 'Unas 2.000', 'Solo 46'], 'Los kanji son combinaciones de un repertorio limitado de piezas.'),
      ]),
      lesson('kan-trazos', 'Trazos y orden de escritura', 'かきじゅん', 'Aplicar las reglas del orden de los trazos y escribir tus primeros kanji.', [
        p('Cada kanji se escribe con un número fijo de trazos en un orden fijo. No es una manía: el orden correcto hace que el carácter salga equilibrado, permite leer la letra manuscrita y es necesario para buscar kanji en un diccionario.'),
        table(['Regla', 'Ejemplo'],
          ['De arriba abajo', '{三}: tres trazos, empezando por el de arriba'],
          ['De izquierda a derecha', '{川}: primero el trazo izquierdo'],
          ['Horizontal antes que vertical cuando se cruzan', '{十}: primero la raya horizontal'],
          ['El centro antes que los lados', '{小}: primero el trazo central'],
          ['El marco antes que el contenido, y se cierra al final', '{日} y {国}: la base se traza en último lugar'],
          ['El trazo que atraviesa todo va al final', '{中}: la vertical central es el último trazo']),
        h('Tres maneras de terminar un trazo'),
        p('Un trazo puede acabar **parando** en seco (とめ), con un **gancho** (はね) o **afinándose** al levantar el pincel (はらい). En el modelo de caligrafía se aprecia bien.'),
        h('Practica'),
        p('Pulsa «Ver orden de trazos» para ver la animación y después escribe encima del modelo con el dedo o el ratón.'),
        write('一 二 三 十 口 日 木 人 大 中'),
        terms('Los kanji que acabas de escribir', '一[いち]|uno', '十[じゅう]|diez', '口[くち]|boca', '日[ひ]|sol; día', '木[き]|árbol', '人[ひと]|persona', '大[おお]きい|grande', '中[なか]|dentro; en medio'),
        ojo('口 tiene tres trazos, no cuatro', 'El lado superior y el derecho se trazan de una sola vez, doblando la esquina. Es un patrón que se repite en cientos de kanji.'),
      ], [
        q('En 十, ¿qué trazo se escribe primero?', ['El horizontal', 'El vertical', 'Da igual'], 'Cuando dos trazos se cruzan, el horizontal va antes.', { jp: '十' }),
        q('¿Cuántos trazos tiene 口?', ['Tres', 'Cuatro', 'Dos'], 'Izquierda; arriba y derecha de un solo trazo; base.', { jp: '口' }),
        q('En 小, ¿qué trazo va primero?', ['El central', 'El de la izquierda', 'El de la derecha'], 'Cuando un carácter es simétrico, se traza primero el centro y después los lados.', { jp: '小' }),
        q('En 中, ¿cuál es el último trazo?', ['La línea vertical que lo atraviesa', 'La base del rectángulo', 'El lado izquierdo'], 'Los trazos que atraviesan el carácter entero se dejan para el final.', { jp: '中' }),
      ]),
      lesson('kan-lecturas', 'Lecturas on y kun', 'よみかた', 'Saber por qué un kanji tiene varias lecturas y cuál elegir.', [
        p('Los kanji llegaron de China hace unos 1.500 años. Con cada carácter vino su pronunciación china, que se sumó a la palabra japonesa que ya existía. Por eso casi todos tienen dos tipos de lectura.'),
        table(['', 'Lectura kun', 'Lectura on'], ['Origen', 'Japonesa', 'China, adaptada'], ['Cuándo', 'El kanji va solo o con hiragana pegado', 'El kanji forma palabra con otros kanji'], ['Ejemplo con 山', '{山[やま]} montaña', '{富士山[ふじさん]} monte Fuji'], ['Ejemplo con 人', '{人[ひと]} persona', '{日本人[にほんじん]} japonés'], ['Ejemplo con 水', '{水[みず]} agua', '{水曜日[すいようび]} miércoles']),
        tip('Regla práctica', 'Kanji solo o seguido de hiragana: lectura kun. Dos o más kanji juntos: lectura on. Tiene excepciones, pero acierta la mayoría de las veces.'),
        h('Okurigana: el hiragana que acompaña'),
        p('En verbos y adjetivos el kanji aporta el significado y el hiragana que le sigue, la conjugación: {食[た]べます}, {食[た]べません}, {食[た]べました}. El kanji no cambia.'),
        ojo('No memorices listas de lecturas', 'Aprender «人: hito, jin, nin» de memoria sirve de poco. Aprende palabras: {人[ひと]}, {日本人[にほんじん]}, {三人[さんにん]}. Las lecturas se fijan solas.'),
        terms('Las mismas piezas, distintas lecturas', '人[ひと]|persona', '日本人[にほんじん]|japonés (persona)', '三人[さんにん]|tres personas', '水[みず]|agua', '水曜日[すいようび]|miércoles', '富士山[ふじさん]|monte Fuji'),
      ], [
        q('¿Cómo se lee 山 cuando va solo?', ['やま', 'さん', 'ざん'], 'Solo, se usa la lectura japonesa (kun).', { jp: '山', bare: true }),
        q('En 日本人, ¿cómo se lee 人?', ['じん', 'ひと', 'にん'], 'Forma palabra con otros kanji: lectura on. Con nacionalidades es {じん}.', { jp: '日本人', bare: true, pitfall: 'Para contar personas se usa {にん}: {三人[さんにん]}.' }),
        q('¿Qué es el okurigana?', ['El hiragana que sigue a un kanji y lleva la conjugación', 'La lectura escrita encima del kanji', 'Un tipo de radical'], 'Lo que va encima es el furigana; lo que va detrás, el okurigana.'),
      ]),
    ],
  },
  {
    id: 'm7-u2', title: 'Kanji fundamentales',
    lessons: [
      lesson('kan-numeros', 'Números y dinero', 'すうじ', 'Leer números, precios y cantidades de personas en kanji.', [
        table(KANJI_HEAD, ['{一}', 'uno', 'ひと(つ)', 'イチ', '1'], ['{二}', 'dos', 'ふた(つ)', 'ニ', '2'], ['{三}', 'tres', 'みっ(つ)', 'サン', '3'], ['{四}', 'cuatro', 'よん, よっ(つ)', 'シ', '5'], ['{五}', 'cinco', 'いつ(つ)', 'ゴ', '4'], ['{六}', 'seis', 'むっ(つ)', 'ロク', '4'], ['{七}', 'siete', 'なな', 'シチ', '2'], ['{八}', 'ocho', 'やっ(つ)', 'ハチ', '2'], ['{九}', 'nueve', 'ここの(つ)', 'キュウ, ク', '2'], ['{十}', 'diez', 'とお', 'ジュウ', '2'], ['{百}', 'cien', '—', 'ヒャク', '6'], ['{千}', 'mil', '—', 'セン', '3'], ['{万}', 'diez mil', '—', 'マン', '3'], ['{円}', 'yen; círculo', '—', 'エン', '4']),
        write('一 二 三 四 五 六 七 八 九 十 百 千 万 円'),
        terms('Léelos en contexto', '三百円[さんびゃくえん]|300 yenes', '千円[せんえん]|1.000 yenes', '一万円[いちまんえん]|10.000 yenes', '一人[ひとり]|una persona', '二人[ふたり]|dos personas', '四人[よにん]|cuatro personas'),
        ojo('Personas: dos irregulares', '«Una persona» es {一人[ひとり]} y «dos personas», {二人[ふたり]}. A partir de tres es regular: número + {人[にん]}. Ojo con cuatro: {四人[よにん]}.'),
        cultura('En las etiquetas verás cifras', 'Los precios suelen escribirse con números arábigos y el kanji {円} o el símbolo ¥: «1,500円». Los kanji de los números aparecen en menús tradicionales, billetes y documentos.'),
      ], [
        q('¿Cuánto es 五千円?', ['5.000 yenes', '500 yenes', '50.000 yenes'], '{五} es 5 y {千}, mil.', { jp: '五千円' }),
        q('¿Cómo se lee 二人?', ['ふたり', 'ににん', 'ふたつ'], 'Es una de las dos lecturas irregulares para contar personas.', { jp: '二人', bare: true }),
        q('¿Qué kanji significa «diez mil»?', ['万', '千', '百'], '{万} (man) es la unidad de diez mil.', { bare: true }),
      ]),
      lesson('kan-tiempo', 'Días, meses y horas', 'じかん', 'Leer fechas, días de la semana y horas en kanji.', [
        table(KANJI_HEAD, ['{日}', 'sol; día', 'ひ, か', 'ニチ', '4'], ['{月}', 'luna; mes', 'つき', 'ゲツ, ガツ', '4'], ['{火}', 'fuego', 'ひ', 'カ', '4'], ['{水}', 'agua', 'みず', 'スイ', '4'], ['{木}', 'árbol', 'き', 'モク', '4'], ['{金}', 'oro; dinero', 'かね', 'キン', '8'], ['{土}', 'tierra', 'つち', 'ド', '3'], ['{年}', 'año', 'とし', 'ネン', '6'], ['{時}', 'hora; tiempo', 'とき', 'ジ', '10'], ['{分}', 'minuto; parte', 'わ(かる)', 'フン, ブン', '4'], ['{今}', 'ahora', 'いま', 'コン', '4']),
        write('日 月 火 水 木 金 土 年 時 分 今'),
        terms('La semana', '月曜日[げつようび]|lunes', '火曜日[かようび]|martes', '水曜日[すいようび]|miércoles', '木曜日[もくようび]|jueves', '金曜日[きんようび]|viernes', '土曜日[どようび]|sábado', '日曜日[にちようび]|domingo'),
        terms('Fechas y horas', '今日[きょう]|hoy', '今[いま]|ahora', '三月[さんがつ]|marzo', '五日[いつか]|día 5', '九時[くじ]|las nueve', '十分[じゅっぷん]|diez minutos', '今年[ことし]|este año'),
        ojo('日 tiene muchas lecturas', 'En {日曜日[にちようび]} aparece dos veces y se lee distinto: «nichi» y «bi». En {今日[きょう]} la lectura es de la palabra entera, no de cada kanji. Por eso conviene aprender palabras completas.'),
      ], [
        q('¿Qué día es 金曜日?', ['Viernes', 'Lunes', 'Miércoles'], '{金} es «oro, metal»: viernes.', { jp: '金曜日' }),
        q('¿Cómo se lee 今日?', ['きょう', 'いまにち', 'こんひ'], 'Es una lectura especial de la palabra entera: «hoy».', { jp: '今日', bare: true }),
        q('En el horario pone 九時. ¿A qué hora es?', ['A las nueve', 'A las cuatro', 'A las siete'], '{九} es 9 y {時} marca la hora: {くじ}.', { jp: '九時' }),
      ]),
      lesson('kan-personas', 'Personas, naturaleza y estudio', 'ひと', 'Leer los kanji de las personas, la naturaleza y la escuela.', [
        table(KANJI_HEAD, ['{人}', 'persona', 'ひと', 'ジン, ニン', '2'], ['{男}', 'hombre', 'おとこ', 'ダン', '7'], ['{女}', 'mujer', 'おんな', 'ジョ', '3'], ['{子}', 'niño, hijo', 'こ', 'シ', '3'], ['{山}', 'montaña', 'やま', 'サン', '3'], ['{川}', 'río', 'かわ', 'セン', '3'], ['{田}', 'arrozal', 'た', 'デン', '5'], ['{本}', 'libro; origen', 'もと', 'ホン', '5'], ['{学}', 'aprender', 'まな(ぶ)', 'ガク', '8'], ['{生}', 'vida; nacer', 'い(きる), う(まれる)', 'セイ', '5'], ['{先}', 'antes; delante', 'さき', 'セン', '6']),
        write('人 男 女 子 山 川 田 本 学 生 先'),
        terms('Palabras', '男[おとこ]の人[ひと]|hombre', '女[おんな]の人[ひと]|mujer', '子[こ]ども|niño, niña', '日本[にほん]|Japón', '学生[がくせい]|estudiante', '先生[せんせい]|profesor, profesora', '学校[がっこう]|escuela', '本[ほん]|libro'),
        cultura('Apellidos que ya puedes leer', 'Muchos apellidos describen paisajes: {山田[やまだ]} (arrozal de la montaña), {田中[たなか]} (en medio del arrozal), {山本[やまもと]} (al pie de la montaña), {川口[かわぐち]} (desembocadura del río).'),
        tip('日本, el origen del sol', '{日} es «sol» y {本}, «origen»: Japón es «el origen del sol», de ahí «el país del sol naciente».'),
      ], [
        q('¿Qué significa 先生?', ['Profesor', 'Estudiante', 'Escuela'], '{先} (antes) + {生} (nacer): quien nació antes y por eso enseña.', { jp: '先生' }),
        q('En la puerta de un baño pone 女. ¿Para quién es?', ['Mujeres', 'Hombres', 'Niños'], '{女} es «mujer»; {男}, «hombre».', { jp: '女', pitfall: 'Es de los primeros kanji que conviene reconocer al llegar a Japón.' }),
        q('¿Cómo se lee el apellido 田中?', ['たなか', 'やまだ', 'でんちゅう'], '{田[た]} + {中[なか]}: lecturas kun, como casi todos los apellidos.', { jp: '田中', bare: true }),
      ]),
      lesson('kan-acciones', 'Tamaño, posición y acciones', 'うごき', 'Leer los kanji de posiciones, tamaños y los verbos más comunes.', [
        table(KANJI_HEAD, ['{大}', 'grande', 'おお(きい)', 'ダイ', '3'], ['{小}', 'pequeño', 'ちい(さい)', 'ショウ', '3'], ['{上}', 'arriba', 'うえ', 'ジョウ', '3'], ['{下}', 'abajo', 'した', 'カ', '3'], ['{中}', 'dentro; medio', 'なか', 'チュウ', '4'], ['{右}', 'derecha', 'みぎ', 'ウ', '5'], ['{左}', 'izquierda', 'ひだり', 'サ', '5'], ['{行}', 'ir', 'い(く)', 'コウ', '6'], ['{来}', 'venir', 'く(る)', 'ライ', '7'], ['{食}', 'comer', 'た(べる)', 'ショク', '9'], ['{飲}', 'beber', 'の(む)', 'イン', '12'], ['{見}', 'ver', 'み(る)', 'ケン', '7']),
        write('大 小 上 下 中 右 左 行 来 食 見'),
        terms('Adjetivos y posiciones', '大[おお]きい|grande', '小[ちい]さい|pequeño', '上[うえ]|encima', '下[した]|debajo', '中[なか]|dentro', '右[みぎ]|derecha', '左[ひだり]|izquierda'),
        terms('Verbos', '行[い]きます|ir', '来[き]ます|venir', '食[た]べます|comer', '飲[の]みます|beber', '見[み]ます|ver'),
        frases('En frases', '学校[がっこう] に 行[い]きます。|Voy a la escuela.', '水[みず] を 飲[の]みます。|Bebo agua.', '大[おお]きい 山[やま] を 見[み]ました。|Vi una montaña grande.'),
        ojo('右 y 左', 'Se parecen mucho. {右} (derecha) contiene {口}, «boca»; {左} (izquierda) contiene {工}, «trabajo».'),
      ], [
        q('¿Qué significa 小さい?', ['Pequeño', 'Grande', 'Poco'], '{小} es «pequeño». Su contrario es {大}.', { jp: '小[ちい]さい' }),
        q('¿Cómo se lee 食べます?', ['たべます', 'のみます', 'みます'], '{食} es el kanji de «comer».', { jp: '食べます', bare: true }),
        q('Una flecha señala 左. ¿Hacia dónde vas?', ['A la izquierda', 'A la derecha', 'Arriba'], '{左[ひだり]} es «izquierda».', { jp: '左' }),
      ]),
    ],
  },
  {
    id: 'm7-u3', title: 'Leer con kanji',
    lessons: [
      lesson('kan-vocabulario', 'Vocabulario y carteles', 'ことば', 'Leer palabras compuestas y los carteles que verás nada más aterrizar.', [
        p('Con los kanji que conoces ya puedes descifrar palabras nuevas. Añadimos unos pocos caracteres muy frecuentes en la calle.'),
        terms('Palabras compuestas', '日本語[にほんご]|idioma japonés', '名前[なまえ]|nombre', '時間[じかん]|tiempo; hora', '電車[でんしゃ]|tren', '駅[えき]|estación', '会社[かいしゃ]|empresa', 'お金[かね]|dinero', '東京[とうきょう]|Tokio'),
        terms('Carteles imprescindibles', '入口[いりぐち]|entrada', '出口[でぐち]|salida', '非常口[ひじょうぐち]|salida de emergencia', '禁煙[きんえん]|prohibido fumar', '無料[むりょう]|gratis', '営業中[えいぎょうちゅう]|abierto', '準備中[じゅんびちゅう]|cerrado (preparando)', 'お手洗[てあら]い|aseos'),
        tip('口 también es «puerta»', 'En {入口[いりぐち]}, {出口[でぐち]} y {非常口[ひじょうぐち]} el kanji de «boca» indica una abertura por la que se pasa. {入} es «entrar» y {出}, «salir».'),
        cultura('Las estaciones están llenas de pistas', 'En las estaciones grandes los carteles incluyen el nombre en hiragana y en rōmaji bajo los kanji. Es un entrenamiento de lectura gratuito: intenta leer el kanji antes de mirar la ayuda.'),
      ], [
        q('Buscas la salida de la estación. ¿Qué cartel sigues?', ['出口', '入口', '禁煙'], '{出} es «salir»: {出口[でぐち]}.', { bare: true }),
        q('En la puerta de un restaurante pone 準備中. ¿Puedes entrar?', ['No, están cerrados preparando el servicio', 'Sí, está abierto', 'Solo con reserva'], '{準備中[じゅんびちゅう]} significa «en preparación». Abierto es {営業中[えいぎょうちゅう]}.', { jp: '準備中' }),
        q('¿Qué significa 無料?', ['Gratis', 'Prohibido', 'Ocupado'], '{無} es «sin» y {料}, «tarifa».', { jp: '無料' }),
      ]),
      lesson('kan-frases', 'Lectura de frases sencillas', 'よむ', 'Leer un texto corto con kanji y furigana y comprobar que lo entiendes.', [
        p('Así se escribe el japonés real: kanji para el significado, hiragana para la gramática y katakana para los préstamos. Lee cada frase fijándote primero en los kanji.'),
        frases('El día de Tanaka', '田中[たなか]さん は 会社員[かいしゃいん] です。|Tanaka es empleado de una empresa.', '毎日[まいにち] 七時[しちじ] に 電車[でんしゃ] で 会社[かいしゃ] に 行[い]きます。|Todos los días va a la empresa en tren a las siete.', '今日[きょう] は 金曜日[きんようび] です。|Hoy es viernes.', '六時[ろくじ] に 友[とも]だち と レストラン で ばんごはん を 食[た]べます。|A las seis cena con un amigo en un restaurante.', '土曜日[どようび] は 山[やま] に 行[い]きます。|El sábado va a la montaña.'),
        terms('Vocabulario del texto', '会社員[かいしゃいん]|empleado de empresa', '毎日[まいにち]|todos los días', '友[とも]だち|amigo, amiga', '今週[こんしゅう]|esta semana', '来週[らいしゅう]|la semana que viene'),
        tip('Leer sin furigana', 'En Ajustes puedes ocultar el rōmaji. El siguiente paso, cuando te sientas seguro, es tapar el furigana con el dedo e intentar leer el kanji de memoria.'),
      ], [
        q('¿Cómo va Tanaka al trabajo?', ['En tren', 'En coche', 'Andando'], 'El texto dice {電車[でんしゃ] で}: «en tren».'),
        q('¿Qué hace el viernes a las seis?', ['Cena con un amigo en un restaurante', 'Va a la montaña', 'Trabaja en casa'], '{六時[ろくじ] に 友[とも]だち と レストラン で ばんごはん を 食[た]べます}.'),
        q('¿Qué día va a la montaña?', ['El sábado', 'El viernes', 'El domingo'], '{土曜日[どようび]} es sábado.'),
      ]),
    ],
  },
];
