import type { ReactNode } from 'react';
import { worlds } from '../content';
import type { Look } from '../content/types';

/* Ilustraciones originales en SVG: logotipo, retratos de personajes y escenarios de los mundos. */

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="NIHONGO QUEST">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="var(--bg-2)" />
      <rect x="9" y="9" width="46" height="46" rx="10" fill="none" stroke="var(--gold)" strokeWidth="3" />
      <path d="M20 44V21l24 23V20" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="47" cy="17" r="4.5" fill="var(--sakura)" />
    </svg>
  );
}

const CAST = new Map(worlds.flatMap((w) => w.cast.map((c) => [c.name, c.look] as const)));
export const lookOf = (name: string): Look | undefined => CAST.get(name);

export function Avatar({ look, size = 56 }: { look: Look; size?: number }) {
  const { skin, hair, eyes, style, extra } = look;
  return (
    <svg className="avatar" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill={hair} opacity="0.22" />
      {extra === 'capucha' && <path d="M8 64c0-30 6-52 24-52s24 22 24 52z" fill="#5b4a8a" />}
      {style === 'largo' && <path d="M12 34c0-16 9-25 20-25s20 9 20 25v30H12z" fill={hair} />}
      {style === 'bob' && <path d="M12 34c0-16 9-25 20-25s20 9 20 25v14c-4 3-36 3-40 0z" fill={hair} />}
      {style === 'coleta' && <path d="M48 20c10 2 13 16 8 28-2-9-6-14-10-16z" fill={hair} />}
      <path d="M20 58c2-6 22-6 24 0v6H20z" fill={skin} />
      <ellipse cx="32" cy="35" rx="16.500" ry="17.500" fill={skin} />
      <ellipse cx="22" cy="42" rx="3.600" ry="2" fill="#f29cb7" opacity="0.5" />
      <ellipse cx="42" cy="42" rx="3.600" ry="2" fill="#f29cb7" opacity="0.5" />
      {[25, 39].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="36" rx="3.400" ry="4.600" fill={eyes} />
          <ellipse cx={x} cy="37" rx="1.800" ry="2.800" fill="#1b2141" />
          <circle cx={x + 1.2} cy="34.300" r="1.200" fill="#fff" />
          <path d={`M${x - 4} 30.500q4-2.500 8 0`} fill="none" stroke={hair} strokeWidth="1.300" strokeLinecap="round" />
        </g>
      ))}
      <path d="M29 46q3 2.200 6 0" fill="none" stroke="#8a4b4b" strokeWidth="1.400" strokeLinecap="round" />
      <path d="M14 36c-2-16 7-27 18-27s20 11 18 27c-3-9-8-13-14-14-3 4-13 6-22 14z" fill={hair} />
      {style === 'punta' && <path d="M17 20l1-12 7 7 4-11 5 10 7-9 2 12 7-5-2 12z" fill={hair} />}
      {extra === 'gafas' && <g fill="none" stroke="#1b2141" strokeWidth="1.400"><rect x="19.500" y="31" width="11" height="9.500" rx="4" /><rect x="33.500" y="31" width="11" height="9.500" rx="4" /><path d="M30.500 35h3" /></g>}
      {extra === 'lazo' && <path d="M44 12l9-4v9zM44 12l-8-5v10z" fill="#e8553d" />}
      {extra === 'cinta' && <path d="M15 24c10-7 24-7 34 0" fill="none" stroke="#f3efe6" strokeWidth="2.600" />}
      {extra === 'cascos' && <g><path d="M13 36c0-26 38-26 38 0" fill="none" stroke="#1b2141" strokeWidth="3" /><rect x="9.500" y="32" width="6" height="11" rx="3" fill="#f2b63c" /><rect x="48.500" y="32" width="6" height="11" rx="3" fill="#f2b63c" /></g>}
      {extra === 'visor' && <rect x="17" y="30.500" width="30" height="10" rx="5" fill="#4fc0c0" opacity="0.45" stroke="#4fc0c0" />}
    </svg>
  );
}

/** Retrato genérico para interlocutores sin personaje propio (vecina, camarero, «Tú»…). */
export function Speaker({ name, size = 40 }: { name: string; size?: number }) {
  const look = lookOf(name);
  if (look) return <Avatar look={look} size={size} />;
  const me = name === 'Tú';
  return (
    <span className={`speaker${me ? ' speaker-me' : ''}`} style={{ width: size, height: size }} aria-hidden="true">
      {name.replace(/[^\p{L}]/gu, '').slice(0, 1).toUpperCase()}
    </span>
  );
}

/** Escenario de cada mundo. Composiciones propias: ningún elemento procede de obras existentes. */
export function WorldArt({ id }: { id: string }) {
  const scenes: Record<string, ReactNode> = {
    romance: (
      <>
        <rect width="320" height="180" fill="#3a2a55" />
        <circle cx="250" cy="52" r="30" fill="#f6d9c2" opacity="0.9" />
        <path d="M0 140c60-36 120-30 180-8s100 10 140-10v58H0z" fill="#2a2046" />
        <path d="M58 150V92M58 110l-14-12M58 100l14-14" stroke="#1d1634" strokeWidth="5" strokeLinecap="round" />
        {[[40, 84, 20], [72, 76, 24], [56, 62, 22], [90, 96, 16], [30, 104, 14]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#f29cb7" opacity={0.75 + (i % 2) * 0.15} />)}
        {[[130, 60], [160, 96], [200, 40], [226, 118], [286, 104], [110, 124]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="4" ry="2.200" fill="#f7c3d3" transform={`rotate(${i * 40} ${x} ${y})`} />)}
      </>
    ),
    fantasia: (
      <>
        <rect width="320" height="180" fill="#231d4a" />
        {[[30, 30], [80, 18], [140, 44], [200, 22], [270, 36], [300, 70], [110, 70]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? 1.6 : 2.4} fill="#f3efe6" />)}
        <path d="M0 150l50-52 34 30 44-66 46 60 38-34 50 46 58-30v76H0z" fill="#3b2f74" />
        <path d="M196 96h34v-30l-8 8-9-12-9 12-8-8z" fill="#b693f0" /><rect x="207" y="78" width="12" height="18" fill="#231d4a" />
        <path d="M0 160c80-16 240-16 320 0v20H0z" fill="#1a1538" />
        <circle cx="70" cy="60" r="16" fill="#d9d3ee" opacity="0.85" /><circle cx="76" cy="56" r="14" fill="#231d4a" />
      </>
    ),
    misterio: (
      <>
        <rect width="320" height="180" fill="#161a2e" />
        <circle cx="64" cy="48" r="26" fill="#c94f5d" opacity="0.55" />
        <path d="M110 180V66h120v114z" fill="#0f1222" /><path d="M100 66l70-34 70 34z" fill="#0b0d1a" />
        {[[126, 84], [158, 84], [190, 84], [126, 116], [190, 116], [158, 148]].map(([x, y], i) => <rect key={i} x={x} y={y} width="18" height="22" fill={i === 2 ? '#f2b63c' : '#232842'} />)}
        <path d="M0 150c40-10 70-8 110 6M230 156c40-14 60-12 90-4v28H0v-30z" fill="#0b0d1a" />
        <path d="M0 132h320" stroke="#8f9bd6" strokeWidth="14" opacity="0.08" /><path d="M0 104h320" stroke="#8f9bd6" strokeWidth="10" opacity="0.06" />
      </>
    ),
    cotidiano: (
      <>
        <rect width="320" height="180" fill="#f2b63c" opacity="0.9" />
        <rect width="320" height="180" fill="#2b3466" opacity="0.35" />
        <circle cx="262" cy="46" r="22" fill="#fbe9bd" />
        <path d="M0 62h320M0 74h320" stroke="#1b2141" strokeWidth="1.500" opacity="0.5" /><path d="M96 40v140" stroke="#1b2141" strokeWidth="5" /><path d="M84 54h24" stroke="#1b2141" strokeWidth="4" />
        <rect x="130" y="92" width="110" height="88" fill="#f3efe6" /><path d="M124 92h122l-10-22H134z" fill="#e8553d" opacity="0.85" />
        <rect x="146" y="112" width="34" height="30" fill="#7aa7f5" opacity="0.7" /><rect x="198" y="118" width="26" height="62" fill="#8a5a3a" />
        <rect x="0" y="118" width="70" height="62" fill="#1b2141" opacity="0.55" /><rect x="262" y="104" width="58" height="76" fill="#1b2141" opacity="0.5" />
      </>
    ),
    accion: (
      <>
        <rect width="320" height="180" fill="#3a1f2b" />
        <circle cx="160" cy="92" r="58" fill="#f08a5d" /><circle cx="160" cy="92" r="58" fill="none" stroke="#f2b63c" strokeWidth="3" opacity="0.6" />
        <path d="M0 150l70-70 40 34 50-52 50 52 40-34 70 70v30H0z" fill="#22121c" />
        <path d="M116 150v-34h88v34M108 118h104M124 108h72" stroke="#f3efe6" strokeWidth="5" fill="none" strokeLinecap="round" />
        {[[30, 40, 40], [250, 30, 52], [270, 64, 30]].map(([x, y, w], i) => <path key={i} d={`M${x} ${y}h${w}`} stroke="#f3efe6" strokeWidth="3" strokeLinecap="round" opacity="0.5" />)}
      </>
    ),
    scifi: (
      <>
        <rect width="320" height="180" fill="#0f1a33" />
        {[[24, 24], [70, 60], [120, 20], [300, 30], [280, 120], [40, 130], [190, 150]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.600" fill="#f3efe6" />)}
        <circle cx="236" cy="150" r="96" fill="#1f4a6b" /><path d="M150 130c40-26 110-30 170-8" stroke="#4fc0c0" strokeWidth="2" fill="none" opacity="0.6" />
        <ellipse cx="110" cy="76" rx="74" ry="16" fill="none" stroke="#4fc0c0" strokeWidth="3" />
        <rect x="88" y="56" width="44" height="40" rx="10" fill="#dfe6f2" /><rect x="98" y="66" width="24" height="10" rx="5" fill="#0f1a33" />
        <path d="M36 76h28M156 76h28" stroke="#f2b63c" strokeWidth="6" strokeLinecap="round" />
      </>
    ),
  };
  return (
    <svg className="world-art" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {scenes[id]}
    </svg>
  );
}
