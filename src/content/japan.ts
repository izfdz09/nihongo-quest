import { cultura, dlg, frases, lesson, listen, ojo, p, q, reply, table, terms, tip } from './helpers';
import type { Area } from './types';

/* «Mi futuro en Japón»: japonés práctico para vivir, estudiar y trabajar allí. */

export const areas: Area[] = [
  {
    id: 'vida', title: 'Vida diaria', jp: '暮らし',
    desc: 'Vecinos, normas de convivencia y las pequeñas conversaciones del día a día.',
    situations: [
      lesson('jp-vecinos', 'Presentarte a los vecinos', 'ごあいさつ', 'Saludar a tus vecinos al mudarte, como manda la costumbre.', [
        cultura('El saludo de mudanza', 'Al instalarte en un piso es costumbre llamar a la puerta de los vecinos de al lado y de abajo, presentarte y entregar un pequeño detalle: unas galletas o unas toallitas de unos 500 a 1.000 yenes. En las grandes ciudades se hace cada vez menos, pero sigue causando muy buena impresión.'),
        dlg('En la puerta del vecino', 'Tú|ごめんください。 隣[となり] に 引[ひ]っ越[こ]して 来[き]ました、 ガルシア と 申[もう]します。|Disculpe. Me acabo de mudar al piso de al lado; me llamo García.', 'Vecina|ああ、 そう です か。 鈴木[すずき] です。 よろしく お願[ねが]いします。|Ah, ¿sí? Soy Suzuki. Encantada.', 'Tú|これ、 つまらない もの です が、 どうぞ。|Esto es un pequeño detalle, sin importancia. Por favor, acéptelo.', 'Vecina|まあ、 ご丁寧[ていねい]に ありがとうございます。|Vaya, muchas gracias por la atención.', 'Tú|これから お世話[せわ]に なります。 よろしく お願[ねが]いします。|A partir de ahora estaré a su cuidado. Encantado.'),
        terms('Vocabulario', '隣[となり]|al lado; vecino de al lado', '引[ひ]っ越[こ]し|mudanza', '〜と 申[もう]します|me llamo… (humilde)', 'ごめんください|¿hay alguien? (al llamar a una puerta)', 'お世話[せわ]に なります|estaré a su cuidado', '近所[きんじょ]|vecindario', '大家[おおや]さん|casero, casera'),
        ojo('つまらない もの です が', 'Literalmente «es algo sin interés, pero…». Es la fórmula tradicional al entregar un regalo: se le quita importancia por modestia. No lo traduzcas ni te lo tomes al pie de la letra.'),
        table(['Registro', '«Me llamo García»'], ['Informal', '{ガルシア だ よ。}'], ['Cortés', '{ガルシア です。}'], ['Humilde (keigo)', '{ガルシア と 申[もう]します。}']),
      ], [
        q('Entregas un regalo a tu vecina. ¿Qué fórmula usas?', ['つまらない もの です が、 どうぞ。', 'とても 高[たか]い もの です。', 'これ は あなた の です。'], 'Se resta importancia al regalo por modestia.', { pitfall: 'Destacar el valor del regalo se considera de mal gusto.' }),
        reply('Vecina|鈴木[すずき] です。 よろしく お願[ねが]いします。|Soy Suzuki. Encantada.', ['こちらこそ、 よろしく お願[ねが]いします。', 'どういたしまして。', 'お邪魔[じゃま]します。'], 'Se devuelve la fórmula con {こちらこそ}, «igualmente».'),
      ]),
      lesson('jp-basura', 'Normas de convivencia: la basura', 'ゴミ出し', 'Entender el calendario de recogida y preguntar cuando tengas dudas.', [
        cultura('La basura es un asunto serio', 'Cada municipio tiene sus propias reglas: qué va en cada categoría, qué día se saca y hasta qué hora. Sacarla el día equivocado o sin separar es el motivo más frecuente de conflicto entre vecinos y extranjeros. Al empadronarte te dan un calendario: guárdalo.'),
        terms('Tipos de basura', '燃[も]える ゴミ|basura combustible (orgánica, papel sucio)', '燃[も]えない ゴミ|basura no combustible', '資源[しげん]ゴミ|reciclables', 'ペットボトル|botellas de plástico', '缶[かん]|latas', '瓶[びん]|vidrio, botellas', '粗大[そだい]ゴミ|objetos voluminosos|Hay que pedir cita y pagar una tasa.', 'ゴミ袋[ぶくろ]|bolsa de basura'),
        dlg('Con la vecina en el portal', 'Tú|すみません、 ちょっと 教[おし]えて ください。 燃[も]える ゴミ は 何曜日[なんようび] です か。|Perdone, ¿me podría decir una cosa? ¿Qué día se saca la basura combustible?', 'Vecina|火曜日[かようび] と 金曜日[きんようび] です よ。 朝[あさ] 八時[はちじ] まで に 出[だ]して ください ね。|Martes y viernes. Sáquela antes de las ocho de la mañana, ¿eh?', 'Tú|前[まえ] の 夜[よる] に 出[だ]しても いい です か。|¿Puedo sacarla la noche anterior?', 'Vecina|それ は ちょっと… カラス が 来[き]ます から。|Eso mejor no… Es que vienen los cuervos.', 'Tú|わかりました。 気[き] を つけます。|Entendido. Tendré cuidado.'),
        frases('Frases útiles', 'これ は どの ゴミ です か。|¿En qué basura va esto?', 'ゴミ は どこ に 出[だ]します か。|¿Dónde se deja la basura?', '夜[よる] は 静[しず]かに して ください。|Por la noche, no haga ruido, por favor.'),
        tip('まで y まで に', '{八時[はちじ] まで} es «hasta las ocho» (algo dura hasta entonces). {八時[はちじ] まで に} es «antes de las ocho» (un plazo). En normas y avisos casi siempre verás la segunda.'),
      ], [
        q('La vecina responde «それはちょっと…». ¿Qué quiere decir?', ['Que no debes hacerlo', 'Que te da permiso', 'Que no te ha entendido'], 'La frase sin terminar con {ちょっと} es una negativa educada.', { jp: 'それ は ちょっと…' }),
        listen('朝[あさ] 八時[はちじ] まで に 出[だ]して ください。', 'Escucha. ¿Cuándo hay que sacar la basura?', ['Antes de las ocho de la mañana', 'A partir de las ocho de la tarde', 'A las ocho en punto'], '{朝[あさ]} es «por la mañana» y {まで に} marca el plazo límite.'),
      ]),
    ],
  },
  {
    id: 'vivienda', title: 'Vivienda', jp: '住まい',
    desc: 'Buscar piso, entender las condiciones del alquiler y avisar de una avería.',
    situations: [
      lesson('jp-piso', 'Buscar un apartamento', '部屋探し', 'Explicar qué buscas en una inmobiliaria y entender los costes del alquiler.', [
        cultura('Alquilar en Japón', 'Además del alquiler mensual, al entrar se suele pagar una fianza ({敷金[しききん]}), un «dinero de agradecimiento» al propietario que no se devuelve ({礼金[れいきん]}) y la comisión de la agencia. En total pueden sumar varios meses de alquiler. Muchos contratos exigen un avalista o una empresa de garantía. Las condiciones cambian según la agencia y la ciudad: pide siempre el desglose por escrito.'),
        terms('Vocabulario del alquiler', '不動産屋[ふどうさんや]|inmobiliaria', '部屋[へや]|habitación; piso', '家賃[やちん]|alquiler', '敷金[しききん]|fianza', '礼金[れいきん]|pago de agradecimiento (no se devuelve)', '管理費[かんりひ]|gastos de comunidad', '保証人[ほしょうにん]|avalista', '契約[けいやく]|contrato', '徒歩[とほ]|a pie'),
        dlg('En la inmobiliaria', 'Agente|いらっしゃいませ。 どんな お部屋[へや] を お探[さが]し です か。|Bienvenido. ¿Qué tipo de piso busca?', 'Tú|駅[えき] から 近[ちか]い ワンルーム を 探[さが]して います。|Busco un estudio cerca de la estación.', 'Agente|ご予算[よさん] は どのくらい です か。|¿Qué presupuesto tiene?', 'Tú|家賃[やちん] は 七万円[ななまんえん] まで で お願[ねが]いします。|Un alquiler de hasta 70.000 yenes, por favor.', 'Agente|こちら は いかが です か。 駅[えき] から 徒歩[とほ] 八分[はっぷん] で、 家賃[やちん] は 六万五千円[ろくまんごせんえん] です。|¿Qué le parece este? Está a ocho minutos a pie de la estación y el alquiler es de 65.000 yenes.', 'Tú|敷金[しききん] と 礼金[れいきん] は いくら です か。|¿Cuánto son la fianza y el pago de agradecimiento?'),
        table(['En el anuncio', 'Significa'], ['1R / 1K', 'Estudio / una habitación con cocina separada'], ['1LDK', 'Una habitación más salón-comedor-cocina'], ['徒歩10分', 'A 10 minutos a pie de la estación'], ['築5年', 'Edificio de 5 años de antigüedad'], ['外国人可', 'Se admiten extranjeros']),
        ojo('El agente te habla en keigo', '{お探[さが]し です か}, {ご予算[よさん]}, {いかが です か}: son formas honoríficas de «¿busca?», «presupuesto» y «¿qué tal?». Tú puedes responder en forma cortés normal, con {です} y {ます}.'),
      ], [
        q('¿Cuál de estos pagos NO se devuelve al dejar el piso?', ['礼金[れいきん]', '敷金[しききん]', '家賃[やちん]'], '{礼金[れいきん]} es un pago de agradecimiento al propietario. La fianza ({敷金[しききん]}) se devuelve, descontando limpieza y desperfectos.', { pitfall: 'Confundir los dos es habitual: fíjate en {礼}, «agradecimiento».' }),
        reply('Agente|ご予算[よさん] は どのくらい です か。|¿Qué presupuesto tiene?', ['八万円[はちまんえん] まで で お願[ねが]いします。', '駅[えき] から 近[ちか]い です。', 'はい、 予算[よさん] です。'], 'Indicas tu límite con {まで}: «hasta 80.000 yenes».'),
      ]),
      lesson('jp-averia', 'Explicar un problema doméstico', '故障', 'Llamar al casero o a la administración para avisar de una avería.', [
        p('Cuando algo se estropea no se llama a un técnico por cuenta propia: primero se avisa al casero ({大家[おおや]さん}) o a la empresa administradora ({管理会社[かんりがいしゃ]}), que suele encargarse de la reparación.'),
        terms('Lo que puede fallar', 'エアコン が 壊[こわ]れました|se ha roto el aire acondicionado', 'お湯[ゆ] が 出[で]ません|no sale agua caliente', '水[みず] が 漏[も]れて います|hay una fuga de agua', '電気[でんき] が つきません|no se enciende la luz', 'トイレ が 詰[つ]まりました|se ha atascado el váter', '鍵[かぎ] を なくしました|he perdido la llave'),
        dlg('Llamada a la administradora', 'Empleado|はい、 さくら管理[かんり] で ございます。|Administración Sakura, dígame.', 'Tú|お世話[せわ]に なっております。 みどりハイツ 二百三号室[にひゃくさんごうしつ] の ガルシア です。|Buenos días. Soy García, del 203 del edificio Midori Heights.', 'Tú|昨日[きのう] から お湯[ゆ] が 出[で]ません。 見[み]て いただけます か。|Desde ayer no sale agua caliente. ¿Podrían venir a verlo?', 'Empleado|ご不便[ふべん] を おかけして 申[もう]し訳[わけ] ございません。 明日[あした] の 午前中[ごぜんちゅう] は いかが でしょう か。|Disculpe las molestias. ¿Le vendría bien mañana por la mañana?', 'Tú|はい、 大丈夫[だいじょうぶ] です。 よろしく お願[ねが]いします。|Sí, me va bien. Muchas gracias.'),
        terms('Vocabulario', '管理会社[かんりがいしゃ]|empresa administradora', '修理[しゅうり]|reparación', '号室[ごうしつ]|número de piso', '午前中[ごぜんちゅう]|por la mañana', '大丈夫[だいじょうぶ]|está bien, sin problema'),
        tip('〜て いただけます か', 'Es la forma más educada de pedir un favor: «¿tendría la amabilidad de…?». Más cortés que {〜て ください}, y la adecuada con caseros, funcionarios y clientes.'),
        ojo('Di quién eres antes que nada', 'Por teléfono se empieza con la fórmula {お世話[せわ]に なっております}, el edificio, el número de piso y tu apellido. Después, el problema. Ir directo al grano se percibe como brusco.'),
      ], [
        q('No sale agua caliente. ¿Cómo lo explicas?', ['お湯[ゆ] が 出[で]ません。', '水[みず] が 漏[も]れて います。', '電気[でんき] が つきません。'], '{お湯[ゆ]} es el agua caliente; {水[みず]}, el agua fría.', { pitfall: 'En japonés «agua caliente» no es «agua + caliente»: tiene su propia palabra.' }),
        reply('Empleado|明日[あした] の 午前中[ごぜんちゅう] は いかが でしょう か。|¿Le vendría bien mañana por la mañana?', ['はい、 大丈夫[だいじょうぶ] です。', 'いいえ、 けっこう です。', 'いかが です。'], 'Aquí {大丈夫[だいじょうぶ] です} confirma que el horario te va bien.', 'Ojo: ante un ofrecimiento, la misma frase puede significar «no, gracias». El contexto manda.'),
      ]),
    ],
  },
  {
    id: 'trabajo', title: 'Trabajo', jp: '仕事',
    desc: 'Entrevistas, presentaciones profesionales y el lenguaje formal de la oficina.',
    situations: [
      lesson('jp-entrevista', 'La entrevista de trabajo', '面接', 'Presentarte en una entrevista con el keigo imprescindible.', [
        cultura('El ritual de la entrevista', 'Se llama a la puerta tres veces, se espera el {どうぞ}, se saluda con una reverencia y no se toma asiento hasta que te lo indican. La puntualidad significa llegar diez minutos antes. El contenido importa, pero el respeto de las formas se evalúa desde el primer segundo.'),
        dlg('Primeros minutos', 'Entrevistadora|どうぞ お座[すわ]り ください。|Tome asiento, por favor.', 'Tú|失礼[しつれい]します。|Con su permiso.', 'Entrevistadora|では、 自己紹介[じこしょうかい] を お願[ねが]いします。|Bien, preséntese, por favor.', 'Tú|ルイス・ガルシア と 申[もう]します。 スペイン から 参[まい]りました。|Me llamo Luis García. Vengo de España.', 'Tú|大学[だいがく] で 情報工学[じょうほうこうがく] を 専攻[せんこう]して おりました。|Me especialicé en ingeniería informática en la universidad.', 'Tú|本日[ほんじつ] は よろしく お願[ねが]い いたします。|Le agradezco la oportunidad de hoy.'),
        table(['Cortés', 'Humilde (sobre ti)', 'Significado'], ['{言[い]います}', '{申[もう]します}', 'decir; llamarse'], ['{来[き]ました}', '{参[まい]りました}', 'vine'], ['{して います}', '{して おります}', 'estoy haciendo'], ['{お願[ねが]いします}', '{お願[ねが]い いたします}', 'se lo ruego'], ['{今日[きょう]}', '{本日[ほんじつ]}', 'hoy']),
        terms('Vocabulario', '面接[めんせつ]|entrevista', '履歴書[りれきしょ]|currículum', '志望動機[しぼうどうき]|motivo de la candidatura', '経験[けいけん]|experiencia', '長所[ちょうしょ]|punto fuerte', '短所[たんしょ]|punto débil', '御社[おんしゃ]|su empresa (al hablar)'),
        frases('Respuestas que conviene preparar', '御社[おんしゃ] の 技術[ぎじゅつ] に 興味[きょうみ] が あります。|Me interesa la tecnología de su empresa.', '三年間[さんねんかん]、 エンジニア として 働[はたら]いて おりました。|Trabajé tres años como ingeniero.', '日本語[にほんご] は 毎日[まいにち] 勉強[べんきょう]して おります。|Estudio japonés todos los días.'),
        ojo('El keigo humilde es solo para ti', '{申[もう]します}, {参[まい]ります} y {おります} rebajan tus propias acciones. Nunca se aplican al entrevistador: para sus acciones se usan las formas honoríficas, como {おっしゃいます} (decir) o {いらっしゃいます} (estar, venir).'),
      ], [
        q('¿Cómo dices tu nombre en una entrevista?', ['ガルシア と 申[もう]します。', 'ガルシア だ よ。', 'ガルシアさん です。'], '{〜と 申[もう]します} es la forma humilde adecuada.', { pitfall: 'Ponerte {さん} a ti mismo es un error grave en este contexto.' }),
        reply('Entrevistadora|どうぞ お座[すわ]り ください。|Tome asiento, por favor.', ['失礼[しつれい]します。', 'お座[すわ]り ください。', 'いらっしゃいませ。'], '{失礼[しつれい]します} se dice antes de sentarse, al entrar y al salir.'),
        q('¿Cuál es la forma humilde de 来ました?', ['参[まい]りました', 'いらっしゃいました', '来[こ]られました'], '{参[まい]ります} es la forma humilde de «ir» y «venir». {いらっしゃいます} es la honorífica, para otras personas.', { jp: '来[き]ました' }),
      ]),
      lesson('jp-oficina', 'Comunicación en la oficina', '職場', 'Saludar, informar, pedir confirmación y disculparte en el trabajo.', [
        cultura('ほう・れん・そう', 'La comunicación en la empresa japonesa se resume en {報告[ほうこく]} (informar), {連絡[れんらく]} (avisar) y {相談[そうだん]} (consultar): juntas forman «hōrensō». Se espera que informes a tu superior a menudo y pronto, sobre todo si hay un problema. Callarse un error es peor que cometerlo.'),
        dlg('Un problema con una entrega', 'Tú|部長[ぶちょう]、 今[いま] お時間[じかん] よろしい でしょう か。|Jefe, ¿tiene un momento ahora?', 'Jefe|はい、 どう しました か。|Sí, ¿qué ocurre?', 'Tú|申[もう]し訳[わけ] ございません。 資料[しりょう] の 提出[ていしゅつ] が 明日[あした] に なりそう です。|Lo siento mucho. Parece que la entrega del documento se retrasará a mañana.', 'Jefe|そう です か。 理由[りゆう] は 何[なん] です か。|Ya veo. ¿Cuál es el motivo?', 'Tú|データ の 確認[かくにん] に 時間[じかん] が かかって おります。 明日[あした] の 午前中[ごぜんちゅう] に 必[かなら]ず 提出[ていしゅつ] いたします。|La verificación de los datos está llevando tiempo. Lo entregaré sin falta mañana por la mañana.', 'Jefe|わかりました。 よろしく お願[ねが]いします。|De acuerdo. Cuento con ello.'),
        terms('Vocabulario de oficina', '部長[ぶちょう]|jefe de departamento', '同僚[どうりょう]|compañero de trabajo', '会議[かいぎ]|reunión', '資料[しりょう]|documentación', '確認[かくにん]|comprobación', '提出[ていしゅつ]|entrega (de un documento)', '報告[ほうこく]|informe', '相談[そうだん]|consulta', '残業[ざんぎょう]|horas extra'),
        table(['Situación', 'Con un compañero', 'Con un superior o cliente'], ['Pedir un momento', '{今[いま]、 いい です か。}', '{お時間[じかん] よろしい でしょう か。}'], ['Disculparse', '{すみません。}', '{申[もう]し訳[わけ] ございません。}'], ['Entendido', '{わかりました。}', '{承知[しょうち] しました。}'], ['Pedir que esperen', '{ちょっと 待[ま]って ください。}', '{少々[しょうしょう] お待[ま]ち ください。}']),
        ojo('Al jefe se le llama por el cargo', 'Se usa el cargo, no el nombre: {部長[ぶちょう]}, {課長[かちょう]}. Y nunca se le dice {ご苦労様[くろうさま]}, que es de superior a subordinado: lo correcto es {お疲[つか]れ様[さま]です}.'),
      ], [
        q('Tu jefa te da una instrucción. ¿Cuál es la respuesta más profesional?', ['承知[しょうち] しました。', 'うん、 わかった。', 'いい です よ。'], '{承知[しょうち] しました} es el «entendido» formal.', { pitfall: '{いい です よ} suena a que le das permiso tú a ella.' }),
        q('Has cometido un error en un informe. ¿Qué haces primero, según la costumbre japonesa?', ['Avisar a tu superior cuanto antes', 'Corregirlo sin decir nada', 'Esperar a que alguien lo note'], 'Es la base del {報告[ほうこく]}: informar pronto, sobre todo de los problemas.'),
        reply('Cliente (teléfono)|田中[たなか]さん は いらっしゃいます か。|¿Está el señor Tanaka?', ['少々[しょうしょう] お待[ま]ち ください。', 'ちょっと 待[ま]って。', 'はい、 います よ。'], 'A un cliente se le pide que espere con la fórmula formal.'),
      ]),
    ],
  },
  {
    id: 'estudios', title: 'Estudios', jp: '勉強',
    desc: 'Hablar con profesores, seguir las instrucciones de clase y relacionarte con compañeros.',
    situations: [
      lesson('jp-profesor', 'Hablar con el profesor', '先生と話す', 'Hacer preguntas, pedir permiso y avisar de una ausencia.', [
        p('A los profesores se les llama {先生[せんせい]}, solo o tras el apellido, y se les habla siempre en forma cortés. Para dirigirte a ellos, empieza disculpándote por la interrupción.'),
        dlg('Después de clase', 'Tú|先生[せんせい]、 すみません。 質問[しつもん] が あります。|Profesora, disculpe. Tengo una pregunta.', 'Profesora|はい、 何[なん] です か。|Sí, dime.', 'Tú|この 文法[ぶんぽう] が よく わかりません。 もう 一度[いちど] 説明[せつめい]して いただけません か。|No entiendo bien esta gramática. ¿Podría explicármela otra vez?', 'Profesora|いい です よ。 どこ が わかりません か。|Claro. ¿Qué parte no entiendes?', 'Tú|それから、 来週[らいしゅう] の 月曜日[げつようび] は 病院[びょういん] に 行[い]く ので、 休[やす]ませて いただけます か。|Y otra cosa: el lunes que viene tengo que ir al hospital. ¿Podría faltar?', 'Profesora|わかりました。 宿題[しゅくだい] は メール で 送[おく]って ください ね。|De acuerdo. Envíame los deberes por correo, ¿eh?'),
        terms('Vocabulario', '質問[しつもん]|pregunta', '説明[せつめい]|explicación', '文法[ぶんぽう]|gramática', '宿題[しゅくだい]|deberes', '締[し]め切[き]り|fecha límite', '欠席[けっせき]|ausencia', '遅刻[ちこく]|retraso', '成績[せいせき]|notas'),
        frases('Pedir permiso', 'トイレ に 行[い]っても いい です か。|¿Puedo ir al baño?', '辞書[じしょ] を 使[つか]っても いい です か。|¿Puedo usar el diccionario?', '締[し]め切[き]り は いつ です か。|¿Cuándo es la fecha límite?'),
        cultura('Avisar siempre', 'Faltar o llegar tarde sin avisar se considera una falta de respeto seria, también en una academia de idiomas. Se avisa antes, por correo o por teléfono, con una disculpa y el motivo. Además, muchos visados de estudiante exigen un porcentaje mínimo de asistencia.'),
      ], [
        q('¿Cómo pides permiso para usar el móvil como diccionario?', ['スマホ を 使[つか]っても いい です か。', 'スマホ を 使[つか]って ください。', 'スマホ を 使[つか]います か。'], 'Permiso: forma て + {も いい です か}.', { pitfall: '{〜て ください} sería pedirle al profesor que lo use él.' }),
        reply('Profesora|どこ が わかりません か。|¿Qué parte no entiendes?', ['ここ が わかりません。', 'はい、 わかりません。', 'どこ も わかります。'], 'Se señala la parte concreta: «no entiendo esto de aquí».'),
      ]),
      lesson('jp-clase', 'Instrucciones de clase y compañeros', '教室で', 'Entender lo que pide el profesor y hablar con tus compañeros.', [
        terms('Lo que dirá el profesor', '教科書[きょうかしょ] を 開[あ]けて ください|abrid el libro de texto', '聞[き]いて ください|escuchad', '読[よ]んで ください|leed', '書[か]いて ください|escribid', '繰[く]り返[かえ]して ください|repetid', '答[こた]えて ください|responded', 'ペア で 話[はな]して ください|hablad en parejas', '静[しず]かに して ください|silencio, por favor'),
        dlg('En el descanso (informal)', 'Compañera|ねえ、 昨日[きのう] の 宿題[しゅくだい]、 やった？|Oye, ¿hiciste los deberes de ayer?', 'Tú|うん、 やった よ。 でも、 難[むずか]しかった。|Sí, los hice. Pero eran difíciles.', 'Compañera|ノート、 ちょっと 見[み]せて くれない？|¿Me dejas ver un momento tus apuntes?', 'Tú|いい よ。 はい、 どうぞ。|Vale. Toma.', 'Compañera|ありがとう！ 昼[ひる]ご飯[はん]、 一緒[いっしょ]に 食[た]べよう。|¡Gracias! Comamos juntos.'),
        terms('Vocabulario', '教科書[きょうかしょ]|libro de texto', 'ページ|página', '試験[しけん]|examen', '授業[じゅぎょう]|clase', '休[やす]み時間[じかん]|descanso', '見[み]せる|enseñar, mostrar', '貸[か]す|prestar'),
        tip('Dos registros en la misma aula', 'Con el profesor, forma cortés. Con los compañeros de tu edad, informal: {やった？}, {いい よ}, {食[た]べよう} (forma informal de {食[た]べましょう}). Cambiar de uno a otro según con quién hablas es parte de la fluidez.'),
        ojo('〜て くれない？', 'Es la manera informal de pedir un favor a un amigo. Con un profesor sería {〜て いただけません か}.'),
      ], [
        listen('教科書[きょうかしょ] の 二十[にじゅう]ページ を 開[あ]けて ください。', 'Escucha. ¿Qué tienes que hacer?', ['Abrir el libro por la página 20', 'Leer veinte páginas', 'Cerrar el libro'], '{開[あ]けて ください} es «abrid» y {二十[にじゅう]ページ}, «página 20».'),
        reply('Compañera|ノート、 見[み]せて くれない？|¿Me dejas ver tus apuntes?', ['いい よ。 どうぞ。', '承知[しょうち] しました。', 'お待[ま]ち ください。'], 'A un compañero se le responde en informal.', 'Las fórmulas de oficina suenan cómicas entre amigos.'),
      ]),
    ],
  },
  {
    id: 'transporte', title: 'Transporte', jp: '交通',
    desc: 'Trenes, metro y autobuses: billetes, transbordos y avisos por megafonía.',
    situations: [
      lesson('jp-tren', 'Tren y metro', '電車', 'Comprar o recargar el billete, encontrar el andén y hacer transbordo.', [
        cultura('Cómo funciona', 'Casi todo el mundo usa una tarjeta recargable (Suica, PASMO, ICOCA…) que se pasa por el torno al entrar y al salir; también sirve para pagar en tiendas y máquinas. En el andén se hace fila en las marcas del suelo y se deja salir antes de entrar. Dentro del vagón no se habla por teléfono.'),
        terms('Vocabulario', '切符[きっぷ]|billete', '改札[かいさつ]|tornos de acceso', 'ホーム|andén', '〜番線[ばんせん]|vía número…', '乗[の]り換[か]え|transbordo', '各駅停車[かくえきていしゃ]|tren que para en todas las estaciones', '快速[かいそく]|tren rápido', '急行[きゅうこう]|expreso', '終電[しゅうでん]|último tren', 'チャージ|recarga de la tarjeta'),
        dlg('Preguntar en la estación', 'Tú|すみません、 上野[うえの] に 行[い]きたい ん です が、 何番線[なんばんせん] です か。|Perdone, quiero ir a Ueno. ¿Qué vía es?', 'Empleado|上野[うえの] です ね。 三番線[さんばんせん] の 山手線[やまのてせん] に 乗[の]って ください。|Ueno, ¿verdad? Tome la línea Yamanote en la vía 3.', 'Tú|乗[の]り換[か]え は あります か。|¿Hay transbordo?', 'Empleado|いいえ、 乗[の]り換[か]え なし で 行[い]けます。 二十分[にじゅっぷん] ぐらい です。|No, se llega sin transbordo. Son unos veinte minutos.', 'Tú|ありがとうございます。|Muchas gracias.'),
        frases('Frases útiles', 'この 電車[でんしゃ] は 新宿[しんじゅく] に 止[と]まります か。|¿Este tren para en Shinjuku?', '次[つぎ] の 駅[えき] は どこ です か。|¿Cuál es la siguiente estación?', '終電[しゅうでん] は 何時[なんじ] です か。|¿A qué hora es el último tren?'),
        ojo('Rápido no siempre es mejor', 'Los trenes {快速[かいそく]} y {急行[きゅうこう]} se saltan estaciones. Antes de subir, comprueba en el panel que paran en la tuya; si dudas, el {各駅停車[かくえきていしゃ]} para en todas.'),
        tip('〜たい ん です が', 'Añadir {ん です が} a lo que quieres hacer convierte la frase en una petición de ayuda educada: «quería ir a Ueno, y…». La frase queda abierta para que el otro te oriente.'),
      ], [
        listen('まもなく 二番線[にばんせん] に 電車[でんしゃ] が 参[まい]ります。', 'Aviso por megafonía. ¿Qué anuncia?', ['Que llega un tren a la vía 2', 'Que el tren sale con retraso', 'Que hay que cambiar de andén'], '{まもなく} es «en breve» y {参[まい]ります}, la forma humilde de «venir» que usa la megafonía.'),
        q('Quieres saber si hay que cambiar de tren. ¿Qué preguntas?', ['乗[の]り換[か]え は あります か。', '切符[きっぷ] は あります か。', '終電[しゅうでん] は あります か。'], '{乗[の]り換[か]え} es «transbordo».'),
        q('Vas con prisa y sube un 急行. ¿Qué debes comprobar?', ['Que pare en tu estación', 'Que tenga asientos libres', 'Nada: para en todas'], 'Los expresos se saltan estaciones.', { jp: '急行' }),
      ]),
      lesson('jp-autobus', 'Autobús y taxi', 'バス', 'Subir al autobús correcto, pagar al bajar y dar una dirección al taxista.', [
        cultura('Cada ciudad, un sistema', 'En muchas ciudades se sube al autobús por la puerta trasera y se paga al bajar, por delante; en el centro de Tokio suele ser al revés y con tarifa única. Observa qué hace la gente. La parada se solicita pulsando el botón, y el conductor anuncia cada una.'),
        terms('Vocabulario', 'バス停[てい]|parada de autobús', '運賃[うんちん]|tarifa', '整理券[せいりけん]|tique numerado (al subir)', '降[お]ります|bajar(se)', '乗[の]ります|subir(se)', '次[つぎ]|siguiente', '行[ゆ]き|con destino a', '運転手[うんてんしゅ]さん|conductor'),
        dlg('En la parada', 'Tú|すみません、 この バス は 市役所[しやくしょ] に 行[い]きます か。|Perdone, ¿este autobús va al ayuntamiento?', 'Conductor|いいえ、 行[い]きません。 五番[ごばん] の バス に 乗[の]って ください。|No. Tome el autobús número 5.', 'Tú|市役所[しやくしょ] まで いくら です か。|¿Cuánto cuesta hasta el ayuntamiento?', 'Conductor|二百[にひゃく] 三十円[さんじゅうえん] です。|Son 230 yenes.'),
        frases('En el taxi', '東京駅[とうきょうえき] まで お願[ねが]いします。|A la estación de Tokio, por favor.', 'ここ で 止[と]めて ください。|Pare aquí, por favor.', 'カード で 払[はら]えます か。|¿Puedo pagar con tarjeta?', '次[つぎ] で 降[お]ります。|Me bajo en la siguiente.'),
        tip('No abras la puerta del taxi', 'La puerta trasera izquierda se abre y se cierra sola: la acciona el conductor. Enseñar la dirección escrita en japonés en el móvil evita cualquier malentendido.'),
      ], [
        q('¿Cómo le dices al taxista adónde vas?', ['空港[くうこう] まで お願[ねが]いします。', '空港[くうこう] に 行[い]きます か。', '空港[くうこう] は どこ です か。'], 'Destino + {まで お願[ねが]いします}.'),
        reply('Conductor|五番[ごばん] の バス に 乗[の]って ください。|Tome el autobús número 5.', ['わかりました。 ありがとうございます。', 'いいえ、 降[お]ります。', '五番[ごばん] です か。 いくら。'], 'Confirmas que lo has entendido y das las gracias.'),
      ]),
    ],
  },
  {
    id: 'compras', title: 'Compras y alimentación', jp: '買い物',
    desc: 'Restaurantes, supermercados, pagos y devoluciones.',
    situations: [
      lesson('jp-restaurante', 'En el restaurante', 'レストラン', 'Pedir mesa, hacer el pedido, avisar de una alergia y pagar.', [
        dlg('De la puerta a la cuenta', 'Camarera|いらっしゃいませ。 何名様[なんめいさま] です か。|Bienvenidos. ¿Cuántos son?', 'Tú|二人[ふたり] です。|Dos.', 'Camarera|ご注文[ちゅうもん] は お決[き]まり です か。|¿Han decidido ya?', 'Tú|おすすめ は 何[なん] です か。|¿Qué recomienda?', 'Camarera|本日[ほんじつ] の 定食[ていしょく] が おすすめ です。|Recomiendo el menú del día.', 'Tú|じゃあ、 それ を 二[ふた]つ お願[ねが]いします。 すみません、 卵[たまご] アレルギー が ある ん です が…|Entonces, dos, por favor. Perdone, es que tengo alergia al huevo…', 'Camarera|かしこまりました。 確認[かくにん] いたします。|Entendido. Lo comprobaré.'),
        terms('Vocabulario', '注文[ちゅうもん]|pedido', '定食[ていしょく]|menú completo (plato, arroz y sopa)', 'おすすめ|recomendación', 'お会計[かいけい]|la cuenta', '別々[べつべつ]に|por separado', '持[も]ち帰[かえ]り|para llevar', '禁煙席[きんえんせき]|zona de no fumadores', 'アレルギー|alergia', '〜抜[ぬ]き|sin… (un ingrediente)'),
        frases('Pagar', 'お会計[かいけい] を お願[ねが]いします。|La cuenta, por favor.', '別々[べつべつ]に 払[はら]えます か。|¿Podemos pagar por separado?', 'カード は 使[つか]えます か。|¿Se puede pagar con tarjeta?', 'ごちそうさまでした。|Gracias por la comida. (al salir)'),
        cultura('Costumbres en la mesa', 'Se llama al camarero diciendo {すみません} en voz alta o pulsando el timbre de la mesa. No se deja propina. La cuenta suele pagarse en la caja de la salida, no en la mesa. Los palillos nunca se clavan en vertical en el arroz ni se usan para pasar comida a otros palillos: son gestos de los ritos funerarios.'),
        ojo('Alergias: sé explícito', 'Di el ingrediente seguido de {アレルギー が あります} y, para asegurarte, pregunta {〜 は 入[はい]って います か} («¿lleva…?»). Si la alergia es grave, lleva una tarjeta escrita en japonés: es habitual y el personal la agradece.'),
      ], [
        reply('Camarera|ご注文[ちゅうもん] は お決[き]まり です か。|¿Han decidido ya?', ['もう 少[すこ]し 待[ま]って ください。', 'いらっしゃいませ。', '何名様[なんめいさま] です か。'], 'Pides un poco más de tiempo.'),
        q('Queréis pagar cada uno lo suyo. ¿Qué preguntas?', ['別々[べつべつ]に 払[はら]えます か。', 'お会計[かいけい] は いくら です か。', '持[も]ち帰[かえ]り で お願[ねが]いします。'], '{別々[べつべつ]に} es «por separado».'),
        q('¿Cómo preguntas si un plato lleva cacahuetes?', ['ピーナッツ は 入[はい]って います か。', 'ピーナッツ を ください。', 'ピーナッツ が 好[す]き です か。'], '{入[はい]って います か}: «¿lleva…?».'),
      ]),
      lesson('jp-tienda', 'Tiendas, pagos y devoluciones', 'お店', 'Probarte ropa, pagar como prefieras y devolver un artículo.', [
        terms('Vocabulario', '試着[しちゃく]|probarse ropa', 'サイズ|talla', '現金[げんきん]|efectivo', '電子[でんし]マネー|dinero electrónico', '領収書[りょうしゅうしょ]|recibo', '返品[へんぴん]|devolución', '交換[こうかん]|cambio (de artículo)', '免税[めんぜい]|libre de impuestos', '割引[わりびき]|descuento'),
        dlg('En una tienda de ropa', 'Tú|すみません、 これ を 試着[しちゃく]しても いい です か。|Perdone, ¿puedo probarme esto?', 'Dependienta|はい、 どうぞ。 試着室[しちゃくしつ] は あちら で ございます。|Sí, adelante. Los probadores están por allí.', 'Tú|ちょっと 小[ちい]さい です。 もっと 大[おお]きい サイズ は あります か。|Me queda un poco pequeño. ¿Tienen una talla más grande?', 'Dependienta|少々[しょうしょう] お待[ま]ち ください。 Lサイズ を お持[も]ち します。|Espere un momento. Le traigo la L.', 'Tú|これ に します。 カード で 払[はら]えます か。|Me quedo con este. ¿Puedo pagar con tarjeta?'),
        dlg('Una devolución', 'Tú|すみません、 昨日[きのう] これ を 買[か]った ん です が、 返品[へんぴん] できます か。|Perdone, compré esto ayer. ¿Puedo devolverlo?', 'Dependienta|レシート は お持[も]ち です か。|¿Tiene el tique?', 'Tú|はい、 あります。|Sí, aquí está.', 'Dependienta|かしこまりました。 少々[しょうしょう] お待[ま]ち ください。|Entendido. Espere un momento, por favor.'),
        cultura('El efectivo sigue mandando', 'El pago con tarjeta y con móvil se ha extendido mucho, pero aún hay restaurantes pequeños, templos y máquinas que solo aceptan efectivo. El dinero no se entrega en mano: se deja en la bandejita de la caja. Las devoluciones dependen de la política de cada tienda; conserva siempre el tique.'),
        tip('これ に します', 'Literalmente «me decido por esto». Es la frase para anunciar tu elección en una tienda o en un restaurante.'),
      ], [
        q('Has elegido una chaqueta. ¿Qué dices?', ['これ に します。', 'これ は します。', 'これ を 返品[へんぴん] します。'], '{〜に します} expresa una decisión entre varias opciones.'),
        reply('Dependienta|レシート は お持[も]ち です か。|¿Tiene el tique?', ['はい、 あります。', 'はい、 お持[も]ち です。', 'いいえ、 けっこう です。'], 'De lo tuyo se habla en forma cortés normal: {あります}.', '{お持[も]ち です} es la forma honorífica que usa la dependienta para ti; no la apliques a ti mismo.'),
      ]),
    ],
  },
  {
    id: 'importante', title: 'Situaciones importantes', jp: '大事な時',
    desc: 'Médico, farmacia, emergencias y trámites de residencia.',
    situations: [
      lesson('jp-hospital', 'Hospital y farmacia', '病院', 'Explicar tus síntomas y entender cómo tomar la medicación.', [
        cultura('Cómo se va al médico', 'Para problemas comunes se acude directamente a una clínica de la especialidad ({内科[ないか]} para medicina general), sin pasar por un médico de cabecera. En recepción se entrega la tarjeta del seguro de salud y se rellena un cuestionario. Con el seguro público el paciente paga una parte del coste. Esta lección te da el idioma; ante un problema de salud, sigue siempre las indicaciones del personal sanitario.'),
        terms('Síntomas', '熱[ねつ] が あります|tengo fiebre', '頭[あたま] が 痛[いた]い です|me duele la cabeza', 'お腹[なか] が 痛[いた]い です|me duele la barriga', '喉[のど] が 痛[いた]い です|me duele la garganta', '咳[せき] が 出[で]ます|tengo tos', '気分[きぶん] が 悪[わる]い です|me encuentro mal', 'めまい が します|estoy mareado'),
        dlg('En la consulta', 'Médica|今日[きょう] は どう しました か。|¿Qué le ocurre hoy?', 'Tú|昨日[きのう] から 熱[ねつ] が あって、 喉[のど] が 痛[いた]い です。|Desde ayer tengo fiebre y me duele la garganta.', 'Médica|熱[ねつ] は 何度[なんど] です か。|¿Cuánta fiebre tiene?', 'Tú|三十八度[さんじゅうはちど] です。|Treinta y ocho grados.', 'Médica|風邪[かぜ] です ね。 薬[くすり] を 出[だ]します。 一日[いちにち] 三回[さんかい]、 食後[しょくご] に 飲[の]んで ください。|Es un resfriado. Le receto medicación. Tómela tres veces al día, después de las comidas.'),
        terms('Vocabulario', '病院[びょういん]|hospital, clínica', '保険証[ほけんしょう]|tarjeta del seguro de salud', '薬[くすり]|medicina', '薬局[やっきょく]|farmacia', '処方箋[しょほうせん]|receta', '食後[しょくご]|después de comer', '食前[しょくぜん]|antes de comer', '一日[いちにち] 三回[さんかい]|tres veces al día', 'アレルギー|alergia'),
        ojo('Las medicinas se «beben»', 'En japonés los medicamentos se toman con el verbo {飲[の]みます}, aunque sean pastillas.'),
      ], [
        q('¿Cómo dices «me duele la cabeza»?', ['頭[あたま] が 痛[いた]い です。', '頭[あたま] を 痛[いた]い です。', '頭[あたま] が あります。'], 'Parte del cuerpo + {が 痛[いた]い です}.'),
        listen('一日[いちにち] 二回[にかい]、 食後[しょくご] に 飲[の]んで ください。', 'Escucha a la farmacéutica. ¿Cómo debes tomar la medicina?', ['Dos veces al día, después de comer', 'Tres veces al día, antes de comer', 'Una vez al día, al acostarte'], '{二回[にかい]} es «dos veces» y {食後[しょくご]}, «después de comer».'),
        reply('Médica|今日[きょう] は どう しました か。|¿Qué le ocurre hoy?', ['咳[せき] が 出[で]ます。', '保険証[ほけんしょう] です。', 'お大事[だいじ]に。'], 'Explicas el síntoma. {お大事[だいじ]に} es lo que te dirán a ti al salir.'),
      ]),
      lesson('jp-emergencia', 'Emergencias', '緊急', 'Pedir ayuda, llamar a emergencias y entender los avisos en un terremoto.', [
        table(['Número', 'Servicio', 'Lo primero que te preguntarán'], ['119', 'Bomberos y ambulancia', '{火事[かじ] です か、 救急[きゅうきゅう] です か。} ¿Incendio o urgencia médica?'], ['110', 'Policía', '{事件[じけん] です か、 事故[じこ] です か。} ¿Delito o accidente?']),
        terms('Palabras que debes reconocer', '助[たす]けて|¡socorro!', '救急車[きゅうきゅうしゃ]|ambulancia', '火事[かじ]|incendio', '地震[じしん]|terremoto', '津波[つなみ]|tsunami', '避難[ひなん]|evacuación', '避難所[ひなんじょ]|refugio', '危[あぶ]ない|¡cuidado!; peligroso', '警察[けいさつ]|policía'),
        dlg('Llamada al 119', 'Operador|119番[ばん] です。 火事[かじ] です か、 救急[きゅうきゅう] です か。|119. ¿Incendio o urgencia médica?', 'Tú|救急[きゅうきゅう] です。 友[とも]だち が 倒[たお]れました。|Urgencia médica. Mi amigo se ha desmayado.', 'Operador|住所[じゅうしょ] を 教[おし]えて ください。|Dígame la dirección.', 'Tú|新宿区[しんじゅくく] 西新宿[にししんじゅく] 二丁目[にちょうめ] です。|Shinjuku-ku, Nishi-Shinjuku 2-chōme.', 'Operador|わかりました。 すぐ 救急車[きゅうきゅうしゃ] が 行[い]きます。|Entendido. Una ambulancia va de inmediato.'),
        frases('Frases de emergencia', '救急車[きゅうきゅうしゃ] を 呼[よ]んで ください。|Llame a una ambulancia, por favor.', '日本語[にほんご] が あまり 話[はな]せません。|No hablo mucho japonés.', '避難所[ひなんじょ] は どこ です か。|¿Dónde está el refugio?'),
        cultura('Prepárate antes', 'Memoriza tu dirección en japonés: es lo primero que te pedirán. Averigua cuál es tu refugio de evacuación, que el ayuntamiento señala en un mapa. Los móviles en Japón reciben alertas automáticas de terremoto. Y si el idioma te bloquea, pide a cualquier persona cercana que llame por ti con la primera frase de la lista.'),
      ], [
        q('Hay un incendio. ¿A qué número llamas?', ['119', '110', '112'], 'El 119 atiende incendios y urgencias médicas; el 110 es la policía.', { pitfall: 'El 112 europeo no funciona en Japón.' }),
        q('Oyes 避難してください por megafonía. ¿Qué debes hacer?', ['Evacuar', 'Quedarte en casa', 'Llamar a la policía'], '{避難[ひなん]} es «evacuación».', { jp: '避難[ひなん]して ください。' }),
        reply('Operador|住所[じゅうしょ] を 教[おし]えて ください。|Dígame la dirección.', ['渋谷区[しぶやく] 神南[じんなん] 一丁目[いっちょうめ] です。', '救急[きゅうきゅう] です。', '日本[にほん] です。'], 'Se da la dirección concreta, de lo general a lo particular: distrito, barrio, manzana.'),
      ]),
      lesson('jp-ayuntamiento', 'Ayuntamiento y trámites de residencia', '役所', 'Hacer los trámites básicos al llegar: empadronamiento y seguro de salud.', [
        cultura('Tus primeros trámites', 'Quien llega con un visado de media o larga duración recibe la tarjeta de residencia ({在留[ざいりゅう]カード}). Al instalarte en un domicilio debes notificarlo en la oficina municipal en un plazo de 14 días, y lo mismo cada vez que te mudes. Allí se tramita también el seguro nacional de salud. Los requisitos cambian y dependen de tu situación: consulta la información oficial de tu municipio y de la Agencia de Servicios de Inmigración antes de ir.'),
        terms('Vocabulario', '市役所[しやくしょ]|ayuntamiento', '区役所[くやくしょ]|oficina del distrito', '在留[ざいりゅう]カード|tarjeta de residencia', '住民登録[じゅうみんとうろく]|empadronamiento', '転入届[てんにゅうとどけ]|notificación de alta en el municipio', '国民健康保険[こくみんけんこうほけん]|seguro nacional de salud', '窓口[まどぐち]|ventanilla', '番号札[ばんごうふだ]|número de turno', '書類[しょるい]|documento, impreso', '記入[きにゅう]|rellenar'),
        dlg('En la ventanilla', 'Tú|すみません、 転入届[てんにゅうとどけ] を 出[だ]したい ん です が。|Perdone, quería presentar la notificación de alta.', 'Funcionario|在留[ざいりゅう]カード と パスポート を お持[も]ち です か。|¿Tiene la tarjeta de residencia y el pasaporte?', 'Tú|はい、 こちら です。|Sí, aquí están.', 'Funcionario|では、 この 書類[しょるい] に ご記入[きにゅう] ください。|Entonces, rellene este impreso, por favor.', 'Tú|すみません、 ここ に 何[なに] を 書[か]けば いい です か。|Perdone, ¿qué tengo que escribir aquí?', 'Funcionario|こちら に ご住所[じゅうしょ] を お願[ねが]いします。|Aquí, su dirección, por favor.'),
        table(['En el impreso', 'Significa'], ['氏名', 'Nombre y apellidos'], ['住所', 'Dirección'], ['生年月日', 'Fecha de nacimiento'], ['国籍', 'Nacionalidad'], ['電話番号', 'Número de teléfono'], ['署名', 'Firma']),
        frases('Para pedir ayuda', '英語[えいご] の 書類[しょるい] は あります か。|¿Tienen el impreso en inglés?', '書[か]き方[かた] を 教[おし]えて ください。|Explíqueme cómo se rellena, por favor.', 'ゆっくり 話[はな]して いただけます か。|¿Podría hablar despacio?'),
        tip('Lleva un sello o prepárate para firmar', 'En muchos trámites aún se usa un sello personal ({印鑑[いんかん]}); a los extranjeros se les suele aceptar la firma. Muchas oficinas ofrecen intérpretes o impresos en varios idiomas: pregúntalo en información.'),
      ], [
        q('En un impreso aparece 生年月日. ¿Qué tienes que escribir?', ['Tu fecha de nacimiento', 'Tu dirección', 'Tu nacionalidad'], '{生} nacer, {年} año, {月} mes, {日} día. El orden es año, mes, día.', { jp: '生年月日' }),
        reply('Funcionario|この 書類[しょるい] に ご記入[きにゅう] ください。|Rellene este impreso, por favor.', ['すみません、 書[か]き方[かた] を 教[おし]えて ください。', 'ご記入[きにゅう] ください。', 'いらっしゃいませ。'], 'Si no sabes cómo rellenarlo, pide que te lo expliquen.'),
        q('¿Qué documento debes llevar siempre encima como residente extranjero?', ['在留[ざいりゅう]カード', '番号札[ばんごうふだ]', '転入届[てんにゅうとどけ]'], 'La tarjeta de residencia es tu documento de identidad en Japón.'),
      ]),
    ],
  },
];
