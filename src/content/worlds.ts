import { cultura, dlg, lesson, ojo, p, q, reply, terms, tip } from './helpers';
import type { World } from './types';

/*
 * Mundos de aprendizaje. Personajes, lugares y diálogos son originales de NIHONGO QUEST:
 * los géneros del anime sirven de ambientación, sin tomar nada de obras existentes.
 */

const scene = (after: string, l: ReturnType<typeof lesson>) => ({ ...l, after });

export const worlds: World[] = [
  {
    id: 'romance', name: 'Romance', jp: 'さくらざか', color: '#f29cb7',
    tagline: 'Instituto Sakurazaka, el curso en que todo empieza.',
    desc: 'Compañeros de clase, clubes, festivales de verano y las palabras que cuesta decir. Practica presentaciones, invitaciones y sentimientos.',
    cast: [
      { name: 'Hinata', jp: 'ひなた', role: 'Club de fotografía', bio: 'Habla con todo el mundo y lo fotografía todo, menos a sí misma.', look: { skin: '#f6d7c3', hair: '#7a4a3a', eyes: '#c9703f', style: 'coleta', extra: 'lazo' } },
      { name: 'Sōta', jp: 'そうた', role: 'Recién llegado', bio: 'Acaba de mudarse. Piensa cada frase tres veces antes de decirla.', look: { skin: '#eccdb5', hair: '#2f3350', eyes: '#5b7fd1', style: 'corto', extra: 'gafas' } },
    ],
    scenes: [
      scene('m4', lesson('rom-primer-dia', 'El pupitre de al lado', 'となり の せき', 'Presentarte a un compañero y hablar de clubes.', [
        p('Primer día de curso. Tú eres nuevo en el instituto Sakurazaka y te ha tocado junto a la ventana, al lado de una chica con una cámara colgada al cuello.'),
        dlg('Antes de que suene el timbre', 'Hinata|おはよう！ となり の せき だ ね。 わたし は ひなた。|¡Buenos días! Nos sentamos juntos. Yo soy Hinata.', 'Sōta|お、おはようございます。 そうた です。|B-buenos días. Soy Sōta.', 'Hinata|そうたくん は ぶかつ に はいって いる？|Sōta, ¿estás en algún club?', 'Sōta|いいえ、 まだ です。 ひなたさん は？|No, todavía no. ¿Y tú, Hinata?', 'Hinata|しゃしんぶ！ いっしょに どう？|¡El de fotografía! ¿Te apuntas conmigo?'),
        terms('Vocabulario del instituto', 'となり|al lado', 'せき|asiento, pupitre', 'ぶかつ|club escolar', 'しゃしん|foto', 'クラス|clase (grupo)', 'きょうしつ|aula', 'ともだち|amigo, amiga', 'まだ|todavía'),
        ojo('Cómo hablan los personajes', 'Hinata habla en informal desde la primera frase y Sōta contesta en forma cortés: en el anime esto retrata su carácter. En un instituto real, entre compañeros de la misma edad, el informal llega enseguida; con alguien de un curso superior se mantiene {です} y {ます}.'),
        tip('くん y さん', '{くん} se añade a nombres de chicos de tu edad o más jóvenes; es más cercano que {さん}. Con desconocidos adultos, usa siempre {さん}.'),
      ], [
        reply('Hinata|そうたくん は ぶかつ に はいって いる？|¿Estás en algún club?', ['いいえ、 まだ です。', 'はい、 となり です。', 'しゃしん です か。'], '«No, todavía no»: {まだ です}.'),
        q('¿Qué es un ぶかつ?', ['Un club de actividades del instituto', 'Un examen', 'El recreo'], 'Los clubes ({ぶかつ}) son el centro de la vida escolar japonesa: deporte, música, arte…', { jp: 'ぶかつ' }),
      ])),
      scene('m5', lesson('rom-festival', 'El festival de verano', 'なつまつり', 'Invitar a alguien, aceptar y expresar cómo te sientes.', [
        p('Julio. En el tablón del pasillo hay un cartel del festival del barrio. Sōta lleva tres días ensayando una sola frase.'),
        dlg('En la escalera', 'Sōta|あの、 ひなたさん。 どようび、 ひま です か。|Esto… Hinata. ¿Estás libre el sábado?', 'Hinata|どようび？ うん、 ひま だ よ。 どうして？|¿El sábado? Sí, estoy libre. ¿Por qué?', 'Sōta|なつまつり が あります。 いっしょに いきませんか。|Hay un festival de verano. ¿Vamos juntos?', 'Hinata|いく！ はなび、 たのしみ だ な。|¡Voy! Qué ganas de ver los fuegos artificiales.', 'Sōta|よかった… じゃあ、 ろくじ に えき で。|Menos mal… Entonces, a las seis en la estación.'),
        terms('Festival y sentimientos', 'なつまつり|festival de verano', 'はなび|fuegos artificiales', 'ゆかた|kimono ligero de verano', 'たのしみ|ilusión, ganas', 'うれしい|contento, feliz', 'はずかしい|que da vergüenza', 'どきどき|con el corazón acelerado', 'だいじ|importante, valioso'),
        cultura('すき です', 'En japonés casi nunca se dice «te quiero» ({あいしてる} suena muy solemne). Una declaración se hace con {すき です}, literalmente «me gustas», y tiene todo el peso de una confesión. Tiene incluso nombre propio: {こくはく}.'),
        tip('Onomatopeyas de emociones', '{どきどき} imita el latido del corazón. El japonés tiene cientos de palabras así, y se usan en la conversación adulta, no solo en el manga.'),
      ], [
        reply('Sōta|なつまつり に いっしょに いきませんか。|¿Vamos juntos al festival?', ['いい です ね。 いきましょう。', 'いいえ、 いきませんでした。', 'なつまつり です。'], 'Se acepta con {いいですね} y {いきましょう}, «vayamos».'),
        q('¿Cómo le dices a alguien que te gusta?', ['すき です。', 'すし です。', 'ひま です。'], '{すき です} es la forma habitual de declararse.', { pitfall: 'Dicho a una persona, {すき です} no es un comentario ligero.' }),
      ])),
    ],
  },
  {
    id: 'fantasia', name: 'Fantasía', jp: 'きりのさと', color: '#b693f0',
    tagline: 'Kirinosato, la aldea al borde del mapa.',
    desc: 'Posadas, mapas incompletos y criaturas que no salen en los libros. Practica peticiones, objetos, descripciones y direcciones.',
    cast: [
      { name: 'Kohaku', jp: 'こはく', role: 'Aprendiz de maga', bio: 'Trescientos años estudiando magia y todavía se pierde en línea recta.', look: { skin: '#f3dccb', hair: '#d9d3ee', eyes: '#8b6fd6', style: 'largo', extra: 'capucha' } },
      { name: 'Mochi', jp: 'もち', role: 'Espíritu guía', bio: 'Pequeño, redondo y convencido de que él manda en la expedición.', look: { skin: '#fbf4e6', hair: '#f2b63c', eyes: '#3d3d5c', style: 'punta' } },
    ],
    scenes: [
      scene('m4', lesson('fan-posada', 'La posada del viajero', 'やどや', 'Pedir alojamiento y comida y nombrar tu equipo de aventurero.', [
        p('Tras dos días de camino llegas a Kirinosato. La única luz encendida es la de la posada. Dentro, una maga discute con un mapa del revés.'),
        dlg('En el mostrador', 'Posadera|いらっしゃい。 おとまり です か。|Bienvenidos. ¿Van a alojarse?', 'Kohaku|はい。 ひとばん おねがいします。 いくら です か。|Sí. Una noche, por favor. ¿Cuánto es?', 'Posadera|ぎんか さんまい です。 ばんごはん も あります よ。|Tres monedas de plata. También hay cena.', 'Kohaku|じゃあ、 ばんごはん も ください。 それから、 ちず は あります か。|Entonces, la cena también. Y otra cosa: ¿tiene un mapa?', 'Mochi|ちず は いらない。 わたし が みち を しって いる！|No hace falta mapa. ¡Yo me sé el camino!'),
        terms('Equipo de aventurero', 'やどや|posada', 'ちず|mapa', 'けん|espada', 'たて|escudo', 'まほう|magia', 'くすり|medicina, poción', 'かばん|bolsa', 'おかね|dinero'),
        tip('Contar objetos planos', 'Las monedas, las hojas y los billetes se cuentan con {まい}: {いちまい}, {にまい}, {さんまい}. El japonés usa contadores distintos según la forma de lo que se cuenta.'),
      ], [
        reply('Posadera|おとまり です か。|¿Van a alojarse?', ['はい、 ひとばん おねがいします。', 'はい、 ちず です。', 'いいえ、 まほう です。'], '{ひとばん} es «una noche» y {おねがいします} hace la petición.'),
        q('Necesitas algo para curarte. ¿Qué pides?', ['くすり を ください。', 'けん を ください。', 'ちず を ください。'], '{くすり} es «medicina» y, en este mundo, «poción».'),
      ])),
      scene('m5', lesson('fan-cueva', 'La cueva del dragón', 'りゅう の どうくつ', 'Describir criaturas y lugares y decidir qué hacer.', [
        p('El mapa terminaba en el bosque. Más allá hay una cueva de la que sale un aire caliente, y Mochi ha dejado de dar órdenes.'),
        dlg('En la entrada', 'Kohaku|この どうくつ は くらい です ね。 なに が います か。|Qué oscura es esta cueva. ¿Qué hay dentro?', 'Mochi|りゅう が います。 おおきくて、 とても つよい です。|Hay un dragón. Es grande y muy fuerte.', 'Kohaku|こわい です か。|¿Da miedo?', 'Mochi|こわくない です。 でも、 わたし は ここ で まちます。|No da miedo. Pero yo espero aquí.', 'Kohaku|じゃあ、 わたし が いきます。 まほう が あります から。|Entonces voy yo. Para eso tengo magia.'),
        terms('Criaturas y lugares', 'りゅう|dragón', 'どうくつ|cueva', 'もり|bosque', 'くらい|oscuro', 'あかるい|luminoso', 'つよい|fuerte', 'よわい|débil', 'こわい|que da miedo', 'まちます|esperar'),
        tip('Unir dos adjetivos', 'Para decir «grande y fuerte», el primer adjetivo い cambia la {い} final por {くて}: {おおきくて つよい}. Lo estudiarás a fondo en el módulo intermedio.'),
        ojo('います para todo lo que está vivo', 'El dragón lleva {います}, como las personas y los animales. Un tesoro llevaría {あります}.'),
      ], [
        q('«En el bosque hay un dragón» se dice…', ['もり に りゅう が います。', 'もり に りゅう が あります。', 'もり で りゅう を います。'], 'Un ser vivo lleva {います}; el lugar, {に}; lo que existe, {が}.'),
        reply('Kohaku|この どうくつ は こわい です か。|¿Esta cueva da miedo?', ['いいえ、 こわくない です。', 'いいえ、 こわい じゃ ありません。', 'はい、 こわかった ます。'], 'Negativo de un adjetivo い: se cambia {い} por {くない}.', '{じゃ ありません} es para adjetivos な y nombres.'),
      ])),
    ],
  },
  {
    id: 'misterio', name: 'Misterio y terror', jp: 'よなきがくえん', color: '#8f9bd6',
    tagline: 'Academia Yonaki: después de las seis, nadie sube al tercer piso.',
    desc: 'Notas anónimas, ruidos en el pasillo y un club de periodismo que no se rinde. Practica preguntas, descripciones e hipótesis.',
    cast: [
      { name: 'Shiori', jp: 'しおり', role: 'Presidenta del club de periodismo', bio: 'No cree en fantasmas. Cree en las pruebas, y todavía no tiene ninguna.', look: { skin: '#f1d6c4', hair: '#23243a', eyes: '#c94f5d', style: 'bob', extra: 'cinta' } },
      { name: 'Kuro', jp: 'くろ', role: 'El alumno del fondo', bio: 'Apenas habla, pero siempre sabe quién ha pasado por el pasillo.', look: { skin: '#e6cbb6', hair: '#4a4e6b', eyes: '#9aa6c9', style: 'punta' } },
    ],
    scenes: [
      scene('m5', lesson('mis-nota', 'La nota en la taquilla', 'てがみ', 'Hacer preguntas de investigador: quién, cuándo, dónde, qué.', [
        p('Al abrir tu taquilla cae un papel doblado, sin firma. Shiori ya ha sacado la libreta antes de que termines de leerlo.'),
        dlg('Interrogatorio en el pasillo', 'Shiori|その てがみ は いつ から ここ に ありました か。|¿Desde cuándo estaba aquí esa carta?', 'Tú|けさ から です。 はちじ ごろ です。|Desde esta mañana. Sobre las ocho.', 'Shiori|だれ が ここ に いました か。|¿Quién había aquí?', 'Tú|だれ も いませんでした。|No había nadie.', 'Kuro|…さんがい で おと が しました。|…Se oyó un ruido en el tercer piso.', 'Shiori|おと？ どんな おと です か。|¿Un ruido? ¿Qué tipo de ruido?'),
        terms('Vocabulario de investigación', 'てがみ|carta, nota', 'ひみつ|secreto', 'おと|ruido, sonido', 'へん|raro', 'あやしい|sospechoso', 'けさ|esta mañana', 'さんがい|tercer piso', 'しらべます|investigar', 'みつけます|encontrar'),
        tip('だれ も + negativo', '{だれ も いません} significa «no hay nadie». Interrogativo + {も} + verbo negativo da «nadie», «nada» ({なに も}) o «a ningún sitio» ({どこ に も}).'),
        ojo('おと が します', '«Oírse un ruido» se dice {おと が します}, literalmente «un ruido hace». Lo mismo con los olores: {におい が します}.'),
      ], [
        q('¿Cómo preguntas «¿Quién estaba aquí?»', ['だれ が ここ に いました か。', 'だれ は ここ に ありました か。', 'ここ は だれ です か。'], '{だれ} como sujeto lleva {が}, y con personas se usa {います}.'),
        reply('Shiori|きょうしつ に だれ が いました か。|¿Quién había en el aula?', ['だれ も いませんでした。', 'だれ も いました。', 'なに も ありません。'], '«Nadie» es {だれ も} con el verbo en negativo.', 'En español la negación va en «nadie»; en japonés, en el verbo.'),
      ])),
      scene('m6', lesson('mis-hipotesis', 'La hipótesis', 'すいり', 'Plantear hipótesis, mostrar duda y razonar en voz alta.', [
        p('Seis y cuarto. El tercer piso está a oscuras y la puerta de la sala de música, que siempre está cerrada con llave, tiene una rendija de luz.'),
        dlg('Delante de la sala de música', 'Shiori|ドア が あいて います。 だれ か いる かもしれません。|La puerta está abierta. Puede que haya alguien.', 'Tú|たぶん せんせい だ と おもいます。|Creo que probablemente es un profesor.', 'Shiori|でも、 せんせい は かぎ を もって います。 この かぎ は こわれて います。|Pero los profesores tienen llave. Esta cerradura está rota.', 'Kuro|はんにん は かぎ を もって いません でした。|El culpable no tenía llave.', 'Shiori|なるほど。 しょうこ が ひとつ ふえました ね。|Ya veo. Tenemos una prueba más.'),
        terms('Razonar', 'かもしれません|puede que, quizá', 'たぶん|probablemente', 'きっと|seguro que', 'はんにん|culpable', 'しょうこ|prueba', 'りゆう|motivo, razón', 'かぎ|llave; cerradura', 'こわれて います|está roto'),
        tip('Grados de certeza', 'De más a menos seguro: {きっと 〜 です} (seguro que), {たぶん 〜 と おもいます} (creo que probablemente), {〜 かもしれません} (puede que). Elegir bien el grado es parte de hablar con educación.'),
      ], [
        q('No estás seguro, pero es posible que llueva. ¿Qué dices?', ['あめ が ふる かもしれません。', 'きっと あめ が ふります。', 'あめ が ふりました。'], '{かもしれません} expresa una posibilidad sin comprometerse.'),
        reply('Shiori|はんにん は だれ だ と おもいます か。|¿Quién crees que es el culpable?', ['まだ わかりません。 しょうこ が ありません。', 'はい、 おもいます。', 'はんにん は かぎ です。'], 'Un buen investigador no acusa sin pruebas: «todavía no lo sé».'),
      ])),
    ],
  },
  {
    id: 'cotidiano', name: 'Slice of life', jp: 'ひだまりどおり', color: '#f2b63c',
    tagline: 'Calle Hidamari, donde nunca pasa nada y nadie quiere irse.',
    desc: 'Una panadería de barrio, amigos, compras y planes de sábado. El japonés de todos los días, a ritmo tranquilo.',
    cast: [
      { name: 'Nagi', jp: 'なぎ', role: 'Hija de los panaderos', bio: 'Atiende la tienda después de clase y se sabe el pedido de medio barrio.', look: { skin: '#f4d9c6', hair: '#c9813f', eyes: '#5a8f5f', style: 'bob', extra: 'cinta' } },
      { name: 'Ibuki', jp: 'いぶき', role: 'Universitario y cliente fijo', bio: 'Siempre llega cuando el pan de melón acaba de agotarse.', look: { skin: '#e9cdb8', hair: '#3b3f5e', eyes: '#3f7fa8', style: 'corto', extra: 'cascos' } },
    ],
    scenes: [
      scene('m4', lesson('cot-panaderia', 'En la panadería', 'パンや', 'Comprar: pedir cantidades, preguntar precios y pagar.', [
        p('Las cuatro y media. La panadería Hidamari huele a mantequilla y la campanilla de la puerta no para de sonar.'),
        dlg('En el mostrador', 'Nagi|いらっしゃいませ！|¡Bienvenido!', 'Ibuki|メロンパン は あります か。|¿Hay pan de melón?', 'Nagi|すみません、 きょう は もう ありません。 クリームパン は どう です か。|Lo siento, hoy ya no queda. ¿Qué tal un pan de crema?', 'Ibuki|じゃあ、 クリームパン を ふたつ ください。 いくら です か。|Pues deme dos panes de crema. ¿Cuánto es?', 'Nagi|さんびゃく えん です。 ありがとうございます！|Son 300 yenes. ¡Muchas gracias!'),
        terms('Contar cosas', 'ひとつ|uno (objeto)', 'ふたつ|dos', 'みっつ|tres', 'よっつ|cuatro', 'いつつ|cinco', 'いくつ|cuántos'),
        terms('En la tienda', 'パンや|panadería', 'もう|ya', 'おつり|cambio, vuelta', 'ぜんぶ で|en total', 'レシート|tique', 'ふくろ|bolsa'),
        tip('ひとつ, ふたつ, みっつ', 'Para contar objetos sin complicarte con los contadores específicos, usa esta serie: sirve hasta diez y vale para casi cualquier cosa. La cantidad va **detrás** de {を}: {パン を ふたつ ください}.'),
      ], [
        q('Quieres tres. ¿Cómo lo pides?', ['パン を みっつ ください。', 'みっつ パン ください を。', 'パン を さん ください。'], 'Cosa + {を} + cantidad + {ください}.', { pitfall: 'Para contar objetos no se usa el número a secas.' }),
        reply('Nagi|メロンパン は もう ありません。|Ya no queda pan de melón.', ['じゃあ、 クリームパン を ください。', 'はい、 メロンパン を ください。', 'いらっしゃいませ。'], '{じゃあ} («pues entonces») introduce tu segunda opción.'),
      ])),
      scene('m5', lesson('cot-ramen', 'Sábado de ramen', 'ラーメンや', 'Quedar con amigos, decir que tienes hambre y pedir en un restaurante.', [
        p('Sábado, la una. Nagi ha cerrado el turno de mañana e Ibuki lleva diez minutos mirando el expositor de un local de ramen.'),
        dlg('Delante del local', 'Ibuki|おなか が すきました。 ここ で たべませんか。|Tengo hambre. ¿Comemos aquí?', 'Nagi|いい です ね。 わたし は のど も かわきました。|Buena idea. Yo además tengo sed.', 'Camarero|いらっしゃいませ。 なんめいさま です か。|Bienvenidos. ¿Cuántos son?', 'Ibuki|ふたり です。 しょうゆラーメン を ふたつ と ぎょうざ を ひとつ おねがいします。|Dos. Dos ramen de soja y una de gyōza, por favor.', 'Nagi|おいしい！ また きましょう。|¡Qué rico! Volvamos otro día.'),
        terms('En el restaurante', 'おなか が すきました|tengo hambre', 'のど が かわきました|tengo sed', 'なんめいさま|cuántas personas (formal)', 'ふたり|dos personas', 'ちゅうもん|pedido', 'おかいけい|la cuenta', 'おおもり|ración grande', 'また|otra vez'),
        cultura('Sorber no es de mala educación', 'Los fideos se sorben haciendo ruido: enfría el caldo y es señal de que están buenos. En muchos locales de ramen se paga antes, en una máquina de tiques junto a la entrada, y se entrega el tique al cocinero.'),
        ojo('«Tener hambre» no usa «tener»', 'Se dice «el estómago se ha vaciado»: {おなか が すきました}. Y la sed, «la garganta se ha secado»: {のど が かわきました}.'),
      ], [
        reply('Camarero|なんめいさま です か。|¿Cuántos son?', ['さんにん です。', 'みっつ です。', 'さん です。'], 'Las personas se cuentan con {にん}: {さんにん}.', '{みっつ} es para objetos, no para personas.'),
        q('Has terminado de comer. ¿Cómo pides la cuenta?', ['おかいけい を おねがいします。', 'おなか が すきました。', 'ちゅうもん を ください。'], '{おかいけい} es «la cuenta».'),
      ])),
    ],
  },
  {
    id: 'accion', name: 'Acción', jp: 'かぜきりどうじょう', color: '#f08a5d',
    tagline: 'Dōjō Kazekiri: nadie llega fuerte, todos se van distintos.',
    desc: 'Entrenamientos al amanecer, rivales y promesas. Practica órdenes, ánimo, partes del cuerpo y determinación.',
    cast: [
      { name: 'Rikka', jp: 'りっか', role: 'Capitana del dōjō', bio: 'Entrena el doble que nadie y lo niega si se lo preguntas.', look: { skin: '#eccab2', hair: '#c9423f', eyes: '#e0a23a', style: 'coleta', extra: 'cinta' } },
      { name: 'Maestro Gen', jp: 'げんせんせい', role: 'Maestro', bio: 'Dice tres palabras al día. Las tres suelen ser «otra vez».', look: { skin: '#dcc0a8', hair: '#cfd2dc', eyes: '#4b4f66', style: 'corto' } },
    ],
    scenes: [
      scene('m5', lesson('acc-entreno', 'Primer entrenamiento', 'けいこ', 'Entender órdenes cortas, animar y nombrar partes del cuerpo.', [
        p('Las seis de la mañana. El suelo de madera está helado y Rikka ya ha terminado de calentar cuando tú llegas.'),
        dlg('En el tatami', 'Gen|はじめ！|¡Empezad!', 'Rikka|て を あげて ください。 あし を ひらいて。|Sube las manos. Abre las piernas.', 'Tú|こう です か。|¿Así?', 'Rikka|ちがいます。 もっと ひくく。 もう いちど！|No. Más bajo. ¡Otra vez!', 'Gen|…よし。 やめ。|…Bien. Parad.', 'Rikka|はじめて に して は いい です よ。 がんばって ください。|Para ser la primera vez, no está mal. Ánimo.'),
        terms('En el dōjō', 'はじめ|¡empezad!', 'やめ|¡parad!', 'もう いちど|otra vez', 'がんばって|ánimo', 'て|mano', 'あし|pierna; pie', 'あたま|cabeza', 'からだ|cuerpo', 'れんしゅう|práctica, entrenamiento'),
        ojo('El japonés del anime de acción no es el de la calle', 'Órdenes secas como {はじめ！} o {やめ！} son propias del dōjō, y gritos como {がんばれ！} o {やめろ！} suenan bruscos fuera de un combate o de un partido. En la vida diaria se pide con {〜て ください} y se anima con {がんばって ください}.'),
        tip('ちがいます', 'Literalmente «es diferente». Se usa para decir «no es así» o «te equivocas» sin sonar tan tajante como un «no».'),
      ], [
        q('Un compañero de trabajo tiene mañana un examen importante. ¿Cómo le animas?', ['がんばって ください。', 'がんばれ！', 'やめ！'], 'En la vida real, a un compañero se le anima con la forma cortés.', { pitfall: '{がんばれ} es un grito de grada o de anime: con un compañero suena brusco.' }),
        reply('Rikka|もう いちど！|¡Otra vez!', ['はい！', 'いいえ、 けっこう です。', 'どういたしまして。'], 'En un entrenamiento se responde con un {はい} claro y se repite.'),
      ])),
      scene('m6', lesson('acc-desafio', 'El desafío', 'しょうぶ', 'Expresar determinación, hablar de ganar y perder y hacer una promesa.', [
        p('El torneo regional es dentro de un mes. El rival de Rikka, que la venció el año pasado, acaba de inscribirse.'),
        dlg('Después del entrenamiento', 'Tú|きょねん、 まけました か。|¿Perdiste el año pasado?', 'Rikka|はい。 でも、 ことし は ぜったい に かちます。|Sí. Pero este año gano seguro.', 'Tú|こわくない です か。|¿No te da miedo?', 'Rikka|こわい です よ。 でも、 あきらめません。 なかま が います から。|Claro que da miedo. Pero no me rindo. Porque tengo compañeros.', 'Gen|…つよく なった な。|…Te has hecho fuerte.'),
        terms('Ganar, perder, no rendirse', 'しょうぶ|combate, duelo', 'かちます|ganar', 'まけます|perder', 'ぜったい に|sin falta, pase lo que pase', 'あきらめません|no rendirse', 'なかま|compañeros, camaradas', 'まもります|proteger', 'やくそく|promesa', 'つよく なります|hacerse fuerte'),
        tip('〜く なります: llegar a ser', 'Un adjetivo い con {く なります} expresa un cambio: {つよく なります} (hacerse fuerte), {さむく なります} (empezar a hacer frío). Con adjetivos な y nombres se usa {に なります}: {げんき に なります}.'),
        cultura('がんばります', 'Es una de las palabras más repetidas de Japón. No promete un resultado, sino esfuerzo: «daré lo mejor de mí». Se dice antes de un examen, de un proyecto o de un primer día de trabajo.'),
      ], [
        q('«Este año gano seguro» se dice…', ['ことし は ぜったい に かちます。', 'ことし は ぜったい に まけます。', 'きょねん は かちました。'], '{かちます} es «ganar» y {ぜったい に} refuerza la determinación.'),
        q('«Hacerse fuerte» se dice…', ['つよく なります', 'つよい なります', 'つよい に なります'], 'Adjetivo い: se cambia {い} por {く} y se añade {なります}.', { pitfall: '{に なります} es para adjetivos な y nombres.' }),
      ])),
    ],
  },
  {
    id: 'scifi', name: 'Ciencia ficción', jp: 'ほしくずステーション', color: '#4fc0c0',
    tagline: 'Estación Hoshikuzu, órbita baja. Faltan 72 horas para el relevo.',
    desc: 'Una estación orbital, una ingeniera sin dormir y un robot demasiado educado. Practica katakana, tecnología y peticiones precisas.',
    cast: [
      { name: 'Dra. Akari', jp: 'あかり', role: 'Ingeniera jefe', bio: 'Arregla reactores con cinta adhesiva y café frío.', look: { skin: '#e8c9b0', hair: '#3f8f9b', eyes: '#f2b63c', style: 'bob', extra: 'visor' } },
      { name: 'UNI-7', jp: 'ユニ', role: 'Unidad de asistencia', bio: 'Habla en el registro más formal que existe, incluso para dar malas noticias.', look: { skin: '#dfe6f2', hair: '#9aa6c9', eyes: '#4fc0c0', style: 'punta', extra: 'cascos' } },
    ],
    scenes: [
      scene('m4', lesson('sci-despertar', 'Despertar en la estación', 'めざめ', 'Leer vocabulario técnico en katakana y entender un informe de estado.', [
        p('Las luces del módulo se encienden de golpe. Una voz sintética, exquisitamente educada, te da los buenos días.'),
        dlg('Informe de la mañana', 'UNI-7|おはようございます。 ユニ と もうします。|Buenos días. Me llamo Uni.', 'Akari|ユニ、 システム は どう です か。|Uni, ¿cómo está el sistema?', 'UNI-7|エネルギー は ろくじゅう パーセント です。 コンピューター は せいじょう です。|La energía está al sesenta por ciento. El ordenador funciona con normalidad.', 'Akari|ドア を あけて ください。|Abre la puerta.', 'UNI-7|かしこまりました。 パスワード を おねがいします。|Entendido. La contraseña, por favor.'),
        terms('Tecnología en katakana', 'ロボット|robot', 'コンピューター|ordenador', 'システム|sistema', 'エネルギー|energía', 'データ|datos', 'パスワード|contraseña', 'スイッチ|interruptor', 'パーセント|por ciento', 'せいじょう|normal, correcto'),
        tip('El katakana es el alfabeto de la tecnología', 'Casi todo el vocabulario informático viene del inglés. Si lees el katakana en voz alta, a menudo reconoces la palabra: {データ} → «data», {エネルギー} viene del alemán «Energie».'),
        ojo('〜と もうします', 'Es la manera humilde de decir tu nombre, más formal que {です}. UNI-7 la usa con todo el mundo; tú la necesitarás en entrevistas y presentaciones de trabajo.'),
      ], [
        q('¿Qué significa パスワード?', ['Contraseña', 'Pasaporte', 'Pasillo'], 'Del inglés «password».', { jp: 'パスワード' }),
        reply('UNI-7|パスワード を おねがいします。|La contraseña, por favor.', ['はい、 ちょっと まって ください。', 'いらっしゃいませ。', 'かしこまりました。'], 'Pides un momento con {ちょっと まって ください}.', '{かしこまりました} es lo que dice quien recibe la orden, no quien la da.'),
      ])),
      scene('m5', lesson('sci-averia', 'Avería en el módulo 3', 'こしょう', 'Explicar que algo no funciona, pedir una reparación y hablar del tiempo que queda.', [
        p('Alarma amarilla. El módulo 3 ha perdido presión y el relevo llega en setenta y dos horas. UNI-7 lo comunica con la calma de quien anuncia el menú.'),
        dlg('En la sala de control', 'UNI-7|もうしわけ ございません。 モジュール スリー の ドア が うごきません。|Le ruego me disculpe. La puerta del módulo tres no se mueve.', 'Akari|また？ でんき は あります か。|¿Otra vez? ¿Hay corriente?', 'UNI-7|いいえ。 スイッチ が こわれました。|No. El interruptor se ha roto.', 'Akari|わかった。 わたし が なおします。 どうぐ を もって きて ください。|Vale. Lo arreglo yo. Tráeme las herramientas.', 'UNI-7|かしこまりました。 じかん は あと にじかん です。|Entendido. Quedan dos horas.'),
        terms('Averías', 'こわれました|se ha roto', 'うごきません|no se mueve, no funciona', 'なおします|arreglar', 'でんき|electricidad; luz', 'どうぐ|herramienta', 'じかん|tiempo', 'あと|quedan; después', 'みらい|futuro', 'かがく|ciencia'),
        cultura('Tres niveles de disculpa', '{ごめんなさい} es personal, {すみません} sirve para casi todo y {もうしわけ ございません} es la disculpa formal de empresas y servicios. UNI-7 solo conoce la tercera.'),
        tip('Sirve igual en tu piso', 'Estas frases son las que usarás cuando se estropee algo en casa: {エアコン が うごきません}, {でんき が つきません}. Las verás de nuevo en «Mi futuro en Japón».'),
      ], [
        q('La lavadora no funciona. ¿Cómo lo dices?', ['せんたくき が うごきません。', 'せんたくき を なおします。', 'せんたくき が あります。'], '{うごきません} es «no se mueve», «no funciona».'),
        reply('Akari|スイッチ は どう です か。|¿Cómo está el interruptor?', ['こわれました。', 'なおします か。', 'せいじょう じゃ ありました。'], '{こわれました} es «se ha roto».'),
      ])),
    ],
  },
];
