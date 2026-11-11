import { cultura, dlg, frases, lesson, listen, ojo, p, q, reply, terms, tip } from '../helpers';
import type { Unit } from '../types';

export const conversationUnits: Unit[] = [
  {
    id: 'm6-u1', title: 'Hablar de ti',
    lessons: [
      lesson('con-presentarte', 'Presentarte', 'じこしょうかい', 'Hacer una presentación completa: origen, ocupación, aficiones y motivo para estudiar japonés.', [
        p('En clase, en el trabajo o en una residencia te pedirán un {じこしょうかい}: una presentación breve delante de todos. Con seis frases quedas muy bien.'),
        dlg('Presentación en clase', 'Profesora|では、 じこしょうかい を おねがいします。|Bien, preséntate, por favor.', 'Diego|はじめまして。 ディエゴ です。|Encantado. Soy Diego.', 'Diego|メキシコ から きました。 だいがくせい です。|Vengo de México. Soy universitario.', 'Diego|しゅみ は りょうり と おんがく です。|Mis aficiones son la cocina y la música.', 'Diego|にほんご は まだ じょうず じゃ ありません が、 がんばります。|Todavía no hablo bien japonés, pero me esforzaré.', 'Diego|どうぞ よろしく おねがいします。|Encantado de conoceros.'),
        terms('Vocabulario', 'しゅみ|afición', 'だいがくせい|estudiante universitario', 'しごと|trabajo', 'まだ|todavía', 'じょうず|que se da bien, hábil', 'がんばります|esforzarse, dar lo mejor', 'すんでいます|vivir (en un lugar)'),
        frases('Frases para adaptar', 'いま、 マドリード に すんでいます。|Ahora vivo en Madrid.', 'しごと は エンジニア です。|Trabajo de ingeniero.', 'にほん の アニメ が すき です。|Me gusta el anime japonés.'),
        cultura('La modestia es parte de la fórmula', 'Decir «todavía no se me da bien» no es falsa humildad: es lo esperado. Si alguien elogia tu japonés ({にほんご が じょうず です ね}), lo natural es responder {いいえ、 まだまだ です}: «qué va, aún me falta mucho».'),
      ], [
        reply('Compañera|にほんご が じょうず です ね。|¡Qué bien hablas japonés!', ['いいえ、 まだまだ です。', 'はい、 じょうず です。', 'どういたしまして。'], 'Se responde quitándole importancia al elogio.', 'Aceptar el elogio con un «sí, se me da bien» suena presuntuoso.'),
        q('¿Cómo dices «Mi afición es la música»?', ['しゅみ は おんがく です。', 'おんがく は しゅみ が です。', 'しゅみ を おんがく します。'], 'Patrón A は B です: {しゅみ は 〜 です}.'),
      ]),
      lesson('con-gustos', 'Hablar de tus gustos', 'すき・きらい', 'Decir qué te gusta, qué no, y preguntar por los gustos de otra persona.', [
        p('Lo que gusta se marca con {が}, y {すき} funciona como un adjetivo な: «el sushi es gustado».'),
        terms('Escala de gustos', 'だいすき|que encanta', 'すき|que gusta', 'あまり すき じゃ ありません|no gusta mucho', 'きらい|que disgusta|Muy directo: úsalo con cuidado.', 'にがて|que no se le da bien o no le va|Forma suave de decir que algo no te gusta.'),
        dlg('En la cafetería', 'Yuki|ディエゴさん は どんな たべもの が すき です か。|Diego, ¿qué comida te gusta?', 'Diego|ラーメン が だいすき です。 ゆきさん は？|Me encanta el ramen. ¿Y a ti, Yuki?', 'Yuki|わたし も すき です。 でも、 からい もの は ちょっと にがて です。|A mí también. Pero el picante no me va mucho.', 'Diego|そう です か。 メキシコ の りょうり は からい です よ。|¿Ah, sí? La comida mexicana pica, ¿eh?'),
        terms('Vocabulario', 'たべもの|comida', 'からい|picante', 'あまい|dulce', 'もの|cosa', 'でも|pero', 'スポーツ|deporte', 'どうぶつ|animal'),
        ojo('きらい es más fuerte de lo que parece', 'Decir {きらい です} de la comida que te ofrecen o de algo que le gusta al otro resulta agresivo. {あまり すき じゃ ありません} y {にがて です} dicen lo mismo sin herir.'),
        tip('Devolver la pregunta', 'Para decir «¿y tú?» basta con el nombre de la otra persona y {は？} con entonación ascendente: {ゆきさん は？}. Evita {あなた}: con alguien cuyo nombre conoces suena distante.'),
      ], [
        reply('Yuki|どんな スポーツ が すき です か。|¿Qué deporte te gusta?', ['サッカー が すき です。', 'サッカー を すき です。', 'はい、 すき です。'], 'Con {すき}, lo que gusta lleva {が}.', 'A una pregunta con {どんな} no se contesta sí o no.'),
        q('Te ofrecen nattō y no te gusta. ¿Cuál es la respuesta más adecuada?', ['すみません、 なっとう は ちょっと にがて です。', 'なっとう は きらい です。', 'いいえ、 たべません。'], '{にがて} permite rechazar sin ofender a quien te lo ofrece.'),
      ]),
      lesson('con-aficiones', 'Hablar de tus aficiones', 'しゅみ', 'Contar qué haces en tu tiempo libre, con qué frecuencia, y proponer planes.', [
        dlg('El lunes en la oficina', 'Sato|しゅうまつ は なに を しました か。|¿Qué hiciste el fin de semana?', 'Lucía|ともだち と やま に のぼりました。 さとうさん は？|Subí a la montaña con unos amigos. ¿Y usted?', 'Sato|うち で ゲーム を しました。 よく やま に いきます か。|Yo jugué a videojuegos en casa. ¿Va mucho a la montaña?', 'Lucía|ときどき いきます。 こんど いっしょに いきませんか。|Voy a veces. ¿Vamos juntos la próxima vez?', 'Sato|いい です ね。 ぜひ。|Buena idea. Encantado.'),
        terms('Frecuencia', 'いつも|siempre', 'よく|a menudo', 'ときどき|a veces', 'あまり|no mucho (con negación)', 'ぜんぜん|nunca, nada (con negación)'),
        terms('Aficiones', 'どくしょ|lectura', 'りょこう|viajes', 'ゲーム|videojuegos', 'え を かきます|dibujar', 'やま に のぼります|subir a la montaña', 'うた を うたいます|cantar', 'こんど|la próxima vez', 'ぜひ|sin falta, con mucho gusto'),
        frases('Cuenta lo tuyo', 'ひま な とき、 よく ほん を よみます。|Cuando tengo tiempo libre, suelo leer.', 'スポーツ は あまり しません。|No hago mucho deporte.', 'しゅうまつ は たいてい うち に います。|Los fines de semana normalmente estoy en casa.'),
        ojo('あまり y ぜんぜん van con verbo negativo', '«No hago mucho deporte» es {あまり しません}. El «no» ya está en el verbo.'),
      ], [
        reply('Sato|こんど いっしょに カラオケ に いきませんか。|¿Vamos juntos al karaoke la próxima vez?', ['いい です ね。 ぜひ。', 'はい、 いきません。', 'カラオケ です。'], 'Se acepta una invitación con {いいですね} y {ぜひ}.'),
        q('«A veces veo películas» se dice…', ['ときどき えいが を みます。', 'ぜんぜん えいが を みます。', 'えいが を ときどき です。'], '{ときどき} va delante y el verbo, en afirmativo.', { pitfall: '{ぜんぜん} exige un verbo negativo.' }),
      ]),
    ],
  },
  {
    id: 'm6-u2', title: 'Desenvolverte',
    lessons: [
      lesson('con-direcciones', 'Preguntar direcciones', 'みち', 'Preguntar cómo llegar a un sitio y entender las indicaciones.', [
        dlg('En la calle', 'Ana|すみません、 えき は どこ です か。|Perdone, ¿dónde está la estación?', 'Señora|えき です か。 この みち を まっすぐ いって ください。|¿La estación? Siga recto por esta calle.', 'Señora|ふたつめ の しんごう を みぎ に まがって ください。|En el segundo semáforo, gire a la derecha.', 'Señora|ぎんこう の となり です。 あるいて ごふん ぐらい です。|Está al lado del banco. Son unos cinco minutos andando.', 'Ana|わかりました。 ありがとうございました。|Entendido. Muchas gracias.'),
        terms('Indicaciones', 'まっすぐ|recto', 'みぎ|derecha', 'ひだり|izquierda', 'みち|calle, camino', 'しんごう|semáforo', 'かど|esquina', 'まがります|girar', 'あるいて|andando'),
        terms('Posiciones', 'となり|al lado', 'まえ|delante', 'うしろ|detrás', 'ちかく|cerca', 'むかい|enfrente'),
        frases('Preguntas útiles', 'この ちかく に コンビニ は あります か。|¿Hay una tienda 24 horas por aquí cerca?', 'ここ から とおい です か。|¿Está lejos de aquí?', 'ちず を かいて ください。|Dibújeme un mapa, por favor.'),
        tip('〜て ください', 'Las indicaciones se dan con el verbo en forma て + {ください}: {いって ください} (vaya), {まがって ください} (gire). La forma て la estudiarás en el módulo intermedio; de momento reconócela como «haga esto, por favor».'),
        cultura('Las calles no tienen nombre', 'Salvo las grandes avenidas, las calles japonesas no tienen nombre y las direcciones van por distritos y manzanas numeradas. Por eso las indicaciones se dan con referencias: el semáforo, el banco, la tienda.'),
      ], [
        listen('ひだり に まがって ください。', '¿Hacia dónde tienes que girar?', ['A la izquierda', 'A la derecha', 'Sigue recto'], '{ひだり} es «izquierda»; {みぎ}, «derecha».', 'Mucha gente las confunde al principio: {みぎ} y «derecha» comparten el sonido «i».'),
        q('«Está al lado del banco» se dice…', ['ぎんこう の となり です。', 'となり の ぎんこう です。', 'ぎんこう と となり です。'], 'Referencia + {の} + posición.', { pitfall: '{となり の ぎんこう} significa «el banco de al lado».' }),
        reply('Ana|すみません、 この ちかく に トイレ は あります か。|Perdone, ¿hay un baño por aquí?', ['はい、 あそこ に あります。', 'はい、 トイレ です。', 'いいえ、 います。'], 'Se responde con el lugar y {あります}, porque un baño es una cosa.'),
      ]),
      lesson('con-mantener', 'Mantener una conversación', 'あいづち', 'Mostrar que escuchas, pedir que repitan y ganar tiempo cuando no entiendes.', [
        p('En japonés quien escucha habla casi tanto como quien cuenta. Las pequeñas respuestas que demuestran atención se llaman {あいづち}. Si te quedas callado, tu interlocutor pensará que no le sigues.'),
        terms('Para mostrar que escuchas', 'そう です か|¿ah, sí? ya veo', 'そう です ね|sí, es verdad', 'へえ|¡anda! (sorpresa)', 'なるほど|ya entiendo', 'ほんとう です か|¿de verdad?', 'いい です ね|¡qué bien!'),
        terms('Cuando no entiendes', 'もう いちど おねがいします|otra vez, por favor', 'ゆっくり おねがいします|más despacio, por favor', 'わかりません|no entiendo', 'わかりました|entendido', 'えーと|a ver… (para ganar tiempo)'),
        dlg('Un vecino te cuenta sus vacaciones', 'Vecino|せんしゅう、 ほっかいどう に いきました。|La semana pasada fui a Hokkaidō.', 'Tú|へえ、 いい です ね。 どう でした か。|¡Anda, qué bien! ¿Qué tal?', 'Vecino|さむかった です が、 たべもの が おいしかった です。|Hacía frío, pero la comida estaba muy rica.', 'Tú|そう です か。 すみません、 「さむかった」 は どういう いみ です か。|Ya veo. Perdone, ¿qué significa «samukatta»?'),
        frases('Preguntar por el idioma', '「カサ」 は にほんご で なん です か。|¿Cómo se dice «casa» en japonés?', 'これ は どういう いみ です か。|¿Qué significa esto?'),
        ojo('はい no siempre es «estoy de acuerdo»', 'Como aizuchi, {はい} significa «te escucho», no «acepto». Por eso un «sí, sí» durante una negociación no cierra ningún trato.'),
      ], [
        q('Te hablan demasiado rápido. ¿Qué dices?', ['すみません、 ゆっくり おねがいします。', 'わかりました。', 'そう です ね。'], 'Pides que hablen despacio con {ゆっくり}.'),
        reply('Vecino|きのう、 あたらしい くるま を かいました。|Ayer me compré un coche nuevo.', ['へえ、 いい です ね。', 'わかりません。', 'どういたしまして。'], 'Se reacciona con sorpresa e interés.', 'Quedarse en silencio se interpreta como desinterés.'),
        q('¿Qué son los あいづち?', ['Respuestas breves que muestran que escuchas', 'Fórmulas de despedida', 'Preguntas formales'], '{そうですか}, {へえ}, {なるほど}… mantienen viva la conversación.'),
      ]),
      lesson('con-opiniones', 'Expresar opiniones', 'いけん', 'Dar tu opinión, pedir la de otros y discrepar con suavidad.', [
        p('Para opinar se añade {と おもいます} («pienso que») al final. Suaviza cualquier afirmación, y en japonés afirmar con rotundidad resulta poco elegante.'),
        frases('Opinar', 'この えいが は おもしろい と おもいます。|Creo que esta película es interesante.', 'にほんご の かんじ は むずかしい と おもいます。|Creo que los kanji son difíciles.', 'どう おもいます か。|¿Qué opinas?', 'わたし も そう おもいます。|Yo también lo creo.'),
        dlg('Después de una reunión', 'Mori|あたらしい けいかく、 どう おもいます か。|¿Qué opinas del nuevo plan?', 'Pablo|いい と おもいます。 でも、 すこし たかい と おもいます。|Me parece bien. Pero creo que es un poco caro.', 'Mori|そう です ね。 わたし も そう おもいます。|Es verdad. Yo pienso lo mismo.'),
        terms('Vocabulario', 'おもいます|pensar, creer', 'いけん|opinión', 'けいかく|plan', 'すこし|un poco', 'たぶん|probablemente', 'つまらない|aburrido', 'たいせつ|importante'),
        cultura('Discrepar sin decir «no»', 'El desacuerdo se expresa en dos tiempos: primero se reconoce lo dicho ({そう です ね…}) y después se introduce la objeción con {でも} o con {ちょっと…}. Un «no estoy de acuerdo» directo se reserva para discusiones serias.'),
        ojo('Delante de と おもいます va la forma simple', 'Con adjetivos い no cambia nada: {たかい と おもいます}. Con nombres y adjetivos な se añade {だ}: {べんり だ と おもいます}.'),
      ], [
        q('«Creo que es difícil» se dice…', ['むずかしい と おもいます。', 'むずかしい を おもいます。', 'おもいます むずかしい。'], 'Opinión + {と おもいます}.'),
        reply('Mori|この レストラン、 どう おもいます か。|¿Qué te parece este restaurante?', ['おいしい と おもいます。', 'はい、 おもいます。', 'レストラン です。'], 'Se da la valoración seguida de {と おもいます}.'),
        q('No estás de acuerdo con tu compañero. ¿Cuál es la forma más natural de empezar?', ['そう です ね。 でも…', 'いいえ、 ちがいます。', 'わかりません。'], 'Primero se reconoce lo dicho y después se matiza.', { pitfall: '{ちがいます} («es incorrecto») es para corregir datos, no opiniones.' }),
      ]),
      lesson('con-ayuda', 'Pedir ayuda', 'たすけて', 'Pedir ayuda en un apuro, explicar un problema sencillo y ofrecer la tuya.', [
        terms('Frases de emergencia', 'たすけて ください|ayúdeme, por favor', 'てつだって ください|écheme una mano, por favor', 'こまっています|tengo un problema', 'みち に まよいました|me he perdido', 'だいじょうぶ です か|¿está bien?', 'だいじょうぶ です|estoy bien; no pasa nada'),
        dlg('En la estación', 'Tú|すみません、 ちょっと いい です か。|Perdone, ¿tiene un momento?', 'Empleado|はい、 どう しました か。|Sí, ¿qué le ocurre?', 'Tú|さいふ を なくしました。|He perdido la cartera.', 'Empleado|それ は たいへん です ね。 どこ で なくしました か。|Vaya, qué faena. ¿Dónde la ha perdido?', 'Tú|たぶん でんしゃ の なか です。|Probablemente dentro del tren.', 'Empleado|わかりました。 こちら へ どうぞ。|Entendido. Acompáñeme, por favor.'),
        terms('Vocabulario', 'なくしました|he perdido (algo)', 'たいへん|grave; qué faena', 'なか|dentro', 'えいご|inglés', 'はなせます|poder hablar', 'けいさつ|policía', 'こうばん|puesto de policía de barrio'),
        frases('Más frases útiles', 'えいご が はなせます か。|¿Habla inglés?', 'にほんご が あまり わかりません。|No entiendo mucho japonés.', 'ここ に かいて ください。|Escríbalo aquí, por favor.'),
        cultura('El こうばん', 'En cada barrio hay un pequeño puesto de policía. Sirve para denunciar pérdidas, pero también para preguntar una dirección: los agentes tienen mapas detallados y es habitual pedirles ayuda. Los objetos perdidos se devuelven con una frecuencia sorprendente.'),
        tip('ちょっと いい です か', 'Es la manera natural de abordar a alguien: «¿tiene un momento?». Siempre precedida de {すみません}.'),
      ], [
        q('Has perdido el móvil. ¿Qué dices?', ['スマホ を なくしました。', 'スマホ が あります。', 'スマホ を かいました。'], '{なくしました} es «he perdido».'),
        reply('Empleado|どう しました か。|¿Qué le ocurre?', ['みち に まよいました。', 'だいじょうぶ です か。', 'はい、 そう です。'], 'Explicas tu problema: «me he perdido».'),
        listen('だいじょうぶ です か。', '¿Qué te están preguntando?', ['Si estás bien', 'Dónde vives', 'Si hablas japonés'], '{だいじょうぶ です か} pregunta si todo va bien.'),
      ]),
      lesson('con-comprender', 'Comprender las respuestas', 'こたえ', 'Interpretar respuestas indirectas y las fórmulas que oirás en tiendas y servicios.', [
        p('Entender japonés no es solo vocabulario: muchas respuestas dicen una cosa y significan otra. Estas son las que más confunden.'),
        terms('Lo que dicen y lo que quieren decir', 'いい です|no, gracias; está bien así|Como respuesta a un ofrecimiento suele ser un rechazo.', 'けっこう です|no, gracias|Rechazo educado y firme.', 'ちょっと…|me temo que no|La frase queda sin terminar a propósito.', 'かんがえて おきます|me lo pensaré|Muy a menudo es un «no» cortés.', 'むずかしい です ね|va a ser que no|Literalmente «es difícil».'),
        terms('Lo que oirás en tiendas', 'いらっしゃいませ|bienvenido|No hace falta responder.', 'しょうしょう おまち ください|espere un momento, por favor', 'かしこまりました|entendido (muy formal)', 'おまたせ しました|gracias por esperar', 'ポイントカード は おもち です か|¿tiene tarjeta de puntos?', 'ふくろ は いります か|¿necesita bolsa?'),
        dlg('En la caja del supermercado', 'Cajera|ふくろ は いります か。|¿Necesita bolsa?', 'Tú|いいえ、 だいじょうぶ です。|No, no hace falta.', 'Cajera|ポイントカード は おもち です か。|¿Tiene tarjeta de puntos?', 'Tú|いいえ、 ありません。|No, no tengo.', 'Cajera|かしこまりました。 せん にひゃく えん です。|Entendido. Son 1.200 yenes.'),
        ojo('だいじょうぶ です significa «no, gracias»', 'Si te ofrecen bolsa y dices {だいじょうぶ です}, estás diciendo que no la necesitas. Para aceptar, di {おねがいします}.'),
        tip('No hace falta entenderlo todo', 'El lenguaje de los dependientes es keigo de manual y siempre igual. Con reconocer cinco o seis fórmulas sabrás qué te preguntan aunque no captes cada palabra.'),
      ], [
        q('Ofreces ayuda y te responden «いいです». ¿Qué significa aquí?', ['No, gracias', 'Sí, por favor', 'Está muy bien hecho'], 'Ante un ofrecimiento, {いい です} suele ser un rechazo educado.', { jp: 'いい です。', pitfall: 'Traducirlo siempre como «bien» lleva a malentendidos.' }),
        reply('Cajera|ふくろ は いります か。|¿Necesita bolsa?', ['おねがいします。', 'いらっしゃいませ。', 'かしこまりました。'], 'Para aceptar se dice {おねがいします}.', '{いらっしゃいませ} y {かしこまりました} son frases del personal, no del cliente.'),
        q('Pides un cambio de turno y tu jefe responde «むずかしいですね…». ¿Qué te está diciendo?', ['Que no va a ser posible', 'Que lo ve complicado pero lo hará', 'Que no ha entendido'], 'Es una negativa indirecta. Insistir se consideraría de mala educación.', { jp: 'むずかしい です ね…' }),
        listen('しょうしょう おまち ください。', '¿Qué te piden?', ['Que esperes un momento', 'Que pagues', 'Que te sientes'], '{しょうしょう おまち ください} es la fórmula formal para «espere un momento».'),
      ]),
    ],
  },
];
