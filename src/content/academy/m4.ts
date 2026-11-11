import { cultura, dlg, frases, h, lesson, ojo, p, q, reply, table, terms, tip } from '../helpers';
import type { Unit } from '../types';

export const wordsUnits: Unit[] = [
  {
    id: 'm4-u1', title: 'Saludos y presentaciones',
    lessons: [
      lesson('pal-saludos', 'Saludos', 'あいさつ', 'Saludar, despedirte, dar las gracias y disculparte según el momento del día.', [
        p('Los saludos japoneses dependen de la **hora** y de la **confianza**. Casi todos tienen una versión corta para amigos y una larga y cortés.'),
        terms('A lo largo del día', 'おはようございます|buenos días|Hasta media mañana. Entre amigos: おはよう.', 'こんにちは|hola; buenas tardes|Desde media mañana hasta el anochecer.', 'こんばんは|buenas noches (al llegar)', 'おやすみなさい|buenas noches (al irse a dormir)', 'さようなら|adiós|Suena a despedida larga. A diario se usa más じゃあ、また.', 'またね|hasta luego (informal)'),
        terms('Gracias y perdón', 'ありがとうございます|muchas gracias', 'すみません|perdone; disculpe|También sirve para llamar la atención o agradecer una molestia.', 'ごめんなさい|lo siento', 'どういたしまして|de nada', 'おねがいします|por favor (al pedir algo)'),
        ojo('こんにちは se escribe con は', 'La última sílaba se escribe {は} pero se lee «wa», porque en origen era la partícula de tema. Lo mismo ocurre con {こんばんは}.'),
        cultura('Antes y después de comer', 'Antes de empezar a comer se dice {いただきます} y al terminar, {ごちそうさまでした}. No son un «que aproveche»: expresan gratitud por la comida y por quien la preparó. Se dicen también cuando comes solo.'),
      ], [
        q('Son las nueve de la noche y llegas a una cena. ¿Cómo saludas?', ['こんばんは', 'おやすみなさい', 'おはようございます'], '{こんばんは} se usa al encontrarse de noche. {おやすみなさい} es para despedirse antes de dormir.', { pitfall: 'En español «buenas noches» vale para llegar y para irse; en japonés son dos expresiones distintas.' }),
        q('Quieres llamar al camarero. ¿Qué dices?', ['すみません', 'ごめんなさい', 'さようなら'], '{すみません} sirve para disculparse y también para pedir atención. {ごめんなさい} es solo una disculpa.'),
        reply('Vecina|ありがとうございます。|Muchas gracias.', ['どういたしまして。', 'いただきます。', 'こんばんは。'], '«De nada» es {どういたしまして}. En la vida real también se oye mucho {いいえ}, «no hay de qué».'),
      ]),
      lesson('pal-presentaciones', 'Presentaciones', 'じこしょうかい', 'Presentarte: tu nombre, de dónde vienes y a qué te dedicas.', [
        p('La presentación japonesa tiene una estructura fija. Apréndela como una fórmula: la usarás cientos de veces.'),
        dlg('Primer encuentro', 'Tanaka|はじめまして。 たなか です。|Encantado. Soy Tanaka.', 'María|はじめまして。 マリア です。 スペイン から きました。|Encantada. Soy María. Vengo de España.', 'Tanaka|よろしく おねがいします。|Un placer.', 'María|こちらこそ、 よろしく おねがいします。|Igualmente, un placer.'),
        terms('Piezas de la presentación', 'はじめまして|encantado, encantada|Solo la primera vez que ves a alguien.', 'わたし|yo', 'なまえ|nombre', 'よろしく おねがいします|un placer; cuento contigo', 'こちらこそ|igualmente', 'がくせい|estudiante', 'かいしゃいん|empleado de empresa', 'せんせい|profesor, profesora'),
        frases('Construye la tuya', 'わたし は マリア です。|Soy María.', 'スペイン から きました。|Vengo de España.', 'がくせい です。|Soy estudiante.', 'おなまえ は なん です か。|¿Cómo se llama usted?'),
        ojo('No abuses de わたし', 'Una vez queda claro que hablas de ti, deja de repetir {わたし は}. «マリアです。スペインからきました。がくせいです。» suena mucho más natural.'),
        cultura('よろしくおねがいします', 'No tiene traducción exacta: significa algo como «trátame bien» o «cuento con tu buena disposición». Se dice al presentarse, al empezar un trabajo en equipo y al pedir un favor.'),
      ], [
        reply('Tanaka|はじめまして。 たなか です。|Encantado. Soy Tanaka.', ['はじめまして。 マリア です。', 'マリアさん です。', 'さようなら。'], 'Se responde con {はじめまして} y tu nombre, sin {さん}.', 'Añadirte {さん} a ti mismo es el error más típico de las primeras presentaciones.'),
        q('¿Cuándo se usa はじめまして?', ['Solo la primera vez que conoces a alguien', 'Cada mañana al llegar', 'Al despedirse'], 'Literalmente significa «es la primera vez».'),
        q('«Vengo de México» se dice…', ['メキシコ から きました。', 'メキシコ です から。', 'メキシコ に きました。'], '{から} significa «desde» y {きました} es «vine».', { pitfall: '{メキシコ に きました} significaría «vine a México».' }),
      ]),
    ],
  },
  {
    id: 'm4-u2', title: 'Números y tiempo',
    lessons: [
      lesson('pal-numeros', 'Números', 'すうじ', 'Contar hasta 10.000 y entender precios en yenes.', [
        p('Los números japoneses son completamente regulares: con once palabras formas todos los números hasta 99.'),
        terms('Del 1 al 10', 'いち|1', 'に|2', 'さん|3', 'よん|4|También し, que se evita porque suena igual que «muerte».', 'ご|5', 'ろく|6', 'なな|7|También しち.', 'はち|8', 'きゅう|9|También く.', 'じゅう|10'),
        table(['Número', 'Se forma', 'Japonés'], ['11', '10 + 1', '{じゅういち}'], ['20', '2 × 10', '{にじゅう}'], ['47', '4 × 10 + 7', '{よんじゅうなな}'], ['99', '9 × 10 + 9', '{きゅうじゅうきゅう}']),
        terms('Cifras grandes', 'ひゃく|100', 'せん|1.000', 'いちまん|10.000', 'えん|yen', 'ゼロ|cero|También れい.'),
        ojo('Tres centenas y dos millares irregulares', '300 es {さんびゃく}, 600 {ろっぴゃく} y 800 {はっぴゃく}. 3.000 es {さんぜん} y 8.000 {はっせん}. El resto es regular: 200 {にひゃく}, 5.000 {ごせん}.'),
        tip('Se cuenta de cuatro en cuatro cifras', 'En japonés hay una palabra para 10.000: {まん}. 50.000 es «5 man» ({ごまん}) y un millón, «100 man» ({ひゃくまん}). Con los precios en yenes lo usarás enseguida: un alquiler de 70.000 yenes es {ななまん えん}.'),
        frases('En la tienda', 'これ は いくら です か。|¿Cuánto cuesta esto?', 'せん ごひゃく えん です。|Son 1.500 yenes.'),
      ], [
        q('¿Cómo se dice 47?', ['よんじゅうなな', 'ななじゅうよん', 'よんなな'], '4 × 10 ({よんじゅう}) + 7 ({なな}).'),
        q('¿Cómo se dice 300?', ['さんびゃく', 'さんひゃく', 'さんぴゃく'], 'Tras {さん} la «h» de {ひゃく} se vuelve «b».', { pitfall: 'Solo 300, 600 y 800 cambian; no generalices la regla.' }),
        q('El dependiente dice: にせん ごひゃく えん です。 ¿Cuánto pagas?', ['2.500 yenes', '25.000 yenes', '250 yenes'], '{にせん} es 2.000 y {ごひゃく}, 500.', { jp: 'にせん ごひゃく えん です。' }),
        q('¿Cuánto es さんまん えん?', ['30.000 yenes', '3.000 yenes', '3 millones de yenes'], '{まん} es la unidad de diez mil: 3 × 10.000.', { jp: 'さんまん えん' }),
      ]),
      lesson('pal-fechas', 'Días y fechas', 'ひにち', 'Decir los días de la semana, los meses y tu cumpleaños.', [
        terms('Días de la semana', 'げつようび|lunes', 'かようび|martes', 'すいようび|miércoles', 'もくようび|jueves', 'きんようび|viernes', 'どようび|sábado', 'にちようび|domingo'),
        tip('Siete elementos', 'Cada día lleva el nombre de un elemento: luna, fuego, agua, madera, metal, tierra y sol, seguido de {ようび}. Cuando estudies kanji verás que son los mismos caracteres.'),
        terms('Ayer, hoy y mañana', 'きのう|ayer', 'きょう|hoy', 'あした|mañana', 'まいにち|todos los días', 'いつ|cuándo', 'たんじょうび|cumpleaños'),
        h('Meses y días'),
        p('Los meses no tienen nombre: son un número seguido de {がつ}. Enero es {いちがつ}, febrero {にがつ}… Solo cambian tres: abril es {しがつ}, julio {しちがつ} y septiembre {くがつ}.'),
        table(['Día', 'Lectura', 'Día', 'Lectura'], ['1', '{ついたち}', '6', '{むいか}'], ['2', '{ふつか}', '7', '{なのか}'], ['3', '{みっか}', '8', '{ようか}'], ['4', '{よっか}', '9', '{ここのか}'], ['5', '{いつか}', '10', '{とおか}']),
        ojo('Del 1 al 10, de memoria', 'Los diez primeros días del mes son irregulares, y también el 14 ({じゅうよっか}), el 20 ({はつか}) y el 24 ({にじゅうよっか}). El resto es el número seguido de {にち}: el 15 es {じゅうごにち}.'),
        frases('Preguntar y responder', 'きょう は なんようび です か。|¿Qué día de la semana es hoy?', 'きょう は げつようび です。|Hoy es lunes.', 'たんじょうび は いつ です か。|¿Cuándo es tu cumpleaños?', 'しがつ はつか です。|Es el 20 de abril.'),
        cultura('El orden de la fecha', 'La fecha se dice de mayor a menor: año, mes, día. El 5 de marzo de 2027 es «2027年3月5日».'),
      ], [
        q('¿Qué día es もくようび?', ['Jueves', 'Martes', 'Sábado'], '{もく} es «madera»: jueves.', { jp: 'もくようび' }),
        q('¿Cómo se dice «abril»?', ['しがつ', 'よんがつ', 'よがつ'], 'Abril usa la lectura {し} del cuatro.', { pitfall: 'Aunque para contar se prefiere {よん}, en los meses es {しがつ}.' }),
        q('¿Qué día del mes es はつか?', ['El 20', 'El 2', 'El 8'], '{はつか} es la forma irregular del día 20. El 2 es {ふつか} y el 8, {ようか}.', { jp: 'はつか' }),
      ]),
      lesson('pal-horas', 'Las horas', 'じかん', 'Preguntar y decir la hora y hablar de horarios.', [
        p('La hora es un número seguido de {じ} (hora) y los minutos, un número seguido de {ふん} o {ぷん}.'),
        terms('Lo esencial', 'いま|ahora', 'なんじ|qué hora', 'はん|y media', 'ごぜん|de la mañana (a. m.)', 'ごご|de la tarde (p. m.)', 'から|desde', 'まで|hasta'),
        table(['Hora', 'Japonés', 'Minutos', 'Japonés'], ['1:00', '{いちじ}', '5', '{ごふん}'], ['4:00', '{よじ}', '10', '{じゅっぷん}'], ['7:00', '{しちじ}', '15', '{じゅうごふん}'], ['9:00', '{くじ}', '30', '{さんじゅっぷん} o {はん}']),
        ojo('Tres horas que se salen de la regla', 'Las cuatro son {よじ} (no «yonji»), las siete {しちじ} y las nueve {くじ}.'),
        frases('Horarios', 'いま なんじ です か。|¿Qué hora es?', 'ごご さんじ はん です。|Son las tres y media de la tarde.', 'ぎんこう は くじ から さんじ まで です。|El banco abre de nueve a tres.'),
        cultura('La puntualidad', 'En Japón llegar a la hora significa llegar unos minutos antes. Los trenes publican disculpas por retrasos de un minuto, y en el trabajo cinco minutos tarde ya requieren avisar.'),
      ], [
        q('¿Cómo se dice «las cuatro»?', ['よじ', 'よんじ', 'しじ'], 'Con las horas, el cuatro se lee {よ}.'),
        q('ごご はちじ はん です。 ¿Qué hora es?', ['Las 20:30', 'Las 8:30 de la mañana', 'Las 20:00'], '{ごご} indica la tarde o la noche y {はん}, «y media».', { jp: 'ごご はちじ はん です。' }),
        q('¿Qué significa «くじ から ごじ まで»?', ['De nueve a cinco', 'A las nueve y cinco', 'Desde hace nueve horas'], '{から} es «desde» y {まで}, «hasta». Van detrás de la hora.', { jp: 'くじ から ごじ まで' }),
      ]),
    ],
  },
  {
    id: 'm4-u3', title: 'Tu mundo',
    lessons: [
      lesson('pal-familia', 'La familia', 'かぞく', 'Hablar de tu familia y preguntar por la de otra persona con las palabras adecuadas.', [
        p('Para cada familiar hay **dos palabras**: una humilde para hablar de tu propia familia ante otras personas y otra respetuosa para la familia de los demás.'),
        table(['', 'Mi familia', 'La familia de otra persona'],
          ['Padre', '{ちち}', '{おとうさん}'], ['Madre', '{はは}', '{おかあさん}'], ['Hermano mayor', '{あに}', '{おにいさん}'],
          ['Hermana mayor', '{あね}', '{おねえさん}'], ['Hermano menor', '{おとうと}', '{おとうとさん}'], ['Hermana menor', '{いもうと}', '{いもうとさん}']),
        terms('Vocabulario', 'かぞく|familia', 'ちち|mi padre', 'はは|mi madre', 'あに|mi hermano mayor', 'あね|mi hermana mayor', 'おとうと|mi hermano menor', 'いもうと|mi hermana menor', 'りょうしん|padres', 'こども|niño; hijo'),
        tip('En casa se usa la forma respetuosa', 'Para dirigirte a tu propia madre le dices {おかあさん}. La forma humilde {はは} es solo para hablar de ella con gente de fuera de la familia.'),
        frases('Hablar de la familia', 'かぞく は よにん です。|Somos cuatro en mi familia.', 'あね が ひとり います。|Tengo una hermana mayor.', 'おかあさん は おげんき です か。|¿Su madre está bien?'),
        ojo('Mayor o menor, siempre', 'No existe una palabra neutra para «hermano»: hay que elegir entre mayor y menor. La edad relativa importa mucho en japonés.'),
      ], [
        q('Le cuentas a tu jefe que tu madre es profesora. ¿Qué palabra usas para «madre»?', ['はは', 'おかあさん', 'おかあさま'], 'Al hablar de tu familia con alguien de fuera se usa la forma humilde.', { pitfall: 'Usar {おかあさん} para tu propia madre ante un superior suena infantil.' }),
        q('¿Qué significa おにいさん?', ['Hermano mayor (de otra persona)', 'Mi hermano menor', 'Abuelo'], 'Lleva el prefijo {お} y el sufijo {さん} de respeto.', { jp: 'おにいさん' }),
      ]),
      lesson('pal-comida', 'Comida y bebida', 'たべもの', 'Nombrar alimentos básicos y pedir algo de comer o beber.', [
        terms('Para comer', 'ごはん|arroz cocido; comida|Significa las dos cosas: el arroz es «la comida».', 'パン|pan', 'にく|carne', 'さかな|pescado', 'やさい|verdura', 'くだもの|fruta', 'たまご|huevo'),
        terms('Para beber', 'みず|agua', 'おちゃ|té (verde)', 'コーヒー|café', 'ぎゅうにゅう|leche', 'ビール|cerveza'),
        terms('Comidas del día y verbos', 'あさごはん|desayuno', 'ひるごはん|almuerzo', 'ばんごはん|cena', 'たべます|comer', 'のみます|beber', 'おいしい|rico, delicioso'),
        frases('En la mesa', 'あさごはん を たべます。|Desayuno.', 'みず を ください。|Agua, por favor.', 'これ は おいしい です。|Esto está rico.', 'さかな が すき です。|Me gusta el pescado.'),
        tip('〜を ください', 'Para pedir cualquier cosa: la cosa + {を ください}. Es educado y funciona en tiendas, bares y restaurantes.'),
        cultura('El agua y el té son gratis', 'En casi todos los restaurantes te sirven agua o té sin pedirlo ni pagarlo. Y no se deja propina: puede incluso resultar incómodo.'),
      ], [
        q('¿Cómo pides un café?', ['コーヒー を ください。', 'コーヒー です か。', 'コーヒー は いいえ。'], 'Cosa + {を ください}: «deme…, por favor».'),
        q('ごはん puede significar…', ['Arroz cocido o comida en general', 'Solo pan', 'Solo desayuno'], 'El arroz es tan central que da nombre a la comida entera.', { jp: 'ごはん' }),
      ]),
      lesson('pal-lugares', 'Lugares', 'ばしょ', 'Nombrar los sitios de tu barrio y preguntar dónde está algo.', [
        terms('En la ciudad', 'えき|estación', 'がっこう|escuela', 'みせ|tienda', 'コンビニ|tienda 24 horas', 'レストラン|restaurante', 'びょういん|hospital', 'ぎんこう|banco', 'ゆうびんきょく|oficina de correos', 'こうえん|parque', 'トイレ|baño, aseo', 'うち|casa (la mía)'),
        terms('Aquí, ahí, allí', 'ここ|aquí', 'そこ|ahí|Cerca de quien escucha.', 'あそこ|allí|Lejos de los dos.', 'どこ|dónde'),
        frases('Preguntar por un sitio', 'えき は どこ です か。|¿Dónde está la estación?', 'トイレ は あそこ です。|El baño está allí.', 'がっこう に いきます。|Voy a la escuela.'),
        tip('こ – そ – あ – ど', 'Este patrón se repite por todo el idioma: {こ} para lo cercano a ti, {そ} para lo cercano a tu interlocutor, {あ} para lo lejano y {ど} para preguntar. Lo verás de nuevo en la siguiente lección.'),
        cultura('El コンビニ', 'Las tiendas 24 horas son el centro de la vida diaria: comida preparada, cajero, pago de facturas, envío de paquetes, impresiones y entradas de conciertos.'),
      ], [
        q('Necesitas enviar un paquete. ¿Adónde vas?', ['ゆうびんきょく', 'ぎんこう', 'びょういん'], '{ゆうびんきょく} es la oficina de correos. Los paquetes también se envían desde muchos {コンビニ}.'),
        q('¿Cómo preguntas dónde está el baño?', ['トイレ は どこ です か。', 'トイレ は ここ です。', 'どこ は トイレ です か。'], 'Lugar + {は どこ です か}.', { pitfall: 'La palabra interrogativa no va delante de {は}: va en el lugar de la respuesta.' }),
      ]),
      lesson('pal-objetos', 'Objetos cotidianos', 'もの', 'Nombrar tus cosas y señalarlas con «este», «ese» y «aquel».', [
        terms('Lo que llevas encima', 'ほん|libro', 'かばん|bolso, mochila', 'かさ|paraguas', 'とけい|reloj', 'スマホ|móvil', 'さいふ|cartera', 'かぎ|llave', 'めがね|gafas', 'くつ|zapatos', 'ペン|bolígrafo'),
        table(['', 'Solo (pronombre)', 'Delante de un nombre'], ['Cerca de mí', '{これ} esto', '{この ほん} este libro'], ['Cerca de ti', '{それ} eso', '{その ほん} ese libro'], ['Lejos de los dos', '{あれ} aquello', '{あの ほん} aquel libro'], ['Pregunta', '{どれ} cuál', '{どの ほん} qué libro']),
        terms('Preguntar', 'なん|qué', 'だれ|quién', 'わたし の|mío, mi'),
        frases('Señalar cosas', 'これ は なん です か。|¿Qué es esto?', 'それ は わたし の かばん です。|Ese es mi bolso.', 'あれ は だれ の かさ です か。|¿De quién es aquel paraguas?', 'この とけい は いくら です か。|¿Cuánto cuesta este reloj?'),
        ojo('これ nunca va delante de un nombre', '«Este libro» es {この ほん}, no «これ ほん». {これ} funciona solo; {この} necesita un nombre detrás.'),
      ], [
        q('«Este paraguas» se dice…', ['この かさ', 'これ かさ', 'これ の かさ'], 'Delante de un nombre se usa {この}.', { pitfall: '{これ の かさ} significaría «el paraguas de esto».' }),
        q('Tu amigo tiene algo en la mano y quieres saber qué es. ¿Qué preguntas?', ['それ は なん です か。', 'これ は なん です か。', 'あれ は なん です か。'], 'Está cerca de tu interlocutor, así que es {それ}.'),
        reply('Dependiente|これ は あなた の さいふ です か。|¿Es esta su cartera?', ['はい、 わたし の です。', 'はい、 あなた の です。', 'いいえ、 さいふ です。'], '{わたし の} significa «mío». Se puede omitir el nombre cuando ya se sabe de qué se habla.'),
      ]),
    ],
  },
];
