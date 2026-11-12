import { cultura, dlg, fill, frases, h, lesson, listen, ojo, order, p, q, reply, table, terms, tip } from './helpers';
import type { Unit } from './types';

/*
 * «Formal e informal»: los registros del japonés.
 * Informal (タメ口), cortés (丁寧語) y keigo (尊敬語 y 謙譲語), con coloquialismos reales
 * y la advertencia de que el habla de los personajes de anime no es la de la calle.
 */

export type Tone = 'base' | 'informal' | 'formal';

export interface RegisterUnit extends Unit {
  tone: Tone;
  desc: string;
}

export const REGISTER_COLOR = '#ef7f8e';

export const registerUnits: RegisterUnit[] = [
  {
    id: 'reg-u1', title: 'Los tres registros', tone: 'base',
    desc: 'Qué son, en qué se diferencian y cómo saber cuál toca.',
    lessons: [
      lesson('reg-mapa', 'Informal, cortés y keigo', '三つの話し方', 'Reconocer los tres registros y saber para qué sirve cada uno.', [
        p('En español eliges entre «tú» y «usted». En japonés esa elección afecta a **toda la frase**: cambian los verbos, algunas palabras e incluso la manera de decir «sí». Hay tres escalones.'),
        table(['Registro', 'Nombre', 'Con quién', '«Comer»'],
          ['Informal', '{タメ口[ぐち]}', 'amigos, familia, gente más joven', '{食[た]べる}'],
          ['Cortés', '{丁寧語[ていねいご]}', 'desconocidos, compañeros, casi todo el mundo', '{食[た]べます}'],
          ['Keigo', '{敬語[けいご]}', 'clientes, jefes, profesores, entrevistas', '{召[め]し上[あ]がります} (el otro), {いただきます} (yo)']),
        frases('La misma pregunta, tres veces', '明日[あした] 行[い]く？|¿Vas mañana? (a un amigo)', '明日[あした] 行[い]きます か。|¿Va usted mañana? (cortés)', '明日[あした] いらっしゃいます か。|¿Irá usted mañana? (keigo)'),
        terms('Las palabras para hablar de esto', 'タメ口[ぐち]|habla informal, de tú a tú', '丁寧語[ていねいご]|lenguaje cortés (です y ます)', '敬語[けいご]|lenguaje honorífico', '尊敬語[そんけいご]|keigo que eleva al otro', '謙譲語[けんじょうご]|keigo que te rebaja a ti', '先輩[せんぱい]|compañero veterano', '後輩[こうはい]|compañero más nuevo', '目上[めうえ]|persona de rango superior'),
        ojo('Informal no significa maleducado', 'Cada registro es correcto en su sitio. Hablar en keigo a un amigo íntimo suena frío o irónico, igual que tutear a un cliente suena grosero. Lo que se valora es **acertar con la situación**.'),
        tip('Tu red de seguridad', 'Si dudas, usa {です} y {ます}. El registro cortés nunca ofende: como mucho, la otra persona te dirá que puedes relajarte.'),
      ], [
        q('Quieres preguntar a una profesora si ya ha comido. ¿Qué forma de «comer» usas?', ['召[め]し上[あ]がりました か', '食[た]べた？', 'いただきました か'], '{召[め]し上[あ]がります} es el honorífico: eleva la acción de la profesora.', { pitfall: '{いただきます} es humilde: solo sirve para lo que comes tú.' }),
        q('¿Qué es el タメ口?', ['El habla informal entre iguales', 'El lenguaje que se usa con los clientes', 'Un dialecto de Osaka'], '{タメ口[ぐち]} es hablar de tú a tú, sin {です} ni {ます}.', { jp: 'タメ口[ぐち]' }),
        q('No sabes qué registro usar con alguien que acabas de conocer. ¿Qué haces?', ['Usar です y ます', 'Hablar en informal para parecer cercano', 'Usar el keigo más elevado posible'], 'El registro cortés es la opción segura con desconocidos.'),
      ]),
      lesson('reg-elegir', 'Con quién usar cada registro', '使い分け', 'Decidir el registro según la persona, su rango y la confianza.', [
        p('Tres preguntas deciden el registro: **¿es de mi grupo o de fuera?**, **¿está por encima, a mi altura o por debajo?** y **¿cuánta confianza tenemos?**'),
        table(['Con…', 'Registro habitual', 'Detalle'],
          ['Familia y amigos íntimos', 'Informal', ''],
          ['Compañeros de clase de tu edad', 'Informal', 'a menudo desde el primer día'],
          ['Un {先輩[せんぱい]} del club o del trabajo', 'Cortés', 'aunque solo te lleve un año'],
          ['Desconocidos, vecinos, dependientes', 'Cortés', 'ellos te hablarán en keigo; tú respondes con {です} y {ます}'],
          ['Profesores, jefes, clientes', 'Keigo', 'sobre todo al pedir, disculparte o presentarte'],
          ['Niños y mascotas', 'Informal', '']),
        cultura('うち y そと', 'El japonés divide el mundo en {うち} (los míos: mi familia, mi empresa) y {そと} (los de fuera). El keigo eleva a los de fuera y rebaja a los tuyos. Por eso, ante un cliente, hablas de tu propio jefe **sin** {さん} y con formas humildes.'),
        dlg('Dos compañeros nuevos de la academia', 'Yui|ルイスさん は 何歳[なんさい] です か。|Luis, ¿cuántos años tienes?', 'Tú|二十歳[はたち] です。 ゆいさん は？|Veinte. ¿Y tú, Yui?', 'Yui|え、 同[おな]い年[どし] だ！ じゃあ、 タメ口[ぐち] で いい よ。|¡Anda, tenemos la misma edad! Pues háblame de tú.', 'Tú|ほんと？ じゃあ、 そう する ね。|¿De verdad? Pues así lo hago.', 'Yui|うん、 よろしく ね。|Sí. Un placer.'),
        terms('Vocabulario', '初対面[しょたいめん]|primer encuentro', '年上[としうえ]|mayor que tú', '年下[としした]|más joven que tú', '同[おな]い年[どし]|de la misma edad', '上司[じょうし]|jefe, superior', 'お客様[きゃくさま]|cliente', 'うち|los míos; mi grupo', 'そと|fuera; los de fuera'),
        frases('Para negociar el registro', 'タメ口[ぐち] で 話[はな]しても いい です か。|¿Puedo hablarte de tú?', '敬語[けいご] じゃなくて いい です よ。|No hace falta que uses keigo.', 'タメ口[ぐち] で いい よ。|Háblame de tú.'),
        ojo('No bajes el registro por tu cuenta', 'Quien propone pasar al informal es la persona mayor o de más rango. Si lo haces tú primero con un {先輩[せんぱい]} o un jefe, parecerá un exceso de confianza.'),
      ], [
        reply('Yui|じゃあ、 タメ口[ぐち] で いい よ。|Pues háblame de tú.', ['ほんと？ じゃあ、 そう する ね。', 'かしこまりました。', 'いいえ、 敬語[けいご] です。'], 'Aceptas y pasas tú también al informal.', '{かしこまりました} es de dependiente a cliente: aquí sonaría a broma.'),
        q('Tu compañero de trabajo entró un año antes que tú. ¿Cómo le hablas?', ['En registro cortés, con です y ます', 'En informal, porque sois compañeros', 'Con el keigo que se usa con los clientes'], 'Es tu {先輩[せんぱい]}: se le habla en cortés aunque la diferencia sea pequeña.'),
        q('Un cliente pregunta por tu jefa, la señora Satō. ¿Cómo te refieres a ella?', ['佐藤[さとう]', '佐藤[さとう]さん', '佐藤[さとう]様[さま]'], 'Ante alguien de fuera, tu jefa pertenece a tu grupo ({うち}): se la nombra sin título.', { pitfall: 'Poner {さん} a alguien de tu propia empresa delante de un cliente es uno de los errores más típicos.' }),
      ]),
    ],
  },
  {
    id: 'reg-u2', title: 'Informal y coloquial', tone: 'informal',
    desc: 'Cómo se habla entre amigos: formas cortas, contracciones, reacciones y jerga.',
    lessons: [
      lesson('reg-inf-base', 'Hablar entre amigos', 'タメ口', 'Pasar una frase cortés a informal y mantener una charla entre amigos.', [
        p('El informal no es otro idioma: es el mismo japonés sin las terminaciones corteses. El verbo va en **forma diccionario**, {です} se convierte en {だ} o desaparece, y muchas partículas se omiten.'),
        table(['Cortés', 'Informal', 'Significado'],
          ['{行[い]きます}', '{行[い]く}', 'voy'],
          ['{行[い]きません}', '{行[い]かない}', 'no voy'],
          ['{行[い]きました}', '{行[い]った}', 'fui'],
          ['{学生[がくせい] です}', '{学生[がくせい] だ}', 'soy estudiante'],
          ['{そう です か}', '{そう なんだ}', 'ah, ¿sí?'],
          ['{はい} / {いいえ}', '{うん} / {ううん}', 'sí / no'],
          ['{すみません}', '{ごめん}', 'perdona']),
        dlg('Plan para esta tarde', 'Mika|今日[きょう]、 ひま？|¿Estás libre hoy?', 'Tú|うん、 ひま だ よ。 どうした の？|Sí, estoy libre. ¿Qué pasa?', 'Mika|映画[えいが] 見[み]に 行[い]かない？|¿Vamos a ver una peli?', 'Tú|いい ね！ 何時[なんじ] に する？|¡Vale! ¿A qué hora quedamos?', 'Mika|六時[ろくじ] は どう？|¿Qué tal a las seis?', 'Tú|オッケー。 じゃあ、 駅[えき] で ね。|OK. Pues en la estación.'),
        h('Qué cambia'),
        p('**Las preguntas** no llevan {か}: basta con subir la entonación ({行[い]く？}). **Las partículas** {は}, {が} y {を} se caen a menudo ({映画[えいが] 見[み]る？}). Y una invitación se hace con la forma negativa: {行[い]かない？}, «¿no vamos?».'),
        terms('Palabras del día a día', 'うん|sí (informal)', 'ううん|no (informal)', 'ごめん|perdona', 'ひま|libre, sin planes', 'じゃあね|hasta luego', 'またね|nos vemos', 'おはよう|buenos días (informal)', 'おつかれ|buen trabajo; hasta luego'),
        frases('Frases para amigos', '明日[あした] 何[なに] する？|¿Qué haces mañana?', 'もう ご飯[はん] 食[た]べた？|¿Ya has comido?', 'それ、 どこ で 買[か]った の？|¿Dónde te has comprado eso?', 'ごめん、 今日[きょう] は 行[い]けない。|Perdona, hoy no puedo ir.'),
        ojo('うん y ううん', '{うん} (sí) es corto y baja; {ううん} (no) es largo, y la voz sube y baja. Por escrito son casi iguales: escúchalos varias veces hasta distinguirlos.'),
      ], [
        q('¿Cuál es la versión informal de esta pregunta?', ['行[い]く？', '行[い]きます？', '行[い]く です か。'], 'Forma diccionario y entonación ascendente, sin {か}.', { jp: '行[い]きます か。', pitfall: '{行[い]く です か} mezcla registros y no existe.' }),
        fill('映画[えいが] 見[み]に ＿＿？', '¿Vamos a ver una peli? (invitación informal)', ['行[い]かない', '行[い]きません', '行[い]った'], 'Entre amigos se invita con la forma negativa informal: {行[い]かない？}.'),
        reply('Mika|今日[きょう]、 ひま？|¿Estás libre hoy?', ['うん、 ひま だ よ。', 'はい、 ひま で ございます。', 'いらっしゃいませ。'], 'A una amiga se le responde en informal.', '{で ございます} es keigo: con una amiga sonaría a broma o a distancia.'),
        listen('ううん', '¿Qué acabas de oír?', ['«No» informal', '«Sí» informal', '«Perdona»'], '{ううん} es el «no» informal: largo, con la voz que sube y baja.'),
      ]),
      lesson('reg-inf-contracciones', 'Contracciones del habla real', '縮約形', 'Entender las formas acortadas que se oyen en cualquier conversación.', [
        p('Al hablar deprisa, los japoneses acortan las formas largas. No son incorrectas ni vulgares: son **como se habla de verdad**, y las oirás en cada serie, canción y conversación.'),
        table(['Forma completa', 'Forma hablada', 'Ejemplo'],
          ['{〜て いる}', '{〜てる}', '{何[なに] してる？} ¿Qué haces?'],
          ['{〜て しまう}', '{〜ちゃう}', '{忘[わす]れちゃった。} Se me ha olvidado.'],
          ['{〜で しまう}', '{〜じゃう}', '{飲[の]んじゃった。} Me lo he bebido.'],
          ['{〜て おく}', '{〜とく}', '{買[か]っとく ね。} Lo dejo comprado.'],
          ['{〜なければ ならない}', '{〜なきゃ}', '{行[い]かなきゃ。} Tengo que irme.'],
          ['{〜と いう}', '{〜って}', '{田中[たなか]さん って だれ？} ¿Quién es ese Tanaka?'],
          ['{〜の だ}', '{〜んだ}', '{そう なんだ。} Ah, conque es eso.']),
        frases('Tal como suenan', '今[いま] 何[なに] してる？|¿Qué haces ahora?', '宿題[しゅくだい]、 忘[わす]れちゃった。|Se me han olvidado los deberes.', 'もう 行[い]かなきゃ。|Ya tengo que irme.', 'ちょっと 待[ま]ってて。|Espérame un momento.', '先[さき] に 食[た]べちゃう よ。|Me pongo a comer sin ti, ¿eh?'),
        terms('Formas que debes reconocer', 'してる|estar haciendo', 'ちゃった|terminación: «se me ha…», «ya lo he…»', 'なきゃ|tener que', 'って|eso de; dice que', 'じゃん|¿a que sí?; ¡pero si…!', 'やっぱ|al final; como pensaba'),
        tip('Primero entender, después usar', 'Empieza por reconocerlas. Para usarlas necesitas tener clara la forma completa: {食[た]べちゃった} solo tiene sentido si sabes que viene de {食[た]べて しまった}.'),
        ojo('Solo en informal', 'Estas contracciones no se escriben en un correo ni se usan con un cliente. En registro cortés se dice {して います}; la forma {してます} se oye mucho al hablar, pero sigue siendo más relajada.'),
      ], [
        q('¿De qué forma completa viene?', ['食[た]べて しまった', '食[た]べて いた', '食[た]べなかった'], '{〜ちゃった} es la contracción de {〜て しまった}: algo que ya está hecho, a menudo sin querer.', { jp: '食[た]べちゃった' }),
        fill('もう 帰[かえ]ら＿＿。', 'Ya tengo que volver a casa.', ['なきゃ', 'ちゃう', 'てる'], '{〜なきゃ} viene de {〜なければ ならない}, «tener que».'),
        q('¿Qué significa?', ['¿Qué estás haciendo?', '¿Qué has hecho?', '¿Qué vas a hacer?'], '{してる} es {して いる}: una acción en curso.', { jp: '何[なに] してる？' }),
        order('宿題[しゅくだい] を 忘[わす]れちゃった。', 'Se me han olvidado los deberes.', 'El objeto con {を} y el verbo, ya contraído, al final.'),
      ]),
      lesson('reg-inf-particulas', 'Partículas finales y reacciones', '終助詞', 'Dar matiz a lo que dices y reaccionar a lo que te cuentan.', [
        p('Las partículas finales no cambian **qué** dices sino **cómo** lo dices: si buscas acuerdo, si informas, si dudas. Una frase informal sin ninguna suena seca, casi a telegrama.'),
        table(['Partícula', 'Qué añade', 'Ejemplo'],
          ['{ね}', 'buscas acuerdo: «¿verdad?»', '{寒[さむ]い ね。} Hace frío, ¿eh?'],
          ['{よ}', 'das información nueva', '{おいしい よ。} Está rico, te lo digo yo.'],
          ['{よ ね}', 'confirmas algo que crees saber', '{明日[あした] だ よ ね。} Es mañana, ¿no?'],
          ['{かな}', 'te lo preguntas a ti mismo', '{来[く]る かな。} ¿Vendrá?'],
          ['{っけ}', 'intentas recordar', '{何時[なんじ] だ っけ。} ¿A qué hora era?'],
          ['{の}', 'pregunta suave o explicación', '{どうした の？} ¿Qué te pasa?']),
        frases('En contexto', '今日[きょう] は 寒[さむ]い ね。|Hoy hace frío, ¿eh?', 'この 店[みせ]、 おいしい よ。|Este sitio está rico, ya verás.', '雨[あめ]、 降[ふ]る かな。|¿Lloverá?', 'テスト は 明日[あした] だ よ ね。|El examen es mañana, ¿verdad?'),
        h('Reacciones: あいづち'),
        cultura('Escuchar en voz alta', 'En japonés, quien escucha interviene todo el rato con pequeñas reacciones llamadas {あいづち}. No interrumpen: demuestran que sigues la conversación. Escuchar en silencio, como se hace en español por respeto, puede parecer desinterés.'),
        terms('Reacciones que usarás a diario', 'へえ|¡anda!, ¿ah, sí?', 'なるほど|ya veo', 'そうなんだ|ah, conque es así', 'たしかに|es verdad', 'ほんと|¿de verdad?', 'いいね|qué bien', 'そっか|ah, vale', 'うそ|¡no me digas! (lit. «mentira»)'),
        dlg('Dos amigos hablan del fin de semana', 'Ken|昨日[きのう]、 富士山[ふじさん] に 登[のぼ]った んだ。|Ayer subí al monte Fuji.', 'Tú|へえ、 すごい ね！ 大変[たいへん] だった？|¡Anda, qué pasada! ¿Fue duro?', 'Ken|うん。 八時間[はちじかん] も かかった よ。|Sí. Tardé nada menos que ocho horas.', 'Tú|ほんと？ それ は 疲[つか]れる ね。|¿De verdad? Eso cansa.', 'Ken|でも、 景色[けしき] は 最高[さいこう] だった。|Pero las vistas eran lo mejor.', 'Tú|いいね。 写真[しゃしん]、 見[み]せて。|Qué bien. Enséñame fotos.'),
      ], [
        fill('この ケーキ、 おいしい ＿＿。 食[た]べて みて。', 'Esta tarta está rica, ya verás. Pruébala.', ['よ', 'かな', 'っけ'], 'Das una información que el otro no tiene: {よ}.', 'Con {ね} darías por hecho que la otra persona ya la ha probado.'),
        fill('会議[かいぎ] は 何時[なんじ] だ ＿＿。', '¿A qué hora era la reunión? (no lo recuerdo)', ['っけ', 'よ', 'ね'], '{っけ} se usa cuando intentas recordar algo que sabías.'),
        reply('Ken|昨日[きのう]、 富士山[ふじさん] に 登[のぼ]った んだ。|Ayer subí al monte Fuji.', ['へえ、 すごい ね！', 'かしこまりました。', 'はい、 そう です。'], 'Una reacción de sorpresa e interés es lo natural.', 'Responder solo {はい} corta la conversación.'),
        q('Tu amiga te explica algo y quieres mostrar que lo has entendido. ¿Qué dices?', ['なるほど。', 'いらっしゃいませ。', 'いただきます。'], '{なるほど} equivale a «ya veo».'),
      ]),
      lesson('reg-inf-jerga', 'Coloquialismos y jerga', '若者言葉', 'Entender la jerga más habitual y distinguirla del habla de los personajes de anime.', [
        p('Estas palabras no salen en los libros de texto, pero llenan las conversaciones entre gente joven, las redes y el anime. Úsalas solo con amigos.'),
        terms('Coloquialismos frecuentes', 'やばい|increíble; terrible (según el tono)', 'めっちゃ|muy, un montón', '超[ちょう]|súper', 'マジ|en serio', 'うける|qué gracia', 'むり|imposible; ni hablar', 'びみょう|regular, ni fu ni fa', 'ださい|cutre, hortera', 'うまい|rico; hábil', 'すげえ|increíble (rudo, de すごい)'),
        frases('Cómo suenan', 'この ラーメン、 めっちゃ うまい！|¡Este ramen está buenísimo!', 'マジで？ それ は やばい ね。|¿En serio? Qué fuerte.', '昨日[きのう] の テスト、 やばかった。|El examen de ayer fue horrible.', '明日[あした] 五時[ごじ] 起[お]き？ むり むり。|¿Levantarse mañana a las cinco? Ni hablar.'),
        tip('やばい sirve para todo', 'Originalmente significaba «peligroso». Hoy expresa cualquier emoción intensa, buena o mala: una comida deliciosa, un examen desastroso, un concierto increíble. El tono y la cara dicen cuál.'),
        h('El japonés del anime no es el de la calle'),
        p('Muchos personajes hablan de una forma exagerada para marcar su carácter. Es divertido reconocerlo, pero usado con personas reales suena agresivo, ridículo o las dos cosas.'),
        table(['Lo oyes en el anime', 'Qué transmite en la vida real', 'Usa en su lugar'],
          ['{おまえ}, {てめえ}, {きさま} («tú»)', 'desprecio; los dos últimos son insultos', 'el nombre + {さん}'],
          ['{おれさま} («yo»)', 'arrogancia cómica', '{わたし}, {ぼく}'],
          ['{〜だ ぜ}, {〜だ ぞ}', 'rudeza muy marcada', '{〜だ よ}'],
          ['{〜で ござる}', 'samurái de película de época', '{〜です}'],
          ['{〜だ わ}, {〜かしら}', 'señora de novela antigua', '{〜だ ね}, {〜かな}']),
        ojo('«Tú» casi no se dice', 'En japonés real se evita el pronombre de segunda persona. Se usa el nombre de la persona, o nada. Incluso {あなた}, que los libros traducen por «tú», suena distante o a reproche.'),
        cultura('おれ, ぼく y わたし', 'Para «yo», {わたし} vale para todo el mundo y toda situación. {ぼく} lo usan sobre todo hombres y chicos, con un tono suave; {おれ}, hombres entre amigos, con un tono más rudo. En una entrevista o con un cliente, siempre {わたし}.'),
      ], [
        q('¿Qué significa?', ['Buenísimo', 'Muy caro', 'Bastante malo'], '{めっちゃ} es «muy» y {うまい}, «rico» en informal.', { jp: 'めっちゃ うまい' }),
        q('Acabas de conocer a un compañero de clase llamado Tanaka. ¿Cómo te diriges a él?', ['田中[たなか]さん', 'おまえ', 'きさま'], 'Con el apellido y {さん}. {おまえ} es demasiado rudo con alguien que no conoces y {きさま} es directamente un insulto.', { pitfall: 'En el anime los protagonistas se llaman {おまえ} continuamente; en la vida real provoca peleas.' }),
        q('Estás en una entrevista de trabajo. ¿Qué palabra usas para «yo»?', ['わたし', 'おれ', 'おれさま'], '{わたし} es la única opción neutra y formal.'),
        reply('Amigo|明日[あした]、 五時[ごじ] に 起[お]きて 走[はし]らない？|¿Mañana nos levantamos a las cinco y salimos a correr?', ['五時[ごじ]？ むり むり。', 'かしこまりました。', '五時[ごじ] で ございます。'], '{むり} es la forma coloquial de negarse en redondo entre amigos.'),
      ]),
    ],
  },
  {
    id: 'reg-u3', title: 'Formal y keigo', tone: 'formal',
    desc: 'Del です y ます bien usado al keigo de entrevistas, tiendas y correos.',
    lessons: [
      lesson('reg-for-teinei', 'El registro cortés, bien usado', '丁寧語', 'Sustituir palabras corrientes por sus versiones formales y usar お y ご.', [
        p('El registro cortés es mucho más que añadir {です} y {ます}. En situaciones formales cambian también **palabras corrientes** por versiones más elegantes, y se añaden los prefijos {お} y {ご}.'),
        table(['Corriente', 'Formal', 'Significado'],
          ['{今日[きょう]}', '{本日[ほんじつ]}', 'hoy'],
          ['{さっき}', '{先[さき]ほど}', 'hace un momento'],
          ['{あとで}', '{後[のち]ほど}', 'más tarde'],
          ['{ちょっと}', '{少々[しょうしょう]}', 'un poco'],
          ['{いい}', '{よろしい}', 'bien'],
          ['{どう}', '{いかが}', 'qué tal'],
          ['{だれ}', '{どなた}', 'quién'],
          ['{こっち}', '{こちら}', 'aquí; este'],
          ['{です}', '{で ございます}', 'es']),
        frases('Fórmulas corteses', '少々[しょうしょう] お待[ま]ち ください。|Espere un momento, por favor.', 'こちら で よろしい です か。|¿Le parece bien este?', 'お名前[なまえ] を お願[ねが]いします。|Su nombre, por favor.', 'ご都合[つごう] は いかが です か。|¿Cómo le viene?'),
        h('Los prefijos お y ご'),
        p('Añaden respeto a las cosas de la otra persona: {お名前[なまえ]} (su nombre), {ご住所[じゅうしょ]} (su dirección), {お時間[じかん]} (su tiempo). Como norma general, {お} va con palabras de origen japonés y {ご}, con palabras de origen chino; hay excepciones, como {お電話[でんわ]}.'),
        terms('Vocabulario formal', 'こちら|aquí; este (formal)', 'どなた|quién (formal)', 'いかが|qué tal, cómo (formal)', 'よろしい|bien, correcto (formal)', '少々[しょうしょう]|un poco (formal)', '本日[ほんじつ]|hoy (formal)', '先[さき]ほど|hace un momento (formal)', '後[のち]ほど|más tarde (formal)', 'ご都合[つごう]|su disponibilidad'),
        ojo('お y ご no son para ti', 'No se ponen a tus propias cosas: dices {お名前[なまえ]} para el nombre del otro, pero {名前[なまえ]} para el tuyo. Hay palabras que lo llevan siempre, como {お茶[ちゃ]} o {ご飯[はん]}: ahí solo suavizan.'),
      ], [
        q('¿Cuál es la versión formal de esta frase?', ['少々[しょうしょう] お待[ま]ち ください。', 'ちょっと 待[ま]ってて。', '少々[しょうしょう] 待[ま]つ よ。'], '{少々[しょうしょう]} sustituye a {ちょっと} y {お待[ま]ち ください}, a {待[ま]って ください}.', { jp: 'ちょっと 待[ま]って ください。' }),
        fill('お飲[の]み物[もの] は ＿＿ です か。', '¿Qué tal algo de beber? (camarero)', ['いかが', 'どう だ', 'なに'], '{いかが} es la forma formal de {どう}.'),
        q('En un formulario te piden tu dirección. ¿Qué palabra aparece impresa?', ['ご住所[じゅうしょ]', '住所[じゅうしょ]さん', 'お住所[じゅうしょ]'], 'El formulario habla de **tu** dirección con respeto. {住所[じゅうしょ]} es de origen chino y lleva {ご}.'),
        order('こちら で よろしい です か。', '¿Le parece bien este?'),
      ]),
      lesson('reg-for-sonkeigo', 'Keigo honorífico: las acciones del otro', '尊敬語', 'Usar los verbos honoríficos para hablar de lo que hace un cliente, un profesor o un jefe.', [
        p('El {尊敬語[そんけいご]} eleva **las acciones de la otra persona**: un cliente, un profesor, tu jefe. Hay unos pocos verbos con forma propia y un patrón que sirve para casi todos los demás.'),
        table(['Verbo', 'Cortés', 'Honorífico'],
          ['ir, venir, estar', '{行[い]きます} / {来[き]ます} / {います}', '{いらっしゃいます}'],
          ['decir', '{言[い]います}', '{おっしゃいます}'],
          ['comer, beber', '{食[た]べます} / {飲[の]みます}', '{召[め]し上[あ]がります}'],
          ['ver', '{見[み]ます}', '{ご覧[らん] に なります}'],
          ['hacer', '{します}', '{なさいます}'],
          ['saber', '{知[し]って います}', '{ご存[ぞん]じ です}'],
          ['dar (a mí)', '{くれます}', '{くださいます}']),
        h('El patrón para los demás verbos'),
        p('{お} + raíz del verbo + {に なります}: {帰[かえ]ります} pasa a {お帰[かえ]り に なります}. Para pedir algo con respeto, {お} + raíz + {ください}: {お待[ま]ち ください}, {お座[すわ]り ください}.'),
        frases('Hablando de la otra persona', '先生[せんせい] は 明日[あした] いらっしゃいます か。|Profesor, ¿viene usted mañana?', '社長[しゃちょう] が そう おっしゃいました。|El presidente lo dijo así.', 'どうぞ 召[め]し上[あ]がって ください。|Sírvase, por favor.', 'こちら を ご覧[らん] ください。|Mire esto, por favor.', '何時[なんじ] に お帰[かえ]り に なります か。|¿A qué hora vuelve usted?'),
        terms('Verbos honoríficos', 'いらっしゃいます|ir, venir, estar (honorífico)', 'おっしゃいます|decir (honorífico)', '召[め]し上[あ]がります|comer, beber (honorífico)', 'ご覧[らん] に なります|ver (honorífico)', 'なさいます|hacer (honorífico)', 'ご存[ぞん]じ です|saber (honorífico)', 'くださいます|dar a mí (honorífico)'),
        ojo('Nunca sobre ti', 'Usar un honorífico para tus propias acciones es elevarte a ti mismo. «Voy mañana» nunca es {いらっしゃいます}: es {行[い]きます} o, en keigo, {参[まい]ります}.'),
      ], [
        q('Quieres preguntar a una clienta si ya ha visto el catálogo. ¿Qué verbo usas?', ['ご覧[らん] に なりました か', '拝見[はいけん]しました か', '見[み]た？'], '{ご覧[らん] に なります} es el honorífico de «ver».', { pitfall: '{拝見[はいけん]します} es humilde: solo para lo que ves tú.' }),
        fill('部長[ぶちょう] は 何[なん] と ＿＿ か。', '¿Qué ha dicho el jefe?', ['おっしゃいました', '申[もう]しました', '言[い]った'], 'La acción es del jefe: honorífico, {おっしゃいます}.', '{申[もう]します} rebajaría al jefe: es la forma humilde.'),
        q('¿Cómo se forma el honorífico de este verbo con el patrón general?', ['お待[ま]ち に なります', 'お待[ま]ち します', '待[ま]ち に なります'], '{お} + raíz + {に なります}.', { jp: '待[ま]ちます', pitfall: '{お待[ま]ち します} es el patrón humilde: «le espero yo».' }),
        order('どうぞ 召[め]し上[あ]がって ください。', 'Sírvase, por favor.'),
      ]),
      lesson('reg-for-kenjogo', 'Keigo humilde: tus propias acciones', '謙譲語', 'Presentarte, ofrecer ayuda y hablar de los tuyos ante alguien de fuera.', [
        p('El {謙譲語[けんじょうご]} hace lo contrario: **rebaja tus propias acciones** (y las de los tuyos) para dejar por encima a quien te escucha. Es el keigo de las presentaciones, las entrevistas y la atención al cliente.'),
        table(['Verbo', 'Cortés', 'Humilde'],
          ['ir, venir', '{行[い]きます} / {来[き]ます}', '{参[まい]ります}'],
          ['estar', '{います}', '{おります}'],
          ['decir; llamarse', '{言[い]います}', '{申[もう]します}'],
          ['comer, beber, recibir', '{食[た]べます} / {もらいます}', '{いただきます}'],
          ['ver', '{見[み]ます}', '{拝見[はいけん]します}'],
          ['hacer', '{します}', '{いたします}'],
          ['preguntar; visitar', '{聞[き]きます} / {訪[たず]ねます}', '{伺[うかが]います}'],
          ['saber', '{知[し]って います}', '{存[ぞん]じて おります}']),
        h('El patrón para los demás verbos'),
        p('{お} + raíz + {します}: {持[も]ちます} pasa a {お持[も]ち します}, «se lo llevo yo». Con nombres de acción, {ご} + nombre + {します}: {ご案内[あんない] します}, {ご連絡[れんらく] します}.'),
        frases('Hablando de ti', 'ガルシア と 申[もう]します。|Me llamo García.', '明日[あした] 三時[さんじ] に 伺[うかが]います。|Iré a verle mañana a las tres.', '資料[しりょう] を 拝見[はいけん]しました。|He visto la documentación.', 'お荷物[にもつ] を お持[も]ち します。|Le llevo el equipaje.', '後[のち]ほど ご連絡[れんらく] いたします。|Me pondré en contacto con usted más tarde.'),
        terms('Verbos humildes', '参[まい]ります|ir, venir (humilde)', 'おります|estar (humilde)', '申[もう]します|decir; llamarse (humilde)', 'いただきます|comer, beber, recibir (humilde)', '拝見[はいけん]します|ver (humilde)', 'いたします|hacer (humilde)', '伺[うかが]います|preguntar; visitar (humilde)'),
        cultura('Tu empresa también eres tú', 'Ante un cliente, tus compañeros y tus jefes forman parte de tu grupo. Si llaman preguntando por tu jefe Tanaka y no está, se dice {田中[たなか] は 外出[がいしゅつ]して おります}: sin {さん} y con la forma humilde {おります}.'),
      ], [
        q('¿Cuál de estas frases usarías para presentarte en una entrevista?', ['ガルシア と 申[もう]します。', 'ガルシア と おっしゃいます。', 'ガルシアさん です。'], '{申[もう]します} es la forma humilde de «llamarse».', { pitfall: '{おっしゃいます} es honorífico: te estarías elevando a ti mismo.' }),
        fill('明日[あした] の 十時[じゅうじ] に ＿＿。', 'Iré a verle mañana a las diez.', ['伺[うかが]います', 'いらっしゃいます', '来[く]る'], 'Tu visita se expresa con el humilde {伺[うかが]います}.'),
        q('Un cliente pregunta por tu compañera Suzuki, que ha salido. ¿Qué respondes?', ['鈴木[すずき] は 外出[がいしゅつ]して おります。', '鈴木[すずき]さん は いらっしゃいません。', '鈴木[すずき]さん は いない よ。'], 'Suzuki es de tu grupo: sin {さん} y con el humilde {おります}.', { pitfall: 'Usar {いらっしゃいます} para una compañera ante un cliente es elevar a los tuyos por encima de él.' }),
        reply('Recepcionista|お名前[なまえ] を お願[ねが]いします。|Su nombre, por favor.', ['ガルシア と 申[もう]します。', 'お名前[なまえ] は ガルシア です。', 'ガルシア だ。'], 'Tu nombre, sin {お} y con el verbo humilde.', 'Decir {お名前[なまえ]} de tu propio nombre es un error frecuente.'),
      ]),
      lesson('reg-for-servicio', 'El keigo de tiendas y restaurantes', '接客の言葉', 'Entender lo que te dicen al comprar y las fórmulas que suavizan una petición.', [
        p('No necesitas producir este keigo desde el primer día, pero lo **oirás** nada más entrar en cualquier tienda, restaurante u hotel. Entenderlo te quita la mitad del miedo a comprar en Japón.'),
        dlg('En la caja de una tienda', 'Dependienta|いらっしゃいませ。 お次[つぎ] の お客様[きゃくさま]、 どうぞ。|Bienvenido. Siguiente cliente, por favor.', 'Dependienta|ポイントカード は お持[も]ち です か。|¿Tiene tarjeta de puntos?', 'Tú|いいえ、 ありません。|No, no tengo.', 'Dependienta|袋[ふくろ] は ご利用[りよう] です か。|¿Va a querer bolsa?', 'Tú|はい、 お願[ねが]いします。|Sí, por favor.', 'Dependienta|お会計[かいけい] は 千二百円[せんにひゃくえん] で ございます。|Son 1200 yenes.', 'Dependienta|ありがとうございました。 また お越[こ]し くださいませ。|Muchas gracias. Vuelva cuando quiera.'),
        terms('Fórmulas de atención al cliente', 'いらっしゃいませ|bienvenido', 'かしこまりました|entendido (al cliente)', 'お待[ま]たせ いたしました|perdone la espera', '申[もう]し訳[わけ] ございません|lo siento muchísimo', 'お会計[かいけい]|la cuenta', 'お持[も]ち帰[かえ]り|para llevar', 'ご利用[りよう]|uso (de un servicio)', 'で ございます|es (muy formal)'),
        h('Palabras colchón'),
        p('Antes de pedir algo o dar una mala noticia se pone delante una fórmula que amortigua el golpe; en japonés se llaman {クッション言葉[ことば]}. Convierten una petición seca en una petición educada.'),
        frases('Antes de pedir o negar', '恐[おそ]れ入[い]ります が、 こちら に お名前[なまえ] を お願[ねが]いします。|Disculpe la molestia: su nombre aquí, por favor.', 'お手数[てすう] です が、 もう 一度[いちど] お願[ねが]いします。|Siento causarle trabajo, pero otra vez, por favor.', '申[もう]し訳[わけ] ございません が、 本日[ほんじつ] は 満席[まんせき] です。|Lo siento mucho, pero hoy está completo.', '失礼[しつれい] です が、 どちら様[さま] でしょう か。|Perdone, ¿con quién hablo?'),
        cultura('Tú no tienes que contestar en keigo', 'El cliente no devuelve el keigo: responde con {です} y {ます}, o con un simple {はい} y {お願[ねが]いします}. Tampoco hace falta contestar al {いらっしゃいませ}: basta con una pequeña inclinación de cabeza.'),
      ], [
        reply('Dependienta|袋[ふくろ] は ご利用[りよう] です か。|¿Va a querer bolsa?', ['はい、 お願[ねが]いします。', 'いらっしゃいませ。', 'かしこまりました。'], 'Como cliente respondes en registro cortés sencillo.', '{かしこまりました} lo dice quien atiende, no el cliente.'),
        q('La camarera dice esto al traer tu plato. ¿Qué significa?', ['Perdone la espera', 'Bienvenido', 'Son 1200 yenes'], 'Es la fórmula fija al entregar algo que el cliente esperaba.', { jp: 'お待[ま]たせ いたしました。' }),
        q('¿Para qué sirve esta expresión?', ['Para suavizar una petición antes de hacerla', 'Para despedirse de un cliente', 'Para decir el precio'], 'Es una palabra colchón: amortigua lo que viene después.', { jp: '恐[おそ]れ入[い]ります が' }),
        listen('かしこまりました。', '¿Quién diría esto?', ['Un dependiente a un cliente', 'Un cliente a un dependiente', 'Un amigo a otro'], '{かしこまりました} es el «entendido» de quien atiende.'),
      ]),
      lesson('reg-for-correo', 'Escribir un correo formal', 'ビジネスメール', 'Montar un correo formal con las fórmulas fijas de apertura y cierre.', [
        p('Un correo formal en japonés sigue un molde fijo. Si respetas el molde, el correo es correcto aunque tu japonés sea sencillo.'),
        table(['Parte', 'Qué se escribe', 'Ejemplo'],
          ['Destinatario', 'nombre + {様[さま]}', '{山田[やまだ] 様[さま]}'],
          ['Saludo', 'fórmula fija de apertura', '{いつも お世話[せわ] に なって おります。}'],
          ['Quién eres', 'tu empresa o centro y tu nombre', '{さくら大学[だいがく] の ガルシア です。}'],
          ['Motivo', 'una frase que anuncia el asunto', '{会議[かいぎ] の 件[けん] で ご連絡[れんらく] いたしました。}'],
          ['Petición', 'lo que necesitas, con colchón', '{ご確認[かくにん] を お願[ねが]い いたします。}'],
          ['Cierre', 'fórmula fija de despedida', '{よろしく お願[ねが]い いたします。}']),
        frases('Fórmulas que copiarás siempre', 'いつも お世話[せわ] に なって おります。|Gracias por su atención de siempre. (apertura)', 'ご確認[かくにん] を お願[ねが]い いたします。|Le ruego que lo revise.', 'ご返信[へんしん] を お待[ま]ち して おります。|Quedo a la espera de su respuesta.', 'お忙[いそが]しい ところ 恐[おそ]れ入[い]ります。|Disculpe que le moleste estando tan ocupado.', '今後[こんご] とも よろしく お願[ねが]い いたします。|Cuento con su apoyo también en adelante. (cierre)'),
        terms('Vocabulario del correo', '様[さま]|Sr., Sra. (tras el nombre, muy formal)', '件名[けんめい]|asunto', '添付[てんぷ]|archivo adjunto', '返信[へんしん]|respuesta', '確認[かくにん]|comprobación', '担当者[たんとうしゃ]|persona encargada', '弊社[へいしゃ]|nuestra empresa (humilde)', '御社[おんしゃ]|su empresa (al hablar)', '貴社[きしゃ]|su empresa (por escrito)'),
        ojo('さん, 様 y nada', 'En un correo el destinatario lleva {様[さま]}, nunca {さん}. Tu propio nombre no lleva nada. Y a un profesor se le escribe {山田[やまだ] 先生[せんせい]}, sin {様[さま]}.'),
        tip('Corto y con molde', 'Un párrafo por idea, frases cortas y una sola petición por correo. Nadie espera literatura: se espera que el molde esté completo.'),
      ], [
        q('¿Con qué frase se abre casi cualquier correo de trabajo?', ['いつも お世話[せわ] に なって おります。', 'おはよう！', 'いらっしゃいませ。'], 'Es la apertura estándar entre empresas o personas que ya tienen relación.'),
        q('Escribes a la señora Yamada, de otra empresa. ¿Cómo encabezas el correo?', ['山田[やまだ] 様[さま]', '山田[やまだ]さん へ', '山田[やまだ]ちゃん'], 'En correos formales el destinatario lleva {様[さま]}.'),
        q('¿Cómo llamas a tu propia empresa en un correo formal?', ['弊社[へいしゃ]', '御社[おんしゃ]', '貴社[きしゃ]'], '{弊社[へいしゃ]} es la forma humilde para «nuestra empresa»; {御社[おんしゃ]} y {貴社[きしゃ]} son la empresa del otro.'),
        order('ご確認[かくにん] を お願[ねが]い いたします。', 'Le ruego que lo revise.'),
      ]),
    ],
  },
  {
    id: 'reg-u4', title: 'Cambiar de registro', tone: 'base',
    desc: 'Subir y bajar una misma frase, y los errores que más se notan.',
    lessons: [
      lesson('reg-cambio', 'La misma idea en tres registros', '言いかえ', 'Adaptar una frase a un amigo, a un compañero y a un cliente.', [
        p('Cambiar de registro es traducir dentro del mismo idioma. Practica aquí a subir y bajar una frase según a quién tengas delante.'),
        table(['Idea', 'Informal', 'Cortés', 'Keigo'],
          ['Gracias', '{ありがとう}', '{ありがとうございます}', '{誠[まこと] に ありがとうございます}'],
          ['Perdón', '{ごめん}', '{すみません}', '{申[もう]し訳[わけ] ございません}'],
          ['Entendido', '{わかった}', '{わかりました}', '{かしこまりました}'],
          ['Espera', '{ちょっと 待[ま]って}', '{ちょっと 待[ま]って ください}', '{少々[しょうしょう] お待[ま]ち ください}'],
          ['¿Qué tal?', '{どう？}', '{どう です か}', '{いかが でしょう か}'],
          ['No lo sé', '{知[し]らない}', '{知[し]りません}', '{存[ぞん]じません}']),
        dlg('Una misma tarde, tres conversaciones', 'Amiga|今晩[こんばん]、 ひま？|¿Estás libre esta noche?', 'Tú|ごめん、 今日[きょう] は バイト なんだ。|Perdona, hoy tengo trabajo.', 'Encargado|ガルシアさん、 レジ を お願[ねが]いします。|García, a la caja, por favor.', 'Tú|はい、 わかりました。|Sí, entendido.', 'Clienta|すみません、 トイレ は どこ です か。|Perdone, ¿dónde está el baño?', 'Tú|ご案内[あんない] いたします。 こちら へ どうぞ。|La acompaño. Por aquí, por favor.'),
        tip('Fíjate en el final de la frase', 'El registro se decide casi siempre en el verbo, y el verbo va al final. Si empiezas una frase sin saber qué registro toca, tienes hasta la última palabra para decidirlo.'),
        frases('Sube el registro', '手伝[てつだ]って くれる？|¿Me echas una mano? (informal)', '手伝[てつだ]って ください。|Ayúdeme, por favor. (cortés)', '手伝[てつだ]って いただけません か。|¿Sería tan amable de ayudarme? (keigo)'),
        terms('Vocabulario', 'バイト|trabajo por horas', 'レジ|caja (de una tienda)', '今晩[こんばん]|esta noche', '手伝[てつだ]う|ayudar', 'ご案内[あんない]|acompañar, guiar (formal)', '誠[まこと] に|sinceramente, de verdad (formal)'),
      ], [
        q('Tu jefa te encarga una tarea. ¿Cómo dices «entendido»?', ['かしこまりました。', 'わかった。', 'うん、 いい よ。'], 'Con un superior, {かしこまりました} o {承知[しょうち]しました}.', { pitfall: '{了解[りょうかい] です} se oye mucho, pero hay quien lo considera poco respetuoso hacia un superior.' }),
        q('Tu amigo te pregunta algo que no sabes. ¿Qué respondes?', ['知[し]らない。', '存[ぞん]じません。', '知[し]りません でした か。'], 'Con un amigo, forma diccionario negativa.', { pitfall: '{存[ぞん]じません} con un amigo sonaría a mayordomo.' }),
        reply('Clienta|すみません、 トイレ は どこ です か。|Perdone, ¿dónde está el baño?', ['ご案内[あんない] いたします。 こちら へ どうぞ。', 'あっち だ よ。', 'トイレ？ 知[し]らない。'], 'A una clienta se la acompaña con keigo humilde.'),
        reply('Amiga|今晩[こんばん]、 ひま？|¿Estás libre esta noche?', ['ごめん、 今日[きょう] は バイト なんだ。', '申[もう]し訳[わけ] ございません。', '本日[ほんじつ] は 満席[まんせき] です。'], 'Con una amiga, disculpa informal y explicación con {なんだ}.'),
        q('¿Cuál es la petición más formal?', ['手伝[てつだ]って いただけません か。', '手伝[てつだ]って ください。', '手伝[てつだ]って くれる？'], '{〜て いただけません か} pide un favor dejando al otro la opción de negarse: es la más educada.'),
      ]),
      lesson('reg-errores', 'Errores de registro que debes evitar', '気をつけよう', 'Reconocer los fallos que más se notan y sus versiones correctas.', [
        p('Los japoneses perdonan casi todo a quien está aprendiendo, pero estos fallos se notan mucho. Evitarlos te hace sonar más competente de lo que indica tu nivel.'),
        table(['Evita', 'Por qué', 'Di'],
          ['{うん、 わかった} a un jefe', 'demasiado informal', '{はい、 承知[しょうち]しました}'],
          ['{ご苦労様[くろうさま] です} a un superior', 'es de jefe a subordinado', '{お疲[つか]れ様[さま] です}'],
          ['{わたし は ガルシアさん です}', '{さん} nunca es para ti', '{ガルシア です}'],
          ['{あなた は…？} a un desconocido', 'suena distante o a reproche', 'el nombre + {さん}, o nada'],
          ['{先生[せんせい] が 申[もう]しました}', 'humilde aplicado a otro', '{先生[せんせい] が おっしゃいました}'],
          ['{おっしゃられました}', 'doble keigo: honorífico sobre honorífico', '{おっしゃいました}'],
          ['{おれ}, {〜だ ぜ} con desconocidos', 'habla de personaje, no de persona', '{わたし}, {〜です}']),
        h('Demasiado keigo también es un error'),
        p('Apilar formas honoríficas ({二重敬語[にじゅうけいご]}) no es más educado: es incorrecto. Y un keigo recargado con alguien cercano crea distancia. Lo elegante es usar **una** forma correcta.'),
        cultura('Lo que se te perdona y lo que no', 'Nadie espera keigo perfecto de un extranjero, y un {です} y {ます} bien usados bastan en casi todas partes. Lo que sí molesta es el exceso de confianza: tutear, usar jerga o saltarse los saludos con alguien a quien acabas de conocer.'),
        frases('Versiones correctas', 'お先[さき] に 失礼[しつれい]します。|Me voy antes que ustedes, con permiso. (al salir del trabajo)', 'お疲[つか]れ様[さま] です。|Buen trabajo. (saludo entre compañeros)', '先生[せんせい] が そう おっしゃいました。|El profesor lo dijo así.', 'はい、 承知[しょうち]しました。|Sí, entendido.'),
        terms('Vocabulario', '二重敬語[にじゅうけいご]|doble keigo (error)', '失礼[しつれい]|descortesía', 'お疲[つか]れ様[さま]|buen trabajo (saludo)', '承知[しょうち]|entendido, de acuerdo (formal)', '気[き] を つける|tener cuidado'),
      ], [
        q('Sales de la oficina antes que tu jefe. ¿Qué dices?', ['お先[さき] に 失礼[しつれい]します。', 'ご苦労様[くろうさま]。', 'じゃあね。'], 'Es la fórmula fija para irse antes que los demás.', { pitfall: '{ご苦労様[くろうさま]} solo lo dice un superior a un subordinado.' }),
        q('¿Cuál de estas frases es correcta?', ['先生[せんせい] が おっしゃいました。', '先生[せんせい] が 申[もう]しました。', '先生[せんせい] が おっしゃられました。'], 'Un solo honorífico. {申[もう]しました} rebaja al profesor y {おっしゃられました} es doble keigo.'),
        q('Te presentas en una reunión. ¿Cuál es correcta?', ['ガルシア と 申[もう]します。', 'ガルシアさん と 申[もう]します。', 'おれ は ガルシア だ ぜ。'], 'Sin {さん} para ti y con el verbo humilde.'),
        q('En la calle necesitas preguntar algo a una señora desconocida. ¿Cómo empiezas?', ['すみません、 ちょっと よろしい です か。', 'あなた、 ちょっと。', 'おまえ、 道[みち] を 教[おし]えろ。'], 'Se empieza con {すみません} y sin pronombre.', { pitfall: '{あなた} dirigido a un desconocido suena a reproche.' }),
      ]),
    ],
  },
];

/** Comparador: una misma idea dicha en los tres registros. */
export interface Phrase {
  es: string;
  casual: string;
  polite: string;
  keigo: string;
  note?: string;
}

export const phrasebook: Phrase[] = [
  { es: 'Gracias', casual: 'ありがとう。', polite: 'ありがとうございます。', keigo: '誠[まこと] に ありがとうございます。' },
  { es: 'Perdón', casual: 'ごめん。', polite: 'すみません。', keigo: '申[もう]し訳[わけ] ございません。', note: 'La versión keigo es una disculpa seria: se usa ante un cliente o por un error en el trabajo.' },
  { es: 'Entendido', casual: 'わかった。', polite: 'わかりました。', keigo: 'かしこまりました。' },
  { es: 'Espera un momento', casual: 'ちょっと 待[ま]って。', polite: 'ちょっと 待[ま]って ください。', keigo: '少々[しょうしょう] お待[ま]ち ください。' },
  { es: '¿Qué tal este?', casual: 'これ、 どう？', polite: 'これ は どう です か。', keigo: 'こちら は いかが でしょう か。' },
  { es: '¿Puedo preguntarte algo?', casual: '聞[き]いても いい？', polite: '聞[き]いても いい です か。', keigo: '伺[うかが]っても よろしい でしょう か。' },
  { es: 'Me llamo García', casual: 'ガルシア だ よ。', polite: 'ガルシア です。', keigo: 'ガルシア と 申[もう]します。' },
  { es: '¿Vienes mañana?', casual: '明日[あした] 来[く]る？', polite: '明日[あした] 来[き]ます か。', keigo: '明日[あした] いらっしゃいます か。', note: 'El keigo aquí es honorífico: la acción es de la otra persona.' },
  { es: 'No lo sé', casual: '知[し]らない。', polite: '知[し]りません。', keigo: '存[ぞん]じません。' },
  { es: 'Por favor (al pedir)', casual: 'お願[ねが]い。', polite: 'お願[ねが]いします。', keigo: 'お願[ねが]い いたします。' },
  { es: 'Come, sírvete', casual: '食[た]べて。', polite: '食[た]べて ください。', keigo: 'どうぞ 召[め]し上[あ]がって ください。' },
  { es: 'Me voy ya (al salir del trabajo)', casual: 'おつかれ。', polite: 'お疲[つか]れ様[さま] です。', keigo: 'お先[さき] に 失礼[しつれい] いたします。', note: 'Al irte antes que los demás, la fórmula keigo es la habitual incluso entre compañeros.' },
];
