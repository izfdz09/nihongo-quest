import { Icon, Jp, StageContext } from '../components/Jp';
import { PageHead } from '../components/Layout';
import { to } from '../lib/router';

const SECTIONS = [
  { href: '/academia', title: 'Academia', text: 'El curso ordenado, en ocho módulos. Empieza aquí y sigue el orden: cada lección da por sabidas las anteriores.' },
  { href: '/registros', title: 'Formal e informal', text: 'Los tres registros del japonés: cómo hablar con amigos, con desconocidos y con clientes o jefes.' },
  { href: '/mundos', title: 'Mundos', text: 'Seis historias con personajes propios. Cada escena indica después de qué módulo conviene hacerla.' },
  { href: '/japon', title: 'Vivir en Japón', text: 'Situaciones reales: vecinos, alquiler, trabajo, transporte, compras, médico y trámites.' },
  { href: '/repaso', title: 'Repaso', text: 'Tarjetas con las palabras de las lecciones que has completado. Las que fallas vuelven antes.' },
  { href: '/hablar', title: 'Práctica oral', text: 'Escucha una frase, grábate y compara tu voz con el modelo.' },
  { href: '/panel', title: 'Mi panel', text: 'Tu nivel, tu racha, tu objetivo diario y tus logros.' },
];

export function HelpPage() {
  return (
    <>
      <PageHead jp="つかいかた" title="Cómo funciona">Lo que necesitas saber para usar NIHONGO QUEST, en dos minutos.</PageHead>
      <div className="help">
        <section className="card">
          <h2>Una lección, tres pasos</h2>
          <ol className="help-steps">
            <li><strong>Aprende.</strong> Lee la explicación y escucha cada ejemplo. No hace falta memorizar nada todavía.</li>
            <li><strong>Practica.</strong> Pulsa «Empezar la práctica». Tras cada respuesta verás si es correcta y por qué. Lo que falles vuelve a salir al final.</li>
            <li><strong>Repasa.</strong> Las palabras de la lección pasan a tu repaso. Entra unos minutos cada día.</li>
          </ol>
          <a className="btn btn-main" href={to('/leccion/intro-idioma')}>Ir a la primera lección</a>
        </section>

        <section className="card">
          <h2>Los botones del texto japonés</h2>
          <StageContext.Provider value={2}>
            <div className="help-demo"><Jp src="ありがとうございます。" repeat /></div>
          </StageContext.Provider>
          <dl className="help-keys">
            <div><dt><span className="help-key help-key-round"><Icon name="sound" /></span></dt><dd>Escuchar a velocidad normal.</dd></div>
            <div><dt><span className="help-key">lento</span></dt><dd>Escuchar despacio, para distinguir cada sílaba.</dd></div>
            <div><dt><span className="help-key">×3</span></dt><dd>Oírlo tres veces seguidas, para imitarlo.</dd></div>
            <div><dt><span className="help-key help-key-text">ver rōmaji</span></dt><dd>Muestra la lectura en letras latinas. En los primeros módulos está siempre visible; después aparece solo si la pides, para que te acostumbres a leer kana.</dd></div>
          </dl>
        </section>

        <section className="card">
          <h2>Qué hay en cada sección</h2>
          <ul className="help-list">
            {SECTIONS.map((s) => <li key={s.href}><a href={to(s.href)}>{s.title}</a><span>{s.text}</span></li>)}
          </ul>
        </section>

        <section className="card">
          <h2>Cuánto estudiar</h2>
          <p>Mejor poco y a diario que mucho de vez en cuando. Un buen ritmo es una lección nueva y el repaso del día: entre diez y quince minutos. En <a href={to('/panel')}>Mi panel</a> puedes fijar tu objetivo diario.</p>
        </section>

        <section className="card">
          <h2>Si el audio no suena</h2>
          <p>El audio usa las voces japonesas de tu dispositivo. Si no hay ninguna instalada, verás un aviso arriba con los pasos para añadirla en Windows, Android, iPhone y Mac. La aplicación nunca lee el japonés con una voz de otro idioma, porque la pronunciación sería incorrecta.</p>
          <p>En <a href={to('/ajustes')}>Ajustes</a> puedes elegir la voz y la velocidad.</p>
        </section>

        <section className="card">
          <h2>Dónde se guarda tu progreso</h2>
          <p>En este navegador, sin cuentas ni servidores. Si cambias de dispositivo o borras los datos de navegación, se pierde: descarga una copia de vez en cuando desde <a href={to('/ajustes')}>Ajustes</a>.</p>
        </section>
      </div>
    </>
  );
}
