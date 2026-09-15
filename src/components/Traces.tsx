/**
 * ─── Tracciati ───
 *
 * Il linguaggio visivo di lifedesignfestival.it: percorsi curvi sottili che
 * attraversano la pagina, con piccoli nodi quadrati colorati agganciati sopra.
 * Tratto nero sottile su avorio, avorio smorzato sul fondo scuro.
 *
 * Sostituisce le decorazioni improvvisate che ogni schermata aveva per conto
 * proprio (archi sfumati, cerchi concentrici, fasci convergenti), che non
 * appartenevano al sistema del festival.
 *
 * I nodi sono collocati a mano sui percorsi: le coordinate sono nello spazio
 * del palco 1920×1080, lo stesso del viewBox.
 */

interface TraceSet {
  paths: string[];
  nodes: { x: number; y: number; color: string }[];
}

const ORANGE = 'var(--c-orange)';
const VIOLET = 'var(--c-violet)';
const PINK = 'var(--c-pink)';

/**
 * Quattro composizioni diverse, così le schermate non si somigliano tutte.
 * I nodi quadrati sono tenuti nella fascia periferica del palco: al centro
 * ci va il contenuto, e un quadratino dietro una parola la disturba.
 * "calm" per le pagine di lettura, "open" per le schermate di gioco (lascia
 * libero il centro), "focus" per i momenti celebrativi, "full" per le home.
 */
const SETS: Record<string, TraceSet> = {
  calm: {
    paths: [
      'M -80 700 C 520 700 900 320 1560 320 C 1820 320 1940 300 2000 292',
      'M -80 300 C 480 300 820 700 1500 700 C 1780 700 1900 740 2000 772',
    ],
    nodes: [
      { x: 1547, y: 307, color: ORANGE },
      { x: 1487, y: 687, color: VIOLET },
      { x: 120, y: 300, color: PINK },
    ],
  },
  open: {
    paths: [
      'M -80 150 C 560 150 900 60 1560 60 C 1820 60 1940 84 2000 96',
      'M -80 1020 C 620 1020 980 930 1620 930 C 1840 930 1940 946 2000 956',
      'M 1840 260 C 1840 520 1720 600 1720 820',
    ],
    nodes: [
      { x: 1547, y: 47, color: ORANGE },
      { x: 1607, y: 917, color: VIOLET },
      { x: 1707, y: 807, color: PINK },
    ],
  },
  focus: {
    paths: [
      'M -80 860 C 600 860 1000 480 1700 480 C 1880 480 1960 500 2000 512',
      'M 200 -60 C 200 380 380 640 380 1140',
      'M 1780 -60 C 1780 260 1600 400 1600 700',
    ],
    nodes: [
      { x: 1687, y: 467, color: PINK },
      { x: 367, y: 900, color: VIOLET },
      { x: 187, y: 160, color: ORANGE },
    ],
  },
  full: {
    paths: [
      'M -80 640 C 560 640 940 260 1600 260 C 1840 260 1940 246 2000 238',
      'M -80 380 C 500 380 860 760 1480 760 C 1760 760 1900 800 2000 828',
      'M 320 -60 C 320 360 520 620 520 1140',
      'M 1660 -60 C 1660 300 1500 460 1500 720',
    ],
    nodes: [
      { x: 1587, y: 247, color: ORANGE },
      { x: 1467, y: 747, color: VIOLET },
      { x: 507, y: 940, color: PINK },
      { x: 1647, y: 20, color: PINK },
      { x: 108, y: 380, color: ORANGE },
    ],
  },
};

interface Props {
  variant?: keyof typeof SETS;
  dark?: boolean;
  /** Mostra o nasconde i nodi quadrati, per le schermate più sobrie. */
  nodes?: boolean;
  /** Opacità complessiva del tracciato. */
  opacity?: number;
}

export default function Traces({ variant = 'calm', dark = false, nodes = true, opacity = 1 }: Props) {
  const set = SETS[variant] ?? SETS.calm;
  const stroke = dark ? 'rgba(244,238,228,0.52)' : 'rgba(0,0,0,0.55)';

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        opacity,
      }}
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {set.paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          style={{
            strokeDasharray: 3200,
            animation: `trace-draw 2.2s var(--ease-soft) ${i * 220}ms both`,
          }}
        />
      ))}
      {nodes &&
        set.nodes.map((n, i) => (
          <rect
            key={`n${i}`}
            x={n.x}
            y={n.y}
            width="26"
            height="26"
            fill={n.color}
            style={{
              transformOrigin: `${n.x + 13}px ${n.y + 13}px`,
              animation: `trace-node 0.55s var(--ease-back) ${900 + i * 110}ms both`,
            }}
          />
        ))}
    </svg>
  );
}
